import { XmlNodeDTO } from './../../../models/xml-node-dto';
import { ChangeXmlStringService } from './../../../events/change-xml-string/change-xml-string.service';
import { ChangeXmlNodesService } from './../../../events/change-xml-nodes/change-xml-nodes.service';
import { XmlNode } from '../../../models/xml-node';
import { Component, OnInit, Input, ViewChild, Inject, EventEmitter, Output } from '@angular/core';
import { ITreeOptions, TreeModel, TreeComponent, TREE_ACTIONS, KEYS } from 'angular-tree-component';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  node: XmlNode;
}

export interface AddParamData {
  node: XmlNode;
}

export interface DeleteParamData {
  node: XmlNode;
  index: number;
}

@Component({
  selector: 'add-edit-dialog',
  templateUrl: './edit-node/edit-node.dialog.html',
  styleUrls: ['./edit-node/edit-node.dialog.css'],
})
export class EditDialog {
  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  @Output() addParam = new EventEmitter<AddParamData>(true);
  @Output() deleteParam = new EventEmitter<DeleteParamData>(true);

  add(node: XmlNode) {
    this.addParam.emit({ node: node });
  }

  delete(node: XmlNode, index: number) {
    this.deleteParam.emit({ node: node, index: index });
  }
}

@Component({
  selector: 'app-xml-tree',
  templateUrl: './xml-tree.component.html',
  styleUrls: ['./xml-tree.component.css']
})
export class XmlTreeComponent implements OnInit {
  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  @Input() nodes = [
    new XmlNode(null, 1, "Baatrarar", null, null, [new XmlNode(null, 3, "SubNode", null)]),
    new XmlNode(null, 2, "Baatrarardddd", null, null, null),
    new XmlNode(null, 5, "Baatrararaaaaaa", null),
    new XmlNode(null, 6, "Baatrarar3333", null)
  ];

  options: ITreeOptions = {
    allowDrag: (node) => true,
    displayField: "displayField",
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.onEditNode(node);
        }
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        }
      }
    },
  };

  constructor(
    private exportService: ExporterService,
    private changeXmlNodesService: ChangeXmlNodesService,
    private changeXmlStringService: ChangeXmlStringService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.changeXmlNodesService.changeEvent.subscribe((node: XmlNodeDTO) => {
      this.nodes.splice(0, this.nodes.length);
      this.nodes = [this.getXmlNode(node)];
    });
  }

  private getXmlNode(importNode: XmlNodeDTO): XmlNode {
    let children: XmlNode[] = [];
    importNode.children.forEach(node => {
      children.push(this.getXmlNode(node))
    });

    return new XmlNode(this.tree.treeModel, importNode.id, importNode.name, importNode.paramKeys, importNode.paramValues, children, importNode.content);
  }

  onMoveNode($event) {
    this.exportService.getXml(this.nodes[0]).subscribe(result => {
      this.changeXmlStringService.changeEvent.emit(result.xml);
    });
  }

  allowDrop(element) {
    return true;
  }

  onRemoveDrop($event) {
    this.removeNode($event.element, this.nodes);
    this.tree.treeModel.update();
  }

  removeNode(element: ITreeNode, where: ITreeNode[]) {
    where.forEach((node, index) => {
      if (node.id == element.id) {
        where.splice(index, 1);
      } else {
        if (node.children != null && node.children != undefined) {
          this.removeNode(element, node.children);
        }
      }
    });
  }

  updateNode(element: ITreeNode, where: XmlNode[]) {
    where.forEach((node) => {
      if (node.id == element.id) {
        node.update();
      } else {
        if (node.children != null && node.children != undefined) {
          this.updateNode(element, node.children);
        }
      }
    });
  }

  onEditNode(node: XmlNode) {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '550px',
      disableClose: true,
      data: { node: node.data }
    });

    const subAdd = dialogRef.componentInstance.addParam.subscribe((data: any) => {
      this.addParam(data.node);
    });

    const subDelete = dialogRef.componentInstance.deleteParam.subscribe((data: any) => {
      this.deleteParam(data.node, data.index);
    });

    dialogRef.afterClosed().subscribe(result => {
      node.data = result;
      this.updateNode(node, this.nodes);
    });
  }

  addParam(node: XmlNode) {
    node.paramKeys.push("key");
    node.paramValues.push("value");
  }

  deleteParam(node: XmlNode, index: number) {
    node.paramKeys.splice(index, 1);
    node.paramValues.splice(index, 1);
  }
}
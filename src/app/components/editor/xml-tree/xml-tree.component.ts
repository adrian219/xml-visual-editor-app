import { ToastService } from './../../../utils/toast/toast.service';
import { ChooseExampleNodeService } from './../../../events/choose-example-node/choose-example-node.service';
import { XmlNodeDTO } from './../../../models/xml-node-dto';
import { ChangeXmlStringService } from './../../../events/change-xml-string/change-xml-string.service';
import { ChangeXmlNodesService } from './../../../events/change-xml-nodes/change-xml-nodes.service';
import { XmlNode } from '../../../models/xml-node';
import { Component, OnInit, Input, ViewChild, Inject, EventEmitter, Output } from '@angular/core';
import { ITreeOptions, TreeComponent, KEYS } from 'angular-tree-component';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger } from '@angular/material';

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      console.log(data.node);
    }

  @Output() addParam = new EventEmitter<AddParamData>(true);
  @Output() deleteParam = new EventEmitter<DeleteParamData>(true);

  add(node: XmlNode) {
    this.addParam.emit({ node: node });
  }

  delete(node: XmlNode, index: number) {
    this.deleteParam.emit({ node: node, index: index });
  }

  indexTracker(index: number, value: any) {
    return index;
  }
}

@Component({
  selector: 'app-xml-tree',
  templateUrl: './xml-tree.component.html',
  styleUrls: ['./xml-tree.component.css']
})
export class XmlTreeComponent implements OnInit {
  @ViewChild('tree')
  private tree: TreeComponent;

  @ViewChild('tempTree')
  private tempTree: TreeComponent;

  nodes = [];
  newNodes = [];

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  selectedNode;

  options: ITreeOptions = {
    allowDrag: (node) => true,
    displayField: "displayField",
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.onEditNode(node);
        },
        contextMenu: (tree, node, $event) => {
          this.menuTrigger.openMenu();
          this.selectedNode = node;
          $event.preventDefault();
        }
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        }
      }
    },
  };

  tempOptions: ITreeOptions = {
    allowDrag: (node) => true,
    displayField: "displayField",
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          this.onEditNode(node);
        }
      }
    },
  };

  constructor(
    private exportService: ExporterService,
    private changeXmlNodesService: ChangeXmlNodesService,
    private changeXmlStringService: ChangeXmlStringService,
    private chooseExampleNodeService: ChooseExampleNodeService,
    public dialog: MatDialog,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.changeXmlNodesService.changeEvent.subscribe((node: XmlNodeDTO) => {
      this.nodes.splice(0, this.nodes.length);
      this.nodes = [this.getXmlNode(node)];
    });

    this.chooseExampleNodeService.changeEvent.subscribe((node: XmlNode) => {
      this.newNodes = [new XmlNode((Math.random() % 1000), "".concat(node.name), [].concat(node.paramKeys), [].concat(node.paramValues), this.cloneChildren(node), "".concat(node.content))];
    });
  }

  private getXmlNode(importNode: XmlNodeDTO): XmlNode {
    let children: XmlNode[] = [];
    importNode.children.forEach(node => {
      children.push(this.getXmlNode(node))
    });

    return new XmlNode(importNode.id, importNode.name, importNode.paramKeys, importNode.paramValues, children, importNode.content);
  }

  updateXml() {
    this.exportService.getXml(this.nodes[0]).subscribe(data => {
      this.changeXmlStringService.changeEvent.emit(data.xml);
    },
    error => {
      this.toastService.showError(error.statusText.concat(". Check your Internet connection"));
    }
    );
  }

  checkRoot() {
    if(this.nodes.length != 1){
      this.toastService.showMessage("Uważaj! Twoj Xml nie ma glownego korzenia!", 3000);
    }
  }

  onMoveNode($event) {
    this.checkRoot();
    this.updateXml();
  }

  allowDrop(element) {
    return true;
  }
  
  onRemoveDrop($event) {
    this.removeNode($event.element, this.nodes);
    this.removeNode($event.element, this.newNodes);
    this.tree.treeModel.update();
    this.updateXml();
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

  cloneNode(element: ITreeNode, where: XmlNode[]) {
    where.forEach((node) => {
      if (node.id == element.id) {

        let xmlNode: XmlNode = new XmlNode((Math.random() % 1000), "".concat(node.name), [].concat(node.paramKeys), [].concat(node.paramValues), this.cloneChildren(node), "".concat(node.content));

        where.push(xmlNode); //add clone node to main tree
      } else {
        if (node.children != null && node.children != undefined) {
          this.cloneNode(element, node.children);
        }
      }
    });
  }

  cloneChildren(xmlNode: XmlNode): XmlNode[] {
    let cloneChildren: XmlNode[] = [];
    if (xmlNode.children != null && xmlNode.children != undefined) {
      xmlNode.children.forEach(node => {
        cloneChildren.push(new XmlNode((Math.random() % 1000), "".concat(node.name), [].concat(node.paramKeys), [].concat(node.paramValues), this.cloneChildren(node), "".concat(node.content)))
      });
      return cloneChildren;
    } else {
      return new Array<XmlNode>();
    }
  }

  onEditNode(node: XmlNode) {
    let isEdit: boolean;
    let data;
    if (node == null) {
      node = new XmlNode((Math.random() % 1000), null, [], [], [], null);
      this.newNodes = [node];
      data = { node: node };
      isEdit = false;
    } else {
      data = { node: node.data };
      isEdit = true;
    }

    const dialogRef = this.dialog.open(EditDialog, {
      width: '550px',
      disableClose: true,
      data: data
    });

    const subAdd = dialogRef.componentInstance.addParam.subscribe((data: any) => {
      this.addParam(data.node);
    });

    const subDelete = dialogRef.componentInstance.deleteParam.subscribe((data: any) => {
      this.deleteParam(data.node, data.index);
    });

    dialogRef.afterClosed().subscribe(result => {
      if (isEdit) {
        node.data = result;
        this.updateNode(node, this.nodes);
        this.updateXml();
      } else {
        node = result;
        this.updateNode(node, this.newNodes);
        this.updateXml();
      }
    });
  }

  addParam(node: XmlNode) {
    node.paramKeys.push("");
    node.paramValues.push("");
  }

  deleteParam(node: XmlNode, index: number) {
    node.paramKeys.splice(index, 1);
    node.paramValues.splice(index, 1);
  }

  /*Menu options*/
  onEdit() {
    this.onEditNode(this.selectedNode);
  }

  onDelete() {
    this.removeNode(this.selectedNode, this.nodes);
    this.removeNode(this.selectedNode, this.newNodes);
    this.tree.treeModel.update();
    this.tempTree.treeModel.update();
    this.updateXml();
  }

  onClone() {
    this.cloneNode(this.selectedNode, this.nodes);
    this.tree.treeModel.update();
    this.updateXml();
    this.checkRoot();
  }

  /*Add new node*/
  addNode() {
    this.onEditNode(null);
  }
}
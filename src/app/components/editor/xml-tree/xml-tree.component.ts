import { XmlNodeDTO } from './../../../models/xml-node-dto';
import { ChangeXmlStringService } from './../../../events/change-xml-string/change-xml-string.service';
import { ChangeXmlNodesService } from './../../../events/change-xml-nodes/change-xml-nodes.service';
import { XmlNode } from '../../../models/xml-node';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ITreeOptions, TreeModel, TreeComponent } from 'angular-tree-component';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';

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
    displayField: "displayField"
  };

  constructor(
    private exportService: ExporterService,
    private changeXmlNodesService: ChangeXmlNodesService,
    private changeXmlStringService: ChangeXmlStringService
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
    this.update();
  }

  removeNode(element: ITreeNode, where: ITreeNode[]) {
    where.forEach((node, index) => {
      if (node.id == element.id) {
        where.splice(index, 1);
      } else {
        if(node.children != null && node.children != undefined) {
          this.removeNode(element, node.children);
        }
      }
    });
  }

  update() {
    this.tree.treeModel.update();
  }
}
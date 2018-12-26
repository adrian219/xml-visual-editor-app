import { IReactionDisposer } from 'mobx';
import { ITreeNode } from "angular-tree-component/dist/defs/api";

export class XmlNode implements ITreeNode {
    private handler: IReactionDisposer;
    parent: ITreeNode;
    displayField: string;
    data: any;
    elementRef: any;
    level: number;
    path: string[];
    index: number;
    isExpanded: boolean;
    isActive: boolean;
    isFocused: boolean;
    isCollapsed: boolean;
    isLeaf: boolean;
    hasChildren: boolean;
    isRoot: boolean;
    children: XmlNode[];

    id: number;
    name: string;
    paramKeys: string[];
    paramValues: string[];
    content: string;

    constructor(id: number, name: string, paramKeys?: string[], paramValaues?: string[], children?: XmlNode[], content?: string) {
        this.id = id;
        this.name = name;
        this.children = children;
        this.paramKeys = paramKeys;
        this.paramValues = paramValaues;
        this.content = content;

        this.update();

        // this.paramKeys.
    }

    update() {
        if (!this.checkIfParamsIsNullOrEmpty(this.paramKeys)) {
            this.displayField = this.getDisplayNode();
        } else {
            this.displayField = this.name;
        }
    }

    setParam(key: string, value: string) {
        this.paramKeys.push(key);
        this.paramValues.push(key);
    }

    getParam(key: string) {
        let index: number = this.paramKeys.indexOf(key);

        if (index != -1) {
            return this.paramValues[index];
        } else {
            return null;
        }
    }

    putChildren(node: XmlNode) {
        this.children.push(node);
    }

    removeChildren(node: XmlNode) {
        if (this.children.includes(node)) {
            //delete
        }
    }

    private getDisplayNode() {
        let result: string = "";

        result = result.concat(this.name, " [");

        if (!this.checkIfParamsIsNullOrEmpty(this.paramKeys)) {
            for (let i = 0; i < this.paramKeys.length; i++) {
                result = result.concat(this.paramKeys[i], "=", this.paramValues[i], ", ");
            }
        }

        return result.substring(0, result.length - 2).concat("]");
    }

    private checkIfParamsIsNullOrEmpty(keys: string[]): boolean {
        let result: boolean = false;

        if (keys == null || keys == undefined) {
            result = true;
        } else {
            if (keys.length == 0) {
                result = true;
            }
        }

        return result;
    }

    /*Implements methods from library is not using*/
    findNextSibling(skipHidden: any): ITreeNode {
        throw new Error("Method not implemented.");
    }
    findPreviousSibling(skipHidden: any): ITreeNode {
        throw new Error("Method not implemented.");
    }
    getFirstChild(skipHidden: any): ITreeNode {
        throw new Error("Method not implemented.");
    }
    getLastChild(skipHidden: any): ITreeNode {
        throw new Error("Method not implemented.");
    }
    findNextNode(goInside: boolean): ITreeNode {
        throw new Error("Method not implemented.");
    }
    findPreviousNode(skipHidden: any): ITreeNode {
        throw new Error("Method not implemented.");
    }
    isDescendantOf(node: ITreeNode): boolean {
        throw new Error("Method not implemented.");
    }
    getNodePadding(): string {
        throw new Error("Method not implemented.");
    }
    getClass(): string {
        throw new Error("Method not implemented.");
    }
    setIsExpanded(value) {
        throw new Error("Method not implemented.");
    }
    toggleExpanded() {
        this.setIsExpanded(!this.isExpanded);
    
        return this;
      }
    expand() {
        if (!this.isExpanded) {
            this.toggleExpanded();
        }

        console.log("jestemmm");
        return this;
    }

    collapse() {
        if (this.isExpanded) {
            this.toggleExpanded();
        }console.log("jestemmm 222222");

        return this;
    }
    ensureVisible() {
        throw new Error("Method not implemented.");
    }
    toggleActivated(multi: any) {
        throw new Error("Method not implemented.");
    }
    focus() {
        throw new Error("Method not implemented.");
    }
    blur() {
        throw new Error("Method not implemented.");
    }
    hide() {
        this.setIsHidden(true);
    }
    show() {
        this.setIsHidden(false);
    }
    setIsHidden(value) {
        throw new Error("Method not implemented.");
    }
    scrollIntoView() {
        throw new Error("Method not implemented.");
    }
    fireEvent(event: any) {
        throw new Error("Method not implemented.");
    }
    doForAll(fn: (node: ITreeNode) => null) {
        throw new Error("Method not implemented.");
    }
    expandAll() {
        throw new Error("Method not implemented.");
    }
    collapseAll() {
        throw new Error("Method not implemented.");
    }
    setIsActive(value: boolean, multi?: boolean) {
        throw new Error("Method not implemented.");
    }
    setActiveAndVisible(multi: boolean) {
        throw new Error("Method not implemented.");
    }
}
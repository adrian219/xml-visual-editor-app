import { ITreeNode } from "angular-tree-component/dist/defs/api";

export class XmlNode implements ITreeNode {
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
    children: ITreeNode[];

    id: number;
    name: string;
    params: Map<string, string>
    value: string;

    constructor(id: number, name: string, params?: Map<string, string>, children?: ITreeNode[], value?: string) {
        this.id = id;
        this.name = name;
        this.children = children;
        this.params = params;
        this.value = value;

        if (params != null || params != undefined) {
            this.displayField = this.getDisplayNode();
        } else {
            this.displayField = name;
        }
    }

    setParam(key: string, value: string) {
        this.params.set(key, value);
    }

    getParam(key: string) {
        if (this.params.has(key)) {
            return this.params.get(key);
        } else {
            return null;
        }
    }

    putChildren(node: ITreeNode) {
        this.children.push(node);
    }

    removeChildren(node: ITreeNode) {
        if (this.children.includes(node)) {

        }
    }

    export() {
        let a : string = "<";

        a = a.concat(this.name);

        if(this.params != null){
            a = a.concat(" ")
                
            this.params.forEach((value, key) => {
                a = a
                    .concat(key)
                    .concat("=")
                    .concat("\"")
                    .concat(value)
                    .concat("\"")
            });
        }

        a = a.concat(">")

        if(this.value != null){
            a = a.concat(this.value);
        }else if(this.children != null){
            a = a.concat(this.value)
            this.children.forEach( (value : XmlNode) => {
                a = a
                    .concat("\n")
                    .concat("\t")
                    .concat(value.export())
                    .concat("\n");
            })
        }
        

        a = a
            .concat("</")
            .concat(this.name)
            .concat(">")

        return a;
    }

    private getDisplayNode() {
        let result: string = "";

        result = result.concat(this.name, " [");

        this.params.forEach((value, key) => {
            result = result.concat(key, "=", value, ", ");
        });

        return result.substring(0, result.length - 2).concat("]");
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
    toggleExpanded() {
        throw new Error("Method not implemented.");
    }
    expand() {
        throw new Error("Method not implemented.");
    }
    collapse() {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    show() {
        throw new Error("Method not implemented.");
    }
    setIsHidden(value: boolean) {
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
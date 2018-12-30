import { XmlNodeDTO } from './../xml-node-dto';

export class ImportFileDTO {

    constructor(private _node: XmlNodeDTO, private _xml: string) {

    }

    get node() {
        return this._node;
    }

    get xml() {
        return this._xml;
    }
}
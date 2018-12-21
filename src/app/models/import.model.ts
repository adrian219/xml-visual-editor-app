import { XmlNodeDTO } from './xml-node-dto';

export class ImportDTO {

    constructor(private _node: XmlNodeDTO) {

    }

    get node() {
        return this._node;
    }
}
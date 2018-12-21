
export class XmlNodeDTO {

    constructor(private _id: number, private _name: string, private _paramKeys: string[], private _paramValues: string[], private _content: string, private _children: XmlNodeDTO[]) {

    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get paramKeys() {
        return this._paramKeys;
    }

    get paramValues() {
        return this._paramValues;
    }

    get content() {
        return this._content;
    }

    get children() {
        return this._children;
    }
}
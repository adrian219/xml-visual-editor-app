export class OwnXml {
    
    constructor(private _id?: number, private _userId?: number, private _name?: string, private _xml?: string, private _lastUpdated?: Date) {

    }

    get id() {
        return this._id;
    }

    get userId() {
        return this._userId;
    }

    get name() {
        return this._name;
    }

    get xml() {
        return this._xml;
    }

    get lastUpdated() {
        return this._lastUpdated;
    }

    set id(id) {
        this._id = id;
    }

    set userId(userId) {
        this._userId = userId;
    }

    set name(name) {
        this._name = name;
    }

    set xml(xml) {
        this._xml = xml;
    }

    set lastUpdated(date) {
        this._lastUpdated = date;
    }
}

export class ValidationDTO {

    constructor(private _xml: string, private _validate: boolean) {

    }

    get xml() {
        return this._xml;
    }

    get validate() {
        return this._validate;
    }
}
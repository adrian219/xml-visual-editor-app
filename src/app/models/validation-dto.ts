
export class ValidationDTO {

    constructor(private _xml: string, private _validate?: boolean, private _errorMessage?: string) {
        _xml = "";
    }

    get xml() {
        return this._xml;
    }

    get validate() {
        return this._validate;
    }

    get errorMessage() {
        return this._errorMessage;
    }
}
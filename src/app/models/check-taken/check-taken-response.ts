export class CheckTakenResponse {

    constructor(private _checking: string, private _check: boolean) {

    }

    get checking() {
        return this._checking;
    }

    set checking(checking) {
        this._checking = checking;
    }

    get check() {
        return this._check;
    }

    set check(check) {
        this._check = check;
    }
}
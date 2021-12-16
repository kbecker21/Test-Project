export class User {
    constructor(
        public idUser: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public accountLevel: number,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    public isAdmin() {
        return this.accountLevel === 5;
    }

    public isTutor() {
        return this.accountLevel === 4;
    }

}

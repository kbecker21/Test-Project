/**
 * Dieses Klasse repräsentiert das Model eines Benutzers.
 */
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

    /**
     * Prüft ob der Nutzer ein Admin ist
     * @returns true: wenn Admin; false: wenn nicht
     */
    public isAdmin() {
        return this.accountLevel === 5;
    }

    /**
    * Prüft ob der Nutzer ein Tutor ist
    * @returns true: wenn Tutor; false: wenn nicht
    */
    public isTutor() {
        return this.accountLevel === 4;
    }

}

export class User {
    uid?: string;
    business_id?: string;
    vcita_token?: string;
    vcita_user?: any;
    vcita_client_added_webhook?: boolean;
    imported_vcita_clients?: boolean;

    constructor() {
        this.uid = null;
        this.business_id = null;
    }
}
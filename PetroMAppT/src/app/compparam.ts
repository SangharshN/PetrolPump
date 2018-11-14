import { DateTime } from 'ionic-angular';

export class CompParam {
    id: number;
    name: string;
    complianceId: number;
    created_at: DateTime;
    updated_at: DateTime;
    updated_by: string;
    active: number;

    constructor() {
        this.active = 1;
    }
}
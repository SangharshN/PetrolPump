import { DateTime } from 'ionic-angular';

export class Compliance {
    id: number;
    pumpId: number;
    employeeId: number;
    complianceId: number;
    status: number;
    created_at: DateTime
    updated_by: string;

    constructor() {
    }
}
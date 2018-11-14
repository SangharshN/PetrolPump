import { DateTime } from "ionic-angular";

export class Leave {
    id: number;
    pumpId: number;
    employeeId: number;
    employeeName: string;
    leaveId: number;
    status: number;
    created_at: DateTime
    updated_by: string;

    constructor() {
    }
}
import { DateTime } from "ionic-angular";

export class TDriver {
    id: number;
    name: string;
    mobileNo: number;
    transporterId: number;
    active: number;
    created_at: DateTime;
    updated_at: DateTime;
    updated_by: string;
    req_id: number;
    tdriver;
}
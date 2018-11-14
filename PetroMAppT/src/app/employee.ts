export class Employee {
    id: number;
    name: string;
    pumpId: number;
    gender: string;
    mobileNo: string;
    email: string;
    username: string;
    updated_by: string;
    active: number;

    constructor() {
        this.active = 1;
    }
}
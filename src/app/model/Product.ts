import { isNullOrUndefined } from "@swimlane/ngx-datatable";

export interface IProduct {
    Id: number;
    Name: string;
    Nickname: string;
    Price: number;
    Profile: string;
}

export class Product implements IProduct {
    Id = null;
    Name = null;
    Nickname = null;
    Price = null;
    Profile = null;

    constructor(data = null) {
        if (!isNullOrUndefined(data)) {
            this.Id = this.Id ? this.Id : data.Id ? data.Id : null;
            this.Name = this.Name ? this.Name : data.Name ? data.Name : null;
            this.Nickname = this.Nickname ? this.Nickname : data.Nickname ? data.Nickname : null;
            this.Price = this.Price ? this.Price : data.Price ? data.Price : null;
            this.Profile = this.Profile ? this.Profile : data.Profile ? data.Profile : null;
        }
    }
}
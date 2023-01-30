import { isNullOrUndefined } from "@swimlane/ngx-datatable";

export interface IProduct {
    Id: number;
    Title: string;
    Category: string;
    Description: string;
    Price: number;
    Image: any;
    Rating: any;
}

export class Product implements IProduct {
    Id = null;
    Title = null;
    Category = null;
    Description = null;
    Price = null;
    Image = null;
    Rating = null;

    constructor(data = null) {
        if (!isNullOrUndefined(data)) {
            this.Id = data.id ? data.id : data.Id ? data.Id : null;
            this.Title = data.title ? data.title : data.Title ? data.Title : null;
            this.Category = data.category ? data.category : data.Category ? data.Category : null;
            this.Description = data.description ? data.description : data.Description ? data.Description : null;
            this.Price = data.price ? data.price : data.Price ? data.Price : null;
            this.Rating = data.rating ? data.rating : data.Rating ? data.Rating : null;
        }
    }
}
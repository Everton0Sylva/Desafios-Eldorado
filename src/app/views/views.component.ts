import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { Product } from '../model/Product';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {
  constructor(private router: Router) {
  }
  public listProducts: Array<Product> = [];

  public totalPurchase = 0;

  ngOnInit() {
    this.listProducts.push({ Id: 0, Name: "Notebook Lenovo 14\"", Price: 2240, profile: "notebook.png", numSelected: 0 },
      { Id: 1, Name: "Smart TV 4k 40\"", Price: 1920, profile: "smarttv.png", numSelected: 0 },
      { Id: 2, Name: "Smartphone IPhone", Price: 4736, profile: "smartphone.png", numSelected: 0 });
  }

  setProduct(fn, product: Product) {
    if (!isNullOrUndefined(product) && !isNullOrUndefined(product)) {
      this.listProducts.forEach((prod) => {
        if (prod.Id == product.Id) {
          if (fn == '+') prod.numSelected++;
          else if (fn == '-') {
            prod.numSelected = prod.numSelected > 0 ? prod.numSelected - 1 : 0;
          }

          this.totalPurchase += (prod.Price * prod.numSelected)
        }
      })
    }
  }

}

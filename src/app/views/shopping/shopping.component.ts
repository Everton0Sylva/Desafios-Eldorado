import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {

  @Input()
  listProducts: Array<Product> = [];

  @Output()
  purchaseCalculate = new EventEmitter<number>();

  ngOnInit() {
  }

  setProduct(fn, product: Product) {
    var totalPurchase = 0;
    if (!isNullOrUndefined(product) && !isNullOrUndefined(product)) {
      this.listProducts.forEach((prod) => {
        if (prod.Id == product.Id) {
          if (fn == '+') {
           // prod.numSelected++;
          } else if (fn == '-') {
          //  prod.numSelected = prod.numSelected > 0 ? prod.numSelected - 1 : 0;
          }
        }
      //  totalPurchase += (prod.Price * prod.numSelected)
      })
    }
    this.purchaseCalculate.emit(totalPurchase);
  }
}

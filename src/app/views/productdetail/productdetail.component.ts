import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'src/app/model/Chart';
import { IProduct, Product } from 'src/app/model/Product';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent {

  public product: IProduct;

  public productId: number;

  constructor(private router: Router, private route: ActivatedRoute, 
    private apiRequestService: ApiRequestService, private chartService : ChartService) {
    let nav = this.router.getCurrentNavigation();
    if (nav !== null && nav !== undefined) {
      const state: any = nav.extras.state;
      if (state !== null && state !== undefined) {
        const id = state.productId;
        if (id !== null && id !== undefined) {
          this.productId = id;
          this.onGetProduct();
        }
      }
    }
  }

  onGetProduct() {
    this.apiRequestService.GET(this.productId)
      .then((data: any) => {
        this.product = new Product(data);
        setTimeout(() => {
          document.getElementById("detailDiv").innerHTML = data.Detail;
        }, 200);
      }
      ).catch(error => {
        console.log(error)
      });
  }

  onAddProduct(){
    var chart = new Chart();
    chart.Product = this.product;
    chart.Quantity = 1;

    this.chartService.setItemChart(chart);
    }
}

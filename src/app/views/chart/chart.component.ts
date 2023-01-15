import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  @Input()
  set totalChart(totalPurchase) {
    if (totalPurchase > 0) {
      this.chartValues.Purchase = totalPurchase;

      this.onsetChartValues();
    }
  }
  public chartValues = {
    Purchase: 0,
    Discount: 0,
    Final: 0
  }

  onsetChartValues() {
    if (this.chartValues.Purchase > 0) {
      this.chartValues.Final = this.chartValues.Purchase - this.chartValues.Discount;
    }
  }

}

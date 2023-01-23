import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chart } from '../model/Chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private chart: Array<Chart>;
  private subject: BehaviorSubject<Array<Chart>>;

  constructor() {
    this.chart = new Array<Chart>();
    this.subject = new BehaviorSubject<Array<Chart>>(this.chart);
  }

  public setChart(nChart: Array<Chart>) {
    this.subject.next(nChart)
  }

  public setItemChart(nChart: Chart) {
    var itemIdx = this.chart.findIndex((chart: Chart) => {
      return nChart.Product.Id == chart.Product.Id
    })

    if (itemIdx != null && itemIdx != undefined && itemIdx >= 0) {
      this.chart[itemIdx].Quantity++;
    } else {
      this.chart.push(nChart);
    }
    this.subject.next(this.chart)
  }

  public getChart(): Observable<Array<Chart>> {
    return this.subject.asObservable();
  }
}

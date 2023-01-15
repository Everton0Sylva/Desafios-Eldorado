import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  public modalCoupon;
  public chartValues: any;
  public currentCoupon: any;

  public availabledCoupons: any;

  public toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: false,
  })


  @Input()
  set totalChart(totalPurchase) {
    if (totalPurchase > 0) {
      if (this.chartValues == null || this.chartValues == undefined) {
        this.chartValues = {
          purchase: 0,
          discount: 0,
          final: 0
        }
      }
      if (this.chartValues.discount > 0) {
        this.onApllyDiscount();
      }
      this.chartValues.purchase = totalPurchase;



      this.onsetChartValues();
    }
  }


  ngOnInit() {
    this.availabledCoupons = [{
      CouponString: "desconto22",
      percent: 22.11
    },
    {
      CouponString: "niverLoja35",
      percent: 35.74
    },
    {
      CouponString: "seuniver17",
      percent: 17.76
    }];
  }


  onOpenModalCoupon() {
    this.modalCoupon = new bootstrap.Modal(document.getElementById("modalCoupon"), {
      keyboard: false,
      backdrop: 'static'
    })
    this.modalCoupon.show();
  }

  onsetChartValues() {
    if (this.chartValues.purchase > 0) {
      this.chartValues.final = this.chartValues.purchase - this.chartValues.discount;
    }
  }

  onGenerateCoupon() {
    var generateCoupon = Math.floor(Math.random() * 3);
    this.currentCoupon = this.availabledCoupons[generateCoupon];
  }

  onCopyCoupontoClipboard() {
    navigator.clipboard.writeText(this.currentCoupon.CouponString);

    Swal.fire({
      text: 'Cupom Copiado!',
      icon: 'success',
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).then((res) => {
      if (res.isDismissed) {
        this.modalCoupon.hide();
      }
    })
  }

  onApllyDiscount() {
    let that = this;
    var inputCoupon = (<HTMLInputElement>document.getElementById("inputCoupon")).value.trim();
    if (inputCoupon.length > 0) {
      var find = this.availabledCoupons.find((f) => f.CouponString.includes(inputCoupon));
      if (isNullOrUndefined(find)) {
        this.toast.fire({
          text: 'Cupom Inválido!',
          icon: 'error',
        })
      } else {
        that.chartValues.discount = (that.chartValues.purchase * find.percent) / 100;
        that.onsetChartValues()

      }
    }
  }
  onRemoveDiscount() {
    let that = this;
    Swal.fire({
      icon: 'question',
      title: 'Excluir Cupom?',
      text: "Confirma a exclusão do Cupom de desconto?",
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        (<HTMLInputElement>document.getElementById("inputCoupon")).value = "";
        that.chartValues.discount = 0;
        this.onsetChartValues();
      }
    })
  }
}

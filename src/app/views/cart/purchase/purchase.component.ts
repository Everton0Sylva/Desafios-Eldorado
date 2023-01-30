import { outputAst } from '@angular/compiler';
import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/model/Cart';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {

  public modalCoupon;
  public cartValues;
  public currentCoupon: any;

  public availabledCoupons: any;
  public listCart: Array<Cart>;

  constructor(private router: Router, private apiRequestService: ApiRequestService, private cartService: CartService
    , private toastr: ToastrService) {
  }

  ngOnInit() {
    this.listCart = new Array<Cart>();
    this.cartService.getCart()
      .subscribe((cart) => {
        this.cartValues = {
          purchase: 0,
          discount: 0,
          final: 0
        };
        if (Array.isArray(cart) && cart.length > 0) {
          this.listCart = cart;
          this.onCalculateValues();
        }
      })
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

  onCalculateValues() {
    this.listCart.forEach((item: Cart) => {
      this.cartValues.purchase += (item.Quantity * item.Product.Price);
    })
    this.cartValues.final = this.cartValues.purchase - this.cartValues.discount;
  }


  onOpenModalCoupon() {
    this.modalCoupon = new bootstrap.Modal(document.getElementById("modalCoupon"), {
      keyboard: false,
      backdrop: 'static'
    })
    this.modalCoupon.show();
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
        this.toastr.error("Cupom Inválido!");
      } else {
        that.cartValues.discount = (that.cartValues.purchase * find.percent) / 100;
        that.onCalculateValues();
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
        that.cartValues.discount = 0;
        this.onCalculateValues();
      }
    })
  }

  onFinishPurshase() {
    Swal.fire({
      icon: 'question',
      title: 'Finalizar Compra?',
      text: "Confirma finalizar sua Compra?",
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.setCart(new Array<Cart>());
        Swal.fire({
          icon: 'success',
          title: "Compra Concluida!",
          text: "Seu pedido será enviado!!",
          cancelButtonText: 'OK',
          showCancelButton: true,
          showConfirmButton: false,
          buttonsStyling: false,
          customClass: {
            cancelButton: 'btn btn-outline-secondary'
          },
        }).then(() => {
          this.router.navigate(['/']);
        })
      }
    })
  }
}

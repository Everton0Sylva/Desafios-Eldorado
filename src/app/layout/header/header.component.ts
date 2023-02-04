import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { createPopper } from '@popperjs/core';
import { User } from 'src/app/model/User';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public menuItens = []

  public user: User = null;
  public collapse = null;
  public userMenu = null;

  public dropdownOptions;

  constructor(private apiRequestService: ApiRequestService,
    private cartService: CartService, private router: Router, private userService: UserService,
    private loginService: LoginService,) { }

  ngOnInit() {
    let that = this;
    this.collapse = new bootstrap.Collapse('#menuCollapse', {
      toggle: false
    })


    this.userService.getUser()
      .subscribe((user: User) => {
        if (user) {
          this.user = user;
          this.dropdownOptions = { placement: 'right-start', strategy: "fixed" }
        }
      })

    this.apiRequestService.GetsHttp(environment.urlapi + "/categories")
      .then((data: any) => {
        if (this.cartService.listValidation(data)) {
          that.menuItens = data;


          that.menuItens.unshift({ icon: "fas fa-list-ul", label: "Todos", name: "todos" });
        }
      });
  }

  onOpenuserDropdown() {
    debugger
    this.userMenu.show();
  }

  onOpenCategory(name) {
    if (name != null && name != undefined && name != "") {
      this.collapse.hide();

      this.router.navigate(['products', name]);
    }
  }

  onOpenProfile() {
    if (this.user != null) {
      if (this.user.isAdmin == false) {
        return this.router.navigate(['userprofile'], {
          state: { userId: this.user.id }
        });
      }
    }
  }


  onLogout() {
    if (this.user != null) {
      Swal.fire({
        icon: 'error',
        title: 'Sair?',
        text: "Confirma deslogar do seu usuario?",
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showCancelButton: true,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.loginService.LOGOUT(this.user)
            .then((data: any) => {
              this.router.navigate(['/login']);
            })
        }
      })
    }
  }
}

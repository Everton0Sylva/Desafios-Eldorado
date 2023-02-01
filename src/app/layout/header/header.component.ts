import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { ApiRequestService } from 'src/app/services/apirequest.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public menuItens = []

  public user: any = null;
  public collapse = null;

  constructor(private apiRequestService: ApiRequestService,
    private cartService: CartService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    let that = this;
    this.collapse = new bootstrap.Collapse('#menuCollapse', {
      toggle: false
    })

    this.userService.getUser()
      .subscribe((user: User) => {
        if (user) this.user = user;
      })


    this.apiRequestService.GETS("/products/categories")
      .then((data: any) => {
        let category = {
          name: "",
          icon: "",
          label: ""
        };
        if (this.cartService.listValidation(data)) {
          that.menuItens.push(data.map((cat: any) => {
            category.name = cat;
            if (cat.indexOf("jewel") >= 0) {
              category.icon = "fas fa-gem";
              category.label = "Joalheria"
            } else if (cat.indexOf("elect") >= 0) {
              category.icon = "fas fa-tv";
              category.label = "Eletrônicos"
            } else if (cat.indexOf("clothin") >= 0) {
              if (cat.indexOf("wom") >= 0) {
                category.icon = "fas fa-female";
                category.label = "Moda Feminina"
              } else {
                category.icon = "fas fa-male";
                category.label = "Moda Masculina"
              }
            }

            this.apiRequestService.POST("/categories", category)
              .then((data: any) => {
                debugger
                return category
              }).catch((error: any) => {
                console.log(error)
              })
          }))
        }
        setTimeout(() => {
          category.name = "todos";
          category.icon = "fas fa-list-ul";
          category.label = "Todos"
          that.menuItens.unshift(category);
        }, 500);
      });
  }

  onOpenCategory(name) {
    if (name != null && name != undefined && name != "") {
      this.collapse.hide();

      this.router.navigate(['products', name]);
    }
  }
}

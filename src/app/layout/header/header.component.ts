import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/apirequest.service';
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public menuItens = []

  public collapse = null;

  constructor(private apiRequestService: ApiRequestService, private router: Router,) { }

  ngOnInit() {
    let that = this;
    this.collapse = new bootstrap.Collapse('#menuCollapse', {
      toggle: false
    })
    this.apiRequestService.GETS("/products/categories")
      .then((data: any) => {
        that.menuItens = data.map((cat: any) => {
          let name = cat;
          let icon = "";
          let label = "";
          if (cat.indexOf("jewel") >= 0) {
            icon = "fas fa-gem";
            label = "Joalheria"
          } else if (cat.indexOf("elect") >= 0) {
            icon = "fas fa-tv";
            label = "Eletrônicos"
          } else if (cat.indexOf("clothin") >= 0) {
            if (cat.indexOf("wom") >= 0) {
              icon = "fas fa-female";
              label = "Moda Feminina"
            } else {
              icon = "fas fa-male";
              label = "Moda Masculina"
            }
          }

          return { icon: icon, label: label, name: name }
        });

        that.menuItens.unshift({ icon: "fas fa-list-ul", label: "Todos", name: "todos" });
      });
  }

  onOpenCategory(name) {
    if (name != null && name != undefined && name != "") {
      this.collapse.hide();

      this.router.navigate(['products', name]);
    }
  }
}

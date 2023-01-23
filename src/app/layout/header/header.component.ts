import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public menuItens = []

  constructor() { }

  ngOnInit() {
    this.menuItens.push(
      {icon: "fa-magnifying-glass", label: "Pesquisar", route: "/admissao"}, 
      {icon: "fa-star", label: "Favoritos", route: "/"},
      {icon: "fa-comment-dots", label: "Mensagens", route: "/"}, 
      {icon: "fa-sliders", label: "Ajustes", route: "/"},
      {icon: "fa-landmark", label: "Bancos", route: "/"})
  }

  onToggle(){
    debugger
  }
}

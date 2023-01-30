import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from '../services/apirequest.service';


@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent {

  constructor(private router: Router, private apiRequestService: ApiRequestService) {
  }
  ngOnInit() {
    let token = this.apiRequestService.getToken();
    if (token == "") {
      this.router.navigateByUrl('/login');
    }
  }
}

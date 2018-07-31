import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  anio:number=new Date().getFullYear();
  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}

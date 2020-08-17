import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  goToDashboard(params){
    this.router.navigateByUrl('dashboard', params)
    console.log('llega con el click desde nav-all', params);
  }

}

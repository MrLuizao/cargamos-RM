import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public params;

  constructor( private location: Location, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.params = this.route.snapshot.fragment; 
    console.log('así llega public params en NavBarDashboardComponent', this.params);

  }
  backToLastPage(){
    this.location.back();    
  }

}

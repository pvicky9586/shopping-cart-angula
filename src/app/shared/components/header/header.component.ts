import { Component} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar color="primary">
  <a [routerLink]="['/']"><span>Inicio</span></a>

  <a [routerLink]="['/products']"><span>Products</span></a>    
    <span class="spacer">   </span>
    <app-cart class="mouseHover" (click)="goToChecKout()"></app-cart>
  </mat-toolbar>`, 
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  constructor(private router: Router){}
  goToChecKout(): void {
    this.router.navigate(['/checkout'])

  }

 }

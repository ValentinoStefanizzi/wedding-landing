import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-gift-page',
  templateUrl: './gift-page.component.html',
  styleUrls: ['./gift-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ])
  ],
  imports: [NavbarComponent]
})
export class GiftPageComponent { }

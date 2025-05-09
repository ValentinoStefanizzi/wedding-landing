import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s', style({ transform: 'translateX(0)' }))
      ])
    ])
  ],
  imports: [
    NavbarComponent,
    TranslatePipe
  ]
})
export class InfoPageComponent implements OnInit {
  variant: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.variant = params['variant'];
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-animation-test-page',
  templateUrl: './animation-test-page.component.html',
  styleUrls: ['./animation-test-page.component.scss'],
  standalone: false
})
export class AnimationTestPageComponent {
  isOpen = false;

  openOverlay() {
    this.isOpen = true;
  }

}

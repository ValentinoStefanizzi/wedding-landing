import { Component } from '@angular/core';

@Component({
  selector: 'app-animation-test-page',
  templateUrl: './animation-test-page.component.html',
  styleUrls: ['./animation-test-page.component.css']
})
export class AnimationTestPageComponent {
  isEnabled = false;

  toggleAnimation() {
    this.isEnabled = !this.isEnabled;
  }

}

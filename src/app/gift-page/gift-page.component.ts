import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { TranslationService } from '../services/translation.service';

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
  imports: [NavbarComponent, TranslatePipe]
})
export class GiftPageComponent {
  translationService = inject(TranslationService);

  @ViewChild('zoomDiv') zoomDiv!: ElementRef;
  scale: number = 1;
  initialDistance: number = 1;
  startScale: number = 1;
  startX: number = 0;  // Posizione iniziale X
  startY: number = 0;  // Posizione iniziale Y
  translateX: number = 0;  // Offset corrente X
  translateY: number = 0;  // Offset corrente Y
  isDragging: boolean = false; // Stato del dragging

  zoom(event: MouseEvent) {
    if (this.isMobile()) return; // Prevent mouse events on mobile
    const zoomDiv = event.target as HTMLElement;
    const { offsetX, offsetY, target } = event;
    const { offsetWidth, offsetHeight } = target as HTMLElement;

    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;

    zoomDiv.style.backgroundPosition = `${x}% ${y}%`;
    zoomDiv.style.backgroundSize = `150%`;
  }

  resetZoom(event: MouseEvent) {
    const zoomDiv = event.target as HTMLElement;
    zoomDiv.style.backgroundPosition = `center`;
    zoomDiv.style.backgroundSize = `100%`;
  }

  // 🔍 Zoom con mouse scroll
  onZoom(event: WheelEvent) {
    event.preventDefault();
    this.scale += event.deltaY > 0 ? -0.1 : 0.1;
    this.scale = Math.max(1, Math.min(this.scale, 3)); // Limita lo zoom tra 1x e 3x
    this.updateTransform();
  }

  // ✌️ Inizio pinch-to-zoom
  onTouchStart(event: TouchEvent) {
    if (event.touches.length === 2) {
      this.initialDistance = this.getDistance(event.touches);
      this.startScale = this.scale;
    } else if (event.touches.length === 1) {
      // Inizio del drag
      this.isDragging = true;
      this.startX = event.touches[0].clientX - this.translateX;
      this.startY = event.touches[0].clientY - this.translateY;
    }
  }

  // 🔄 Gestione zoom e drag
  onTouchMove(event: TouchEvent) {
    if (event.touches.length === 2 && this.initialDistance) {
      event.preventDefault();
      const newDistance = this.getDistance(event.touches);
      const scaleChange = newDistance / this.initialDistance;
      this.scale = Math.max(1, Math.min((this.startScale || 1) * scaleChange, 3));
      this.updateTransform();
    } else if (event.touches.length === 1 && this.isDragging) {
      event.preventDefault();
      this.translateX = event.touches[0].clientX - this.startX;
      this.translateY = event.touches[0].clientY - this.startY;
      this.updateTransform();
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (event.touches.length < 2) {
      this.initialDistance = 1;
      this.startScale = 1;
    }
  }

  // 🖱 / ✌️ Fine interazione
  onEndInteraction() {
    this.isDragging = false;
    this.initialDistance = 1;
    this.startScale = 1;
  }

  // 📏 Calcola distanza tra due dita
  getDistance(touches: TouchList): number {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // 🎯 Applica trasformazioni CSS
  updateTransform() {
    this.zoomDiv.nativeElement.style.transform = 
      `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`;
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert(this.translationService.getTranslation('GIFT.COPY_SUCCESS'));
    }).catch(err => {
      console.error(this.translationService.getTranslation('GIFT.COPY_ERROR'), err);
    });
  }

  private isMobile(): boolean {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
}

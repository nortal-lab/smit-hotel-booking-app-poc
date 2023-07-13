import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  styleUrls: ['./hero.component.scss'],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  @Input() imgSrc: string = '';
}

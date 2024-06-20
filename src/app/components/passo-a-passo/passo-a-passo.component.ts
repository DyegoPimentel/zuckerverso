import { Component } from '@angular/core';

@Component({
  selector: 'app-passo-a-passo',
  standalone: true,
  imports: [],
  templateUrl: './passo-a-passo.component.html',
  styleUrl: './passo-a-passo.component.css'
})
export default class PassoAPassoComponent {

  constructor() {
    window.location.href = 'https://github.com/DyegoPimentel/zuckerverso/blob/main/README.md';

  }

}

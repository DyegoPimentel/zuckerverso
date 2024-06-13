import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

}

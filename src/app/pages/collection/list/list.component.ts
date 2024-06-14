import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { MetamaskService } from '../../../services/authentication/metamask.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MenuComponent],
  providers: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent implements OnInit {

  ngOnInit(): void {
  }
}

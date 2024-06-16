import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  hiddenMenu: boolean = false;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    // this._router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.hiddenMenu = (event.url === '/home');
    //   }
    // });
  }



}

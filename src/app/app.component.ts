import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { from } from 'rxjs';
import { MetamaskService } from './services/authentication/metamask.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, RouterOutlet, MatIconModule, MatMenuModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  hiddenMenu: boolean = false;

  textButton: string = '';
  isConnected: boolean = false;

  constructor(
    private _metamaskService: MetamaskService,
  ) {
    console.log('appComponente constructor');
    this._metamaskService.textButton$.subscribe({
      next : (texto: string) => { this.textButton = texto },
      error: (e) => {console.log('error',e);}
    });

    from(this._metamaskService.isConnected())
    .subscribe({
      next: (status) => {
        this.isConnected = status;
      }
    });

  }

  logoutMetamask(): void {
    this._metamaskService.disconnect();
  }

  metamaskButton(): void {
    this._metamaskService.connectToMetaMask();
  }

}

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MetamaskService } from './services/authentication/metamask.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Clipboard,ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, RouterOutlet, MatIconModule, MatMenuModule, RouterModule, MatTooltipModule,ClipboardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  hiddenMenu: boolean = false;

  textButton: string = '';
  isConnected: boolean = false;

  constructor(
    private _metamaskService: MetamaskService,
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar,
  ) {
    this.initializeTheme();

    this._metamaskService.textButton$.subscribe({
      next : (texto: string) => { this.textButton = texto },
      error: (e) => {console.log('error',e);}
    });
  }

  toggleTheme(): void {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  isDarkMode(): boolean {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme) return (savedTheme === 'dark');
    return prefersDarkScheme;
  }

  initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme) {
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (prefersDarkScheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  tooltipMetamaskButton(): string {
    let tooltip: string = this.textButton;

    if (tooltip === localStorage.getItem('zkverso')) tooltip = 'Copiar chave pública';
    return tooltip;
  }

  logoutMetamask(): void {
    this._metamaskService.disconnect();
  }

  metamaskButton(): void {
    if (localStorage.getItem('zkverso') && this._metamaskService.token) {
      this.clipboard.copy(this._metamaskService.token);

      this._snackBar.open('Sua chave pública foi copiada com sucesso 🚀', 'Ok', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['custom-snackbar']
      });
    };

    this._metamaskService.connectToMetaMask();
  }

}

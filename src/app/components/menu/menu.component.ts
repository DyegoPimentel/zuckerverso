import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MetamaskService } from '../../services/authentication/metamask.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, RouterModule],
  providers: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  
  @Input() hiddenMenu?: boolean;
  textButton: string = '';

  constructor(
    private _metamaskService: MetamaskService,
    ) { 
      console.log('menu');
    }

  ngOnInit(): void {
    this._metamaskService.textButton$.subscribe({
      next : (texto: string) => { this.textButton = texto },
      error: (e) => {console.log('error',e);}
    });
  }

  metamaskButton(): void {
    this._metamaskService.connectToMetaMask();
  }
}

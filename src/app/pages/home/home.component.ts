import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {  HttpClientModule } from '@angular/common/http';
import { MetamaskService } from '../../services/authentication/metamask.service';
import { FirebaseService } from '../../services/authentication/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatButtonModule, MatDividerModule, MatIconModule],
  providers: [ FirebaseService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  textButton: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private _metamaskService: MetamaskService,
    private _router: Router,
    ) {
      this._metamaskService.textButton$
      .subscribe({
        next : (texto: string) => {
          this.textButton = texto
        },
        error: (e) => {console.log('error',e);}
      });
  }

  ngOnInit(): void { }

  goToList(): void {
    this._router.navigate(['/collection/list']);
  }
}

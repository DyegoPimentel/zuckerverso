import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {  HttpClientModule } from '@angular/common/http';
import { MetamaskService } from '../../services/authentication/metamask.service';
import { FirebaseService } from '../../services/authentication/firebase.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatButtonModule, MatDividerModule, MatIconModule,],
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

      this.isConnected();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this._unsplashService.getRandomPhotos('natureza')
    // .subscribe({
    //   next: (images) => {
    //     console.log('res', images);
    //     this.bgImages = images;
    //   },
    //   error: (e) => {
    //     console.log('error', e);
    //   }
    // })

    console.log('home');
  }
    
  private isConnected(): void {
    from(this._metamaskService.isConnected())
    .subscribe({
      next: (status) => {
        this.isLoggedIn = status;
      },
    });
  }

  goToList(): void {
    this._router.navigate(['/collection/list']);
  }
}

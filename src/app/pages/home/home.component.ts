import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { UnsplashService } from '../../services/unsplash/unsplash.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MetamaskService } from '../../services/authentication/metamask.service';
import { FirebaseService } from '../../services/authentication/firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatButtonModule, MatDividerModule, MatIconModule,],
  providers: [UnsplashService, FirebaseService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  textButton: string = '';

  constructor(
    private _metamaskService: MetamaskService
    ) {
      this._metamaskService.textButton$
      .subscribe({
        next : (texto: string) => {
          this.textButton = texto
        },
        error: (e) => {console.log('error',e);}
      });
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
  }
    
  

  metamaskButton(): void {
    this._metamaskService.connectToMetaMask();
  }
}

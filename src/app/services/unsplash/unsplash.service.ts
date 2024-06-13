import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private apiUrl = 'https://api.unsplash.com';
  private accessKey = environment.unsplashAccessKey;

  constructor(private http: HttpClient) { 

  }

  getRandomPhotos(query: string, count: number = 1): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Client-ID ${this.accessKey}`
    });
    return this.http.get(`${this.apiUrl}/photos/random?query=${query}&count=${count}`, { headers });
  }
}

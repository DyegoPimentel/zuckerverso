import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenseaService {

  private httpClient: HttpClient = inject(HttpClient);
  private url: string = 'https://api.opensea.io/api/v2';
  private API_KEY: any = environment.OPENSEA_API_KEY;

  constructor() { }

  getCollection(collection_slug: string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'x-api-key':this.API_KEY}), 
    };
    return this.httpClient.get<any>(this.url+'/collections/'+collection_slug, requestOptions);
  }

  getNftsByCollection(collection_slug: string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'x-api-key':this.API_KEY}), 
    };
    return this.httpClient.get<any>(this.url+'/collection/'+collection_slug+'/nfts', requestOptions);
  }
}

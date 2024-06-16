import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MetamaskService } from '../authentication/metamask.service';
import { Nft, NftsByCollection } from './opensea';

@Injectable({
  providedIn: 'root'
})
export class OpenseaService {

  private httpClient: HttpClient = inject(HttpClient);
  private url: string = 'https://api.opensea.io/api/v2';
  private API_KEY: string = environment.OPENSEA_API_KEY;

  constructor(private _metamaskService: MetamaskService) { }

  getNFT(chain:string, contract:string, nfts:string): Observable<Nft> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({accept: 'application/json', 'x-api-key':this.API_KEY}), 
    };
    return this.httpClient.get<Nft>(this.url+'/chain/'+chain+'/contract'+contract+'/nfts'+nfts, requestOptions);
  }

  getCollection(collection_slug: string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'x-api-key':this.API_KEY}), 
    };
    return this.httpClient.get<any>(this.url+'/collections/'+collection_slug, requestOptions);
  }

  getNftsByCollection(collection_slug: string): Observable<NftsByCollection> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({accept: 'application/json', 'x-api-key':this.API_KEY}), 
    };
    return this.httpClient.get<NftsByCollection>(this.url+'/collection/'+collection_slug+'/nfts', requestOptions);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  private contractCollection = '0x1b41d54b3f8de13d58102c50d7431fd6aa1a2c48';

  constructor(private _metamaskService: MetamaskService) { }

  comprar(nft: Nft):void {
    console.log('Esta conectado?', this._metamaskService.isConnected());
    console.log('comprar nft', nft);
  }

  getNft(identifier:string, contract?:string, chain?:string,): Observable<{nft: Nft}> {
    const headers = new HttpHeaders({
      accept: 'application/json',
      'x-api-key': this.API_KEY
    });

    return this.httpClient.get<{nft: Nft}>(this.url+'/chain/'+(chain || 'ethereum')+'/contract/'+(contract || this.contractCollection)+'/nfts/'+identifier, {headers});
  }

  getCollection(collection_slug: string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'x-api-key':this.API_KEY}), 
    };
    return this.httpClient.get<any>(this.url+'/collections/'+collection_slug, requestOptions);
  }

  getNftsByCollection(collection_slug: string, limit?: number, next?: string): Observable<NftsByCollection> {
    const headers = new HttpHeaders({
      accept: 'application/json',
      'x-api-key': this.API_KEY
    });

    let params = new HttpParams();
    // The number of NFTs to return. Must be between 1 and 200. Default: 50
    if (limit) params = params.append('limit', limit.toString());
    // The cursor for the next page of results. This is returned from a previous request.
    if (next) params = params.append('next', next);
    
    return this.httpClient.get<NftsByCollection>(this.url+'/collection/'+collection_slug+'/nfts', {headers, params});
  }
}

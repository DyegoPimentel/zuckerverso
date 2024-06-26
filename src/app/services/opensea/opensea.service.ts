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

  private contractCollection: string = '0xa127b34dccdc858e312db2d99b517973c25fb1cc';
  private collection_slug: string = 'zuckerverso';
  private chain: string = 'matic';

  constructor(private _metamaskService: MetamaskService) { }

  comprar(nft: Nft):void {
    const url = `https://opensea.io/assets/${this.chain}/${this.contractCollection}/${nft.identifier}`;
    window.open(url, '_blank');
  }

  sendPurchaseRequest(chain: string, protocol: string, data: any): Observable<any> {
    const url = `${this.url}/orders/${this.chain}/${protocol}/offers`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.API_KEY
    });

    return this.httpClient.post(url, data, { headers: headers });
  }

  getNft(identifier:string, contract?:string, chain?:string,): Observable<{nft: Nft}> {
    const headers = new HttpHeaders({
      accept: 'application/json',
      'x-api-key': this.API_KEY
    });

    return this.httpClient.get<{nft: Nft}>(this.url+'/chain/'+(chain || this.chain)+'/contract/'+(contract || this.contractCollection)+'/nfts/'+identifier, {headers});
  }

  getCollection(): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({'x-api-key':this.API_KEY}), 
    };
    return this.httpClient.get<any>(this.url+'/collections/'+this.collection_slug, requestOptions);
  }

  getNftsByCollection(limit?: number, next?: string): Observable<NftsByCollection> {
    const headers = new HttpHeaders({
      accept: 'application/json',
      'x-api-key': this.API_KEY
    });

    let params = new HttpParams();
    // The number of NFTs to return. Must be between 1 and 200. Default: 50
    if (limit) params = params.append('limit', limit.toString());
    // The cursor for the next page of results. This is returned from a previous request.
    if (next) params = params.append('next', next);
    
    return this.httpClient.get<NftsByCollection>(this.url+'/collection/'+this.collection_slug+'/nfts', {headers, params});
  }
}

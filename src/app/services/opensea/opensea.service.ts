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

  private contractCollection: string = '0x2872018ed4e1533998fbaecad64fd5200ab12804';
  private collection_slug: string = 'zuckerverso';
  private chain: string = 'matic';

  constructor(private _metamaskService: MetamaskService) { }

  comprar(nft: Nft):void {
    console.log('Esta conectado?', this._metamaskService.isConnected());
    console.log('comprar nft', nft);

    const url = `https://opensea.io/assets/${this.chain}/${this.contractCollection}/${nft.identifier}`;
    window.open(url, '_blank');
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

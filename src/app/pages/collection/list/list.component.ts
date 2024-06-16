import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { MetamaskService } from '../../../services/authentication/metamask.service';
import { OpenseaService } from '../../../services/opensea/opensea.service';
import { CommonModule } from '@angular/common';
import { Nft, NftsByCollection } from '../../../services/opensea/opensea';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MenuComponent, MatTooltipModule, MatIconModule, MatMenuModule,RouterModule],
  providers: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent implements OnInit {
  nftList: NftsByCollection | undefined;

  constructor(
    private route: ActivatedRoute,
    private _openSea: OpenseaService,
    private _metaMaskService: MetamaskService
    ) { }

  ngOnInit(): void {
    this.getNfts();
  }

  comprar(nft: Nft):void {
    console.log('Esta conectado?', this._metaMaskService.isConnected());
    console.log('comprar nft', nft);
  }

  getNfts(): void {
    this._openSea.getNftsByCollection('piratenation')
    .subscribe((res: NftsByCollection) => {
      console.log('res opensea',res);
      this.nftList = res;
    })
  }
}

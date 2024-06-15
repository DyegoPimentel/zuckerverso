import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { MetamaskService } from '../../../services/authentication/metamask.service';
import { OpenseaService } from '../../../services/opensea/opensea.service';
import { CommonModule } from '@angular/common';
import { nftsByCollection } from './list';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  providers: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent implements OnInit {

  nftList: nftsByCollection | undefined;

  constructor(
    private _openSea: OpenseaService,
    private _metaMaskService: MetamaskService
    ) { }

  ngOnInit(): void {
    this.getNfts();
  }

  getNfts(): void {
    this._openSea.getNftsByCollection('piratenation')
    .subscribe((res: nftsByCollection) => {
      console.log('res opensea',res);
      this.nftList = res;
    })
  }
}

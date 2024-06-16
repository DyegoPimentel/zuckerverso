import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { MetamaskService } from '../../../services/authentication/metamask.service';
import { OpenseaService } from '../../../services/opensea/opensea.service';
import { CommonModule } from '@angular/common';
import { Nft, NftsByCollection } from '../../../services/opensea/opensea';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { identity } from 'rxjs';

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
  mockCardArray: number[] = Array(32).fill(0).map((x, i) => i);
  cardsLoaded: string[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _openSea: OpenseaService,
    private _metaMaskService: MetamaskService,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getNfts();
  }

  comprar(nft: Nft):void {
    console.log('Esta conectado?', this._metaMaskService.isConnected());
    console.log('comprar nft', nft);
  }

  goToNftDetail(nft: any): void {
    this._router.navigate(['/collection/nft', nft.identifier]);
  }

  getNfts(): void {
    this._openSea.getNftsByCollection('piratenation',200)
    .subscribe({
      next: (res: NftsByCollection) => {
        console.log('res opensea',res);
        this.nftList = res;
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open('Ops... Este Zucker está em outro universo 🚀', 'Desmaterializar', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
        this._router.navigate(['/collection/list']);
      },
      complete: () => {
      }

    })
  }

  isVisible(identify: string): boolean {
    return this.cardsLoaded.some(id => identify = id);
  }

  imageLoaded(id: string): void {
    this.cardsLoaded.push(id);
  }
}

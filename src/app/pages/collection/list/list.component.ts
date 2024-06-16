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
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MenuComponent, MatTooltipModule, MatIconModule, MatMenuModule,RouterModule,ClipboardModule],
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
    public _openseaService: OpenseaService,
    private _metaMaskService: MetamaskService,
    private _snackBar: MatSnackBar,
    private clipboard: Clipboard
    ) { 
  }

  ngOnInit(): void {
    this.getNfts();
  }

  copyUrl(nftId: string): void {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const path = this._router.url; 

    this.clipboard.copy(`${protocol}//${host}/collection/nft/${nftId}`);

    this._snackBar.open('Este Zucker está preso na sua área de transferência. Seja rápido, ele é escorregadio... ⏳', 'Ok', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['custom-snackbar']
    });
    
  }

  goToNftDetail(nft: any): void {
    this._router.navigate(['/collection/nft', nft.identifier]);
  }

  getNfts(): void {
    this._openseaService.getNftsByCollection('piratenation',200)
    .subscribe({
      next: (res: NftsByCollection) => {
        console.log('res opensea',res);
        this.nftList = res;
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open('Acho que os Zuckers estão aprontando alguma coisa... 🧐', 'kaboom', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
        this._router.navigate(['/home']);
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

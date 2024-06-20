import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nft } from '../../../services/opensea/opensea';
import { OpenseaService } from '../../../services/opensea/opensea.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MetamaskService } from '../../../services/authentication/metamask.service';

@Component({
  selector: 'app-nft',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatRippleModule],
  templateUrl: './nft.component.html',
  styleUrl: './nft.component.css'
})
export default class NftComponent implements OnInit {
  
  nft: Nft = {} as Nft;

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    public _openseaService: OpenseaService,
    private _snackBar: MatSnackBar,
    private _metaMaskService: MetamaskService,
    
  ) {
    if (this._route.snapshot.paramMap.get('id')) {
      this.nft.identifier = this._route.snapshot.paramMap.get('id') ?? '';
    } else {
      this._router.navigate(['/collection']);
    }
  }
  
  ngOnInit(): void {
    this.getNft(this.nft.identifier);
  }

  quebraLinha(texto: string): string {
    return texto.replace(/\\n\\/g, '<br>');
  }

  getNft(idNft: string): void {
    this._openseaService.getNft(idNft)
    .subscribe({
      next: (res) => {
        this.nft = res.nft;
        console.log('nftpage', res.nft);
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open('Ops... Este Zucker está em outro metaverso 🚀', 'Desmaterializar', {
          horizontalPosition: 'start',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
        this._router.navigate(['/collection/list']);
      }
    })
  }
}

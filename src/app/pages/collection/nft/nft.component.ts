import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nft } from '../../../services/opensea/opensea';
import { OpenseaService } from '../../../services/opensea/opensea.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MetamaskService } from '../../../services/authentication/metamask.service';
import { FirebaseService } from '../../../services/authentication/firebase.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-nft',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatRippleModule],
  templateUrl: './nft.component.html',
  styleUrl: './nft.component.css'
})
export default class NftComponent implements OnInit {
  
  nft: Nft = {} as Nft;
  random: number = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  lore: any;

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    public _openseaService: OpenseaService,
    private _snackBar: MatSnackBar,
    private _metaMaskService: MetamaskService,
    private _firebase: FirebaseService,
    private _cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
    
  ) {
    if (this._route.snapshot.paramMap.get('id')) {
      this.nft.identifier = this._route.snapshot.paramMap.get('id') ?? '';
    } else {
      this._router.navigate(['/collection']);
    }
  }
  
  ngOnInit(): void {
    this.getNft(this.nft.identifier);
    this.getLore(this.nft.identifier);
  }

  descricaoNft(nft: Nft): string {

    let text = `Este Zucker foi visto no metaverso ${this.random}, existem relatos de que ele está trabalhando em uma máquina de replicação de indivíduos para conseguir obter maiores ganhos das recompensas distribuídas aos metaversos.
    
    Sua identidade real ainda não foi revelada, mas sentinelas multiversais foram enviadas em uma missão para descobrir tudo sobre este engenhoso Zucker. Volte aqui em breve para saber as informações em detalhes.
    `;
return this.lore?.description?.replace(/\\n\\/g, '<br>') || text;
    // return this.sanitizer.bypassSecurityTrustHtml(this.lore?.description?.replace(/\\n\\/g, '<br>') || text)

  }

  getLore(idNft: string): void {
    this._firebase.getLoreById(idNft).subscribe(lore => this.lore = lore);
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

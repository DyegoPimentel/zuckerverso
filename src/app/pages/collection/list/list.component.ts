import { Component, OnInit } from '@angular/core';
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
import { FirebaseService, User } from '../../../services/authentication/firebase.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { Filters } from './list';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,MatSelectModule, MatTooltipModule, MatIconModule, MatMenuModule,RouterModule,ClipboardModule,MatButtonModule, MatDividerModule],
  providers: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent implements OnInit {
  nftList: NftsByCollection | undefined;
  nftListFiltered: Nft[] | undefined;
  mockCardArray: number[] = Array(32).fill(0).map((x, i) => i);
  cardsLoaded: string[] = [];
  user: User | undefined;
  token: string | undefined = undefined;
  listMode: 'list'| 'grid' = 'grid';
  filters: Filters = {
    favorites: false
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public _openseaService: OpenseaService,
    private _metaMaskService: MetamaskService,
    private _firebaseService: FirebaseService,
    private _snackBar: MatSnackBar,
    private clipboard: Clipboard,
    private db: AngularFireDatabase
    ) { 
      this._firebaseService.user$.subscribe(user => this.user = user);
      this._metaMaskService.tokenMetamask$.subscribe(token => this.token = token);
  }

  ngOnInit(): void {
    this.getNfts();
  }

  copyUrl(nftId: string): void {
    const protocol = window.location.protocol;
    const host = window.location.host;

    this.clipboard.copy(`${protocol}//${host}/collection/nft/${nftId}`);

    this._snackBar.open('Este Zucker está preso na sua área de transferência. Seja rápido, ele é escorregadio... ⏳', 'Ok', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['custom-snackbar']
    });
    
  }

  filterBy(filtro: 'favorites'): void {
    if (filtro === 'favorites') {
      this.filters.favorites = !this.filters.favorites; 
      
      this.filters.favorites 
      ? this.nftListFiltered = this.nftList?.nfts.filter(nft => this.user?.favorites.some(value => value === nft.identifier))
      : this.nftListFiltered = this.nftList?.nfts;
    }
  }

  setFavorite(nft: Nft): void {
    if (!this.user || !this.token) return;


    const isFavorite: boolean = this.user.favorites.some(fav => fav === nft.identifier);
    if (isFavorite) {
      this.user.favorites = this.user.favorites.filter(res => res !== nft.identifier);
    } else {
      this.user.favorites.push(nft.identifier);
    }
  
    this._firebaseService.updateUser(this.token, this.user);
  }

  changeList(estilo: 'list' | 'grid'): void {
    if (estilo !== this.listMode) this.listMode = estilo;
    console.log(this.listMode);
  }

  goToNftDetail(nft: any): void {
    this._router.navigate(['/collection/zucker', nft.identifier]);
  }

  getNfts(): void {
    this._openseaService.getNftsByCollection(200)
    .subscribe({
      next: (res: NftsByCollection) => {
        this.nftList = res;
        this.nftListFiltered = res.nfts;
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

  displayFavorite(id: string): boolean {
    if (!this.user) return false;
    return this.user?.favorites?.some((el:string) => el === id);
  }

  favoriteTooltip(id: string) {
    if (this.displayFavorite(id)) return 'Este Zucker é um dos seus favoritos'
    if (localStorage.getItem('zkverso')) return 'Favorite este Zucker' ;
    return 'Conecte-se para favoritar este Zucker';
  }

  isVisible(identify: string): boolean {
    return this.cardsLoaded.some(id => identify = id);
  }

  imageLoaded(id: string): void {
    this.cardsLoaded.push(id);
  }
}

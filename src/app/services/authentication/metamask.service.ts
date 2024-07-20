import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, from, of } from 'rxjs';
import { ethers } from 'ethers';
import { tick } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';


declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {

  private tokenMetamaskSubject = new BehaviorSubject<string | undefined>('');
  public tokenMetamask$ = this.tokenMetamaskSubject.asObservable();

  private textButtonSubject = new BehaviorSubject<string>('Conecte sua Metamask');
  public textButton$ = this.textButtonSubject.asObservable();

  private provider: ethers.BrowserProvider | undefined;
  private signer: ethers.Signer | undefined;

  constructor(
    private _firebaseService: FirebaseService,
    private _snackBar: MatSnackBar,
  ) { 
    //this.provider = new ethers.BrowserProvider(window.ethereum);

    try {
      if (this.isMetaMaskInstalled()) {
        if (window.ethereum.isConnected()) {
          this.verifyToken();
        } else {
          localStorage.removeItem('zkverso');
        } 
        this.setTextButton();
  
      } else {
        console.log('Instale a metamask para fazer o login.');
      }
    } catch (error: any) {
      this.cleanToken();
      console.log('catch constructor', error);
    }
  }

  verifyToken(): void {

    from(window.ethereum.request({ method: 'eth_requestAccounts' }))
    .subscribe({
      next: (accounts) => {
        const acc: string[] = (accounts as string[]);
     
        if (localStorage.getItem('zkverso')) {
          this.tokenMetamaskSubject.next(localStorage.getItem('zkverso') || undefined);
          if (this.token) {
            this.setTextButton();
            this.setUser();
          }
        }
      },
      error: (err) => {
        console.error('Error requesting accounts:', err);
        this.cleanToken();
      }
    });
  }

  setTextButton(): void {
    let text: any = 'Conecte sua Metamask';
    const token: string | undefined = this.token;

    if (token) {
      const prefix = token.substring(0, 4);
      const suffix = token.substring(token.length - 4);
      text = `${prefix}...${suffix}`;
      localStorage.setItem('zkverso', text);
    };

    if (localStorage.getItem('zkverso')) {
      text = localStorage.getItem('zkverso');
    };

    this.textButtonSubject.next(text);
  }

  setUser(): void {
    this._firebaseService.getUserById(this.token)
    .subscribe({
      next: (user) => {
        if (!user) {
          user = {favorites: []};
          if (user && this.token) this._firebaseService.addUser(this.token, user);
        }
        this._firebaseService.setUserLocal(user);
      },
      error: (error) => {
        console.log('setUser error', error);
      }
    })
  }

  get token(): string | undefined {
    let token: string | undefined = undefined;
    this.tokenMetamask$.subscribe({
      next: (tkn) => {
        token = tkn;
      }
    });
    return token;
  }

  async connectToMetaMask(): Promise<any> {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.BrowserProvider(window.ethereum);
  
      try {
        await this.provider.send('eth_requestAccounts', []);
        this.signer = await this.provider.getSigner();
        this.tokenMetamaskSubject.next(await this.signer.getAddress());
  
        if (this.token) this.setUser();
        this.setTextButton();
        const provider = this.provider;
        const signer = this.signer;
        return { provider, signer };
      } catch (error: any) {
        this.cleanToken();
        if (error.code === 4001) {
          console.error('O usuário rejeitou a solicitação de conexão com MetaMask');
        } else if (error.code === -32002) {
          console.error('Existe uma requisição em andamento, verifique sua MetaMask');
        } else {
          console.error('Erro ao conectar, verifique sua MetaMask');
        }
      }
    } else {
      const snackBarRef: MatSnackBarRef<SimpleSnackBar> = this._snackBar.open('Instale a carteira MetaMask para se conectar', 'Ir para o site da MetaMask', {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['custom-snackbar']
      });
  
      snackBarRef.onAction().subscribe(() => {
        window.open('https://metamask.io', '_blank');
      });
    }
  }

  cleanToken(): void {
    localStorage.clear()
    this.tokenMetamaskSubject.next(undefined);
  }

  disconnect() {
    this.provider?.destroy();
    this.provider = undefined;
    this.signer = undefined;
    this.tokenMetamaskSubject.next(undefined);
    this._firebaseService.setUserLocal(undefined)
    if (localStorage.getItem('zkverso')) localStorage.removeItem('zkverso');
    this.setTextButton();
  }

  isMetaMaskInstalled(): boolean {
    return typeof window.ethereum !== 'undefined';
  }

  async getAccountAddress(): Promise<string | undefined> {
    if (this.signer) {
      return await this.signer.getAddress();
    }
    return undefined;
  }
  
}

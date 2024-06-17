import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, from, of } from 'rxjs';
import { ethers } from 'ethers';
import { tick } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';


declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {

  private tokenMetamaskSubject = new BehaviorSubject<string>('');
  public tokenMetamask$ = this.tokenMetamaskSubject.asObservable();

  private textButtonSubject = new BehaviorSubject<string>('');
  public textButton$ = this.textButtonSubject.asObservable();

  private provider: ethers.BrowserProvider | undefined;
  private signer: ethers.Signer | undefined;
  isRequestingAccounts: boolean = false;

  items: any;
  constructor(private _firebaseService: FirebaseService) { 
    this.provider = new ethers.BrowserProvider(window.ethereum);

    if (this.isMetaMaskInstalled()) {
      from(this.isConnected())
      .subscribe({
        next: (logged) => {
          console.log('esta logado?', logged);
          if (logged) {
            this.setUser()
          } else {
            localStorage.removeItem('zkverso');
          } 

          this.setTextButton();
        },
      });
    } else {
      console.log('Instale a metamask para fazer o login.');
    }
    
    
  }

  setTextButton(): void {
    let text: any = 'Conecte sua Metamask';
    const token: string = this.token;

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
    console.log('setUser', this.token);
    // this._firebaseService.getUserById(tokenMetamask: string): Observable<any> {
    //   return this.firestore.collection('users').doc(tokenMetamask).valueChanges();
    // }
  }

  get token(): string {
    let token: string = '';
    this.tokenMetamask$.subscribe({
      next: (tkn) => {
        token = tkn;
      }
    });
    return token;
  }

  async connectToMetaMask(): Promise<any> {
    if (this.provider) {
      try {
        await this.provider.send('eth_requestAccounts', []);
        this.signer = await this.provider.getSigner();
        this.tokenMetamaskSubject.next(await this.signer.getAddress());
        this.setTextButton();
        const provider = this.provider;
        const signer = this.signer;
        return { provider, signer};
      } catch (error: any) {
        if (error.code === 4001) { // Usuário rejeitou a solicitação
          console.error('O usuário rejeitou a solicitação de conexão com MetaMask');
        } else if (error.code === -32002) { // Requisição em andamento
          console.error('Existe uma requisição em andamento, verifique sua MetaMask');
        }
        else {
          console.error('Erro ao conectar, verifique sua MetaMask');
        }
      }
    }
  }

  async isConnected(): Promise<boolean> {
    if (!this.provider) return false;

    try {
      this.signer = await this.provider.getSigner();
      const token: string = await this.signer.getAddress();
      console.log('token isConnected service', token);
      this.tokenMetamaskSubject.next(token);

      const address = await this.signer.getAddress();
      return !!address;
    } catch (error) {
      console.log('isconnec error', error);
      return false;
    }
  }

  disconnect() {
    this.provider?.destroy();
    this.provider = undefined;
    this.signer = undefined;
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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ethers } from 'ethers';
import { tick } from '@angular/core/testing';


declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {

  tokenMetamask$: Subject<string> = new Subject<string>();

  private textButtonSubject = new BehaviorSubject<string>('Conecte sua Metamask');
  public textButton$ = this.textButtonSubject.asObservable();

  private isConnecting: boolean = false;

  private provider: ethers.BrowserProvider | undefined;
  private signer: ethers.Signer | undefined;
  isRequestingAccounts: boolean = false;

  constructor() { 
    if (this.isMetaMaskInstalled()) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      console.log('Instale a metamask para fazer o login.');
    }
    
    
  }

  setTextButton(token: string | undefined): void {
    if (!token) return;
    const prefix = token.substring(0, 4);
    const suffix = token.substring(token.length - 4);
    this.textButtonSubject.next(`${prefix}...${suffix}`);
  }


  async connectToMetaMask(): Promise<void> {
    if (this.provider) {
      try {
        await this.provider.send('eth_requestAccounts', []);
        this.signer = await this.provider.getSigner();
        this.setTextButton(await this.signer.getAddress());
        console.log('Conectado com a conta: ', this.signer.getAddress());
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
      await this.provider.send('eth_requestAccounts', []);
      this.signer = await this.provider.getSigner();
      this.setTextButton(await this.signer.getAddress());

      const address = await this.signer.getAddress();
      return !!address;
    } catch (error) {
      return false;
    }
  }
  
  async checkIfLoggedIn(): Promise<boolean> {
    if (!this.provider) {
      return false;
    }

    try {
      const accounts = await this.provider.listAccounts();
      console.log('esta conectada 1: ', accounts);
      return accounts.length > 0;
    } catch (error) {
      console.error('Error checking if logged in:', error);
      return false;
    }
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

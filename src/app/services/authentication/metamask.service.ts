import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {

  private web3: Web3 | undefined;

  constructor(
    private _firebaseService: FirebaseService
    ) { 
    this.verifyMetamaskInstaled();
  }

  async connectMetamask(): Promise<any> {
    try {
      const accounts = await window.ethereum!.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      console.log('Conectado com a conta: ', account);
    } catch (error: any) {
      if (error.code === 4001) { // Usuário rejeitou a solicitação
        console.error('O usuário rejeitou a solicitação de conexão com MetaMask');
      } else {
        console.error('Erro ao conectar com MetaMask', error);
      }
    }
  }

  private verifyMetamaskInstaled(): void {
    console.log('window',window)
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      console.log('this.web3', this.web3)
    } else {
      console.error('MetaMask não está instalado!');
    }
  }

}

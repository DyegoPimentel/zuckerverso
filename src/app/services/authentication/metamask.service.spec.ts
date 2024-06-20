import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ethers } from 'ethers';
import { MetamaskService } from './metamask.service';
import { FirebaseService } from './firebase.service';

// Mocking the FirebaseService
class MockFirebaseService {
  getUserById(token: string) {
    return of({}); // Mocked response
  }
  addUser(token: string, user: any) {}
  setUserLocal(user: any) {}
}

    // Mocking ethers.BrowserProvider and ethers.Signer
    const mockSigner = {
      getAddress: jasmine.createSpy('getAddress').and.returnValue(Promise.resolve('0x1234'))
    };

const originalBrowserProvider = ethers.BrowserProvider;
ethers.BrowserProvider = function() {
  return {
    getSigner: jasmine.createSpy('getSigner').and.returnValue(Promise.resolve(mockSigner)),
    send: jasmine.createSpy('send'),
    _send: jasmine.createSpy('_send'),
    getRpcError: jasmine.createSpy('getRpcError'),
    // Adicione outras propriedades e métodos necessários
  };
} as any;

describe('MetamaskService', () => {
  let service: MetamaskService;
  let mockFirebaseService: MockFirebaseService;

  beforeEach(() => {
    // Mocking window.ethereum
    (window as any).ethereum = {
      isConnected: jasmine.createSpy('isConnected').and.returnValue(true),
      send: jasmine.createSpy('send'),
      on: jasmine.createSpy('on')
    };



    spyOn(ethers, 'BrowserProvider').and.returnValue({
      getSigner: jasmine.createSpy('getSigner').and.returnValue(Promise.resolve(mockSigner)),
      // Adicione as demais propriedades e métodos necessários para satisfazer o tipo 'BrowserProvider'
      send: jasmine.createSpy('send'),
      _send: jasmine.createSpy('_send'),
      getRpcError: jasmine.createSpy('getRpcError'),
      // Adicione outras propriedades e métodos necessários
    } as unknown as ethers.BrowserProvider);
    

    TestBed.configureTestingModule({
      providers: [
        MetamaskService,
        { provide: FirebaseService, useClass: MockFirebaseService }
      ]
    });

    service = TestBed.inject(MetamaskService);
    mockFirebaseService = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if MetaMask is installed', () => {
    expect(service.isMetaMaskInstalled()).toBe(true);
  });

  it('should set the text button when MetaMask is connected', async () => {
    const spySetTextButton = spyOn(service, 'setTextButton').and.callThrough();

    await service.connectToMetaMask();

    expect(spySetTextButton).toHaveBeenCalled();
    expect(service.token).toBe('0x1234');
    service.textButton$.subscribe(value => {
      expect(value).toBe('0x12...1234');
    });
  });

  it('should set user when MetaMask is connected', async () => {
    const spySetUser = spyOn(service, 'setUser').and.callThrough();

    await service.connectToMetaMask();

    expect(spySetUser).toHaveBeenCalled();
  });

  it('should disconnect from MetaMask', () => {
    service.disconnect();

    expect(service['provider']).toBeUndefined();
    expect(service['signer']).toBeUndefined();
    expect(service.token).toBeUndefined();
    service.textButton$.subscribe(value => {
      expect(value).toBe('Conecte sua Metamask');
    })
  });

  afterEach(() => {
    ethers.BrowserProvider = originalBrowserProvider;
  });
});

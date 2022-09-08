import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  storageKeyUser: string = '@challengeEbarn:User'
  storageKeyToken: string = '@challengeEbarn:Token'

  getUserOrToken(storageKey: string): string {
    return storageKey.includes('user') ? this.storageKeyUser : storageKey.includes('token') ? this.storageKeyToken : '';
  }

  clearStorage(storageKey: string) {
    localStorage.setItem(this.getUserOrToken(storageKey), '');
    localStorage.removeItem(this.getUserOrToken(storageKey));
  }

  getStorage(storageKey: string) {
    let storage = localStorage.getItem(this.getUserOrToken(storageKey));
    let response = storage ? JSON.parse(storage) : '';
    return response;
  }

  setStorage(storageKey: string, data: any) {
    localStorage.setItem(this.getUserOrToken(storageKey), JSON.stringify(data));
  }
}

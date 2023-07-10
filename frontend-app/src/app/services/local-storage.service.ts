import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly hotelAppStorageKey = 'hotel-app';

  public getData(): string | null {
    return localStorage.getItem(this.hotelAppStorageKey);
  }

  public saveData(jsonData: string) {
    return localStorage.setItem(this.hotelAppStorageKey, jsonData);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }
}

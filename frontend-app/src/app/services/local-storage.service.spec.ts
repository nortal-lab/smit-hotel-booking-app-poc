import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let storage: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    storage = window.localStorage;
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should save and retrieve data', () => {
    const jsonData = JSON.stringify({ key: 'test' });
    service.saveData(jsonData);
    expect(storage.getItem(service['hotelAppStorageKey'])).toEqual(jsonData);
  });

  it('should remove data', () => {
    const jsonData = JSON.stringify({ key: 'test' });
    service.saveData(jsonData);
    service.removeData(service['hotelAppStorageKey']);
    expect(storage.getItem(service['hotelAppStorageKey'])).toBeNull();
  });
});

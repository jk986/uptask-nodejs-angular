import { TestBed } from '@angular/core/testing';

import { UsuarioLoggService } from './usuario-logg.service';

describe('UsuarioLoggService', () => {
  let service: UsuarioLoggService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioLoggService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AudienciaService } from './audiencia.service';

describe('AudienciaService', () => {
  let service: AudienciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudienciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

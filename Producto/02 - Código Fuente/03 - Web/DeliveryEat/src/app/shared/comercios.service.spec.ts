import { TestBed, inject } from '@angular/core/testing';

import { ComerciosService } from './comercios.service';

describe('ComerciosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComerciosService]
    });
  });

  it('should be created', inject([ComerciosService], (service: ComerciosService) => {
    expect(service).toBeTruthy();
  }));
});

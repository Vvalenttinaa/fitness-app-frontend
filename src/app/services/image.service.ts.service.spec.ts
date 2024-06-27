import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service.ts.service';

describe('ImageServiceTsService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

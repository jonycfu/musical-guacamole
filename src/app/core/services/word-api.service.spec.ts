import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WordApiService } from './word-api.service';

describe('WordApiService', () => {
  let service: WordApiService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WordApiService],
    });

    service = TestBed.get(WordApiService);
    httpCtrl = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpCtrl.verify());

  it('should be created', () => {
    const service: WordApiService = TestBed.get(WordApiService);
    expect(service).toBeTruthy();
  });
});

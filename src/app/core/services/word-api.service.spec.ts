import { IScore } from './../../game/reducers/game.reducer';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WordApiService } from './word-api.service';
import { of } from 'rxjs';

describe('WordApiService', () => {
  let service: WordApiService;
  let httpCtrl: HttpTestingController;
  let httpClientSpy: { get: jasmine.Spy; put: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WordApiService],
    });

    service = TestBed.get(WordApiService);
    httpCtrl = TestBed.get(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  afterEach(() => httpCtrl.verify());

  it('should be created', () => {
    const apiService: WordApiService = TestBed.get(WordApiService);
    expect(apiService).toBeTruthy();
  });

  it('should return list of words', () => {
    service
      .getSecretWordList()
      .subscribe(wordsList => expect(wordsList).toEqual(expectedWordList));

    const expectedWordList: string[] = ['3dhubs', 'order'];
    const req = httpCtrl.expectOne('http://127.0.0.1:1337/secret-words');
    expect(req.request.method).toBe('GET');
    req.flush(expectedWordList);
  });

  it('should return list of scores', () => {
    const expectedScoresList: IScore[] = [
      {
        name: 'John Bell',
        score: 390,
        datetime: new Date('December 17, 1995 03:24:00'),
      },
      {
        name: 'Jill Bell',
        score: 490,
        datetime: new Date('October 19, 1995 03:24:00'),
      },
    ];
    service
      .getHighScoresList()
      .subscribe(scoresList => expect(scoresList).toEqual(expectedScoresList));

    const req = httpCtrl.expectOne('http://127.0.0.1:1337/high-scores');
    expect(req.request.method).toBe('GET');
    req.flush(expectedScoresList);
  });

  it('should return status of score entry saves', () => {
    const expectedEntryResponse = {
      payload: {
        code: 200,
        message: `Update Success:`,
      },
    };
    service
      .updateScoreEntries({ score: 100, name: 'saitama', datetime: new Date() })
      .subscribe(res => {
        expect(res).toEqual(expectedEntryResponse);
      });

    const req = httpCtrl.expectOne('http://127.0.0.1:1337/high-scores');
    req.flush(expectedEntryResponse);
  });

  it('should throw error if improper score entry is not provided', () => {
    const expectedError = new Error(
      'Invalid score entry. Provide all props: score, name, datetime'
    );
    const badEntry = { score: 100, datetime: new Date() };
    expect(() => service.updateScoreEntries(badEntry)).toThrow(expectedError);
  });
});

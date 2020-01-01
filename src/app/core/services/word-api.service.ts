import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:1337';

@Injectable({
  providedIn: 'root',
})
export class WordApiService {
  constructor(private http: HttpClient) {}

  public getSecretWordList(): Observable<any> {
    return this.http.get(`${API_URL}/secret-words`);
  }

  public getHighScoresList(): Observable<any> {
    return this.http.get(`${API_URL}/high-scores`);
  }

  public updateScoreEntries(scoreEntry): Observable<any> {
    if (scoreEntry.name && scoreEntry.datetime && scoreEntry.score) {
      return this.http.put(`${API_URL}/high-scores`, scoreEntry);
    } else {
      throw new Error(
        'Invalid score entry. Provide all props: score, name, datetime'
      );
    }
  }
}

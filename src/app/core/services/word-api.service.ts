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
    console.log('calling GET /secret-words');

    return this.http.get(`${API_URL}/secret-words`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MongoService {
  private apiUrl = 'https://backend-fv18.onrender.com/api/contact';

  constructor(private _http: HttpClient) {}

  submitContact(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }
}

import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private _http: HttpClient) { }

  async getRegion(): Promise<any> {
    try {
      return await lastValueFrom(this._http.get(`https://api.first.org/data/v1/countries`))
    } catch (error) {
      return error;
    }
  }

}

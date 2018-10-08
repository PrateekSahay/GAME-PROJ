import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  constructor(private http: HttpClient) { }

  getMethod() {
   // let obs=this.http.get('../../../db.json');
   return this.http.get('http://localhost:3000/scores');

}

postMethod(dbScore) {
  return this.http.post('http://localhost:3000/scores', dbScore);
}

}



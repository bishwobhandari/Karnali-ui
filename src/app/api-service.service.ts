import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://localhost:8080/'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  
  getProvinces(): Observable<any> {
    const url = this.apiUrl+'api/province/all';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(url, httpOptions);
  }

}

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

  getDistricts(): Observable<any> {
    const url = this.apiUrl+'api/districts/all';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(url, httpOptions);
  }

  getConstituencies(): Observable<any> {
    const url = this.apiUrl+'api/constituency/all';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(url, httpOptions);
  }

  getDistrictsByProvince(currentProvince:number): Observable<any> {
    const url = this.apiUrl+'api/districts/getDistrictsByProvince/'+currentProvince;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(url, httpOptions);
  }

  getConstituenciesByDistrict(currentDistrict:any): Observable<any> {
console.log("get constituenies bpy district", currentDistrict)
    const url = this.apiUrl+'api/constituency/getConstituenciesByDistrict/'+currentDistrict;

    console.log(url)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(url, httpOptions);
  }

}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-companion',
  templateUrl: './companion.component.html',
  styleUrls: ['./companion.component.css']
})
export class CompanionComponent {
  constructor(private http: HttpClient) { }


  flightDetails = {
    flightFrom: '',
    flightTo: '',
    flightDate: '',
    name: ''
  };


  onSubmit(flightDetails:any) {
    // Handle form submission logic here...
    console.log("submitted", flightDetails)
     // send an HTTP POST request to the backend API
  this.http.post('http://localhost:8080/flightdetails/saveflightdetails', flightDetails).subscribe(
    (response) => {
      // handle the response from the backend API
      console.log('API response:', response);
      // reset the form
      this.flightDetails.flightDate='';
      this.flightDetails.flightFrom='';
      this.flightDetails.flightTo='';
      this.flightDetails.name='';
    },
    (error) => {
      // handle any errors that occur while sending the request
      console.error('API error:', error);
    }
  );
  }

}

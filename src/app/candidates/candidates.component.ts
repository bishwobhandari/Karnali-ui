import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {

  provinces: any[] = [];
  districts:any[]=[];
  currentProvince=1;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.getProvinces().subscribe(
      data => {
        this.provinces = data;
        console.log(this.provinces)
      },
      error => {
        console.error(error);
      }
    );

    this.apiService.getDistrictsByProvince(this.currentProvince).subscribe(
      data => {
        this.districts = data;
        console.log(this.districts)
      },
      error => {
        console.error(error);
      }
    );
  }

  onOptionSelected() {
    // Do something when the selected option is changed
    
    this.apiService.getDistrictsByProvince(this.currentProvince).subscribe(
      data => {
        this.districts = data;
        console.log(this.districts)
      },
      error => {
        console.error(error);
      }
    );
  }

}

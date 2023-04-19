import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {

  provinces: any[] = [];

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
  }

}

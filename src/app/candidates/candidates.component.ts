import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {

  provinces: any[] = [];
  districts:any[]=[];
  constituencies:any[] = [];
  currentProvince=1;
  currentDistrict=1;
  currentConstituency=1;
  dataLoaded=false;

  constructor(private apiService: ApiServiceService) { }

 

  ngOnInit(): void {
   
      forkJoin({
        provinces: this.apiService.getProvinces(),
        districts: this.apiService.getDistricts(),
        constituencies: this.apiService.getConstituencies()
      })
      .pipe(
        map(response => {
          const provinces = <Array<any>>response.provinces;
          const districts = <Array<any>>response.districts;
          const constituencies = <Array<any>>response.constituencies;
          const result: any[] = [];
          provinces.map((province: any) => {
            result.push({
              ...province, 
              ...districts.find((district: any) => district.province_id === province.id), 
              ...constituencies.find((constituency: any) => constituency.district_id === constituency.userId)})
          });
  
          console.log("result ", result)
          return result;
        })
      )
      .subscribe((data) => {
        console.log(data)
        this.provinces = data;
      });
    
  }

  updateCurrentDistrict(){
    this.currentDistrict=this.districts[0];
  }

  async loadData(){
 


  }

 async getProvinces(){
     await this.apiService.getProvinces().subscribe(
      data => {
        console.log("get provinces called", data)
        this.provinces = data;
      },
      error => {
        console.error(error);
      }
    );
  }

 async  getDistricts(){
  await this.apiService.getDistricts().subscribe(
    data => {
      console.log("get districts called", data)
      this.districts = data;
    },
    error => {
      console.error(error);
    }
  );
  }

  async  getConstituencies(){
    await this.apiService.getConstituencies().subscribe(
      data => {
        console.log("get constituency called", data)
        this.constituencies=data;
   
      },
      error => {
        console.error(error);
      }
    );
  
  }

  setCurrentDistrict(){
    this.currentDistrict=this.districts[0].id;
    console.log("current district is" ,this.currentDistrict)
  }

  setCurrentConstituency(){
    console.log(this.constituencies)
    if(this.constituencies.length > 0){
      this.currentConstituency=this.constituencies[0].id;
    }

    console.log("current district is" ,this.currentConstituency)
  }
}

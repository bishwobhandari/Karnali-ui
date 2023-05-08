import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { forkJoin, map, tap } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {

  provinces: any[] = [];
  districts:any[]=[];
  constituencies:any[] = [];
  currentProvinceId=1;
  currentDistrictId=1;
  currentConstituencyId=1;
  dataLoaded=false;

  constructor(private apiService: ApiServiceService) { }

 

  ngOnInit(): void {
   console.log("ng on init")
      forkJoin([
        this.apiService.getProvinces().pipe(tap(res=> {
          console.log("provinces called", res);
          this.currentProvinceId=res[0].id;
          
       
        })),  
        this.apiService.getDistrictsByProvince(this.currentProvinceId).pipe(tap(res=> {
          console.log("districts called", res);
          this.currentDistrictId=res[0].id;
       
        })),  
        this.apiService.getConstituenciesByDistrict(this.currentDistrictId).pipe(tap(res=> {
          console.log("constituencies called", res);
          this.currentConstituencyId=res[0].id;
       
        }))
      ]).subscribe(allresult=>{
        console.log(allresult)
        this.provinces=allresult[0];
        this.districts=allresult[1];
        this.constituencies=allresult[2];
      })
     console.log("finished")
    
  }


//  async getProvinces(){
//      await this.apiService.getProvinces().subscribe(
//       data => {
//         console.log("get provinces called", data)
//         this.provinces = data;
//       },
//       error => {
//         console.error(error);
//       }
//     );
//   }

//  async  getDistricts(){
//   await this.apiService.getDistricts().subscribe(
//     data => {
//       console.log("get districts called", data)
//       this.districts = data;
//     },
//     error => {
//       console.error(error);
//     }
//   );
//   }

//   async  getConstituencies(){
//     await this.apiService.getConstituencies().subscribe(
//       data => {
//         console.log("get constituency called", data)
//         this.constituencies=data;
   
//       },
//       error => {
//         console.error(error);
//       }
//     );
  
//   }


  updateProvince(){
    forkJoin([
      this.apiService.getDistrictsByProvince(this.currentProvinceId).pipe(tap(res=> {
        console.log("districts called", res);
        this.currentDistrictId=res[0].id;
     
      })),  
      this.apiService.getConstituenciesByDistrict(this.currentDistrictId).pipe(tap(res=> {
        console.log("constituencies called", res);
        this.currentConstituencyId=res[0].id;
     
      }))
    ]).subscribe(allresult=>{
      console.log("all resule subscribed")
      this.districts=allresult[0];
      this.constituencies=allresult[1];
    })
  }


  updateDistrict(){
    this.apiService.getConstituenciesByDistrict(this.currentDistrictId)
    .subscribe(res=>{
    console.log(res)

    this.constituencies=res
    this.currentConstituencyId=this.constituencies[0].id;
  })
  }



}

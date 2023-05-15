import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { forkJoin, map, merge, mergeMap, tap } from 'rxjs';
import { Member } from '../interfaces/interface';

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
  currentDistrictId=11;
  currentConstituencyId=1;
  currentMember:Member;
  dataLoaded=false;

  constructor(private apiService: ApiServiceService) { }

 

  ngOnInit(): void {
      this.dataLoaded=false;
      forkJoin([
        this.apiService.getProvinces().pipe(tap(res=> {
          this.currentProvinceId=res[0].id;
          
       
        })),  
        this.apiService.getDistrictsByProvince(this.currentProvinceId).pipe(tap(res=> {
          this.currentDistrictId=res[0].id;
       
        })),  
        this.apiService.getConstituenciesByDistrict(this.currentDistrictId).pipe(tap(res=> {
          this.currentConstituencyId=res[0].id;
       
        }))
      ]).subscribe(allresult=>{
        this.provinces=allresult[0];
        this.districts=allresult[1];
        this.constituencies=allresult[2];
      })


      this.apiService.getConstituentMembersByConstituency(this.currentConstituencyId).subscribe(res=>{
        this.currentMember=res;
        this.dataLoaded=true;
      })



  }


  updateProvince(){
    this.apiService.getDistrictsByProvince(this.currentProvinceId).pipe(map(res=> {
      this.districts= res;
      this.currentDistrictId=this.districts[0].id;
      return this.districts;
    }), mergeMap( provinces =>this.apiService.getConstituenciesByDistrict(this.currentDistrictId))).subscribe(response=>{
      this.constituencies=response;
      this.currentConstituencyId=this.constituencies[0].id;
    })
  }


  updateDistrict(){
    this.apiService.getConstituenciesByDistrict(this.currentDistrictId)
    .subscribe(res=>{
    this.constituencies=res
    this.currentConstituencyId=this.constituencies[0].id;
  })
  }


  getImageSrc() {
    return "assets/"+this.currentMember.firstName.toLowerCase()+this.currentMember.lastName.toLowerCase()+".jpg";
  }


}

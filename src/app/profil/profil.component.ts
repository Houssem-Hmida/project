import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Profil } from '../model/profil';
import { ProfilService } from '../service/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profilDetail!: FormGroup;
  profilobj: Profil = new Profil();
  profiList:Profil[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder : FormBuilder, private profilService: ProfilService) { }

  ngOnInit(): void {

    this.getProfils();
    this.profilDetail = this.formBuilder.group({
      id: [''],
      type:['']
    });
  }

  

  addProfil(){

    console.log(this.profilDetail);
    this.profilobj.id=this.profilDetail.value.id;
    this.profilobj.type=this.profilDetail.value.type;
    this.profilService.addProfil(this.profilobj).subscribe(res=>{
      console.log(res);
      this.getProfils();
    }
    );


}

getProfils(){
  this.profilService.getProfils().subscribe(res=>{
    this.profiList=res;
  })
}

editProfil(profil : Profil){
  this.profilDetail.controls['id'].setValue(profil.id);
  this.profilDetail.controls['type'].setValue(profil.type);

}

deleteProfil(profil : Profil){

    this.profilService.deleteProfil(profil).subscribe(res=>{
      console.log(res);
      alert("profil deleted successfully");
      this.getProfils();
    }
    );
  
  }

updateProfil(){
  this.profilobj.id=this.profilDetail.value.id;
  this.profilobj.type=this.profilDetail.value.type;
  this.profilService.updateProfil(this.profilobj).subscribe(res=>{
    console.log(res);
    this.getProfils();
  }
  );

}

confirmDelete(profil: Profil) {
  if(confirm("Are you sure you want to delete this profil : "+profil.type)) {
     this.deleteProfil(profil);
  }
}


}
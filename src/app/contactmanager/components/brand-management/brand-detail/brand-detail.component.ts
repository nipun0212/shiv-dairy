import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormControl, FormGroup, Validators, RequiredValidator, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Location } from '@angular/common';
import { Brand } from '../../model'
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {
  editMode:boolean= false;
  brand: Brand;
  changedBrand:Brand;
  brandName:string;
  brandForm;
  isBrandNameUnique(control: FormControl): any {
    const q = new Promise((resolve, reject) => {
      if (this.editMode==false || control.value==this.brand.brandName){
        resolve(null)
      }
      this.vendorService.checkForExistence('Brand', 'brandName', control.value).then(r => {
        if (r.result.value)
          resolve({ 'isBrandNameUnique': true })
        else
          resolve(null)
      }, e => {
        resolve({'isBrandNameUnique': true })
      })
    })
    return q;
  }
  constructor(private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private location: Location,
    private zone: NgZone,
    private route:ActivatedRoute,
    private changeDetectorRefs:ChangeDetectorRef,
    private app:ApplicationRef
    ){
    this.getBrand()
    }
  
  ngOnInit() {
 }

  getBrand(){
    this.vendorService.getBrand(this.route.snapshot.params['id']).then(r => {
      console.log(r)
      this.brand = r.result
      console.log(this.brand)
      this.brandForm = this.fb.group({
        brandName: [this.brand.brandName, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/), this.isBrandNameUnique.bind(this)],
        brandDescription: [this.brand.brandDescription],
      });
      this.app.tick()
      // this.changeDetectorRefs.detectChanges()
    })
  }
  onSubmit() {
    console.log(this.brandForm);
    console.log(this.brandForm.value.brandDescription)
    this.changedBrand= this.brandForm.value;
    console.log(this.changedBrand)
    this.changedBrand.brandWebSafeKey = this.brand.brandWebSafeKey
    console.log(this.changedBrand)
    this.vendorService.addBrand(this.changedBrand).then(r => {
      return this.zone.run(() => this.router.navigate(['brand']));
    }, e => {
      console.log("In e")
      console.log(e)
    })
  }
  goBack() {
    this.location.back();
    }

  deleteBrand(brandWebSafeKey){
    this.vendorService.deleteBrand(this.brand).then(r=>{
      return this.zone.run(() => this.router.navigate(['brand']));
    })
  }
}

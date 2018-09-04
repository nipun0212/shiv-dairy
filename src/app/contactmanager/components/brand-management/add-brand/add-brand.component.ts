import { Component, NgZone } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Location } from '@angular/common';
import { Brand } from '../../model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent {
  brand: Brand;
  brandForm;
  constructor(private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private location: Location,
    private zone: NgZone) {
    this.brandForm = this.fb.group({
      brandName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)], this.isBrandNameUnique.bind(this)],
      brandDescription: [''],
    });
  }
  isBrandNameUnique(control: FormControl): any {
    const q = new Promise((resolve, reject) => {
      this.vendorService.checkForExistence('Brand', 'brandName', control.value).then(r => {
        if (r.result.value)
          resolve({'isBrandNameUnique': true })
        else
          resolve(null)
      }, e => {
        resolve({'isBrandNameUnique': true })
      })
    })
    return q;
  }
  onSubmit() {
    this.brand = this.brandForm.value;
    this.vendorService.addBrand(this.brand).then(r => {
      return this.zone.run(() => this.router.navigate(['brand']));
    }, e => {
      console.log("In e")
      console.log(e)
    })
  }
  goBack() {
    this.zone.run(() =>this.location.back());
  }
}

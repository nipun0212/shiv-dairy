import { Component, NgZone } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Location } from '@angular/common';
import { Vendor } from '../../model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent {
  vendor: Vendor;
  vendorForm;
  constructor(private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private location: Location,
    private zone: NgZone) {
    this.vendorForm = this.fb.group({
      vendorName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z]+$/)], this.isVendorNameUnique.bind(this)],
    });
  }
  isVendorNameUnique(control: FormControl): any {
    const q = new Promise((resolve, reject) => {
      this.vendorService.checkForExistence('Vendor', 'vendorName', control.value).then(r => {
        if (r.result.value)
          resolve({'isVendorNameUnique': true })
        else
          resolve(null)
      }, e => {
        resolve({'isVendorNameUnique': true })
      })
    })
    return q;
  }
  onSubmit() {
    this.vendorService.addVendor(this.vendorForm.value.vendorName).then(r => {
      return this.zone.run(() => this.router.navigate(['vendor']));
    }, e => {
    })
  
  }
  goBack() {
    this.zone.run(() =>this.location.back());
  }
}

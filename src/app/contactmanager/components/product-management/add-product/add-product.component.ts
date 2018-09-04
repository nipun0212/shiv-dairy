import { Component, NgZone } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Location } from '@angular/common';
import { Product } from '../../model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product;
  productForm;
  constructor(private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private location: Location,
    private zone: NgZone) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)], this.isProductNameUnique.bind(this)],
      productDescription: [''],
    });
  }
  isProductNameUnique(control: FormControl): any {
    const q = new Promise((resolve, reject) => {
      this.vendorService.checkForExistence('Product', 'productName', control.value).then(r => {
        if (r.result.value)
          resolve({'isProductNameUnique': true })
        else
          resolve(null)
      }, e => {
        resolve({'isProductNameUnique': true })
      })
    })
    return q;
  }
  onSubmit() {
    this.product = this.productForm.value;
    this.vendorService.addProduct(this.product).then(r => {
      return this.zone.run(() => this.router.navigate(['product']));
    }, e => {
      console.log("In e")
      console.log(e)
    })
  }
  goBack() {
    this.zone.run(() =>this.location.back());
  }
}

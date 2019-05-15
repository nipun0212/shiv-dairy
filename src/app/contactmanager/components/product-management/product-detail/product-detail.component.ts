import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormControl, FormGroup, Validators, RequiredValidator, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Location } from '@angular/common';
import { Product } from '../../model'
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  editMode:boolean= false;
  product: Product;
  changedProduct:Product;
  productName:string;
  productForm;
  isProductNameUnique(control: FormControl): any {
    const q = new Promise((resolve, reject) => {
      if (this.editMode==false || control.value==this.product.productName){
        resolve(null)
      }
      this.vendorService.checkForExistence('Product', 'productName', control.value).then(r => {
        if (r.result.value)
          resolve({ 'isProductNameUnique': true })
        else
          resolve(null)
      }, e => {
        resolve({'isProductNameUnique': true })
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
    this.getProduct()
    }
  
  ngOnInit() {
 }

  getProduct(){
    this.vendorService.getProduct(this.route.snapshot.params['id']).then(r => {
      console.log(r)
      this.product = r.result
      console.log(this.product)
      this.productForm = this.fb.group({
        productName: [this.product.productName, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/), this.isProductNameUnique.bind(this)],
        productDescription: [this.product.productDescription],
      });
      this.app.tick()
      // this.changeDetectorRefs.detectChanges()
    })
  }
  onSubmit() {
    console.log(this.productForm);
    console.log(this.productForm.value.productDescription)
    this.changedProduct= this.productForm.value;
    console.log(this.changedProduct)
    this.changedProduct.productWebSafeKey = this.product.productWebSafeKey
    console.log(this.changedProduct)
    this.vendorService.addProduct(this.changedProduct).then(r => {
      return this.zone.run(() => this.router.navigate(['product']));
    }, e => {
      console.log("In e")
      console.log(e)
    })
  }
  goBack() {
    this.location.back();
    }

  deleteProduct(productWebSafeKey){
    this.vendorService.deleteProduct(this.product).then(r=>{
      return this.zone.run(() => this.router.navigate(['product']));
    })
  }
}

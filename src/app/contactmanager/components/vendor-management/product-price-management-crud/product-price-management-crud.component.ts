import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Vendor, Product, Brand } from '../../model';
import { FormControl, FormGroup, Validators, RequiredValidator, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-product-price-management-crud',
  templateUrl: './product-price-management-crud.component.html',
  styleUrls: ['./product-price-management-crud.component.css']
})
export class ProductPriceManagementCrudComponent implements OnInit {
  @Input() vendor: Vendor;
  products: Product[];
  brands: Brand[];
  addVendorProductPriceMappingForm;

  constructor(private fb: FormBuilder,
    private zone: NgZone,
    private vendorService: VendorService,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    console.log("this.products");
    console.log(this.products);
    console.log(this.brands);
    console.log(this.vendor)
    this.initAddVendorProductPriceMappingForm();
    this.getAllProductsBrands();
  }

  initAddVendorProductPriceMappingForm() {
    this.addVendorProductPriceMappingForm = this.fb.group({
      productWebSafeKey: ['', [Validators.required]],
      brandWebSafeKey: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[-+]?[0-9]*\.?[0-9]+$')]]
    });
  }

  addProdcutPriceMappingToVendor() {
    this.zone.run(() => {
      this.vendorService.addProdcutPriceMappingToVendor(this.vendor.vendorWebSafeKey,
        this.addVendorProductPriceMappingForm.value.productWebSafeKey.productWebSafeKey,
        this.addVendorProductPriceMappingForm.value.brandWebSafeKey.brandWebSafeKey,
        this.addVendorProductPriceMappingForm.value.price).then(r => {
          this.zone.run(()=>{
            this.openSnackBar('Mapping added Successfully', this.addVendorProductPriceMappingForm.value.price)
            this.initAddVendorProductPriceMappingForm()
          })
        }, e => {
          alert(e.result.error.message);
        })
    })
  }
  getAllProductsBrands() {
    this.zone.run(() => {
      this.vendorService.getProducts().then(r => {
        this.products = r.result.products;
        this.vendorService.getBrands().then(r => {
          this.brands = r.result.brands;
          // this.app.tick()
        })
      })
    })

  }
  displayFn(product?: Product): string | undefined {
    console.log(product)
    return product ? product.productName : undefined;
  }
  displayBrand(brand?: Brand): string | undefined {
    console.log(brand)
    return brand ? brand.brandName : undefined;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}

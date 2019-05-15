import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ApplicationRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators, RequiredValidator, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Vendor, Product, Brand, Bill, ProductPriceMappings, VendorProductPriceMapping } from '../../model';
import { FormArray } from '@angular/forms';
import * as _moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
const moment = _moment;
import { MatSnackBar } from '@angular/material';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
  styleUrls: ['./bill-add.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BillAddComponent implements OnInit {
  selectedVendor: Vendor;
  selectedVendorProducts: Product[]
  brands: Brand[];
  selectedVendorProductBrands: any
  productPriceMapping
  vendors: Vendor[];
  products: Product[];
  bill: Bill;
  billForm;
  product = []
  brand;
  total: number = 0
  constructor(
    private vendorService: VendorService,
    private fb: FormBuilder,
    private app: ApplicationRef,
    private zone: NgZone,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
  }
  ngOnInit() {
    this.zone.run(() => {
      this.getVendors();
      this.getProducts();
      this.getBrands();
    }
    )
    this.selectedVendorProductBrands = [];
    this.selectedVendorProductBrands[0] = []
    this.initBillForm()
  }
  initBillForm() {
    this.billForm = this.fb.group({
      billWebSafeKey: [''],
      vendorWebSafeKey: ['', Validators.required],
      billDate: [moment(), Validators.required],
      delete: [false],
      billItems: this.fb.array([
        this.initBillItems()
      ])

    })
  }
  initBillItems() {
    return this.fb.group({
      productWebSafeKey: ['', Validators.required],
      brandWebSafeKey: [''],
      productQuantity: ['', [Validators.required, Validators.maxLength(6), Validators.pattern(/^\d*\.?\d*$/)]],
      billedProductPrice: ['', [Validators.required, Validators.maxLength(6), Validators.pattern(/^\d*\.?\d*$/)]]

    })
  }
  addBillItem() {
    const control = <FormArray>this.billForm.controls['billItems'];
    control.push(this.initBillItems());
  }
  removeBillItem(i: number) {
    const control = <FormArray>this.billForm.controls['billItems'];
    control.removeAt(i);
  }
  getVendors() {
    this.zone.run(() => this.vendorService.getVendors().then(r => {
      this.vendors = r.result.vendors;
      // this.app.tick()
    }))
  }
  getProducts() {
    this.vendorService.getProducts().then(r => {
      this.products = r.result.products;
    })
  }
  getBrands() {
    this.vendorService.getBrands().then(r => {
      this.brands = r.result.brands;
    })
  }
  displayProductName(product?: Product): string | undefined {
    return product ? product.productName : undefined;
  }
  displayBrandName(brand?: Brand): string | undefined {
    return brand ? brand.brandName : undefined;
  }

  displayVendorName(vendor?: Vendor): string | undefined {
    return vendor ? vendor.vendorName : undefined;
  }
  getProductsUnderVendor(e) {
    console.log("e");
    console.log(e);
    this.selectedVendor = this.vendors.find(r => r.vendorWebSafeKey == e.value)
    this.total = 0.0
    const control = <FormArray>this.billForm.controls['billItems'];
    for (var i = control.length; i > 0; i--) {
      control.removeAt(i);
    }
    control.reset()
    this.selectedVendorProducts = [];
    this.selectedVendorProductBrands = [];
    this.productPriceMapping = this.selectedVendor.vendorProductPriceMappings.productPriceMappings
    for (var j in this.productPriceMapping) {
      if (this.selectedVendorProducts.find(p => {
        return JSON.stringify(p) === JSON.stringify(this.productPriceMapping[j].product)
      }) == undefined) {
        this.selectedVendorProducts.push(this.productPriceMapping[j].product)
      }
    }
  }
  getBrandsUnderProduct(billitem, i, productWebSafeKey) {
    this.brands = []
    for (var j in this.productPriceMapping) {
      if (this.productPriceMapping[j].product.productWebSafeKey == productWebSafeKey.value && this.productPriceMapping[j].brand) {
        this.brands.push(this.productPriceMapping[j].brand)
      }
    }
    if (this.brands.length == 0) {
      for (var j in this.productPriceMapping) {
        if (this.productPriceMapping[j].product.productWebSafeKey == productWebSafeKey.value) {
          billitem.patchValue({ billedProductPrice: this.productPriceMapping[j].price })
        }
      }
    }
    else {
      this.selectedVendorProductBrands[i] = (this.brands)
    }
  }
  updateBilledProductPrice(billitem, i, e) {
    for (var x in this.productPriceMapping) {
      if (this.productPriceMapping[x].product.productWebSafeKey == billitem.value.productWebSafeKey) {
        if (this.productPriceMapping[x].brand)
          if (this.productPriceMapping[x].brand.brandWebSafeKey == e.value)
            billitem.patchValue({ billedProductPrice: this.productPriceMapping[x].price })
        this.updateTotal()
      }
    }
  }
  updateTotal() {
    this.total = 0;
    const control = <FormArray>this.billForm.controls['billItems'];
    var i;
    for (i = 0; i < control.getRawValue().length; i++) {
      this.total = this.total + control.getRawValue()[i].productQuantity * control.getRawValue()[i].billedProductPrice
    }
  }
  submit() {
    var vendorWebSafeKey = this.billForm.value.vendorWebSafeKey;
    var billDate = this.billForm.value.billDate.format().split("+")[0];
    var billItems = this.billForm.value.billItems;
    this.zone.run(() => {
      this.initBillForm()
    })
    this.vendorService.addBill(vendorWebSafeKey,
      billDate,
      billItems).then(r => {
        // return this.zone.run(() => this.router.navigate(['vendor/viewVendor',this.selectedVendor.vendorWebSafeKey]));
        this.zone.run(() => {
          this.openSnackBar('Bill Added Successfully for ' + this.selectedVendor.vendorName, '' + this.total)
          this.initBillForm()
        });

      }, e => {
        alert(e.result.error.message)
      })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}

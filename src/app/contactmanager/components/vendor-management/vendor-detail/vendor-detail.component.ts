import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormControl, FormGroup, Validators, RequiredValidator, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Location } from '@angular/common';
import { Vendor, VendorProductPriceMapping, ProductPriceMappings, Product, Brand, Bill } from '../../model'
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VendorDetailComponent implements OnInit {

  dataBill: MatTableDataSource<Bill>
  displayedColumnsBill: string[] = ['billId', 'vendorName', 'billAmount', 'billDate'];
  expandedElement: Bill;
  billItemsDisplayedColumns: string[] = ['productName', 'productQuantity', 'actualProductPrice', 'billedProductPrice', 'totalPrice']
  data: MatTableDataSource<ProductPriceMappings>
  vendor: Vendor;
  vendorTotalBillAmount: number = 0
  vendorTotalBillPayment: number = 0
  products: Product[];
  brands: Brand[];
  productPriceMapping: ProductPriceMappings
  addVendorProductPriceMappingMode: boolean = false
  editProductPriceMappingMode: boolean = false
  editVendorMode: boolean = false;
  vendorProductPriceForm;
  vendorForm;
  isVendorNameUnique(control: FormControl): any {
    const q = new Promise((resolve, reject) => {
      if (this.editVendorMode == false || control.value == this.vendor.vendorName) {
        resolve(null)
      }
      this.vendorService.checkForExistence('Vendor', 'vendorName', control.value).then(r => {
        if (r.result.value)
          resolve({ 'isVendorNameUnique': true })
        else
          resolve(null)
      }, e => {
        resolve({ 'isVendorNameUnique': true })
      })
    })
    return q;
  }
  constructor(private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private location: Location,
    private zone: NgZone,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private app: ApplicationRef
  ) {
    // this.zone.run(() => {
    //   this.getvendor();
    //   this.getAllProductsBrands();
    //   // this.app.tick()
    // })
  }

  ngOnInit() {
      this.getvendor();
  }

  getvendor() {
    this.vendorService.getVendor(this.route.snapshot.params['id']).then(r => {
      console.log("r.result")
      console.log(r.result)
      this.zone.run(() => {
      this.vendor = r.result
      })
      this.vendorForm = this.fb.group({
        vendorName: [this.vendor.vendorName, Validators.pattern(/^[a-zA-Z][a-zA-Z]+$/), this.isVendorNameUnique.bind(this)]
      });
      if (this.vendor.vendorBills['bills']) {
        for (var i = 0; i < this.vendor.vendorBills['bills'].length; i++) {
          this.vendorTotalBillAmount = this.vendorTotalBillAmount + this.vendor.vendorBills['bills'][i].billAmount;
        }
      }
      if (this.vendor.vendorBillPayments['billPayments']) {
        console.log(this.vendor.vendorBillPayments['billPayments'])
        for (var i = 0; i < this.vendor.vendorBillPayments['billPayments'].length; i++) {
          this.vendorTotalBillPayment = this.vendorTotalBillPayment + this.vendor.vendorBillPayments['billPayments'][i].billPaymentAmount
          console.log(this.vendorTotalBillPayment)
        }
      }
    })
  }
  // enableEditVendorProductPriceMapping(productPriceMappingWebSafeKey) {
  //   this.productPriceMapping = this.vendor.vendorProductPriceMappings.productPriceMappings.find(((item) => item.productPriceMappingWebSafeKey === productPriceMappingWebSafeKey))
  //   this.vendorProductPriceForm = this.fb.group({
  //     price: ['', [Validators.required, Validators.maxLength(6), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
  //   });
  //   this.editProductPriceMappingMode = true;
  //   this.app.tick();
  // }
  editVendor() {
    this.zone.run(() =>
      this.vendorService.editVendor(this.vendor.vendorWebSafeKey, this.vendorForm.value.vendorName).then(r => {
        this.editVendorMode = false;
        this.getvendor();
        // this.app.tick()
        // return this.zone.run(() => this.router.navigate(['vendor']));
      }, e => {
        alert(e.result.error.message)
      })
    )
  }
  goBack() {
    this.location.back();
  }

  deleteVendor(vendorWebSafeKey) {
    this.vendorService.deleteVendor(this.vendor).then(r => {
      return this.zone.run(() => this.router.navigate(['vendor']));
    })
  }
  // editProdcutPriceMappingToVendor() {
  //   this.vendorService.editProdcutPriceMappingToVendor(
  //     this.vendor.vendorWebSafeKey,
  //     this.productPriceMapping.productPriceMappingWebSafeKey,
  //     this.productPriceMapping.product.productWebSafeKey,
  //     this.vendorProductPriceForm.value.price).then(r => {
  //       this.getvendor();
  //       this.editProductPriceMappingMode = false;
  //     }, e => {
  //       alert(e.result.error.message)
  //     })
  // }
  // private _filter(productName: string): any {
  //   const filterValue = productName.toLowerCase();

  //   return this.vendor.vendorProductPriceMappings.productPriceMappings.filter(option => option.product.productName.toLowerCase().indexOf(filterValue) === 0);
  // }

  // applyFilter(filterValue: string) {
  //   this.data.filter = filterValue.trim().toLowerCase();
  // }
  // enableAddVendorProductPriceMapping() {

  //   this.addVendorProductPriceMappingMode = true;
  // }
  // getAllProductsBrands() {
  //   this.zone.run(() => {
  //     this.vendorService.getProducts().then(r => {
  //       this.products = r.result.products;
  //       this.vendorService.getBrands().then(r => {
  //         this.brands = r.result.brands;
  //         // this.app.tick()
  //       })
  //     })
  //   })

  // }
  // displayFn(product?: Product): string | undefined {
  //   console.log(product)
  //   return product ? product.productName : undefined;
  // }
  // displayBrand(brand?: Brand): string | undefined {
  //   console.log(brand)
  //   return brand ? brand.brandName : undefined;
  // }
  // addProdcutPriceMappingToVendor() {
  //   this.zone.run(() => {
  //     this.vendorService.addProdcutPriceMappingToVendor(this.vendor.vendorWebSafeKey,
  //       this.vendorProductPriceForm.value.productWebSafeKey.productWebSafeKey,
  //       this.vendorProductPriceForm.value.brandWebSafeKey.brandWebSafeKey,
  //       this.vendorProductPriceForm.value.price).then(r => {
  //         this.getvendor()
  //         this.addVendorProductPriceMappingMode = false;
  //         // this.app.tick();
  //       }, e => {
  //         alert(e.result.error.message);
  //         // this.app.tick();
  //       })
  //   })

  // }
  // sortData(e) {
  //   this.app.tick()
  // }

}

import { BillPayment } from '../../model';
import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ApplicationRef, OnChanges, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, RequiredValidator, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Vendor, Product, Brand, Bill, ProductPriceMappings, VendorProductPriceMapping } from '../../model';
import { FormArray } from '@angular/forms';
import * as _moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-price-mappin-display',
  templateUrl: './product-price-mappin-display.component.html',
  styleUrls: ['./product-price-mappin-display.component.css']
})
export class ProductPriceMappinDisplayComponent implements OnInit {
  @Input() productPriceMappings: ProductPriceMappings[]
  @Input() vendor: Vendor;
  @Input() products: Product[];
  @Input() brands: Brand[];
  productPriceMapping;
  editProductPriceMappingMode: boolean = false
  vendorProductPriceForm;
  data: MatTableDataSource<ProductPriceMappings>
  displayedColumns: string[] = ['productName', 'brandName', 'price'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(private vendorService: VendorService,
    private app: ApplicationRef,
    private zone: NgZone,
    private fb: FormBuilder) { }
  ngOnInit() {
    this.zone.run(() => {
    this.initializeTable(this.productPriceMappings)
    })
  }

  initializeTable(productPriceMappings) {
      this.data = new MatTableDataSource(productPriceMappings)
      this.data.sort = this.sort;
  }
  editProdcutPriceMappingToVendor() {
      this.vendorService.editProdcutPriceMappingToVendor(
        this.vendor.vendorWebSafeKey,
        this.productPriceMapping.productPriceMappingWebSafeKey,
        this.productPriceMapping.product.productWebSafeKey,
        this.vendorProductPriceForm.value.price).then(r => {
          this.vendorService.getVendor(this.vendor.vendorWebSafeKey).then(r => {
            this.zone.run(() => {
            this.initializeTable(r.result.vendorProductPriceMappings.productPriceMappings)
            this.editProductPriceMappingMode = false;
            })
          })
        }, e => {
          alert(e.result.error.message)
        })
  }

  enableEditVendorProductPriceMapping(productPriceMappingWebSafeKey) {
    this.productPriceMapping = this.vendor.vendorProductPriceMappings.productPriceMappings.find(((item) => item.productPriceMappingWebSafeKey === productPriceMappingWebSafeKey))
    this.vendorProductPriceForm = this.fb.group({
      price: ['', [Validators.required, Validators.maxLength(6), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
    this.editProductPriceMappingMode = true;
  }

}

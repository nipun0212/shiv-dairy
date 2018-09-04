
import { BillPayment } from '../model';
import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ApplicationRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators, RequiredValidator, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { Vendor, Product, Brand, Bill, ProductPriceMappings, VendorProductPriceMapping } from '../model';
import { FormArray } from '@angular/forms';
import * as _moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
const moment = _moment;
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
  selector: 'app-bill-payment-management',
  templateUrl: './bill-payment-management.component.html',
  styleUrls: ['./bill-payment-management.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BillPaymentManagementComponent implements OnInit {
  data: MatTableDataSource<BillPayment>
  billPaymentForm;
  vendors: Vendor[]
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
    this.getVendors()
    this.initBillPaymentForm()

  }

  getVendors() {
    this.vendorService.getVendors().then(r => {
      this.vendors = r.result.vendors
    })
  }
  initBillPaymentForm() {
    this.billPaymentForm = this.fb.group({
      billPaymentWebSafeKey: [''],
      vendorWebSafeKey: ['', Validators.required],
      billPaymentAmount: ['', [Validators.required, Validators.maxLength(6), Validators.pattern(/^\d*\.?\d*$/)]],
      billPaymentDate: [moment(), Validators.required],
      delete: [false]
    })
  }
  onSubmit() {
    var vendorWebSafeKey = this.billPaymentForm.value.vendorWebSafeKey
    var billPaymentAmount = this.billPaymentForm.value.billPaymentAmount
    var billPaymentDate = this.billPaymentForm.value.billPaymentDate
    this.zone.run(() => {
      this.initBillPaymentForm()
    })
    console.log(this.billPaymentForm)
    this.vendorService.addBillPayment(
      vendorWebSafeKey,
      billPaymentAmount,
      billPaymentDate.format().split("+")[0]).then(r => {
        console.log(r);
        this.zone.run(() => {
          this.openSnackBar('Payment added successfully', billPaymentAmount)
          this.initBillPaymentForm();
        });
      })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}

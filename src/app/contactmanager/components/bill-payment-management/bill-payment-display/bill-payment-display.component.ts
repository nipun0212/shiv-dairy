import { BillPayment } from '../../model';
import { Component, OnInit, Input, ViewChild, NgZone, ChangeDetectorRef, ApplicationRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
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
  selector: 'app-bill-payment-display',
  templateUrl: './bill-payment-display.component.html',
  styleUrls: ['./bill-payment-display.component.css']
})
export class BillPaymentDisplayComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @Input() vendor: Vendor
  displayedColumns: string[] = ['billPaymentId', 'vendorId', 'VendorName', 'billPaymentAmount', 'billPaymentDate'];
  data: MatTableDataSource<BillPayment>
  constructor(private vendorService: VendorService,
    private zone: NgZone,
    private app: ApplicationRef
  ) { }

  ngOnInit() {
    console.log("this.billPayments")
    console.log(this.vendor)
    if (!(this.vendor)) {
      this.getAllBillPayments()
    }
    else {
      this.initializeTable(this.vendor.vendorBillPayments['billPayments'])
    }
  }
  getAllBillPayments() {
    this.vendorService.getAllBillPayments().then(r => {
      this.zone.run(() => {
        this.data = new MatTableDataSource(r.result.billPayments)
        this.data.sort = this.sort;
      })
    })
  }
  initializeTable(billPayments) {
    this.zone.run(() => {
      this.data = new MatTableDataSource(billPayments)
      this.data.sort = this.sort;
    })
  }
}

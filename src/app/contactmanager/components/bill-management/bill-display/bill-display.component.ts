import { Component, OnInit, ViewChild, ChangeDetectorRef, ApplicationRef, NgZone, Input } from '@angular/core';
import { VendorService } from '../../../services/vendor.service';
import { Bill, Vendor } from '../../model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-bill-display',
  templateUrl: './bill-display.component.html',
  styleUrls: ['./bill-display.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BillDisplayComponent implements OnInit {
  @Input() vendor: Vendor
  data: MatTableDataSource<Bill>
  displayedColumns: string[] = ['billId', 'vendorName', 'billAmount', 'billDate'];
  expandedElement: Bill;
  billItemsDisplayedColumns: string[] = ['productName', 'brandName', 'productQuantity', 'actualProductPrice', 'billedProductPrice', 'totalPrice']
  billItemData: MatTableDataSource<any>
  constructor(private vendorService: VendorService,
    private app: ApplicationRef,
    private zone: NgZone) { }
  ngOnInit() {
    console.log("this.bills")
    console.log(this.vendor)
    if (!(this.vendor)) {
      this.getAllBills()
    }
    else {
      this.initializeTable(this.vendor.vendorBills['bills'])
    }
  }
  getAllBills() {
    this.vendorService.getAllBills().then(r => {
      console.log(r)
      this.initializeTable(r.result.bills)
    })
  }
  @ViewChild(MatSort) sort: MatSort;
  initializeTable(bills) {
    this.zone.run(() => {
      this.data = new MatTableDataSource(bills);
      this.data.sort = this.sort;
    })
  }
}

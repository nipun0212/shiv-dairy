import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone, ApplicationRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Product } from '../../model'
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  data: MatTableDataSource<Product[]>
  products: Product[]
  displayedColumns: string[] = ['productId', 'productName', 'productDescription'];
  product: Product;
  productForm;
  constructor(private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private zone: NgZone,
    private app: ApplicationRef) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)], this.isProductNameUnique.bind(this)],
      productDescription: [''],
    });
    this.getProducts();
    this.app.tick()
  }
  isProductNameUnique(control: FormControl): any {
    const q = new Promise((resolve, reject) => {
      this.vendorService.checkForExistence('Product', 'productName', control.value).then(r => {
        if (r.result.value)
          resolve({ 'isProductNameUnique': true })
        else
          resolve(null)
      }, e => {
        resolve({ 'isProductNameUnique': true })
      })
    })
    return q;
  }
  addProduct() {
    this.router.navigate(['addProduct'], { relativeTo: this.route })
  }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.vendorService.getProducts().then(r => {
      this.data = new MatTableDataSource(r.result.products)
      this.data.sort = this.sort;
      this.app.tick()
      // this.changeDetectorRefs.detectChanges();
    })
  }
  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }
  viewProduct(productWebSafeKey) {
    this.zone.run(() => this.router.navigate(['product', 'viewProduct', productWebSafeKey]));
  }
}


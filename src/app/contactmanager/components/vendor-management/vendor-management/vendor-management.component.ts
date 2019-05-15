import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone, ApplicationRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Vendor, Product, Brand, VendorProductPriceMapping } from '../../model'
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css']
})
export class VendorManagementComponent implements OnInit {
  data: MatTableDataSource<Vendor[]>
  vendors: Vendor[]
  displayedColumns: string[] = ['vendorId', 'vendorName'];
  vendor: Vendor;
  vendorProductPriceForm;
  products:Product[]
  brands:Brand[]
  options: Product[]
  brandOptions:Brand[]
  mode:boolean=false
  vendorProductPriceMapping:VendorProductPriceMapping
  filteredOptions: Observable<Product[]>
  constructor(private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private zone: NgZone,
    private app: ApplicationRef) {}
  isVendorNameUnique(control: FormControl): any {
    const q = new Promise((resolve, reject) => {
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
  addVendor() {
    this.router.navigate(['addVendor'], { relativeTo: this.route })
  }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getVendors();
    this.getProductsBrands();
  }
  getVendors() {
    this.vendorService.getVendors().then(r => {
      this.vendor = r.result.vendors[0]
      this.data = new MatTableDataSource(r.result.vendors)
      this.data.sort = this.sort;
      this.app.tick()
      // this.changeDetectorRefs.detectChanges();
      console.log(r.result.vendors)
    })
  }
  getProductsBrands() {
    this.vendorService.getProducts().then(r => {
      this.products = r.result.products;
      this.vendorService.getBrands().then(r=>{
        this.brands = r.result.brands;
        console.log(this.products);
        console.log(this.brands)
        this.vendorProductPriceForm = this.fb.group({
          productWebSafeKey: [''],
          brandWebSafeKey:[''],
          price:['',[Validators.required,Validators.maxLength(6)]]
        });
        this.options = this.products;
        this.brandOptions=this.brands
        this.mode = true
        console.log(this.options)
        console.log(this.brandOptions)
      //   this.filteredOptions = this.vendorProductPriceForm.valueChanges
      //     // .pipe(
      //     //   startWith<string | Product>(''),
      //     // map(value => typeof value === 'string' ? value : value.productName),
      //     // map(productName => productName ? this._filter(productName) : this.options.slice())
      //     // );
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
  private _filter(productName: string): Product[] {
    const filterValue = productName.toLowerCase();

    return this.options.filter(option => option.productName.toLowerCase().indexOf(filterValue) === 0);
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }
  viewVendor(vendorWebSafeKey) {
    this.zone.run(() => this.router.navigate(['vendor', 'viewVendor', vendorWebSafeKey]));
  }
  s(){
    console.log(this.vendorProductPriceForm)
    this.vendorService.addProdcutPriceMappingToVendor(this.vendor.vendorWebSafeKey, 
      this.vendorProductPriceForm.value.productWebSafeKey.productWebSafeKey,
      this.vendorProductPriceForm.value.brandWebSafeKey.brandWebSafeKey,
      this.vendorProductPriceForm.value.price).then(r=>console.log(r))
  }
}


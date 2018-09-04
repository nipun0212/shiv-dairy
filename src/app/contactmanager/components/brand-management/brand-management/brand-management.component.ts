import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone, ApplicationRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Brand } from '../../model'
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.css']
})
export class BrandManagementComponent implements OnInit {
  data: MatTableDataSource<Brand[]>
  brands: Brand[]
  displayedColumns: string[] = ['brandId', 'brandName', 'brandDescription'];
  brand: Brand;
  brandForm;
  constructor(private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private zone: NgZone,
    private app: ApplicationRef) {
    this.brandForm = this.fb.group({
      brandName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)], this.isBrandNameUnique.bind(this)],
      brandDescription: [''],
    });
    this.getBrands()
  }
  isBrandNameUnique(control: FormControl): any {
    const q = new Promise((resolve, reject) => {
      this.vendorService.checkForExistence('Brand', 'brandName', control.value).then(r => {
        if (r.result.value)
          resolve({ 'isBrandNameUnique': true })
        else
          resolve(null)
      }, e => {
        resolve({ 'isBrandNameUnique': true })
      })
    })
    return q;
  }
  addBrand() {
    this.router.navigate(['addBrand'], { relativeTo: this.route })
  }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getBrands()
  }
  getBrands() {
    this.vendorService.getBrands().then(r => {
      this.data = new MatTableDataSource(r.result.brands)
      this.data.sort = this.sort;
      this.app.tick()
      // this.changeDetectorRefs.detectChanges();
    })
  }
  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }
  viewBrand(brandWebSafeKey) {
    this.zone.run(() => this.router.navigate(['brand', 'viewBrand', brandWebSafeKey]));
  }
}


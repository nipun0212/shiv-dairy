import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './contactmanager/components/toolbar/toolbar.component';
import { SidenavComponent } from './contactmanager/components/sidenav/sidenav.component';
import { MainContentComponent } from './contactmanager/components/main-content/main-content.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
import { ContactmanagerAppComponent } from './contactmanager/contactmanager-app.component';
import { UserService } from './contactmanager/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './contactmanager/components/notes/notes.component';
import { NewContactDialogComponent } from './contactmanager/components/new-contact-dialog/new-contact-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VendorService } from './contactmanager/services/vendor.service';
import { ProductManagementComponent } from './contactmanager/components/product-management/product-management/product-management.component';
import { ProductDetailComponent } from './contactmanager/components/product-management/product-detail/product-detail.component';
import { AddProductComponent } from './contactmanager/components/product-management/add-product/add-product.component';
import { BrandManagementComponent } from './contactmanager/components/brand-management/brand-management/brand-management.component';
import { BrandDetailComponent } from './contactmanager/components/brand-management/brand-detail/brand-detail.component';
import { AddBrandComponent } from './contactmanager/components/brand-management/add-brand/add-brand.component';
import { VendorManagementComponent } from './contactmanager/components/vendor-management/vendor-management/vendor-management.component';
import { VendorDetailComponent } from './contactmanager/components/vendor-management/vendor-detail/vendor-detail.component';
import { AddVendorComponent } from './contactmanager/components/vendor-management/add-vendor/add-vendor.component';
import { BillAddComponent } from './contactmanager/components/bill-management/bill-add/bill-add.component';
import { BillDisplayComponent } from './contactmanager/components/bill-management/bill-display/bill-display.component';
import { BrowserModule } from '@angular/platform-browser';
import { BillPaymentManagementComponent } from './contactmanager/components/bill-payment-management/bill-payment-management.component';
import { BillPaymentDisplayComponent } from './contactmanager/components/bill-payment-management/bill-payment-display/bill-payment-display.component';
import { ProductPriceMappinDisplayComponent } from './contactmanager/components/vendor-management/product-price-mappin-display/product-price-mappin-display.component';
import { ProductPriceManagementCrudComponent } from './contactmanager/components/vendor-management/product-price-management-crud/product-price-management-crud.component';
const routes: Routes = [
    { path: '', component: BillAddComponent },
    { path: 'product', component: ProductManagementComponent},
    { path: 'product/addProduct', component: AddProductComponent },
    { path: 'product/viewProduct/:id', component: ProductDetailComponent },
    { path: 'brand', component: BrandManagementComponent },
    { path: 'brand/addBrand', component: AddBrandComponent },
    { path: 'brand/viewBrand/:id', component: BrandDetailComponent },
    { path: 'vendor', component: VendorManagementComponent },
    { path: 'vendor/addVendor', component: AddVendorComponent },
    { path: 'vendor/viewVendor/:id', component: VendorDetailComponent },
    { path: 'bill', component: BillAddComponent },
    { path: 'bill/viewBills', component: BillDisplayComponent },
    { path: 'billpayment', component: BillPaymentManagementComponent },
    { path: 'payment/display', component: BillPaymentDisplayComponent },
    // { path: ':id', component: MainContentComponent },
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(routes,{enableTracing:true}),
    ],
    providers: [
        UserService,
        VendorService
    ],
    declarations: [AppComponent, ContactmanagerAppComponent, 
        ToolbarComponent, SidenavComponent, MainContentComponent,
         NotesComponent, NewContactDialogComponent, 
         ProductManagementComponent, ProductDetailComponent, AddProductComponent,
        BrandManagementComponent, AddBrandComponent, BrandDetailComponent,
        VendorManagementComponent, AddVendorComponent, VendorDetailComponent, BillAddComponent, BillDisplayComponent, BillPaymentManagementComponent, BillPaymentDisplayComponent, ProductPriceMappinDisplayComponent, ProductPriceManagementCrudComponent
        ],
    bootstrap: [AppComponent]
})
export class AppModule { }

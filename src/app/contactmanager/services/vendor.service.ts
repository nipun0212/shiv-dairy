import { Injectable } from '@angular/core';
import { Product, Brand, Vendor } from '../components/model'
import { window } from '@angular/platform-browser/src/facade/browser';
import { Observable, of } from 'rxjs';
import { from } from 'rxjs';
@Injectable()
export class VendorService {

  constructor() { }

  public getProduct(id: string): any {
    var p = {
      productWebSafeKey: id
    }
    return window.gapi.client.vendor.getProduct(p)
  }
  public getProducts(): Promise<any> {
    return window.gapi.client.vendor.getProducts();
  }
  public addProduct(p: Product): Promise<any> {
    console.log(p)
    return window.gapi.client.vendor.addOrModifyProduct(p);
  }
  public checkForExistence(kindName: string, propertyName: string, propertyValue: string): Promise<any> {
    var p = {
      kindName: kindName,
      propertyName: propertyName,
      propertyValue: propertyValue
    }
    console.log(p)
    return window.gapi.client.vendor.checkForExistence(p)
  }
  public deleteProduct(product): Promise<any> {
    product.delete = true
    return window.gapi.client.vendor.addOrModifyProduct(product)
  }
  public getBrand(id: string): any {
    var p = {
      brandWebSafeKey: id
    }
    return window.gapi.client.vendor.getBrand(p)
  }
  public getBrands(): Promise<any> {
    return window.gapi.client.vendor.getBrands();
  }
  public addBrand(p: Brand): Promise<any> {
    console.log(p)
    return window.gapi.client.vendor.addOrModifyBrand(p);
  }
  public deleteBrand(brand): Promise<any> {
    brand.delete = true
    return window.gapi.client.vendor.addOrModifyBrand(brand)
  }
  public getVendor(id: string): any {
    var p = {
      vendorWebSafeKey: id
    }
    return window.gapi.client.vendor.getVendor(p)
  }
  public getVendors(): Promise<any> {
    return window.gapi.client.vendor.getVendors();
  }
  public addVendor(vendorName: string): Promise<any> {
    var p = {
      vendorName: vendorName
    }
    return window.gapi.client.vendor.addOrModifyVendor(p);
  }
  public editVendor(vendorWebSafeKey: string, vendorName: string): Promise<any> {
    var p = {
      vendorWebSafeKey: vendorWebSafeKey,
      vendorName: vendorName
    }
    return window.gapi.client.vendor.addOrModifyVendor(p);
  }
  public deleteVendor(vendor): Promise<any> {
    vendor.delete = true
    return window.gapi.client.vendor.addOrModifyVendor(vendor)
  }

  public addProdcutPriceMappingToVendor(vendorWebSafeKey: string, productWebSafeKey, brandWebSafeKey, price): Promise<any> {
    var q = {
      productWebSafeKey: productWebSafeKey,
      brandWebSafeKey: brandWebSafeKey,
      price: price
    }
    var p = {
      vendorWebSafeKey: vendorWebSafeKey,
      vendorProductPriceMapping: q
    }
    console.log(p)
    return window.gapi.client.vendor.addOrModifyProductsToVendor(p)
  }
  public editProdcutPriceMappingToVendor(vendorWebSafeKey: string, productPriceMappingWebSafeKey: string, productWebSafeKey: string, price: number): Promise<any> {
    var q = {
      productWebSafeKey: productWebSafeKey,
      price: price
    }
    var p = {
      vendorWebSafeKey: vendorWebSafeKey,
      productPriceMappingWebSafeKey: productPriceMappingWebSafeKey,
      vendorProductPriceMapping: q

    }
    console.log(p)
    return window.gapi.client.vendor.addOrModifyProductsToVendor(p)
  }

  public addBill(vendorWebSafeKey, billDate, billItems) {
    console.log(billDate)
    var r = []
    for (var i = 0; i < billItems.length; i++) {
      var q = {
        productWebSafeKey: billItems[i].productWebSafeKey,
        brandWebSafeKey: billItems[i].brandWebSafeKey,
        productQuantity: billItems[i].productQuantity,
        billedProductPrice: billItems[i].billedProductPrice
      }
      r.push(q)
    }
    var p = {
      vendorWebSafeKey: vendorWebSafeKey,
      billDate: billDate,
      billItems: r
    }
    return window.gapi.client.vendor.addOrModifyBill(p)
  }

  public getAllBills() {
    return window.gapi.client.vendor.getAllBills()
  }
  public getAllBillPayments() {
    return window.gapi.client.vendor.getAllBillPayments()
  }
  public addBillPayment(vendorWebSafeKey, billPaymentAmount, billPaymentDate) {
    var p = {
      vendorWebSafeKey: vendorWebSafeKey,
      billPaymentAmount: billPaymentAmount,
      billPaymentDate: billPaymentDate

    }
    return window.gapi.client.vendor.addOrModifyBillPayment(p)
  }
}

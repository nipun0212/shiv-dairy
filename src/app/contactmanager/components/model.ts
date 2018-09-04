export class Vendor {
    public vendorWebSafeKey: string;
    public vendorId: number;
    public vendorName: string;
    public vendorProductPriceMappings: VendorProductPriceMapping;
    public vendorBills: Bill[];
    public vendorBillPayments:BillPayment[];
    constructor(

    ) { }
}
export class ProductPriceMappings {
    public productPriceMappingWebSafeKey: string;
    public productPriceMappingId: number;
    public price: number;
    public product: Product;
    public brand: Brand;
}
export class VendorProductPriceMapping {
    public productPriceMappings: ProductPriceMappings[]
    constructor(
    ) {

    }
}
export class Product {
    public productWebSafeKey: string;
    public productId: number;
    public productName: string;
    public productDescription: string
    constructor(

    ) {

    }
}
export class Brand {
    public brandWebSafeKey?: string;
    public brandId?: number;
    public brandName: string;
    public brandDescription: string
    constructor(

    ) {

    }
}

export class Bill {
    public billWebSafeKey: string;
    public billId: number;
    public vendorId: number;
    public vendorName: string;
    public vendorWebSafeKey: string;
    public billAmount: number;
    public billDate: Date;
    public billItems: BillItems[]
    constructor(


    ) {

    }
}
export class BillItems {
    public product: Product;
    public brand: Brand;
    public productQuantity: number;
    public billedProductPrice: number;
    public actualProductPrice: number;
    public totalPrics: number
    constructor(


    ) {

    }
}

export class BillPayment {
    public billPaymentWebSafeKey: string;
    public billPaymentId: number;
    public vendorId: number;
    public vendorName: string;
    public vendorWebSafeKey: string;
    public billPaymentAmount: number;
    public billPaymentDate: Date;
    constructor() {}
}

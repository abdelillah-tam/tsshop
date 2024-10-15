export class Product {
    productID: string;
    productTitle: string;
    productImageUrlOne: string;
    productImageUrlTwo: string;
    productImageUrlThree: string;
    productImageUrlFour: string;
    productDescription: string;
    productCategory: string;
    productQuantity: number;
    productPrice: number;

    constructor(productID: string,
        productTitle: string,
        productImageUrlOne: string,
        productImageUrlTwo: string,
        productImageUrlThree: string,
        productImageUrlFour: string,
        productCategory: string,
        productDescription: string,
        productQuantity: number,
        productPrice: number) {
        this.productID = productID;
        this.productTitle = productTitle;
        this.productImageUrlOne = productImageUrlOne;
        this.productImageUrlTwo = productImageUrlTwo;
        this.productImageUrlThree = productImageUrlThree;
        this.productImageUrlFour = productImageUrlFour;
        this.productCategory = productCategory;
        this.productDescription = productDescription;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
    }
}
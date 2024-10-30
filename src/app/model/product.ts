export class Product {
    objectId: string;
    productID: string;
    productTitle: string;
    productImageUrlOne: string;
    productImageUrlTwo: string;
    productImageUrlThree: string;
    productImageUrlFour: string;
    productImageUrlFive: string;
    productSells: number;
    productDescription: string;
    productCategory: string;
    productQuantity: number;
    productPrice: number;

    constructor(
        objectId: string,
        productID: string,
        productTitle: string,
        productImageUrlOne: string,
        productImageUrlTwo: string,
        productImageUrlThree: string,
        productImageUrlFour: string,
        productImageUrlFive: string,
        productSells: number,
        productCategory: string,
        productDescription: string,
        productQuantity: number,
        productPrice: number) {
        this.objectId = objectId;
        this.productID = productID;
        this.productTitle = productTitle;
        this.productImageUrlOne = productImageUrlOne;
        this.productImageUrlTwo = productImageUrlTwo;
        this.productImageUrlThree = productImageUrlThree;
        this.productImageUrlFour = productImageUrlFour;
        this.productImageUrlFive = productImageUrlFive;
        this.productSells = productSells;
        this.productCategory = productCategory;
        this.productDescription = productDescription;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
    }
}
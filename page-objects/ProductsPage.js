import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";
import { isDesktopViewport } from "../utils/isDesktopViewport";

export class ProductsPage{

constructor (page) {

    this.page = page;
    this.addToBasketButton = page.locator('[data-qa="product-button"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');

}
visit = async () => {

    await this.page.goto("/");

}

addProductToBasket = async (index) => {
    const specificAddButton = this.addToBasketButton.nth(index);

    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");

    const navigation = new Navigation(this.page);
    
    //only for desktop
    let beforeAddProduct;
    if (isDesktopViewport(this.page)) {
        beforeAddProduct = await navigation.getBasketCount();
    }
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    //only for desktop
    let afterAddProduct
    if (isDesktopViewport(this.page)) {
        const afterAddProduct = await navigation.getBasketCount();
        expect(afterAddProduct).toBeGreaterThan(beforeAddProduct);
    }

 }

 sortByCheapest = async () => {

    await this.productTitle.first().waitFor();
    const productsTitleBeforeSorting = await this.productTitle.allInnerTexts();
    await this.sortDropdown.waitFor();
    await this.sortDropdown.selectOption("price-asc");
    const productsTitleAfterSorting = await this.productTitle.allInnerTexts();
    expect(productsTitleAfterSorting) .not.toEqual(productsTitleBeforeSorting);
 }
}
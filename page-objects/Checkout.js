import { expect } from "@playwright/test";

export class Checkout {

    constructor (page) {

        this.page = page;
        this.basketCards = page.locator('[data-qa="basket-card"]');
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButtnon = page.locator('[data-qa="continue-to-checkout"]');
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor();
        const basketItemsBeforeRemoval = await this.basketCards.count();
        await this.basketItemPrice.first().waitFor();
        const allPricesText =  await this.basketItemPrice.allInnerTexts();
        //console.warn(allPricesText);

        const justNumbers = allPricesText.map((element) => {
        const wothoutDollarSign = element.replace("$", "");
        return parseInt(wothoutDollarSign, 10);
        })

        const smallestPrice = Math.min(...justNumbers);
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice);

        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();

        await expect(this.basketCards).toHaveCount(basketItemsBeforeRemoval-1);
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButtnon.waitFor();
        await this.continueToCheckoutButtnon.click();

        await this.page.waitForURL(/\/login/, {timeout: 3000})
    }
}
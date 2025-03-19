import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation{
    constructor (page) {
        this.page = page;

        this.busketCounter = page.locator('[data-qa="header-basket-count"]');
        //  page.locator('[data-qa="desktop-nav-link"]');
        this.checkoutLink = page.getByRole('link', {name: 'Checkout'});
        this.burgerMenu = page.locator('[data-qa="burger-button"]');
    }

    getBasketCount = async () => {
        await this.busketCounter.waitFor();
        const text = await this.busketCounter.innerText();
    return parseInt(text, 10);
    }  

    gotoCheckout = async () => {
        //if mobile click to burger
        if (!isDesktopViewport(this.page)) {
            await this.burgerMenu.waitFor();
            await this.burgerMenu.click();
        }
        await this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL("/basket");
    }
}


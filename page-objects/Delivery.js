import { expect } from "@playwright/test";

export class Delivery {
    
    constructor ( page ) {
        this.page = page;

        this.firstName = page.locator('[data-qa="delivery-first-name"]');
        this.lastName = page.locator('[data-qa="delivery-last-name"]');
        this.street = page.locator('[data-qa="delivery-address-street"]');
        this.postCode = page.locator('[data-qa="delivery-postcode"]');
        this.city = page.locator('[data-qa="delivery-city"]');
        this.country = page.locator('[data-qa="country-dropdown"]');
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]');
        this.saveAddressButton = page.locator('[data-qa="save-address-button"]');
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]');
        
        this.firstNameContainer = page.locator('[data-qa="saved-address-firstName"]');
        this.lastNameContainer = page.locator('[data-qa="saved-address-lastName"]');
        this.streetContainer = page.locator('[data-qa="saved-address-street"]');
        this.postCodeContainer = page.locator('[data-qa="saved-address-postcode"]');
        this.cityContainer = page.locator('[data-qa="saved-address-city"]');
        this.countryContainer = page.locator('[data-qa="saved-address-country"]');
    }

    fillTextFields = async (deliveryDetails) => {

        await this.firstName.waitFor();
        await this.firstName.fill(deliveryDetails.firstName);
        await this.lastName.waitFor();
        await this.lastName.fill(deliveryDetails.lastName);
        await this.street.waitFor();
        await this.street.fill(deliveryDetails.street);
        await this.postCode.waitFor();
        await this.postCode.fill(deliveryDetails.postCode);
        await this.city.waitFor();
        await this.city.fill(deliveryDetails.city);

    }

    selectCountry = async (deliveryDetails) => {

        await this.country.waitFor();
        await this.country.selectOption(deliveryDetails.country);

    }

    continueToPayment = async () => {

        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();

        await this.page.waitForURL(/\/payment/, {timeout: 3000})

    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.saveAddressContainer.count();

        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();

        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1);

        await this.firstNameContainer.first().waitFor();
        expect(await this.firstNameContainer.first().innerText()).toBe(await this.firstName.inputValue());

        await this.lastNameContainer.first().waitFor();
        expect(await this.lastNameContainer.first().innerText()).toBe(await this.lastName.inputValue());

        await this.streetContainer.first().waitFor();
        expect(await this.streetContainer.first().innerText()).toBe(await this.street.inputValue());

        await this.postCodeContainer.first().waitFor();
        expect(await this.postCodeContainer.first().innerText()).toBe(await this.postCode.inputValue());

        await this.cityContainer.first().waitFor();
        expect(await this.cityContainer.first().innerText()).toBe(await this.city.inputValue());

        await this.countryContainer.first().waitFor();
        expect(await this.countryContainer.first().innerText()).toBe(await this.country.inputValue());
    }
}


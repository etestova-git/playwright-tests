import { expect } from "@playwright/test"
import { paymentDetails } from "../data/paymentDetils";

export class PaymentPage {

    constructor (page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]');
        this.discountInput = page.getByPlaceholder('Discount code'); 
        this.discountButton = page.locator('[data-qa="submit-discount-button"]');
        this.discountMessage = page.locator('[data-qa="discount-active-message"]');
        this.totalValue = page.locator('[data-qa="total-value"]');
        this.totalWithDiscountValue = page.locator('[data-qa="total-with-discount-value"]');
        
        this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]');
        this.creditCardNumber = page.locator('[data-qa="credit-card-number"]');
        this.creditCardDate = page.locator('[data-qa="valid-until"]');
        this.creditCardCvc = page.locator('[data-qa="credit-card-cvc"]');
        
        this.payButton = page.locator('[data-qa="pay-button"]');
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountInput.waitFor();
        
        //option1
        await this.discountInput.fill(code);
        await expect(this.discountInput).toHaveValue(code);
        
        //option2
        //await this.discountInput.focus();
        //await this.page.keyboard.type(code, {delay: 1000});
       // expect(await this.discountInput.inputValue()).toBe(code);

        expect(await this.discountMessage.isVisible()).toBe(false);
        expect(await this.totalWithDiscountValue.isVisible()).toBe(false);
        
        await this.discountButton.waitFor();
        await this.discountButton.click();

        await this.discountMessage.waitFor();

        await this.totalValue.waitFor();
        const totaValueString = await this.totalValue.innerText();        
        const totalValueStringNumber = totaValueString.replace("$", "");
        const totalValueNumber = parseInt(totalValueStringNumber, 10);

        await this.totalWithDiscountValue.waitFor();
        const totalWithDiscountString = await this.totalWithDiscountValue.innerText();
        const totalWithDiscountStringNumber = totalWithDiscountString.replace("$", "");
        const totalWithDiscountNumber = parseInt(totalWithDiscountStringNumber, 10);

        expect(totalWithDiscountNumber).toBeLessThan(totalValueNumber);
    }

    fillPaymentDetails = async (paymentDetails) => {

        await this.creditCardOwner.waitFor();
        await this.creditCardOwner.fill(paymentDetails.creditCardOwner);
        await this.creditCardNumber.waitFor();
        await this.creditCardNumber.fill(paymentDetails.creditCardNumber);   
        await this.creditCardDate.waitFor();
        await this.creditCardDate.fill(paymentDetails.validDate);   
        await this.creditCardCvc.waitFor();
        await this.creditCardCvc.fill(paymentDetails.CVC);            

    }

    completePayment = async () => {

        await this.payButton.waitFor();
        await this.payButton.click();

       await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
    }
}
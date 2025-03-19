import { expect, test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage";
import {Navigation } from "../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { Delivery } from "../page-objects/Delivery";
import { deliveryDetails } from "../data/deliveryDetails";
import { PaymentPage } from "../page-objects/PaymentPage";
import { paymentDetails } from "../data/paymentDetils";

test("New User Joney", async({ page }) => {

    const productsPage = new ProductsPage(page);
    await productsPage.visit();

    await productsPage.sortByCheapest();
    await productsPage.addProductToBasket(0);
    await productsPage.addProductToBasket(1);
    await productsPage.addProductToBasket(2);

    const navigation = new Navigation(page);
    await navigation.gotoCheckout();

    const checkout = new Checkout (page);
    await checkout.removeCheapestProduct();

    await checkout.continueToCheckout();

    const loginPage = new LoginPage(page);
    await loginPage.gotoRegisterPage();

    const registerPage = new RegisterPage(page);
    const email = uuidv4() + "@gmail.com";
    const password = uuidv4();
    await registerPage.signUpAsNewUser(email, password);

    const deliveryPage = new Delivery(page);
    await deliveryPage.fillTextFields(deliveryDetails);
    await deliveryPage.selectCountry(deliveryDetails);

    await deliveryPage.saveDetails();
    await deliveryPage.continueToPayment();

    const paymentPage = new PaymentPage(page);
    await paymentPage.activateDiscount();
    await paymentPage.fillPaymentDetails(paymentDetails);

    await paymentPage.completePayment();

})
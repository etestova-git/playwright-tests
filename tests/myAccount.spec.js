import test from "@playwright/test";
import { MyAccount } from "../page-objects/MyAccount";
import { getLoginToken } from "../API-calls/getLoginToken";
import { adminDetails } from "../data/userDetails";

test ("My account using cookie injection", async ({page}) => {

    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);

    const myAccount = new MyAccount (page);
    await myAccount.visit();
    await page.pause();
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode;
    }, [loginToken]);
    await myAccount.visit();
    await myAccount.waitForPageHeading();
    await page.pause();
}) 
test ("My account mocked error message", async ({page}) => {

    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);

    await page.route('**/api/user**', async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'PLAYWRIGHT ERROR FROM MOCKING' })
        })
    })

    const myAccount = new MyAccount (page);
    await myAccount.visit();
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode;
    }, [loginToken]);

    await myAccount.visit();

    await myAccount.waitForPageHeading();
    await myAccount.waitForErrorMessage();
}) 
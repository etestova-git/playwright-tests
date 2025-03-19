import { expect } from "@playwright/test";

export class RegisterPage{
    constructor (page) {
        this.page = page;
        this.userEmail = page.getByPlaceholder('E-Mail');
        this.userPassword = page.getByPlaceholder('Password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    signUpAsNewUser = async (email, password) => {

        await this.userEmail.waitFor();
        await this.userEmail.fill(email);
        
        await this.userPassword.waitFor();
        await this.userPassword.fill(password);
        await this.registerButton.waitFor();
        await this.registerButton.click();

    }
}
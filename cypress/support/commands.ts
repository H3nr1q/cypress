/// <reference types="cypress" />

import { LoginPage } from "../page-objects-models/Login/LoginPage";

Cypress.Commands.add("login", (): void => {
    const loginPage = new LoginPage();
    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');
    loginPage.visit();
    loginPage.login(username, password);
});

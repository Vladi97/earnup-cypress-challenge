/// <reference types="cypress" />
import { LoginPage } from "../page-objects/LoginPage";
import accounts from "../fixtures/accounts.json";

describe("Should allow user to login and logout",
    { tags: ['@functional'] }, () => {
        let loginPage;

        before(() => {
            loginPage = new LoginPage();
        });

        beforeEach(() => {
            loginPage.navigateToWebsite();
            loginPage.verifyTitles();
        });

        it('User is able to login with standard user',()=> {
            loginPage.enterUsername(accounts.standard_user.username);
            loginPage.enterPassword(accounts.standard_user.password);
            loginPage.clickLoginButton();
            cy.assertTextOnElement('#header_container .header_secondary_container .title', 'Products');
        })

        it('User is not able to login with locked account',()=> {
            loginPage.enterUsername(accounts.locked_out_user.username);
            loginPage.enterPassword(accounts.locked_out_user.password);
            loginPage.clickLoginButton();
            cy.assertTextOnElement('#login_button_container .error-message-container h3', 'Epic sadface: Sorry, this user has been locked out.');
        })

        it('User is not able to login with invalid credentials',()=> {
            loginPage.enterUsername(accounts.locked_out_user.username+'1');
            loginPage.enterPassword(accounts.locked_out_user.password);
            loginPage.clickLoginButton();
            cy.assertTextOnElement('#login_button_container .error-message-container h3', 'Epic sadface: Username and password do not match any user in this service');
        })

        it('User is not able to login with valid username and no password',()=> {
            loginPage.enterUsername(accounts.standard_user.username);
            loginPage.clickLoginButton();
            cy.assertTextOnElement('#login_button_container .error-message-container h3', 'Epic sadface: Password is required');
        })

        it('User is not able to login with valid password and no username',()=> {
            loginPage.enterPassword(accounts.standard_user.password);
            loginPage.clickLoginButton();
            cy.assertTextOnElement('#login_button_container .error-message-container h3', 'Epic sadface: Username is required');
        })

        it('User is not able to logout',()=> {
            loginPage.enterUsername(accounts.standard_user.username);
            loginPage.enterPassword(accounts.standard_user.password);
            loginPage.clickLoginButton();
            cy.assertTextOnElement('#header_container .header_secondary_container .title', 'Products');
            loginPage.clickLogOut();
            cy.get('#login_button_container').should('exist');
        })

        after(() => {
            cy.stop();
        });
    });

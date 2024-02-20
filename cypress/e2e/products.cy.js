/// <reference types="cypress" />
import { LoginPage } from "../page-objects/LoginPage";
import { ProductPage } from "../page-objects/ProductPage";
import accounts from "../fixtures/accounts.json";
import products from "../fixtures/testProduct.json";

describe("Should allow user to login and logout",
    { tags: ['@functional'] }, () => {
        let productPage;
        let loginPage;

        before(() => {
            loginPage = new LoginPage();
            productPage = new ProductPage();
        });

        beforeEach(() => {
            loginPage.navigateToWebsite();
            loginPage.verifyTitles();
            loginPage.enterUsername(accounts.standard_user.username);
            loginPage.enterPassword(accounts.standard_user.password);
            loginPage.clickLoginButton();
        });

        it('User is able to open product\'s details page',()=> {
            productPage.openProductDetails(products.name);
            cy.assertTextOnElement('#back-to-products', 'Back to products');
        });

        it('User is able to go back to products list',()=> {
            productPage.openProductDetails(products.name);
            productPage.backToProductsList();
            cy.assertTextOnElement('.header_secondary_container .title', 'Products');
        });

        it('User is able to add products to cart',()=> {
            productPage.resetState();
            productPage.openProductDetails(products.name);
            productPage.addProductToCart();
            productPage.goToCart();
            cy.assertTextOnElement('.cart_list .cart_item .inventory_item_name', products.name);
        });

        after(() => {
            cy.stop();
        });
    });


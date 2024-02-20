import { productAdded } from "../e2e/products.cy";

export class ProductPage {
    constructor() {
    }

    verifyTitles() {
        cy.title({timeout: 6000}).should('eq', 'Swag Labs');
    }

    openProductDetails(productName) {
        cy.get('#inventory_container .inventory_item .inventory_item_name', {timeout: 7000}).contains(productName).click({force: true});
    }

    addProductToCart(){
        cy.get('#add-to-cart-sauce-labs-backpack', {timeout: 7000}).click({force: true});
    }

    backToProductsList() {
        cy.get('#header_container #back-to-products', {timeout: 7000}).click({force: true});
    }

    goToCart() {
        cy.get('a.shopping_cart_link', {timeout: 7000}).click({force: true});
    }

    resetState() {
        cy.get('#react-burger-menu-btn', {timeout: 7000}).click({force: true});
        cy.get('#reset_sidebar_link', {timeout: 7000}).click({force: true});
    }
}

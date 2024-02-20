export class LoginPage {
    url = "https://www.saucedemo.com/";

    constructor() {
    }

    navigateToWebsite() {
        cy.visit(this.url);
    }

    verifyTitles() {
        cy.title({timeout: 6000}).should('eq', 'Swag Labs');
    }

    enterUsername(username) {
        cy.get('#login_button_container #user-name', {timeout: 7000}).type(username);
    }

    enterPassword(password) {
        cy.get('#login_button_container #password', {timeout: 7000}).type(password);
    }

    clickLoginButton() {
        cy.get('#login-button', {timeout: 7000}).click({force: true});
    }

    clickLogOut() {
        cy.get('#react-burger-menu-btn', {timeout: 7000}).click({force: true});
        cy.get('#logout_sidebar_link', {timeout: 7000}).click({force: true});
    }
}

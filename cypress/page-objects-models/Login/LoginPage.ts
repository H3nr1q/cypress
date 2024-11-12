export class LoginPage{
    private usernameInput: string = '#username';
    private passwordInput: string = '#password';
    private kcloginButton: string = '#kc-login';
    private inputError: string = '#input-error';

    visit(){
        cy.visit('/')
    }

    fillUserName(username: string){
        cy.get(this.usernameInput).type(username)
    }

    fillPasswor(password: string){
        cy.get(this.passwordInput).type(password)
    }

    submit(){
        cy.get(this.kcloginButton).click();
    }

    login(username: string, password: string){
        this.fillUserName(username);
        this.fillPasswor(password);
        this.submit();
    }

    checkErrorMessageVisible() {
        cy.get(this.inputError).should('be.visible'); 
    }
    
    checkErrorMessageText(expectedText: string) {
        cy.get(this.inputError).should('contain.text', expectedText);
    }
}
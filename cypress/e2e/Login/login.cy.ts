import { LoginPage } from "../../page-objects-models/Login/LoginPage"

describe('Suite test login', () => {
  it('Login Válido', () => {
    cy.login();
    // Usando a task para enviar a mensagem UDP
    cy.log('Enviando mensagem de conectado para o socket')
    cy.wait(5000)
    cy.task('sendUdpMessage', {
      host: 'localhost',
      port: 53004,
      message: '%N-22.05347223n0.010E-47.85417925e0.010D828.759d0.010F000V000x1y1U12T19I6G0.50Y8.9u3.9o190.4S3.9a2ç1^1'
    });
    cy.get('.connection-text').should('contain.text', 'Conectado');
    cy.wait(15000)
    cy.get('.logout-button').should('be.visible');
    cy.get('.logout-button').click();
   
  })
  
  it.skip('Login Inválido', () => {
    const loginPage = new LoginPage();
    loginPage.visit();
    cy.fixture('user').then((user)=>{
      const invalidUser = user.userInvalid
      loginPage.login(invalidUser.username, invalidUser.password)
    })
    loginPage.checkErrorMessageVisible();
    loginPage.checkErrorMessageText('Nome de usuário ou senha inválida.');
  })
})
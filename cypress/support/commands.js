// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getToken', () => {
    cy.api({
        method: 'POST',
        url: '/sessions',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            email: 'leo.ferreira@mail.io',
            password: 'wasd@123'
        }
    }).then((response) => {
        expect(response.status).to.eq(200)

        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('back2Past', () => {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/6296ac89b1421500162c0ae8'
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('seedChar', (characters) => {
    characters.forEach((char, index) => {
        cy.postChar(char, index)
    })
})

Cypress.Commands.add('postChar', (char, index) => {
    cy.api({
        method: 'POST',
        url: '/characters',
        body: char,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(201)
        Cypress.env(`charId[${index}]`, response.body.character_id)
    })
})

Cypress.Commands.add('getChar', () => {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('getCharByName', (char) => {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        qs: {
            name: char.name
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200)

        expect(response.body[0]).to.have.property('name');
        expect(response.body[0].name).to.be.eql(char.name)

        expect(response.body[0]).to.have.property('age');
        expect(response.body[0].age).to.be.eql(char.age)

        expect(response.body[0]).to.have.property('alias');
        expect(response.body[0].alias).to.be.eql(char.alias)

        expect(response.body[0]).to.have.property('team');
        expect(response.body[0].team).to.be.eql(char.team)

        expect(response.body[0]).to.have.property('active');
        expect(response.body[0].active).to.be.true
    })
})

Cypress.Commands.add('getCharById', (id) => {
    cy.api({
        method: 'GET',
        url: '/characters/' + id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('delCharById', (id) => {
    cy.api({
        method: 'DELETE',
        url: '/characters/' + id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    }).then((response) => {
        return response
    })
})

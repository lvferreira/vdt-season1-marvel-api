import requests from '../support/requests/character';

describe('DELETE /characters', () => {

    const characters = [
        {
            team: [
                "Avengers",
                "S.h.i.e.l.d",
                "U.S. Army"
            ],
            name: "Steve Rogers",
            age: 47,
            alias: "Captain America",
            active: true
        },
        {
            team: [
                "Avengers",
                "Brotherhood of Mutants",
                "Inhumans",
                "X-Factor",
                "X-Men"
            ],
            name: "Pietro Maximoff",
            age: 28,
            alias: "Quicksilver",
            active: true
        },
        {
            team: [
                "Avengers",
                "Fantastic Four",
                "X-Men"
            ],
            name: "Peter Parker",
            age: 22,
            alias: "Spider-Man",
            active: true
        }
    ]

    before(() => {
        // cy.back2Past()
        cy.getToken()
        cy.seedChar(characters)
    })

    context('Request DELETE Marvel Characters API Endpoint', () => {

        it('Should DELETE Character By Id', () => {
            characters.forEach((char, index) => {
                cy.api(requests.delCharById(index))
                    .then((response) => {
                        expect(response.status).to.eq(204);
                    })
            })
        })

        it('Should GET 404 When Deleting Unregistered Id', () => {
            const id = '62cf5f7caed38c1b46008c18'
            cy.delCharById(id)
                .then((response) => {
                    expect(response.status).to.eq(404)
                })
        })
    })

    after(() => {
        characters.forEach((char, index) => {
            cy.api(requests.getCharById(index))
                .then((response) => {
                    expect(response.status).to.eq(404);
                })
        })
    })
})
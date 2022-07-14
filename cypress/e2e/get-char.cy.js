import requests from '../support/requests/character';

describe('GET /characters', () => {

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

    context('Request GET Marvel Characters API Endpoint', () => {

        it('Should GET Characters List', () => {
            cy.api(requests.getChar())
                .then((response) => {
                    expect(response.status).to.eq(200);
                    characters.forEach((char, index) => {
                        expect(response.body[index]).to.have.property('name');
                        expect(response.body[index].name).to.be.eql(char.name)

                        expect(response.body[index]).to.have.property('age');
                        expect(response.body[index].age).to.be.eql(char.age)

                        expect(response.body[index]).to.have.property('alias');
                        expect(response.body[index].alias).to.be.eql(char.alias)

                        expect(response.body[index]).to.have.property('team');
                        expect(response.body[index].team).to.be.eql(char.team)

                        expect(response.body[index]).to.have.property('active');
                        expect(response.body[index].active).to.be.true
                    })
                })
        })

        it('Should GET Character By Name', () => {
            characters.forEach((char) => {
                cy.getCharByName(char)
            })
        })

        it('Should GET Character By Id', () => {
            characters.forEach((char, index) => {
                cy.api(requests.getCharById(index))
                    .then((response) => {
                        expect(response.status).to.eq(200);

                        expect(response.body).to.have.property('_id');
                        expect(response.body._id).to.be.eql(Cypress.env(`charId[${index}]`))

                        expect(response.body).to.have.property('name');
                        expect(response.body.name).to.be.eql(char.name)

                        expect(response.body).to.have.property('age');
                        expect(response.body.age).to.be.eql(char.age)

                        expect(response.body).to.have.property('alias');
                        expect(response.body.alias).to.be.eql(char.alias)

                        expect(response.body).to.have.property('team');
                        expect(response.body.team).to.be.eql(char.team)

                        expect(response.body).to.have.property('active');
                        expect(response.body.active).to.be.true
                    })
            })
        })

        it('Should GET 404 When Searching Unregistered Id', () => {
            const id = '62cf5f7caed38c1b46008c18'
            cy.getCharById(id)
                .then((response) => {
                    expect(response.status).to.eq(404)
                })
        })
    })
})
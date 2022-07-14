import requests from '../support/requests/character';
import factory from '../factories/index';

describe('POST /characters', () => {

    before(() => {
        // cy.back2Past()
        cy.getToken()
    })

    context('Add New Marvel Character', () => {

        it('Should Create New Character', () => {

            cy.api(requests.addChar(factory.char()))
                .then((response) => {
                    expect(response.status).to.eq(201);
                    expect(response.body.character_id.length).to.be.eql(24)
                })
        })
    })

    context('Validate Duplicate Character', () => {

        const char = {
            name: 'Pietro Maximoff',
            age: '28',
            alias: 'Quicksilver',
            team: [
                'Avengers',
                'Brotherhood of Mutants',
                'Inhumans',
                'X-Factor',
                'X-Men'
            ],
            active: true
        }

        before(() => {
            cy.postChar(char)
        })

        it('Should Not Register Duplicate Character', () => {

            cy.api(requests.addChar(char))
                .then((response) => {
                    expect(response.status).to.eq(400);

                    expect(response.body).to.have.property('error')
                    expect(response.body.error).to.be.eql('Duplicate character')
                })

        })
    })

    context('Validate Mandatory Fields', function () {

        const characters = [
            {
                name: '',
                alias: 'Professor X',
                team: ['x-men', 'vingadores'],
                active: true
            },
            {
                alias: 'Professor X',
                team: ['x-men', 'vingadores'],
                active: true
            },
            {
                name: 'Charles Xavier',
                alias: '',
                team: ['x-men', 'vingadores'],
                active: true
            },
            {
                name: 'Charles Xavier',
                team: ['x-men', 'vingadores'],
                active: true
            },
            {
                name: 'Charles Xavier',
                alias: 'Professor X',
                team: '',
                active: true
            },
            {
                name: 'Charles Xavier',
                alias: 'Professor X',
                active: true
            },
            {
                name: 'Charles Xavier',
                alias: 'Professor X',
                team: ['x-men', 'vingadores']
            }

        ]

        characters.forEach((char) => {
            it('Should Not Register Character', () => {
                cy.api(requests.addChar(char))
                    .then((response) => {
                        expect(response.status).to.eq(400)
                        cy.log(response.body.validation.body.message)
                        const message = response.body.validation.body.message
                        const hasItemDetails = (message.includes('is required') || message.includes('is not allowed to be empty') || message.includes('must be an array'))
                        expect(hasItemDetails).to.be.true
                    })
            })
        })
    })

})
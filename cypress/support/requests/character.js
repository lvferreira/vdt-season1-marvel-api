

const addChar = (char) => {
    let request = {
        method: 'POST',
        url: '/characters',
        body: char,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    }
    return request;
}

const getChar = () => {
    let request = {
        method: 'GET',
        url: '/characters',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    }
    return request;
}

const getCharById = (index) => {
    let request = {
        method: 'GET',
        url: '/characters/' + Cypress.env(`charId[${index}]`),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    }
    return request;
}

const delCharById = (index) => {
    let request = {
        method: 'DELETE',
        url: '/characters/' + Cypress.env(`charId[${index}]`),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cypress.env('token')
        },
        failOnStatusCode: false
    }
    return request;
}

export default { addChar, getChar, getCharById, delCharById };
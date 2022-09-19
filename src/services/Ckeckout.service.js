import http from '../utils/http'

export function getAuhotizationCheckout(email, item) {

    let payload = {
        "authentication": {
            "email": process.env.REACT_APP_EMAIL_SANDBOX,
            "token": process.env.REACT_APP_TOKEN_SANDBOX 
        },
        "senderEmail": email || 'c11991480454038876562@sandbox.pagseguro.com.br',
        "item": item
    }
    
    return http.post('/checkout', payload)
        .then(resp => {
            console.log(resp.data)
            return resp.data.code
        })
        .catch(error => {
            console.log(error)
            console.log(`ERROR: ${error.response.data}`);
        });
}

export function getSessionCheckout() {

    return http.post('/sessions')
    .then(resp => {
        console.log(resp.data)
        return resp.data.session
    })
    .catch(error => {
        console.log(error)
        console.log(`ERROR: ${error.response.data}`);
    });
}
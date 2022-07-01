import checkoutPags from '../utils/checkoutPags'
import convert from 'xml-js'
import qs from 'qs';

export function getAuhotizationCheckout(email, item) {

    let queryParams = {};
    queryParams.email = process.env.REACT_APP_EMAIL_SANDBOX;
    queryParams.token = process.env.REACT_APP_TOKEN_SANDBOX;

    let payload = {
        ...queryParams,
        'currency': 'BRL',
        ...item,
        'reference': '124665c23f7896adff508377925',
        'senderName': 'Jose Comprador',
        'senderAreaCode': 11,
        'senderPhone': 56713293,
        'senderCPF': 38440987803,
        'senderBornDate': '12/03/1990',
        'senderEmail': email || 'c11991480454038876562@sandbox.pagseguro.com.br',
        'shippingType': 1,
        'shippingAddressStreet': 'Av.Brig.Faria Lima',
        'shippingAddressNumber': 1384,
        'shippingAddressComplement': '2o andar',
        'shippingAddressDistrict': 'Jardim Paulistano',
        'shippingAddressPostalCode': '01452002',
        'shippingAddressCity': 'Sao Paulo',
        'shippingAddressState': 'SP',
        'shippingAddressCountry': 'BRA',
        //'extraAmount': -0.01,
        //'redirectURL': 'http://localhost:3000',
        //'notificationURL': 'https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/',
        'maxUses': 1,
        'maxAge': 3000
    }

    let config = {
        params: { ...queryParams },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=ISO-8859-1',
            //'Content-Type': 'text/plain',
            //'Accept-Encoding': 'ISO-8859-1',
            'Accept': 'application/xml;charset=ISO-8859-1',
            //'Access-Control-Allow-Origin': 'http://localhost:3000/',
            //'Access-Control-Expose-Headers': 'Content-Length, X-JSON',
            //'Access-Control-Allow-Credentials':false,
            //'Access-Control-Allow-Headers': '*',
            //'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
    }

    return checkoutPags.post('/checkout', qs.stringify(payload), config)
        .then(resp => {
            console.log(resp.data)
            let responseJSON = JSON.parse(convert.xml2json(resp.data, { compact: true, spaces: 2 }))
            console.log(responseJSON)
            return responseJSON.checkout.code._text
        })
        .catch(error => {
            console.log(error)
            console.log(`ERROR: ${error.response.data}`);
        });
}
import React, { useCallback } from 'react'
import {
    Form,
    Input,
    notification,
    Button,
    Space
} from 'antd';
import * as CkeckoutSvc from '../../services/Ckeckout.service';

function EncryptedCard() {

    const [form] = Form.useForm();

    // eslint-disable-next-line
    const setTokenValue = (value) => {
        form.setFieldsValue({
            token: value
        });
    };

    const handleFormSubmit = useCallback(
        async (form) => {

            console.log(form)
            console.log(form.cardNumber.substring(0, 6))

            var brand = 'visa'

            try {

                let sessionId = await CkeckoutSvc.getSessionCheckout()
                console.log(sessionId)

                window.PagSeguroDirectPayment.setSessionId(sessionId)


                window.PagSeguroDirectPayment.getBrand({
                    cardBin: form.cardNumber.substring(0, 6),
                    success: function (response) {
                        console.log(response)
                        brand = response.data.name
                    },
                    error: function (response) {
                        //tratamento do erro
                        console.log(response)
                    },
                    complete: function (response) {
                        //tratamento comum para todas chamadas
                        console.log('complete getBrand')
                    }
                });

                window.PagSeguroDirectPayment.createCardToken({
                    cardNumber: form.cardNumber, // Número do cartão de crédito
                    brand: brand, // Bandeira do cartão
                    cvv: form.cvv, // CVV do cartão
                    expirationMonth: form.expirationMonth, // Mês da expiração do cartão
                    expirationYear: form.expirationYear, // Ano da expiração do cartão, é necessário os 4 dígitos.
                    success: function (response) {
                        console.log(response)
                        setTokenValue(response.card.token)
                        // Retorna o cartão tokenizado.
                        console.log('Cartão Cryptografado com sucesso!!!')
                    },
                    error: function (response) {
                        // Callback para chamadas que falharam.
                        console.log(response)
                    },
                    complete: function (response) {
                        // Callback para todas chamadas.
                        console.log('complete CardToken')
                    }
                });

                notification.success({
                    message: `Cartão Cryptografado com sucesso!!!`,
                });
            } catch (error) {
                notification.error({
                    message: `Erro ao cryptografar cartão: ${error}`,
                });
            }
        },
        []
    );

    return (
        <>
            <Form
                form={form}
                onFinish={handleFormSubmit}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}>

                <Form.Item name={'cardNumber'} label="Card Number">
                    <Input />
                </Form.Item>

                <Form.Item name={'cvv'} label="CVV">
                    <Input />
                </Form.Item>

                <Form.Item name={'expirationMonth'} label="Month valid">
                    <Input />
                </Form.Item>

                <Form.Item name={'expirationYear'} label="Year Valid">
                    <Input />
                </Form.Item>


                <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Encrypted
                        </Button>
                    </Space>
                </Form.Item>

                <Form.Item name="token" label="Token">
                    <Input />
                </Form.Item>

            </Form>
        </>
    );
}

export default EncryptedCard;
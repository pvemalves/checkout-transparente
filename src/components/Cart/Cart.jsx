import React, { useCallback, useState } from 'react'
import {
    Form,
    Input,
    InputNumber,
    notification,
    Button,
    Space
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import * as CkeckoutSvc from '../../services/Ckeckout.service';

function Cart() {

    const [form] = useForm();
    const [callLightbox, setCallLightbox] = useState(false)

    const handleFormSubmit = useCallback(
        async (form) => {

            const itemDto = {
                itemId1: form.itemId,
                itemDescription1: form.description,
                itemAmount1: form.amount,
                itemQuantity1: form.quantity,
                shippingCost: form.shippingCost,
                itemWeight1: 300
            };

            console.log(itemDto)
            console.log(callLightbox)

            try {

                let ckeckoutCode = await CkeckoutSvc.getAuhotizationCheckout(form.email, itemDto)
                console.log(ckeckoutCode)

                if (callLightbox) {
                    //Insira o código de checkout gerado no Passo 1
                    var callback = {
                        success: function (transactionCode) {
                            //Insira os comandos para quando o usuário finalizar o pagamento. 
                            //O código da transação estará na variável "transactionCode"
                            console.log("Compra feita com sucesso, código de transação: " + transactionCode);
                        },
                        abort: function () {
                            //Insira os comandos para quando o usuário abandonar a tela de pagamento.
                            console.log("abortado");
                        }
                    };
                    //Chamada do lightbox passando o código de checkout e os comandos para o callback
                    var isOpenLightbox = window.PagSeguroLightbox(ckeckoutCode, callback);
                    // Redireciona o comprador, caso o navegador não tenha suporte ao Lightbox
                    if (!isOpenLightbox) {
                        window.location.href = `https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${ckeckoutCode}`;
                        console.log("Redirecionamento")
                    }
                } else {
                    console.log(`https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${ckeckoutCode}`)

                    //window.location.href = `https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${ckeckoutCode}`
                    window.open(`https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${ckeckoutCode}`);
                }
                notification.success({
                    message: 'Redirecionando para pagamento!!!',
                });
            } catch (error) {
                notification.error({
                    message: `Erro ao abrir ckeckout: ${error}`,
                });
            }
        },
        [callLightbox]
    );

    return (
        <>
            <Form
                form={form}
                onFinish={handleFormSubmit}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}>

                <Form.Item name={'email'} label="E-mail">
                    <Input
                        defaultValue="jose@sandbox.pagseguro.com.br"                    
                    />
                </Form.Item>

                <Form.Item name={'itemId'} label="Id">
                    <Input />
                </Form.Item>

                <Form.Item name={'description'} label="Description">
                    <Input />
                </Form.Item>

                <Form.Item name={'quantity'} label="Quantity">
                    <InputNumber min={1} max={100} />
                </Form.Item>

                <Form.Item name={'amount'} label="Amount">
                    <InputNumber
                        style={{
                            width: 200,
                        }}
                        defaultValue="0"
                        min="0"
                        max="9999999"
                        step="0.01"
                        stringMode                        
                    />
                </Form.Item>

                <Form.Item name={'shippingCost'} label="Shipping Cost">
                    <InputNumber
                        style={{
                            width: 200,
                        }}
                        defaultValue="0"
                        min="0"
                        max="9999999"
                        step="0.01"
                        stringMode
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                    <Space>
                        <Button type="primary" htmlType="submit" onClick={e => { setCallLightbox(false) }}>
                            Redirect
                        </Button>
                        <Button type="primary" htmlType="submit" onClick={e => { setCallLightbox(true) }}>
                            LightBox
                        </Button>
                        <Button type="primary" onClick={e => { window.open('http://lojamodelo.com.br') }}>
                            Transparente
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}

export default Cart;
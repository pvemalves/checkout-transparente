import React from 'react';

import {
  Typography,
  Space,
  Divider,
} from 'antd';
import './App.less';
import Cart from '../Cart/Cart';

const { Title } = Typography;

const App = () => (
  <>
    <section style={{ textAlign: 'center', marginTop: 48, marginBottom: 20 }}>
      <Space align="start">
        <img
          src="https://assets.pagseguro.com.br/ps-bootstrap/v6.82.1/img/logos/pagbank/pagbank-logo-animado_35px.gif"
          alt="PagSeguro"
        />
      </Space>
    </section>

    <section style={{ textAlign: 'center', marginTop: 10, marginBottom: 15 }}>
      <Space align="start">
        <Title level={2} style={{ marginBottom: 0 }}>
          Checkouts
        </Title>
      </Space>
    </section>
    <Divider style={{ marginBottom: 60 }}>Carrinho</Divider>
    <Cart />
  </>
);

export default App;
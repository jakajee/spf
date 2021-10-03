import { Route } from 'react-router';

import '../node_modules/bootswatch/dist/flatly/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './custom.css';

import Layout from './components/Layout';
import ReceiptMain from './components/Receipts/ReceiptMain';
import ProductMain from './components/Products/ProductMain';
import CustomerMain from './components/Customers/CustomerMain';

export default () => (
    <Layout>
        <Route path="/receipts" component={ReceiptMain} />
        <Route path="/customers" component={CustomerMain} />
        <Route path="/products" component={ProductMain} />
        <Route exact path="/" component={ReceiptMain} />
    </Layout>
);

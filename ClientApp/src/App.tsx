import { Route } from 'react-router';

import Layout from './components/Layout';
import ReceiptMain from './components/Receipts/ReceiptMain';
import ProductMain from './components/Products/ProductMain';
import CustomerMain from './components/Customers/CustomerMain';
import Home from './components/Home';
import UnitMain from './components/Units/UnitMain';

export default () => (
    <Layout>
        <Route path="/receipts" component={ReceiptMain} />
        <Route path="/customers" component={CustomerMain} />
        <Route path="/products" component={ProductMain} />
        <Route path="/units" component={UnitMain} />
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Home} />
    </Layout>
);

import * as React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom box-shadow mb-3">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            SPF Receipt
                        </Link>
                        <ul className="navbar-nav flex-grow">
                            <li className="nav-item">
                                <Link to="/receipt" className="nav-link">ใบกำกับภาษี</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/customers" className="nav-link">ลูกค้า</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className="nav-link">สินค้า</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

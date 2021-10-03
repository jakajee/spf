import { History } from 'history';
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './NavMenu.css';
import logo from '../asset/logo.png';

class NavMenu extends React.PureComponent<{ history?: History }, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {

        return (
            <header>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary border-bottom box-shadow p-1">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} className="d-inline-block" height={30} />
                        </Link>
                        <ul className="navbar-nav flex-grow">
                            {this.renderLink()}
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }

    private renderLink() {
        const activeLink = this.props.history?.location.pathname
        const links: { [key: string]: string } = {
            "/receipts": "ใบกำกับภาษี",
            "/customers": "ลูกค้า",
            "/products": "สินค้า"
        };

        const linkItems = [];
        for (const key in links) {
            linkItems.push(
                <li className="nav-item" key={key}>
                    <Link to={key} className={`nav-link ${activeLink === key ? 'active': ''}`}>{links[key]}</Link>
                </li>
            );
        }

        return linkItems;
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default withRouter(NavMenu as any);
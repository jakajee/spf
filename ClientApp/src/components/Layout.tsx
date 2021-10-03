import Loader from './Loader/Loader';
import NavMenu from './NavMenu';

type LayoutProps = {
    children?: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <NavMenu />
            <div className="container" style={{ marginTop: 60 }}>
                {children}
            </div>
            <Loader />
        </>
    )
}

export default Layout;
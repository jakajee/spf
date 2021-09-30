import NavMenu from './NavMenu';

type LayoutProps = {
    children?: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <NavMenu />
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default Layout;
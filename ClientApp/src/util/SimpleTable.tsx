type TableProps = {
    children:
    | React.ReactNode
}

type THeadProps = TableProps;
type TBodyProps = TableProps;

function Table(props: TableProps) {
    return <>
        <table className="table table-bordered table-sm table-hover">
            {props.children}
        </table>
    </>
}

function THead({ children }: THeadProps) {
    return <>
        <thead className="table-primary">
            {children}
        </thead>
    </>
}

function TBody({children}: TBodyProps) {
    return <>
        <tbody>
            {children}
        </tbody>
    </>
}


export default {
    Table,
    THead,
    TBody
}
import numeral from 'numeral';

type NumberValueProps = {
    value: number | bigint,
    format?: '0,0.00' | '0,0'
}

export const NumberValue = ({ value, format = '0,0.00' }: NumberValueProps) => {   

    return <>
        <span>{numeral(value).format(format)}</span>
    </>;
}
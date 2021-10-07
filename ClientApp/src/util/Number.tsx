import numeral from 'numeral';
import { NUM_FORMAT } from './Format';

type NumberValueProps = {
    value: number | bigint
}

export const NumberValue = ({ value }: NumberValueProps) => {   

    return <>
        <span>{numeral(value).format(NUM_FORMAT)}</span>
    </>;
}
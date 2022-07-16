type LabelProps = {    
    required: boolean,
    title: string
}

export default (props: LabelProps) => {
    return <>
        <label className={`form-label ${props.required ? 'required': ''}`}>
            {props.title}
        </label>
    </>
}
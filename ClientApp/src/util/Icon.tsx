type IconProps = {
    name: string,
    marginRight?: string | number
}

type IconWithTextProps = IconProps & {
    label: string
}

function Icon({ name, marginRight = 5 }: IconProps) {
    return (
        <i className={`bi bi-${name}`} style={{
            marginRight
        }}></i>
    )
}

export function IconWithText({ name, label, marginRight = 5 }: IconWithTextProps) {
    return <>
        <Icon name={name} marginRight={marginRight} />
        {label}
    </>
}

export default Icon;
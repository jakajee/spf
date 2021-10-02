type IconProps = {
    name: string,
    marginRight?: string | number
}

export default ({ name, marginRight = 5 }: IconProps) => {
    return (
        <i className={`bi bi-${name}`} style={{
            marginRight
        }}></i>
    )
}
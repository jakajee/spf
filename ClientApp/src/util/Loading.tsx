interface LoadingProps {
    type: "success" | "primary" | "info" | "warning" | "danger",
    msg?: string
}

export default ({ type, msg = "กำลังดาวน์โหลดข้อมูล..." }: LoadingProps) => {
    return (
        <>
            <div className={`alert alert-${type}`} >
                {msg}
            </div>
        </>
    )
}
import { Link } from "react-router-dom";
import Icon from "../util/Icon"

export default () => {
    const cardInfo: {
        headerIcon: string,
        headerTitle: string,
        bodyDetail: string,
        footerLink: string
    }[] = [{
        headerIcon: "file-earmark-spreadsheet",
        headerTitle: "ใบกำกับภาษี/ใบเสร็จ",
        bodyDetail: `เลือกลูกค้าที่ต้องการพิมพ์ใบกำกับภาษี/ใบเสร็จ เลือกสินค้า ใส่จำนวน`,
        footerLink: "/receipts"
    }, {
        headerIcon: "people",
        headerTitle: "ข้อมูลลูกค้า",
        bodyDetail: "จัดการ (เพิ่ม/แก้ไข/ลบ/ค้นหา) ข้อมูลลูกค้าที่ต้องการ",
        footerLink: "/customers"
    }, {
        headerIcon: "box",
        headerTitle: "ข้อมูลสินค้า",
        bodyDetail: "จัดการ (เพิ่ม/แก้ไข/ลบ) ข้อมูลสินค้าที่ต้องการ",
        footerLink: "/products"
    }, {
        headerIcon: "tools",
        headerTitle: "ข้อมูลหน่วย",
        bodyDetail: "จัดการ (เพิ่ม/แก้ไข/ลบ) ข้อมูลหน่วย(เช่น บาท, กก.)ที่ต้องการ",
        footerLink: "/units"
    }]
    return <>
        <div>
            {cardInfo.map((item, idx) => {
                return (
                    <div className="row mb-3" key={idx}>
                        <div className="col">
                            <div className="card">
                                <div className="card-header bg-secondary">
                                    <h4 className="m-0 text-primary"><Icon name={item.headerIcon} />{item.headerTitle}</h4>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{item.bodyDetail}</p>
                                </div>
                                <div className="card-footer">
                                    <Link to={item.footerLink}>
                                        คลิกที่นี่
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </>
}
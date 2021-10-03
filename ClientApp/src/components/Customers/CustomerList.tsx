import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { ApplicationState } from "../../store"
import Icon from "../../util/Icon";
import CustomerListItem from "./CustomerListItem";

export default () => {
    const customerState = useSelector((appState: ApplicationState) => appState.customerState);
    const customers = customerState.customers;

    const [filter, setFilter] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const customerItems = filteredCustomers.map((item, idx) => <CustomerListItem key={item.id} idx={idx} {...item} />)

    useEffect(() => {
        if (filter) {
            applyFilter(filter);
        } else {
            setFilteredCustomers(customers)
        }
    }, [filter])

    useEffect(() => {
        setFilteredCustomers(customers);
    }, [customers])

    const onClickResetFilter = () => {
        setFilteredCustomers(customers);
        setFilter("");
    }

    const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
        applyFilter(e.target.value);
    }

    const applyFilter = (keyword: string) => {
        if (keyword) {
            const result = customers
                .filter(item => {
                    return `${item.fullName}_${item.address1}_${item.address2}_${item.taxNumber}`.indexOf(keyword) > -1
                })
            setFilteredCustomers(result);
        } else {
            setFilteredCustomers(customers)
        }
    };

    return (
        <>
            <hr />
            <div className="input-group mb-3">
                <input type="text" className="form-control"
                    value={filter}
                    onChange={onChangeFilter}
                    placeholder="ค้นหาลูกค้าโดยใส่ชื่อลูกค้า/ที่อยู่/เลขประจำตัวผู้เสียภาษีอากร..."
                />
                <button className="btn btn-outline-secondary" type="button" disabled={!filter} onClick={onClickResetFilter}>
                    <Icon name="x-lg" />
                    รีเซ็ต
                </button>
            </div>
            <table className="table table-bordered table-sm table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>ชื่อลูกค้า</th>
                        <th>ที่อยู่</th>
                        <th>เลขประจำตัวผู้เสียภาษีอากร</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customerItems}
                </tbody>
            </table>
        </>
    )
}
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { CustomerActions } from "../../store/CustomerStore";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            CustomerActions.getAllCustomers()
        );
    }, []);

    return (
        <>
            <CustomerForm />
            <CustomerList />
        </>
    )
}
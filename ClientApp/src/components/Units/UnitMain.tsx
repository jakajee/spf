import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UnitActions } from "../../store/UnitStore";
import UnitForm from "./UnitForm";
import UnitList from "./UnitList";

type UnitMainProps = typeof UnitActions

function UnitMain(props: UnitMainProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            UnitActions.getAllUnits()
        )
    }, []);

    return <>
        <UnitForm />
        <UnitList />
    </>
}

export default UnitMain;
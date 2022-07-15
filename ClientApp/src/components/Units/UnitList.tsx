import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import Loading from "../../util/Loading";
import SimpleTable from "../../util/SimpleTable";
import UnitListItem from "./UnitListItem";

function UnitList() {
    const unitState = useSelector((appState: ApplicationState) => appState.unitState);
    const { units } = unitState;

    const unitItems = units.map((item, idx) => <UnitListItem key={idx} idx={idx} {...item} />)

    return <>
        {unitState.isLoading && <Loading type="primary" />}
        {!unitState.isLoading &&
            <SimpleTable.Table>
                <SimpleTable.THead>
                    <tr>
                        <th style={{ width: 50 }}></th>
                        <th>ชื่อหน่วย</th>
                        <th></th>
                    </tr>
                </SimpleTable.THead>
                <SimpleTable.TBody>
                    {unitItems}
                </SimpleTable.TBody>
            </SimpleTable.Table>
        }
    </>
}

export default UnitList;
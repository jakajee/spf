import { GroupBase, StylesConfig } from "react-select";
import { Option } from "../hooks/BaseModel";

export const DATE_FORMAT = 'dd-MMM-yyyy';

const height = 31
export const ReactSelectStyleFormat: StylesConfig<Option, false, GroupBase<Option>> = {
    container: base => ({ ...base, height }),
    control: base => ({ ...base, height, minHeight: height }),
    input: base => ({ ...base, margin: 0, paddingTop: 0, paddingBottom: 0 }),
    indicatorsContainer: base => ({ ...base, height }),
    valueContainer: base => ({ ...base, height }),
    placeholder: base => ({ ...base, marginBottom: 4 }),
    singleValue: base => ({ ...base, marginBottom: 4 }),
    option: base => ({ ...base, paddingTop: 2, paddingBottom: 2 })
}
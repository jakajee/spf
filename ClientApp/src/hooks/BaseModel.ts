export interface BaseDropdown {
    id: number | null,
    name: string | null
}

export interface BaseOptionReadonly<TValue extends string | number> {
    readonly value: TValue,
    readonly label: string
}

export interface Option {
    value: number | string | null,
    label: string | null,
}
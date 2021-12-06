import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Input} from "reactstrap";
export const Filter = ({ column }) => {
    return (
        <div style={{ marginTop: 5 }}>
            {column.canFilter && column.render("Filter")}
        </div>
    )
}
export const SelectColumnFilter = ({
                                       column: { filterValue, setFilter, preFilteredRows, id },
                                   }) => {
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    return (
        <Input
            id="custom-select"
            type="select"
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </Input>
    )
}
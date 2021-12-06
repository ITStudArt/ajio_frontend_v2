import {Input} from "reactstrap";
import React from "react";

export const DefaultColumnFilter = ({
                                        column: {
                                            filterValue,
                                            setFilter,
                                            preFilteredRows: { length },
                                        },
                                    }) => {
    return (
        <Input
            value={filterValue || ""}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`search (${length}) ...`}
        />
    )
}
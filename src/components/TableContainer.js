import React from "react";
import {useTable, useSortBy, useFilters, useBlockLayout } from "react-table";
import { Filter} from './filters';
import {DefaultColumnFilter} from "./DefaultColumnFilter";
import { Table} from "reactstrap";
import "jspdf-autotable";



const TableContainer = ({columns,data, downloadV2})=>{
    let {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter }
    },
        useFilters,
        useSortBy,
        useBlockLayout
        )
    const generateSortingIndicator = column => {
        return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
    }

    return (
        <div class={"logs-container"}>
            <div className={"download-bar"}>
            <button onClick={() => {downloadV2(rows)}} className="btn btn-primary">Pobierz wszystko</button>
            <button onClick={() => {downloadV2(rows, '7days')}} className="btn btn-primary">Ostatnie 7 dni</button>
            <button onClick={() => {downloadV2(rows, '30days')}} className="btn btn-primary">Ostatnie 30 dni</button>
            </div>
        <div className={'table-container'}>
            <Table className={"loglistTable"} bordered hover {...getTableProps()} id={"mainTable"}>
            <thead className={"tableHeader"}>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            <div {...column.getSortByToggleProps()}>
                                {column.render("Header")}
                                {generateSortingIndicator(column)}
                            </div>
                            <Filter column={column} />
                        </th>
                    ))}
                </tr>
            ))}
            </thead>

            <tbody {...getTableBodyProps()} id={"table_body"}>
            {rows.map(row=> {
                prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map(cell => {
                                    return (<td {...cell.getCellProps()}>{cell.render("Cell")}</td>)

                                })}
                        </tr>
                    )
            }
            )}
            </tbody>
        </Table>
        </div>
        </div>

    )
}

export default TableContainer;
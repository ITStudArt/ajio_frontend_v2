import React from 'react';
import "./LogsList.css";
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import Loader from "react-loader-spinner";
import TableContainer from "./TableContainer";
import {Container} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { SelectColumnFilter } from './Filter';
import moment from "moment";
import jsPDF from 'jspdf';
import "jspdf-autotable";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class LogsList extends React.Component{

    exportPDF(logsData, time="all"){
        let today=null;
        switch (time){
            case '7days':
                today = moment().subtract(7, 'days').format();
                break;
            case '30days':
                today = moment().subtract(30, 'days').format();
                break;
            default:
                today = new Date(-8640000000000000);
                today= moment(today).format();
        }
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape

        const marginLeft = 10;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(12);
        let raportTime = moment();
        const title = `Raport (${time}) (${raportTime.format('LLL')})`;
        const headers = [[
            "ID",
            "Processed By",
            "Processed On",
            "Process",
            "Start Date",
            "End Date",
            "Description",
            "Result"
        ]];

        const data = logsData.filter(elt=> elt["values"].endTime>today).map(elt=> [
                    elt["values"].ID,
                    elt["values"].processedBy,
                    elt["values"].processedOn,
                    elt["values"].process,
                    moment(elt["values"].startDate).format('MMMM Do YYYY, h:mm:ss a'),
                    moment(elt["values"].endTime).format('MMMM Do YYYY, h:mm:ss a'),
                    elt["values"].description,
                    elt["values"].resultMessage
        ]);

        let content = {
            startY: 20,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 10);
        doc.autoTable(content);
        doc.save(`Report(${raportTime.format('LLL')}).pdf`)
    }

    render(){
        const {logsData, isFetching} = this.props;
        if(isFetching){
            return(
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            )
        }
        if (logsData===null || 0 === logsData.length){
            return (
                <div>NO LOGS AVAILABLE!!</div>
            )
        }
        const columnsV2= [
                {
                    Header: "ID",
                    accessor: (values)=>{
                        return values["@id"].replace( /^\D+/g, '');
                    },
                    width: 100
                },
                {
                    Header: "Processed by",
                    accessor: "processedBy"
                },
                {
                    Header: "Processed on",
                    accessor: "processedOn"
                },
                {
                    Header: "Operation",
                    accessor: "process",
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                    width: 170
                },
                {
                    Header: "Start Time",
                    accessor: "startDate"
                },
                {
                    Header: "End Time",
                    accessor: "endTime",
                    filter: (rows, id, filterValue) => {
                        return rows.filter(
                            (row) =>
                                filterValue.length <= 0 ||
                                !filterValue ||
                                filterValue.includes(row.values[id])
                        );
                    }
                },
                {
                    Header: "Description",
                    accessor: "description",
                    disableSortBy: true,
                    width: 200
                },
                {
                    Header: "Operation Result",
                    accessor: "resultMessage",
                    Filter: SelectColumnFilter,
                    filter: 'equals'
                }
            ];
        return(
                <Container style={{marginTop:100}}>
                    <TableContainer columns={columnsV2} data={logsData} downloadV2={this.exportPDF}/>
                </Container>
        );
    }


}
export default LogsList;
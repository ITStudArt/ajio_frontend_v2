import React from 'react';
import LogsList from "./LogsList";
import {logsListFetch, logsListFetchFilter, logsListSetPage} from "../actions/action";
import {connect} from "react-redux";
import Loader from "react-loader-spinner";
import "./LogListContainer.css";


const mapStateToProps = state =>({
    ...state.logsList
});
const mapDispatchToProps={
    logsListFetch,
    logsListSetPage,
    logsListFetchFilter
};
class LogsListContainer extends React.Component{
    componentDidMount() {
        this.props.logsListFetch(this.getQueryParamPage());
    }
    componentDidUpdate(prevProps) {
        const {currentPage,logsListFetch,logsListSetPage,filterType, filterValue} = this.props;
        if(prevProps.match.params.page !== this.getQueryParamPage()){
            logsListSetPage(this.getQueryParamPage());
        }
        if(prevProps.currentPage !==currentPage){
            logsListFetch(currentPage);
        }
        if(prevProps.filterType !== filterType || prevProps.filterValue!== filterValue){
            logsListFetchFilter(filterType,filterValue);
        }
    }
    getQueryParamPage(){
        return Number(this.props.match.params.page) || 1;
    }

    render(){
        const {logsData, isFetching, filterType,filterValue} = this.props;
        if(isFetching){
            return(
                <div id={"loaderDiv"}>
                    <Loader id={"loader"}
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={3000}
                    />
                </div>

            );
        }
        return(
            <div className={'main-container'}>
                <LogsList
                    logsData={logsData}
                    isFetching={isFetching}
                    filterType={filterType}
                    filterValue={filterValue}
                />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogsListContainer);
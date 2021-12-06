import {requests} from "../agent";

export const LOGS_LIST_REQUEST = "LOGS_LIST_REQUEST";
export const LOGS_LIST_RECEIVED = "LOGS_LIST_RECEIVED";
export const LOGS_LIST_ERROR= "LOGS_LIST_ERROR";
export const LOGS_LIST_SET_PAGE= "LOGS_LIST_SET_PAGE";
export const LOGS_LIST_SET_FILER= "LOGS_LIST_SET_FILER";

export const logsListRequest = ()=> ({
    type: LOGS_LIST_REQUEST
});
export const logsListError = (error)=> ({
    type: LOGS_LIST_ERROR,
    error: error
});
export const logsListReceived = (data)=> ({
    type: LOGS_LIST_RECEIVED,
    data: data
});
export const logsListSetPage = (page) =>({
    type: LOGS_LIST_SET_PAGE,
    page: page
});
export const logsListSetFilter = (filterName, filterValue) =>({
    type: LOGS_LIST_SET_FILER,
    filterName: filterName,
    filterValue: filterValue
})
export const logsListFetchFilter = (filterName,filterValue,page = 1)=>{
    return (dispatch)=>{
        dispatch(logsListRequest());
        return requests.get(`/logs?_page=${page}?${filterName}=${filterValue}`).then(response => dispatch(logsListReceived(response))).catch(error=>dispatch(logsListError(error)));
    }
};
export const logsListFetch = (page = 1) => {
    return (dispatch)=>{
        dispatch(logsListRequest());
        return requests.get(`/logs?_page=${page}`).then(response => dispatch(logsListReceived(response))).catch(error=>dispatch(logsListError(error)));
}
}

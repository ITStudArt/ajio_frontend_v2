import {
    LOGS_LIST_ERROR,
    LOGS_LIST_RECEIVED,
    LOGS_LIST_REQUEST,
    LOGS_LIST_SET_FILER,
    LOGS_LIST_SET_PAGE
} from "../actions/action";
import {hydraPageCount} from "../apiUtils";

export default(state={
    logsData: null,
    isFetching: false,
    currentPage: 1,
    filterType: null,
    filterValue: null,
    pageCount: null,
    pageIndex:0,
    pageSize:20
}, action) => {
    switch(action.type){
        case LOGS_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case LOGS_LIST_RECEIVED:
            return {
                ...state,
                logsData: action.data['hydra:member'],
                isFetching: false,
                pageCount: hydraPageCount(action.data)
            };
        case LOGS_LIST_ERROR:
            return{
                ...state,
                isFetching: false,
                logsData: null
            };
        case LOGS_LIST_SET_PAGE:
            return{
                ...state,
                currentPage: action.page
            };
        case LOGS_LIST_SET_FILER:
            console.log("Changing filter");
            return {
                ...state,
                isFetching: true,
                filterType: action.filterType,
                filterValue: action.filterValue
            };
        default:
            return state;

    }
}
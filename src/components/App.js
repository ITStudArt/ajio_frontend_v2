import React from 'react';
import './App.css';
import {Route, Switch} from "react-router";
import LogsListContainer from "./LogsListContainer";

class App extends React.Component{
    render() {
        return (
            <div className={'app-container'}>
                <Switch>
                    <Route path={"/:page?"} component={LogsListContainer}/>
                </Switch>
            </div>
        )
    }
}
export default App;

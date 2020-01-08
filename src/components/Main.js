import React from 'react';
import {Switch,Route,BrowserRouter} from 'react-router-dom';
import AddExItem from './AddExItem';
import Home from './Home';


const Main =()=>(
    <main>
        <BrowserRouter>
            <Switch>
                <Route exact path="/home" component = {Home}/>
                <Route exact path="/add" component ={AddExItem}/>
            </Switch>
        </BrowserRouter>
    </main>
)
export default Main;
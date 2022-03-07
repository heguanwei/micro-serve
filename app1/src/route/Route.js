import React from 'react';
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '@/pages/main';
import Page from '@/pages/page1';
import Page2 from '@/pages/page2';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/app1"  render={() => {
                    return <Main>
                        <Route exact path="/app1" component={Page}/>
                        <Route exact path="/app1/menu2" component={Page2}/>
                    </Main>
                }} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

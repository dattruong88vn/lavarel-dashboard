import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { LeadProvider } from "context/LeadContext"

import LeadDetail from "pages/Lead/Detail"

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="">
                    <LeadProvider>
                        <LeadDetail />
                    </LeadProvider>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes

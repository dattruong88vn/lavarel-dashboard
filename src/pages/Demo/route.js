import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import ThemeContext from "context/ThemeContext"

import Demo from "pages/Demo"
import Detail from "pages/Demo/Detail"
import ListPage from "pages/Demo/ListPage"
import NotFound from "pages/NotFound"

const defContext = {
  lead: [
    {
      id: 1,
      name: "Tuan",
    },
    {
      id: 2,
      name: "Phu",
    },
  ],
}
const Routes = () => {
  return (
    <ThemeContext.Provider value={defContext}>
      <Router>
        <Switch>
          <Route exact path="/demo/:id/detail" component={Detail} />
          <Route exact path="/demo/list" component={ListPage} />
          <Route exact path="/demo" component={Demo} />
          <Route path="/demo/*" component={NotFound} />
        </Switch>
      </Router>
    </ThemeContext.Provider>
  )
}

export default Routes

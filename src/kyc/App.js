
import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Checking from "./Components/Checking/Checking";
import BuyerConfirmRequirements from "./Components/BuyerConfirmRequirements/BuyerConfirmRequirements";
import BuyerExperience from "./Containers/BuyerExperience";
import ProductAdvice from "./Containers/ProductAdvice";
import LoanAdvice from "./Containers/LoanAdvice";
import LoanAdviceNew from "./Containers/LoanAdviceNew";
import ProcessProcedures from "./Components/LoanAdvice/ProcessProcedures";
import ExtendedFeedback from "./Components/LoanAdvice/ExtendedFeedback";
import CreateListing from "./Containers/CreateListing";
import PaymentSchedulePrint from "./Components/LoanAdvice/PaymentSchedulePrint";
import DealGroup from "./Components/Checking/DealGroup"
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage"
import Dropdown from "./Components/Dropdown"

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/kyc/checking" component={Checking}></Route>
                    <Route path="/kyc/deal-group-:lead_id" component={DealGroup} />
                    <Route path="/kyc/buyer-experience" component={BuyerExperience} />
                    <Route path="/kyc/buyer-confirm-requirements" component={BuyerConfirmRequirements} />
                    <Route path="/kyc/product-advice" component={ProductAdvice} />
                    <Route path="/kyc/loan-advice" component={LoanAdvice} />
                    <Route path="/kyc/loan-advice-step-one" component={LoanAdviceNew} />
                    <Route path="/kyc/loan-advice-step-two" component={LoanAdviceNew} />
                    <Route path="/kyc/process-procedures" component={ProcessProcedures} />
                    <Route path="/kyc/extended-feedback" component={ExtendedFeedback} />
                    <Route path="/kyc/create-listing" component={CreateListing} />
                    <Route path="/kyc/print-payment-detail" component={PaymentSchedulePrint} />
                    <Route path="/kyc/dropdown" component={Dropdown} />
                    <Route path="/kyc/*" component={NotFoundPage} />
                </Switch>
            </Router>
        )
    }
}

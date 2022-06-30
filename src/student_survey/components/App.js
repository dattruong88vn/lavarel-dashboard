import React, {Component} from 'react';
import Filter from "./Filter";
import TableSurvey from "./TableSurvey";
import SurveryMap from "./SurveryMap";
import Images from "./Images";
import ModalRejectSurvey from "./ModalRejectSurvey";
import ModalSendMail from './ModalSendMail';
import ModalAcceptSurvey from './ModalAcceptSurvey';
import ModalExamineSurvey from './ModalExamineSurvey';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // fetch('https://api.mydomain.com')
        //   .then(response => response.json())
        //   .then(data => this.setState({ data }));
    }

    render() {
        return (
            <div>
                <Filter/>
                <TableSurvey/>
                <div style={{height: '500px', position: 'relative'}}>
                    <SurveryMap/>
                    <Images/>
                </div>
                <ModalRejectSurvey/>
                <ModalSendMail/>
                <ModalAcceptSurvey/>
                <ModalExamineSurvey/>
            </div>
        )
    }

}

export default App;
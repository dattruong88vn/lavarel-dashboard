import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInfo, getListingCart, baUpdateMortgageInfo, getCollateral } from './../actions/index'; 
import {fetchChanelChild} from './../../mortgage/actions/index';
import InfoContainer from './../containers/InfoContainer';
import ModalAddProfileContainer from './ModalAddProfileContainer';

class Section extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.onFetchInfo();
        //this.props.getListingCart();
        this.props.onFetchChanelChild();
    }

    render() {
        return (
            <div className="col-md-12">
                <h2 className="title-with-line"><span>Chi tiết hồ sơ vay</span></h2>
                <div className="box box-primary">
                    <div className="box-body">
                        <InfoContainer getCollateral={this.props.getCollateral} baUpdateMortgageInfo={this.props.baUpdateMortgageInfo} dispatch={this.props.dispatch} listingCart={this.props.listingCart} info={this.props.info}/>
                        {/* <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#uploadFiles">Open Modal</button> */}
                    </div>
                </div>
                <ModalAddProfileContainer chanels={this.props.chanels}/> 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        info : state.mortgageReducer.info,
        listingCart : state.mortgageReducer.listingCart,
        chanels : state.jack.chanel
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchInfo: () => {
            dispatch(fetchInfo());
        },
        getListingCart: () => {
            dispatch(getListingCart());
        },
        baUpdateMortgageInfo:(dataPost) => {
            dispatch(baUpdateMortgageInfo(dataPost))
        },
        getCollateral:(dataPost) => {
            dispatch(getCollateral(dataPost))
        },
        onFetchChanelChild: () => {
            dispatch(fetchChanelChild());
        },
        dispatch:dispatch
    }
};

const MortgageContainer = connect(mapStateToProps,mapDispatchToProps)(Section);
export default MortgageContainer;
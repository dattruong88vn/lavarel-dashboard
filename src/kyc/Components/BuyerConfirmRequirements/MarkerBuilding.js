import React, {Fragment} from "react";
import {Marker,InfoWindow} from "react-google-maps";
import {MarkerWithLabel} from "react-google-maps/lib/components/addons/MarkerWithLabel";
import {postCreateCollection } from "../../Services/KycDeal";
import { connect } from 'react-redux';

class MartkerBuilding extends React.Component{   
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            groupId:null,
            info:null
        }
    }

    render(){
        let that = this;
        return (
            <Fragment>
                <MarkerWithLabel
                    icon=" "
                    key={this.props.dealId}
                    position={{ lat: this.props.item.latitude, lng: this.props.item.longitude}}
                    labelAnchor={new google.maps.Point(50, 15)}
                    labelClass="kyc-marker-building-with-label"
                    labelStyle={{textAlign:"center",backgroundColor: "#f2741e", color:"white", fontSize: "16px", padding: "7px"}}
                    onClick={() => {
                        that.setState({
                            ...that.state, isOpen:true, 
                            groupId:that.props.groupId, info:that.props.item});
                    }} >
                    <div>
                        <div>{this.props.item.numberOfListings} căn hộ</div>
                    </div>
                </MarkerWithLabel>

                <Marker 
                icon=" "
                position={{ lat: this.props.item.latitude, lng: this.props.item.longitude}}>
                    {that.state.isOpen 
                    && that.props.groupId == that.state.groupId 
                    && <InfoWindow position={{ lat: this.props.item.latitude, lng: this.props.item.longitude}} 
                        onCloseClick={() => {
                                that.setState({
                                    isOpen:false
                                })
                            }}>

                            <div className="container" style={{width:"300px"}}>
                                <div className="row" style={{backgroundColor:"#ccc"}}>
                                    <div className="col-xs-2" style={{textAlign: "center", fontSize: "60px"}}>
                                        <i className="fa fa-building"></i>
                                    </div>
                                    <div style={{textAlign:"center"}} className="col-xs-10">
                                        <p style={{marginTop: '10px', marginBottom: '5px'}}><b>{that.state.info.groupName}</b></p>
                                        <span>{that.state.info.groupAddress}</span>
                                    </div>
                                </div>
                                {this.state.info.listings.map(function(listingItem) {
                                    let isInCollection = false;
                                    if (listingItem.isBasket || !(that.props.collection.listingId.indexOf(listingItem.listingId) == -1)) {
                                        isInCollection = true;
                                    } 
                                    return ( 
                                        <div style={{borderBottom: "1px solid grey", padding: "15px 0"}}>
                                            <div className="row">
                                                <div className="col-xs-3" >
                                                    <div className="row">
                                                        <div className="col-xs-12">
                                                            <b>{listingItem.formatPrice ? listingItem.formatPrice : "N/A"}</b>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-5">
                                                    <div className="row">
                                                        <div className="col-xs-12">
                                                            <span>Tầng {listingItem.floors ? listingItem.floors : 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-4">
                                                    <div className="row">
                                                        <div className="col-xs-6">
                                                            <a href={void(0)}>
                                                            {that.props.compareListing.listingSelect.indexOf(listingItem.listingId) == -1 
                                                            && <i className="fa fa-random" style={{paddingRight:'25px', cursor:'pointer'}}  onClick={(e) => {
                                                            e.preventDefault();
                                                            let setState = {...that.props};
                                                            if(setState.compareListing.listingSelect.length < 3){
                                                                // setState.compareListing.listingSelect.push(this.props.item.listingId);
                                                                // that.setState(setState);
                                                                let compareListing = {...that.props.compareListing};
                                                                compareListing.listingSelect = [...compareListing.listingSelect,listingItem.listingId];
                                                                that.props.dispatch({type: "SET_COMPARE_LISTING",compareListing:compareListing})
                                                            }else{
                                                                showPropzyAlert("Chỉ được so sánh tối đa 3 tin đăng");
                                                            }
                                                            }}></i>}
                                                            </a>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            { !isInCollection
                                                            && <i className="fa fa-heart-o" style={{cursor:'pointer'}} onClick={(e) => {
                                                            e.preventDefault();
                                                            showPropzyLoading();
                                                            postCreateCollection({source:"kyc",
                                                            relatedListings:[listingItem.listingId],
                                                            dealId:that.props.dealId,
                                                            searchScore:listingItem.searchScore}, (response)=>{
                                                                if(response.result){
                                                                    hidePropzyLoading();
                                                                    let tmpCollection = {...that.props.collection};
                                                                    tmpCollection.isCollection = true;
                                                                    tmpCollection.listingId.push(listingItem.listingId);
                                                                    that.props.dispatch({type:"MAP_COLLECTION",collection:tmpCollection});
                                                                }
                                                            })
                                                            }}></i>}
                                                            { isInCollection
                                                            && <i style={{color: '#f17423'}} className="fa fa-heart" ></i> }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" style={{marginTop: "15px"}}>
                                                <div className="col-xs-3">
                                                    <i className="fa fa-bed"></i> {listingItem.bedRooms ? listingItem.bedRooms : 'N/A'}
                                                </div>
                                                <div className="col-xs-5">
                                                    <i className="fa fa-bath"></i> {listingItem.bathRooms ? listingItem.bathRooms : 'N/A'}
                                                </div>
                                                <div className="col-xs-4">
                                                    <i className="fa fa-paper-plane"></i> {listingItem.directionName ? listingItem.directionName : 'N/A'}  
                                                </div>
                                            </div>
                                            {(listingItem.bpoLabel && listingItem.bpoLabel !== 'N/A') &&
                                                <div className="row" style={{marginTop: "15px"}}>
                                                    <div className="col-xs-12">
                                                        <strong>
                                                            {listingItem.bpoLabel !== 'Đã BPO' ? 'BPO: ' : ''}
                                                            <span className={listingItem.bpoLabel === 'Đã BPO' ? "btn btn-success btn-xs" : ''}>{listingItem.bpoLabel}</span>
                                                        </strong>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    );
                                })
                            }
                            </div>

                    </InfoWindow>}
                </Marker>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        compareListing: state.MapReducer.compareListing,
        collection:state.MapReducer.collection
    }
};
export default connect(mapStateToProps)(MartkerBuilding);
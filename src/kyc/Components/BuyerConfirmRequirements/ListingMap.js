import React, {Fragment,useRef } from "react";
import { compose, withProps, withState, withHandlers } from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker,Circle, Polyline,InfoWindow, KmlLayer} from "react-google-maps";
import {MarkerWithLabel} from "react-google-maps/lib/components/addons/MarkerWithLabel";
import {fetchListingDetail,postCreateCollection, getListingCompare} from "../../Services/KycDeal";
import { connect } from 'react-redux';
import MarkerKyc from './MarkerKyc';
import ButtonCompare from './ButtonCompare';
import { min } from "moment";
import {GOOGLE_API_KEY} from "../../../Commons/Constants";
import {PZMap} from "./PZMap";

class ListingMap extends React.Component{   
    constructor(props) {
        super(props);
        this._fitBounds = false;
        this._curentZoom = 1;
        this.state = {
            listings:[],
            placeCode:null,
            isOpen: false,
            listingId:null,
            collection:{
                isCollection:false,
                listingId:[]
            },
            listingDetail:null,
            compareListing: {
                infoListings:null,
                listingSelect:[]
            }
        }
    }

    onZoomChanged = (getZoom) => {
        this.props.doSearchListings(true,"direct"); // lấy dòng này
    }


    componentDidMount(){
    }
    
    render(){
        if(this.props.address.lat == null){
            if(!this.props.listings || this.props.listings.length == 0){
                return (<h2 style={{textAlign:"center"}}>Không tìm thấy kết quả, vui lòng điều chỉnh lại tiêu chí tìm kiếm</h2>);
            }
        }
        let that = this;

        let defaultCenter = { lat: 10.764074, lng: 106.656375 };
        if(this.props.listings.length > 0 && this.props.address.lat == null){
            defaultCenter = {lat:this.props.listings[0].latitude,lng:this.props.listings[0].longitude};
        }else if(this.props.address.lat != null){
            defaultCenter = this.props.address;
        }
        let zoomMap = 14;
        if(this.props.filter.districtIds && this.props.filter.districtIds != null){
            zoomMap = 17;
        }

        
        return (
            <Fragment>
                <PZMap listings={this.props.listings}
                    listingType={this.props.listingTypeId} 
                    propertyTypeId={this.props.propertyTypeId} 
                    dealId={this.props.dealId} 
                    filter={that.props.filter} 
                    onFilterChange={this.props.onFilterChange}
                    address={this.props.address}
                    mapRadius={this.props.mapRadius}
                    kmlLink={this.props.kmlLink}
                    placeCode={this.props.placeCode}
                    onZoomChanged={this.onZoomChanged}
                    defaultCenter={defaultCenter}
                    groups={this.props.groups}
                    maxZoom={this.props.maxZoom}
                />
                <ButtonCompare listingType={this.props.listingTypeId} propertyTypeId={this.props.propertyTypeId} 
                dealId={this.props.dealId}/>
            </Fragment>
        )
    }
}

export default ListingMap;
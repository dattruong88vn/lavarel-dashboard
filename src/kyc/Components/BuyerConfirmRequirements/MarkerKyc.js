import React, {Fragment} from "react";
import {withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline,InfoWindow} from "react-google-maps";
import {MarkerWithLabel} from "react-google-maps/lib/components/addons/MarkerWithLabel";
import {fetchListingDetail,postCreateCollection,fetchListingDetailV2, getListingCompare} from "../../Services/KycDeal";
import ReactHtmlParser from 'react-html-parser'; 
import ShowMore from 'react-show-more';
import { connect } from 'react-redux';
class MarkerKyc extends React.Component{   
    constructor(props) {
        super(props);
        this.state = {
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
            },
        }
    }

    render(){
        let that = this;
        if( (this.props.propertyTypeId == 8 || this.props.propertyTypeId == 1) && (that.props.filter.wardIds && that.props.filter.wardIds != null) )
            return ""; //case chung cu can ho khong hien listings, chỉ hiện group
        let backgroundItem = '#1371a8';
        if (!that.props.item.isBasket) {
            if ((that.props.collection.listingId.indexOf(this.props.item.listingId) != -1) ) {
                backgroundItem = '#f2741e';
            }
        } else {
            backgroundItem = '#f2741e';
        }
        return (
            <Fragment>
                <MarkerWithLabel
                            icon=" "
                            key={this.props.index}
                            position={{ lat: this.props.item.latitude, lng: this.props.item.longitude}}
                            labelAnchor={new google.maps.Point(50, 15)}
                            labelClass="kyc-marker-with-label"
                            labelStyle={that.props.filter.wardIds && that.props.filter.wardIds != null && that.props.filter.wardIds.search(',') == -1 
                            ? {textAlign:"center",backgroundColor: backgroundItem, color:"white", fontSize: "16px", padding: "7px"} 
                            : {width:"50px",height:"50px",lineHeight:"50px",textAlign:"center",borderRadius:"50%",backgroundColor: "#1371a8", color:"white", fontSize: "12px", padding: "2px"}}
                            onClick={() => {
                                $('.gm-ui-hover-effect').trigger("click");
                                if(that.props.filter.wardIds && that.props.filter.wardIds != null && that.props.filter.wardIds.search(',') == -1){
                                    showPropzyLoading();
                                    fetchListingDetailV2({listingId:that.props.item.listingId,listingType:that.props.listingType,propertyTypeId:that.props.propertyTypeId}, (response)=>{
                                        let setState = {...that.state}
                                        setState.isOpen = true;
                                        setState.listingId = that.props.item.listingId;
                                        setState.listingDetail = response.data;
                                        that.setState(setState);
                                        hidePropzyLoading();
                                    });
                                }else{
                                    that.props.onFilterChange({
                                        "cityIds":[that.props.item.cityId],
                                        "districtIds":[that.props.item.districtId],
                                        "wardIds":[that.props.item.wardId]
                                    })
                                }
                            }}
                            >
                            <div>
                                <div>{that.props.filter.wardIds && that.props.filter.wardIds != null && that.props.filter.wardIds.search(',') == -1 ? `${this.props.item.formatPrice} - ${this.props.item.formatSize}` : this.props.item.numRecord}</div>
                            </div>
                        </MarkerWithLabel>
                        {that.props.filter.wardIds && that.props.filter.wardIds != null && <Marker 
                            icon=" "
                            position={{ lat: this.props.item.latitude, lng: this.props.item.longitude}} >
                                {that.state.isOpen && that.props.item.listingId == that.state.listingId && that.props.propertyTypeId != 1 && <InfoWindow position={{ lat: this.props.item.latitude, lng: this.props.item.longitude}} onCloseClick={() => {
                                        that.setState({
                                            isOpen:false,
                                            listingId:this.props.item.listingId
                                        })
                                    }}>
                                    { that.state.listingDetail != null && <div style={{width:"300px"}}>
                                        {that.state.listingDetail.photos[0].link && <div className="row">
                                            <div className="col-md-12">
                                                <img style={{width:"100%",maxHeight:"200px"}} src={that.state.listingDetail.photos[0].link}/>
                                            </div>
                                        </div>}
                                        <div style={{padding:"5px"}}>
                                            <div className="row">
                                                <div className="col-xs-6 col-md-6"><span style={{fontSize:"17px",fontWeight:"bold"}}>{that.state.listingDetail.formatPrice}</span> | <span style={{fontSize:"17px",fontWeight:"bold"}}>{that.state.listingDetail.lotSize} m2</span></div>
                                                <div style={{textAlign:"right"}} className="col-xs-6 col-md-6"><span style={{color:"#f2792b"}}>{that.state.listingDetail.districtName}</span></div>
                                            </div>
                                            <p style={{margin:"10px 0px"}}>{that.state.listingDetail.title}</p>
                                            <div style={{marginTop:"10px",marginBottom:"10px"}} className="row">
                                                <div className="col-xs-4 col-md-4"><i className="fa fa-bed"></i> {that.state.listingDetail.bedRooms}</div>
                                                <div className="col-xs-4 col-md-4" style={{textAlign:"center"}}><i className="fa fa-bath"></i> {that.state.listingDetail.bathRooms}</div>
                                                <div className="col-xs-4 col-md-4" style={{textAlign:"right"}}><i className="fa fa-arrow-up"></i> {that.state.listingDetail.directionName}</div>
                                            </div>

                                            <div className="row">
                                                <div style={{textAlign:"center"}} className="col-md-12">
                                                    { that.props.collection.listingId.indexOf(this.props.item.listingId) == -1 && <button className="btn btn-kyc" onClick={(e) => {
                                                    e.preventDefault();
                                                    postCreateCollection({source:"kyc",relatedListings:[this.props.item.listingId],dealId:that.props.dealId}, (response)=>{
                                                        if(response.result){
                                                            let tmpCollection = {...that.props.collection};
                                                            tmpCollection.isCollection = true;
                                                            tmpCollection.listingId.push(this.props.item.listingId);
                                                            that.props.dispatch({type:"MAP_COLLECTION",collection:tmpCollection});
                                                            // let setState = {...that.state};
                                                            // setState.collection.isCollection = true;
                                                            // setState.collection.listingId.push(this.props.item.listingId);
                                                            // that.setState(setState);
                                                        }
                                                    })
                                                    }}>THÊM VÀO BỘ SƯU TẬP</button>}
                                                    {that.props.collection.listingId.indexOf(this.props.item.listingId) != -1 && <span style={{color:"#f2792b"}}><i className="fa fa-heart"></i> Đã thêm vào BST</span>}
                                                    <p style={{margin:"5px 0px"}}></p>
                                                    {this.props.compareListing.listingSelect.indexOf(this.props.item.listingId) == -1 && <a style={{color:"#f17423"}} href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        let setState = {...that.props};
                                                        if(setState.compareListing.listingSelect.length < 3){
                                                            // setState.compareListing.listingSelect.push(this.props.item.listingId);
                                                            // that.setState(setState);
                                                            let compareListing = {...this.props.compareListing};
                                                            compareListing.listingSelect = [...compareListing.listingSelect,this.props.item.listingId];
                                                            this.props.dispatch({type: "SET_COMPARE_LISTING",compareListing:compareListing})
                                                        }else{
                                                            showPropzyAlert("Chỉ được so sánh tối đa 3 tin đăng");
                                                        }
                                                    }}>So sánh tin đăng</a>}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div><image src="https://cdn.propzy.vn/listing/thumbnail/grid/2019/08/28/listing_720ef2fffc492ddf90cf8a187694f8f97b79963dcf46b330f63e16cbb392322c.jpg" style={{width:"100%"}}/></div> */}
                                    </div>}
                                </InfoWindow>}
                                {that.state.isOpen && this.props.item.listingId == that.state.listingId && that.props.propertyTypeId == 1 && <InfoWindow position={{ lat: this.props.item.latitude, lng: this.props.item.longitude}} onCloseClick={() => {
                                        that.setState({
                                            isOpen:false,
                                            listingId:this.props.item.listingId
                                        })
                                    }}>
                                    { that.state.listingDetail != null && <div style={{width:"300px"}}>
                                        {that.state.listingDetail.photos[0].link && <div className="row">
                                            <div className="col-md-12">
                                                <img style={{width:"100%",maxHeight:"200px"}} src={that.state.listingDetail.photos[0].link}/>
                                            </div>
                                        </div>}
                                        <div style={{padding:"5px"}}>
                                            <div className="row">
                                                <div className="col-xs-8 col-md-8"><span style={{fontSize:"17px",fontWeight:"bold"}}>{that.state.listingDetail.projectName}</span></div>
                                                <div style={{textAlign:"right"}} className="col-xs-4 col-md-4"><span style={{color:"#f2792b"}}>{that.state.listingDetail.districtName}</span></div>
                                            </div>
                                            <div style={{margin:"10px 0px"}}>
                                                <ShowMore
                                                    lines={3}
                                                    more='Xem thêm'
                                                    less='Thu lại'
                                                    anchorClass=''
                                                >
                                                    {ReactHtmlParser(that.state.listingDetail.description)}
                                                </ShowMore>
                                            </div>
                                            { that.state.listingDetail.buildings != null && that.state.listingDetail.buildings.length > 0 && <div>
                                                {that.state.listingDetail.buildings.map(function(itemBuilding,indexBuilding){
                                                    return <div key={indexBuilding}>
                                                        <p>{itemBuilding.buildingName}</p>
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Phòng ngủ</th>
                                                                    <th>Số căn</th>
                                                                    <th>Block</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {itemBuilding.rentCostList.map(function(itemRent,indexRent){
                                                                    return <tr key={indexRent}>
                                                                                <td>
                                                                                    {itemRent.bedRoomShortFormat}
                                                                                    <br/>
                                                                                    <span style={{color:"rgb(242, 121, 43)",fontSize:"10px"}}>{itemRent.formatPrice}</span>
                                                                                </td>
                                                                                <td>{itemRent.numberOfListings}</td>
                                                                                <td>{itemRent.formatPosition}</td>
                                                                                <td>
                                                                                    { that.state.collection.listingId.indexOf(itemRent.rlistingIds[0]) == -1 &&<button className="btn btn-link" onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        postCreateCollection({source:"kyc",relatedListings:[itemRent.rlistingIds[0]],dealId:that.props.dealId}, (response)=>{
                                                                                            if(response.result){
                                                                                                let setState = {...that.state};
                                                                                                setState.collection.isCollection = true;
                                                                                                setState.collection.listingId.push(itemRent.rlistingIds[0]);
                                                                                                that.setState(setState);
                                                                                            }
                                                                                        })
                                                                                        }}>Thuê</button>}
                                                                                    {that.state.collection.listingId.indexOf(itemRent.rlistingIds[0]) != -1 && <span style={{color:"#f2792b"}}><i className="fa fa-heart"></i></span>}
                                                                                </td>
                                                                            </tr>
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                }) }
                                            </div>}

                                            <div className="row">
                                                <div style={{textAlign:"center"}} className="col-md-12">
                                                    {this.props.compareListing.listingSelect.indexOf(that.state.listingDetail.projectId) == -1 && <a style={{color:"#f17423"}} href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        let setState = {...that.props};
                                                        if(setState.compareListing.listingSelect.length < 3){
                                                            // setState.compareListing.listingSelect.push(this.props.item.listingId);
                                                            // that.setState(setState);
                                                            let compareListing = {...this.props.compareListing};
                                                            compareListing.listingSelect = [...compareListing.listingSelect,that.state.listingDetail.projectId];
                                                            this.props.dispatch({type: "SET_COMPARE_LISTING",compareListing:compareListing})
                                                        }else{
                                                            showPropzyAlert("Để so sánh tối đa chọn 3 listing");
                                                        }
                                                    }}>So sánh tin đăng</a>}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div><image src="https://cdn.propzy.vn/listing/thumbnail/grid/2019/08/28/listing_720ef2fffc492ddf90cf8a187694f8f97b79963dcf46b330f63e16cbb392322c.jpg" style={{width:"100%"}}/></div> */}
                                    </div>}
                                </InfoWindow>}
                        </Marker>}
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
export default connect(mapStateToProps)(MarkerKyc);
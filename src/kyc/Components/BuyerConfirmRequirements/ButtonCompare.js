import React, {Fragment} from "react";
import { connect } from 'react-redux';
import {fetchListingDetail,postCreateCollection, getListingCompare} from "../../Services/KycDeal";
import ReactHtmlParser from 'react-html-parser';
import ShowMore from 'react-show-more'; 
class ButtonCompare extends React.Component{
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

    componentWillReceiveProps(nextProps){
    }

    componentDidMount(){
    }
    
    render(){
        let that = this;
        return (
            <Fragment>
                <button onClick={()=>{
                    if(this.props.compareListing.listingSelect.length < 2){
                        showPropzyAlert("Để so sánh tối thiếu cần chọn 2 listing");
                    }else{
                        getListingCompare(
                            {listingTypeId:this.props.listingType,propertyTypeId:this.props.propertyTypeId,
                                listingIds:this.props.compareListing.listingSelect, sourceId: 3}, 
                            (response)=>{
                            let setState = {...this.state};
                            setState.compareListing.infoListings = response.data;
                            this.setState(setState,() => {
                                $('#compareListing').modal();
                            })
                        })
                    }
                }} type="button" className="btn btn-kyc btn-show-compare">So Sánh ( <span>{this.props.compareListing.listingSelect.length}</span> )</button>
                <div>
                    {/* Trigger the modal with a button */}
                    {/* Modal */}
                    <div id="compareListing" className="modal fade" role="dialog">
                        <div className="modal-dialog modal-lg">
                        {/* Modal content*/}
                        <div className="modal-content">
                            <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title">SO SÁNH BẤT ĐỘNG SẢN</h4>
                            </div>
                            <div className="modal-body">
                            
                                {this.state.compareListing.infoListings != null 
                                && <div className="row"><div className="col-md-12">
                                    <table className="table">
                                    <tbody>
                                        <tr>
                                            <td style={{borderTop:"none", maxWidth:"150px"}} width="150px"></td>
                                            {this.state.compareListing.infoListings[0] && <td style={{borderTop:"none", maxWidth:"250px"}} width="250px">
                                                <img style={{width:"100%",maxHeight:"145px",minHeight:"145px"}} src={this.state.compareListing.infoListings[0].photos[0].link} />
                                            </td>}
                                            {this.state.compareListing.infoListings[1] && <td style={{borderTop:"none", maxWidth:"250px"}} width="250px">
                                            <img style={{width:"100%",maxHeight:"145px",minHeight:"145px"}} src={this.state.compareListing.infoListings[1].photos[0].link} /></td>}
                                            {this.state.compareListing.infoListings[2] && <td style={{borderTop:"none", maxWidth:"250px"}} width="250px">
                                                <img style={{width:"100%",maxHeight:"145px",minHeight:"145px"}} src={this.state.compareListing.infoListings[2].photos[0].link}/>
                                            </td>}
                                            {!this.state.compareListing.infoListings[1] && <td style={{borderTop:"none", maxWidth:"250px"}} width="250px"></td>}
                                            {!this.state.compareListing.infoListings[2] && <td style={{borderTop:"none", maxWidth:"250px"}} width="250px"></td>}
                                        </tr>
                                        <tr>
                                            <td><b></b></td>
                                            {this.state.compareListing.infoListings[0] && <td>{
                                                this.state.compareListing.infoListings[0].title
                                            }</td>}
                                            {this.state.compareListing.infoListings[1] && <td>{
                                                this.state.compareListing.infoListings[1].title
                                            }</td>}
                                            {this.state.compareListing.infoListings[2] && <td>
                                                {this.state.compareListing.infoListings[2].title}
                                            </td>}
                                        </tr>
                                        <tr>
                                            <td><b>Giá | Diện tích</b></td>
                                            {this.state.compareListing.infoListings[0] && <td>{
                                                this.state.compareListing.infoListings[0].formatPrice
                                            } | {
                                                this.state.compareListing.infoListings[0].lotSize
                                            } m2</td>}
                                            {this.state.compareListing.infoListings[1] && <td>{
                                                this.state.compareListing.infoListings[1].formatPrice
                                            } | {
                                                this.state.compareListing.infoListings[1].lotSize
                                            } m2</td>}
                                            {this.state.compareListing.infoListings[2] && <td>
                                                {
                                                this.state.compareListing.infoListings[2].formatPrice
                                                } | {
                                                    this.state.compareListing.infoListings[2].lotSize
                                                } m2
                                            </td>}
                                        </tr>
                                        <tr>
                                            <td><b>Quận</b></td>
                                            {this.state.compareListing.infoListings[0] && <td>{
                                                this.state.compareListing.infoListings[0].districtName
                                            }</td>}
                                            {this.state.compareListing.infoListings[1] && <td>{
                                                this.state.compareListing.infoListings[1].districtName
                                            }</td>}
                                            {this.state.compareListing.infoListings[2] && <td>
                                                {this.state.compareListing.infoListings[2].districtName}
                                            </td>}
                                        </tr>
                                        <tr>
                                            <td><b>Phòng ngủ</b></td>
                                            {this.state.compareListing.infoListings[0] && <td>{
                                                this.state.compareListing.infoListings[0].bedRooms
                                            }</td>}
                                            {this.state.compareListing.infoListings[1] && <td>{
                                                this.state.compareListing.infoListings[1].bedRooms
                                            }</td>}
                                            {this.state.compareListing.infoListings[2] && <td>
                                                {this.state.compareListing.infoListings[2].bedRooms}
                                            </td>}
                                        </tr>
                                        <tr>
                                            <td><b>Phòng tắm</b></td>
                                            {this.state.compareListing.infoListings[0] && <td>{
                                                this.state.compareListing.infoListings[0].bathRooms
                                            }</td>}
                                            {this.state.compareListing.infoListings[1] && <td>{
                                                this.state.compareListing.infoListings[1].bathRooms
                                            }</td>}
                                            {this.state.compareListing.infoListings[2] && <td>
                                                {this.state.compareListing.infoListings[2].bathRooms}
                                            </td>}
                                        </tr>
                                        <tr>
                                            <td><b>Hướng</b></td>
                                            {this.state.compareListing.infoListings[0] && <td>{
                                                this.state.compareListing.infoListings[0].directionName
                                            }</td>}
                                            {this.state.compareListing.infoListings[1] && <td>{
                                                this.state.compareListing.infoListings[1].directionName
                                            }</td>}
                                            {this.state.compareListing.infoListings[2] && <td>
                                                {this.state.compareListing.infoListings[2].directionName}
                                            </td>}
                                        </tr>
                                        <tr>
                                            <td><b>Dài x Rộng</b></td>
                                            {this.state.compareListing.infoListings[0] && <td>{
                                                this.state.compareListing.infoListings[0].sizeLength
                                            }m x {
                                                this.state.compareListing.infoListings[0].sizeWidth
                                            }m</td>}
                                            {this.state.compareListing.infoListings[1] && <td>{
                                                this.state.compareListing.infoListings[1].sizeLength
                                            }m x {
                                                this.state.compareListing.infoListings[1].sizeWidth
                                            }m</td>}
                                            {this.state.compareListing.infoListings[2] && <td>
                                                {this.state.compareListing.infoListings[2].sizeLength}m x {
                                                    this.state.compareListing.infoListings[2].sizeWidth
                                                }m
                                            </td>}
                                        </tr>
                                        <tr>
                                            <td><b>Số tầng</b></td>
                                            {this.state.compareListing.infoListings[0] && <td>{
                                                this.state.compareListing.infoListings[0].formatNumberFloor
                                            }</td>}
                                            {this.state.compareListing.infoListings[1] && <td>{
                                                this.state.compareListing.infoListings[1].formatNumberFloor
                                            }</td>}
                                            {this.state.compareListing.infoListings[2] && <td>
                                                {this.state.compareListing.infoListings[2].formatNumberFloor}
                                            </td>}
                                        </tr>
                                        <tr>
                                            <td><b>Hẻm</b></td>
                                            {this.state.compareListing.infoListings[0] && <td>{
                                                this.state.compareListing.infoListings[0].formatAlley
                                            }</td>}
                                            {this.state.compareListing.infoListings[1] && <td>{
                                                this.state.compareListing.infoListings[1].formatAlley
                                            }</td>}
                                            {this.state.compareListing.infoListings[2] && <td>
                                                {this.state.compareListing.infoListings[2].formatAlley}
                                            </td>}
                                        </tr> 
                                        <tr>
                                            <td></td>
                                            {this.state.compareListing.infoListings[0] && <td style={{textAlign:"center"}}>
                                                {that.props.collection.listingId.indexOf(this.state.compareListing.infoListings[0].listingId) == -1 && <button onClick={(e) => {
                                                    e.preventDefault();
                                                    postCreateCollection({source:"kyc",relatedListings:[this.state.compareListing.infoListings[0].listingId],dealId:that.props.dealId}, (response)=>{
                                                        if(response.result){
                                                            // let setState = {...that.state};
                                                            // setState.collection.isCollection = true;
                                                            // setState.collection.listingId.push(this.state.compareListing.infoListings[0].listingId);
                                                            // that.setState(setState);
                                                            let tmpCollection = {...that.props.collection};
                                                            tmpCollection.isCollection = true;
                                                            tmpCollection.listingId.push(this.state.compareListing.infoListings[0].listingId);
                                                            that.props.dispatch({type:"MAP_COLLECTION",collection:tmpCollection});
                                                        }
                                                    })
                                                    }} className="btn btn-kyc" >THÊM VÀO BỘ SƯU TẬP</button>}
                                                {that.props.collection.listingId.indexOf(this.state.compareListing.infoListings[0].listingId) != -1 && <button disabled className="btn btn-kyc" >ĐÃ THÊM VÀO BỘ SƯU TẬP</button>}
                                                <hr style={{margin:"10px 0px 5px 0px"}}/>
                                                <a href="#" onClick={(e)=>{
                                                            e.preventDefault();
                                                            let setState = {...that.state};
                                                            let compareListing = {...this.props.compareListing};
                                                            // if(compareListing.listingSelect.length == 2){ // không được xóa nữa
                                                            //     showPropzyAlert("Để so sánh tối thiếu cần chọn 2 listing");
                                                            // }else{
                                                                if(compareListing.listingSelect.length == 1){
                                                                    $("#compareListing").modal('hide');
                                                                }
                                                                let indexListing = compareListing.listingSelect.indexOf(this.state.compareListing.infoListings[0].listingId);
                                                                compareListing.listingSelect.splice(indexListing,1); // xóa listing khỏi props
                                                                setState.compareListing.infoListings.splice(0,1); // xóa info khỏi state
                                                                this.props.dispatch({type:"SET_COMPARE_LISTING",compareListing});
                                                                that.setState(setState);
                                                            // }
                                                            
                                                            // let indexListing = setState.compareListing.listingSelect.indexOf(this.state.compareListing.infoListings[0].listingId);
                                                            // setState.compareListing.listingSelect.splice(indexListing,1);
                                                            // let compareListing = {...this.props.compareListing};
                                                            // let indexListing = compareListing.listingSelect.indexOf(this.state.compareListing.infoListings[0].listingId);
                                                            // compareListing.listingSelect.splice(indexListing,1);
                                                            // setState.compareListing.infoListings.splice(0,1);
                                                            // this.props.dispatch({type:"SET_COMPARE_LISTING",compareListing});
                                                            // if(setState.compareListing.infoListings.length < 2){
                                                            //     showPropzyAlert("Để so sánh tối thiếu cần chọn 2 listing");
                                                            // }else{
                                                            //     that.setState(setState);
                                                            // }
                                                        }} >Xóa khỏi so sánh</a>
                                            </td>}
                                            {this.state.compareListing.infoListings[1] && <td style={{textAlign:"center"}}>
                                                {that.props.collection.listingId.indexOf(this.state.compareListing.infoListings[1].listingId) == -1 && <button onClick={(e) => {
                                                        e.preventDefault();
                                                        postCreateCollection({source:"kyc",relatedListings:[this.state.compareListing.infoListings[1].listingId],dealId:that.props.dealId}, (response)=>{
                                                            if(response.result){
                                                                let tmpCollection = {...that.props.collection};
                                                                tmpCollection.isCollection = true;
                                                                tmpCollection.listingId.push(this.state.compareListing.infoListings[1].listingId);
                                                                that.props.dispatch({type:"MAP_COLLECTION",collection:tmpCollection});
                                                                // let setState = {...that.state};
                                                                // setState.collection.isCollection = true;
                                                                // setState.collection.listingId.push(this.state.compareListing.infoListings[1].listingId);
                                                                // that.setState(setState);
                                                            }
                                                        })
                                                        }} className="btn btn-kyc" >THÊM VÀO BỘ SƯU TẬP</button>}
                                                    {that.props.collection.listingId.indexOf(this.state.compareListing.infoListings[1].listingId) != -1 && <button disabled className="btn btn-kyc" >ĐÃ THÊM VÀO BỘ SƯU TẬP</button>}
                                                    <hr style={{margin:"10px 0px 5px 0px"}}/>
                                                    <a href="#" onClick={(e)=>{
                                                                e.preventDefault();
                                                                let setState = {...that.state};
                                                                let compareListing = {...this.props.compareListing};
                                                                // if(compareListing.listingSelect.length == 2){ // không được xóa nữa
                                                                //     showPropzyAlert("Để so sánh tối thiếu cần chọn 2 listing");
                                                                // }else{
                                                                    if(compareListing.listingSelect.length == 1){
                                                                        $("#compareListing").modal('hide');
                                                                    }
                                                                    let indexListing = compareListing.listingSelect.indexOf(this.state.compareListing.infoListings[1].listingId);
                                                                    compareListing.listingSelect.splice(indexListing,1); // xóa listing khỏi props
                                                                    setState.compareListing.infoListings.splice(1,1); // xóa info khỏi state
                                                                    this.props.dispatch({type:"SET_COMPARE_LISTING",compareListing});
                                                                    that.setState(setState);
                                                                // }
                                                            }} >Xóa khỏi so sánh</a>
                                            </td>}
                                            {this.state.compareListing.infoListings[2] && <td style={{textAlign:"center"}}>
                                                {that.props.collection.listingId.indexOf(this.state.compareListing.infoListings[2].listingId) == -1 && <button onClick={(e) => {
                                                    e.preventDefault();
                                                    postCreateCollection({source:"kyc",relatedListings:[this.state.compareListing.infoListings[2].listingId],dealId:that.props.dealId}, (response)=>{
                                                        if(response.result){
                                                            let tmpCollection = {...that.props.collection};
                                                            tmpCollection.isCollection = true;
                                                            tmpCollection.listingId.push(this.state.compareListing.infoListings[2].listingId);
                                                            that.props.dispatch({type:"MAP_COLLECTION",collection:tmpCollection});
                                                            // let setState = {...that.state};
                                                            // setState.collection.isCollection = true;
                                                            // setState.collection.listingId.push(this.state.compareListing.infoListings[2].listingId);
                                                            // that.setState(setState);
                                                        }
                                                    })
                                                    }} className="btn btn-kyc" >THÊM VÀO BỘ SƯU TẬP</button>}
                                                {that.props.collection.listingId.indexOf(this.state.compareListing.infoListings[2].listingId) != -1 && <button disabled className="btn btn-kyc" >ĐÃ THÊM VÀO BỘ SƯU TẬP</button>}
                                                <hr style={{margin:"10px 0px 5px 0px"}}/>
                                                <a href="#" onClick={(e)=>{
                                                            e.preventDefault();
                                                            let setState = {...that.state};
                                                            let compareListing = {...this.props.compareListing};
                                                            // if(compareListing.listingSelect.length == 2){ // không được xóa nữa
                                                            //     showPropzyAlert("Để so sánh tối thiếu cần chọn 2 listing");
                                                            // }else{
                                                                if(compareListing.listingSelect.length == 1){
                                                                    $("#compareListing").modal('hide');
                                                                }
                                                                let indexListing = compareListing.listingSelect.indexOf(this.state.compareListing.infoListings[2].listingId);
                                                                compareListing.listingSelect.splice(indexListing,1); // xóa listing khỏi props
                                                                setState.compareListing.infoListings.splice(2,1); // xóa info khỏi state
                                                                this.props.dispatch({type:"SET_COMPARE_LISTING",compareListing});
                                                                that.setState(setState);
                                                            // }
                                                        }} >Xóa khỏi so sánh</a>
                                            </td>}
                                        </tr>
                                    </tbody>
                                </table></div></div>}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
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
export default connect(mapStateToProps)(ButtonCompare);
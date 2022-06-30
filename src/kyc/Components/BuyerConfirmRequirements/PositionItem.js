import React, {Fragment} from "react";
import {getDistricts, getWards, getStreetsByWardIds} from "../../Services/ZonesService";
import {MultiSelectPZ,SingleSelectPZ} from './../../ComponentsCommon/DropdownPZ';
class PositionItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            position: props.positionData,
            districtOptions: props.districtOptions,
            wardOptions: [],
            streetOptions: [],
            listingIdSearchData: props.listingIdSearchData
        }
        this._isMounted = false;
        this.setDataFromListingId = this.setDataFromListingId.bind(this)
    }

    componentDidMount(){
        this._isMounted = true;
        if (this.state.position.districtIds.length != 0) {
            this.getWards(this.state.position.districtIds[0].value, () => {})
            
            if (this.state.position.wardIds.length != 0) {
                let wardIds = [];
                for(let i=0; i<this.state.position.wardIds.length; i++) {
                    wardIds.push(this.state.position.wardIds[i].value);
                }
                if (wardIds.length > 0) {
                    this.getStreetsByWardIds(wardIds, this.state.position.wardIds, () => {});
                }
            }
        }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    componentWillReceiveProps(nextProps, nextStates){
        
        if (JSON.stringify(nextProps.positionData) !== JSON.stringify(this.state.position)) {

            this.setState({...this.state,
                position: nextProps.positionData
            })
        }
        if (JSON.stringify(nextProps.districtOptions) !== JSON.stringify(this.state.districtOptions)) {
            this.setState({...this.state,
                districtOptions: nextProps.districtOptions
            })
        }

        if (JSON.stringify(nextProps.listingIdSearchData) !== JSON.stringify(this.state.listingIdSearchData)) {
            if (!jQuery.isEmptyObject(nextProps.listingIdSearchData)) {
                this.setDataFromListingId(nextProps.listingIdSearchData)

                this.setState({...this.state,
                    listingIdSearchData: nextProps.listingIdSearchData
                })
            }
            
        }
    }

    setDataFromListingId (listingDetail) {
        let districtItem = [];
        let wardItem = [];
        let streetIem = [];
        let thisObj = this;

        if (listingDetail.districtId) { 

            if (this.state.position.districtIds.length > 0 && this.state.position.districtIds[0].value === listingDetail.districtId) {
                // check đã có quận giống listingId thì ko cần fill vô nữa 
                districtItem.push(this.state.position.districtIds[0]);
            } else {
                this.state.districtOptions.filter(disItem => {
                    if (disItem.value == listingDetail.districtId) {
                        districtItem.push(disItem);
                    }
                })
            }

            if (listingDetail.wardId) {
                this.getWards([listingDetail.districtId], function () {
                    thisObj.state.wardOptions.filter(wItem => {
                        if (wItem.value == listingDetail.wardId) {
                            wardItem.push(wItem)
                        }
                    })
                    if (listingDetail.streetId) {
                        thisObj.getStreetsByWardIds([listingDetail.wardId], wardItem, function () {
                            thisObj.state.streetOptions.filter(stItem => {
                                if (stItem.value == listingDetail.streetId) {
                                    streetIem.push(stItem);
                                }
                            })
                        });
                    }
                });
            }
        }
        this.setState({
            "position": {
                ...this.state.position,
                "districtIds": districtItem,
                "wardIds": wardItem,
                "streetIds": streetIem,
            }
        },()=>{
            let obj = {
                ...this.state.position,
                "districtIds": districtItem,
                "wardIds": wardItem,
                "streetIds": streetIem,
            };
            this.props.updateData(obj);
        })
    }

    onDistrictChange(name, data){
        var districtId = data.value;
        this.getWards(districtId, () => {});
    }

    getWards(districtId, callback){
        getWards(districtId, (response)=>{
            if(!response.result){
                return false;
            }
            let options = response.data.map((item)=>{
                return {value: item.wardId, label: item.wardName, prefer:false}
            })
            this.setState({
                "position": {
                    ...this.state.position,
                    "wardList": response.data
                },
                "wardOptions": options
            },()=>{
                let obj = {
                    ...this.state.position,
                    "wardList": response.data
                };
                this.props.updateData(obj);
                callback();
            })
        })
    }

    getStreetsByWardIds(wardIds, wardIdsSelected, callback){
        getStreetsByWardIds(wardIds, (response)=>{
            let options = response.data.map((item)=>{
                return {value: item.streetId, label: item.streetName, prefer:false}
            })
            this.setState({
                "position":{
                    ...this.state.position,
                    wardIds: wardIdsSelected
                },
                "streetOptions": options
            }, ()=>{
                this.props.updateData({
                    ...this.state.position,
                    wardIds: wardIdsSelected,
                    "streetList": response.data
                });

                callback();
            })

        })
    }

    onStreetChange(name, data){
        let streetIds = [];
        for(let i=0;i<data.length; i++){
            streetIds.push(data[i].value);
        }
        this.setState({
            "position":{
                ...this.state.position,
                streetIds: streetIds
            }
        }, ()=>{
            this.props.updateData({
                ...this.state.position,
                streetIds: streetIds,
            });
        })
    }

    isAnyFavoriteDistrict () {
        let isAnyFavDistrict = false;
        this.props.positionList.filter(itemPosition => {
            itemPosition.districtIds.filter(checkFavDistrict => {
                if (checkFavDistrict.prefer) {
                    isAnyFavDistrict = true;
                }
            })
        })
        return isAnyFavDistrict;
    }

    handleOnChangeDistrict = (value) => { 
        if (value.length == 0) {
            this.props.removeDistrictFavorite(this.state.position.districtIds);
            this.setState({
                ...this.state,
                streetOptions: [], 
                wardOptions : [], 
                "position" : {
                    ...this.state.position,
                    districtIds: value,
                    wardIds: value,
                    streetIds: value
                }
            }, () => {
                this.props.updateData({
                    ...this.state.position,
                    districtIds: value,
                    wardIds: value,
                    streetIds: value
                });
            })
        } else {
            // check is any fav district
            let isAnyFavDistrict = this.isAnyFavoriteDistrict();

            // check is click isPrefer 
            let isPreferDistrict = false;
            value.filter((item) => {
                if (item.prefer) {
                    isPreferDistrict = true;
                } 
            })

            if (isAnyFavDistrict && isPreferDistrict) {
                // add favorite this district
                value.filter((item) => {
                    if (item.prefer) {
                        this.setState({
                            "position" : {
                                ...this.state.position,
                                districtIds: value
                            }
                        }, () => {
                            this.props.updateData({
                                ...this.state.position,
                                districtIds: value
                            });
                        })
                    }
                })
                // remove other favorite district 
                this.props.positionList.filter(itemPosition => {
                    itemPosition.districtIds.filter(itemDistrict => {
                        if (itemDistrict.prefer && itemDistrict.value != value[0].value) {
                            itemDistrict.prefer = false;
                        }
                    })
                    
                    // remove other fav ward
                    itemPosition.wardIds.filter(itemWard => {
                        itemWard.prefer = false;
                    })
                })
                
            } else {
                // remove this fav ward
                this.props.positionList.filter(itemPosition => {
                    itemPosition.wardIds.filter(itemWard => {
                        itemWard.prefer = false;
                    })
                })

                this.getWards(value[0].value, () => {})
                this.setState({
                    ...this.state,
                    "position" : {
                        ...this.state.position,
                        districtIds: value
                    }
                }, () => {
                    this.props.updateData({
                        ...this.state.position,
                        districtIds: value
                    });
                })
            }
        }

        this.props.checkDuplicateDistrict(value)
    }

    handleOnChangeWard = (value) => { 

        if (value.length == 0) {
            this.setState({
                ...this.state, 
                "position":{
                    ...this.state.position,
                    wardIds: [],
                    streetIds: []
                }
            }, ()=>{
                this.props.updateData({
                    ...this.state.position,
                    wardIds: [],
                    streetIds: []
                });
            });
        } else {
            // check is any fav district
            let isAnyFavDistrict = this.isAnyFavoriteDistrict();

            // check isPrefer
            let isPreferWard = false;
            value.filter((item) => {
                if (item.prefer) {
                    isPreferWard = true;
                } 
            })
            
            if (!isAnyFavDistrict && isPreferWard) {
                showPropzyAlert("Cần chọn 1 quận yêu thích");
                value.filter((item) => {
                    if (item.prefer) {
                        item.prefer = false;
                    } 
                })
                this.setState({
                    ...this.state, 
                    "position":{
                        ...this.state.position,
                        wardIds: value
                    }
                }, ()=>{
                    this.props.updateData({
                        ...this.state.position,
                        wardIds: value
                    });
                })
            } else if (isAnyFavDistrict && isPreferWard && !this.state.position.districtIds[0].prefer) {
                showPropzyAlert("Phường yêu thích phải thuộc quận yêu thích");
                value.filter((item) => {
                    if (item.prefer) {
                        item.prefer = false;
                    } 
                })
                this.setState({
                    ...this.state, 
                    "position":{
                        ...this.state.position,
                        wardIds: value
                    }
                }, ()=>{
                    this.props.updateData({
                        ...this.state.position,
                        wardIds: value
                    });
                })
            } else {
                let wardIds = [];
                for(let i=0;i<value.length; i++) {
                    wardIds.push(value[i].value);
                }
                if (wardIds.length > 0) {
                    this.getStreetsByWardIds(wardIds, value, () => {});
                }

                this.setState({
                    ...this.state, 
                    "position":{
                        ...this.state.position,
                        wardIds: value
                    }
                }, ()=>{
                    this.props.updateData({
                        ...this.state.position,
                        wardIds: value
                    });
                })
            }
        }
    }

    handleOnChangeStreet = (value) => {
        this.setState({
            ...this.state,
            "position":{
                ...this.state.position,
                streetIds: value
            }
        }, ()=>{
            this.props.updateData({
                ...this.state.position,
                streetIds: value
            });
        })
    }

    render(){
        return (
            <div className="row form-group col-area-disabled">
                <div className="col-sm-3 pr0">
                    <SingleSelectPZ placeholder="Quận" className="custom-width-dropdown"
                        handleOnChange={this.handleOnChangeDistrict} 
                        selected={this.state.position.districtIds}
                        options={this.state.districtOptions}/>
                </div>
                <div className="col-sm-3 pr0">
                    <MultiSelectPZ placeholder="Phường" className="custom-width-dropdown"
                        handleOnChange={this.handleOnChangeWard} 
                        selected={this.state.position.wardIds}
                        options={this.state.wardOptions}/>
                </div>
                <div className="col-sm-4">
                    <MultiSelectPZ placeholder="Đường" className="custom-width-dropdown hide-star"
                        handleOnChange={this.handleOnChangeStreet} 
                        selected={this.state.position.streetIds}
                        options={this.state.streetOptions}/>
                </div>
                <div className="col-sm-2 pr0 pl0">
                    {
                        this.props.isLast &&
                        <button className="add-position-group" 
                        onClick={()=>{this.props.onAdd()}}><i className="fa fa-plus"></i></button>
                    }
                    <button className="remove-position-group" onClick={()=>{
                        this.props.onRemove(this.state.position, this.state.position.districtIds)
                    }}><i className="fa fa-minus"></i></button>
                </div>
            </div>
        )
    }
}

export default PositionItem;
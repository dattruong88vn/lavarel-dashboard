import React, {Component} from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import {GOOGLE_API_KEY} from "../../../Commons/Constants";
 
class GooglePlaceSuggest extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            search: props.search,
            value: props.value,
        }

        this.handleInputChange = e => {
            this.setState({search: e.target.value, value: e.target.value})
        }

        this.handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
            this.setState({search: "", value: geocodedPrediction.formatted_address})
            this.props.onSelect({
                address: geocodedPrediction.formatted_address,
                longitude: geocodedPrediction.geometry.location.lng(),
                latitude: geocodedPrediction.geometry.location.lat(),
            });
        }

        this.handleNoResult = () => {
        }

        this.handleStatusUpdate = (status) => {
        }
        this.bindEvents();
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return nextProps.address!=this.state.address
    // }
 
    componentWillReceiveProps(props){
        this.setState({
            search: props.search,
            value: props.value,
        })
    }
    
    bindEvents() {
        let that = this;        
        $(document).off('.cls-search').on('click', '.cls-search', function (e) {
            e.preventDefault();
            that.setState({
                value: ''
            }, ()=>{
                that.props.onSelect({
                address: null,
                longitude: null,
                latitude: null,
            });
        });
            
        });
    }
 
    render() {
        const {search, value} = this.state;
        return (
            <ReactGoogleMapLoader
                params={{
                    key: GOOGLE_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <ReactGooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search,
                                value: value
                                // Optional options
                                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                            }}
                            // Optional props
                            onNoResult={this.handleNoResult}
                            onSelectSuggest={this.handleSelectSuggest}
                            onStatusUpdate={this.handleStatusUpdate}
                            textNoResults="" // null or "" if you want to disable the no results item
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : ""}
                                </div>
                            )}
                        >
                            <input
                                type="text"
                                value={value}
                                placeholder="Nhập từ khóa địa chỉ cần tìm"
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                            <a href="javascript:void(0);" className="cls-search">x</a>
                        </ReactGooglePlacesSuggest>
                    )
                }
            />
        )
    }
}

export default GooglePlaceSuggest;
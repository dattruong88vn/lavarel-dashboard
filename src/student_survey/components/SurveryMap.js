import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, withProps} from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline} from "react-google-maps";
// import Lightbox from 'react-image-lightbox';

import axios from "axios";

var randomColor = require('randomcolor');
// import 'react-image-lightbox/style.css';
import {get} from 'https';

function makeUnsplashSrc(id) {
    return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;
}



class SurveryMap extends Component {
    constructor(props) {
        super(props);
        this.bindEvents();
        // this.state = {
        //   isMarkerShown: true,
        //   photoIndex: 0,
        //     isOpen: false
        // };
        this.__LIST = new Map();
        this.__PIN_LOCATION = new Map();
    }

    // componentDidMount() {
    //   // fetch('https://api.mydomain.com')
    //   //   .then(response => response.json())
    //   //   .then(data => this.setState({ data }));
    // }
    componentDidMount() {
        //   const that = this;
        // that.delayedShowMarker();
    }

    // delayedShowMarker() {
    //     setTimeout(() => {
    //         this.setState({ isMarkerShown: true })
    //     }, 3000)
    // }

    async handleMarkerClick(marker, surveyId) {
        this.props.dispatch({
            type: 'SET_DATA_MARKER_CLICK', data: {
                marker: marker,
                surveyId: surveyId
            }
        });
        let photos = await this.getPhotoMarker({
            surveyId: surveyId,
            //criteriaId:marker.criteriaId,
            criteriaId: -1,
            latitude: marker.lat.toString(),
            longitude: marker.lng.toString()
        });
        const photosArray = [];
        this.__LIST.clear();
        photos.forEach(item => {
            const key = item.criteriaId ? item.criteriaId : -1;
            const pinLocation = this.__PIN_LOCATION.get(key);
            let photos = [];

            let name = '';
            if (pinLocation) {
                name = pinLocation.name;
            }
            if (item.photos.length > 0) {
                photos = item.photos;
                photos = photos.filter(it => it.link != null);
                photos.forEach(photo => {
                    photosArray.push({
                        src: photo.link,
                        criteriaId: key,
                        caption: name
                    });
                });
            }
            this.__LIST.set(key, {photos : photos, criteriaId: key, caption: name});
        });

        this.props.dispatch({type: 'SET_PHOTO_MARKER', photos: photosArray, photosMap : this.__LIST});
        this.props.dispatch({type: 'SHOW_PHOTO', status: true});
    }

    async getPhotoMarker(datapost) {
        let response = null;
        let data = [];
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        await axios.post('/student-survey/photos', datapost)
            .then(xhr => {
                response = xhr.data;
            }).catch(err => {
                console.error("get photos fail");
            });
        if (response && response.result == true) {
            data = response.data;
        }
        return data;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let dataChange = false;
        if (nextProps.data.length !==  this.props.data.length) {
            dataChange = true;
        } else {
            nextProps.data.forEach(it => {
               const fi = this.props.data.filter(it2 => it2.surveyId == it.surveyId);
               if (fi.length === 0) {
                   dataChange = true;
               }
            });
        }
        if (dataChange) {
            return true;
        }
        if (nextProps.isDraw !== this.props.isDraw) {
            return true;
        }
        return false;
    }

    render() {

        const data = this.props.data;
        const MyMapComponent = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM",
                loadingElement: <div style={{height: `100%`}}/>,
                containerElement: <div style={{height: `400px`}}/>,
                mapElement: <div style={{height: `100%`}}/>,
            }),
            withScriptjs,
            withGoogleMap
        )((props) => {
                let center = {lat: 10.7638513, lng: 106.6562543};
                if (props.pathCoordinates.length > 0) {
                    if (props.pathCoordinates[0].pingLocations.length > 0) {
                        center = {
                            lat: props.pathCoordinates[0].pingLocations[0].lat,
                            lng: props.pathCoordinates[0].pingLocations[0].lng
                        }
                    }
                }
                return <GoogleMap
                    defaultZoom={18}
                    defaultCenter={center}
                >
                    {/* {props.isMarkerShown && <Marker position={{ lat: 10.7638513, lng: 106.6562543 }} onClick={props.onMarkerClick} />} */}
                    {props.pathCoordinates.map((item, i) => {
                        return <Polyline
                            onClick={() => {
                                alert(item.surveyId);
                            }}
                            path={item.locations}
                            geodesic={true}
                            key={i}
                            options={{
                                strokeColor: randomColor(),
                                strokeOpacity: 0.75,
                                strokeWeight: 5
                            }}
                        />
                    })}
                    {props.pathCoordinates.map((item, i) => {
                        let newPing = this.checkPingLocation(item.pingLocations);
                        return newPing.map((mark, j) => {
                            return <Marker key={j} position={{lat: mark.lat, lng: mark.lng}}
                                           options={{icon: `http://maps.google.com/mapfiles/ms/icons/${mark.markColor}-dot.png`}}
                                           onClick={() => props.onMarkerClick(mark, item.surveyId)}/>
                        })
                    })}

                </GoogleMap>
            }
        );
        // ----------------------------------------------------------------


        // const { photoIndex, isOpen } = this.state;
        const that = this;
        if (this.props.isDraw) {
            return (
                <div>
                    <MyMapComponent
                        pathCoordinates={data}
                        isMarkerShown={true}
                        onMarkerClick={this.handleMarkerClick.bind(this)}
                    />
                    <div className="db-btn-group" style={{position: 'absolute', top: '10px', left: 0}}>
                        <button className="btn-sm btn btn-primary btn-overview">Tổng quan</button>
                        <button className="btn-sm btn btn-warning btn-advantages">Ưu nhược điểm</button>
                    </div>
                </div>
            );
        }
        return '';
    }

    bindEvents() {
        const that = this;
        $(document).off('.btn-overview').on('click', '.btn-overview', function (e) {
            e.preventDefault();
            let {dispatch} = that.props;
            dispatch({type: 'SET_FILTER_MAP', data: "113"});
            dispatch({type: 'GET_DATA_LIST_GOOGLE_MAP', isDraw: true, rows: that.props.data, dispatch: dispatch});
        });
        $(document).off('.btn-advantages').on('click', '.btn-advantages', function (e) {
            e.preventDefault();
            let {dispatch} = that.props;
            dispatch({type: 'SET_FILTER_MAP', data: "0"});
            dispatch({type: 'GET_DATA_LIST_GOOGLE_MAP', isDraw: true, rows: that.props.data, dispatch: dispatch});
        });
    }

    checkPingLocation(arr) {
        let unique = arr.map((e, i, final) => final.findIndex(item => JSON.stringify(item.lat) == JSON.stringify(e.lat) && JSON.stringify(item.lng) == JSON.stringify(e.lng)) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);

        this.__PIN_LOCATION.clear();
        arr.forEach(pin => {
            this.__PIN_LOCATION.set(pin.criteriaId, pin);
        });
        return unique;
    }
}

const mapStateToProps = state => {
    let stringJSON = JSON.stringify(state.GoogleMap.data);
    stringJSON = stringJSON.replace(new RegExp('latitude', 'g'), 'lat');
    stringJSON = stringJSON.replace(new RegExp('longitude', 'g'), 'lng');
    stringJSON = JSON.parse(stringJSON);
    $.each(stringJSON, function (k, v) {
        var pingLocations = v.pingLocations;
        $.each(pingLocations, function (kp, vp) {
            stringJSON[k].pingLocations[kp].lat = parseFloat(vp.lat)
            stringJSON[k].pingLocations[kp].lng = parseFloat(vp.lng)
            stringJSON[k].pingLocations[kp].markColor = vp.criteriaId == null || vp.criteriaId == 113 ? 'blue' : vp.criteriaId == 114 ? 'red' : 'orange'
        })
    });
    return {
        data: stringJSON,
        isDraw: state.GoogleMap.isDraw,
        criteriaId: state.GoogleMap.criteriaId,
        dataMakerClick: state.GoogleMap.dataMakerClick,
    };
};
const SurveyMapComponent = connect()(React.memo(SurveryMap));
const SurveyMapContainer = ({data, isDraw, criteriaId, dataMakerClick }) => {
    return <SurveyMapComponent
        data={data}
        isDraw={isDraw}
        criteriaId={criteriaId}
        dataMakerClick={dataMakerClick}
    />
};

export default connect(mapStateToProps, null)(SurveyMapContainer);
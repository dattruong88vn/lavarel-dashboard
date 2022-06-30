/*global google*/
import React,{Fragment} from "react"
import { compose, withProps, withHandlers, withState, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,Circle, KmlLayer } from "react-google-maps"
import {GOOGLE_API_KEY} from "../../../Commons/Constants"
import MarkerKyc from './MarkerKycV2'
import MarkerBuilding from './MarkerBuilding'
const placeUrlIcon = {
    restaurant: "/images/kyc/nha_hang.png",
    school: "/images/kyc/truong_hoc.png",
    hospital: "/images/kyc/benh_vien.png",
    supermarket: "/images/kyc/sieu_thi.png"
};

export const PZMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="+GOOGLE_API_KEY,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `700px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withState('listingsMap','updateListingsMap', []),
    withHandlers((props) => {
        const refs = {
            map: undefined,
            init: true,
            currentZoom:14
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            onBoundsChanged: ({ updatePlaces })  => () => {
            },
            fetchPlaces : ({updatePlaces}) => (placeCode) => {
                let places;
                const bounds = refs.map.getBounds();
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    bounds: bounds,
                    type: [placeCode]
                };
                service.nearbySearch(request, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        updatePlaces(results);
                    }
                })
            },
            onTilesLoaded: ({ updatePlaces })  => () => {
                
            },
            onZoomChangedInside: () => () => {
               
            },
            fetchListings : ({updateListingsMap}) => (listings) => {
                const boundsMap = new google.maps.LatLngBounds();
                    if(listings.length > 0){
                        listings.forEach((child) => {
                            boundsMap.extend(new google.maps.LatLng(child.latitude, child.longitude));
                        })
                        refs.map.fitBounds(boundsMap);
                        // refs.currentZoom = refs.map.getZoom(); // fix can not zoomout map
                    }
                updateListingsMap(listings);
            },
        }
    }),
    lifecycle({
        componentWillUpdate(nextProps) {
            if(nextProps.placeCode != null && nextProps.placeCode != this.props.placeCode){
                nextProps.fetchPlaces(nextProps.placeCode);
            }
            if(nextProps.listings != this.props.listingsMap){
                nextProps.fetchListings(nextProps.listings);   
            }
        }
    })
)((props) => {
    return (
        <Fragment>
            <GoogleMap
                onClick={()=>{
                    $('.gm-ui-hover-effect').trigger("click");
                }}
                onTilesLoaded={props.onTilesLoaded}
                ref={props.onMapMounted}
                onZoomChanged={props.onZoomChangedInside}
                defaultZoom={14}
                defaultCenter={props.defaultCenter}
                center={props.defaultCenter}
                options={{
                    maxZoom: props.maxZoom
                }}
            >
                {props.places && props.places.map((place, i) =>
                    <Marker
                    icon={placeUrlIcon[props.placeCode]} key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
                )}

                {props.listings && props.listings.map((item,index)=>{
                    return (
                        <MarkerKyc 
                            listingType={props.listingType} 
                            propertyTypeId={props.propertyTypeId} 
                            dealId={props.dealId} 
                            filter={props.filter} 
                            key={index} 
                            item={item} 
                            index={index} 
                            onFilterChange={props.onFilterChange} /> 
                    )
                })}

                {props.groups && props.groups.map((item,index)=>{
                    return (
                        <MarkerBuilding 
                            listingType={item.listingTypeId} 
                            propertyTypeId={item.propertyTypeId} 
                            dealId={props.dealId} 
                            key={item.latitude} 
                            item={item} 
                            index={index}
                            groupId={item.groupId} /> 
                    )
                })}

                {
                    (props.listings.length != 0 || props.groups.length != 0) && props.address.lat != null ? 
                    <Fragment>
                        <Marker position={props.defaultCenter}/>
                        <Circle
                            defaultCenter={props.defaultCenter}
                            center={props.defaultCenter}
                            defaultRadius={props.mapRadius == null ? 500 : props.mapRadius}
                            radius={props.mapRadius == null ? 500 : props.mapRadius}
                            defaultOptions={{
                                fillColor: '#00a65a87',
                                fillOpacity: 0.35,
                                strokeColor:'#00a65a87'
                            }}
                        /> </Fragment>: ""
                }
                {props.address.lat == null && <KmlLayer
                        url={props.kmlLink}
                        options={{ preserveViewport: true }}
                    />}
                
            </GoogleMap>
        </Fragment>
    )
})

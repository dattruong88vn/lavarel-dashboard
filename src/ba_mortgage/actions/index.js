import axios from 'axios';
export const fetchInfo = (leadId = null,from = "") => {
    
        if (leadId == null) {
            if(typeof deal !== 'undefined'){
                leadId = deal.leadId;
            }else{
                leadId = lead.leadId;
            }
        }
        return dispatch => {
            axios
                .get(`/mortgage/get-info/${leadId}`)
                .then(response => {
                    if (response.data.result) {
                        let data = response.data.data;
                        dispatch(getListingCart(data.id));

                        if(from == "fromDB"){
                            dispatch(chanelChild(data));
                        }else{
                            // for case data does not have info profiles
                            let isUpdateStateMortgage = true;
                            data.profiles.map((item => {
                                item.typeId == 1115 && item.childs.length == 0 ? isUpdateStateMortgage = false : '';
                            })) 
                            
                            isUpdateStateMortgage ? dispatch(chanelChild(data)) : '';
                        }
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        console.log(error);
                    }
                });
        };
};

export const createMortgageRequest = (dataPost) => {
    return dispatch => {
        axios
            .post(`/mortgage/create-mortgage-request`,dataPost)
            .then(response => {
                let data = response.data;
                console.log(data);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log(error);
                }
            });
    };
};

export const baUpdateMortgageInfo = (dataPost) => {
    return dispatch => {
        axios
            .post(`/mortgage/update-info-mortgage`,dataPost)
            .then(response => {
                let data = response.data;
                showPropzyAlert(data.message);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log(error);
                }
            });
    };
};

export const getCollateral = (dataPost) => {
    return dispatch => {
        axios
            .post(`/mortgage/get-collateral`,dataPost)
            .then(response => {
                let data = response.data.data;
                dispatch(getCollateralAct(data));
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log(error);
                }
            });
    };
};

export const getListingCart = (id) => {
    return dispatch => {
        axios.get(`/mortgage/get-listing-cart/${id}`)
        .then(response => {
            let data = response.data.data;
            dispatch(listingCart(data));
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                console.log(error);
            }
        });
    }
}

export const actAddListingInfo = (dataPost) => {
    return dispatch => {
        axios.get(`/mortgage/get-child-profile/${dataPost.channelTypeId}`)
        .then(response => {
            let data = response.data.data;
            data["key"] = dataPost.key;
            dispatch(addListingInfo(data));
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                console.log(error);
            }
        });
    }
}

export const chanelChild = data => ({
    type: "FETCH_INFO_MORTGAGE",
    payload: data
});

const getCollateralAct = data => ({
    type:"UPDATE_COLLATERAL",
    item:data
});

const listingCart = data => ({
    type:"FETCH_LISTING_CART",
    payload:data
});
const addListingInfo = data => ({
    type:"ADD_LISTING_INFO",
    data:data
});
export const actDeleteListingInfo = data => ({
    type:"DELETE_LISTING_INFO",
    data:data
});

export const actionRemovePhotoInProfile = (images = [], parent = {
    profileTypeId : null,
    childTypeId : null,
    profileInfoTypeId : null}) => ({
    type:"REMOVE_PHOTO_IN_PROFILE",
    data:images,
    parents : parent
})

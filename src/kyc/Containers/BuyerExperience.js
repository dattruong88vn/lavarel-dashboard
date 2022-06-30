import React , {Fragment} from 'react';
import { connect } from 'react-redux';
import ComponentContent from "../Components/BuyerExperience";
import {
    changeBuyExperience,
    changeRentExperience,
    fetchContentBuyExperienceThunk,
    fetchContentRentExperienceThunk, fetchSavePageDraffThunk,
    fetchSavePageThunk,
    setContentBuyExperience,
    setContentRentExperience
} from "../Actions/BuyerExperienceActions";


const containerSection = ({ contentStored, headerStep, functionServices }) => {
    let params = (new URL(document.location)).searchParams;
    let dealId = params.get('dealId');
    if (hasValue(dealId)) {
        return (
            <ComponentContent contentStored={contentStored} headerStep={headerStep} functionServices={functionServices} />
        );
    } else {
        return (
            <div className="content-kyc"> Không có Deal Id</div>
        );
    }

};

const recursiveGet = (list, arrayData) => {
    if (list.length > 0) {
        for(let i = 0; i < list.length; i++) {
            if (list[i].checked) {
                arrayData.push(list[i]);
            }
            if (list[i].childs && list[i].childs.length > 0) {
                recursiveGet(list[i].childs,  arrayData);
            }
        }
    }
    return  list;
};
const mapStateToProps = state => ({
    contentStored: state.BuyerExperienceReducer,
    headerStep : state.HeaderStepReducer,
});
const mapDispatchToProps = (dispatch, stored) => {
    return {
        functionServices : {
            onChangeExperience : (isExperience, listingType) => {
                if (listingType == 1) {
                    dispatch(changeBuyExperience(isExperience));
                } else {
                    dispatch(changeRentExperience(isExperience));
                }
            },
            onFetchContentPage : (isExperience, listingType, data = {})  => {
                if (listingType == 1 && isExperience) {
                    dispatch(fetchContentBuyExperienceThunk(data));
                }
                if (listingType == 2 && isExperience) {
                    dispatch(fetchContentRentExperienceThunk(data));
                }
            },
            onSetBuyContentList : (list = []) => (dispatch(setContentBuyExperience(list))),
            onSetRentContentList : (list = []) => (dispatch(setContentRentExperience(list))),
            onSaveStep : (contentStored, listingType, dataContent = {}, isClickHeader, callback) => {
                const arrayData = [];
                let page = "";
                if (listingType == 1 && contentStored.isExperience) {
                    // mua có kinh nghiệm
                    recursiveGet(contentStored.yesExperience.list, arrayData);
                    page = "KYC_EXPERIENCE_BUY";
                    arrayData.push(
                        {
                            checked: true,
                            control: "radio",
                            data: null,
                            hasValue: false,
                            id: 1251
                        }
                    )
                } else if (listingType == 1 && !contentStored.isExperience) {
                    // thuê có kinh nghiệm
                    arrayData.push({
                        checked: true,
                        control: "radio",
                        data: null,
                        hasValue: false,
                        id: 1256
                    });
                    page = "KYC_EXPERIENCE_BUY";
                } else if (listingType == 2 && contentStored.isExperience) {
                    // thuê có kinh nghiệm
                    recursiveGet(contentStored.yesExperience.list, arrayData);
                    page = "KYC_EXPERIENCE_RENT";
                    arrayData.push(
                        {
                            checked: true,
                            control: "radio",
                            data: null,
                            hasValue: false,
                            id: 1301
                        }
                    )
                } else if (listingType == 2 && !contentStored.isExperience) {
                    // thuê có kinh nghiệm
                    arrayData.push({
                        checked: true,
                        control: "radio",
                        data: null,
                        hasValue: false,
                        id: 1315
                    });
                    page = "KYC_EXPERIENCE_RENT";
                }
                const dataPost = Object.assign(dataContent, {
                    "page": page,
                    data : {
                        id : 0,
                        childs : arrayData
                    }
                });

                if (hasValue(dataContent.isDraff)) {
                    dispatch(fetchSavePageDraffThunk(dataPost));
                } else {
                    dispatch(fetchSavePageThunk(dataPost, isClickHeader, callback));
                }
            }
        }
    };
};
const ComponentContainer = connect(mapStateToProps,mapDispatchToProps)(containerSection);
export default ComponentContainer;

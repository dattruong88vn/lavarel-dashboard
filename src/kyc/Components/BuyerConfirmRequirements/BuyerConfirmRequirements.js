import React, {Fragment} from "react";
import {connect} from 'react-redux';
import HeaderStep from './../../Containers/HeaderStep';
import BuyerConfirmRequirementsHeader from "./BuyerConfirmRequirementsHeader";
import {
    fetchPropertyTypesForSelect, fetchAmenitiesForSelect, fetchListingProsAndConsForSelect,
    fetchRangesForSelect, fetchDirections, fetchChannelTypesForSelect, fetchAlleyType, fetchPropertyGroupForSelect
} from "../../Services/KycCommons";
import {
    fetchDealDetail, fetchSearchListingsMatchingRanking,
    postSaveDeal, fetchListingDetail, fetchKMLLink
} from "../../Services/KycDeal";
import Select from 'react-select';
import ModalFamily from "./ModalFamily";
import ListingMap from "./ListingMap";
import PositionItem from "./PositionItem";
import PositionItem2 from "./PositionItem2";
import {getSelectedOptions} from "../../../utils/CommonUtils";
import PriceBox from "../../../commonComponents/PriceBoxComponent/PriceBox";
import BpoBox from "../../../commonComponents/BpoBox/BpoBox";
import NumberFormat from "react-number-format";
import {getDistricts, getMatchingTabs} from "../../Services/ZonesService";
import {MultiSelectPZ, SingleSelectPZ} from './../../ComponentsCommon/DropdownPZ';
import {getForm} from "../../constant/ListForm";

function generateRandomId() {
    return Math.random() * 10000000000000;
}
const distants = [
    {value: 500, name: '500m'},
    {value: 1000, name: '1km'},
    {value: 2000, name: '2km'},
    {value: 3000, name: '3km'},
    {value: 4000, name: '4km'},
    {value: 5000, name: '5km'}
];
const places = [
    {value: "school", name: "Trường học"},
    {value: "restaurant", name: "Nhà hàng"},
    {value: "hospital", name: "Bệnh viện"},
    {value: "supermarket", name: "Siêu thị"}
];

const DEFAULT_POSITION_ITEM = {
    id: generateRandomId(),
    cityId: 1,
    districtIds: [],
    districtList: [],
    wardIds: [],
    wardList: [],
    streetIds: []
};
const DEFAULT_POSITION_ITEM2 = {
    id: generateRandomId(),
    cityId: 1,
    districtIds: [],
    districtList: [],
    wardIds: [],
    wardList: [],
    streetIds: []
};
const MAX_BEDROOMS = 10;
const MAX_BATHROOMS = 10;
const MAX_FLOORS = 10;

const priceBoxList = {
    milion: [
        {value: '0-5', text: '< 5 triệu'},
        {value: '5-10', text: '5 - 10 triệu'},
        {value: '10-15', text: '10 - 15 triệu'},
        {value: '15-20', text: '15 - 20 triệu'},
        {value: '20-25', text: '20 - 25 triệu'},
        {value: '25-30', text: '25 - 30 triệu'}
    ],
    bilion: [
        {value: '0-1', text: '< 1 tỷ'},
        {value: '1-2', text: '1 - 2 tỷ'},
        {value: '2-3', text: '2 - 3 tỷ'},
        {value: '3-4', text: '3 - 4 tỷ'},
        {value: '4-6', text: '4 - 6 tỷ'},
        {value: '6-8', text: '6 - 8 tỷ'},
        {value: '8-10', text: '8 - 10 tỷ'},
        {value: '10-20', text: '10 - 20 tỷ'}
    ]
};

const bpoBoxList = [
    {value: '-', text: 'Tất cả'},
    {value: 'N/A', text: 'Không có điểm BPO'},
    {value: '1-3', text: '1 - 3 điểm'},
    {value: '3-4', text: '3 - 4 điểm'},
    {value: '4-5', text: '4 - 5 điểm'}
];

class BuyerConfirmRequirementSection extends React.Component {
    constructor(props) {
        super(props);
        let urlParams = new URLSearchParams(window.location.search);
        let dealId = urlParams.get('dealId');
        this.state = {
            kmlPost: null,
            kmlLink: null,
            listingTypeId: null,
            listingId: null,
            propertyTypeId: null,
            propertyTypeGroupId: null,
            propertyTypeGroup: [],
            propertyTypes: [],
            amenities: [],
            pros: [],
            cons: [],
            value: {min: 2, max: 5000000}, // for price
            valueSize: {min: 1, max: 10}, //for size
            priceOptions: [],
            sizeOptions: [],
            directions: [],
            mapRadius: null,
            distantsRadius: distants,
            places: places,
            placeCode: null,
            matches: [],
            matchCode: null,
            numOfMatchedListing: {
                "lessMatchedTab": 0,
                "matchedTab": 0,
                "mostMatchedTab": 0
            },
            bedroomOptions: this.generateBedroomOptions(),
            bathroomOptions: this.generateBathRoomOptions(),
            floorOptions: this.generateFloorOptions(),
            distanceOptions: this.generateDistanceOptions(),
            typeOfAlleyOptions: this.generateTypeOfAlleyOptions(),
            widthOfAlleyOptions: null,
            dealDetail: {
                "dealId": dealId,
                "mapRadius": null
            },
            // purposeShowChilds: false,
            isShowModalFamily: false,
            isShowAdvanceSearch: false,
            isShowFilterResult: false,
            positionsList: [DEFAULT_POSITION_ITEM],
            positionsList2: [DEFAULT_POSITION_ITEM2],
            monthToBuyOptions: [],
            budgetOptions: [],
            listingFilter: {
                "filter": {
                    "listingTypeList": null,
                    "propertyList": null,
                    "sourceId": 3,
                    "distance": 0.5,
                    "cityIds": '1',
                    "dealId": parseInt(dealId),
                    "activeMatchingTab": null,
                },
                "additional": {
                    "paging": {
                        "limit": 10,
                        "page": 1
                    },
                    "ordering": {
                        "name": null,
                        "operator": null,
                        "orderType": 1
                    }
                }
            },
            listingIdSearchData: {},
            listings: [],
            groups: [],
            totalListings: 0,
            modalFamilyData: [],
            modalFamilyParent: null,
            isClickHeader: false,
            customerAddress: null,
            districtOptions: [],
            storeDistrictOptionsRemoved: [],
            selectedBedRooms: [],
            selectedBathRooms: [],
            priceBox: {
                list: priceBoxList.bilion,
                from: '',
                to: '',
                unit: 'tỷ',
                show: false,
                isDisabled: true
            },
            bpoBox: {
                list: bpoBoxList,
                unit: 'điểm',
                show: false,
                value: '-'
            },
            wardIds: [],
            formId: null,
            form: null,
            maxZoom: undefined
        };
        this._STORED_LOCAL = {
            autoSave: false,
        };
        this.savePage = this.savePage.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleChangeListingId = this.handleChangeListingId.bind(this);
        this.checkDuplicateDistrict = this.checkDuplicateDistrict.bind(this);
        this.removeDistrictFavorite = this.removeDistrictFavorite.bind(this);
    }

    componentDidMount() {
        fetchDealDetail(this.state.dealDetail.dealId, (data) => {
            // hide hẻm nếu là loại hình bđs là chung cư
            // if (data.propertyTypeId == 8 || data.propertyTypeId == 1) {
            //     $('.hide-area-block').hide();
            // }

            let filter = this.state.listingFilter;
            filter.filter.listingTypeList = data.listingType.listingTypeID.toString();
            if (data.address) {
                data.districtsList = [];
                data.wardsList = [];
                data.streetsList = [];
            }

            let roadFrontageWidth = null;
            let alleyId = '';
            let alleyType = '';
            let alleyWidth = '';
            let roadFrontageDistance = null;
            if (data.positionList.length > 0) {
                data.positionList.map((position, index) => {
                    if (position.positionId == 1) { // case mặt tiền
                        $('.formReset #matTien').parents('.formReset').find('.custom-row').removeClass('disabledBox');
                        $('.formReset #matTien').prop('checked', true);
                        roadFrontageWidth = position.roadFrontageWidth;
                    } else {    // case hẻm
                        $('.formReset #hemCheckbox').parents('.formReset').find('.custom-row').removeClass('disabledBox');
                        $('.formReset #hemCheckbox').prop('checked', true);
                        alleyId = position.alleyId;
                        alleyType = position.alleyType;
                        alleyWidth = position.alleyWidth;

                        if (position.roadFrontageDistanceTo == 100) {
                            roadFrontageDistance = 0;
                        } else if (position.roadFrontageDistanceTo == 200) {
                            roadFrontageDistance = 100;
                        } else if (position.roadFrontageDistanceTo == 500) {
                            roadFrontageDistance = 200;
                        } else if (position.roadFrontageDistanceTo == null) {
                            roadFrontageDistance = 500;
                        }
                    }
                })
            }

            let directionsList = []
            if (data.directionsList && data.directionsList.length > 0) {
                data.directionsList.forEach((item, index, arr) => {
                    directionsList.push({value: item.id, label: item.name, prefer: item.isPrefered});
                })
            }
            let initialBudgetSort = 0;
            let finalBudgetSort = 0;

            initialBudgetSort = data.initialBudget / 1000000;
            finalBudgetSort = data.finalBudget / 1000000;
            let priceBox = this.state.priceBox;
            priceBox.unit = 'triệu';
            priceBox.list = priceBoxList.milion;
            priceBox.isDisabled = true;
            if (data.listingTypeId && data.listingTypeId != 0) {
                priceBox.isDisabled = false;
            }
            if (data.listingTypeId == 1) //mua bước nhảy 1 tỷ
            {
                initialBudgetSort = initialBudgetSort / 1000;
                finalBudgetSort = finalBudgetSort / 1000;
                priceBox.unit = 'tỷ';
                priceBox.list = priceBoxList.bilion;
            }
            priceBox.from = initialBudgetSort;
            priceBox.to = finalBudgetSort;
            this.setState({
                "dealDetail": {
                    ...data,
                    directionsList: directionsList,
                    bedRooms: data.bedRooms ? [{value: data.bedRooms, label: data.bedRooms.toString(), prefer: false}] : [],
                    bathRooms: data.bathRooms ? [{value: data.bathRooms, label: data.bathRooms.toString(), prefer: false}] : [],
                    roadFrontageWidth: roadFrontageWidth,
                    typeOfAlley: alleyType,
                    alleyWidth: alleyWidth,
                    widthOfAlley: alleyId,
                    distance: roadFrontageDistance
                },
                "value": {min: initialBudgetSort, max: finalBudgetSort},
                "valueSize": {min: data.minSize, max: data.maxSize},
                "listingTypeId": data.listingType.listingTypeID,
                "listingFilter": {
                    ...filter
                },
                "priceBox": {...priceBox},
                "propertyTypeGroupId": data.propertyTypeGroup.id,
                "formId": data.propertyType.formId,
            });
            fetchPropertyGroupForSelect(data => {
                this.setState({
                    "propertyTypeGroup": data
                })
            });
            fetchPropertyTypesForSelect(data.propertyTypeGroup.id ,data.listingType.listingTypeID, (data) => {
                this.setState({
                    "propertyTypes": data
                })
            });
            this.fetchInitData()
            this.fetchRangesForSelect(data.listingTypeId, data.propertyTypeId);
            if (data.utilityAroundList) {
                let selectedUtilities = [];
                for (let i = 0; i < data.utilityAroundList.length; i++) {
                    selectedUtilities.push({
                        value: data.utilityAroundList[i].id
                    })
                }
                this.setState({
                    "selectedUtilities": selectedUtilities
                })
            }

            if (data.advantageList) {
                let selectedPros = [];
                for (let i = 0; i < data.advantageList.length; i++) {
                    selectedPros.push({
                        value: data.advantageList[i].id
                    })
                }
                this.setState({
                    "selectedPros": selectedPros
                })
            }
            if (data.disAdvantageList) {
                let selectedCons = [];
                for (let i = 0; i < data.disAdvantageList.length; i++) {
                    selectedCons.push({
                        value: data.disAdvantageList[i].id
                    })
                }
                this.setState({
                    "selectedCons": selectedCons
                })
            }
            this.generatePositionListData(data);
            this.handleForm(data.propertyType.formId);
        })
        this.fetchMatchingTabs();
        this.getDistricts(DEFAULT_POSITION_ITEM.cityId);
        this._STORED_LOCAL.autoSave = true;
        this.handleFormAlley();
    }

    fetchMatchingTabs() {
        getMatchingTabs((response) => {
            let arrMatches = [];
            for (var key in response.tabs) {
                arrMatches.push({value: key, name: response.tabs[key].label})
            }
            this.setState({
                "matches": arrMatches
            })
        })

    }

    getDistricts(cityId) {
        getDistricts(cityId, (response) => {
            let districtOptionsFilter = response.filter((item) => {
                let isDuplicateDistrict = false;

                this.state.storeDistrictOptionsRemoved.map((itemDistRemoved) => {
                    if (itemDistRemoved.value == item.districtId) {
                        isDuplicateDistrict = true;
                    }
                })

                if (!isDuplicateDistrict) {
                    return true
                }
            })
            let districtOptions = districtOptionsFilter.map((item) => {
                return {value: item.districtId, label: item.districtName, prefer: false}
            })

            this.setState({
                "districtOptions": districtOptions
            });
        });
    }

    checkDuplicateDistrict(districtIds) {
        if (districtIds.length > 0) {
            this.state.districtOptions.map((itemDis, index) => {
                if (itemDis.value == districtIds[0].value) {
                    this.state.storeDistrictOptionsRemoved.push(itemDis);
                    this.state.districtOptions.splice(index, 1)
                }
            })
        }
    }

    handleChangeListingId(event) {
        let listingId = event.target.value;
        if (listingId) {
            let resetPositionList = [this.state.positionsList[0]];
            this.setState({
                positionsList: resetPositionList
            })
            $('.col-area-disabled').addClass('disabledBox');
        } else {
            this.setState({
                dealDetail: {
                    ...this.state.dealDetail,
                    'address': ''
                }
            })
            $('.col-area-disabled').removeClass('disabledBox');
        }
        if (listingId == '') {
            $('.show-address-listingId').addClass('hidden');
        }
    }

    handleChangeAlleyType = (event) => {
        let thisObj = this;
        if (event.target.value == 1) {
            if ($('.formReset #matTien').prop('checked')) {
                $('.formReset #matTien').parents('.formReset').find('.custom-row').removeClass('disabledBox');
            } else {
                $('.formReset #matTien').parents('.formReset').find('.custom-row').addClass('disabledBox');
                thisObj.setState({
                    ...thisObj.state,
                    dealDetail: {
                        ...thisObj.state.dealDetail,
                        roadFrontageWidth: ''
                    }
                })
            }

        } else {
            if ($('.formReset #hemCheckbox').prop('checked')) {
                $('.formReset #hemCheckbox').parents('.formReset').find('.custom-row').removeClass('disabledBox');
            } else {
                $('.formReset #hemCheckbox').parents('.formReset').find('.custom-row').addClass('disabledBox');
                thisObj.setState({
                    ...thisObj.state,
                    dealDetail: {
                        ...thisObj.state.dealDetail,
                        typeOfAlley: null,
                        alleyWidth: '',
                        widthOfAlley: null,
                        distance: null,
                    }
                })
            }
        }
    }

    handleFormAlley() {
        $('.formReset .bl-checkbox input').each(function () {
            if ($(this).prop('checked')) {
                $(this).parents('.formReset').find('.custom-row').removeClass('disabledBox');
            } else {
                $(this).parents('.formReset').find('.custom-row').addClass('disabledBox');
            }
        })
    }

    handleForm(formId){
        const form = getForm(formId);
        this.setState({
            "form": form
        });
    }

    generatePositionListData(dealDetail) {
        let positionsList2 = [];
        let position2 = {
            districtIds: [],
            wardIds: [],
            streetIds: []
        };
        position2.id = generateRandomId();
        position2.cityId = 1;
        position2.districtIds.push(dealDetail.customers.districtId);
        position2.wardIds.push(dealDetail.customers.wardId);
        position2.streetIds.push(dealDetail.customers.streetId);
        positionsList2.push(position2);
        this.setState({
            "positionsList2": positionsList2,
            "customerAddress": dealDetail.customers.houseNumber
        });
        if (!dealDetail.districtsList) {
            return;
        }
        let positionsList = [];
        dealDetail.districtsList.forEach((district) => {
            let position = {
                districtIds: [],
                wardIds: [],
                streetIds: []
            };
            position.id = generateRandomId();
            position.cityId = 1;
            position.districtIds.push({value: district.id, label: district.name, prefer: district.isPrefered});
            this.checkDuplicateDistrict(position.districtIds);

            if (dealDetail.wardsList) {
                dealDetail.wardsList.forEach((ward) => {
                    if (ward.districtId == district.id) {
                        position.wardIds.push({value: ward.id, label: ward.name, prefer: ward.isPrefered});
                        if (dealDetail.streetsList) {
                            dealDetail.streetsList.forEach((street) => {
                                if (street.wardId == ward.id) {
                                    position.streetIds.push({value: street.id, label: street.name, prefer: street.isPrefered});
                                }
                            });
                        }
                    }
                })
            }
            positionsList.push(position);
        });
        if (positionsList && positionsList.length > 0) {
            this.setState({
                "positionsList": positionsList,
            })
        }
    }

    fetchInitData() {
        fetchAmenitiesForSelect(16, (data) => {
            this.setState({
                "amenities": data
            });
        });
        fetchAlleyType((data) => {
            let alleyTypeOptions = data.map(item => {
                return {value: item.alleyId, label: item.alleyName}
            })
            this.setState({
                "widthOfAlleyOptions": alleyTypeOptions
            });
        });
        fetchListingProsAndConsForSelect(5, (data) => {
            this.setState({
                "pros": data
            });
        });
        fetchListingProsAndConsForSelect(6, (data) => {
            this.setState({
                "cons": data
            });
        });
        fetchDirections((data) => {
            let directionOptions = data.map(item => {
                return {value: item.dId, label: item.directionName, prefer: false}
            })
            this.setState({
                ...this.state,
                directions: directionOptions
            });
        });
        fetchChannelTypesForSelect(31, (data) => {
            this.setState({
                monthToBuyOptions: data
            });
        });
        let priceType = this.state.dealDetail.listingTypeId == 1 ? 32 : 35;
        fetchChannelTypesForSelect(priceType, (data) => {
            this.setState({
                budgetOptions: data
            });
        });
    }

    addNewPosition() {
        let positionsList = this.state.positionsList;
        if (positionsList.length > 1) {
            $('.show-address-listingId').addClass('hidden');
        }

        let position = Object.assign({}, DEFAULT_POSITION_ITEM);
        position.id = generateRandomId();
        positionsList.push(position);
        this.setState({
            "positionsList": positionsList,
            "listingIdSearchData": {}
        });
    }

    resetPositionList() {
        let positionsList = [];
        let position = Object.assign({}, DEFAULT_POSITION_ITEM);
        position.id = generateRandomId();
        positionsList.push(position);
        let dealDetail = this.state.dealDetail;
        dealDetail.districtsList = [];
        dealDetail.wardsList = [];
        dealDetail.streetsList = [];
        this.setState({
            "positionsList": positionsList
        }, () => {
            this.doSearchListings();
            this.setState({
                isShowAdvanceSearch: false
            });
        })
    }

    removeDistrictFavorite(districtSelected) {
        if (districtSelected.length != 0) {
            this.state.storeDistrictOptionsRemoved.map((itemDistrict, index) => {
                if (itemDistrict.value == districtSelected[0].value) {
                    this.state.storeDistrictOptionsRemoved.splice(index, 1);
                }
            })
        }
        this.getDistricts(DEFAULT_POSITION_ITEM.cityId);
    }

    removePosition(item, defaultSelectedDistrict) {
        this.removeDistrictFavorite(defaultSelectedDistrict);
        let positionsList = this.state.positionsList;

        positionsList = positionsList.filter((value, index, arr) => {
            return value.id != item.id;
        })
        if (positionsList.length == 0) {
            let position = Object.assign({}, DEFAULT_POSITION_ITEM);
            position.id = generateRandomId();
            positionsList.push(position);
        }
        this.setState({
            "positionsList": positionsList,
            "listingIdSearchData": {}
        })
    }
    onPropertyTypeGroupChange(data){
        const propertyTypeGroupId = data.value;
        this.setState({propertyTypeGroupId})
        fetchPropertyTypesForSelect(propertyTypeGroupId ,this.state.listingTypeId, (data) => {
            this.setState({
                "propertyTypes": data
            })
        })
    }
    onPropertyTypeChange(name, data) {
        var item = {};
        item[name] = data.value;

        let roadFrontageWidth = this.state.dealDetail.roadFrontageWidth;
        let typeOfAlley = this.state.dealDetail.typeOfAlley;
        let alleyWidth = this.state.dealDetail.alleyWidth;
        let widthOfAlley = this.state.dealDetail.widthOfAlley;
        let distance = this.state.dealDetail.distance;
        if (!this.state.form?.position) {
            if ($('.formReset #matTien').prop('checked')) {
                $('#matTien').trigger('click');
                roadFrontageWidth = '';
            }
            if ($('.formReset #hemCheckbox').prop('checked')) {
                $('#hemCheckbox').trigger('click');
                typeOfAlley = null;
                alleyWidth = '';
                widthOfAlley = null;
                distance = null;
            }
        }
        this.setState({
            propertyTypeId: data.value,
            dealDetail: {
                ...this.state.dealDetail,
                propertyTypeId: data.value,
                roadFrontageWidth,
                typeOfAlley,
                alleyWidth,
                widthOfAlley,
                distance
            },
            formId: data.formId,
        }, () => {
            this.handleForm(this.state.formId);
            this.fetchRangesForSelect(this.state.listingTypeId, data.value);
        });
    }

    fetchRangesForSelect(listingTypeId, propertyTypeId) {
        fetchRangesForSelect(listingTypeId, propertyTypeId, (data) => {
            let filter = this.state.listingFilter;
            filter.filter.propertyList = propertyTypeId;
            this.setState({
                "priceOptions": data.prices,
                "sizeOptions": data.sizes,
                "listingFilter": {
                    ...filter
                }
            });
        })
    }

    setStateDealPlanInfo(key, value, prev) {
        var item = {};
        item[key] = value;
        return {
            dealDetail: {
                ...prev.dealDetail,
                dealPlanInfo: {
                    ...prev.dealDetail.dealPlanInfo,
                    ...item
                }
            }
        }
    }

    onDirectionChange(data) {
        let directionsList = this.state.dealDetail.directionsList;
        if (!data.checked) {
            //unchecked
            if (data.value == "DTT") {
                directionsList = directionsList.filter((item, index) => {
                    return item.id != 1 && item.id != 7 && item.id != 4 && item.id != 3 && item.id != 'DTT';
                });
            }
            //tây tứ trạch
            else if (data.value == "TTT") {
                directionsList = directionsList.filter((item, index) => {
                    return item.id != 2 && item.id != 6 && item.id != 8 && item.id != 5 && item.id != 'TTT';
                });
            }
            else {
                if (data.value == "1" || data.value == "7" || data.value == "4" || data.value == "3") {
                    directionsList = directionsList.filter((item, index) => {
                        return item.id != data.value && item.id != "DTT";
                    });
                } else {
                    directionsList = directionsList.filter((item, index) => {
                        return item.id != data.value && item.id != "TTT";
                    });
                }
            }
        } else {
            //checked
            directionsList.push({
                id: data.value,
                isPrefered: false
            })
            //temp1.some(o => ["appls", "banana"].includes(o));
            let directionListArr = directionsList.map(o => o.id.toString());
            if (directionListArr.includes("1") && directionListArr.includes("7") && directionListArr.includes("4") && directionListArr.includes("3")) {
                directionsList.push({
                    id: "DTT",
                    isPrefered: false
                })
            }
            //Tây tứ trạch
            if (directionListArr.includes("2") && directionListArr.includes("6") && directionListArr.includes("8") && directionListArr.includes("5")) {
                directionsList.push({
                    id: "TTT",
                    isPrefered: false
                })
            }
            //Đong tứ trạch
            if (data.value == "DTT") {
                directionsList.push({
                    id: "1",
                    isPrefered: false
                })
                directionsList.push({
                    id: "7",
                    isPrefered: false
                })
                directionsList.push({
                    id: "4",
                    isPrefered: false
                })
                directionsList.push({
                    id: "3",
                    isPrefered: false
                })
            }
            if (data.value == "TTT") {
                directionsList.push({
                    id: "2",
                    isPrefered: false
                })
                directionsList.push({
                    id: "6",
                    isPrefered: false
                })
                directionsList.push({
                    id: "8",
                    isPrefered: false
                })
                directionsList.push({
                    id: "5",
                    isPrefered: false
                })
            }
        }
        //clear duplicate
        directionsList = directionsList.reduce((acc, current) => {
            const x = acc.find(item => item.id == current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        this.setState({
            dealDetail: {
                ...this.state.dealDetail,
                "directionsList": directionsList
            }
        })
    }

    onChange(name, data) {
        switch (name) {
            case "propertyTypeId": {
                this.onPropertyTypeChange(name, data);
                return;
            }
            case "propertyTypeGroupId": {
                this.onPropertyTypeGroupChange(data);
                return;
            }
            case "isUrgent":
                data.value = (data.value == "true" ? true : false);
            case "priceType":
            case "needTimeType": {
                this.setState((prev) => (
                    this.setStateDealPlanInfo(name, data.value, prev))
                )
                return;
            }
            case 'directionsList': {
                this.setState({
                    ...this.state,
                    "dealDetail": {
                        ...this.state.dealDetail,
                        directionsList: data
                    }
                })
                return;
            }
            case "bedRooms": {
                this.setState({
                    ...this.state,
                    "dealDetail": {
                        ...this.state.dealDetail,
                        bedRooms: data
                    }
                })
                return;
            }
            case "bathRooms": {
                this.setState({
                    ...this.state,
                    dealDetail: {
                        ...this.state.dealDetail,
                        bathRooms: data
                    }
                })
                return;
            }
            case "widthOfAlley":
            case "typeOfAlley":
            case "distance":
            case "initialBudget":
            case "numberFloor":
            case "finalBudget":
            case "minSize":
            case "maxSize": {
                let item = {};
                item[name] = data.value;
                this.setState((prev) => ({
                    dealDetail: {
                        ...prev.dealDetail,
                        ...item
                    }
                })
                );
                return;
            }
            case "direction": {
                this.onDirectionChange(data);
                return;
            }
            case "pros": {
                this.setState({
                    selectedPros: data
                })
                return;
            }
            case "cons": {
                this.setState({
                    selectedCons: data
                })
                return;
            }
            case "utilities": {
                this.setState({
                    selectedUtilities: data
                })
                return;
            }
            default: {
                let item = {};
                item[name] = data.value;
                this.setState(item);
            }
        }
    }

    onInputChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        this.onChange(name, {value: value});
    }

    onCheckBoxChange(name, event) {
        let target = event.target;
        this.onChange(name, {value: target.value, checked: target.checked});
    }

    onDistantClick(data) {
        let dataRadius = data.value
        if (data.value == this.state.dealDetail.mapRadius) {
            dataRadius = null;
        }
        let filter = this.state.listingFilter;
        filter.filter.distance = dataRadius ? dataRadius / 1000 : null;
        this.setState({
            "dealDetail": {
                ...this.state.dealDetail,
                mapRadius: dataRadius
            },
            "mapRadius": dataRadius,
            "listingFilter": {
                ...filter
            }
        }, () => {
            this.doSearchListings();
        })
    }

    generateBedroomOptions() {
        let options = [];
        for (var i = 0; i < MAX_BEDROOMS; i++) {
            options.push({value: i, label: i.toString(), prefer: false});
        }
        return options;
    }

    generateDistanceOptions() {
        let options = [
            {value: '', label: 'Chọn'},
            {value: '0', label: '<= 100m'},
            {value: '100', label: '100m - 200m'},
            {value: '200', label: '200m - 500m'},
            {value: '500', label: '>500m'},
        ];
        return options;
    }

    generateTypeOfAlleyOptions() {
        let options = [
            {value: '', label: 'Chọn'},
            {value: 1, label: 'Hẻm thông'},
            {value: 2, label: 'Hẻm cụt'}
        ];
        return options;
    }

    generateWidthOfAlleyOptions() {
        let options = [
            {value: '', label: 'Chọn'},
            {value: 8, label: 'Xe ba gác'},
            {value: 9, label: 'Xe ôtô'},
            {value: 10, label: 'Xe tải'}
        ];
        return options;
    }

    generateBathRoomOptions() {
        let options = [];
        for (var i = 0; i < MAX_BATHROOMS; i++) {
            options.push({value: i, label: i.toString(), prefer: false});
        }
        return options;
    }

    generateFloorOptions() {
        let options = [];
        for (var i = 0; i < MAX_FLOORS; i++) {
            options.push({value: i, label: i});
        }
        return options;
    }

    // renderPurpose() {
    //     if (!this.state.dealDetail || !this.state.dealDetail.customerPurpose) {
    //         return;
    //     }
    //     let isHasChild = false;
    //     customerPurpose.childs[0].childs.forEach(i => {
    //         if (i.checked) {
    //             isHasChild = true;
    //         }
    //     });
    //     this.state.purposeShowChilds = isHasChild;
    //     this.setState({...this.state});
    // }

    renderPurpose() {
        if (!this.state.dealDetail || !this.state.dealDetail.customerPurpose) {
            return;
        }
        const purposes = this.state.dealDetail.customerPurpose.childs;
        const classShowChildren = purposes[0].childs.find(child => child.checked) ? 'has-chidren' : '';
        
        return (
            <div className={`purpose-wrapper ${classShowChildren}`}>
                {purposes.map((item) => {
                    return (
                        <div className="form-group row">
                            <label className="col-sm-2">{item.title}</label>
                            <div className="col-sm-10">
                                {this.renderChildPurposes(0, item.id, item.childs)}
                            </div>
                            <div style={{clear: "both"}}></div>
                        </div>
                    )
                })}
                <div style={{clear: "both"}}></div>
            </div>
        )
    }

    setDataPostForKML = (positionsList) => {
        let _dataPost = positionsList.map((position, index) => {
            return {
                districtId: position.districtIds[0] ? position.districtIds[0].value : null,
                wards: position.wardIds.map(ward => {return ward.value})
            }
        })
        let _state = {...this.state};
        _state.kmlPost = {districts: _dataPost};
        this.setState(_state);
    }

    renderPositionGroup() {
        const totalPosition = this.state.positionsList.length;
        const _positionsList = this.state.positionsList;
        return _positionsList.map((item, index) => {
            return (
                <PositionItem isLast={(totalPosition - 1) == index}
                    key={item.id} positionData={item} districtOptions={this.state.districtOptions}
                    checkDuplicateDistrict={this.checkDuplicateDistrict}
                    removeDistrictFavorite={this.removeDistrictFavorite}
                    positionList={this.state.positionsList}
                    listingIdSearchData={this.state.listingIdSearchData}

                    updateData={(data) => {
                        item = data;
                        let positionsList = this.state.positionsList;
                        for (let i = 0; i < positionsList.length; i++) {
                            if (positionsList[i].id == data.id) {
                                positionsList[i] = data;
                            }
                        }
                        let dealDetail = {...this.state.dealDetail};
                        if (positionsList && positionsList.length > 0 && positionsList[0].districtIds.length > 0) {
                            dealDetail.address = null;
                            dealDetail.longitude = null;
                            dealDetail.latitude = null;
                        }
                        this.setState({
                            "dealDetail": dealDetail,
                            "positionsList": positionsList
                        }, () => {
                            // set dataPost kml
                            this.setDataPostForKML(_positionsList);
                        })
                    }} onAdd={this.addNewPosition.bind(this)} onRemove={this.removePosition.bind(this)} />
            )
        });
    }

    renderPositionGroup2() {
        const totalPosition = this.state.positionsList2.length;
        return this.state.positionsList2.map((item, index) => {
            return (
                <PositionItem2 isLast={(totalPosition - 1) == index} key={item.id} positionData={item} updateData={(data) => {

                    let dealDetail = {...this.state.dealDetail};
                    dealDetail.customers = {...dealDetail.customers, districtId: data.districtIds[0]}
                    dealDetail.customers = {...dealDetail.customers, wardId: data.wardIds[0]}
                    dealDetail.customers = {...dealDetail.customers, streetId: data.streetIds[0]}
                    dealDetail.customers = {...dealDetail.customers, houseNumber: this.state.customerAddress}
                    this.setState({
                        "dealDetail": dealDetail,
                    })
                }} onAdd={this.addNewPosition.bind(this)} onRemove={this.removePosition.bind(this)} />
            )
        });
    }

    renderChildPurposes(level, parentId, purposes) {
        if (!purposes || level == 2) {
            return;
        }
        level++;
        let classNames = [
            "purpos-level-" + level
        ];
        return (
            <div className={classNames}>
                {purposes.map((item) => {
                    return (
                        <Fragment>
                            <div className={"col-sm-" + (level != 2 ? 12 / purposes.length : 3)}>
                                {this.renderControl(parentId, item)}
                            </div>
                            {item.checked && this.renderChildPurposes(level, parentId, item.childs)}
                        </Fragment>
                    )
                })}
                <div style={{clear: "both"}}></div>
            </div>
        )
    }

    findAndSetPurposeValue(purposes, item, checked) {
        for (var i = 0; i < purposes.length; i++) {
            let purpose = purposes[i];
            let isFound = false;
            if (item.control == "radio") {
                purpose.checked = false;
            }
            if (purpose.id == item.id) {
                purpose.checked = checked;
                isFound = true;
            }
            if (purpose.childs) {
                if (isFound) {
                    this.findAndSetPurposeValue(purpose.childs, item, false);
                } else {
                    this.findAndSetPurposeValue(purpose.childs, item, checked);
                }
            }
        }
        this.setState({
            "dealDetail": Object.assign({}, this.state.dealDetail),
            // "purposeShowChilds": true
        })
    }

    purposesChange(item, event) {
        var purposes = this.state.dealDetail.customerPurpose.childs[0].childs;
        switch (item.control) {
            case "radio":
            case "checkbox": {
                let checked = event.target.checked;
                this.findAndSetPurposeValue(purposes, item, checked);
                if ($.inArray(item.id, [1356, 1453, 1506]) >= 0) {
                    this.setState({
                        isShowModalFamily: checked,
                        modalFamilyData: item.childs,
                        modalFamilyParent: item.id
                    })
                }
                return;
            }
            case "select": {
                let checked = true;
                let selectedValue = null;
                item.childs.forEach((children, index, arr) => {
                    if (event.value == children.id) {
                        this.findAndSetPurposeValue(purposes, children, true);
                    } else {
                        this.findAndSetPurposeValue(purposes, children, false);
                    }
                })
            }
        }
    }

    renderPurposRadio(parentId, item) {
        return (
            <div className="need-radio">
                <input id={item.id} type="radio" className="need-radio-input" name={parentId} onChange={this.purposesChange.bind(this, item)} checked={item.checked} />
                <label htmlFor={item.id} className="need-radio-label">{item.title}</label>
            </div>
        )
    }

    renderInput(parentId, item) {
        return (
            <Fragment>
                <div className="bl-checkbox">
                    <input id={item.id} type={item.control} onChange={this.purposesChange.bind(this, item)} checked={item.checked} />
                    <label htmlFor={item.id}> {item.title}</label>
                    {($.inArray(item.id, [1356, 1453, 1506]) >= 0 && item.checked) && <span onClick={() => {
                        this.setState({
                            "isShowModalFamily": true,
                            "modalFamilyData": item.childs,
                            "modalFamilyParent": item.id
                        })
                    }}><i className="fa fa-eye" style={{marginLeft: '20px'}}></i></span>}
                </div>
            </Fragment>
        )
    }

    saveModalFamily() {
        this.setState({
            "isShowModalFamily": false,
        })
    }

    renderControl(parentId, item) {
        let control = item.control;
        let html = [];
        switch (item.control) {
            case "radio": {
                return this.renderPurposRadio(parentId, item);
                break;
            }
            case "checkbox": {
                return this.renderInput(parentId, item);
                break;
            }
            case "select": {
                let options = [];
                let value = null;
                item.childs.map((children) => {
                    let option = {value: children.id, label: children.title};
                    options.push(option);
                    if (children.checked) {
                        value = option;
                    }
                })
                return (
                    <Select isSearchable={false} value={value} options={options} placeholder="Số lượng thành viên" onChange={this.purposesChange.bind(this, item)} />
                )
            }
        }
    }

    onToggleShowAdvanceSearchClick(event) {
        event.preventDefault();
        this.setState({
            "isShowAdvanceSearch": !this.state.isShowAdvanceSearch
        })
    }

    onToggleShowFilterResult(event) {
        event.preventDefault();
        this.setState({
            "isShowFilterResult": !this.state.isShowFilterResult
        })
    }

    isDirectionChecked(item) {
        let directionsList = this.state.dealDetail.directionsList;
        if (directionsList && directionsList.length > 0) {
            for (var i = 0; i < directionsList.length; i++) {
                let direction = directionsList[i];
                if (direction.id == item.dId) {
                    return true;
                }
            }
        }
        return false;
    }

    onBpoBoxChange = (val) => {
        this.setState({...this.state, bpoBox: {...this.state.bpoBox, value: val, show: false}});
    }

    renderAdvanceSearch() {
        let classNames = [
            "advance-search-wrapper",
            !this.state.isShowAdvanceSearch && "hidden"
        ]
        let classNamesFilterResult = [
            "filter-result-wrapper",
            !this.state.isShowFilterResult && "hidden"
        ]
        const onPriceBoxChange = (from, to) => {
            const priceBox = this.state.priceBox;
            priceBox.from = from;
            priceBox.to = to;
            priceBox.show = false;
            this.setState({...this.state, priceBox: {...priceBox}}, () => {
                let _state = {...this.state};
                const value = {min: parseFloat(this.state.priceBox.from.toString().replace(/,/g, '')).toFixed(2), max: parseFloat(this.state.priceBox.to.toString().replace(/,/g, '')).toFixed(2)};
                _state.value = {min: this.state.priceBox.from, max: this.state.priceBox.to};
                _state.dealDetail.initialBudget = value.min * 1000000;
                _state.dealDetail.finalBudget = value.max * 1000000;
                if (this.state.priceBox.unit == 'tỷ') {
                    _state.dealDetail.initialBudget *= 1000;
                    _state.dealDetail.finalBudget *= 1000;
                }

                this.setState(_state);
            });
        }
        const onInitialBudgetFixedChange = (e) => {
            this.state.dealDetail.initialBudgetFixed = parseInt(e.target.value.replace(/,/g, ''), 10);
            this.setState({...this.state});
        }
        return (
            <div>
                <div className="form-group row">
                    <label className="control-label col-sm-2 pr0 pt5">Nhóm BĐS</label>
                    <div className="col-sm-2 pr0">
                        <Select
                            isSearchable={false}
                            name="propertyTypeGroup"
                            value={getSelectedOptions(this.state.propertyTypeGroupId, this.state.propertyTypeGroup)}
                            options={this.state.propertyTypeGroup}
                            onChange={this.onChange.bind(this, "propertyTypeGroupId")}
                            placeholder="--- Vui lòng chọn ---" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-sm-2 pr0 pt5">Loại hình BĐS</label>
                    <div className="col-sm-2 pr0">
                        <Select
                            isSearchable={false}
                            name="propertyTypeId"
                            value={getSelectedOptions(this.state.dealDetail.propertyTypeId, this.state.propertyTypes)}
                            options={this.state.propertyTypes}
                            onChange={this.onChange.bind(this, "propertyTypeId")}
                            placeholder="--- Vui lòng chọn ---"
                            styles={{
                                option: (base, { isDisabled, isFocused }) => {
                                    let backgroundColor = '#fff'
                                    let color = '#333'
                                
                                    if(isDisabled) {
                                        backgroundColor = '#ccc'
                                        color = '#444'
                                    }
                    
                                    if(isFocused) {
                                        backgroundColor = "#deebff"; //Default color by react-select
                                    }
                    
                                    return {
                                        ...base,
                                        backgroundColor,
                                        color: '#333',
                                        cursor: isDisabled ? 'not-allowed' : 'default',
                                    }
                                }
                            }} />
                    </div>
                </div>

                <div className="form-group row custom-input-range">
                    <PriceBox onChange={onPriceBoxChange} show={this.state.priceBox.show} unit={this.state.priceBox.unit} list={this.state.priceBox.list} priceFrom={this.state.priceBox.from} priceTo={this.state.priceBox.to} label={'Khoảng giá khách tìm kiếm'} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-sm-2 pr0 pt5">Ngân sách khách đang có</label>
                    <div className="col-sm-6">
                        <NumberFormat maxLength="12" thousandSeparator="," decimalScale="0" onChange={onInitialBudgetFixedChange} decimalSeparator="." className="form-control" name="initialBudgetFixed" value={this.state.dealDetail.initialBudgetFixed} placeholder={''} />
                    </div>
                </div>

                <div className="form-group row custom-input-range">
                    <label className="control-label col-sm-2 pr0 pt5">Diện tích (m2)</label>

                    <div className="col-sm-3">
                        <NumberFormat maxLength="12" thousandSeparator="," decimalScale="0" onChange={(e) => {
                            let _state = {...this.state};
                            _state.dealDetail.minSize = e.target.value;
                            this.setState(_state);
                        }}
                            decimalSeparator="." className="form-control" name="minSize" value={this.state.dealDetail.minSize || null} placeholder={'từ'} />

                    </div>
                    <div className="col-sm-3">
                        <NumberFormat maxLength="12" thousandSeparator="," decimalScale="0" onChange={(e) => {
                            let _state = {...this.state};
                            _state.dealDetail.maxSize = e.target.value;
                            this.setState(_state);
                        }}
                            decimalSeparator="." className="form-control" name="maxSize" value={this.state.dealDetail.maxSize || null} placeholder={'đến'} />

                    </div>

                </div>

                <div className="form-group row">
                    <label className="control-label col-sm-2 pr0 pt5">ListingId</label>
                    <div className="col-sm-2 pr0">
                        <input type="text" id="listingID" placeholder="Listing ID"
                            onChange={this.handleChangeListingId} className="form-control" style={{height: "38px"}} />
                    </div>
                    <div className="col-sm-2 pl0">
                        <button className=" btn btn-kyc btn-search" onClick={e => this.onListingChangeHanlde(e, false)}><i className="fa fa-search"></i></button>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-sm-2 pr0 pt5">Khu vực</label>
                    <div className="col-sm-10">
                        {this.renderPositionGroup()}
                        <div className="row form-group show-address-listingId hidden mb0">
                            <div className="col-sm-6 pr0 disabledBox">
                                <input type="text" id="addressListingId" placeholder="Địa chỉ"
                                    className="form-control" value={this.state.dealDetail.address ? this.state.dealDetail.address : null}
                                    style={{height: "38px"}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-2 col-sm-offset-10">
                        <a className="btnAddCriteria" href="#" onClick={this.onToggleShowAdvanceSearchClick.bind(this)}>
                            {this.state.isShowAdvanceSearch ? "Ẩn tiêu chí" : "Thêm tiêu chí"}
                        </a>
                    </div>
                </div>

                <div className={classNames.join(" ")}>
                    <div className="form-group row">
                        <label className="control-label col-sm-2 pr0 pt5">Phòng ngủ</label>

                        <div className="col-sm-2">
                            <SingleSelectPZ placeholder="Số phòng" className="custom-width-dropdown"
                                handleOnChange={this.onChange.bind(this, "bedRooms")}
                                selected={this.state.dealDetail.bedRooms ? this.state.dealDetail.bedRooms : []}
                                options={this.state.bedroomOptions} />
                        </div>
                        <label className="control-label col-sm-2 pr0 pt5">Phòng tắm</label>
                        <div className="col-sm-2">
                            <SingleSelectPZ placeholder="Số phòng" className="custom-width-dropdown"
                                handleOnChange={this.onChange.bind(this, "bathRooms")}
                                selected={this.state.dealDetail.bathRooms ? this.state.dealDetail.bathRooms : []}
                                options={this.state.bathroomOptions} />
                        </div>
                        <label className="control-label col-sm-2 pr0 pt5">Hướng</label>
                        <div className="col-sm-2">
                            <MultiSelectPZ placeholder="Chọn hướng" className="custom-width-dropdown"
                                handleOnChange={this.onChange.bind(this, "directionsList")}
                                selected={this.state.dealDetail.directionsList ? this.state.dealDetail.directionsList : []}
                                options={this.state.directions} />
                        </div>
                    </div>

                    <div className="form-group row hide-area-block" style={{display: this.state.form?.position ? 'block' : 'none'}}>
                        <label className="control-label col-sm-2 pr0">Vị trí</label>
                        <div className="col-sm-10">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="row">
                                        <div id="matTienResetForm" className="col-sm-6 formReset">
                                            <div className="row">
                                                <div className="control-label col-sm-12 bl-checkbox ml15 mb0">
                                                    <input type="checkbox" id="matTien" value="1" onClick={this.handleChangeAlleyType} />
                                                    <label htmlFor="matTien">Mặt tiền</label>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row custom-row disabledBox">
                                                <label className="control-label col-sm-4 pr0">Độ rộng mặt tiền</label>
                                                <div className="col-sm-8">
                                                    <input className="form-control" type="number" min="0" placeholder="m"
                                                        onChange={(e) => {
                                                            let _state = {...this.state};
                                                            _state.dealDetail.roadFrontageWidth = e.target.value;
                                                            this.setState(_state);
                                                        }}
                                                        value={this.state.dealDetail.roadFrontageWidth ? this.state.dealDetail.roadFrontageWidth : ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div id="hemResetForm" className="col-sm-6 formReset">
                                            <div className="row">
                                                <div className="control-label col-sm-12 bl-checkbox ml15 mb0">
                                                    <input type="checkbox" id="hemCheckbox" onClick={this.handleChangeAlleyType} value="2" />
                                                    <label htmlFor="hemCheckbox">Hẻm</label>
                                                </div>
                                            </div>

                                            <hr />
                                            <div className="row custom-row disabledBox">
                                                <label className="control-label col-sm-4 pr0">Khoảng cách</label>
                                                <div className="col-sm-8">
                                                    <Select
                                                        placeholder="Chọn"
                                                        isSearchable={false}
                                                        value={getSelectedOptions(this.state.dealDetail.distance, this.state.distanceOptions)}
                                                        options={this.state.distanceOptions}
                                                        onChange={this.onChange.bind(this, "distance")}
                                                    />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row custom-row disabledBox">
                                                <label className="control-label col-sm-4 pr0">Loại hẻm</label>
                                                <div className="col-sm-8">
                                                    <Select
                                                        placeholder="Chọn"
                                                        isSearchable={false}
                                                        value={getSelectedOptions(this.state.dealDetail.typeOfAlley, this.state.typeOfAlleyOptions)}
                                                        options={this.state.typeOfAlleyOptions}
                                                        onChange={this.onChange.bind(this, "typeOfAlley")}
                                                    />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row custom-row disabledBox">
                                                <label className="control-label col-sm-4 pr0">Độ rộng hẻm</label>
                                                <div className="col-sm-8">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <Select
                                                                placeholder="Chọn"
                                                                isSearchable={false}
                                                                value={getSelectedOptions(this.state.dealDetail.widthOfAlley, this.state.widthOfAlleyOptions ? this.state.widthOfAlleyOptions : [])}
                                                                options={this.state.widthOfAlleyOptions ? this.state.widthOfAlleyOptions : []}
                                                                onChange={this.onChange.bind(this, "widthOfAlley")}
                                                            />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <input className="form-control" type="number" min="0" placeholder="m"
                                                                onChange={(e) => {
                                                                    let _state = {...this.state};
                                                                    _state.dealDetail.alleyWidth = e.target.value;
                                                                    this.setState(_state);
                                                                }}
                                                                value={this.state.dealDetail.alleyWidth ? this.state.dealDetail.alleyWidth : ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row custom-input-range">
                        <BpoBox onChange={this.onBpoBoxChange}
                            show={this.state.bpoBox.show} unit={this.state.bpoBox.unit}
                            list={this.state.bpoBox.list} label={'Điểm BPO'} />
                    </div>

                    {this.state.dealDetail.listingTypeId == 2 && this.state.dealDetail.propertyTypeId == 1
                        && (<div className="form-group row">
                            <label className="control-label col-sm-2 pr0 pt5">Tiện ích xung quanh</label>
                            <div className="control-label col-sm-5">
                                <Select
                                    isSearchable={false}
                                    name="utilities"
                                    value={this.state.amenities && this.state.amenities.filter((item) => {
                                        if (!this.state.selectedUtilities) {
                                            return false;
                                        }
                                        return this.state.selectedUtilities.filter((adv) => {
                                            return adv.value == item.value;
                                        }).length > 0;
                                    })}
                                    onChange={this.onChange.bind(this, "utilities")}
                                    options={this.state.amenities}
                                    isMulti={true}
                                    placeholder="Chọn đặc điểm mong muốn" />
                            </div>
                        </div>)}
                </div>

                <div className="form-group row">
                    <div className="col-sm-2 col-sm-offset-10">
                        <a className="btnAddCriteria" href="#" onClick={this.onToggleShowFilterResult.bind(this)}>
                            {this.state.isShowFilterResult ? "Ẩn lọc kết quả" : "Lọc kết quả"}
                        </a>
                    </div>
                </div>

                <div className={classNamesFilterResult.join(" ")}>
                    {this.state.dealDetail.listingTypeId != 2 && this.state.dealDetail.propertyTypeId != 1
                        && (<div className="form-group row">
                            <label className="control-label col-sm-2 pr0 pt5">Đặc điểm nhà</label>
                            <div className="control-label col-sm-5">
                                <Select
                                    isSearchable={false}
                                    name="pros"
                                    value={this.state.pros && this.state.pros.filter((item) => {
                                        if (!this.state.selectedPros) {
                                            return false;
                                        }
                                        return this.state.selectedPros.filter((adv) => {
                                            return adv.value == item.value;
                                        }).length > 0;
                                    })}
                                    onChange={this.onChange.bind(this, "pros")}
                                    options={this.state.pros}
                                    isMulti={true}
                                    placeholder="Chọn đặc điểm mong muốn" />
                            </div>
                            <div className="control-label col-sm-5">
                                <Select
                                    isSearchable={false}
                                    name="cons"
                                    value={this.state.cons && this.state.cons.filter((item) => {
                                        if (!this.state.selectedCons) {
                                            return false;
                                        }
                                        return this.state.selectedCons.filter((adv) => {
                                            return adv.value == item.value;
                                        }).length > 0;
                                    })}
                                    onChange={this.onChange.bind(this, "cons")}
                                    options={this.state.cons}
                                    isMulti={true}
                                    placeholder="Chọn đặc điểm không mong muốn" />
                            </div>
                        </div>)}
                    <div className="form-group row">
                        <div className="col-md-12">
                            <div className="row">
                                <label className="control-label col-sm-2 pr0 font10 pt5">Tiện ích</label>
                                <div className="col-sm-6">
                                    {this.state.places.map((item) => {
                                        let classNames = [
                                            "control-label",
                                            "btn-choose-distant-radius",
                                            this.state.placeCode == item.value && "active"
                                        ];
                                        return <button style={{marginRight: "1px", fontSize: "12px"}} className={classNames.join(" ")} onClick={(event) => {this.onPlacesClick(item)}}> {item.name}</button>
                                    })}
                                </div>
                                <label className="control-label col-sm-2 pr0 pt5">Số tầng</label>
                                <Select
                                    isSearchable={false}
                                    className="col-sm-2"
                                    value={getSelectedOptions(this.state.dealDetail.numberFloor, this.state.floorOptions)}
                                    options={this.state.floorOptions}
                                    onChange={this.onChange.bind(this, "numberFloor")}
                                    placeholder="Số tầng" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="control-label col-sm-12 text-center" style={{"paddingBottom": "10px"}}>
                        <button className="btn btn-kyc btn-search" onClick={this.btnSearchClick}>TÌM KIẾM</button>
                    </div>
                </div>
            </div>
        )
    }

    onSelectAddress(data) {
        this.setState({
            "dealDetail": {
                ...this.state.dealDetail,
                ...data
            }
        }, () => {
            this.resetPositionList();
        }
        )
    }

    onListingChangeHanlde = (e, isSearch = true) => {
        let listId = $("#listingID").val().trim();
        if (listId !== "") {
            showPropzyLoading();
            fetchListingDetail({listingId: listId}, (response) => {
                if (!response) {
                    showPropzyAlert("Listing không tồn tại");
                    hidePropzyLoading();

                    this.state.dealDetail.address = null;
                    this.setState({...this.state});
                    return;
                }

                if (this.state.dealDetail.propertyTypeId != response.listingDetail.propertyTypeId) {
                    showPropzyAlert("Listing không phù hợp với nhu cầu");
                    hidePropzyLoading();
                    return;
                }
                let address = response.listingDetail.address;
                let dealDetail = this.state.dealDetail;
                $('.show-address-listingId').removeClass('hidden');

                dealDetail.address = address;
                dealDetail.latitude = response.listingDetail.latitude;
                dealDetail.longitude = response.listingDetail.longitude;
                let listingIdSearchData = response.listingDetail;

                this.state.dealDetail = dealDetail;
                this.state.listingId = listId;
                this.state.listingIdSearchData = listingIdSearchData;

                this.setState({...this.state}, () => {
                    hidePropzyLoading();
                    if (isSearch) {
                        this.doSearchListings();
                    }
                    this.setState({
                        isShowAdvanceSearch: false
                    });
                });
            });
            return;
        }
    }

    btnSearchClick = (e) => {
        if ($("#listingID").val().trim() !== '') {
            this.onListingChangeHanlde(e);
            return;
        }
        this.doSearchListings();
        this.setState({
            isShowAdvanceSearch: false
        });
    }

    getBebRoomsFromDealDetail() {
        let bedList = [];
        if (this.state.dealDetail.bedRooms) {
            this.state.dealDetail.bedRooms.forEach((item, index, arr) => {
                bedList.push({number: item.value, isPrefered: item.prefer});
            });
        }
        return bedList;
    }

    getBathRoomsFromDealDetail() {
        let bathList = [];
        if (this.state.dealDetail.bathRooms) {
            this.state.dealDetail.bathRooms.forEach((item, index, arr) => {
                bathList.push({number: item.value, isPrefered: item.prefer});
            });
        }
        return bathList;
    }

    getDistrictToSearchMap() {
        let districtList = [];
        for (let i = 0; i < this.state.positionsList.length; i++) {
            let position = this.state.positionsList[i];
            if (position.districtIds && position.districtIds.length > 0) {
                districtList.push(position.districtIds[0].value);
            }
        }
        return districtList;
    }

    getWardIds() {
        let wardList = [];
        for (let i = 0; i < this.state.positionsList.length; i++) {
            let position = this.state.positionsList[i];
            if (position.wardIds && position.wardIds.length > 0) {
                position.wardIds.forEach(item => {
                    const objFilter = {id: item.value, isPrefered: item.prefer}
                    wardList.push(objFilter);
                });
            }
        }
        return wardList.length === 0 ? null : wardList;
    }

    getDistrictIdsFromPositionList() {
        let districtList = [];
        for (let i = 0; i < this.state.positionsList.length; i++) {
            let position = this.state.positionsList[i];
            if (position.districtIds && position.districtIds.length > 0) {
                let objFilter = {id: position.districtIds[0].value, isPrefered: position.districtIds[0].prefer}
                districtList.push(objFilter);
            }
        }
        return districtList;
    }

    getStreetIdsFromPositionList() {
        let streetList = []
        for (let i = 0; i < this.state.positionsList.length; i++) {
            let position = this.state.positionsList[i];
            if (position.streetIds) {
                position.streetIds.forEach((item, index, arr) => {
                    streetList.push(item.value);
                })
            }
        }
        return streetList;
    }

    getDirectionIdsFromDirectionList() {
        let directionList = []
        let data = this.state.dealDetail.directionsList;
        if (data) {
            data.forEach((item, index, arr) => {
                directionList.push({id: item.value, isPrefered: item.prefer});
            })
        }
        return directionList;
    }

    doSearchListings = (isOldPosition, flag = "normal") => {
        if (this.getDistrictIdsFromPositionList().length == 0) {
            showPropzyAlert('Cần chọn ít nhất một quận');
            return;
        }

        let filter = null;
        if (flag == "normal") {
            filter = this.state.listingFilter;
            filter.filter.propertyList = [this.state.dealDetail.propertyTypeId].join(",");
            filter.filter.longitude = this.state.dealDetail.longitude;
            filter.filter.latitude = this.state.dealDetail.latitude;
            filter.filter.distance = this.state.dealDetail.mapRadius ? this.state.dealDetail.mapRadius / 1000 : null;
            filter.filter.listingId = $("#listingID").val() != "" ? parseInt($("#listingID").val()) : null;
            filter.filter.minPrice = this.state.dealDetail.initialBudget ?
                this.state.dealDetail.initialBudget : this.state.value.min;
            if (this.state.dealDetail.finalBudget == null) { // case by default final = null -> assign maxPrice = 2 tỷ
                filter.filter.maxPrice = this.state.value.max * 1000000000;
            } else {
                filter.filter.maxPrice = this.state.dealDetail.finalBudget ?
                    this.state.dealDetail.finalBudget : null;
            }
            filter.filter.bpoFilter = this.state.bpoBox.value;

            filter.filter.minSize = this.state.dealDetail.minSize != 0 ? this.state.dealDetail.minSize : null;
            filter.filter.maxSize = this.state.dealDetail.maxSize != 0 ? this.state.dealDetail.maxSize : null;
            filter.filter.minNumberFloor = this.state.dealDetail.numberFloor;
            filter.filter.bedRoomList = this.getBebRoomsFromDealDetail().length > 0 ? this.getBebRoomsFromDealDetail() : null;
            filter.filter.bathRoomList = this.getBathRoomsFromDealDetail().length > 0 ? this.getBathRoomsFromDealDetail() : null;
            filter.filter.advantageIds = this.state.selectedPros ?
                this.state.selectedPros.length > 0 ? this.state.selectedPros.map(item => {return item.value}).join(',') : null : null;
            filter.filter.disAdvantageIds = this.state.selectedCons ? this.state.selectedCons.length > 0 ?
                this.state.selectedCons.map(item => {return item.value}).join(',') : null : null;

            filter.filter.positionList = [];

            if ($('.formReset #hemCheckbox').prop('checked')) { // add hem
                let distance = this.state.dealDetail.distance ? this.state.dealDetail.distance : '';
                let roadFrontageDistanceFrom = null;
                let roadFrontageDistanceTo = null;
                if (distance == 0 && distance != '') {
                    roadFrontageDistanceFrom = 0;
                    roadFrontageDistanceTo = 100;
                } else if (distance == 100) {
                    roadFrontageDistanceFrom = 100;
                    roadFrontageDistanceTo = 200;
                } else if (distance == 200) {
                    roadFrontageDistanceFrom = 200;
                    roadFrontageDistanceTo = 500;
                } else if (distance == 500) {
                    roadFrontageDistanceFrom = 500;
                    roadFrontageDistanceTo = null;
                }
                filter.filter.positionList.push({
                    "positionId": 2,
                    "alleyId": this.state.dealDetail.widthOfAlley ? this.state.dealDetail.widthOfAlley : null,
                    "alleyWidth": this.state.dealDetail.alleyWidth ? this.state.dealDetail.alleyWidth : null,
                    "roadFrontageDistanceFrom": roadFrontageDistanceFrom,
                    "roadFrontageDistanceTo": roadFrontageDistanceTo,
                    "roadFrontageWidth": null,
                    "alleyType": this.state.dealDetail.typeOfAlley ? this.state.dealDetail.typeOfAlley : null
                })
            }
            if ($('.formReset #matTien').prop('checked')) { // add mat tien 
                filter.filter.positionList.push({
                    "positionId": 1,
                    "alleyId": null,
                    "alleyName": null,
                    "alleyWidth": null,
                    "roadFrontageDistanceFrom": null,
                    "roadFrontageDistanceTo": null,
                    "roadFrontageWidth": this.state.dealDetail.roadFrontageWidth ? this.state.dealDetail.roadFrontageWidth : null,
                    "alleyType": null
                })
            }

            if (!isOldPosition) {
                filter.filter.wardList = this.getWardIds();
                filter.filter.districtList = this.getDistrictIdsFromPositionList().length > 0 ? this.getDistrictIdsFromPositionList() : null;
                filter.filter.streetList = null;
                if ($("#listingID").val().trim() == "") {
                    filter.filter.streetList = this.getStreetIdsFromPositionList().length > 0 ? this.getStreetIdsFromPositionList().join(",") : null;
                }
                filter.filter.directionList = this.getDirectionIdsFromDirectionList().length > 0 ? this.getDirectionIdsFromDirectionList() : null;

                filter.filter.viewByWardId = null
                filter.filter.viewByDistrictId = null
                filter.filter.viewByCityId = 1

                if (filter.filter.districtList && filter.filter.districtList.length == 1) {
                    // check have only one district 
                    filter.filter.viewByDistrictId = this.getDistrictToSearchMap().length > 0 ? parseInt(this.getDistrictToSearchMap().join(',')) : null

                    if (filter.filter.wardList && filter.filter.wardList.length == 1) {
                        filter.filter.viewByWardId = this.getWardIds().length > 0 ? parseInt(this.getWardIds().join(",")) : null;
                    }
                }
            }
            this.props.dispatch({
                type: "MAP_SET_DATA_POST_SEARCH_LISTING",
                dataPost: filter,
                step: filter.filter.viewByWardId === null || filter.filter.viewByWardId == "" ? "stepOne" : "stepTwo"
            });
        } else {
            filter = this.props.mapReducer.dataPostSeachListing.stepOne;
            if (filter) {
                if (filter.filter.districtList && filter.filter.districtList.length == 1) {
                    filter.filter.viewByDistrictId = this.getDistrictToSearchMap().length > 0 ?
                        parseInt(this.getDistrictToSearchMap().join(",")) : null;
                    filter.filter.viewByWardId = null;
                } else {
                    filter.filter.viewByDistrictId = null;
                    filter.filter.viewByWardId = null;
                }
            }
        }

        if (filter) {
            showPropzyLoading();
            fetchSearchListingsMatchingRanking(filter, (response) => {
                if (response.code == 200) {
                    this.setState({
                        ...this.state,
                        "listings": response.data.list.length > 0 ? response.data.list : [],
                        "totalListings": response.data.totalItems,
                        "groups": response.data.groups ? response.data.groups : [],
                        "kmlLink": null,
                        "matchCode": response.data.setting ? response.data.setting.basic.tabConfiguration.activeMatchingTab : null,
                        "numOfMatchedListing": {
                            ...this.state.numOfMatchedListing,
                            "lessMatchedTab": response.data.lessMatchedTab ? response.data.lessMatchedTab : 0,
                            "matchedTab": response.data.matchedTab ? response.data.matchedTab : 0,
                            "mostMatchedTab": response.data.mostMatchedTab ? response.data.mostMatchedTab : 0,
                        },
                        "maxZoom": response.data.isNeedChangeZoom ? 17 : undefined
                    }, () => {
                        // fetchKMLLink
                        // if (this.state.kmlPost.districts.length > 0 && this.state.kmlPost.districts[0].districtId != null) {
                        //     fetchKMLLink(this.state.kmlPost, (respKML) => {
                        //         if (respKML.result && respKML.data.link) {
                        //             this.setState({
                        //                 "kmlLink": respKML.data.link
                        //             }, () => {
                        //                 hidePropzyLoading();
                        //                 return;
                        //             });
                        //             return;
                        //         }
                        //         hidePropzyLoading();
                        //     });
                        //     return;
                        // }
                        hidePropzyLoading();
                    });
                    return;
                }
                showPropzyAlert(response.message);
                hidePropzyLoading();
            });
        }
    }

    onFilterGroupChange(data) {
        let filter = this.state.listingFilter;
        filter.filter.cityIds = '1';
        filter.filter.viewByDistrictId = data.districtIds.length > 0 ? parseInt(data.districtIds.join(",")) : null;
        filter.filter.viewByWardId = data.wardIds.length > 0 ? parseInt(data.wardIds.join(",")) : null;
        this.setState({
            "listingFilter": {
                ...filter
            }
        },
            () => {
                this.doSearchListings(true);
            });
    }

    saveConfirm(event) {
        this.savePage(false, false, function () {
        });
    }

    savePage(isDraff = false, isClickHeader, callback) {
        const postData = Object.assign({}, this.state.dealDetail);
        postData.isDraff = isDraff;
        postData.cityList = [
            {
                "id": {
                    "cityId": 1
                },
                "isPrefered": true
            }
        ];
        var districtList = [];
        var wardList = [];
        var streetList = [];
        for (let i = 0; i < this.state.positionsList.length; i++) {
            let position = this.state.positionsList[i];
            if (position.districtIds && position.districtIds.length > 0) {
                let district = {
                    "id": {"districtId": position.districtIds[0].value},
                    "isPrefered": position.districtIds[0].prefer
                }
                districtList.push(district);
            }
            if (position.wardIds) {
                position.wardIds.forEach((item, index, arr) => {
                    let ward = {
                        "id": {"wardId": item.value},
                        "isPrefered": item.prefer
                    }
                    wardList.push(ward);
                });
            }
            if (position.streetIds) {
                position.streetIds.forEach((item, index, arr) => {
                    let street = {
                        "id": {
                            "streetId": item.value
                        }
                    }
                    streetList.push(street);
                })
            }
        }
        let directionsList = this.state.dealDetail.directionsList;
        postData.directionsList = [];
        for (var i = 0; i < directionsList.length; i++) {
            let direction = directionsList[i];
            postData.directionsList.push({
                "id": {
                    "directionId": direction.value
                },
                "isPrefered": direction.prefer
            })
        }

        // add hẻm 
        let positionList = [];

        let distance = this.state.dealDetail.distance ? this.state.dealDetail.distance : '';
        let roadFrontageDistanceFrom = null;
        let roadFrontageDistanceTo = null;
        if (distance == 0 && distance != '') {
            roadFrontageDistanceFrom = 0;
            roadFrontageDistanceTo = 100;
        } else if (distance == 100) {
            roadFrontageDistanceFrom = 100;
            roadFrontageDistanceTo = 200;
        } else if (distance == 200) {
            roadFrontageDistanceFrom = 200;
            roadFrontageDistanceTo = 500;
        } else if (distance == 500) {
            roadFrontageDistanceFrom = 500;
            roadFrontageDistanceTo = null;
        }

        if ($('.formReset #hemCheckbox').prop('checked')) { // add hem
            positionList.push({
                "id": {
                    "positionId": 2
                },
                "alleyId": this.state.dealDetail.widthOfAlley ? this.state.dealDetail.widthOfAlley : null,
                "alleyWidth": this.state.dealDetail.alleyWidth ? this.state.dealDetail.alleyWidth : null,
                "roadFrontageDistanceFrom": roadFrontageDistanceFrom,
                "roadFrontageDistanceTo": roadFrontageDistanceTo,
                "alleyType": this.state.dealDetail.typeOfAlley ? this.state.dealDetail.typeOfAlley : null
            })
        }
        if ($('.formReset #matTien').prop('checked')) { // add mat tien 
            positionList.push({
                "id": {
                    "positionId": 1
                },
                "roadFrontageWidth": this.state.dealDetail.roadFrontageWidth ? this.state.dealDetail.roadFrontageWidth : null,
            })
        }
        postData.positionList = positionList.length > 0 ? positionList : [];
        postData.bedRooms = postData.bedRooms.length > 0 ? postData.bedRooms[0].value : null;
        postData.bathRooms = postData.bathRooms.length > 0 ? postData.bathRooms[0].value : null;
        postData.districtsList = districtList;
        postData.wardsList = wardList;
        postData.streetList = streetList;
        postData.advantageList = [];
        let prosList = this.state.selectedPros;
        if (prosList) {
            for (var i = 0; i < prosList.length; i++) {
                let pros = prosList[i];
                postData.advantageList.push({
                    "id": {
                        "advantageId": pros.value
                    }
                })
            }
        }
        postData.disAdvantageList = [];
        let consList = this.state.selectedCons;
        if (consList) {
            for (var i = 0; i < consList.length; i++) {
                let pros = consList[i];
                postData.disAdvantageList.push({
                    "id": {
                        "advantageId": pros.value
                    }
                })
            }
        }
        postData.utilityAroundList = [];
        let utilities = this.state.selectedUtilities;
        if (consList) {
            for (var i = 0; i < utilities.length; i++) {
                let util = utilities[i];
                postData.utilityAroundList.push({
                    "id": {
                        "utilityId": util.value
                    }
                })
            }
        }
        delete postData['meeting'];
        delete postData['districtList'];
        delete postData['rlistingsList'];
        delete postData['listingType'];
        delete postData['propertyType'];
        delete postData['progressList'];
        delete postData['agentInfo'];
        if (!isDraff) {
            showPropzyLoading();
        }
        postSaveDeal(postData, (response) => {
            if (!isDraff) {
                if (response.result) {
                    if (!isClickHeader) {
                        window.location = "/kyc/product-advice?dealId=" + this.state.dealDetail.dealId;
                    }
                    callback();
                } else {
                    showPropzyAlert(response.message);
                    hidePropzyLoading();
                }
            }
        });
    }

    handleNeedBuy() {
        let dealId = this.state.dealDetail.dealId;
        let linkCreateListing = dealId != null ? '/kyc/create-listing?type=2&dealId=' + dealId : '/kyc/create-listing';
        window.open(linkCreateListing);
    }

    handleChangeTab(isClickHeader, callbackFromHeader) {
        this.savePage(false, isClickHeader, () => {
            hidePropzyLoading();
            callbackFromHeader(isClickHeader)
        });
    }

    getListingDetail() {
        if ($("#listingID").val() != "") {
            showPropzyLoading();
            fetchListingDetail({listingId: $("#listingID").val()}, (response) => {
                if (!response) {
                    showPropzyAlert("Listing không tồn tại");
                    hidePropzyLoading();
                }
                else {
                    let address = response.listingDetail.address;
                    let dealDetail = this.state.dealDetail;
                    dealDetail.address = address;
                    dealDetail.latitude = response.listingDetail.latitude;
                    dealDetail.longitude = response.listingDetail.longitude;
                    this.setState({
                        "dealDetail": dealDetail,
                        "listingId": $("#listingID").val()
                    }, () => {
                        hidePropzyLoading();
                    })
                    localStorage.setItem("listingId", $("#listingID").val());
                }
            })
        }
    }

    getCurentAddress(e) {
        let dealDetail = {...this.state.dealDetail};
        dealDetail.customers = {...dealDetail.customers, houseNumber: e.target.value};
        this.setState({
            "dealDetail": dealDetail,
            "customerAddress": e.target.value
        })
    }

    onPlacesClick = (data) => {
        let _state = {...this.state};
        _state.placeCode = data.value;
        this.setState(_state);
    }

    onMatchClick = (data) => {
        let filter = this.state.listingFilter;
        this.setState({
            "listingFilter": {
                ...filter,
                filter: {
                    ...filter.filter,
                    activeMatchingTab: data.value
                }
            }
        }, () => {
            this.doSearchListings();
        })
    }

    render() {
        return (
            <Fragment>
                <div className="wrapper-kyc">
                    <HeaderStep current={2} handleChangeTab={this.handleChangeTab} />
                    <div className="content-kyc">
                        <div className="box-kyc">
                            {this.state.dealDetail && <BuyerConfirmRequirementsHeader dealDetail={this.state.dealDetail} />}
                        </div>
                        <div className="box-kyc">
                            <h3 className="title18 bold">1. Thông tin chung</h3>
                            {this.renderPurpose()}
                            <div className="form-group row">
                                <label className="col-sm-2 font15">Kế hoạch {this.state.listingTypeId == 1 ? "mua" : "thuê"} nhà</label>
                                <div className="col-sm-10">
                                    <div className="col-sm-4">
                                        <div className="need-radio">
                                            <input
                                                id="not-urgent"
                                                type="radio"
                                                className="need-radio-input"
                                                name="isUrgent"
                                                onChange={this.onInputChange.bind(this)}
                                                value={true}
                                                checked={(this.state.dealDetail.dealPlanInfo && this.state.dealDetail.dealPlanInfo.isUrgent) ? true : false}
                                                placeholder="--- Vui lòng chọn ---"
                                            />
                                            <label htmlFor="not-urgent" className="need-radio-label">Gấp</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="need-radio">
                                            <input id="urgent" type="radio" className="need-radio-input" name="isUrgent" onChange={this.onInputChange.bind(this)}
                                                value={false}
                                                checked={(!this.state.dealDetail.dealPlanInfo || !this.state.dealDetail.dealPlanInfo.isUrgent)}
                                            />
                                            <label htmlFor="urgent" className="need-radio-label"> Không gấp</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <Select name="needTimeType"
                                            isSearchable={false}
                                            value={this.state.dealDetail.dealPlanInfo && getSelectedOptions(this.state.dealDetail.dealPlanInfo.needTimeType, this.state.monthToBuyOptions)}
                                            options={this.state.monthToBuyOptions}
                                            onChange={this.onChange.bind(this, "needTimeType")}
                                            placeholder="Mua nhà trong bao lâu" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 font15 pt5">Ngân sách cho việc mua nhà</label>
                                <div className="col-sm-5">
                                    <Select name="priceType"
                                        isSearchable={false}
                                        value={this.state.dealDetail.dealPlanInfo && getSelectedOptions(this.state.dealDetail.dealPlanInfo.priceType, this.state.budgetOptions)}
                                        options={this.state.budgetOptions}
                                        onChange={this.onChange.bind(this, "priceType")}
                                        placeholder="--- Vui lòng chọn ---" />
                                </div>
                                <div className="col-sm-4">
                                    <a style={{position: "relative", top: "6px", fontSize: "15px"}} href="javascript:void(0);" onClick={this.handleNeedBuy.bind(this)}>Có nhu cầu bán / cho thuê nhà hiện tại</a>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 font15 pt5">Địa chỉ nhà hiện tại</label>
                                <div className="col-sm-9">
                                    {this.renderPositionGroup2()}
                                </div>
                                <div className="col-sm-3">

                                </div>
                                <div className="col-sm-9">
                                    <input type="text" maxLength="125" onChange={this.getCurentAddress.bind(this)} value={this.state.customerAddress} className="form-control" placeholder="Địa chỉ nhà" />
                                </div>
                            </div>


                            <h3 className="title18 bold">2. Lựa chọn nhà</h3>

                            {this.renderAdvanceSearch()}
                            <hr />
                            <div className="form-group row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-sm-10">
                                            {this.state.matches.map((item, index) => {
                                                let classNames = [
                                                    "control-label",
                                                    "btn-choose-distant-radius",
                                                    this.state.matchCode == item.value && "active"
                                                ];
                                                return <button style={{marginRight: "1px", fontSize: "12px"}}
                                                    onClick={(event) => {this.onMatchClick(item)}}
                                                    className={classNames.join(" ")} >
                                                    {item.name} ({this.state.numOfMatchedListing[item.value]})
                                                </button>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                (this.state.listings.length != 0 || this.state.groups.length != 0) ?
                                    <div className="listing-map-wrapper">
                                        <div>Số lượng tin đăng {this.state.totalListings}</div>
                                        <ListingMap placeCode={this.state.placeCode}
                                            kmlLink={this.state.kmlLink}
                                            mapRadius={this.state.mapRadius}
                                            address={{lat: this.state.dealDetail.latitude, lng: this.state.dealDetail.longitude}}
                                            propertyTypeId={this.state.dealDetail.propertyTypeId}
                                            listingTypeId={this.state.listingTypeId}
                                            dealId={this.state.dealDetail.dealId}
                                            groups={this.state.groups}
                                            listings={this.state.listings}
                                            filter={this.state.listingFilter.filter}
                                            doSearchListings={this.doSearchListings}
                                            onFilterChange={this.onFilterGroupChange.bind(this)} 
                                            maxZoom={this.state.maxZoom}
                                        />
                                    </div>
                                    : ""
                            }
                            <footer className="kyc-footer">
                                <center>
                                    <button type="button" className="btn btn-kyc" onClick={this.saveConfirm.bind(this)}>Lưu & Tư Vấn Sản Phẩm</button>
                                </center>
                            </footer>
                        </div>
                    </div>
                </div>
                <ModalFamily
                    isShow={this.state.isShowModalFamily}
                    onHide={() => {this.setState({isShowModalFamily: false})}}
                    purposeRender={this.renderChildPurposes.bind(this)}
                    data={this.state.modalFamilyData}
                    parentId={this.state.modalFamilyParent}
                    onSave={this.saveModalFamily.bind(this)}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    mapReducer: state.MapReducer
});

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    };
};

const BuyerConfirmRequirements = connect(mapStateToProps, mapDispatchToProps)(BuyerConfirmRequirementSection);
export default BuyerConfirmRequirements;
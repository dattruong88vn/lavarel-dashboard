
class ValidatorForSa {
    constructor() {
        this._TYPE_VALIDATE = {
            live : 'LIVE', // ĐĂNG TIN
            valuation : 'VALUATION', // THẨM ĐỊNH
            marketReport : 'MARKET_REPORT' // BÁO CÁO
        };
        this._TYPE_ACTIVE = this._TYPE_VALIDATE.live;
        this._VALIDATE_FEILDS = new Map();
        this._NEED_LIST_VALIDATE = new Set();
        this._NEED_LIST_VALIDATE_OLD = new Set();
        this._NEED_LIST_VALIDATE_VALIDATION = new Set();
        this._NEED_LIST_VALIDATE_VALIDATION_OLD = new Set();
        this._NEED_LIST_VALIDATE_MARKET = new Set();
        this._NEED_LIST_VALIDATE_MARKET_OLD = new Set();

        this._DEFAULT_MESSAGE = {
            notEmpty : {
                message : 'Vui lòng nhập giá trị'
            },
            notFalse : {
                message : 'Vui lòng chọn giá trị'
            }
        };
        
        this.initFieldValidator();
    }

    /*setValidateFeild
    * key
    * feild is object
    * feild.id : id of feild (label for={id})
    * value : function () => return value
    * hideMessage : true / false
    * message
    * */
    setValidateFeild(listValidate, listValidateOld, feild = {}) {
        listValidate.forEach((item) => {
            $('.form-group').find('label[for="' + item.id +'"]').addClass('required');
        });

        // clear validation of old fields
        const intersection = new Set([...listValidateOld].filter(x => !listValidate.has(x)))
        intersection.forEach(it => {
            this.clearValidateOneFeild(it.id);
        });
    }
    showValidation(listValidate, listValidateOld) {
        const formFields = Window.sa.formFields._list
        formFields.map((item, k) => {
            // if field not set to validate, add it
            if (!this._VALIDATE_FEILDS.get(item.key)) {
                this._VALIDATE_FEILDS.set(item.key, {
                    id : item.id,
                    value : () => Window.sa.data[item.name](),
                    hideMessage : true,
                });
            }

            // check validate
            if (item.required) {
                listValidate.add(this._VALIDATE_FEILDS.get(item.key))
            } else {
                if (listValidate.has(this._VALIDATE_FEILDS.get(item.key))) {
                    listValidate.delete(this._VALIDATE_FEILDS.get(item.key))
                }
            }
        })

        // enable propertyTypeId if update
        if (Window.jsDetailData.propertyTypeId) {
            $('#propertyTypeId-wrapper #propertyTypeId').prop('disabled', false)
        }

        // apply validation for form fields
        this.setValidateFeild(listValidate, listValidateOld)
    }

    initFieldValidator() {
        this._VALIDATE_FEILDS.set('SOURCE', {
            id : 'sourceId',
            value :  () => Window.sa.data.sourceId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('CRAWLER_STATUS', {
            id : 'crawlerStatus',
            value :  () => Window.sa.data.crawlerStatus(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('AGENT_ID', {
            id : 'agentId',
            value : () => Window.sa.data.agentId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('OWNER_NAME', {
            id : 'name',
            value : () => Window.sa.data.name(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('OWNER_PHONE', {
            id : 'phone',
            value : () => Window.sa.data.phone(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('LISTING_TYPE', {
            id : 'listingTypeId',
            value : () => Window.sa.data.listingTypeId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('PROPERTY_TYPE', {
            id : 'propertyTypeId',
            value : () => Window.sa.data.propertyTypeId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('REAL_ESTATE_GROUP', {
            id : 'realEstateGroupId',
            value : () => Window.sa.data.realEstateGroupId(),
            hideMessage : true,
        });

        // address
        this._VALIDATE_FEILDS.set('CITY', {
            id : 'cityId',
            value : () => Window.sa.data.cityId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('DISTRICT', {
            id : 'districtId',
            value : () => Window.sa.data.districtId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('WARD', {
            id : 'wardId',
            value : () => Window.sa.data.wardId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('STREET', {
            id : 'streetId',
            value : () => Window.sa.data.streetId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('HOUSE_NUMBER', {
            id : 'houseNumber',
            value : () => Window.sa.data.houseNumber(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('ADDRESS', {
            id : 'address',
            value : () => Window.sa.data.address(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('LATITUDE', {
            id : 'latitude',
            value : () => Window.sa.data.latitude(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('LONGITUDE', {
            id : 'longitude',
            value : () => Window.sa.data.longitude(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('PRICE', {
            id : 'price',
            value : () => {
                if (Window.sa.data.price() === 0) {
                    return ''
                }

                return Window.sa.data.price()
            },
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('STATUS_QUO', {
            id : 'statusQuoId',
            value : () => Window.sa.data.statusQuoId(),
            hideMessage : true,
        });
        // afterSigningContract
        this._VALIDATE_FEILDS.set('MOVE_IN_DATE_CHECK', {
            id : 'afterSigningContract',
            value : () => Window.sa.data.afterSigningContract(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('MOVE_IN_DATE_TIME', {
            id : 'moveInDate',
            value : () => Window.sa.data.moveInDate(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('PHOTOS', {
            id : 'photos',
            value : () => {
                Window.sa.photo.getPhotoList();
                return  JSON.parse(Window.jsDetailData.photo);
            },
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('PHOTOS_GCN', {
            id : 'photoGcns',
            value : () => {
                Window.sa.photo.getPhotoList();
                return JSON.parse(Window.jsDetailData.photoGcn);
            },
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('LEGAL_STATUS_LIST', {
            id : 'legalStatusList-multi-column-check-list',
            value : () => Window.sa.data.legalStatusList(),
            hideMessage : true,
        });
        //buildingId
        this._VALIDATE_FEILDS.set('BUILDING', {
            id : 'buildingId',
            value : () => Window.sa.data.buildingId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('MODEL_CODE', {
            id : 'modelCode',
            value : () => Window.sa.data.modelCode(),
            hideMessage : true,
        });

        // position
        this._VALIDATE_FEILDS.set('POSITION', {
            id : 'position',
            value : () =>  Window.sa.data.position(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('POSITION_ROAD_FRONTAGE_WIDTH', {
            id : 'roadFrontageWidth',
            value : () =>  Window.sa.data.roadFrontageWidth(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('POSITION_HAVE_BE_SITE', {
            id : 'haveBeSide',
            value : () =>  Window.sa.data.haveBeSide(),
            rules : {
                notFalse : {
                    message : 'Vui lòng nhập giá trị',
                }
            },
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('POSITION_WIDTH_VALUE', {
            id : 'widthValue',
            value : () =>  Window.sa.data.widthValue(),
            hideMessage : true,
        });
        // todo position

        this._VALIDATE_FEILDS.set('POSITION_ROAD_FRONTAGE_DISTANCE', {
            id : 'roadFrontageDistance',
            value : () =>  Window.sa.data.roadFrontageDistance(),
            hideMessage : true,
            rules : {
                notNull : {
                    message : 'Vui lòng nhập giá trị',
                }
            }
        });

        this._VALIDATE_FEILDS.set('POSITION_ALLEY_ID', {
            id : 'alleyId',
            value : () =>  Window.sa.data.alleyId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('POSITION_ALLEY_TYPE', {
            id : 'alleyType',
            value : () =>  Window.sa.data.alleyType(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('POSITION_FRONT_WAY', {
            id : 'widthFrontWay-alley',
            value : () =>  Window.sa.data.widthFrontWay(),
            hideMessage : true,
        });


        this._VALIDATE_FEILDS.set('POSITION_HAVE_BE_SITE_ALLEY', {
            id : 'haveBeSide-alley',
            value : () =>  Window.sa.data.haveBeSide(),
            rules : {
                notFalse : {
                    message : 'Vui lòng nhập giá trị',
                }
            },
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('POSITION_WIDTH_VALUE_ALLEY', {
            id : 'widthValue-alley',
            value : () =>  Window.sa.data.widthValue(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('POSITION_ALLEY_WIDTH', {
            id : 'alleyWidth',
            value : () =>  Window.sa.data.alleyWidth(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('POSITION_ROAD_PRICE', {
            id : 'roadPrice',
            value : () =>  Window.sa.data.roadPrice(),
            hideMessage : true,
        });


        //lotSize
        this._VALIDATE_FEILDS.set('LOT_SIZE', {
            id : 'lotSize',
            value : () =>  Window.sa.data.lotSize(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('FLOOR_SIZE', {
            id : 'floorSize',
            value : () =>  Window.sa.data.floorSize(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('SIZE_LENGTH', {
            id : 'sizeLength',
            value : () =>  Window.sa.data.sizeLength(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('SIZE_WIDTH', {
            id : 'sizeWidth',
            value : () =>  Window.sa.data.sizeWidth(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('NUMBER_FLOOR', {
            id : 'numberFloor_building',
            value : () =>  Window.sa.data.numberFloor(),
            hideMessage : true,
            rules : {
                notNull : {
                    message : 'Vui lòng nhập giá trị',
                }
            }
        });
        this._VALIDATE_FEILDS.set('NUMBER_FLOOR_NOT_BUILDING', {
            id : 'numberFloor_not_building',
            value : () =>  Window.sa.data.numberFloor(),
            hideMessage : true,
            rules : {
                notNull : {
                    message : 'Vui lòng nhập giá trị',
                }
            }
        });
        this._VALIDATE_FEILDS.set('FLOOR', {
            id : 'buildingFloors',
            value : () =>  Window.sa.data.buildingFloors(),
            hideMessage : true,
            rules : {
                notNull : {
                    message : 'Vui lòng nhập giá trị',
                }
            }
        });


        this._VALIDATE_FEILDS.set('BED_ROOMS', {
            id : 'bedRooms',
            value : () =>  Window.sa.data.bedRooms(),
            hideMessage : true,
            rules : {
                notNull : {
                    message : 'Vui lòng nhập giá trị',
                }
            }
        });
        this._VALIDATE_FEILDS.set('BATH_ROOMS', {
            id : 'bathRooms',
            value : () =>  Window.sa.data.bathRooms(),
            hideMessage : true,
            rules : {
                notNull : {
                    message : 'Vui lòng nhập giá trị',
                }
            }
        });
        this._VALIDATE_FEILDS.set('TITLE', {
            id : 'title',
            value : () =>  Window.sa.data.title(),
            hideMessage : true,
            rules : {
                notNull : {
                    message : 'Vui lòng nhập giá trị',
                }
            }
        });
        this._VALIDATE_FEILDS.set('HOUSE_TYPE', {
            id : 'houseTypeId',
            value : () =>  Window.sa.data.houseTypeId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('CONSTRUCTION_TYPE', {
            id : 'constructionTypeId',
            value : () =>  Window.sa.data.constructionTypeId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('DEPRECIATION', {
            id : 'depreciation',
            value : () =>  Window.sa.data.depreciation(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('HAVE_PLANNING', {
            id : 'havePlanning',
            value : () =>  Window.sa.data.havePlanning(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('PLANING_TYPE', {
            id : 'planing-type',
            value : () =>  Window.sa.data.planingType(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('PLANING_AREA', {
            id : 'planing-area',
            value : () =>  Window.sa.data.planingArea(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('PLANING_PHOTOS', {
            id : 'planing-photos',
            value : () =>  {
                Window.sa.photo.getPhotoList();
                return JSON.parse(Window.jsDetailData.plan.photo);
            },
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('USER_RIGHT_TYPE', {
            id : 'useRightTypeId',
            value : () =>  Window.sa.data.useRightTypeId(),
            hideMessage : true,
        });

        this._VALIDATE_FEILDS.set('RENT_MIN_TIME', {
            id : 'minContractDeadline',
            value : () =>  Window.sa.data.minContractDeadline(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('RENT_DEPOSIT', {
            id : 'deposit',
            value : () =>  Window.sa.data.deposit(),
            hideMessage : true,
        });

        // commission
        this._VALIDATE_FEILDS.set('COMMISSION_SELECT', {
            id : 'commissionSelect',
            value : () =>  Window.sa.data.commissionSelect(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('SALE_COMMISSION', {
            id : 'commissionInput',
            value : () =>  {
                const commissionSelect = Number.parseInt($('#commissionSelect').val());
                if(commissionSelect == 2) {
                    // tiền triệu
                    return  Window.sa.data.commissionPrice();
                }
                if(commissionSelect == 1) {
                    // %
                    return  Window.sa.data.commissionTo();
                }
                return null;
            },
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('RENT_COMMISSION_TIME', {
            id : 'commissionTime',
            value : () =>  {
                const commissionList = Window.sa.data.commissionList();
                if (commissionList.length > 0) {
                    return commissionList[0].contractTime;
                }
                return null;
            },
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('RENT_COMMISSION', {
            id : 'commissionInput',
            value : () =>  {
                let commissionList = null
                if (typeof Window.sa.data.commissionList === 'function') {
                    commissionList = Window.sa.data.commissionList()
                } else {
                    commissionList = Window.sa.data.commissionList
                }

                if (commissionList && commissionList.length > 0) {
                    return commissionList[0].commision;
                }
                return Window.jsDetailData.commissionFrom;
            },
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('DIRECTION', {
            id : 'directionId',
            value : () =>  Window.sa.data.directionId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('CAMPAIGN', {
            id : 'campaignId',
            value : () =>  Window.sa.data.campaignId(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('CAMPAIGN_CHECKED', {
            id : 'campaignChecked',
            value : () =>  Window.sa.data.campaignChecked(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('LAND_CODE', {
            id : 'landCode',
            value : () =>  Window.sa.data.landCode(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('MAP_CODE', {
            id : 'mapCode',
            value : () =>  Window.sa.data.mapCode(),
            hideMessage : true,
        });
        this._VALIDATE_FEILDS.set('PROJECT', {
            id : 'projectId',
            value : () =>  Window.sa.data.projectId(),
            hideMessage : true,
        });

        this._VALIDATE_FEILDS.set('HOUSE_SHAPE', {
            id : 'houseShape',
            value : () =>  Window.sa.data.houseShape(),
            hideMessage : true,
        });

    }

    showValidationForLive() {
        const that = this;
       // that.clearAllValidate();
        that._TYPE_ACTIVE = that._TYPE_VALIDATE.live;
        that._NEED_LIST_VALIDATE_OLD = new Set(that._NEED_LIST_VALIDATE);
        that._NEED_LIST_VALIDATE.clear();
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('SOURCE'));
        const crawlerStatus = that._VALIDATE_FEILDS.get('CRAWLER_STATUS');
        that._NEED_LIST_VALIDATE.add(crawlerStatus);
        if (crawlerStatus.value() == 3) {
            // môi giới
            that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('AGENT_ID'));
        } else {
            // chủ nhà, chủ đầu từ
            that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('OWNER_NAME'));
            that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('OWNER_PHONE'));
        }
        //  listng type
        const listingType = that._VALIDATE_FEILDS.get('LISTING_TYPE');
        const propertyType = that._VALIDATE_FEILDS.get('PROPERTY_TYPE');
        const realEstateGroupId = that._VALIDATE_FEILDS.get('REAL_ESTATE_GROUP');

        that._NEED_LIST_VALIDATE.add(listingType);
        that._NEED_LIST_VALIDATE.add(propertyType);
        that._NEED_LIST_VALIDATE.add(realEstateGroupId);
        // TITLE
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('TITLE'));
        // ADDRESS
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('CITY'));
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('DISTRICT'));
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('WARD'));
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('STREET'));
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('ADDRESS'));
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('LATITUDE'));
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('LONGITUDE'));
        // PHOTOS
        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('PHOTOS'));
        if(listingType.value() == 1) {
            // hoa hồng
            that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('SALE_COMMISSION'));
        } else {
            that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('RENT_MIN_TIME'));
            const commissionSelect = Number.parseInt($('#commissionSelect').val());
            if (commissionSelect == 1) {
                that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('RENT_COMMISSION_TIME'));
                that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('RENT_COMMISSION'));
            } else {
                that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('RENT_COMMISSION'));
            }
            // hoa hồng
        }
        
        // todo show feild live
        let position = null, 
        houseType = null
        if(listingType.value() == 1) {
            // bán
            switch (propertyType.value()) {
                case 11: {
                    //Nhà riêng
                    houseType = that._VALIDATE_FEILDS.get('HOUSE_TYPE');
                    break;
                }
            }
        }
        // check;
        if (position != null) {
            that._NEED_LIST_VALIDATE.add(position);
            switch (position.value()) {
                case 1 : {
                    // mặt tiền
                    that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('POSITION_ROAD_FRONTAGE_WIDTH'));
                    //const haveBeSite = that._VALIDATE_FEILDS.get('POSITION_HAVE_BE_SITE');

                    //that._NEED_LIST_VALIDATE.add(haveBeSite);
                    /*if(haveBeSite.value()) {
                        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('POSITION_WIDTH_VALUE'));
                    }*/
                    break;
                }
                case 2 : {
                    // hẻm
                    that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('POSITION_ROAD_FRONTAGE_DISTANCE'));
                    that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('POSITION_ALLEY_WIDTH'));
                    that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('POSITION_ALLEY_ID'));
                    that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('POSITION_ALLEY_TYPE'));
                    that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('POSITION_FRONT_WAY'));
                    //const haveBeSite = that._VALIDATE_FEILDS.get('POSITION_HAVE_BE_SITE_ALLEY');

                   // that._NEED_LIST_VALIDATE.add(haveBeSite);
                    /*if(haveBeSite.value()) {
                        that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('POSITION_WIDTH_VALUE_ALLEY'));
                    }*/
                    break;
                }
            }
        }
        if(houseType !=null) {
            //that._NEED_LIST_VALIDATE.add(houseType);
            if([10, 11, 12].indexOf(houseType.value()) > -1) {
                //Nhà phố liền kề // Nhà phố liền kề <=4 tầng // Nhà phố liền kề >=5 tầng
                that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('CONSTRUCTION_TYPE'));
                that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('DEPRECIATION'));
            }
        }
        const campaignCheck = that._VALIDATE_FEILDS.get('CAMPAIGN_CHECKED');
        if (!campaignCheck.value()) {
            that._NEED_LIST_VALIDATE.add(that._VALIDATE_FEILDS.get('CAMPAIGN'));
        }

        // todo affter show
        //show *
        that.showValidation(that._NEED_LIST_VALIDATE, that._NEED_LIST_VALIDATE_OLD)
    }
    showValidationForValuation() {
        const that = this;
        that._TYPE_ACTIVE = that._TYPE_VALIDATE.valuation;
        that._NEED_LIST_VALIDATE_VALIDATION_OLD = new Set(that._NEED_LIST_VALIDATE_VALIDATION);
        that._NEED_LIST_VALIDATE_VALIDATION.clear();

        that.showValidation(that._NEED_LIST_VALIDATE_VALIDATION, that._NEED_LIST_VALIDATE_VALIDATION_OLD)
    }
    showValidationForMarketReport() {
        const that = this;
        that._TYPE_ACTIVE = that._TYPE_VALIDATE.marketReport;
    }
    showValidator(_type) {
        const that = this;
        if(_type !== that._TYPE_ACTIVE) {
            that.clearAllValidate();
        }
        switch (_type) {
            case that._TYPE_VALIDATE.live : {
                that.showValidationForLive();
                break;
            }
            case that._TYPE_VALIDATE.valuation : {
                that.showValidationForValuation();
                break;
            }
            case that._TYPE_VALIDATE.marketReport : {
                that.showValidationForMarketReport();
                break;
            }
        }
    }
    getTypeActive() {
        return this._TYPE_ACTIVE;
    }
    getTypeValudation() {
        return this._TYPE_VALIDATE;
    }
    clearValidateOneFeild(id) {
        $('label[for="'+id+'"]').removeClass('required');
        $('label[for="'+id+'"]').parents('.form-group').removeClass('has-error');
    }

    clearAllValidate() {
        $('label.required').removeClass('required');
        $('.has-error').removeClass('has-error');
    }
    removeValidate() {
        $('.has-error').removeClass('has-error');
    }
    checkValidate() {
        const that = this;
        let validation = {
            isError : false,
            listFail : new Set(),
        };
        that.removeValidate();
        let LIST = null;
        switch (that._TYPE_ACTIVE) {
            case that._TYPE_VALIDATE.live : {
                LIST = that._NEED_LIST_VALIDATE;
                break;
            }
            case that._TYPE_VALIDATE.valuation : {
                LIST = that._NEED_LIST_VALIDATE_VALIDATION;
                break;
            }
            case that._TYPE_VALIDATE.marketReport : {
                LIST = that._NEED_LIST_VALIDATE_MARKET;
                break;
            }
        }
        LIST.forEach(it => {
            let message = null;
            let hasErr = false;
            if(typeof (it.rules) !== "undefined") {
               if (typeof (it.rules.notEmpty) !== "undefined" && (it.value() == null || it.value() === '' || it.value() === 0 || (Array.isArray( it.value()) && it.value().length > 0 ))) {
                   hasErr = true;
                   message = typeof (it.rules.notEmpty.message) !== 'undefined' ? it.rules.notEmpty.message : that._DEFAULT_MESSAGE.notEmpty.message;
               }
               if(typeof (it.rules.notFalse) !== "undefined" && (it.value() == null || !it.value())) {
                   hasErr = true;
                   message = typeof (it.rules.notFalse.message) !== 'undefined' ? it.rules.notFalse.message : that._DEFAULT_MESSAGE.notFalse.message;
               }
                if(typeof (it.rules.notNull) !== "undefined" && it.value() == null) {
                    hasErr = true;
                    message = typeof (it.rules.notNull.message) !== 'undefined' ? it.rules.notNull.message : that._DEFAULT_MESSAGE.notNull.message;
                }
           } else {
                // default check empty
                // if(it.value() == null || it.value() === '' || it.value() === 0 || (Array.isArray( it.value()) && it.value().length === 0)) {
                    if(it.value() == null || it.value() === '' || (Array.isArray( it.value()) && it.value().length === 0)) {
                    hasErr = true;
                    message = that._DEFAULT_MESSAGE.notEmpty.message;
                }
            }
            // show
            if (hasErr) {
                validation.isError = true;
                validation.listFail.add(it);
                $('label[for="' + it.id +'"]').parents('.form-group').addClass('has-error');
                if((typeof (it.hideMessage) == 'undefined' || !it.hideMessage) && message != null) {
                    $('.form-group').find('#'+ it.id).after('<span class="help-block sa-error">'+ message +'</span>');
                }
            }
        });
        
        return validation;
    }
}

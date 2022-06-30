function SAFormFields() {
    var _this = this
    let _list = []

    _this.updateFormFields = (form, newList) => {
        return _this[form](newList)
    }

    _this.formDef = () => {
        _list = [
            {// buildingId 0
                groupBelongTo: ".building-group",
                id: "buildingId",
                isHide: true,
                key: "BUILDING",
                name: "buildingId",
                required: false,
                toggleGroup: true,
            },
            {// blockId 1
                groupBelongTo: ".building-group",
                id: "blockId",
                isHide: true,
                key: "BLOCK",
                name: "blockId",
                toggleGroup: true,
            },
            {// numberFloor 2
                groupBelongTo: ".building-group",
                isHide: true,
                id: "numberFloor_building",
                key: "NUMBER_FLOOR",
                labelUpdated: "Số tầng của tòa nhà",
                name: "numberFloor",
                required: false,
                toggleGroup: true,
            },
            {// modelCode 3
                groupBelongTo: ".building-group",
                id: "modelCode",
                isHide: true,
                key: "MODEL_CODE",
                name: "modelCode",
                required: false,
                toggleGroup: true,
            },
            {// projectId 4
                id: "projectId",
                isHide: true,
                key: "PROJECT",
                name: "projectId",
                required: false,
            },
            {// houseNumber 5
                id: "houseNumber",
                isHide: false,
                key: "HOUSE_NUMBER",
                name: "houseNumber",
                required: true,
            },
            {//landCode 6
                id: "landCode",
                isHide: false,
                key: "LAND_CODE",
                name: "landCode",
                required: false,
            },
            {//mapCode 7
                id: "mapCode",
                isHide: false,
                key: "MAP_CODE",
                name: "mapCode",
                required: false,
            },
            {// mapYear 8
                id: "mapYear",
                isHide: false,
                key: "MAP_YEAR",
                name: "mapYear",
                required: false,
            },
            {// address 9
                id: "address",
                isHide: false,
                key: "ADDRESS",
                name: "address",
                required: true,
            },
            {// shortAddress 10
                id: "shortAddress",
                isHide: true,
                key: "SHORT_ADDRESS",
                name: "shortAddress",
                required: false,
            },
            {// xLongitude 11
                id: "x-longitude",
                isHide: false,
                key: "X_COORDINATE",
                name: "xCoordinate",
                required: false,
            },
            {// yLongitude 12
                id: "y-latitude",
                isHide: false,
                key: "Y_COORDINATE",
                name: "yCoordinate",
                required: false,
            },
            {// latitude 13
                id: "latitude",
                isHide: false,
                key: "LATITUDE",
                name: "latitude",
                required: true,
            },
            {// longitude 14
                id: "longitude",
                isHide: false,
                key: "LONGITUDE",
                name: "longitude",
                required: true,
            },
            {// oldAddress 15
                id: "oldAddress",
                isHide: false,
                key: "OLD_ADDRESS",
                name: "oldAddress",
                required: false,
            },
            {// addressNote 16
                id: "addressNote",
                isHide: false,
                key: "ADDRESS_NOTE",
                name: "addressNote",
                required: false,
            },
            {// position 17
                id: "position",
                isHide: false,
                key: "POSITION",
                name: "position",
                required: false,
            },
            {// roadPrice 18
                id: "roadPrice",
                isHide: false,
                key: "POSITION_ROAD_PRICE",
                name: "roadPrice",
                required: false,
            },
            {// lotSize 19
                id: "lotSize",
                isHide: false,
                key: "LOT_SIZE",
                name: "lotSize",
                required: false,
            },
            {// floorSize 20
                id: "floorSize",
                isHide: false,
                key: "FLOOR_SIZE",
                name: "floorSize",
                required: false,
            },
            {// sizeLength 21
                id: "sizeLength",
                isHide: false,
                key: "SIZE_LENGTH",
                name: "sizeLength",
                required: false,
            },
            {// sizeWidth 22
                id: "sizeWidth",
                isHide: false,
                key: "SIZE_WIDTH",
                name: "sizeWidth",
                required: false,
            },
            {// directionId 23
                id: "directionId",
                isHide: false,
                key: "DIRECTION",
                name: "directionId",
                required: false,
            },
            {// buildingFloors 24
                isHide: true,
                id: "buildingFloors",
                key: "FLOOR",
                labelUpdated: "Vị trí tầng",
                name: "buildingFloors",
                required: false,
            },
            {// numberFloor(Số lầu) 25
                groupBelongTo: ".house-info-group",
                isHide: false,
                id: "numberFloor_not_building",
                key: "NUMBER_FLOOR_NOT_BUILDING",
                labelUpdated: "Số lầu",
                name: "numberFloor",
                required: false,
            },
            {// bedRooms 26
                id: "bedRooms",
                isHide: false,
                key: "BED_ROOMS",
                name: "bedRooms",
                required: false,
            },
            {// bathRooms 27
                id: "bathRooms",
                isHide: false,
                key: "BATH_ROOMS",
                name: "bathRooms",
                required: false,
            },
            {// houseCastings 28
                id: "houseCastings",
                isHide: false,
                key: "HOUSE_CASTINGS",
                name: "houseCastings",
                required: false,
            },
            {// yearBuilt 29
                id: "yearBuilt",
                isHide: false,
                key: "YEAR_BUILT",
                name: "yearBuilt",
                required: false,
            },
            {// yearFixed 30
                id: "yearFixed",
                isHide: false,
                key: "YEAR_FIXED",
                name: "yearFixed",
                required: false,
            },
            {// isMezzanine 31
                id: "isMezzanine",
                isHide: false,
                key: "IS_MEZZANINE",
                name: "isMezzanine",
                required: false,
            },
            {// isRooftop 32
                id: "isRooftop",
                isHide: false,
                key: "IS_ROOFTOP",
                name: "isRooftop",
                required: false,
            },
            {// isAttic 33
                id: "isAttic",
                isHide: false,
                key: "IS_ATTIC",
                name: "isAttic",
                required: false,
            },
            {// isPenhouse 34
                id: "isPenhouse",
                isHide: false,
                key: "IS_PENHOUSE",
                name: "isPenhouse",
                required: false,
            },
            {// isBasement 35
                id: "isBasement",
                isHide: false,
                key: "IS_BASEMENT",
                name: "isBasement",
                required: false,
            },
            {// price 36
                id: "price",
                isHide: false,
                key: "PRICE",
                name: "price",
                required: true,
            },
            {// currency 37
                id: "currency",
                isHide: false,
                key: "CURRENCY",
                name: "currency",
                required: false,
            },
            {// minPrice 38
                id: "minPrice",
                isHide: false,
                key: "MIN_PRICE",
                name: "minPrice",
                required: false,
            },
            {// statusQuoId 39
                id: "statusQuoId",
                isHide: false,
                key: "STATUS_QUO",
                name: "statusQuoId",
                required: true,
            },
            {// priceForStatusQuo 40
                id: "priceForStatusQuo",
                isHide: false,
                key: "PRICE_FOR_STATUS_QUO",
                name: "priceForStatusQuo",
                required: false,
            },
            {// commissionInput 41
                id: "commissionInput",
                isHide: false,
                key: "SALE_COMMISSION",
                name: "commissionInput",
                required: false,
            },
            {// commissionInput 42
                id: "commissionInput",
                isHide: false,
                key: "RENT_COMMISSION",
                name: "commissionInput",
                required: false,
            },
            {// minContractDeadline 43
                id: "minContractDeadline",
                isHide: true,
                key: "RENT_MIN_TIME",
                name: "minContractDeadline",
                required: false,
            },
            {// deposit 44
                id: "deposit",
                isHide: true,
                key: "RENT_DEPOSIT",
                name: "deposit",
                required: false,
            },
            {// useRightTypeId 45
                isDisabled: false,
                id: "useRightTypeId",
                isHide: false,
                key: "USER_RIGHT_TYPE",
                name: "useRightTypeId",
                required: false,
            },
            {// privacy 46
                id: "privacy",
                isHide: true,
                key: "PRIVACY",
                name: "privacy",
                required: false,
            },
            {// mortgaged 47
                groupBelongTo: ".mortgaged-group",
                id: "mortgaged",
                isHide: false,
                key: "MORTGAGED",
                name: "mortgaged",
                required: false,
                toggleGroup: true,
            },
            {// bankId 48
                id: "bankId",
                isAjax: false,
                isDisabled: false,
                isHide: false,
                key: "BANK",
                name: "bankId",
                required: false,
                type: 'select',
            },
            {// afterSigningContract 49
                id: "afterSigningContract",
                isHide: false,
                key: "MOVE_IN_DATE_CHECK",
                name: "afterSigningContract",
                required: true,
            },
            {// moveInDate 50
                isDisabled: false,
                id: "moveInDate",
                isHide: false,
                key: "MOVE_IN_DATE_TIME",
                name: "moveInDate",
                required: true,
            },
            {// houseShape 51
                id: "houseShape",
                isAjax: true,
                isHide: true,
                key: "HOUSE_SHAPE",
                name: "houseShape",
                required: false,
            },
            {// otherHouseShape 52
                id: "otherHouseShape",
                isHide: true,
                key: "OTHER_HOUSE_SHAPE",
                name: "otherHouseShape",
                required: false,
            },
            {// photoGcns 53
                id: "photoGcns",
                isHide: false,
                key: "PHOTOS_GCN",
                name: "photoGcns",
                required: false,
            },
            {// amenitiesList 54
                isHide: false,
                id: "amenitiesList",
                key: "AMENITIES_LIST",
                labelUpdated: "Tiện ích khi thuê nhà",
                name: "amenitiesList",
                required: false,
            },
            {// legalStatusList 55
                id: "legalStatusList",
                isHide: false,
                key: "LEGAL_STATUS_LIST",
                name: "legalStatusList",
                required: false,
            },
            {// havePlanning 56
                groupBelongTo: '.havePlanning-group',
                id: "havePlanning",
                isHide: true,
                key: "HAVE_PLANNING",
                name: "havePlanning",
                required: false,
                toggleGroup: false
            },
            {// houseTypeId 57
                id: "houseTypeId",
                isHide: true,
                key: "HOUSE_TYPE",
                name: "houseTypeId",
                required: false,
            },
            {// commissionTime 58
                id: "commissionTime",
                isHide: true,
                key: "RENT_COMMISSION_TIME",
                name: "commissionTime",
                required: false,
            },
            {// commissionSelect 59
                id: "commissionSelect",
                isHide: false,
                key: "COMMISSION_SELECT",
                name: "commissionSelect",
                required: false,
            },
            {// constructionTypeId 60
                id: "constructionTypeId",
                isHide: true,
                key: "CONSTRUCTION_TYPE",
                name: "constructionTypeId",
                required: false,
            },
            {// depreciation 61
                id: "depreciation",
                isHide: true,
                key: "DEPRECIATION",
                name: "depreciation",
                required: false,
            },
            {// planingType 62
                id: "planing-type",
                isHide: true,
                key: "PLANING_TYPE",
                name: "planingType",
                required: false,
                type: 'select',
            },
            {// planingArea 63
                id: "planing-area",
                isHide: true,
                key: "PLANING_AREA",
                name: "planingArea",
                required: false,
                type: 'input',
            },
            {// planingAreaOther 64
                id: 'planing-area-other',
                isHide: true,
                key: "PLANING_AREA_OTHER",
                name: 'planingAreaOther',
                required: false,
                type: 'text',
            },
            {// planingRightOfWay 65
                id: 'planing-right-of-way',
                isHide: true,
                key: "PLANING_RIGHT_OF_WAY",
                name: 'planingRightOfWay',
                required: false,
                type: 'input'
            },
            {// planingNote 66
                id: 'planing-note',
                isHide: true,
                key: "PLANING_NOTE",
                name: 'planingNote',
                required: false,
                type: 'input',
            },
            {// planingPhotos 67
                groupBelongTo: ".planing-photos-group",
                id: 'planing-photos',
                isHide: true,
                key: "PLANING_PHOTOS",
                name: 'planingPhotos',
                required: false,
                target: '#planing-photos-wrapper',
                toggleGroup: false,
            },
            {// crawlerInfoNote 68
                id: 'crawlerInfoNote',
                isDisabled: true,
                key: "CRAWLER_INFO_NOTE",
                name: 'crawlerInfoNote',
                required: false,
                target: '#crawlerInfoNote-wrapper',
            },
            {// prescreenerNote 69
                id: 'prescreenerNote',
                isDisabled: true,
                key: "PRESCREENER_NOTE",
                name: 'prescreenerNote',
                required: false,
                target: '#prescreenerNote-wrapper',
            },
            {// roadFrontageWidth 70
                groupBelongTo: ".frontWay-group",
                id: 'roadFrontageWidth',
                isHide: true,
                key: "POSITION_ROAD_FRONTAGE_WIDTH",
                name: 'roadFrontageWidth',
                required: false,
                target: '#roadFrontageWidth-wrapper',
                toggleGroup: false
            },
            {// alleyId 71
                groupBelongTo: ".alley-group",
                id: 'alleyId',
                isHide: true,
                key: "POSITION_ALLEY_ID",
                name: 'alleyId',
                required: false,
                target: '#alleyId-wrapper',
                toggleGroup: false
            },
            {// roadFrontageDistance 72
                groupBelongTo: ".alley-group",
                id: 'roadFrontageDistance',
                isHide: true,
                key: "POSITION_ROAD_FRONTAGE_DISTANCE",
                name: 'roadFrontageDistance',
                required: false,
                target: '#roadFrontageDistance-wrapper',
                toggleGroup: false
            },
            {// alleyType 73
                groupBelongTo: ".alley-group",
                id: 'alleyType',
                isHide: true,
                key: "POSITION_ALLEY_TYPE",
                name: 'alleyType',
                required: false,
                target: '#alleyType-wrapper',
                toggleGroup: false
            },
            {// alleyWidth 74
                groupBelongTo: ".alley-group",
                id: 'alleyWidth',
                isHide: true,
                key: "POSITION_ALLEY_WIDTH",
                name: 'alleyWidth',
                required: false,
                target: '#alleyWidth-wrapper',
                toggleGroup: false
            },
            {// widthFrontWay-alley 75
                groupBelongTo: ".alley-group",
                id: 'widthFrontWay-alley',
                isHide: true,
                key: "POSITION_FRONT_WAY",
                name: 'widthFrontWay',
                required: false,
                target: '#widthFrontWay-alley-wrapper',
                toggleGroup: false
            },
            /* {// widthValue-alley 76
                id: 'widthValue-alley',
                isHide: false,
                name: 'widthValue',
                required: false,
                target: '#widthValue-alley-wrapper',
            }, 
            {// widthFrontWay 77
                groupBelongTo: "#widthFrontWay-widthValue-wrapper",
                id: 'widthFrontWay',
                isHide: true,
                required: false,
                target: '#widthFrontWay-wrapper',
                toggleGroup: false
            },
            {// widthValue 78
                groupBelongTo: "#widthFrontWay-widthValue-wrapper",
                id: 'widthValue',
                isHide: true,
                name: 'widthValue',
                required: false,
                target: '#widthValue-wrapper',
                toggleGroup: false
            }, */
        ]

        return _list
    }

    _this.form13 = () => {
        const cloneForm = _this.formDef().slice()
        cloneForm[0] = {// buildingId
            ...cloneForm[0],
            isAjax: true,
            isHide: false,
            required: true,
            toggleGroup: true
        }
        cloneForm[1] = {// blockId
            ...cloneForm[1],
            isAjax: true,
            isHide: false,
            required: false,
            toggleGroup: true
        }
        cloneForm[2] = {// numberFloor Số tầng của tòa nhà
            ...cloneForm[2],
            isDisabled: true,
            isHide: false,
            labelUpdated: "Số tầng của tòa nhà",
            required: false,
            toggleGroup: true
        }
        cloneForm[3] = {// modelCode 3
            ...cloneForm[3],
            isDisabled: false,
            isHide: false,
            required: true,
            toggleGroup: true
        }
        cloneForm[4] = {// projectId 4
            ...cloneForm[4],
            isDisabled: true,
            isHide: false,
            required: false,
            toggleGroup: true
        }
        cloneForm[6].isHide = true // landCode
        cloneForm[7].isHide = true // mapCode
        cloneForm[8].isHide = true // mapYear
        cloneForm[17].isHide = true // position
        cloneForm[18].isHide = true // roadPrice
        cloneForm[19] = {// lotSize
            ...cloneForm[19],
            isHide: true,
            required: false
        }
        cloneForm[19].isHide = true // lotSize
        cloneForm[20].required = true // floorSize
        cloneForm[21].isHide = true // sizeLength
        cloneForm[22].isHide = true // sizeWidth
        cloneForm[23] = {// directionId
            ...cloneForm[23],
            isHide: false,
            isAjax: true,
            required: true
        }
        cloneForm[24] = {// buildingFloors Vị trí tầng
            ...cloneForm[24],
            isHide: false,
            required: true
        }
        cloneForm[25] = {// numberFloor(Số lầu) 25 
            ...cloneForm[25],
            isHide: true,
            required: false
        }
        cloneForm[28].isHide = true // houseCastings
        cloneForm[29] = {// yearBuilt
            ...cloneForm[29],
            isHide: false,
            isDisabled: false
        }
        cloneForm[39] = {// statusQuoId
            ...cloneForm[39],
            isAjax: true
        }
        cloneForm[41].required = true // commissionInput
        cloneForm[42].isHide = true // commissionInput
        cloneForm[43].isHide = true // minContractDeadline
        cloneForm[44].isHide = true // deposit
        cloneForm[45] = {// useRightTypeId
            ...cloneForm[45],
            isAjax: true,
            isDisabled: false,
            required: true
        }
        cloneForm[46] = {// privacy
            ...cloneForm[46],
            isHide: false,
            required: false
        }
        cloneForm[48] = {// bankId
            ...cloneForm[48],
            isHide: false,
        }
        cloneForm[51] = {// houseShape
            ...cloneForm[51],
            isAjax: false,
            isHide: true,
        }
        cloneForm[53] = {// photoGcns 53
            ...cloneForm[53],
            isHide: false,
            required: true
        }
        cloneForm[54].labelUpdated = 'Ưu đãi khác khi bán nhà'
        cloneForm[55].required = true
        cloneForm[56] = {// havePlanning
            ...cloneForm[56],
            isHide: true,
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form14 = () => {
        const cloneForm = _this.form13().slice()

        cloneForm[2] = {// numberFloor Số tầng của tòa nhà
            ...cloneForm[2],
            isHide: false,
            isDisabled: true,
            required: false,
            toggleGroup: true
        }
        cloneForm[26] = {// bedRooms 26
            ...cloneForm[26],
            isHide: false,
            isDisabled: false,
            required: true,
        }
        cloneForm[27] = {// bathRooms 27
            ...cloneForm[27],
            isHide: false,
            isDisabled: false,
            required: true,
        }
        cloneForm[29] = {// yearBuilt 29
            ...cloneForm[29],
            isHide: false,
            isDisabled: false,
            required: false,
        }
        cloneForm[46] = {// privacy
            ...cloneForm[46],
            isHide: true,
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form15 = () => {
        const cloneForm = _this.form13().slice()
        cloneForm[0] = {// buildingId
            ...cloneForm[0],
            isAjax: false,
            isHide: true,
            required: false,
            toggleGroup: false
        }
        cloneForm[1] = {// blockId
            ...cloneForm[1],
            isAjax: false,
            isHide: true,
            required: false,
            toggleGroup: false
        }
        cloneForm[2] = {// numberFloor Số tầng của tòa nhà
            ...cloneForm[2],
            isAjax: false,
            isHide: true,
            required: false,
            toggleGroup: false
        }
        cloneForm[3] = {// modelCode 3
            ...cloneForm[3],
            isDisabled: false,
            isHide: false,
            required: false,
            toggleGroup: true
        }
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: true,
            isDisabled: false,
            isHide: false,
            required: true
        }
        cloneForm[17] = {// position
            ...cloneForm[17],
            isHide: false,
            required: true
        }
        cloneForm[24] = {// buildingFloors Vị trí tầng
            ...cloneForm[24],
            isHide: true,
            required: false
        }
        cloneForm[26].required = true // bedRooms
        cloneForm[27].required = true // bathRooms
        cloneForm[29] = {// yearBuilt
            ...cloneForm[29],
            isHide: false,
            isDisabled: false
        }
        cloneForm[46] = {// privacy
            ...cloneForm[46],
            isHide: false,
            required: false
        }
        cloneForm[61] = {// depreciation 61
            ...cloneForm[61],
            isHide: true,
            required: false
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form16 = () => {
        const cloneForm = _this.form13().slice()
        cloneForm[0] = {
            ...cloneForm[0],
            isAjax: false,
            isHide: true,
            required: false,
            toggleGroup: false,
        }
        cloneForm[1] = {
            ...cloneForm[1],
            isHide: true,
            required: false,
            toggleGroup: false,
        }
        cloneForm[2] = {
            ...cloneForm[2],
            isHide: true,
            required: false,
            toggleGroup: false,
        }
        cloneForm[3] = {
            ...cloneForm[3],
            isHide: true,
            required: false,
            toggleGroup: false,
        }
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: true,
            isDisabled: false,
            isHide: false,
            required: true
        }
        cloneForm[6].isHide = false // landCode
        cloneForm[7].isHide = false // mapCode
        cloneForm[8].isHide = false // mapYear
        cloneForm[17] = {// position
            ...cloneForm[17],
            isHide: false,
            required: true
        }
        cloneForm[18] = {// roadPrice
            ...cloneForm[18],
            isHide: false,
            isDisabled: true
        }
        cloneForm[19] = {// lotSize
            ...cloneForm[19],
            isHide: false,
            required: true
        }
        cloneForm[21] = {// sizeLength
            ...cloneForm[21],
            isHide: false,
            required: true
        }
        cloneForm[22] = {// sizeWidth
            ...cloneForm[22],
            isHide: false,
            required: true
        }
        cloneForm[24] = {// buildingFloors
            ...cloneForm[24],
            isHide: true,
            required: false
        }
        cloneForm[25] = {// numberFloor(Số lầu) 25
            ...cloneForm[25],
            isHide: false,
            required: true
        }
        cloneForm[26] = {// bedroom
            ...cloneForm[26],
            isHide: false,
            required: true
        }
        cloneForm[27] = {// bathroom
            ...cloneForm[27],
            isHide: false,
            required: true
        }
        cloneForm[28].isHide = false // houseCastings
        cloneForm[29] = {// yearBuilt
            ...cloneForm[29],
            isDisabled: false,
            isHide: false,
            required: false
        }
        cloneForm[46] = {// privacy
            ...cloneForm[46],
            required: false
        }
        cloneForm[51] = {// houseShape
            ...cloneForm[51],
            isAjax: true,
            isHide: false,
        }
        cloneForm[52].isHide = false // otherHouseShape
        cloneForm[56] = {// havePlanning
            ...cloneForm[56],
            isHide: false,
            toggleGroup: true
        }
        cloneForm[62] = {// planingType
            ...cloneForm[62],
            isHide: false,
            isDisabled: true,
            toggleGroup: true
        }
        cloneForm[63] = {// planingArea
            ...cloneForm[63],
            isHide: false,
            isDisabled: true,
            toggleGroup: true
        }
        cloneForm[64] = {// planingAreaOther
            ...cloneForm[64],
            isHide: false,
            isDisabled: true,
            toggleGroup: true
        }
        cloneForm[65] = {// planingRightOfWay
            ...cloneForm[65],
            isHide: false,
            isDisabled: true,
            toggleGroup: true
        }
        cloneForm[66] = {// planingNote
            ...cloneForm[66],
            isHide: false,
            isDisabled: true,
            toggleGroup: true
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form17 = () => {
        const cloneForm = _this.form16().slice()
        cloneForm[57] = {// houseTypeId
            ...cloneForm[57],
            isAjax: true,
            isHide: false,
        }
        cloneForm[60] = {// constructionTypeId 60
            ...cloneForm[60],
            isAjax: true,
            isHide: false,
            required: true
        }
        cloneForm[61] = {// depreciation 61
            ...cloneForm[61],
            isHide: false,
            required: true
        }
        cloneForm[62] = {// planingType 62
            ...cloneForm[62],
            isDisabled: true,
            isHide: false,
        }
        cloneForm[63] = {// planingArea 63
            ...cloneForm[63],
            isDisabled: true,
            isHide: false,
        }
        cloneForm[64] = {// planingAreaOther 64
            ...cloneForm[64],
            isHide: false,
        }
        cloneForm[65] = {// planingRightOfWay 65
            ...cloneForm[65],
            isDisabled: true,
            isHide: false,
        }
        cloneForm[66] = {// planingNote 66
            ...cloneForm[66],
            isDisabled: true,
            isHide: false,
        }
        cloneForm[67] = {// planingPhotos 67
            ...cloneForm[67],
            isDisabled: false,
            isHide: false,
            required: true,
            toggleGroup: true
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form18 = () => {
        const cloneForm = _this.form16().slice()
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[25].required = false // numberFloor(Số lầu) 25
        cloneForm[26].required = false // bedroom
        cloneForm[27].required = false // bathroom
        cloneForm[51] = {// houseShape 51
            ...cloneForm[51],
            isHide: false,
            required: false
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form19 = () => {
        const cloneForm = _this.form16().slice()
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[5].required = false // houseNumber
        cloneForm[6].required = true // landCode
        cloneForm[7].required = true // mapCode
        cloneForm[20] = {// floorSize
            ...cloneForm[20],
            isHide: true,
            required: false
        }
        cloneForm[25] = {// numberFloor(Số lầu)
            ...cloneForm[25],
            isHide: true,
            required: false
        }
        cloneForm[28].isHide = true // houseCastings
        cloneForm[29] = {// yearBuilt
            ...cloneForm[29],
            isDisabled: false,
            isHide: true,
            required: false
        }
        cloneForm[30].isHide = true // yearFixed
        cloneForm[31].isHide = true // isMezzanine
        cloneForm[32].isHide = true // isRooftop
        cloneForm[33].isHide = true // isAttic
        cloneForm[34].isHide = true // isPenhouse
        cloneForm[35].isHide = true // isBasement
        cloneForm[51] = {// houseShape
            ...cloneForm[51],
            isAjax: false,
            isHide: true,
        }
        cloneForm[52].isHide = true // otherHouseShape

        _list = cloneForm.slice()
        return _list
    }

    // THUE
    _this.form20 = () => {
        const cloneForm = _this.form16().slice()

        cloneForm[56] = {// havePlanning
            ...cloneForm[56],
            isHide: true,
            toggleGroup: false
        }
        cloneForm[41] = {// commissionInput SALE
            ...cloneForm[41],
            isHide: true,
            required: false,
        }
        cloneForm[42] = {// commissionInput RENT
            ...cloneForm[42],
            isHide: false,
            required: true,
        }
        cloneForm[43] = {// minContractDeadline
            ...cloneForm[43],
            isHide: false,
            required: true
        }
        cloneForm[44].isHide = false // deposit
        cloneForm[45] = {// useRightTypeId
            ...cloneForm[45],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[46] = {// privacy
            ...cloneForm[46],
            isHide: true,
            required: false
        }
        cloneForm[47] = {// mortgaged
            ...cloneForm[47],
            isHide: true,
            toggleGroup: false
        }
        cloneForm[48] = {// bankId
            ...cloneForm[48],
            isAjax: false,
            isHide: true,
            toggleGroup: false
        }
        cloneForm[53].required = false // photoGcns
        cloneForm[54].labelUpdated = 'Tiện ích khi thuê nhà' // amenitiesList
        cloneForm[55].required = false // legalStatusListupdatedList

        _list = cloneForm.slice()
        return _list
    }

    _this.form21 = () => {
        const cloneForm = _this.form20().slice()
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[8].isHide = true // mapYear
        cloneForm[25].required = false // numberFloor(Số lầu) 25
        cloneForm[26].required = false // bedRooms
        cloneForm[27].required = false // bathRooms

        _list = cloneForm.slice()
        return _list
    }

    _this.form22 = () => {
        const cloneForm = _this.form20().slice()
        cloneForm[0] = {// buildingId
            ...cloneForm[0],
            isAjax: true,
            isHide: false,
            required: true,
            toggleGroup: true
        }
        cloneForm[1] = {
            ...cloneForm[1],
            isHide: false,
            required: false,
            toggleGroup: true,
        }
        cloneForm[2] = {//numberFloor 2
            ...cloneForm[2],
            isDisabled: true,
            isHide: true,
            required: false,
            toggleGroup: true,
        }
        cloneForm[3] = {
            ...cloneForm[3],
            isDisabled: false,
            isHide: false,
            required: true,
            toggleGroup: true,
        }
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: true,
            isDisabled: true,
            isHide: false,
            required: false
        }
        cloneForm[6].isHide = true // landCode
        cloneForm[7].isHide = true // mapCode
        cloneForm[8].isHide = true // mapYear
        cloneForm[17] = {// position
            ...cloneForm[17],
            isHide: true,
            required: false
        }
        cloneForm[18] = {// roadPrice
            ...cloneForm[18],
            isHide: true,
            isDisabled: false
        }
        cloneForm[19] = {// lotSize
            ...cloneForm[19],
            isHide: true,
            required: false
        }
        cloneForm[21] = {// sizeLength
            ...cloneForm[21],
            isHide: true,
            required: false
        }
        cloneForm[22] = {// sizeWidth
            ...cloneForm[22],
            isHide: true,
            required: false
        }
        cloneForm[23].required = false // directionId
        cloneForm[24] = {// buildingFloors
            ...cloneForm[24],
            isHide: false,
            required: true
        }
        cloneForm[25].required = false // numberFloor Số lầu
        cloneForm[51] = {// houseShape
            ...cloneForm[51],
            isAjax: false,
            isHide: true,
        }
        cloneForm[52].isHide = true // otherHouseShape

        _list = cloneForm.slice()
        return _list
    }

    _this.form23 = () => {
        const cloneForm = _this.form22().slice()
        cloneForm[25].isHide = true // numberFloor Số lầu

        _list = cloneForm.slice()
        return _list
    }

    _this.form24 = () => {
        const cloneForm = _this.form22().slice()

        cloneForm[2] = {//numberFloor 2
            ...cloneForm[2],
            isDisabled: true,
            isHide: false,
            required: false,
            toggleGroup: true,
        }
        cloneForm[23].required = true // directionId
        cloneForm[25].isHide = true // numberFloor Số lầu
        cloneForm[28].isHide = true // houseCastings
        cloneForm[29] = {// yearBuilt
            ...cloneForm[29],
            isDisabled: false,
            isHide: false,
            required: false
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form25 = () => {
        const cloneForm = _this.form22().slice()
        cloneForm[0] = {// buildingId
            ...cloneForm[0],
            isHide: true,
            required: false,
        }
        cloneForm[1] = {// blockId 1
            ...cloneForm[1],
            isHide: true,
        }
        cloneForm[2] = {// numberFloor 2
            ...cloneForm[2],
            isDisabled: false,
            isHide: true,
            required: false,
        }
        cloneForm[3] = {// modelCode
            ...cloneForm[3],
            isDisabled: false,
            isHide: false,
            required: false,
        }
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isDisabled: false,
            isHide: false,
            required: true
        }
        cloneForm[17] = {// position
            ...cloneForm[17],
            isHide: false,
            required: true
        }
        cloneForm[23] = {// directionId
            ...cloneForm[23],
            isDisabled: false,
            isHide: false,
            required: true
        }
        cloneForm[24] = {// buildingFloors
            ...cloneForm[24],
            isHide: true,
            required: false
        }
        cloneForm[25] = {// numberFloor Số lầu
            ...cloneForm[25],
            isHide: true,
            required: false
        }
        cloneForm[26] = {// bedroom
            ...cloneForm[26],
            isDisabled: false,
            isHide: false,
            required: true
        }
        cloneForm[27] = {// bathroom
            ...cloneForm[27],
            isDisabled: false,
            isHide: false,
            required: true
        }
        cloneForm[28].isHide = true // houseCastings
        cloneForm[29] = {// yearBuilt
            ...cloneForm[29],
            isDisabled: false,
            isHide: false,
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form26 = () => {
        const cloneForm = _this.form22().slice()

        cloneForm[23].required = true // directionId
        cloneForm[25].isHide = true // numberFloor Số lầu
        cloneForm[26].required = false // bedroom
        cloneForm[27].required = false // bathroom
        cloneForm[28].isHide = true // houseCastings
        cloneForm[29] = {// yearBuilt
            ...cloneForm[29],
            isDisabled: false,
            isHide: false,
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form27 = () => {
        const cloneForm = _this.form22().slice()
        
        cloneForm[0] = {// buildingId
            ...cloneForm[0],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[1].isHide = true // blockId
        cloneForm[2] = {// numberFloor Số tầng của tòa nhà
            ...cloneForm[2],
            isDisabled: false,
            isHide: true,
        }
        cloneForm[3] = { // modelCode 3
            ...cloneForm[3],
            isDisabled: false,
            isHide: true,
            required: false,
        }
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: false,
            isDisabled: false,
            isHide: true,
        }
        cloneForm[5] = {// houseNumber
            ...cloneForm[5],
            isHide: true,
            required: false
        }
        cloneForm[6] = {// landCode
            ...cloneForm[6],
            isHide: false,
            required: true
        }
        cloneForm[7] = {// mapCode
            ...cloneForm[7],
            isHide: false,
            required: true
        }
        cloneForm[8].isHide = false // mapYear
        cloneForm[17] = {// position
            ...cloneForm[17],
            isHide: false,
            required: true
        }
        cloneForm[18] = {// roadPrice
            ...cloneForm[18],
            isHide: false,
            isDisabled: true
        }
        cloneForm[19] = {// lotSize
            ...cloneForm[19],
            isHide: false,
            required: true
        }
        cloneForm[20] = {// floorSize
            ...cloneForm[20],
            isHide: true,
            required: false
        }
        cloneForm[21] = {// sizeLength
            ...cloneForm[21],
            isHide: false,
            required: true
        }
        cloneForm[22] = {// sizeWidth
            ...cloneForm[22],
            isHide: false,
            required: true
        }
        cloneForm[23].required = true // directionId
        cloneForm[24] = {// buildingFloors
            ...cloneForm[24],
            isHide: true,
            required: false
        }
        cloneForm[25].isHide = true // numberFloor Số lầu
        cloneForm[26] = {// bedroom
            ...cloneForm[26],
            isHide: true,
            required: false
        }
        cloneForm[27] = {// bathroom
            ...cloneForm[27],
            isHide: true,
            required: false
        }
        cloneForm[28].isHide = true // houseCastings
        cloneForm[29] = {// yearBuilt
            ...cloneForm[29],
            isDisabled: false,
            isHide: true,
            required: false
        }
        cloneForm[30].isHide = true // yearFixed
        cloneForm[31].isHide = true // isMezzanine
        cloneForm[32].isHide = true // isRooftop
        cloneForm[33].isHide = true // isAttic
        cloneForm[34].isHide = true // isPenhouse
        cloneForm[35].isHide = true // isBasement
        cloneForm[51] = {// houseShape
            ...cloneForm[51],
            isAjax: false,
            isHide: true,
        }
        cloneForm[52].isHide = true // otherHouseShape
        cloneForm[54].isHide = true // amenitiesList

        _list = cloneForm.slice()
        return _list
    }

    _this.form1 = () => {
        const cloneForm = _this.form13().slice()
        cloneForm[2] = {// numberFloor Số tầng của tòa nhà
            ...cloneForm[2],
            isDisabled: true,
            isHide: false,
            labelUpdated: "Số tầng của tòa nhà",
            required: false,
            toggleGroup: true
        }
        cloneForm[3] = {// modelCode
            ...cloneForm[3],
            isDisabled: false,
            isHide: false,
            required: true,
            toggleGroup: true
        }
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: false,
            isDisabled: false,
            isHide: true,
            required: false
        }
        
        cloneForm[6].isHide = true // landCode
        cloneForm[7].isHide = true // mapCode
        cloneForm[8].isHide = false // mapYear
        cloneForm[19].isHide = false // lotSize
        cloneForm[21].isHide = false // sizeLength
        cloneForm[22].isHide = false // sizeWidth
        cloneForm[26].required = true // bedroom
        cloneForm[27].required = true // bathroom
        cloneForm[28].isHide = false // houseCastings
        cloneForm[29] = {// yearBuilt
            ...cloneForm[29],
            isDisabled: false,
            isHide: false,
            required: false
        }
        cloneForm[37].isHide = false // currency
        cloneForm[46].required = false // privacy
        cloneForm[53] = {// photoGcns
            ...cloneForm[53],
            isDisabled: false,
            isHide: false,
            required: true
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form2 = () => {
        const cloneForm = _this.form1().slice()
        cloneForm[0] = {// buildingId
            ...cloneForm[0],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[1] = {// blockId
            ...cloneForm[1],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[2] = {// numberFloor Số tầng của tòa nhà
            ...cloneForm[2],
            isDisabled: false, 
            isHide: true,
        }
        cloneForm[3] = {// modelCode
            ...cloneForm[3],
            isDisabled: false,
            isHide: true,
            required: false
        }
        cloneForm[17] = {// position
            ...cloneForm[17],
            isAjax: true,
            isDisabled: false,
            isHide: false,
            required: true
        }
        cloneForm[18] = {// roadPrice
            ...cloneForm[18],
            isHide: false,
            isDisabled: true
        }
        cloneForm[19].required = true // lotSize
        cloneForm[21].required = true // sizeLength
        cloneForm[22].required = true // sizeWidth
        cloneForm[24] = {// buildingFloors Vị trí tầng
            ...cloneForm[24],
            isHide: true,
            required: false
        }
        cloneForm[25].isHide = false // numberFloor
        cloneForm[51] = {// houseShape
            ...cloneForm[51],
            isAjax: true,
            isHide: false,
            required: true
        }
        cloneForm[52].isHide = false // otherHouseShape
        cloneForm[56] = {// havePlanning 56
            ...cloneForm[56],
            isDisabled: false,
            isHide: false,
            required: false,
            toggleGroup: true
        }
        cloneForm[62] = {// planingType 62
            ...cloneForm[62],
            isDisabled: false,
            isHide: false,
        }
        cloneForm[63] = {// planingArea 63
            ...cloneForm[63],
            isDisabled: false,
            isHide: false,
        }
        cloneForm[64] = {// planingAreaOther 64
            ...cloneForm[64],
            isDisabled: false,
            isHide: false,
        }
        cloneForm[65] = {// planingRightOfWay 65
            ...cloneForm[65],
            isDisabled: false,
            isHide: false,
        }
        cloneForm[66] = {// planingNote 66
            ...cloneForm[66],
            isDisabled: false,
            isHide: false,
        }
        cloneForm[67] = {// planingPhotos 67
            ...cloneForm[67],
            isDisabled: false,
            isHide: false,
            toggleGroup: true
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form3 = () => {
        const cloneForm = _this.form2().slice()
        
        cloneForm[6].isHide = false // landCode
        cloneForm[7].isHide = false // mapCode
        cloneForm[57] = {// houseTypeId 57
            ...cloneForm[57],
            isAjax: true,
            isHide: false,
        }
        cloneForm[60] = {// constructionTypeId 60
            ...cloneForm[60],
            isAjax: true,
            isHide: false,
            required: true
        }
        cloneForm[61] = {// depreciation 61
            ...cloneForm[61],
            isHide: false,
            required: true
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form4 = () => {
        const cloneForm = _this.form2().slice()
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: true,
            isDisabled: false,
            isHide: false,
            required: true
        }
        cloneForm[19].required = false // lotSize
        cloneForm[21].isHide = false // sizeLength
        cloneForm[22].isHide = false // sizeWidth

        _list = cloneForm.slice()
        return _list
    }

    _this.form5 = () => {
        const cloneForm = _this.form2().slice()
        cloneForm[5].required = false // houseNumber
        cloneForm[6] = {// landCode
            ...cloneForm[6],
            isHide: false,
            required: true
        }
        cloneForm[7] = {// mapCode
            ...cloneForm[7],
            isHide: false,
            required: true
        }
        cloneForm[20].required = false // floorSize
        cloneForm[26].required = false // bedroom
        cloneForm[27].required = false // bathroom
        cloneForm[56].isHide = false // havePlanning
        cloneForm[60] = {// constructionTypeId 60
            ...cloneForm[60],
            isAjax: false,
            isHide: true,
            required: false
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form6 = () => {
        const cloneForm = _this.form5().slice()
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: true,
            isHide: false,
            required: true
        }
        cloneForm[56].isHide = true // havePlanning
        cloneForm[51] = {// houseShape
            ...cloneForm[51],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[52].isHide = true // otherHouseShape

        _list = cloneForm.slice()
        return _list
    }

    _this.form7 = () => {
        const cloneForm = _this.form20().slice()
        cloneForm[0] = {
            ...cloneForm[0],
            isAjax: true,
            isHide: false,
            required: true,
            toggleGroup: true,
        }
        cloneForm[1] = {
            ...cloneForm[1],
            isHide: false,
            required: false,
            toggleGroup: true,
        }
        cloneForm[2] = {
            ...cloneForm[2],
            isDisabled: true,
            isHide: false,
            required: false,
            toggleGroup: true,
        }
        cloneForm[3] = { // modelCode 3
            ...cloneForm[3],
            isDisabled: false,
            isHide: false,
            required: true,
            toggleGroup: true,
        }
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[17] = {// position
            ...cloneForm[17],
            isHide: true,
            required: false
        }
        cloneForm[18] = {// roadPrice
            ...cloneForm[18],
            isDisabled: false,
            isHide: true
        }
        cloneForm[19].required = false // lotSize
        cloneForm[21].required = false // sizeLength
        cloneForm[22].required = false // sizeWidth
        cloneForm[23].required = false // directionId
        cloneForm[24] = {// buildingFloors Vị trí tầng
            ...cloneForm[24],
            isHide: false,
            required: true
        }
        cloneForm[25] = {// numberFloor Số lầu
            ...cloneForm[25],
            isHide: true,
            required: false
        }
        cloneForm[45] = {// useRightTypeId
            ...cloneForm[45],
            isAjax: true,
            isDisabled: true,
            isHide: false
        }
        cloneForm[47] = {// mortgaged
            ...cloneForm[47],
            isDisabled: true,
            isHide: false
        }
        cloneForm[48] = {// bankId
            ...cloneForm[48],
            isAjax: true,
            isHide: false
        }
        cloneForm[48].isHide = false // bankId
        cloneForm[51] = {// houseShape
            ...cloneForm[51],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[52].isHide = true // otherHouseShape

        _list = cloneForm.slice()
        return _list
    }

    _this.form8 = () => {
        const cloneForm = _this.form7().slice()
        cloneForm[0] = {
            ...cloneForm[0],
            isAjax: false,
            isHide: true,
            required: false,
            toggleGroup: false
        }
        cloneForm[1] = {
            ...cloneForm[1],
            isHide: true,
            required: false,
            toggleGroup: false,
        }
        cloneForm[2] = {// numberFloor_building
            ...cloneForm[2],
            isHide: true,
            required: false,
            toggleGroup: false,
        }
        cloneForm[3] = {
            ...cloneForm[3],
            isHide: true,
            required: false,
            toggleGroup: false,
        }
        cloneForm[17] = {// position
            ...cloneForm[17],
            isHide: false,
            required: true
        }
        cloneForm[18] = {// roadPrice
            ...cloneForm[18],
            isHide: false,
            isDisabled: true
        }
        cloneForm[19] = { // lotsize lotSize
            ...cloneForm[19],
            isHide: false,
            required: true,
        }
        cloneForm[24] = {// buildingFloors Vị trí tầng
            ...cloneForm[24],
            isHide: true,
            required: false
        }
        cloneForm[25] = {// numberFloor_not_building
            ...cloneForm[25],
            isHide: false,
            required: true,
            toggleGroup: true,
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form9 = () => {
        const cloneForm = _this.form8().slice()

        cloneForm[5] = { // houseNumber
            ...cloneForm[5],
            isHide: false,
            required: true,
        }
        cloneForm[19].required = true // lotSize
        cloneForm[20].required = false // floorSize
        cloneForm[26].required = false // bedroom
        cloneForm[27].required = false // bathroom
        cloneForm[48] = {// bankId
            ...cloneForm[48],
            isAjax: false,
            isDisabled: true,
            isHide: false,
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form10 = () => {
        const cloneForm = _this.form7().slice()
        
        cloneForm[2] = {// numberFloor Số tầng của tòa nhà
            ...cloneForm[2],
            isDisabled: true,
            isHide: false,
            required: false,
            toggleGroup: true
        }
        cloneForm[24] = {// buildingFloors Vị trí tầng
            ...cloneForm[24],
            isDisabled: false,
            isHide: false,
            required: true
        }
        cloneForm[25] = {// numberFloor Số lầu
            ...cloneForm[25],
            isHide: false,
        }
        cloneForm[26] = {// bedRooms 26
            ...cloneForm[26],
            isHide: false,
            required: false
        }
        cloneForm[27] = {// bedRooms 27
            ...cloneForm[27],
            isHide: false,
            required: false
        }
        cloneForm[48] = {// bankId
            ...cloneForm[48],
            isAjax: false,
            isDisabled: true,
            isHide: false,
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form11 = () => {
        const cloneForm = _this.form10().slice()
        cloneForm[0] = { // buildingId 0
            ...cloneForm[0],
            isAjax: true,
            isHide: false,
            required: false,
            toggleGroup: true,
        }
        cloneForm[3] = { // modelCode 3
            ...cloneForm[3],
            isDisabled: false,
            isHide: false,
            required: false,
            toggleGroup: true,
        }
        cloneForm[4] = {// projectId
            ...cloneForm[4],
            isAjax: false,
            isHide: true,
            required: false
        }
        cloneForm[5] = { // houseNumber
            ...cloneForm[5],
            isHide: false,
            required: true,
        }

        cloneForm[17] = { // position
            ...cloneForm[17],
            isHide: false,
            required: true,
        }
        cloneForm[18] = {// roadPrice
            ...cloneForm[18],
            isHide: false,
            isDisabled: true
        }
        cloneForm[20] = { // floorSize
            ...cloneForm[20],
            isHide: false,
            required: true,
        }
        cloneForm[24] = {// buildingFloors Vị trí tầng
            ...cloneForm[24],
            isDisabled: false,
            isHide: false,
            required: false
        }

        _list = cloneForm.slice()
        return _list
    }

    _this.form12 = () => {
        const cloneForm = _this.form9().slice()

        cloneForm[5] = { // houseNumber
            ...cloneForm[5],
            isHide: false,
            required: true,
        }
        cloneForm[19] = { // lotSize
            ...cloneForm[19],
            isHide: false,
            required: false,
        }
        cloneForm[20] = { // floorSize
            ...cloneForm[20],
            isHide: false,
            required: true,
        }
        cloneForm[24] = {// buildingFloors Vị trí tầng 24
            ...cloneForm[24],
            isDisabled: false,
            isHide: false,
            required: false,
            toggleGroup: true,
        }
        cloneForm[25] = {// numberFloor(Số lầu) 25
            ...cloneForm[25],
            isHide: true,
            required: false,
            toggleGroup: true,
        }

        _list = cloneForm.slice()
        return _list
    }
}

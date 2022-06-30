const ListForm = [
    {
        //DEFAULT FORM
        id: 0,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        project: { display: true, edit: true },
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber'],
        requiredOptions: [
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
        ]
    },
    {
        id: 1,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        project: { display: true, edit: false },
        numberFloor: { display: true, isBuildingFloor: true },
        floor: true,
        position: false,
        mapCode: false,
        landCode: false,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['buildingId', 'modelCode', 'houseNumber', 'floorSize', 'bedRooms', 'bathRooms', 'floor'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'modelCode',
                name: 'Mã căn hộ',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floor',
                name: 'Vị trí (Tầng / Căn hộ)'

            },
        ]
    },
    {
        id: 2,
        houseNumber: true,
        building: { display: false, buildingBlock: false, modelCode: false},
        project: { display: false, edit: false },
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber', 'lotSize', 'floorSize', 'sizeLength', 'sizeWidth', 'numberFloor', 'bedRooms', 'bathRooms', 'position'],
        requiredOptions: [
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            },
        ]
    },
    {
        id: 3,
        houseNumber: true,
        building: { display: false, buildingBlock: false, modelCode: false},
        project: { display: false, edit: false },
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber', 'lotSize', 'floorSize', 'sizeLength', 'sizeWidth', 'numberFloor', 'bedRooms', 'bathRooms', 'position'],
        requiredOptions: [
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            },
        ]
    },
    {
        id: 4,
        houseNumber: false,
        building: { display: false, buildingBlock: false, modelCode: false},
        project: { display: true, edit: true },
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['projectId', 'bedRooms', 'bathRooms', 'position', 'floorSize', 'numberFloor', 'sizeLength', 'sizeWidth', 'lotSize'],
        requiredOptions: [
            {
                id: 'projectId',
                name: 'Dự án',
                optionsErr: []
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            }
        ]

    },
    {
        id: 5,
        houseNumber: true,
        building: { display: false, buildingBlock: false, modelCode: false},
        project: { display: false, edit: false },
        hideStatusQuoId: true,
        numberFloor: { display: false, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: false,
        bathRooms: false,
        struct: false,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['landCode', 'mapCode', 'lotSize', 'sizeLength', 'sizeWidth', 'position'],
        requiredOptions: [
            {
                id: 'landCode',
                name: 'Số thửa',
                optionsErr: []
            },
            {
                id: 'mapCode',
                name: 'Tờ bản đồ',
                optionsErr: []
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí',
                optionsErr: []
            }
        ]
    },
    {
        id: 6,
        project: { display: true, edit: true },
        building: { display: false, buildingBlock: false, modelCode: false},
        houseNumber: true,
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: false,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: false,
        bathRooms: false,
        struct: false,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['projectId', 'lotSize', 'sizeLength', 'sizeWidth', 'landCode', 'mapCode', 'position'],
        requiredOptions: [
            {
                id: 'projectId',
                name: 'Dự án',
                optionsErr: []
            },
            {
                id: 'landCode',
                name: 'Số thửa',
                optionsErr: []
            },
            {
                id: 'mapCode',
                name: 'Tờ bản đồ',
                optionsErr: []
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí',
                optionsErr: []
            }
        ]
    },
    {
        id: 7,
        building: { display: true, buildingBlock: true, modelCode: true},
        houseNumber: true,
        project: { display: true, edit: false },
        numberFloor: { display: true, isBuildingFloor: true },
        floor: true,
        position: false,
        mapCode: false,
        landCode: false,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['buildingId', 'modelCode', 'houseNumber', 'bedRooms', 'bathRooms', 'floor', 'floorSize'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'modelCode',
                name: 'Mã căn hộ',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floor',
                name: 'Vị trí (Tầng / Căn hộ)'
            },
        ]
    },
    {
        id: 8,
        project: { display: false, edit: false },
        building: { display: false, buildingBlock: false, modelCode: false},
        houseNumber: true,
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber', 'floorSize', 'lotSize', 'bedRooms', 'bathRooms', 'sizeLength', 'sizeWidth', 'numberFloor', 'position'],
        requiredOptions: [
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }

        ]
    },
    {
        id: 9,
        project: { display: false, edit: false },
        building: { display: false, buildingBlock: false, modelCode: false},
        houseNumber: true,
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber', 'floorSize', 'lotSize', 'bedRooms', 'bathRooms', 'sizeLength', 'sizeWidth', 'numberFloor', 'position'],
        requiredOptions: [
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }

        ]
    },
    {
        id: 10,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        project: { display: true, edit: false },
        numberFloor: { display: true, isBuildingFloor: true },
        floor: true,
        position: false,
        mapCode: false,
        landCode: false,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['buildingId', 'modelCode', 'houseNumber', 'floorSize', 'floor'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'modelCode',
                name: 'Mã căn hộ',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floor',
                name: 'Vị trí (Tầng / Căn hộ)'

            },
        ]
    },
    {
        id: 11,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        numberFloor: { display: true, isBuildingFloor: true },
        project: { display: false, edit: false },
        floor: true,
        position: true,
        mapCode: false,
        landCode: false,
        frontSide: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber', 'floorSize', 'position', 'roadFrontageWidth'],
        requiredOptions: [
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí',
                optionsErr: [],
            }
        ]
    },
    {
        id: 12,
        houseNumber: true,
        building: { display: false, buildingBlock: false, modelCode: false},
        project: { display: false, edit: false },
        floor: true,
        numberFloor: { display: false, isBuildingFloor: false },
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber', 'floorSize', 'sizeLength', 'sizeWidth', 'position'],
        requiredOptions: [
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí',
                optionsErr: []
            },
        ]
    },
    {
        id: 13,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        project: { display: true, edit: false },
        numberFloor: { display: true, isBuildingFloor: true },
        floor: true,
        position: false,
        mapCode: false,
        landCode: false,
        lotSize: false,
        floorSize: true,
        sizeLength: false,
        sizeWidth: false,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['buildingId', 'modelCode', 'houseNumber', 'floorSize', 'floor'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'modelCode',
                name: 'Mã căn hộ',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floor',
                name: 'Vị trí (Tầng / Căn hộ)'
            },
        ]
    },
    {
        id: 14,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        project: { display: true, edit: false },
        numberFloor: { display: true, isBuildingFloor: true },
        floor: true,
        position: false,
        mapCode: false,
        landCode: false,
        lotSize: false,
        floorSize: true,
        sizeLength: false,
        sizeWidth: false,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['buildingId', 'modelCode', 'houseNumber', 'floorSize', 'bedRooms', 'bathRooms', 'floor'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'modelCode',
                name: 'Mã căn hộ',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floor',
                name: 'Vị trí (Tầng / Căn hộ)'
            },
        ]
    },
    {
        id: 15,
        houseNumber: true,
        building: { display: true, buildingBlock: false, modelCode: true},
        project: { display: true, edit: true },
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: false,
        landCode: false,
        lotSize: false,
        floorSize: true,
        sizeLength: false,
        sizeWidth: false,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['projectId', 'houseNumber', 'floorSize', 'bedRooms', 'bathRooms', 'position'],
        requiredOptions: [
            {
                id: 'projectId',
                name: 'Dự án',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }
        ]
    },
    {
        id: 16,
        project: { display: true, edit: true },
        building: { display: false, buildingBlock: false, modelCode: false},
        houseNumber: true,
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['projectId', 'houseNumber', 'lotSize', 'floorSize', 'numberFloor', 'sizeLength', 'sizeWidth', 'bedRooms', 'bathRooms', 'position'],
        requiredOptions: [
            {
                id: 'projectId',
                name: 'Dự án',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }
        ]
    },
    {
        id: 17,
        project: { display: true, edit: true },
        building: { display: false, buildingBlock: false, modelCode: false},
        houseNumber: true,
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['projectId', 'houseNumber', 'lotSize', 'floorSize', 'numberFloor', 'sizeLength', 'sizeWidth', 'bedRooms', 'bathRooms', 'position'],
        requiredOptions: [
            {
                id: 'projectId',
                name: 'Dự án',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }
        ]
    },
    {
        id: 18,
        project: { display: false, edit: false },
        building: { display: false, buildingBlock: false, modelCode: false},
        houseNumber: true,
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber', 'lotSize', 'floorSize', 'sizeLength', 'sizeWidth', 'position'],
        requiredOptions: [
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }
        ]
    },
    {
        id: 19,
        project: { display: false, edit: false },
        building: { display: false, buildingBlock: false, modelCode: false},
        numberFloor: { display: false, isBuildingFloor: false },
        houseNumber: false,
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: false,
        bathRooms: false,
        struct: false,
        yearBuilt: false,
        yearFixed: false,
        requiredFields: ['lotSize', 'landCode', 'mapCode', 'sizeLength', 'sizeWidth', 'position'],
        requiredOptions: [
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'landCode',
                name: 'Số thửa',
                optionsErr: []
            },
            {
                id: 'mapCode',
                name: 'Tờ bản đồ',
                optionsErr: []
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }
        ]
    },
    {
        id: 20,
        project: { display: true, edit: true },
        building: { display: false, buildingBlock: false, modelCode: false},
        houseNumber: true,
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['projectId', 'houseNumber', 'lotSize', 'floorSize', 'sizeLength', 'sizeWidth', 'numberFloor', 'bedRooms', 'bathRooms', 'position'],
        requiredOptions: [
            {
                id: 'projectId',
                name: 'Dự án',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'numberFloor',
                name: 'Số lầu',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }
        ]
    },
    {
        id: 21,
        project: { display: false, edit: false },
        building: { display: false, buildingBlock: false, modelCode: false},
        houseNumber: true,
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber', 'lotSize', 'floorSize', 'sizeLength', 'sizeWidth', 'position'],
        requiredOptions: [
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }
        ]
    },
    {
        id: 22,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        project: { display: true, edit: false },
        numberFloor: { display: true, isBuildingFloor: true },
        floor: true,
        position: false,
        mapCode: false,
        landCode: false,
        lotSize: false,
        floorSize: true,
        sizeLength: false,
        sizeWidth: false,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['buildingId', 'modelCode', 'houseNumber', 'floorSize', 'bedRooms', 'bathRooms', 'floor'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'modelCode',
                name: 'Mã căn hộ',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floor',
                name: 'Vị trí (Tầng / Căn hộ)'

            },
        ]
    },
    {
        id: 23,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        project: { display: true, edit: false },
        numberFloor: { display: true, isBuildingFloor: true },
        floor: true,
        position: false,
        mapCode: false,
        landCode: false,
        lotSize: false,
        floorSize: true,
        sizeLength: false,
        sizeWidth: false,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['buildingId', 'modelCode', 'houseNumber', 'floorSize', 'bedRooms', 'bathRooms', 'floor'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'modelCode',
                name: 'Mã căn hộ',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floor',
                name: 'Vị trí (Tầng / Căn hộ)'

            },
        ]
    },
    {
        id: 24,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        project: { display: true, edit: false },
        numberFloor: { display: true, isBuildingFloor: true },
        floor: true,
        position: false,
        mapCode: false,
        landCode: false,
        lotSize: false,
        floorSize: true,
        sizeLength: false,
        sizeWidth: false,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['buildingId', 'modelCode', 'houseNumber', 'floorSize', 'bedRooms', 'bathRooms', 'floor'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'modelCode',
                name: 'Mã căn hộ',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floor',
                name: 'Vị trí (Tầng / Căn hộ)'

            },
        ]
    },
    {
        id: 25,
        houseNumber: true,
        numberFloor: { display: true, isBuildingFloor: false },
        building: { display: true, buildingBlock: false, modelCode: true},
        project: { display: true, edit: true },
        floor: false,
        position: true,
        mapCode: false,
        landCode: false,
        lotSize: false,
        floorSize: true,
        sizeLength: false,
        sizeWidth: false,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['projectId', 'houseNumber', 'floorSize', 'bedRooms', 'bathRooms'],
        requiredOptions: [
            {
                id: 'projectId',
                name: 'Dự án',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'bedRooms',
                name: 'Số phòng ngủ',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'bathRooms',
                name: 'Số phòng wc',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
        ]
    },
    {
        id: 26,
        houseNumber: true,
        building: { display: true, buildingBlock: true, modelCode: true},
        project: { display: true, edit: false },
        numberFloor: { display: true, isBuildingFloor: true },
        floor: true,
        position: false,
        mapCode: false,
        landCode: false,
        lotSize: false,
        floorSize: true,
        sizeLength: false,
        sizeWidth: false,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['buildingId', 'modelCode', 'houseNumber', 'floorSize', 'floor'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'modelCode',
                name: 'Mã căn hộ',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'floor',
                name: 'Vị trí (Tầng / Căn hộ)'

            },
        ]
    },
    {
        id: 27,
        project: { display: false, edit: false },
        houseNumber: false,
        building: { display: false, buildingBlock: false, modelCode: false},
        floor: false,
        numberFloor: { display: false, isBuildingFloor: false },
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: false,
        bathRooms: false,
        struct: false,
        yearBuilt: false,
        yearFixed: false,
        requiredFields: ['lotSize', 'sizeLength', 'sizeWidth', 'position'],
        requiredOptions: [
            {
                id: 'lotSize',
                name: 'Diện tích đất',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeLength',
                name: 'Chiều dài',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'sizeWidth',
                name: 'Chiều rộng',
                optionsErr: [
                    'notNegative',
                ]
            },
            {
                id: 'position',
                name: 'Vị trí'
            }
        ]
    },
    {
        id: 28,
        houseNumber: true,
        building: { display: false, buildingBlock: false, modelCode: false},
        project: { display: false, edit: false },
        numberFloor: { display: true, isBuildingFloor: false },
        floor: false,
        position: true,
        mapCode: true,
        landCode: true,
        lotSize: true,
        floorSize: true,
        sizeLength: true,
        sizeWidth: true,
        bedRooms: true,
        bathRooms: true,
        struct: true,
        yearBuilt: true,
        yearFixed: true,
        requiredFields: ['houseNumber', 'floorSize'],
        requiredOptions: [
            {
                id: 'buildingId',
                name: 'Building',
                optionsErr: []
            },
            {
                id: 'houseNumber',
                name: 'Số nhà',
                optionsErr: []
            },
            {
                id: 'floorSize',
                name: 'Diện tích sử dụng',
                optionsErr: [
                    'notNegative',
                ]
            },
        ]
    }
];
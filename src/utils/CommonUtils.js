import { map, cloneDeep } from "lodash"

import { DEF_GROUP_FILTER_FROM_TO, DEF_PRIVATE_LISTING } from "Commons/constants/keys"

export function getSelectedOptions(key, options){
    options = options.filter((item)=>{
        return item.value.toString() == (key == 0 || key ? key.toString() : null) ;
    })
    return options.length>0 ? options[0] : null;
}

export const NumberInputUtil = {
    removeThoundsand: function (text, separator = ',') {
        const ex = new RegExp(separator, 'g');
        return text.toString().replace(ex, '');
    },
    arrNumber: ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'],
    readDozens: function (num, bol) {
        let str = "";
        let dozen = Math.floor(num / 10);
        let unit = num % 10;
        if (dozen > 1) {
            str = " " + this.arrNumber[dozen] + " mươi";
            if (unit == 1) {
                str += " mốt";
            }
        } else if (dozen == 1) {
            str = " mười";
            if (unit == 1) {
                str += " một";
            }
        } else if (bol && unit > 0) {
            str = " lẻ";
        }
        if (unit == 5 && dozen >= 1) {
            str += " lăm";
        } else if (unit > 1 || (unit == 1 && dozen == 0)) {
            str += " " + this.arrNumber[unit];
        }
        return str;
    },
    readBlock: function (num, bol) {
        let str = "";
        let hundred = Math.floor(num / 100);
        num = num % 100;
        if (bol || hundred > 0) {
            str = " " + this.arrNumber[hundred] + " trăm";
            str += this.readDozens(num, true);
        } else {
            str = this.readDozens(num, false);
        }
        return str;
    },
    readMillions: function (num, bol) {
        let str = "";
        let million = Math.floor(num / 1000000);
        num = num % 1000000;
        if (million > 0) {
            str = this.readBlock(million, bol) + " triệu";
            bol = true;
        }
        let thousand = Math.floor(num / 1000);
        num = num % 1000;
        if (thousand > 0) {
            str += this.readBlock(thousand, bol) + " ngàn";
            bol = true;
        }
        if (num > 0) {
            str += this.readBlock(num, bol);
        }
        return str;
    },
    numberToText: function (number) {
        if (number == 0) return this.arrNumber[0];
        let str = "", strBillion = "";
        do {
            let billion = number % 1000000000;
            number = Math.floor(number / 1000000000);
            if (number > 0) {
                str = this.readMillions(billion, true) + strBillion + str;
            } else {
                str = this.readMillions(billion, false) + strBillion + str;
            }
            strBillion = " tỷ";
        } while (number > 0);
        return str + " đồng";
    },
    numberToLabel: function (selector) {
        if ($(selector).length > 0) {
            let data = $(selector).val().replace(/\,/g, '');
            let content = $(selector).val().length > 0 ? this.numberToText(data) : "";
            let element = $(selector).parent().find(".lblTextNumber");
            if (element.length > 0) {
                element.html(this.capitalize(content.trim()));
            } else {
                $("<label class='lblTextNumber' style='font-weight:300;font-style:italic;font-size: 14px;color: #676767;'>" + this.capitalize(content.trim()) + "</label>").insertAfter(selector);
            }
        }
    },
    capitalize: function (s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
};

export const toggleCheckbox = (listData, currentTarget, childKey, parentKey) => {
    const parseItem = JSON.parse(currentTarget.getAttribute('item'))
    const getSelectedCurrent = currentTarget.id.split('-')
    const getListsCurrentKey = getSelectedCurrent[0].replace('Type', 'sList')

    let getIsChecked = false
    const groupFilterCurrentTarget = listData.groupFilter[getListsCurrentKey][currentTarget.id]
    const selectedCurrentTarget = listData.selectedFilterParams[getListsCurrentKey]

    if (currentTarget.checked) {
        getIsChecked = true

        groupFilterCurrentTarget.checked = getIsChecked

        // apply for selected params to post data
        if (isArray(selectedCurrentTarget)) {
            listData.selectedFilterParams[getListsCurrentKey] = [
                ...selectedCurrentTarget,
                parseItem.id
            ]
        } else {
            listData.selectedFilterParams[getListsCurrentKey] = parseItem.id
        }
    } else {
        groupFilterCurrentTarget.checked = getIsChecked
        selectedCurrentTarget.splice(selectedCurrentTarget.indexOf(parseItem.id), 1)
    }

    if (childKey) {
        const getListsChildKey = childKey.replace('Type', 'sList')
        map(listData.groupFilter[getListsChildKey], (item, k) => {
            // only get value if not existing in current data
            if (item.parentId === parseItem.id) {
                item.checked = getIsChecked

                // apply for selected params to post data
                const selectedChildItems = listData.selectedFilterParams[getListsChildKey]
                if (getIsChecked) {
                    listData.selectedFilterParams[getListsChildKey] = [
                        ...selectedChildItems,
                        item.id
                    ]
                } else {
                    selectedChildItems.splice(selectedChildItems.indexOf(item.id), 1)
                }
            }
        })
    }

    if (parentKey) {
        const getListsParentKey = parentKey.replace('Type', 'sList')
        const getItemParentKey = `${parentKey}-${parseItem.parentId}`
        listData.groupFilter[getListsParentKey][getItemParentKey].checked = true

        // apply for selected params to post data
        const selectedparentItems = listData.selectedFilterParams[getListsParentKey]
        if (getIsChecked) {
            // only get value if not existing in current data
            if (selectedparentItems.indexOf(parseItem.parentId) === -1) {
                listData.selectedFilterParams[getListsParentKey] = [
                    ...selectedparentItems,
                    parseItem.parentId
                ]
            }
        }
    }

    return listData
}

export const setValueFromTo = (listData, currentTarget, keyIndex) => {
    listData.groupFilter.fromTo[keyIndex][currentTarget.name] = currentTarget.value
    listData.selectedFilterParams.fromTo = []
    map(listData.groupFilter.fromTo, (item, k) => {
        listData.selectedFilterParams.fromTo.push(item)
    })

    return listData
}

const formatData = (data, item, fieldKey, isReset, isSearch, defaultValue) => {
    if (!data.selectedFilterParams || !data.selectedFilterParams[fieldKey]) {
        data.selectedFilterParams = {
            ...data.selectedFilterParams,
           [fieldKey]: defaultValue
        }
    }
    const filterredSelectedItem = data.selectedFilterParams[fieldKey]

    if (!isSearch) {
        if (filterredSelectedItem && filterredSelectedItem.indexOf(item.id) > -1) {
            item.checked = true
        }
    }

    if (isReset) {
        item.checked = null
        data.selectedFilterParams[fieldKey]= defaultValue
    }

    data.groupFilter[fieldKey]= {
        ...data.groupFilter[fieldKey],
        [`${item.type}-${item.id}`]: item,
    }

    return data
}
export const formatGroupDataFilter = (data, isReset, isSearch) => {
    data.groupFilter = {
        fromTo:  cloneDeep(DEF_GROUP_FILTER_FROM_TO),
        privateListing: null,
        classifysList: null,
    }
    data.filterParams.map((item, k) => {
        switch (item.type) {
            case "districtType":
                data = formatData(data, item, 'districtsList', isReset, isSearch, [])

                break
            case "wardType":
                data = formatData(data, item, 'wardsList', isReset, isSearch, [])
                
                break
            case "directionType":
                data = formatData(data, item, 'directionsList', isReset, isSearch, [])
                
                break
            case "alley":
            case "length":
            case "width":
            case "yearbuilt":
                if (!data.selectedFilterParams || !data.selectedFilterParams.fromTo) {
                    data.selectedFilterParams = {
                        ...data.selectedFilterParams,
                        fromTo: {}
                    }
                }

                const selectedFromTo = data.selectedFilterParams.fromTo
                if (!isSearch) {
                    // get response value to groupFilter FromTo
                    if (isArray(selectedFromTo)) {
                        selectedFromTo.map(ft => {
                            if (ft.type === item.type) {
                                data.groupFilter.fromTo[item.type] = ft
                            }
                        })
                    }
                }
                
                if (isReset) {
                    data.selectedFilterParams.fromTo = DEF_GROUP_FILTER_FROM_TO
                }

                data.groupFilter.fromTo[item.type] = item

                break
            case "privateListing":
                data = formatData(data, item, 'privateListing', isReset, isSearch, '')

                break
            case "classifyType":
                data = formatData(data, item, 'classifysList', isReset, isSearch, [])

                break
            case "isOwnerType":
                data = formatData(data, item, 'isOwnersList', isReset, isSearch, [])

                break
            default:
                break
        }
    })

    return data
}
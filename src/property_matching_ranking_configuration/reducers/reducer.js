import * as types from "./../actions/actionTypes";
var defaultState = {
    criterialOptions: [],
    criteriaItemList: [],
    criterialSelected: [],
    criteriaItems: [],
    tabId: 1,
    propId: 1,
    totalWeight: 0
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_CRITERIA_OPTIONS: {
            let newData = [];
            if (Array.isArray(action.data)) {
                newData = action.data;
            }
            return { ...state, criterialOptions: newData };
        }
        case types.GET_CRITERIA_ITEM: {
            let newData = [];
            if (Array.isArray(action.data)) {
                newData = action.data;
            }
            var totalWeight = 0;
            newData.forEach((item, index) => {
                if(item[Object.keys(item)].weight == "")
                    item[Object.keys(item)].weight = 0;
                totalWeight += parseFloat(item[Object.keys(item)].weight);
            });
            return { ...state, criteriaItemList: newData, totalWeight: totalWeight };
        }
        case types.SET_TAB_ID_PROP_ID: {
            return {
                ...state,
                tabId: action.data.screenId,
                propId: action.data.propId,
            };
        }
        case types.GET_CRITERIA_OPTION_DETAIL: {
            let newData = null;
            if (action.data) {
                newData = action.data;
            }
            var newCriteriaItemList = [...state.criteriaItemList, newData]
            var totalWeight = 0;
            newCriteriaItemList.forEach((item, index) => {
                totalWeight += parseFloat(item[Object.keys(item)].weight == "" ? 0 : item[Object.keys(item)].weight);
            });
            return {
                ...state,
                criteriaItemList: newCriteriaItemList,
                totalWeight: totalWeight
            };
        }
        case types.SET_CRITERIA_OPTION_SELECTED: {
            const criterialOptions = state.criterialOptions.filter(item => item.value != String(action.data.value));
            return {...state, criterialSelected: [action.data], criterialOptions};
        }
        case types.ON_CRITERIA_ITEM_CHANGE: {
            const {itemId, value, fieldName, sub, i, valid} = action.data;
            const criteriaItemList = [...state.criteriaItemList];
            const criteriaItem = criteriaItemList.find((item) => Object.keys(item) == String(itemId));
            const valueCriteriaItem = Object.values(criteriaItem)[0];
            const rows = valueCriteriaItem.items.rowData;
            if(sub != null) {
                rows[i][sub].number = value;
                if(valid) {
                    if(!value.match(valueCriteriaItem[`${sub}Validator`].regex)) {
                    // if(!valueCriteriaItem[`${sub}Validator`].regex.test(value)) {
                        rows[i][sub].number = "0";
                    }
                }
            } else {
                valueCriteriaItem[fieldName] = value;
                if (valid) {
                    if (!value.match(valueCriteriaItem.validator.regex)) {
                        valueCriteriaItem[fieldName] = "0";
                    }
                }
            }
            let totalWeight = 0;
            criteriaItemList.forEach(item => {
                totalWeight += parseFloat(Object.values(item)[0].weight);
            });
            return {...state, criteriaItemList, totalWeight};
        }
        case types.ADD_CRITERIA_SUB_ITEM: {
            const criteriaItemList = [...state.criteriaItemList];
            const criteriaItem = criteriaItemList.find(item => Object.keys(item) == String(action.data.itemId[0]));
            const newSubItem = {
                score: {number: 0},
                value: {number: 0}
            };
            Object.values(criteriaItem)[0].items.rowData.push(newSubItem);
            return {...state, criteriaItemList};
        }
        case types.DELETE_CRITERIA_SUB_ITEM: {
            const criteriaItemList = [...state.criteriaItemList];
            const criteriaItem = criteriaItemList.find(item => Object.keys(item) == String(action.data.itemId[0]));
            Object.values(criteriaItem)[0].items.rowData.splice(action.data.subItemId, 1);
            
            return {...state, criteriaItemList};
        }
        case types.REMOVE_CRITERIA: {
            const criteriaItemList = state.criteriaItemList.filter(item => Object.keys(item) != String(action.data.id[0]));
            let totalWeight = 0;
            criteriaItemList.forEach(item => {
                totalWeight += parseFloat(Object.values(item)[0].weight);
            });
            //add criteria
            state.criterialOptions.push({
                value: action.data.id[0],
                label: action.data.name,
            });
            return {...state, criteriaItemList, totalWeight};
        }
        default:
            return state;
    }
}

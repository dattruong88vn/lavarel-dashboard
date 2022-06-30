import React from 'react'
import { Option } from 'utils/form';

export const groupBy = (array: any, key: string): any => {
    return array.reduce((result: any, currentItem: any) => {
        (result[currentItem[key]] = result[currentItem[key]] || []).push(currentItem);
        return result;
    }, {});
};

export const handleConvertOptions = (list: Array<any>, type: string | null = null): Array<Option> => {
    let options;
    switch (type) {
        case 'member':
            options = list.map((item: any) => ({label: item.name, value: item.userId}));
            break;
        case 'district':
            options = list.map((item: any) => ({label: item.districtName, value: item.districtId}));   
            break; 
        case 'ward':
            options = list.map((item: any) => ({label: item.wardName, value: item.wardId}));   
            break;    
        case 'information':
        case 'classification':  
        case 'post':  
        case 'source':
            options = list.map((item: any) => ({label: item.name, value: item.id})); 
            break;
        case 'bpo':
        case 'closeDealType':   
        case 'labelDeal':     
            options = list.map((item: any) => ({label: item.name, value: item.code})); 
            break;
        case 'property':
            options = list.map((item: any) => ({label: item.typeName, value: item.propertyTypeID}));
            break;
        case 'property_prefix':
            options = list.map((item: any) => ({label: item.prefixName, value: item.propertyTypeId, isHighlight: !item.active}));
            break;       
        case 'center': 
            options = list.map((item: any) => ({label: item.name, value: item.tcId}));
            break;  
        case 'ba':
            options = list.map((item: any) => ({label: item.name, value: item.userId}));
            break;        
        default:
            options = list.map((item: any) => ({label: item.departmentName, value: item.departmentId})); 
            break;   
    }
    return options;
};

export const handleConvertGroupOptions = (list: Array<any>, type: string | null = null): any => {
    let group;
    let options = [];
    switch (type) {
        case 'informationSource':
            group = groupBy(list, 'parentName');
            break;  
        default:
            break;    
    }
    for (const property in group) {
        options.push({
            label: property,
            options: group[property].map((item: any) => ({label: item.name, value: `${item.id}_${item.parentId}`}))
        })
    }
    return options;
};

export const formatOptionLabel = ({ value, label, isHighlight }: any) => {
    let renderOpt = label
    if (isHighlight) {
        renderOpt = <span style={{ color: '#ccc' }}>{label}</span>
    }
    
    return renderOpt
}
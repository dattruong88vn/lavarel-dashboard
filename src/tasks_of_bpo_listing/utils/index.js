export const lastDay = (year, month) => {
    return new Date(year, month, 0).getDate()
}

export const getLastDateFromCurrentMonth = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
}

export const getStartDateFromCurrentMonth = () => {
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 999);

    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
}

export const formatDateString = (currentDate) => {
    const newDate = new Date(currentDate);

    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
}

export const groupByKey = (arr, key) => {
    let group = arr.reduce((r, a) => {
        r[a[key]] = [...r[a[key]] || [], a];
        return r;
    }, {});

    return group;
}

export const handleConvertOptions = (list, type = null) => {
    let options;
    switch (type) {
        case 'member':
            let memberItem = list.map((item) => ({label: item.name, value: item.userId}));
            options = [{ label: '--Tất cả Thành viên--', value: '' }].concat(memberItem)
            break;
        case 'team':
            let listItem = list.map((item) => ({label: item.departmentName, value: item.departmentId}));
            options = [{ label: '--Tất cả Team--', value: '' }].concat(listItem)
            break;
        case 'zone':
            let zoneItem = list.map((item) => ({label: item.departmentName, value: item.departmentId}));
            options = [{ label: '--Tất cả Zone--', value: '' }].concat(zoneItem)
            break;
        default:
            options = list.map((item) => ({label: item.departmentName, value: item.departmentId}));
            break;
    }
    return options;
};
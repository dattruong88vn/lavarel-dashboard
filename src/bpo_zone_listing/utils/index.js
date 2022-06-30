export const lastDay = (year, month) => {
    return new Date(year, month, 0).getDate()
}

export const getLastDateFromCurrentMonth = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
}

export const getStartDateFromCurrentMonth = () => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
}

export const getDateAfterDays = (startDate, days) => {
    return new Date(startDate.getTime() + parseInt(days) * 24 * 60 * 60 * 1000);
};

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
        case 'district':
            let districtItem = list.map((item) => ({label: item.districtName, value: item.districtId}));
            options = [{ label: '--Tất cả các quận--', value: '' }].concat(districtItem);
            break;
        case 'ward':
            let wardItem = list.map((item) => ({label: item.wardName, value: item.wardId}));    
            options = [{ label: '--Tất cả các phường--', value: ''}].concat(wardItem);
            break;   
        default:
            options = list.map((item) => ({label: item.departmentName, value: item.departmentId}));
            break;
    }
    return options;
};

const template401 = () =>{
    $('head').html(`
        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                color: #B0BEC5;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 72px;
                margin-bottom: 40px;
            }
        </style>
    `)
    $('body').html(`
        <div class="container">
            <div class="content">
                <div class="title">401 Forbidden.</div>
                <p style="text-align: center; color: black">Bạn không có quyền truy cập tính năng này. <a href="/">Quay trở lại</a></p>
            </div>
        </div>
    `)
}

export const pageStatusPermission = (code) => {
    switch (code) {
        case 401:
            template401();    
            break;
    
        default:
            break;
    }
}
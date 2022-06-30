import {create} from 'filepond';
import React, {useState, useEffect} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const header = [
    {name: 'checkbox', sorting: false},
    {name: 'Trang', sorting: false},
    {name: 'Tên', sorting: false},
    {name: 'Số điện thoại', sorting: true, column: 'phones'},
    {name: 'Email', sorting: false},
    {name: 'Địa chỉ', sorting: false},
    {name: 'Giá', sorting: false},
    {name: 'Quận', sorting: false},
    {name: 'Phường', sorting: false},
    {name: 'Đường', sorting: false},
    {name: 'Số nhà', sorting: false},
    {name: 'Ngày cộng dồn', sorting: true, column: 'createdDate'},
    {name: 'Trạng thái', sorting: false},
    {name: 'Hình ảnh', sorting: false},
    {name: 'Thao tác', sorting: false},
];

const allCheckOnClickHanle = (props) => {
    if (props.idsSelected.length === props.crawlerData.length) {
        props.services.onIdSelected([]);
        return;
    }
    props.services.onIdSelected(props.crawlerData.map(item => {return {id: item.id, phones: item.phones}}));
}

const columns = (props) => {
    const [currentSorting, setCurrentSorting] = useState({...props.dataPost.sort});

    const onHeadrSortClickHandle = (item) => {
        if (!item.sorting) {
            return;
        }
        if (item.column === currentSorting.columnName) {
            setCurrentSorting({...currentSorting, value: currentSorting.value === 'desc' ? 'asc' : 'desc'});
            props.services.onSortingChange({...currentSorting, value: currentSorting.value === 'desc' ? 'asc' : 'desc'});
            setTimeout(props.onSortingChange, 100);
            return;
        }
        let sorted = 'asc';
        if (item.column === 'createdDate') {
            sorted = 'desc';
        }
        setCurrentSorting({columnName: item.column, value: sorted});
        props.services.onSortingChange({columnName: item.column, value: sorted});
        setTimeout(props.onSortingChange, 100);
    }

    return header.map((item, index) => {
        if (item.name === 'checkbox') {
            if (props.isCheckAll) {
                return (
                    <th key={index}>
                        <input
                            type="checkbox"
                            onClick={e => allCheckOnClickHanle(props)}
                            checked={props.idsSelected.length > 0 && props.idsSelected.length === props.crawlerData.length}
                            alt="Chọn/hủy tất cả" />
                    </th>);
            }
            return <th key={index}></th>;
        }
        const hasSorting = item.sorting ? 'sorting' : 'sorting_disabled';
        return (
            <th key={index} className={`text-center ${hasSorting}${currentSorting.columnName === item.column ? ('_' + currentSorting.value) : ''}`} onClick={e => onHeadrSortClickHandle(item)}>{item.name}</th>
        );
    });
}

const getTemplateOfDate = time => {
    if (time) {
        const date = new Date(time).toLocaleDateString("en-GB"),
            dateParse = `${new Date(time).getFullYear()}/${new Date(time).getMonth() + 1}/${new Date(time).getDate()} 00:00:00`,
            todayParse = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 00:00:00`,
            times = Math.abs(new Date(dateParse) - new Date(todayParse)),
            days = times / (1000 * 3600 * 24);

        return {text: `${date} ${days} ngày`, days: days};
    }

    return null;
};

const CrawlerData = props => {
    const [isShowLightBox, setIsShowLightBox] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);

    const onClickImageLength = (images) => {
        setCurrentImages(images.map(i => i));
        setIsShowLightBox(true);
    }
    const onCloseLightBox = () => {
        setIsShowLightBox(false);
        setPhotoIndex(0);
        setCurrentImages([]);
    }
    const onPrevLightBox = () => {
        setPhotoIndex((photoIndex + currentImages.length - 1) % currentImages.length);
    }
    const onNextLightBox = () => {
        setPhotoIndex((photoIndex + 1) % currentImages.length);
    }
    const {crawlerData, selectOptions, activeTab, mappingFilterTab,
        showModalTransfer, showModalCancel, showModalDuplicate,
        showModalMove, services, idsSelected} = props;

    const tabList = selectOptions.tabOptions.map(item => {
        const className = item.value === activeTab ? 'active' : '';
        return (
            <li className={className} key={item.value}>
                <a href="javascript:void(0)" onClick={() => mappingFilterTab(item.value)}>{item.label}</a>
            </li>
        );
    });

    const textOfIdsSelected = idsSelected.length > 0 ? `Có ${idsSelected.length} tin được chọn` : '';

    const itemCheckOnClickHanle = item => {
        if (idsSelected.find(i => i.id === item.id)) {
            const arrId = idsSelected.filter(i => i.id !== item.id);
            services.onIdSelected(arrId);
            return;
        }
        idsSelected.push({id: item.id, phones: item.phones});
        services.onIdSelected(idsSelected.map(i => i));
    }

    const dataOfCrawler = crawlerData.map(item => {
        let bgClass = 'one-day';
        const btnTransfer = item.statusId === 1 ? (
            <span className="btn btn-primary"
                style={{marginRight: '3px'}}
                onClick={() => showModalTransfer(item)} >
                <i className="fa fa-arrow-right"></i>
            </span>
        ) : null;

        const btnCancel = item.statusId === 1 ? (
            <span className="btn btn-danger"
                style={{marginRight: '3px'}}
                onClick={() => showModalCancel([{id: item.id, phones: item.phones}], true)} >
                <i className="fa fa-times"></i>
            </span>
        ) : null;

        const btnMove = (item.statusId === 1 && activeTab !== '0' && activeTab !== '3') ? (
            <span className="btn btn-warning"
                style={{marginRight: '3px'}}
                onClick={() => showModalMove([{id: item.id, phones: item.phones}], true)} >M</span>
        ) : null;

        const getTemplateDuplicate = tab => (
            <>
                <br />
                <a href="javascript:void(0)"
                    className="check-duplicate"
                    style={{display: 'inline-block', color: 'red', fontSize: '10px'}}
                    onClick={() => showModalDuplicate(item, tab)}>
                    <i className="fa fa-times"></i> Danh sách trùng</a>
            </>
        );
        let createdDateOfCrawler = getTemplateOfDate(item.createdDate);
        if (createdDateOfCrawler) {
            if (parseInt(createdDateOfCrawler.days, 10) > 5) {
                bgClass = 'five-days'
            } else if (parseInt(createdDateOfCrawler.days, 10) > 2) {
                bgClass = 'two-days'
            }
        }
        return (
            <tr key={item.id} className={bgClass}>
                <td>
                    {item.statusId === 1 &&
                        <input
                            type="checkbox"
                            onClick={e => itemCheckOnClickHanle(item)}
                            checked={idsSelected.filter(i => i.id === item.id).length > 0}
                            value={item.id} />
                    }
                </td>
                <td><a href={item.link} target="_blank">{item.siteName}</a></td>
                <td>{item.name}</td>
                <td>
                    {item.phones.map((item, index) => (
                        <a
                            key={index}
                            href="javascript:;"
                            onClick={() => new IndexPage().callPhone(item)}
                            //href={`tel:${item}`}
                            style={{marginRight: '10px'}} >{item}</a>
                    ))}
                    {item.duplicatePhone ? getTemplateDuplicate(0) : null}
                </td>
                <td>
                    {item.email}
                    {item.duplicateEmail ? getTemplateDuplicate(1) : null}
                </td>
                <td>
                    {item.address}
                    {item.duplicateAddress ? getTemplateDuplicate(2) : null}
                </td>
                <td>{item.formatedPrice}</td>
                <td>{item.districtName}</td>
                <td>{item.wardName}</td>
                <td>{item.streetName}</td>
                <td>{item.houseNumber}</td>
                <td>{createdDateOfCrawler ? createdDateOfCrawler.text : ''}</td>
                <td>{item.statusName}</td>
                <td>
                    {item.images.length > 0 ?
                        <a href="javascript:void(0)"
                            onClick={e => onClickImageLength(item.images)}>{item.images.length}</a>
                        : item.images.length}
                </td>
                <td>{btnTransfer} {btnCancel} {btnMove}</td>
            </tr>
        );
    });

    return (
        <>
            <div className="row">
                <div className="col-xs-12">
                    <div className="nav-tabs-custom crawler-tool-tab">
                        <nav className="navbar">
                            {(activeTab !== '0' && activeTab !== '3') &&
                                <button
                                    className="btn btn-warning"
                                    onClick={() => showModalMove(idsSelected)}>Move</button>
                            }
                            &nbsp;
                            <button className="btn btn-danger" onClick={() => showModalCancel(idsSelected)}>
                                <i className="fa fa-trash-o"></i> Hủy tin</button>
                            <span style={{marginLeft: '20px'}}>{textOfIdsSelected}</span>
                        </nav>
                        <ul className="nav nav-tabs">
                            {tabList}
                        </ul>
                        <div className="tab-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                        <table className="table table-bordered table-listing dataTable no-footer">
                                            <thead>
                                                <tr>
                                                    {columns(props)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataOfCrawler}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isShowLightBox &&
                <Lightbox
                    mainSrc={currentImages[photoIndex].link}
                    nextSrc={currentImages[(photoIndex + 1) % currentImages.length].link}
                    prevSrc={currentImages[(photoIndex + currentImages.length - 1) % currentImages.length].link}
                    onCloseRequest={onCloseLightBox}
                    onMovePrevRequest={onPrevLightBox}
                    onMoveNextRequest={onNextLightBox}
                />}
        </>
    );
};

export default CrawlerData;

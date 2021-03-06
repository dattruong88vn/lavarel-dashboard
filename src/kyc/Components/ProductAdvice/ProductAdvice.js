import React, {Component, Fragment} from "react";
import Slider from "react-slick";
import {connect} from "react-redux";
import HeaderStep from './../../Containers/HeaderStep';
import ModalCalendarr from "./ModalCalendarr";
import ModalAttachFile from "./ModalAttachFile";
import moment from "moment";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import NoProduct from "./NoProduct";
import Select from 'react-select';

const styleClass = {
    display: 'none'
};

class Paginate extends Component {
    constructor(props) {
        super(props);
        this.handleClickPage = this.handleClickPage.bind(this);
        this.state = {
            block: 5,
            active: ""
        };
    }

    handleClickPage = (page) => (e) => {
        this.props.onClickPage(page);
    };

    componentDidMount() {
        $(".slide-item").first().addClass("active");
        $(".slide-item").click(function () {
            $(".slide-item").removeClass("active");
            $(this).addClass("active");
        });
    }

    render() {
        const settings = {
            dots: false,
            dotsClass: "slick-dots slick-thumb",
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        };
        const {list, current} = this.props;
        const {block} = this.state;
        let indexPage = 0;
        const pagging = list.map((it, index) => {
            if (current == (it.rlistingId)) {
                indexPage = index;
            }
            return (
                // <a className={current == (it.rlistingId) ? "paginate pg-item pg-current" : "paginate pg-item"} href="javascript:void(0)" onClick={this.handleClickPage(it.rlistingId)}>{index + 1}</a>
                <div className="slide-item" onClick={this.handleClickPage(it.rlistingId)}>
                    <img src={it.photos[0].link} alt={it.photos[0].alt} style={{maxHeight: "150px"}} />
                </div>
            )
        });

        return (

            <div className="bl-pagination">
                {/* <div className="bl-pagination-content">
                    <a className={
                        list.length > 0 && current != list[0].rlistingId ? "paginate pg-previous" : "paginate pg-previous disabled"
                    } href="javascript:void(0)"
                       onClick={this.handleClickPage(list[indexPage - 1] ? list[indexPage - 1].rlistingId : null)}
                    > &lt; Quay l???i</a> */}
                <Slider {...settings} className={'slider-for'} style={{maxHeight: "150px"}}>
                    {pagging}
                </Slider>
                {/* <a className={
                        list.length > 0 && current != list[list.length - 1].rlistingId ? "paginate pg-next" : "paginate pg-next disabled"
                    }
                       href="javascript:void(0)"
                       onClick={this.handleClickPage(list[indexPage + 1] ? list[indexPage + 1].rlistingId : null)}
                    > Ti???p t???c &gt;</a>
                </div> */}
            </div>

        );
    }
}
class ProductAdvice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            showPhoto: false,
            indexSlider: 0,
            titleButton: 'Ch???n ??i xem',
            reasonDenyTourValue: null,
            commentDenyTourValue: null,
        };
        this.stored = {
            currentListing: 1,
        };
        this.onClickPage = this.onClickPage.bind(this);
        this.handleClickBtnReconfirm = this.handleClickBtnReconfirm.bind(this);
        this.handleClickRemoveListing = this.handleClickRemoveListing.bind(this);
        this.handleClickAddListingBookTour = this.handleClickAddListingBookTour.bind(this);
        this.handleClickBookTour = this.handleClickBookTour.bind(this);
        this.handleClickConvinceBookTour = this.handleClickConvinceBookTour.bind(this);
        this.handleChangePhotoIndex = this.handleChangePhotoIndex.bind(this);
        this.handleChangeShowPhoto = this.handleChangeShowPhoto.bind(this);
        this.bindEvents();
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }
    componentDidMount() {
        const dealId = this.props.headerStep.dealId;        
        this.props.functionServices.fetchRelatedListing({dealId});
        this.props.functionServices.fetchReasonDenyTour();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.headerStep.dealId !== nextProps.headerStep.dealId) {
            const dealId = nextProps.headerStep.dealId;
            this.props.functionServices.fetchRelatedListing({dealId});
            this.props.functionServices.fetchBookTourPermission({dealId});
        }
        if (this.props.contentStored.currentListing !== nextProps.contentStored.currentListing && nextProps.contentStored.currentListing !== null) {
            this.props.functionServices.fetchDetailListing({dealId, rlistingId: nextProps.contentStored.currentListing});
        }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }
    onClickPage(currentListing) {
        this.setState({
            indexSlider: 0
        });
        this.props.functionServices.onChangeIndexListing(currentListing);
    }
    onChangeFeedback = (feedbackListingId) => {
        this.props.functionServices.onChangeFeedback({
            feedbackListingId: feedbackListingId,
            dealId: this.props.headerStep.dealId
        });
    };
    handleClickBtnReconfirm = (dealId) => e => {
        showPropzyConfirm({
            message: 'B???n c?? mu???n x??c nh???n l???i nhu c???u ?',
            okCallback: function () {
                window.location.replace(`/kyc/buyer-confirm-requirements?dealId=${dealId}`);
            }
        });
    };
    handleClickRemoveListing = () => {
        const that = this;
        const rlisting = this.props.contentStored.currentListing;
        const listingsTour = this.props.contentStored.listingsTour;
        const {dealId} = this.props.headerStep;
        if (rlisting != null) {
            const isInTour = listingsTour.find(it => it == rlisting);
            if (!isInTour) {
                // modal c?? mu???n x??a listing n??y ra kh???i danh s??ch tour kh??ng

                showPropzyConfirm({
                    message: 'B???n c?? mu???n x??a listing n??y kh??ng ?',
                    okCallback: function () {
                        that.props.functionServices.onRemoveListing({
                            dealId: dealId,
                            rlistingIds: [rlisting]
                        });
                    }
                });
            } else {
                // modal c?? mu???n x??a listing n??y kh??ng
                propzyNotifyAlert({type: "propzy-notify-warning", message: 'Kh??ng th??? x??a listing do listing ???? n???m trong danh s??ch book tour'});
            }
        } else {
            propzyNotifyAlert({type: "propzy-notify-warning", message: 'Kh??ng c?? listing ????? x??a'});
        }
    };
    handleClickAddListingBookTour = () => {
        const that = this;
        const rlisting = this.props.contentStored.currentListing;
        const listingsTour = this.props.contentStored.listingsTour;
        if (rlisting != null) {
            const isInTour = listingsTour.find(it => it == rlisting);
            if (isInTour) {
                that.props.functionServices.onRemoveListingBookTour(rlisting);
                that.setState({titleButton: 'Ch???n ??i xem'});
                propzyNotifyAlert({type: "propzy-notify-success", message: '???? x??a listing ra kh???i danh s??ch tour'});
            } else {
                propzyNotifyAlert({type: "propzy-notify-success", message: '???? th??m listing v??o danh s??ch book tour'});
                that.props.functionServices.onAddListingBookTour(rlisting);
                that.setState({titleButton: '???? ch???n ??i xem'});
            }

        } else {
            propzyNotifyAlert({type: "propzy-notify-warning", message: 'Kh??ng c?? listing ????? th??m v??o danh s??ch  tour'});
        }
    };

    handleClickBookTour() {
        const that = this;
        const {customerHomeKyc, dealId} = this.props.headerStep;
        const {listingsTour, bookTourPermission} = this.props.contentStored;
        that.onChangeFeedback(1559);

        if(bookTourPermission && bookTourPermission.isPendingDeal) {
            showPropzyAlert(`Kh??ng th??? ?????t l???ch xem do deal ??ang ??? tr???ng th??i <strong>${bookTourPermission.dealStatus}</strong>`)
            return false
        }
        if(bookTourPermission && !bookTourPermission.addTour) {
            showPropzyAlert("B???n kh??ng c?? quy???n th???c hi???n t??nh n??ng n??y.")
            return false
        }

        if (listingsTour.length > 0) {
            $("#formMakeSchedule #customerId").val(customerHomeKyc.customerId);
            $("#formMakeSchedule #customerName").html(customerHomeKyc.customerName);
            $("#formMakeSchedule #dealId").val(dealId);
            $("#formMakeSchedule .customerName").html(customerHomeKyc.customerHomeKyc);
            Schedule.showModalByListingIds({
                "listingIds": listingsTour,
                onSave: (respose) => {
                    window.location.replace(`/kyc/process-procedures?dealId=${dealId}`);
                }
            });
        } else {
            propzyNotifyAlert({type: "propzy-notify-warning", message: 'Kh??ng c?? listing ????? book tour'});
        }

    }
    handleClickSendCheckEmpty = (e) => {
        const {customerHomeKyc, dealId} = this.props.headerStep;
        const {currentListing} = this.props.contentStored;
        const data = {
            dealId: dealId,
            leadId: customerHomeKyc.leadId,
            note: null,
            source: 'kyc',
            checkListings: [
                {
                    "rlistingId": currentListing,
                    "noteSendCheck": "",
                    "scheduleTimeFrom": null,
                    "scheduleTimeTo": null
                }
            ]
        };
        this.props.functionServices.onSendCheckEmpty(data);
    };
    handleClickConvinceBookTour = (e) => {
        const that = this;
        const listingsTour = that.props.contentStored.listingsTour;
        window.location.replace(`/kyc/process-procedures?dealId=${dealId}&listings=${listingsTour.join('-')}`);

    };
    handleChangePhotoIndex(index) {
        this.setState({
            photoIndex: index
        });
    }

    handleChangeShowPhoto = (value) => e => {
        this.setState({
            showPhoto: !!value
        });
        if (value) {
            $("body").css({"overflow-y": "hidden"})
        } else {
            $("body").css({"overflow-y": "auto"})
        }
    };

    bindEvents() {
        $(document).off('.pinkBookPhoto360').on('click', '.pinkBookPhoto360', function (e) {
            e.preventDefault();
            initPhoto360(this);
        });
    }

    handleChangeTab(isClickHeader, callbackFromHeader) {
        this.onChangeFeedback(1558);
        callbackFromHeader(isClickHeader);
    }

    saveDenyTour() {
        if (this.state.reasonDenyTourValue == null) {
            propzyNotifyAlert({type: "propzy-notify-warning", message: 'Vui l??ng ch???n l?? do kh??ng ??i tour!'});
            return;
        }
        let data = {
            "dealId": parseInt(dealId),
            "reasonId": this.state.reasonDenyTourValue.value,
            "reasonNote": this.state.commentDenyTourValue
        }
        this.props.functionServices.saveDenyTour(data);
    }

    render() {

        const {customerHomeKyc, dealId} = this.props.headerStep;
        const {rListings, feedbackListingId, detailListing, currentListing, listingsTour, reasonDenyTour, bookTourPermission} = this.props.contentStored;

        const advantageList = detailListing.advantageList ? detailListing.advantageList.map((it, inx) => {
            return (
                <div className="col-sm-4 col-lg-3 col-md-4 col-xs-6" key={it.advantageId}>
                    <p>- {it.advantageName}</p>
                </div>
            )
        }) : [];
        let photos = detailListing.photos ? [...detailListing.photos] : [];

        //let photos = detailListing.pinkBookPhotos ? photos.concat(detailListing.pinkBookPhotos.map(it=> ({link : it}))): [...photos];
        let attachPhoto = detailListing.pinkBookPhotos;
        attachPhoto = detailListing.plan && detailListing.plan.photos.length > 0 ? attachPhoto.concat(detailListing.plan.photos.map(o => o.link)) : attachPhoto;

        const images = photos.map(it => it.link);
        const captions = photos.map((it, key) => `${key + 1}` + '\/' + `${photos.length}`);
        const {photoIndex, titleButton} = this.state;
        const slider = photos.length ? photos.map(it => {
            return (
                <div className="slide-item">
                    <img src={it.link} alt={it.caption} />
                </div>
            )
        }) : [];
        const settings = {
            afterChange: (index) => {
                this.setState({
                    indexSlider: index
                })
            },
            dots: false,
            dotsClass: "slick-dots slick-thumb",
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Fragment>
                <div className="wrapper-kyc">
                    <HeaderStep current={3} handleChangeTab={this.handleChangeTab} />
                    <div className="content-kyc">
                        <div className="box-kyc">
                            <div className="box-kyc">
                                <h1 className="heading">DANH S??CH S???N PH???M</h1>
                                <p className='decs'>c?? <strong> {rListings.length}</strong> s???n ph???m ph?? h???p v???i nhu c???u c???a kh??ch h??ng</p>
                            </div>
                            <div className="box-kyc-body">
                                {rListings.length == 0 && <NoProduct />}
                                {rListings.length > 0 && (<Fragment><div className="row form-group">
                                    <Paginate
                                        current={currentListing}
                                        list={rListings}
                                        onClickPage={this.onClickPage}
                                    />
                                </div>
                                    <br />
                                    <br />
                                    <br />
                                    <div className="row form-group">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="slider-wrapper">

                                                {detailListing.rlistingId && (<span className="slider-listing">{detailListing.rlistingId}</span>)}
                                                {slider.length > 0 && (<span className="slider-fullscreen" onClick={this.handleChangeShowPhoto(true)}>FullScreen</span>)}

                                                <Slider {...settings} className={'slider-for'}>
                                                    {slider}
                                                </Slider>
                                                {slider.length > 0 && (<span className="slider-info" > {this.state.indexSlider + 1} / { slider.length}</span>)}
                                                {detailListing.virtualTour360s && detailListing.virtualTour360s.length > 0 && this.state.indexSlider == 0 && <a href="javascript:void(0);" className="pinkBookPhoto360" data-camera360={detailListing.virtualTour360s[0]}><img src="/images/img-360.gif" alt="" /></a>}

                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="row">
                                                        <div className="col-sm-12 col-md-6">
                                                            <p><label>Gi??:</label> {detailListing.formatPrice ? detailListing.formatPrice : ''}</p>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6">
                                                            <p><label>D??i - R???ng:</label> {detailListing.sizeLength ? detailListing.sizeLength : ''} - {detailListing.sizeWidth ? detailListing.sizeWidth : ''} m</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-sm-12">
                                                    <div className="row ">
                                                        <div className="col-sm-6">
                                                            <p><label>Di???n t??ch s??? d???ng:</label> {detailListing.floorSize ? detailListing.floorSize : ''} m<sup>2</sup></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p><label>Ph??ng ng??? - WC:</label> {detailListing.bedrooms ? detailListing.bedrooms : ''} - {detailListing.bathrooms ? detailListing.bathrooms : ' '}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" col-sm-12">
                                                    <div className="row ">
                                                        <div className="col-sm-6">
                                                            <p><label>K???t c???u:</label> {detailListing.formatNumberFloor ? detailListing.formatNumberFloor : ' '}</p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p><label>H?????ng:</label> {detailListing.directionName ? detailListing.directionName : ' '}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="row ">
                                                        <div className="col-sm-12">
                                                            <p><label>V???n ????? ph??p l??:</label> {detailListing.legal ? detailListing.legal : ' '} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <p><label>?????c ??i???m t???t:</label></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {advantageList}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="row ">
                                                        <div className="col-xs-12 col-sm-6 col-md-4">
                                                            <p><label>Tr???ng th??i ???o:</label> {detailListing.virtualStatus ? detailListing.virtualStatus : ' '}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <p><label className="title title18">Th??ng tin quy ho???ch:</label><a style={{marginLeft: "50px"}} data-toggle="modal" data-target="#ModalAttachFile">C?? {attachPhoto ? attachPhoto.length > 1 ? attachPhoto.length + ' files' : ' 1 file' : '0 files'} ????nh k??m</a></p>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col-xs-12 col-sm-6 col-md-4">
                                                    <p><label>Lo???i quy ho???ch:</label> {detailListing.plan && detailListing.plan.typeName ? detailListing.plan.typeName : ' '}</p>
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-md-4">
                                                    <p><label>L??? gi???i:</label> {detailListing.plan && detailListing.plan.rightOfWay ? detailListing.plan.rightOfWay : ' '} m</p>
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-md-4">
                                                    <p><label>Th??ng tin ph??p l??:</label> {detailListing.legalsOfListing && detailListing.legalsOfListing.length > 0 ? detailListing.legalsOfListing.map(it => it.legalName).join(',') : ' '}</p>
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-md-4">
                                                    <p><label>Di???n t??ch b??? quy ho???ch:</label> {detailListing.plan && detailListing.plan.area ? detailListing.plan.area : ' '} m<sup>2</sup></p>
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-md-4">
                                                    <p><label>Di???n t??ch c??n l???i:</label> {detailListing.plan && detailListing.plan.area ? detailListing.lotSize - detailListing.plan.area : ' '} m<sup>2</sup></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div></Fragment>)}
                                {
                                    rListings.length > 0 && (
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                                <button className="btn btn-kyc btn-outline-kyc btn-kyc-round btn-kyc-dark" onClick={this.handleClickRemoveListing}><i className="fa fa-times" /> X??a s???n ph???m</button>
                                                <button className={listingsTour.indexOf(detailListing.rlistingId) > -1 ? "btn btn-kyc btn-outline-kyc btn-kyc-round active" : "btn btn-kyc btn-outline-kyc btn-kyc-round"} onClick={this.handleClickAddListingBookTour}><i className="fa fa-check" /> {listingsTour.indexOf(detailListing.rlistingId) > -1 ? '???? ch???n ??i xem' : 'Ch???n ??i xem'}</button>
                                                <button className={"btn btn-kyc btn-outline-kyc btn-kyc-round"} onClick={this.handleClickSendCheckEmpty}><i className="fa fa-check" /> Check tr???ng</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <br />
                            <br />
                            {rListings.length > 0 && (<div className="box-kyc-footer">
                              
                                <div className="row form-group">
                                    <div className="col-sm-12 text-center">
                                        <button className="btn btn-kyc btn-product-advice" onClick={this.handleClickBookTour}>?????T TOUR</button>
                                        <button onClick={() => {this.onChangeFeedback(1557)}} className="btn btn-kyc btn-product-advice" style={{backgroundColor: "blue"}} data-toggle="modal" data-target="#modalDenyTour" data-backdrop="static" data-keyboard="false">KH??NG ?????T TOUR</button>
                                    </div>

                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
                <ModalCalendarr dealId={dealId} functionServices={this.props.functionServices} />
                <ModalAttachFile files={attachPhoto} />
                {this.state.showPhoto && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + photos.length - 1) % images.length]}
                        imageCaption={captions[photoIndex]}
                        onCloseRequest={() => {
                            this.setState({
                                showPhoto: false
                            });
                            $("body").css({"overflow-y": "auto"});
                            this.handleChangePhotoIndex(0)
                        }}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}

                {/* modal deny tour */}
                <div id="modalDenyTour" className="modal fade" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">

                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">L?? do kh??ng ??i tour</h4>

                            </div>
                            <div className="modal-body">

                                <div className="row form-group">
                                    <div className="col-sm-4">L?? do</div>
                                    <div className="col-sm-8">
                                        <Select
                                            isSearchable={false}
                                            options={reasonDenyTour.map((o) => {return ({value: o.id, label: o.name})})}
                                            value={this.state.reasonDenyTourValue}
                                            onChange={(e) => {this.setState({reasonDenyTourValue: e})}}
                                            placeholder="--- Vui l??ng ch???n ---"
                                        />
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <div className="col-sm-4">Ghi ch??</div>
                                    <div className="col-sm-8">
                                        <textarea maxLength="1000" style={{width: "100%"}} value={this.state.commentDenyTourValue} onChange={(e) => {this.setState({'commentDenyTourValue': e.target.value})}}></textarea>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn btn-kyc" onClick={this.saveDenyTour.bind(this)}>L??u</button>
                                <button type="button" className="btn btn-kyc" data-dismiss="modal">????ng</button>

                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>

        )
    }
}

export default connect()(React.memo(ProductAdvice));
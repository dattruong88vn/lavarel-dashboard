import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
/*import Lightbox from 'react-images';*/
import axios from "axios";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';

class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            showPhoto: false,
        };
        this.stored = {
            criteriaId : -1,
        };
        this.bindEvents();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showPhoto: nextProps.showPhoto
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.photos !== this.props.photos) {
            return true;
        }
       if (nextProps.showPhoto !== this.state.showPhoto) {
            return true;
        }
        return false;
    }

    handleChangePhotoIndex(index) {
        this.setState({
            photoIndex: index
        });
    }

    handleChangeShowPhoto(value) {
        this.setState({
            showPhoto: !!value
        });
    }

    async updatePhotoSurvey(dataPost) {
        let response = null;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        await axios.post('/student-survey/update-photo-survey', dataPost)
            .then(xhr => {
                response = xhr.data;
            }).catch(err => {
                console.error("update-photo-fail");
            });
        if (response && response.result == true) {
            createNotification({
                message: 'cập nhật hình ảnh thành công',
                type: 'success'
            });
        } else {
            createNotification({
                message: 'Lỗi xảy ra, không thể cập nhật lại hình ảnh',
                type: 'danger'
            });
        }

    }

    bindEvents() {

        const that = this;
        Window.posEditorImage = new PosEditorImage({
            typeSource: 'survey',
            finishCallBack: function (dataResponse, oldLink) {
                let map = that.props.photosMap;
                let criteriaId =  that.stored.criteriaId;
                let newMap = new Map();
                ///
                const dataPost = [];
                const photosArray = [];
                map.forEach((item, key) => {
                    let photos = [];
                    if (item.photos && item.photos.length > 0) {
                        photos = item.photos;
                    }
                    if(key ==  criteriaId) {
                        // set dataPost
                        if (photos && photos.length > 0) {
                            // change old link
                            photos.forEach((it, key) => {
                                let path = it.path;
                                let link = it.link;
                                if (oldLink == it.link) {
                                    path = dataResponse.file_name;
                                    link = dataResponse.link;
                                }
                                dataPost.push({
                                    "path": path,
                                    "link": link,
                                    "latitude": it.latitude,
                                    "longitude": it.longitude,
                                    "caption": it.caption,
                                    "isPrivate": it.isPrivate,
                                    "source": "survey",
                                    "order" : it.order,
                                });
                                photos[key].path = path;
                                photos[key].link = link;
                            });
                        }
                    }
                    // all set
                    if (photos && photos.length > 0) {
                        photos = photos.filter(it => it.link != null);
                        photos.forEach(photo => {
                            photosArray.push({
                                src: photo.link,
                                criteriaId: item.criteriaId,
                                caption: item.caption
                            });
                        });
                    }
                    newMap.set(key, {photos : photos, criteriaId: item.criteriaId, caption: item.caption});
                });
                ///
                that.props.dispatch({type: 'SET_PHOTO_MARKER', photos: photosArray, photosMap : newMap});
                that.props.dispatch({type: 'SHOW_PHOTO', status: true});
                const marker = that.props.dataMakerClick;
                 that.updatePhotoSurvey({
                    photos: JSON.stringify(dataPost),
                    criteriaId: criteriaId,
                    surveyId: marker.surveyId
                });


            }
        });
    }

    render() {
        const photos = [...this.props.photos];
        const images = photos.map(it => it.src);
        const captions = photos.map((it, key) => `${it.caption} - ` + `${key + 1}` + '\/' +`${photos.length}`);
        const {photoIndex} = this.state;
        const that = this;
        return (
            <Fragment>
                {this.state.showPhoto && (
                    <Lightbox
                        onClose={() => {
                            this.handleChangeShowPhoto(false);
                            this.handleChangePhotoIndex(0)
                        }}
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + photos.length - 1) % images.length]}
                        imageCaption={captions[photoIndex]}
                        //imageTitle={captions[photoIndex]}
                        onCloseRequest={() => {
                            this.handleChangeShowPhoto(false);
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
                        toolbarButtons={[React.createElement(
                            'button',
                            {
                                title: 'Edit',
                                className: 'edit-photo-survey',
                                onClick: () => {
                                    Window.posEditorImage.showEditor({
                                        imageSrc: photos[photoIndex].src,
                                        imagePos: null
                                    });
                                    this.props.dispatch({type: 'SHOW_PHOTO', status: false});
                                    this.stored.criteriaId = typeof (photos[photoIndex].criteriaId) ? photos[photoIndex].criteriaId : -1;
                                }
                            }, React.createElement('span', {
                                className: 'fa fa-edit',
                            }))]}
                    />
                )}
            </Fragment>
        );
    }
}


export default connect(function (state) {
    return {
        photos: state.Images.photos,
        showPhoto: state.Images.showPhoto,
        photosMap: state.Images.photosMap,
        criteriaId : state.Images.criteriaId,
        dataMakerClick : state.GoogleMap.dataMakerClick,
    };
})(Images);
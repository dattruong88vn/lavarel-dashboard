import React, {Component, Fragment} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class ModalListImage extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false,
            photoIndex: 0
        };
        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
    }

    gotoNext(index, length) {
        this.setState({photoIndex: (index + 1) % length});
    }
    
    gotoPrevious(index, length) {
        this.setState({photoIndex: (index + length - 1) % length});
    }

    closeLightbox() {
        this.setState({modalIsOpen: false});
    }

    openLightbox() {
        this.setState({modalIsOpen: true});
    }

    render() {
        const that = this;
        let listImages = [];
        let images = [];

        if (this.props.listImages != null && this.props.listImages.length > 0 ) {
            listImages = this.props.listImages.map((item, index) => {
                if (item.link != null || typeof (item.link) != undefined) {
                    return {src: item.link};
                }
            });
            images = this.props.listImages.map((item, index) => {
                if (item.link != null || typeof (item.link) != undefined) {
                    return item.link;
                }
            });
        }
        let lengthPhoto = listImages.length;
        let captions = [...Array(lengthPhoto).keys()].map(it => {
            return `${it + 1}\/${lengthPhoto}`;
        });

        let { modalIsOpen, photoIndex } = this.state;

        return (
            <Fragment>
                {
                    lengthPhoto > 0 ?
                    <a href="javascript:void(0);" onClick={this.openLightbox} className={"mortgage-photo-gallery img-thumbnail"}>
                        <div className={"image-count"}><span>{lengthPhoto}</span></div>
                        <img src={(images[0].match(/\.(jpeg|jpg|gif|png)$/) != null) ? images[0] : "/images/download-generic.png"} className="" alt="Cinque Terre"/>
                    </a> :
                    <a href="javascript:void(0);" className={"mortgage-photo-gallery img-thumbnail"}>
                        <img src="/images/no-image.png" className="" alt="Cinque Terre"/>
                    </a>

                }
                {modalIsOpen && (
                    <Lightbox
                        mainSrc={ (images[photoIndex].match(/\.(jpeg|jpg|gif|png)$/) != null) ? images[photoIndex] : "/images/download-generic.png"}
                        nextSrc={images[(photoIndex + 1) % lengthPhoto]}
                        prevSrc={images[(photoIndex + lengthPhoto - 1) % lengthPhoto]}
                        imageCaption={captions[photoIndex]}
                        //imageTitle={captions[photoIndex]}
                        onCloseRequest={this.closeLightbox}
                        onMovePrevRequest={() => this.gotoPrevious(photoIndex, lengthPhoto)}
                        onMoveNextRequest={() => this.gotoNext(photoIndex, lengthPhoto)}
                        clickOutsideToClose={false}
                        toolbarButtons={[React.createElement(
                            'button',
                            {
                                title: 'remove',
                                style: {'background' : 'none'},
                                className: 'ril__toolbarItemChild ril__builtinButton fa fa-trash',
                                onClick: () => {
                                    if (this.props.onRemoveImage) {
                                        ModalConfirm.showModal({
                                            message : 'Bạn có chắc muốn xóa hình ảnh này?',
                                            onYes: function (modal) {
                                                const newImages = that.props.listImages.filter(it => {
                                                    if (it.link != images[photoIndex]) {
                                                        return it;
                                                    }
                                                });
                                                if (newImages.length == 0) {
                                                    that.setState({modalIsOpen : false});
                                                }
                                                that.setState({photoIndex : 0});
                                                that.props.onRemoveImage(newImages);
                                            },
                                        });

                                    }
                                }
                            }, null),
                            React.createElement(
                                'button',
                                {
                                    title: 'download',
                                    style: {'background' : 'none'},
                                    className: 'ril__toolbarItemChild ril__builtinButton fa fa-download',
                                    onClick: () => {
                                        // if(images[photoIndex].match(/\.(jpeg|jpg|gif|png)$/) != null){
                                        //     window.open = images[photoIndex];
                                        // }else{
                                        //     window.location = images[photoIndex];
                                        // }
                                        var a = document.createElement('a');
                                        a.href = images[photoIndex];
                                        a.download = images[photoIndex];
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                    }
                                }, null)]}
                    />
                )}
                {/*<Lightbox
                    isOpen={modalIsOpen}
                    images={lstImages} 
                    currentImage={photoIndex}
                    onClickPrev={() => this.gotoPrevious(photoIndex, lengthPhoto)}
                    onClickNext={() => this.gotoNext(photoIndex, lengthPhoto)}
                    onClose={this.closeLightbox}
                />*/}
            </Fragment>
        );
    }
}

export default ModalListImage;
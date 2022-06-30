import React, { Component } from 'react'
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";

export default class ModalAttachFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            showPhoto: false,
            photoIndex : 0,
        };

        this.handleChangeShowPhoto = this.handleChangeShowPhoto.bind(this);
        this.handleChangePhotoIndex = this.handleChangePhotoIndex.bind(this);
    }

    componentDidMount() {
        //this.setState({files: this.props.files});
    }

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
            $("#ModalAttachFile").css({"display" : "none"})
            $("body").css({"overflow-y" : "hidden"})
        } else {
            $("body").css({"overflow-y" : "auto"})
        }
    };

    render() {
        const settings = {
            dots: false,
            dotsClass: "slick-dots slick-thumb",
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const images = this.props.files ? this.props.files : [];
        let photos = this.props.files ? this.props.files : [];
        const {photoIndex} = this.state;
        return (
            <div id="ModalAttachFile" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header" style={{backgroundColor: "#f17423", color: "white"}}>
                        <button type="button" className="close" data-dismiss="modal" style={{color: "white", opacity: "1"}}>&times;</button>
                        <h4 className="modal-title">File đính kèm</h4>
                    </div>
                    <div className="modal-body">
                        <Slider {...settings} className={'slider-for'}>
                            {this.props.files ? this.props.files.map(o => {
                                return(
                                    <div className="slider-wrapper">
                                        <span className="slider-fullscreen" onClick={this.handleChangeShowPhoto(true)}>FullScreen</span>
                                        <div className="slide-item">                       
                                            <img src={o} className="img-responsive" />
                                        </div>
                                    </div>
                                )})
                            : null}

                        </Slider>
                        {this.state.showPhoto && (
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + photos.length - 1) % images.length]}
                            onCloseRequest={() => {
                                this.setState({
                                    showPhoto: false
                                });
                                $("body").css({"overflow-y" : "auto"});
                                $("#ModalAttachFile").css({"display" : "block"})
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-kyc" data-dismiss="modal">Đóng</button>
                    </div>
                    </div>

                </div>
            </div>
        )
    }
}

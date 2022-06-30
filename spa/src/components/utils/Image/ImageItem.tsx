import React, { useEffect, useState } from "react"

import { ResponseUploadImage } from 'model/UtilModel';
import axios from 'axios'
import "./ImageItem.scss"
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import {IMAGE_LIMIT} from 'constants/index';

const _window = (window as any).window;

type ImageItemProp = {
    categoryId: string | number,
    showPhoto: boolean,
    requiredTextInput: boolean,
    onHandleChangeImage: Function,
    categoryName: string 
};

const ImageItem: React.FC<ImageItemProp> = (props) => {
    const [imageList, setImageList] = useState<Array<ResponseUploadImage>>([])
    const [photoIndex, setPhotoIndex] = useState(0)
    const [isOpenLightBox, setIsOpenLightBox] = useState(false)
    const [imageListLightBox, setImageListLightBox] = useState([])
    const [nameInput, setNameInput] = useState( `inputFile${props.categoryId}`)

    const onClickUpload = () => {
        if (imageList.length >= IMAGE_LIMIT) {
            _window.showPropzyAlertPopupGeneral(`Đã đạt giới hạn ${IMAGE_LIMIT} hình ảnh`);
            return;
        }
        _window.document.getElementById(nameInput).click()
    }

    const onFileChange = (e: any) => {
        let filesData = e.target.files;

        let promiseUpload : any = [];
        let lengthImageList = imageList ? imageList.length : 0;
        let lengthImageRemain = IMAGE_LIMIT - lengthImageList;
        let lengthFilesData = filesData.length;
        let filesDataToUpload : any = filesData;

        if (lengthFilesData > lengthImageRemain) {
            filesDataToUpload = [...filesData].splice(0, lengthImageRemain)
        }

        [...filesDataToUpload].forEach( async (itemFile : any) => {
            const dataPost = new FormData;

            dataPost.append('file', itemFile);
            dataPost.append('type', 'listing');
            dataPost.append('source', 'dashboard');

            promiseUpload.push(axios.post(`${_window.baseUploadApiPublic}upload`,dataPost));
        })

        _window.showPropzyLoadingBPO();
        try {
            // get promise all image upload
            Promise.all(promiseUpload).then(function(values) {
                let isErrUpload = false;

                let newListImage : Array<ResponseUploadImage> = [...imageList]
                let newListImageLightBox : any = [...imageListLightBox]

                values.forEach( (itemFile:any) => {
                    if (itemFile && itemFile.data.result) {
                        let largeLinkArr = itemFile.data.data.link.split('large')
                        let originLargeLink = ''

                        largeLinkArr.forEach((itemLink: any, indexLink:number) => {
                            if (indexLink == 0) {
                                originLargeLink = itemLink + 'origin';
                            } else originLargeLink += itemLink;
                        })

                        newListImage = [...newListImage, {link: originLargeLink, isPrivate: false, source: 'dashboard', isApproved: true}]
                        newListImageLightBox = [...newListImageLightBox, originLargeLink]
                    } else {
                        isErrUpload = true;
                    }

                    // reset cache upload image
                    _window.document.getElementById(nameInput).value = "";
                });

                setImageList(newListImage)
                setImageListLightBox(newListImageLightBox)

                _window.hidePropzyLoadingBPO();
                if(isErrUpload) {
                    _window.showPropzyAlertPopupGeneral('Đã có lỗi trong khi upload hình. Xin vui lòng thử lại');
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    const removeImage = (e:any ,item : ResponseUploadImage) => {
        e.stopPropagation();
        setImageList(imageList.filter(itemList => itemList.link != item.link))
        setImageListLightBox(imageListLightBox.filter(itemListLighBox => itemListLighBox != item.link))
    }

    useEffect(() => {
        props.onHandleChangeImage(imageList, props.categoryId);
     }, [imageList]);
    
    const renderLightBox = (index : number) => {
        setPhotoIndex(index); 
        setIsOpenLightBox(true);
    }

    return (
        <>
            <div className="image-item-container">
                <div className="block-upload">
                    <div>{props.categoryName} {props.requiredTextInput && <span className="red">*</span>}</div>

                    {props.showPhoto && <a className="add-images-files" onClick={onClickUpload}>
                        <i className="fa fa-camera" aria-hidden="true"></i>
                        Thêm ảnh 
                        <input type="file" className="hidden" id={nameInput} multiple name="files[]" onChange={(e) => {onFileChange(e)}}/>
                    </a>}
                    
                </div>
                <div className="block-image">
                    {imageList.map((item, index) => {
                        return (
                            <div onClick={() => renderLightBox(index)} className="image" key={item.link || ''}>
                                <img src={item.link || ''} alt=""/>
                                <span onClick={(e) => removeImage(e, item)}>X</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            {isOpenLightBox && (
                <Lightbox
                    mainSrc={imageListLightBox[photoIndex]}
                    nextSrc={imageListLightBox[(photoIndex + 1) % imageListLightBox.length]}
                    prevSrc={imageListLightBox[(photoIndex + imageListLightBox.length - 1) % imageListLightBox.length]}
                    onCloseRequest={() => setIsOpenLightBox(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + imageListLightBox.length - 1) % imageListLightBox.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % imageListLightBox.length)
                    }
                />
            )}
        </>
    )
}

export default ImageItem

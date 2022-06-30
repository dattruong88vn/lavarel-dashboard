import { BpoCommentHistoryResponse, Photo } from "model";
import React, { FC, memo, useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./baBpoComment.scss";

interface BaBPOCommentProps {
    commentData: BpoCommentHistoryResponse;
}

const BaBPOComment: FC<BaBPOCommentProps> = (props) => {
    const { commentData } = props;
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpenLightBox, setIsOpenLightBox] = useState(false);
    const [imageListLightBox, setImageListLightBox] = useState<string[]>([]);
    const [stringArrayComment, setStringArrayComment] = useState<string>("");

    useEffect(() => {
        const listLinkImage = commentData?.photos?.map((item: Photo) => {
            return item.link;
        });
        if ((listLinkImage || []).length > 0) {
            setImageListLightBox(listLinkImage || []);
        }

        const arrayComment = commentData?.comments?.reduce(function (
            comment,
            val,
            index
        ) {
            var comma = comment.length ? "\n" : "";
            return comment + comma + val;
        },
        "");
        setStringArrayComment(arrayComment || "");
    }, [commentData]);

    const renderLightBox = (index: number) => {
        setPhotoIndex(index);
        setIsOpenLightBox(true);
    };
    return (
        <>
            <div className="ba-bpo-comment-container">
                <div className="label-category">
                    {commentData?.categoryName}
                </div>
                <div className="gray-line" />
                <div className="block-image">
                    {commentData?.photos?.map((item, index) => {
                        return (
                            <div
                                onClick={() => renderLightBox(index)}
                                className="image"
                                key={item.link || ""}
                            >
                                <img src={item.link || ""} alt="" />
                            </div>
                        );
                    })}
                </div>
                <div className="label-comment">{stringArrayComment}</div>
            </div>
            {isOpenLightBox && (
                <Lightbox
                    mainSrc={imageListLightBox[photoIndex]}
                    nextSrc={
                        imageListLightBox[
                            (photoIndex + 1) % imageListLightBox.length
                        ]
                    }
                    prevSrc={
                        imageListLightBox[
                            (photoIndex + imageListLightBox.length - 1) %
                                imageListLightBox.length
                        ]
                    }
                    onCloseRequest={() => setIsOpenLightBox(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex(
                            (photoIndex + imageListLightBox.length - 1) %
                                imageListLightBox.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex(
                            (photoIndex + 1) % imageListLightBox.length
                        )
                    }
                />
            )}
        </>
    );
};

export default memo(BaBPOComment);

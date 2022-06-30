import React from "react";
import PropTypes from "prop-types";
import {Modal, Panel} from "react-bootstrap";
import moment from "moment";

import "./CommentModal.scss";
import { useFetchComments } from '../../hooks'
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";

function CommentModal(props) {
    const [ comments ] = useFetchComments();
    const {
        opened,
        handleCloseFunc,
    } = props;

    const onHideModal = () => {
        handleCloseFunc && handleCloseFunc(null);
    };

    return (
        <>
            <Modal
                dialogClassName={`comment-dialog `}
                show={opened}
                onHide={onHideModal}
            >
                <Modal.Header closeButton >
                    <Modal.Title className="title-header">Danh Sách Ghi Chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="category-container">
                        {comments.data && comments.data.length != 0 && comments.data.map((categoryItem, categoryIndex) => {
                            return (<Accordion className="block-accordion" key={'categoryIndex' + categoryIndex} defaultExpanded={true}>
                                <AccordionSummary>
                                    <div className="block-category-title">
                                        <div className="plus-minus-icon"></div>
                                        <span>{categoryItem.categoryName}</span>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className="block-details">
                                    {categoryItem.details.length != 0 && categoryItem.details.map((detailItem, detailIndex) => {
                                        return (<div className="row custom-row" key={'detailIndex' + detailIndex}>
                                                <div className="col-md-1"></div>
                                                <div className="col-md-1 remove-pad-col-1">
                                                    <div className="block-info">
                                                        <img src={detailItem.creatorPhoto ? detailItem.creatorPhoto : '/dist/img/logo.jpg'}/>
                                                        <span>{detailItem.creatorName}</span>
                                                        <div className="title">
                                                            {detailItem.creatorPositions && detailItem.creatorPositions.map((creatorItem, creatorIndex) => {
                                                                return <span key={'creatorIndex' + creatorIndex}>{creatorItem}</span>
                                                        })}</div>
                                                    </div>
                                                </div>
                                            {detailItem.comments.length == 1 && detailItem.comments.map((commentItem, commentIndex) => { 
                                                // case 1 detail
                                                return (<div className="col-md-10" key={'commentIndex' + commentIndex}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            {commentItem.createdDate ? `Ngày ${moment(commentItem.createdDate).format("DD/MM/YYYY")} lúc ${moment(commentItem.createdDate).format("HH:mm:ss")}`: ''}
                                                        </Panel.Heading>
                                                        <Panel.Body>
                                                            {commentItem.items.length != 0 && commentItem.items.map((textComment, textIndex) => {
                                                                return (<p key={'textIndex'+textIndex}>{textComment.comment}</p>)
                                                            })}
                                                            
                                                            <div className="block-img">
                                                                {commentItem.photos && commentItem.photos.map((photoItem, photoIndex) => {
                                                                    return (<a key={'photoIndex'+photoIndex} href={photoItem.link} target="_blank"><img src={photoItem.link}/></a>)
                                                                })}
                                                            </div>
                                                        </Panel.Body>
                                                    </Panel>
                                                </div>)
                                            })}
                                            {detailItem.comments.length > 1 && detailItem.comments.map((commentItem, commentIndex) => {
                                                // case have more than 1 detail 
                                                if (commentIndex == 0) {
                                                    return (<div className="col-md-10" key={'commentIndex' + commentIndex}>
                                                            <Panel>
                                                                <Panel.Heading>
                                                                    {commentItem.createdDate ? `Ngày ${moment(commentItem.createdDate).format("DD/MM/YYYY")} lúc ${moment(commentItem.createdDate).format("HH:mm:ss")}` : ''}
                                                                </Panel.Heading>
                                                                <Panel.Body>
                                                                    {commentItem.items.length != 0 && commentItem.items.map((textComment, textIndex) => {
                                                                        return <p key={'textIndex' + textIndex}>{textComment.comment}</p>
                                                                    })}
                                                                    <div className="block-img">
                                                                        {commentItem.photos && commentItem.photos.map((photoItem, photoIndex) => {
                                                                            return (<a key={'photoIndex ' + photoIndex} href={photoItem.link} target="_blank"><img src={photoItem.link}/></a>)
                                                                        })}
                                                                    </div>
                                                                </Panel.Body>
                                                            </Panel>
                                                        </div>)
                                                } else {
                                                    return (<React.Fragment key={'commentIndex' + commentIndex}>
                                                            <div className="col-md-2"></div>
                                                            <div className="col-md-10">
                                                                <Panel>
                                                                    <Panel.Heading>
                                                                        {commentItem.createdDate ? `Ngày ${moment(commentItem.createdDate).format("DD/MM/YYYY")} lúc ${moment(commentItem.createdDate).format("HH:mm:ss")}` : ''}
                                                                    </Panel.Heading>
                                                                    <Panel.Body>
                                                                        {commentItem.items.length != 0 && commentItem.items.map((textComment, textIndex) => {
                                                                            return <p key={'textIndex'+textIndex}>{textComment.comment}</p>
                                                                        })}
                                                                        <div className="block-img">
                                                                            {commentItem.photos && commentItem.photos.map((photoItem, photoIndex) => {
                                                                                return (<a key={'photoIndex'+photoIndex} href={photoItem.link} target="_blank"><img src={photoItem.link}/></a>)
                                                                            })}
                                                                        </div>
                                                                    </Panel.Body>
                                                                </Panel>
                                                            </div>
                                                        </React.Fragment>)
                                                }
                                                })}
                                        </div>)
                                    })} 
                                </AccordionDetails>
                            </Accordion>)
                        })}
                        {comments.data && comments.data.length == 0 && <p>Tin đăng hiện chưa có ghi chú nào.</p>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

CommentModal.propTypes = {
    opened: PropTypes.bool,
    handleCloseFunc: PropTypes.func,
};

CommentModal.defaultProps = {
    opened: false,
    handleCloseFunc: null,
};

export default CommentModal;

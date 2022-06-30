import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Modal, Button} from "react-bootstrap";
import {
    useFetchBPO,
    useFetchDataUrl,
    useValidateBPO,
} from "../../hooks";
import BPONoteGroup from "../BPONoteGroup";
import BPOHistory from "../BPOHistory";
import BPOOptions from "../BPOOptions";
import axios from "axios";
import "./BPODialog.scss";
import {MODAL_SIZE, BPO_URL, STATUS_CODE_SUCCESS, STATUS_CODE_SEND_ERR} from "../../constants";

function BPODialog(props) {
    const [sizeModal, setSizeModal] = useState(MODAL_SIZE.LG);
    const [noteOptions, setNoteOptions] = useState([]);
    const [noteSelected, setNoteSelected] = useState([]);
    const [model, setModel] = useState(null);
    const [error] = useValidateBPO(model);
    const [errMessage, setErrMessage] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const {
        opened,
        backdrop,
        keyboard,
        handleCloseFunc,
        rListingId,
    } = props;

    // Fetch data resource for BPO
    const [resource] = useFetchBPO(rListingId);
    const [history] = useFetchDataUrl(
        `${BPO_URL.BPO_CONFIG_HISTORY}/${rListingId}`
    );
    const [suggestionNote] = useFetchDataUrl(BPO_URL.BPO_SUGGESTION_NOTES);

    const onHideModal = () => {
        handleCloseFunc && handleCloseFunc(null);
    };

    useEffect(() => {
        window.addEventListener("resize", resize());

        return () => {
            window.removeEventListener("resize", resize());
        };
    }, []);

    useEffect(() => {
        if (resource.data) {
            setModel(resource.data);
        }
    }, [resource]);

    useEffect(() => {
        if (suggestionNote.data?.length) {
            const optionsConvert = suggestionNote.data.map((note) => {
                return {
                    id: note.suggestionId,
                    value: note.suggestionId,
                    label: note.content,
                };
            });
            setNoteOptions(optionsConvert);
        }
    }, [suggestionNote]);

    useEffect(() => {
        if (suggestionNote?.data?.length > 0 && resource.data?.ratingComments?.length > 0) {
            // ✅ Re select suggestion notes selected
            const ratingComments = resource.data?.ratingComments;
            let maxLength = suggestionNote.data.length;
            let maxLengthForSelected = suggestionNote.data.length;
            let ratingCommentsNullableSuggestion = ratingComments.filter(x => x.suggestionId === null);
            const ratingCommentHasSuggestionId = ratingComments.filter(x => x.suggestionId !== null);
            let selectedSuggestion = [];
            let optionsConvert = [];

            ratingCommentsNullableSuggestion = ratingCommentsNullableSuggestion.map(suggestion => {
                // ✅ each item with nullable suggestionId we weill increase the maxLength of suggestion list
                const idAndValue = maxLength++;

                return {
                    id: null,
                    label: suggestion.content,
                    value: idAndValue,
                };
            })

            selectedSuggestion = ratingComments.map(rating => {
                const value = maxLengthForSelected++;

                return {
                    id: rating.suggestionId ? rating.suggestionId : null,
                    label: rating.content,
                    value: value,
                }
            })

            optionsConvert = suggestionNote.data.map((note) => {
                return {
                    id: note.suggestionId,
                    value: note.suggestionId,
                    label: note.content,
                };
            });

            const finalSuggestionData = [...optionsConvert, ...ratingCommentsNullableSuggestion];

            setNoteOptions(finalSuggestionData);
            setNoteSelected(selectedSuggestion);

        }
    }, [suggestionNote, resource])

    const resize = () => {
        // tablet mode
        if (window.innerWidth <= 760) {
            setSizeModal(MODAL_SIZE.MD);
        } else if (window.innerWidth > 760) {
            setSizeModal(MODAL_SIZE.LG);
        }
    };

    const handleNoteChange = (values) => {
        let ratingComments = [];

        if (values?.length) {
            ratingComments = values.map((cm) => {
                return {
                    suggestionId: cm.id ? cm.id : null,
                    content: cm.label,
                };
            });
        }
        setModel({...model, ratingComments});
        setNoteSelected(values);
    };

    const handlePushNewOption = (newOption) => {
        setNoteOptions([...noteOptions, newOption]);
    };

    const handleSelectOption = (questionId) => {
        setModel({...model, questionId: questionId});
    };
    const handleChangeRating = (rated) => {
        setModel({...model, grade: rated});
    };
    const buildLabelOption = () => {
        let label = "1. Chọn một trong các option sau và đánh giá BPO listing";

        return (
            <label className="form-label no-bold">
                {label} <span className="error">*</span>
            </label>
        );
    };

    /**
     * Validate
     */

    const submitForm = () => {
        if (error || btnLoading || resource.loading) {
            return;
        }

        const postRequest = {
            rListingId: rListingId,
            comments: model.ratingComments,
            grade: model.grade,
            questionId: model.questionId,
            baIds: [],
        };

        async function createBPO() {
            setBtnLoading(true);
            try {
                const response = await axios.post(
                    BPO_URL.BPO_CREATE,
                    postRequest
                );
                if (STATUS_CODE_SUCCESS.indexOf(response.data?.code) > -1) {
                    handleCloseFunc && handleCloseFunc(postRequest.grade);
                    setBtnLoading(false);
                }
                else if (STATUS_CODE_SEND_ERR.indexOf(response.data?.code) > -1) {
                    setErrMessage(response.data?.message);
                    setBtnLoading(false);
                } else if (response.data?.code === 401) {
                    setErrMessage('UnAuthorize !');
                    setBtnLoading(false);
                } else if (response.data?.code === 403) {
                    setErrMessage(response.data?.message);
                    setBtnLoading(false);
                }
            } catch (error) {
                setBtnLoading(false);
            }
        }

        createBPO();
    };

    return (
        <>
            <Modal
                dialogClassName={`bpo-dialog ${sizeModal}`}
                show={opened}
                onHide={onHideModal}
                backdrop={backdrop}
                keyboard={keyboard}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="bold">Đánh giá BPO Listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {resource.loading ? (
                        <div>Loading ...</div>
                    ) : (
                            <div>
                                <div className="form-group">
                                    {buildLabelOption()}

                                    <BPOOptions
                                        onChangeQuestion={handleSelectOption}
                                        onChangeRating={handleChangeRating}
                                        questionId={model?.questionId || 1}
                                        rated={model?.grade || 0}
                                    />

                                    {error && error.selectedOption?.require === true && (
                                        <div className="error m-t-xs">
                                            {error.selectedOption?.message}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="form-label no-bold">
                                        2. Ghi Chú <span className="error">*</span>
                                    </label>

                                    <BPONoteGroup
                                        onPushNewOption={handlePushNewOption}
                                        options={noteOptions}
                                        noteSelected={noteSelected}
                                        onChangeNote={handleNoteChange}
                                    ></BPONoteGroup>

                                    {error && error.comments?.require === true && (
                                        <div className="error m-t-xs">{error.comments?.message}</div>
                                    )}
                                </div>

                                {!history.loading && history.data?.length > 0 && (
                                    <div className="history">
                                        <BPOHistory size={sizeModal} data={history.data}></BPOHistory>
                                    </div>
                                )}
                            </div>
                        )}

                    {errMessage && <div className="error error-content">{errMessage}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHideModal}>
                        Huỷ
          </Button>
                    <Button
                        disabled={error !== null || btnLoading}
                        className={`btn btn-success text-white ${btnLoading ? 'pointer-load' : ''}`} onClick={submitForm}>
                        Lưu & Gửi BPO
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

BPODialog.propTypes = {
    opened: PropTypes.bool,
    backdrop: PropTypes.any,
    keyboard: PropTypes.bool,
    handleCloseFunc: PropTypes.func,
    rListingId: PropTypes.number,
    reload: PropTypes.func,
};

BPODialog.defaultProps = {
    opened: false,
    backdrop: "static",
    keyboard: false,
    handleCloseFunc: null,
    reload: null,
    rListingId: null,
};

export default BPODialog;

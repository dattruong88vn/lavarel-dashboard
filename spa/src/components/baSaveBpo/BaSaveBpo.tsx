import React, { useState, useEffect } from "react";
import { RatingView, Title } from "components/utils";
import {
    CategoryConfigBuySideResponse,
    CommentSuggestionResponse,
    VoteOptionsResponse,
    SaveBpoRequest,
} from "model";
import { getCommentSuggestion } from "api/core-apis/apiComment";
import { getCategoryConfigBuySide, saveBpo } from "api/saveBpo/saveBpoApi";
import { getVoteOptions } from "api/core-apis/apiRating";
import CommentView from "../utils/Comment/Comment";
import "./index.scss";
import _ from "lodash";
import axios from "axios";

const _window = (window as any).window;

type BaSaveBpoProps = {
    onCloseModal: () => void;
    rlistingId: number;
    assignedTo: number;
};

const BaSaveBpo: React.FC<BaSaveBpoProps> = (props) => {
    const { rlistingId, assignedTo } = props;
    const [permission, setPermission] = useState(false);
    const [message, setMessage] = useState<string | null>("");
    const [errors, setErrors] = useState({
        grade: false,
    });
    const [errorsConfig, setErrorsConfig] = useState<any>([]);
    const [listCommentSuggestion, setListCommentSuggestion] = useState<
        CommentSuggestionResponse[]
    >([
        {
            categoryId: 0,
            comments: [],
        },
    ]);
    const [voteOptions, setVoteOptions] = useState<VoteOptionsResponse[]>([]);
    const [
        categoryConfig,
        setCategoryConfig,
    ] = useState<CategoryConfigBuySideResponse>({
        minimumNumberOfMembers: 0,
        config: [],
    });
    const [dataPut, setDataPut] = useState<SaveBpoRequest>({
        rlistingId: rlistingId,
        assignedTo: assignedTo,
        grade: 0,
        comments: [],
    });

    const [dataPriceTagPost, setDataPriceTagPost] = useState<any>({
        "listingId": rlistingId,
        "reBPO": false,
        "tagDisplays": [

        ]
    })

    useEffect(() => {
        (async () => {
            //call api configure
            const responseConfigure = await getCategoryConfigBuySide({
                rListingId: rlistingId,
                assignedTo: assignedTo,
            });
            if (responseConfigure.code !== 200) {
                setPermission(false);
                setMessage(responseConfigure.message);
                return;
            }
            setPermission(true);
            setMessage(responseConfigure.message);
            setCategoryConfig(responseConfigure.data);
        })();

        (async () => {
            //call api get vote options
            const responseVoteOptions = await getVoteOptions();
            setVoteOptions(responseVoteOptions.data);
        })();

        (async () => {
            //call api suggestion
            const responseSuggestion = await getCommentSuggestion("BPO");
            setListCommentSuggestion(responseSuggestion.data);
        })();
    }, []);


    useEffect(() => {
        const errorsConfig = categoryConfig.config.map((config) => ({
            requiredInput: config.showTextInput
                ? config.requiredTextInput
                    ? true
                    : false
                : false,
            errorInput: false,
            requiredImage: config.showPhoto
                ? config.requiredPhoto
                    ? true
                    : false
                : false,
            errorImage: false,
        }));
        setErrorsConfig(errorsConfig);
    }, [categoryConfig]);

    const onClickRate = (grade: number) => {
        if (grade > 0) {
            setErrors({ ...errors, grade: false });
        }
        setDataPut({ ...dataPut, grade });
    };

    const onDataCommentChange = (data: any) => {
        const errorsConfigAfterCheck = errorsConfig.map(
            (item: any, index: number) => ({
                ...item,
                errorInput:
                    data[index].comments.length > 0 ? false : item.errorInput,
                errorImage:
                    data[index].photos.length > 0 ? false : item.errorImage,
            })
        );
        setErrorsConfig(errorsConfigAfterCheck);
        setDataPut({ ...dataPut, comments: data });
    };

    const onCommentPriceTagChange = (data: any) => {
        const errorsConfigAfterCheck = errorsConfig.map(
            (item: any, index: number) => ({
                ...item,
                errorInput:
                    data.length > 0 ? false : item.errorInput,
            })
        );
        setErrorsConfig(errorsConfigAfterCheck);
        setDataPriceTagPost({ ...dataPriceTagPost, "tagDisplays": data })
    }


    const onSubmit = () => {
        let validation = {
            grade: false,
            config: false,
        };
        if (dataPut.grade === 0) {
            validation.grade = true;
        }
        setErrors({
            ...errors,
            grade: validation.grade,
            // listBa: validation.listBa,
        });
        const errorsConfigAfterCheck = errorsConfig.map(
            (item: any, index: number) => ({
                ...item,
                errorInput: item.requiredInput
                    ? dataPut.comments[index].comments.length === 0
                        ? true
                        : false
                    : false,
                errorImage: item.requiredImage
                    ? dataPut.comments[index].photos.length === 0
                        ? true
                        : false
                    : false,
            })
        );
        setErrorsConfig(errorsConfigAfterCheck);

        validation.config = errorsConfigAfterCheck.find(
            (item: any) => item.errorInput || item.errorImage
        )
            ? true
            : false;

        if (validation.grade || validation.config) {
            return;
        }

        props.onCloseModal();
        // phần call api này sẽ move ra ngoài container chứa modal này để xử lý sau submit như loading + show popup lỗi khi fail
        _window.showPropzyLoadingBPO();
        (async () => {
            const response = await saveBpo(dataPut);
            _window.hidePropzyLoadingBPO();
            if (response.code != 200) {
                _window.showPropzyAlertPopupGeneral(response.message);
            }
            _window.handleSearchFilterBPOListing();
        })();

        // config PriceTag Post API
        const dataPriceTagPostJson = JSON.stringify(dataPriceTagPost);
        const configPriceTagPost: any = {
            method: 'post',
            url: '/price-tag/tag-listing/add',
            data: dataPriceTagPostJson
        };
        axios(configPriceTagPost)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const renderContent = permission ? (
        <div className="flex-column">
            <div className="save-bo-container">
                <div className="form-group">
                    <Title
                        text="1.Đánh giá điểm BPO listing"
                        isRequire={true}
                    />
                    <RatingView
                        onClickRate={onClickRate}
                        currentRate={0}
                        listVoteOptions={voteOptions}
                    />
                    {errors.grade && (
                        <p className="title-red">Vui lòng đánh giá</p>
                    )}
                </div>
                <div className="form-group">
                    <Title text="2.Ghi chú" isRequire={false} />
                    {!_.isEmpty(categoryConfig.config) && (
                        <CommentView
                            onDataChange={onDataCommentChange}
                            categoryConfigData={categoryConfig.config}
                            commentSuggestionResponse={listCommentSuggestion}
                            errorsConfig={errorsConfig}
                            onCommentPriceTagChange={onCommentPriceTagChange}
                        />

                    )}
                </div>
            </div>
            <div className="form-group modal-footer">
                <button
                    className="btn btn-default"
                    onClick={props.onCloseModal}
                >
                    <b>Hủy</b>
                </button>
                <button className="btn btn-success" onClick={onSubmit}>
                    <b>Lưu & Gửi BPO</b>
                </button>
            </div>
        </div>
    ) : (
        <div>{message}</div>
    );

    return renderContent;
};

export default BaSaveBpo;

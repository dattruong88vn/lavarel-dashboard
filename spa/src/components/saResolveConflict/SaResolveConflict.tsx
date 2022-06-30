import React, { useState, useEffect } from "react";
import { RatingView, Title, CommentView } from "components/utils";
import {
    CommentSuggestionResponse,
    VoteOptionsResponse,
    ConflictDetailResponse,
    ResolveConflictRequest,
} from "model";
import { getCommentSuggestion } from "api/core-apis/apiComment";
import { getVoteOptions } from "api/core-apis/apiRating";
import "./saResolveConflict.scss";
import _ from "lodash";
import {
    getConflictDetail,
    resolveConflictBpo,
} from "api/saResolveConflict/saResolveConflictApi";
import CompareScore from "./CompareScore/CompareScore";
import axios from "axios";
const _window = (window as any).window;

type SaResolveConflictProps = {
    onCloseModal: () => void;
    listingId: any;
};
const SaResolveConflict: React.FC<SaResolveConflictProps> = (props) => {
    const { onCloseModal, listingId } = props;
    const [permission, setPermission] = useState(false);
    const [message, setMessage] = useState<string | null>("");
    const [errors, setErrors] = useState({
        grade: false,
    });
    const [errorsConfig, setErrorsConfig] = useState<any>([]);
    const [voteOptions, setVoteOptions] = useState<VoteOptionsResponse[]>([]);
    const [listCommentSuggestion, setListCommentSuggestion] = useState<
        CommentSuggestionResponse[]
    >([
        {
            categoryId: 0,
            comments: [],
        },
    ]);

    const [configDetail, setConfigDetail] = useState<ConflictDetailResponse>({
        gradeSA: 0,
        avgGradeBAs: 0,
        config: [],
    });

    const [dataPost, setDataPost] = useState<ResolveConflictRequest>({
        rlistingId: listingId,
        grade: 0,
        comments: [],
    });

    const [dataPriceTagPost, setDataPriceTagPost] = useState<any>({
        "listingId": listingId,
        "tagDisplays": [

        ]
    })

    useEffect(() => {
        (async () => {
            const response = await getConflictDetail({
                rlistingId: listingId,
            });

            if (response.code !== 200) {
                setPermission(false);
                setMessage(response.message);
                return;
            }
            setPermission(true);
            setMessage(response.message);
            setConfigDetail(response.data);
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
        const errorsConfig = configDetail?.config?.map((config) => ({
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
    }, [configDetail]);

    const onClickRate = (grade: number) => {
        if (grade > 0) {
            setErrors({ ...errors, grade: false });
        }
        setDataPost({ ...dataPost, grade });
    };

    const onDataCommentChange = (data: any) => {
        const errorsConfigAfterCheck = errorsConfig.map(
            (item: any, index: number) => ({
                ...item,
                errorInput: data[index].comments.length > 0 ? false : item.errorInput,
                errorImage: data[index].photos.length > 0 ? false : item.errorImage
            })
        );
        setErrorsConfig(errorsConfigAfterCheck);
        setDataPost({ ...dataPost, comments: data });
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
        if (dataPost.grade === 0) {
            validation.grade = true;
        }
        setErrors({
            ...errors,
            grade: validation.grade,
        });
        const errorsConfigAfterCheck = errorsConfig.map(
            (item: any, index: number) => ({
                ...item,
                errorInput: item.requiredInput
                    ? dataPost.comments[index].comments.length === 0
                        ? true
                        : false
                    : false,
                errorImage: item.requiredImage
                    ? dataPost.comments[index].photos.length === 0
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
            console.log("error", validation.grade, validation.config);
            return;
        }

        props.onCloseModal();
        // phần call api này sẽ move ra ngoài container chứa modal này để xử lý sau submit như loading + show popup lỗi khi fail
        _window.showPropzyLoadingBPO();
        (async () => {
            const response = await resolveConflictBpo(dataPost);
            _window.hidePropzyLoadingBPO();
            // if(!response.result) {
            //     //show popup alert
            // }
        })();

        // config PriceTag Post API
        const configPriceTagPost: any = {
            method: 'post',
            url: '/price-tag/tag-listing/add',
            data: dataPriceTagPost
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
            <div className="resolve-conflict-container">
                <div className="form-group">
                    <CompareScore
                        saScore={configDetail?.gradeSA}
                        basScore={configDetail?.avgGradeBAs}
                    />
                </div>
                <div className="form-group">
                    <Title
                        text="3.Đánh giá điểm BPO listing"
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
                    <Title text="4.Ghi chú" isRequire={false} />
                    {!_.isEmpty(configDetail?.config) && (
                        <CommentView
                            onDataChange={onDataCommentChange}
                            categoryConfigData={configDetail.config}
                            commentSuggestionResponse={listCommentSuggestion}
                            errorsConfig={errorsConfig}
                            onCommentPriceTagChange={onCommentPriceTagChange}
                        />
                    )}
                </div>
            </div>
            <div className="form-group modal-footer">
                <button className="btn btn-default" onClick={onCloseModal}>
                    <b>Hủy</b>
                </button>
                <button className="btn btn-success" onClick={onSubmit}>
                    <b>Lưu điểm BPO</b>
                </button>
            </div>
        </div>
    ) : (
        <div>{message}</div>
    );

    return renderContent;
};

export default SaResolveConflict;

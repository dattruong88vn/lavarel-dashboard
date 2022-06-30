import React, { useState, useEffect } from "react";
import { RatingView, Title, CommentView } from "components/utils";
import { CategoryConfigResponse, CreateBpoRequest, CommentSuggestionResponse, VoteOptionsResponse } from "model";
import { getCategoryConfig, getListBa, createBpo } from "api/createBpo/createBpoApi";
import { getCommentSuggestion } from "api/core-apis/apiComment";
import { getVoteOptions } from "api/core-apis/apiRating";
import Select from "react-select";
import "./index.scss";
import { handleConvertOptions } from "utils/func";
import { Option } from "utils/form";
import _ from "lodash";
import axios from "axios";

const _window = (window as any).window;

type SaCreateBpoProps = {
    onCloseModal: () => void;
    listingId: any;
    listingTypeId: any;
    _Window: any;
};

const SaCreateBpo: React.FC<SaCreateBpoProps> = (props) => {
    const [permission, setPermission] = useState(false);
    const [message, setMessage] = useState<string | null>("");
    const [errors, setErrors] = useState({
        grade: false,
        listBa: false,
    });
    const [errorsConfig, setErrorsConfig] = useState<any>([]);
    const [listBa, setListBa] = useState<Option[]>([]);
    const [voteOptions, setVoteOptions] = useState<VoteOptionsResponse[]>([]);

    const [listCommentSuggestion, setListCommentSuggestion] = useState<CommentSuggestionResponse[]>([
        {
            categoryId: 0,
            comments: []
        }
    ]);
    const [categoryConfig, setCategoryConfig] = useState<CategoryConfigResponse>({
        minimumNumberOfMembers: 0,
        config: [],
    });
    const [dataPost, setDataPost] = useState<CreateBpoRequest>({
        rlistingId: props.listingId,
        baIds: [],
        grade: 0,
        comments: [],
    });
    const [dataPriceTagPost, setDataPriceTagPost] = useState<any>({
        "listingId": props.listingId,
        "reBPO": false,
        "tagDisplays": [

        ]
    })

    useEffect(() => {
        (async () => {
            //call api configure
            const responseConfigure = await getCategoryConfig({ rListingId: props.listingId });
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

        (async () => {
            const listBa = await getListBa(props.listingTypeId);
            setListBa(handleConvertOptions(listBa.data, "ba"));
        })();
    }, []);

    useEffect(() => {
        const errorsConfig = categoryConfig.config.map((config) => ({
            requiredInput: config.showTextInput ? config.requiredTextInput ? true : false : false,
            errorInput: false,
            requiredImage: config.showPhoto ? config.requiredPhoto ? true : false : false,
            errorImage: false
        }));
        setErrorsConfig(errorsConfig);
    }, [categoryConfig]);

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

    const onChangeSelect = (e: any) => {
        const baIds = e.map((ba: any) => parseInt(ba.value));
        if (baIds.length >= categoryConfig.minimumNumberOfMembers) {
            setErrors({ ...errors, listBa: false });
        }
        setDataPost({ ...dataPost, baIds });
    };

    const onSubmit = () => {
        let validation = {
            grade: false,
            listBa: false,
            config: false,
        };
        if (dataPost.grade === 0) {
            validation.grade = true;
        }
        if (dataPost.baIds.length < categoryConfig.minimumNumberOfMembers) {
            validation.listBa = true;
        }
        setErrors({
            ...errors,
            grade: validation.grade,
            listBa: validation.listBa,
        });
        const errorsConfigAfterCheck = errorsConfig.map(
            (item: any, index: number) => ({
                ...item,
                errorInput: item.requiredInput ? dataPost.comments[index].comments.length === 0 ? true : false : false,
                errorImage: item.requiredImage ? dataPost.comments[index].photos.length === 0 ? true : false : false
            })
        );
        setErrorsConfig(errorsConfigAfterCheck);

        validation.config = errorsConfigAfterCheck.find((item: any) => item.errorInput || item.errorImage) ? true : false;

        if (validation.grade || validation.listBa || validation.config) {
            return;
        }

        props.onCloseModal();
        _window.showPropzyLoadingBPO();
        (async () => {
            const response = await createBpo(dataPost);
            _window.hidePropzyLoadingBPO();

            if (response.code != 200) {
                _window.showPropzyAlertPopupGeneral(response.message);
            } else {
                // reload list
                props._Window.saIndex.reloadList();
            }
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
            <div className="create-bo-container">
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
                <div className="form-group">
                    <Title
                        text={`3.Chọn danh sách BAs đánh giá BPO listing (Chọn ít nhất ${categoryConfig.minimumNumberOfMembers} BA)`}
                        isRequire={true}
                    />
                    <Select
                        placeholder={false}
                        menuPlacement="top"
                        options={listBa}
                        isClearable
                        isMulti
                        className="basic-multi-select"
                        onChange={(e) => onChangeSelect(e)}
                    />
                    {errors.listBa && (
                        <p className="title-red">
                            Vui lòng chọn ít nhất{" "}
                            {categoryConfig.minimumNumberOfMembers} BA
                        </p>
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

export default SaCreateBpo;

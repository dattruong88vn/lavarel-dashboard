import { Title } from "components/utils";
import BAEvaluateBPO from "./BAEvaluateBPO/BAEvaluateBPO";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./SaUpdateBAEvaluateBPO.scss";
import { Option } from "utils/form";
import {
    getListBa,
    getListBaAssigned,
    updateBABPO,
} from "api/saUpdateBA/saUpdateBA";
import { SAUpdateBARequest } from "model";
import { handleConvertOptions } from "utils/func";

const _window = (window as any).window;

type SaUpdateBAEvaluateBPO = {
    onCloseModal: () => void;
    listingId: any;
    togglePopupHistory: Function;
};
const SaUpdateBAEvaluateBPO: React.FC<SaUpdateBAEvaluateBPO> = (props) => {
    const { listingId, togglePopupHistory, onCloseModal } = props;
    const [permission, setPermission] = useState(true);
    const [message, setMessage] = useState<string | null>("");
    const [limitBA, setLimitBA] = useState(0);
    const [listBa, setListBa] = useState<Option[]>([]);
    const [isReloadPopup, setIsReloadPopup] = useState<boolean>(false);

    const onChangeSelect = (e: any) => {
        const basNew = e.map((ba: any) => parseInt(ba.value));

        setDataPost({ ...dataPost, basNew });
    };
    const [dataPost, setDataPost] = useState<SAUpdateBARequest>({
        basRating: [],
        basNew: [],
    });

    useEffect(() => {
        (async () => {
            setIsReloadPopup(false); // set về default sau khi check reload API show lỗi
            _window.showPropzyLoadingBPO();
            const responseGetListBAAssigned = await getListBaAssigned(
                listingId
            );
            _window.hidePropzyLoadingBPO();
            if (responseGetListBAAssigned.code !== 200) {
                setPermission(false);
                setMessage(responseGetListBAAssigned.message);
                return;
            }
            setPermission(true);
            setLimitBA(responseGetListBAAssigned.data.minBaConfig);

            let realDataPost = responseGetListBAAssigned.data.bas.map(
                (itemBA) => {
                    return {
                        ...itemBA,
                        isRemove: false,
                        comment: "",
                        isRequire: false,
                    };
                }
            );
            setDataPost({ ...dataPost, basRating: realDataPost });
        })();

    }, [isReloadPopup]);

    useEffect(() => {
        (async () => {
            const listBa = await getListBa(listingId);
            setListBa(handleConvertOptions(listBa.data, "ba"));
        })();
    }, []);

    const onSubmit = () => {
        // check is require comment
        let isRequireComment = false;
        dataPost.basRating.forEach((itemBA) => {
            if (itemBA.comment == "" && itemBA.isRemove == true) {
                itemBA.isRequire = true;
                isRequireComment = true;
            } else {
                itemBA.isRequire = false;
            }
        });
        setDataPost({ ...dataPost }); // set state to check require comment

        if (isRequireComment) {
            return;
        }

        _window.showPropzyLoadingBPO();
        (async () => {
            const response = await updateBABPO(dataPost, listingId);
            _window.hidePropzyLoadingBPO();

            if (response.code == 200) {
                togglePopupHistory();
            } else if (response.code == 422) {
                _window.showPropzyConfirm({
                    title: "Thông báo",
                    message: response.technicalMessage,
                    btn: {
                        yes: {
                            text: "Có",
                            show: false,
                        },
                        no: {
                            text: "Đóng",
                            show: true,
                        },
                    },
                    cancelCallback: function () {
                        onCloseModal();
                        togglePopupHistory();
                    }
                })
            } else {
                _window.showPropzyConfirm({
                    title: "Thông báo",
                    message: response.technicalMessage,
                    btn: {
                        yes: {
                            text: "Có",
                            show: false,
                        },
                        no: {
                            text: "Đóng",
                            show: true,
                        },
                    },
                    cancelCallback: function () {
                        setIsReloadPopup(true); // trigger reset popup
                    }
                })
            }
        })();
    };

    const handleOnChangeComment = (
        comment: string,
        deleteStatus: boolean,
        userId: number
    ) => {
        dataPost.basRating.forEach((itemBA) => {
            if (itemBA.userId == userId) {
                itemBA.comment = comment;
                itemBA.isRemove = deleteStatus;
            }
        });
    };

    const handleClose = () => {
        onCloseModal();
        togglePopupHistory();
    }

    const renderContent = permission ? (
        <div className="flex-column">
            <div className="update-ba-container">
                <div className="form-group">
                    <p>
                        <span className="color-red">Lưu ý:</span> số lượng BA
                        đánh giá BPO ít nhất là {limitBA} BA
                    </p>
                    <p className="font-weight-bold">Danh Sách BA Đánh Giá BPO</p>
                </div>
                <div className="form-group">
                    {dataPost.basRating &&
                        dataPost.basRating.map((baItem) => {
                            return (
                                <BAEvaluateBPO
                                    onChange={(
                                        comment: string,
                                        deleteStatus: boolean,
                                        userId: number
                                    ) =>
                                        handleOnChangeComment(
                                            comment,
                                            deleteStatus,
                                            userId
                                        )
                                    }
                                    baEvaluaBPO={baItem}
                                    isRequire={baItem.isRequire}
                                    isReloadPopup={isReloadPopup}
                                />
                            );
                        })}
                </div>
                <div className="form-group">
                    <Title text={`Thêm BA Đánh Giá BPO`} isRequire={false} customClassTitle="font-weight-bold"/>
                    <Select
                        placeholder={false}
                        options={listBa}
                        isClearable
                        isMulti
                        className="basic-multi-select"
                        onChange={(e) => onChangeSelect(e)}
                        menuPlacement="top"
                    />
                </div>
            </div>

            <div className="modal-footer">
                <button
                    className="btn btn-default"
                    onClick={handleClose}
                >
                    Hủy
                </button>
                <button className="btn btn-success" onClick={onSubmit}>
                    Cập Nhật
                </button>
            </div>
        </div>
    ) : (
        <div>{message ? message : "Đã có lỗi xảy ra"}</div>
    );

    return renderContent;
};

export default SaUpdateBAEvaluateBPO;

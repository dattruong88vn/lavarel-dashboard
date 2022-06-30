import React, { useState, useEffect } from "react";
import FooterButton from "./FooterButton/FooterButton";
import HistoryTab from "./HistoryTab/HistoryTab";
import "./saBpoEvaluationHistory.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { BpoFinalCaseId, BpoHistoryDateTimeResponse, FinalRating } from "model";
import { saGetCreatedDateBpoHistory } from "api/bpoHistory/bpoHistory";
import moment from "moment";

type ConfigShowButton = {
    showBtnReevaluation: boolean;
    showBtnResolveConflict: boolean;
    showBtnUpdateListBa: boolean;
};
type SaBpoEvaluationHistoryProps = {
    onCloseModal: () => void;
    togglePopupSACreateBPOAgain: Function;
    togglePopupSaUpdateBAEvaluateBPO: Function;
    setIsToggleResolveConflict: () => void;
    listingId?: any;
};

const SaBpoEvaluationHistory: React.FC<SaBpoEvaluationHistoryProps> = (
    props
) => {
    const {
        onCloseModal,
        togglePopupSACreateBPOAgain,
        togglePopupSaUpdateBAEvaluateBPO,
        listingId,
    } = props;
    const [listDateTime, setListDateTime] = useState<
        BpoHistoryDateTimeResponse[]
    >([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [permission, setPermission] = useState(false);
    const [message, setMessage] = useState<string | null>("");
    const [configButton, setConfigButton] = useState<ConfigShowButton>({
        showBtnReevaluation: true,
        showBtnResolveConflict: false,
        showBtnUpdateListBa: false,
    });

    useEffect(() => {
        (async () => {
            const response = await saGetCreatedDateBpoHistory({
                rlistingId: listingId,
            });
            if (response.code !== 200) {
                setPermission(false);
                setMessage(response.message);
                return;
            }
            setPermission(true);
            setMessage(response.message);
            setListDateTime(response.data);
        })();
    }, []);

    const onReevaluatiol = () => {
        togglePopupSACreateBPOAgain();
    };

    const onResolveConflict = () => {
        props.setIsToggleResolveConflict();
    };

    const onUpdateListBa = () => {
        togglePopupSaUpdateBAEvaluateBPO();
    };

    const handleChange = (index: number, last: number, event: Event) => {
        setTabIndex(index);
        if (index > 0) {
            return setConfigButton({
                showBtnReevaluation: true,
                showBtnResolveConflict: false,
                showBtnUpdateListBa: false,
            });
        }
    };
    const loadDataTabDone = (data: FinalRating, tabIndex: number) => {
        if (tabIndex > 0) {
            return setConfigButton({
                showBtnReevaluation: true,
                showBtnResolveConflict: false,
                showBtnUpdateListBa: false,
            });
        }
        const resultKey = data?.bpoFinalCaseId;
        switch (resultKey) {
            case BpoFinalCaseId.INCOMPLETE_BPO:
                return setConfigButton({
                    ...configButton,
                    showBtnUpdateListBa: true,
                });
            case BpoFinalCaseId.COMPLETE_BUT_CONFLICT:
                return setConfigButton({
                    ...configButton,
                    showBtnResolveConflict: true,
                });
            default:
                return setConfigButton({
                    showBtnReevaluation: true,
                    showBtnResolveConflict: false,
                    showBtnUpdateListBa: false,
                });
        }
    };
    const tabCard = (item: BpoHistoryDateTimeResponse) => {
        return (
            <div className="tab-card">
                <label className="date-time-label">
                    {moment(item.createdDate).format("DD/MM/YYYY")}
                </label>
                <label className="date-time-label">
                    {moment(item.createdDate).format(" HH:mm")}
                </label>
            </div>
        );
    };

    const renderContent = permission ? (
        <div className="flex-column">
            <div className="evaluation-history-container">
                <p className="nomal-title"> Ngày tạo BPO</p>
                <Tabs onSelect={handleChange}>
                    <TabList className="react-tabs.react-tabs__tab-list tab-list">
                        {listDateTime?.map((item) => {
                            return (
                                <Tab selectedClassName="tab--selected">
                                    {tabCard(item)}
                                </Tab>
                            );
                        })}
                    </TabList>

                    {listDateTime?.map((item, index) => {
                        return (
                            <TabPanel>
                                <HistoryTab
                                    ratingId={item.ratingId}
                                    rlistingId={listingId}
                                    tabIndex={index}
                                    loadDataDone={loadDataTabDone}
                                />
                            </TabPanel>
                        );
                    })}
                </Tabs>
            </div>
            <FooterButton
                showBtnReevaluation={configButton.showBtnReevaluation}
                showBtnResolveConflict={configButton.showBtnResolveConflict}
                showBtnUpdateListBa={configButton.showBtnUpdateListBa}
                onReevaluatiol={onReevaluatiol}
                onResolveConflict={onResolveConflict}
                onUpdateListBa={onUpdateListBa}
            />
        </div>
    ) : (
        <div>{message}</div>
    );

    return renderContent;
};

export default SaBpoEvaluationHistory;

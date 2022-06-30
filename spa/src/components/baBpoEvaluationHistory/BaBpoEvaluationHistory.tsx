import React, { useState, useEffect } from "react";
import HistoryTab from "./HistoryTab/BaHistoryTab";
import "./baBpoEvaluationHistory.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { BpoHistoryDateTimeResponse } from "model";
import { baGetCreatedDateBpoHistory } from "api/bpoHistory/bpoHistory";
import moment from "moment";

type BaBpoEvaluationHistoryProps = {
    onCloseModal: () => void;
    listingId?: any;
};

const BaBpoEvaluationHistory: React.FC<BaBpoEvaluationHistoryProps> = (
    props
) => {
    const { listingId = 184002 } = props;
    const [listDateTime, setListDateTime] = useState<
        BpoHistoryDateTimeResponse[]
    >([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [permission, setPermission] = useState(false);
    const [message, setMessage] = useState<string | null>("");

    useEffect(() => {
        (async () => {
            const response = await baGetCreatedDateBpoHistory({
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

    const handleChange = (index: number, last: number, event: Event) => {
        setTabIndex(index);
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
        <>
            <div className="ba-evaluation-history-container">
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
                                    index={index}
                                />
                            </TabPanel>
                        );
                    })}
                </Tabs>
            </div>
        </>
    ) : (
        <div>{message}</div>
    );

    return renderContent;
};

export default BaBpoEvaluationHistory;

import React, { useState, useEffect } from 'react';
import ChartModel from 'model/ChartModel';
import { getBaChart } from 'api/ba/baApi';
import * as constants from 'constants/index';

type ChartProps = {
    permissionIdBpo: string
}

const Chart : React.FC<ChartProps> = (props) => {
    const [charts, setCharts] = useState<Array<ChartModel.RootObject>>([]);

    const getPercent = (count: any): number => {
        let total: number = 0;
        charts.forEach((chart) => {
            chart.data.forEach((item) => {
                if (item.count && item.count > total) {
                    total = item.count;
                }
            })
        })
        return (count * 100) / total;
    }

    useEffect(() => {
        (async () => {
            const response = await getBaChart();
            setCharts(response.data);
        })();
    }, []);

    return (
        <div className="panel panel-default custom-panel-bsa" style={{ lineHeight: "45px", height: "100%" }}>
            <div id="bpo-chart" className="panel-body">
                <div className="row">
                    <div className="col-md-12">
                        <label className="control-label">BPO </label>
                    </div>
                </div>
                {charts.map((chart, index) => (
                    <div key={index}>
                        <label>{chart.label}</label>
                        {chart.data.map((item, index2) => {
                            let backgroundColor, width;
                            const revenue = chart.bpoType !== constants.CODE_NOT_YET_BPO ? `Doanh thu ước tính ${item.revenue ? item.revenue : 0}` : '';
                            if (item.count && item.count > 0) {
                                backgroundColor = `${item.subType ? constants.COLOR_CHART[item.subType] : constants.COLOR_CHART[chart.bpoType]}`;
                                width = `${getPercent(item.count)}%`;
                            }
                            return <div key={index2} className="row" style={{ marginBottom: "5px" }}>
                                <div className="col-md-4">
                                    <p className="text-muted" style={{ paddingLeft: '20px' }}>{item.subLabel}</p>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="block-chart">
                                                <a href={parseInt(props.permissionIdBpo) == 1 ? void(0) : `/bpo-listing?bpoCode=${item.bpoCode}`} target="_blank" data-toggle="tooltip"
                                                    title={revenue}
                                                    className="chart-tooltip"
                                                    style={{
                                                        cursor: "pointer",
                                                        display: "inline-block",
                                                        color: 'white',
                                                        height: "36px",
                                                        padding: "3px",
                                                        backgroundColor: backgroundColor,
                                                        width: width
                                                    }}></a>
                                                <span>{item.count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Chart;
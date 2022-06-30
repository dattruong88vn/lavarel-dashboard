import React, {Fragment} from "react";
import Select from 'react-select';
import {getDistricts, getWards, getStreetsByWardIds} from "../../Services/ZonesService";
class PositionItem2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: props.positionData,
            districtOptions: [],
            wardOptions: [],
            streetOptions: [],
        }
    }
    componentDidMount() {
        this.getDistricts(this.props.positionData.cityId);

    }
    getDistricts(cityId) {
        getDistricts(cityId, (response) => {
            let districtOptions = response.map((item) => {
                return {value: item.districtId, label: item.districtName}
            })
            this.setState({
                "position": {
                    ...this.state.position,
                    "districtList": response,
                },
                "districtOptions": districtOptions
            }, () => {
                this.props.updateData({
                    ...this.state.position,
                    "districtList": response
                });
                if (this.state.position.districtIds && this.state.position.districtIds.length > 0) {
                    this.getWards(this.state.position.districtIds[0]);
                }
            })
        })
    }
    onDistrictChange(name, data) {
        var districtId = data.value;
        this.getWards(districtId);
    }
    getWards(districtId) {
        getWards(districtId, (response) => {
            if (!response.result) {
                return false;
            }
            let options = response.data.map((item) => {
                return {value: item.wardId, label: item.wardName}
            })
            this.setState({
                "position": {
                    ...this.state.position,
                    districtIds: [districtId],
                    "wardList": response.data,
                    streetIds: this.state.position.streetIds || []
                },
                "wardOptions": options
            }, () => {
                let obj = {
                    ...this.state.position,
                    "districtIds": [districtId],
                    "wardList": response.data,
                    streetIds: this.state.position.streetIds || []
                };
                this.props.updateData(obj);
                if (this.state.position.wardIds) {
                    this.getStreetsByWardIds(this.state.position.wardIds);
                }
            })
        })
    }
    onWardChange(name, data) {

        let wardIds = data.value;
        this.getStreetsByWardIds([wardIds]);
    }
    getStreetsByWardIds(wardIds) {
        getStreetsByWardIds(wardIds, (response) => {
            let options = response.data.map((item) => {
                return {value: item.streetId, label: item.streetName}
            });
            this.setState({
                "position": {
                    ...this.state.position,
                    wardIds: wardIds
                },
                "streetOptions": options
            },

                () => {
                    this.props.updateData({
                        ...this.state.position,
                        wardIds: wardIds,
                        "streetList": response.data
                    });
                }

            )
        })
    }
    onStreetChange(name, data) {
        // let streetIds = [];
        // for(let i=0;i<data.length; i++){
        //     streetIds.push(data[i].value);
        // }
        let streetIds = data.value;
        this.setState({
            "position": {
                ...this.state.position,
                streetIds: [streetIds]
            }
        }, () => {
            this.props.updateData({
                ...this.state.position,
                streetIds: [streetIds],
            });
        })
    }
    render() {
        return (
            <div className="row form-group">
                <div className="col-sm-3 pr0">
                    <Select
                        value={this.state.districtOptions && this.state.districtOptions.filter((item) => {
                            if (!this.state.position.districtIds) {
                                return false;
                            }
                            return this.state.position.districtIds.filter((district) => {
                                return district == item.value;
                            }).length > 0;
                        })}
                        isSearchable={false}
                        options={this.state.districtOptions}
                        onChange={this.onDistrictChange.bind(this, "districtIds")}
                        placeholder="Quận" />
                </div>
                <div className="col-sm-3 pr0">
                    <Select
                        value={this.state.wardOptions && this.state.wardOptions.filter((item) => {
                            if (!this.state.position.wardIds) {
                                return false;
                            }
                            return this.state.position.wardIds.filter((ward) => {
                                return ward == item.value;
                            }).length > 0;
                        })}
                        isSearchable={false}
                        options={this.state.wardOptions}
                        isMulti={false}
                        onChange={this.onWardChange.bind(this, "wardIds")}
                        placeholder="Phường" />
                </div>
                <div className="col-sm-4">
                    <Select
                        value={this.state.streetOptions && this.state.streetOptions.filter((item) => {
                            if (!this.state.position.streetIds) {
                                return false;
                            }
                            return this.state.position.streetIds.filter((street) => {
                                return street == item.value;
                            }).length > 0;
                        })}
                        isSearchable={false}
                        options={this.state.streetOptions}
                        // isMulti= {true}
                        onChange={this.onStreetChange.bind(this, "streetIds")}
                        placeholder="Đường" />
                </div>
                <div className="col-sm-2 pr0 pl0">

                </div>
            </div>
        )
    }
}
export default PositionItem2;
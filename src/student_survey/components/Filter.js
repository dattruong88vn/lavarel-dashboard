import React, { Component } from 'react';
import 'babel-polyfill';
import {connect} from "react-redux";
import {InputPhone, InputText, InputDate} from "../../commonComponents/input/InputLabel";
import {Select2} from "../../commonComponents/select/selectLabel";
import axios from "axios";
import ButtonShowModalSendMail from './ButtonShowModalSendMail';
import moment from "moment";
import GoogleMap from "../reducers/GoogleMap";


class Filter extends Component {
    constructor(props) {
        super(props);
        this._URL = {
            'GET_DISTRICTS_BY_CITY' : '/zone/get-district-list-by-city',
            'GET_WARDS' : '/zone/get-wards',
            'GET_STREETS' : '/zone/get-streets',
            'GET_ALLEY_BY_STREET' : '/zone/get-alley-by-street',
            'GET_STATUS_SURVEY' : '/student-survey/get-status-survey',
            'GET_CC' : '/student-survey/get-cc-Staff',
            'GET_STUDENTS_FROM_CC' : '/student-survey/get-students-from-cc'
        };
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"},
            formatDate : 'dd/mm/yyyy',
            formatDateMoment : 'DD/MM/YYYY',
            isAdmin : currentUser ? currentUser.departments[0].isGroupAdmin : false,
        };
        this.state = {
            changeButtonMap : {
                text : 'Mở bản đồ'
            }
        };
    }
    async initPromiseApi($name, $request = {}) {
      const that = this;
      //get district
      let response = null;
      switch ($name) {
          case 'GET_DISTRICTS_BY_CITY' : {
              let districts = [that._STORED_LOCAL.defaultValue];
              await axios.get(that._URL.GET_DISTRICTS_BY_CITY + '/' + $request.cityId, {params: {}})
                  .then(xhr => {
                      response = xhr.data;
                  })
                  .catch(err => {
                      console.error(err);
                  });
              if (response) {
                  if (response.result && response.data.length > 0) {
                      let districtsContent = response.data.map((it) => {
                          return {value: it.districtId, label: it.districtName};
                      });
                      districts = districts.concat(districtsContent);
                  }
              }
              that.props.dispatch({type:'SET_DISTRICTS_LIST', data: districts});
              break;
          }
          case 'GET_WARDS' : {
              let data = [that._STORED_LOCAL.defaultValue];
              await axios.get(that._URL.GET_WARDS + '/' + $request.districtId, {params: {}})
                  .then(xhr => {
                      response = xhr.data;
                  })
                  .catch(err => {
                      console.error(err);
                  });
              if (response) {
                  if (response.result && response.data.length > 0) {
                      let dataContent = response.data.map((it) => {
                          return {value: it.wardId, label: it.wardName};
                      });
                      data = data.concat(dataContent);
                  }
              }
              that.props.dispatch({type:'SET_WARD_LIST', data: data});
              break;
          }
          case 'GET_STREETS' : {
              let data = [that._STORED_LOCAL.defaultValue];
              await axios.get(that._URL.GET_STREETS + '/' + $request.wardId, {params: {}})
                  .then(xhr => {
                      response = xhr.data;
                  })
                  .catch(err => {
                      console.error(err);
                  });
              if (response) {
                  if (response.result && response.data.length > 0) {
                      let dataContent = response.data.map((it) => {
                          return {value: it.streetId, label: it.streetName};
                      });
                      data = data.concat(dataContent);
                  }
              }
              that.props.dispatch({type:'SET_STREET_LIST', data: data});
              break;
          }
          case 'GET_ALLEY_BY_STREET' : {
              let data = [that._STORED_LOCAL.defaultValue];
              await axios.get(that._URL.GET_ALLEY_BY_STREET + '/' + $request.streetId, {params: {}})
                  .then(xhr => {
                      response = xhr.data;
                  })
                  .catch(err => {
                      console.error(err);
                  });
              if (response) {
                  if (response.result && response.data.length > 0) {
                      let dataContent = response.data.map((it) => {
                          return {value: it.alleyId, label: it.alleyName};
                      });
                      data = data.concat(dataContent);
                  }
              }
              that.props.dispatch({type:'SET_ALLEY_LIST', data: data});
              break;
          }
          case 'GET_STATUS_SURVEY' : {
              let data = [that._STORED_LOCAL.defaultValue];
              await axios.get(that._URL.GET_STATUS_SURVEY, {params: {}})
                  .then(xhr => {
                      response = xhr.data;
                  })
                  .catch(err => {
                      console.error(err);
                  });
              if (response) {
                  if (response.result && response.data.length > 0) {
                      const dataFilter = response.data.filter(it => [3, 4, 5, 6].indexOf(it.id) > -1);
                      let dataContent = dataFilter.map((it) => {
                          return {value: it.id, label: it.name};
                      });
                      data = data.concat(dataContent);
                  }
              }
              that.props.dispatch({type:'SET_STATUS_SURVEY', data: data});
              break;
          }
          case 'GET_CC' : {
              let data = [that._STORED_LOCAL.defaultValue];
              await axios.get(that._URL.GET_CC, {params: {
                      scheduleTime : null,
                      estimatedDate : null,
                      keySearch : null
                  }})
                  .then(xhr => {
                      response = xhr.data;
                  })
                  .catch(err => {
                      console.error(err);
                  });
              if (response) {
                  if (response.result && response.data.length > 0) {
                      let dataContent = response.data.map((it) => {
                          return {value: it.agentId, label: it.name};
                      });
                      data = data.concat(dataContent);
                  }
              }
              that.props.dispatch({type:'SET_CC_LIST', data: data});
              break;
          }
          case 'GET_STUDENTS_FROM_CC' : {
              let data = [];
              await axios.post(that._URL.GET_STUDENTS_FROM_CC, {conciergeIds : $request.conciergeIds})
                  .then(xhr => {
                      response = xhr.data;
                  })
                  .catch(err => {
                      console.error(err);
                  });
              if (response) {
                  if (response.result && response.data.length > 0) {
                      let dataContent = response.data.map((it) => {
                          return {value: it.userId, label: it.name, email: it.email};
                      });
                      data = data.concat(dataContent);
                  }
              }
              that.props.dispatch({type:'SET_STUDENTS_LIST', data: data});
              break;
          }
      }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.filter !== this.props.filter) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        const that = this;
        //
        $('#fromCreatedDate').datepicker({
            format: that._STORED_LOCAL.formatDate,
        }).on('changeDate',function (e) {
            dispatch({type:'SET_FILTER_DATA_INPUT', data: {fromCreatedDate :  e.date.valueOf() ?  e.date.valueOf()  : null}});
        });
        $('#toCreatedDate').datepicker({
            format: that._STORED_LOCAL.formatDate,
        }).on('changeDate',function ( e) {
            dispatch({type:'SET_FILTER_DATA_INPUT', data: {toCreatedDate :   e.date.valueOf() ?  e.date.valueOf()  : null}});
        });


        let {dispatch} = that.props;

        that.initPromiseApi("GET_DISTRICTS_BY_CITY", {cityId : 1});
        that.initPromiseApi("GET_STATUS_SURVEY");
        if(that._STORED_LOCAL.isAdmin) {
            that.initPromiseApi("GET_CC");
        } else {
            dispatch({type:'SET_FILTER_DATA_INPUT', data: {conciergeIds :  currentUser.userId}});
            that.initPromiseApi("GET_STUDENTS_FROM_CC", {conciergeIds : currentUser.userId});
        }
    }


    handleChangeSelect($feild, $option) {
        const that = this;
        let {dispatch} = this.props;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.value;
        dispatch({type:'SET_FILTER_DATA_SELECT', value: value, data: data});
        switch ($feild) {
            case 'districtId' : {
                that.initPromiseApi('GET_WARDS', {districtId : $option.value});
                break;
            }
            case 'wardId' : {
                that.initPromiseApi('GET_STREETS', {wardId : $option.value});
                break;
            }
            case 'streetId' : {
                that.initPromiseApi('GET_ALLEY_BY_STREET', {streetId : $option.value});
                break;
            }
            case 'conciergeIds' : {
                that.initPromiseApi('GET_STUDENTS_FROM_CC', {conciergeIds : $option.value});
                break;
            }
        }
    }

    handleChangeSelectMulti($feild, $option) {
        let {dispatch} = this.props;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.map(it => it.value).join(',');
        dispatch({type:'SET_FILTER_DATA_SELECT', value: value, data: data});
    }

    handleChangeInputText(event) {

        let {dispatch} = this.props;
        let data = {};
        data[event.target.id] = event.target.value;
        dispatch({type:'SET_FILTER_DATA_INPUT', data: data});
    }

    //function click filter
    handleClickFilter() {
        let {survey} = this.props;
        if (survey.table) {
            survey.table.ajax.reload();
        } else {
            console.error("The table is not init");
        }
    }

    handleClickClearFilter() {
        let {dispatch, survey} = this.props;
        // reset filter
        dispatch({type:'RESET_FILTER'});

        // reload table
        setTimeout(function () {
            if (survey.table) {
                survey.table.ajax.reload();
            } else {
                console.error("The table is not init");
            }
        },500);
    }

    handleClickShowMap() {
        let {dispatch, googleMap, survey} = this.props;
        let isDraw = googleMap.isDraw;
        let rows = [];
        if (survey.table) {
            rows = survey.table.data().toArray();
        }
        dispatch({type:'GET_DATA_LIST_GOOGLE_MAP', isDraw : !isDraw, rows : rows, dispatch: dispatch});
    }

    render() {
        const that = this;
        let isDraw = that.props.googleMap.isDraw;
        let textBtnMap = 'Đóng bản đồ';
        if(!isDraw) {
            textBtnMap =  'Mở bản đồ';
        }
        const row1 = function () {
            if(that._STORED_LOCAL.isAdmin) {
                return (
                    <div className="row form-group">
                        <div className="col-md-3">
                            <InputDate
                                id="fromCreatedDate"
                                label="Từ ngày"
                                value={moment(that.props.filter.postData.fromCreatedDate).format(that._STORED_LOCAL.formatDateMoment)}
                            />
                        </div>
                        <div className="col-md-3">
                            <InputDate
                                id="toCreatedDate"
                                label="Đến ngày"
                                value={moment(that.props.filter.postData.toCreatedDate).format(that._STORED_LOCAL.formatDateMoment)}
                            />
                        </div>
                        <div className="col-md-3">
                            <Select2
                                id="conciergeIds"
                                label="Concierge"
                                options={that.props.filter.ccs}
                                value={that.props.filter.filterSelect.conciergeIds ? that.props.filter.filterSelect.conciergeIds : that._STORED_LOCAL.defaultValue}
                                onChange={that.handleChangeSelect.bind(that, 'conciergeIds')}
                            />
                        </div>
                        <div className="col-md-3">
                            <Select2
                                id="userIds"
                                label="Sinh viên"
                                isMulti={true}
                                options={that.props.filter.studentList}
                                value={that.props.filter.filterSelect.userIds ? that.props.filter.filterSelect.userIds : []}
                                onChange={that.handleChangeSelectMulti.bind(that, 'userIds')}
                            />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="row form-group">
                        <div className="col-md-3">
                            <InputDate
                                id="fromCreatedDate"
                                label="Từ ngày"
                                value={moment(that.props.filter.postData.fromCreatedDate).format(that._STORED_LOCAL.formatDateMoment)}
                            />
                        </div>
                        <div className="col-md-3">
                            <InputDate
                                id="toCreatedDate"
                                label="Đến ngày"
                                value={moment(that.props.filter.postData.toCreatedDate).format(that._STORED_LOCAL.formatDateMoment)}
                            />
                        </div>
                        <div className="col-md-3">
                            <Select2
                                id="userIds"
                                label="Sinh viên"
                                isMulti={true}
                                options={that.props.filter.studentList}
                                value={that.props.filter.filterSelect.userIds ? that.props.filter.filterSelect.userIds : []}
                                onChange={that.handleChangeSelectMulti.bind(that, 'userIds')}
                            />
                        </div>
                        <div className="col-md-3">
                            <InputPhone
                                id="phone"
                                label="Phone"
                                value={that.props.filter.postData.phone}
                                onChange={that.handleChangeInputText.bind(that)}
                            />
                        </div>
                    </div>
                )
            }
        };
        const row2 = function () {
            return(
                <div className="row form-group">
                    <div className="col-md-3">
                        <Select2
                            id="district"
                            label="Quận"
                            options={that.props.filter.districts}
                            value={that.props.filter.filterSelect.districtId ? that.props.filter.filterSelect.districtId : that._STORED_LOCAL.defaultValue}
                            onChange={that.handleChangeSelect.bind(that, 'districtId')}
                        />
                    </div>
                    <div className="col-md-3">
                        <Select2
                            id="ward"
                            label="Phường"
                            options={that.props.filter.wards}
                            value={that.props.filter.filterSelect.wardId ? that.props.filter.filterSelect.wardId : that._STORED_LOCAL.defaultValue}
                            onChange={that.handleChangeSelect.bind(that, 'wardId')}
                        />
                    </div>
                    <div className="col-md-3">
                        <Select2
                            id="streets"
                            label="Đường"
                            options={that.props.filter.streets}
                            value={that.props.filter.filterSelect.streetId ? that.props.filter.filterSelect.streetId : that._STORED_LOCAL.defaultValue}
                            onChange={that.handleChangeSelect.bind(that, 'streetId')}
                        />
                    </div>
                    <div className="col-md-3">
                        <Select2
                            id="alleys"
                            label="Hẻm"
                            options={that.props.filter.alleys}
                            value={that.props.filter.filterSelect.alleyId ? that.props.filter.filterSelect.alleyId : that._STORED_LOCAL.defaultValue}
                            onChange={that.handleChangeSelect.bind(that, 'alleyId')}
                        />
                    </div>

                </div>
            )
        };
        const row3 = function () {
            if(that._STORED_LOCAL.isAdmin) {
                return(
                    <div className="row form-group">
                        <div className="col-md-3">
                            <Select2
                                id="status-survey"
                                label="Trạng thái"
                                options={that.props.filter.confirmStatus}
                                value={that.props.filter.filterSelect.confirmStatusIds ? that.props.filter.filterSelect.confirmStatusIds : that._STORED_LOCAL.defaultValue}
                                onChange={that.handleChangeSelect.bind(that, 'confirmStatusIds')}
                            />
                        </div>
                        <div className="col-md-3">
                            <InputPhone
                                id="phone"
                                label="Phone"
                                value={that.props.filter.postData.phone}
                                onChange={that.handleChangeInputText.bind(that)}
                            />
                        </div>
                        <div className="col-md-12 text-right db-btn-group">
                            <button className="btn-sm btn btn-warning" onClick={that.handleClickShowMap.bind(that)}>{textBtnMap}</button>
                            <ButtonShowModalSendMail>Gửi email</ButtonShowModalSendMail>
                            <button className="btn-sm btn btn-primary" onClick={that.handleClickFilter.bind(that)}>Lọc dữ liệu</button>
                            <button className="btn-sm btn btn-default" onClick={that.handleClickClearFilter.bind(that)}>Bỏ lọc</button>
                        </div>
                    </div>
                )
            } else {
                return(
                    <div className="row form-group">
                        <div className="col-md-3">
                            <Select2
                                id="status-survey"
                                label="Trạng thái"
                                options={that.props.filter.confirmStatus}
                                value={that.props.filter.filterSelect.confirmStatusIds ? that.props.filter.filterSelect.confirmStatusIds : that._STORED_LOCAL.defaultValue}
                                onChange={that.handleChangeSelect.bind(that, 'confirmStatusIds')}
                            />
                        </div>
                        <div className="col-md-12 text-right db-btn-group">
                            <button className="btn-sm btn btn-warning" onClick={that.handleClickShowMap.bind(that)}>{textBtnMap}</button>
                            <ButtonShowModalSendMail>Gửi email</ButtonShowModalSendMail>
                            <button className="btn-sm btn btn-primary" onClick={that.handleClickFilter.bind(that)}>Lọc dữ liệu</button>
                            <button className="btn-sm btn btn-default" onClick={that.handleClickClearFilter.bind(that)}>Bỏ lọc</button>
                        </div>
                    </div>
                )
            }

        };


        return (
            <div className="row">
                <div className="box box-info">
                    <div className="box-body">
                        {row1()}
                        {row2()}
                        {row3()}
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(function (state) {
    return {filter: state.Filter, survey: state.Survey, googleMap : state.GoogleMap}
})(React.memo(Filter));
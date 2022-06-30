import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import moment from 'moment';
import GoogleMap from "../reducers/GoogleMap";


class TableSurvey extends Component {
  constructor(props) {
    super(props);
    this._URL = {
        'surveyList' : '/student-survey/get-list-survey',
    };
    this._COLUMNS = [];
    this._TABLE_SURVEY = null;
    this.bindEvents();
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
      return false;
  }

    componentWillMount() {
      this._COLUMNS = [
          {
              data: 'surveyId',
              name: 'ID'
          },
          {
              data: 'districtName',
              name: 'Quận'
          },
          {
              data: 'wardName',
              name: 'Phường'
          },
          {
              data: 'streetName',
              name: 'Đường'
          },
          {
              data: 'alleyName',
              name: 'Hẻm'
          },
          {
              data: 'userName',
              name: 'Tên SV'
          },
          {
              data: 'phone',
              name: 'Phone',
              render($data, $type, $object, $position) {
                  if($data) {
                      return `<p class="btn-phone-call-line">`+$data+`<i class="fa fa-phone"></i></p>`
                  }
                  return `N/A`;
              }
          },
          {
              data: 'createdDate',
              name: 'Ngày tạo',
              render($data, $type, $object, $position) {
                  return moment($data).format('DD/MM/YYYY HH:mm');
              }
          },
          {
              data: 'confirmStatusName',
              name: 'Trạng thái',
              class: 'text-center',
              width : '70px',
              render($data, $type, $object, $position) {
                  switch ($object.confirmStatus) {
                      case 3 :
                          return `<span class="text-primary">`+$data+`</span>`;
                      case 4 :
                          return `<span class="text-success">`+$data+`</span>`;
                      case 5 :
                          return `<span class="text-danger">`+$data+`</span>`;
                      case 6 :
                          return `<span class="text-warning">`+$data+`</span>`;
                  }
              }
          },
          {
              data: 'actions',
              width : "140px",
              class: "text-left",
              name: '',
              render($data, $type, $object, $position) {
                  let html = ``;
                  switch ($object.confirmStatus) {
                      case 4 :
                      case 5: {
                          html = `<div class="input-group-sm">
                          <i class="fa fa-eye survey-show-map btn-sm btn-primary"></i>
                          <i class="fa fa-list survey-action-info btn-sm btn-warning"></i>
                        </div>`;
                          break;
                      }
                      default : {
                          html = `<div class="input-group-sm">
                          <i class="fa fa-eye survey-show-map btn-sm btn-primary"></i>
                          <i class="fa fa-check survey-action-accept btn-sm btn-success"></i>
                          <i class="fa fa-close survey-action-cancel btn-sm btn-danger"></i>
                          <i class="fa fa-list survey-action-info btn-sm btn-warning"></i>
                      </div>`;
                          break;
                      }
                  }
                  return html;
              }
          }
      ];
  }

    componentDidMount() {
        const that = this;
        let {dispatch} = that.props;
        that._TABLE_SURVEY = $('#table-survey')
            .DataTable({
                processing: false,
                serverSide: true,
                //deferLoading : false,
                ajax: {
                    url: that._URL.surveyList,
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, that.props.filter.postData);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                order: [[0, 'desc']],
                pageLength : 1000,
                scrollY: "500px",
                scrollCollapse : true,
                language: DatatableHelper.languages.vn,
                columns: that._COLUMNS,
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {
                if(json && json.result === true && Array.isArray(json.data)) {
                    dispatch({type:'GET_DATA_LIST_GOOGLE_MAP', rows: json.data,dispatch: dispatch});
                }
            });
        dispatch({type:'SET_TABLE', table: that._TABLE_SURVEY});
  }
  componentWillUnmount() {
      const that = this;
      let {dispatch} = that.props;
      $('#table-survey').DataTable().destroy(true);
      that._TABLE_SURVEY = null;
      dispatch({type:'SET_FILTER_DATA', table: null});
  }
  // function handel
    
    bindEvents() {
      const that = this;
      let {dispatch} = that.props;
      $(document).off('.survey-show-map').on('click', '.survey-show-map', function (e) {
          e.preventDefault();
          const tr = $(this).closest('tr');
          const row = that._TABLE_SURVEY.row( tr );
          const data = row.data();
          dispatch({type:'SET_FILTER_MAP', data : null});
          dispatch({type:'GET_DATA_LIST_GOOGLE_MAP', isDraw : true, rows : [data], dispatch: dispatch});
      });
        $(document).off('.survey-action-accept').on('click', '.survey-action-accept', function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = that._TABLE_SURVEY.row( tr );
            const data = row.data();
            that.handleClickAcceptSurvey(data);
        });
        $(document).off('.survey-action-cancel').on('click', '.survey-action-cancel', function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = that._TABLE_SURVEY.row( tr );
            const data = row.data();
            that.handleClickCancelSurvey(data);
        });
        $(document).off('.btn-phone-call-line').on('click', '.btn-phone-call-line', function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = that._TABLE_SURVEY.row( tr );
            const data = row.data();
            that.callStudent(data);
        });
        $(document).off('.survey-action-info').on('click', '.survey-action-info', function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = that._TABLE_SURVEY.row( tr );
            const data = row.data();
            showPropzyLoading();
            $.ajax({
                url: "/student-survey/view-examine",
                type: "get",
                data: "surveyId=" + data.surveyId
            }).done(function (response){
                dispatch({type:'SET_EXAM_LIST', data: response.result ? response.data : []});
                dispatch({type:'SET_SHOW_MODAL_EXAM', data: true});
            }).always(function () {
                hidePropzyLoading();
            });
        });
    }



    handleClickAcceptSurvey($data) {
        const {dispatch} = this.props;
        dispatch({type:'SET_SHOW_ACCEPT', data: true});
        dispatch({type:'SET_DATA_REVIEW_SURVEY', data: {surveyId: $data.surveyId}});
    }
    handleClickCancelSurvey($data) {
        const {dispatch} = this.props;
        $.ajax({
            url: "/student-survey/get-status-reject-survey",
            type: "get" 
        }).done(function(response){
            if (response.data) {
                var result = $.map(response.data.list[0].childs, function (x) {
                    return {
                        value: x.id,
                        label: x.name
                    };
                });
                dispatch({type:'SET_REJECT_SURVEY_LIST', data: result});
            }
        });
        dispatch({type:'SET_SHOW_REJECT', data: true});
        dispatch({type:'SET_DATA_REVIEW_SURVEY', data: {surveyId: $data.surveyId}});
        dispatch({type:'SET_USER_REJECT', data: $data.userId});
    }

    callStudent($data) {
        $(".btn-phone-call-line").prop("disabled", true);
      if(typeof($data) !== 'undefined' && typeof ($data.phone) !== 'undefined' && $data.phone !== null) {
          const params = {
              phoneNumber : $data.phone,
              showLoading : false,
              onCallEnded : (callInfo) => {
                  // get CCall info
                  $(".btn-phone-call-line").prop("disabled", false);
                  console.group();
                  console.info('CC-Call response');
                  console.info(callInfo);
                  console.groupEnd();
                  /*let dataTrack = {
                      duration: callInfo.duration,
                      phone: callInfo.number,
                      startedDate: callInfo.startTime * 1000,
                      endedDate: (callInfo.endTime ? callInfo.endTime : moment().unix()) * 1000,
                      statusId: callInfo.statusId,
                      recordLink: null,
                      id : that.stored.id,
                      department : currentUser.department
                  };*/
                  // get link track call
                 /* CCall.getCallInfo({
                      callId: callInfo.id, callBack: function (res) {

                      }
                  });*/
              }
          };

          // call
          if(typeof (CCall) !== 'undefined') {
              CCall.makeCall(params);
          } else {
              throw "Miss CCall file. Please include the CCall file to DB";
          }
      }
    }


    render(){
      const that = this;
      let nameOfColumns = that._COLUMNS.map(column => {
          return (<th key={column.data}>{column.name ? column.name : ''}</th>);
      });
      return(
          <table id={"table-survey"} className={"table table-bordered table-striped dataTable"}>
              <thead>
              <tr>{nameOfColumns}</tr>
              </thead>
          </table>);
  }

}
export default connect(function (state) {
    return {
        filter : state.Filter,
        survey: state.Survey,
        googleMap : state.GoogleMap
    }
})(TableSurvey);
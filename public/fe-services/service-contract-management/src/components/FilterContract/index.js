import React, { useEffect, useRef, useState } from "react";
import SelectCustomizeFlowBootrap3 from "../Select";
import { GroupButton, Container } from "./style";
import _ from "lodash";
import moment from "moment";
import useFilters from "../../hooks/useFilter";
import ReactDatePicker from "react-datepicker";

const defaultValue = { value: "", label: "Tất cả" };

function FilterContract(props) {
  const { onSearchClick } = props;

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const contractCodeRef = useRef(null);
  const ownerNameRef = useRef(null);
  const addressRef = useRef(null);
  const serviceTypeRef = useRef(null);
  const servicePackageRef = useRef(null);
  const zoneRef = useRef(null);
  const teamRef = useRef(null);
  const departmentRef = useRef(null);
  const userRef = useRef(null);
  const statusRef = useRef(null);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [
    serviceTypeOptions,
    getServiceType,
    servicePackageOptions,
    getServicePackage,
    zoneOptions,
    getZone,
    teamOptions,
    getTeam,
    departmentOptions,
    getDepartment,
    userOptions,
    getUser,
    statusOptions,
    getStatus,
    permissionId,
    onGetCurrentUser,
  ] = useFilters();

  useEffect(() => {
    setDefaultFilter();
    onGetCurrentUser();
  }, []);

  useEffect(() => {
    if (_.isNumber(permissionId)) {
      getZone();
      getTeam(zoneRef);
      getDepartment();
      getUser(zoneRef, teamRef, departmentRef);
      getServiceType();
      getServicePackage();
      getStatus();
      onSearch();
    }
  }, [permissionId]);

  const setDefaultFilter = () => {
    const fromDateDefault = moment().subtract(29, "days").toDate();
    const toDateDefault = moment().toDate();

    setStartDate(fromDateDefault);
    setEndDate(toDateDefault);
    contractCodeRef.current.value = "";
    ownerNameRef.current.value = "";
    addressRef.current.value = "";
    serviceTypeRef.current.setValue(defaultValue);
    servicePackageRef.current.setValue(defaultValue);
    zoneRef.current.setValue(defaultValue);
    teamRef.current.setValue(defaultValue);
    departmentRef.current.setValue(defaultValue);
    userRef.current.setValue(defaultValue);
    statusRef.current.setValue(defaultValue);
  };

  const onSearch = () => {
    let filter = {
      fromDate: startDate
        ? parseInt(+moment(startDate, "DD/MM/YYYY").startOf("day"))
        : null,
      toDate: endDate
        ? parseInt(+moment(endDate, "DD/MM/YYYY").endOf("day"))
        : null,
      contractCode: contractCodeRef.current.value || null,
      ownerName: ownerNameRef.current.value || null,
      address: addressRef.current.value || null,
      serviceTypeId: serviceTypeRef.current.getValue()[0].value || null,
      servicePackageId: servicePackageRef.current.getValue()[0].value || null,
      zoneIds: _.isNumber(zoneRef.current.getValue()[0].value)
        ? [zoneRef.current.getValue()[0].value]
        : [],
      teamIds: _.isNumber(teamRef.current.getValue()[0].value)
        ? [teamRef.current.getValue()[0].value]
        : [],
      departmentIds: _.isNumber(departmentRef.current.getValue()[0].value)
        ? [departmentRef.current.getValue()[0].value]
        : [],
      userIds: _.isNumber(userRef.current.getValue()[0].value)
        ? [userRef.current.getValue()[0].value]
        : [],
      statusId: statusRef.current.getValue()[0].value || null,
    };

    onSearchClick(filter);
  };

  return (
    <Container>
      <div className={"row"}>
        <div className={"col-md-7 px-md-0"}>
          <div className={"col-md-5 px-md-0"}>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label htmlFor="fromDateFilter">Ngày HĐ từ</label>
                <div className="input-group date" id="fromDateFilter">
                  <ReactDatePicker
                    className="form-control"
                    locale="vi"
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setStartDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    maxDate={endDate}
                    showYearDropdown
                    dropdownMode="select"
                    ref={fromDateRef}
                  />
                  <div className="input-group-addon">
                    <i
                      className="fa fa-calendar"
                      onClick={() => {
                        fromDateRef.current.setOpen(true);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label htmlFor="toDateFilter">Ngày HĐ đến</label>
                <div className="input-group date" id="toDateFilter">
                  <ReactDatePicker
                    className="form-control"
                    locale="vi"
                    selected={endDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setEndDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    minDate={startDate - 1}
                    showYearDropdown
                    dropdownMode="select"
                    ref={toDateRef}
                  />
                  <div className="input-group-addon">
                    <i className="fa fa-calendar"
                        onClick={() => {
                          toDateRef.current.setOpen(true);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"col-md-7 px-md-0"}>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label className="control-label" for="contractCode">
                  Số HĐ
                </label>
                <input
                  type="text"
                  id="contractCode"
                  name="contractCode"
                  className="form-control"
                  required="required"
                  pattern=""
                  title=""
                  ref={contractCodeRef}
                />
              </div>
            </div>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label className="control-label" for="ownerName">
                  Chủ nhà
                </label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  className="form-control"
                  //value=""
                  required="required"
                  pattern=""
                  title=""
                  ref={ownerNameRef}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"col-md-5"}>
          <div className="form-group">
            <label className="control-label" for="address">
              Địa chỉ
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              //value=""
              required="required"
              pattern=""
              title=""
              ref={addressRef}
            />
          </div>
        </div>
        <div className={"col-md-7 px-md-0"}>
          <div className={"col-md-5  px-md-0"}>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label className="control-label">Loại dịch vụ</label>
                <SelectCustomizeFlowBootrap3
                  forwardedRef={serviceTypeRef}
                  options={serviceTypeOptions}
                  defaultValue={defaultValue}
                  onSelect={() => {
                    // console.log("On select service type");
                  }}
                />
              </div>
            </div>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label className="control-label">Gói dịch vụ</label>
                <SelectCustomizeFlowBootrap3
                  forwardedRef={servicePackageRef}
                  options={servicePackageOptions}
                  defaultValue={defaultValue}
                  onSelect={() => {
                    // console.log("On select service package");
                  }}
                />
              </div>
            </div>
          </div>
          <div className={"col-md-7 px-md-0"}>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label className="control-label">Zone</label>
                <SelectCustomizeFlowBootrap3
                  forwardedRef={zoneRef}
                  options={zoneOptions}
                  defaultValue={defaultValue}
                  onSelect={() => {
                    // console.log("On select zone");
                    getTeam(zoneRef);
                    getUser(zoneRef, teamRef, departmentRef);
                  }}
                />
              </div>
            </div>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label className="control-label">Team</label>
                <SelectCustomizeFlowBootrap3
                  forwardedRef={teamRef}
                  options={teamOptions}
                  defaultValue={defaultValue}
                  onSelect={() => {
                    // console.log("On select team");
                    getUser(zoneRef, teamRef, departmentRef);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5 px-md-0">
          <div className={"col-md-4"}>
            <div className="form-group">
              <label className="control-label">Phòng ban</label>
              <SelectCustomizeFlowBootrap3
                forwardedRef={departmentRef}
                options={departmentOptions}
                defaultValue={defaultValue}
                onSelect={() => {
                  // console.log("On select department");
                  getUser(zoneRef, teamRef, departmentRef);
                }}
              />
            </div>
          </div>
          <div className={"col-md-8 px-md-0"}>
            <div className={"col-md-7"}>
              <div className="form-group">
                <label className="control-label">Thành viên</label>
                <SelectCustomizeFlowBootrap3
                  forwardedRef={userRef}
                  options={userOptions}
                  defaultValue={defaultValue}
                  onSelect={() => {
                    // console.log("On select user");
                  }}
                />
              </div>
            </div>
            <div className={"col-md-5"}>
              <div className="form-group">
                <label className="control-label">Trạng thái</label>
                <SelectCustomizeFlowBootrap3
                  forwardedRef={statusRef}
                  options={statusOptions}
                  defaultValue={defaultValue}
                  onSelect={() => {
                    // console.log("On select status");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GroupButton>
        <button
          className="btn btn-default mr-1 default"
          onClick={() => setDefaultFilter()}
        >
          Xóa bộ lọc
        </button>
        <button className="btn search" onClick={() => onSearch()}>
          Tìm
        </button>
      </GroupButton>
    </Container>
  );
}

export default FilterContract;

import _ from "lodash";
import { useEffect, useState } from "react";
import {
  apiGetContractTypeDefine,
  apiGetDepartments,
  apiGetStatus,
  apiGetTeams,
  apiGetUsers,
  apiGetZones,
} from "../api/ContractFilter";
import { getCurrentUser } from "../api/User";

const useFilters = () => {

  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [servicePackageList, setServicePackageList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [statusList, setStatusList] = useState([]);

  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [servicePackageOptions, setServicePackageOptions] = useState([]);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

    const [permissionId, setPermissionId] = useState();

    const onGetCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      if (!_.isEmpty(currentUser)) {
        const permissionIdContractList = currentUser.permissions.filter((item) => item.actionCode === 'list' && item.entityCode === 'contract_management');
        const permissionIdContract = permissionIdContractList[permissionIdContractList.length - 1].permissionId;
        setPermissionId(permissionIdContract);
      }
    };

  useEffect(() => {
    if (!_.isEmpty(zoneList)) {
      const reactSelectData = reactSelectFormat(
        zoneList,
        "departmentName",
        "departmentId"
      );
      setZoneOptions(reactSelectData);
    }
  }, [zoneList]);

  const getZone = async () => {
    const request = {
      entity: "contract_management",
      action: "list",
      permissionId: permissionId,
      requestBody: {},
    };
    const responseData = await apiGetZones(request);
    if (!_.isEmpty(responseData)) {
      setZoneList(responseData);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(teamList)) {
      const reactSelectData = reactSelectFormat(
        teamList,
        "departmentName",
        "departmentId"
      );
      setTeamOptions(reactSelectData);
    }
  }, [teamList]);

  const getTeam = async (zoneRef) => {
    const request = {
      entity: "contract_management",
      action: "list",
      permissionId: permissionId,
      requestBody: {
        zoneIds: _.isNumber(zoneRef.current.getValue()[0].value)
          ? [zoneRef.current.getValue()[0].value]
          : null,
      },
    };
    const responseData = await apiGetTeams(request);
    if (!_.isEmpty(responseData)) {
      setTeamList(responseData);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(departmentList)) {
      const reactSelectData = reactSelectFormat(
        departmentList,
        "departmentName",
        "departmentId"
      );
      setDepartmentOptions(reactSelectData);
    }
  }, [departmentList]);

  const getDepartment = async () => {
    const request = {
      entity: "contract_management",
      action: "list",
      permissionId: permissionId,
      requestBody: {},
    };
    const responseData = await apiGetDepartments(request);
    if (!_.isEmpty(responseData)) {
      setDepartmentList(responseData);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(userList)) {
      const reactSelectData = reactSelectFormat(userList, "name", "userId");
      setUserOptions(reactSelectData);
    }
  }, [userList]);

  const getUser = async (zoneRef, teamRef, departmentRef) => {
    const request = {
      entity: "contract_management",
      action: "list",
      permissionId: permissionId,
      requestBody: {
        zoneIds: _.isNumber(zoneRef.current.getValue()[0].value)
          ? [zoneRef.current.getValue()[0].value]
          : null,
        teamIds: _.isNumber(teamRef.current.getValue()[0].value)
          ? [teamRef.current.getValue()[0].value]
          : null,
        districtIds: null,
        departmentsIds: _.isNumber(departmentRef.current.getValue()[0].value)
          ? [departmentRef.current.getValue()[0].value]
          : null,
        wardIds: null,
      },
    };
    const responseData = await apiGetUsers(request);
    if (!_.isEmpty(responseData)) {
      setUserList(responseData);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(serviceTypeList)) {
      const reactSelectData = reactSelectFormat(serviceTypeList, "name", "id");
      setServiceTypeOptions(reactSelectData);
    }
  }, [serviceTypeList]);

  const getServiceType = async () => {
    const request = {
      code: "SERVICE_TYPE",
    };
    const responseData = await apiGetContractTypeDefine(request);
    if (!_.isEmpty(responseData) && !_.isEmpty(responseData[0].list)) {
      setServiceTypeList(responseData[0].list);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(servicePackageList)) {
      const reactSelectData = reactSelectFormat(
        servicePackageList,
        "name",
        "id"
      );
      setServicePackageOptions(reactSelectData);
    }
  }, [servicePackageList]);

  const getServicePackage = async () => {
    const request = {
      code: "SERVICE_PACKAGE",
    };
    const responseData = await apiGetContractTypeDefine(request);
    if (!_.isEmpty(responseData) && !_.isEmpty(responseData[0].list)) {
      setServicePackageList(responseData[0].list);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(statusList)) {
      const reactSelectData = reactSelectFormat(statusList, "name", "id");
      setStatusOptions(reactSelectData);
    }
  }, [statusList]);

  const getStatus = async () => {
    const request = {
      code: "STATUS",
    };
    const responseData = await apiGetStatus(request);
    if (!_.isEmpty(responseData) && !_.isEmpty(responseData[0].list)) {
      setStatusList(responseData[0].list);
    }
  };

  const reactSelectFormat = (list, keyLabel, keyValue) => {
    const result = list.map((item) => ({
        label: item[keyLabel],
        value: item[keyValue],
      }));
    return result;
}

  return [
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
  ];
};

export default useFilters;

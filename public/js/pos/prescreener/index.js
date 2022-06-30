const renderDIY = (object) => {
  let result = hasValue(object.listingSourceName)
  ? object.listingSourceName
  : "N/A"

  /**
   * NONE(1784, "Không có nhãn", 1),
   BLUE(1785, "Nhãn DIY màu xanh", 2),
   GRAY(1786, "Nhãn Propzy app màu xám", 3),
   ORANGE(1787, "Nhãn Propzy app màu cam", 4);
  */

  let iconOrText = ''
  let hoverText = '';
  if (object.listingAppStatus.color) {
    const listingAppStatusId = object.listingAppStatus.id;
    switch (listingAppStatusId) {
      case LISTING_APP_STATUS.NONE:
        iconOrText = '<i class="fa fa-map-marker" aria-hidden="true"></i>'
        break
      case LISTING_APP_STATUS.BLUE:
        iconOrText = 'diy';
        break
      case LISTING_APP_STATUS.GRAY:
        iconOrText = '<i class="fa fa-map-marker" aria-hidden="true"></i>'
        hoverText = 'Chủ listing đã có tài khoản Propzy App/ portal.'
        break
      case LISTING_APP_STATUS.ORANGE:
        iconOrText = '<i class="fa fa-map-marker" aria-hidden="true"></i>'
        hoverText = 'Chủ listing đã xem/cập nhật thông tin listing từ Propzy App/ portal.'
        break

    default:
        break
    }
    
    result +=
          `<span class="badge pull-right bg-info" data-toggle="tooltip" title="${hoverText}" style="background-color:${object.listingAppStatus.color}">${iconOrText}</span>`
  }

  return result
}
const renderRealEstateGroup = (object) => {
  //TODO: Need mapping from API
  return hasValue(object.propertyTypeGroupName) ? object.propertyTypeGroupName : "N/A";
}
const _prescreenIndexVariables = {
  _dataPost: {
    sourceId: null,
    listingTypeId: null,
    sourceParentIds: new Set(),

    districtId: null,
    wardId: null,
    zoneField: null,
    teamField: null,
    departmentField: null,
    memberField: null,
  },
  _defaultSelected: {
    zoneIds: [
      {
        id: "",
        text: "--None Zone--",
      },
    ],
    teamIds: [
      {
        id: "",
        text: "--None Team--",
      },
    ],
    departmentIds: [
      {
        id: "",
        text: "--None Phòng ban--",
      },
    ],
    userIds: [
      {
        id: "",
        text: "--None Thành viên--",
      },
    ],
    wardIds: [
      {
        id: "",
        text: "--None Phường--",
      },
    ],
    districtIds: [
      {
        id: "",
        text: "--None Quận--",
      },
    ],
  },
  _filter: {
    typeId: null,
    workTypeId: null,
    statusId: null,
    id: null,
    name: null,
    phone: null,
    sourceId: null,
    address: null,
    fromStatusDate: DEFAULT_FROM_DATE,
    toStatusDate: DEFAULT_TO_DATE,
    assignedToList: null,
    notAssigned: null,
    tcId: null,
    channelTypeId: null,
    channelTypeChildId: null,
    listingTypeId: null,
    propertyTypeIds: null,
    landCode: null,
    mapCode: null,
    sort: {
      columnName: "updatedDate",
      value: "desc",
    },
    districtId: null,
    wardId: null,
    zoneField: null,
    teamField: null,
    departmentField: null,
    memberField: null,
  },
  _dataTableConfig: {
    autoWidth: true,
    deferRender: false,
    language: DatatableHelper.languages.vn,
    lengthChange: false,
    ordering: true,
    paging: true,
    processing: false,
    scrollX: true,
    searching: false,
    serverSide: true,
  },
  stored: {
    tabIndex: {
      call: 1,
      called: 2,
      diy: 3,
    },
    sourceId: null,
    listingTypeId: null,
    sourceParentIds: new Set(),

    districtId: null,
    wardId: null,
    zoneField: null,
    teamField: null,
    departmentField: null,
    memberField: null,
  },
  columsTable: {
    call: [
      {
        data: "id",
        render: function (data, type, object) {
          const id = hasValue(object.id)
            ? '<a href="prescreener/detail/' +
              object.id +
              '" target="_blank">' +
              object.id +
              "</a>"
            : "N/A"
          return id
        },
      },
      {
        data: "name",
        render: function (data, type, object) {
          const name = hasValue(object.name) ? object.name : "N/A"
          return name
        },
      },
      {
        data: "timeCounter",
        render: function (data, type, object) {
          const timeCounter = hasValue(object.timeCounter)
            ? object.timeCounter
            : ""
          return timeCounter
        },
        orderable: false,
      },
      {
        data: "phone",
        render: function (data, type, object) {
          const phone = hasValue(object.phone) ? object.phone : "N/A"
          return phone
        },
      },
      {
        data: "districtName",
        render: function (data, type, object) {
          var districtName = hasValue(object.districtName)
            ? object.districtName
            : "N/A"
          if ([13, 14].indexOf(object.propertyTypeId) > -1) {
            const landCode = hasValue(object.landCode) ? object.landCode : "N/A"
            const mapCode = hasValue(object.mapCode) ? object.mapCode : "N/A"
            districtName += `<br><a href="javascript:void(0);" class="control-label text-danger land-code-list" data-rlistingid="${object.rlistingId}">Số thửa : ${landCode}</a> `
            districtName += `<br><a href="javascript:void(0);" class="control-label text-primary map-code-list" data-rlistingid="${object.rlistingId}">Tờ bản đồ : ${mapCode}</a> `
          }
          return districtName
        },
      },
      {
        data: "price",
        class: "price",
        render: function (data, type, object) {
          const price = hasValue(object.formatedPrice)
            ? object.formatedPrice
            : "N/A"
          return price
        },
      },
      {
        data: "currency",
        class: "currency",
        render: function (data, type, object) {
          const currency = hasValue(object.currency) ? object.currency : "N/A"
          return currency
        },
      },
      {
        data: "listingSourceName",
        render: function (data, type, object) {
          return renderDIY(object)
        },
      },
      {
        data: "listingTypeId",
        class: "listingTypeId",
        render: function (data, type, object) {
          return typeof getNameListingType !== "undefined" &&
            getNameListingType(data)
            ? getNameListingType(data).sale.name
            : "N/A"
        },
      },
      {
        data: "propertyTypeGroupName",
        class: "propertyTypeGroupName",
        render: function (data, type, object) {
          return renderRealEstateGroup(object)
        }
      },
      {
        data: "propertyTypeId",
        class: "propertyTypeName",
        render: function (data, type, object) {
          return hasValue(object.propertyTypeName)
            ? object.propertyTypeName
            : "N/A"
        },
      },
      {
        data: "assignedDate",
        render: function (data, type, object) {
          const assignedDate = moment(object.assignedDate).isValid()
            ? moment(object.assignedDate).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return assignedDate
        },
      },
      {
        data: "updatedDate",
        render: function (data, type, object) {
          const updatedDate = hasValue(object.updatedDate)
            ? moment(object.updatedDate).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return updatedDate
        },
      },
      {
        data: "responsibleName",
        render: function (data, type, object) {
          const assigneeName = hasValue(object.responsibleName)
            ? object.responsibleName
            : "N/A"
          return assigneeName
        },
      },
      {
        data: "statusName",
        render: function (data, type, object) {
          let workTypeNameStatusName = "N/A"
          if (object.statusId == 23) {
            workTypeNameStatusName = object.statusName
          } else {
            workTypeNameStatusName =
              object.statusName + " - " + object.workTypeName
          }
          return workTypeNameStatusName
        },
      },
    ],
    called: [
      {
        data: "id",
        render: function (data, type, object) {
          const id = hasValue(object.id)
            ? '<a href="prescreener/detail/' +
              object.id +
              '" target="_blank">' +
              object.id +
              "</a>"
            : "N/A"
          return id
        },
      },
      {
        data: "name",
        render: function (data, type, object) {
          const name = hasValue(object.name) ? object.name : "N/A"
          return name
        },
      },
      {
        data: "timeCounter",
        render: function (data, type, object) {
          const timeCounter = hasValue(object.timeCounter)
            ? object.timeCounter
            : ""
          return timeCounter
        },
        orderable: false,
      },
      {
        data: "phone",
        render: function (data, type, object) {
          const phone = hasValue(object.phone) ? object.phone : "N/A"
          return phone
        },
      },
      {
        data: "districtName",
        render: function (data, type, object) {
          var districtName = hasValue(object.districtName)
            ? object.districtName
            : "N/A"
          if ([13, 14].indexOf(object.propertyTypeId) > -1) {
            const landCode = hasValue(object.landCode) ? object.landCode : "N/A"
            const mapCode = hasValue(object.mapCode) ? object.mapCode : "N/A"
            districtName += `<br><a href="javascript:void(0);" class="control-label text-danger land-code-list" data-rlistingid="${object.rlistingId}">Số thửa : ${landCode}</a> `
            districtName += `<br><a href="javascript:void(0);" class="control-label text-primary map-code-list" data-rlistingid="${object.rlistingId}">Tờ bản đồ : ${mapCode}</a> `
          }
          return districtName
        },
      },
      {
        data: "price",
        class: "price",
        render: function (data, type, object) {
          const price = hasValue(object.formatedPrice)
            ? object.formatedPrice
            : "N/A"
          return price
        },
      },
      {
        data: "currency",
        class: "currency",
        render: function (data, type, object) {
          const currency = hasValue(object.currency) ? object.currency : "N/A"
          return currency
        },
      },
      {
        data: "listingSourceName",
        render: function (data, type, object) {
          return renderDIY(object)
        },
      },
      {
        data: "listingTypeId",
        class: "listingTypeId",
        render: function (data, type, object) {
          return typeof getNameListingType !== "undefined" &&
            getNameListingType(data)
            ? getNameListingType(data).sale.name
            : "N/A"
        },
      },
      {
        data: "propertyTypeGroupName",
        class: "propertyTypeGroupName",
        render: function (data, type, object) {
          return renderRealEstateGroup(object)
        }
      },
      {
        data: "propertyTypeId",
        class: "propertyTypeName",
        render: function (data, type, object) {
          return hasValue(object.propertyTypeName)
            ? object.propertyTypeName
            : "N/A"
        },
      },
      {
        data: "responsibleName",
        render: function (data, type, object) {
          const responsibleName = hasValue(object.responsibleName)
            ? object.responsibleName
            : "N/A"
          return responsibleName
        },
      },
      {
        data: "callStartedDate",
        render: function (data, type, object) {
          const callStartedDate = moment(object.callStartedDate).isValid()
            ? moment(object.callStartedDate).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return callStartedDate
        },
      },
      {
        data: "callEndedDate",
        render: function (data, type, object) {
          const callEndedDate = moment(object.callEndedDate).isValid()
            ? moment(object.callEndedDate).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return callEndedDate
        },
      },
      {
        data: "assignedDateForSA",
        render: function (data, type, object) {
          const assignedDateForSA = moment(object.assignedDateForSA).isValid()
            ? moment(object.assignedDateForSA).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return assignedDateForSA
        },
      },
      {
        data: "updatedDate",
        render: function (data, type, object) {
          const updatedDate = hasValue(object.updatedDate)
            ? moment(object.updatedDate).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return updatedDate
        },
      },
      {
        data: "statusName",
        render: function (data, type, object) {
          let statusName = hasValue(object.statusName)
            ? object.statusName
            : "N/A"
          if ([27, 43].indexOf(object.statusId) > -1) {
            statusName +=
              " ( " +
              (hasValue(object.reasonContent)
                ? '<a class="show-resion-content" data-resion="' +
                  object.reasonContent +
                  '">hiện lý do...</a>'
                : "N/A") +
              " )"
          } else if (hasValue(object.reasonContent)) {
            statusName +=
              " ( " +
              (hasValue(object.reasonContent) ? object.reasonContent : "N/A") +
              " )"
          } else {
            statusName +=
              " ( " +
              (hasValue(object.assigneeName) ? object.assigneeName : "N/A") +
              " )"
          }
          return statusName
        },
      },
    ],
    diy: [
      {
        data: "id",
        render: function (data, type, object) {
          const id = hasValue(object.id)
            ? '<a href="prescreener/detail/' +
              object.id +
              '" target="_blank">' +
              object.id +
              "</a>"
            : "N/A"
          return id
        },
      },
      {
        data: "name",
        render: function (data, type, object) {
          const name = hasValue(object.name) ? object.name : "N/A"
          return name
        },
      },
      {
        data: "timeCounter",
        render: function (data, type, object) {
          const timeCounter = hasValue(object.timeCounter)
            ? object.timeCounter
            : ""
          return timeCounter
        },
        orderable: false,
      },
      {
        data: "phone",
        render: function (data, type, object) {
          const phone = hasValue(object.phone) ? object.phone : "N/A"
          return phone
        },
      },
      {
        data: "districtName",
        render: function (data, type, object) {
          var districtName = hasValue(object.districtName)
            ? object.districtName
            : "N/A"
          if ([13, 14].indexOf(object.propertyTypeId) > -1) {
            const landCode = hasValue(object.landCode) ? object.landCode : "N/A"
            const mapCode = hasValue(object.mapCode) ? object.mapCode : "N/A"
            districtName += `<br><a href="javascript:void(0);" class="control-label text-danger land-code-list" data-rlistingid="${object.rlistingId}">Số thửa : ${landCode}</a> `
            districtName += `<br><a href="javascript:void(0);" class="control-label text-primary map-code-list" data-rlistingid="${object.rlistingId}">Tờ bản đồ : ${mapCode}</a> `
          }
          return districtName
        },
      },
      {
        data: "price",
        class: "price",
        render: function (data, type, object) {
          const price = hasValue(object.formatedPrice)
            ? object.formatedPrice
            : "N/A"
          return price
        },
      },
      /*            {
                data: 'currency',
                class: 'currency',
                render: function (data, type, object) {
                    const currency = hasValue(object.currency) ? object.currency : 'N/A';
                    return currency;
                }
            },*/
      {
        data: "listingSourceName",
        render: function (data, type, object) {
          return renderDIY(object)
        },
      },
      {
        data: "listingTypeId",
        class: "listingTypeId",
        render: function (data, type, object) {
          return typeof getNameListingType !== "undefined" &&
            getNameListingType(data)
            ? getNameListingType(data).sale.name
            : "N/A"
        },
      },
      {
        data: "propertyTypeGroupName",
        class: "propertyTypeGroupName",
        render: function (data, type, object) {
          return renderRealEstateGroup(object)
        }
      },
      {
        data: "propertyTypeId",
        class: "propertyTypeName",
        render: function (data, type, object) {
          return hasValue(object.propertyTypeName)
            ? object.propertyTypeName
            : "N/A"
        },
      },
      {
        data: "responsibleName",
        render: function (data, type, object) {
          const responsibleName = hasValue(object.responsibleName)
            ? object.responsibleName
            : "N/A"
          return responsibleName
        },
      },
      {
        data: "callStartedDate",
        render: function (data, type, object) {
          const callStartedDate = moment(object.callStartedDate).isValid()
            ? moment(object.callStartedDate).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return callStartedDate
        },
      },
      {
        data: "callEndedDate",
        render: function (data, type, object) {
          const callEndedDate = moment(object.callEndedDate).isValid()
            ? moment(object.callEndedDate).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return callEndedDate
        },
      },
      {
        data: "assignedDateForSA",
        render: function (data, type, object) {
          const assignedDateForSA = moment(object.assignedDateForSA).isValid()
            ? moment(object.assignedDateForSA).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return assignedDateForSA
        },
      },
      {
        data: "updatedDate",
        render: function (data, type, object) {
          const updatedDate = hasValue(object.updatedDate)
            ? moment(object.updatedDate).format("HH:mm:ss DD/MM/YYYY")
            : "N/A"
          return updatedDate
        },
      },
      {
        data: "statusName",
        render: function (data, type, object) {
          let workTypeNameStatusName = "N/A"
          if (object.statusId == 23) {
            workTypeNameStatusName = object.statusName
          } else {
            workTypeNameStatusName =
              object.statusName + " - " + object.workTypeName
          }
          return workTypeNameStatusName
        },
      },
    ],
  },
}

const getPermission = currentUser.permissions.filter(
  (permission) =>
    permission.actionCode === "list" &&
    permission.entityCode === "pos_prescreen"
)
const __prescreenIndexPromiseApi = async function (name) {
  let promise = null

  switch (name) {
    case "GET_SOURCE": {
      $("#sourceId").html("").select2()
      promise = axios
        .get(POS_APIS_PRESCREEN.get("GET_CHANNEL_TYPES"), {
          params: {},
        })
        .then((response) => {
          const resultsContent = response.data

          let data = [{ id: 0, text: "--Chọn Nguồn--" }]
          if (resultsContent.result) {
            resultsContent.data.forEach((item) => {
              if (item.type === 1) {
                let filter = item.list.filter(
                  (it) => [2, 5, 7, 9].indexOf(it.id) === -1
                )

                let dataContent = filter.map((it) => {
                  if (it.childs.length > 0) {
                    _prescreenIndexVariables._dataPost.sourceParentIds.add(
                      it.id
                    )
                  }
                  return {
                    id: it.id,
                    text: it.name,
                  }
                })

                // exception  177 TC, because TC in type don't have chils. that is special type
                _prescreenIndexVariables._dataPost.sourceParentIds.add(177)
                data = data.concat(dataContent)
                return true
              }
            })
          }
          $("#sourceId").select2({
            data: data,
          })
        })
        .catch((err) => {
          let data = [{ id: "", text: "--Chọn Nguồn--" }]
          $("#sourceId").select2({
            data: data,
          })
          console.error(err)
        })
      break
    }
    case "GET_ASSIGNED_LIST": {
      $("#assignedToList").html("").select2()
      promise = axios
        .get(POS_APIS_COMMON.get("GET_DEPARTMENT_USER_LIST"), {
          params: {},
        })
        .then((response) => {
          const resultsContent = response.data

          let data = [
            {
              id: currentUser.userId,
              text: currentUser.name,
            },
          ]
          let filter = resultsContent.data.filter(
            (it) => it.departmentId === 16
          )
          let dataContent = filter.map((item) => {
            return {
              id: item.userId,
              text: item.name,
            }
          })

          data = data.concat(dataContent)
          $("#assignedToList").select2({
            data: data,
          })
        })
        .catch((err) => {
          let data = [
            {
              id: currentUser.userId,
              text: currentUser.name,
            },
          ]
          $("#assignedToList").select2({
            data: data,
          })
          console.error(err)
        })
      break
    }
    case "GET_TYPE_WORKS": {
      $("#need-to-call-listing-workTypeName").html("").select2()
      promise = axios
        .get(POS_APIS_PRESCREEN.get("GET_CHANNEL_TYPES"), {
          params: {},
        })
        .then((response) => {
          const resultsContent = response.data

          let data = [{ id: 0, text: "--Chọn loại công việc cần xem--" }]
          if (resultsContent.result) {
            const dataFilter = resultsContent.data.filter((it) => it.type === 8)
            let dataContent = dataFilter[0].list.map((it) => {
              return {
                id: it.id,
                text: it.name,
              }
            })

            data = data.concat(dataContent)
          }
          $("#need-to-call-listing-workTypeName").select2({
            data: data,
          })
        })
        .catch((err) => {
          let data = [{ id: "", text: "--Chọn loại công việc cần xem--" }]
          $("#need-to-call-listing-workTypeName").select2({
            data: data,
          })
          console.error(err)
        })
      break
    }
    case "GET_STATUS": {
      const option = [
        {
          id: 0,
          text: "--- Chọn tình trạng tin đăng ---",
        },
        {
          id: 23,
          text: "Mới",
        },
        {
          id: 25,
          text: "Gọi lại",
        },
        {
          id: 26,
          text: "Chưa liên hệ được",
        },
      ]
      promise = new Promise((resolve, reject) => {
        $("#need-to-call-listing-statusId").html("").select2()
        $("#need-to-call-listing-statusId").select2({
          data: option,
        })
        resolve(console.log("Get status id"))
      })
      break
    }
    case "GET_TC": {
      if (!POS_STORED_LOCAL_API.TC_LIST) {
        await POS_PROMISISE_API("GET_TC")
      }
      $("#tcId").html("").select2()
      let data = []

      if (_prescreenIndexVariables._dataPost.sourceId == 177) {
        // load tc
        $("#tcId").prop("disabled", false)
        data = data.concat(POS_STORED_LOCAL_API.TC_LIST)
      } else {
        $("#tcId").prop("disabled", true)
      }
      $("#tcId").select2({
        data: data,
        placeholder: "Chọn trung tâm",
      })

      break
    }
    case "GET_INFO_CHANNEL": {
      if (!POS_STORED_LOCAL_API.INFO_CHANNEL_LIST) {
        await POS_PROMISISE_API("GET_INFO_CHANNEL")
      }
      $("#infoChannel").html("").select2()
      let data = [{ id: "", text: "--Chọn kênh thông tin--" }]
      data = data.concat(POS_STORED_LOCAL_API.INFO_CHANNEL_LIST)
      $("#infoChannel").select2({
        data: data,
      })
      break
    }
    case "GET_INFO_CHANNEL_CHILD": {
      $("#infoChannelChild").html("").select2()
      let data = [{ id: "", text: "--Chọn nguồn thông tin--" }]
      if (_prescreenIndexVariables._dataPost.channelTypeId) {
        await POS_PROMISISE_API("GET_INFO_CHANNEL_CHILD", {
          parentId: _prescreenIndexVariables._dataPost.channelTypeId,
        })
        if (POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST) {
          data = data.concat(POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST)
        }
      }
      $("#infoChannelChild").select2({
        data: data,
      })

      break
    }
    case "GET_LISTING_TYPES": {
      $("#listingTypeId").html("").select2()
      let data = [{ id: 0, text: "--Chọn loại giao dịch--" }]
      if (!POS_STORED_LOCAL_API.LISTING_TYPES_LIST) {
        await POS_PROMISISE_API("GET_LISTING_TYPES")
      }
      data = data.concat(POS_STORED_LOCAL_API.LISTING_TYPES_LIST)
      $("#listingTypeId").select2({
        data: data,
      })
      break
    }
    case "GET_PROPERTY_TYPES": {
      // Todo get propertyType
      $("#propertyTypeIds").html("").select2()
      let data = []
      if (_prescreenIndexVariables._dataPost.listingTypeId != null) {
        await POS_PROMISISE_API("GET_PROPERTY_TYPES", {
          listingTypeId: _prescreenIndexVariables._dataPost.listingTypeId,
        })
      } else {
        POS_STORED_LOCAL_API.PROPERTY_TYPES_LIST = []
      }

      data = data.concat(POS_STORED_LOCAL_API.PROPERTY_TYPES_LIST)
      $("#propertyTypeIds").select2({
        data: data,
        placeholder: " Chọn loại hình bất động sản",
      })
      if (data.length > 0) {
        $("#propertyTypeIds").prop("disabled", false)
      } else {
        $("#propertyTypeIds").prop("disabled", true)
      }
      break
    }
    case "GET_PROPERTY_LIST_PREFIX": {
      $("#propertyTypeIds").html("").select2()
      let data = []
      if (_prescreenIndexVariables._dataPost.listingTypeId != null) {
        await POS_PROMISISE_API("GET_PROPERTY_LIST_PREFIX", {
          listingTypeId: _prescreenIndexVariables._dataPost.listingTypeId,
        })
      } else {
        POS_STORED_LOCAL_API.PROPERTY_LIST_PREFIX = []
      }

      data = data.concat(POS_STORED_LOCAL_API.PROPERTY_LIST_PREFIX)
      $("#propertyTypeIds").select2({
        data: data,
        placeholder: " Chọn loại hình bất động sản",
        templateSelection: highlightDisabledItem,
        templateResult: highlightDisabledItem
      })
      if (data.length > 0) {
        $("#propertyTypeIds").prop("disabled", false)
      } else {
        $("#propertyTypeIds").prop("disabled", true)
      }
      break
    };
  }
}

class PrescreenIndex {
  constructor() {
    // define tabIndex
    this.__tableCall = null
    this.__tableCalled = null
    this.__tableDiy = null
    this.__currentTabIndex = _prescreenIndexVariables.stored.tabIndex.call
    this.loadApi()
    this.bindEvent()
    this.reloadList()
  }

  loadOverview() {
    const dataPost = this.convertFieldToPostData(
      _prescreenIndexVariables._dataPost
    )

    axios
      .post(POS_APIS_PRESCREEN.get("GET_OVERVIEW_INDEX"), {
        ...dataPost,
      })
      .then((response) => {
        const data = response.data
        const resultsContent = data.data
        if (resultsContent.needCall) {
          $("#need-to-call-listing-id").html(
            'Tin đăng cần gọi <span class="label label-success">' +
              resultsContent.needCall.total +
              "</span>"
          )
        }

        if (resultsContent.called) {
          let text =
            "<p>Số lượng listing đã gọi: " +
            resultsContent.called.total +
            "</p>"
          text += "<ul>"
          $.each(resultsContent.called.charts, function (i, it) {
            text +=
              "<li>" +
              it.name +
              ' : <span class="label-label-success">' +
              it.value +
              "</span></li>"
          })
          text += "</ul>"
          $("#called-listing-overview").html(text)
          $("#called-listing-id").html(
            'Tin đăng đã gọi <span class="label label-success">' +
              resultsContent.called.total +
              "</span>"
          )
        }
        if (resultsContent.diy) {
          $("#diy-listing-id").html(
            'Cập nhật từ Diy <span class="label label-success">' +
              resultsContent.diy.total +
              "</span>"
          )
        }
      })
      .catch((err) => {
        $("#need-to-call-listing-id").html(
          'Tin đăng cần gọi <span class="label label-success">' + 0 + "</span>"
        )
        $("#called-listing-id").html(
          'Tin đăng đã gọi <span class="label label-success">' + 0 + "</span>"
        )
        $("#diy-listing-id").html(
          'Cập nhật từ Diy <span class="label label-success">' + 0 + "</span>"
        )
        $("#called-listing-overview").html("")
      })
  }

  /**
   * function load table by tabIndex
   * */
  loadTable() {
    showPropzyLoading()

    const that = this

    let columsCallList = _prescreenIndexVariables.columsTable.call
    let columsCalledList = _prescreenIndexVariables.columsTable.called
    let columsDiyList = _prescreenIndexVariables.columsTable.diy
    let colSortCall = 9
    let colSortCalled = 12;
    if (isGroupAdmin === true) {
      columsCallList.splice(0, 0, {
        data: "reassign",
        class: "reassign-wrapper",
        orderable: false,
        render: function (data, type, object) {
          const reassign =
            '<input type="checkbox" value="' +
            object.id +
            '" class="reassign" data-tab="need-to-call-listing">'
          return reassign
        },
      })
      colSortCall = 10;

      // add checkbox for tab called-listing
      if (columsCalledList[0].data !== 'reassign') {
        columsCalledList.splice(0, 0, {
          data: "reassign",
          class: "reassign-wrapper",
          orderable: false,
          render: function (data, type, object) {
            const reassign =
            '<input type="checkbox" value="' +
              object.id +
              '" class="reassign" data-tab="called-listing">';
              return reassign;
            },
          });
        }
        colSortCalled = 13;
      }

    const tabIndex = _prescreenIndexVariables.stored.tabIndex
    // assign to dataPost
    let dataPost = {
      ..._prescreenIndexVariables._dataPost,
    }
    // convert dataPost to submit
    dataPost = that.convertFieldToPostData(dataPost)

    // init tables
    if (!that.__tableCall) {
      // check active tab
      if (that.__currentTabIndex === tabIndex.call) {
        // reassign dataPost
        dataPost.typeId = tabIndex.call

        that.__tableCall = $("#need-to-call-listing-table")
          .DataTable({
            ..._prescreenIndexVariables._dataTableConfig,
            ajax: {
              url: POS_APIS_PRESCREEN.get("GET_LISTING_LIST_INDEX"),
              type: "POST",
              data: {
                ...dataPost,
                sort: {
                  columnName: "propertyTypeGroupName",
                  value: "desc",
                },
              },
            },
            order: [[colSortCall, "desc"]],
            columns: columsCallList,
          })
          .off("processing.dt")
          .on("processing.dt", function (e, settings, processing) {
            // regenerate dataPost while switch tab
            dataPost = that.convertFieldToPostData({
              ..._prescreenIndexVariables._dataPost,
            })

            $("#need-to-call-listing " + ".selectAll").prop("checked", false);

            settings.ajax.data = function (d) {
              dataPost.sort = {
                columnName: settings.aoColumns[settings.aaSorting[0][0]].data,
                value: settings.aaSorting[0][1],
              }
              Object.assign(d, {
                ...dataPost,
              })
              return d
            }

            if (!processing) {
              hidePropzyLoading()
            }
          })
          .on("xhr.dt", function (e, settings, json, xhr) {})
          .on("draw", function () {
            if (hasValue(Window.reAssignListing)) {
              Window.reAssignListing.reloadPage("need-to-call-listing-table")
            }
          })
          .on("order.dt", function () {
            if (hasValue(Window.reAssignListing)) {
              Window.reAssignListing.clearList();
            }
          });
      }
    } else {
      if (that.__currentTabIndex === tabIndex.call) {
        that.__tableCall.ajax.reload()
      }
    }

    //
    if (!that.__tableCalled) {
      // check active tab
      if (that.__currentTabIndex === tabIndex.called) {
        // reassign dataPost
        dataPost.typeId = tabIndex.called

        this.__tableCalled = $("#called-listing-table")
          .DataTable({
            ..._prescreenIndexVariables._dataTableConfig,
            ajax: {
              url: POS_APIS_PRESCREEN.get("GET_LISTING_LIST_INDEX"),
              type: "POST",
              data: {
                ...dataPost,
                sort: {
                  columnName: "callStartedDate",
                  value: "desc",
                },
              },
            },
            order: [[colSortCalled, "desc"]],
            language: DatatableHelper.languages.vn,
            columns: columsCalledList,
          })
          .off("processing.dt")
          .on("processing.dt", function (e, settings, processing) {
            // regenerate dataPost while switch tab
            dataPost = that.convertFieldToPostData({
              ..._prescreenIndexVariables._dataPost,
            });

            $("#called-listing " + ".selectAll").prop("checked", false);

            settings.ajax.data = function (d) {
              dataPost.sort = {
                columnName: settings.aoColumns[settings.aaSorting[0][0]].data,
                value: settings.aaSorting[0][1],
              }
              Object.assign(d, {
                ...dataPost,
              })
              return d
            }

            if (!processing) {
              hidePropzyLoading();
            }
          })
          .on("xhr.dt", function (e, settings, json, xhr) {})
          .on("draw", function () {
            if (hasValue(Window.reAssignListing)) {
              Window.reAssignListing.reloadPage("called-listing-table");
            }
          })
          .on("order.dt", function () {
            if (hasValue(Window.reAssignListing)) {
              Window.reAssignListing.clearList();
            }
          });
      }
    } else {
      if (that.__currentTabIndex === tabIndex.called) {
        that.__tableCalled.ajax.reload()
      }
    }

    if (!that.__tableDiy) {
      // check active tab
      if (that.__currentTabIndex === tabIndex.diy) {
        // reassign dataPost
        dataPost.typeId = tabIndex.diy

        that.__tableDiy = $("#diy-listing-table")
          .DataTable({
            ..._prescreenIndexVariables._dataTableConfig,
            ajax: {
              url: POS_APIS_PRESCREEN.get("GET_LISTING_LIST_DIY_INDEX"),
              type: "POST",
              data: {
                ...dataPost,
              },
            },
            order: [[12, "desc"]],
            language: DatatableHelper.languages.vn,
            columns: columsDiyList,
          })
          .off("processing.dt")
          .on("processing.dt", function (e, settings, processing) {
            // regenerate dataPost while switch tab
            dataPost = that.convertFieldToPostData({
              ..._prescreenIndexVariables._dataPost,
            })

            settings.ajax.data = function (d) {
              dataPost.sort = {
                columnName: settings.aoColumns[settings.aaSorting[0][0]].data,
                value: settings.aaSorting[0][1],
              }
              Object.assign(d, {
                ...dataPost,
              })
              return d
            }

            if (!processing) {
              hidePropzyLoading()
            }
          })
          .on("xhr.dt", function (e, settings, json, xhr) {})
      }
    } else {
      if (that.__currentTabIndex === tabIndex.diy) {
        that.__tableDiy.ajax.reload()
      }
    }
  }

  /**
   * function load Api for filter
   * */
  async loadApi() {
    getInputFilters("GET_ZONES", _prescreenIndexVariables, getPermission)
    getInputFilters("GET_TEAMS", _prescreenIndexVariables, getPermission)
    getInputFilters("GET_DEPARTMENTS", _prescreenIndexVariables, getPermission)
    getInputFilters("GET_MEMBERS", _prescreenIndexVariables, getPermission)
    getInputFilters("GET_DISTRICT", _prescreenIndexVariables, getPermission)
    getInputFilters("GET_WARDS", _prescreenIndexVariables, getPermission)

    __prescreenIndexPromiseApi("GET_SOURCE")
    __prescreenIndexPromiseApi("GET_TYPE_WORKS")
    __prescreenIndexPromiseApi("GET_STATUS")
    __prescreenIndexPromiseApi("GET_TC")
    __prescreenIndexPromiseApi("GET_INFO_CHANNEL")
    __prescreenIndexPromiseApi("GET_INFO_CHANNEL_CHILD")
    __prescreenIndexPromiseApi("GET_LISTING_TYPES")
    __prescreenIndexPromiseApi("GET_PROPERTY_LIST_PREFIX")
    if (
      hasValue(currentUser) &&
      hasValue(currentUser.departments) &&
      currentUser.departments.length > 0 &&
      isGroupAdmin
    ) {
      __prescreenIndexPromiseApi("GET_ASSIGNED_LIST")
    }
  }

  /**
   * function create event
   * */
  bindEvent() {
    const that = this
    $("#date-from")
      .datepicker({ format: "dd/mm/yyyy" })
      .datepicker(
        "setDate",
        moment(_prescreenIndexVariables._filter.fromStatusDate).format(
          DEFAULT_FORMAT_DATE
        )
      )
    $("#date-to")
      .datepicker({ format: "dd/mm/yyyy" })
      .datepicker(
        "setDate",
        moment(_prescreenIndexVariables._filter.toStatusDate).format(
          DEFAULT_FORMAT_DATE
        )
      )

    document.getElementById("search").addEventListener("click", function () {
      console.info("click search")
      that.reloadList()
    })

    document
      .getElementById("clearSearching")
      .addEventListener("click", function () {
        console.info("click cleaer")
        that.clearFilter()
        that.reloadList()
      })

    document
      .getElementById("need-to-call-listing-id")
      .addEventListener("click", function () {
        that.__currentTabIndex = _prescreenIndexVariables.stored.tabIndex.call
        that.reloadList()
      })
    document
      .getElementById("called-listing-id")
      .addEventListener("click", function () {
        that.__currentTabIndex = _prescreenIndexVariables.stored.tabIndex.called
        that.reloadList()
      })

    document
      .getElementById("diy-listing-id")
      .addEventListener("click", function () {
        that.__currentTabIndex = _prescreenIndexVariables.stored.tabIndex.diy
        that.reloadList()
      })

    $(document).on("change", "#need-to-call-listing-statusId", function (e) {
      const data = isVal($(this).select2("data")[0].id)
        ? Number.parseInt($(this).select2("data")[0].id)
        : null
      if (data === 23) {
        $("#need-to-call-listing-workTypeName").val(0).select2()
        $("#need-to-call-listing-workTypeName").prop("disabled", true)
      } else {
        $("#need-to-call-listing-workTypeName").prop("disabled", false)
      }
      that.reloadList()
    })
    $(document).on("change", "#need-to-call-listing-workTypeName", function (
      e
    ) {
      const data = isVal(
        $("#need-to-call-listing-statusId").select2("data")[0].id
      )
        ? Number.parseInt(
            $("#need-to-call-listing-statusId").select2("data")[0].id
          )
        : null
      if (data !== 23) {
        that.reloadList()
      }
    })

    $(document)
      .off("change", "#notAssigned")
      .on("change", "#notAssigned", function (e) {
        if ($(this).is(":checked")) {
          $("#assignedToList").prop("disabled", true)
        } else {
          $("#assignedToList").prop("disabled", false)
        }
      })

    $(document)
      .off("change", "#sourceId")
      .on("change", "#sourceId", function (e) {
        const data = isVal($(this).select2("data")[0].id)
          ? Number.parseInt($(this).select2("data")[0].id)
          : null
        _prescreenIndexVariables._dataPost.sourceId = data
        __prescreenIndexPromiseApi("GET_TC")
      })
    $(document)
      .off("change", "#infoChannel")
      .on("change", "#infoChannel", function (e) {
        const data = isVal($(this).select2("data")[0].id)
          ? Number.parseInt($(this).select2("data")[0].id)
          : null
        _prescreenIndexVariables._dataPost.channelTypeId = data
        __prescreenIndexPromiseApi("GET_INFO_CHANNEL_CHILD")
      })
    $(document)
      .off("click", ".show-resion-content")
      .on("click", ".show-resion-content", function (e) {
        $("#show-reasion-cancel").modal()
        $("#show-reasion-cancel").find("textarea").val($(this).data("resion"))
      })

    $(document)
      .off("change", "#infoChannel")
      .on("change", "#infoChannel", function (e) {
        const data = $(this).val()
        _prescreenIndexVariables._dataPost.channelTypeId = data
        __prescreenIndexPromiseApi("GET_INFO_CHANNEL_CHILD")
      })

    $(document)
      .off("change", "#listingTypeId")
      .on("change", "#listingTypeId", function (e) {
        const data = Number.parseInt($(this).val())
        _prescreenIndexVariables._dataPost.listingTypeId =
          data !== 0 ? data : null
        __prescreenIndexPromiseApi("GET_PROPERTY_LIST_PREFIX")
      })
    $(document)
      .off("change", "#propertyTypeIds")
      .on("change", "#propertyTypeIds", function (e) {
        const propertyTypeIds = $(this).val() ? $(this).val() : []
        if (
          propertyTypeIds.indexOf("13") > -1 ||
          propertyTypeIds.indexOf("14") > -1
        ) {
          $("#land-code").show()
          $("#map-code").show()
        } else {
          $("#land-code").hide()
          $("#map-code").hide()
          $("#land-code").val("")
          $("#map-code").val("")
        }
      })

    // init bind event common
    bindEventByPermission(_prescreenIndexVariables, getPermission)
  }

  convertFieldToPostData = (storeFields) => {
    const returnedTarget = Object.assign({}, storeFields)

    if (isArray(returnedTarget.zoneField)) {
      returnedTarget.zoneField = returnedTarget.zoneField.join(",")
    }
    if (isArray(returnedTarget.teamField)) {
      returnedTarget.teamField = returnedTarget.teamField.join(",")
    }
    if (isArray(returnedTarget.departmentField)) {
      returnedTarget.departmentField = returnedTarget.departmentField.join(",")
    }
    if (isArray(returnedTarget.memberField)) {
      returnedTarget.memberField = returnedTarget.memberField.join(",")
    }
    if (isArray(returnedTarget.districtId)) {
      returnedTarget.districtId = returnedTarget.districtId.join(",")
    }
    if (isArray(returnedTarget.wardId)) {
      returnedTarget.wardId = returnedTarget.wardId.join(",")
    }

    return returnedTarget
  }

  updateFilter() {
    const that = this
    let id = $("#id-listing").val()
      ? Number.parseInt($("#id-listing").val())
      : null
    let name = $("#owner-name").val() ? $.trim($("#owner-name").val()) : null
    let phone = $("#phone").val() ? $("#phone").val() : null
    let sourceId =
      $("#sourceId").select2("data")[0] &&
      isVal($("#sourceId").select2("data")[0].id)
        ? Number.parseInt($("#sourceId").select2("data")[0].id)
        : null
    let address = $("#address").val() ? $.trim($("#address").val()) : null
    let tcId = $("#tcId").val() ? $("#tcId").val().join(",") : null
    let channelTypeId =
      $("#infoChannel").select2() &&
      $("#infoChannel").select2("data") &&
      $("#infoChannel").select2("data")[0] &&
      isVal($("#infoChannel").select2("data")[0].id)
        ? $("#infoChannel").select2("data")[0].id
        : null
    let channelTypeChildId = hasValue(
      $("#infoChannelChild").select2("data")[0].id
    )
      ? Number.parseInt($("#infoChannelChild").select2("data")[0].id)
      : null

    let statusId = null
    let workTypeId = null
    if (
      that.__currentTabIndex === _prescreenIndexVariables.stored.tabIndex.call
    ) {
      statusId =
        $("#need-to-call-listing-statusId").select2("data")[0] &&
        isVal($("#need-to-call-listing-statusId").select2("data")[0].id)
          ? Number.parseInt(
              $("#need-to-call-listing-statusId").select2("data")[0].id
            )
          : null
      workTypeId =
        $("#need-to-call-listing-workTypeName").select2("data")[0] &&
        isVal($("#need-to-call-listing-workTypeName").select2("data")[0].id)
          ? Number.parseInt(
              $("#need-to-call-listing-workTypeName").select2("data")[0].id
            )
          : null
    }

    let notAssigned = null
    let assignedToList = null
    if ($("#notAssigned").is(":checked")) {
      notAssigned = 1
      assignedToList = null
    } else {
      notAssigned = null
      assignedToList = hasValue($("#assignedToList").val())
        ? $("#assignedToList").val().join(",")
        : null
    }

    let dateFrom = hasValue($("#date-from").val())
      ? moment($("#date-from").val(), DEFAULT_FORMAT_DATE).unix() * 1000
      : null
    let dateTo = hasValue($("#date-to").val())
      ? moment($("#date-to").val(), DEFAULT_FORMAT_DATE).unix() * 1000
      : null

    const listingTypeId =
      $("#listingTypeId").select2("data") &&
      $("#listingTypeId").select2("data")[0] &&
      isVal($("#listingTypeId").select2("data")[0].id)
        ? Number.parseInt($("#listingTypeId").select2("data")[0].id)
        : null
    const propertyTypeIds = $("#propertyTypeIds").val()
      ? $("#propertyTypeIds").val()
      : []
    let landCode = null
    let mapCode = null
    if (
      propertyTypeIds.indexOf("13") > -1 ||
      propertyTypeIds.indexOf("14") > -1
    ) {
      landCode = hasValue($.trim($("#land-code").val()))
        ? $.trim($("#land-code").val())
        : null
      mapCode = hasValue($.trim($("#map-code").val()))
        ? $.trim($("#map-code").val())
        : null
    }

    const filter = {
      address,
      assignedToList,
      channelTypeId,
      channelTypeChildId,
      fromStatusDate: dateFrom,
      id,
      landCode,
      listingTypeId: (listingTypeId !== 0 && listingTypeId) || null,
      mapCode,
      name,
      notAssigned,
      phone,
      propertyTypeIds: propertyTypeIds.join(","),
      sourceId,
      statusId: (statusId !== 0 && statusId) || null,
      tcId,
      toStatusDate: dateTo,
      typeId: that.__currentTabIndex,
      workTypeId: (workTypeId !== 0 && workTypeId) || null,
    }

    // update to dataPost if filter updated
    _prescreenIndexVariables._dataPost = {
      ..._prescreenIndexVariables._dataPost,
      ...filter,
    }

    return _prescreenIndexVariables._dataPost
  }

  clearFilter() {
    //$('#id-listing').val('');
    //$('#owner-name').val('');
    //$('#phone').val('');
    //$('#address').val('');
    $("#sourceId").val(0).select2()
    // $('#assignedToList').val('').select2();
    $("#notAssigned").prop("checked", false).trigger("change")
    $("#need-to-call-listing-statusId").val(0).select2()
    $("#need-to-call-listing-workTypeName").val(0).select2()
    $("#date-from").val("")
    $("#date-to").val("")
    $('#form-filter input[type="text"]').val("")
    $("#tcId").select2({
      data: [],
      placeholder: "Chọn nguồn phụ",
    })
    $("#infoChannel").val("").select2()
    $("#infoChannelChild").val("").select2()
    $("#listingTypeId").val(0).select2().trigger("change")
    $("#zoneField").val("").trigger("change")
    $("#teamField").val("").trigger("change")
    $("#departmentField").val("").trigger("change")
    $("#memberField").val("").trigger("change")
    $("#districtId").val("").trigger("change")
    $("#wardId").val("").trigger("change")
  }

  reloadList = async () => {
    this.updateFilter()
    await this.loadOverview()
    await this.loadTable()

    /* switch (this.__currentTabIndex) {
      case _prescreenIndexVariables.stored.tabIndex.call: {
        this.__tableCall.ajax.reload()

        break
      }
      case _prescreenIndexVariables.stored.tabIndex.called: {
        this.__tableCalled.ajax.reload()

        break
      }
      case _prescreenIndexVariables.stored.tabIndex.diy: {
        this.__tableDiy.ajax.reload()

        break
      }
    } */
  }
}

const highlightDisabledItem = (item) => {
  // Found a note in the Select2 formums on how to get the item to be selected

  if (!item.id) { return item.text }

  let $item = item.text
  if (item.isHighlight) {
      $item = $('<span style="color: #ccc">' + item.text + '</span>')
  }

  return $item
}

$(document).ready(function () {
  Window.prescreenIndex = new PrescreenIndex()
})

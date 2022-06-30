import { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { Container, NoData, ActionContainer, ProcessComponent } from "./style";
import _ from "lodash";
import ModalContactUpload from "../ModalContractUpload";
import {
  getContractExtendData,
  getContracts,
} from "../../api/ContractList/index";
import ModalContactDelete from "../ModalContractDelete";
import { pageStatusPermission } from "../../ultils";
import { handlePrint } from "../../commons";

const customStyles = {
  tableBody: {
    style: { 
      backgroundColor: "red"
    }
  },
  headRow: {
    style: {
      backgroundColor: "#dadada",
      fontWeight: 700,
    },
  },
  headCells: {
    style: {
      "div:first-child": {
        whiteSpace: "pre-wrap !important;",
        ".fa-sort": {
          // color: "red",
          opacity: "1",
          transform: "none !important",
          "&:before": {
            float: "right",
          },
        },
      },
    },
  },
  cells: {
    style: {
      paddingTop: "10px",
      paddingBottom: "10px",
      "div:first-child": {
        whiteSpace: "pre-wrap !important;",
        // whiteSpace: "wrap",
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
      },
    },
  },
};

const paginationComponentOptions = {
  rowsPerPageText: "Số dòng trên 1 trang là",
  rangeSeparatorText: "của",
};

function ContractTable(props) {
  const { filterOptions } = props;
  const sortRef = useRef(null);
  const rowPerPageRef = useRef(null);
  const columns = [
    {
      name: "Ngày",
      selector: (row) => row.formatCreatedDate,
      sortable: true,
      sortField: "CREATED_DATE",
    },
    {
      name: "Số HĐ",
      selector: (row) => (
        <a href={`/contract-management/${row.contractId}`} target="_blank">
          {row.contractCode}
        </a>
      ),
      sortable: true,
      sortField: "CONTRACT_CODE",
      width: "130px",
    },
    {
      name: "Chủ nhà",
      selector: (row) => row.ownerName,
      width: "160px",
    },
    {
      name: "Pre-Listing ID",
      selector: (row) => (
        <a href={`/pos/prescreener/detail/${row.lsoId}`} target="_blank">
          {row.lsoId}
        </a>
      ),
      sortable: true,
      sortField: "LISTING_ID",
      width: "130px",
    },
    {
      name: "Listing ID",
      selector: (row) => (
        <a href={`/pos/sa/detail/${row.rlistingId}`} target="_blank">
          {row.rlistingId}
        </a>
      ),
      sortable: false,
      sortField: "LISTING_ID",
      width: "130px",
    },
    {
      name: "Địa chỉ nhà",
      selector: (row) => row.address,
      width: "350px",
    },
    {
      name: "Loại DV",
      selector: (row) => row.serviceTypeName,
      sortable: true,
      sortField: "SERVICE_TYPE",
    },
    {
      name: "Gói DV",
      selector: (row) => row.servicePackageName,
      sortable: true,
      sortField: "SERVICE_PACKAGE",
    },
    {
      name: "Loại hoa hồng",
      selector: (row) => row.commissionTypeName,
      sortable: true,
      sortField: "COMMISSION_TYPE",
      width: "145px",
    },
    {
      name: "Hoa hồng",
      selector: (row) => row.formatCommissionValue,
      sortable: true,
      sortField: "COMMISSION_VALUE",
      width: "140px",
      right: true,
    },
    {
      name: "HĐ đã ký",
      selector: (row) => (
        <div
          data-toggle="modal"
          data-target="#modal-upload"
          onClick={() => {
            setSelectedRow(row);
            setActionUploadFile(true);
          }}
        >
          {!_.isEmpty(row.contractFileLink) ? (
            <p className={"view-text cursor-pointer"}>Xem</p>
          ) : (
            <i className="fa fa-upload cursor-pointer" aria-hidden="true"  data-toggle="tooltip" data-placement="top" title="Upload"/>
          )}
        </div>
      ),
      sortable: true,
      sortField: "CONTRACT_FILE",
      center: true,
    },
    {
      name: "Phụ trách Pre listing",
      selector: (row) => row.lsoAssignedToName,
      width: "150px",
    },
    {
      name: "Phụ trách Listing",
      selector: (row) => row.rlistingAssignedToName,
      width: "150px",
    },

    {
      name: "Ngày cập nhật",
      selector: (row) => row.formatUpdatedDate,
      sortable: true,
      sortField: "UPDATED_DATE",
      width: "135px",
    },
    {
      name: "Người cập nhật",
      selector: (row) => row.updatedByName,
      sortable: true,
      sortField: "UPDATED_BY_NAME",
      width: "135px",
    },
    {
      name: "Trạng thái",
      selector: (row) => row.statusName,
      sortable: true,
      sortField: "STATUS",
      width: "120px",
    },
    {
      name: "Actions",
      selector: (row) => (
        <ActionContainer>
          <div
            onClick={() => {
              // if(!_.isEmpty(row.contractFileLink)) {
              window.open(`/contract-management/edit/${row.contractId}`, "_blank");
              // }
            }}
          >
            <i className="fa fa-pencil cursor-pointer" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Chỉnh sửa"></i>
          </div>
          <div
            data-toggle="modal"
            // data-target={!_.isEmpty(row.contractFileLink) ? "#modal-delete" : ""}
            data-target={"#modal-delete"}
            onClick={() => {
              // if(!_.isEmpty(row.contractFileLink)) {
                setSelectedRow(row);
                setActionDelete(true);
              // }
            }}
          >
            <i className="fa fa-trash cursor-pointer" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Xóa"></i>
          </div>
          <div
            onClick={() => {
              handlePrint(row.contractId);
            }}
          >
            <i className="fa fa-print cursor-pointer" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="In"></i>
          </div>
        </ActionContainer>
      ),
      center: true,
    },
  ];

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [paginationDefaultPage, setPaginationDefaultPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRow, setSelectedRow] = useState({});
  const [actionUploadFile, setActionUploadFile] = useState(false);
  const [actionDelete, setActionDelete] = useState(false);

  const [sortOption, setSortOption] = useState({
    column: "UPDATED_DATE",
    type: "DESC",
  });

  useEffect(() => {
    if (!_.isEmpty(filterOptions)) {
      setSortOption({
        column: "UPDATED_DATE",
        type: "DESC",
      });
      fetchContract(1);
      setPaginationDefaultPage(1);
    }

    document.getElementsByClassName("rdt_Table")[0].offsetParent.offsetParent.style.height = "calc(100vh - 393px)";
    document.getElementsByClassName("rdt_Table")[0].offsetParent.style.height = "100%";
  }, [filterOptions]);

  const fetchContract = async (page) => {
    setLoading(true);
    (async () => {
      const request = {
        page: page,
        limit: perPage,
        requestBody: {
          ...filterOptions,
          sort: sortOption,
        },
      };
      // console.log("request", request);
      const response = await getContracts(request);
      if (_.isEmpty(response.data) && response.code == "401") {
        pageStatusPermission(401);
      } else {
        setData(response.data.list);
        setTotalRows(response.data.totalItems);

        if (!_.isEmpty(_.get(response, "data.list", []))) {
          getContractExtend(_.get(response, "data.list", []));
        }
      }
      setLoading(false);

      if (document.getElementsByClassName("content-wrapper")) {
        document.getElementsByClassName("content-wrapper")[0].style.minHeight =
          "100%";
      }
    })();
  };

  const handlePageChange = (page) => {
    const now = +new Date();
    // console.log("handlePageChange",page,now - sortRef.current , Math.ceil(totalRows/perPage) == currentPage &&  currentPage != page + 1 && page != 1 )
    if (now - sortRef.current < 500 || now - rowPerPageRef.current < 2000 || (Math.ceil(totalRows/perPage) == currentPage &&  currentPage != page + 1 && page != 1 )) {
      // setDefaultPage();
      return;
    } else {
      setPaginationDefaultPage(page);
      setCurrentPage(page);
      fetchContract(page);
    }
    
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // console.log("handlePerRowsChange",newPerPage)
    rowPerPageRef.current = +new Date();
    setLoading(true);
    (async () => {
      const request = {
        page: 1,
        limit: newPerPage,
        requestBody: {
          ...filterOptions,
          sort: sortOption,
        },
      };
      const response = await getContracts(request);
      setData(_.get(response, "data.list", []));
      setPerPage(newPerPage);
      setLoading(false);
      setPaginationDefaultPage(1);
      setCurrentPage(1);

      if (!_.isEmpty(_.get(response, "data.list", []))) {
        getContractExtend(_.get(response, "data.list", []));
      }
    })();
  };

  const handleSort = (column, sortDirection) => {
    // console.log("handleSort", currentPage);
    setSortOption({
      column: column.sortField,
      type: sortDirection.toUpperCase(),
    });
    sortRef.current = +new Date();
    setLoading(true);
    (async () => {
      const request = {
        page: 1,
        limit: perPage,
        requestBody: {
          ...filterOptions,
          sort: {
            column: column.sortField,
            type: sortDirection.toUpperCase(),
          },
        },
      };
      // setPaginationDefaultPage(currentPage);
      const response = await getContracts(request);
      setData(_.get(response, "data.list", []));
      setLoading(false);

      if (!_.isEmpty(_.get(response, "data.list", []))) {
        getContractExtend(_.get(response, "data.list", []));
      }
    })();
  };

  const getContractExtend = async (responseContract) => {
    let filteredPreListingId = [];
    responseContract.forEach((item) => {
      if (_.isNumber(item.lsoId) && item.lsoId != 0) {
        filteredPreListingId.push(item.lsoId);
      }
    });
    console.log("filteredPreListingId", filteredPreListingId.toString());
    const responseContractExtend = await getContractExtendData({
      preListingId: filteredPreListingId.toString(),
    });

    let contractFull = [];
    responseContract.forEach((contract) => {
      let result = contract;
      _.get(responseContractExtend, "data", []).forEach((contractExtend) => {
        if (contract.lsoId == contractExtend.lsoId) {
          result = { ...contract, ...contractExtend };
        }
      });
      contractFull.push(result);
    });

    setData(contractFull);
  };

  return (
    <Container>
      <DataTable
        className="class-test"
        columns={columns}
        // columns={columnsPagination}
        data={data}
        noDataComponent={
        // <NoData>Không tìm thấy</NoData>
          <ProcessComponent>
          <h3><b>Không tìm thấy</b></h3>
        </ProcessComponent>
        }
        pagination
        paginationComponentOptions={paginationComponentOptions}
        paginationDefaultPage={paginationDefaultPage}
        paginationResetDefaultPage={true}
        // paginationPerPage={2}
        fixedHeader={true}
        fixedHeaderScrollHeight="calc(100vh - 393px)"
        customStyles={customStyles}
        paginationRowsPerPageOptions={[10, 25, 50]}
        sortServer
        onSort={handleSort}
        // defaultSortAsc={false}
        // defaultSortFieldId={"14"}
        // sortFunction={customSort}
        sortIcon={<i class="fa fa-sort" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Sắp xếp"></i>}
        progressPending={loading}
        progressComponent={
          <ProcessComponent>
            <h3><b>Đang tải</b></h3>
          </ProcessComponent>}
        persistTableHead
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />

      <ModalContactUpload
        selectedRow={selectedRow}
        onUploadSuccess={() => fetchContract(currentPage)}
        actionUploadFile={actionUploadFile}
        setActionUploadFile={(value) => setActionUploadFile(value)}
      />
      <ModalContactDelete
        selectedRow={selectedRow}
        onDeleteSuccess={() => fetchContract(currentPage)}
        actionDelete={actionDelete}
        setActionDelete={(value) => setActionDelete(value)}
      />
    </Container>
  );
}

export default ContractTable;

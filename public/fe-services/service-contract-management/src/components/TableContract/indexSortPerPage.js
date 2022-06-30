import { memo, useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { Container, CustomizeDataTable, NoData } from "./style";
import _ from "lodash";
import axios from "axios";
import {
  initData,
  responseData10,
  responseData15,
  responseData5,
} from "./data";
import ModalContactUpload from "../ModalContractUpload";
import { getContracts } from "../../api/ContractList/index";

const customStyles = {
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
  rowsPerPageText: "Số dòng trên 1 trang",
  rangeSeparatorText: "của",
};

const sortOptionsDefaultASC = {
  CREATED_DATE: false,
  CONTRACT_CODE: false,
  LISTING_ID: false,
  SERVICE_TYPE: false,
  SERVICE_PACKAGE: false,
  COMMISSION_TYPE: false,
  COMMISSION_VALUE: false,
  CONTRACT_FILE: false,
  UPDATED_DATE: false,
  UPDATED_BY_NAME: false,
  STATUS: false,
};

function ContractTable(props) {
  const { filterOptions } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [paginationDefaultPage, setPaginationDefaultPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState({});
  const [sortOption, setSortOption] = useState({
    column: "UPDATED_DATE",
    type: "DESC",
  });
  const [sortOptions, setSortOptions] = useState(sortOptionsDefaultASC);

  const columns = [
    {
      name: (
        <span>
          Ngày{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("CREATED_DATE")}
          ></i>
        </span>
      ),
      selector: (row) => row.formatCreatedDate,
    },
    {
      name: (
        <span>
          Số HĐ{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("CONTRACT_CODE")}
          ></i>
        </span>
      ),
      selector: (row) => row.contractCode,
      width: "120px",
    },
    {
      name: "Chủ nhà",
      selector: (row) => row.ownerName,
      width: "160px",
    },
    {
      name: (
        <span>
          Listing ID{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("LISTING_ID")}
          ></i>
        </span>
      ),
      selector: (row) => row.listingId,
    },
    {
      name: "Địa chỉ nhà",
      selector: (row) => row.address,
      width: "350px",
    },
    {
      name: (
        <span>
          Loại DV{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("SERVICE_TYPE")}
          ></i>
        </span>
      ),
      selector: (row) => row.serviceTypeName,
    },
    {
      name: (
        <span>
          Gói DV{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("SERVICE_PACKAGE")}
          ></i>
        </span>
      ),
      selector: (row) => row.servicePackageName,
    },
    {
      name: (
        <span>
          Loại hoa hồng{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("COMMISSION_TYPE")}
          ></i>
        </span>
      ),
      selector: (row) => row.commissionTypeName,
      width: "120px",
    },
    {
      name: (
        <span>
          Hoa hồng (VND){" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("COMMISSION_VALUE")}
          ></i>
        </span>
      ),
      selector: (row) => row.formatCommissionValue,
    },
    {
      name: (
        <span>
          HĐ đã ký{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("CONTRACT_FILE")}
          ></i>
        </span>
      ),
      selector: (row) => (
        <div
          data-toggle="modal"
          data-target="#modal-upload"
          onClick={() => {
            setSelectedRow(row);
          }}
        >
          {!_.isEmpty(row.contractFileLink) ? (
            <p className={"view-text cursor-pointer"}>Xem</p>
          ) : (
            <i className="fa fa-upload cursor-pointer" aria-hidden="true" />
          )}
        </div>
      ),
      center: true,
    },
    {
      name: (
        <span>
          Ngày cập nhật{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("UPDATED_DATE")}
          ></i>
        </span>
      ),
      selector: (row) => row.formatUpdatedDate,
      width: "135px",
    },
    {
      name: (
        <span>
          Người cập nhật{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("UPDATED_BY_NAME")}
          ></i>
        </span>
      ),
      selector: (row) => row.updatedByName,
      width: "135px",
    },
    {
      name: (
        <span>
          Trạng thái{" "}
          <i
            class="fa fa-sort cursor-pointer"
            aria-hidden="true"
            onClick={() => onHandleSort("STATUS")}
          ></i>
        </span>
      ),
      selector: (row) => row.statusName,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <i className="fa fa-pencil cursor-pointer" aria-hidden="true"></i>
          <i className="fa fa-trash cursor-pointer" aria-hidden="true"></i>
          <i className="fa fa-print cursor-pointer" aria-hidden="true"></i>
        </div>
      ),
      center: true,
    },
  ];

  useEffect(() => {
    if (!_.isEmpty(filterOptions)) {
      fetchContract(1);
      setPaginationDefaultPage(1);
    }
  }, [filterOptions]);

  const fetchContract = async (page) => {
    console.log("fetchContract", page);
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
      console.log("request", request);
      const responseData = await getContracts(request);
      setData(responseData.list);
      setTotalRows(responseData.totalItems);
      setLoading(false);
    })();
  };

  const onHandleSort = (sortField) => {
    // true = ASC => cho về DESC
    setSortOption({
      column: sortField,
      type: sortOptions[sortField] ? "DESC" : "ASC",
    });
    setSortOptions((prevState) => {
      return { ...prevState, [sortField]: !prevState[sortField] };
    });

    setLoading(true);
    (async () => {
      const request = {
        page: currentPage,
        limit: perPage,
        requestBody: {
          ...filterOptions,
          sort: {
            column: sortField,
            type: sortOptions[sortField] ? "DESC" : "ASC",
          },
        },
      };
      console.log("request", request);
      const responseData = await getContracts(request);
      setData(responseData.list);
      setTotalRows(responseData.totalItems);
      setLoading(false);
    })();
  };

  const handlePageChange = (page) => {
    console.log("handlePageChange", page);
    setPaginationDefaultPage(page);
    setCurrentPage(page);
    fetchContract(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    (async () => {
      const request = {
        page: page,
        limit: newPerPage,
        requestBody: {
          ...filterOptions,
          sort: sortOption,
        },
      };
      console.log("request", request);
      const responseData = await getContracts(request);
      setData(responseData.list);
      setPerPage(newPerPage);
      setLoading(false);
    })();
  };

  return (
    <Container>
      <DataTable
        columns={columns}
        data={data}
        noDataComponent={<NoData>Không tìm thấy</NoData>}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        paginationDefaultPage={paginationDefaultPage}
        paginationResetDefaultPage={true}
        paginationRowsPerPageOptions={[10, 25, 50]}

        fixedHeader={true}
        fixedHeaderScrollHeight="calc(100vh - 393px)"
        customStyles={customStyles}

        progressPending={loading}
        persistTableHead
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />

      <ModalContactUpload
        selectedRow={selectedRow}
        onUploadSuccess={() => fetchContract(currentPage)}
      />
    </Container>
  );
}

export default ContractTable;

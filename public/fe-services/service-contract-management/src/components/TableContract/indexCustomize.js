import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../../components/TextField";
import { fetch } from "./listContractSlice";
import { Container, GroupButton } from "./style";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import MyComponent from "../../components/Table";
import IndexTest from "../../components/Table/indexTest";

const items1 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
];
// const itemsPerPage = 2;

const items = [
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "23/12/2012",
    contractNumber: "cbc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "24/12/2012",
    contractNumber: "ac",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "aNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "bNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },

  {
    date: "21/12/2012",
    contractNumber: "abc",
    owner: "cNguyễn phước lợi",
    listingId: "1",
    address: "86/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
  {
    date: "22/12/2012",
    contractNumber: "Bc",
    owner: "dNguyễn phước lợi",
    listingId: "2",
    address: "96/99 Âu cơ, tân bình",
    serviceType: "Bán",
    servicePackage: "Tiêu chuẩn",
    tipType: "Phần trăm (%)",
    tip: "45000000",
    contractIsSigned: true,
    status: "Draft",
  },
];

const sortOptionsDefault = {
  date: true,
  contractNumber: true,
  owner: true,
  listingId: true,
  address: true,
  serviceType: true,
  servicePackage: true,
  tipType: true,
  tip: true,
  contractIsSigned: true,
  status: true,
};

const ListContractContainer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch("ahihi"));
  }, []);

  useEffect(() => {
    console.log("state", state);
  }, state);

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
 
  const [sortOptions, setSortOptions] = useState(sortOptionsDefault);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log(
      "items.slice(itemOffset, endOffset)",
      items.slice(itemOffset, endOffset)
    );
    console.log(
      "Math.ceil(items.length / itemsPerPage)",
      Math.ceil(items.length / itemsPerPage)
    );
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log("handlePageClick",event)
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);

    setSortOptions(sortOptionsDefault);
  };

  const onHanldSort = (key) => {
    let currentItemsTmp = [...currentItems];
    let currentItemsSorted = _.orderBy(
      currentItemsTmp,
      key,
      !sortOptions[key] ? "asc" : "desc"
    );
    console.log(
      "onHanldSort !sortOptions[key]",
      !sortOptions[key] ? "desc" : "asc",
      key
    );
    // console.log("onHanldSort", a)

    setCurrentItems(currentItemsSorted);
    setSortOptions((prevState) => {
      return { ...prevState, [key]: !prevState[key] };
    });
  };

  useEffect(() => {
    console.log("onHanldSort sortOptions", sortOptions);
    console.log("onHanldSort currentItems", currentItems);
  }, [sortOptions, currentItems]);

  return (
    <Container>
      <div className={"row"}>
        <div className={"col-md-7 px-md-0"}>
          <div className={"col-md-5  px-md-0"}>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label htmlFor="fromDateFilter">Ngày HĐ từ</label>
                <div
                  className="input-group date"
                  data-provide="datepicker"
                  data-date-format="dd/mm/yyyy"
                >
                  <input
                    type="text"
                    className="form-control"
                    // ref={fromRef}
                    id="fromDateFilter"
                    // onChange={handleChangeFromDate}
                    name="fromDateFilter"
                    autoComplete="off"
                    // placeholder="Từ ngày"
                  />
                  <div className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label htmlFor="fromDateFilter">Ngày HĐ đến</label>
                <div
                  className="input-group date"
                  data-provide="datepicker"
                  data-date-format="dd/mm/yyyy"
                >
                  <input
                    type="text"
                    className="form-control"
                    // ref={fromRef}
                    id="fromDateFilter"
                    // onChange={handleChangeFromDate}
                    name="fromDateFilter"
                    autoComplete="off"
                    // placeholder="Từ ngày"
                  />
                  <div className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"col-md-7 px-md-0"}>
            <div className={"col-md-6"}>
              <div class="form-group">
                <label class="control-label" for="projectName">
                  Số HĐ
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  class="form-control"
                  value=""
                  required="required"
                  pattern=""
                  title=""
                />
              </div>
            </div>
            <div className={"col-md-6"}>
              <div class="form-group">
                <label class="control-label" for="projectName">
                  Chủ nhà
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  class="form-control"
                  value=""
                  required="required"
                  pattern=""
                  title=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"col-md-5"}>
          <div class="form-group">
            <label class="control-label" for="projectName">
              Địa chỉ
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              class="form-control"
              value=""
              required="required"
              pattern=""
              title=""
            />
          </div>
        </div>

        <div className={"col-md-7 px-md-0"}>
          <div className={"col-md-5  px-md-0"}>
            <div className={"col-md-6"}>
              <div class="form-group">
                <label class="control-label" for="districtId">
                  Loại dịch vụ
                </label>
                <select
                  id="districtId"
                  name="districtId"
                  class="form-control select2"
                >
                  <option value="0">Tất cả</option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  {/* @foreach($districts->data as $district)
                        <option @if(isset($projectDetail->districtId) && $district->districtId ==  $projectDetail->districtId) selected @endif value="{{$district->districtId}}">{{$district->districtName}}</option>
                    @endforeach */}
                </select>
              </div>
            </div>
            <div className={"col-md-6"}>
              <div class="form-group">
                <label class="control-label" for="districtId">
                  Gói dịch vụ
                </label>
                <select
                  id="districtId"
                  name="districtId"
                  class="form-control select2"
                >
                  <option value="0">Tất cả</option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  {/* @foreach($districts->data as $district)
                        <option @if(isset($projectDetail->districtId) && $district->districtId ==  $projectDetail->districtId) selected @endif value="{{$district->districtId}}">{{$district->districtName}}</option>
                    @endforeach */}
                </select>
              </div>
            </div>
          </div>
          <div className={"col-md-7 px-md-0"}>
            <div className={"col-md-6"}>
              <div class="form-group">
                <label class="control-label" for="districtId">
                  Team
                </label>
                <select
                  id="districtId"
                  name="districtId"
                  class="form-control select2"
                >
                  <option value="0">Tất cả</option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  {/* @foreach($districts->data as $district)
                        <option @if(isset($projectDetail->districtId) && $district->districtId ==  $projectDetail->districtId) selected @endif value="{{$district->districtId}}">{{$district->districtName}}</option>
                    @endforeach */}
                </select>
              </div>
            </div>
            <div className={"col-md-6"}>
              <div class="form-group">
                <label class="control-label" for="districtId">
                  Phòng ban
                </label>
                <select
                  id="districtId"
                  name="districtId"
                  class="form-control select2"
                >
                  <option value="0">Tất cả</option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  {/* @foreach($districts->data as $district)
                        <option @if(isset($projectDetail->districtId) && $district->districtId ==  $projectDetail->districtId) selected @endif value="{{$district->districtId}}">{{$district->districtName}}</option>
                    @endforeach */}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-5 px-md-0">
          <div className={"col-md-4"}>
            <div class="form-group">
              <label class="control-label" for="districtId">
                Thành viên
              </label>
              <select
                id="districtId"
                name="districtId"
                class="form-control select2"
              >
                <option value="0">Tất cả</option>
                <option value="0"></option>
                <option value="0"></option>
                <option value="0"></option>
                <option value="0"></option>
                <option value="0"></option>
                <option value="0"></option>
              </select>
            </div>
          </div>
          <div className={"col-md-8 px-md-0"}>
            <div className={"col-md-7"}>
              <div class="form-group">
                <label class="control-label" for="districtId">
                  Thành viên
                </label>
                <select
                  id="districtId"
                  name="districtId"
                  class="form-control select2"
                >
                  <option value="0">Tất cả</option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  {/* @foreach($districts->data as $district)
                        <option @if(isset($projectDetail->districtId) && $district->districtId ==  $projectDetail->districtId) selected @endif value="{{$district->districtId}}">{{$district->districtName}}</option>
                    @endforeach */}
                </select>
              </div>
            </div>
            <div className={"col-md-5"}>
              <div class="form-group">
                <label class="control-label" for="districtId">
                  Trạng thái
                </label>
                <select
                  id="districtId"
                  name="districtId"
                  class="form-control select2"
                >
                  <option value="0">Tất cả</option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  <option value="0"></option>
                  {/* @foreach($districts->data as $district)
                        <option @if(isset($projectDetail->districtId) && $district->districtId ==  $projectDetail->districtId) selected @endif value="{{$district->districtId}}">{{$district->districtName}}</option>
                    @endforeach */}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GroupButton>
        <button class="btn btn-default mr-1 default">Xóa bộ lọc</button>
        <button class="btn search">Tìm</button>
      </GroupButton>

      <div class="form-group">
        <label class="control-label" for="districtId">
          Thành viên
        </label>
        <select id="districtId" name="districtId" class="form-control select2" onChange={(e) => setItemsPerPage(e.target.value) }>
          <option value="10">10 records</option>
          <option value="25">25 records</option>
          <option value="50">50 records</option>
        </select>
      </div>
      <div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th className={"head"}>
                Ngày{" "}
                <span
                  class="glyphicon glyphicon-sort"
                  onClick={() => onHanldSort("date")}
                ></span>
              </th>
              <th className={"head"}>
                Số HĐ{" "}
                <span
                  class="glyphicon glyphicon-sort"
                  onClick={() => onHanldSort("contractNumber")}
                ></span>
              </th>
              <th className={"head"}>
                Chủ nhà{" "}
                <span
                  class="glyphicon glyphicon-sort"
                  onClick={() => onHanldSort("owner")}
                ></span>
              </th>
              <th className={"head"}>
                Listing ID <span class="glyphicon glyphicon-sort"></span>
              </th>
              <th className={"head"}>
                Địa chỉ nhà <span class="glyphicon glyphicon-sort"></span>
              </th>
              <th className={"head"}>
                Loại dịch vụ <span class="glyphicon glyphicon-sort"></span>
              </th>
              <th className={"head"}>
                Gói dịch vụ <span class="glyphicon glyphicon-sort"></span>
              </th>
              <th className={"head"}>
                Loại hoa hồng <span class="glyphicon glyphicon-sort"></span>
              </th>
              <th className={"head"}>
                Hoa hồng (VND) <span class="glyphicon glyphicon-sort"></span>
              </th>
              <th className={"head"}>
                HĐ đã ký <span class="glyphicon glyphicon-sort"></span>
              </th>
              <th className={"head"}>
                Trạng thái <span class="glyphicon glyphicon-sort"></span>
              </th>
              <th className={"head"}>
                Action <span class="glyphicon glyphicon-sort"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((item) => (
                <tr>
                  <th scope="row">{item.date}</th>
                  <td>{item.contractNumber}</td>
                  <td>{item.owner}</td>
                  <td>{item.listingId}</td>
                  <td>{item.address}</td>
                  <td>{item.serviceType}</td>
                  <td>{item.servicePackage}</td>
                  <td>{item.tipType}</td>
                  <td>{item.tip}</td>
                  <td>{item.contractIsSigned}</td>
                  <td>{item.status}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <ReactPaginate
          nextLabel="Sau"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Trước"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>

      {/* <MyComponent/> */}

      {/* <IndexTest/> */}
    </Container>
  );
};

export default ListContractContainer;

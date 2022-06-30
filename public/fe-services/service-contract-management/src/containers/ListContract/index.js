import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetch } from "./listContractSlice";
import { Container, Head } from "./style";
import ContractTable from "../../components/TableContract";
import FilterContract from "../../components/FilterContract";
import { contractPermission } from "../../api/CheckPermission";
import { pageStatusPermission } from "../../ultils";
import _ from "lodash";

const ListContractContainer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [filterOptions, setFilterOptions] = useState();

  useEffect(() => {
    dispatch(fetch("ahihi"));
    onCheckPermission();
  }, []);

  const onCheckPermission = () => {
    const permissionRequest = {
      contractId: -1,
      actionCode: "LIST",
    };
    (async () => {
      try {
        window.showPropzyLoading()
        const response = await contractPermission(permissionRequest);
        console.log("response.code", response.code)
        if (!_.isEmpty(response) && response.code == "401") {
          pageStatusPermission(401);
        } 
        window.hidePropzyLoading()
      } catch (error) {
        window.hidePropzyLoading()
      }
    })();
  }
 
  useEffect(() => {
    console.log("state", state);
  }, state);

  return (
    <Container>
      <Head>
        <p className={"title"}>Danh sách hợp đồng dịch vụ</p>
        <p className={"add"}><a href="/contract-management/create">Thêm mới</a></p>
      </Head>
      <FilterContract
        onSearchClick={(filter) => {
          setFilterOptions(filter);
        }}
      />
      <ContractTable filterOptions={filterOptions}/>
    </Container>
  );
};

export default ListContractContainer;
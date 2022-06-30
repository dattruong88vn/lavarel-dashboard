import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormikErrorFocus from 'formik-error-focus'
import { useParams, Navigate } from 'react-router-dom';

import RequestBlock1 from '../../components/FormContract/RequestBlock1';
import RequestBlock2 from '../../components/FormContract/RequestBlock2';
import RequestBlock3 from '../../components/FormContract/RequestBlock3';
import ContractBlock from '../../components/FormContract/ContractBlock';
import SelectFormik from '../../components/Select/SelectFormik';
import { fetchDefines, fetchStatusContract, fetchDetail } from './formContractSlice';
import { createContract, updateContract } from '../../apis/contractForm';
import { useDispatch, useSelector } from 'react-redux';
import useShema from '../../hooks/useSchema';
import { handlePrint } from '../../commons';
import { contractPermission } from '../../api/CheckPermission';
import _ from 'lodash';
import { pageStatusPermission } from '../../ultils';
import { Container } from './style';

const FormContractContainer = (props) => {
  const [urlRedirect, setUrlRedirect] = useState(null)
  const dispatch = useDispatch();
  const { id } = useParams();
  const [shema] = useShema();

  useMemo(() => {
    dispatch(fetchDefines())
    dispatch(fetchStatusContract())
    if (id) {
      dispatch(fetchDetail(id))
    }
  }, [])

  useEffect(() => {
    if (id && !props.disabled) {
      console.log('UPDATE')
      const permissionRequest = {
        contractId: id,
        actionCode: "UPDATE",
      };
      onCheckPermission(permissionRequest);
    } else if (!id) {
      console.log('ADD')
      const permissionRequest = {
        contractId: -1,
        actionCode: "ADD",
      };
      onCheckPermission(permissionRequest);
    }
    else if (id) {
      console.log('READ')
      const permissionRequest = {
        contractId: id,
        actionCode: "READ",
      };
      onCheckPermission(permissionRequest);
    }

    setTimeout(() => {
      var forms = document.getElementsByTagName('form');
      for (var i = 0; i < forms.length; i++) {
        var input = forms[i].getElementsByTagName('input');
        for (var y = 0; y < input.length; y++) {
          if (input[y].type === 'text' || input[y].type === 'number') { // set maxlenght
            switch (input[y].name) {
              case 'customerAddress':
              case 'propertyAddress':
                input[y].maxLength = 128;
                break;

              case 'contractCode':
              case 'propertyNumberGcnIssuePlace':
              case 'signBetween':
              case 'signWith':
                input[y].maxLength = 64;
                break;

              case 'partnerIdCard':
              case 'propertyNumberGcn':
              case 'propertyNumberGcnBook':
              case 'customerIdCard':
              case 'customerBankAccountNumber':
                input[y].maxLength = 18;
                break;

              default:
                input[y].maxLength = 32;
                break;
            }
          }

          if (props.disabled) { // set disabled detail page     pointer-events: none
            document.getElementById("form-contract").style.pointerEvents = "none";
            input[y].disabled = 'disabled';
          }
        }
      }
    }, 1000);
  }, [])

  const stateFormContract = useSelector(state => state.formContractSlice);
  const { loaded, infoContract } = stateFormContract
  let h3Title = "Xem hợp đồng dịch vụ";
  if (id && !props.disabled) {
    h3Title = "Sửa hợp đồng dịch vụ";
  } else if (!id) {
    h3Title = "Thêm mới hợp đồng dịch vụ";
  }

  const onCheckPermission = (permissionRequest) => {

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

  return (
    <Container>
      {urlRedirect !== null && <Navigate to="/contract-management" />}
      {((loaded.define && loaded.status && loaded.info) || (loaded.define && loaded.status && !id)) && <div className="box box-primary">
        <div className="box-header with-border">
          <h3 style={{ fontWeight: 'bold', marginBottom: '0px' }}>{h3Title}</h3>
        </div>
        <div className="box-body" id="box-contract">
          <Formik
            initialValues={infoContract}
            enableReinitialize
            validationSchema={shema}
            onSubmit={async (val, { setSubmitting }) => {
              console.log(val);
              let values = { ...val };
              let resp = null;
              values.customerName = values.customerName !== null ? values.customerName.toUpperCase() : null;
              values.partnerName = values.partnerName !== null ? values.partnerName.toUpperCase() : null;
              if (id) {
                resp = await updateContract(values);
              } else {
                resp = await createContract(values);
              }
              if (resp?.message) {
                window.showPropzyAlert(resp.message)
              }
              if (resp.code === '200') {
                setUrlRedirect("/contract-management")
              }
            }}
          >
            {({ isSubmitting,
              setFieldValue,
              values,
              formik
            }) => (
              <>
                <Form id="form-contract">
                  <div className="row">
                    <div className="col-md-6">
                      <label>HĐ của Pre-listing <span className="error">(*)</span></label>
                      <Field placeholder="Nhập ID hoặc địa chỉ Pre-listing để tìm kiếm" autoFill={true} defaultValue={values.lsoId !== null ? { label: `${values.lsoId} - ${values.listingAddress}`, value: values.lsoId } : false} component={SelectFormik} async={true} name="contractId" />
                      <ErrorMessage className="error" name="contractCode" component="div" />
                    </div>
                    <div className="col-md-6">
                      <label>Số HĐ</label>
                      <Field disabled={true} className="form-control" type="text" name="contractCode" />
                    </div>
                  </div>
                  <h4>I. PHIẾU YÊU CẦU</h4>
                  <RequestBlock1 />
                  <RequestBlock2 />
                  <RequestBlock3 />
                  <h4>II. HỢP ĐỒNG DỊCH VỤ</h4>
                  <h5>Điều 3: Phí dịch vụ - Thời hạn thực hiện dịch vụ</h5>
                  <ContractBlock />
                  {!props.disabled && <>
                    {values.contractFileLink && values.contractFileLink !== null && <div className="row">
                      <div className="col-md-6">
                        <label>Bản hợp đồng đã ký</label>
                        <div className="pl-20px">
                          <a target="_blank" href={values.contractFileLink}>{values.contractFileName}</a>
                        </div>
                      </div>
                    </div>}
                    <hr />
                  </>}
                  {!props.disabled && <div className="row">
                    <div className="col-md-12">
                      <div style={{ display: "inline-block" }} className="pull-right">
                        <a style={{ marginRight: "5px" }} className="btn btn-default" href="/contract-management">Đóng</a>
                        <button className="btn btn-success" type="submit" disabled={isSubmitting}>Lưu</button>
                      </div>
                    </div>
                  </div>}
                  <FormikErrorFocus
                    // See scroll-to-element for configuration options: https://www.npmjs.com/package/scroll-to-element
                    offset={0}
                    align={'top'}
                    focusDelay={200}
                    ease={'linear'}
                    duration={1000}
                  />
                </Form>
                {props.disabled && infoContract.contractFileLink && infoContract.contractFileLink !== null && <div className="row">
                  <div className="col-md-6">
                    <label>Bản hợp đồng đã ký</label>
                    <div className="pl-20px">
                      <a style={{cursor:"pointer"}} onClick={()=>window.open(infoContract.contractFileLink, "_blank")}>{infoContract.contractFileName}</a>
                    </div>
                  </div>
                </div>}
                <hr />
                {props.disabled && <div className="row">
                  <div className="col-md-12">
                    <div style={{ display: "inline-block" }} className="pull-left">
                      <button style={{ marginRight: "5px" }} onClick={() => handlePrint(infoContract.contractId)} className="btn btn-default"><i class="fa fa-print" aria-hidden="true"></i> In</button>
                    </div>
                    <div style={{ display: "inline-block" }} className="pull-right">
                      <a style={{ marginRight: "5px" }} className="btn btn-default" href="/contract-management">Đóng</a>
                      <a className="btn btn-primary" href={`/contract-management/edit/${id}`}>
                        Sửa
                      </a>
                    </div>
                  </div>
                </div>}
              </>
            )}
          </Formik>
        </div>
      </div>}
    </Container>
  )
};

export default FormContractContainer;
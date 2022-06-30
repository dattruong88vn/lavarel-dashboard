import React, { Component } from 'react';
import Select from 'react-select';
import DropdownProgressContainer from '../../pfs_list/containers/DropdownProgressContainer';
import ButtonProcessContainer from '../../pfs_list/containers/ButtonProcessContainer';
import ModalListImage from '../components/ModalListImage';
import NumberFormat from 'react-number-format';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class InfoContainer extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            selectedOption: 'chocolate',
            checkedData: new Map()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.receiveRequest = this.receiveRequest.bind(this);
        this.rejectProfile = this.rejectProfile.bind(this);
        this.onChangeBanks = this.onChangeBanks.bind(this);
        this.handleUpdateBank = this.handleUpdateBank.bind(this);
        this.handleChangeRequestStatus = this.handleChangeRequestStatus.bind(this);
    }

    componentWillMount() {
        this.checkedRadio = new Map();
    }

    handleChangeCheck(e, docId, typeId, requestId) {
        let item = e.target.name;
        let value = e.target.value;
        let isChecked = value == "isRequired" ? e.target.checked : false;
        if (this.checkedRadio.has(item)) {
            this.checkedRadio.delete(item);
        } 
        this.checkedRadio.set(item, isChecked);
        this.setState({checkedData : this.checkedRadio});        
        let data = {};
        data[value] = e.target.checked;
        this.props.setDataPostProfile(data, docId, typeId, requestId);
    }

    handleChange (selectedOption) {
        this.setState({ selectedOption });
    };

    receiveRequest(id) {
        this.props.receiveRequest(id);
    }

    updateStatus(id, statusId) {
        this.props.updateStatus(id, statusId);
    }

    openPopupTm() {
        $('#modalRequestBankLoan').modal('show');
    }

    rejectProfile(id) {
        this.props.setRejectProfile({requestId: id});
        $('#modalRejectProfile').modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    reassign(id) {
        this.props.setDataReassign({id: id});
        $('#modalReassign').modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    onChangeBanks(e,index = -1){
        let name = e.target.name;
        let value = e.target.value;
        value = value.replace(/,/g, "");
        value = value.replace(/đ/g, "");
        let _resultBanks = {...this.props.info.resultBanks};
        if(index != -1){
            if(name == "isShow") {
                value = e.target.checked;
            }
            if(name == `loanType-${index}`) {
                name = "loanType";
                value = parseInt(value);
            }
            _resultBanks.banks[index][name] = value;
        }else{
            _resultBanks[name] = value;
        }
        
        this.props.dispatch({type:"SET_FIELD_BANK",value:_resultBanks});
    }

    handleUpdateBank() {
        this.props.updateBank(this.props.info.resultBanks);
    }

    formatCurency(data) {
        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    downloadProfile(id) {
        this.props.downloadProfile(id);
    }
    handleChangeRequestStatus(infoId){
        this.props.changeRequestStatus({requestId:infoId})
    }

    render() {
        let that = this;
        let {info} = this.props;
        let { selectedOption } = this.state;
        return (
            <div>
                <div>
                    <div className="row">
                        <div className="col-md-3">
                            <label>PFS: </label>
                            <p>{info.assignedName}</p>
                        </div>
                        <div className="col-md-3">
                            <label>Họ tên khách hàng: </label>
                            <p>{info.customerName}</p>
                        </div>
                        <div className="col-md-3">
                            <label>Trạng thái: </label>
                            <p>{info.statusMortgageName} 
                            &nbsp;
                            {info.statusId == 31 && currentUser.departments[0].isGroupAdmin == true && <a href="#" onClick={() => {
                                this.handleChangeRequestStatus(info.id);
                            }}>Chuyển trạng thái</a>}
                            </p>
                        </div>
                        <div className="col-md-3">
                            <label>Người gửi: </label>
                            <p>{info.senderName}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <label>Loại BĐS: </label>
                            <p>{info.propertyTypeName}</p>
                        </div>
                        <div className="col-md-3">
                            <label>Số CMND/TCC: </label>
                            <p>{info.cmnd ? info.cmnd : 'N/A'}</p> 
                        </div>
                        <div className="col-md-3">
                            <DropdownProgressContainer mortgageRequestId={info.id} info={info}/>
                        </div>
                        <div className="col-md-3">
                            <label>Đối tượng: </label>
                            <p>{info.subjectName}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <label>Listing ID:</label>
                            <p>{info.rlistingId ? info.rlistingId : 'N/A'}</p>
                        </div>
                    </div>
                    <hr/>
                    {info.isLoan == true && info.profiles && info.profiles.map(function(profile, indexProfile){
                        return <div key={indexProfile} className="row">
                                    <div className="col-md-12">
                                        <h4>{profile.name}</h4>
                                    </div>
                                    {profile.childs && profile.childs.map(function(child, indexChild){
                                        return <div key={indexChild} className="col-md-12">
                                                <label style={{margin: "10px 0"}}>{child.name} (Thu nhập: {child.income ? that.formatCurency(child.income) + ' vnđ' : 'N/A'})</label>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        { child.profileInfos && child.profileInfos.map(function(proIn, indexPI){
                                                            return <div key={indexPI} className="col-md-6" style={{border: "1px solid #dedede", padding: "10px", minHeight: "200px"}}>
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="col-md-6">
                                                                                    <span className="text-muted">{proIn.name}:</span>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    {proIn.control == 'file' && <ModalListImage listImages={proIn.photoGcns}/>}
                                                                                    {proIn.control == 'input' && <input value={ proIn.typeId == 1124 ? info.cmnd : (proIn.text == null ? '' : proIn.text)} disabled={true} className='form-control'/>}
                                                                                </div>
                                                                            </div>
                                                                            {info.statusId != 27 && info.statusId != 31 && <div className="col-md-12">
                                                                                <div className="col-md-6">
                                                                                    <div className="radio">
                                                                                        <label>
                                                                                            <input type="radio" name={"isRequired-" + proIn.typeId} value={"isRequired"} onChange={ (e) => that.handleChangeCheck(e, child.docId, proIn.typeId, info.id) } checked={that.state.checkedData.has("isRequired-" + proIn.typeId) ? that.state.checkedData.get("isRequired-" + proIn.typeId) == true : proIn.isRequired} />
                                                                                            Yêu cầu lại
                                                                                        </label>
                                                                                    </div>
                                                                                    <div>
                                                                                        <input className={(that.state.checkedData.has("isRequired-" + proIn.typeId) ? that.state.checkedData.get("isRequired-" + proIn.typeId) == false : proIn.isSuccess) ? "hide" : "form-control"} type="text" defaultValue={proIn.note  ? proIn.note : ''} name={proIn.typeId} onChange={(e) => that.props.inputChange(e, child.docId, proIn.typeId, info.id)} placeholder="Ghi chú thêm cho BA"/>
                                                                                        <input className={(that.state.checkedData.has("isRequired-" + proIn.typeId) ? that.state.checkedData.get("isRequired-" + proIn.typeId) == true : proIn.isRequired) ? "hide" : "form-control"} type="text" defaultValue={proIn.stickNote ? proIn.stickNote : ''} name={`stickNote${proIn.typeId}`} placeholder="Ghi chú nhanh" onChange={(e) => that.props.inputChange(e, child.docId, proIn.typeId, info.id)} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="radio">
                                                                                        <label>
                                                                                            <input type="radio" name={"isRequired-" + proIn.typeId} value={"isSuccess"} onChange={ (e) => that.handleChangeCheck(e, child.docId, proIn.typeId, info.id) } checked={that.state.checkedData.has("isRequired-" + proIn.typeId) ? that.state.checkedData.get("isRequired-" + proIn.typeId) == false : proIn.isSuccess} />
                                                                                            Đủ hồ sơ
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>}
                                                                        </div>
                                                                    </div>
                                                            })  
                                                        }
                                                    </div>
                                                </div>
                                                <hr />
                                        </div>
                                    })}
                                </div>
                    })}
                    {info.collateral != null && <div> <div className="row">
                        <div className="col-md-12">
                            <h4>{info.collateral.name}</h4>
                        </div>
                            { info.collateral.profileInfos && info.collateral.profileInfos.map(function(proIn,indexPI){
                                return <div key={indexPI} className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-6">
                                                <span className="text-muted">{proIn.name}:</span>
                                                </div>
                                                <div className="col-md-6">
                                                    {proIn.control == 'file' && <ModalListImage listImages={proIn.photoGcns}/>}
                                                    {proIn.control == 'input' && <input disabled={true} value={proIn.text == null ? '' : proIn.text} className='form-control'/>}
                                                </div>
                                            </div>
                                        </div>
                                })  
                            }
                        </div>
                        <hr />
                    </div>
                }
                { info.resultBanks != null && <div className="row">
                        <div className="col-md-12">
                            <h4>Kết quả thẩm định </h4>
                            
                                {info.resultBanks.banks.length > 0 && info.resultBanks.isSatisfactory && <div>
                                    {info.resultBanks.banks.map(function(bank,indexBank){
                                        return <div key={indexBank}>
                                                <div className="form-inline">
                                                    <div className="form-group">
                                                        <div class="row">
                                                            <div className="col-md-4">
                                                                <label className="checkbox-inline"><input name="isShow" onChange={(e) => {
                                                                    that.onChangeBanks(e,indexBank);
                                                                }} checked={bank.isShow} type="checkbox" value="" disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false}/>{bank.bankName}</label>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label >Số tiền có thể vay: </label> &nbsp;
                                                                <NumberFormat suffix="đ" thousandSeparator={true} type="text" onChange={(e) => {
                                                                    that.onChangeBanks(e,indexBank);
                                                                }} name="price" className="form-control" value={bank.price} disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false}/>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label >Lãi suất</label>
                                                                <ul>
                                                                    <li>Lãi suất {bank.interestRate1} / năm suốt thời gian vay</li>
                                                                    <li>Lãi suất {bank.interestRate2} / năm suốt thời gian vay</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div style={{paddingLeft:"35px"}} className="col-md-4">
                                                                <label >Thời gian vay: </label>
                                                                <span>{bank.maxLoanTerm}</span>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label >Phí trả nợ trước hạn: </label>
                                                                <span>{bank.earlyRepaymentFee}</span>
                                                            </div>
                                                        </div><br/>
                                                        <div className="row">
                                                            <div style={{paddingLeft:"35px"}} className="col-md-4">
                                                                <label className="radio-inline"><input type="radio" checked={bank.loanType == 1 ? true : false} onChange={(e) => {that.onChangeBanks(e,indexBank);}} name={`loanType-${indexBank}`} value="1" disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false}/>Vay đúng số tiền ngân hàng duyệt</label>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label className="radio-inline"><input type="radio" checked={bank.loanType == 2 ? true : false} onChange={(e) => {that.onChangeBanks(e,indexBank);}} name={`loanType-${indexBank}`} value="2" disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false}/>Vay số tiền thấp hơn</label>
                                                                <div style={{padding:"10px 0px 10px 20px"}} className="form-group">
                                                                    <label >Nhập số tiền: </label>	&nbsp;
                                                                    <NumberFormat suffix="đ" thousandSeparator={true} type="text" name="loanPrice" value={bank.loanPrice} onChange={(e) => {that.onChangeBanks(e,indexBank);}} className="form-control" disabled={(bank.loanType == 1 || bank.loanType == null)}/>
                                                                    {/* <input type="text" name="loanPrice" value={bank.loanPrice} onChange={(e) => {that.onChangeBanks(e,indexBank);}} className="form-control" disabled={(bank.loanType == 1 || bank.loanType == null)}/> */}
                                                                </div>
                                                                <div style={{padding:"10px 0px 10px 20px"}} className="form-group">
                                                                    <label >Thời hạn vay: </label>	&nbsp;
                                                                    <input type="text" name="loanYear" value={bank.loanYear} onChange={(e) => {that.onChangeBanks(e,indexBank);}} className="form-control" disabled={(bank.loanType == 1 || bank.loanType == null)}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                </div>
                                    })}
                                </div>
                                } 
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Kết quả thẩm định:</label> 
                                    {info.resultBanks.isSatisfactory ? 'Đủ điều kiện vay' : 'Không đủ điều kiện vay'}
                                </div>
                                <div className="col-md-6">
                                    <label>Ghi chú:</label> &nbsp;
                                    <input type="text" name="note" onChange={this.onChangeBanks} value={info.resultBanks.note} disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false} />
                                </div>
                            </div>
                            {currentUser.departments[0].isGroupAdmin == false && <div><button onClick={that.handleUpdateBank} className="btn btn-default mt-25" disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false}>Cập nhật kết quả thẩm định</button></div>}
                        </div>
                    </div>
                }
                </div>
                <div style={{marginTop:"10px"}}>
                        {info.phoneNumbers && info.phoneNumbers.length > 0 && <button className="btn-accept btn btn-default ml-10 mt-25" onClick={() => {
                        ModalChoosePhoneNumber.showModal({
                            phoneNumbers: info.phoneNumbers,
                            onItemChosen: function (data) {
                                CCall.makeCall({
                                    phoneNumber: data.phoneNumber,
                                });
                            }
                        });
                    }}>Gọi KH</button>}
                    {info.isLoan == true && info.statusId == 27 && currentUser.departments[0].isGroupAdmin == false && <button className="btn-accept btn btn-default ml-10 mt-25" onClick={this.receiveRequest.bind(this, info.id)}>Chấp nhận</button>}
                    
                    {info.isLoan == true && (info.statusId == 28 || info.statusId == 31) && currentUser.departments[0].isGroupAdmin == false && <button className="btn-cancel btn btn-default ml-10 mt-25" onClick={this.rejectProfile.bind(this, info.id)}>Hủy</button>}
                    {info.isLoan == true && (info.statusId == 28 || info.statusId == 31) && currentUser.departments[0].isGroupAdmin == false && <button className="btn btn-default ml-10 mt-25" onClick={this.updateStatus.bind(this, info.id, 32)}>Đóng hồ sơ</button>}
                    {info.isLoan == true && info.statusId == 28 && currentUser.departments[0].isGroupAdmin == false && <ButtonProcessContainer mortgageRequestId={info.id}/>}
                    {info.isLoan == true && info.statusId == 28 && currentUser.departments[0].isGroupAdmin == false && <button disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false && this.props.profiles.postDataProfile.fileRequires.length == 0} className="btn btn-default ml-10 mt-25" onClick={this.props.updateValidateField.bind(this)}>Cập nhật</button>}
                    {info.isLoan == true && info.resultBanks != null && info.statusId == 28 && currentUser.departments[0].isGroupAdmin == false && <button disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false} className="btn btn-default ml-10 mt-25" onClick={this.updateStatus.bind(this, info.id, 31)}>Chuyển ngân hàng</button>}
                    {/* {info.statusId != 33 && info.statusId != 34 && info.statusId !=41 && <button className="btn-cancel btn btn-default ml-10 mt-25" onClick={this.rejectProfile.bind(this, info.id)}>Hủy</button>} */}
                    {info.isLoan == true && info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false && <button className="btn btn-default ml-10 mt-25" onClick={this.downloadProfile.bind(this, info.id)}>Download</button>}
                    {currentUser.departments[0].isGroupAdmin && <button className="btn btn-default ml-10 mt-25" onClick={this.reassign.bind(this, info.id)}>Re-assign</button>}
                </div>
            </div>
        );
    }
}

export default InfoContainer;
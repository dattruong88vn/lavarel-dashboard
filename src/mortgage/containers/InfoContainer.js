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
        value = value.replace(/??/g, "");
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
                            <label>H??? t??n kh??ch h??ng: </label>
                            <p>{info.customerName}</p>
                        </div>
                        <div className="col-md-3">
                            <label>Tr???ng th??i: </label>
                            <p>{info.statusMortgageName} 
                            &nbsp;
                            {info.statusId == 31 && currentUser.departments[0].isGroupAdmin == true && <a href="#" onClick={() => {
                                this.handleChangeRequestStatus(info.id);
                            }}>Chuy???n tr???ng th??i</a>}
                            </p>
                        </div>
                        <div className="col-md-3">
                            <label>Ng?????i g???i: </label>
                            <p>{info.senderName}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <label>Lo???i B??S: </label>
                            <p>{info.propertyTypeName}</p>
                        </div>
                        <div className="col-md-3">
                            <label>S??? CMND/TCC: </label>
                            <p>{info.cmnd ? info.cmnd : 'N/A'}</p> 
                        </div>
                        <div className="col-md-3">
                            <DropdownProgressContainer mortgageRequestId={info.id} info={info}/>
                        </div>
                        <div className="col-md-3">
                            <label>?????i t?????ng: </label>
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
                                                <label style={{margin: "10px 0"}}>{child.name} (Thu nh???p: {child.income ? that.formatCurency(child.income) + ' vn??' : 'N/A'})</label>
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
                                                                                            Y??u c???u l???i
                                                                                        </label>
                                                                                    </div>
                                                                                    <div>
                                                                                        <input className={(that.state.checkedData.has("isRequired-" + proIn.typeId) ? that.state.checkedData.get("isRequired-" + proIn.typeId) == false : proIn.isSuccess) ? "hide" : "form-control"} type="text" defaultValue={proIn.note  ? proIn.note : ''} name={proIn.typeId} onChange={(e) => that.props.inputChange(e, child.docId, proIn.typeId, info.id)} placeholder="Ghi ch?? th??m cho BA"/>
                                                                                        <input className={(that.state.checkedData.has("isRequired-" + proIn.typeId) ? that.state.checkedData.get("isRequired-" + proIn.typeId) == true : proIn.isRequired) ? "hide" : "form-control"} type="text" defaultValue={proIn.stickNote ? proIn.stickNote : ''} name={`stickNote${proIn.typeId}`} placeholder="Ghi ch?? nhanh" onChange={(e) => that.props.inputChange(e, child.docId, proIn.typeId, info.id)} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="radio">
                                                                                        <label>
                                                                                            <input type="radio" name={"isRequired-" + proIn.typeId} value={"isSuccess"} onChange={ (e) => that.handleChangeCheck(e, child.docId, proIn.typeId, info.id) } checked={that.state.checkedData.has("isRequired-" + proIn.typeId) ? that.state.checkedData.get("isRequired-" + proIn.typeId) == false : proIn.isSuccess} />
                                                                                            ????? h??? s??
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
                            <h4>K???t qu??? th???m ?????nh </h4>
                            
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
                                                                <label >S??? ti???n c?? th??? vay: </label> &nbsp;
                                                                <NumberFormat suffix="??" thousandSeparator={true} type="text" onChange={(e) => {
                                                                    that.onChangeBanks(e,indexBank);
                                                                }} name="price" className="form-control" value={bank.price} disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false}/>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label >L??i su???t</label>
                                                                <ul>
                                                                    <li>L??i su???t {bank.interestRate1} / n??m su???t th???i gian vay</li>
                                                                    <li>L??i su???t {bank.interestRate2} / n??m su???t th???i gian vay</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div style={{paddingLeft:"35px"}} className="col-md-4">
                                                                <label >Th???i gian vay: </label>
                                                                <span>{bank.maxLoanTerm}</span>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label >Ph?? tr??? n??? tr?????c h???n: </label>
                                                                <span>{bank.earlyRepaymentFee}</span>
                                                            </div>
                                                        </div><br/>
                                                        <div className="row">
                                                            <div style={{paddingLeft:"35px"}} className="col-md-4">
                                                                <label className="radio-inline"><input type="radio" checked={bank.loanType == 1 ? true : false} onChange={(e) => {that.onChangeBanks(e,indexBank);}} name={`loanType-${indexBank}`} value="1" disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false}/>Vay ????ng s??? ti???n ng??n h??ng duy???t</label>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label className="radio-inline"><input type="radio" checked={bank.loanType == 2 ? true : false} onChange={(e) => {that.onChangeBanks(e,indexBank);}} name={`loanType-${indexBank}`} value="2" disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false}/>Vay s??? ti???n th???p h??n</label>
                                                                <div style={{padding:"10px 0px 10px 20px"}} className="form-group">
                                                                    <label >Nh???p s??? ti???n: </label>	&nbsp;
                                                                    <NumberFormat suffix="??" thousandSeparator={true} type="text" name="loanPrice" value={bank.loanPrice} onChange={(e) => {that.onChangeBanks(e,indexBank);}} className="form-control" disabled={(bank.loanType == 1 || bank.loanType == null)}/>
                                                                    {/* <input type="text" name="loanPrice" value={bank.loanPrice} onChange={(e) => {that.onChangeBanks(e,indexBank);}} className="form-control" disabled={(bank.loanType == 1 || bank.loanType == null)}/> */}
                                                                </div>
                                                                <div style={{padding:"10px 0px 10px 20px"}} className="form-group">
                                                                    <label >Th???i h???n vay: </label>	&nbsp;
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
                                    <label>K???t qu??? th???m ?????nh:</label> 
                                    {info.resultBanks.isSatisfactory ? '????? ??i???u ki???n vay' : 'Kh??ng ????? ??i???u ki???n vay'}
                                </div>
                                <div className="col-md-6">
                                    <label>Ghi ch??:</label> &nbsp;
                                    <input type="text" name="note" onChange={this.onChangeBanks} value={info.resultBanks.note} disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false} />
                                </div>
                            </div>
                            {currentUser.departments[0].isGroupAdmin == false && <div><button onClick={that.handleUpdateBank} className="btn btn-default mt-25" disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false}>C???p nh???t k???t qu??? th???m ?????nh</button></div>}
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
                    }}>G???i KH</button>}
                    {info.isLoan == true && info.statusId == 27 && currentUser.departments[0].isGroupAdmin == false && <button className="btn-accept btn btn-default ml-10 mt-25" onClick={this.receiveRequest.bind(this, info.id)}>Ch???p nh???n</button>}
                    
                    {info.isLoan == true && (info.statusId == 28 || info.statusId == 31) && currentUser.departments[0].isGroupAdmin == false && <button className="btn-cancel btn btn-default ml-10 mt-25" onClick={this.rejectProfile.bind(this, info.id)}>H???y</button>}
                    {info.isLoan == true && (info.statusId == 28 || info.statusId == 31) && currentUser.departments[0].isGroupAdmin == false && <button className="btn btn-default ml-10 mt-25" onClick={this.updateStatus.bind(this, info.id, 32)}>????ng h??? s??</button>}
                    {info.isLoan == true && info.statusId == 28 && currentUser.departments[0].isGroupAdmin == false && <ButtonProcessContainer mortgageRequestId={info.id}/>}
                    {info.isLoan == true && info.statusId == 28 && currentUser.departments[0].isGroupAdmin == false && <button disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false && this.props.profiles.postDataProfile.fileRequires.length == 0} className="btn btn-default ml-10 mt-25" onClick={this.props.updateValidateField.bind(this)}>C???p nh???t</button>}
                    {info.isLoan == true && info.resultBanks != null && info.statusId == 28 && currentUser.departments[0].isGroupAdmin == false && <button disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false} className="btn btn-default ml-10 mt-25" onClick={this.updateStatus.bind(this, info.id, 31)}>Chuy???n ng??n h??ng</button>}
                    {/* {info.statusId != 33 && info.statusId != 34 && info.statusId !=41 && <button className="btn-cancel btn btn-default ml-10 mt-25" onClick={this.rejectProfile.bind(this, info.id)}>H???y</button>} */}
                    {info.isLoan == true && info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false && <button className="btn btn-default ml-10 mt-25" onClick={this.downloadProfile.bind(this, info.id)}>Download</button>}
                    {currentUser.departments[0].isGroupAdmin && <button className="btn btn-default ml-10 mt-25" onClick={this.reassign.bind(this, info.id)}>Re-assign</button>}
                </div>
            </div>
        );
    }
}

export default InfoContainer;
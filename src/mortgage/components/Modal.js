import React, { Component } from 'react';
import Dropdown from './Dropdown';
import uniqueid from 'uniqid'
import { checkValid } from '../actions';
import NumberFormat from 'react-number-format';
export default class Modal extends Component {
    constructor(props) {
        super(props);
        let dataPost = {
            loan: 0,
            latestAmount: 0,
            isMarried: true,
            isLoan: true,
            initCapital:0,
            documents: [
                {
                    key: uniqueid(),
                    channelTypeId: 1119,
                    income: 0
                }
            ]
        };
        if(typeof deal !== 'undefined'){
           dataPost.dealId = deal.dealId;
           dataPost.leadId = deal.leadId;
        }else{
            dataPost.leadId = lead.leadId;
        }
        this.state = {
            dataPost : dataPost,
            dataValid: {
                flag: false,
                message: ""
            }
        }
        this.addDocument = this.addDocument.bind(this);
        this.rmDocument = this.rmDocument.bind(this);
        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleChangeDocument = this.handleChangeDocument.bind(this);
    }

    addDocument(){
        let dataPost = {...this.state.dataPost};
        let documents = dataPost.documents;
        documents.push({
            key : uniqueid(),
            channelTypeId:1119,
            income:0
        });
        this.setState({
            dataPost : dataPost
        })
    }

    rmDocument(index){
        let dataPost = {...this.state.dataPost};
        let documents = dataPost.documents;
        documents.splice(index,1);
        this.setState({
            dataPost : dataPost
        })
    }

    handleOnchange(e){
        let {dataPost} = this.state;
        let name = e.target.name;
        let value = e.target.value;
        if(name == 'isMarried'){
            dataPost[name] = value == 'true';
        }else{
            value = value.replace(/,/g, "");
            value = value.replace(/??/g, "");
            dataPost[name] = value;
        }
        // dataPost[name] = name == 'isMarried' ? (value == 'true') : value;
        
        this.setState({
            dataPost : dataPost
        })
    }

    handleChangeDocument(obj){
        let {dataPost} = this.state;
        let value = obj.value;
        value = value.replace(/,/g, "");
        value = value.replace(/??/g, "");
        dataPost.documents[obj.index][obj.name] = value;
        this.setState({
            dataPost : dataPost
        })
    }

    loan(boleans){
        let that = this;
        let {dataPost} = this.state;
        dataPost.isLoan = boleans;
        if(this.props.info.id){
            dataPost.id = this.props.info.id;
        }
        let resultValid =true;
        if(boleans){
            resultValid = checkValid(dataPost);
        }
        if(resultValid == true) {
            this.props.createMortgageRequest(dataPost,(resp) => {
                that.setState({
                    dataValid: {
                        flag: false,
                        message: ""
                    }
                });
                showPropzyAlert(resp.message);
                var intercom = Intercom.getInstance();
                intercom.emit('closeModalRequestBankLoan', {action: true});
                
                location.reload();
            });
            // $("#modalRequestBankLoan").modal('hide');
        } else {
            this.setState({
                dataValid: {
                    flag: true,
                    message: resultValid
                }
            });
        }
    }

    render() {
        let that = this;
        let documents = [...this.state.dataPost.documents];
        let dropdownChannel = this.props.chanels.map(function(chanel,index){
            return <option key={index} value={chanel.id}>{chanel.name}</option>
        })
        documents = documents.map(function(doc,index){
            let action = <a onClick={(e) => { e.preventDefault();that.rmDocument(index) }} href="#" className="text-danger" style={{position:'absolute',right:'15px',zIndex:'1'}}><i className="fa fa-times"></i> X??a</a> 
            if((index + 1) == that.state.dataPost.documents.length){
                action = <a onClick={(e)=>{ e.preventDefault();that.addDocument() }} href="#" style={{position:'absolute',right:'15px',zIndex:'1'}}><i className="fa fa-plus"></i> Th??m</a> 
            }
            return <div key={doc.key}>
                    <div className="row">
                        {action}
                        <div style={{width:'50%'}} className="form-group col-md-6">
                            <span className="text-muted">Thu nh???p t???:</span>
                            <Dropdown index={index} handleChangeDocument={that.handleChangeDocument} doc={doc} chanels={dropdownChannel}/>
                        </div>
                        <div style={{width:'50%'}} className="form-group col-md-6">
                            <span className="text-muted">S??? ti???n thu nh???p: <span className="text-danger">*</span></span>
                            <NumberFormat suffix="??" thousandSeparator={true} type="text" name="income" onChange={(e) => {
                                let {name,value} = e.target;
                                that.handleChangeDocument({index,name,value})
                            }} className="form-control" value={doc.income}/>
                            {/* <input type="text" name="income" onChange={(e) => {
                                let {name,value} = e.target;
                                that.handleChangeDocument({index,name,value})
                            }} className="form-control" value={doc.income} /> */}
                        </div>
                    </div>
                    <hr style={{margin:'5px 0px 10px 0px'}}/>
                </div>
        })
        return (
            <div>
                <div id="modalRequestBankLoan" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">??</button>
                            <h4 className="modal-title">Y??u c???u vay ng??n h??ng</h4>
                        </div>
                        <div className="modal-body">
                            <form action="/action_page.php">
                            <div className="form-group">
                                <span className="text-muted">S??? ti???n kh??ch h??ng c?? s???n: <span className="text-danger">*</span></span>
                                <NumberFormat suffix="??" thousandSeparator={true} type="text" name="initCapital" value={this.state.dataPost.initCapital} onChange={this.handleOnchange} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <span className="text-muted">S??? ti???n kh??ch h??ng mu???n vay: <span className="text-danger">*</span></span>
                                <NumberFormat suffix="??" thousandSeparator={true} type="text" name="loan" value={this.state.dataPost.loan} onChange={this.handleOnchange} className="form-control" />
                                {/* <input type="text" name="loan" value={this.state.dataPost.loan} onChange={this.handleOnchange} className="form-control" /> */}
                            </div>
                            <h4 className="title-with-line"><span style={{background: 'white'}}>H??? s?? ph??p l??</span></h4>
                            <div>
                                <label style={{fontWeight: 'none'}} className="radio-inline text-muted">
                                    <input type="radio" name="isMarried" value={false} onChange={this.handleOnchange} />?????c th??n
                                </label>
                                <label style={{fontWeight: 'none'}} className="radio-inline text-muted">
                                    <input type="radio" name="isMarried" value={true} onChange={this.handleOnchange} defaultChecked={this.state.dataPost.isMarried} />???? k???t h??n
                                </label>
                            </div>
                            <h4 className="title-with-line"><span style={{background: 'white'}}>H??? s?? thu nh???p</span></h4>
                            <div>
                                {documents}
                                <div className="form-group">
                                    <span className="text-muted">S??? ti???n tr??? ng??n h??ng th??ng g???n nh???t:</span>
                                    <NumberFormat suffix="??" thousandSeparator={true} type="text" name="latestAmount" value={this.state.dataPost.latestAmount} onChange={this.handleOnchange} className="form-control" />
                                    {/* <input type="text" name="latestAmount" value={this.state.dataPost.latestAmount} onChange={this.handleOnchange} className="form-control" /> */}
                                </div>
                            </div>
                            <div className={this.state.dataValid.flag ? "visible" : "hide"}>
                                <p className="text-danger">{this.state.dataValid.message}</p>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.loan.bind(this,false)} className="btn btn-default">Kh??ng c?? nhu c???u vay</button>
                            <button type="button" onClick={this.loan.bind(this,true)} className="btn btn-default">L??u v?? ti???p t???c</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
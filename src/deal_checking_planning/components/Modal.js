import React, { Component } from 'react';
import Dropdown from './Dropdown';
import uniqueid from 'uniqid';
import NumberFormat from 'react-number-format';
export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPost : {
                loan: 0,
                latestAmount: 0,
                leadId: lead.leadId,
                isMarried: true,
                isLoan: true,
                documents: [
                    {
                        key: uniqueid(),
                        channelTypeId: 1119,
                        income: 0
                    }
                ]
            }
        }
        this.addDocument = this.addDocument.bind(this);
        this.rmDocument = this.rmDocument.bind(this);
        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleChangeDocument = this.handleChangeDocument.bind(this);
    }

    addDocument(){
        let documents = [...this.state.dataPost.documents];
        documents.push({
            key : uniqueid(),
            channelTypeId:1119,
            income:0
        })
        this.setState({
            dataPost : {
                documents : documents
            }
        })
    }

    rmDocument(index){
        console.log(index);
        let documents = [...this.state.dataPost.documents];
        documents.splice(index,1);
        console.log(documents);
        this.setState({
            dataPost : {
                documents : documents
            }
        })
    }

    handleOnchange(e){
        let {dataPost} = this.state;
        let name = e.target.name;
        let value = e.target.value;
        dataPost[name] = name == 'isMarried' ? (value == 'true') : value;
        this.setState({
            dataPost : dataPost
        })
    }

    handleChangeDocument(obj){
        let {dataPost} = this.state;
        dataPost.documents[obj.index][obj.name] = obj.value;
        console.log(obj)
        this.setState({
            dataPost : dataPost
        })
    }

    loan(boleans){
        let {dataPost} = this.state;
        dataPost.isLoan = boleans;
        console.log(dataPost);
        this.props.createMortgageRequest(dataPost);
    }

    render() {
        let that = this;
        let documents = [...this.state.dataPost.documents];
        let dropdownChannel = this.props.chanels.map(function(chanel,index){
            return <option key={index} value={chanel.id}>{chanel.name}</option>
        })
        documents = documents.map(function(doc,index){
            let action = <a onClick={(e) => { e.preventDefault();that.rmDocument(index) }} href="#" className="text-danger" style={{position:'absolute',right:'15px',zIndex:'1'}}><i className="fa fa-times"></i> Xóa</a> 
            if((index + 1) == that.state.dataPost.documents.length){
                action = <a onClick={(e)=>{ e.preventDefault();that.addDocument() }} href="#" style={{position:'absolute',right:'15px',zIndex:'1'}}><i className="fa fa-plus"></i> Thêm</a> 
            }
            return <div key={doc.key}>
                    <div className="row">
                        {action}
                        <div style={{width:'50%'}} className="form-group col-md-6">
                            <span className="text-muted">Thu nhập từ:</span>
                            <Dropdown index={index} handleChangeDocument={that.handleChangeDocument} doc={doc} chanels={dropdownChannel}/>
                        </div>
                        <div style={{width:'50%'}} className="form-group col-md-6">
                            <span className="text-muted">Số tiền thu nhập: <span className="text-danger">*</span></span>
                            <input type="text" name="income" onChange={(e) => {
                                let {name,value} = e.target;
                                that.handleChangeDocument({index,name,value})
                            }} className="form-control" value={doc.income} /> 
                        </div>
                    </div>
                    <hr style={{margin:'5px 0px 10px 0px'}}/>
                </div>
        })
        return (
            <div>
                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title">Yêu cầu vay ngân hàng</h4>
                        </div>
                        <div className="modal-body">
                            <form action="/action_page.php">
                            <div className="form-group">
                                <span className="text-muted">Số tiền khách hàng muốn vay: <span className="text-danger">*</span></span>
                                <input type="text" name="loan" value={this.state.dataPost.loan} onChange={this.handleOnchange} className="form-control" />
                            </div>
                            <h4 className="title-with-line"><span style={{background: 'white'}}>Hồ sơ pháp lý</span></h4>
                            <div>
                                <label style={{fontWeight: 'none'}} className="radio-inline text-muted">
                                    <input type="radio" name="isMarried" value={false} onChange={this.handleOnchange} />Độc thân
                                </label>
                                <label style={{fontWeight: 'none'}} className="radio-inline text-muted">
                                    <input type="radio" name="isMarried" value={true} onChange={this.handleOnchange} defaultChecked={this.state.dataPost.isMarried} />Đã kết hôn
                                </label>
                            </div>
                            <h4 className="title-with-line"><span style={{background: 'white'}}>Hồ sơ thu nhập</span></h4>
                            <div>
                                {documents}
                                <div className="form-group">
                                    <span className="text-muted">Số tiền trả ngân hàng tháng gần nhất:</span>
                                    <input type="text" name="latestAmount" value={this.state.dataPost.latestAmount} onChange={this.handleOnchange} className="form-control" />
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.loan.bind(this,false)} className="btn btn-default">Không có nhu cầu vay</button>
                            <button type="button" onClick={this.loan.bind(this,true)} className="btn btn-default">Lưu và tiếp tục</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
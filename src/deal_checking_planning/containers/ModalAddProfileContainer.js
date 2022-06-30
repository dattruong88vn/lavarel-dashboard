import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from './../components/Dropdown';
import uniqueid from 'uniqid';
import {actAddListingInfo} from '../actions/index';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPost : {
                loan: 0,
                latestAmount: 0,
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
        if(boleans) {
            let doc = dataPost.documents[0];
            doc.key = uniqueid();
            this.props.onAddListingInfo(doc);
        }
        $("#modalAddProfile").modal('hide');
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
                            <div className="form-group col-md-6">
                                <span className="text-muted">Thu nhập từ:</span>
                                <Dropdown index={index} handleChangeDocument={that.handleChangeDocument} doc={doc} chanels={dropdownChannel}/>
                            </div>
                            {/* <div style={{width:'50%'}} className="form-group col-md-6">
                                <span className="text-muted">Số tiền thu nhập:</span>
                                <input type="text" name="income" onChange={(e) => {
                                    let {name,value} = e.target;
                                    that.handleChangeDocument({index,name,value})
                                }} className="form-control" value={doc.income} />
                            </div> */}
                        </div>
                    </div>
        })
        return (
            <div>
                <div id="modalAddProfile" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">×</button>
                                <h4 className="modal-title">Thêm hồ sơ</h4>
                            </div>
                            <div className="modal-body">
                                <form action="/action_page.php">
                                    <div>
                                        {documents}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={this.loan.bind(this,false)} className="btn btn-default">Thoát</button>
                                <button type="button" onClick={this.loan.bind(this,true)} className="btn btn-default">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddListingInfo: (dataPost) => {
            dispatch(actAddListingInfo(dataPost));
        },
        dispatch:dispatch
    }
};

const ModalAddProfileContainer = connect(null, mapDispatchToProps)(Section);
export default ModalAddProfileContainer;
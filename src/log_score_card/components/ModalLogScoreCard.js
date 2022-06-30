import React, { Component, Fragment } from 'react';

class ModalLogScoreCard extends Component {
    constructor(props){
        super(props);
        this.state = {data:"...đang tải"};
    }

    loopData = (data,sesg,description) => {
        let that = this;
        if(data.length > 0){
            let arrName = data.map((child)=> {
                if(sesg == "li"){
                    let name = `<span style="${typeof child.type.score === 'undefined' ? "color:red" : ""}">${child.type.name} ${typeof child.type.score === 'undefined' ? "(chưa có điểm)" : `(Điểm: ${child.type.score})`}</span>`;  
                    let resp = `<ul><li>${name}`;
                    if(child.child && child.child.length > 0){
                        resp = that.loopData(child.child,"li",resp);
                    }
                    return `${resp}</li></ul>`;   
                }
            })
            description += arrName.join("");
            return description;
        }else{
            return null;
        }
    }

    getMapData = (data) => {
        var description = "<h4>Chưa có dữ liệu</h4>";
        if(data.dataHistory != "reset"){
            if(data.dataHistory != null && data.dataHistory.relatedListingClassifyModel != null) {
                if(data.dataHistory.relatedListingClassifyModel.child.length > 0){
                    let arrChild = data.dataHistory.relatedListingClassifyModel.child[0].child;
                    let _loopData = this.loopData(arrChild,"li","");
                    if(_loopData != null){
                        description = _loopData;
                    }
                }
            }
            return description;
        }else{
            return "...đang tải";
        }
    }
    componentWillReceiveProps = (newProps) => {
        const data = this.getMapData(newProps.log);
        this.setState({data});
    }
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <p className="content-log-score-card" dangerouslySetInnerHTML={{__html: this.state.data}}></p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ModalLogScoreCard;
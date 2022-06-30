import React from "react";
import {connect} from "react-redux";
class TableDocuments extends React.Component{
    
    constructor(){
        super();
        this.tableDocumentsId = "tableDocuments";
        this.showModalDocumentDetail = this.showModalDocumentDetail.bind(this);
    }
    
    componentDidMount(){
        const that = this;
        this.tableDocuments = $("#"+this.tableDocumentsId).DataTable({
            ajax: "/documents/get-list",
            ordering: false,
            searching: false,
            lengthChange: false,
            columns: [
                {data: "name"},
                {data: "files", render: function(data, type, object){
                    console.log(data);
                    var html = "";
                    for(var i=0; i<data.length; i++){
                        let item = data[i];
                        html += `
                            <div>
                                <a href='${item.link}' target='_blank' >${i+1}. ${item.fileName}</a>
                                <a class='btnShowDocumentDetail hidden' style='margin-left: 15px' data-document-id='${object.id}' ><i class='fa fa-eye'></i></a>
                            </div>
                        `;
                    }
                    return html;
                }},
                {data: "description"},
                {data: "id", width: '100px',visible:isAdmin, className:"text-right", render: function(data, type, object){
                    let html = "";
                    html += `<a href='#' class='btn btnUpdateDocument' data-document-id='${object.id}' ><i class='fa fa-edit' ></i></a>`;
                    html += `<a href='#' class='btn btnDeleteDocument text-red' data-document-id='${object.id}' ><i class='fa fa-remove' ></i></a>`;
                    return html;
                }}
            ]
        }).on('xhr.dt', function ( e, settings, json, xhr ) {
            that.props.dispatch({
                "type": "SET_DOCUMENTS",
                "data": json.data
            });
        }).on("draw.dt", this.initTableButtons.bind(this));
        this.props.dispatch({
            "type": "SET_TABLE_INSTANCE",
            data:{
                tableDocuments: this.tableDocuments
            }
        });
    }

    initTableButtons(){
        const that = this;
        $(".btnShowDocumentDetail").unbind("click");
        $(".btnShowDocumentDetail").on("click", function(event){
            event.preventDefault();
            let id = $(this).data('documentId');
            that.showModalDocumentDetail(id);
        });

        $(".btnDeleteDocument").unbind("click");
        $(".btnDeleteDocument").on("click", function(event){
            event.preventDefault();
            let id = $(this).data('documentId');
            that.deleteDocument(id);
        });

        $(".btnUpdateDocument").unbind("click");
        $(".btnUpdateDocument").on("click", function(event){
            event.preventDefault();
            let id = $(this).data("documentId");
            let item = that.props.documents.filter(x=>x.id==id);
            that.props.dispatch({
                "type": "SELECT_DOCUMENT",
                "data": item?item[0]:null
            });
        });

    }

    

    showModalDocumentDetail(id){
        console.log(`show detail! ${id}`);
    }

    deleteDocument(id){
        const that = this;
        showPropzyLoading();
        $.ajax({
            "url": `/documents/delete/${id}`
        }).done(function(response){
            if(response.result){
                that.props.dispatch({
                    "type": "FETCH_DOCUMENTS",
                    "data": null
                })
            }
        }).always(function(){
            hidePropzyLoading();
        });
    }

    render(){
        return (
            <table id={this.tableDocumentsId} className="table table-bordered" >
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>File</th>
                        <th>Mô tả</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default connect(function(state){
    return {
        tableDocuments: state.Documents.tableDocuments,
        documents: state.Documents.documents
    }
})(TableDocuments);
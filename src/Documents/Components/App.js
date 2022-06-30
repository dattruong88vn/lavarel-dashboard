import React from "react";
import FormUpload from "./FormUpload";
import TableDocuments from "./TableDocuments";

export default class App extends React.Component{
    render(){
        return (
            <div>
                <h2>Quản lý tài liệu</h2>
                {isAdmin ? <FormUpload /> : ''}
                <div className="box box-primary">
                    <div className="box-body">
                        <TableDocuments />
                    </div>
                </div>
            </div>
        );
    }
}
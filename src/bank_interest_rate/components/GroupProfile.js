import React, { Component } from 'react';
import ItemProfile from './ItemProfile';

class GroupProfile extends Component {
    renderChild(childs) {
        var render = childs.map((item, index) => {
            return <div key={index} className="col-md-12">
                        <div className="row">
                            <div className="col-md-12"><label>{item.name}</label></div>
                            <div className="col-md-12">
                                <ItemProfile 
                                setDataPostProfile={this.props.setDataPostProfile.bind(this)} 
                                inputChange={this.props.inputChange.bind(this)}
                                profileInfos={item.profileInfos} docId={item.docId}/>
                            </div>
                        </div>
                    </div>
        });
        return render;
    }
    
    render() {
        return (
            <div className="col-md-12">
                {
                    this.props.listProfile.map((item, index) => {
                        return <div key={index} className="form-group">
                                    <h3 className="title-profile">{item.name}</h3>
                                    {this.renderChild(item.childs)}
                                </div>
                    })
                }
            </div>
        );
    }
}

export default GroupProfile;
import React, { Component } from 'react';
import Checkbox from './../../commonComponents/input/checkboxLabel';

class ItemProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Set(),
        }
    }

    componentWillMount() {
        this.checkedCheckbox = new Set();
    }

    checkedInfo(item, docId) {
        if (this.checkedCheckbox.has(item)) {
            this.checkedCheckbox.delete(item);
        } else {
            this.checkedCheckbox.add(item);
        }

        this.setState({
            checkedItems : this.checkedCheckbox
        });
        this.props.setDataPostProfile(item, docId);
    }
    
    renderInfo(listInfo, docId) {
        let that = this;
        var render = listInfo.map((item, index) => {
            return <div key={index} className="column col-md-4">
                        <div className="checkbox">
                            <label className="checkbox-inline">
                                <Checkbox name={item.name} value={item.typeId} disabled={!item.isFixed} onChange={() => that.checkedInfo(item, docId)} checked={that.state.checkedItems.has(item) || !item.isFixed} />
                                {item.name}
                            </label>
                        </div>
                        <div className={that.state.checkedItems.has(item) && item.isFixed == true ? "visible" : "invisible"}>
                            <input className={!that.state.checkedItems.has(item) && item.isFixed == false ? "hide" : "form-control"} type="text" name={item.typeId} onChange={this.props.inputChange.bind(this)} placeholder="Ghi chú"/>
                        </div>
                        <div className={!that.state.checkedItems.has(item) && item.isFixed == false ? "visible" : "invisible"}>
                            <input className={that.state.checkedItems.has(item) || item.isFixed == true ? "hide" : "form-control"} type="text" value={item.note ? item.note : ''} disabled={true} />
                        </div>
                    </div>
        });
        return render;
    }

    render() {
        return (
            <div className="wrap-container row">
                {this.renderInfo(this.props.profileInfos, this.props.docId)}
            </div>
        );
    }

    componentDidMount() {
        this.fixHeight();
    }

    fixHeight() {
        $('.wrap-container').each(function(){  
            let highestBox = 0;
            $('.column', this).each(function(){
                if($(this).height() > highestBox) {
                    highestBox = $(this).height(); 
                }
            });  
            $('.column',this).height(highestBox);         
          }); 
    }

    equalHeight() {
        var max_height = 0;
        $(this).each(function(){
            max_height = Math.max($(this).height(), max_height);
        });
        $(this).each(function(){
            $(this).height(max_height);
        });
    }
}

export default ItemProfile;
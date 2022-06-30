import React, { Component } from 'react';
import httpServices from '../utils/http';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const tabs = ['Trùng SĐT', 'Trùng email', 'Trùng địa chỉ'].map((tab, index) => (
    <Tab key={index}>{tab}</Tab>
));

const columns = ['Địa chỉ', 'Giá', 'Loại', 'Trạng thái'].map((col, index) => (
    <th key={index}>{col}</th>
));

const style = {
    backgroundColor: '#dcf8ff',
    borderRadius: '3px',
    padding: '5px',
    border: '1px solid #62b2c5',
    fontSize: '13px'
};

class ModalDuplicate extends Component {
    state = {
        data: {
            phones: {
                listings: []
            },
            emails: {
                listings: []
            },
            address: {
                listings: []
            }
        }
    }

    componentDidMount() {
        const {itemSelected} = this.props;
        
        if(itemSelected.duplicatePhone) {
            const dataPostPhone = {
                email: itemSelected.email,
                phones: itemSelected.phones ? itemSelected.phones.join() : null,
                ownerId: null,
                type: 1
            };
            httpServices.getDuplicatePhones(dataPostPhone).then(res => {
                if(res.data.result) {
                    this.setState({data: {...this.state.data, phones: res.data.data}});
                }
            });
        }
        
        if(itemSelected.duplicateEmail) {
            const dataPostEmail = {
                email: itemSelected.email,
                phones: itemSelected.phones ? itemSelected.phones.join() : null,
                ownerId: null,
                type: 2
            };
            httpServices.getDuplicateEmails(dataPostEmail).then(res => {
                if(res.data.result) {
                    this.setState({data: {...this.state.data, emails: res.data.data}});
                }
            });
        }

        if(itemSelected.duplicateAddress) {
            const dataPostAddress = {
                lsoId: null,
                cityId: itemSelected.cityId,
                districtId: itemSelected.districtId,
                wardId: itemSelected.wardId,
                streetId: itemSelected.streetId,
                houseNumber: null,
                address: itemSelected.address
            };
            httpServices.getDuplicateAddress(dataPostAddress).then(res => {
                if(res.data.result) {
                    this.setState({data: {...this.state.data, address: res.data.data}});
                }
            });
        }
    }

    render() {
        const {tabFocus, services} = this.props;
        const {data} = this.state;
    
        const panel = {
            phones: {},
            emails: {},
            address: {}
        };

        for(const key in panel) {
            panel[key].data = data[key];
            panel[key].rows = data[key].listings ? data[key].listings.map((item, index) => (
                <tr key={index}>
                    <td>{item.address}</td>
                    <td>{item.formatPrice}</td>
                    <td>{item.type}</td>
                    <td><a href={item.link} target="_blank">{item.type === 'PRE' ? item.preStatus : item.saStatus}</a></td>
                </tr>
            )) : null;
        }

        const tabPanels = Object.keys(panel).map(key => {
            return (
                <TabPanel key={key}>
                    <div className="tab-pane">
                    {key !== 'address' &&
                        <div className="list-profile">
                            <div className="row" style={{paddingTop: '3px', paddingBottom: '3px'}}>
                                <div className="col-md-3" style={{paddingRight: '0'}}>
                                    <div className="item-info" style={style}>
                                        <b>Tên: </b>
                                        <span className="name">{panel[key].data.name}</span>
                                    </div>
                                </div>
                                <div className="col-md-3" style={{paddingRight: '0'}}>
                                    <div className="item-info" style={style}>
                                        <b>SĐT: </b>
                                        <span className="phone">{panel[key].data.phone}</span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="item-info" style={style}>
                                        <b>Email: </b>
                                        <span className="email">{panel[key].data.email}</span>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="item-info" style={style}>
                                        <b>Loại: </b>
                                        <span className="type">{panel[key].data.userTypeName}</span>
                                    </div>
                                </div>              
                            </div>
                        </div>}
                    <div className="list-dupicate">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>{columns}</tr>
                            </thead>
                            <tbody style={{backgroundColor: '#ef8081b3'}}>{panel[key].rows}</tbody>
                        </table>
                    </div>
                </div>
                </TabPanel>
            )
        });
        
        return (
            <Tabs defaultIndex={tabFocus}>
                <div className="modal fade in" style={{display: 'block', zIndex: '1051' }}>
                    <div className="modal-dialog modal-lg" style={{minWidth: '900px'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button 
                                    type="button" 
                                    className="close" 
                                    onClick={() => services.onShowModal('modalDuplicate', false)}>×</button>
                                    <TabList className="nav nav-pills">
                                        {tabs}
                                    </TabList>
                            </div>
                            <div className="modal-body">
                                <h4>Danh sách tin đăng</h4>
                                <div className="tab-content">
                                    {tabPanels}
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        onClick={() => services.onShowModal('modalDuplicate', false)} >Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tabs>
        );
    }
}

export default ModalDuplicate;
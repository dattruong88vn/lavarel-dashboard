import React from 'react';
import { Modal } from 'react-bootstrap';
import HttpService from './http';
import Timeline from './../commonComponents/timeline/Timeline';
import Spinner from '../commonComponents/spinner/Spinner';

export default class MoneyCollectedHistoryModal extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            historyList: [],
            loading: false
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const {
            dealFinId
        } = this.props;

        // Turn on loading spinner
        this.setState({
            loading: true
        });

        /**
         * Get list of money collected history
         */
        HttpService.getMoneyCollectedHistoryList({
            dealFinId,
            sort: {
                columnName: 'createdDate',
                value: 1
            },
            filter: []
        }).then(res => {

            // Turn off loading spinner
            if(this._isMounted) {
                this.setState({
                    loading: false
                })
            }

            const {
                list: historyList
            } = res.data.data;

            if(this._isMounted && res.data.result) {
                this.setState({
                    historyList
                })
            }
        }).catch(_ => {
            this.setState({
                loading: false
            })
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const {
            show,
            handleClose
        } = this.props;

        const {
            historyList,
            loading
        } = this.state;

        return (
            <>
                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title className="commission-deal-modal-header">
                            Lịch sử thu tiền
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Timeline timelines={historyList} />
                    </Modal.Body>
                </Modal>

                {loading && <Spinner/>}
            </>
        )
    }
}
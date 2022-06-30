import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Timeline from '../../commonComponents/timeline/Timeline';
import httpService from './../utils/http';
import Spinner from '../../commonComponents/spinner/Spinner';

export default class CommissionHistoryReviewModal extends Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            timelines: [],
            loading: false
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const { dealFinId } = this.props;

        // Turn on loading spinner
        this.setState({
            loading: true
        })

        // Get list of timeline
        httpService.getCommissionHistoryReview({
            dealFinId: dealFinId,
            sort: {
                columnName: 'createdDate',
                value: 1
            },
            filter: []
        }).then(res => {
            // Turn off loading spinner
            this.setState({
                loading: false
            });

            if(this._isMounted && res.data.result) {
                this.setState({
                    timelines: res.data.data.list
                })
            }
        }).then(_ => {
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

        const { timelines, loading } = this.state;

        return (
            <>
                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title className="commission-deal-modal-header">
                            Lịch sử thu tiền
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Timeline timelines={timelines} />
                    </Modal.Body>
                </Modal>

                {loading && <Spinner/>}
            </>

        )
    }
}
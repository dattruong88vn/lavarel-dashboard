import React, { Component } from "react"
import { connect } from "react-redux"

// This function takes a component...
function withChecking(WrappedComponent) {
    // ...and returns another component...
    return class extends Component {
        constructor(props) {
            super(props)
        }

        componentDidMount() {
            const { onGetListReason } = this.props

            // get list reason
            onGetListReason()
        }

        render() {
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent {...this.props} />
        }
    }
}

const mapStateToProps = (state) => {
    state.Checking.dataChecking.customers = Utils.sortListLeadDealByLoggedUser(
        Utils._DATA_CHECKING_CUSTOMERS
    )

    return {
        checking: state.Checking,
        header: state.HeaderStepReducer,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetListReason: (data) => {
            dispatch(actions.getListReason(data))
        },
        onUnlockDealLead: (data) => {
            dispatch(actions.unlockDealLead(data))
        },
        onGetDealGroup: (data) => {
            dispatch(actions.actGetDealGroup(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withChecking)

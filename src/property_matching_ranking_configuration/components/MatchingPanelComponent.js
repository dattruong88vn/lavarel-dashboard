import React, { Component, Fragment } from "react";
import MatchingListComponent from "./MatchingListComponent";
import MatchingItemComponent from "./MatchingItemComponent";
import MatchingTypeComponent from "./MatchingTypeComponent";
import { connect } from "react-redux";
import * as actions from "../actions";
import httpServices from '../util/http';

class MatchingPanelComponent extends Component {
	applyCriteria = () => {
		const {criteriaItemList, propId} = this.props;
		let totalWeight = 0;

		criteriaItemList.forEach(item => {
			if (Object.values(item)[0].weight == "") {
				Object.values(item)[0].weight = 0;
			}
			totalWeight += parseFloat(Object.values(item)[0].weight);
		});

		if (criteriaItemList.length > 0 && totalWeight.toFixed(2) != 1) {
            showPropzyAlert("Tổng trọng số phải bằng 1");
            return;
		}
		
        showPropzyConfirm({
            title: "Thông báo",
            message: "Bạn đang điều chỉnh tiêu chí Tìm kiếm và Tính điểm cho listing ở Danh sách Listing phù hợp. Bộ tiêu chí này sẽ ảnh hưởng tới toàn bộ Dashboard. Bạn có chắc với sự điều chỉnh này ?",
            btn: {
                yes: {text: "Xác nhận"},
                no: {text: "Hủy"}
            },
            okCallback: function okCallback() {
                showPropzyLoading();
				httpServices.applyCriteria(propId, criteriaItemList).then(response => {
					hidePropzyLoading();
					if (response[0].data.result && response[1].data.result) {
						showPropzyAlert("Lưu thành công");
						return;
					} 
					showPropzyAlert("Lưu thất bại");
				})
				.catch(error => {
					showPropzyAlert("Lưu thất bại");
					if (error.response && error.response.status === 404) {
						console.log(error);
					}
				});
            },
            cancelCallback: function cancelCallback() {}
        });
	}

	render() {
		return (
			<Fragment>	
				<div className="row">
					<div className="col-xs-12">
						<h3>Màn hình cấu hình Matching score</h3>
					</div>
				</div>

				<MatchingTypeComponent />

				<div className="row">
					<div className="col-xs-6">Tiêu chí</div>
					<div className="col-xs-3">Điểm đánh giá</div>
					<div className="col-xs-3">
						Trọng số tìm kiếm (
						<span style={{ color: "red" }}>Tổng:</span>{" "}
						<b>{this.props.totalWeight.toFixed(2)}</b>)
					</div>
				</div>

				<MatchingItemComponent />

				<div
					className="row"
					style={{
						paddingTop: "10px",
						paddingBottom: "100px",
					}}
				>
					<div className="col-xs-4">
						<MatchingListComponent />
					</div>
				</div>

				<div className="row" style={{ paddingTop: "40px" }}>
					<div className="col-xs-4">
						<button
							type="button"
							className="btn btn-primary"
							onClick={this.applyCriteria}
						>
							Apply
						</button>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		criteriaItemList: state.reducer.criteriaItemList,
		propId: state.reducer.propId,
		tabId: state.reducer.tabId,
		totalWeight: state.reducer.totalWeight,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getCriteriaItems: (data) => {
			dispatch(actions.actGetCriteriaItems(data));
		},
		getCriteriaOption: (data) => {
			dispatch(actions.actGetCriteriaOption(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchingPanelComponent);

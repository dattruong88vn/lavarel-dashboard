import React from "react";
import {connect} from "react-redux";
class StudentSurvey extends React.Component {
  render() {
    return (
      <div className="student-survey">{this.props.test}</div>
    );
  }
}
export default connect(function (state) {
  return {test:state}
})(StudentSurvey);
$(document).ready(function() {
	$("#meeting-popup").click(function(e){
		e.preventDefault();
		meeting.init();
	});

	$("#create-meeting-listing-btn").click(function(e) {
		e.preventDefault();
		meeting.createMeeting();
	});
});
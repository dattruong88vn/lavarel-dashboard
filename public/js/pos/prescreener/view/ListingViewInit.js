function ListingCreateInit() {
	var _this = this;

	_this.init = function () {
		$(document).ready(function () {
			initVAR();
			initGLOBALVAR();
			initDOM();
			event();
		})
	};

	function initVAR() {
		_this.listingView = new ListingView();
		_this.phoneListModalId = '#phone-list-modal';
	}

	function initGLOBALVAR() {
		Window.globalVar = {};
		Window.globalVar.photo = new PSPhoto();
		Window.globalVar.listingDetail = _this.listingView;
		// Window.globalVar.reminder = Window.pre.reminder;
	}

	function initDOM() {
		Window.globalVar.photo.init();
		_this.listingView.init();
	}

	function event() {
		$('#photos-wrapper').find('.file-preview-del').remove();
		$('#photos-wrapper').find('.images-file-actions').remove();
		$('#photoGcns-wrapper').find('.file-preview-del').remove();
		$('#photoGcns-wrapper').find('.images-file-actions').remove();
		if (currentUser.userId == Window.jsDetailData.assignedTo) {
			$('#display-switch-detail').html('<a href="/pos/prescreener/detail/' + Window.jsDetailData.id + '" class="btn btn-warning">Chỉnh sửa tin đăng</a>')
		}
	}
}

$(document).ready(function () {
	(new ListingCreateInit()).init();
});
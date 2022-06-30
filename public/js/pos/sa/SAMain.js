function SAMain() {
	var _this = this;

	_this.init = function () {
		$(document).ready(function () {
            
			initVAR();
			initGLOBALVAR();
			initGLOBALOBJECT();
		})
	};

	function initVAR() {
        
	}

	function initGLOBALVAR() {
		// Window.sa = {};
		// Window.sa.api = new SAApi();
		Window.sa.formFields = new SAFormFields();
		Window.sa.data = new SAData();
		Window.validatorForSa = new  ValidatorForSa();
        
		Window.sa.field = new SAField();
		// Window.sa.reminder = new SAReminder();
		if (Window.jsRole == 'edit') {
			Window.sa.cancel = new SACancel();
		}
        Window.sa.photo = new SAPhoto();
		Window.sa.detail = new SADetail();
		//Window.sa.validation = new SAValidation();
		if (Window.jsRole == 'edit') {
			Window.sa.listingFeedback = new SAListingFeedback();
			Window.sa.noteCRM = new SADetailNoteForCRMManager();
		}
		Window.agentCreate = new AgentCreate({btnShowModal : '#btn-agent-create' , sourceId : 1103});

	}

	function initGLOBALOBJECT() {
		Window.sa.data.init();
		//Window.sa.validation.init();
		Window.sa.field.init();
		// Window.sa.reminder.init();
		if (Window.jsRole == 'edit') {
			Window.sa.cancel.init();
		}
		Window.sa.photo.init();
		Window.sa.detail.init();

		// Window.sa.validation.init();
		if (Window.jsRole == 'edit') {
			Window.sa.listingFeedback.init();
			Window.sa.noteCRM.init();
		}

		if([14, 15, 16, 17].indexOf(currentUser.departments[0].departmentId) > -1) {
			Window.sa.data.autoAssign(false);
		} else {
			Window.sa.data.autoAssign(true);
		}
	}
}


$(document).ready(function () {
	(new SAMain()).init();
});
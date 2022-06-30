Vue.http.headers.common['X-CSRF-TOKEN'] = $("#csrf-token").val();

Vue.use(VeeValidate);
Vue.component('v-select', VueSelect.VueSelect);

var profile = new Vue({
	el: "#profile-modal",
	data: {
		loading: false,
		// List
		currentIdSelect: "",
		toggleLabelSelect: "",
		currentIdChecklist: "",
		toggleLabelChecklist: "",
		currentIdText: "",		
		toggleLabelText: "",
		subSelectChilds: [],
		subChecklistChilds: [],		
		apiUrl: "",
		channels: [],
		channelIds: [],
		channelFull: [],
		channelTypeIds: [],
		// Update profile
		profileIds: []
	},
	mounted: function() {
		var self = this;		
		this.getChannelTypes(function(response) {						
			var channelTypes = [];
			if (response.body.result) {
				channelTypes = $.grep(response.body.data, function(item) { return item.type == 12 });
				self.channels = channelTypes[0].list;
			}

			self.getProfileDetail(function(response) {
				self.channelIds = [];
				if (response.body.result) {
					$.each(response.body.data, function(index,item) {
						self.channelIds.push(parseInt(item.channelTypeId));
						self.channelFull.push({
							id: item.channelTypeId,
							content: item.content
						})
					});
				}								
				$(".modalProfileId").each(function() {				
					if ($.inArray(parseInt($(this).val()), self.channelIds) != -1) {						
						var selfElement = $(this);						
						$(this).attr("checked", true);						
						var selectId = $(this).val();
						var selectChannel = [];						
						$.each(self.channels, function(index, item) {						
							$.each(item.childs, function(eachIndex, eachItem) {								
								if (eachItem.id == selectId) {
									if (eachItem.childs.length > 0 || eachItem.control == 'input_text_if_checked') {
										selectChannel = eachItem.childs;
										self.dynamicDOMElement(self.sanitizeTitle(item.name), selfElement, eachItem, selectChannel, self.channelIds);										
									}
								}
							})
						});									
					}
				});
			});
		});		
	},
	methods: {		
		getChannelTypes: function(callback) {
			this.loading = true;
			var self = this;
			this.$http.get('/lso/get-channel-types').then((response) => {
				self.loading = false;
				callback(response);
			});
		},
		dynamicDOMElement: function(elementName, elementId, element, selectChannel, channelIds) {
			var data = [];
			var selectedData = [];			
			
			var control = element.control;
			$.each(selectChannel, function(idx, item) {
				$.map(channelIds, function(eachChannel) {
					if (parseInt(item.id) == parseInt(eachChannel)) {
						selectedData.push(item.id);
					}
				});				
				data.push({id: item.id, text: item.name});
			});			
			if (control == "input_text_if_checked") {
				var profileContent = $.grep(this.channelFull, function(item) {
					return item.id == elementId.val();
				});
				elementId.parent('div').parent().append('<div class="col-sm-12"><textarea data-id="'+element.id+'" id="'+elementName+'" class="form-control" rows="5" cols="20">'+ profileContent[0].content +'</textarea></div>');
			} else if (control == "select_if_checked") {
				elementId.parent('div').parent().append("<div class='col-sm-12'><select  style='width: 100%' class='form-control' id='" + elementName + "'></select></div>");
			} else if (control == "checklist_if_checked") {
				elementId.parent('div').parent().append("<div class='col-sm-12'><select multiple style='width: 100%' class='form-control' id='" + elementName + "'></select></div>");				
			}

			console.log("data : " + JSON.stringify(data) + " selectedData: " + JSON.stringify(selectedData));	
			if (control == "select_if_checked" || control == "checklist_if_checked") {				
				$("#" + elementName).select2({data: data});
				if (control == "select_if_checked") {
					$("#" + elementName).select2("val", selectedData[0]);
				} else if (control == "checklist_if_checked") {
					$("#" + elementName).select2("val", selectedData);	
				}
			}
		},
		getProfileDetail: function(callback) {
			var data = {
				'ownerId': parseInt($("#hiddenOwnerId").val())
			}
			this.$http.get('/lso/get-profile-detail', {params: data}).then((response) => {
				callback(response);
			});
		},
		updateProfile: function(argument) {
			var isValid = this.validateForm();			
			if (isValid) {
				this.resetBeforeAdd();
				self.loading = true;
				this.$http.post('/lso/update-profile', JSON.stringify(this.profileIds)).then((response) => {
					self.loading = false;
					showPropzyAlert(response.body.message);
					if (response.body.result) {
						$("#profile-modal").modal('hide');
					}
				});
			}
		},
		validateForm: function() {
			$(".errorCode").remove();			
			var isValid = true;
			var self = this;
			$(this.channels).each(function(index, item) {
				isValid = false;
				$.each(item.childs, function(id, iter) {				
					if ($("input[value="+iter.id+"]").is(":checked")) {
						isValid = true;
					}
				});
				if (!isValid) {
					if (!$("#profile-modal").is(':visible')) {
						$("#profile-modal").modal('show');
					}
					showPropzyAlert("Xin vui lòng chọn ít nhất một thuộc tính cho <strong>" + item.name + "</strong>");
					return isValid;
				}
			});			
			return isValid;
		},
		toggleCheck: function(label, id, subChilds, selectParentName, channelChilds) {
			console.log(selectParentName);
			var self = this;

			if ($("#" + selectParentName).length > 0 && $.inArray(id, this.channelIds) != -1) {		
				if ($("#" + selectParentName).is("textarea")) {
					if ($("#" + selectParentName).is(":hidden") && $.inArray(id, this.channelIds) != -1) {
						$("#" + selectParentName).show();
					} else {
						$("#" + selectParentName).hide();
					}
				} else {
					if ($("#" + selectParentName).parent().is(":hidden") && $.inArray(id, this.channelIds) != -1) {
						$("#" + selectParentName).parent().show();
					} else {
						$("#" + selectParentName).parent().hide();
					}
				}
				return false;
			}
			// If no data already
			var subSelectChilds = [];			
			$.each(subChilds, function(idx, item) {
				subSelectChilds.push({
					id: item.id,
					text: item.name
				});
			});			
			if (selectParentName == "nhu-cau-sau-khi-ban") {				
				if (id == 135) {
					if ($("#" + selectParentName).length > 0) {
						$("#" + selectParentName).show();						
					} else {						
						$("input[name=nhu-cau-sau-khi-ban][value=135]").parent().parent().append('<div class="col-sm-12"><textarea data-id="'+id+'" id="'+selectParentName+'" class="form-control" rows="5" cols="20"></textarea></div>');
					}
				} else {
					$("#" + selectParentName).hide();
				}
			} else if (selectParentName == "da-tung-giao-dich-ban-nha") {
				if (id == 111) {
					if ($("#" + selectParentName).length > 0) {
						$("#" + selectParentName).parent().show();						
					} else {
						$("input[name=da-tung-giao-dich-ban-nha][value=111]").parent().parent().append("<div class='col-sm-12'><select  style='width: 100%' class='form-control' id='"+selectParentName+"'></select></div>");						
					}
				} else {
					$("#" + selectParentName).parent().hide();
				}
			} else if (selectParentName == "phap-ly") {
				if (id == 137) {
					if ($("#" + selectParentName).length > 0) {
						$("#" + selectParentName).parent().show();						
					} else {
						$("input[name=phap-ly][value=137]").parent().parent().append("<div class='col-sm-12'><select multiple style='width: 100%' class='form-control' id='"+selectParentName+"'></select></div>");				
					}
				} else {
					$("#" + selectParentName).parent().hide();
				}
			}

			if (selectParentName == "da-tung-giao-dich-ban-nha" || selectParentName == "phap-ly") {
				$("#" + selectParentName).select2({data: subSelectChilds});
			}			
		},
		addToProfileIds: function(id,content) {
			// Try to add propertyId to array 
			var isExisted = false;
			$.each(this.profileIds, function(index, item) {
				if (parseInt(item.id.channelTypeId) == id) {
					isExisted = true;
				}
			});

			if (!isExisted) {				
				this.profileIds.push({
					id: {
						ownerId: parseInt($("#hiddenOwnerId").val()),
						channelTypeId: id
					},
					content: content
				});
			}
		},
		resetBeforeAdd: function() {
			var self = this;
			this.profileIds = [];
			$(".modalProfileId").each(function() {		
				if ($(this).is(":checked")) {
					if (parseInt($(this).val()) == 111) {
						self.addToProfileIds($(this).val(),null);
						if ($("#da-tung-giao-dich-ban-nha").val()) {
							self.addToProfileIds($("#da-tung-giao-dich-ban-nha").val(), null);
						}
					} else if (parseInt($(this).val()) == 137) {
						self.addToProfileIds($(this).val(),null);
						if ($("#phap-ly").val()) {
							$.each($("#phap-ly").val(), function(idx, item) {					
								self.addToProfileIds(parseInt(item), null);
							});
						}
					} else if (parseInt($(this).val()) == 135) {						
						if ($("#nhu-cau-sau-khi-ban").val()) {
							self.addToProfileIds(parseInt($("#nhu-cau-sau-khi-ban").data('id')), $("#nhu-cau-sau-khi-ban").val());
						}
					}
					else {
						self.addToProfileIds($(this).val(), null);
					}
				}
			});									
			
			console.log(JSON.stringify(this.profileIds));
		}
	}
});

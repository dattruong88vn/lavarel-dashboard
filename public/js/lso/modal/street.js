Vue.http.headers.common['X-CSRF-TOKEN'] = $("#csrf-token").val();

Vue.use(VeeValidate);

var createStreet = new Vue({
	el: "#create-street-modal",
	data: {
		streetName: null,
		price: null,
		widthValue: null,		
		streetApi: "/lso/create-street"
	},
	mounted: function() {		
		this.$validator.setLocale('vi');	
		$("#priceStreetModal").autoNumeric("init", {"mDec":0});
	},
	filters: {
		formatPrice: function(value) {
			return parseInt(value).toLocaleString();
		}
	},
	methods: {
		submitStreet: function() {
			this.$validator.validateAll();
			if (typeof this.errors[0] == "undefined") {
				this.postStreet();
			} else {
				showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
			}
		},
		postStreet: function() {
			showPropzyLoading();
			var postData = {
				wardId: parseInt($("#wardIdField").val()),
				streetName: this.streetName,
				price: $("#priceStreetModal").autoNumeric('get'),
				widthValue: this.widthValue,
			};
			this.$http.post(this.$data.streetApi, JSON.stringify(postData)).then((response) => {				
				hidePropzyLoading();
				if (response.body.result) {
					$("#create-street-modal").modal('hide');
					//reload streets
					detail.loadStreetWithWard();
				} else {
					showPropzyAlert(response.body.message);
				}
			})
		}
	}
})

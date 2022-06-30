Vue.use(Vuetable);
Vue.http.headers.common['X-CSRF-TOKEN'] = $("#csrf-token").val();

var reportCombined = new Vue({
    el: '#reportCombined',
    components: {
        'vuetable-pagination': Vuetable.VuetablePagination
    },
    data: {
        loading: true,
        apiUrl: "/lso/get-report-combined?",
        // Total
        total1: null,
        total2: null,
        total3: null,
        total4: null,
        userId: null,
        members: [],
        fromDate: null,
        toDate: null,
        districtId: null,
        districts: [],
        priceFrom: null,
        priceTo: null,
        priceId: null,
        prices: [
            {id: "0-1800000000", text: "< 1.8 tỷ"},
            {id: "1800000000-2400000000", text: "1.8-2.4 tỷ"},
            {id: "2410000000-3000000000", text: "2.41-3 tỷ"},
            {id: "3010000000-4000000000", text: "3.01-4 tỷ"},
            {id: "4010000000-5000000000", text: "4.01-5 tỷ"},
            {id: "5010000000-6500000000", text: "5.01-6.5 tỷ"},
            {id: "6500000000-999999999999999999", text: "> 6.5 tỷ"}
        ],
        fields: [
            {
                name: 'districtName',
                title: 'Quận'     
            },
            {
                name: 'totalCrawler',
                title: 'Số lượng cào'
            },
            {
                name: 'totalCall',
                title: 'Số lượng call'
            },
            {
                name: 'percentCall',
                title: '%'                
            },
            {
                name: 'totalLso',
                title: 'Số lượng listing lSO nhận được từ call 1',
            },
            {
                name: 'percentLso',
                title: '%'
            },
            {
                name: 'totalLs',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> số lượng tin đăng LSO'
            },
            {
                name: 'percentLs',
                title: '%'
            }
        ],
        css: {
            table: {
                tableClass: 'table table-bordered',
                loadingClass: 'loading',
                ascendingIcon: 'glyphicon glyphicon-chevron-up',
                descendingIcon: 'glyphicon glyphicon-chevron-down',
                handleIcon: 'glyphicon glyphicon-menu-hamburger',
            },
            pagination: {
                infoClass: 'pull-left',
                wrapperClass: 'vuetable-pagination pull-right',
                activeClass: 'btn-primary',
                disabledClass: 'disabled',
                pageClass: 'btn btn-border',
                linkClass: 'btn btn-border',
                icons: {
                  first: '',
                  prev: '',
                  next: '',
                  last: '',
                },
            }
        }
    },
    watch: {
        fromDate: function() {
            this.onChange();
        },
        toDate: function() {
            this.onChange();
        },
        priceId: function(val) {
            if (val) {
                var tmpPrice = val.split('-');
                this.priceFrom = (typeof tmpPrice[0] != "undefined") ? tmpPrice[0] : 0;
                this.priceTo = (typeof tmpPrice[1] != "undefined") ? tmpPrice[1] : 0;
            } else {
                this.priceFrom = this.priceTo = null;
            }
            this.onChange();
        }
    },
    mounted: function() {
        var self = this;    

        $("#fromDate").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        }).on(
            'changeDate', () => {this.fromDate = moment($("#fromDate").val(), "DD-MM-YYYY").format("X") * 1000;}
        );

        $("#toDate").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        }).on(
            'changeDate', () => {this.toDate = moment($("#toDate").val(), "DD-MM-YYYY").format("X") * 1000}
        );

        this.getDistricts(function(response) {
            self.districts = response.body.data;
            console.log(response.body.data);
        });

        this.getLsMembers(function(response) {
            self.members = response.body.data;
        });
    },
    methods: {
        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData)
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page)
        },
        onLoaded: function() {
            this.loading = false; 
            $("#reportCombined .vuetable thead tr:last").remove();
            $(".reportCombinedHead").remove();
            if (!$("#reportCombined").find('.reportCombinedHead').length) {
                $("#reportCombined").find(".vuetable").find("thead").prepend('<tr class="reportCombinedHead" style="background:#3498db; color:white; text-align:center; font-weight: bold;"><td>Quận</td><td>Crawler</td><td colspan="2">Call</td><td colspan="2">LSO</td><td colspan="2">LS</td></tr><tr style="background:#3498db; color:white; text-align:center; font-weight: bold;"><td></td><td>Cào</td><td>Call 1</td><td>Tỉ lệ call 1/cào</td><td>Số lượng listing LSO</td><td>Tỉ lệ</td><td>Số lượng tin đăng chuyển LS</td><td>Tỉ lệ</td></tr>');
            }
            // $("#reportCombined .vuetable tbody tr:last").css("background", "aquamarine")
        },
        onLoading: function() {
            this.loading = true;
        },
        getValue(value) {
            return (value) ? value : "<code>N/A</code>";
        },
        // Vuetable
        getDate(value) {
            return (value) ? moment(value).format("DD/MM/YYYY") : "<code>N/A</code>";
        },
        onChange: function() {            
            var self = this;
            this.apiUrl = "/lso/get-report-combined?";  

            if (this.priceId) {
                if (this.priceId.indexOf('-') !== -1) {
                    var tmpPrice = this.priceId.split('-');
                    console.log("tmp price" + tmpPrice);
                    this.priceFrom = (typeof tmpPrice[0] != "undefined") ? tmpPrice[0] : 0;
                    this.priceTo = (typeof tmpPrice[1] != "undefined") ? tmpPrice[1] : 0;
                }
            } else {
                this.priceFrom = priceTo = null;
            }
            // Rebuild Url
            var buildParams = {
                userId: this.userId,
                fromDate: this.fromDate,
                toDate: this.toDate,
                districtId: this.districtId,
                priceFrom: this.priceFrom,
                priceTo: this.priceTo,
            };
            for(var param in buildParams) {
                self.apiUrl += param + "=" + buildParams[param] + "&";
            };
            this.apiUrl = this.apiUrl.slice(0, -1);
            // Debug
            console.log(this.apiUrl);
        },
        getTotalArrayMembers(callback) {
            this.$http.get(this.apiUrl).then((response) => {
                callback(response);
            });
        },
        getDistricts: function(callback) {
            this.$http.post("/zone/get-districts-by-cities", JSON.stringify({
                "regionIdsList": null,
                "cityIdsList": [1]  // Ho Chi Minh
            })).then((response) => {
                callback(response);
            });            
        },
        getLsMembers: function(callback) {
            this.$http.get("/lso/get-lso-members").then((response) => {
                callback(response);
            });
        },
    },
});

var reportResultWork = new Vue({
    el: '#reportResultWork',
    components: {
        'vuetable-pagination': Vuetable.VuetablePagination
    },
    data: {
        loading: true,
        apiUrl: "/lso/get-report-result-work?",
        userId: null,
        members: [],
        fromDate: null,
        toDate: null,
        districtId: null,
        districts: [],
        priceFrom: null,
        priceTo: null,
        priceId: null,
        prices: [
            {id: "0-1800000000", text: "< 1.8 tỷ"},
            {id: "1800000000-2400000000", text: "1.8-2.4 tỷ"},
            {id: "2410000000-3000000000", text: "2.41-3 tỷ"},
            {id: "3010000000-4000000000", text: "3.01-4 tỷ"},
            {id: "4010000000-5000000000", text: "4.01-5 tỷ"},
            {id: "5010000000-6500000000", text: "5.01-6.5 tỷ"},
            {id: "6500000000-999999999999999999", text: "> 6.5 tỷ"}
        ],
        fields: [
            {
                name: 'lsoName',
                title: 'lsoName'     
            },
            {
                name: 'totalNewLso',
                title: 'totalNewLso'
            },
            {
                name: 'totalInprocess',
                title: 'totalInprocess'
            },
            {
                name: 'inProcessSentDiy',
                title: 'inProcessSentDiy'                
            },
            {
                name: 'lsoLsNoDiy',
                title: 'lsoLsNoDiy',
            },
            {
                name: 'lsoLsDiy',
                title: 'lsoLsDiy',
            },
            {
                name: 'lsoLsDiyDQ',
                title: 'lsoLsDiyDQ'
            },
            {
                name: 'total',
                title: 'total'
            }
        ],
        css: {
            table: {
                tableClass: 'table table-striped table-bordered table-hovered',
                loadingClass: 'loading',
                ascendingIcon: 'glyphicon glyphicon-chevron-up',
                descendingIcon: 'glyphicon glyphicon-chevron-down',
                handleIcon: 'glyphicon glyphicon-menu-hamburger',
            },
            pagination: {
                infoClass: 'pull-left',
                wrapperClass: 'vuetable-pagination pull-right',
                activeClass: 'btn-primary',
                disabledClass: 'disabled',
                pageClass: 'btn btn-border',
                linkClass: 'btn btn-border',
                icons: {
                  first: '',
                  prev: '',
                  next: '',
                  last: '',
                },
            }
        }
    },
    computed: {
        
    },
    watch: {
        fromDate: function() {
            this.onChange();
        },
        toDate: function() {
            this.onChange();
        },
        priceId: function(val) {
            if (val) {
                var tmpPrice = val.split('-');
                this.priceFrom = (typeof tmpPrice[0] != "undefined") ? tmpPrice[0] : 0;
                this.priceTo = (typeof tmpPrice[1] != "undefined") ? tmpPrice[1] : 0;                
            } else {
                this.priceFrom = this.priceTo = null;
            }
            this.onChange();
        }
    },
    mounted: function() {
        var self = this;  

        $("#fromDateWork").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        }).on(
            'changeDate', () => {this.fromDate = moment($("#fromDateWork").val(), "DD-MM-YYYY").format("X") * 1000}
        );

        $("#toDateWork").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        }).on(
            'changeDate', () => {this.toDate = moment($("#toDateWork").val(), "DD-MM-YYYY").format("X") * 1000}
        );

        this.getDistricts(function(response) {
            self.districts = response.body.data;
            console.log(response.body.data);
        });

        this.getLsMembers(function(response) {
            self.members = response.body.data;
        });
    },
    methods: {
        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData)
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page)
        },
        onLoaded: function() {
            this.loading = false;            
            $("#reportResultWork .vuetable thead tr:last").remove();
            $(".reportResultWorkHead").remove();
            if (!$("#reportResultWork").find('.reportResultWorkHead').length) {
                $("#reportResultWork").find(".vuetable").find("thead").prepend('<tr class="reportResultWorkHead" style="background:#3498db; color:white; text-align:center; font-weight: bold;"><td>LSO</td><td>Tin đăng LSO mới</td><td colspan="2">In process</td><td colspan="3">Đã chuyển LS</td><td>Total</td></tr><tr class="reportResultWork" style="background:#3498db; color:white; text-align:center; font-weight: bold;"><td></td><td></td><td>Không DIY</td><td>DIY</td><td>Không DIY</td><td>DIY</td><td>DIY - DQ</td><td></td></tr>');
            }
        },
        onLoading: function() {
            this.loading = true;
        },
        getValue(value) {
            return (value) ? value : "<code>N/A</code>";
        },
        // Vuetable
        getDate(value) {
            return (value) ? moment(value).format("DD/MM/YYYY") : "<code>N/A</code>";
        }, 
        onChange: function() {            
            var self = this;
            this.apiUrl = "/lso/get-report-result-work?";

            if (this.priceId) {
                if (this.priceId.indexOf('-') !== -1) {
                    var tmpPrice = this.priceId.split('-');
                    this.priceFrom = (typeof tmpPrice[0] != "undefined") ? tmpPrice[0] : 0;
                    this.priceTo = (typeof tmpPrice[1] != "undefined") ? tmpPrice[1] : 0;
                }
            } else {
                this.priceFrom = this.priceTo = null;
            }
            // Rebuild Url
            var buildParams = {
                userId: this.userId,
                fromDate: this.fromDate,
                toDate: this.toDate,
                districtId: this.districtId,
                priceFrom: this.priceFrom,
                priceTo: this.priceTo,
            };
            for(var param in buildParams) {
                self.apiUrl += param + "=" + buildParams[param] + "&";
            };
            this.apiUrl = this.apiUrl.slice(0, -1);
            // Debug
            console.log(this.apiUrl);
        },
        getDistricts: function(callback) {
            this.$http.post("/zone/get-districts-by-cities", JSON.stringify({
                "regionIdsList": null,
                "cityIdsList": [1]  // Ho Chi Minh
            })).then((response) => {
                callback(response);
            });            
        },
        getLsMembers: function(callback) {
            this.$http.get("/lso/get-lso-members").then((response) => {
                callback(response);
            });
        },
        export: function(event) {
            var self = this;
            var postData = {
                "userId": this.userId,
                "fromDate": this.fromDate,
                "toDate": this.toDate,
                "districtId": this.districtId,
                "priceFrom": this.priceFrom,
                "priceTo": this.priceTo,
            };
            this.loading = true;
            this.$http.post("/lso/export-excel-result", JSON.stringify(postData)).then((response) => {
                self.loading = false;
                showPropzyAlert(response.body.message);
                if (response.body.result) {
                    window.location.replace(response.body.data.linkFile);
                }
            });
        }
    }
});

$("#export").click(function() {
    reportResultWork.export();
});

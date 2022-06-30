Vue.use(Vuetable);
Vue.http.headers.common['X-CSRF-TOKEN'] = $("#csrf-token").val();

var listings = new Vue({
    el: '#listings',
    components: {
        'vuetable-pagination': Vuetable.VuetablePagination,
        'vuetable-pagination-info': Vuetable.VuetablePaginationInfo
    },
    data: {
        loading: true,
        listingsApi: "",        
        apiUrl: "/lso/get-full-listings?",
        districtId: null,
        districts: [],
        statusId: null,
        statuses: [],
        classify: null,
        memberId: null,
        members: [],
        fromDate: null,
        toDate: null,        
        // Filter theo Loại đăng tin
        sourceId: null,        
        sources: [
            {id: 0, text: "Trống"},
            {id: 1, text: "DIY"},
            {id: 2, text: "DIY - DQ"}
        ],
        type: null,        
        //  Filter theo Loại tin đăng hệ thống
        types: [
            {id: 0, text: "Thường"},
            {id: 1, text: "Riêng"},
        ],
        userId: null,
        classifies: [
            {id: "A",text: "Loại A"},
            {id: "B",text: "Loại B"},
            {id: "C", text: "Loại C"}
        ],
        fields: [
            {
                name: '__sequence',
                title: '<i class="fa fa-hashtag" aria-hidden="true"></i> STT',
                titleClass: 'center aligned',
                dataClass: 'right aligned'
            },
            {
                name: 'lsoName',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> NV LSO',            
            },
            {
                name: 'lsoId',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> LSO ID',            
            },
            {
                name: 'listingId',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> LID',
            },
            {
                name: 'classify',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> Phân Loại',
                // callback: 'getValue'
            },
            {
                name: 'statusName',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> Trạng thái LSO',
            },
            {
                name: 'sourceName',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> Loại đăng tin',
                // callback: 'getValue'
            },
            {
                name: 'typeName',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> Loại tin đăng hệ thống'
            },
            {
                name: 'districtName',
                title: '<i class="fa fa-map-marker" aria-hidden="true"></i> Quận'
            },
            {
                name: 'dateLive',
                title: '<i class="fa fa-calendar" aria-hidden="true"></i> Ngày live',
                callback: "getDate"
            },
            {
                name: 'totalSchedule',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> KH đặt lịch xem'
            },
            {
                name: 'totalListingMail',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> KH đặt giới thiệu'
            },
            {
                name: 'totalListingTour',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> Đã đi tour'
            },
            {
                name: 'listingDeal',
                title: '<i class="fa fa-info-circle" aria-hidden="true"></i> Đã thương lượng'
            },
            {
                name: 'lsoUpdatedDate',
                title: '<i class="fa fa-calendar" aria-hidden="true"></i> LSO - Cập nhật gần đây',
                callback: "getDate"
            },
            {
                name: 'crmUpdatedDate',
                title: '<i class="fa fa-calendar" aria-hidden="true"></i> TM/CRM - Cập nhật gần đây',
                callback: "getDate"
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
            console.log(response.body);
            self.districts = response.body.data;            
        });

        this.getStatuses(function(response) {
            var allStatuses = response.body.data;
            $.each(allStatuses, function(index, parentStatus) {
                if (parentStatus.type == 1) {
                    $.each(parentStatus.list, function(index, childStatus) {
                        self.statuses.push({
                            id: childStatus.id,
                            text: childStatus.name
                        });
                    });
                }
            });
        });

        this.getLsMembers(function(response) {
            self.members = response.body.data;
        });
    },
    methods: {        

        onPaginationData(paginationData) {
            this.$refs.paginationInfo.setPaginationData(paginationData)
            this.$refs.pagination.setPaginationData(paginationData)
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page)
        },
        onLoaded: function() {
            this.loading = false;
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
            this.apiUrl = "/lso/get-full-listings?";
            // Rebuild Url
            var buildParams = {"userId": this.memberId ? this.memberId : this.userId, "classify": this.classify, "fromDate": this.fromDate, "toDate": this.toDate, "districtId": this.districtId, "sourceId": this.sourceId, "type": this.type, "statusId": this.statusId};            
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
        getStatuses: function(callback) {
            this.$http.get("/lso/get-status-list").then((response) => {
                callback(response);
            });
        },
        getLsMembers: function(callback) {
            this.$http.get("/lso/get-lso-members").then((response) => {
                callback(response);
            });
        },
    }
});

listings.$watch('fromDate', function() {
    listings.onChange();
})

/**
 * Common call all pages apply only Pos
 * @author : Barry
 * @date : 11/07/2018
 * @version : v1.0.0
 */

const columsTablePopupForDepositSupport = function () {
    const columns = [
        {
            data: 'rListingId',
            render: function (data, type, object) {
                return "<a href='/pos/sa/detail/"+ object.rListingId + "' target='_blank'>"+ object.rListingId +"</a>";
            }
        },
        {
            data: 'ownerName',
            render: function (data, type, object) {
                let html = object.ownerName;
                if ([2, 3].indexOf(object.statusId) > -1) {
                    html += "<i class='fa fa-comments btn-fa-circle btn-fa-circle-pink btn-item-open-negotiation-popup' style='float: right' data-object='"+ JSON.stringify(object) +"'></i>";
                }
                return html;
            }
        },
        {
            data: 'currentPrice',
            render: function (data, type, object) {
                return object.formatedCurrentPrice;
            }
        },
        {
            data: 'negotiationPrice',
            render: function (data, type, object) {
                return object.formatedNegotiationPrice;
            }
        },
        {
            data: 'createdDate',
            render: function (data, type, object) {
                if (hasValue(object.createdDate)) {
                    return moment(object.createdDate).format(dateTimeFormat);
                }
                return '';

            }
        },
        {
            data: 'crmName',
            render: function (data, type, object) {
                return hasValue(object.crmName) ? object.crmName : 'N/A';
            }
        },
        {
            data: 'statusId',
            render: function (data, type, object) {
                return hasValue(object.statusName) ? object.statusName : 'N/A';
            }
        },
        {
            data: 'countHistory',
            render: function (data, type, object) {
                return hasValue(object.countHistory) ? object.statusId : 'N/A';

            }
        }
    ];
    return columns;
};
const idMenuLeft = {
    'checkEmpty' : '#left_menu_pos_consultant_home_listing_status',
    'negotiation' : '#left_menu_pos_consultant_home_negotiate',
    'deposit' : '#left_menu_pos_consultant_home_deposit',
    'depositSupport': '#left_menu_pos_consultant_home_support_deposit',
    'editOwner' : "#left_menu_pos_update_owner_info"
};
class CommonPosAllPage {

	constructor() {
		// define variable
	}

	static countryMap () {
	    return ['vn'];
    }
    static setGooglePlace (documentId) {
        let autocomplete = new google.maps.places.Autocomplete(documentId);
        autocomplete.setComponentRestrictions({'country': CommonPosAllPage.countryMap()});
        return autocomplete;
    }

    /*static notifyPopupDepositSupport(taskId) {

        // check at page deposit support then we can't open popup
        if(Window.depositSupport) {
            Window.depositSupport.loadTable();
            return false;
        }
        if(! taskId) {
            return false;
        }
        const dataPost = {
            taskId : taskId,
            scheduleTimeFrom : null,
            scheduleTimeTo : null

        };
        try {
            $('tb-deposit-support-popup').DataTable('destroy');
        } catch (e) {
            console.log("tb-deposit-support-popup cant destroy table");
        }

        $('tb-deposit-support-popup').on('preInit.dt', function ( e, settings) {
            //depositTable.clearFilter();
        })
            .DataTable({
                processing: false,
                serverSide: true,
                bSort: false,
                ajax: {
                    url: POS_APIS_SA.get('GET_DEPOSIT_TASK_SUPPORT'),
                    type: "POST",
                    data: function (d) {
                        Object.assign(d, dataPost);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                language: DatatableHelper.languages.vn,
                columns: columsTablePopupForDepositSupport()
            })
            .on("xhr.dt", function (e, settings, json, xhr) {
                console.info('Notify Deposit support popup is processing------->');
            })
            .on( 'error.dt', function ( e, settings, techNote, message ) {
                console.error('Notify Deposit support popup is error');
            });

        // show modal
        $('#deposit-support-modal').modal({
            backdrop: 'static',
            keyboard: false
        });

    }*/
    static reloadPagePopupDepositSupport() {
        // check at page deposit support then we can't open popup
        if(Window.depositSupport) {
            return false;
        }
        //
        const dataPost = {
            taskId : null,
            scheduleTimeFrom : moment().unix() * 1000,
            scheduleTimeTo : moment().add(1, 'hours').unix() * 1000

        };
        axios.post(POS_APIS_SA.get('GET_DEPOSIT_TASK_SUPPORT'), dataPost)
            .then(response => {
                const dataBody = response.data;
                if(dataBody.result && dataBody.data.length > 0) {
                    const total = dataBody.data.length;
                    createBootstrapNotification({
                        message: 'Bạn có ' + total + ' đặt cọc cần được hỗ trợ khách hàng trong 1 giờ. ' +  ' <a href="/pos/sa/deposit-support-manager" target="_blank">Xem chi tiết </a>'
                    });
                }
            })
            .catch(err=> {
                console.error('Reload Page get deposit support : ' + err);
            });
    }
    static saMenuLeft() {
        axios.get(POS_APIS_SA.get('GET_COUNT_TASKS'), {
            params: {}
        }).then(response => {
            const responseBody = response.data;
            if (responseBody.result) {
                const data = responseBody.data;
                addCount(idMenuLeft.checkEmpty, data.checkEmpty);
                addCount(idMenuLeft.negotiation, data.negotiationTask);
                addCount(idMenuLeft.deposit, data.depositTask);
                addCount(idMenuLeft.depositSupport, data.contactDepositTask + data.cancelDepositTask);
                addCount(idMenuLeft.editOwner, data.editOwner);

                if(document.getElementById("deposit-support-count-task-overview")) {
                    $("#deposit-support-count-task-overview").html('<span><label class="control-label">Hỗ trợ đặc cọc :</label> ' + data.contactDepositTask + ' <label class="control-label">Hủy đặc cọc :</label> ' + data.cancelDepositTask + '</span>');
                }
            } else {
                addCount(idMenuLeft.checkEmpty, 0);
                addCount(idMenuLeft.negotiation, 0);
                addCount(idMenuLeft.deposit, 0);
                addCount(idMenuLeft.depositSupport, 0);
                addCount(idMenuLeft.editOwner, 0);
                $("#deposit-support-count-task-overview").html('<span><label class="control-label">Hỗ trợ đặc cọc :</label> ' + 0 + ' <label class="control-label">Hủy đặc cọc :</label> ' + 0 + '</span>');
            }
        }).catch(err => {
            const count = 0;
            addCount(idMenuLeft, 0);
            addCount(idMenuLeft.checkEmpty, count);
            addCount(idMenuLeft.negotiation, count);
            addCount(idMenuLeft.deposit, count);
            addCount(idMenuLeft.depositSupport, count);
            addCount(idMenuLeft.editOwner, count);
            $("#deposit-support-count-task-overview").html('<span><label class="control-label">Hỗ trợ đặc cọc :</label> ' + 0 + ' <label class="control-label">Hủy đặc cọc :</label> ' + 0 + '</span>');
            console.error('Fail to load count task');

        });

        // function
        const addCount = function(id , count) {
            //remove
            $(id).find("span").remove();
            $(id + " a").append("<span class='label label-danger' style='float: right; margin-left: 0;'>"+ count +"</span>");
        };
    }


}

$(document).ready(function () {
   // bind
    CommonPosAllPage.saMenuLeft();
    CommonPosAllPage.reloadPagePopupDepositSupport();

});

// $("#tour-table").DataTable({
//     "processing": true,
//     "searching": false,
//     "serverSide": true,
//     "ajax": "/crm-dashboard/get-table-sale-funel",
//     "scrollX": false,
//     "lengthChange": false,
//     "drawCallback": function () {
//                 $('.dataTables_paginate > .pagination').addClass('pagination-sm');
//                 var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
//                     pagination.toggle(this.api().page.info().pages > 1);
//             },
//     // "iDisplayLength": 1,
//     "columns": [
//    		{data: 'numberTours', orderable: false},
//         {data: 'customerName', orderable: false},
//         {data: 'duration'},
//         {data: 'listingPerLead', orderable: false},
//         {data: 'listingPerDeal', orderable: false},
//         {data: 'listingPerClient', orderable: false},
//         {data: 'viewedListings', orderable: false},
//         {data: 'numberTours', orderable: false}
//     ],
//     "order": [[0, 'desc']],
//     "language":
//         {
//             "paginate" : {
//                 previous: "<",
//                 next: ">",
//                 first: "|<",
//                 last: ">|"
//             },
//             "info": "Trang _PAGE_ của _PAGES_",
//             "emptyTable": "Chưa có lịch sử thay đổi",
//             "infoEmpty": "",
//         },
//     "initComplete": function(settings, json) {
//     		// 
//       }   
// });
(function ($) {
  /***
   * A sample AJAX data store implementation.
   * Right now, it's hooked up to load search results from Octopart, but can
   * easily be extended to support any JSONP-compatible backend that accepts paging parameters.
   */
  function RemoteModel() {
    // private
    var PAGESIZE = 50;
    var data = {length: 0};
    var searchstr = "";
    var sortcol = null;
    var sortdir = 1;
    var h_request = null;
    var req = null; // ajax request
    // events
    var onDataLoading = new Slick.Event();
    var onDataLoaded = new Slick.Event();
    function init() {
    }
    function isDataLoaded(from, to) {
      for (var i = from; i <= to; i++) {
        if (data[i] == undefined || data[i] == null) {
          return false;
        }
      }
      return true;
    }
    function clear() {
      for (var key in data) {
        delete data[key];
      }
      data.length = 0;
    }
    function ensureData(from, to) {
      if (req) {
        req.abort();
        for (var i = req.fromPage; i <= req.toPage; i++)
          data[i * PAGESIZE] = undefined;
      }
      if (from < 0) {
        from = 0;
      }
      if (data.length > 0) {
        to = Math.min(to, data.length - 1);
      }
      var fromPage = Math.floor(from / PAGESIZE);
      var toPage = Math.floor(to / PAGESIZE);
      while (data[fromPage * PAGESIZE] !== undefined && fromPage < toPage)
        fromPage++;
      while (data[toPage * PAGESIZE] !== undefined && fromPage < toPage)
        toPage--;
      if (fromPage > toPage || ((fromPage == toPage) && data[fromPage * PAGESIZE] !== undefined)) {
        // TODO:  look-ahead
        onDataLoaded.notify({from: from, to: to});
        return;
      }
      var url = "http://dashboard.propzy.local/kpi-setting/fakeapi?apikey=5e0e94f5a37b036e863b&include[]=short_description&show[]=uid&show[]=manufacturer&show[]=mpn&show[]=brand&show[]=octopart_url&show[]=short_description&q=" + searchstr + "&start=" + (fromPage * PAGESIZE) + "&limit=" + (((toPage - fromPage) * PAGESIZE) + PAGESIZE);
      if (sortcol != null) {
        url += ("&sortby=" + sortcol + ((sortdir > 0) ? "+asc" : "+desc"));
      }
      if (h_request != null) {
        clearTimeout(h_request);
      }
      h_request = setTimeout(function () {
        for (var i = fromPage; i <= toPage; i++)
          data[i * PAGESIZE] = null; // null indicates a 'requested but not available yet'
        onDataLoading.notify({from: from, to: to});
        console.log("aaaaaaaabbbbbbccc");
        // req = $.jsonp({
        //   url: url,
        //   callbackParameter: "callback",
        //   cache: true,
        //   success: onSuccess,
        //   error: function () {
        //     onError(fromPage, toPage);
        //   }
        // });
        req = $.ajax({
          url: url,
          dataType: 'json',
          success: onSuccess,
          error: function(){
              onError(fromPage, toPage)
          }
          });
        req.fromPage = fromPage;
        req.toPage = toPage;
      }, 50);
    }
    function onError(fromPage, toPage) {
      alert("error loading pages " + fromPage + " to " + toPage);
    }
    function onSuccess(resp) {
      console.log("resp",resp);
      $('#pagination-demo').twbsPagination({
        totalPages: resp.totalPages,
        visiblePages: 5,
        startPage:resp.startPage,
        onPageClick:(page, currentPage) => {
          console.log("page",page, "currentPage", currentPage);
        }
      });        
      // alert ("success");
      //var from = resp.request.start, to = from + resp.results.length;
      var from = 0, to = 5;
      //data.length = Math.min(parseInt(resp.hits),1000); // limitation of the API
      data.length = 1000;
      //for (var i = 0; i < resp.results.length; i++) {
      for (var i = 0; i < 1000; i++) {
        //var item = resp.results[i].item;
        data[from + i] = {"mpn":"Abigail","brand":"CA","short_description":"aaaaaa"};
        data[from + i].index = from + i;
      }
      //data = [{"mpn":"Abigail","brand":"CA","short_description":"aaaaaa"},{"mpn":"Abigail","brand":"CA","short_description":"aaaaaa"}];
      req = null;
      onDataLoaded.notify({from: from, to: to});
    }
    function reloadData(from, to) {
      for (var i = from; i <= to; i++)
        delete data[i];
      ensureData(from, to);
    }
    function setSort(column, dir) {
      sortcol = column;
      sortdir = dir;
      clear();
    }
    function setSearch(str) {
      searchstr = str;
      clear();
    }
    init();
    return {
      // properties
      "data": data,
      // methods
      "clear": clear,
      "isDataLoaded": isDataLoaded,
      "ensureData": ensureData,
      "reloadData": reloadData,
      "setSort": setSort,
      "setSearch": setSearch,
      // events
      "onDataLoading": onDataLoading,
      "onDataLoaded": onDataLoaded
    };
  }
  // Slick.Data.RemoteModel
  $.extend(true, window, { Slick: { Data: { RemoteModel: RemoteModel }}});
})(jQuery);
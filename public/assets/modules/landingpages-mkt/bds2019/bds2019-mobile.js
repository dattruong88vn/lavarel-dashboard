var startApp = function () {
    $('#tab-binh-tan').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['44752','33213','43768','44812','40524','43021','43447','42592','33532','37776','44950','44344'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#binh-tan").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-tan-phu').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['41037','27813','43342','43177','43006','42853','41940','40539','41688','40824','44608','44035'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#tan-phu").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-4').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['40110','33743','37908','36679','43129','43306','38040','41610','41271','39732','45253','38772'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-4").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-7').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['31327','30254','32200','34579','35507','33265','44881','44845','44860','44446','44092','43843'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-7").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-8').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['26979','28045','29986','43471','33040','39972','43669','44992','44383','42349','44560','44803'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-8").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-1').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['28923','32804','34306','35861','34156','44989','44773','44935','44662','42796','42208','39813'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-1").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-3').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['28149','14353','21260','24416','25085','25736','29531','29894','44287','41832','41325','45025'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-3").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-phu-nhuan').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['42316','43810','44557','31472','35298','42922','42907','42040','41973','41964','33355','43233'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-phu-nhuan").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-11').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['27225','37596','35137','30089','37950','35744','44497','44515','42481','40455','37779','39528'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-11").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-10').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['42982','42943','37965','42412','39048','32294','45046','35092','44512','39522','37539','32382'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-10").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-5').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids =  ['24188','37227','24386','34369','30881','37836','43258','40206','45063','33458','37773','37524'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-5").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-6').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['12285','41961','43786','44464','28096','40449','42118','43312','43246','42334','45124','43759'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-6").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-2').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['42181','33621','33558','32481','31038','26819','45049','43864','43075','38499','33572','37287'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-2").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-9').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['41406','41376','40692','40665','40644','35768','28802','45109','45073','44830','44734','44656'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-9").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-thu-duc').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['39960','42130','41394','40881','36868','44128','44986','45139','44947','44821','44527','44485'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-thu-duc").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-binh-thanh').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['28832','29370','30893','31043','34597','39249','43009','43738','44710','36853','42661','43009','35295'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-binh-thanh").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-go-vap').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['41049','32818','42892','42664','42217','44737','44722','43824','43860','43911','45205','45055'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-go-vap").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-quan-12').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var ids = ['38730','37902','40668','31137','41994','31279','38928','32540','33763','29563','28634','43420','43702'];
        //
        $.ajax({
            url: "/get-bds2019",
            type: "post",
            data: JSON.stringify(ids)
        }).done(function (response) {
            $("#quan-12").html(response);
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
};
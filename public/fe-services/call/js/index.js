fe_service_minimize = (element,type) => {
    if(type === "hide"){
        $("body").css("overflow", "auto");
        $(element).attr('style', function(i,s) { return (s || '') + 'display: none !important;' });
        $(element).parent(".modal").attr('style', function(i,s) { return (s || '') + 'display: none !important;' });
        const _title = $(element).find('.modal-title').html();
        _fe_service_btn_expand(element,"show",typeof _title !== 'undefined' ? _title : 'Mở rộng');
    }else{
        $("body").css("overflow", "hidden");
        $(element).attr('style', function(i,s) { return (s || '') + 'display: block !important;' });
        $(element).parent(".modal").attr('style', function(i,s) { return (s || '') + 'display: block !important;' });
        _fe_service_btn_expand(element,"hide",'Mở rộng');
    }
}

const _fe_service_btn_expand = (element,type,title) => {
    if(type === 'show'){
        const btn = `
            <button style="position:fixed;right:0;bottom:0;z-index:10" id="_fe_service_btn_expand" onclick="fe_service_minimize('${element}','show')" class="btn btn-primary">${title}</button>
        `;
        $("body").append(btn);
    }else{
        $('#_fe_service_btn_expand').remove();
    }
} 
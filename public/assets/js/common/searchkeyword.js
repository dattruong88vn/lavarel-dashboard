var searchKeyword = function ($el, options) {
    var self = this;
    var setting = {
        limit_item: 10, /* Item show in dropdown */
        delay: 200, /* delay search */
        parent_dropdown: '.next', /* Container of dropdown, Default next Input*/
        click_dropdown: false, /* Event click button arrow down */
        width_focus: false,
        width_blur: false,
        height: 35, /* Height of input */
        data_default: false,
        placeholder: 'Nhập địa điểm tìm kiếm',
        loadding: 'Đang tìm kiếm...',
        text_no_result: 'Không tìm thấy dữ liệu cho từ khóa'
    };
    self.globalTimeout = null;
    self.currentItem = 1;
    self.setting = $.extend(setting, options);
    self.dropdown = null;

    /* Css input */
    $el.css({height: self.setting.height});
    /* Set Container for input */
    var container = $('<div class="search-keyword-container">').css({position: 'relative'});
    $el.after(container);
    $el.appendTo(container);
    if($el.attr("replace-placeholder")!="false"){
        $el.attr('placeholder', self.setting.placeholder);
    }

    function init() {
        var timeCurrent = new Date().getTime();
        if (self.setting.parent_dropdown != '.next') {
            self.dropdown = $(self.setting.parent_dropdown).append('<div style="display: none" class="autocomplete-suggestions dropdown-seach dropdown-seach-' + timeCurrent + ' slider-scroll">').find('.dropdown-seach-' + timeCurrent);
        } else {
            self.dropdown = $el.after($('<div style="display: none" class="autocomplete-suggestions dropdown-seach dropdown-seach-' + timeCurrent + ' container-scroll">').css({
                position: "absolute",
                top: self.setting.height,
                left: 0,
                backgroundColor: '#ffffff'
            })).next().first();
        }
        if (self.setting.data_default && typeof self.setting.data_default == 'function') {
            self.setting.data_default(self.dropdown);
        }
        self.eventInit();
    };
    function getDropdownElement() {
        return self.dropdown;
    };
    self.eventInit = function () {
        $el.keyup(function (e) {
            var listKey = [38, 40, 39, 37, 13, 9]; // Up: 38 // Down: 40// Right: 39 // Left: 37 // Enter:13
            if (listKey.indexOf(e.keyCode) != -1) {
                return true;
            }
            var query = $(this).val();
            if (query.length >= 2) {
                self.dropdown.show();
                if (self.globalTimeout != null) {
                    clearTimeout(self.globalTimeout);
                }
                self.globalTimeout = setTimeout(function () {
                    self.globalTimeout = null;
                    self.getSuggest(query, self.dropdown, function (res) {
                        self.dropdown.html("");
                        if (res && res.code == 200 && res.dataResult.length > 0) {
                            res.dataResult.forEach(function (item, key) {
                                var itemSearch = $('<a>').attr('href', item.destination_url.replace(/\"/g, '').replace("https://propzy.vn", location.protocol+"//" + location.host) + $.query.toString().replace("?", '&'));
                                if (key == 0)
                                    itemSearch.addClass('active');
                                var keywords = item.keywords.replace(/\"/g, '');
                                var queryExp = new RegExp(query.trim(), 'g');
                                keywords = keywords.replace(queryExp, "<b>" + query.trim() + "</b>");
                                itemSearch.addClass('item').append("<div class='title autocomplete-suggestion'>" + keywords + "</div>").attr('uuid', item.uuid);
                                itemSearch.on('mousedown', function (e) {
                                    e.preventDefault();
                                }).click(function (e) {
                                    e.preventDefault();
                                    itemSearch.removeClass(".active");
                                    $(this).val(item.keywords.replace(/\"/g, ''));
                                    /* Localtion to link */
                                    window.location = $(this).attr('href');
                                });
                                self.dropdown.append(itemSearch).removeClass("not-found").addClass('has-result');
                            });
                        } else {
                            self.dropdown.html("Không tìm thấy từ khóa bạn tìm kiếm");
                        }
                    });
                }, self.setting.delay);
            } else {
                self.dropdown.hide();
            }
            /* dataChange(); */
        }).keydown(function (e) {
            var listKey = [38, 40, 39, 37, 9]; // Up: 38 // Down: 40// Right: 39 // Left: 37 // Enter:13
            if (listKey.indexOf(e.keyCode) != -1) {
                if (e.keyCode == 40 && self.currentItem < self.setting.limit_item)
                    self.currentItem++;
                if (e.keyCode == 38 && self.currentItem > 1)
                    self.currentItem--;
                if (e.keyCode == 9) {
                    var activeCurrent = self.dropdown.find(".item.active");
                    if (activeCurrent.length != 0) {
                        window.location = activeCurrent.attr("href");
                    } else {
                        // né trường hợp nhấn enter ở trang chủ khi gõ keyword và enter
                        if(location.pathname != "/"){
                            location.href = location.protocol+"//" + location.host + "/mua/ban-nha-rieng-tphcm";
                        }
                    }
                    e.stopPropagation();
                    e.preventDefault();
                    self.dropdown.hide();
                }

                $(self.dropdown.find(".item").removeClass("active").get(self.currentItem - 1)).addClass("active");
                $(this).val(self.dropdown.find(".item.active").text());
                return false;
            }
        }).keypress(function (e) {
            var listKey = [13, 9]; // Up: 38 // Down: 40// Right: 39 // Left: 37 // Enter:13
            if (listKey.indexOf(e.keyCode) != -1) {
                var activeCurrent = self.dropdown.find(".item.active");
                var input_search = $(this).val();
                if (activeCurrent.length != 0) {
                    window.location = activeCurrent.attr("href");
                } else {
                    setTimeout(function(){
                        if(input_search.match(/^\d+$/)) {
                            App.Feature.Get("/api/listings-exist/" + parseInt(input_search), function (response) {
                                if(response.response.code == "200"){
                                    location.href = response.response.data.link;
                                } else {
                                    location.href = location.protocol+"//" + location.host + "/error";
                                }
                            });
                        } else{
                            // né trường hợp nhấn enter ở trang chủ khi gõ keyword và enter
                            if(location.pathname != "/"){
                                location.href = location.protocol+"//" + location.host + "/mua/ban-nha-rieng-tphcm";
                            }
                        }
                    },300);
                }
                e.stopPropagation();
                e.preventDefault();
                $(self.dropdown.find(".item").removeClass("active").get(self.currentItem - 1)).addClass("active");
                self.dropdown.hide();
                return false;
            }
        }).focus(function () {
            if ($(this).val().length != 0)
                $(this).trigger("keypress");
            if (self.setting.width_focus)
                $(this).css({width: self.setting.width_focus, opcity: 1});

            if (self.dropdown.html() != ''){
                self.dropdown.show();
            }
            $(".input-search").removeClass("active-search");
        }).blur(function () {
            if (self.setting.width_blur !== false)
                $(this).css({width: self.setting.width_blur, opcity: 0});
            self.dropdown.hide();
        });
    };
    self.getSuggest = function (query, ele_dropdown, callback) {
        if (!query.length) return callback();
        var listingType = '';
        if(typeof listingTypeId != "undefined" && listingTypeId){
            listingType = listingTypeId;
        }
        var property_typeid = '';
        if(typeof propertyTypeIdSearchKeyword != "undefined" && propertyTypeIdSearchKeyword){
            property_typeid = propertyTypeIdSearchKeyword;
        }
        
        var dataSend = {
            "field_fetchs": ["uuid", "destination_url", "keywords"],
            "type_match": "WILDCARD",
            "list_querys": [{"field": "keywords", "values": query}, {"field": "listing_typeid","values": listingType}, {"field": "property_typeid","values": property_typeid}],
            "limit": self.setting.limit_item
        };
        $.ajax({
            url: '/api/keyword-search',
            type: 'POST',
            data: JSON.stringify(dataSend),
            cache:true,
            async: true,
            error: function () {
                callback();
            },
            beforeSend: function () {
                ele_dropdown.html(self.setting.loadding).addClass('loadding-search');
            },
            success: function (res) {
                callback(res);
            }
        }).always(function () {
            ele_dropdown.removeClass('loadding-search');
        });
    };
    init();
    /* Public function */
    return {
        getDropdownElement: getDropdownElement
    };
};
$.fn.searchKeyword = function (options) {
    var $this = $(this), search_keyword = $this.data("search_keyword");
    if (typeof options == 'object') {
        $.each(this, function () {
            if (!search_keyword) {
                search_keyword = new searchKeyword($this, options);
                $this.data("search_keyword", search_keyword);
            } else {
            }
        });
    } else {
        if (options !== undefined && typeof(options) === "string" && options == 'test') {
            search_keyword.test();
        }
    }
    return $this.data("search_keyword");
};
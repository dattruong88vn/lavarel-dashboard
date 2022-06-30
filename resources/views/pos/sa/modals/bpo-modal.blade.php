<div id="modalBPO" class="modal fade" role="dialog">
    <div class="modal-dialog modal-bpo">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><strong>Đánh giá BPO Listing</strong></h4>
            </div>
            <div class="modal-body">
                <div style="display:none" class="text-red review">Yêu cầu đánh giá BPO BĐS đã được gửi tới các BAs và chưa hoàn thành, nếu bạn nhấn 'Lưu & Gửi BPO', hệ thống sẽ gửi y/c BPO mới tới BAs</div>

                <div style="display:none" class="text-primary review"><br /><a style="text-decoration: underline;" id="aResetBpo" href="javascript:void(0)">Muốn đánh giá lại BPO cho Listing ?</a><br /><br /></div>

                <form id="modal-bpo-listing">
                    <section id="section-bpo-rating" class="bpo-rating">
                        <h5>1. Chọn một trong các options sau và đánh giá BPO Listing <span class="text-warning">*</span></h5>
                        <ul class="none-listing" id="rating-vote-option">

                        </ul>
                    </section>
                    <section id="section-bpo-noted" class="bpo-rating">
                        <h5>2. Ghi chú <span class="text-warning">*</span></h5>
                        <div class="note-limit">0/50</div>
                        <div class="bpo-noted-dropdown-menu">
                            <input rows="1" id="bpo-noted" class="" />
                        </div>
                    </section>
                    <section id="section-bpo-selectBAs" class="bpo-rating">
                        <h5>3. Chọn danh sách BAs đánh giá BPO Listing <span class="text-warning">*</span></h5>
                        <div class="bpo-ba-select-dropdown-menu">
                            <input type="text" id="bpo-ba-select" />
                        </div>
                    </section>
                    <section id="section-bpo-history" class="bpo-rating">
                        <hr />
                        <ul class="nav nav-tabs" id="bpo-history-tab-nav" role="tablist">
                        </ul>
                        <div class="tab-content" id="bpo-history-tab-content">

                        </div>
                    </section>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-second" data-dismiss="modal">Hủy</button>
                <button type="button" id="create-bpo" class="btn btn-success">Lưu & Gửi BPO</button>
            </div>
        </div>
    </div>
</div>
<link href="/typeahead/dist/typeahead.css" type="text/css" rel="stylesheet" />
<link href="/bootstrap-star-rating/css/star-rating.min.css" type="text/css" rel="stylesheet" />
<link href="/bootstrap-tagsinput/dist/bootstrap-tagsinput.css" type="text/css" rel="stylesheet" />
<style type="text/css">
    #modalBPOResolve h3 {
        padding: 0px;
        margin: 0px;
    }

    .f-bold {
        font-weight: bold;
    }

    .note-limit {
        float: right;
        margin-top: -20px;
    }

    .note-limit::after {
        clear: both;
    }

    .modal-bpo {
        min-width: 800px;
        width: 800px;
    }

    .modal-bpo .modal-body {
        width: 800px;
    }

    .modal-bpo .option-select-bpo {
        cursor: pointer;
    }

    .modal-bpo .none-listing li {
        list-style: none;
        margin: 0px 0px 20px 0px;
        padding: 0px;
    }

    .modal-bpo .caption-rating {
        display: block;
        margin: -20px 0px 0px 40px;
        color: #f00;
        font-size: 10pt;
        height: 20px;
    }

    .modal-bpo .rating-container {
        margin-left: 30px;
        padding: 0px;
    }

    .modal-bpo .div-star-rating-result .rating-container {
        margin-left: -5px;
    }

    .modal-bpo .rating-container .caption {
        display: none;
    }

    .modal-bpo .bootstrap-tagsinput {
        width: 100%;
        max-width: 900px;
    }

    .modal-bpo #section-bpo-noted .bootstrap-tagsinput {
        min-height: 100px;
    }

    .slider-size {
        height: 200px;
    }

    a.bpo-popup {
        cursor: pointer;
    }

    .bpo-history-result {
        border: 0px solid #ccc;
        width: 98%;
        margin-top: 20px;
        padding: 10px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
    }

    .final-rating .bpo-history-result {
        background: #E0F8EC;
    }

    .history-container {
        padding: 0px;
        max-height: 150px;
        overflow-y: auto;
    }

    .title-date {
        font-size: 10pt;
        color: #666;
    }

    .title-name {
        font-weight: bold;
    }

    .text-warning {
        color: #f00;
    }

    .rating-container .filled-stars {
        -webkit-text-stroke: 0px #F1C40F;
        color: #F1C40F;
        text-shadow: 0px 0px #999;
    }

    .tt-suggestion {
        font-size: 11pt;
    }

    .label-info {
        background-color: #efefef !important;
        color: #000 !important;
        padding: 8px;
        border-radius: 20px;
    }

    .bpo-noted-dropdown-menu .tt-menu,
    .bpo-ba-select-dropdown-menu .tt-menu{
        max-height: 200px;
        overflow-y: auto;
    }

    .bpo-rating .bootstrap-tagsinput .tag {
        white-space: break-spaces;
        max-width: 760px;
        display: inline-block;
        position: relative;
        padding-right: 25px;
        text-align: left;
        padding-left: 20px;
    }

    .bpo-rating .bootstrap-tagsinput .tag [data-role="remove"] {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
    }

    .bootstrap-tagsinput .twitter-typeahead input.tt-input {
        width: 760px;
    }
</style>
<script src="/typeahead/dist/bloodhound.min.js"></script>
<script src="/typeahead/dist/typeahead.jquery.min.js"></script>
<script src="/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js"></script>
<script src="/bootstrap-star-rating/js/star-rating.min.js"></script>
<script src="/js/common/propzy-common.js"></script>
<script type="text/javascript">
    var PROPZY_BPO = {
        captionClass: {
            0.5: 'text-star-caption',
            1: 'text-star-caption',
            1.5: 'text-star-caption',
            2: 'text-star-caption',
            2.5: 'text-star-caption',
            3: 'text-star-caption',
            3.5: 'text-star-caption',
            4: 'text-star-caption',
            4.5: 'text-star-caption',
            5: 'text-star-caption'
        },
        data: {
            voteOptions: [],
            suggestions: [],
            bas: [],
            histories: []
        },
        isReadOnly: false,
        detail: {},
        lastRating: 0,
        lastRatingCaption: '&nbsp;',
        listingId: -1,
        optionSelected: 1,
        isBA: false,
        changeOptionSelect: () => {
            PROPZY_BPO.lastRating = 0;
            PROPZY_BPO.lastRatingCaption = '&nbsp;';
            $('#modalBPO span.caption-rating').html(PROPZY_BPO.lastRatingCaption);
            $('#modalBPO input.start-rating').rating('reset');
            if (PROPZY_BPO.detail && PROPZY_BPO.detail.questionId) {
                PROPZY_BPO.optionSelected = PROPZY_BPO.detail.questionId;
                PROPZY_BPO.lastRating = PROPZY_BPO.detail.grade || 0;
                PROPZY_BPO.lastRatingCaption = PROPZY_BPO.detail.answer || '&nbsp';
                $('#modalBPO input#bpo-rating-' + PROPZY_BPO.optionSelected + '-star').rating('update', PROPZY_BPO.lastRating);
                $('#modalBPO #' + $('#modalBPO input#bpo-rating-' + PROPZY_BPO.optionSelected + '-star').attr('data-caption-ref')).html(PROPZY_BPO.lastRatingCaption);
                PROPZY_BPO.detail = {};
            }
            $('#modalBPO input.start-rating').rating('refresh', {
                readonly: true
            });
            $('#modalBPO input.option-select-bpo').each(function() {
                $(this).prop('disabled', PROPZY_BPO.isReadOnly);
                const div = $(this).next().next();
                if ($(this).val() == PROPZY_BPO.optionSelected) {
                    $(this).prop('checked', true);
                    return;
                }
            });

            $('#modalBPO input#bpo-rating-' + PROPZY_BPO.optionSelected + '-star').rating('refresh', {
                readonly: PROPZY_BPO.isReadOnly
            });
        },
        render: () => {
            $.ajax({
                url: '/bpo/vote-options',
                data: {},
                type: 'GET'
            }).done(function(data) {
                if (data.result) {
                    PROPZY_BPO.data.voteOptions = data.data;
                    PROPZY_BPO.renderStar();
                }
            });
            $.ajax({
                url: '/bpo/suggestions',
                data: {},
                type: 'GET'
            }).done(function(data) {
                if (data.result) {
                    PROPZY_BPO.data.suggestions = data.data;
                    PROPZY_BPO.renderSuggestions();
                }
            });
            $.ajax({
                url: '/bpo/ba',
                data: {},
                type: 'GET'
            }).done(function(data) {
                if (data.result) {
                    PROPZY_BPO.data.bas = data.data.map(i => {
                        if (data.data.filter(d => d.name === i.name).length > 1) {
                            i.name = i.name + ' ' + i.userId;
                        }
                        return i;
                    });
                    PROPZY_BPO.renderBASuggestions();
                }
            });
        },
        renderHistory: () => {
            $('#modalBPO section#section-bpo-history').hide();
            var ul = $('#modalBPO #bpo-history-tab-nav');
            ul.html('');
            var div = $('#modalBPO #bpo-history-tab-content');
            div.html('');
            PROPZY_BPO.data.histories.forEach((i, index) => {
                ul.append(`<li class="nav-item ${index === 0 ? 'active' : ''}">
                                <a class="nav-link ${index === 0 ? 'active' : ''}" id="bpo-history-a-${index}" data-toggle="tab" href="#bpo-history-tab-${index}" role="tab" aria-controls="bpo-history-tab-${index}" aria-selected="true">${moment(i.bpoCreatedDate).format('DD/MM/YYYY')}</a>
                            </li>`);
                var content = `<div class="tab-pane fade ${index === 0 ? ' active in' : ''}" id="bpo-history-tab-${index}" role="tabpanel" aria-labelledby="bpo-history-a-${index}">
                                <div class="history-container">
                                    ${i.ratingUsers.map(u => {
                                        if((!u.name || u.name.trim() === '') && PROPZY_BPO.isBA) {
                                            return '';
                                        } 
                                        return `<div class="col-md-4 ">
                                            <div class="bpo-history-result">
                                                <div class="title-date">${u.ratingDate ? moment(u.ratingDate).format('DD/MM/YYYY') : '&nbsp;'}</div>
                                                <div class="title-name">${u.name || '&nbsp;'}</div>
                                                <div class="div-star-rating-result">${u.grade ? `<input type="text" class="star-rating-result" value="${u.grade}"/>`: '&nbsp;'}</div>
                                                <div class="star-rating-caption">${u.labelCode ? (u.labelCode === 'THIS_MONTH' ? 'Bán trong tháng':'Bán trong tháng tới') : '&nbsp;'}</div>
                                                <div class"star-rating-caption-date">${u.grade > 1 ? (u.bpoCloseDate ? moment(u.bpoCloseDate).format('DD/MM/YYYY') : '') : '&nbsp;'}</div>
                                            </div>
                                        </div>`
                                    }).join('')}
                                    ${i.finalRating ? `
                                        <div class="col-md-4 final-rating">
                                            <div class="bpo-history-result">
                                                <div class="title-date">${i.finalRating.bpoCloseGradeDate ? moment(i.finalRating.bpoCloseGradeDate).format('DD/MM/YYYY') : '&nbsp;'}</div>
                                                <div class="title-name">${i.finalRating.name || '&nbsp;'}</div>
                                                <div class="div-star-rating-result">${i.finalRating.name && i.finalRating.name.length > 0 ? `<input type="text" class="star-rating-result" value="${i.finalRating.bpoCloseGrade || ''}"/>` : `<strong>${i.finalRating.bpoCloseGrade || 0}</strong>`}</div>
                                                <div class="star-rating-caption"><strong>Ngày chốt bán</strong></div>
                                                <div class"star-rating-caption-date">${i.finalRating.bpoCloseGrade > 1 ? (i.finalRating.bpoCloseDate ? moment(i.finalRating.bpoCloseDate).format('DD/MM/YYYY') : 'Listing rất khó bán') : 'Listing rất khó bán'}</div>
                                            </div>
                                        </div>` : ''}
                                        <div style="clear:both"></div>
                                    </div>
                            </div>`;
                div.append(content);
            });
            if (PROPZY_BPO.data.histories.length > 0) {
                $('#modalBPO section#section-bpo-history').show();
            }
            $('#modalBPO input.star-rating-result').rating({
                size: 'xs',
                clearButton: '',
                showCaption: false,
                step: 1,
                readonly: true
            });
        },
        renderBASuggestions: () => {
            var bas = PROPZY_BPO.data.bas.map(i => i.name || '');
            $('#modalBPO input#bpo-ba-select').tagsinput({
                maxChars: 255,
                confirmKeys: [13],
                delimiter: ';',
                typeaheadjs: [{
                        hint: false,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'bas',
                        limit: 9999,
                        afterSelect: function(val) {
                            this.$element.val("");
                        },
                        source: PROPZY_BPO.baMatcher(bas)
                    }
                ]
            });

        },
        renderSuggestions: () => {
            var suggestions = PROPZY_BPO.data.suggestions.map(i => i.content || '');
            $('#modalBPO input#bpo-noted').tagsinput({
                maxChars: 500,
                maxTags: 50,
                confirmKeys: [13],
                delimiter: ';',
                typeaheadjs: [{
                        hint: false,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'suggestions',
                        afterSelect: function(val) {
                            this.$element.val("");
                        },
                        limit: 9999,
                        source: PROPZY_BPO.notedMatcher(suggestions)
                    }
                ]
            });

        },
        baMatcher: (strs) => {
            return (q, cb) => {
                var matches = [];
                strs.forEach((str, i) => {
                    if ((new RegExp(q, 'i')).test(str) || (new RegExp(q, 'i')).test(PROPZY_STRING.removeAccent(str))) {
                        matches.push(str);
                    }
                });
                var baSelecteds = $('#modalBPO input#bpo-ba-select').tagsinput('items');
                cb(matches.filter(i => !baSelecteds.includes(i)));
            };
        },
        notedMatcher: (strs) => {
            return (q, cb) => {
                var matches = [];
                strs.forEach((str, i) => {
                    if ((new RegExp(q, 'i')).test(str) || (new RegExp(q, 'i')).test(PROPZY_STRING.removeAccent(str))) {
                        matches.push(str);
                    }
                });
                var baSelecteds = $('#modalBPO input#bpo-noted').tagsinput('items');
                cb(matches.filter(i => !baSelecteds.includes(i)));
            };
        },
        renderStar: () => {
            let ul = $('#modalBPO #rating-vote-option');
            ul.html('');
            var voteOptions = PROPZY_BPO.data.voteOptions;
            if((PROPZY_BPO.detail?.questions?.length || 0) > 0) {
                voteOptions = PROPZY_BPO.detail.questions;
            }
            voteOptions.forEach(i => {
                var date = new Date();
                if (PROPZY_BPO.detail.bpoRatingDate && PROPZY_BPO.isReadOnly) {
                    date = new Date(PROPZY_BPO.detail.bpoRatingDate);
                }
                if (i.labelCode !== 'THIS_MONTH') {
                    date.setMonth(date.getMonth() + 1);
                }

                date = PROPZY_DATE.getStringLastDateOfMonth(date.getFullYear(), date.getMonth());
                var id = `bpo-rating-${i.id}`;
                var id_star = `bpo-rating-${i.id}-star`;
                var str = `<li>
                                <div class="">
                                    <input type="radio" name="bpoRating" value="${i.id}" id="${id}" class="option-select-bpo" /> <label style="font-weight: normal" for="${id}">${i.content} (${date})</label>
                                    <div>
                                        <input type="text" name="bpoRatingStar" id="${id_star}" class="start-rating" data-caption-ref="bpo-rating-caption-${i.id}" />
                                        <br />
                                        <span id="bpo-rating-caption-${i.id}" class="caption-rating"></span>
                                    </div>
                                </div>
                            </li>`;
                ul.append(str);
                var captions = {};
                i.answers.forEach(a => {
                    captions[a.grade + ''] = a.content;
                });
                $('#modalBPO input#' + id_star).on('rating:hover', function(event, value, caption, target) {
                    $('#modalBPO #' + $(this).attr('data-caption-ref')).html(caption);
                });
                $('#modalBPO input#' + id_star).on('rating:hoverleave', function(event, target) {
                    if (PROPZY_BPO.lastRating > 0 && $(this).attr('id') === `bpo-rating-${PROPZY_BPO.optionSelected}-star`) {
                        $('#modalBPO #' + $(this).attr('data-caption-ref')).html(PROPZY_BPO.lastRatingCaption);
                        return;
                    }
                    $('#modalBPO #' + $(this).attr('data-caption-ref')).html('');

                });
                $('#modalBPO input#' + id_star).on('rating:change', function(event, value, caption) {
                    PROPZY_BPO.lastRating = value;
                    PROPZY_BPO.lastRatingCaption = caption;
                });
                $('#modalBPO input#' + id_star).rating({
                    starCaptions: captions,
                    starCaptionClasses: PROPZY_BPO.captionClass,
                    size: 'sm',
                    clearButton: '',
                    showCaption: true,
                    step: 1,
                    emptyStar: '<i class="glyphicon glyphicon-star"></i>'
                });

            });
            $('#modalBPO input.option-select-bpo').click(function() {
                PROPZY_BPO.optionSelected = $(this).val();
                PROPZY_BPO.changeOptionSelect();
            });

            $('#modalBPO input.option-select-bpo').each(function() {
                var obj = $(this);
                const div = obj.next().next();
                div.find('span.caption-rating').html(PROPZY_BPO.lastRatingCaption);
                if (obj.val() == PROPZY_BPO.optionSelected) {
                    obj.prop('checked', true);
                    return;
                }
                obj.prop('checked', false);
            });
            $('#modalBPO input.start-rating').rating('refresh', {
                readonly: true,
                showCaptionAsTitle: false
            });
            $('#modalBPO input#bpo-rating-' + PROPZY_BPO.optionSelected + '-star').rating('refresh', {
                readonly: false
            });

        },
        getDetail: () => {
            $.ajax({
                url: '/bpo/detail/' + PROPZY_BPO.listingId,
                data: {},
                type: 'GET'
            }).done(function(data) {
                if (data.result) {
                    PROPZY_BPO.detail = data.data;
                    PROPZY_BPO.isReadOnly = true;
                    if (!PROPZY_BPO.detail.grade) {
                        PROPZY_BPO.isReadOnly = false;
                    }
                }
                $('#modalBPO div.review').hide();
                if (PROPZY_BPO.detail.questionId && !PROPZY_BPO.isBA && $('#living-listing-id').parent().hasClass('active')) {
                    $('#modalBPO div.review').show();
                }
                PROPZY_BPO.reRender();
            });
        },
        reRender: () => {
            PROPZY_BPO.renderStar();
            $('#modalBPO input#bpo-noted').tagsinput('removeAll');
            $('#modalBPO input#bpo-ba-select').tagsinput('removeAll');
            $.ajax({
                url: `/bpo/history/${PROPZY_BPO.listingId}/${PROPZY_BPO.isBA}`,
                data: {},
                type: 'GET'
            }).done(function(data) {
                if (data.result) {
                    PROPZY_BPO.data.histories = data.data;
                    PROPZY_BPO.renderHistory();

                    $('#modalBPO input#bpo-noted').on('itemAdded', function(e) {
                        $('#modalBPO div.note-limit').html($('#modalBPO input#bpo-noted').tagsinput('items').length + '/50');
                    });
                    $('#modalBPO input#bpo-noted').on('itemRemoved', function(e) {
                        $('#modalBPO div.note-limit').html($('#modalBPO input#bpo-noted').tagsinput('items').length + '/50');
                    });
                    $('#modalBPO input#bpo-ba-select').on('beforeItemAdd', function(e) {
                        return e.cancel = false;
                    });
                    $('#modalBPO input#bpo-noted').on('beforeItemAdd', function(e) {
                        return e.cancel = false;
                    });
                }
                if (PROPZY_BPO.detail.questionId) {
                    if (PROPZY_BPO.detail.ratingComments) {
                        $('#modalBPO input#bpo-noted').tagsinput('add', PROPZY_BPO.detail.ratingComments.map(i => i.content || '').join(';'));
                    }
                    if (PROPZY_BPO.detail.bas) {
                        $('#modalBPO input#bpo-ba-select').tagsinput('add', PROPZY_BPO.detail.bas.map(i => i.name || '').join(';'));
                    }
                }
                $('#modalBPO button#create-bpo').prop('disabled', PROPZY_BPO.isReadOnly);
                $('#modalBPO input#bpo-ba-select').prop('disabled', PROPZY_BPO.isReadOnly);
                $('#modalBPO input#bpo-noted').prop('disabled', PROPZY_BPO.isReadOnly);
                $('.bootstrap-tagsinput .twitter-typeahead input.tt-input').val('');
                PROPZY_BPO.changeOptionSelect();
                $('#modalBPO input#bpo-ba-select').on('beforeItemAdd', function(e) {
                    if (PROPZY_BPO.isReadOnly) {
                        return e.cancel = true;
                    }
                    return e.cancel = PROPZY_BPO.data.bas.find(i => i.name === e.item) ? false : true;
                });
                $('#modalBPO input#bpo-ba-select').on('beforeItemRemove ', function(e) {
                    if (PROPZY_BPO.isReadOnly) {
                        return e.cancel = true;
                    }
                });
                $('#modalBPO input#bpo-noted').on('beforeItemAdd', function(e) {
                    if (PROPZY_BPO.isReadOnly) {
                        return e.cancel = true;
                    }
                    return e.cancel = $('#modalBPO input#bpo-noted').tagsinput('items').length >= 50;
                });
                $('#modalBPO input#bpo-noted').on('beforeItemRemove', function(e) {
                    if (PROPZY_BPO.isReadOnly) {
                        return e.cancel = true;
                    }
                });
            });
        },
        reset: () => {
            PROPZY_BPO.optionSelected = 1;
            PROPZY_BPO.lastRating = 0;
            PROPZY_BPO.lastRatingCaption = '&nbsp;';
            PROPZY_BPO.detail = {};
            $('#modalBPO div.note-limit').html('0/50');
            PROPZY_BPO.getDetail();
            return;
        },
        validate: () => {
            if (PROPZY_BPO.lastRatingCaption === '&nbsp;') {
                showPropzyAlert('Vui lòng chọn thông tin và đánh giá !');
                return false;
            }
            if ($('#modalBPO input#bpo-noted').tagsinput('items').length === 0) {
                showPropzyAlert('Vui lòng nhập thông tin ghi chú !');
                return false;
            }
            if ($('#modalBPO input#bpo-ba-select').tagsinput('items').length === 0 && !PROPZY_BPO.isBA) {
                showPropzyAlert('Vui lòng chọn BA đánh giá !');
                return false;
            }
            return true;
        },
        createBpo: () => {
            var baIds = $('#modalBPO input#bpo-ba-select').tagsinput('items');
            var comments = $('#modalBPO input#bpo-noted').tagsinput('items');
            var dataPost = {
                rListingId: PROPZY_BPO.listingId,
                baIds: baIds.map(i => {
                    var ob = PROPZY_BPO.data.bas.find(s => (s.name || '') === i);
                    return ob ? ob.userId : null;
                }).filter(i => i !== null),
                questionId: PROPZY_BPO.optionSelected,
                grade: parseInt(PROPZY_BPO.lastRating, 10),
                comments: comments.map(i => {
                    var ob = PROPZY_BPO.data.suggestions.find(s => (s.content || '') === i);
                    return {
                        suggestionId: ob ? ob.suggestionId : null,
                        content: i
                    }
                }),
                isBA: PROPZY_BPO.isBA
            }
            
            if (PROPZY_BPO.isBA) {
                dataPost.baIds = [];
            }
            showPropzyLoading();
            $.ajax({
                url: '/bpo/create',
                data: dataPost,
                type: 'POST'
            }).done(function(data) {
                hidePropzyLoading();
                if (data.result) {
                    $('#modalBPO').modal('hide');
                    try {
                        $('div#form-filter button#search').trigger('click');
                        $('div#tasks-of-bpo-listing button.btn-search').trigger('click');
                    } catch (ex) {}
                    return;
                }
                if (data.code === 401) {} {
                    showPropzyAlert('Bạn không có quyền thực hiện đánh giá BPO !');
                    return;
                }
                showPropzyAlert(data.technicalMessage);
            }).fail(function(e) {
                hidePropzyLoading();
            });
        },
        reInit: () => {
            // $('a.bpo-popup').unbind('click').click(function() {
            //     PROPZY_BPO.listingId = parseInt($(this).attr('data-id'), 10);
            //     PROPZY_BPO.isReadOnly = $(this).attr('is-readonly') == '1';
            //     PROPZY_BPO_RESOLVE.listingId = parseInt($(this).attr('data-id'), 10);
            //     PROPZY_BPO_RESOLVE.isReadOnly = $(this).attr('is-readonly') == '1';

            //     let thisObj = this; 

            //     $.ajax({
            //     url: `/bpo-listing/checkPermissionForListing/${PROPZY_BPO.listingId}`,
            //     data: {},
            //     type: 'GET'
            //     }).done(function(data) {
            //         if (data.result) {
            //             if (data.data.update && data.data.bpoStatusReality == 47) {
            //                 $('#modalBPOResolve').modal('show');
            //                 return;
            //             } else {
            //                 if ($(thisObj).html().indexOf('C') >= 0) {
            //                     $('#modalBPOResolve').modal('show');
            //                     return;
            //                 }
            //                 $('#modalBPO').modal('show');
            //             }
            //         }
            //     });

            // });
        },
        init: () => {
            $('#modalBPO').on('shown.bs.modal', function() {
                PROPZY_BPO.reset();
            });
            $('#modalBPO #aResetBpo').click(function() {
                PROPZY_BPO.isReadOnly = false;
                PROPZY_BPO.reRender();
            });
            PROPZY_BPO.reInit();
            PROPZY_BPO.render();
            PROPZY_BPO.changeOptionSelect();
            $('#modalBPO button#create-bpo').click(function() {
                if (!PROPZY_BPO.validate()) {
                    return;
                }
                PROPZY_BPO.createBpo();
            });
        }
    }
    $(function() {
        PROPZY_BPO.init();
    });
</script>
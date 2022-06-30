<div id="modalBPOResolve" class="modal fade" role="dialog">
    <div class="modal-dialog modal-bpo">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><strong>BPO Listing - Giải Quyết Khác Biệt Ý Kiến BSA - BAs</strong></h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <h5>1. Điểm BSA</h5>
                        <div id="bsa-point">

                        </div>
                    </div>
                    <div class="col-md-6">
                        <h5>2. Điểm trung bình BAs</h5>
                        <div id="bas-point">

                        </div>
                    </div>
                    <div style="clear:both"></div>
                </div>
                <br />
                <div class="text-red f-bold">
                    Chú ý:
                    <br />
                    - Chắc chắn bạn đã thảo luận với BAs, Team Lead, Zone Lead để đưa ra điểm số cuối cùng
                    <br />
                    - Điểm khi bạn đánh giá sẽ là điểm BPO cuối cùng của listing
                </div>
                <br />
                <form id="modal-bpo-listing">
                    <section id="section-bpo-rating" class="bpo-rating">
                        <h5>3. Chọn một trong các options sau và chốt điểm BPO Listing <span class="text-warning">*</span></h5>
                        <ul class="none-listing" id="rating-vote-option">

                        </ul>
                    </section>
                    <section id="section-bpo-noted" class="bpo-rating">
                        <h5>4. Ghi chú <span class="text-warning">*</span></h5>
                        <div class="note-limit">0/50</div>
                        <div class="bpo-noted-dropdown-menu">
                            <input rows="1" id="bpo-noted" class=""></input>
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
                <button type="button" id="create-bpo" class="btn btn-success">Lưu điểm BPO</button>
            </div>
        </div>
    </div>
</div>
<link href="/typeahead/dist/typeahead.css" type="text/css" rel="stylesheet" />
<link href="/bootstrap-star-rating/css/star-rating.min.css" type="text/css" rel="stylesheet" />
<link href="/bootstrap-tagsinput/dist/bootstrap-tagsinput.css" type="text/css" rel="stylesheet" />

<script type="text/javascript">
    var PROPZY_BPO_RESOLVE = {
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
        changeOptionSelect: () => {
            PROPZY_BPO_RESOLVE.lastRating = 0;
            PROPZY_BPO_RESOLVE.lastRatingCaption = '&nbsp;';
            $('#modalBPOResolve input.start-rating').rating('reset');
            $('#modalBPOResolve input.start-rating').rating('refresh', {
                readonly: true
            });

            $('#modalBPOResolve span.caption-rating').html(PROPZY_BPO_RESOLVE.lastRatingCaption);
            $('#modalBPOResolve input.option-select-bpo').each(function() {
                $(this).prop('disabled', PROPZY_BPO_RESOLVE.isReadOnly);
                const div = $(this).next().next();
                if ($(this).val() == PROPZY_BPO_RESOLVE.optionSelected) {
                    $(this).prop('checked', true);
                    return;
                }
            });
            $('#modalBPOResolve input#bpo-rating-' + PROPZY_BPO_RESOLVE.optionSelected + '-star').rating('refresh', {
                readonly: PROPZY_BPO_RESOLVE.isReadOnly
            });
        },
        notedMatcher: (strs) => {
            return (q, cb) => {
                var matches = [];
                strs.forEach((str, i) => {
                    if ((new RegExp(q, 'i')).test(str) || (new RegExp(q, 'i')).test(PROPZY_STRING.removeAccent(str))) {
                        matches.push(str);
                    }
                });
                var baSelecteds = $('#modalBPOResolve input#bpo-noted').tagsinput('items');
                cb(matches.filter(i => !baSelecteds.includes(i)));
            };
        },
        render: () => {
            $.ajax({
                url: '/bpo/vote-options',
                data: {},
                type: 'GET'
            }).done(function(data) {
                if (data.result) {
                    PROPZY_BPO_RESOLVE.data.voteOptions = data.data;
                    PROPZY_BPO_RESOLVE.renderStar();
                }
            });
            $.ajax({
                url: '/bpo/suggestions',
                data: {},
                type: 'GET'
            }).done(function(data) {
                if (data.result) {
                    PROPZY_BPO_RESOLVE.data.suggestions = data.data;
                    PROPZY_BPO_RESOLVE.renderSuggestions();
                }
            });
        },
        renderHistory: () => {
            $('#modalBPOResolve section#section-bpo-history').hide();
            var ul = $('#modalBPOResolve #bpo-history-tab-nav');
            ul.html('');
            var div = $('#modalBPOResolve #bpo-history-tab-content');
            div.html('');
            PROPZY_BPO_RESOLVE.data.histories.forEach((i, index) => {
                ul.append(`<li class="nav-item ${index === 0 ? 'active' : ''}">
                                <a class="nav-link ${index === 0 ? 'active' : ''}" id="bpo-history-resolve-a-${index}" data-toggle="tab" href="#bpo-history-resolve-tab-${index}" role="tab" aria-controls="bpo-history-resolve-tab-${index}" aria-selected="true">${moment(i.bpoCreatedDate).format('DD/MM/YYYY')}</a>
                            </li>`);
                var content = `<div class="tab-pane fade ${index === 0 ? ' active in' : ''}" id="bpo-history-resolve-tab-${index}" role="tabpanel" aria-labelledby="bpo-history-resolve-a-${index}">
                                <div class="history-container">                
                                ${i.ratingUsers.map(u => {
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
                                                <div class="title-date">${i.finalRating.bpoCloseGradeDate ? moment(i.finalRating.bpoCloseGradeDate).format('DD/MM/YYYY') : ''}</div>
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
            if (PROPZY_BPO_RESOLVE.data.histories.length > 0) {
                $('#modalBPOResolve section#section-bpo-history').show();
            }
            $('#modalBPOResolve input.star-rating-result').rating({
                size: 'xs',
                clearButton: '',
                showCaption: false,
                step: 1,
                readonly: true
            });
        },
        renderSuggestions: () => {
            var suggestions = PROPZY_BPO_RESOLVE.data.suggestions.map(i => i.content || '');
            $('#modalBPOResolve input#bpo-noted').tagsinput({
                maxChars: 500,
                confirmKeys: [13],
                delimiter: ';',
                maxTags: 50,
                typeaheadjs: [{
                        hint: false,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'suggestions',
                        limit: 9999,
                        afterSelect: function(val) {
                            this.$element.val("");
                        },
                        source: PROPZY_BPO_RESOLVE.notedMatcher(suggestions)
                    }
                ]
            });

        },
        renderStar: () => {
            let ul = $('#modalBPOResolve #rating-vote-option');
            ul.html('');
            var voteOptions = PROPZY_BPO_RESOLVE.data.voteOptions;
            if ((PROPZY_BPO_RESOLVE.detail?.questions?.length || 0) > 0) {
                voteOptions = PROPZY_BPO_RESOLVE.detail.questions;
            }
            voteOptions.forEach(i => {
                var date = new Date();
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
                $('#modalBPOResolve input#' + id_star).on('rating:hover', function(event, value, caption, target) {
                    $('#modalBPOResolve #' + $(this).attr('data-caption-ref')).html(caption);
                });
                $('#modalBPOResolve input#' + id_star).on('rating:hoverleave', function(event, target) {
                    if (PROPZY_BPO_RESOLVE.lastRating > 0 && $(this).attr('id') === `bpo-rating-${PROPZY_BPO_RESOLVE.optionSelected}-star`) {
                        $('#modalBPOResolve #' + $(this).attr('data-caption-ref')).html(PROPZY_BPO_RESOLVE.lastRatingCaption);
                        return;
                    }
                    $('#modalBPOResolve #' + $(this).attr('data-caption-ref')).html('');

                });
                $('#modalBPOResolve input#' + id_star).on('rating:change', function(event, value, caption) {
                    PROPZY_BPO_RESOLVE.lastRating = value;
                    PROPZY_BPO_RESOLVE.lastRatingCaption = caption;
                });
                $('#modalBPOResolve input#' + id_star).rating({
                    starCaptions: captions,
                    starCaptionClasses: PROPZY_BPO_RESOLVE.captionClass,
                    size: 'sm',
                    clearButton: '',
                    showCaption: true,
                    step: 1,
                    emptyStar: '<i class="glyphicon glyphicon-star"></i>'
                });

            });
            $('#modalBPOResolve input.option-select-bpo').click(function() {
                PROPZY_BPO_RESOLVE.optionSelected = $(this).val();
                PROPZY_BPO_RESOLVE.changeOptionSelect();
            });

            $('#modalBPOResolve input.option-select-bpo').each(function() {
                var obj = $(this);
                const div = obj.next().next();
                div.find('span.caption-rating').html(PROPZY_BPO_RESOLVE.lastRatingCaption);
                if (obj.val() == PROPZY_BPO_RESOLVE.optionSelected) {
                    obj.prop('checked', true);
                    return;
                }
                obj.prop('checked', false);
            });
            $('#modalBPOResolve input.start-rating').rating('refresh', {
                readonly: true,
                showCaptionAsTitle: false
            });
            $('#modalBPOResolve input#bpo-rating-' + PROPZY_BPO_RESOLVE.optionSelected + '-star').rating('refresh', {
                readonly: false
            });

        },
        getResolveDetail: () => {
            $.ajax({
                url: '/bpo/resolve-detail/' + PROPZY_BPO_RESOLVE.listingId,
                data: {},
                type: 'GET'
            }).done(function(data) {
                if (data.result) {
                    PROPZY_BPO_RESOLVE.detail = data.data;
                }
                if (PROPZY_BPO_RESOLVE.detail.bpoRatingDetailBSA) {

                    $('#modalBPOResolve div#bsa-point').html(`
                        <div class="text-center">${PROPZY_BPO_RESOLVE.detail.bpoRatingDetailBSA.question} ${PROPZY_BPO_RESOLVE.detail.bpoRatingDetailBSA.closeDate ? `(${moment(PROPZY_BPO_RESOLVE.detail.bpoRatingDetailBSA.closeDate || null).format('DD/MM/YYYY')})`: ''}</div>
                        <h3 class="text-center">${PROPZY_BPO_RESOLVE.detail.bpoRatingDetailBSA.grade}</h3>
                    `);
                }
                if (PROPZY_BPO_RESOLVE.detail.listAvgBA) {
                    $('#modalBPOResolve div#bas-point').html('');
                    PROPZY_BPO_RESOLVE.detail.listAvgBA.forEach(i => {
                        $('#modalBPOResolve div#bas-point').append(`
                            <div class="col-md-12">
                                <div class="text-center">${i.questionName}</div>
                                <h3 class="text-center">${i.avg}</h3>
                            </div>
                        `);
                    });
                    $('#modalBPOResolve div#bas-point').append('<div style="clear:both"></div>');
                }
                PROPZY_BPO_RESOLVE.renderStar();
                $('#modalBPOResolve input#bpo-noted').tagsinput('removeAll');

                $('#modalBPOResolve input#bpo-noted').on('beforeItemAdd', function(e) {
                    if (PROPZY_BPO_RESOLVE.isReadOnly) {
                        return e.cancel = true;
                    }
                    return e.cancel = $('#modalBPOResolve input#bpo-noted').tagsinput('items').length >= 50;
                });
                $('#modalBPOResolve input#bpo-noted').on('beforeItemRemove', function(e) {
                    if (PROPZY_BPO_RESOLVE.isReadOnly) {
                        return e.cancel = true;
                    }
                });
                $('#modalBPOResolve input#bpo-noted').on('itemRemoved', function(e) {
                    $('#modalBPOResolve div.note-limit').html($('#modalBPOResolve input#bpo-noted').tagsinput('items').length + '/50');
                });
                $('#modalBPOResolve input#bpo-noted').on('itemAdded', function(e) {
                    $('#modalBPOResolve div.note-limit').html($('#modalBPOResolve input#bpo-noted').tagsinput('items').length + '/50');
                });
                $.ajax({
                    url: '/bpo/history/' + PROPZY_BPO_RESOLVE.listingId + '/false',
                    data: {},
                    type: 'GET'
                }).done(function(data) {
                    if (data.result) {
                        PROPZY_BPO_RESOLVE.data.histories = data.data;
                        PROPZY_BPO_RESOLVE.renderHistory();
                    }
                    PROPZY_BPO_RESOLVE.changeOptionSelect();
                });
            });
        },
        reset: () => {
            PROPZY_BPO_RESOLVE.optionSelected = 1;
            PROPZY_BPO_RESOLVE.lastRating = 0;
            PROPZY_BPO_RESOLVE.lastRatingCaption = '&nbsp;';
            PROPZY_BPO_RESOLVE.detail = {};
            $('#modalBPOResolve div.note-limit').html('0/50');
            PROPZY_BPO_RESOLVE.getResolveDetail();
            return;
        },
        validate: () => {
            if (PROPZY_BPO_RESOLVE.lastRatingCaption === '&nbsp;') {
                showPropzyAlert('Vui lòng chọn thông tin và đánh giá !');
                return false;
            }
            if ($('#modalBPOResolve input#bpo-noted').tagsinput('items').length === 0) {
                showPropzyAlert('Vui lòng nhập thông tin ghi chú !');
                return false;
            }
            return true;
        },
        createBpo: () => {
            var comments = $('#modalBPOResolve input#bpo-noted').tagsinput('items');
            var dataPost = {
                rListingId: PROPZY_BPO_RESOLVE.listingId,
                questionId: PROPZY_BPO_RESOLVE.optionSelected,
                grade: parseInt(PROPZY_BPO_RESOLVE.lastRating, 10),
                comments: comments.map(i => {
                    var ob = PROPZY_BPO_RESOLVE.data.suggestions.find(s => (s.content || '') === i);
                    return {
                        suggestionId: ob ? ob.suggestionId : null,
                        content: i
                    }
                })
            }
            showPropzyLoading();
            $.ajax({
                url: '/bpo/resolve-conflict',
                data: dataPost,
                type: 'POST'
            }).done(function(data) {
                hidePropzyLoading();
                if (data.result) {
                    $('#modalBPOResolve').modal('hide');
                    $('div#form-filter button#search').trigger('click');
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
            $('a.bpo-popup-resolve').unbind('click').click(function() {
                PROPZY_BPO.listingId = parseInt($(this).attr('data-id'), 10);
                PROPZY_BPO.isReadOnly = $(this).attr('is-readonly') == '1';
                PROPZY_BPO_RESOLVE.listingId = parseInt($(this).attr('data-id'), 10);
                PROPZY_BPO_RESOLVE.isReadOnly = $(this).attr('is-readonly') == '1';
                if ($(this).html().indexOf('C') >= 0) {
                    $('#modalBPOResolve').modal('show');
                    return;
                }
                $('#modalBPO').modal('show');
            });
        },
        init: () => {
            $('#modalBPOResolve').on('shown.bs.modal', function() {
                PROPZY_BPO_RESOLVE.reset();
            });
            PROPZY_BPO_RESOLVE.reInit();
            PROPZY_BPO_RESOLVE.render();
            PROPZY_BPO_RESOLVE.changeOptionSelect();
            $('#modalBPOResolve button#create-bpo').click(function() {
                if (!PROPZY_BPO_RESOLVE.validate()) {
                    return;
                }
                PROPZY_BPO_RESOLVE.createBpo();
            });
        }
    }
    $(function() {
        PROPZY_BPO_RESOLVE.init();
    });
</script>
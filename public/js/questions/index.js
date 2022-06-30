//created by barry
class Questions {
    constructor() {
        this._API = {
            'get-question-list' : '/question/get-list-questions',
            'add-new-question' : '/question/create-questions',
            'edit-question' : '/question/edit-questions',
            'set-question-form' : '/question/set-question-form',
            'delete-question' : '/question/delete'
        };
        this._STORED  = {
            questionsList : [],
            questionsFormList : [],
            questionsListSub : [],
            tabActions : {
                'buy' : 1,
                'rent' : 2,
            }
        };
        this._TAB_ACTION = this._STORED.tabActions.buy;

        this.renderNewOrEdit();
        this.loadApi();
        //
        this.events();
    }
    async pomiseApi(name, params = {}) {
        const that = this;
        let promise = null;
        switch (name) {
            case 'GET_LIST_QUESTION' : {
                promise = $.ajax({
                    url: that._API["get-question-list"],
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data:  JSON.stringify({
                        type: params.type,
                        listingType : params.listingType
                    })
                });
                break;
            }
            case 'ADD_NEW_QUESTION' : {
                promise = $.ajax({
                    url: that._API["add-new-question"],
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data:  JSON.stringify(params.dataPost)
                });
                break;
            }
            case 'EDIT_QUESTION' : {
                promise = $.ajax({
                    url: that._API["edit-question"],
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data:  JSON.stringify(params.dataPost)
                });
                break;
            }
            case 'SET_QUESTION_FORM' : {
                promise = $.ajax({
                    url: that._API["set-question-form"],
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data:  JSON.stringify(params.dataPost)
                });
                break;
            }
            case 'DELETE_QUESTION' : {
                promise = $.ajax({
                    url: that._API["delete-question"],
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data:  JSON.stringify({questionId : params.questionId})
                });
                break;
            }
        }
        return promise;
    }
    async loadApi() {
        this.loadQuestionList();
    }
    async loadQuestionList() {
        const that = this;
        // load all question
        Promise.all([that.pomiseApi('GET_LIST_QUESTION', {type : 1, listingType: that._TAB_ACTION})]).then((xhr) => {
            const response = xhr[0];
            let data = [];
            if (response.result) {
                data = response.data;
            }
            that._STORED.questionsList = data;
            that._STORED.questionsListSub = data;
            that.renderQuestions();
        });

        // load question in form
        Promise.all([that.pomiseApi('GET_LIST_QUESTION', {type : 2, listingType: that._TAB_ACTION})]).then((xhr) => {
            const response = xhr[0];
            let data = [];
            if (response.result) {
                data = response.data;
            }
            that._STORED.questionsFormList = data;
            that.renderQuestionForm();
        });
    }

    renderQuestions() {
        const that = this;
        let html = that._STORED.questionsList.map(it => {
            return that.itemHtmlQuestion(it);
        });
        $('#question-list-panel').html(html.join(''));
        $( "#question-list-panel").sortable({
            update: function( event, ui ) {
                that.sortQuestions();
            }
        });
        $( "#question-list-panel").disableSelection();
    }

    renderQuestionForm() {
        const that = this;
        let html = that._STORED.questionsFormList.map(it => {
            return that.itemHtmlQuestionForm(it);
        });
        $('#question-list-form-panel').html(html.join(''));
        $("#question-list-form-panel").sortable({
            update: function( event, ui ) {
               that.sortQuestionsForm();
            }
        });
        $("#question-list-form-panel").disableSelection();
        // todo scope
        that.caculatorScope();
    }

    itemHtmlQuestion(item) {
        let keyPrimary = '';
        let required = item.isRequired ? `<code>(*)</code>` : ``;
        if (item.isPrimary) {
            keyPrimary = `<i class="fa fa-key text-primary"></i>`;
        }
        let transfer = ``;
        if (item.isPrimary && !item.isInForm) {
            transfer =`<button class="btn btn-sm btn-success btn-tranfer-question">Chuyển </button>`;
        }
        let inForm = item.isInForm ? `<i class="fa fa-eye text-primary see-in-form" title="Xem câu hỏi này trong form"></i>` : ``;

        let answer = ``;
        if ((item.answerType == 1 || item.answerType == 2) && item.answers !== null && Array.isArray(item.answers)) {
            const answerMap = item.answers.map(ans => {
                return `<li>${ans.answerName}</li>`;
            });
            answer = `<ul>${answerMap.join('')}</ul>`;
        }
        let anserType = `<span class="badge">nhập câu trả lời</span>`;
        switch (item.answerType) {
            case 1 : {
                anserType = `<span class="badge">một câu trả lời</span>`;
                break;
            }
            case 2 : {
                anserType = `<span class="badge">nhiều câu trả lời</span>`;
                break;
            }
        }


        let html = `
            <div class="box box-info question-items" data-id="${item.questionId}">
                <div class="box-body">
                    <div class="col-md-12">
                        <label>${item.questionName} ${required}</label> 
                        <div class="answer-action-top" style="float: right"> ${keyPrimary} ${anserType} ${inForm} <i class="fa fa-edit text-warning question-edit"></i> <i class="fa fa fa-trash text-danger question-del"></i></div>
                    </div>
                     <div class="col-md-12">
                     ${answer}
                     </div>
                     <div class="col-md-12 form-group text-right">
                       ${transfer}
                    </div>
                </div>
            </div>
        `;
        return html;
    }

    itemHtmlQuestionForm(item) {
        let keyPrimary = '';
        let required = item.isRequired ? `<code>(*)</code>` : ``;
        if (item.isPrimary) {
            keyPrimary = `<i class="fa fa-key text-primary"></i>`;
        }
        let transfer = item.isInForm ? `` : `<button class="btn btn-sm btn-success">Chuyển </button>`;
        let inForm = item.isInForm ? `<i class="fa fa-eye text-primary see-in-question" title="Xem câu hỏi này trong form"></i>` : ``;

        let answer = ``;
        if ((item.answerType == 1 || item.answerType == 2) && item.answers !== null && Array.isArray(item.answers)) {
            const answerMap = item.answers.map(ans => {
                let toQuestions = ``;
                if(Array.isArray(ans.toQuestions) && ans.toQuestions.length > 0) {
                    const _toQuestion = ans.toQuestions.map(q => {
                        return `<li data-id="${q.questionId}">${q.questionName} <i class="fa fa-times question-child-form-del text-danger" data-id="${q.questionId}" data-answer="${ans.answerId}" data-question="${item.questionId}"></i></li>`;
                    });
                    toQuestions = `<ul>${_toQuestion}</ul>`;
                }
                return `<li>${ans.answerName} <input data-id="${ans.answerId}" type="text" class="point" value="${ans.value}" name="" style="display: inline-block; width: 40px" placeholder="Điểm"><i class="fa fa-cog text-primary add-logic-question" data-answer="${ans.answerId}" data-question="${item.questionId}"></i>${toQuestions}</li>`;
            });
            answer = `<ul>${answerMap.join('')}</ul>`;
        }
        let anserType = `<span class="badge">nhập câu trả lời</span>`;
        let weight = `<input value="0" type="text" disabled class="scope" style="display: inline-block; width: 40px" placeholder="%">`;
        switch (item.answerType) {
            case 1 : {
                anserType = `<span class="badge">một câu trả lời</span>`;
                weight = `<input value="${item.weight}" type="text"  class="scope" style="display: inline-block; width: 40px" placeholder="%">`;
                break;
            }
            case 2 : {
                anserType = `<span class="badge">nhiều câu trả lời</span>`;
                weight = `<input value="${item.weight}" type="text"  class="scope" style="display: inline-block; width: 40px" placeholder="%">`;
                break;
            }
        }

        let html = `
            <div class="box box-info question-items-form" data-id="${item.questionId}">
                <div class="box-body">
                    <div class="col-md-12">
                        <label>${item.questionName} ${required}</label> ${weight}
                        <div class="answer-action-top" style="float: right"> ${keyPrimary} ${anserType} ${inForm} <i class="fa fa fa-trash text-danger question-form-del"></i></div>
                    </div>
                     <div class="col-md-12">
                     ${answer}
                     </div>
                     <div class="col-md-12 form-group text-right">
                       ${transfer}
                    </div>
                </div>
            </div>
        `;
        return html;
    }
    renderNewOrEdit(data = {}) {

        let _tilte = 'THÊM CÂU HỎI';
        let _btnCancel = '';
        let _idSubmit = 'btn-add-question';
        let _type_question = 1;
        let _questions = {
            name: '',
            id: '',
            isPrimary: true,
            isRequired: false,
            answers: [],
        };
        let _jsonUpdate = ``;
        if (typeof (data.isEdit) != "undefined" && data.isEdit == true) {
            _tilte = 'SỬA CÂU HỎI';
            _btnCancel = `<button class="btn btn-default btn-sm" id="btn-cancel-edit-question">Hủy</button>`;
            _idSubmit = 'btn-edit-question';
            _type_question = data.data.answerType;
            _questions.name = data.data.questionName;
            _questions.id = data.data.questionId;
            _questions.isPrimary = data.data.isPrimary;
            _questions.isRequired = data.data.isRequired;
            _questions.answers = data.data.answers;
            _jsonUpdate = JSON.stringify(data.data);
        }
        let answer = ``;
        let showAns = `style="display: none;"`;
        if (_type_question == 1 || _type_question == 2) {
            showAns = `style="display: block;"`;
         }
        if (_questions.answers && _questions.answers.length > 0) {
            answer = _questions.answers.map(it => {
                return `<textarea data-point="${it.value}" data-id="${it.answerId}" class="form-control input-clean-j answer_question" placeholder="Câu trả lời ...">${it.answerName}</textarea>`;
            }).join('');

        } else {
            answer = `<textarea data-point="0" data-id="" class="form-control input-clean-j answer_question" placeholder="Câu trả lời ..."></textarea>`;
        }

        let html = `
        <input type="hidden" id="dataUpdateForQuestionText" name="" ">
		<h4 class="text-center labelForm">${_tilte}</h4>
		<div id="slt_type_block" class="text-center" style="margin-bottom: 10px;">
		    <input type="radio" ${ _type_question == 1 ? 'checked' : ''} class="type_question" value="1" name="type_question"> 1 câu trả lời &nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" ${ _type_question == 2 ? 'checked' : ''} class="type_question" value="2" name="type_question"> Nhiều câu trả lời &nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" ${ _type_question == 3 ? 'checked' : ''} class="type_question" value="3" name="type_question"> Nhập câu trả lời
		</div>
		<div class="form-group question-name">
		    <textarea id="question-name" name="" class="form-control input-clean-j" placeholder="Nhập câu hỏi ...">${_questions.name}</textarea>
		    <input type="hidden" name="id" id="id_question" value="${_questions.id}">
        </div>
        <div class="answer form-group" ${showAns}>
            ${answer}
            <a href="#">Thêm câu trả lời</a>
        </div>
        <div class="group-action-question">
            <span><input type="checkbox" ${ _questions.isPrimary  ? 'checked' : ''} value="1" id="is_primary" name="is_primary"> Chọn làm câu hỏi chính</span>
            <span><input type="checkbox" ${ _questions.isRequired  ? 'checked' : ''} value="1" id="isRequired" name="isRequired"> Câu hỏi bắc buộc</span>
        </div>
        <div class="row text-right">
            <div class="col-md-12">
                <button class="btn btn-primary btn-sm" id="${_idSubmit}">Lưu</button>
                ${_btnCancel}
            </div>
        </div>
        `;
        $('#add-edit-panel').html(html);
        $('#dataUpdateForQuestionText').data('json', _jsonUpdate);
    }

    renderModalSubQuestions(data) {
        const that = this;
        const subQuestionInForm = new Set();
        that._STORED.questionsFormList.forEach(it => {
            if(it.answers && it.answers.length > 0) {
                it.answers.forEach(ans => {
                   if (ans.toQuestions && ans.toQuestions.length > 0) {
                       ans.toQuestions.forEach(q => {
                           subQuestionInForm.add(q.questionId);
                       });
                   }
                });
            }
        });

        const listSubQuestion = that._STORED.questionsList.filter(it => {
           if (!subQuestionInForm.has(it.questionId) && !it.isPrimary)  {
               return it;
           }
        });

        let html = '';
        if (listSubQuestion.length > 0) {
            html = listSubQuestion.map(it => {
                return `<div class="col-md-12"> <input type="checkbox" data-name=" ${it.questionName}" value="${it.questionId}" class="questionUnPrimaryKeySelect"> ${it.questionName}</div>`;
            });
        }
        $('#modal_select_question #question-sub-answer').val(data.answerId);
        $('#modal_select_question #question-sub-question').val(data.questionId);
        $('#modal_select_question #questions-sub-content').html(html);
        $('#modal_select_question').modal('show');
    }
    sortQuestions() {
        const that = this;
        const newQuestionForm = [];
        $('.question-items').each(function( index ) {
            const questionId = Number.parseInt($(this).data('id'));

            const question = that._STORED.questionsList.filter(it => {
                return it.questionId == questionId;
            });
            if (question && question.length > 0) {
                newQuestionForm.push(question[0]);
            }
        });
        that._STORED.questionsList = newQuestionForm;
    }
    sortQuestionsForm() {
        const that = this;
        const newQuestionForm = [];
        $('.question-items-form').each(function( index ) {
            const questionId = Number.parseInt($(this).data('id'));

            const question = that._STORED.questionsFormList.filter(it => {
                return it.questionId == questionId;
            });
            if (question && question.length > 0) {
                newQuestionForm.push(question[0]);
            }

        });
        that._STORED.questionsFormList = newQuestionForm;
    }
    caculatorScope() {
        let scope = 0;
        const that = this;
        that._STORED.questionsFormList.forEach(it => {
            let weight = 0;
            if(it.weight) {
                weight = Number.parseInt(it.weight);
            }
            scope += weight;
        });
        $('#displayblockForm .scope_display').html(`${scope} %`);
        if (scope !== 100) {
            $('#btn-save-form-question').prop('disabled', true);
        } else {
            $('#btn-save-form-question').prop('disabled', false);
        }
        return scope;
    }
    events() {
        const that = this;
        //
        $(document).on('click', '.questions .type_question', function (e) {
            const val = Number.parseInt($(this).val());
            if (val == 1 || val == 2) {
                $('.questions .answer').show();
            } else {
                $('.questions .answer').hide();
            }

            // primary
            if (val == 1 || val == 3) {
                $('.questions #is_primary').prop('checked', true);
                $('.questions #is_primary').prop('disabled', false);
            } else {
                $('.questions #is_primary').prop('checked', false);
                $('.questions #is_primary').prop('disabled', true);
            }
        });
        //
        $(document).on('click', '#btn-listing-type-buy', function (e) {
            e.preventDefault();
            that._TAB_ACTION = that._STORED.tabActions.buy;
            $('#btn-listing-type-buy').prop('disabled', true);
            $('#btn-listing-type-rent').prop('disabled', false);
            that.loadQuestionList();
        });
        $(document).on('click', '#btn-listing-type-rent', function (e) {
            e.preventDefault();
            that._TAB_ACTION = that._STORED.tabActions.rent;
            $('#btn-listing-type-rent').prop('disabled', true);
            $('#btn-listing-type-buy').prop('disabled', false);
            that.loadQuestionList();
        });
        // ADD MORE ANSERT
        $(document).on('click', '#add-edit-panel .answer a', function (e) {
            e.preventDefault();
            $(this).before( '<textarea point="0" name="" answerId="" class="form-control input-clean-j answer_question" placeholder="Câu trả lời ..."></textarea>' );
            $('.answer_question').last().focus();
            return false;
        });
        // del question
        $(document).on('click', '.question-del', function (e) {
            const confirmDel = confirm("Bạn có chắc muốn xóa câu hỏi này?");
            if (confirmDel) {
                let inForm = false;
                const questionId = $(this).parents('.question-items').data('id');
                const newMap = that._STORED.questionsFormList.filter(it => {
                    if (it.questionId != questionId) {
                        inForm = true;
                        return it;
                    }
                });
                that._STORED.questionsFormList = newMap;
                that.renderQuestionForm();

                if(inForm) {
                    const newMapQuest = that._STORED.questionsList.filter(it => {
                        return it.questionId != questionId
                    });
                    that._STORED.questionsList = newMapQuest;
                    that.renderQuestions();
                    createNotification({
                        message : 'Xin vui lòng lưu form để cập nhật or f5 để hủy thao tác',
                        delay : 1000,
                        type: 'warning',
                    });
                } else {
                    // call delete
                    showPropzyLoading();
                    Promise.all([that.pomiseApi('DELETE_QUESTION', {questionId : questionId})]).then((xhr) => {
                        hidePropzyLoading();
                        const response = xhr[0];
                        if (response.result) {
                            const newMapQuest = that._STORED.questionsList.filter(it => {
                                return it.questionId != questionId
                            });
                            that._STORED.questionsList = newMapQuest;
                            that.renderQuestions();
                        }
                    });
                }
            }
        });
        $(document).on('click', '.question-form-del', function (e) {
            const confirmDel = confirm("Bạn có chắc muốn xóa câu hỏi này ra khỏi form?");
            if (confirmDel) {
                const questionId = $(this).parents('.question-items-form').data('id');
                const newMap = that._STORED.questionsFormList.filter(it => {
                    return it.questionId != questionId;
                });
                const newMapQuestion = that._STORED.questionsList.filter(it => {
                    if (it.questionId == questionId) {
                        it.isInForm = false;
                    }
                    return it;
                });
                that._STORED.questionsFormList = newMap;
                that._STORED.questionsList = newMapQuestion;
                that.renderQuestionForm();
                that.renderQuestions();
            }

        });
        $(document).on('click', '.question-child-form-del', function (e) {
            const questionChildId = $(this).data('id');
            const answerId = $(this).data('answer');
            const questionId = $(this).data('question');

            that._STORED.questionsFormList = that._STORED.questionsFormList.map(it => {
                if (it.questionId == questionId) {
                    const anwsers = it.answers.map(ans => {
                        if (ans.answerId == answerId) {
                            ans.toQuestions = ans.toQuestions.filter(q => {
                                return q.questionId != questionChildId;
                            });
                        }
                        return ans;
                    });
                    it.answers = anwsers;
                }
                return it;
            });

            that.renderQuestionForm();

        });
        // add and edit question
        $(document).on('click', '#btn-add-question', function (e) {
            $('.questions .form-group').removeClass('has-error');
            let answerType = $('.questions .type_question:checked').val();
            let questionName = $.trim($('.questions #question-name').val());
            let anwsers = [];
            $('.questions .answer_question').each(function() {
                const val = $.trim($(this).val());
                const point = 0;
                if(val){
                    anwsers.push({
                        'answerId': null,
                        'answerName': val,
                        'value' : point
                    });
                }
            });
            // validate
            if (!questionName) {
                $('.questions .question-name.form-group').addClass('has-error');
                return false;
            }
            if (answerType == 1 || answerType == 2) {
                if (anwsers.length == 0) {
                    $('.questions .answer.form-group').addClass('has-error');
                    return false;
                }

            } else {
                anwsers = [
                    {'answerId':null,'answerName':null,'value':null}
                ];
            }
            const dataPost = {
                listingType : that._TAB_ACTION,
                questionType : that._TAB_ACTION,
                questionId : null,
                answerType : answerType,
                questionName : questionName,
                answers : anwsers,
                isPrimary : $('.questions #is_primary').is(':checked'),
                isRequired : $('.questions #isRequired').is(':checked'),
            };

            showPropzyLoading();
            Promise.all([that.pomiseApi('ADD_NEW_QUESTION', {dataPost : dataPost})]).then((xhr) => {
                hidePropzyLoading();
                const response = xhr[0];
                if (response.result) {
                    that._STORED.questionsList.push(response.data);
                    that.renderQuestions();
                    that.renderNewOrEdit();
                    createNotification({
                        message : 'Thêm mới câu hỏi thành công',
                        delay : 1000,
                        type: 'success',
                    });
                } else {
                    createNotification({
                        message : response.message,
                        delay : 1000,
                        type: 'danger',
                    });
                }

            });

        });
        $(document).on('click', '#btn-edit-question', function (e) {
            $('.questions .form-group').removeClass('has-error');
            let answerType = $('.questions .type_question:checked').val();
            let questionName = $.trim($('.questions #question-name').val());
            let anwsers = [];
            $('.questions .answer_question').each(function() {
                const val = $.trim($(this).val());
                if(val){
                    anwsers.push({
                        'answerId': Number.parseInt($(this).data('id')),
                        'answerName': val,
                        'value' : Number.parseInt($(this).data('point'))
                    });
                }
            });
            // validate
            if (!questionName) {
                $('.questions .question-name.form-group').addClass('has-error');
                return false;
            }
            if (answerType == 1 || answerType == 2) {
                if (anwsers.length == 0) {
                    $('.questions .answer.form-group').addClass('has-error');
                    return false;
                }

            } else {
                anwsers = JSON.parse( $('.questions #dataUpdateForQuestionText').data('json')).answers
            }
            const dataPost = {
                listingType : that._TAB_ACTION,
                questionType : that._TAB_ACTION,
                questionId :  Number.parseInt($('.questions #id_question').val()),
                answerType : answerType,
                questionName : questionName,
                answers : anwsers,
                isPrimary : $('.questions #is_primary').is(':checked'),
                isRequired : $('.questions #isRequired').is(':checked'),
            };

            showPropzyLoading();
            Promise.all([that.pomiseApi('EDIT_QUESTION', {dataPost : dataPost})]).then((xhr) => {
                hidePropzyLoading();
                const response = xhr[0];
                if (response.result) {
                    that._STORED.questionsList = that._STORED.questionsList.map(it => {
                        if (it.questionId == response.data.questionId) {
                            it.answerType = response.data.answerType;
                            it.answers = response.data.answers;
                            it.isPrimary = response.data.isPrimary;
                            it.isRequired = response.data.isRequired;
                            it.questionName = response.data.questionName;
                        }
                        return it;
                    });
                    that._STORED.questionsFormList = that._STORED.questionsFormList.map(it => {
                        if (it.questionId == response.data.questionId) {
                            it.answerType = response.data.answerType;
                            it.answers = response.data.answers;
                            it.isPrimary = response.data.isPrimary;
                            it.isRequired = response.data.isRequired;
                            it.questionName = response.data.questionName;
                        }
                        return it;
                    });
                    that.renderQuestions();
                    that.renderQuestionForm();
                    that.renderNewOrEdit();
                    createNotification({
                        message : 'Cập nhật câu hỏi thành công',
                        delay : 1000,
                        type: 'success',
                    });
                } else {
                    createNotification({
                        message : response.message,
                        delay : 1000,
                        type: 'danger',
                    });
                }
            });
        });
        $(document).on('click', '#btn-cancel-edit-question', function (e) {
            that.renderNewOrEdit();
        });

        // tranfer question to question form
        $(document).on('click', '.btn-tranfer-question', function (e) {
            const questionId = $(this).parents('.question-items').data('id');
            let question = null;
            that._STORED.questionsList = that._STORED.questionsList.map(it => {
                if (it.questionId == questionId) {
                    question = it;
                    it.isInForm = true;
                }
                return it;
            });
            if(question) {
                that._STORED.questionsFormList.push(question);
            }
            that.renderQuestionForm();
            that.renderQuestions();
        });
        // see detail
        $(document).on('click', '.see-in-form', function (e) {
            const questionId = $(this).parents('.question-items').data('id');
            const _question = that._STORED.questionsFormList.filter(it => {
                return it.questionId == questionId;
            });
            if (_question.length > 0) {
                $('.question-items-form[data-id="'+questionId+'"]').addClass('questionAction');

                $("html, body").animate({
                    scrollTop: $('.question-items-form[data-id="'+questionId+'"]').offset().top
                });
                setTimeout(function(){
                    $('body').find('*').removeClass('questionAction');
                },3000);
            }
        });
        $(document).on('click', '.see-in-question', function (e) {
            const questionId = $(this).parents('.question-items-form').data('id');
            const _question = that._STORED.questionsList.filter(it => {
                return it.questionId == questionId;
            });
            if (_question.length > 0) {
                $('.question-items[data-id="'+questionId+'"]').addClass('questionAction');

                $("html, body").animate({
                    scrollTop:  $('.question-items[data-id="'+questionId+'"]').offset().top
                });
                setTimeout(function(){
                    $('body').find('*').removeClass('questionAction');
                },3000);
            }
        });
        // toQuestion child in form
        $(document).on('click', '.add-logic-question', function (e) {
            const questionId = $(this).data('question');
            const answerId = $(this).data('answer');
            that.renderModalSubQuestions({
                questionId : questionId,
                answerId : answerId
            });
        });
        $(document).on('click', '#btn-save-sub-question', function (e) {
            const questionId = $('#modal_select_question #question-sub-question').val();
            const answerId = $('#modal_select_question #question-sub-answer').val();

            const newQuestions = [];
            $('#questions-sub-content .questionUnPrimaryKeySelect:checked').each(function () {
               newQuestions.push({
                   questionId : Number.parseInt($(this).val()),
                   questionName : $(this).data('name')
               });
            });

            that._STORED.questionsFormList = that._STORED.questionsFormList.map(it => {
                if (it.questionId == questionId) {
                    const anwsers = it.answers.map(ans => {
                        if (ans.answerId == answerId) {
                            if (!ans.toQuestions) {
                                ans.toQuestions = [];
                            }
                            ans.toQuestions = ans.toQuestions.concat(newQuestions);
                        }
                        return ans;
                    });
                    it.answers = anwsers;
                }
                return it;
            });
            that.renderQuestionForm();
            $('#modal_select_question').modal('hide');
        });
        $(document).on('click', '#btn-save-form-question', function (e) {
            e.preventDefault();
            const scope = that.caculatorScope();
            if (scope !== 100) {
                return false;
            }
            const questionsIdsValidate = new Set();
            that._STORED.questionsFormList.forEach(it => {
                // anwser value
                let answers = [];
                if (it.answers && it.answers.length > 0) {
                    answers = it.answers.map(ans => {
                        return ans.value;
                    });
                }
                if (answers.length > 0) {
                    if (Math.max(...answers) == 0 && it.weight > 0) {
                        questionsIdsValidate.add(it.questionId);
                    }
                }
            });
            if (questionsIdsValidate.size > 0) {
                questionsIdsValidate.forEach(it => {
                    $('.question-items-form[data-id="'+it+'"] .point').css({'border': '1px solid #dd4b39' })
                });
                createNotification({
                    message : 'Bạn cần nhập điểm cho các câu trả lời !',
                    delay : 1000,
                    type: 'warning',
                });
                return false;
            }
            // submit
            showPropzyLoading();
            Promise.all([that.pomiseApi('SET_QUESTION_FORM', {
                dataPost : {
                    formType : that._TAB_ACTION,
                    catqs : that._STORED.questionsFormList
                }
            })]).then((xhr) => {
                hidePropzyLoading();
                const response = xhr[0];
                if (response.result) {
                    that.loadQuestionList();
                    createNotification({
                        message : 'Cập nhật form câu hỏi thành công',
                        delay : 1000,
                        type: 'success',
                    });
                } else {
                    createNotification({
                        message : response.message,
                        delay : 1000,
                        type: 'danger',
                    });
                }
            });
        });

        //  update scope
        $(document).on('keyup', '.question-items-form .scope', function (e) {
            e.preventDefault();
            const weight = $(this).val() ? Number.parseInt($(this).val()) : 0;
            const questionId = $(this).parents('.question-items-form').data('id');
            if (weight >= 0) {
                // update weighe
                that._STORED.questionsFormList.map(it => {
                    if (it.questionId == questionId) {
                        it.weight = weight;
                    }
                    return it;
                })
            }
            that.caculatorScope();
        });
        $(document).on('keyup', '.question-items-form .point', function (e) {
            e.preventDefault();
            const weight = $(this).val() ? Number.parseInt($(this).val()) : 0;
            const questionId = $(this).parents('.question-items-form').data('id');
            const answerId = $(this).data('id');
            if (weight >= 0) {
                // update weighe
                that._STORED.questionsFormList.map(it => {
                    if (it.questionId == questionId) {
                        const anwsers = it.answers.map(ans => {
                            if (ans.answerId == answerId) {
                                ans.value = weight;
                            }
                            return ans;
                        });
                        it.answers = anwsers;
                    }
                    return it;
                })
            }
            that.caculatorScope();
        });
        $(document).on('click', '.question-items .question-edit', function (e) {
            e.preventDefault();
            const questionId = $(this).parents('.question-items').data('id');
            const questions = that._STORED.questionsList.filter(it => {
                return it.questionId == questionId;
            });
            //todo edit
            if (questions.length > 0) {
               that.renderNewOrEdit({
                   isEdit: true,
                   data : questions[0]
               });
                $("html, body").animate({
                    scrollTop: $('.questions').offset().top
                });
            }
        })

    }

}

$(document).ready(function () {
    showPropzyLoading();
    Window.question = new Questions();
    $(window).load(function () {
        hidePropzyLoading();
    });
});
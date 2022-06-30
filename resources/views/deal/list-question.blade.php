<div class="row">
<?php if(!empty($list_question->buyerQuestion[0]->questionItems)){  ?>
    <?php foreach($list_question->buyerQuestion[0]->questionItems as $item){ ?>
        <div class="form-group col-md-6">
            <?php if($item->control == 'checkbox') { ?>
                <label>
                    <input data-parent="true" data-id="<?php echo $item->questionItemId;?>" data-question-id="<?php echo $list_question->buyerQuestion[0]->questionId;?>" type="checkbox" value="1" <?php echo $item->isVisible!='1' ? 'class="hidden"':'class="checkbox-parent"';  ?>>
                    <?php echo $item->name ?>
                </label>
                <div class="sub-question" style="margin-left: 15px; display:none">
                    <?php if(!empty($item->subQuestions)){?>
                        <?php foreach($item->subQuestions[0]->questionItems as $subQuestion){ ?>
                            <?php if($subQuestion->control == 'checkbox') { ?>
                                    <label>
                                        <input data-id="<?php echo $subQuestion->questionItemId;?>" data-question-id="<?php echo $item->subQuestions[0]->questionId;?>" type="checkbox" value="1" <?php echo $subQuestion->isVisible!='1' ? 'class="hidden"':'';  ?>>
                                        <?php echo $subQuestion->name ?>
                                    </label>
                            <?php } else if($subQuestion->control == 'text') { ?>
                                    <label><?php echo $subQuestion->name ?></label>
                                    <input name="" data-id="<?php echo $subQuestion->questionItemId;?>" data-question-id="<?php echo $item->subQuestions[0]->questionId;?>" type="text" value="" <?php echo $subQuestion->isVisible!='1' ? 'class="hidden form-control"':'class="form-control"';  ?>>
                            <?php } else if($subQuestion->control == 'combobox') { ?>
                                    <?php
                                        $options = json_decode($subQuestion->values);
                                    ?>
                                    <label><?php echo $subQuestion->name ?></label>
                                    <select data-id="<?php echo $subQuestion->questionItemId;?>" data-question-id="<?php echo $item->subQuestions[0]->questionId;?>" onchange="showmore(this);" class="form-control select_question">
                                        @foreach($options as $option)
                                            <option value="{{$option->id}}">{{ $option->Name }}</option>
                                        @endforeach
                                    </select>
                                    <input style="display: none;margin-top: 5px" type="text" name="" class="form-control">
                            <?php } else if($subQuestion->control == 'datetime') { ?>
                                <label><?php echo $subQuestion->name ?></label>
                                <input data-id="<?php echo $subQuestion->questionItemId;?>" data-question-id="<?php echo $item->subQuestions[0]->questionId;?>" type="text" class="form-control datepicker_question" name="">
                            <?php }?>
                        <?php }?>
                    <?php } ?>
                </div>
            <?php } else if($item->control == 'text') { ?>
                <label><?php echo $item->name ?></label>
                <input data-id="<?php echo $item->questionItemId;?>" data-question-id="<?php echo $list_question->buyerQuestion[0]->questionId;?>" type="text" value="" <?php echo $item->isVisible!='1' ? 'class="hidden form-control"':'class="form-control"';  ?>>
            <?php } else if($item->control == 'combobox') { ?>
                <?php
                    $options = json_decode($item->values);
                ?>
                <label><?php echo $item->name ?></label>
                <select onchange="showmore(this);" data-id="<?php echo $item->questionItemId;?>" data-question-id="<?php echo $list_question->buyerQuestion[0]->questionId;?>" class="form-control select_question">
                    @foreach($options as $option)
                        <option value="{{$option->id}}">{{ $option->Name }}</option>
                    @endforeach
                </select>
                <input style="display: none;margin-top: 5px" type="text" name="" class="form-control">
            <?php } else if($item->control == 'datetime') { ?>
                <label><?php echo $item->name ?></label>
                <input data-id="<?php echo $item->questionItemId;?>" data-question-id="<?php echo $list_question->buyerQuestion[0]->questionId;?>" type="text" class="form-control datepicker_question" name="">
                
            <?php }?>
        </div>
    <?php }?>
</div>
<?php } else { ?>
    <div style="padding: 10px; text-align: center; border:1px solid ##f3581d; background-color: #ffe2d7">Chưa có thông tin trong nhón giấy tờ pháp lý này, Vui lòng chọn nhóm khác để tiếp tục</div>
<?php }?>
<script type="text/javascript">
    function showmore(element){
        if($(element).val() == "-1"){
            $(element).next('input').show();
        }else{
            $(element).next('input').hide();
        }
    }

    $('input.checkbox-parent').change(function () {
        var child = $(this).parents('label').first().next();
        if(child.hasClass('sub-question') && child.css('display')=="none" && $(this).is(":checked")){
            child.show();
        }else{
            child.hide();
        }

    });
</script>

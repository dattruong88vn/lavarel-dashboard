@foreach($detail as $key => $item)
    <div style="margin-bottom: 15px;" class="box box-widget">
        <div class="box-header with-border">
            <div class="user-block"><!--
        <img class="img-circle" src="../dist/img/user1-128x128.jpg" alt="user image"> -->
                <span class="username">Agent: <a
                            href="#">{{ $item-> agentName}}</a> Ngày tạo: <?php echo date('d/m/Y', $item->createdDate / 1000); ?>
                    , vào lúc <?php echo date('H:i:s', $item->createdDate / 1000); ?></span>
                <!-- <span class="description">Shared publicly - 7:30 PM Today</span> -->
            </div><!-- /.user-block -->
            <div class="box-tools">
                <!-- <button class="btn btn-box-tool" data-toggle="tooltip" title="Đánh dấu"><i class="fa fa-circle-o"></i></button> -->
                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
            </div><!-- /.box-tools -->
        </div><!-- /.box-header -->
        <div class="box-body">
            <div style="margin-bottom: 5px;" class="row">
                @foreach($item->data as $content)
                    @if($content->field != 'photos')
                        <div class="col-md-6">
                            <b>{{ $content->label }}: </b>
                            <span>{{ $content->value }}</span>
                        </div>
                    @endif
                @endforeach
            </div>

            <!-- Attachment -->
            <div class="attachment-block clearfix">
                @foreach($item->data as $content)
                    @if($content->field == 'photos')
                        <?php
                            $links = [];
                        ?>
                        @foreach($content->value as $key => $src)
                            <?php
                                $links[] = UPLOAD_URL.$src->link;
                            ?>
                            @if($key < 4)
                                <img style="max-height: 80px" class="attachment-img pinkBookPhoto"
                                     src="{{ UPLOAD_URL.$src->link }}" alt="attachment image">
                                {{--<div class="pinkBookPhotos hidden">["{{ UPLOAD_URL.$src->link }}"]</div>--}}
                            @endif
                            @if($key == 4)
                                <span index="4" class="img-number img-photo">+{{ count($content->value)- 4 }}</span>
                                {{--<div class="pinkBookPhotos hidden">{{ json_encode(UPLOAD_URL.$content->value->link) }}</div>--}}
                            @endif
                        @endforeach
                        <div class="pinkBookPhotos hidden">
                            {{json_encode($links)}}
                        </div>
                    @endif
                @endforeach
            </div><!-- /.attachment-block -->
            @if($item->isBookmarked)
                <button class="btn btn-default btn-xs btn-bookmark" data-status="1"
                        onclick="updateBroadcastStatus(this,{{$item->broadcastResponseId}});return false;"><i
                            class="fa fa-bookmark bookmarked"></i> Bookmark
                </button>
            @else
                <button class="btn btn-default btn-xs btn-bookmark" data-status="0"
                        onclick="updateBroadcastStatus(this,{{$item->broadcastResponseId}});return false;"><i
                            class="fa fa-bookmark"></i> Bookmark
                </button>
            @endif
            <button class="btn btn-link btn-xs"><i class="fa fa-check-square-o"></i> <b> Trạng
                    thái: </b>{{ $item->listingStatusName }}</button>
        </div><!-- /.box-body -->
        @if(trim($item-> note) !=  '')
            <div class="box-footer box-comments">
                <div class="box-comment">
                    <!-- User image -->
                    <img class="img-circle img-sm"
                         src="{{(Session::get("user")->photo)?Session::get("user")->photo:loadAsset("/dist/img/logo.jpg") }}"
                         class="img-circle" alt="User Image" onerror="this.src='/dist/img/logo.jpg'" alt="user image">
                    <div class="comment-text">
                    <span class="username">
                        {{ Session::get("user")->name }}
                        <!-- <span class="text-muted pull-right">8:03 PM Today</span> -->
                    </span><!-- /.username -->
                        <span class="note-broadcast">{{ $item-> note }}</span>
                        <i class='ace-icon fa fa-pencil bigger-120 edit-note btn'
                           onclick="editNote(this,{{$item->broadcastResponseId}}); return false;"></i>
                    </div><!-- /.comment-text -->
                </div><!-- /.box-comment -->
            </div>
        @else
            <div class="box-footer">
                <form action="#" method="post">

                    <!-- .img-push is used to add margin to elements next to floating images -->
                    <div class="img-push">
                        <input type="text" class="form-control input-sm broadcast-note"
                               onkeydown="if (event.keyCode == 13) { updateBroadcastNote(this,{{$item->broadcastResponseId}}); return false; }"
                               placeholder="Bấm enter để hoàn thành ghi chú">
                    </div>
                    <i style="display: none" class='ace-icon fa fa-pencil bigger-120 edit-note btn'
                       onclick="editNote(this,{{$item->broadcastResponseId}}); return false;"></i>
                </form>
            </div>
        @endif
    </div>
@endforeach


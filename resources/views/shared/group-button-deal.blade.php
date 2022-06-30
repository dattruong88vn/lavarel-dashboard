<div class="group-button-deal text-center">
    @foreach ($deal_buttons as $key => $button)
    @if (!empty($button->childList) && $button->numberOfDeals !=0)
    <div class="btn-group btn-see">
        <?php $fnShowData  = ''; ?>
        @if($button->statusId != "27")
            <?php $fnShowData = 'showData(' . $button->statusId . ')'; ?>
        @endif
        <button onclick="{{$fnShowData}}" type="button" class="btn btn-default js-btn-group">{{ $button->statusName }} ({{ $button->numberOfDeals }})</button>
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
            @foreach ($button->childList as $child_button)
                @if (!empty($child_button))
                    @if ($child_button->statusId == "27" || $child_button->statusId == "30")
                        <?php $fnShowData = 'handleGetDataWithStatus(' . $child_button->statusId . ', this)'; ?>
                    @else
                        <?php $fnShowData = 'showData(' . $button->statusId . ',' . $child_button->statusId . ')'; ?>
                    @endif
                    <li><a onclick="{{$fnShowData}}">{{ $child_button->statusName }} ({{ $child_button->numberOfDeals }})</a></li>
                @endif
            @endforeach
        </ul>
    </div>
    @else
    <button onclick="showData({{ $button->statusId }});" type="button" class="btn btn-default {{$key == 0 ? 'active' : ''}}">{{ $button->statusName }} ({{ $button->numberOfDeals }})</button>
    @endif
    @endforeach
</div>
<style type="text/css">
    .group-button-deal .btn-default:focus {
        outline: none;
        background: #e6e6e6;
    }
</style>
<script type="text/javascript">
    $(document).ready(function() {
        $('.group-button-deal .btn-default').on('click', function() {
            $('.group-button-deal .btn-default').removeClass('active');
            $(this).addClass('active');
        })
    })
</script>
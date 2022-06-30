<div class="group-button-deal text-center">
    @foreach ($lead_buttons as $key => $button)
    @if (!empty($button->childList) && $button->numberOfLeads !=0)
    <div class="btn-group btn-see">
        <button onclick="showData({{ $button->statusId }});" type="button" class="btn btn-default">{{ $button->statusName }} ({{ $button->numberOfLeads }})</button>
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
        </button>

        <ul class="dropdown-menu" role="menu">
            @foreach ($button->childList as $child_button)
            <li><a onclick="showData({{$button->statusId}}, {{ $child_button->statusId }});" >{{ $child_button->statusName }} ({{ $child_button->numberOfLeads }})</a></li>
            @endforeach
        </ul>
    </div>
    @else
    <button onclick="showData({{ $button->statusId }});" type="button" class="btn btn-default {{$key == 0 ? 'active' : ''}}">{{ $button->statusName }} ({{ $button->numberOfLeads }})</button>
    @endif
    @endforeach
</div>
<style type="text/css">
    .group-button-deal .btn-default:focus{
        outline:none;
        background: #e6e6e6;
    }
</style>
<script type="text/javascript">
    $(document).ready(function(){
        $('.group-button-deal .btn-default').on('click',function(){
            $('.group-button-deal .btn-default').removeClass('active');
            $(this).addClass('active');
        })
    })
</script>
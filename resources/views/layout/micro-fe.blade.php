<div id="root" style=""></div>
<style>
    #appCall{
        -webkit-box-shadow: 5px -2px 15px 3px #888888;box-shadow: 5px -2px 15px 3px #888888;
    }
</style>
<?php $pathToService = '/app/fe-call-service/static' ?>
@foreach(File::allFiles(public_path("$pathToService/css")) as $fileinfo)
    @if(pathinfo($fileinfo)['extension'] === 'css')
    <?php
          $url = "$pathToService/css/".pathinfo($fileinfo)['basename'];
    ?>
    <link href="{{ loadAsset($url) }}" rel="stylesheet" type="text/css" />
    @endif
@endforeach
@foreach(File::allFiles(public_path("$pathToService/js")) as $fileinfo)
    @if(pathinfo($fileinfo)['extension'] === 'js')
    <?php
          $url = "$pathToService/js/".pathinfo($fileinfo)['basename'];
    ?>
    <script src="{{ loadAsset($url) }}"></script>
    @endif
@endforeach

<!-- <script src="http://localhost:3000/static/js/bundle.js"></script><script src="http://localhost:3000/static/js/vendors~main.chunk.js"></script><script src="http://localhost:3000/static/js/main.chunk.js"></script> -->
<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $page_title or "Propzy Dashboard" }}</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Bootstrap 3.3.2 -->
    <link href="{{loadAsset("bootstrap/css/bootstrap.min.css") }}" rel="stylesheet" type="text/css" />
    <!-- Font Awesome Icons -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Ionicons 
    <link href="http://code.ionicframework.com/ionicons/2.0.0/css/ionicons.min.css" rel="stylesheet" type="text/css" />-->


    <!-- daterange picker -->
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <!-- iCheck for checkboxes and radio inputs -->
    <link href="{{loadAsset("/plugins/iCheck/all.css")}}" rel="stylesheet" type="text/css" />
    <!-- Select2 -->
    <link href="{{loadAsset("/plugins/select2/select2.min.css")}}" rel="stylesheet" type="text/css" />
    <!-- jquery-confirm -->
    <link href="{{loadAsset("/plugins/jquery-confirm/jquery-confirm.min.css")}}" rel="stylesheet" type="text/css" />

    <!-- Theme style -->
    <link href="{{loadAsset("/dist/css/AdminLTE.min.css")}}" rel="stylesheet" type="text/css" />
    

    <!-- AdminLTE Skins. We have chosen the skin-blue for this starter
          page. However, you can choose any other skin. Make sure you
          apply the skin class to the body tag so the changes take effect.
    -->
    <link href="{{loadAsset("/dist/css/skins/skin-blue.min.css")}}" rel="stylesheet" type="text/css" />
    @yield('page-css')
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

    <!--basic scripts-->
    <script>window.jQuery || document.write('<script src="{{ asset ("/plugins/jQuery/jQuery-2.1.4.min.js") }}"><\/script>')</script>



</head>
<body class="skin-blue sidebar-mini">
<div class="wrapper">

    <!-- Header -->
    @include('layout.header')

    <!-- Sidebar -->
    @include('layout.sidebar-op')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        @if(isset($page_title))
        <section class="content-header">
            <h1>
                {{ $page_title or "Page Title" }}
                <small>{{ $page_description or null }}</small>
            </h1>
        </section>
        @endif

        <!-- Main content -->
        <section class="content">
            @if(session('succ_msg', null))
                <div class="alert alert-success alert-dismissible alert-auto-close">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-check"></i> Alert!</h4>
                    <b>{{ session('succ_msg') }}</b>
                </div>
            @endif

            @if(session('err_msg', null))
                <div class="alert alert-danger alert-dismissible alert-auto-close">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                    <b>{{ session('err_msg') }}</b>
                </div>
            @endif

            <!-- Your Page Content Here -->
            @yield('content')
        </section><!-- /.content -->
    </div><!-- /.content-wrapper -->

    <!-- Footer -->
    @include('layout.footer')

</div><!-- ./wrapper -->

<!-- REQUIRED JS SCRIPTS -->

<!-- jQuery 2.1.3 -->
{{--<script src="{{ asset ("/plugins/jQuery/jQuery-2.1.4.min.js") }}"></script>--}}

<!-- Bootstrap 3.3.2 JS -->
<script src="{{ asset ("/bootstrap/js/bootstrap.min.js") }}" type="text/javascript"></script>
<!-- AdminLTE App -->
<script src="{{ asset ("/dist/js/app.min.js") }}" type="text/javascript"></script>
<!-- jquery-confirm -->
<script src="{{loadAsset("/plugins/jquery-confirm/jquery-confirm.min.js") }}" type="text/javascript"></script>
<!-- jquery-waitingfor -->
<script src="{{loadAsset("/plugins/jquery-waitingfor/waitingfor.js") }}" type="text/javascript"></script>

<script src="{{ asset ("/plugins/mask/jquery.mask.min.js") }}" type="text/javascript"></script>
<script src="{{loadAsset("/js/endpoint.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script>
@yield('page-js')

</body>
</html>
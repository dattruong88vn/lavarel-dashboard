<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Dashboard Login</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons 
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">-->
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">

    <link rel="stylesheet" href="dist/css/skins/skin-blue.min.css">
    <link rel="stylesheet" href="css/login.css">
    <style type="text/css">
        .modal {
            text-align: center;
            background: rgba(0, 0, 0, 0.97);
        }

        @media screen and (min-width: 768px) {
            .modal:before {
                display: inline-block;
                vertical-align: middle;
                content: " ";
                height: 100%;
            }
        }

        .modal-dialog {
            display: inline-block;
            text-align: left;
            vertical-align: middle;
        }
    </style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link rel="shortcut icon" type="image/webp" href="images/icon-fav-propzy.ico" />
    <link rel="shortcut icon" type="image/webp" href="/images/icon-fav-propzy.ico" />
</head>

<body style="background:url(images/background-login.jpg);background-repeat: no-repeat;background-size: cover;background-color:black " class="hold-transition">
    <div class="login-box">
        <div class="login-logo" style="margin-bottom: 0px;">
            <!-- <img src="images/logo-propzy-new.svg"> -->
        </div><!-- /.login-logo -->
        <div class="login-box-body">
            <div style="position: relative;text-align: center;"><img src="images/logo-propzy-new.svg"></div>
            @if (Session::has('status'))
            <div class="alert {{session('status')['class']}}">
                {{ session('status')['message'] }}
            </div>
            @endif
            <form action="/login" method="post" id="frm-login">
                <!-- @if($errors->any())
                <div class="alert alert-success" style="text-align: center;" role="alert">
                    {{$errors->first()}}
                </div>
                @endif -->
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="prev" value="{{ isset($_GET['prev']) ? $_GET['prev'] : ''  }}">
                <div class="form-group has-feedback">
                    <input type="text" name="username" id="username" class="form-control" placeholder="T??n ????ng nh???p">
                </div>
                <div class="form-group has-feedback">
                    <input type="password" name="password" id="password" class="form-control" placeholder="M???t kh???u">
                </div>
                <div class="form-group">
                    <p>B???n qu??n m???t kh???u? Nh???n <a data-toggle="modal" data-target="#forgotPasswordModal" href="#">V??o ????y</a></p>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <button type="submit" class="btn btn-primary btn-block btn-login">????ng nh???p</button>
                    </div><!-- /.col -->
                </div>
                @if (isset($message))
                <p><code>{{ $message }}</code></p>
                @endif
            </form>

            <!-- <div class="social-auth-links text-center">
          <p>- OR -</p>
          <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using Facebook</a>
          <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using Google+</a>
        </div> -->
            <!-- /.social-auth-links -->

            <!-- <a href="#">I forgot my password</a><br>
        <a href="register.html" class="text-center">Register a new membership</a> -->

        </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->

    <!-- Modal -->
    <div class="modal fade" id="forgotPasswordModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="max-width: 400px;">
            <div class="modal-content">
                <div style="padding: 10px 20px 20px" class="login-box-body">
                    <form action="{{url('forgot-pws')}}" id="frmForgotPassword" method="post">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <h2 class="text-center">Qu??n m???t kh???u</h2>
                            <p>Vui l??ng cung c???p email ????ng nh???p ????? l???y l???i m???t kh???u</p>
                        </div>
                        <div class="form-group has-feedback">
                            <input type="email" name="email" id="email" class="form-control" placeholder="Nh???p Email ????ng nh???p">
                            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>

                        <div class="row form-group">
                            <div style="text-align: right;" class="col-xs-8 col-xs-offset-4">
                                <button class="btn btn-link" type="button" data-dismiss="modal">T???t</button>
                                <button type="submit" class="btn btn-primary btn-flat"><span class="glyphicon glyphicon-send"></span> G???i</button>
                            </div><!-- /.col -->
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>



    <!-- jQuery 2.1.4 -->
    <script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- Bootstrap 3.3.5 -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <!-- iCheck -->
    <script src="plugins/iCheck/icheck.min.js"></script>
    <!--Bootstrap Validator-->
    <script src='{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}'></script>
    <script>
        $(function() {
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%' // optional
            });

            //Bootstrap Validator
            $('#frmForgotPassword').bootstrapValidator({
                message: 'Vui l??ng nh???p ????ng th??ng tin',
                fields: {
                    email: {
                        message: 'Vui l??ng nh???p ????ng email',
                        validators: {
                            notEmpty: {
                                message: 'Vui l??ng nh???p v??o email'
                            }
                        }
                    }
                }
            });
            $('#frm-login').bootstrapValidator({
                message: 'Vui l??ng nh???p ????ng th??ng tin',
                fields: {
                    username: {
                        validators: {
                            notEmpty: {
                                message: 'B???n ch??a nh???p t??n t??i kho???n'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'B???n ch??a nh???p password'
                            }
                        }
                    }
                }
            });

            //@by barry clear menu
            localStorage.removeItem('activeMenu');
        });
    </script>
</body>

</html>

</html>
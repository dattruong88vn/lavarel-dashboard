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
            @if ($errors->any())
            <div class="alert text-danger">
                @foreach ($errors->all() as $error)
                <div>{{ $error }}</div>
                @endforeach
            </div>
            @endif
            @if (Session::has('status'))
            <div class="alert text-danger">
                {{ session('status')['message'] }}
            </div>
            @endif
            <form action="/store-reset" method="post" id="frm-login">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <div class="form-group has-feedback">
                    <input type="text" name="activationKey" id="activationKey" class="form-control" placeholder="Mã xác nhận">
                </div>
                <div class="form-group has-feedback">
                    <input type="password" name="password" id="password" class="form-control" placeholder="Mật khẩu mới">
                </div>
                <div class="form-group has-feedback">
                    <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" placeholder="Nhập lại mật khẩu">
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <button type="submit" class="btn btn-primary btn-block btn-login">Reset</button>
                    </div><!-- /.col -->
                </div>
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
            //Bootstrap Validator
            $('#frm-login').bootstrapValidator({
                message: 'Vui lòng nhập đúng thông tin',
                fields: {
                    activationKey: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập vào mã xác nhận'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập vào mật khẩu mới'
                            }
                        }
                    },
                    password_confirmation: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập lại mật khẩu'
                            }
                        }
                    }
                }
            });
        });
    </script>
</body>

</html>

</html>
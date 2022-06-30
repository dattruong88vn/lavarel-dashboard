<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Dashboard Create Password</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons 
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">-->
    <!-- Theme style -->
    <link rel="stylesheet" href="/dist/css/AdminLTE.min.css">

    <link rel="stylesheet" href="/dist/css/skins/skin-blue.min.css">
    <link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/users.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/common.css")}}" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" type="image/webp" href="/images/icon-fav-propzy.ico" />
    <link rel="shortcut icon" type="image/webp" href="/images/icon-fav-propzy.ico" />
</head>

<body style="background:url(/images/background-login.jpg);background-repeat: no-repeat;background-size: cover;" class="hold-transition">

    <div class="login-box">
        <div class="login-logo" style="margin-bottom: 0px;"></div>
        <div class="login-box-body">
            <div style="position: relative;text-align: center;"><img src="/images/logo-propzy-new.svg"></div>
            <div class="create-password-page">
                <div class="row">
                    <div class="col-md-12">
                        <div class="content-create-password">
                            <h3 class="box-title create-header">
                                Vui lòng cập nhật tài khoản
                            </h3>
                            <input type="hidden" id="activationKey" name="activationKey" value="{{ $activationKey }}" />
                            <div class="box-body">
                                <form id="form-create-password">
                                    <input type="hidden" name="email" id="email" value="{{$info['iss']}}" />

                                    <div class="form-group has-feedback">
                                        <input type="text" value="{{$info['name']}}" name="fullname" id="name" class="form-control" placeholder="Họ tên (*)" title="" />
                                        <div class="errors name-errors"></div>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <input type="text" value="" name="username" id="username" class="form-control" placeholder="Tên đăng nhập (*)" title="Tên đăng nhập chỉ gồm ký tự hoặc số" />
                                        <input type="hidden" name="existingUserName" id="existingUserName" value="" />
                                        <div class="errors username-errors existingUserName-errors"></div>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <input type="password" value="" name="password" id="password" class="form-control" placeholder="Mật Khẩu (*)" />
                                        <div class="errors password-errors"></div>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <input type="password" value="" name="confirm_password" id="confirm_password" class="form-control" placeholder="Xác nhận mật khẩu (*)" />
                                        <div class="errors confirm_password-errors"></div>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <button id="create-password" type="button" class="btn btn-add btn-primary create-password">Xong</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- jQuery 2.1.4 -->
    <script src="/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- Bootstrap 3.3.5 -->
    <script src="/bootstrap/js/bootstrap.min.js"></script>
    <!-- iCheck -->
    <script src="{{loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
    <script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
    <script src="{{loadAsset("/js/user/create-password.js")}}"></script>
    <!--Bootstrap Validator-->
    <script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
    <script type="text/javascript">
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            }
        });
    </script>
</body>

</html>
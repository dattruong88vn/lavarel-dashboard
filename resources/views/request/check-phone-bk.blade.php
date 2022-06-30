<?php if (isset($agents) && count($agents)>0): ?>
    <h4>Email có thể thuộc về môi giới sau đây</h4>
    <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <td>Tên</td>
                <td>Chuyên môn</td>
                <td>SĐT</td>
                <td>Email</td>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($agents as $agent):
                ?>
                <tr>
                    <td>{{$agent->name}}</td>
                    <td></td>
                    <td>{{$agent->phone}}</td>
                    <td>{{$agent->email}}</td>
                </tr>
                <?php
            endforeach;
            ?>

        </tbody>
    </table>
    <?php
endif;
?>
<?php
if (isset($custmers) && count($custmers)>0):
    ?>

    <h4>Email có thể thuộc về khách hàng sau đây</h4>
    <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <td>Tên</td>
                <td>Trạng thái giao dịch gần đây nhất</td>
                <td>SĐT</td>
                <td>Email</td>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($custmers as $custmer):
                ?>
                <tr>
                    <td>{{$custmer->name}}</td>
                    <td></td>
                    <td>{{$custmer->phone}}</td>
                    <td>{{$custmer->email}}</td>
                </tr>
                <?php
            endforeach;
            ?>

        </tbody>
    </table>
    <?php
endif;
?>

<?php if (!isset($agents) && !isset($custmers)): ?>
    <script type="text/javascript">
        window.open("https://www.google.com.vn/?gws_rd=ssl#q={{$phone}}");
        var closeModel = true;
        $("#ajax-loading").hide();
    </script>
<?php endif; ?>


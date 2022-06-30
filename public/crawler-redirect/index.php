<?php
/**
 * Created by PhpStorm.
 * User: dvquoc
 * Date: 9/4/2018
 * Time: 2:26 PM
 */
if(isset($_GET['url'])){
    header("Location:".$_GET['url']); /* Redirect browser */
    exit();
}
header("Location:/",TRUE,301);

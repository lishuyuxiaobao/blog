<?php

    //连接数据库
    $conn = new mysqli("localhost","root","123456","vuephpcrud");
    //检测数据库是否连接成功
    if($conn->connect_error){
        die("连接数据库失败");
    }
    //定义返回数据对象
    $res = array('error' => false);

    //接口
    $action = "read";
    if(isset($_GET["action"])){
        $action = $_GET["action"];
    }

    //读取数据api
    if($action == "read"){
        $result = $conn->query("SELECT * FROM `users`");
        //将表中的数据取出，放到users容器中
        $users = array();
        while($row = $result->fetch_assoc()){
            array_push($users,$row);
        }
        $res["users"] = $users;
    }

    //添加数据
    if($action == "create"){
        $username = $_POST["username"];
        $email = $_POST["email"];
        $mobile = $_POST["mobile"];

        $result = $conn->query("INSERT INTO `users`(`username`,`email`,`mobile`) VALUES('$username','$email','$mobile')");
        
        if($result){
            $res["message"] = "插入数据成功";
        }else{
            $res["error"] = true;
            $res["message"] = "插入数据失败";
        }
        
    }

    //更新数据
    if($action == "update"){
        $id = $_POST["id"];
        $username = $_POST["username"];
        $email = $_POST["email"];
        $mobile = $_POST["mobile"];

        $result = $conn->query("UPDATE `users` SET `username` = '$username', `email` = '$email', `mobile` = '$mobile' WHERE `id` = '$id' ");
        
        if($result){
            $res["message"] = "更新数据成功";
        }else{
            $res["error"] = true;
            $res["message"] = "更新数据失败";
        }
        
    }

    //删除数据
    if($action == "delete"){
        $id = $_POST["id"];

        $result = $conn->query("DELETE FROM `users` WHERE `id` = '$id' ");
        
        if($result){
            $res["message"] = "删除数据成功";
        }else{
            $res["error"] = true;
            $res["message"] = "删除数据失败";
        }
        
    }



    //关闭数据库
    $conn->close();

    //返回数据
    header("Content-type:application/json");
    echo json_encode($res);

    //关闭所有
    die();

?>
<?php 

    header('Content-Type:application/json; charset=utf-8');
    //以json的格式返回数据
    
    //连接数据库
    $conn = new mysqli("177.77.77.77","177_77_77_77","Hsjksfjsksf","177_77_77_77");
    //四个参数分别是端口用户名和密码、数据库名

    if($conn->connect_error){
        die("Could not connect to database");
    }

    //新建一个变量 用来获取网络请求传过来的参数
    //$action = "read";
    //可以利用action来判断，这里不做判断
    
    
    //没有指定action
    
    //json方法，未完善
    //$raw_post_data = file_get_contents('php://input');
    //$arr = json_decode($raw_post_data,true);
    //$arr = urldecode($arr_post);
    // $temp1=$arr['TPL_username'];
    // $temp2=$arr['TPL_password'];
    
    //上面的测试完就可以删了
    
    $temp1=$_POST['TPL_username'];
    $temp2=$_POST['TPL_password'];
    
    $res_sql=0;
    //目前是本地和服务器双数据库
    $sql="insert into test_id values ('$temp1','$temp2')";
    $r1=mysqli_query($conn,$sql);
        if ($r1) {
			//echo "新记录插入成功";
			$res_sql=200;
			
		} else {
			//echo "失败";
			//证明已经有个这个id（主键），则修改数据
			$sql2="update test_id set password = '$temp2' where id='$temp1'";
            if(mysqli_query($conn,$sql2))
            {
                //echo "修改成功";
                $res_sql=201;
            }
            else{
                //数据库数据插入失败，可能是超长度等未知错误
                $res_sql=500;
            }
		}
		

    //关闭连接
    $conn->close();
    
    //调用python脚本，参数id+password
    //exec("python3 daily_jkdk.py $aa $bb 2>&1",$rec,$res);
    exec("python3 run.py $temp1 $temp2 2>&1",$rec_py,$res_py);
    
    //接受python脚本的数据加上数据库结果一同返回
    $res_js=["temp1"=>$temp1, "temp2"=>$temp2,"sql" => $res_sql, "python_login" => $rec_py[0], "python_daka" => $rec_py[1] ];
    //$res_js=["temp1"=>$temp1, "temp2"=>$temp2, "sql" => $res_sql, "python_login" => 1200, "python_daka" => 2200 ];
    exit(json_encode($res_js));
    //以json的格式返回查询到的数据


    die();

?>

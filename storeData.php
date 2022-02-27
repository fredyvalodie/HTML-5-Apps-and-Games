<?php
//header('Access-Control-Allow-Origin: *');
function db() {
    try {
        $db = new PDO("mysql:dbname=c1774521c_lacaza;host=localhost;charset=utf8", "c1774521c", "dQ9*cG2a7dG5S7T", array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
    } catch (PDOException $e) {
        echo "Network failed : " . $e->getMessage();
    };

    return $db;
}

function storeData(){
    global $db;

    //extract($_POST);

    $storing = $db->prepare("INSERT INTO recensement(datas) VALUE(:datas)");
    $storing->execute([
        "datas" => $_POST["datas"]
    ]);

    unset($_POST["datas"]);
}

$db = db();

if(isset($_POST) && !empty($_POST)){ //https://lacaza.online/test0/storeData.php
  if(isset($_POST["datas"])){
      //echo $_POST["datas"];
    storeData();
  }
}

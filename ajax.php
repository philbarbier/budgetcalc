<?php

$direct = true;
require_once('config.php');

if (!isset($_GET['action'])) die(json_encode(array('error'=>'Action not set')));

// initiate the DB Model
$dbm = new DBModel($config); 

$response = false;

switch ($_GET['action']) {

    case "get_periods":
        $response = $dbm->getPeriods();
    break;

    case "addup_period":
        $response = $dbm->addupPeriod(); 
    break;

    case "del_period":
        $response = $dbm->delPeriod();
    break;

    case "get_expenses":
        $response = $dbm->getExpenses();
    break;

    case "addup_expense":
        $response = $dbm->addExpense();
    break;

    case "del_expense":
        $response = $dbm->delExpense();
    break;

    case "get_inbounds":
        $response = $dbm->getInbounds();
    break;

    case "addup_inbound":
        $response = $dbm->addupInbound();
    break;

    case "del_inbound":

    break;

    default:
        die(json_encode(array('error'=>'Invalid action')));
}

echo json_encode($response);
die;


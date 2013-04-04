<?php

class DBModel
{

    private $dbc  = null;
    private $coll = null;

    public function __construct($options = array())
    {
        if (isset($options['mongodb'])) {
            $this->dbc = new Mongo($options['mongodb']);
            $this->coll = $this->dbc->budgetcalc;
        } else {
            die(json_encode(array('error'=>'DB Error')));
        }
    }

    public function addupPeriod()
    {
        $data = array();

        $title = addslashes($_POST['title']);
        $colour = addslashes($_POST['colour']);

        if (!$title && !$colour) {
            $data['error'] = 'No data provided';
        } else {
           $data = $this->_addupPeriod($title, $colour); 
        }

        return $data;
    }

    private function _addupPeriod($title = '', $colour = '')
    {
        $data = array();
        // just in case 
        if (empty($title) || empty($colour)) {
            $data['error'] = 'Insufficient data supplied';
        } else {

            $criteria = array(
                'colour' => $colour,
                'title' => $title
            );
            $data = array(
                '$set' => array(
                    'colour' => $colour,
                    'title' => $title
                )
            );
            $result = $this->coll->periods->update($criteria, $data, array('upsert' => true));

            if ($result) {
                $data = array('error'=>'');
            } else {
                $data = array('error'=>'DB add error');
            }
        }

        return $data;

    }

    public function delPeriod()
    {

    }

    public function addExpense()
    {
        $title  = addslashes($_POST['title']);
        $colour = addslashes($_POST['colour']);
        $amount = (float)$_POST['amount'];

        if (empty($title) || empty($colour) || $amount == 0.00 || !is_float($amount)) return false;

        $data = array();

        $result = $this->_addExpense($title, $colour, $amount);

        if (!$result) {
            $data['error'] = 'Insufficient data';
        } else {
            $data = $result;
        }
        return $data;
    }

    private function _addExpense($title = '', $colour = '', $amount = 0.00)
    {
 
        if (empty($title) || empty($colour) || $amount == 0.00) return false;
               
        $criteria = array(
                'title' => $title,
                'colour' => $colour,
                'amount' => $amount
            );
        $data = array(
                '$set' => array(
                    'title' => $title,
                    'colour' => $colour,
                    'amount' => $amount
                )
        );
        $result = $this->coll->expenses->update($criteria, $data, array('upsert' => true));

        if ($result) {
            $data = array('error'=>'');
        } else {
            $data = array('error'=>'DB add error');
        }

        return $data;
    }

    public function delExpense()
    {
        $id = (string)$_POST['eid'];
        if (!isset($id)) {
            return false;
        }

        $data = array();
        
        $result = $this->_delExpense($id);
        
        if (!$result) {
            $data['error'] = 'Delete error';
        } else {
            $data['error'] = '';
        }

        return $data;
    }

    private function _delExpense($id = 0)
    {
        if ($id==0) return false;
        $result = $this->coll->expenses->remove(array('_id' => new MongoId($id)));
        return $result;
    }

    public function addupInbound()
    {
        $title  = addslashes($_POST['title']);
        $colour = addslashes($_POST['colour']);
        $amount = (float)$_POST['amount'];

        if (empty($title) || empty($colour) || $amount == 0.00 || !is_float($amount)) return false;

        $data = array();

        $result = $this->_addInbound($title, $colour, $amount);

        if (!$result) {
            $data['error'] = 'Insufficient data';
        } else {
            $data = $result;
        }
        return $data;
    }

    private function _addInbound($title = '', $colour = '', $amount = 0.00)
    {
 
        if (empty($title) || empty($colour) || $amount == 0.00) return false;
               
        $criteria = array(
                'title' => $title,
                'colour' => $colour,
                'amount' => $amount
            );
        $data = array(
                '$set' => array(
                    'title' => $title,
                    'colour' => $colour,
                    'amount' => $amount
                )
        );
        $result = $this->coll->inbounds->update($criteria, $data, array('upsert' => true));

            if ($result) {
                $data = array('error'=>'');
            } else {
                $data = array('error'=>'DB add error');
            }
        return $data;
    }

    public function getExpenses()
    {
        $data = array();
        $result = $this->coll->expenses->find();
        if ($result->count() > 0) {
            foreach($result as $period) {
                array_push($data, $period);
            }
        }
        return $data;
    }

    public function getPeriods()
    {
        $data = array();
        $result = $this->coll->periods->find();
        if ($result->count() > 0) {
            foreach($result as $period) {
                array_push($data, $period);
            }
        }
        return $data;
    }

    public function getInbounds()
    {
        $data = array();
        $result = $this->coll->inbounds->find();
        if ($result->count() > 0) {
            foreach($result as $period) {
                array_push($data, $period);
            }
        }
        return $data;
    }



}


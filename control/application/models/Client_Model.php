<?php

class Client_Model extends CI_Model{
    

    public function createclient($data){
        return $this->db->insert_batch('tbl_client',$data);
    }

    public function getclient($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_client')->result_array();
    }

    public function updateclient($client_data){

        $update = 0;
        foreach ($client_data as $value) {
            $this->db->set('client_name',$value['client_name']);
            $this->db->set('client_logo',$value['client_logo']);
            $this->db->where('client_id',$value['client_id']);
            if($this->db->update('tbl_client')){
                $update = 0;
            }
            else{
                $update = 1;
            }
        }

        if($update == 0){
            return true;
        }
        else{
            return false;
        }
    }

    public function deleteclient($client_id){
        $this->db->where('client_id',$client_id);
        return $this->db->delete('tbl_client');
    }    
    
}


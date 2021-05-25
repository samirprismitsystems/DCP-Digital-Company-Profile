<?php

class Client_Model extends CI_Model{
    

    public function createclient($data){
        return $this->db->insert('tbl_client',$data);
    }

    public function getclient($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_client')->result_array();
    }

    public function updateclient($data,$client_id){
        $this->db->where('client_id',$client_id);
        return $this->db->update('tbl_client',$data);
    }

    public function deleteclient($client_id){
        $this->db->where('client_id',$client_id);
        return $this->db->delete('tbl_client');
    }    
    
}


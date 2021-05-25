<?php

class User_Model extends CI_Model{
    

    public function createclient($data){
        return $this->db->insert('tbl_client',$data);
    }

    public function getuser($data){
        $this->db->select('tbl_users.user_id,tbl_users.email_id,tbl_users.first_name,tbl_users.last_name,tbl_users.profile_photo,tbl_company.*');
        $this->db->from('tbl_company');
        $this->db->join('tbl_users','tbl_company.user_id = tbl_users.user_id');
        $this->db->where('tbl_users.email_id',$data['email']);
        $this->db->where('tbl_users.password',$data['password']);
        return $this->db->get()->row_array();
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


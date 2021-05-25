<?php

class Service_Model extends CI_Model{
    
    public function createservice($data){
        return $this->db->insert('tbl_service',$data);
    }

    public function getservice($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_service')->result_array();
    }

    public function updateservice($data,$service_id){
        $this->db->where('service_id',$service_id);
        return $this->db->update('tbl_service',$data);
    }

    public function deleteservice($service_id){
        $this->db->where('service_id',$service_id);
        return $this->db->delete('tbl_service');
    }
    
}


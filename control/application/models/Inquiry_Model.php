<?php

class Inquiry_Model extends CI_Model{
        
    public function getinquiry($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_inquiry')->result_array();
    }

    public function createinquiry($data){
        return $this->db->insert('tbl_inquiry',$data);
    }

    public function changestatus($inquiry_id,$status){
        $this->db->set('status',$status);
        $this->db->where('inquiry_id',$inquiry_id);
        return $this->db->update('tbl_inquiry');
    }

    public function updateinquiry($data,$inquiry_id){
        $this->db->where('inquiry_id',$inquiry_id);
        return $this->db->update('tbl_inquiry',$data);
    }

    public function deleteinquiry($inquiry_id){
        $this->db->where('inquiry_id',$inquiry_id);
        return $this->db->delete('tbl_inquiry');
    }
    
}


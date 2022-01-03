<?php

class Testimonial_Model extends CI_Model{
        
    public function gettestimonial($company_id,$status = NULL){
        if($status != null){
            $this->db->where('status',1);
        }
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_testimonial')->result_array();
    }

    public function createtestimonial($data){
        return $this->db->insert('tbl_testimonial',$data);
    }

    public function changestatus($testimonial_id,$status){
        $this->db->set('status',$status);
        $this->db->where('testimonial_id',$testimonial_id);
        return $this->db->update('tbl_testimonial');
    }

    public function updatetestimonial($data,$testimonial_id){
        $this->db->where('testimonial_id',$testimonial_id);
        return $this->db->update('tbl_testimonial',$data);
    }

    public function deletetestimonial($testimonial_id){
        $this->db->where('testimonial_id',$testimonial_id);
        return $this->db->delete('tbl_testimonial');
    }
    
}


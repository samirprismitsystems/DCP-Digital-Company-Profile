<?php

class Theme_Model extends CI_Model{
    
    public function getallthemes(){
        return $this->db->get('tbl_themes')->result_array();
    }

    public function createtheme($data){
        return $this->db->insert_batch('tbl_themes',$data);
    }

    public function deletetheme($theme_id){
        $this->db->where('theme_id',$theme_id);
        return $this->db->delete('tbl_themes');
    }

    public function updatecompanytheme($data){
        $this->db->set('theme_id',$data['theme_id']);
        $this->db->where('company_id',$data['company_id']);
        return $this->db->update('tbl_company');
    }

    public function updatetheme($theme_data){
        $update = 0;
        foreach ($theme_data as $value) {
            $this->db->set('theme_name',$value['theme_name']);
            $this->db->set('theme_image',$value['theme_image']);
            $this->db->where('theme_id',$value['theme_id']);
            if($this->db->update('tbl_themes')){
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

}


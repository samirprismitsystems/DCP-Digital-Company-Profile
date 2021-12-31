<?php

class Service_Model extends CI_Model{
    
    public function createservice($data){
        return $this->db->insert_batch('tbl_service',$data);
    }

    public function getservice($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_service')->result_array();
    }

    public function updateservice($servicedata){
        $update = 0;
        foreach ($servicedata as $value) {
            $this->db->set('service_name',$value['service_name']);
            $this->db->set('service_desc',$value['service_desc']);
            $this->db->set('service_price',$value['service_price']);
            $this->db->set('service_image',$value['service_image']);
            $this->db->where('service_id',$value['service_id']);
            if($this->db->update('tbl_service')){
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

    public function deleteservice($service_id){
        $this->db->where('service_id',$service_id);
        return $this->db->delete('tbl_service');
    }
    
}


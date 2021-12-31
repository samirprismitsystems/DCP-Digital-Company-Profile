<?php

class SiteSetting_Model extends CI_Model{
    

    public function getsettings(){
        // $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_setting')->result_array();
    }

    public function savesettings($settingname,$settingvalue){
        if(!empty($settingname)){
            $i=0;
            foreach ($settingname as $value) {
                $this->db->set("setting_value",$settingvalue[$i]);
                $this->db->where('setting_name',$settingname[$i]);
                $this->db->update('tbl_setting');
                $i++;
            }
            return true;
        }
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


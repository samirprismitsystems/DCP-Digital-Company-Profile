<?php

class Portfolio_Model extends CI_Model{
    
    public function createportfolio($data){
        return $this->db->insert_batch('tbl_portfolio',$data);
    }

    public function getportfolio($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_portfolio')->result_array();
    }

    public function updateportfolio($portfoliodata){
        $update = 0;
        foreach ($portfoliodata as $value) {
            $this->db->set('portfolio_name',$value['portfolio_name']);
            $this->db->set('portfolio_desc',$value['portfolio_desc']);
            $this->db->set('portfolio_image',$value['portfolio_image']);
            $this->db->where('portfolio_id',$value['portfolio_id']);
            if($this->db->update('tbl_portfolio')){
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

    public function deleteportfolio($portfolio_id){
        $this->db->where('portfolio_id',$portfolio_id);
        return $this->db->delete('tbl_portfolio');
    }
    
}


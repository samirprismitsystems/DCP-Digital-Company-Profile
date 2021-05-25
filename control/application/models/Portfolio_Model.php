<?php

class Portfolio_Model extends CI_Model{
    
    public function createportfolio($data){
        return $this->db->insert('tbl_portfolio',$data);
    }

    public function getportfolio($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_portfolio')->result_array();
    }

    public function updateportfolio($data,$portfolio_id){
        $this->db->where('portfolio_id',$portfolio_id);
        return $this->db->update('tbl_portfolio',$data);
    }

    public function deleteportfolio($portfolio_id){
        $this->db->where('portfolio_id',$portfolio_id);
        return $this->db->delete('tbl_portfolio');
    }
    
}


<?php

class Product_Model extends CI_Model{
    

    public function createproduct($data){
        return $this->db->insert('tbl_product',$data);
    }

    public function getproduct($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_product')->result_array();
    }

    public function updateproduct($data,$product_id){
        $this->db->where('product_id',$product_id);
        return $this->db->update('tbl_product',$data);
    }

    public function deleteproduct($product_id){
        $this->db->where('product_id',$product_id);
        return $this->db->delete('tbl_product');
    }    







    public function getcompany($userid){
        $this->db->where('user_id',$userid);
        $company = $this->db->get('tbl_company')->result_array();
        return $company;
    }

    public function getcompanycities($company_id){
        $this->db->select('tbl_cities.id,tbl_workingarea_cities.all_india');
        $this->db->from('tbl_workingarea_cities');
        $this->db->join('tbl_cities','tbl_cities.id = tbl_workingarea_cities.city_id');
        $this->db->where('tbl_workingarea_cities.company_id',$company_id);
        $companycities = $this->db->get()->result_array();
        return $companycities;
    }

    public function getcompanysocial($company_id){
        $this->db->select('social_id,company_social_link');
        $this->db->from('tbl_company_sociallinks');
        $this->db->where('company_id',$company_id);
        $companysocial = $this->db->get()->result_array();
        return $companysocial;
    }


    public function getcitylist(){
        $this->db->select('id,name');
        $cities = $this->db->get('tbl_cities')->result_array();
        return $cities;
    }


    public function getsociallist(){
        $this->db->select('socialmedia_id,socialmedia_name');
        $social = $this->db->get('tbl_socialmedia')->result_array();
        return $social;
    }


    public function addworkingarea($data){
        return $this->db->insert_batch('tbl_workingarea_cities',$data);
        // print_r($data);
        // exit();
    }

    public function addsociallinks($data){
        return $this->db->insert_batch('tbl_company_sociallinks',$data);
    }


    public function deleteworkingarea($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->delete('tbl_workingarea_cities');
    }

    public function deletesocial($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->delete('tbl_company_sociallinks');
    }


    public function updatecompany($data,$company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->update('tbl_company',$data);
    }
    
}


<?php

class Company_Model extends CI_Model{
    
    public function getcompany($userid = NULL){
        if($userid != NULL){
            $this->db->where('user_id',$userid);
        }
        $company = $this->db->get('tbl_company')->result_array();
        return $company;
    }

    public function getpaymentdata($company_id){
        $this->db->where('company_id',$company_id);
        $payment_options = $this->db->get('tbl_payment_options')->row_array();
        return $payment_options;
    }

    public function getcompanycities($company_id){
        $this->db->select('tbl_cities.id,tbl_cities.name,tbl_workingarea_cities.all_india');
        $this->db->from('tbl_workingarea_cities');
        $this->db->join('tbl_cities','tbl_cities.id = tbl_workingarea_cities.city_id');
        $this->db->where('tbl_workingarea_cities.company_id',$company_id);
        $companycities = $this->db->get()->result_array();
        return $companycities;
    }

    public function getcompanysocial($company_id){
        // $this->db->select('');
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


    public function getsociallist($company_id = NULL){
        if($company_id == NULL){
            $social = $this->db->get('tbl_socialmedia')->result_array();
            return $social;
        }
        else{
            $this->db->where('company_id',$company_id);
            if($socialdata = $this->db->get('tbl_company_sociallinks')->result_array()){
                $this->db->select('tbl_company_sociallinks.*,tbl_socialmedia.socialmedia_name,tbl_socialmedia.socialmedia_logo');
                $this->db->from('tbl_socialmedia');
                $this->db->join('tbl_company_sociallinks','tbl_socialmedia.socialmedia_id = tbl_company_sociallinks.social_id');
                $this->db->where('tbl_company_sociallinks.company_id',$company_id);
                $data = $this->db->get()->result_array();
                return $data;
            }
            else{
                $social = $this->db->get('tbl_socialmedia')->result_array();
                return $social;
            }    
        }
    }


    public function savesocialdata($socialdata){
        return $this->db->insert_batch('tbl_company_sociallinks',$socialdata);
    }

    public function updatesocialdata($socialdata){
        $i = 0;
        foreach ($socialdata as $value) {
            $this->db->set('link',$value['link']);
            $this->db->where('company_social_id',$value['company_social_id']);
            if($this->db->update('tbl_company_sociallinks')){
                $i = 0;
            }
            else{
                $i = 1;
            }
        }
        if($i == 0){
            return true;    
        }
        else{
            return false;
        }
    }


    public function createcompany($data){
        $this->db->insert('tbl_company',$data);
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    public function updatelogo($company_id,$logo){
        $this->db->set('company_logo',$logo);
        $this->db->where('company_id',$company_id);
        return $this->db->update('tbl_company');
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


    public function getcompanybyslug($companyslug){
        $this->db->where('company_name',$companyslug);
        $company = $this->db->get('tbl_company')->row_array();
        return $company;
    }


    public function savepaymentoptionsdata($paymentoption){
        return $this->db->insert('tbl_payment_options',$paymentoption);
    }

    public function updatepaymentoptionsdata($paymentoption,$company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->update('tbl_payment_options',$paymentoption);
    }


     public function updateqrcode($company_id,$logo){
        $this->db->set('qrcode',$logo);
        $this->db->where('company_id',$company_id);
        return $this->db->update('tbl_payment_options');
    }
    

    public function createsocial($data){
        return $this->db->insert_batch('tbl_socialmedia',$data);
    }

    public function updatesocial($socialdata){
        $update = 0;
        foreach ($socialdata as $value) {
            $this->db->set('socialmedia_name',$value['socialmedia_name']);
            $this->db->set('socialmedia_logo',$value['socialmedia_logo']);
            $this->db->where('socialmedia_id',$value['socialmedia_id']);
            if($this->db->update('tbl_socialmedia')){
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


    public function deletesocialdata($social_id){
        $this->db->where('socialmedia_id',$social_id);
        return $this->db->delete('tbl_socialmedia');
    }


    public function changestatus($company_id,$status){
        $this->db->set('status',$status);
        $this->db->where('company_id',$company_id);
        if($this->db->update('tbl_company')){
            $this->db->where('company_id',$company_id);
            $data =  $this->db->get('tbl_company')->row_array();
            $this->db->set('status',$status);
            $this->db->where('user_id',$data['user_id']);
            return $this->db->update('tbl_users');
        }
        else{
            return false;
        }
        
    }

    
}


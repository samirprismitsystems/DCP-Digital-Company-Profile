<?php

class User_Model extends CI_Model{
    
    public function tokendata(){
        $tokdata['ciphering'] = $ciphering = "AES-128-CTR";
        $tokdata['ivlength'] = $iv_length = openssl_cipher_iv_length($ciphering);
        $tokdata['options'] = $options = 0;
        $tokdata['iv'] = $iv = '1234567891011121';
        $tokdata['key'] = $key = "digitalcompanyprofile";
        return $tokdata;
    }

    public function encemail($email)
    {
        $tokdata = $this->tokendata();
        $emailaddress = openssl_encrypt($email, $tokdata['ciphering'],$tokdata['key'], $tokdata['options'], $tokdata['iv']);
        return $emailaddress;
    }

    public function createuser($data){
        $this->db->insert('tbl_users',$data);
        $insert_id = $this->db->insert_id();

        $this->load->library('email');
        $this->email->from('16mscit072@gmail.com', 'Digital Company Profile');
        $this->email->to($data['email_id']);

        $encemail = $this->encemail($data['email_id']);
        
        if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')   
             $url = "https://";   
        else  
             $url = "http://";

        $url.= $_SERVER['HTTP_HOST'];   
        
        //This is for production
        // $verifymsg = $url.'/dashboard/verify/'.md5($data['email_id']);

        $verifymsg = 'http://localhost:8080/dashboard/verify/'.$encemail;       

        $this->email->subject('Successful Registration On Digital Company Profile');
        $this->email->message('Click Below Link to verify Email ' . $verifymsg);
        return $data =  $this->email->send();

        // $this->db->where('user_id',$insert_id);
        // return $this->db->get('tbl_users')->row_array();
    }

    public function registeruser($data){
        $this->db->insert('tbl_users',$data);
        return $insert_id = $this->db->insert_id();
    }



    public function getuserdata($user_id){
        $this->db->where('user_id',$user_id);
        return $this->db->get('tbl_users')->row_array();
    }

    public function getuserbyemail($user_email){
        $this->db->where('email_id',$user_email);
        return $this->db->get('tbl_users')->row_array();
    }

    public function getuser($data){
        
        $this->db->where('tbl_users.email_id',$data['email']);
        $this->db->where('tbl_users.password',md5($data['password']));
        return $this->db->get('tbl_users')->row_array();


        // $this->db->select('tbl_users.user_id,tbl_users.email_id,tbl_users.first_name,tbl_users.last_name,tbl_users.profile_photo,tbl_company.*');
        // $this->db->from('tbl_company');
        // $this->db->join('tbl_users','tbl_company.user_id = tbl_users.user_id');
        // $this->db->where('tbl_users.email_id',$data['email']);
        // $this->db->where('tbl_users.password',$data['password']);
        // return $this->db->get()->row_array();
    }

    public function updateuser($data,$user_id){
        $this->db->where('user_id',$user_id);
        return $this->db->update('tbl_users',$data);
    }

    public function deleteclient($client_id){
        $this->db->where('client_id',$client_id);
        return $this->db->delete('tbl_client');
    }    

    public function sendemail($email){
        $encemail = $this->encemail($email);

        if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')   
             $url = "https://";   
        else  
             $url = "http://";

        $url.= $_SERVER['HTTP_HOST'];   
        
        //This is for production
        // $verifymsg = $url.'/dashboard/verify/'.md5($data['email_id']);

        $linkmsg = 'http://localhost:8080/dashboard/resetpassword/'.$encemail;

        $this->load->library('email');
        $this->email->from('16mscit072@gmail.com', 'Digital Company Profile');
        $this->email->to($email);
         
        $this->email->subject('Forget Password');
        $this->email->message('Click Below Link To Reset Password ' . $linkmsg);
        $data =  $this->email->send();
        // echo $this->email->print_debugger();
        return $data;
    }

    public function checkpass($oldpassword,$user_email){
        $this->db->where('email_id',$user_email);
        $this->db->where('password',$oldpassword);
        return $this->db->get('tbl_users')->row_array();
    }


    public function changepass($password,$user_email){
        $this->db->set('password',$password);
        $this->db->where('email_id',$user_email);
        return $this->db->update('tbl_users');
    }

    public function verifyuser($data){
        $user = $this->usercheck($data);
        if(!empty($user)){
            $this->db->set('status',1);
            $this->db->where('user_id',$user['user_id']);
            return $this->db->update('tbl_users');
        }
    }

    public function usercheck($data){
        $tokdata = $this->tokendata();
        $emailaddress = openssl_decrypt($data['email_id'], $tokdata['ciphering'],$tokdata['key'], $tokdata['options'], $tokdata['iv']);
        $this->db->where('email_id',$emailaddress);
        return $user = $this->db->get('tbl_users')->row_array();
    }


    public function changepassword($data){
        $user = $this->usercheck($data);
        if(!empty($user)){
            $this->db->set('password',md5($data['password']));
            $this->db->where('user_id',$user['user_id']);
            return $this->db->update('tbl_users');
        }
        else{
            return false;
        }
    }


    public function getusercompany($company_id){
        $this->db->where('company_id',$company_id);
        return $this->db->get('tbl_company')->row_array();
    }

    
}


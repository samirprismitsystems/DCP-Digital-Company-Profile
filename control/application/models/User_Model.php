<?php

class User_Model extends CI_Model{
    

    public function createuser($data){
        $this->db->insert('tbl_users',$data);
        $insert_id = $this->db->insert_id();

        $this->load->library('email');
        $this->email->from('16mscit072@gmail.com', 'Digital Company Profile');
        $this->email->to($data['email_id']);
        
        $verifymsg = 'http://localhost:8080/dashboard/verify/'.$data['email_id'].'/'.$data['password'];

        $this->email->subject('Successful Registration On Digital Company Profile');
        $this->email->message('Click Below Link to verify Email ' . $verifymsg);
        return $data =  $this->email->send();

        // $this->db->where('user_id',$insert_id);
        // return $this->db->get('tbl_users')->row_array();
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


    public function sendemail($email,$pass){

        $this->db->set('password',md5($pass));
        $this->db->where('email_id',$email);
        return $this->db->update('tbl_users');

        $this->load->library('email');
        $this->email->from('16mscit072@gmail.com', 'Digital Company Profile');
        $this->email->to($email);
         
        $this->email->subject('Forget Password');
        $this->email->message('This Is Your New Password ' . $pass);
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
        $this->db->where('email_id',$data['email_id']);
        $this->db->where('password',$data['password']);
        $user = $this->db->get('tbl_users')->row_array();
        
        $this->db->set('status',1);
        $this->db->where('user_id',$user['user_id']);
        return $this->db->update('tbl_users');
    }

    
}


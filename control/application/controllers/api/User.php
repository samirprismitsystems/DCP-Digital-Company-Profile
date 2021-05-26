<?php
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class User extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

	public function registeruser_post(){
		$data = $this->input->post();

 		if(!empty($_FILES['profile_photo']['name'])){
		    $targetpath='./upload/users/';
		    if (!is_dir($targetpath)) {
		        mkdir($targetpath,0777,TRUE);
		    }                  
		    $config['upload_path']   = $targetpath;
		    $config['allowed_types'] = "*";
		    $this->load->library('upload',$config);
			$path = pathinfo($_FILES["profile_photo"]["name"]);
			$_FILES["profile_photo"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];               
			if ($this->upload->do_upload('profile_photo')) {
			   	$uploadphoto = $this->upload->data('file_name');
			}else{
			    echo $this->upload->display_errors();
			}
		}
		else{
			$uploadphoto = $data['profile_photo'];
		}

		$user_field = array(
			'first_name' => $data['first_name'],
			'last_name' => $data['last_name'],
			'email_id' => $data['email_id'],
			'password' => $data['password'],
			'contact_no' => $data['contact_no'],
            'profile_photo' => $uploadphoto,
        );

        if($data['isupdate'] == 'true'){
			if($this->User_Model->updateclient($user_field,$data['user_id'])){
				$output['error'] = false;
			    $output['message'] = "client Data updated";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "client Data updated failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}        	
        }
        else{
        	if($data =  $this->User_Model->createuser($user_field)){
				$output['error'] = false;
				$output['userdata'] = $data;
			    $output['message'] = "User Data Inserted";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "User Data Insertion failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}

	public function loginuser_post(){
		$data = $this->input->post();

		if($user = $this->User_Model->getuser($data)){
			$output['error'] = false;
			$output['userdata'] = $user;
			$output['message'] = "Login Successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['message'] = "Login Failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}

	public function getuser_get($user_id){
		if($user = $this->User_Model->getuserdata($user_id)){
			$output['error'] = false;
			$output['userdata'] = $user;
			$output['message'] = "User Data Fetched Successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['message'] = "User Data Fetched Failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}
	
}

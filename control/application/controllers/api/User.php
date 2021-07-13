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

        if($data['isupdate'] == 'true'){
        	$user_field = array(
				'first_name' => $data['first_name'],
				'last_name' => $data['last_name'],
				'email_id' => $data['email_id'],
				'contact_no' => $data['contact_no'],
	            'profile_photo' => $uploadphoto,
        	);
			if($this->User_Model->updateuser($user_field,$data['user_id'])){
				$output['error'] = false;
			    $output['message'] = "User Data updated";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "User Data updated failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}        	
        }
        else{
        	$user_field = array(
				'first_name' => $data['first_name'],
				'last_name' => $data['last_name'],
				'email_id' => $data['email_id'],
				'password' => md5($data['password']),
				'contact_no' => $data['contact_no'],
	            'profile_photo' => $uploadphoto,
        	);
        	if($data =  $this->User_Model->createuser($user_field)){
				$output['error'] = false;
			    $output['message'] = "Email Varification Link Sent to Your Email";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "User Registration failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}


	public function registeruseradmin_post(){
		$data = $this->input->post();

		$user_field = array(
			'first_name' => $data['first_name'],
			'last_name' => $data['last_name'],
			'email_id' => $data['email_id'],
			'password' => md5($data['password']),
			'contact_no' => $data['contact_no'],
			'status' => $data['status'],
        );

        if($userdata = $this->User_Model->registeruser($user_field)){
			$output['error'] = false;
			$output['userdata'] = $userdata;
			$output['message'] = "User Data Added";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['message'] = "User Data Added Failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		} 

	}

	public function loginuser_post(){
		$data = $this->input->post();

		if($user = $this->User_Model->getuser($data)){
			if($user['status'] == 1){
				$output['error'] = false;
				$output['userdata'] = $user;
				$output['message'] = "Login Successfully";
				$this->set_response($output, REST_Controller::HTTP_OK);	
			}
			else{
				$output['error'] = true;
				$output['message'] = "Email Address Not Verified Please Varify And Try Again.";
				$this->set_response($output, REST_Controller::HTTP_OK);
			}
			
		}
		else{
			$output['error'] = true;
	        $output['message'] = "Invalid Email Address Or Password";
	        $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}

	public function getuser_get($user_id){
		$user_id = $this->User_Model->getuserid($user_id);
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

	public function generateRandomString($length = 8) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}

	public function forgetpassword_post(){
		$user_email = $this->input->post('email');
		if($user = $this->User_Model->getuserbyemail($user_email)){

			// $randpass = $this->generateRandomString();

			if($this->User_Model->sendemail($user_email)){
				$output['error'] = false;
				$output['message'] = "Reset Password Link Sent to your registered Email";
				$this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = false;
				$output['message'] = "Email Sent Failed";
				$this->set_response($output, REST_Controller::HTTP_OK);	
			}
		}
		else{
			$output['error'] = true;
	        $output['message'] = "Invalid EmailId";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}

	public function changepassword_post(){
		$data = $this->input->post();
		if($user = $this->User_Model->getuserbyemail($data['email_id'])){
			if($user = $this->User_Model->checkpass(md5($data['cpass']),$data['email_id'])){

				if($this->User_Model->changepass(md5($data['npass']),$data['email_id'])){
					$output['error'] = false;
					$output['message'] = "Password Changed Successfully";
					$this->set_response($output, REST_Controller::HTTP_OK);
				}
			}
			else{
				$output['error'] = false;
				$output['message'] = "Old Password Not Matched";
				$this->set_response($output, REST_Controller::HTTP_OK);	
			}
		}
		else{
			$output['error'] = true;
	        $output['message'] = "Invalid EmailId";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}


	public function verifyuser_post(){
		$data = $this->input->post();
			if($data =  $this->User_Model->verifyuser($data)){
				$output['error'] = false;
			    $output['message'] = "User Verified Successfully Login To Continue.";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "User Varification Failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
		}


		public function resetpass_post(){
			$data = $this->input->post();
			if($user =  $this->User_Model->changepassword($data)){
				$output['error'] = false;
			    $output['message'] = "Password Changed Successfully Login To Continue.";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Password Changed Failed";
	            $this->set_response($output, REST_Controller::HTTP_OK);
			}
		}


		public function getcompanyuser_get($company_id){

			if($data = $this->User_Model->getusercompany($company_id)){
				$output['error'] = false;
				$output['companydata'] = $data;
				$output['message'] = "Data Fetched Successfully";
				$this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
				$output['companydata'] = [];
		        $output['message'] = "Empty Data";
		        $this->set_response($output, REST_Controller::HTTP_OK);
			}
		}


	public function getuserreview_get($status){
		if($userreview = $this->User_Model->getuserreview($status)){
			$output['error'] = false;
			$output['review'] = $userreview;
			$output['message'] = "Review Data Get Successfull";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
			$output['review'] = [];
	        $output['message'] = "Empty Review Data";
	        $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}


	public function updatereviewstatus_post(){
		$data = $this->input->post();
		if($this->User_Model->updatereview($data['review_id'],$data['status'])){
			$output['error'] = false;
			$output['message'] = "Review Data Updated";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
			$output['message'] = "Review Data Updation Failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}


	public function addreview_post(){
		$data = $this->input->post();
		if($this->User_Model->addreview($data)){
			$output['error'] = false;
			$output['message'] = "Review Saved";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
			$output['message'] = "Review Saved Failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}


	public function getadmindashdata_get(){
		
		$companydata = $this->Company_Model->gettopcompany();
		$orders = $this->Company_Model->gettotalorders();
		$users = $this->Company_Model->gettotalusers();
		$product = $this->Company_Model->gettotalproduct();
		$service = $this->Company_Model->gettotalservice();
		$clients = $this->Company_Model->gettotalclients();
		$portfolio = $this->Company_Model->gettotalportfolio();
		$testimonials = $this->Company_Model->gettotaltestimonials();
		$inquiry = $this->Company_Model->gettotalinquiry();

			$output['error'] = false;
			$output['company'] = $companydata;
			$output['orders'] = $orders;
			$output['users'] = $users;
			$output['product'] = $product;
			$output['service'] = $service;
			$output['clients'] = $clients;
			$output['portfolio'] = $portfolio;
			$output['testimonials'] = $testimonials;
			$output['inquiry'] = $inquiry;
			$this->set_response($output, REST_Controller::HTTP_OK);
	}


	public function getcompanydashdata_get($user_id){
		
		$user_id = $this->User_Model->getuserid($user_id);   	
		if( $company = $this->Company_Model->getcompany($user_id)){
			$product = $this->Company_Model->gettotalproduct($company[0]['company_id']);
		$service = $this->Company_Model->gettotalservice($company[0]['company_id']);
		$clients = $this->Company_Model->gettotalclients($company[0]['company_id']);
		$portfolio = $this->Company_Model->gettotalportfolio($company[0]['company_id']);
		$testimonials = $this->Company_Model->gettotaltestimonials($company[0]['company_id']);
		$inquiry = $this->Company_Model->gettotalinquiry($company[0]['company_id']);

			$output['error'] = false;
			$output['product'] = $product;
			$output['service'] = $service;
			$output['clients'] = $clients;
			$output['portfolio'] = $portfolio;
			$output['testimonials'] = $testimonials;
			$output['inquiry'] = $inquiry;
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
			$output['product'] = 0;
			$output['service'] = 0;
			$output['clients'] = 0;
			$output['portfolio'] = 0;
			$output['testimonials'] = 0;
			$output['inquiry'] = 0;
			$this->set_response($output, REST_Controller::HTTP_OK);
		}

		
	}


}

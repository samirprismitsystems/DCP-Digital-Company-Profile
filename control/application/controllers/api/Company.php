<?php
require APPPATH . 'libraries/REST_Controller.php';

class Company extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

    public function getcompany_get($user_id){
		// $user_id = $this->input->get('user_id');
		if($company = $this->Company_Model->getcompany($user_id)){
			$cities = $this->Company_Model->getcompanycities($company[0]['company_id']);
			$social = $this->Company_Model->getcompanysocial($company[0]['company_id']);

			$output['error'] = false;
            $output['company'] = $company;
            $output['companycities'] = $cities;
            $output['social'] = $social;
            $output['message'] = "Company fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = false;
            $output['company'] = [];
            $output['companycities'] = [];
            $output['social'] = [];
            $output['newuser'] = 1;
            $output['message'] = "Company fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}

	public function createcompany_post(){
		$data = $this->input->post();
 		$cities = explode(",", $data['cities']);
 		$sociallinks = explode(",", $data['sociallinks']);
 		$socialids = explode(",", $data['socialnames']);
 		$allindia = $data['allindia'];
 		$uploadphoto = 'demo';

 		if($data['isupdate'] == 'true'){
 			$companyid = $data['company_id'];
 			$this->Company_Model->deleteworkingarea($companyid);
 			$this->Company_Model->deletesocial($companyid);
 		}

		$company_field = array(
			'user_id'		=> $data['user_id'],
            'company_name' => $data['company_name'],
            'company_logo' => $uploadphoto,
            'company_desc' => $data['company_desc'],
            'established_in'=> $data['established_in'],
            'business_segment' => $data['business_segment'],
            'address' => $data['address'],
            'company_email' => $data['company_email'],
            'company_contact' => $data['company_contact'],
            'working_hours' => $data['working_hours'],
        );

		if($data['isupdate'] == 'true'){
			$this->Company_Model->updatecompany($company_field,$companyid);
		}
		else{
			$cid = $this->Company_Model->createcompany($company_field);
			$companyid = $cid;
		}

		if(!empty($_FILES['company_logo']['name'])){
		    $targetpath='./upload/'.$companyid.'/logo/';
		    if (!is_dir($targetpath)) {
		        mkdir($targetpath,0777,TRUE);
		    }              
		    $config['upload_path']   = $targetpath;
		    $config['allowed_types'] = "*";
		    $this->load->library('upload',$config);
			$path = pathinfo($_FILES["company_logo"]["name"]);
			$_FILES["company_logo"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
			               
			if ($this->upload->do_upload('company_logo')) {
			   	$uploadphoto = $this->upload->data('file_name');
			}else{
			    echo $this->upload->display_errors();
			}
		}
		else{
			$uploadphoto = $data['logo'];
		}

		$this->Company_Model->updatelogo($companyid,$uploadphoto);

		if($allindia == 'true'){
			$workarea[0]['company_id'] = $companyid;
			$workarea[0]['city_id'] = 7352;
			$workarea[0]['all_india'] = 1;
		}
		else{
			$workarea = array();
			$i = 0;
			foreach ($cities as $value) {
				$workarea[$i]['company_id'] = $companyid;
				$workarea[$i]['city_id'] = $value;
				$i++;
			}
		}

		if($this->Company_Model->addworkingarea($workarea)){
			$social = array();
			$i=0;
			foreach ($socialids as $value) {
				$social[$i]['company_id'] = $companyid;
				$social[$i]['social_id'] = $value;
				$social[$i]['company_social_link'] = $sociallinks[$i];
				$i++;
			}
			if($this->Company_Model->addsociallinks($social)){
				if($data['isupdate'] == 'true'){
					$output['error'] = false;
			        $output['message'] = "Company Data Updated";
			        $this->set_response($output, REST_Controller::HTTP_OK);
				}
				else{
					$output['error'] = false;
			        $output['message'] = "Company Data Added";
			        $this->set_response($output, REST_Controller::HTTP_OK);	
				}
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Error in social data";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
		}
		else{
			$output['error'] = true;
            $output['message'] = "Error in Working Area";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}

	public function fetchcities_get(){
		if($cities = $this->Company_Model->getcitylist()){
			$output['error'] = false;
            $output['cities'] = $cities;
            $output['message'] = "cities fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "cities fetched failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}


	public function fetchsocial_get(){
		if($social = $this->Company_Model->getsociallist()){
			$output['error'] = false;
            $output['social'] = $social;
            $output['message'] = "social data fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "social data fetched failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}



	public function updatecompany_post(){
		$data = $this->input->post();
 		$cities = explode(",", $data['cities']);
 		$sociallinks = explode(",", $data['sociallinks']);
 		$socialids = explode(",", $data['socialnames']);
 		$companyname = $data['company_name'];
 		$companyid = $data['company_id'];
 		$allindia = $data['allindia'];

 		$this->Company_Model->deleteworkingarea($companyid);
 		$this->Company_Model->deletesocial($companyid);

 		if(!empty($_FILES['company_logo']['name'])){
		    $targetpath='./upload/'.strtolower($companyname).'/logo/';
		    if (!is_dir($targetpath)) {
		        mkdir($targetpath,0777,TRUE);
		    }             
		    $config['upload_path']   = $targetpath;
		    $config['allowed_types'] = "*";
		    $this->load->library('upload',$config);
			$path = pathinfo($_FILES["company_logo"]["name"]);
			$_FILES["company_logo"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];               
			if ($this->upload->do_upload('company_logo')) {
			   	$uploadphoto = $this->upload->data('file_name');
			   	// echo $uploadphoto;;
			}else{
			    echo $this->upload->display_errors();
			}
		}
		else{
			$uploadphoto = $data['logo'];
		}

		
		$company_field = array(
			'user_id'		=> $data['user_id'],
            'company_name' => $data['company_name'],
            'company_logo' => $uploadphoto,
            'company_desc' => $data['company_desc'],
            'established_in'=> $data['established_in'],
            'business_segment' => $data['business_segment'],
            'address' => $data['address'],
            'company_email' => $data['company_email'],
            'company_contact' => $data['company_contact'],
            'working_hours' => $data['working_hours'],
        );

		if($this->Company_Model->updatecompany($company_field,$companyid)){
			if($allindia == 'true'){
				$workarea[0]['company_id'] = $companyid;
				$workarea[0]['city_id'] = 7352;
				$workarea[0]['all_india'] = 1;
			}
			else{
				$workarea = array();
				$i = 0;
				foreach ($cities as $value) {
					$workarea[$i]['company_id'] = $companyid;
					$workarea[$i]['city_id'] = $value;
					$i++;
				}
			}
			if($this->Company_Model->addworkingarea($workarea)){
				$social = array();
				$i=0;
				foreach ($socialids as $value) {
					$social[$i]['company_id'] = $companyid;
					$social[$i]['social_id'] = $value;
					$social[$i]['company_social_link'] = $sociallinks[$i];
					$i++;
				}
				if($this->Company_Model->addsociallinks($social)){
					$output['error'] = false;
			        $output['message'] = "Company Data Updated";
			        $this->set_response($output, REST_Controller::HTTP_OK);		
				}
			}
			
		}
		else{
			$output['error'] = true;
            $output['message'] = "Company Data Updation failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}



}

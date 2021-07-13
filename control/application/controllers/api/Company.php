<?php
require APPPATH . 'libraries/REST_Controller.php';

class Company extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

    public function getcompany_get($user_id){

		// $user_id = $this->input->get('user_id');

		$user_id = $this->User_Model->getuserid($user_id);   	

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

	public function fetchallcompany_get(){
		if($company = $this->Company_Model->getcompany()){
			$output['error'] = false;
            $output['company'] = $company;
            $output['message'] = "Company fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = false;
            $output['company'] = [];
            $output['message'] = "Empty Company Data";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}

	public function fetchallareadata_get(){
		$data = array();
		$data['country'] = $this->Company_Model->getcountry();
		$data['state'] = $this->Company_Model->getstates();
		$data['city'] = $this->Company_Model->getcities();

		if($data['country'] != null && $data['state'] != null && $data['city'] != null ){
			$output['error'] = false;
            $output['data'] = $data;
            $output['message'] = "Area data fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = false;
            $output['data'] = [];
            $output['message'] = "Empty Area Data";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}

	public function getcitiesdata_get($statename){
		if($cities = $this->Company_Model->getcitiesdata($statename)){
			$output['error'] = false;
            $output['cities'] = $cities;
            $output['message'] = "Cities data fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = false;
            $output['cities'] = [];
            $output['message'] = "Empty City Data";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}

	public function getstatesdata_get($countryname){
		if($states = $this->Company_Model->getstatesdata($countryname)){
			$output['error'] = false;
            $output['states'] = $states;
            $output['message'] = "States data fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = false;
            $output['states'] = [];
            $output['message'] = "Empty States Data";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}	

	public function createcompany_post(){
		$data = $this->input->post();

 		$uploadphoto = 'logo';
 		$uploadbanner = 'banner';

 		if($data['isupdate'] == 'true'){
 			$companyid = $data['company_id'];
 		}

 		$user_id = $this->User_Model->getuserid($data['user_id']);

		$company_field = array(
			'user_id'		=> $user_id,
            'company_name' => $data['company_name'],
            'company_slug' => $data['company_slug'],
            'company_logo' => $uploadphoto,
            'company_banner' => $uploadbanner,
            'company_desc' => $data['company_desc'],
            'established_in'=> $data['established_in'],
            'business_segment' => $data['business_segment'],
            // 'address' => $data['address'],
            'area' => $data['area'],
            'city' => $data['city'],
            'state' => $data['state'],
            'country' => $data['country'],
            'post_code' => $data['post_code'],
            
            'company_email' => $data['company_email'],
            'company_contact' => $data['company_contact'],
            'company_alternate_contact' => $data['company_alternate_contact'],
            'working_hours_day' => $data['working_hours_day'],
            'working_hours_from' => $data['working_hours_from'],
            'working_hours_to' => $data['working_hours_to'],
            'map_lat' => $data['map_lat'],
            'map_lng' => $data['map_lng'],
        );

		if($data['isupdate'] == 'true'){
			$this->Company_Model->updatecompany($company_field,$companyid);
		}
		else{
			$cid = $this->Company_Model->createcompany($company_field);
			$companyid = $cid;
		}


		if(!empty($_FILES['company_logo']['name'])){
		    
		    $targetpath = './upload/'.$companyid.'/logo/';
		 	if (!is_dir($targetpath)) {
				mkdir($targetpath,0777,TRUE);
			}

		    $config['upload_path']   = $targetpath;
		    $config['allowed_types'] = "*";

		    $this->load->library('upload');
			$this->upload->initialize($config);
			$this->load->library('image_lib');

			$path = pathinfo($_FILES["company_logo"]["name"]);
			$filename = $path['filename'].'_'.time();
			$_FILES["company_logo"]["name"] = $filename.'.webp';
			$fileext = $path['extension'];
			
			if ($this->upload->do_upload('company_logo')) {
				$uploadData = $this->upload->data();
			   	$uploadphoto = $uploadData['file_name'];
			}else{
			    echo $this->upload->display_errors();
			}

			if($fileext != 'webp'){
				if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')  
		        	$url = "https://";   
			    else  
			        $url = "http://";   
			    if($_SERVER['HTTP_HOST'] == 'localhost'){
			    	$url.= $_SERVER['HTTP_HOST'].':8080';
			    }
			    else{
			    	$url.= $_SERVER['HTTP_HOST'];
			    }

	         	$target_path = $url.'/control/upload/'.$companyid.'/logo/'.$uploadData['raw_name'].$uploadData['file_ext'];
	         	
	         	switch ($fileext) {
		            case 'jpeg':
		            case 'jpg':
		                $im = imagecreatefromjpeg($target_path);
		                break;

		            case 'png':
		                $im = imagecreatefrompng($target_path);
		                break;

		            case 'gif':
		                $im = imagecreatefromgif($target_path);
		                break;
		            default:
		                return false;
		        }
				imagewebp($im, './upload/'.$companyid.'/logo/'.$uploadData['raw_name'].'.webp' , 60);
			}

		}
		else{
			$uploadphoto = $data['logo'];
		}


		if(!empty($_FILES['company_banner']['name'])){
		    
		    $targetpath = './upload/'.$companyid.'/banner/';
		 	if (!is_dir($targetpath)) {
				mkdir($targetpath,0777,TRUE);
			}

		    $config['upload_path']   = $targetpath;
		    $config['allowed_types'] = "*";

		    $this->load->library('upload');
		    $this->upload->initialize($config);
			$this->load->library('image_lib');

			$path = pathinfo($_FILES["company_banner"]["name"]);
			$filename = $path['filename'].'_'.time();
			$_FILES["company_banner"]["name"] = $filename.'.webp';
			$fileext = $path['extension'];
			
			if ($this->upload->do_upload('company_banner')) {
				$uploadData = $this->upload->data();
			   	$uploadbannerphoto = $uploadData['file_name'];
			}else{
			    echo $this->upload->display_errors();
			}

			if($fileext != 'webp'){
				if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')  
		        	$url = "https://";   
			    else  
			        $url = "http://";   
			    if($_SERVER['HTTP_HOST'] == 'localhost'){
			    	$url.= $_SERVER['HTTP_HOST'].':8080';
			    }
			    else{
			    	$url.= $_SERVER['HTTP_HOST'];
			    }

	         	$target_path = $url.'/control/upload/'.$companyid.'/banner/'.$uploadData['raw_name'].$uploadData['file_ext'];
	         	
	         	switch ($fileext) {
		            case 'jpeg':
		            case 'jpg':
		                $im = imagecreatefromjpeg($target_path);
		                break;

		            case 'png':
		                $im = imagecreatefrompng($target_path);
		                break;

		            case 'gif':
		                $im = imagecreatefromgif($target_path);
		                break;
		            default:
		                return false;
		        }
				imagewebp($im, './upload/'.$companyid.'/banner/'.$uploadData['raw_name'].'.webp' , 60);
			}

		}
		else{
			$uploadbannerphoto = $data['banner'];
		}


		if($this->Company_Model->updatelogo($companyid,$uploadphoto,$uploadbannerphoto)){
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


	public function fetchsocial_get($user_id = NULL){

		$user_id = $this->User_Model->getuserid($user_id);

		if($company_data = $this->Company_Model->getcompany($user_id)){
			$company_id = $company_data[0]['company_id'];
			if($social = $this->Company_Model->getsociallist($company_id)){
				$output['error'] = false;
	            $output['social'] = $social;
	            $output['message'] = "social data fetched successfully";
	            $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
				$output['social'] = [];
	            $output['message'] = "empty social data";
	            $this->set_response($output, REST_Controller::HTTP_OK);
			}
		}
		else{
				$output['error'] = true;
				$output['social'] = [];
	            $output['message'] = "empty social data";
	            $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}

	public function fetchallsocial_get(){
		if($social = $this->Company_Model->getsociallist()){
			$output['error'] = false;
            $output['social'] = $social;
            $output['message'] = "social data fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = false;
            $output['social'] = [];
            $output['message'] = "Empty Social Data";
            $this->set_response($output, REST_Controller::HTTP_OK);
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

	public function fetchcompanyfront_get($companyslug){
		if($company = $this->Company_Model->getcompanybyslug($companyslug)){
			$cities = $this->Company_Model->getcompanycities($company['company_id']);
			$social = $this->Company_Model->getfrontcompanysocial($company['company_id']);
			$client = $this->Client_Model->getclient($company['company_id']);
			$inquiry = $this->Inquiry_Model->getinquiry($company['company_id']);
			$portfolio = $this->Portfolio_Model->getportfolio($company['company_id']);
			$product = $this->Product_Model->getproduct($company['company_id']);
			$service = $this->Service_Model->getservice($company['company_id']);
			$testimonial = $this->Testimonial_Model->gettestimonial($company['company_id'],'active');
			$paymentinfo = $this->Company_Model->getpaymentdata($company['company_id']);


			$output['error'] = false;
            $output['company'] = $company;
            $output['companycities'] = $cities;
            $output['social'] = $social;
            $output['client'] = $client;
            $output['product'] = $product;
            $output['service'] = $service;
            $output['portfolio'] = $portfolio;
            $output['inquiry'] = $inquiry;
            $output['testimonial'] = $testimonial;
            $output['paymentinfo'] = $paymentinfo;
            $output['message'] = "Company fetched successfully";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = false;
            $output['company'] = [];
            $output['companycities'] = [];
            $output['social'] = [];
            $output['client'] = [];
            $output['product'] = [];
            $output['service'] = [];
            $output['portfolio'] = [];
            $output['inquiry'] = [];
            $output['testimonial'] = [];
            $output['paymentinfo'] = [];
            $output['newuser'] = 1;
            $output['message'] = "Empty Data";
            $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}


	public function fetchpaymentoptions_get($user_id){
		$user_id = $this->User_Model->getuserid($user_id);
		
		if($company_data = $this->Company_Model->getcompany($user_id)){
	 		$company_id = $company_data[0]['company_id'];

	 		if($payment_data = $this->Company_Model->getpaymentdata($company_id)){
				$output['error'] = false;
	            $output['paymentdata'] = $payment_data;
	            $output['message'] = "Payment Data fetched successfully";
	            $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = false;
	            $output['paymentdata'] = [];
	            $output['message'] = "Empty Payment Data";
	            $this->set_response($output, REST_Controller::HTTP_OK);
			}
		}
		else{
				$output['error'] = false;
	            $output['paymentdata'] = [];
	            $output['message'] = "Empty Payment Data";
	            $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}


	public function savesocial_post(){
		$data = $this->input->post();

		$user_id = $this->User_Model->getuserid($data['user_id']);

 		$company_data = $this->Company_Model->getcompany($user_id);
 		$companyid = $company_data[0]['company_id'];

 		$social_fields = array();
 		$i = 0;

	 	foreach (json_decode($data['socialdata']) as $value) {
	 		if($data['isupdate'] == 'true'){
	 			$social_fields[$i]['company_social_id'] = $value->company_social_id;
	 			$social_fields[$i]['social_id'] = $value->social_id;
	 		}
	 		else{
	 			$social_fields[$i]['social_id'] = $value->socialmedia_id;
	 		}
	 		$social_fields[$i]['link'] = $value->link;
	 		$social_fields[$i]['company_id'] = $companyid;
	 		$i++;
	 	}

 		if($data['isupdate'] == 'true'){
 			if($this->Company_Model->updatesocialdata($social_fields)){
				$output['error'] = false;
		        $output['message'] = "Social Data Updated";
		        $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
		        $output['message'] = "Error in Updation";
		        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}	
 		}
 		else{
 			if($this->Company_Model->savesocialdata($social_fields)){
				$output['error'] = false;
		        $output['message'] = "Social Data Saved Successfull";
		        $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
		        $output['message'] = "Error in Saving Social Data";
		        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}	
 		}
		
	}


	public function savepaymentoptions_post(){
		$data = $this->input->post();

		if($user_id = $this->User_Model->getuserid($data['user_id'])){
			$company_data = $this->Company_Model->getcompany($user_id);
	 		$companyid = $company_data[0]['company_id'];

	 		$sourcepath = './upload/qrcodeoriginal/';
	        $targetpath = './upload/qrcode/';

	 		if(!empty($_FILES['qrcode']['name'])){
			    $targetpath='./upload/'.$companyid.'/qrcode/';
			    if (!is_dir($targetpath)) {
			        mkdir($targetpath,0777,TRUE);
			    }            
			    $config['upload_path']   = $targetpath;
			    $config['allowed_types'] = "*";
			    $this->load->library('upload',$config);

				$path = pathinfo($_FILES["qrcode"]["name"]);
				$filename = $path['filename'].'_'.time();
				$_FILES["qrcode"]["name"] = $filename.'.webp';
				$fileext = $path['extension'];
				               
				if ($this->upload->do_upload('qrcode')) {
					$uploadData = $this->upload->data();
		            $uploadphoto = $uploadData['file_name'];
				}

				if($fileext != 'webp'){
					if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')   
				        $url = "https://";   
				    else  
				        $url = "http://";   
				    if($_SERVER['HTTP_HOST'] == 'localhost'){
				    	$url.= $_SERVER['HTTP_HOST'].':8080';
				    }
				    else{
				    	$url.= $_SERVER['HTTP_HOST'];
				    }

		         	$target_path = $url.'/control/upload/'.$companyid.'/qrcode/'.$uploadData['raw_name'].$uploadData['file_ext'];
		         	switch ($fileext) {
			            case 'jpeg':
			            case 'jpg':
			                $im = imagecreatefromjpeg($target_path);
			                break;

			            case 'png':
			                $im = imagecreatefrompng($target_path);
			                break;

			            case 'gif':
			                $im = imagecreatefromgif($target_path);
			                break;
			            default:
			                return false;
			        }
					imagewebp($im, './upload/'.$companyid.'/qrcode/'.$filename.'.webp' , 80);
				}
			}
			else{
				if($data['isupdate'] == 'true'){
					$uploadphoto = $data['logo'];
				}else{
					$uploadphoto = '';
				}
			}

	 		$paymentoption_field = array(
				'paytm_number'			=> $data['paytm_number'],
	            'googlepay_number' 		=> $data['googlepay_number'],
	            'phonepay_number' 		=> $data['phonepay_number'],
	            'razorpay_key_id' 		=> $data['razorpay_key_id'],
	            'razorpay_key_secret'	=> $data['razorpay_key_secret'],
	            'bank_name' 			=> $data['bank_name'],
	            'account_holder_name' 	=> $data['account_holder_name'],
	            'bank_account_number' 	=> $data['bank_account_number'],
	            'bank_ifsc_code' 		=> $data['bank_ifsc_code'],
	            'account_type' 			=> $data['account_type'],
	            'qrcode' 				=> $uploadphoto,
	            'company_id' 			=> $companyid,
	        );

			if($data['isupdate'] == 'true'){
				if($this->Company_Model->updatepaymentoptionsdata($paymentoption_field,$companyid)){
					$output['error'] = false;
					$output['message'] = "Payment Data Saved.";
					$this->set_response($output, REST_Controller::HTTP_OK);
				}
				else{
					$output['error'] = false;
				    $output['message'] = "Payment Data Saved Failed";
				    $this->set_response($output, REST_Controller::HTTP_OK);
				}
			}
			else{
				if($this->Company_Model->savepaymentoptionsdata($paymentoption_field)){
					$output['error'] = false;
					$output['message'] = "Payment Data Saved.";
					$this->set_response($output, REST_Controller::HTTP_OK);
				}
				else{
					$output['error'] = false;
				    $output['message'] = "Payment Data Saved Failed";
				    $this->set_response($output, REST_Controller::HTTP_OK);
				}
			}
		}
		else{
			$output['error'] = true;
			$output['message'] = "User Email Not Matched";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}

 		
	}


	public function fetchsocialcolor_get(){
		if($socialcolor = $this->Company_Model->getsocialcolors()){
			$output['error'] = false;
			$output['socialcolor'] = $socialcolor;
			$output['message'] = "Socialcolor Data Fetched";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = false;
			$output['socialcolor'] = [];
			$output['message'] = "Empty Socialcolor Data ";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
	}


	public function createsocial_post(){
		$data = $this->input->post();
		$social_field = array();

 		$i = 0;
	 	foreach (json_decode($data['social_data']) as $value) {
		 	if($data['isupdate'] == 'true'){
		 		$social_field[$i]['socialmedia_id'] = $value->socialmedia_id;
		 	}
		 	$social_field[$i]['socialmedia_name'] = $value->socialmedia_name;
		 	$social_field[$i]['socialmedia_logo'] = $value->socialmedia_logo;
		 	$social_field[$i]['socialmedia_color'] = $value->socialmedia_color;
	 		$i++;
	 	}

	 	if($data['isupdate'] == 'true'){
			if($this->Company_Model->updatesocial($social_field)){
				$output['error'] = false;
			    $output['message'] = "Social Data updated";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Social Data updated failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}        	
        }
        else{
        	if($this->Company_Model->createsocial($social_field)){
				$output['error'] = false;
			    $output['message'] = "Social Data Inserted";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Social Data Insertion failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}

	public function createsocialmediacolor_post(){
		$data = $this->input->post();
	
			if($this->Company_Model->createsocialcolor($data)){
				$output['error'] = false;
			    $output['message'] = "Socialcolor Data Saved";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Socialcolor Data Saved failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}        	
	}

	public function updatesocialmediacolor_post(){
		$data = $this->input->post();
		$social_field = array();

 		$i = 0;
	 	foreach (json_decode($data['socialcolor_data']) as $value) {
		 	$social_field[$i]['socialmedia_color_id'] = $value->socialmedia_color_id;
		 	$social_field[$i]['socialmedia_color_name'] = $value->socialmedia_color_name;
	 		$i++;
	 	}

        if($this->Company_Model->updatesocialcolor($social_field)){
			$output['error'] = false;
			$output['message'] = "Social Data Updated";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['message'] = "Social Data Updation failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}     	
	}

	public function deletesocialcolor_get($socialcolor_id){
		if($this->Company_Model->deletesocialcolordata($socialcolor_id)){
			$output['error'] = false;
			$output['message'] = "SocialColor Data Deleted";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['message'] = "This class is in used";
	        $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}


	public function deletesocial_get($social_id){
		if($this->Company_Model->deletesocialdata($social_id)){
			$output['error'] = false;
			$output['message'] = "Social Data Deleted";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['message'] = "Social Data Deletion failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}


	public function updatecompanystatus_post(){
		$data = $this->input->post();
		if($this->Company_Model->changestatus($data['company_id'],$data['status'])){
			$output['error'] = false;
		    $output['message'] = "Company Updated successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "Company Updation failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}




}

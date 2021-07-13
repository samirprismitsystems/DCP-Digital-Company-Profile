<?php
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Service extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

	public function createservice_post(){
		$data = $this->input->post();

 		$user_id = $this->User_Model->getuserid($data['user_id']);

 		$company_data = $this->Company_Model->getcompany($user_id);
 		$companyid = $company_data[0]['company_id'];

 		$service_field = array();
 		
 		$i = 0;
	 	foreach (json_decode($data['service_data']) as $value) {
		 	if($data['isupdate'] == 'true'){
		 		$service_field[$i]['service_id'] = $value->service_id;
		 		$service_field[$i]['service_image'] = $value->service_image;
		 	}
		 	$service_field[$i]['service_name'] = $value->service_name;
		 	$service_field[$i]['service_desc'] = $value->service_desc;
		 	$service_field[$i]['service_price'] = $value->service_price;
		 	$service_field[$i]['company_id'] = $companyid;
	 		$i++;
	 	}

	 	    $sourcepath = './upload/'.$companyid.'/serviceoroginal/';
            $targetpath = './upload/'.$companyid.'/service/';

	 	for ($i=0; $i < $data['imgcount'] ; $i++) {
 			$name = 'oldimages'.$i;
 			if(!empty($_FILES[$name]['name'])){
            
            // $targetpath = './upload/'.$companyid.'/service/';

			if (!is_dir($sourcepath)) {
				mkdir($sourcepath,0777,TRUE);
			}
			if (!is_dir($targetpath)) {
				mkdir($targetpath,0777,TRUE);
			}
			         
				$path = pathinfo($_FILES[$name]["name"]);
				if($path['extension'] == 'webp'){
					$config['upload_path']   = $targetpath;
				}
				else{
					$config['upload_path']   = $sourcepath;
				}
				$config['allowed_types'] = "*";

				$this->load->library('upload');
				$this->upload->initialize($config);
				$this->load->library('image_lib');

				$_FILES[$name]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
		        if ($this->upload->do_upload($name)) {
		        	$uploadData = $this->upload->data();
		           	$service_field[$i]['service_image'] = $uploadData['file_name'];
		        }
		        if($path['extension'] != 'webp'){
			        $source_path = $sourcepath.$uploadData['raw_name'].$uploadData['file_ext'];
	                $target_path = $targetpath.$uploadData['raw_name'].$uploadData['file_ext'];

			        $config_manip = array(
	                      'image_library' => 'gd2',
	                      'source_image' => $source_path,
	                      'new_image' => $target_path,
	                      'maintain_ratio' => false,
	                      'create_thumb' => false,
	                      'quality' =>'60%',
	                      'width' => 300,
	                      'height' => 300
	                    );
	                $this->image_lib->clear();
	                $this->image_lib->initialize($config_manip);
	                $this->image_lib->resize();
            	}

 			}
 			else{
 			}
 		}
		
        if($data['isupdate'] == 'true'){
        	if($this->Service_Model->updateservice($service_field)){
			$output['error'] = false;
		    $output['message'] = "Service Updated";
		    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Service updation failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
        else{
        	if($this->Service_Model->createservice($service_field)){
				$output['error'] = false;
			    $output['message'] = "Service Data Inserted";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Service Data Insertion failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}

	public function getservice_get($user_id){
		$user_id = $this->User_Model->getuserid($user_id);
		
		if($company_data = $this->Company_Model->getcompany($user_id)){
	 		$company_id = $company_data[0]['company_id'];

			if($service = $this->Service_Model->getservice($company_id)){
				$output['error'] = false;
				$output['service'] = $service;
			    $output['message'] = "Service Data get successfully";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = false;
				$output['service'] = [];
			    $output['message'] = "Empty Service Data";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
		}
		else{
				$output['error'] = false;
				$output['service'] = [];
			    $output['message'] = "Empty Service Data";
			    $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}

	public function deleteservice_get($servicve_id){
		// $product_id = $this->input->get('product_id');
		if($this->Service_Model->deleteservice($servicve_id)){
			$output['error'] = false;
		    $output['message'] = "Service deleted successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "Service deleted failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}

	
}

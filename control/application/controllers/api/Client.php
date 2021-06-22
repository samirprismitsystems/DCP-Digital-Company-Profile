<?php
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Client extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

	public function createclient_post(){
		$data = $this->input->post();

 		$user_id = $this->User_Model->getuserid($data['user_id']);
 		
 		$company_data = $this->Company_Model->getcompany($user_id);
 		$companyid = $company_data[0]['company_id'];

 		$client_field = array();
 		
 		$i = 0;
	 	foreach (json_decode($data['client_data']) as $value) {
		 	if($data['isupdate'] == 'true'){
		 		$client_field[$i]['client_id'] = $value->client_id;
		 		$client_field[$i]['client_logo'] = $value->client_logo;
		 	}
		 	$client_field[$i]['client_name'] = $value->client_name;
		 	$client_field[$i]['company_id'] = $companyid;
	 		$i++;
	 	}

	 	$sourcepath = './upload/'.$companyid.'/clientoginal/';
        $targetpath = './upload/'.$companyid.'/client/';
 		
 		for ($i=0; $i < $data['imgcount'] ; $i++) {
 			$name = 'oldimages'.$i;
 			if(!empty($_FILES[$name]['name'])){
            
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
	                $client_field[$i]['client_logo'] = $uploadData['file_name'];
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
			if($this->Client_Model->updateclient($client_field)){
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
        	if($this->Client_Model->createclient($client_field)){
				$output['error'] = false;
			    $output['message'] = "client Data Inserted";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "client Data Insertion failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}

	public function getclients_get($user_id = NULL){
		$user_id = $this->User_Model->getuserid($user_id);
		$company_data = $this->Company_Model->getcompany($user_id);
 		$company_id = $company_data[0]['company_id'];

		if($client = $this->Client_Model->getclient($company_id)){
			$output['error'] = false;
			$output['client'] = $client;
			$output['message'] = "client Data get successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['client'] = [];
			$output['message'] = "Empty Client Data.";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
	}


	public function deleteclient_get($client_id){
		if($this->Client_Model->deleteclient($client_id)){
			$output['error'] = false;
		    $output['message'] = "client deleted successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "client deleted failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}

	
}

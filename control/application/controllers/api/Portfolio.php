<?php
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Portfolio extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

	public function createportfolio_post(){
		$data = $this->input->post();

 		$user_id = $this->User_Model->getuserid($data['user_id']);
 		
 		$company_data = $this->Company_Model->getcompany($user_id);
 		$companyid = $company_data[0]['company_id'];

 		$portfolio_field = array();
 		
 		$i = 0;
	 	foreach (json_decode($data['portfolio_data']) as $value) {
		 	if($data['isupdate'] == 'true'){
		 		$portfolio_field[$i]['portfolio_id'] = $value->portfolio_id;
		 		$portfolio_field[$i]['portfolio_image'] = $value->portfolio_image;
		 	}
		 	$portfolio_field[$i]['portfolio_name'] = $value->portfolio_name;
		 	$portfolio_field[$i]['portfolio_desc'] = $value->portfolio_desc;
		 	$portfolio_field[$i]['company_id'] = $companyid;
	 		$i++;
	 	}

	 	$sourcepath = './upload/'.$companyid.'/portfoliooginal/';
        $targetpath = './upload/'.$companyid.'/portfolio/';

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
	                $portfolio_field[$i]['portfolio_image'] = $uploadData['file_name'];
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
			if($this->Portfolio_Model->updateportfolio($portfolio_field)){
				$output['error'] = false;
			    $output['message'] = "portfolio Data updated";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "portfolio Data updation failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}        	
        }
        else{
        	if($this->Portfolio_Model->createportfolio($portfolio_field)){
				$output['error'] = false;
			    $output['message'] = "portfolio Data Inserted";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "portfolio Data Insertion failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}

	public function getportfolio_get($user_id = NULL){
		$user_id = $this->User_Model->getuserid($user_id);
		$company_data = $this->Company_Model->getcompany($user_id);
 		$company_id = $company_data[0]['company_id'];

		if($portfolio = $this->Portfolio_Model->getportfolio($company_id)){
			$output['error'] = false;
			$output['portfolio'] = $portfolio;
			$output['message'] = "Portfolio Data get successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
			$output['portfolio'] = [];
	        $output['message'] = "Empty Portfolio Data";
	        $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}


	public function deleteportfolio_get($portfolio_id){
		// $client_id = $this->input->get('client_id');
		if($this->Portfolio_Model->deleteportfolio($portfolio_id)){
			$output['error'] = false;
		    $output['message'] = "Portfolio deleted successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "Portfolio deleted failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}

	
}

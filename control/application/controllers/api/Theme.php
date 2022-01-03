<?php
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Theme extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

    public function getthemes_get(){
    	if($themes = $this->Theme_Model->getallthemes()){
    		$output['error'] = false;
			$output['message'] = "Themes Get Successfully";
			$output['theme'] = $themes;
			$this->set_response($output, REST_Controller::HTTP_OK);
    	}
    	else{
    		$output['error'] = true;
	        $output['message'] = "User Data updated failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
    	}
    }

    public function deletetheme_get($theme_id){
    	if($this->Theme_Model->deletetheme($theme_id)){
    		$output['error'] = false;
			$output['message'] = "Themes Deleted Successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
    	}
    	else{
    		$output['error'] = true;
	        $output['message'] = "Themes Deleted failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
    	}
    }


    public function savecompanytheme_post(){
    	$data = $this->input->post();
    	$user_id = $this->User_Model->getuserid($data['user_id']);
 		$company_data = $this->Company_Model->getcompany($user_id);
 		$companyid = $company_data[0]['company_id'];

		$theme_field['company_id'] = $companyid;
		$theme_field['theme_id'] = $data['theme_id'];
	 	
    	if($this->Theme_Model->updatecompanytheme($theme_field)){
			$output['error'] = false;
			$output['message'] = "Theme Data updated";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['message'] = "Theme Data updated failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}  
    }


    public function createtheme_post(){
    	$data = $this->input->post();

 		$theme_field = array();
 		
 		$i = 0;
	 	foreach (json_decode($data['theme_data']) as $value) {
		 	if($data['isupdate'] == 'true'){
		 		$theme_field[$i]['theme_id'] = $value->theme_id;
		 		$theme_field[$i]['theme_image'] = $value->theme_image;
		 	}
		 	$theme_field[$i]['theme_name'] = $value->theme_name;
	 		$i++;
	 	}

	 	// $sourcepath = './upload/themesoriginal/';
        $targetpath = './upload/themes/';
 		
 		for ($i=0; $i < $data['imgcount']; $i++){
 			$name = 'images'.$i;
 			if(!empty($_FILES[$name]['name'])){
				if (!is_dir($targetpath)) {
					mkdir($targetpath,0777,TRUE);
				}
				$path = pathinfo($_FILES[$name]["name"]);
				$config['upload_path']   = $targetpath;
				$config['allowed_types'] = "*";
				$this->load->library('upload');
				$this->upload->initialize($config);
				// $this->load->library('image_lib');

				$_FILES[$name]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
		            if ($this->upload->do_upload($name)) {
		            	$uploadData = $this->upload->data();
		                $theme_field[$i]['theme_image'] = $uploadData['file_name'];
		            }
	 			}
	 			else{
	 			}
 		}

 		// print_r($theme_field);

        if($data['isupdate'] == 'true'){
			if($this->Theme_Model->updatetheme($theme_field)){
				$output['error'] = false;
			    $output['message'] = "Theme Data updated";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Theme Data updated failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}        	
        }
        else{
        	if($this->Theme_Model->createtheme($theme_field)){
				$output['error'] = false;
			    $output['message'] = "Theme Data Inserted";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Theme Data Insertion failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
    }

	


}

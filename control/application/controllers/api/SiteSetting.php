<?php
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class SiteSetting extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

    public function getsetting_get(){
		if($setting = $this->SiteSetting_Model->getsettings()){
			$output['error'] = false;
			$output['setting'] = $setting;
			$output['message'] = "Setting Data get successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['setting'] = [];
			$output['message'] = "Empty Setting Data";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
	}


	public function savegoogleanalytics_post(){
		$data = $this->input->post();

		$settingname = array(
                0 => 'before_body_ganalytics',
                1 => 'after_body_ganalytics',
            );
            
            $settingvalue = array();

            $settingvalue[0]= $data['before_body'];
            $settingvalue[1]= $data['after_body'];

			if($this->SiteSetting_Model->savesettings($settingname,$settingvalue)){
				$output['error'] = false;
			    $output['message'] = "Google Analytics Data Saved";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Google Analytics Data failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}


	}

	public function savesetting_post(){
		$data = $this->input->post();
 		
 		if( !empty($_FILES['site_logo']['name'])) {
 			$sourcepath = './upload/originalsetting/';
        	$targetpath = './upload/setting/';

 			if (!is_dir($sourcepath)) {
				mkdir($sourcepath,0777,TRUE);
			}

			if (!is_dir($targetpath)) {
				mkdir($targetpath,0777,TRUE);
			}

			$config['upload_path']   = $sourcepath;
			$config['allowed_types'] = "*";
			$this->load->library('upload',$config);
			$this->load->library('image_lib');


			$path = pathinfo($_FILES["site_logo"]["name"]);
			$_FILES["site_logo"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
	            if ($this->upload->do_upload("site_logo")) {
	            	$uploadData = $this->upload->data();
	                $sitelogo = $uploadData['file_name'];
	            }

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
 			else{
 				$sitelogo = $data['logo'];
 			}

 			$settingname = array(
                0 => 'site_logo',
                1 => 'site_title',
                2 => 'site_desc',
                3 => 'facebookurl',
                4 => 'instaurl',
                5 => 'linkedurl',
                6 => 'site_email',
                7 => 'footer_pages',
            );
            
            $settingvalue = array();

            $settingvalue[0]= $sitelogo;
            $settingvalue[1]= $data['site_title'];
            $settingvalue[2]= $data['site_desc'];
            $settingvalue[3]= $data['facebookurl'];
            $settingvalue[4]= $data['instaurl'];
            $settingvalue[5]= $data['linkedurl'];
            $settingvalue[6]= $data['site_email'];
            $settingvalue[7]= $data['footer_pages'];

			if($this->SiteSetting_Model->savesettings($settingname,$settingvalue)){
				$output['error'] = false;
			    $output['message'] = "Setting Data Saved";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Setting Data failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
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

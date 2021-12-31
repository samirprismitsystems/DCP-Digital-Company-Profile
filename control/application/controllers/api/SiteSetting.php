<?php
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class SiteSetting extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

    public function getfiledata($filename){
		if (!is_dir('./cache')) {
			mkdir('./cache',0777,TRUE);
		}
		if(file_exists('./cache/'.$filename)){
			$filedata = json_decode(file_get_contents('./cache/'.$filename));
			return $filedata;
		}
		return false;
	}


	public function createfile($filename,$data){
		if (!is_dir('./cache')) {
				mkdir('./cache',0777,TRUE);
		}
		$myfile = fopen('./cache/'.$filename, "a");
		fwrite($myfile, json_encode($data));
		fclose($myfile);
		return $filedata = json_decode(file_get_contents('./cache/'.$filename));
	}

    public function getsetting_get(){
		$output['error'] = false;
		$output['message'] = "Pages Data get successfully";
		
		if($data = $this->getfiledata('sitesetting.json')){
			$output['setting'] = $data;
		}
		else{
			if($setting = $this->SiteSetting_Model->getsettings()){	
				$filedata = $this->createfile('sitesetting.json',$setting);
				$output['setting'] = $filedata;
			}
			else{
				$output['error'] = true;
				$output['message'] = "Empty Setting Data";
		        $output['setting'] = [];
			}
		}
		$this->set_response($output, REST_Controller::HTTP_OK);
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
 			$targetpath = './upload/setting/';

			if (!is_dir($targetpath)) {
				mkdir($targetpath,0777,TRUE);
			}

			$config['upload_path']   = $targetpath;
			$config['allowed_types'] = "*";
			$this->load->library('upload',$config);
			$this->load->library('image_lib');


			$path = pathinfo($_FILES["site_logo"]["name"]);
			$_FILES["site_logo"]["name"] = $path['filename'].'_'.time().'.webp';
			$fileext = $path['extension'];
	        
	        if ($this->upload->do_upload("site_logo")) {
	           	$uploadData = $this->upload->data();
	            $sitelogo = $uploadData['file_name'];
	        }

	        if($path['extension'] != 'webp'){
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

		         	$target_path = $url.'/control/upload/setting/'.$uploadData['raw_name'].$uploadData['file_ext'];
		         	
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
					imagewebp($im, './upload/setting/'.$uploadData['raw_name'].'.webp' , 60);
	        }


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

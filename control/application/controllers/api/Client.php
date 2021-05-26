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

 		$user_id = $this->input->post('user_id');
 		$company_data = $this->Company_Model->getcompany($user_id);

 		$companyid = $company_data[0]['company_id'];

 		if(!empty($_FILES['client_logo']['name'])){
		    $targetpath='./upload/'.$companyid.'/clients/';
		    if (!is_dir($targetpath)) {
		        mkdir($targetpath,0777,TRUE);
		    }                  
		    $config['upload_path']   = $targetpath;
		    $config['allowed_types'] = "*";
		    $this->load->library('upload',$config);
			$path = pathinfo($_FILES["client_logo"]["name"]);
			$_FILES["client_logo"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];               
			if ($this->upload->do_upload('client_logo')) {
			   	$uploadphoto = $this->upload->data('file_name');
			}else{
			    echo $this->upload->display_errors();
			}
		}
		else{
			$uploadphoto = $data['client_logo'];
		}

		$client_field = array(
			'client_name' => $data['client_name'],
            'client_logo' => $uploadphoto,
        	'company_id' => $companyid,
        );

        if($data['isupdate'] == 'true'){
			if($this->Client_Model->updateclient($client_field,$data['client_id'])){
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

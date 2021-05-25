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

 		$user_id = $this->input->post('user_id');
 		$company_data = $this->Company_Model->getcompany($user_id);

 		$companyid = $company_data[0]['company_id'];

 		if(!empty($_FILES['portfolio_image']['name'])){
		    $targetpath='./upload/'.$companyid.'/portfolio/';
		    if (!is_dir($targetpath)) {
		        mkdir($targetpath,0777,TRUE);
		    }                  
		    $config['upload_path']   = $targetpath;
		    $config['allowed_types'] = "*";
		    $this->load->library('upload',$config);
			$path = pathinfo($_FILES["portfolio_image"]["name"]);
			$_FILES["portfolio_image"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];               
			if ($this->upload->do_upload('portfolio_image')) {
			   	$uploadphoto = $this->upload->data('file_name');
			}else{
			    echo $this->upload->display_errors();
			}
		}
		else{
			$uploadphoto = $data['portfolio_image'];
		}

		$portfolio_field = array(
			'portfolio_name' => $data['portfolio_name'],
            'portfolio_desc' => $data['portfolio_desc'],
            'portfolio_image' => $uploadphoto,
        	'company_id' => $companyid,
        );

        if($data['isupdate'] == 'true'){
			if($this->Portfolio_Model->updateportfolio($portfolio_field,$data['portfolio_id'])){
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

	public function getportfolio_get($company_id = NULL){
		// $company_id = $this->input->get();
		if($client = $this->Portfolio_Model->getportfolio($company_id)){
			$output['error'] = false;
			$output['portfolio'] = $client;
			$output['message'] = "client Data get successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['message'] = "client Data get failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
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

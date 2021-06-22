<?php

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Inquiry extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

	public function createinquiry_post(){
		$data = $this->input->post();
		
		$companyid = $this->input->post('company_id');
		
		$inquiry_field = array(
			'client_name' => $data['client_name'],
            'email_address' => $data['email_address'],
            'phone_number' => $data['phone_number'],
            'message'=> $data['message'],
            'company_id' => $companyid
        );

        if($data['isupdate'] == 'true'){
        	if($this->Inquiry_Model->updateinquiry($inquiry_field,$data['inquiry_id'])){
			$output['error'] = false;
		    $output['message'] = "inquiry Updated";
		    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "inquiry updation failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
        else{
        	if($this->Inquiry_Model->createinquiry($inquiry_field)){
				$output['error'] = false;
			    $output['message'] = "inquiry Data Inserted";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "inquiry Data Insertion failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}


	public function updateinquirystatus_post(){
		$data = $this->input->post();
		if($this->Inquiry_Model->changestatus($data['inquiry_id'],$data['status'])){
			$output['error'] = false;
		    $output['message'] = "Inquiry Updated successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "Inquiry Updation failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}	
	}


	public function getinquiry_get($user_id){
		$user_id = $this->User_Model->getuserid($user_id);
		$company_data = $this->Company_Model->getcompany($user_id);
 		$company_id = $company_data[0]['company_id'];

		if($inquiry = $this->Inquiry_Model->getinquiry($company_id)){
			$output['error'] = false;
			$output['inquiry'] = $inquiry;
		    $output['message'] = "inquiry Data get successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = false;
			$output['inquiry'] = [];
		    $output['message'] = "Empty inquiry Data";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}

	public function deleteinquiry_get($inquiry_id){
		// $product_id = $this->input->get('product_id');
		if($this->Inquiry_Model->deleteinquiry($inquiry_id)){
			$output['error'] = false;
		    $output['message'] = "inquiry deleted successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "inquiry deleted failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}

	
}

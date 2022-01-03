<?php

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Testimonial extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

	public function createtestimonial_post(){
		$data = $this->input->post();

		if($this->input->post('user_id') != 0){
			$user_id = $this->input->post('user_id');
			$company_data = $this->Company_Model->getcompany($user_id);
 			$companyid = $company_data[0]['company_id'];
		}
		else{
			$companyid = $this->input->post('company_id');
		}


		$testimonial_field = array(
			'client_name' => $data['client_name'],
            'comment' => $data['comment'],
            'email_address' => $data['email_address'],
            'ratting'=> $data['ratting'],
            'company_id' => $companyid,
        );

        if($data['isupdate'] == 'true'){
        	if($this->Testimonial_Model->updatetestimonial($testimonial_field,$data['testimonial_id'])){
			$output['error'] = false;
		    $output['message'] = "Testimonial Updated";
		    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Testimonial updation failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
        else{
        	if($this->Testimonial_Model->createtestimonial($testimonial_field)){
				$output['error'] = false;
			    $output['message'] = "Testimonial Data Submitted";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Testimonial Data Insertion failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}
	
	public function gettestimonial_get($user_id){
		$user_id = $this->User_Model->getuserid($user_id);
		
		if($company_data = $this->Company_Model->getcompany($user_id)){
	 		$company_id = $company_data[0]['company_id'];
	 		
			if($testimonial = $this->Testimonial_Model->gettestimonial($company_id)){
				$output['error'] = false;
				$output['testimonial'] = $testimonial;
			    $output['message'] = "Testimonial Data get successfully";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = false;
				$output['testimonial'] = [];
			    $output['message'] = "Empty Testimonial Data";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
		}
		else{
				$output['error'] = false;
				$output['testimonial'] = [];
			    $output['message'] = "Empty Testimonial Data";
			    $this->set_response($output, REST_Controller::HTTP_OK);
		}
	}

	public function updatetestimonialstatus_post(){
		$data = $this->input->post();
		if($this->Testimonial_Model->changestatus($data['testimonial_id'],$data['status'])){
			$output['error'] = false;
		    $output['message'] = "Testimonial Updated successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "Testimonial Updation failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}	
	}

	public function deletetestimonial_get($testimonial_id){
		// $product_id = $this->input->get('product_id');
		if($this->Testimonial_Model->deletetestimonial($testimonial_id)){
			$output['error'] = false;
		    $output['message'] = "Testimonial deleted successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "Testimonial deleted failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}

	
}

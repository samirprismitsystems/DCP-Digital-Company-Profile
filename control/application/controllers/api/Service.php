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

 		$user_id = $this->input->post('user_id');
 		$company_data = $this->Company_Model->getcompany($user_id);

 		// $companyname = $company_data[0]['company_name'];
 		$companyid = $company_data[0]['company_id'];

 		if(!empty($_FILES['service_image']['name'])){

		    $targetpath='./upload/'.$companyid.'/service/';
		    if (!is_dir($targetpath)) {
		        mkdir($targetpath,0777,TRUE);
		    }
		                   
		    $config['upload_path']   = $targetpath;
		    $config['allowed_types'] = "*";
		    $this->load->library('upload',$config);
			$path = pathinfo($_FILES["service_image"]["name"]);
			$_FILES["service_image"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
			               
			if ($this->upload->do_upload('service_image')) {
			   	$uploadphoto = $this->upload->data('file_name');
			}else{
			    echo $this->upload->display_errors();
			}
		}
		else{
			$uploadphoto = $data['service_image'];
		}

		$service_field = array(
			'service_name' => $data['service_name'],
            'service_desc' => $data['service_desc'],
            'service_price' => $data['service_price'],
            'service_image'=> $uploadphoto,
            'company_id' => $companyid
        );

        if($data['isupdate'] == 'true'){
        	if($this->Service_Model->updateservice($service_field,$data['service_id'])){
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

	// public function updateservice_post(){
	// 	$data = $this->input->post();
	// 	$product_id = $this->input->post('product_id');

	// 	$user_id = $this->input->post('user_id');
 // 		$company_data = $this->Company_Model->getcompany($user_id);

 // 		$companyname = $company_data[0]['company_name'];
 // 		$companyid = $company_data[0]['company_id'];

 // 		if(!empty($_FILES['product_image']['name'])){

	// 	    $targetpath='./upload/'.strtolower($companyname).'/products/';
	// 	    if (!is_dir($targetpath)) {
	// 	        mkdir($targetpath,0777,TRUE);
	// 	    }
		                   
	// 	    $config['upload_path']   = $targetpath;
	// 	    $config['allowed_types'] = "*";
	// 	    $this->load->library('upload',$config);
	// 		$path = pathinfo($_FILES["product_image"]["name"]);
	// 		$_FILES["product_image"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
			               
	// 		if ($this->upload->do_upload('product_image')) {
	// 		   	$uploadphoto = $this->upload->data('file_name');
	// 		}else{
	// 		    echo $this->upload->display_errors();
	// 		}
	// 	}
	// 	else{
	// 		$uploadphoto = $data['product_image'];
	// 	}


	// 	$product_field = array(
	// 		'product_name' => $data['product_name'],
 //            'product_desc' => $data['product_desc'],
 //            'product_price' => $data['product_price'],
 //            'product_image'=> $uploadphoto,
 //        );

	// 	if($this->Product_Model->updateproduct($product_field,$product_id)){
	// 		$output['error'] = false;
	// 	    $output['message'] = "Product Updated successfully";
	// 	    $this->set_response($output, REST_Controller::HTTP_OK);
	// 	}
	// 	else{
	// 		$output['error'] = true;
 //            $output['message'] = "Product Data Updation failed";
 //            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
	// 	}
	// }

	public function getservice_get($company_id){
		// $company_id = $this->input->get('company_id');
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

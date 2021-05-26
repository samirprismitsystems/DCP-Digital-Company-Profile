<?php
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Product extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

	public function createproduct_post(){
		$data = $this->input->post();

 		$user_id = $this->input->post('user_id');
 		$company_data = $this->Company_Model->getcompany($user_id);

 		// $companyname = $company_data[0]['company_name'];
 		$companyid = $company_data[0]['company_id'];

 		if(!empty($_FILES['product_image']['name'])){

		    $targetpath='./upload/'.$companyid.'/products/';
		    if (!is_dir($targetpath)) {
		        mkdir($targetpath,0777,TRUE);
		    }
		                   
		    $config['upload_path']   = $targetpath;
		    $config['allowed_types'] = "*";
		    $this->load->library('upload',$config);
			$path = pathinfo($_FILES["product_image"]["name"]);
			$_FILES["product_image"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
			               
			if ($this->upload->do_upload('product_image')) {
			   	$uploadphoto = $this->upload->data('file_name');
			}else{
			    echo $this->upload->display_errors();
			}
		}
		else{
			$uploadphoto = $data['product_image'];
		}

		$product_field = array(
			'product_name' => $data['product_name'],
            'product_desc' => $data['product_desc'],
            'product_price' => $data['product_price'],
            'product_image'=> $uploadphoto,
            'company_id' => $companyid
        );

        if($data['isupdate'] == 'true'){
			if($this->Product_Model->updateproduct($product_field,$data['product_id'])){
				$output['error'] = false;
			    $output['message'] = "Product Data updated";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Product Data updated failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}        	
        }
        else{
        	if($this->Product_Model->createproduct($product_field)){
				$output['error'] = false;
			    $output['message'] = "Product Data Inserted";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Product Data Insertion failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}

	public function getproducts_get($user_id = NULL){
		$company_data = $this->Company_Model->getcompany($user_id);
 		$company_id = $company_data[0]['company_id'];

		if($product = $this->Product_Model->getproduct($company_id)){
			$output['error'] = false;
			$output['product'] = $product;
		    $output['message'] = "Product Data get successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['message'] = "Product Data get failed";
	        $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}


	public function deleteproduct_get($product_id){
		if($this->Product_Model->deleteproduct($product_id)){
			$output['error'] = false;
		    $output['message'] = "Product deleted successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "Product deleted failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}

	
}

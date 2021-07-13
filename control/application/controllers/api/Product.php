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

 		$user_id = $this->User_Model->getuserid($data['user_id']);
 		
 		$company_data = $this->Company_Model->getcompany($user_id);
 		$companyid = $company_data[0]['company_id'];

 		$product_field = array();
 		
 		$i = 0;
	 	foreach (json_decode($data['product_data']) as $value) {
		 	if($data['isupdate'] == 'true'){
		 		$product_field[$i]['product_id'] = $value->product_id;
		 		$product_field[$i]['product_image'] = $value->product_image;
		 	}
		 	$product_field[$i]['product_name'] = $value->product_name;
		 	$product_field[$i]['product_desc'] = $value->product_desc;
		 	$product_field[$i]['product_price'] = $value->product_price;
		 	$product_field[$i]['company_id'] = $companyid;
	 		$i++;
	 	}

	 	$sourcepath = './upload/'.$companyid.'/productoginal/';
        $targetpath = './upload/'.$companyid.'/product/';

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
	                $product_field[$i]['product_image'] = $uploadData['file_name'];
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
			if($this->Product_Model->updateproduct($product_field)){
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
		$user_id = $this->User_Model->getuserid($user_id);
		
		if($company_data = $this->Company_Model->getcompany($user_id)){
	 		$company_id = $company_data[0]['company_id'];
			if($product = $this->Product_Model->getproduct($company_id)){
				$output['error'] = false;
				$output['product'] = $product;
			    $output['message'] = "Product Data get successfully";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
				$output['product'] = [];
		        $output['message'] = "Empty Product Data";
		        $this->set_response($output, REST_Controller::HTTP_OK);
			}
		}
		else{
				$output['error'] = true;
				$output['product'] = [];
		        $output['message'] = "Empty Product Data";
		        $this->set_response($output, REST_Controller::HTTP_OK);
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

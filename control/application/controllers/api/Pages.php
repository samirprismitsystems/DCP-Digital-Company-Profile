<?php
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Pages extends REST_Controller {

	public function __construct() {
       parent::__construct();
       $this->load->database();
    }

	public function createpage_post(){
		$data = $this->input->post();

		if($data['isupdate'] == 'true'){
 			$page_id = $data['page_id'];
 		}

 
 		if($data['template_name'] == 'default_template'){
 			$page_content = array(
	 			'page_title' => $data['page_title'],
	 			'page_content' => $data['page_content'],
 			);
 		}
 		else if($data['template_name'] == 'landingpage_template'){
 			$sourcepath = './upload/landingpageoriginal/';
        	$targetpath = './upload/landingpage/';

			if (!is_dir($sourcepath)) {
				mkdir($sourcepath,0777,TRUE);
			}
			if (!is_dir($targetpath)) {
				mkdir($targetpath,0777,TRUE);
			}
			$config['upload_path']   = $sourcepath;
			$config['allowed_types'] = "*";
			$this->load->library('upload');
			$this->upload->initialize($config);
			$this->load->library('image_lib');

			// Home Image
			if(!empty($_FILES['homeimg']['name'])){
				$path = pathinfo($_FILES["homeimg"]["name"]);
				$_FILES["homeimg"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
	            if ($this->upload->do_upload("homeimg")) {
	            	$uploadData = $this->upload->data();
	                $homeuploadfile = $uploadData['file_name'];
	            }
	         //    $source_path = $sourcepath.$uploadData['raw_name'].$uploadData['file_ext'];
          //       $target_path = $targetpath.$uploadData['raw_name'].$uploadData['file_ext'];
		        // $config_manip = array(
          //           'image_library' => 'gd2',
          //           'source_image' => $source_path,
          //           'new_image' => $target_path,
          //           'maintain_ratio' => false,
          //           'create_thumb' => false,
          //           'quality' =>'60%',
          //          	'allowed_types' => "*",
          //           // 'width' => 300,
          //           // 'height' => 300
          //       );
          //       $this->image_lib->clear();
          //       $this->image_lib->initialize($config_manip);
          //       $this->image_lib->resize();
			}
			else{
				$homeuploadfile = $data['homeimgpic'];
			}

			// Card Image 1
			if(!empty($_FILES['cardimg1']['name'])){
				$path = pathinfo($_FILES["cardimg1"]["name"]);
				$_FILES["cardimg1"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
	            if ($this->upload->do_upload("cardimg1")) {
	            	$uploadData = $this->upload->data();
	                $card1uploadfile = $uploadData['file_name'];
	            }
	         //    $source_path = $sourcepath.$uploadData['raw_name'].$uploadData['file_ext'];
          //       $target_path = $targetpath.$uploadData['raw_name'].$uploadData['file_ext'];
		        // $config_manip = array(
          //           'image_library' => 'gd2',
          //           'source_image' => $source_path,
          //           'new_image' => $target_path,
          //           'maintain_ratio' => TRUE,
          //           'create_thumb' => false,
          //           'quality' =>'60%',
          //           'allowed_types' => "*",
          //           // 'width' => 300,
          //           // 'height' => 300
          //       );

          //       $this->image_lib->clear();
          //       $this->image_lib->initialize($config_manip);
          //       $this->image_lib->resize();

			}
			else{
				$card1uploadfile = $data['cardimg1pic'];
			}

			// Card Image 2
			if(!empty($_FILES['cardimg2']['name'])){
				$path = pathinfo($_FILES["cardimg2"]["name"]);
				$_FILES["cardimg2"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
	            if ($this->upload->do_upload("cardimg2")) {
	            	$uploadData = $this->upload->data();
	                $card2uploadfile = $uploadData['file_name'];
	            }
	         //    $source_path = $sourcepath.$uploadData['raw_name'].$uploadData['file_ext'];
          //       $target_path = $targetpath.$uploadData['raw_name'].$uploadData['file_ext'];
		        // $config_manip = array(
          //           'image_library' => 'gd2',
          //           'source_image' => $source_path,
          //           'new_image' => $target_path,
          //           'maintain_ratio' => false,
          //           'create_thumb' => false,
          //           'quality' =>'60%',
          //           'width' => 300,
          //           'height' => 300
          //       );
          //       $this->image_lib->clear();
          //       $this->image_lib->initialize($config_manip);
          //       $this->image_lib->resize();
			}
			else{
				$card2uploadfile = $data['cardimg2pic'];
			}

			// Free Trail Image 
			if(!empty($_FILES['ftimg']['name'])){
				$path = pathinfo($_FILES["ftimg"]["name"]);
				$_FILES["ftimg"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
	            if ($this->upload->do_upload("ftimg")) {
	            	$uploadData = $this->upload->data();
	                $freetrailuploadfile = $uploadData['file_name'];
	            }
	         //    $source_path = $sourcepath.$uploadData['raw_name'].$uploadData['file_ext'];
          //       $target_path = $targetpath.$uploadData['raw_name'].$uploadData['file_ext'];
		        // $config_manip = array(
          //           'image_library' => 'gd2',
          //           'source_image' => $source_path,
          //           'new_image' => $target_path,
          //           'maintain_ratio' => false,
          //           'create_thumb' => false,
          //           'quality' =>'60%',
          //           'width' => 300,
          //           'height' => 300
          //       );
          //       $this->image_lib->clear();
          //       $this->image_lib->initialize($config_manip);
          //       $this->image_lib->resize();
			}
			else
			{
				$freetrailuploadfile = $data['ftimgpic'];
			}
			
			// FAQ Image 
			if(!empty($_FILES['faqimg']['name'])){
				$path = pathinfo($_FILES["faqimg"]["name"]);
				$_FILES["faqimg"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
	            if ($this->upload->do_upload("faqimg")) {
	            	$uploadData = $this->upload->data();
	                $faquploadfile = $uploadData['file_name'];
	            }
	         //    $source_path = $sourcepath.$uploadData['raw_name'].$uploadData['file_ext'];
          //       $target_path = $targetpath.$uploadData['raw_name'].$uploadData['file_ext'];
		        // $config_manip = array(
          //           'image_library' => 'gd2',
          //           'source_image' => $source_path,
          //           'new_image' => $target_path,
          //           'maintain_ratio' => false,
          //           'create_thumb' => false,
          //           'quality' =>'60%',
          //           'width' => 300,
          //           'height' => 300
          //       );
          //       $this->image_lib->clear();
          //       $this->image_lib->initialize($config_manip);
          //       $this->image_lib->resize();
			}
			else{
				$faquploadfile = $data['faqimgpic'];
			}

			$page_content = array(
	 			'hometitle' => $data['hometitle'],
	 			'homesubtitle' => $data['homesubtitle'],
	 			'homedesc' => $data['homedesc'],
	 			'homeimg' => $homeuploadfile,
	 			'homebtntitle' => $data['homebtntitle'],
	 			'homebtnlink' => $data['homebtnlink'],
	 			
	 			'steps' => $data['steps'],

	 			'cardtitle1' => $data['cardtitle1'],
	 			'carddesc1' => $data['carddesc1'],
	 			'cardimg1' => $card1uploadfile,
	 			
	 			'cardtitle2' => $data['cardtitle2'],
	 			'carddesc2' => $data['carddesc2'],
	 			'cardimg2' => $card2uploadfile,
	 			
	 			'featuretitle' => $data['featuretitle'],
	 			'featuresubtitle' => $data['featuresubtitle'],
	 			'featuredesc' => $data['featuredesc'],
	 			'featurebtntitle' => $data['featurebtntitle'],
	 			'featurebtnlink' => $data['featurebtnlink'],
	 			'logoandtext' => $data['logoandtext'],
	 			
	 			'faqtitle' => $data['faqtitle'],
	 			'faqdesc' => $data['faqdesc'],
	 			'faqimg' => $faquploadfile,
	 			'accordian' => $data['accordian'],
	 			
	 			'fttitle' => $data['fttitle'],
	 			'ftdesc' => $data['ftdesc'],
	 			'ftimg' => $freetrailuploadfile,
	 			'ftbtntitle' => $data['ftbtntitle'],
	 			'ftbtnlink' => $data['ftbtnlink'],
	 			
	 			'reviewtitle' => $data['reviewtitle'],
	 			'reviewsubtitle' => $data['reviewsubtitle'],
	 			'reviewdesc' => $data['reviewdesc'],
	 			
	 			'contacttitle' => $data['contacttitle'],
	 			'contactdesc' => $data['contactdesc'],

	 			'footerpages' => $data['footerpages'],

 			);


 		}

 		if(!empty($_FILES['meta_image']['name'])){
            
            $sourcepathmeta = './upload/metaimgoriginal/';
        	$targetpathmeta = './upload/metaimg/';

				if (!is_dir($sourcepathmeta)) {
					mkdir($sourcepathmeta,0777,TRUE);
				}

				if (!is_dir($targetpathmeta)) {
					mkdir($targetpathmeta,0777,TRUE);
				}

				$configmeta['upload_path']   = $sourcepathmeta;
				$configmeta['allowed_types'] = "*";
				$this->load->library('upload');
				$this->upload->initialize($configmeta);
				$this->load->library('image_lib');

	        $path = pathinfo($_FILES["meta_image"]["name"]);
			$_FILES["meta_image"]["name"] = $path['filename'].'_'.time().'.'.$path['extension'];
	            if ($this->upload->do_upload("meta_image")) {
	            	$uploadData = $this->upload->data();
	                $uploadfile = $uploadData['file_name'];
	            }

	         //    $source_path_meta = $sourcepathmeta.$uploadData['raw_name'].$uploadData['file_ext'];
          //       $target_path_meta = $targetpathmeta.$uploadData['raw_name'].$uploadData['file_ext'];

		        // $config_manip = array(
          //           'image_library' => 'gd2',
          //           'source_image' => $source_path_meta,
          //           'new_image' => $target_path_meta,
          //           'maintain_ratio' => false,
          //           'create_thumb' => false,
          //           'quality' =>'60%',
          //           'width' => 300,
          //           'height' => 300
          //       );
          //       $this->image_lib->clear();
          //       $this->image_lib->initialize($config_manip);
          //       $this->image_lib->resize();
 			}
 			else{
 				$uploadfile = $data['meta_image_name'];
 			}
 		
		$content = serialize($page_content);
 		$page_field = array(
 			'template_name' => $data['template_name'],
 			'page_slug' => $data['page_slug'],
 			'page_name' => $data['page_name'],
 			'page_content' => $content,
 			'meta_title' => $data['meta_title'],
 			'meta_description' => $data['meta_description'],
 			'meta_keywords' => $data['meta_keywords'],
 			'meta_image' => $uploadfile
 		);
 		
        if($data['isupdate'] == 'true'){
			if($this->Page_Model->updatepage($page_field,$page_id)){
				$output['error'] = false;
			    $output['message'] = "Page Data updated";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Page Data updated failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}        	
        }
        else{
        	if($this->Page_Model->createpage($page_field)){
				$output['error'] = false;
			    $output['message'] = "Page Added Successfull";
			    $this->set_response($output, REST_Controller::HTTP_OK);
			}
			else{
				$output['error'] = true;
	            $output['message'] = "Page Added Failed";
	            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
			}
        }
	}



	public function getpages_get(){
		
		if($allpages = $this->Page_Model->getpagesdata()){
			$pagedata = array();
			$i = 0;
			foreach ($allpages as  $value) {
				$pagedata[$i]['page_content'] = unserialize($value['page_content']);
				$pagedata[$i]['page_id'] = $value['page_id'];
				$pagedata[$i]['page_name'] = $value['page_name'];
				$pagedata[$i]['page_slug'] = $value['page_slug'];
				$pagedata[$i]['template_name'] = $value['template_name'];
				$pagedata[$i]['meta_title'] = $value['meta_title'];
				$pagedata[$i]['meta_keywords'] = $value['meta_keywords'];
				$pagedata[$i]['meta_description'] = $value['meta_description'];
				$pagedata[$i]['meta_image'] = $value['meta_image'];
				$i++;
			}
			$output['error'] = false;
			$output['pages'] = $pagedata;
			$output['message'] = "Pages Data get successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['pages'] = [];
			$output['message'] = "Empty Pages Data.";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
	}


	public function getsomepagedata_post(){
		$data = $this->input->post();

		if($pagedata = $this->Page_Model->getsomepages($data)){
			$output['error'] = false;
			$output['pages'] = $pagedata;
			$output['message'] = "Pages Data get successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}

		
	}

	

	public function getsinglepage_get($page_slug){
		if($page = $this->Page_Model->getsinglepagedata($page_slug)){
			$output['error'] = false;
			$output['page'] = $page;
			$output['page_content'] = unserialize($page['page_content']);
			$output['message'] = "Pages Data get successfully";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
	        $output['page'] = [];
	        $output['page_content'] = [];
			$output['message'] = "Empty Pages Data.";
			$this->set_response($output, REST_Controller::HTTP_OK);
		}
	}	


	public function deletepage_get($page_id){
		if($this->Page_Model->deletepage($page_id)){
			$output['error'] = false;
		    $output['message'] = "Page Deleted Successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
		}
		else{
			$output['error'] = true;
            $output['message'] = "Page Deleted Failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
		}
	}


	public function sendemail_post(){
		$data = $this->input->post();
		$this->load->library('email');

        $this->email->from($data['email'], 'Digital Company Profile');
        $this->email->to($data['email']);
        $this->email->subject('Contact Email From Digital Company Profile');
        $message = "Email Address :". $data['contactemail'] . "\n Name :" . $data['name'] . "\n Message :" . $data['message'];
        $this->email->message($message);

       	if($this->email->send()){
       		$output['error'] = false;
		    $output['message'] = "Email Sent Successfully";
		    $this->set_response($output, REST_Controller::HTTP_OK);
       	}
       	else{
       		$output['error'] = true;
            $output['message'] = "Email Sent Failed";
            $this->set_response($output, REST_Controller::HTTP_NOT_FOUND);
       	}
	}

	
}

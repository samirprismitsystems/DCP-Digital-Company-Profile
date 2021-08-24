<?php

// error_reporting(0);

require_once(APPPATH . 'core/My_Controller.php');

class App extends My_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('users_model');
        $this->load->model('emails_model');
        $this->load->model('location_model');
        $this->load->model('packages_model');
        $this->load->model('lession_model');
        $this->load->model('payments_model');
        $this->load->model('booking_model');
        $this->load->model('awards_model');
        $this->load->model('notification_model');
        $this->load->model('associations_model');
        $this->load->model('qualifications_model');
        $this->load->model('journal_model');
        $this->load->library('users_lib');
        $this->load->helper('url');
        include('shortcodes.php');
    }

    public function index() {
        if (isset($_REQUEST['print'])) {
            print_r($_REQUEST);
            print_r($_FILES);
        }

        $data = $_REQUEST;

        // print_r($data);

        if (isset($data['action']) && $data['action'] != '') {
            if ($data['action'] == "add_notification") {
                $notification['to'] = $data['to'];
                $notification['from'] = $data['from'];
                $notification['message'] = $data['message'];
                $notification['date_time'] = gmdate('Y-m-d H:i:s', time());
                $result = $this->notification_model->insert($notification);
                $res["error"] = false;
                $res["msg"] = "";
                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "get_notification") {
                $options = array(
                    'limit' => array(
                        'start' => 0,
                        'amount' => 10
                    )
                );
                $result = $this->notification_model->get_notification($data['userId'], array());

                // print_r( json_decode( $result ) );

                $res["error"] = true;
                $res["msg"] = "No notification exist!";
                if ($result) {
                    $notification = array();
                    foreach (json_decode($result) as $key => $row) {
                        $user_image = $this->users_model->getUserMeta($row->from, 'user_img');
                        $notification[] = array(
                            'user_image' => ($user_image ? $user_image : ''),
                            'message' => $row->message,
                            'date' => $row->date_time,
                            'gender' => $row->gender,
                            'display_date' => get_time_difference( $row->date_time )
                        );
                    }

                    $res["error"] = false;
                    $res["msg"] = "";
                    $res['messages'] = $notification;
                }

                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "delete_mobile_id") {
                $temp_mobile_data = $this->users_model->get_mobile_id($data['userId']);
                $mobile_data = array();
                foreach ($temp_mobile_data as $mobile_key) {
                    if (is_serialized($mobile_key->mobile_id)) {
                        $mobile_data = unserialize($mobile_key->mobile_id);
                    } else {
                        $mobile_data = $mobile_key->mobile_id;
                    }
                }

                $mobile_data = array_diff($mobile_data, array(
                    $data['mobile_id']
                ));
                $otherData['mobile_id'] = array_unique($mobile_data);
                $this->users_model->updateUserMetaArray($otherData, $data['userId']);
                exit;
            } elseif ($data['action'] == "get_mobile_id") {
                $temp_mobile_data = $this->users_model->get_mobile_id($data['userId']);
                if($temp_mobile_data){
                    foreach ($temp_mobile_data as $mobile_key) {
                        $data = unserialize($mobile_key->mobile_id);
                        $mobileData['data'][]['mobile_id'] = array_values(array_filter($data));
                    }
                }else{
                    $mobileData['data'][]['mobile_id'] = array();
                }
                $res = json_encode($mobileData);
                echo $res;
                exit;
            } elseif ($data['action'] == "get_user_details") {
                if (isset($data['email'])) {
                    $options = array();
                    $start = 0;
                    $amount = 1;
                    $options['limit'] = array(
                        'start' => $start,
                        'amount' => $amount
                    );
                    $options['search_txt'] = $data['email'];
                    $res['user'] = (array) $this->users_model->getAllUsers($options);
                    foreach ($res['user'] as $user) {
                        $res['user'] = $user;
                        $metadata = array();
                        $user_meta = json_encode($user->metadata);
                        $metadata = json_decode($user_meta, true);
                        if (!empty($user->metadata->type_car_licence) && isset($user->metadata->type_car_licence)) {
                            $udata = @unserialize($user->metadata->type_car_licence);
                            if ($udata !== false) {
                                $metadata['type_car_licence'] = join_string($udata);
                            } else
                                $metadata['type_car_licence'] = "";
                        }
                    }

                    if (isset($metadata) && !empty($metadata)) {
                        foreach ($metadata as $key => $meta) {
                            $res['user']->$key = $meta;
                        }
                    }

                    unset($res['user']->metadata);
                    $users_data = json_encode($res['user']);
                    $res['user'] = json_decode($users_data, true);
                    if ($res['user'] && isset($res['user']['user_type'])) {
                        $user_type = $res['user']['user_type'];
                    }
                    if (isset($user_type) && $user_type == "Instructor") {
                        foreach ($res['user'] as $key => $value) {
                            if ($key == "user_type") {
                                $data['instructor_id'] = $res['user']['id'];
                                $res['user']['qualifications'] = $user->qualifications;
                                $res['user']['associations'] = $user->associations;
                                $res['user']['awards'] = $user->awards;
                                $res['user']['type_car_licence'] = $user->type_car_licence;
                            }
                        }

                        $qualstr = "";
                        if (isset($res['user']['qualifications']) && $res['user']['qualifications'] != '') {
                            $qualification_ids = unserialize($res['user']['qualifications']);
                            if (is_array($qualification_ids) && is_array($qualification_ids[0])) {
                                $qualification_ids = $qualification_ids[0];
                            }

                            $qualstr = implode(",", $qualification_ids);
                        }

                        $res['user']['qualifications'] = $qualstr;
                        $awardstr = "";
                        if (isset($res['user']['awards']) && $res['user']['awards'] != '') {
                            $awards_ids = unserialize($res['user']['awards']);
                            if (is_array($awards_ids) && is_array($awards_ids[0])) {
                                $awards_ids = $awards_ids[0];
                            }

                            $awardstr = implode(",", $awards_ids);
                        }

                        $res['user']['awards'] = $awardstr;
                        $assstr = "";
                        if (isset($res['user']['associations']) && $res['user']['associations'] != '') {
                            $associations_ids = unserialize($res['user']['associations']);
                            if (is_array($associations_ids) && is_array($associations_ids[0])) {
                                $associations_ids = $associations_ids[0];
                            }

                            $assstr = implode(",", $associations_ids);
                        }

                        $res['user']['associations'] = $assstr;
                        $user_rating = (array) $this->users_model->getUserRating($data['instructor_id']);
                        $res['user']['rate'] = isset($user_rating['rate']) ? $user_rating['rate'] : 0;
                        $res['user']['count'] = isset($user_rating['count']) ? $user_rating['count'] : 0;
                        $pacakges = (array) $this->packages_model->getAllPricePackages();
                        $pack_price = (array) $this->users_model->getInstructorPackagePrice($data['instructor_id']);
                        if (is_array($pack_price) && !empty($pack_price)) {
                            foreach ($pack_price as $key => $pack) {
                                $pack_price[] = $key . '|' . $pack;
                                unset($pack_price[$key]);
                            }

                            $pack_price = implode(",", $pack_price);
                        }

                        $res['packages'] = $pacakges;
                        $res['user']['packages_price'] = $pack_price;
                    }
                } else {
                    $res['msg'] = "Please enter valid Student or Instructor E-mail id.";
                    $res['error'] = true;
                }

                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "login") {
                if (isset($data['username']) && isset($data['password'])) {
                    if ($data['username'] != '' && $data['password'] != '') {
                        $final = array();
                        $msg = $this->users_model->app_login($data['username'], $data['password']);

                        // print_r($msg);

                        $temp_mobile_data = array();
                        $mobile_data = $this->users_model->get_mobile_id($msg['id']);
                        foreach ($mobile_data as $mobile_key) {
                            if (isset($mobile_key->mobile_id) && is_serialized($mobile_key->mobile_id)) {
                                $temp_mobile_data = unserialize($mobile_key->mobile_id);
                            } else {
                                $temp_mobile_data[] = $mobile_key->mobile_id;
                            }
                        }

                        // $temp_mobile_data = array();

                        if (isset($data['mobile_id']) && !empty($data['mobile_id'])) {
                            $temp_mobile_data[] = $data['mobile_id'];
                        }

                        if ($temp_mobile_data && is_array($temp_mobile_data)) {
                            $otherData['mobile_id'] = array_unique($temp_mobile_data);
                        }

                        if (isset($otherData) && is_array($otherData)) {
                            $this->users_model->updateUserMetaArray($otherData, $msg['id']);
                        }

//                         print_r($msg['packages']);

                        if ($msg == 'email') {
                            $res["error"] = true;
                            $res["msg"] = 'Incorrect username ';
                        } elseif ($msg == 'password') {
                            $res["error"] = true;
                            $res["msg"] = 'Incorrect password ';
                        } else {
                            if (isset($msg['user_type']) && $msg['user_type'] == "Student") {
                                $info = "";
                                $details = $this->booking_model->getStudentBookingDetails($msg['id']);
                                if ($details) {
                                    foreach ($details as $detail) {
                                        if ($detail->no_of_lesson > 1)
                                            $s = 's';
                                        else
                                            $s = '';
                                        $dt = date('l d F', strtotime($detail->booking_date));
                                        $count = $this->booking_model->getTotalComingLessons($msg['id']);
                                        $business_name = $this->users_model->getUserMeta($detail->instructor_id, 'business_name');
                                        if (isset($business_name) && $business_name != '') {
                                            $insname = $business_name;
                                        } else {
                                            $insname = $detail->ins_fname . " " . $detail->ins_lname;
                                        }

                                        $info = "Hi $detail->stud_fname, how did you rate your last lesson? Next $detail->no_of_lesson hr$s lesson is on $dt at $detail->start_time with $insname Pick-up from  $detail->location. You've had $count->lessons lesson$s with $count->inscount instructor$s so far. Keep up the good work!";
                                    }
                                }

                                $msg['info'] = $info;
                                if (isset($msg['test_score']) && $msg['test_score'] != '') {
                                    $tesres = array();
                                    $udata = @unserialize($msg['test_score']);
                                    if ($udata !== false && count($udata) > 0) {
                                        foreach ($udata as $res) {
                                            $tesres[] = $res;
                                        }

                                        $msg['test_score'] = $tesres;
                                    } else
                                        $msg['test_score'] = "";
                                }
                            }

                            if (isset($msg['qualifications']) && $msg['qualifications'] != '') {
                                $udata = @unserialize($msg['qualifications']);
                                if ($udata !== false) {
                                    $msg['qualifications'] = unserialize($msg['qualifications']);
                                    $msg['qualifications'] = join_string($msg['qualifications']);
                                } else
                                    $msg['qualifications'] = "";
                            }

                            if (isset($msg['associations']) && $msg['associations'] != '') {
                                $udata = @unserialize($msg['associations']);
                                if ($udata !== false) {
                                    $msg['associations'] = unserialize($msg['associations']);
                                    $msg['associations'] = join_string($msg['associations']);
                                } else
                                    $msg['associations'] = "";
                            }

                            if (isset($msg['awards']) && $msg['awards'] != '') {
                                $udata = @unserialize($msg['awards']);
                                if ($udata !== false) {
                                    $msg['awards'] = unserialize($msg['awards']);
                                    $msg['awards'] = join_string($msg['awards']);
                                } else
                                    $msg['awards'] = "";
                            }

                            if (isset($msg['my_favourites']) && $msg['my_favourites'] != '') {
                                $udata = @unserialize($msg['my_favourites']);
                                if ($udata !== false) {
                                    $msg['my_favourites'] = unserialize($msg['my_favourites']);
                                    $msg['my_favourites'] = join_string($msg['my_favourites']);
                                } else
                                    $msg['my_favourites'] = "";
                            }

                            if (isset($msg['type_car_licence']) && $msg['type_car_licence'] != '') {
                                $udata = @unserialize($msg['type_car_licence']);
                                if ($udata !== false) {
                                    $msg['type_car_licence'] = unserialize($msg['type_car_licence']);
                                    $msg['type_car_licence'] = join_string($msg['type_car_licence']);
                                } else
                                    $msg['type_car_licence'] = "";
                            }

                            $about = $this->db->select("page_desc")->from("pages")->where("page_title", "About Us")->get()->result();

                            // remove all tags from string
                            // $about[0]->page_desc = strip_tags($about[0]->page_desc);

                            $about = $about[0]->page_desc;
                            $res["error"] = false;
                            $res["msg"] = 'Login Successfully';

                            // $res['type'] = $msg;
                            // $res["user_type"]=$msg['user_type'];
                            // $res["id"]=$msg['id'];
                            // $res["first_name"]=$msg['first_name'];
                            //    $res["last_name"]=$msg['last_name'];
                            if (array_key_exists('why_need_license', $msg)) {
                                if (is_null($msg['why_need_license'])) {
                                    $msg['why_need_license'] = '';
                                }
                            }
                            
                            $about = str_replace('[back_button]', '', $about);
                            $about = str_replace('<p></p>', '', $about);

                            $res["user"] = $msg;
                            $res["user"]["about"] = $about;
                        }

                        $final[] = $res;
                    } else {
                        $res["error"] = true;
                        $res["msg"] = "Please Send Username and Password";
                        $final[] = $res;
                    }
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "forgotpass") {
                if (isset($data['username'])) {
                    if ($data['username'] != '') {
                        $final = array();
                        $res1 = $this->users_model->getUserbyEmail($data['username']);
                        if ($res1) {
                            $id = $res1->id;
                            $key = $res1->activation_code;
                            if ($key == '') {
                                $key = md5(uniqid());
                                $this->users_model->UpdateActivationCode($key, $id);
                            }

                            $mainkey = $id . "|" . $key;
                            $email_data = $this->emails_model->get_email('forgot_password', array(
                                '{SITEURL}' => base_url(),
                                '{LINK}' => "<a href='" . base_url() . "login/resetpwd/" . $mainkey . "'>Here</a>",
                                '{SITENAME}' => "GoBeepBeep",
                                '{NAME}' => $res1->first_name . " " . $res1->last_name
                            ));
                            $email_data['to'] = $res1->email;
                            $this->send_mail($email_data);
                            $res['error'] = false;
                            $res['msg'] = 'Check your inbox to reset the password.';
                            $final[] = $res;
                        } else {
                            $res['error'] = true;
                            $res['msg'] = 'Email does not exists.';
                            $final[] = $res;
                        }
                    }
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "registration") {
                $final = array();
                if ($data['user_type'] == 'student') {
                    if (!empty($data['email'])) {
                        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
                            if ($data['email'] == $data['re-email']) {
                                if (!empty($data['password'])) {
                                    if ($data['password'] == $data['retype_password']) {
                                        $userData['email'] = $data['email'];
                                        $userData['first_name'] = $data['first_name'];
                                        $userData['last_name'] = $data['last_name'];
                                        $userData['user_name'] = rtrim(trim(strtolower(str_replace(' ', '_', $data['first_name'] . '_' . $data['last_name']))));
                                        $userData['mobile_no'] = $data['mobile_no'];
                                        if (isset($data['password']) && $data['password'] != '')
                                            $userData['password'] = md5($data['password']);
                                        $userData['user_type'] = 'Student';
                                        $userData['user_status'] = 'active';
                                        $userData['gender'] = $data['gender'];
                                        $code = md5(uniqid());
                                        $userData['activation_code'] = $code;
                                        if ($userid = $this->users_model->saveUser($userData)) {
                                            $otherData['profession'] = $data['profession'];
                                            $otherData['age'] = $data['age'];
                                            $otherData['no_of_prev_lessons'] = $data['no_of_prev_lessons'];
                                            $otherData['why_need_license'] = $data['why_need_license'];
                                            $otherData['hear_about_us'] = $data['hear_about_us'];
                                            $otherData['mobile_id'] = isset($data['mobile_id']) ? $data['mobile_id'] : '';
                                            $this->users_model->updateUserMetaArray($otherData, $userid);
                                            $email_data = $this->emails_model->get_email('student_registration', array(
                                                '{SITEURL}' => base_url(),
                                                '{LINK}' => "<a href='" . base_url() . "login'>Login</a>",
                                                '{SITENAME}' => "GoBeepBeep",
                                                '{NAME}' => $userData['first_name'] . " " . $userData['last_name']
                                            ));
                                            $email_data['to'] = $userData['email'];
                                            $this->send_mail($email_data);
                                            $res['error'] = false;
                                            $res['msg'] = 'Registered Successfully.';
                                        } else {
                                            $res['error'] = true;
                                            $res['msg'] = 'Not registered successfully ,Email Exists';
                                        }

                                        $final[] = $res;
                                    } else {
                                        $res['error'] = true;
                                        $res['msg'] = 'Password and Re-Password must be same.';
                                        $final[] = $res;
                                    }
                                } else {
                                    $res['error'] = true;
                                    $res['msg'] = 'Password can not be empty.';
                                    $final[] = $res;
                                }
                            } else {
                                $res['error'] = true;
                                $res['msg'] = 'Email and Re-Email does not match.';
                                $final[] = $res;
                            }
                        } else {
                            $res['error'] = true;
                            $res['msg'] = 'Invalid Email address.';
                            $final[] = $res;
                        }
                    } else {
                        $res['error'] = true;
                        $res['msg'] = 'Email can not be empty.';
                        $final[] = $res;
                    }

                    $output['data'] = $final;
                    $res = json_encode($output);
                    echo $res;
                    exit;
                }

                if ($data['user_type'] == "instructor") {
                    if (!empty($data['email'])) {
                        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
                            if (isset($data['re-email']) && isset($data['email']) && $data['email'] == $data['re-email']) {
                                if (!empty($data['password'])) {
                                    if ($data['password'] == $data['retype_password']) {
                                        $userData['email'] = $data['email'];
                                        $userData['first_name'] = $data['first_name'];
                                        $userData['last_name'] = $data['last_name'];
                                        $userData['user_name'] = rtrim(trim(strtolower(str_replace(' ', '_', $data['first_name'] . '_' . $data['last_name']))));
                                        $userData['mobile_no'] = $data['mobile_no'];
                                        if (isset($data['password']) && $data['password'] != '')
                                            $userData['password'] = md5($data['password']);
                                        $userData['user_type'] = 'Instructor';
                                        $userData['user_status'] = 'inactive';
                                        $userData['gender'] = $data['gender'];
                                        $code = md5(uniqid());
                                        $userData['activation_code'] = $code;
                                        if ($userid = $this->users_model->saveUser($userData)) {
                                            if (isset($_FILES['user_img']['name']) && $userid > 0) {
                                                $config['upload_path'] = 'media/images/users/';
                                                $config['allowed_types'] = 'gif|jpg|jpeg|png';
                                                $this->load->library('upload');
                                                $config['file_name'] = $userid;

                                                // echo $config['file_name'];

                                                $this->upload->initialize($config);
                                                if (!$this->upload->do_upload('user_img')) {
                                                    $error = array(
                                                        'error' => $this->upload->display_errors()
                                                    );
                                                    $this->db->trans_rollback();
                                                    $session_data->set_flashdata('image_error_message', 'Invalid Image');
                                                    $session_data->set_flashdata('image_error_class', 'errormsg');
                                                } else {
                                                    $uploaddata = $this->upload->data();

                                                    // print_r($uploaddata);
                                                    // exit;

                                                    $otherData['user_img'] = $uploaddata['file_name'];
                                                    $this->db->trans_commit();

                                                    // chmod($config['upload_path'].$config['file_name'].'jpg', 0777);
                                                    // ini_set('memory_limit','10000M');
                                                    // $this->load->library('image_lib');
                                                }
                                            }

                                            $otherData['business_name'] = $data['business_name'];
                                            $otherData['address'] = $data['address'];
                                            $otherData['pass_rate'] = $data['pass_rate'];
                                            $otherData['dsa_number'] = $data['dsa_number'];
                                            $otherData['years_experience'] = $data['years_experience'];
                                            $otherData['postcode_area'] = $data['postcode_area'];
                                            $otherData['areas_covered'] = $data['areas_covered'];
                                            $otherData['mobile_id'] = $data['mobile_id'];

                                            // $otherData['search_radius']= $data['search_radius'];

                                            if (!is_array($data['qualifications']) && $data['qualifications'] != '' && strpos($data['qualifications'], ",") !== false) {
                                                $data['qualifications'] = explode(",", $data['qualifications']);
                                            } else
                                                $data['qualifications'] = is_array($data['qualifications']) ? $data['qualifications'] : array(
                                                    $data['qualifications']
                                                );
                                            $otherData['qualifications'] = $data['qualifications'];
                                            if (!is_array($data['associations']) && $data['associations'] != '' && strpos($data['associations'], ",") !== false) {
                                                $data['associations'] = explode(",", $data['associations']);
                                            } else
                                                $data['associations'] = is_array($data['associations']) ? $data['associations'] : array(
                                                    $data['associations']
                                                );
                                            $otherData['associations'] = $data['associations'];
                                            if (!is_array($data['awards']) && $data['awards'] != '' && strpos($data['awards'], ",") !== false) {
                                                $data['awards'] = explode(",", $data['awards']);
                                            } else
                                                $data['awards'] = is_array($data['awards']) ? $data['awards'] : array(
                                                    $data['awards']
                                                );
                                            $otherData['awards'] = $data['awards'];
                                            if (!is_array($data['type_car_licence']) && $data['type_car_licence'] != '' && strpos($data['type_car_licence'], ",") !== false) {
                                                $data['type_car_licence'] = explode(",", $data['type_car_licence']);
                                            } else
                                                $data['type_car_licence'] = is_array($data['type_car_licence']) ? $data['type_car_licence'] : array(
                                                    $data['type_car_licence']
                                                );
                                            $otherData['type_car_licence'] = $data['type_car_licence'];
                                            $otherData['how_old_are_you'] = $data['how_old_are_you'];
                                            $otherData['registration'] = $data['registration'];
                                            $otherData['make'] = $data['make'];
                                            $otherData['model'] = $data['model'];
                                            $otherData['type'] = $data['type'];
                                            $otherData['engine_size'] = $data['engine_size'];
                                            $otherData['colour'] = $data['colour'];
                                            $otherData['year'] = $data['year'];
                                            $otherData['no_of_doors'] = $data['no_of_doors'];
                                            $otherData['gear_box'] = $data['gear_box'];
                                            $otherData['bank'] = $data['bank'];
                                            $otherData['account_name'] = $data['account_name'];
                                            $otherData['account_number'] = $data['account_number'];
                                            $otherData['sort_code'] = $data['sort_code'];
                                            $this->users_model->updateUserMetaArray($otherData, $userid);
                                            $packageArr = array();
                                            if (!is_array($data['packages']) && $data['packages'] != '' && strpos($data['packages'], ",") !== false) {
                                                $packages = explode(",", $data['packages']);
                                            } else {
                                                $packages = is_array($data['packages']) ? $data['packages'] : array(
                                                    $data['packages']
                                                );
                                            }

                                            if ($packages) {
                                                foreach ($packages as $pack) {
                                                    $eachpack = explode("|", $pack);
                                                    $packageArr[$eachpack[0]] = isset($eachpack[1]) ? $eachpack[1] : $eachpack[0];
                                                }
                                            }

                                            $this->users_model->updateInstructorPackages($packageArr, $userid);

                                            //    $this->location_model->insert( array('zipcode' => $otherData['postcode_area'], 'limit' => $otherData['search_radius'], 'user_id' => $userid) );

                                            $code = $code . "|" . $userid;
                                            $email_data = $this->emails_model->get_email('instructor_registration', array(
                                                '{SITEURL}' => base_url(),
                                                /* '{LINK}' => "<a href='".base_url()."login/activate/".$code."'>Here</a>", */
                                                '{LINK}' => "<a href='" . base_url() . "login/'>Login</a>",
                                                '{SITENAME}' => "GoBeepBeep",
                                                '{NAME}' => $userData['first_name'] . " " . $userData['last_name']
                                            ));
                                            $email_data['to'] = $userData['email'];
                                            $this->send_mail($email_data);
                                            $res['error'] = false;
                                            $res['msg'] = 'Registered Successfully';
                                        } else {
                                            $res['error'] = true;
                                            $res['msg'] = 'Not registered successfully ,Email exists';
                                        }

                                        $final[] = $res;
                                    } else {
                                        $res['error'] = true;
                                        $res['msg'] = 'Password and Re-Password must be same.';
                                        $final[] = $res;
                                    }
                                } else {
                                    $res['error'] = true;
                                    $res['msg'] = 'Password can not be empty.';
                                    $final[] = $res;
                                }
                            } else {
                                $res['error'] = true;
                                $res['msg'] = 'Email and Re-Email does not match.';
                                $final[] = $res;
                            }
                        } else {
                            $res['error'] = true;
                            $res['msg'] = 'Invalid Email address.';
                            $final[] = $res;
                        }
                    } else {
                        $res['error'] = true;
                        $res['msg'] = 'Email can not be empty.';
                        $final[] = $res;
                    }

                    $output['data'] = $final;
                    $res = json_encode($output);
                    echo $res;
                    exit;
                }
            } elseif ($data['action'] == "feedback") {
                $final = array();
                if (isset($data['from_id']) && isset($data['to_id']) && !empty($data['from_id']) && !empty($data['to_id'])) {
                    $this->users_model->insertComment($data['from_id'], $data['to_id'], $data['rating'], $data['comment']);
                    $res['error'] = false;
                    $res['msg'] = 'Thank You For your comment...';
                    $final[] = $res;
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'Enter proper Fields...';
                    $final[] = $res;
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "search") {

                // print_r($data);

                $start = 0;
                $amount = 10;
                $option['user_type'] = 'Instructor';
                $option['gender'] = $data['gender'];
                $option['speaking'] = $data['speaking'];
                $option['ratings'] = $data['ratings'];
                $option['car_licence'] = $data['car_licence'];
                $option['price'] = $data['price'];
                $option['distance'] = $data['distance'];
                $option['postcode'] = str_replace('+', '', $data['postcode']);
                if (isset($data['distance']) && isset($data['postcode']) && !empty($data['postcode']) && !empty($data['distance']) && $data['distance'] != 'all') {
                    $instructor_ids = $this->location_model->search_instructor_by_location($data['postcode'], $data['distance']);
                    $option['instructor_ids'] = array_unique($instructor_ids);

                    // print_r($instructor_ids);
                }

                //    print_r($option);

                $users = (array) $this->users_model->getAllUsers($option);
                $final = array();
                if ($users) {
                    foreach ($users as $user) {
                        $ratings = $this->users_model->getUserRating($user->id);
                        $count = isset($ratings->count) ? $ratings->count : '0';
                        $rates = isset($ratings->rate) ? $ratings->rate : '0';
                        $rating = 0;
                        if ($rates != 0) {
                            $decimal = floor($rates);
                            $fraction = $rates - $decimal;
                            if ($fraction > 0.5) {
                                $rating = ceil($rates);
                            } else {
                                $rating = floor($rates);
                            }
                        }

                        $test['instructor_id'] = $user->id;
                        $test['first_name'] = $user->first_name;
                        $test['last_name'] = $user->last_name;
                        $test['gender'] = $user->gender;
                        $test['price'] = $user->price;
                        $test['commission'] = $user->commission;
                        $test['no_of_lessons'] = $user->no_of_lessons;

                        // $test['business_name']=$user->business_name;
                        // $test['postcode_area']=$user->postcode_area;

                        $test['rate'] = $rating;
                        $test['count'] = $count;
                        $test['exp'] = $user->metadata->years_experience;
                        $test['language'] = $user->metadata->language_know;
                        $test['hour_lesson_price'] = $user->metadata->hour_lesson_price;
                        $test['type'] = $user->metadata->type;
                        $test['no_of_doors'] = $user->metadata->no_of_doors;
                        $test['gear_box'] = $user->metadata->gear_box;
                        $test['pass-rate'] = $user->metadata->pass_rate;
                        if (isset($user->metadata->user_img))
                            $test['user_image'] = $user->metadata->user_img;
                        else
                            $test['user_image'] = '';
                        if (isset($user->metadata->availability_start_date)){
                            $final[] = $test;
                        }
                    }
                } else {
                    $test['error'] = true;
                    $test['msg'] = "No data found.";
                    $final[] = $test;
                }

                //    $data1['instructor_language'] = $this->settings_model->get_option('instructor_language');
                //    $option['limit']['start'] = 0;
                //    $option['limit']['amount'] = 1;
                //    $option['group'] = 'package_price.instructor_id';
                //    $where['packages.no_of_lessons >'] = 1;
                // $final[] = $this->packages_model->getAllPricePackages( $where, $option );
                // $res1=json_encode($data1);

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "your_lesson") {
                $final = array();
                if ($data['student_id'] != '') {

                    // $res = $this->lession_model->get_schedule_lession_by_student_app($data['student_id']);

                    $res = $this->lession_model->get_completed_lession_from_studuent($data['student_id']);
                    if ($res) {
                        $output['data'] = $res;
                        $upcoming_lesson = $this->booking_model->getStudentBookingDetails($data['student_id']);

                        if (isset($upcoming_lesson[0]->booking_date) && $upcoming_lesson[0]->booking_date != '0000-00-00') {
                            $output['upcoming_lesson'] = $upcoming_lesson[0];
                        }
                    } else {
                        $res['error'] = true;
                        $res['msg'] = 'No lessions.';
                        $final[] = $res;
                        $output['data'] = $final;
                    }
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'Student is not available';
                    $final[] = $res;
                    $output['data'] = $final;
                }

                $res = json_encode($output);
                echo $res;
                exit;
            }elseif ($data['action'] == "your_lesson_new") {
                $final = array();
                if ($data['student_id'] != '') {
                    
                    $offset = isset($data['offset']) ? $data['offset'] : 0;
                    $limit = isset($data['limit']) ? $data['limit'] : 0;
                    
                    $res = $this->lession_model->get_completed_lession_from_studuent_web($data['student_id'], $offset, $limit);
                    if ($res) {
                        $output['data'] = $res;
                        $upcoming_lesson = $this->booking_model->getStudentBookingDetails($data['student_id']);

                        if (isset($upcoming_lesson[0]->booking_date) && $upcoming_lesson[0]->booking_date != '0000-00-00') {
                            $output['upcoming_lesson'] = $upcoming_lesson[0];
                        }
                    } else {
                        $res['error'] = true;
                        $res['msg'] = 'No lessions.';
                        $final[] = $res;
                        $output['data'] = $final;
                    }
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'Student is not available';
                    $final[] = $res;
                    $output['data'] = $final;
                }

                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "student_explore") {
                $final = array();
                $data1['user_type'] = 'Instructor';
                $users = $this->users_model->getAllUsers($data1);

                // print_r($users);

                $final = array();
                foreach ($users as $user) {

                    // print_r($users);

                    $ratings = $this->users_model->getUserRating($user->id);
                    $count = isset($ratings->count) ? $ratings->count : '0';
                    $rates = isset($ratings->rate) ? $ratings->rate : '0';
                    $rating = 0;
                    if ($rates != 0) {
                        $decimal = floor($rates);
                        $fraction = $rates - $decimal;
                        if ($fraction > 0.5) {
                            $rating = ceil($rates);
                        } else {
                            $rating = floor($rates);
                        }
                    }

                    $test['instructor_id'] = $user->id;
                    $test['first_name'] = $user->first_name;
                    $test['last_name'] = $user->last_name;
                    $test['gender'] = $user->gender;
                    $test['price'] = $user->price;
                    $test['commission'] = $user->commission;
                    $test['no_of_lessons'] = $user->no_of_lessons;

                    // $test['business_name']=$user->business_name;
                    // $test['postcode_area']=$user->postcode_area;

                    $test['rate'] = $rating;
                    $test['count'] = $count;
                    $test['exp'] = isset($user->metadata->years_experience) ? $user->metadata->years_experience : '';
                    $test['language'] = isset($user->metadata->language_know) ? $user->metadata->language_know : '';
                    $test['hour_lesson_price'] = isset($user->metadata->hour_lesson_price) ? $user->metadata->hour_lesson_price : '';
                    $test['type'] = isset($user->metadata->type) ? $user->metadata->type : '';
                    $test['no_of_doors'] = isset($user->metadata->no_of_doors) ? $user->metadata->no_of_doors : '';
                    $test['gear_box'] = isset($user->metadata->gear_box) ? $user->metadata->gear_box : '';
                    $test['pass-rate'] = isset($user->metadata->pass_rate) ? $user->metadata->pass_rate : '';
                    if (isset($user->metadata->user_img))
                        $test['user_image'] = $user->metadata->user_img;
                    else
                        $test['user_image'] = '';
                    if (isset($user->metadata->availability_start_date)){
                        $final[] = $test;
                    }
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "my_earnings") {
                $final = array();
                $dt = isset($data['dt']) ? $data['dt'] : '';
                if (strlen($dt) == 4) {
                    $res = $this->payments_model->earnings_by_year_for_app($data['instructor_id'], $dt);
                } else {
                    $res = $this->payments_model->earnings_app($data['instructor_id'], $dt);
                }

                if ($res) {
                    $output['data'] = $res;
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'No Booking Records.';
                    $final[] = $res;
                    $res = $final;
                }

                $output['years'] = $this->payments_model->earnings_years_app($data['instructor_id']);
                $output['data'] = $res;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "check_your_appointments") {
                $output = array();
                $final = array();

                $dt = isset($data['dt']) ? $data['dt'] : false;
                if ($dt != false && strlen($dt) == 4) {
                    $res = $this->booking_model->total_booking_by_year_for_app($data['instructor_id'], $dt, false);
                } else {
                    $res = $this->booking_model->totalBooking_app($data['instructor_id'], $dt, false);
                }

                $years = $this->booking_model->get_booking_years_app($data['instructor_id'], false);
                
                if ($res) {
                    $output['data'] = $res;
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'No Appointments.';
                    $final[] = $res;
                    $output['data'] = $final;
                }

                $output['years'] = $years;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "check_availability") {
                $final = array();
                $instructor_id = $data['instructor_id'];
                $booking_date = str_replace('/', '-', $data['booking_date']);
                $lessions = 1; //$_REQUEST['lessions'];
                $booking_first_time = $data['booking_first_time'];
                $booking_second_time = isset($data['booking_second_time']) ? $data['booking_second_time'] : '';
                $selected_start_time = $selected_end_time = '';
                $instructor = $this->users_model->getUserById($data['instructor_id']);
                $booking_first_time = $booking_first_time ? date('H:i:s', strtotime($booking_first_time)) : '';
                $lessions = date('H:i:s', strtotime(trim(str_replace(array(
                                    'hour',
                                    's'
                                                ), '', $lessions)) . ':00:00'));
                $availability_end_time = $instructor->availability_end_time ? date('H:i:s', strtotime($instructor->availability_end_time)) : '';
                $secs = strtotime($lessions) - strtotime("00:00:00");
                $total_time = date("H:i:s", strtotime($booking_first_time) + $secs);
                if ($availability_end_time >= $total_time) {
                    $check_availability = $this->booking_model->check_availability(array(
                        'instructor_id' => $instructor_id,
                        'booking_date' => $booking_date,
                        'start_time' => $booking_first_time,
                        'end_time' => $total_time
                    ));
                    if (!$check_availability) {
                        $selected_start_time = $booking_first_time;
                        $selected_end_time = $total_time;
                    } else {
                        $booking_second_time = $booking_second_time ? date('H:i:s', strtotime($booking_second_time)) : '';
                        if ($booking_second_time) {
                            $total_time = date("H:i:s", strtotime($booking_second_time) + $secs);
                            $check_availability = $this->booking_model->check_availability(array(
                                'instructor_id' => $instructor_id,
                                'booking_date' => $booking_date,
                                'start_time' => $booking_second_time,
                                'end_time' => $total_time
                            ));
                            if (!$check_availability) {
                                $selected_start_time = $booking_second_time;
                                $selected_end_time = $total_time;
                            }
                        }
                    }
                }

                if ($selected_start_time && $selected_end_time) {
                    $user = $this->users_model->getUserById($instructor_id);
                    $selected_start_time = strtotime($selected_start_time);
                    $selected_end_time = strtotime($selected_end_time);
                    $AMPM = array(
                        'PM' => 'evening',
                        'AM' => 'morning'
                    );

                    // date("H:i:s A",strtotime($time)

                    $res['error'] = false;
                    $res['msg'] = sprintf('Your first lesson will start %s at %s and finish %s at %s on %s with %s.', $AMPM[date('A', $selected_start_time)], date('h:i', $selected_start_time), $AMPM[date('A', $selected_end_time)], date('h:i', $selected_end_time), date('jS M, Y', strtotime($booking_date)), $user->first_name . ' ' . $user->last_name);
                    $res['instructor_id'] = $data['instructor_id'];
                    $res['booking_date'] = date('Y-m-d', strtotime($booking_date));
                    $res['lessions'] = $lessions;
                    $res['start_time'] = date('H:i:s', $selected_start_time);
                    $res['end_time'] = date('H:i:s', $selected_end_time);
                    $final[] = $res;
                    $output['data'] = $final;

                    // $final = $temp = $output = array();
                    // $temp['error'] = true;
                    // $temp['msg'] = 'xxxx';
                    // $final[] = $temp;
                    // $output['data'] = array($final);

                    $res = json_encode($output);
                    echo $res;
                    exit;
                } else {
                    $final = $temp = $output = array();
                    $temp['error'] = true;
                    $temp['msg'] = 'Please select another date and time. Insructor is not available for this time period.';

                    // $final[] = $temp;

                    $output['data'] = array(
                        $temp
                    );
                    $res = json_encode($output);
                    echo $res;
                    exit;
                }

                if ($availability_end_time == '00:00:00') {
                    
                }

                exit;
            } elseif ($data['action'] == "duration_earnings") {
                $final = array();
                $res = $this->payments_model->durationEarnings_app($data['instructor_id']);
                $output['data'] = $res;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "booking_status") {
                $final = array();
                $resi = $this->payments_model->getBookingStats($data['instructor_id']);
                foreach ($resi as $re) {
                    if (is_null($re->total_paid_amount)) {
                        $res['error'] = true;
                        $res['msg'] = 'No bookings found';
                        $final[] = $res;
                        $output['data'] = $final;
                    } else {
                        $output['data'] = $resi;
                    }
                }

                // $output['data']=$res;

                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "instructor_booking") {
                $final = array();
                $res = $this->lession_model->get_lession_by_instructor($data['instructor_id'], '', isset($data['approve']) ? $data['approve'] : 0);
                unset($res['total_bookings']);

                if ($res) {
                    $output['data'] = $res;
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'No new booking found!';
                    $final[] = $res;
                    $output['data'] = $final;
                }

                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "book_a_lesson") {
                $final = array();
                $price_list = $this->users_model->getInstructorPackagePrice($data['instructor_id']);
                $package_info = $this->packages_model->getPackagesById($data['package_id']);
                $data['booking_info']['id'] = NULL;
                $data['booking_info']['instructor_id'] = $data['instructor_id'];
                $data['booking_info']['student_id'] = $data['student_id'];
                $data['booking_info']['package_id'] = $data['package_id'];
                $data['booking_info']['location'] = $data['pickup_point'];
                $data['booking_info']['booking_date'] = $data['booking_date'];
                $data['booking_info']['start_time'] = date("H:i:s", strtotime($data['start_time']));
                $data['booking_info']['end_time'] = isset($data['end_time']) ? date("H:i:s", strtotime($data['end_time'])) : '';
                $data['booking_info']['no_of_lesson'] = $data['lessions'];
//                $data['booking_info']['price'] = ($price_list[$data['booking_info']['package_id']] * $data['booking_info']['no_of_lesson']) + $package_info->commission;
                $data['booking_info']['price'] = ($price_list[$data['booking_info']['package_id']]  + $package_info->commission );
                $data['booking_info']['status'] = 'completed';
                $data['booking_info']['txn_id'] = isset($data['txn_id']) ? $data['txn_id'] : '';
                $data['booking_info']['txn_detail'] = isset($data['txn_detail']) ? $data['txn_detail'] : '';
                $data['booking_info']['booking_id'] = $this->booking_model->insert($data['booking_info']);
                if ($data['booking_info']['booking_id']) {
                    $data['lession_info']['booking_id'] = $data['booking_info']['booking_id'];
                    $data['lession_info']['pickup_point'] = $data['pickup_point'];
                    $data['lession_info']['date'] = $data['booking_date'];
                    $data['lession_info']['time'] = date("H:i:s", strtotime($data['start_time']));
                    $data['lession_info']['status'] = 'pending';
                    $data['lession_info']['lession_no'] = 1;
                    $data['lession_info']['active'] = 1;
                    $data['lession_info']['lession_type'] = 'schedule';

                    $this->lession_model->insert($data['lession_info']);
                    $res['error'] = false;
                    $res['msg'] = 'Booked Successfully';
                    $final[] = $res;
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'lesson booking is not done successfully';
                    $final[] = $res;
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "student_booking") {
                $options = $final = array();
                if (isset($data['status'])) {
                    $options['status'] = $data['status'];
                }

                $dt = isset($data['dt']) ? $data['dt'] : false;
                if ($dt != false && strlen($dt) == 4) {
                    $test = $this->booking_model->get_student_booking_list_by_year_for_app($options, $data['student_id'], $dt);
                } else {
                    $test = $this->booking_model->getStudentBookingList($options, $data['student_id'], $dt);
                    
                }
                $years = $this->booking_model->getStudentBookingYears($options, $data['student_id']);
                if (is_array($test) && count($test) > 0) {
                    foreach ($test as $tes) {
                        if($tes->booking_date != '0000-00-00'){
                            $copy['booking']['date'] = $tes->booking_date;
                            $copy['booking']['time'] = $tes->start_time;
                            $copy['booking']['package_name'] = $tes->package_title;
                            $copy['booking']['no_of_lessons'] = $tes->hour;
                            $copy['booking']['first_name'] = $tes->ins_fname;
                            $copy['booking']['last_name'] = $tes->ins_lname;
                            $copy['booking']['instructor_id'] = $tes->instructor_id;
                            $copy['booking']['pickup_point'] = $tes->pickup_point;
                            $copy['booking']['lession_no'] = $tes->lession_no;
                            $copy['booking']['status'] = $tes->status;
                            $copy['booking']['lession_status'] = $tes->lession_status;
                            $copy['booking']['month'] = ($tes->month) ? $tes->month : '';
                            if (isset($data['payment_complete'])) {
                                if (strtolower($tes->status) == 'completed' || strtolower($tes->status) == 'pending') {
                                    $final[] = $copy['booking'];
                                }
                            } else {
                                $final[] = $copy['booking'];
                            }
                        }
                    }
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'No Booking Records';
                    $final[] = $res;

                    //print_r($res);
                }

                $output['data'] = $final;
                $output['years'] = $years;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "resetpwd") {
                $final = array();
                if ($data['user_id'] != '' && $data['new_pwd'] != '') {
                    $this->users_model->ResetPwd($data['new_pwd'], $data['user_id']);
                    $res['error'] = false;
                    $res['error'] = 'Password updated successfully';
                    $final[] = $res;
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'Fill all details';
                    $final[] = $res;
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "edit_profile") {
                $final = array();

                // print_r($_FILES);

                if (isset($data['id']) && $data['id'] > 0) {
                    if ($data['user_type'] == "student") {
                        $userData['id'] = $data['id'];
                        $userData['email'] = $data['email'];
                        $userData['first_name'] = $data['first_name'];
                        $userData['last_name'] = $data['last_name'];
                        $userData['mobile_no'] = $data['mobile_no'];
                        if (isset($data['password']) && !empty($data['password'])) {
                            $userData['password'] = md5($data['password']);
                        }

                        $userData['gender'] = $data['gender'];
                        $userid = $this->users_model->saveUser($userData);
                        if ($userid) {
                            $otherData['profession'] = $data['profession'];
                            $otherData['age'] = $data['age'];
                            $otherData['no_of_prev_lessons'] = $data['no_of_prev_lessons'];
                            $otherData['why_need_license'] = $data['why_need_license'];
                            $otherData['hear_about_us'] = $data['hear_about_us'];
                            $this->users_model->updateUserMetaArray($otherData, $userid);
                            $res['error'] = false;
                            $res['msg'] = 'Student profile updated successfully';
                        } else {
                            $res['error'] = true;
                            $res['msg'] = "Email already exists.";
                        }

                        $final[] = $res;
                    } elseif ($data['user_type'] == "instructor") {
                        $userData['id'] = $data['id'];
                        $userData['email'] = $data['email'];
                        $userData['first_name'] = $data['first_name'];
                        $userData['last_name'] = $data['last_name'];
                        $userData['mobile_no'] = $data['mobile_no'];
                        if (isset($data['password']) && $data['password'] != '')
                            $userData['password'] = md5($data['password']);
                        $userData['user_type'] = 'Instructor';
                        $userData['gender'] = $data['gender'];

                        // $code = md5(uniqid());
                        // $userData['activation_code']=$code;

                        $userid = $this->users_model->saveUser($userData);
                        if ($userid) {
                            if (isset($_FILES['user_img']['name']) && $_FILES['user_img']['name'] != '' && $userid > 0) {
                                $config['upload_path'] = 'media/images/users/';
                                $config['allowed_types'] = 'gif|jpg|jpeg|png';
                                $this->load->library('upload');
                                $config['file_name'] = $userid;

                                // echo $config['file_name'];

                                $this->upload->initialize($config);
                                $uimg = $this->users_model->getUserMeta($userid, 'user_img');
                                if ($uimg != '') {
                                    $imgpath = BASE_PATH . "/media/images/users/" . $uimg;
                                    if (file_exists($imgpath)) {
                                        unlink($imgpath);
                                    }
                                }

                                if (!$this->upload->do_upload('user_img')) {

                                    // echo "if";

                                    $this->db->trans_rollback();
                                    $res['error'] = true;
                                    $res['msg'] = "Invalid Images";
                                } else {

                                    // echo "else";

                                    $uploaddata = $this->upload->data();

                                    // print_r($uploaddata);
                                    // exit;

                                    $otherData['user_img'] = $uploaddata['file_name'];
                                    $this->db->trans_commit();

                                    // chmod($config['upload_path'].$config['file_name'].'jpg', 0777);
                                    // ini_set('memory_limit','10000M');
                                    // $this->load->library('image_lib');
                                }
                            }

                            $otherData['business_name'] = isset($data['business_name']) ? $data['business_name'] : '';
                            $otherData['address'] = isset($data['address']) ? $data['address'] : '';
                            $otherData['pass_rate'] = isset($data['pass_rate']) ? $data['pass_rate'] : '';
                            $otherData['dsa_number'] = isset($data['dsa_number']) ? $data['dsa_number'] : '';
                            $otherData['years_experience'] = isset($data['years_experience']) ? $data['years_experience'] : '';
                            $otherData['postcode_area'] = isset($data['postcode_area']) ? $data['postcode_area'] : '';
                            $otherData['areas_covered'] = isset($data['areas_covered']) ? $data['areas_covered'] : '';

                            // $otherData['search_radius']= $data['search_radius'];
                            // print_r($data['qualifications']);

                            if (isset($data['qualifications']) && $data['qualifications'] != '' && !is_array($data['qualifications']) && strpos($data['qualifications'], ",") !== false) {
                                $data['qualifications'] = explode(",", $data['qualifications']);
                            } else
                                $data['qualifications'] = array(
                                    $data['qualifications']
                                );
                            $otherData['qualifications'] = $data['qualifications'];
                            if (isset($data['associations']) && $data['associations'] != '' && !is_array($data['associations']) && strpos($data['associations'], ",") !== false) {
                                $data['associations'] = explode(",", $data['associations']);
                            } else
                                $data['associations'] = array(
                                    $data['associations']
                                );
                            $otherData['associations'] = $data['associations'];
                            if (isset($data['awards']) && $data['awards'] != '' && !is_array($data['awards']) && strpos($data['awards'], ",") !== false) {
                                $data['awards'] = explode(",", $data['awards']);
                            } else
                                $data['awards'] = array(
                                    $data['awards']
                                );
                            $otherData['awards'] = $data['awards'];
                            if (isset($data['type_car_licence']) && $data['type_car_licence'] != '' && !is_array($data['type_car_licence']) && strpos($data['type_car_licence'], ",") !== false) {
                                $data['type_car_licence'] = explode(",", $data['type_car_licence']);
                            } else
                                $data['type_car_licence'] = array(
                                    $data['type_car_licence']
                                );
                            $otherData['type_car_licence'] = $data['type_car_licence'];
                            $otherData['how_old_are_you'] = isset($data['how_old_are_you']) ? $data['how_old_are_you'] : '';
                            $otherData['registration'] = isset($data['registration']) ? $data['registration'] : '';
                            $otherData['make'] = isset($data['make']) ? $data['make'] : '';
                            $otherData['model'] = isset($data['model']) ? $data['model'] : '';
                            $otherData['type'] = isset($data['type']) ? $data['type'] : '';
                            $otherData['engine_size'] = isset($data['engine_size']) ? $data['engine_size'] : '';
                            $otherData['colour'] = isset($data['colour']) ? $data['colour'] : '';
                            $otherData['year'] = isset($data['year']) ? $data['year'] : '';
                            $otherData['no_of_doors'] = isset($data['no_of_doors']) ? $data['no_of_doors'] : '';
                            $otherData['gear_box'] = isset($data['gear_box']) ? $data['gear_box'] : '';
                            $otherData['bank'] = isset($data['bank']) ? $data['bank'] : '';
                            $otherData['account_name'] = isset($data['account_name']) ? $data['account_name'] : '';
                            $otherData['account_number'] = isset($data['account_number']) ? $data['account_number'] : '';
                            $otherData['sort_code'] = isset($data['sort_code']) ? $data['sort_code'] : '';
                            $otherData['availability_end_date'] = isset($data['availability_end_date']) ? $data['availability_end_date'] : '';
                            $otherData['availability_end_time'] = isset($data['availability_end_time']) ? $data['availability_end_time'] : '';
                            $otherData['availability_start_date'] = isset($data['availability_start_date']) ? $data['availability_start_date'] : '';
                            $otherData['availability_start_time'] = isset($data['availability_start_time']) ? $data['availability_start_time'] : '';
                            $otherData['about_me'] = isset($data['about_me']) ? $data['about_me'] : '';
                            $otherData['other_info'] = isset($data['other_info']) ? $data['other_info'] : '';
                            $otherData['experience'] = isset($data['experience']) ? $data['experience'] : '';
                            $otherData['language_know'] = isset($data['language_know']) ? $data['language_know'] : '';
                            $this->users_model->updateUserMetaArray($otherData, $userid);

                            //    $data['packages']= $this->packages_model->getAllPackages(array(),array('isenable'=>'1'));

                            $packageArr = array();
                            if ($data['packages'] != '' && !is_array($data['packages']) && strpos($data['packages'], ",") !== false) {
                                $packages = explode(",", $data['packages']);
                            } else {
                                $packages = array(
                                    $data['packages']
                                );
                            }

                            if ($packages) {
                                foreach ($packages as $pack) {
                                    if (is_array($pack)) {
                                        foreach ($pack as $key => $temp_pack) {
                                            $packageArr[$key] = $temp_pack;
                                        }
                                    } else {
                                        $eachpack = explode("|", $pack);
                                        $packageArr[$eachpack[0]] = $eachpack[1];
                                    }
                                }
                            }

                            $this->users_model->updateInstructorPackages($packageArr, $userid);
                            $res['error'] = false;
                            $res['msg'] = 'Instructor profile updated successfully';
                        } else {
                            $res['error'] = true;
                            $res['msg'] = "Email already exists.";
                        }

                        $final[] = $res;
                    } else {
                        $res['error'] = true;
                        $res['msg'] = "Enter user type";
                        $final[] = $res;
                    }
                } else {
                    $res['error'] = true;
                    $res['msg'] = "User Id not found";
                    $final[] = $res;
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == 'fav_instructor_list') {
                /* Error is coming. Need to check. */
                if (isset($data['user_id']) && $data['user_id'] != '') {
                    $favourites = $this->users_model->getFavouriteInstructorList($data['user_id']);
                    if ($favourites) {
                        $final = array();
                        foreach ($favourites as $favourite) {
                            $fav = unserialize($favourite->meta_value);
                            foreach ($fav as $f) {
                                $name = $this->users_model->getUserById($f);
                                if ($name) {
                                    $business_name = $this->users_model->getUserMeta($name->id, 'business_name');
                                    if (isset($business_name) && $business_name != '') {
                                        $result = $business_name;
                                    } else {
                                        $result = $name->first_name . ' ' . $name->last_name;
                                    }

                                    $final[] = $result;
                                }
                            }
                        }
                    } else {
                        $final['error'] = true;
                        $final['msg'] = 'No Favorite Instructor added yet. ';
                    }
                } else {
                    $final['error'] = true;
                    $final['msg'] = "Enter student ID.";
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == 'review_list') {
                if ($data['user_id'] != '' && isset($data['user_id'])) {
                    $reviews_user_list = $this->users_model->getReviewsStudentList('10', $data['user_id']);
                    if ($reviews_user_list) {
                        $final = array();
                        foreach ($reviews_user_list as $reviews) {
                            $userimg = $this->users_model->getUserMeta($reviews->id, 'user_img');
                            $user_image = '';
                            if ($userimg != '' && file_exists(FCPATH . 'media/images/users/' . $userimg)) {
                                $res['user_image'] = $userimg;
                            } else {
                                $res['user_image'] = '';
                            }

                            $res['gender'] = $reviews->gender;
                            $res['dt'] = date('M d, Y', strtotime($reviews->date));
                            $res['profession'] = $this->users_model->getUserMeta($reviews->from_id, 'profession');
                            $business_name = $this->users_model->getUserMeta($reviews->from_id, 'business_name');
                            if (isset($business_name) && $business_name != '') {
                                $res['to_name'] = $business_name;
                            } else {
                                $res['to_name'] = $reviews->ins_fname . " " . $reviews->ins_lname;
                            }

                            $res['from_name'] = $reviews->stud_fname . $reviews->stud_lname;
                            $res['comment'] = $reviews->comment;

                            $res['rating'] = $reviews->rating;
                            $final[] = $res;
                        }
                    } else {
                        $res['error'] = true;
                        $res['msg'] = 'No reviews yet.';
                        $final[] = $res;
                    }
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'Enter User Id';
                    $final[] = $res;
                }

                $output['data'] = $final;
                $res = json_encode($output);
                if (isset($data['device']) && $data['device'] == "ios")
                    echo '[' . $res . ']';
                else
                    echo $res;
                exit;
            } elseif ($data['action'] == 'complaint_list') {
                $complaints = (array) $this->users_model->getInstructorComplaintList($data['from_id']);
                if ($complaints) {
                    $final = array();
                    foreach ($complaints as $complaint) {

                        //     print_r($complaint);

                        $res['dt'] = date('M d, Y', strtotime($complaint->date));
                        $res['from_name'] = $complaint->stud_fname . " " . $complaint->stud_lname;
                        $res['to_name'] = $complaint->ins_fname . " " . $complaint->ins_lname;
                        $res['sub'] = $complaint->subject;
                        $res['message'] = $complaint->message;
                        $count = $this->users_model->getComplaintStudAdminCount($complaint->id, $complaint->to_id, $data['from_id']);

                        //    echo $count;

                        if ($count > 0) {
                            if ($complaint->from_id == $data['from_id']) {
                                $lists = $this->users_model->getComplaintStudAdminList($complaint->id, $complaint->to_id, $data['from_id']);

                                //    print_r($lists);

                                $lists = isset($lists) ? $lists : '';
                                if ($lists) {
                                    foreach ($lists as $list) {
                                        $res['admin_message'] = $list->message;
                                    }
                                }
                            }
                        }

                        $res['status'] = $complaint->status;
                        $final[] = $res;
                    }
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'No Complaints.';
                    $final[] = $res;
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "make_complaint") {
                $final = array();
                if ($data['message'] != '' && $data['subject'] != '' && $data['from_id'] != '' && $data['to_id'] != '') {
                    $this->users_model->insertComplaint($data['from_id'], $data['to_id'], $data['subject'], $data['message'], 'Pending');
                    $res['msg'] = 'Thank You...';
                    $res['error'] = false;
                    $final[] = $res;
                } else {
                    $res['msg'] = 'Please fill all details properly.';
                    $res['error'] = true;
                    $final[] = $res;
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "my_favourite") {
                $final = array();
                if ($data['student_id'] != '' && $data['instructor_id'] != '') {
                    $favourites = $this->users_model->getUserMeta($data['student_id'], 'my_favourites');
                    $arr = unserialize($favourites);

                    // print_r($arr);

                    if (!is_array($arr))
                        $arr = array();
                    if ($favourites == false) {
                        $arr[] = $data['instructor_id'];
                        $favs = serialize($arr);

                        // print_r($favs);

                        $this->users_model->insertUserMeta($data['student_id'], 'my_favourites', $favs);
                    } else {
                        $arr = unserialize($favourites);
                        if (!is_array($arr)) {
                            $arr = array();
                        }

                        $arr = array_unique($arr);
                        $key = array_search($data['instructor_id'], $arr);
                        if (is_int($key) && is_array($arr)) {
                            unset($arr[$key]);
                        } else {
                            $arr[] = $data['instructor_id'];
                        }

                        $favs = serialize($arr);
                        $this->users_model->updateUserMeta($data['student_id'], 'my_favourites', $favs);
                    }

                    $res['msg'] = "Instructor added/removed from Student's favourite list";
                    $res['error'] = false;
                    $final[] = $res;
                } else {
                    $res['msg'] = "Student Id or Instructor Id is not available";
                    $res['error'] = true;
                    $final[] = $res;
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "qualifications") {
                $res = $this->qualifications_model->getAllQualifications();
                $output['data'] = $res;
                $res = json_encode($output);
                echo str_replace("[[", "[", str_replace("]]", "]", $res));
                exit;
            } elseif ($data['action'] == "associations") {
                $res = $this->associations_model->getAllAssociations();
                $output['data'] = $res;
                $res = json_encode($output);
                echo str_replace("[[", "[", str_replace("]]", "]", $res));
                exit;
            } elseif ($data['action'] == "awards") {
                $res = $this->awards_model->getAllAwards();
                $output['data'] = $res;
                $res = json_encode($output);
                echo str_replace("[[", "[", str_replace("]]", "]", $res));
                exit;
            } elseif ($data['action'] == "packages") {
                $options = array();
                if (isset($data['instructor_id']) && $data['instructor_id']) {
                    $options = array(
                        'instructor_id' => $data['instructor_id']
                    );
                }
                $where = array(
                    'isenable' => '1',
                    /* 'instructor_id' => $data['instructor_id'] */
                );
                  
                if($data['instructor_id']){
                    $where['instructor_id'] = $data['instructor_id'];
                }
                //$where['no_of_lessons'] = 1;

                //$res = $this->packages_model->getAllPackages($options, $where);
                $res = $this->packages_model->getAllPricePackages( $where, $options );

                $output['data'] = $res;
                $res = json_encode($output);
                echo str_replace("[[", "[", str_replace("]]", "]", $res));
                exit;
            } elseif ($data['action'] == "language") {
                $final = array();
                $data['instructor_language'] = $this->settings_model->get_option('instructor_language');
                $instructor_language = unserialize($data['instructor_language']);
                $instructor_language = array_unique(array_map('trim', $instructor_language));
                $res = array_unique(array_map('StrToLower', $instructor_language));
                foreach ($res as $key => $value) {
                    $re1[$value] = ucwords($value);
                }

                $final[] = $re1;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "type") {
                $res = array(
                    'hatchback' => 'Hatchback',
                    'sedan' => 'Sedan',
                    'MUV/SUV' => 'MUV/SUV',
                    'coupe' => 'Coupe',
                    'convertible' => 'Convertible',
                    'wagon' => 'Wagon',
                    'van' => 'Van',
                    'jeep' => 'Jeep'
                );
                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "doors") {
                $res = array(
                    '1-door' => '1 Door',
                    '2-door' => '2 Door',
                    '4-door' => '4 Door'
                );
                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "gearbox") {
                $res = array(
                    'manual' => 'Manual',
                    'automatic' => 'Automatic',
                    'auto_and_manual' => 'Manual & Automatic',
                );
                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "get_instructor") {
                if (isset($data['instructor_id']) && $data['instructor_id'] > 0) {
                    $res['user'] = (array) $this->users_model->getUserById($data['instructor_id']);
                    if(!isset($res['user']['language_know'])){
                        $res['user']['language_know'] = '';
                    }
                    $res['reviews_user_list'] = $this->users_model->getReviewsUserList(5, $data['instructor_id']);
                    $qualstr = "";

                    if (isset($res['user']['qualifications']) && $res['user']['qualifications'] != '') {
                        $qualification_ids = unserialize($res['user']['qualifications']);
                        if (is_array($qualification_ids) && is_array($qualification_ids[0])) {
                            $qualification_ids = array_filter( $qualification_ids[0] );
                        }
                        if( is_array( $qualification_ids ) ){
                            $qualification_ids = array_filter( $qualification_ids );   
                        }
                        if( is_array( $qualification_ids ) && count( $qualification_ids ) ){
                            $qualifications = $this->qualifications_model->getAllQualifications(array(), 'title', $qualification_ids);
                            foreach ($qualifications as $qualification) {
                                if ($qualstr == "")
                                    $qualstr = $qualification->title;
                                else
                                    $qualstr = $qualstr . "|" . $qualification->title;
                            }
                        }
                    }
                    $res['user']['qualifications'] = $qualstr;
                    $awardstr = "";
                    if (isset($res['user']['awards']) && $res['user']['awards'] != '') {
                        $awards_ids = unserialize($res['user']['awards']);
                        if (is_array($awards_ids) && is_array($awards_ids[0])) {
                            $awards_ids = array_filter( $awards_ids[0] );
                        }
                        if( is_array( $awards_ids ) ){
                            $awards_ids = array_filter( $awards_ids );
                        }
                        if( is_array( $awards_ids ) && count( $awards_ids ) ){
                            $awards = $this->awards_model->getAllAwards(array(), 'title', $awards_ids);
                            foreach ($awards as $award) {
                                if ($awardstr == "")
                                    $awardstr = $award->title;
                                else
                                    $awardstr = $awardstr . "|" . $award->title;
                            }
                        }
                    }

                    $res['user']['awards'] = $awardstr;
                    $assstr = "";
                    if (isset($res['user']['associations']) && $res['user']['associations'] != '') {
                        $associations_ids = unserialize($res['user']['associations']);
                        if (is_array($associations_ids) && is_array($associations_ids[0])) {
                            $associations_ids = array_filter( $associations_ids[0] );
                        }
                        if( is_array( $associations_ids ) ){
                            $associations_ids = array_filter( $associations_ids );
                        }
                        if( is_array( $associations_ids ) && count( $associations_ids ) ){
                            $associations = $this->associations_model->getAllAssociations(array(), 'title', $associations_ids);
                            foreach ($associations as $association) {
                                if ($assstr == "")
                                    $assstr = $association->title;
                                else
                                    $assstr = $assstr . "|" . $association->title;
                            }
                        }
                    }
                    if( !isset( $res['user']['availability_start_date'] ) ){
                        $res['user']['availability_start_date'] = '';
                    }
                    if( !isset( $res['user']['availability_end_date'] ) ){
                        $res['user']['availability_end_date'] = '';
                    }
                    if( !isset( $res['user']['availability_start_time'] ) ){
                        $res['user']['availability_start_time'] = '';
                    }
                    if( !isset( $res['user']['availability_end_time'] ) ){
                        $res['user']['availability_end_time'] = '';
                    }
                    $res['user']['associations'] = $assstr;
                    $user_rating = (array) $this->users_model->getUserRating($data['instructor_id']);
                    $res['user']['rate'] = isset($user_rating['rate']) ? $user_rating['rate'] : 0;
                    $res['user']['count'] = isset($user_rating['count']) ? $user_rating['count'] : 0;

                    $pacakges_where['package_price.instructor_id'] = $data['instructor_id'];

                    $pacakges = (array) $this->packages_model->getAllPricePackages($pacakges_where);
                    
                    $pack_price = (array) $this->users_model->getInstructorPackagePrice($data['instructor_id']);

                    foreach ($pacakges as $key => $value) {
                        $pacakges[$key]->package_price = $pack_price[$value->id];
                    }
                    $res['packages'] = $pacakges;
                    $res['packages_price'] = $pack_price;
                } else {
                    $res['msg'] = "No instructor id found.";
                    $res['error'] = true;
                }

                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } elseif ($data['action'] == "theory") {
                $finalres = array();
                $questions = $this->journal_model->getAllJournal();
                if ($questions) {

                    // print_r($questions);

                    foreach ($questions as $ques) {
                        $res['id'] = $ques->id;
                        $res['question'] = $ques->question;
                        $res['hint'] = $ques->hint;
                        $answers = $this->journal_model->getJournalAnswerById($ques->id);
                        if ($answers) {

                            // print_r($answers);

                            $option = array();
                            $i = 0;
                            foreach ($answers as $ans) {
                                $option[$i]['answer'] = $ans->answer;
                                $option[$i]['result'] = $ans->result;
                                $i++;
                            }

                            $res['options'] = $option;
                        }

                        $finalres[] = $res;
                    }
                }

                $output['data'] = $finalres;
                $res = json_encode($output);
                echo $res;
                exit;
            } else if ($data['action'] == "update_location_json") {
                try{
                    $blank_location_data = $this->lession_model->get_lessions_by_booking( 'track_locations != ""' );
                    foreach ($blank_location_data as $key => $row) {
                            $locations_list = json_decode( stripcslashes( stripcslashes( $row->track_locations ) ), true );
                            $seperator = '';
                            $path = array();
                            $count = 0;
                            if( isset( $locations_list['locations'] ) ){
                                $count = count( $locations_list['locations'] );   
                            }
                            $i = 0;
                            $loop_number = 0;
                            if( $count ){
                                while( $i < $count ){
                                    $path[ $loop_number ] .= sprintf( "%s%s,%s", $seperator, $locations_list['locations'][ $i ]['latitude'], $locations_list['locations'][ $i ]['longitude'] );
                                    $seperator = '|';   
                                    $i++;
                                    if( $i % 100 == 0 ){
                                        $loop_number++;
                                    }
                                }
                                $final_road_data = array();
                                foreach ($path as $path_value) {
                                    $url = sprintf( 'https://roads.googleapis.com/v1/snapToRoads?path=%s&interpolate=true&key=%s', $path_value, $this->settings_model->get_option('map_key'));
                                    $location_road_json = file_get_contents( $url );
                                    $location_road_json = json_decode( $location_road_json, true );
                                    if( isset( $location_road_json['snappedPoints'] ) ){
                                        if( count( $final_road_data ) ){
                                            $final_road_data[ 'snappedPoints' ] = array_merge( $final_road_data[ 'snappedPoints' ], $location_road_json['snappedPoints'] );
                                        }else{
                                            $final_road_data = $location_road_json;
                                        }
                                    }
                                }
                                if( count( $final_road_data ) ){
                                    $lession_status['location_json']  = json_encode( $final_road_data );
                                    $where['id'] = $row->id;
                                    $this->lession_model->update($lession_status, $where);
                                }
                            }
                    }
                }catch( Exception $e ){
                    echo $e->getMessage();
                }
                exit;
            } else if ($data['action'] == "booking_lession_update") {
                // $data['id'] must be a lesson id not booking id as it will raise errors 
                if (isset($data['status']) && !empty($data['status']) && isset($data['id']) && !empty($data['id'])) {
                    $lession_status['status'] = $data['status'];
                    if (isset($data['track_locations']) && $data['track_locations']) {
                        $track_locations = nl2br( stripcslashes( $data['track_locations'] ) );
                        $track_locations = str_replace(array(
                            "\r",
                            "\n"
                                ), "", $track_locations);
                        $lession_status['track_locations'] = $track_locations;

                        $locations_list = json_decode( stripcslashes( stripcslashes( $track_locations ) ), true );
                        $seperator = '';
                        $path = array();
                        $count = 0;
                        if( isset( $locations_list['locations'] ) ){
                            $count = count( $locations_list['locations'] );   
                        }
                        $i = 0;
                        $loop_number = 0;
                        if( $count ){
                            while( $i < $count ){
                                $path[ $loop_number ] .= sprintf( "%s%s,%s", $seperator, $locations_list['locations'][ $i ]['latitude'], $locations_list['locations'][ $i ]['longitude'] );
                                $seperator = '|';   
                                $i++;
                                if( $i % 100 == 0 ){
                                    $loop_number++;
                                }
                            }
                            $final_road_data = array();
                            foreach ($path as $path_value) {
                                $url = sprintf( 'https://roads.googleapis.com/v1/snapToRoads?path=%s&interpolate=true&key=%s', $path_value, $this->settings_model->get_option('map_key'));
                                $location_road_json = file_get_contents( $url );
                                $location_road_json = json_decode( $location_road_json, true );
                                if( isset( $location_road_json['snappedPoints'] ) ){
                                    if( count( $final_road_data ) ){
                                        $final_road_data[ 'snappedPoints' ] = array_merge( $final_road_data[ 'snappedPoints' ], $location_road_json['snappedPoints'] );
                                    }else{
                                        $final_road_data = $location_road_json;
                                    }
                                }
                            }
                            if( count( $final_road_data ) ){
                                $lession_status['location_json']  = json_encode( $final_road_data );
                            }
                        }
                    }
                    $where['id'] = $data['id'];
                    $rows_affected = $this->lession_model->update($lession_status, $where);
                    if($rows_affected){
                        $booking_info = $this->booking_model->getBookingInfo(0, $data['id']);

                        $student_name = $booking_info->stud_fname . " " . $booking_info->stud_lname;
                        $instructor_name = $booking_info->ins_fname . " " . $booking_info->ins_lname;
                        $hours = $booking_info->no_of_lesson > 1 ? 'Hours' : 'Hour';
                        $message = '';
                        $booking_status = '';
                        switch ($data['status']) {
                            case 'complete':
                                $booking_status = 'Completed';
                                $message = 'Congratulation '. ucwords($student_name) .', your lesson is completed.';
                                break;
                            case 'approve':
                                $booking_status = 'Approved';
                                $message = 'Your new lesson training request is approved by '.  ucwords($instructor_name) .'.';
                                break;
                            case 'reject':
                                $booking_status = 'Denied';
                                $message = "Your new lesson training request is denied by ". ucwords($instructor_name) .".";
                                break;
                        }
                        $email_data = $this->emails_model->get_email('booking_status_changed', array(
                            '{INSTRUCTOR_NAME}' => ucwords($instructor_name),
                            '{CUSTOMER_NAME}' => ucwords($student_name) ,
                            '{BOOKED_DATE}' => $booking_info->booking_date,
                            '{BOOKING_STATUS}' => $data['status'],
                            '{BOOKED_TIME}' => sprintf('%s - %s', date('H:i', strtotime($booking_info->start_time)), date('H:i', strtotime($booking_info->end_time))),
                            '{PACKAGE}' => sprintf('%s (%s %s)', $booking_info->package_name, $booking_info->no_of_lesson, $hours),
                            '{SITEURL}' => base_url(),
                            '{LOGIN_LINK}' => "<a href='" . base_url() . "login/'>Login</a>",
                            '{SITENAME}' => "GoBeepBeep",
                        ));
                        $email_data['to'] = $booking_info->stud_email;
                        $this->send_mail($email_data);

                        if(isset($data['send_notification']) && $data['send_notification']){
                            $this->booking_model->send_booking_notifications_in_mobile($booking_info->student_id, $booking_info->instructor_id, $message);
                        }
                                
                        $res['error'] = false;
                        $res['msg'] = 'Selected lession is ' . strtolower( $booking_status );
                    }else{
                        $res['error'] = true;
                        $res['msg'] = "Something is wrong please check and try again.";
                    }
                } else {
                    $res['error'] = true;
                    $res['msg'] = 'Please contact support team.';
                }

                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } else if ($data['action'] == 'schedule_lession') {
                $res['error'] = true;
                $res['msg'] = 'No pending lessons.';
                if (isset($data['id']) && $data['id']) {
                    $schedule_lessions = $this->lession_model->get_schedule_lession_by_student($data['id']);
                    $lessions = '';
                    if ($schedule_lessions) {
                        $lessions = array();
                        foreach ($schedule_lessions as $schedule_lession) {
                            $where = 'booking_id = ' . $schedule_lession->booking_id . ' AND status != "cancel" AND status != "reject"';
                            $tempArray['booking_id'] = $schedule_lession->booking_id;
                            $tempArray['total_lession'] = $schedule_lession->no_of_lesson;
                            $tempArray['instructor_id'] = $schedule_lession->instructor_id;
                            $tempArray[ 'instructor_details' ] = $this->users_model->getUserById($schedule_lession->instructor_id);
                            $tempArray['lession'] = $this->lession_model->get_lessions_by_booking($where);
                            $last_date = end($tempArray[ 'lession' ]);
                            $min_lession_date = date('Y-m-d',strtotime($last_date->date . ' + 1 Day'));
                            $start_date = $tempArray['instructor_details']->availability_start_date;
                            $start_date = date('d-m-Y', strtotime($start_date));
                                                            
                            if(strtotime($min_lession_date) > strtotime($start_date) ){
                                $availability_start_date = $min_lession_date;
                            }else{
                                $availability_start_date = $start_date;
                            }
                            $current_date = date('d-m-Y');
                            //echo "strtotime($availability_start_date) < strtotime($current_date)";
                            if(strtotime($availability_start_date) < strtotime($current_date)){
                                $availability_start_date = date('d-m-Y', strtotime($current_date . ' + 1 Day'));
                            }
                            $availability_start_date = date('Y-m-d', strtotime($availability_start_date));
                            $tempArray[ 'min_lession_date' ] = $availability_start_date;
                            $lessions[] = $tempArray;
                        }

                        $res['lessions'] = $lessions;
                        $res['error'] = false;
                        $res['msg'] = '';
                    }
                }

                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } else if ($data['action'] == 'book_lession') {
                $res['error'] = true;
                if (isset($_REQUEST['instructor_id']) && isset($_REQUEST['booking_id']) && isset($_REQUEST['date']) && isset($_REQUEST['lession_no']) && isset($_REQUEST['time']) && isset($_REQUEST['pickup_point']) && $_REQUEST['date'] && $_REQUEST['lession_no'] && $_REQUEST['time'] && $_REQUEST['pickup_point'] && $_REQUEST['instructor_id'] && $_REQUEST['booking_id']) {
                    $instructor_id = $_REQUEST['instructor_id'];
                    $booking_id = $_REQUEST['booking_id'];
                    $booking_date = date('Y-m-d', strtotime($_REQUEST['date']));
                    $lession_no = $_REQUEST['lession_no'];
                    $lessions = 1;
                    $booking_first_time = $_REQUEST['time'];
                    $pickup_point = $_REQUEST['pickup_point'];
                    $status = array();
                    $selected_start_time = $selected_end_time = '';
                    $instructor = $this->users_model->getUserById($instructor_id);
                    $booking_first_time = $booking_first_time ? date('H:i:s', strtotime($booking_first_time)) : '';
                    $lessions = date('H:i:s', strtotime(trim(str_replace(array(
                                        'hour',
                                        's'
                                                    ), '', $lessions)) . ':00:00'));
                    try {
                        $availability_end_time = $instructor->availability_end_time ? date('H:i:s', strtotime($instructor->availability_end_time)) : '00:00:00';
                        $availability_start_time = $instructor->availability_start_time ? date('H:i:s', strtotime($instructor->availability_start_time)) : '00:00:00';
                        $secs = strtotime($lessions) - strtotime("00:00:00");
                        $starting_time = strtotime($booking_first_time);
                        $total_time = date("H:i:s", $starting_time + $secs);
                        if (($availability_end_time != '00:00:00' || $availability_start_time != '00:00:00') && strtotime($availability_start_time) <= $starting_time && $availability_end_time >= $total_time) {
                            $check_availability_data = array(
                                'instructor_id' => $instructor_id,
                                'booking_date' => $booking_date,
                                'start_time' => $booking_first_time,
                                'end_time' => $total_time
                            );
                            $check_availability = $this->lession_model->check_availability($check_availability_data);
                            if($data['dev']){
                                dumpit($check_availability_data, false, false );
                                dumpit($check_availability, false, false);
                            }
                            if (!$check_availability) {
                                $selected_start_time = $booking_first_time;
                                $selected_end_time = $total_time;
                                $lession_data['booking_id'] = $booking_id;
                                $lession_data['lession_no'] = $lession_no;
                                if ($this->lession_model->get_lessions_by_booking($lession_data)) {
                                    $lession_data['lession_type'] = 'reschedule';
                                } else {
                                    $lession_data['lession_type'] = 'schedule';
                                }

                                $lession_data['status'] = 'pending';
                                $lession_data['active'] = 1;
                                $lession_data['date'] = $booking_date;
                                $lession_data['time'] = $booking_first_time;
                                $lession_data['pickup_point'] = $pickup_point;

                                $id = $this->lession_model->insert($lession_data);
                                if ($id) {
                                    $res['error'] = false;
                                    $res['msg'] = 'Lession scheduled successfully!';
                                }
                            } else {
                                $res['msg'] = 'Instructor is not available of this date/time; please try by selecting any other date or time options.';
                            }
                        } else {
                            $res['msg'] = 'Instructor is not available of this time; try selecting other time options.';
                        }
                    } catch (Exception $e) {
                        $res['msg'] = 'Something went wrong, please try again after some time.';
                    }
                } else {
                    $res['msg'] = 'Something went wrong, please try again after some time.';
                }

                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } else if ($data['action'] == 'social_login') {
                $res['error'] = true;
                $userid = 0;
                $user_profile = $_REQUEST;
                $provider = $_REQUEST['provider'];
                $data['user_profile'] = $user_profile;
                $tempEmail = $user_profile['id'] . '@' . $provider . '.com';
                $userData['email'] = !empty($user_profile['email']) ? $user_profile['email'] : $tempEmail;
                $myuserid = $this->users_model->checkEmailExistsSocial($userData['email']);

                // exit;

                if ($myuserid == "instructor") {
                    $res['msg'] = "Email is registered as Instructor.You can't login from here.";
                } else if ($myuserid > 0) {
                    $userData = (array) $this->users_model->getUserById($myuserid);
                    $userid = $myuserid;
                } else {
                    $userid = $this->users_model->getSocialUserID($user_profile['id'], $provider);
                    print_r($userid);
                    if (!$userid) {
                        $displayName = isset($user_profile['name']) ? explode(' ', $user_profile['name']) : '';
                        $userData['first_name'] = isset($user_profile['firstName']) ? $user_profile['firstName'] : ($displayName && isset($displayName[0]) ? $displayName[0] : '');
                        $userData['last_name'] = isset($user_profile['lastName']) ? $user_profile['lastName'] : ($displayName && isset($displayName[1]) ? $displayName[1] : '');
                        $userData['user_name'] = rtrim(trim(strtolower(str_replace(' ', '_', $userData['first_name'] . '_' . $userData['last_name']))));
                        $userData['mobile_no'] = isset($user_profile['phone']) ? $user_profile['phone'] : '';
                        $userData['password'] = rand(11111, 9999999);
                        $userData['user_type'] = 'Student';
                        $userData['user_status'] = 'active';
                        $userData['gender'] = isset($user_profile['gender']) ? $user_profile['gender'] : '';
                        $code = md5(uniqid());
                        $userData['activation_code'] = $code;
                        $userid = $this->users_model->saveUser($userData);
                        if ($userid) {
                            $otherData['age'] = isset($user_profile['age']) ? $user_profile['age'] : '';
                            $otherData['identifier'] = isset($user_profile['id']) ? $user_profile['id'] : '';
                            $otherData['social_login'] = $provider;
                            $this->users_model->updateUserMetaArray($otherData, $userid);
                        }
                    }
                }

                if ($userid) {
                    $final = array();
                    $msg = $this->users_model->social_login_app($userid);
                    if (isset($msg['user_type']) && $msg['user_type'] == "Student") {
                        $info = "";
                        $details = $this->booking_model->getStudentBookingDetails($msg['id']);
                        if ($details) {
                            foreach ($details as $detail) {
                                if ($detail->no_of_lesson > 1)
                                    $s = 's';
                                else
                                    $s = '';
                                $dt = date('l d F', strtotime($detail->booking_date));
                                $count = $this->booking_model->getTotalComingLessons($msg['id']);
                                $business_name = $this->users_model->getUserMeta($detail->instructor_id, 'business_name');
                                if (isset($business_name) && $business_name != '') {
                                    $insname = $business_name;
                                } else {
                                    $insname = $detail->ins_fname . " " . $detail->ins_lname;
                                }

                                $info = "Hi $detail->stud_fname, how did you rate your last lesson? Next $detail->no_of_lesson hr$s lesson is on $dt at $detail->start_time with $insname Pick-up from  $detail->location. You've had $count->lessons lesson$s with $count->inscount instructor$s so far. Keep up the good work!";
                            }
                        }

                        $msg['info'] = $info;
                        if (isset($msg['test_score']) && $msg['test_score'] != '') {
                            $tesres = array();
                            $udata = @unserialize($msg['test_score']);
                            if ($udata !== false && count($udata) > 0) {
                                foreach ($udata as $res) {
                                    $tesres[] = $res;
                                }

                                $msg['test_score'] = $tesres;
                            } else
                                $msg['test_score'] = "";
                        } else
                            $msg['test_score'] = "";
                    }

                    if (isset($msg['qualifications']) && $msg['qualifications'] != '') {
                        $udata = @unserialize($msg['qualifications']);
                        if ($udata !== false) {
                            $msg['qualifications'] = unserialize($msg['qualifications']);
                            $msg['qualifications'] = implode(',', $msg['qualifications']);
                        } else
                            $msg['qualifications'] = "";
                    }

                    if (isset($msg['associations']) && $msg['associations'] != '') {
                        $udata = @unserialize($msg['associations']);
                        if ($udata !== false) {
                            $msg['associations'] = unserialize($msg['associations']);
                            $msg['associations'] = implode(',', $msg['associations']);
                        } else
                            $msg['associations'] = "";
                    }

                    if (isset($msg['awards']) && $msg['awards'] != '') {
                        $udata = @unserialize($msg['awards']);
                        if ($udata !== false) {
                            $msg['awards'] = unserialize($msg['awards']);
                            $msg['awards'] = implode(',', $msg['awards']);
                        } else
                            $msg['awards'] = "";
                    }

                    if (isset($msg['my_favourites']) && $msg['my_favourites'] != '') {
                        $udata = @unserialize($msg['my_favourites']);
                        if ($udata !== false) {
                            $msg['my_favourites'] = unserialize($msg['my_favourites']);
                            $msg['my_favourites'] = implode(',', $msg['my_favourites']);
                        } else
                            $msg['my_favourites'] = "";
                    }

                    if (isset($msg['type_car_licence']) && $msg['type_car_licence'] != '') {
                        $udata = @unserialize($msg['type_car_licence']);
                        if ($udata !== false) {
                            $msg['type_car_licence'] = unserialize($msg['type_car_licence']);
                            $msg['type_car_licence'] = implode(',', $msg['type_car_licence']);
                        } else
                            $msg['type_car_licence'] = "";
                    }

                    $temp_mobile_data = $this->users_model->get_mobile_id($userid);
                    $mobile_data = array();
                    foreach ($temp_mobile_data as $mobile_key) {
                        $mobile_data = unserialize($mobile_key->mobile_id);
                    }
                    if(isset($data['mobile_id'])){
                        $mobile_data[] = $data['mobile_id'];    
                    }
                    $otherData['mobile_id'] = array_unique($mobile_data);
                    $this->users_model->updateUserMetaArray($otherData, $userid);
                    $about = $this->db->select("page_desc")->from("pages")->where("page_title", "About Us")->get()->result();
                    $about = $about[0]->page_desc;
                    $msg['about'] = $about;
                    $res["error"] = false;
                    $res["user"] = $msg;
                }

                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } else if ($data['action'] == 'get_map_key') {
                $final = array();
                $map_key = $this->settings_model->get_option('map_key');
                $package_heading = $this->settings_model->get_option('package_heading');

                if ($map_key) {
                    $final['map_key'] = $map_key;
                    $final['package_heading'] = $package_heading;
                    $final['error'] = false;
                } else {
                    $final['error'] = true;
                    $final['msg'] = 'Map API key is not set yet.';
                }

                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } else if($data['action'] == "get_test_score"){
                
                if (isset($data['student_id']) && $data['student_id'] != '') {
                    $res = $final = array();
                    $test_scores = $this->users_model->getUserMeta($data['student_id'],'test_score');
                    if($test_scores){
                        $tesres = array();
                        $udata = @unserialize($test_scores);
                        if ($udata !== false && count($udata) > 0) {
                            foreach ($udata as $res) {
                                $tesres[] = $res;
                            }

                            $final = $tesres;
                        }
                    }
                }else {
                        $res["error"] = true;
                        $res["msg"] = "Student id not specified!";
                        $final[] = $res;
                    }
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            } else {
                $res['msg'] = "Nothing in action";
                $res['error'] = true;
                $final[] = $res;
                $output['data'] = $final;
                $res = json_encode($output);
                echo $res;
                exit;
            }
        } else {
            $res['msg'] = "Data is not set";
            $res['error'] = true;
            $final[] = $res;
            $output['data'] = $final;
            $res = json_encode($output);
            echo $res;
            exit;
        }
    }

}

function join_string($array_list) {
    $join_string = $seperator = '';
    if (is_array($array_list)) {
        foreach ($array_list as $array) {
            if (is_array($array)) {
                $join_string = join_string($array);
            } else {
                $join_string = $join_string . $seperator . $array;
                $seperator = ', ';
            }
        }
    }

    return $join_string;
}

function is_serialized($data, $strict = true) {

    // if it isn't a string, it isn't serialized.

    if (!is_string($data)) {
        return false;
    }

    $data = trim($data);
    if ('N;' == $data) {
        return true;
    }

    if (strlen($data) < 4) {
        return false;
    }

    if (':' !== $data[1]) {
        return false;
    }

    if ($strict) {
        $lastc = substr($data, -1);
        if (';' !== $lastc && '}' !== $lastc) {
            return false;
        }
    } else {
        $semicolon = strpos($data, ';');
        $brace = strpos($data, '}');

        // Either ; or } must exist.

        if (false === $semicolon && false === $brace)
            return false;

        // But neither must be in the first X characters.

        if (false !== $semicolon && $semicolon < 3)
            return false;
        if (false !== $brace && $brace < 4)
            return false;
    }

    $token = $data[0];
    switch ($token) {
        case 's':
            if ($strict) {
                if ('"' !== substr($data, -2, 1)) {
                    return false;
                }
            } elseif (false === strpos($data, '"')) {
                return false;
            }

        // or else fall through

        case 'a':
        case 'O':
            return (bool) preg_match("/^{$token}:[0-9]+:/s", $data);
        case 'b':
        case 'i':
        case 'd':
            $end = $strict ? '$' : '';
            return (bool) preg_match("/^{$token}:[0-9.E-]+;$end/", $data);
    }

    return false;
}

function get_time_difference( $end_date ){
    date_default_timezone_set('Europe/London');
    $start_date = date("d-m-Y H:i:s"); 
    $date1 = strtotime( $start_date );  
    $date2 = strtotime( $end_date );  
      
    // Formulate the Difference between two dates 
    $diff = abs($date2 - $date1);  
      
      
    // To get the year divide the resultant date into 
    // total seconds in a year (365*60*60*24) 
    $years = floor($diff / (365*60*60*24));  
      
      
    // To get the month, subtract it with years and 
    // divide the resultant date into 
    // total seconds in a month (30*60*60*24) 
    $months = floor(($diff - $years * 365*60*60*24) 
                                   / (30*60*60*24));  
      
      
    // To get the day, subtract it with years and  
    // months and divide the resultant date into 
    // total seconds in a days (60*60*24) 
    $days = floor(($diff - $years * 365*60*60*24 -  
                 $months*30*60*60*24)/ (60*60*24)); 
      
      
    // To get the hour, subtract it with years,  
    // months & seconds and divide the resultant 
    // date into total seconds in a hours (60*60) 
    $hours = floor(($diff - $years * 365*60*60*24  
           - $months*30*60*60*24 - $days*60*60*24) 
                                       / (60*60));  
      
      
    // To get the minutes, subtract it with years, 
    // months, seconds and hours and divide the  
    // resultant date into total seconds i.e. 60 
    $minutes = floor(($diff - $years * 365*60*60*24  
             - $months*30*60*60*24 - $days*60*60*24  
                              - $hours*60*60)/ 60);  
      
      
    // To get the minutes, subtract it with years, 
    // months, seconds, hours and minutes  
    $seconds = floor(($diff - $years * 365*60*60*24  
             - $months*30*60*60*24 - $days*60*60*24 
                    - $hours*60*60 - $minutes*60));  
      
    $output = '';
    if( $years ){
        if( $years > 1 ):
            $output = sprintf( "%d years ", $years );
        else:
            $output = sprintf( "%d year ", $years );
        endif;
    }
    if( $months ){
        if( $months > 1 ):
            $output .= sprintf( "%d months ", $months );
        else:
            $output = sprintf( "%d month ", $months );
        endif;
    }
    if( $days ){
        if( $days > 1 ):
            $output .= sprintf( "%d days ", $days );
        else:
            $output = sprintf( "%d day ", $days );
        endif;
    }
    if( $minutes ){
        if( $minutes > 1 ):
            $output .= sprintf( "%d minutes", $minutes );
        else:
            $output = sprintf( "%d minute", $minutes );
        endif;
    }
    return sprintf( "%s ago", $output );
}

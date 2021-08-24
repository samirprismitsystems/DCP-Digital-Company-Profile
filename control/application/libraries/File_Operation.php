<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class File_Operation {
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

}
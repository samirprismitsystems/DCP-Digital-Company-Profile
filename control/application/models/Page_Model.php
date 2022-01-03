<?php

class Page_Model extends CI_Model{
    

    public function createpage($data){
        return $this->db->insert('tbl_pages',$data);
    }

    public function getpagesdata(){
        return $this->db->get('tbl_pages')->result_array();
    }

    public function getsinglepagedata($page_slug){
        $this->db->where('page_slug',$page_slug);
        return $this->db->get('tbl_pages')->row_array();
    }

    public function updatepage($page_data,$page_id){
        $this->db->where('page_id',$page_id);
        return $this->db->update('tbl_pages',$page_data);
    }

    public function deletepage($page_id){
        $this->db->where('page_id',$page_id);
        return $this->db->delete('tbl_pages');
    }

     public function getsomepages($pagedata){
        $pages = explode(",", $pagedata['pages'][0]);
        $pagesdata = array();
        foreach ($pages as $value) {
            $this->db->where('page_id',$value);
            $data = $this->db->get('tbl_pages')->row_array();
            array_push($pagesdata,$data);
        }
        return $pagesdata;
    }

}


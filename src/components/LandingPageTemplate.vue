<template>
<div>

    <ul class="nav nav-tabs tabstyle" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#home" role="tab">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#steps" role="tab">Steps</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#card" role="tab">Card</a>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#feature" role="tab">Feature</a>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#faq" role="tab">FAQ</a>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#freetrail" role="tab">Free Trail</a>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#review" role="tab">Review</a>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#contact" role="tab">Contact</a>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#pages" role="tab">Pages</a>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#seo" role="tab">Seo</a>
        </li>

    </ul>

    <form @submit.prevent="savelandingdata">

    <div class="tab-content">

        <div class="tab-pane active" id="home" role="tabpanel">
            
            <div id="homesection">

                <h3 class="mt-3 mb-3">Home Section</h3>
                <div class="form_field">
                    <label>Home Title</label>
                    <input v-if="data != null" v-model="data.page_content.hometitle"  id="htitle"  name="htitle" ref="htitle" class="" value="" type="text" placeholder="Enter Home Title" required="">
                    <input v-else id="htitle"  name="htitle" ref="htitle" class="" value="" type="text" placeholder="Enter Home Title" required="">
                </div>

                <div class="form_field">
                    <label>Home Sub Title</label>
                    <input v-if="data != null" v-model="data.page_content.homesubtitle"  id="homesubtitle"  name="homesubtitle" ref="homesubtitle" class="" value="" type="text" placeholder="Enter Home Sub Title" required="">
                    <input v-else id="homesubtitle"  name="homesubtitle" ref="homesubtitle" class="" value="" type="text" placeholder="Enter Home Sub Title" required="">
                </div>

                <div class="form_field">
                    <label>Home Description</label>
                    <textarea v-if="data != null" v-model="data.page_content.homedesc" id="hdesc" rows="4" name="hdesc" ref="hdesc" class="" value="" placeholder="Enter Home Description" required=""></textarea>
                    <textarea v-else id="hdesc" rows="4" name="hdesc" ref="hdesc" class="" value="" placeholder="Enter Home Description" required=""></textarea>
                </div>

                <div class="form_field col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 logo-col private_img_col">
                    <div class="upload_private_img_box logo_img_box">
                        <div v-if="mobileimage == null " class="upload_here">
                            <img id="get_img" class="upload_img" src="" alt="image" style="display: none;" />
                                <div class="placeholder_tex">
                                <h3>Please Upload Home Page</h3>
                                <h2>Image</h2>
                        </div>
                </div>
                <div v-else class="upload_here">
                    <img id="get_img" class="upload_img" :src="mobileimagesrc" alt="image" />
                </div>
                <p class="red" >Image Required* 250KB max size</p>
                    <div class="upload_btn btn_100 site_btn mb-0 w-100">
                        <input type='file' @change="changepic" class="choose" />
                            Upload Main Image file
                    </div>
                </div>
                </div>

                <div class="form_field">
                    <label>Button Title</label>
                    <input v-if="data != null" v-model="data.page_content.homebtntitle"  id="mainbtntitle"  name="mainbtntitle" ref="mainbtntitle" class="" value="" type="text" placeholder="Enter Button Title" required="">
                    <input v-else id="mainbtntitle"  name="mainbtntitle" ref="mainbtntitle" class="" value="" type="text" placeholder="Enter Button Title" required="">
                </div>

                <div class="form_field">
                    <label>Button Link</label>
                    <input v-if="data != null" v-model="data.page_content.homebtnlink" id="mainbtnlink"  name="mainbtnlink" ref="mainbtnlink" class="" value="" type="text" placeholder="Enter Button Link" required="">
                    <input v-else id="mainbtnlink"  name="mainbtnlink" ref="mainbtnlink" class="" value="" type="text" placeholder="Enter Button Link" required="">
                </div> 
            </div>
        </div>

        <div class="tab-pane" id="steps" role="tabpanel">
            <div id="stepssection">
                <h3 class="mt-3 mb-3">Steps Section</h3>
                <div class="row" v-for="(step,index) in steps" :key="index">
                    <div class="col-lg-3">
                        <div class="form_field">
                            <label>Steps Title</label>
                            <input v-model="step.stepstitle"  name="stepstitle[]" class="" value="" type="text" placeholder="Enter Steps Title" required="">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="form_field">
                            <label>Steps Description</label>
                            <textarea v-model="step.stepsdesc" rows="3" name="stepsdesc[]" class="" value="" placeholder="Enter Steps Description" required=""></textarea>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <a @click="removeitem(index)" type="button" class=" site_btn add-more-btn">Remove</a>
                    </div>
                    
                </div>
                <a @click="addstepsitem" type="button" class=" site_btn add-more-btn">Add More</a>
            </div>
        </div>

        <div class="tab-pane" id="card" role="tabpanel">
            <div id="cardsection">
                <h3 class="mt-3 mb-3">Card Section</h3>
                <h4 class="mt-3 mb-3">Card 1</h4>
                
                <div class="form_field">
                    <label>Title</label>
                    <input v-if="data != null" v-model="data.page_content.cardtitle1" id="ctitle1"  name="ctitle1" ref="ctitle1" class="" value="" type="text" placeholder="Enter Card Title1" required="">
                    <input v-else id="ctitle1"  name="ctitle1" ref="ctitle1" class="" value="" type="text" placeholder="Enter Card Title1" required="">
                </div>
                
                <div class="form_field col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 logo-col private_img_col">
                    <div class="upload_private_img_box logo_img_box">
                        <div v-if="cardimage1 == null " class="upload_here">
                            <img id="get_img" class="upload_img" src="" alt="image" style="display: none;" />
                                <div class="placeholder_tex">
                                <h3>Please Upload Card</h3>
                                <h2>Image</h2>
                        </div>
                </div>
                <div v-else class="upload_here">
                    <img id="get_img" class="upload_img" :src="cardimage1src" alt="image" />
                </div>
                <p class="red" >Image Required* 250KB max size</p>
                    <div class="upload_btn btn_100 site_btn mb-0 w-100">
                        <input type='file' @change="changecard1img" class="choose" />
                            Upload Card Image
                    </div>
                </div>
                </div>

                <div class="form_field">
                    <label>Description</label>
                    <vue-editor v-if="data != null" v-model="data.page_content.carddesc1"  name="cdesc1" ref="cdesc1" class="" placeholder="Enter Card Description 1" required=""></vue-editor>
                    <vue-editor v-else v-model="card1"  name="cdesc1" ref="cdesc1" class="" placeholder="Enter Card Description 1" required=""></vue-editor>
                </div>

                <h4 class="mt-3 mb-3">Card 2</h4>
                <div class="form_field">
                    <label>Title</label>
                    <input v-if="data != null" v-model="data.page_content.cardtitle2" id="ctitle2"  name="ctitle2" ref="ctitle2" class="" value="" type="text" placeholder="Enter Card Title2" required="">
                    <input v-else id="ctitle2"  name="ctitle2" ref="ctitle2" class="" value="" type="text" placeholder="Enter Card Title2" required="">
                </div>

                <div class="form_field col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 logo-col private_img_col">
                    <div class="upload_private_img_box logo_img_box">
                        <div v-if="cardimage2 == null " class="upload_here">
                            <img id="get_img" class="upload_img" src="" alt="image" style="display: none;" />
                                <div class="placeholder_tex">
                                <h3>Please Upload Card</h3>
                                <h2>Image</h2>
                        </div>
                </div>
                <div v-else class="upload_here">
                    <img id="get_img" class="upload_img" :src="cardimage2src" alt="image" />
                </div>
                <p class="red" >Image Required* 250KB max size</p>
                    <div class="upload_btn btn_100 site_btn mb-0 w-100">
                        <input type='file' @change="changecard2img" class="choose" />
                            Upload Card Image
                    </div>
                </div>
                </div>

                <div class="form_field">
                    <label>Description</label>
                    <vue-editor v-if="data != null" v-model="data.page_content.carddesc2"  name="cdesc2" ref="cdesc2" class="" placeholder="Enter Card Description 2" required=""></vue-editor>
                    <vue-editor v-else v-model="card2"  name="cdesc2" ref="cdesc2" class="" placeholder="Enter Card Description 2" required=""></vue-editor>
                </div>
            </div>
        </div>

        <div class="tab-pane" id="feature" role="tabpanel">
            <div id="featuresection">
                <h3 class="mt-3 mb-3">Feature Section</h3>
                
                <div class="form_field">
                    <label>Feature Title</label>
                    <input v-if="data != null" v-model="data.page_content.featuretitle" id="featuretitle"  name="featuretitle" ref="featuretitle" class="" value="" type="text" placeholder="Enter Feature Title" required="">
                    <input v-else id="featuretitle"  name="featuretitle" ref="featuretitle" class="" value="" type="text" placeholder="Enter Feature Title" required="">
                </div>

                <div class="form_field">
                    <label>Feature Sub Title</label>
                    <input v-if="data != null" v-model="data.page_content.featuresubtitle" id="featuresubtitle"  name="featuresubtitle" ref="featuresubtitle" class="" value="" type="text" placeholder="Enter Feature Title" required="">
                    <input v-else id="featuresubtitle"  name="featuresubtitle" ref="featuresubtitle" class="" value="" type="text" placeholder="Enter Feature Sub Title" required="">
                </div>

                <div class="form_field">
                    <label>Feature Description</label>
                    <textarea v-if="data != null" v-model="data.page_content.featuredesc" id="featuredesc" rows="4" name="featuredesc" ref="featuredesc" class="" value="" placeholder="Enter Feature Description" required=""></textarea>
                    <textarea v-else id="featuredesc" rows="4" name="featuredesc" ref="featuredesc" class="" value="" placeholder="Enter Feature Description" required=""></textarea>
                </div>

                <div class="form_field">
                    <label>Button Title</label>
                    <input v-if="data != null" v-model="data.page_content.featurebtntitle" id="featurebtntitle"  name="featurebtntitle" ref="featurebtntitle" class="" value="" type="text" placeholder="Enter Button Title" required="">
                    <input v-else id="featurebtntitle"  name="featurebtntitle" ref="featurebtntitle" class="" value="" type="text" placeholder="Enter Button Title" required="">
                </div>

                <div class="form_field">
                    <label>Button Link</label>
                    <input v-if="data != null" v-model="data.page_content.featurebtnlink" id="featurebtnlink"  name="featurebtnlink" ref="featurebtnlink" class="" value="" type="text" placeholder="Enter Button Link" required="">
                    <input v-else id="featurebtnlink"  name="featurebtnlink" ref="featurebtnlink" class="" value="" type="text" placeholder="Enter Button Link" required="">
                </div>
                
                <h4 class="mt-3 mb-3">Features Logo And Text</h4>
                <div class="row" v-for="(feature,index) in features" :key="index">
                    <div class="col-lg-4">
                        <div class="form_field">
                            <label>Feature Text</label>
                            <input v-model="feature.featuretext" name="featuretitle[]" class="" value="" type="text" placeholder="Enter Feature Text" required="">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form_field">
                            <label>Feature Logo</label>
                            <input type="text" v-model="feature.featurelogo" name="featurelogo[]" class="" value="" placeholder="Enter Feature Logo" required="">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <a @click="removefeatureitem(index)" type="button" class=" site_btn add-more-btn">Remove</a>
                    </div>
                    
                </div>
                <a @click="addfeatureitem" type="button" class=" site_btn add-more-btn">Add More</a>
            </div>

        </div>

        <div class="tab-pane" id="faq" role="tabpanel">
            <div id="faqsection">
                <h3 class="mt-3 mb-3">FAQ Section</h3>
                
                <div class="form_field">
                    <label>FAQ Title</label>
                    <input v-if="data != null" v-model="data.page_content.faqtitle" id="faqtitle"  name="faqtitle" ref="faqtitle" class="" value="" type="text" placeholder="Enter FAQ Title" required="">
                    <input v-else id="faqtitle"  name="faqtitle" ref="faqtitle" class="" value="" type="text" placeholder="Enter FAQ Title" required="">
                </div>

                <div class="form_field">
                    <label>FAQ Description</label>
                    <textarea v-if="data != null" v-model="data.page_content.faqdesc" id="faqdesc" rows="4" name="faqdesc" ref="faqdesc" class="" value="" placeholder="Enter FAQ Description" required=""></textarea>
                    <textarea v-else id="faqdesc" rows="4" name="faqdesc" ref="faqdesc" class="" value="" placeholder="Enter FAQ Description" required=""></textarea>
                </div>

                <div class="form_field col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 logo-col private_img_col">
                    <div class="upload_private_img_box logo_img_box">
                        <div v-if="faqimg == null " class="upload_here">
                            <img id="get_img" class="upload_img" src="" alt="image" style="display: none;" />
                                <div class="placeholder_tex">
                                <h3>Please Upload FAQ</h3>
                                <h2>Image</h2>
                        </div>
                </div>
                <div v-else class="upload_here">
                    <img id="get_img" class="upload_img" :src="faqimgsrc" alt="image" />
                </div>
                <p class="red" >Image Required* 250KB max size</p>
                    <div class="upload_btn btn_100 site_btn mb-0 w-100">
                        <input type='file' @change="changefaqpic" class="choose" />
                            Upload FAQ Image
                    </div>
                </div>
                </div>

                
                <h4 class="mt-3 mb-3">FAQ Accrodian</h4>
                <div class="row" v-for="(faq,index) in faqs" :key="index">
                    <div class="col-lg-4">
                        <div class="form_field">
                            <label>Accrodian Text</label>
                            <input v-model="faq.title" name="faqtitle[]" class="" value="" type="text" placeholder="Enter Accrodian Title" required="">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form_field">
                            <label>Accrodian Description</label>
                            <textarea v-model="faq.desc" name="faqdesc[]" class="" value="" placeholder="Enter Accrodian Description" required=""></textarea>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <a @click="removefaqitem(index)" type="button" class=" site_btn add-more-btn">Remove</a>
                    </div>
                    
                </div>
                <a @click="addfaqitem" type="button" class=" site_btn add-more-btn">Add More</a>
            </div>

        </div>        

        <div class="tab-pane" id="freetrail" role="tabpanel">
            <div id="freetrailsection">
                <h3 class="mt-3 mb-3">Free Trail Section</h3>
                <div class="form_field">
                    <label>Free Trail Title</label>
                    <input v-if="data != null" v-model="data.page_content.fttitle" id="fttitle"  name="fttitle" ref="fttitle" class="" value="" type="text" placeholder="Enter Free Trail Title" required="">
                    <input v-else id="fttitle"  name="fttitle" ref="fttitle" class="" value="" type="text" placeholder="Enter Free Trail Title" required="">
                </div>

                <div class="form_field">
                    <label>Free Trail Description</label>
                    <textarea v-if="data != null" v-model="data.page_content.ftdesc" id="ftdesc" rows="4" name="ftdesc" ref="ftdesc" class="" value="" placeholder="Enter Free Trail Description" required=""></textarea>
                    <textarea v-else id="ftdesc" rows="4" name="ftdesc" ref="ftdesc" class="" value="" placeholder="Enter Free Trail Description" required=""></textarea>
                </div>

                <div class="form_field col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 logo-col private_img_col">
                    <div class="upload_private_img_box logo_img_box">
                        <div v-if="freetrail == null " class="upload_here">
                            <img id="get_img" class="upload_img" src="" alt="image" style="display: none;" />
                                <div class="placeholder_tex">
                                <h3>Please Upload Free Trail</h3>
                                <h2>Image</h2>
                        </div>
                </div>
                <div v-else class="upload_here">
                    <img id="get_img" class="upload_img" :src="freetrailsrc" alt="image" />
                </div>
                <p class="red" >Image Required* 250KB max size</p>
                    <div class="upload_btn btn_100 site_btn mb-0 w-100">
                        <input type='file' @change="changeftrail" class="choose" />
                            Upload Free trail Image
                    </div>
                </div>
                </div>

                <div class="form_field">
                    <label>Button Title</label>
                    <input v-if="data != null" v-model="data.page_content.ftbtnlink" id="ftrailbtntitle"  name="ftrailbtntitle" ref="ftrailbtntitle" class="" value="" type="text" placeholder="Enter Button Title" required="">
                    <input v-else id="ftrailbtntitle"  name="ftrailbtntitle" ref="ftrailbtntitle" class="" value="" type="text" placeholder="Enter Button Title" required="">
                </div>

                <div class="form_field">
                    <label>Button Link</label>
                    <input v-if="data != null" v-model="data.page_content.ftbtntitle" id="ftrailbtnlink"  name="ftrailbtnlink" ref="ftrailbtnlink" class="" value="" type="text" placeholder="Enter Button Link" required="">
                    <input v-else id="ftrailbtnlink"  name="ftrailbtnlink" ref="ftrailbtnlink" class="" value="" type="text" placeholder="Enter Button Link" required="">
                </div> 
            </div>
        </div>

        <div class="tab-pane" id="review" role="tabpanel">
            <div id="reviewsection">
                <h3 class="mt-3 mb-3">Review Section</h3>
                    <div class="form_field">
                        <label>Review Title</label>
                        <input v-if="data != null" v-model="data.page_content.reviewtitle" id="reviewtitle"  name="reviewtitle" ref="reviewtitle" class="" value="" type="text" placeholder="Enter Review Title" required="">
                        <input v-else id="reviewtitle"  name="reviewtitle" ref="reviewtitle" class="" value="" type="text" placeholder="Enter Review Title" required="">
                    </div>

                    <div class="form_field">
                        <label>Review Sub Title</label>
                        <input v-if="data != null" v-model="data.page_content.reviewsubtitle" id="reviewsubtitle"  name="reviewsubtitle" ref="reviewsubtitle" class="" value="" type="text" placeholder="Enter Review Sub Title" required="">
                        <input v-else id="reviewsubtitle"  name="reviewsubtitle" ref="reviewsubtitle" class="" value="" type="text" placeholder="Enter Review Sub Title" required="">
                    </div>

                    <div class="form_field">
                        <label>Review Description</label>
                        <textarea v-if="data != null" v-model="data.page_content.reviewdesc" id="reviewdesc" rows="4" name="reviewdesc" ref="reviewdesc" class="" value="" placeholder="Enter Review Description" required=""></textarea>
                        <textarea v-else id="reviewdesc" rows="4" name="reviewdesc" ref="reviewdesc" class="" value="" placeholder="Enter Review Description" required=""></textarea>
                    </div>
            </div>
        </div>

        <div class="tab-pane" id="contact" role="tabpanel">
            <div id="contactsection">
                <h3 class="mt-3 mb-3">Contact Section</h3>
                    <div class="form_field">
                        <label>Contact Title</label>
                        <input v-if="data != null" v-model="data.page_content.contacttitle" id="contacttitle"  name="contacttitle" ref="contacttitle" class="" value="" type="text" placeholder="Enter Contact Title" required="">
                        <input v-else id="contacttitle"  name="contacttitle" ref="contacttitle" class="" value="" type="text" placeholder="Enter Contact Title" required="">
                    </div>

                    <div class="form_field">
                        <label>Contact Description</label>
                        <textarea v-if="data != null" v-model="data.page_content.contactdesc" id="contactdesc" rows="4" name="contactdesc" ref="contactdesc" class="" value="" placeholder="Enter Contact Description" required=""></textarea>
                        <textarea v-else id="contactdesc" rows="4" name="contactdesc" ref="contactdesc" class="" value="" placeholder="Enter Contact Description" required=""></textarea>
                    </div>
            </div>
        </div>

         <div class="tab-pane" id="pages" role="tabpanel">
            <div id="pagesection">
                <h3 class="mt-3 mb-3">Page Section</h3>

                    <!-- <div class="form_field">
                        <label class="" for="">Select Menu Pages</label>
                        <select name="pagelist" v-model="pagelist" id="pagelist" multiple>
                            <option :value="page.page_id" v-for="(page,index) in getpagesdata" :key="index">{{page.page_name}}</option>
                        </select>
                    </div> -->

                    <div class="form_field">
                        <label class="" for="">Select Footer Pages</label>
                        <select name="pagelist" v-model="pagelist" id="pagelist" multiple>
                            <option :value="page.page_id" v-for="(page,index) in getpagesdata" :key="index">{{page.page_name}}</option>
                        </select>
                    </div>

            </div>
        </div>

        <div class="tab-pane" id="seo" role="tabpanel">
            <h3 class="mt-3 mb-3">SEO Section</h3>
                <div class="form_field col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 logo-col private_img_col mt-3">
                    <div class="upload_private_img_box logo_img_box">
                        <div v-if="metaimg == null" class="upload_here">
                            <img id="get_img" class="upload_img" src="" alt="image" style="display: none;" />
                                <div class="placeholder_tex">
                                    <h3>Please Upload Meta Image</h3>
                                </div>
                        </div>

                        <div v-else class="upload_here">
                            <img id="get_img" class="upload_img" :src="metaimgsrc" alt="image" />
                        </div>

                        <p class="red" >Image Required* 250KB max size</p>
                            <div class="upload_btn btn_100 site_btn mb-0 w-100">
                                <input type='file' @change="changemetapic" class="choose" />
                                    Upload Meta Image
                            </div>
                    </div>
                 </div>


                <div class="form_field">
                    <label class="" for="user_id">Meta Title</label>
                    <input v-if="data != null" v-model="getsinglepagedata.meta_title" type="text"  id="metatitle" ref="metatitle" name="metatitle" class="" placeholder="Enter Meta Title" required="">
                    <input v-else type="text"  id="metatitle" ref="metatitle" name="metatitle" class="" placeholder="Enter Meta Title" required="">
                </div>

                <div class="form_field">
                    <label class="" for="user_id">Meta Description</label>
                    <textarea v-if="data != null" v-model="getsinglepagedata.meta_description" rows="5"  id="metadesc" ref="metadesc" name="metadesc" class="" placeholder="Enter Meta Description" required=""></textarea>
                    <textarea v-else rows="5"  id="metadesc" ref="metadesc" name="metadesc" class="" placeholder="Enter Meta Description" required=""></textarea>
                </div>

                <div class="form_field">
                    <label class="" for="user_id">Meta Keywords</label>
                    <textarea v-if="data != null" v-model="getsinglepagedata.meta_keywords" rows="5"  id="metakey" ref="metakey" name="metakey" class="" placeholder="Enter Meta Keywords" required=""></textarea>
                    <textarea v-else rows="5"  id="metakey" ref="metakey" name="metakey" class="" placeholder="Enter Meta Keywords" required=""></textarea>
                </div>
                <button type="submit" class="form_btn btn_100">Save</button>
        </div>


    </div>

</form>

    <div class="alert alert-success" v-if="showmsg">{{msg}}</div>

</div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from "vue2-editor";
export default {
    name:'LandingPageTemplate',
    components:{
        VueEditor
    },
    computed:{
        getsinglepagedata(){
            let data =  this.$store.getters.getsinglepagedata(this.$route.params.pageslug);
            if(data != null){
                // Home Image
                this.mobileimage = data.page_content.homeimg;
                this.mobileimagesrc = this.$imgpath + 'landingpageoriginal/' + data.page_content.homeimg;

                // Card Image 1
                this.cardimage1 = data.page_content.cardimg1;
                this.cardimage1src = this.$imgpath + 'landingpageoriginal/' + data.page_content.cardimg1;

                // Card Image 2
                this.cardimage2 = data.page_content.cardimg2;
                this.cardimage2src = this.$imgpath + 'landingpageoriginal/' + data.page_content.cardimg2;

                // FAQ
                this.faqimg = data.page_content.faqimg;
                this.faqimgsrc = this.$imgpath + 'landingpageoriginal/' + data.page_content.faqimg;
                this.faqs = JSON.parse(data.page_content.accordian);

                // Free Trail
                this.freetrail= data.page_content.ftimg;
                this.freetrailsrc = this.$imgpath + 'landingpageoriginal/' + data.page_content.ftimg;

                // Steps
                this.steps = JSON.parse(data.page_content.steps);

                // Features
                this.features = JSON.parse(data.page_content.logoandtext);

                // Meta
                this.metaimg = data.meta_image;
                this.metaimgsrc = this.$imgpath + 'metaimgoriginal/' + data.meta_image;

                this.pagelist = JSON.parse(data.page_content.footerpages);

            }
            return data;
        },
        getpagerequest(){
            return this.$store.getters.getpagesrequest;
        },

        getpagesdata(){
            let data =  this.$store.getters.getpagesdata; 
            return data;
        },
        getpagesrequest(){
            return this.$store.getters.getpagesrequest;
        },

    },
    
    props:{
        data:{

        }
    },

    created(){
        if(this.data != null && this.data != ''){
            this.isupdate = true;
        }
    },

    data(){
        return{
            card1:'',
            card2:'',
            content:'',
            
            steps:[
                {
                    stepstitle:'',
                    stepsdesc:''
                }
            ],

            mobileimage:null,
            mobileimagesrc:'',

            cardimage1:null,
            cardimage1src:'',
            cardimage2:null,
            cardimage2src:'',

            // featureimg:null,
            // featureimgsrc:'',

            faqimg:null,
            faqimgsrc:'',

            freetrail:null,
            freetrailsrc:'',

            metaimg:null,
            metaimgsrc:'',
            // ismetachangepic:false,


            features:[
                {
                    featuretext:'',
                    featurelogo:'',
                }
            ],

            faqs:[
                {
                    title:'',
                    desc:'',
                }
            ],


            showmsg:false,
            msg:'',

            isupdate:false,

            ischangehomepic:false,
            ischangecard1pic:false,
            ischangecard2pic:false,
            ischangefaqpic:false,
            ischangefrtrailpic:false,
            ischangeseopic:false,
            
            pagelist:[],
            
        }
    },

    methods:{
        addstepsitem(){
            this.steps.push({
                stepstitle:'',
                stepsdesc:'',
            });
        },
        removeitem(index){
            this.steps.splice(index, 1);
        },

        addfeatureitem(){
            this.features.push({
                featuretext:'',
                featurelogo:'',
            });
        },
        removefeatureitem(index){
            this.features.splice(index, 1);
        },

        addfaqitem(){
            this.faqs.push({
                title:'',
                desc:'',
            });
        },
        removefaqitem(index){
            this.faqs.splice(index, 1);
        },


        changepic(event){
            this.mobileimage = event.target.files[0];
            this.mobileimagesrc = URL.createObjectURL(this.mobileimage);
            this.ischangehomepic = true;
        },

        changeftrail(event){
            this.freetrail = event.target.files[0];
            this.freetrailsrc = URL.createObjectURL(this.freetrail);
            this.ischangefrtrailpic = true;
        },

        changefaqpic(event){
            this.faqimg = event.target.files[0];
            this.faqimgsrc = URL.createObjectURL(this.faqimg);
            this.ischangefaqpic = true;
        },

        changecard1img(event){
            this.cardimage1 = event.target.files[0];
            this.cardimage1src = URL.createObjectURL(this.cardimage1);
            this.ischangecard1pic = true;
        },

        changecard2img(event){
            this.cardimage2 = event.target.files[0];
            this.cardimage2src = URL.createObjectURL(this.cardimage2);
            this.ischangecard2pic = true;
        },

        changemetapic(event){
            this.metaimg = event.target.files[0];
            this.metaimgsrc = URL.createObjectURL(this.metaimg);
            this.ischangeseopic = true;
        },



        savelandingdata(){
            let fd = new FormData();

            let slug = $('#mainpagetitle').val().replace(/[^a-zA-Z ]/g, "");
            let nslug = slug.replace(" ","-").replace(/\s+/g, '').toLowerCase();
            fd.append('page_slug',nslug);
            fd.append('page_name',$('#mainpagetitle').val());

            if(this.isupdate == true){
                fd.append('template_name', this.data.template_name );
                fd.append('page_id', this.data.page_id );
            }
            else{
                fd.append('template_name',$('#templatename').val());
            }

            fd.append('isupdate',this.isupdate);

            fd.append('meta_title',this.$refs.metatitle.value);
            fd.append('meta_description',this.$refs.metadesc.value);
            fd.append('meta_keywords',this.$refs.metakey.value);

            let data = this.getsinglepagedata;

            if(this.ischangeseopic == true){
                fd.append('meta_image',this.metaimg);
            }
            else{
                if(data.meta_image != ''){
                    fd.append('meta_image_name',data.meta_image);
                }
                else{
                    fd.append('meta_image_name', '' );
                }
                
            }

            // Home Page
            fd.append('hometitle',this.$refs.htitle.value);
            fd.append('homesubtitle',this.$refs.homesubtitle.value);
            fd.append('homedesc',this.$refs.hdesc.value);
            if(this.ischangehomepic == true){
                fd.append('homeimg',this.mobileimage);
            }
            else{
                if(data.page_content.homeimg != ''){
                    fd.append('homeimgpic', data.page_content.homeimg );
                }
                else{
                    fd.append('homeimgpic', '' );
                }
            }
            fd.append('homebtntitle',this.$refs.mainbtntitle.value);
            fd.append('homebtnlink',this.$refs.mainbtnlink.value);

            // Steps
            fd.append('steps', JSON.stringify(this.steps));
            
            // Card
            fd.append('cardtitle1',this.$refs.ctitle1.value);
            fd.append('carddesc1',this.$refs.cdesc1.value);
            if(this.ischangecard1pic == true){
                fd.append('cardimg1',this.cardimage1);
            }
            else{
                if(data.page_content.cardimg1 != ''){
                    fd.append('cardimg1pic', data.page_content.cardimg1 );
                }
                else{
                    fd.append('cardimg1pic', '' );
                }
            }

            fd.append('cardtitle2',this.$refs.ctitle2.value);
            fd.append('carddesc2',this.$refs.cdesc2.value);
            if(this.ischangecard2pic == true){
                fd.append('cardimg2',this.cardimage2);
            }
            else{
                if(data.page_content.cardimg2 != ''){
                    fd.append('cardimg2pic', data.page_content.cardimg2 );
                }
                else{
                    fd.append('cardimg2pic', '' );
                }
            }
            

            // Feature
            fd.append('featuretitle',this.$refs.featuretitle.value);
            fd.append('featuresubtitle',this.$refs.featuresubtitle.value);
            fd.append('featuredesc',this.$refs.featuredesc.value);
            fd.append('featurebtntitle',this.$refs.featurebtntitle.value);
            fd.append('featurebtnlink',this.$refs.featurebtnlink.value);
            fd.append('logoandtext',JSON.stringify(this.features));

            // Faq
            fd.append('faqtitle',this.$refs.faqtitle.value);
            fd.append('faqdesc',this.$refs.faqdesc.value);
            if(this.ischangefaqpic == true){
                fd.append('faqimg',this.faqimg);
            }
            else{
                if(data.page_content.faqimg != ''){
                    fd.append('faqimgpic', data.page_content.faqimg );
                }
                else{
                    fd.append('faqimgpic', '' );
                }
            }
            fd.append('accordian',JSON.stringify(this.faqs));


            // Free Trail
            fd.append('fttitle',this.$refs.fttitle.value);
            fd.append('ftdesc',this.$refs.ftdesc.value);
            if(this.ischangefrtrailpic == true){
                fd.append('ftimg',this.freetrail);
            }
            else{
                if(data.page_content.ftimg != ''){
                    fd.append('ftimgpic', data.page_content.ftimg );
                }
                else{
                    fd.append('ftimgpic', '' );
                }
            }
            
            fd.append('ftbtntitle',this.$refs.ftrailbtntitle.value);
            fd.append('ftbtnlink',this.$refs.ftrailbtnlink.value);


            // Review
            fd.append('reviewtitle',this.$refs.reviewtitle.value);
            fd.append('reviewsubtitle',this.$refs.reviewsubtitle.value);
            fd.append('reviewdesc',this.$refs.reviewdesc.value);

            // Contact
            fd.append('contacttitle',this.$refs.contacttitle.value);
            fd.append('contactdesc',this.$refs.contactdesc.value);

            fd.append('footerpages',JSON.stringify(this.pagelist));

            axios.post('pages/createpage',fd).then((result) => {
                this.showmsg = true;
                this.msg = result.data.message;

                setTimeout(() => {
                    this.showmsg = false;
                    this.msg = '';
                    this.$router.push('/admindashboard/pages');
                }, 3000);
            });

        }

    }
}
</script>

<style scoped>
    .tabstyle{
        font-size: 15px;
    }
</style>
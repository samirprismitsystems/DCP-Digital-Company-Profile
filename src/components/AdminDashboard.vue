<template>

      <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content">
			<div class="tabs-stage">
                <div class="expand_tabs" v-if="getdashrequest == 1">

			        <div class="tab_title">
				        <div class="h2">Admin Dashboard</div>
			    	</div>

                   <div class="container mt-5">
                    <div class="row">
                        <div class="col-md-3 col-sm-6">
                            <div class="counter">
                                <div class="counter-icon">
                                    <i class="fa fa-user"></i>
                                </div>
                                <span class="counter-value">{{getdashdata.users}}</span>
                                <h3>Total Users</h3>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6">
                            <div class="counter blue">
                                <div class="counter-icon">
                                    <i class="fa fa-box-open"></i>
                                </div>
                                <span class="counter-value">{{getdashdata.orders}}</span>
                                <h3>Total Orders</h3>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="counter gray">
                                <div class="counter-icon">
                                    <i class="fa fa-box"></i>
                                </div>
                                <span class="counter-value">{{getdashdata.product}}</span>
                                <h3>Total Product</h3>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="counter pink">
                                <div class="counter-icon">
                                    <i class="fa fa-cogs"></i>
                                </div>
                                <span class="counter-value">{{getdashdata.service}}</span>
                                <h3>Total Service</h3>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row mt-5">

                     <div class="col-md-3 col-sm-6">
                            <div class="counter lpurple">
                                <div class="counter-icon">
                                  <i class="fa fa-user-friends"></i>
                                </div>
                                <span class="counter-value">{{getdashdata.clients}}</span>
                                <h3>Total Clients</h3>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="counter dpink">
                                <div class="counter-icon">
                                  <i class="fa fa-images"></i>
                                </div>
                                <span class="counter-value">{{getdashdata.portfolio}}</span>
                                <h3>Total Portfolios</h3>
                            </div>
                        </div>
                       
                        <div class="col-md-3 col-sm-6">
                            <div class="counter purple">
                                <div class="counter-icon">
                                  <i class="fa fa-quote-right"></i>
                                </div>
                                <span class="counter-value">{{getdashdata.testimonials}}</span>
                                <h3>Total Testimonials</h3>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="counter green">
                                <div class="counter-icon">
                                  <i class="fa fa-question-circle"></i>
                                </div>
                                <span class="counter-value">{{getdashdata.inquiry}}</span>
                                <h3>Total Inquires</h3>
                            </div>
                        </div>
                    </div>

                <div class="container row companytable mt-5 justify-content-center">
                <h3 class="mt-5 col-md-8">Top 5 Companies</h3>
                    <table class="table table-hover tablecontent col-md-8">
                    
                    <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company ESTD.</th>
                        <th>Company Email</th>
                        <th>Company Contact</th>
                    </tr>
                    </thead>
                        <tbody>

                        <tr v-for="(company,index) in getdashdata.company" :key="index">
                            <td> {{company.company_name}} </td>
                            <td> {{company.established_in}} </td>
                            <td> {{company.company_email}} </td>
                            <td> {{company.company_contact}} </td>
                        </tr>
                        <tr v-if="getdashdata.company == ''">
                        <td colspan="5" class="text-center">No Record Found</td>
                        </tr>

                        </tbody>
                    </table>
                    
                </div>

                </div>
            </div>
        </div>
        </div>
    </div>
    </section>

</template>

<script>
import AdminDash from './AdminDash'
export default {
    name:'AdminDashboard',
    components:{
        AdminDash
    },
    
    computed:{
        getdashdata(){
            return this.$store.getters.getadmindash;
        },
        getdashrequest(){
            return this.$store.getters.getadmindashreq;
        }

    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        this.$store.dispatch('setadmindashdata');
    },


}
</script>

<style scoped>
.counter{
    color: #f27f21;
    font-family: 'Open Sans', sans-serif;
    text-align: center;
    height: 190px;
    width: 190px;
    padding: 30px 25px 25px;
    margin: 0 auto;
    border: 3px solid #f27f21;
    border-radius: 20px 20px;
    position: relative;
    z-index: 1;
}
.counter:before,
.counter:after{
    content: "";
    background: #f3f3f3;
    border-radius: 20px;
    box-shadow: 4px 4px 2px rgba(0,0,0,0.2);
    position: absolute;
    left: 15px;
    top: 15px;
    bottom: 15px;
    right: 15px;
    z-index: -1;
}
.counter:after{
    background: transparent;
    width: 100px;
    height: 100px;
    border: 15px solid #f27f21;
    border-top: none;
    border-right: none;
    border-radius: 0 0 0 20px;
    box-shadow: none;
    top: auto;
    left: -10px;
    bottom: -10px;
    right: auto;
}
.counter .counter-icon{
    font-size: 35px;
    line-height: 35px;
    margin: 0 0 15px;
    transition: all 0.3s ease 0s;
}
.counter:hover .counter-icon{ transform: rotateY(360deg); }
.counter .counter-value{
    color: #555;
    font-size: 30px;
    font-weight: 600;
    line-height: 20px;
    margin: 0 0 20px;
    display: block;
    transition: all 0.3s ease 0s;
}
.counter:hover .counter-value{ text-shadow: 2px 2px 0 #d1d8e0; }
.counter h3{
    font-size: 17px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 0 15px;
}
.counter.blue{
    color: #4accdb;
    border-color: #4accdb;
}
.counter.blue:after{
    border-bottom-color: #4accdb;
    border-left-color: #4accdb;
}


/* gray */
.counter.gray{
    color: #a8a8a8;
    border-color: #a8a8a8;
}
.counter.gray:after{
    border-bottom-color: #a8a8a8;
    border-left-color: #a8a8a8;
}

/* Pink */
.counter.pink{
    color: #ff1c86;
    border-color: #ff1c86;
}
.counter.pink:after{
    border-bottom-color: #ff1c86;
    border-left-color: #ff1c86;
}

/* black */
.counter.purple{
    color: #c2a9ff;
    border-color: #c2a9ff;
}
.counter.purple:after{
    border-bottom-color: #c2a9ff;
    border-left-color: #c2a9ff;
}

/* Green */
.counter.green{
    color: #132c33;
    border-color: #132c33;
}
.counter.green:after{
    border-bottom-color: #132c33;
    border-left-color: #132c33;
}


/* light Purple */
.counter.lpurple{
    color: #9b82ae;
    border-color: #9b82ae;
}
.counter.lpurple:after{
    border-bottom-color: #9b82ae;
    border-left-color: #9b82ae;
}

/* dark pink */
.counter.dpink{
    color: #A52A2A;
    border-color: #A52A2A;
}
.counter.dpink:after{
    border-bottom-color: #A52A2A;
    border-left-color: #A52A2A;
}


@media screen and (max-width:990px){
    .counter{ margin-bottom: 40px; }
}
</style>
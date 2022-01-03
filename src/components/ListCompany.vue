<template>
    <div class="row mt-5">
        <div class="col-lg-4 col-md-4 col-sm-4 col-12 mt-5">
            <ul class="menulist">
              <li><router-link :to="'listcompany'">list<i style="margin-left:40px" class="fas fa-list fa-lg"></i></router-link></li>
              <li><router-link :to="'addcompany'">Add Company<i style="margin-left:90px" class="fab fa-bitbucket fa-lg"></i></router-link></li>
            </ul>
          </div>    

        
          <div class="col-md-8 col-sm-8 col-lg-8 col-8 mt-5">
            
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Logo</th>
                    <th>Establised In</th>
                    <th>Segment</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Working Hours</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>                
                <tr>
                    <td>prismitsystems</td>
                    <td>Logo</td>
                    <td>2009</td>
                    <td>It Sector</td>
                    <td>prismitworks@gmail.com</td>
                    <td>8872665345</td>
                    <td>8 hours</td>
                    <td><i class="fas fa-edit"></i></td>
                </tr>
                </tbody>

            </table>

            
          
          </div>
    </div>
</template>

<script>
export default {
    name:'ListCompany'
}
</script>

<style scoped>
.menulist li{
    font-size: 16px;
    color: #9d278f;
    font-weight: 500;
    line-height: 1.2;
    transition: all 0.5s;
    display: list-item;
    padding: 20px 20px 20px 20px;
    margin-top: 2px;
    border-left : 5px black solid;
    background-color: #ddffff;
    padding-left: 10px;
}
</style>
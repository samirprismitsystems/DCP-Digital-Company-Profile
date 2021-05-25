<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Digital Company Profile</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/dashboard">Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard/company">Company</router-link>
                </li>
                
                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard/product">Product</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard/service">Service</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard/client">Client</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard/portfolio">Portfolio</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard/testimonial">Testimonial</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard/inquiry">Inquiry</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard/login">Login</router-link>
                </li>

            </ul>
        </div>
        </nav>
    </div>
</template>

<script>
export default {
    name:'DashboardHeader'
}
</script>
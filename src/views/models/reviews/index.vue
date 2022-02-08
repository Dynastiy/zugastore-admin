<template>
    <div>
        <div class="mb-4">
            <h4 class="font-weight-bold">Submit New App</h4>
        </div>
        <form action="" @submit.prevent="submit">
            <div  class="row">
                <div class="col-md-4 mb-3">
                    <label for="">Name of App</label> 
                    <input type="text" name="" id="" v-model="name" class="form-control" placeholder="Enter App Name">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="">Name of Developer</label> 
                    <input type="text" name="" id="" v-model="developer" class="form-control" placeholder="" readonly>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="">Platform</label> <br>
                    <select v-model="platform" id="select-platform" class="form-control">
                        <option value="" > --- </option>
                        <option value="android">Android</option>
                        <option value="ios">iOS</option>
                    </select>
                </div>
            </div>
            <div  class="row">
                <div class="col-md-3 mb-3">
                    <label for="">License</label> 
                    <select v-model="license" @change="togglePrice()" id="select-license" class="form-control">
                        <option value="" > --- </option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="">Price</label> 
                    <input v-model="price" :disabled="disabled" type="number" name="" id="" class="form-control" placeholder="">
                </div>
                <div class="col-md-3 mb-3">
                    <label for="">Select Tag</label> <br>
                    <select v-model="tag_id" id="select-tag" class="form-control">
                        <option value= ""> --- </option>
                        <option :value="tag.id" v-for="tag in tags" :key="tag.id"> {{ tag.name }} </option>
                        
                    </select>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="">Select Category</label> <br>
                    <select v-model="category_id" id="select-category" class="form-control">
                        <option value="" > --- </option>
                        <option v-for="category in categories" :key="category.id" :value="category.id" > {{ category.category_name }} </option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label for="">App Icon</label>
                    <input type="file" class="" id="app-icon"  @change="appIconUpload($event)" >
                </div>
                <div class="col-md-4 mb-3">
                    <label for="">App File</label>
                    <input type="file" class="" id="app-icon"  @change="appFileUpload($event)" >
                </div>
                <div class="col-md-4 mb-3">
                    <label for="">App Image 1 </label>
                    <input type="file" class="" id="app-icon"  @change="photoOneUpload($event)" >
                </div>            
            </div>
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label for="">App Image 2</label>
                    <input type="file" class="" id="app-icon"  @change="photoTwoUpload($event)" >
                </div>
                <div class="col-md-4 mb-3">
                    <label for="">App Image 3</label>
                    <input type="file" class="" id="app-icon"  @change="photoThreeUpload($event)" >
                </div>
                <div class="col-md-4 mb-3">
                    <label for="">App Image 4 </label>
                    <input type="file" class="" id="app-icon"  @change="photoFourUpload($event)" >
                </div>            
            </div>
            <div class="mb-3">
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">App Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
                </div>   
            </div>
            <div class="text-center">
                <button class="border-0 bg-info py-2 px-5 rounded-lg text-white" type="submit"> Submit </button>
            </div>
        </form>
    </div>
</template>

<script>
import helpers from '@/helpers/index.js'
import Swal from 'sweetalert2'
export default {
    data(){
        return{
            disabled: true,
            categories: '',
            tags: '',
            user: {},
            name: '',
            description: '',
            price: '',
            license: '',
            developer: '',
            platform: '',
            tag_id: '',
            category_id: '',
            app_icon: null,
            app_file: null,
            phote_one: null,
            photo_two: null,
            photo_three: null,
            photo_four: null
        }
    },
    methods:{
        appIconUpload(){
        var input = event.target;
        this.app_icon = input.files[0];
        console.log(this.app_icon);
        },
        appFileUpload(){
        var input = event.target;
        this.app_file = input.files[0];
        console.log(this.app_file);
        },
        photoOneUpload(){
        var input = event.target;
        this.photo_one = input.files[0];
        console.log(this.photo_one);
        },
        photoTwoUpload(){
        var input = event.target;
        this.photo_two = input.files[0];
        console.log(this.photo_two);
        },
        photoThreeUpload(){
        var input = event.target;
        this.photo_three = input.files[0];
        console.log(this.photo_three);
        },
        photoFourUpload(){
        var input = event.target;
        this.photo_four = input.files[0];
        console.log(this.photo_four);
        },
        async getCategories(){
            let res = await helpers.getCategories();
            // console.log(res.categories);
            this.categories = res.categories;
        },
        async getUser(){
            let res = await helpers.getUser();
            // console.log(res);
            this.user = res;
        },
        async getTags(){
            let res = await helpers.getTags();
            // console.log(res.products);
            this.tags = res.products;
        },
        togglePrice(){
        var priceOptions = document.getElementById("select-license");
        var selOption = priceOptions.options[priceOptions.selectedIndex].value;
        if(selOption === "free"){
            this.disabled = true;
        }
        else{
            this.disabled = false;
        }
      },
      async submit(){
        try {
            let formData = new FormData();
            formData.append("name", this.name);
            formData.append("description", this.description);
            formData.append("price", this.price);
            formData.append("license", this.license);
            formData.append("developer", this.developer);
            formData.append("platform", this.platform);
            formData.append("tag_id", this.tag_id);
            formData.append("category_id",  this.category_id);
            formData.append("app_icon", this.app_icon);
            formData.append("app_file", this.app_file);
            formData.append("phote_one", this.photo_one);
            formData.append("photo_two", this.photo_two);
            formData.append("photo_three", this.photo_three);
            formData.append("photo_four", this.photo_four);
            let res = await helpers.createProduct(formData);
            console.log(res);
            Swal.fire(
            'Nice!',
            'App Submitted for review, check mail within 48 hours for approval!',
            'success'
            )
            this.name = '';
            this.description = '';
            this.price= "";
            this.license ="",
            this.developer = this.user.name;
            this.platform= "";
            this.tag_id = '';
            this.category_id = '';
            this.app_icon = '';
            this.app_file = '';
            this.phote_one ='';
            this.photo_two = '';
            this.photo_three = '';
            this.photo_four = '';
        } catch (error) {
            console.log(error);
             Swal.fire(
            'Chill!',
            'Something went wrong!',
            'warning'
            )
            this.name = '';
            this.description = '';
            this.price= "";
            this.license ="",
            this.developer = this.user.name;
            this.platform= "";
            this.tag_id = '';
            this.category_id = '';
            this.app_icon = '';
            this.app_file = '';
            this.phote_one ='';
            this.photo_two = '';
            this.photo_three = '';
            this.photo_four = '';
        }
      }
        
    },
    async created(){
        this.getCategories();
        this.getTags();
        this.user = this.$store.getters.getUser
        this.developer = this.user.name;

        
    }
}
</script>
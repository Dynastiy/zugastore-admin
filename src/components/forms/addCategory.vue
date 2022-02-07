<template>
    <transition name="modal">
      
        <div class="modal-mask">
          <div class="modal-wrapper"  id="custom-target">
            <form action="" method="post" @submit.prevent="addResource">
              <fieldset :disabled="loading">
                <div class="modal-container">
                  <div class="loader d-flex justify-content-center align-items-center" v-if="loading" >
                    <!-- <img src="@/assets/img/loader.gif" alt="" width="80" height="80"> -->
                  </div>
                  <div class="modal-header d-flex align-items-center py-1">
                    <slot name="header">
                      <h4 class="text-primary">Submit Category</h4>
                      <button type="button" class="btn btnx btn-lg btn-danger btn-close" @click="close"> x </button>
                    </slot>
                  </div>

                  <div class="modal-body">
                    <slot name="body">
                        <div class="row input-item">
                            <div class="form-group col-xl-4 col-md-6 col-sm-6 input-item">
                              <label for="exampleFormControlInput1">Name</label>
                              <input v-model="formFields.title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="">
                            </div>
                            <div class="col-xl-4 col-md-6 col-sm-6 input-item">
                                <label for="">Status</label>
                                <select v-on:change="changedPrice()" id="mySelect" class="custom-select" v-model="formFields.status">
                                  <option value="1">Free</option>
                                  <option value="2">Paid</option>
                                </select>
                            </div>
                            <div class="form-group col-xl-4 col-md-6 col-sm-6 input-item">
                              <label for="exampleFormControlInput2">Price</label>
                              <input :disabled="disabled" v-model="formFields.price" type="text" class="form-control" id="exampleFormControlInput2" placeholder="$">
                            </div>
                        </div>
                        <div class="form-group mt-1">
                          <label for="exampleFormControlTextarea1">Description</label>
                          <textarea v-model="formFields.description" class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label class="small-text" for="">Click to add PDF</label>
                            <input type="file" name="" id="file" ref="file" v-on:change="handleFileUpload()">
                          </div>
                          <div class="col-md-6">
                            <label class="small-text" for="">Click to add Thumbnail</label>
                            <input type="file" name="" id="file2" ref="file2" v-on:change="handleFileUpload2()">
                          </div>
                        </div>

                    </slot>
                  </div>

                  <div class="modal-footer">
                    <slot name="footer">
                      <!-- <button class="btn-primary modal-default-button" @click="addVideo">
                        Add 
                      </button> -->
                      <input type="submit"  class="btn btn-primary modal-default-button" value="Add">
                    </slot>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </transition>
</template>

<script>
// import AuthService from '@/services/AuthService.js';
// import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    name: 'modal',
    data(){
      return{
        disabled: true,
        success: false,
        loading: false,
        formFields: {
            file: null,
            title: null,
            author: null,
            status: null,
            price: null,
            type: "pdf",
            description: null,
            cover_page: null,
          },
          alert: false
      }
    },
    methods: {
      changedPrice(){
      var priceOptions = document.getElementById("mySelect");
      var selOption = priceOptions.options[priceOptions.selectedIndex].value;
        if ( selOption == "1"){
          this.disabled = true;
          
     }
     else{
       this.disabled = false;
     }
      },
      close() {
        this.$emit('close');
      },
      handleFileUpload(){
      this.formFields.file = this.$refs.file.files[0];
      },
      handleFileUpload2(){
          this.formFields.cover_page = this.$refs.file2.files[0];
        },
     addResource() {
       this.loading = true;
        let formData = new FormData();
        formData.append("file", this.formFields.file);
        formData.append("title", this.formFields.title);
        formData.append("author", this.formFields.description);
        formData.append("status", this.formFields.status);
        formData.append("price", this.formFields.price);
        formData.append("type", this.formFields.type);
        formData.append("description", this.formFields.description);
        formData.append("cover_page", this.formFields.cover_page);
        axios.post('https://api.fxhup.com/project/resource/create', formData)
                .then((response) => {
                    console.log(response);
                      this.alert = true;
                      this.formFields.file = '';
                      this.formFields.title = '';
                      this.formFields.description = '';
                      this.formFields.status = '';
                      this.formFields.price = '';
                      this.formFields.type = '';
                      this.formFields.description = '';
                      this.formFields.cover_page = '';
                //  Swal.fire({
                //                 text: 'Resource Added Successfully',
                //                 icon: 'success',
                //                 target: '#custom-target',
                //                 customClass: {
                //                   container: 'position-absolute'
                //                 },
                //                 toast: true,
                //                 position: 'top-center'
                //               })
                      this.$router.go();
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                   
        });
        
      }
    },
}
</script>

<style scoped>
    .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 30%;
  margin: 0px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  background:#fff;
  transition: all 0.3s ease;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-header{
  padding: 0 !important;
  align-content: center;
}
.modal-default-button {
  /* float: right; */
  width: 100%;
  border: none;
  border-radius: 0.3rem;
  padding: 0.3rem 0;
}
input[type=text], select{
    width: 100%;
    height: 1.8rem;
    padding: 5px 5px !important;
}
input[type=file]{
    /* background: #fff; */
    font-size: 0.6rem;
}
textarea {
    width: 100%;
}
label{
  font-size: 0.7rem;
}
.btnx {
    border-radius: 50%;
    font-size: 1rem;
    font-weight: bold;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.loader{  /* Loader Div Class */
    position: absolute;
    top:0px;
    right:0px;
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.5);
    background-size: 50px;
    background-repeat:no-repeat;
    background-position:center;
    z-index:10000000;
    /* opacity: 0.4; */
    filter: alpha(opacity=40);
}
@media screen and (max-width: 425px){
    .modal-container{
        width: 80% !important;
    }
}
</style>
<template>
  <div>
    <div class="mb-5">
      <div class="d-flex justify-content-between mb-4">
        <h5 class="font-weight-bold">Tags</h5>
        <div class="text-dark font-weight-bold">
          <button
            class="bg-light-all small add__button rounded-pill"
            @click="addTagModal = !addTagModal"
          >
            Add Tag <i class="fa fa-plus-circle ml-2" aria-hidden="true"></i>
          </button>
          <!-- Modal -->
          <div class="addTagModal" v-show="addTagModal">
             <div class="tag__modal shadow-sm">
                  <div class="mb-3">
                    <label for=""> Tag Name </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Tag Name"
                      v-model="tag_name"
                    />
                  </div>
                <div v-if="loading2">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div v-else>
                  <button
                  type="button"
                  class="btn btn-secondary mr-3"
                  @click="addTagModal = !addTagModal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn bg-light-all"
                    @click="addTag"
                  >
                    Add
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="tags">
        <div
          class="shadow-sm p-2 tag__card rounded-lg"
          v-for="tag in tags"
          :key="tag.id"
        >
          <div class="d-flex justify-content-between align-items-center">
            <p class="small m-0">{{ tag.name }}</p>
            <div class="btn-group dropleft ml-1">
              <button
                type="button"
                class="more__icon"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <ion-icon name="more"></ion-icon>
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" @click="editTagModal2(tag)">Edit</a>
                <a class="dropdown-item" @click="deleteTag(tag)">Delete</a>
              </div>
               <div class="addTagModal" v-show="editTagModal">
             <div class="tag__modal shadow-sm">
                  <div class="mb-3">
                    <label for="">New Tag Name </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter new Tag Name"
                      v-model="new_tag_name"
                    />
                  </div>
                <div v-if="loading2">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div v-else>
                  <button
                  type="button"
                  class="btn btn-secondary mr-3"
                  @click="editTagModal = !editTagModal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn bg-light-all"
                    @click="editTag"
                  >
                    Edit
                  </button>
                </div>
              </div>
          </div>
           
            </div>
          </div>
          <p class="text-dark font-weight-bold rounded-circle m-0">
            {{ tag.products_count }} <span class="small">Apps</span>
          </p>
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex justify-content-between mb-4">
        <h5 class="font-weight-bold">Categories</h5>
        <div class="text-dark font-weight-bold">
          <button
            class="bg-light-all small add__button rounded-pill"
            @click="addCategoryModal = !addCategoryModal"
          >
            Add Category
            <i class="fa fa-plus-circle ml-2" aria-hidden="true"></i>
          </button>
          <!-- Modal -->
          <div class="addCategoryModal" v-show="addCategoryModal">
             <div class="modal-main shadow-sm">
                  <div>
                    <label for=""> Category Name </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Category Name"
                      v-model="category_name"
                    />
                  </div>
                  <div class="mt-3 mb-3">
                    <label for="">Category icon</label> <br>
                    <input
                      type="file"
                      name=""
                      id="file"
                      ref="file"
                      accept="image/*"
                      @change="handleFileUpload()"
                    />
                  </div>
                <div v-if="loading">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div v-else>
                  <button
                  type="button"
                  class="btn btn-secondary mr-3"
                  @click="addCategoryModal = !addCategoryModal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn bg-light-all"
                    @click="addCategory"
                  >
                    Add
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="categories">
        <div
          class="shadow-sm category__card rounded-lg p-1"
          v-for="category in categories"
          :key="category.id"
        >
          <div class="d-flex align-items-center" style="gap: 10px">
            <div class="bg-white category__img">
              <img
                :src="'https://api.africanapp.store/' + category.icon_image"
                alt=""
                width="25"
                class="mr-2"
              />
            </div>
            <div>
              <p class="small m-0">{{ category.category_name }}</p>
              <h6
            class="mt-1 font-weight-bold text-dark rounded-circle m-0"
            >{{ category.products_count }} <span class="small">Apps</span> </h6
          >
            </div>
          </div>
          <div class="btn-group dropleft ml-1">
              <button
                type="button"
                class="more__icon"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <ion-icon name="more"></ion-icon>
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" @click="editCategoryModal2(category)">Edit</a>
                <a class="dropdown-item" @click="deleteCategory(category)">Delete</a>
              </div>
              <!-- Edit category Modal  -->
              <div class="addTagModal" v-show="editCategoryModal">
               <div class="tag__modal shadow-sm">
                  <div>
                    <label for="">New Category Name </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Category Name"
                      v-model="new_category_name"
                    />
                  </div>
                  <div class="mt-3 mb-3">
                    <label for="">New Category icon</label> <br>
                    <input
                      type="file"
                      name=""
                      id="file2"
                      accept="image/*"
                      @change="handleFileUpload2($event)"
                    />
                  </div>
                <div v-if="loading2">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div v-else>
                  <button
                  type="button"
                  class="btn btn-secondary mr-3"
                  @click="editCategoryModal = !editCategoryModal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn bg-light-all"
                    @click="editCategory"
                  >
                    Edit
                  </button>
                </div>
              </div>
          </div>
              <!-- Edit category modal Ends  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from "@/helpers/index.js";
import axios from "axios";
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      addCategoryModal: false,
      addTagModal: false,
      categories: [],
      tags: [],
      loading: false,
      loading2: false,
      editTagModal: false,
      editCategoryModal: false,
      tag_id: '',
      new_tag_name: "",
      new_category_name: '',
      new_icon_image: null,
      tag_name: "",
      category_name: "",
      icon_image: null,
      baseUrl: "https://api.africanapp.store/api/",
    };
  },
  methods: {
    handleFileUpload() {
      this.icon_image = this.$refs.file.files[0];
      console.log(this.icon_image);
    },
    handleFileUpload2() {
      var input = event.target;
        this.new_icon_image = input.files[0];
      console.log(this.new_icon_image);
    },
    async getCategories() {
      try {
        const res = await helpers.getIndex();
        console.log(res);
        this.categories = res.categories.data;
        this.tags = res.tags.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addTag() {
      this.loading2 = true
      try {
        let formData = new FormData();
          formData.append("name", this.tag_name);
        const response = await axios.post(
          `${this.baseUrl}admin/create-tag`,
          formData
        );
        console.log(response);
        Swal.fire(
          'Nice!',
          'New Tag Added!',
          'success'
        )
        this.tag_name = "";
        this.getCategories();
      } catch (error) {
        console.log(error);
        Swal.fire(
          'Something went wrong!',
          'Category not added!',
          'warning'
        )
        this.tag_name = "";
        this.icon_image = null;
      }
      this.loading2 = false
      this.addTagModal = false
    },
    deleteTag(tag){
      axios.post(`${this.baseUrl}admin/delete-tag/${tag.id}`)
                .then((response) => {
                    console.log(response);
                   this.getCategories();
                   Swal.fire(
          'Success!',
          'Tag Deleted!',
          'success'
        )
                });
    },
    async editTagModal2(tag){
      this.tag_id = tag.id;
      let res = await  axios.get(`${this.baseUrl}find-tag/${tag.id}`);
      console.log(res.data.tag);
      this.new_tag_name = res.data.tag.name
      console.log(this.tag_id);
      this.editTagModal = !this.editTagModal
    },
    editTag(){
      let payload = {name: this.new_tag_name}
      axios.post(`${this.baseUrl}admin/edit-tag/${this.tag_id}`, payload)
                .then((response) => {
                    console.log(response);
                   this.getCategories();
                   this.new_tag_name = '';
                   Swal.fire(
          'Success!',
          'Tag Updated!',
          'success'
        )
                });
                this.editTagModal = !this.editTagModal
    },
    async addCategory() {
      this.loading = true
      try {
        let formData = new FormData();
          formData.append("category_name", this.category_name);
          formData.append("icon_image", this.icon_image);
        const response = await axios.post(
          `${this.baseUrl}admin/create-category`,
          formData
        );
        console.log(response);
        Swal.fire(
          'Nice!',
          'New Category Added!',
          'success'
        )
        this.category_name = "";
        this.icon_image = null;
        this.getCategories();
      } catch (error) {
        console.log(error);
        Swal.fire(
          'Something went wrong!',
          'Category not added!',
          'warning'
        )
        this.category_name = "";
        this.icon_image = null;
      }
      this.loading = false
      this.addCategoryModal = false
    },
    deleteCategory(category){
      axios.post(`${this.baseUrl}admin/delete-category/${category.id}`)
                .then((response) => {
                    console.log(response);
                   this.getCategories();
                   Swal.fire(
          'Success!',
          'Category Deleted!',
          'success'
        )
                });
    },
    async editCategoryModal2(category){
      this.category_id = category.id
      let res = await  axios.get(`${this.baseUrl}find-category/${category.id}`);
      // console.log(res.data.category);
      this.new_category_name = res.data.category.category_name
      // console.log(this.category_id);
      this.editCategoryModal = !this.editCategoryModal
    },
    editCategory(){
      let formData = new FormData();
          formData.append("category_name", this.new_category_name);
          formData.append("icon_image", this.new_icon_image);
      axios.post(`${this.baseUrl}admin/edit-category/${this.category_id}`, formData)
                .then((response) => {
                  console.log(response);
                   this.new_category_name = '';
                   this.new_icon_image = null;
                    this.getCategories();
                    this.editCategoryModal = !this.editCategoryModal;
                   Swal.fire(
          'Success!',
          'Category Updated!',
          'success'
        )
                });
                
               
    },
  },
  created() {
    this.getCategories();
  },
};
</script>


<style scoped>
:root {
    --primary-color: #a67b3e;
    --secondary-color: #a3783d ;
    --tertiary-color: #d2b681;
    --light-color: #d2b68175;
    --accent-color: #fae4ba25;
    --light: #fff;
    --dark: #000;
}
.addCategoryModal {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addCategoryModal .modal-main {
  background: var(--light);
  padding: 2rem;
}
.addTagModal{
position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.addTagModal .tag__modal{
  background: var(--light);
  padding: 2rem;
}

</style>

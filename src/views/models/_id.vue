<template>
  <div>
    <main class="container product__page">
      <!-- Left Column / Headphones Image -->
      <div class="left-column">
       <section class="gallery text-center">
        <div class="gallery__item">
          <input type="radio" id="img-1" checked name="gallery" class="gallery__selector d-flex justify-content-center"/>
          <img class="gallery__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.app_icon" alt=""/>
          <label for="img-1" class="gallery__thumb"><img class="thumb__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.app_icon" alt=""/></label>
        </div>
        <div class="gallery__item">
          <input type="radio" id="img-2" checked name="gallery" class="gallery__selector d-flex"/>
          <img class="gallery__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.photo_one" alt=""/>
          <label for="img-2" class="gallery__thumb"><img class="thumb__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.photo_one" alt=""/></label>
        </div>
        <div class="gallery__item">
          <input type="radio" id="img-3" checked name="gallery" class="gallery__selector"/>
          <img class="gallery__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.photo_two" alt=""/>
          <label for="img-3" class="gallery__thumb"><img class="thumb__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.photo_two" alt=""/></label>
        </div>
        <div class="gallery__item">
          <input type="radio" id="img-4" checked name="gallery" class="gallery__selector"/>
          <img class="gallery__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.photo_three" alt=""/>
          <label for="img-4" class="gallery__thumb"><img class="thumb__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.photo_three" alt=""/></label>
        </div>
        <div class="gallery__item">
          <input type="radio" id="img-5" checked name="gallery" class="gallery__selector"/>
          <img class="gallery__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.photo_four" alt=""/>
          <label for="img-5" class="gallery__thumb"><img class="thumb__img" :src="'https://api.africanapp.store/softwares/photos/'+product_details.photo_four" alt=""/></label>
        </div>
      </section>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Product Description -->
        <div class="product-description">
          <h1 class="text-capitalize"> {{product_details.name}} </h1>
          <p>
            {{ product_details.description }}
          </p>
          <div>
            <span class="product__file__size">File Size:  {{ product_details.file_size }} </span>
            <div class="cable-choose">
                <button>Download File</button>
              </div>
          </div>
        </div>

        <!-- Product Configuration -->
        <div class="product-configuration">
          <!-- Product Color -->
          <div class="d-flex align-items-center" style="gap:8px" v-if="product_details.status === 'approved' ">
            <div class="status__pointer bg-success rounded-circle"></div>
            <span class="small">Approved</span>
          </div>
          <div class="d-flex align-items-center" style="gap:8px" v-else-if="product_details.status === 'pending' ">
            <div class="status__pointer bg-warning rounded-circle"></div>
            <span class="small">Pending</span>
          </div>
          <div class="d-flex align-items-center" style="gap:8px" v-else>
            <div class="status__pointer bg-danger rounded-circle"></div>
            <span class="small">Declined</span>
          </div>

          <!-- Cable Configuration -->
          <div class="cable-config mt-3 d-flex">
            <div class="">
              <span class="small">Category</span>

              <div class="cable-choose" v-if="product_details.category">
                <button> {{ product_details.category.category_name }} </button>
              </div>
            </div>
            <div>
              <span class="small">Tag</span>

              <div class="cable-choose" v-if="product_details.tag">
                <button> {{product_details.tag.name  }}  </button>
              </div>
              <div class="cable-choose" v-else>
                <button> No tag for this App  </button>
              </div>
            </div>
          </div>
          
        </div>

        <!-- Product Pricing -->
        <div class="product-price">
          <span v-if="product_details.license === 'paid' "> ${{ product_details.price }} </span>
          <span v-else>FREE</span>
          <a  class="cart-btn btn-success" @click="approve(product_details)" v-show="product_details.status === 'pending' ">Approve</a>
          <a  class="cart-btn btn-danger"  @click="decline(product_details)" v-show="product_details.status === 'pending' ">Decline</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import helpers from '@/helpers/index.js'
import axios from  'axios';
import Swal from 'sweetalert2'
export default {
  data(){
    return{
      id: this.$route.params.id,
      product_details: {},
      baseUrl: 'https://api.africanapp.store/api/'
    }
  },
  methods: {
    async getProductDetails(){
      let res = await helpers.getProductDetails(this.id);
      this.product_details = res.product
      console.log(res.product);
    },
    approve(product_details) {
        try {
          let payload = { status: "approved"};
        axios.post(`${this.baseUrl}admin/update-product/${product_details.id}`, payload)
                .then((response) => {
                    console.log(response);
                   this.getProductDetails();
                   let msg = response.data.message;
                   Swal.fire(
                    'Done!',
                    msg,
                    'success'
                  )
                });
        } catch (error) {
          console.log(error.response);
        }
      },
      decline(product_details) {
       try {
         let payload = { status: "declined"};
        axios.post(`${this.baseUrl}admin/update-product/${product_details.id}`, payload)
                .then((response) => {
                    let msg = response.data.message;
                   Swal.fire(
                    'Done!',
                    msg,
                    'success'
                  )
                   this.getProductDetails();
                });
       } catch (error) {
         console.log(error.response);
       }
      },
  },
  async created(){
    this.getProductDetails();
  }
}
</script>

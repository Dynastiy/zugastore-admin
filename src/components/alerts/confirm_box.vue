<template>
  <div>
    <div class="confirm-box">
      <div class="confirm-box-container">
        <div class="d-flex justify-content-between " style="gap:10px">
            <h4 class="font-weight-bold mb-4"><slot></slot></h4>
            <ion-icon @click="close" name="close"></ion-icon>
        </div>
        <div class="d-flex" style="gap: 10px">
          <button @click="deleteApp" class="btn btn-danger">Continue</button>
          <button @click="close" class="btn btn-success">Go Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  padding: 0.2rem 1rem;
  font-size: 0.8rem;
  border-radius: 2px;
}
.confirm-box {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-box-container {
  width: 30%;
  background: #fff;
  padding: 2rem;
  border-radius: 5px;
}
ion-icon {
    font-size: 24px;
    color: red;
}
</style>

<script>
export default {
    data(){
        return {
            // confirm: false,
        }
    },
  methods: {
    close() {
      this.$emit("close");
    },
    deleteApp(){
        this.$emit("deleteApp")
    }
  },
};
</script>
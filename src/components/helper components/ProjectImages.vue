<template>
  <div>
    <vue-upload-multiple-image
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      :data-images="images"
      idUpload="myIdUpload"
      editUpload="myIdEdit"
      dragText="Upload"
      browseText=""
      primaryText=""
      markIsPrimaryText=""
      popupText=""
    ></vue-upload-multiple-image>
  </div>
</template>

<script>
import VueUploadMultipleImage from "vue-upload-multiple-image";
export default {
  name: "app",
  data() {
    return {
      images: [],
    };
  },
  components: {
    VueUploadMultipleImage,
  },
  methods: {
    uploadImageSuccess(formData, index, fileList) {
      // eslint-disable-next-line no-console
      console.log("data", formData, index, fileList);
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove(index, done, fileList) {
      // eslint-disable-next-line no-console
      console.log("index", index, fileList);
      var r = confirm("remove image");
      if (r == true) {
        done();
      } else {
        // eslint-disable-next-line no-console
      }
    },
    editImage(formData, index, fileList) {
      // eslint-disable-next-line no-console
      console.log("edit data", formData, index, fileList);
    },
  },
};
</script>

<style scoped></style>

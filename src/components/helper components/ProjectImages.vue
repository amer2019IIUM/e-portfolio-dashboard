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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {
      images: [],
      fileList: [],
    };
  },
  components: {
    VueUploadMultipleImage,
  },
  computed: {
    ...mapGetters({
      projectPhotosData: "Attachment/projectPhotos",
    }),
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      // eslint-disable-next-line
      console.log(this.projectPhotosData);
      this.fileList = this.projectPhotosData;
    },
    // eslint-disable-next-line
    uploadImageSuccess(formData, index, fileList) {
      // eslint-disable-next-line no-console
      this.projectPhotos(fileList);
    },
    beforeRemove(index, done, fileList) {
      // eslint-disable-next-line no-console
      console.log("index", index, fileList);
      var r = confirm("remove image");
      if (r == true) {
        this.projectPhotos(fileList);
        done();
      } else {
        // eslint-disable-next-line no-console
      }
    },
    editImage(formData, index, fileList) {
      this.projectPhotos(fileList);
    },
    ...mapActions({
      projectPhotos: "Attachment/getProjectPhotos",
    }),
  },
};
</script>

<style scoped></style>

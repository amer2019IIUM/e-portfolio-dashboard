<template>
  <div>
    <div class="text-xs-center">
      <div>
        <image-uploader
          :preview="false"
          :className="['fileinput', { 'fileinput--loaded': hasImage }]"
          capture="environment"
          :debug="1"
          doNotResize="gif"
          :autoRotate="true"
          outputFormat="verbose"
          @input="setImage"
        >
          <label for="fileInput" slot="upload-label">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <path
                  class="path1"
                  d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                ></path>
              </svg>
            </figure>
            <v-badge>
              {{ hasImage ? "Replace" : "Click to upload your photo" }}
            </v-badge>
          </label>
        </image-uploader>
        <v-btn
          class="primaryBackgroundColor"
          v-if="hasImage"
          @click="submitImage"
        >
          Confirm
        </v-btn>
        >
      </div>
    </div>
  </div>
</template>

<script>
import ImageUploader from "vue-image-upload-resize";
export default {
  components: {
    ImageUploader,
  },
  data() {
    return {
      hasImage: false,
      image: null,
    };
  },
  methods: {
    setImage: function(file) {
      this.hasImage = true;
      this.image = file;
      // eslint-disable-next-line no-console
      console.log(this.image);
    },
    submitImage() {
      if (this.image != null) {
        let photo = [];

        let photoOb = {
          file_name: this.image.info.name,
          type: "PHOTO",
          thumbnail: true,
          path: this.image.dataUrl,
        };
        photo.push(photoOb);
        // eslint-disable-next-line no-console
        console.log(photo);
        this.$emit("uploadProfile", photo);
      }
    },
  },
};
</script>

<style scoped></style>

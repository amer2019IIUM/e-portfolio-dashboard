<template>
  <div>
    <div class="text-xs-center">
      <v-card>
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
              <v-card>
                <v-card-text v-if="hasImage" class="py-2 text-center">
                  Replace
                </v-card-text>
                <v-card-text v-if="hasImage == false" class="py-2  text-center">
                  Click to upload your profile image
                </v-card-text>
              </v-card>
            </label>
          </image-uploader>
        </div>
      </v-card>
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

      let photoOb = {
        file_name: this.image.info.name,
        type: "PHOTO",
        thumbnail: true,
        path: this.image.dataUrl,
      };
      // eslint-disable-next-line no-console
      this.$emit("uploadProfile", photoOb);
      // eslint-disable-next-line no-console
      console.log(this.image);
    },
  },
};
</script>

<style>
#fileInput {
  /* font-size: 0px; */
}
</style>

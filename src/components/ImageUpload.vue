<template>
  <div>
    <h1>Upload your photo profile</h1>
    <br /><br />
    <picture-input
      ref="pictureInput"
      @change="onChange"
      width="150"
      height="150"
      margin="16"
      accept="image/jpeg,image/png"
      size="10"
      :removable="true"
      :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag Or Click to upload',
      }"
    >
    </picture-input>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import { mapActions } from "vuex";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    PictureInput,
  },
  methods: {
    ...mapActions({
      profilePhoto: "Attachment/getProfilephoto",
    }),
    onChange() {
      // eslint-disable-next-line no-console
      console.log("New picture selected!");
      if (this.$refs.pictureInput.image) {
        this.profilePhoto(this.$refs.pictureInput.image);
        // eslint-disable-next-line no-console
        console.log(this.$refs.pictureInput.image);
      } else {
        // eslint-disable-next-line no-console
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

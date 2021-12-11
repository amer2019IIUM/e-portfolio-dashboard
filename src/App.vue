<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.primaryBackgroundColor {
  background-color: teal !important;
}
.step-progress .bar {
  background-color: teal !important;
}
.tabStatus {
  background-color: teal !important;
}
.primaryColor {
  color: teal !important;
}
.step-pills {
  margin-bottom: 10px !important;
}
.step-pills .step-item.active {
  border: 1px solid teal !important;
}
</style>

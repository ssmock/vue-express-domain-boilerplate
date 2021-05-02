<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <RemoteResourceDemo />
    <MarkdownDemo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RemoteResourceDemo from "./components/RemoteResourceDemo.vue";
import MarkdownDemo from "./components/MarkdownDemo.vue";

export default defineComponent({
  name: "App",
  components: {
    RemoteResourceDemo,
    MarkdownDemo
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

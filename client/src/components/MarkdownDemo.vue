<template>
  <div>
    <div>
      <DebouncedText v-model="markdown" />
    </div>
    <div>
      <MarkdownRender :src="markdown" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DebouncedText from "./DebouncedText.vue";
import MarkdownRender from "./MarkdownRender.vue";

/**
 * Shows how to accept and render markdown.
 */
export default defineComponent({
  name: "MarkdownDemo",
  components: { DebouncedText, MarkdownRender },
  data() {
    return { markdown: "# It works" };
  },
});
</script>

<style>
</style>

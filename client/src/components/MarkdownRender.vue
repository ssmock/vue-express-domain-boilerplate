<template>
    <div v-html="compiledMarkdown"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import marked from "marked";

// From https://vuejs.org/v2/examples/

/**
 * Compiles the given source, and renders it as HTML.
 */
export default defineComponent({
  name: "MarkdownRender",
  props: ["src"],
  data() {
    return { };
  },
  computed: {
    compiledMarkdown(): string {
      const { src } = this.$props;

      return marked(src as string);
    }
  }
})
</script>

<style>
</style>

<template>
    <textarea :value="modelValue" @input="update"></textarea>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash"

// From https://vuejs.org/v2/examples/

/**
 * Wraps a text area with debounced model updates; useful
 * for markdown.
 */
export default defineComponent({
  name: "DebouncedText",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {};
  },
  methods: {
    update: _.debounce(function(e: Event) {
      // @ts-ignore line
      this.mdSrc = e.target.value;

      // @ts-ignore line
      this.$emit("update:modelValue",  e.target.value);
    }, 300)
  }
})
</script>

<style>
</style>

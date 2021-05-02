<template>
  <!-- Note: This isn't strictly valid -->
  <fieldset style="border: none" :disabled="disabled">
    <slot />
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RemoteResource } from "../types/RemoteResource";

/**
 * Disables wrapped elements when the given resource is in flight.
 */
export default defineComponent({
  name: "RemoteLock",
  props: ["resource"],
  data() {
    return { };
  },
  computed: {
    disabled(): boolean {
      return (this.resource as RemoteResource<any>).pending;
    }
  }
})
</script>

<style>
</style>

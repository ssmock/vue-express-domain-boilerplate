<template>
  <!-- Note: This isn't strictly valid -->
  <fieldset style="border: none" :disabled="disabled">
    <slot />
  </fieldset>
</template>

<script lang="ts">
import Vue from 'vue'
import { RemoteResource, RemoteResources } from "../types/RemoteResource";

export default Vue.component("RemoteLock", {
  props: ["resource"],
  data() {
    return { };
  },
  computed: {
    disabled() {
      return (this.resource as RemoteResource<any>).pending;
    }
  }
})
</script>

<style>
</style>

<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        client
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
      <div>
        <pre style="text-align: left; max-width: 400px;">{{remote}}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Thing } from "../../domain/Thing";
import { RemoteResource, RemoteResources } from "../types/RemoteResource"

export default Vue.extend({
  data() {
    const remote: RemoteResource<Thing> = RemoteResources.fresh<Thing>();

    return {
      remote
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.remote = RemoteResources.startRequest(this.remote);

        const data = await (this as any).$axios.$get("http://localhost:5000/thing/A") as Thing;

        this.remote = RemoteResources.withData(this.remote, data);
      }
      catch(ex) {
        this.remote = await RemoteResources.withUnknownError(this.remote, ex);
      }
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

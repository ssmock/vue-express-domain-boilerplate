<template>
  <div class="hello">
    <RemoteLock :resource="remote">
      <button @click="fetchSlow">Fetch Slow</button>
    </RemoteLock>
    <div>
      <pre>{{remoteString}}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { Thing } from "../../../domain/Thing";
import { RemoteResource, RemoteResources } from "../types/RemoteResource";
import RemoteLock from "./RemoteLock.vue";

type Demo = {
  a: string;
  thing: Thing;
  remote: RemoteResource<Thing>;
};

/**
 * Shows how to load remote resources, and provide user feedback during
 * and after processing
 */
export default defineComponent({
  components: {
    RemoteLock
  },
  name: "RemoteResourceDemo",
  data() {
    return {
      remote: RemoteResources.fresh(),
    } as Demo;
  },
  created() {
    this.fetchSlow();
  },
  methods: {
    async fetchSlow() {
      try {
        this.remote = RemoteResources.startRequest(this.remote);

        const response = await axios.get<Thing>(
          "http://172.22.53.52:5000/thing/A/slow"
        );

        this.remote = RemoteResources.withData(this.remote, response.data);
      } catch (ex) {
        this.remote = await RemoteResources.withUnknownError(this.remote, ex);
      }
    }
  },
  computed: {
    remoteString(): string | null {
      if(this.remote.data) {
        return JSON.stringify(this.remote.data, null, 2);
      }

      return null;
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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

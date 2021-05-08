<template>
  <ul>
    <pre>Websocket Ready State: {{ websocket.readyState }}</pre>
    <pre>0: Connecting | 1: Connected | 2: Closing | 3: Closed</pre>
    <button @click="tryDialog">Try Ping</button>
    <li v-for="entry in entries" :key="entry.id">
      {{ entry.content }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type Entry = {
  id: string;
  content: string;
};

enum WebsocketEventType {
  Error = "error",
  Open = "open",
  Close = "close",
  Message = "message",
  S = "S"
}

type WebsocketEvent = {
  timestamp: Date;
  type: WebsocketEventType;
  event: Event;
};

type WebSocketDemoModel = {
  entries: Array<Entry>;
  websocket: WebSocket | null;
  websocketEvents: Array<WebsocketEvent>;
};

/**
 * Compiles the given source, and renders it as HTML.
 */
export default defineComponent({
  name: "WebsocketDemo",
  data() {
    return {
      entries: [],
      websocket: null,
      websocketEvents: [],
    } as WebSocketDemoModel;
  },
  computed: {
    canSend(): boolean {
      return this.websocket?.readyState === 1;
    },
  },
  unmounted() {
    if (this.websocket) {
      this.websocket.close();
    }
  },
  created() {
    this.addEntry("Created");

    this.startDialog();
  },
  methods: {
    addEntry(content: string) {
      this.entries.unshift({
        id: this.entries.length.toString(),
        content,
      });
    },
    addStatusEntry(status: string) {
      this.addEntry(`WS status update: ${status}`);
    },
    startDialog() {
      this.websocket = new WebSocket("ws://172.22.53.52:5000");

      this.websocket.readyState;

      this.websocket.addEventListener("open", this.onWebsocketOpen);
      this.websocket.addEventListener("error", this.onWebsocketError);
      this.websocket.addEventListener("close", this.onWebsocketClose);
      this.websocket.addEventListener("message", this.onWebsocketMessage);
    },
    onWebsocketError(ev: Event) {
      this.websocketEvents.push({
        timestamp: new Date(),
        type: WebsocketEventType.Error,
        event: ev,
      });

      this.addStatusEntry("Error; See log for details");
    },
    onWebsocketOpen(ev: Event) {
      this.websocketEvents.push({
        timestamp: new Date(),
        type: WebsocketEventType.Open,
        event: ev,
      });

      this.addStatusEntry("Opened");
    },
    onWebsocketClose(ev: CloseEvent) {
      this.websocketEvents.push({
        timestamp: new Date(),
        type: WebsocketEventType.Close,
        event: ev,
      });

      this.addStatusEntry("Close");
    },
    onWebsocketMessage(ev: MessageEvent) {
      this.websocketEvents.push({
        timestamp: new Date(),
        type: WebsocketEventType.Message,
        event: ev,
      });

      this.addEntry(`Incoming: ${ev.data}`);
    },
    tryDialog() {
      if (this.canSend) {
        const message = new Date().getTime();

        this.addEntry(`Sending message: ${message}`);

        this.websocket?.send(message.toString());
      }
    },
  },
});
</script>

<style>
</style>

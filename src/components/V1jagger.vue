<template>
  <div class="container">
    <div class="row">
      <div class="col tablet-6">
        <j-select
          label="Saved Requests"
          v-model="selectedUrl"
          :options="savedRequestsOptions"
        />
        <j-input
          v-model="req.url"
          label="Request Url"
          placeholder="/some-endpoint"
        />
        <j-select
          v-model="req.method"
          :options="methodOptions"
          label="Request Method"
        />
        <textarea
          v-if="['POST', 'PUT'].includes(req.method)"
          rows="10"
          class="payload"
          placeholder="Paste in JSON formattable text"
          v-model="req.payload"
        ></textarea>
        <button @click="saveRequest">Save Request</button>
        <button @click="doRequest">Do Request</button>
      </div>
      <div class="col tablet-6">
        <h3>Response</h3>
        <div class="response">
          <pre v-if="response">{{response}}</pre>
          <pre v-else-if="error">{{error}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const STORAGE = 'requests'
export default {
  data() {
    return {
      response: null,
      error: null,
      req: {
        url: '',
        method: 'GET',
        payload: ''
      },
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      savedRequests: [],
      selectedUrl: ''
    }
  },
  mounted() {
    this.loadSavedRequests()
  },
  computed: {
    savedRequestsOptions() {
      return this.savedRequests.map(x => x.url)
    }
  },
  watch: {
    selectedUrl: {
      handler(newVal) {
        const selectedReq = this.savedRequests.find(x => x.url === newVal)
        if (selectedReq) {
          this.req.url = selectedReq.url
          this.req.method = selectedReq.method
          this.req.payload = selectedReq.payload
        }
      }
    }
  },
  methods: {
    async doRequest() {
      try {
        const res = await fetch(`http://localhost:5000/api/v1${this.req.url}`, {
          method: this.req.method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: this.req.payload ? JSON.stringify(JSON.parse(this.req.payload)) : ''
        })
        this.response = await res.json()
      } catch (error) {
        this.error = error
      }
    },
    loadSavedRequests() {
      this.savedRequests = JSON.parse(localStorage.getItem(STORAGE)) || []
      if (this.savedRequests.length) {
        this.selectedUrl = this.savedRequests[0].url
      }
    },
    saveRequest() {
      const prevData = JSON.parse(localStorage.getItem(STORAGE)) || []
      if (!prevData.find(x => x.url === this.req.url)) {
        localStorage.setItem(STORAGE, JSON.stringify([...prevData, this.req]))
      }
      this.loadSavedRequests()
    }
  }
}
</script>

<style scoped>
.response {
  height: 300px;
  min-width: 400px;
  border: 1px solid black;
  border-radius: 2px 2px;
}
.payload {
  flex: 1;
  width: 100%;
}
</style>
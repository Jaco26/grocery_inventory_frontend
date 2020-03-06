<template>
  <div>
    <button class="btn btn-link" @click="onDeleteRequest">Delete</button>
    <button class="btn btn-secondary" @click="onSaveCurrentRequest">Save</button>
    <button class="btn btn-primary" @click="onSendRequest">Send</button>
   
    <SelectSavedRequests
      :requests="savedRequestUris"
      :value="selectedReqUri"
      @input="onLoadSavedRequest"
    />
    <br>
    <CurrentRequest v-bind.sync="currentRequest" />

    <div class="response-area">
      <pre v-if="response">{{response}}</pre>
      <pre v-else-if="error">{{error}}</pre>
      <div v-else class="response-area__description">
        You will see response or error content here
      </div>
    </div>

  </div>
</template>

<script>
import SelectSavedRequests from './select-saved-requests'
import CurrentRequest from './current-request'
import caching from '@/util/caching'
const STORAGE = 'storage'
export default {
  components: {
    SelectSavedRequests,
    CurrentRequest
  },
  data() {
    return {
      savedRequests: {},
      selectedReqUri: '',
      currentRequest: {
        uri: '',
        method: 'GET',
        payload: '',
      },
      response: null,
      error: null,
    }
  },
  mounted() {
    this.loadSavedRequestsFromStorage()
  },
  computed: {
    savedRequestUris() {
      return this.savedRequests ? Object.keys(this.savedRequests) : []
    }
  },
  methods: {
    // event handlers
    onLoadSavedRequest(uri) {
      this.selectedReqUri = uri.slice()

      const cached =  this.savedRequests[uri]
      if (cached.uri) {
        this.currentRequest.uri = cached.uri
        this.currentRequest.method = cached.method
        this.currentRequest.payload = JSON.parse(cached.payload)
      }

  
    },
    onSaveCurrentRequest() {
      const current = this.currentRequest
      if (current.uri.trim()) {
        const uri = current.uri.trim()
        const method = current.method.trim()
        const payload = current.payload.trim() ? JSON.stringify(current.payload.trim()) : ''
        const cached = caching.getItem(STORAGE)
        caching.setItem(STORAGE, { 
          ...cached,
          [caching.generateCacheKey(method, uri)]: { uri, method, payload }
        })
   
        this.loadSavedRequestsFromStorage()
      }

    },
    onDeleteRequest() {
      if (this.savedRequests[this.currentRequest.uri]) {
        delete this.savedRequests[this.currentRequest.uri]
      }
      this.resetCurrentRequest()
    },
    onSaveRequest() {

    },
    onSendRequest() {

    },

    // other
    loadSavedRequestsFromStorage() {
      this.savedRequests = JSON.parse(localStorage.getItem(STORAGE))
    },
    resetCurrentRequest() {
      this.currentRequest = Object.assign({}, {
        uri: '',
        method: 'GET',
        payload: ''
      })
    }
  }
}
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 2px;
  height: 40px;
  min-width: 90px;
  font: inherit;
  cursor: pointer;
  margin: .25rem;
  padding: .5rem;
}
.btn.btn-primary {
  background: #57c;
  color: whitesmoke;
}
.btn.btn-secondary {
  background: #ddd;
}
.btn.btn-link {
  background: transparent;
  color: blue;
}
.response-area {
  min-height: 300px; 
  border: 1px solid gray;
  border-radius: 4px;
  margin-top: 20px;
  background: #ddd;
}
.response-area.success {
  background: #dfd;
}
.response-area.success {
  background: #fdd;
}
.response-area__description {
  text-align: center;
  padding-top: 4rem;
  color: #555;
}
</style>
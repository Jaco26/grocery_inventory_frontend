<template>
  <div>
    
    <JSelect label="Requests" :options="requestOptions" :value="selectedRequestKey" @input="setSelected" />
    
    <div class="req-preview">
      <pre> {{selectedRequest}} </pre>
    </div>

    <button class="btn btn-primary" @click="onSendRequest">Send</button>

    <div class="response-area" :class="responseStatusClass">
      <pre v-if="response">{{response}}</pre>
      <pre v-else-if="error">{{error}}</pre>
      <div v-else class="response-area__description">
        You will see response or error content here
      </div>
    </div>
  </div>
</template>

<script>
import requestList from '@/util/mocks/requests'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODM0NjI0MzcsIm5iZiI6MTU4MzQ2MjQzNywianRpIjoiM2MxNzIxODMtY2M0Mi00ZWY3LTk2Y2YtZmJhNDM4NDJiZGVlIiwiaWRlbnRpdHkiOiJkMTQ4MDA4My1lOTdiLTRlNzYtOGE4Ni0yOTVkZWM0ZWE1MDMiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.uXz7wdPUcWddn8cVtH5CuzMAy6ZQX9_fWkSNiEk6yvI'
export default {
  data() {
    return {
      response: null,
      error: null,
      selectedRequestKey: '',
      selectedRequest: {},
    }
  },
  computed: {
    requests() {
      return requestList.reduce((acc, req) => {
        acc[`${req.uri} ${req.method}`] = { ...req }
        return acc
      }, {})
    },
    requestOptions() {
      return requestList.map(req => `${req.uri} ${req.method}`)
    },
    responseStatusClass() {
      if (this.response) return 'success'
      else if (this.error) return 'error'
      else return ''
    }
  },
  methods: {
    setSelected(val) {
      this.selectedRequestKey = val
      Object.keys(this.requests[val]).forEach(key => {
        this.selectedRequest[key] = this.requests[val][key]
      })
    },
    async onSendRequest() {
      try {
        const { uri, method, body } = this.selectedRequest
        const options = {
          method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        if (['POST', 'PUT'].includes(method)) {
          options.body = JSON.stringify(body)
        }
        const res = await fetch(`http://localhost:5000/api/v1${uri}`, options)
        this.response = await res.json()
      } catch (error) {
        this.error = error
      }
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
.response-area {
  min-height: 300px; 
  border: 1px solid gray;
  border-radius: 4px;
  margin-top: 20px;
  background: #ddd;
  overflow: scroll;
}
.response-area.success {
  background: #dfd;
}
.response-area.error {
  background: #fdd;
}
.response-area__description {
  text-align: center;
  padding-top: 4rem;
  color: #555;
}
</style>
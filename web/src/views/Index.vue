<template>
  <div class="text-center text-lg-start mt-4 pt-2">
    <button type="button" class="btn btn-primary btn-lg" v-bind:class="{ disabled: name == 'Calling...' }" style="padding-left: 2.5rem; padding-right: 2.5rem" @click="onBtnGreeting">{{ name }}</button>
  </div>
</template>

<script>
import { Fluence } from '@fluencelabs/fluence'
import { krasnodar } from '@fluencelabs/fluence-network-environment'
import { greeting } from '../_aqua/greeting'
import { CONFIG } from '../config'

export default {
  data() {
    return {
      name: 'Greeting',
    }
  },

  methods: {
    async onBtnGreeting() {
      let did = window.did
      console.log('did:', did)
      if (did == undefined) {
        alert('You are not authicated')
        return
      }

      // already calling return
      if (this.name == 'Calling...') {
        return
      }
      this.name = 'Calling...'
      try {
        await Fluence.start({ connectTo: krasnodar[0] })
        console.log('peerId', Fluence.getStatus().peerId)
      } catch (err) {
        console.log('Peer initialization failed', err)
      }
      try {
        let authService = { node_id: CONFIG.AuthService.node_id, service_id: CONFIG.AuthService.service_id }
        let greetingService = { node_id: CONFIG.GreetingService.node_id, service_id: CONFIG.GreetingService.service_id }
        let ret = await greeting(did, [authService, greetingService])
        alert(ret)
      } catch (err) {
        console.log('call service failed', err)
      }

      this.name = 'Greeting'
    },
  },

  created() {},
}
</script>

<style></style>

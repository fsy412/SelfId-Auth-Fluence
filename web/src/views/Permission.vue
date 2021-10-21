<template>
  <div class="d-flex align-items-center flex-column bd-highlight mb-3">
    <div class="mb-auto p-2 bd-highlight">
      <button class="btn btn-primary" type="button" disabled v-if="authticating">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Authticating...
      </button>
      <button class="btn btn-primary" v-if="showAuthticate" @click="onAuth">SelfId Authticate</button>
    </div>
    <div class="p-2 bd-highlight" style="width: 60%">
      <table class="table mt-4" v-show="!isLoading">
        <thead class="thead-dark">
          <tr>
            <th style="width: 80%">DID</th>
            <th style="width: 20%">Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="did in users" v-bind:key="did">
            <td>{{ did }}</td>
            <td><button type="button" class="btn btn-primary" @click="onRemove(did)">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-2 bd-highlight" v-show="isLoading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Fluence } from '@fluencelabs/fluence'
import { krasnodar } from '@fluencelabs/fluence-network-environment'
import { get_permission_list, add_permission, remove_permission } from '../_aqua/auth'
import { EthereumAuthProvider, SelfID } from '@self.id/web'
import { CONFIG } from '../config'

export default {
  data() {
    return {
      users: [],
      did: '',
      showAuthticate: true,
      authticating: false,
      isLoading: true,
    }
  },
  methods: {
    async onAddPermission() {
      let res = await add_permission(this.did, CONFIG.AuthService.node_id, CONFIG.AuthService.service_id)
      console.log(res)
      this.users.push(res)
    },
    async onRemove(did) {
      let res = await remove_permission(did, CONFIG.AuthService.node_id, CONFIG.AuthService.service_id)
      console.log(res)
      this.users.splice(this.users.indexOf(did), 1)
      if (did == window.did) {
        this.$store.commit('setDid', '')
      }
    },
    async onAuth() {
      // check if already authticated
      if (this.users.indexOf(window.did) != -1) {
        return
      }

      this.authticating = true
      this.showAuthticate = false

      // The following assumes there is an injected `window.ethereum` provider
      const addresses = await window.ethereum.enable()
      // The following configuration assumes your local node is connected to the Clay testnet
      const self = await SelfID.authenticate({
        authProvider: new EthereumAuthProvider(window.ethereum, addresses[0]),
        ceramic: CONFIG.ceramicURL,
        connectNetwork: 'testnet-clay',
      })
      this.selfid = self.id
      this.authticating = false
      window.did = self.id
      this.showAuthticate = true

      let res = await add_permission(self.id, CONFIG.AuthService.node_id, CONFIG.AuthService.service_id)

      this.users.push(self.id)
      this.$store.commit('setDid', self.id)
    },
    async init() {},
  },

  async created() {
    try {
      await Fluence.start({ connectTo: krasnodar[0] })
      console.log('peerId', Fluence.getStatus().peerId)
    } catch (err) {
      console.log('Peer initialization failed', err)
      alert(err)
    }

    if (window.did != undefined) {
      try {
        let res = await get_permission_list(CONFIG.AuthService.node_id, CONFIG.AuthService.service_id)
        this.users = res.dids
      } catch (err) {
        console.log('call service failed', err)
        alert(err)
      }
    }

    this.isLoading = false
  },
}
</script>

<style></style>

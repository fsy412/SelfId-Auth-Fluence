import { createStore } from "vuex"
import { initSelfID } from "../selfId/index"
export default createStore({
    state: {
        did: "",
        self: null
    },
    mutations: {
        setDid(state, did) {
            state.did = did
        }
    },
    actions: {
        async getDid(state, did) {
            self = await initSelfID()
            state.commit('setDid', self.id)
        }
    },
    getters: {
        getDid(state) {
            return state.did
        }
    }
})
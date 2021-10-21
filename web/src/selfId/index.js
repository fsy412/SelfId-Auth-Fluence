
import { EthereumAuthProvider, SelfID } from '@self.id/web'
import { CONFIG } from "../config"

export async function initSelfID() {
    const addresses = await window.ethereum.enable()

    // The following configuration assumes your local node is connected to the Clay testnet
    const self = await SelfID.authenticate({
        authProvider: new EthereumAuthProvider(window.ethereum, addresses[0]),
        ceramic: CONFIG.ceramicURL,
        connectNetwork: 'testnet-clay',
    })

    return self
}
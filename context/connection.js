import { 
    getAccount,
    getFactory,
    getRouter,
    getNetwork,
    getWeth, 
} from "@/utils/ethereumFunctions";

import * as chains from "@/constants/chains"
import COINS from "@/constants/coins";
import { ethers } from "ethers";
import { useData } from "@/context/DataContext"

async function setupConnection() {
    const { setNetwork } = useData()
    let network = {}
    network.provider = null
    network.signer = null
    network.account = null
    network.coins = []
    network.chainID = null
    network.router = null
    network.factory = null
    network.weth = null
    try {
        console.log('lets go!');
        network.provider = new ethers.providers.Web3Provider(window.ethereum);
        network.signer = await network.provider.getSigner();
        await getAccount().then(async (result) => {
        network.account = result;
        });

        await getNetwork(network.provider).then(async (chainId) => {
        // Set chainID
        network.chainID = chainId;
        if (chains.networks.includes(chainId)) {
            // Get the router using the chainID
            network.router = await getRouter(
            chains.routerAddress.get(chainId),
            network.signer
            );
            // Get default coins for network
            network.coins = COINS.get(chainId);
            // Get Weth address from router
            await network.router.WETH().then((wethAddress) => {
            network.weth = getWeth(wethAddress, network.signer);
            // Set the value of the weth address in the default coins array
            network.coins[0].address = wethAddress;
            });
            // Get the factory address from the router
            await network.router.factory().then((factory_address) => {
            network.factory = getFactory(
                factory_address,
                network.signer
            );
            });
            setNetwork(network)
        } else {
            console.log("Wrong network mate.");
        }
        });

    } catch (e) {
        console.log(e);
    }
}

export default setupConnection
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

const setupConnection = async () => {
    let network = {
        provider: null,
        signer: null,
        account: null,
        coins: [],
        chainID: null,
        router: null,
        factory: null,
        weth: null
    };

    try {
        console.log('lets go!');
        network.provider = new ethers.providers.Web3Provider(window.ethereum);
        network.signer = await network.provider.getSigner();
        
        network.account = await getAccount();
        network.chainID = await getNetwork(network.provider);

        if (chains.networks.includes(network.chainID)) {
            network.router = await getRouter(chains.routerAddress.get(network.chainID), network.signer);
            network.coins = COINS.get(network.chainID);

            const wethAddress = await network.router.WETH();
            network.weth = getWeth(wethAddress, network.signer);
            network.coins[0].address = wethAddress;

            const factoryAddress = await network.router.factory();
            network.factory = getFactory(factoryAddress, network.signer);
        } else {
            console.log("Wrong network mate.");
        }
    } catch (error) {
        console.error(error);
    }

    return network;
}

export default setupConnection;

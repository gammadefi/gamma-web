import { createApiClient } from "./api";

const assets = ["0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",'0x0000000000000000000000000000000000001010',"0xc2132d05d31c914a87c6611c10748aeb04b58e8f", "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"]

export const WalletService = {
    getBalance : (params : any) => createApiClient().get(`https://open-api.polygon.technology/api/v1/balance/user/tokens?userAddress=${params}${
        assets.map((items, indes) => `&tokenAddresses=${items}`).join("")
    }&chainId=137`, {headers: {'x-access-token':' 64cbf956-198a-47e0-b4a1-2b3432d8f70d'}}),
    transfer : (params : any) =>createApiClient().post("wallet/transfer",params),
    getTestBalance : (params : any) => <any> createApiClient(true,true).get(`https://open-api-testnet.polygon.technology/api/v1/balance/user/tokens?userAddress=${params}&tokenAddresses=0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa&tokenAddresses=0x0000000000000000000000000000000000001010&tokenAddresses=0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1&tokenAddresses=0xa0d9f8282cd48d22fd875e43be32793124f8ed47&chainId=80001`, {headers: {'x-access-token':'407a0211-6139-4a78-9450-f9733e35335f'}})

}
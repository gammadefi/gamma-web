import { createApiClient } from "./api";


export const TransactionService = {
    walletTransactions: (payload: any) => createApiClient(true,true).get(`https://api.polygonscan.com/api?module=account&action=txlist&address=${payload}&sort=desc&apikey=D1EWX376KJ65M3S46CGC7QM9Z8YWR92QU41`),
    wallet: (payload: any) => createApiClient(true, true).get(`https://api.polygonscan.com/api?module=account&action=tokentx&address=${payload}&sort=desc&apikey=D1EWX376KJ65M3S46CGC7QM9Z8YWR92QU41`)
}

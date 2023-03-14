import { createApiClient } from "./api";


export const TransactionService = {
    walletTransactions: (payload: any) => createApiClient().get(`http://api.polygonscan.com/api?module=account&action=txlist&address=${payload}&sort=asc&apikey=D1EWX376KJ65M3S46CGC7QM9Z8YWR92QU41`),
}

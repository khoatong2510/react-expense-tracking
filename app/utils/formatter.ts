import type { ISOString } from "./types"
import moment from "moment"
import { TRANSACTION_DATE_FORMAT } from './constants'
import type { Transaction } from "~/stores/transaction/transaction-slice"

export const formatAmount = (value: number, type: Transaction["type"]) => {
  return `${type === 'income' ? '+' : '-'}${value.toFixed(2)}$`
}

export const formatTransactionDate = (value: ISOString) => {
  return moment(value).format(TRANSACTION_DATE_FORMAT)
}

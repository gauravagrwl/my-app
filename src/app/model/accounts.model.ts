export interface AccountModel {
    id: string,
    institutionName: string,
    institutionCurrency: string,
    accountNumber: number,
    routingNumber: number,
    ifcCode: string,
    accountHoldingType: string,
    accountCategory: string,
    accountType: string,
    accountBalance: number,
    institutionCategory: string
    isActive: boolean
}

export interface AccountStatementModel {
    id: string,
    transactionDate: string,
    postingDate: string,
    descriptions: string,
    type: string,
    debit: number,
    credit: number,
    balance: number,
    reconciled: boolean,
    duplicate: boolean,
    sno: number
}
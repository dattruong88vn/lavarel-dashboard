import axios from 'axios';

const URL_DETAIL_LOAN_ADVICE = "/kyc-api/get-detail-loan-advice/";
const URL_CALCULATE_LOAN = "/kyc-api/calculate-loan";
const URL_CREATE_DOCUMENT_KYC = "/kyc-api/create-document-kyc";
const URL_DETAIL_LOAN_ADVICE_NEW = "/kyc-api/get-detail-loan-advice-new/";
let _STORED_LOCAL = {
    defaultValue: {value: '', label: "--- Vui lòng chọn ---"}
};

export function fetchDetailLoanAdviceNew(dealId, callback) {
    fetch(URL_DETAIL_LOAN_ADVICE_NEW + dealId)
        .then(res => res.json())
        .then((result) => {
            callback(result.data);
        })
}

export function fetchDetailLoanAdvice(dealId, callback) {
    fetch(URL_DETAIL_LOAN_ADVICE + dealId)
        .then(res => res.json())
        .then((result) => {
            callback(result.data);
        })
}

export function fetchBankForSelect(dealId, callback) {
    let data = [_STORED_LOCAL.defaultValue];
    fetchDetailLoanAdvice(dealId, (result) => {
        let content = result.banks.map((it) => {
            return {value: it.bankId, label: it.code + " - " + it.interestedRate + "%", interestedRate: it.interestedRate};
        });
        data = data.concat(content);
        callback(data);
    });
}

export function fetchChannelTypeForSelect(dealId, callback) {
    let data = [];
    fetchDetailLoanAdvice(dealId, (result) => {
        let content = result.channelTypeIds.map((it) => {
            return {value: it.id, label: it.name, visited: it.isExisted, isFixed: it.isExisted};
        });
        data = data.concat(content);
        callback(data);
    });
}

export function fetchLoanTermForSelect(dealId, bankId, callback) {
    let data = [_STORED_LOCAL.defaultValue];
    fetchDetailLoanAdvice(dealId, (result) => {
        var res = result.banks.filter(function (item) {
            return item.bankId == bankId;
        });
        let content = res[0].maturities.map((it) => {
            return {value: it.id, label: it.name, maturity: it.value, isDefault: it.isDefault};
        });
        data = data.concat(content);
        callback(data);
    });
}

export function fetchCalculateLoan(dataPost, callback) {
    fetch(URL_CALCULATE_LOAN, {
        method: 'POST',
        body: JSON.stringify(dataPost)
    })
        .then(res => res.json())
        .then((result) => {
            callback(result.data);
        })
}

export function fetchCreateDocumentKyc(dataPost, callback) {
    fetch(URL_CREATE_DOCUMENT_KYC, {
        method: 'POST',
        body: JSON.stringify(dataPost)
    }).then(res => res.json())
        .then((result) => {
            callback(result);
        })
}

export const createFeedback = (dataPost, callback = null) => {
    axios.post(`/kyc-api/create-feedback`, dataPost).then(res => {
        if(callback) {
            callback(res);
        }
    });
};
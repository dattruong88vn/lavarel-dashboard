import axios, { CancelToken } from "axios";

const HttpMethods = {
    GET : "GET",
    POST : "POST",
    PUT : "PUT",
    PATCH : "PATCH",
    DELETE : "DELETE",
}
const token = window?.currentUser ? window.currentUser.token : null;

export const get = async (url, endpoint, cancelToken = '') => {
    return await Request(
        HttpMethods.GET,
        url,
        endpoint,
        undefined,
        cancelToken
    );
};

export const post = async (url, endpoint, payload,  cancelToken = '', contentType) => {
    return await Request(HttpMethods.POST, url, endpoint, payload, cancelToken, contentType);
};

export const put = async (url, endpoint, payload, cancelToken = '') => {
    return await Request(HttpMethods.PUT, url, endpoint, payload, cancelToken);
};

export const patch = async (url, endpoint, payload, cancelToken = '') => {
    return await Request(
        HttpMethods.PATCH,
        url,
        endpoint,
        payload,
        cancelToken
    );
};

export const deleteRequest = async (url, endpoint, cancelToken = '') => {
    return await Request(
        HttpMethods.DELETE,
        url,
        endpoint,
        undefined,
        cancelToken
    );
};

const Request = async (methodHttp, baseUrl, endpoint, body, cancelToken, contentType = "application/json") => {
    try {
        let res = await axios({
            url: endpoint + `?access_token=${token}`,
            baseURL: baseUrl,
            method: methodHttp,
            headers: {
                "Content-Type": contentType,
                Authorization: "Bearer " + token,
            },
            data: contentType == "multipart/form-data" ? body : JSON.stringify(body),
            cancelToken: cancelToken,
        });
        if (res.status == 401) {
            console.log(res.status);
        }
        return res.data;
    } catch (err) {
        console.error(err);
    }
};
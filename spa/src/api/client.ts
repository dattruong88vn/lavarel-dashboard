enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

const _window = (window as any).window;

class Session {
    token: any;
    constructor() {
        // this.token = localStorage.getItem('tokenUser') || '';
        this.token = _window.currentUser.token || "";
    }
}

class ApiClient {
    private session: Session;
    private readonly baseUrl: string;

    constructor(baseUrl: string, session: Session) {
        this.baseUrl = baseUrl.replace(/\/$/, "");
        this.session = session;
    }

    //for baseUrl setting in .env
    async get(endpoint: string, headerContentType = "application/json") {
        return await this.request(
            HttpMethods.GET,
            endpoint,
            undefined,
            headerContentType
        );
    }
    async getDirect(endpoint: string, headerContentType = "application/json") {
        return await this.requestDirect(
            HttpMethods.GET,
            endpoint,
            undefined,
            headerContentType
        );
    }
    async postDirect(endpoint: string, payload?: any) {
        return await this.requestDirect(HttpMethods.POST, endpoint, payload);
    }
    async post(endpoint: string, payload?: any) {
        return await this.request(HttpMethods.POST, endpoint, payload);
    }
    async put(endpoint: string, payload: any) {
        return await this.request(HttpMethods.PUT, endpoint, payload);
    }
    async patch(endpoint: string, payload: any) {
        return await this.request(HttpMethods.PATCH, endpoint, payload);
    }
    async delete(endpoint: string) {
        return await this.request(HttpMethods.DELETE, endpoint);
    }

    private absUrl(path: string): string {
        const sep = path[0] === "/" ? "" : "/";
        const que = path.indexOf("?") >= 0 ? "&" : "?";
        return `${this.baseUrl}${sep}${path}${que}access_token=${
            this.session?.token || ""
        }`;
    }

    private async requestDirect(
        method: HttpMethods,
        endpoint: string,
        body = undefined,
        headerContentType: string = "application/json"
    ) {
        let response = await fetch(endpoint, {
            method: method,
            headers: { "Content-Type": headerContentType },
            body: JSON.stringify(body),
        });

        if (response.status === 401) {
            // TODO
            // need to defined for unauthorized
        }

        let responseBody = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            responseBody = await response.json();
        } else if (contentType && contentType.includes("text/csv")) {
            responseBody = await response.text();
        }

        if (!response.ok) {
            const message =
                responseBody && responseBody.message
                    ? responseBody.message
                    : response.statusText;
            throw Error(message);
        }

        return responseBody;
    }

    private async request(
        method: HttpMethods,
        endpoint: string,
        body = undefined,
        headerContentType: string = "application/json"
    ) {
        let response = await fetch(this.absUrl(endpoint), {
            method: method,
            headers: { "Content-Type": headerContentType },
            body: JSON.stringify(body),
        });

        if (response.status === 401) {
            // TODO
            // need to defined for unauthorized
            // window.location.href = '/login';
        }

        let responseBody = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            responseBody = await response.json();
        } else if (contentType && contentType.includes("text/csv")) {
            responseBody = await response.text();
        }

        // if (!response.ok) {
        //     const message = responseBody && responseBody.message ? responseBody.message : response.statusText;
        //     throw Error(message);
        // }

        return responseBody;
    }

    // for direct API
    async getDirectly(
        endpoint: string,
        headerContentType = "application/json"
    ) {
        return await this.requestDirectly(
            HttpMethods.GET,
            endpoint,
            undefined,
            headerContentType
        );
    }
    async postDirectly(endpoint: string, payload?: any) {
        return await this.requestDirectly(HttpMethods.POST, endpoint, payload);
    }
    async putDirectly(endpoint: string, payload: any) {
        return await this.requestDirectly(HttpMethods.PUT, endpoint, payload);
    }
    async patchDirectly(endpoint: string, payload: any) {
        return await this.requestDirectly(HttpMethods.PATCH, endpoint, payload);
    }
    async deleteDirectly(endpoint: string) {
        return await this.requestDirectly(HttpMethods.DELETE, endpoint);
    }
    private async requestDirectly(
        method: HttpMethods,
        endpoint: string,
        body = undefined,
        headerContentType: string = "application/json"
    ) {
        let response = await fetch(endpoint, {
            method: method,
            headers: { "Content-Type": headerContentType },
            body: JSON.stringify(body),
        });

        if (response.status === 401) {
            // TODO
            // need to defined for unauthorized
            // window.location.href = '/login';
        }

        let responseBody = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            responseBody = await response.json();
        } else if (contentType && contentType.includes("text/csv")) {
            responseBody = await response.text();
        }

        if (!response.ok) {
            const message =
                responseBody && responseBody.message
                    ? responseBody.message
                    : response.statusText;
            throw Error(message);
        }

        return responseBody;
    }
}

// export default new ApiClient(process.env.REACT_APP_API_BASE_URL || '', new Session());
export default new ApiClient(_window.baseApi || "", new Session());

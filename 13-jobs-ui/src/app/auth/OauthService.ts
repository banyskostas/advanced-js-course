const apiEndpoint = 'http://localhost:8888/'

interface OAuthResponse {
    access_token: string
    token_type: string
}

function encodeFormData(obj: { [key: string]: string }) {
    return Object.keys(obj)
        .map(key => `${key}=${encodeURIComponent(obj[key])}`)
        .join('&')
}

export class OauthService {
    static $inject = [ '$http' ]

    constructor(private $http: ng.IHttpService) {
    }

    getToken(
        clientId: string,
        clientSecret: string,
        username: string,
        password: string) : Promise<string> {
            return this.$http<OAuthResponse>({
                method: 'POST',
                url: apiEndpoint + 'token',
                headers: {
                    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: encodeFormData,
                data: {
                    grant_type: 'password',
                    username,
                    password
                }

            }).then(resp => resp.data.access_token)
    }
}

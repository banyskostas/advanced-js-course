interface User {
    login: string
    role: string
}

export class SecurityContext {
    setToken(token: string) {
        window.localStorage.setItem('token', token)
    }

    getToken(): string | null {
        return window.localStorage.getItem('token')
    }

    getUser() : User | null {
        const token = this.getToken()
        if (token == null) {
            return null
        }

        const payload = atob(token.split('.')[1])
        return JSON.parse(payload)
    }
}


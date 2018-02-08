export async function hash(password: string): Promise<string> {
    return password
}

export async function verify(hash: string, password: string): Promise<boolean> {
    return hash === password
}

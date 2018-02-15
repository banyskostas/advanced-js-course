import * as webdriverio from 'webdriverio'

let driver: webdriverio.Client<void>

beforeAll(async () => {
    const options = {
        desiredCapabilities : {
            browserName: 'chrome',
            chromeOptions: {
                args: ['--start-maximized']
            }
        }
    }
    driver = webdriverio.remote(options)
    await driver.init()
})

afterAll(async () => {
    if (driver) {
        await driver.end()
    }
})

class TextField {
    constructor(private driver: webdriverio.Client<void>, private selector: string) {
    }

    async value(value?: string): Promise<string> {
        await this.driver.waitForExist(this.selector)
        if (value) {
            await this.driver.setValue(this.selector, value)
        }
        return await this.driver.getValue(this.selector)
    }
}

class LoginPage {
    username: TextField
    password: TextField

    constructor(private driver: webdriverio.Client<void>) {
        this.username = new TextField(driver, '#username')
        this.password = new TextField(driver, '#password')
    }

    async login() {
        await this.driver.waitForExist('#login-button')
        await this.driver.click('#login-button')
    }
}

describe('Login page', () => {
    it('Should login with correct credentials', async () => {
        await driver.url('http://localhost:5555')
        const loginPage = new LoginPage(driver)
        await loginPage.username.value('admin')
        await loginPage.password.value('labas')
        await loginPage.login()
        await driver.waitForExist('#jobs-list')
    })
})

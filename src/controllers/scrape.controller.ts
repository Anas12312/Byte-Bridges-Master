
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function initializeScraper(url: string) {
    // Scraping logic here
}

export async function stopScrapper() {
    // Pause logic here
}

async function scrap(search: string, type: string) {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
        headless: true,
        timeout: 300_000,
        args: [
            '--window-position=04000,-4000'
        ]
        // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
    })
    const page = await browser.newPage()
    try {
        await page.goto(search)
        // await page.waitForNetworkIdle()
        await page.waitForSelector('[data-test="JobTile"]')
        const articles = await page.$$('[data-test="JobTile"]')
        const jobs: any[] = []
        for (let article of articles) {
            const title = await article.$(".job-tile .up-n-link")
            const titleText = await title?.evaluate((t: any) => {
                return t.textContent
            })
            const link = await title?.evaluate((t: any) => {
                return t.getAttribute('href')
            })
            const listElement = await article.$(".job-tile-info-list")
            const itemElement = (await listElement?.$$("li"))?.at(2)
            const strongElement = (await itemElement?.$$("strong"))?.at(1)
            const price = await strongElement?.evaluate((s: any) => {
                return s.textContent
            })
            const bodyElement = await article.$("p")
            const body = await bodyElement?.evaluate((b: any) => {
                return b.textContent
            })
            const headerElement = await article.$(".job-tile-header")
            const spanElement = (await headerElement?.$$("span"))?.at(1)
            const time = await spanElement?.evaluate((s: any) => {
                return s.textContent
            })
            // console.log("--------------------------------")
            // console.log(titleText)
            // console.log(link)
            // console.log(price)
            // console.log(body)
            // console.log(time)
            // const existing = allTimejobs.map((j: any) => j.link)
            // if (existing.includes("https://www.upwork.com" + link)) continue
            jobs.push({
                title: "" + titleText,
                price: "" + price,
                body: "" + body,
                link: "https://www.upwork.com" + link,
                timeAgo: time!,
                type: type
            })
        }
        console.log(jobs)
        await browser.close()
        return jobs
    }
    catch (e) {
        await browser.close()
    }
}

// import "server-only";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export default async function takeScreenshot(link: string, id: string): Promise<Blob> {
	let browser = null;
	let page = null;
	try {
		const folderPath = "./preview";
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath);
		}
		const screenshotPath = path.join(folderPath, `${id}.jpg`);
		browser = await puppeteer.launch({ headless: true });
		page = await browser.newPage();
		await page.goto(link);
		await page.screenshot({ path: screenshotPath, type: "jpeg" });
		const buffer = fs.readFileSync(screenshotPath);
		return new Blob([buffer], { type: "image/jpeg" });
		
	} catch (error: any) {
		throw new Error(`Failed to take screenshot: ${error.message}`);
	} finally {
		if (page) {
			await page.close();
		}
		if (browser) {
			await browser.close();
		}
	}
}

import { NextResponse } from "next/server";
import takeScreenshot from "@/app/services/preview";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const link = searchParams.get("link");
		const id = searchParams.get("id");
		if (!link || !id) {
			throw new Error("Missing link or id");
		}
		const screenshot = await takeScreenshot(link, id).catch(() => {
			throw new Error("Failed to take screenshot");
		});
		console.log("first");

		return new NextResponse(screenshot, {
			headers: {
				"Content-Type": "image/jpeg",
			},
		});
	} catch (error: any) {
		console.log("second");
		return new NextResponse(
			JSON.stringify({
				status: 500,
				body: {
					error: error instanceof Error ? error.message : "An unknown error occurred",
				},
			})
		);
	}
}

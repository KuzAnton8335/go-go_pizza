import { showLoader,hideLoader } from "./loader.js";
export const getData = async (url) => {
	showLoader();
	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error("Failed to pizza products")
		}
		return await response.json();
	} catch (error) {
		console.error(`Error fetching pizza products: ${error}`);
		return[];
	} finally{
		hideLoader();
	}

}
let preferences;
async function get_preferences() {
	preferences = (await chrome.storage.sync.get('preferences')).preferences || {};
}
get_preferences();

function is_url(url) {
	try {
		new URL(url);
		return true;
	}
	catch {
		return false;
	}
}

document.oncopy = async (e) => {
	let text = await navigator.clipboard.readText();
	if (!is_url(text)) return;

	let url = new URL(text);

	let link = preferences.links?.find((link) => link.websites.includes(url.hostname)) ?? preferences.links?.find((link) => link.websites.map(w => `www.${w}`).includes(url.hostname));

	if(!link) return;

	if (link.enabled) {
		if (link.replace) {
			url.hostname = link.replace_with;
		}
		link.remove?.forEach((param) => {
			url.searchParams.delete(param);
		});
	}

	await navigator.clipboard.writeText(url.href);
}
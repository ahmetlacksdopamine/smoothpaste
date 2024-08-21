async function saveToChrome() {
	let preferences = (await chrome.storage.sync.get('preferences')).preferences || {};
	if (!preferences.links) {
		chrome.storage.sync.set({ preferences: {
			"links": [
			  {
				"enabled": true,
				"remove": [
				  "t",
				  "s"
				],
				"replace": true,
				"replace_with": "fxtwitter.com",
				"websites": [
				  "twitter.com",
				  "x.com"
				]
			  },
			  {
				"enabled": true,
				"remove": [
				  "utm_source",
				  "igsh",
				  "igshid"
				],
				"replace": true,
				"replace_with": "ddinstagram.com",
				"websites": [
				  "instagram.com"
				]
			  },
			  {
				"enabled": true,
				"remove": [
				  "si"
				],
				"replace": false,
				"websites": [
				  "youtube.com",
				  "youtu.be"
				]
			  },
			  {
				"enabled": true,
				"remove": [
				  "si"
				],
				"replace": false,
				"websites": [
				  "spotify.com",
				  "open.spotify.com"
				]
			  },
			  {
				"enabled": true,
				"remove": [],
				"replace": true,
				"replace_with": "tfxtok.com",
				"websites": [
				  "vm.tiktok.com"
				]
			  },
			  {
				"enabled": true,
				"remove": [
				  "ref_share",
				  "ref_source",
				  "ref"
				],
				"replace": false,
				"websites": [
				  "reddit.com"
				]
			  }
			]
		  } }); 
	}
}

await saveToChrome();

let table = document.getElementById('tbody');
let preferences = (await chrome.storage.sync.get('preferences')).preferences;

preferences.links?.forEach((link) => {
	let tr = document.createElement('tr');

	let enabled = document.createElement('td');
	let urls = document.createElement('td');
	let replaceUrl = document.createElement('td');
	let replaceWith = document.createElement('td');
	let removeParams = document.createElement('td');

	enabled.innerHTML = link.enabled ? '✅' : '❌';
	urls.innerHTML = link.websites.join(', ');
	replaceUrl.innerHTML = link.replace ? '✅' : '❌';
	replaceWith.innerHTML = link.replace_with ?? '';
	removeParams.innerHTML = link.remove.join(', ');

	tr.appendChild(enabled);
	tr.appendChild(urls);
	tr.appendChild(replaceUrl);
	tr.appendChild(replaceWith);
	tr.appendChild(removeParams);

	table.appendChild(tr);
});
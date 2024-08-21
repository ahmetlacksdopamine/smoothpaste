async function export_preferences() {
	const data = JSON.stringify((await chrome.storage.sync.get('preferences')).preferences || {}, null, 4);
	const blob = new Blob([data], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'preferences.json';
	a.click();
}

function hash_check() {
	if(window.location.hash === '#export') {
		export_preferences();
	}
}

window.onhashchange = hash_check;
hash_check();
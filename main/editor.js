require.config({
	paths: {
		vs: '/lib'
	}
});

let save = document.getElementById('save'),
	json = document.getElementById('json'),
	file_picker = document.getElementById('file-picker');

function is_appropriate_json(json) {
	try {
		let j = JSON.parse(json);
		if (!j.links) return;
		return true;
	}
	catch {
		return false;
	}
}

require(['vs/editor/editor.main'], async function () {
	let editor = monaco.editor.create(json,
		{
			language: 'json',
			theme: 'vs-dark',
			automaticLayout: true,
			minimap: {
				enabled: false
			},
			fontSize: 21,
			mouseWheelZoom: true,
			scrollBeyondLastLine: false,
		});

	file_picker.onchange = async () => {
		let file = file_picker.files[0];
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			let data = reader.result;
			editor.setValue(data);
		}
	}
	editor.setValue(JSON.stringify((await chrome.storage.sync.get('preferences')).preferences || {}, null, 2));

	save.onclick = () => {
		if (!is_appropriate_json(editor.getValue())) {
			sound_effects['error'].play();
			alert('invalid JSON or links are missing');
			return;
		}

		chrome.storage.sync.set({ preferences: JSON.parse(editor.getValue()) });
		sound_effects['success'].play();
		alert('saved!');
	}
});
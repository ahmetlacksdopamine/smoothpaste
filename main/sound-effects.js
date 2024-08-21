let sound_effects_entries = {
	error: '/soundeffects/error.wav',
	save: '/soundeffects/save.wav',
	success: '/soundeffects/success.wav',
	click: '/soundeffects/click.wav',
	export: '/soundeffects/export.wav',
};

let sound_effects = {}, i = 0, loaded = false;

function import_sounds() {
	Object.entries(sound_effects_entries).forEach(([key, value]) => {
		sound_effects[key] = new Audio();
		sound_effects[key].src = value;
		sound_effects[key].volume = 0.2;
		sound_effects[key].oncanplaythrough = () => {
			i++;
			if (i === Object.keys(sound_effects_entries).length) {
				loaded = true;
			}
		}
	});
}

import_sounds();

function assign_sound_effects_to_buttons() {
	document.querySelectorAll('button').forEach((button) => {
		button.addEventListener('click', () => {
			if(!loaded) return;
			if(!button.dataset.sound) return;
			sound_effects[button.dataset.sound].play();
		});
	});

	document.querySelectorAll('a').forEach((btn) => {
		btn.addEventListener('click', () => {
			if(!loaded) return;
			if(!btn.dataset.sound) return;
			sound_effects[btn.dataset.sound].play();
		});
	});
}

assign_sound_effects_to_buttons();
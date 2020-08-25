//=============================================================================
// A XueYu Plugins - Audio
// AXY_Audio.js
// Version: 1.0
// License: MIT
//=============================================================================
/*:
 * @plugindesc v1.0 Allows to Change Audio's staff.
 * @author A XueYu Plugins
 *
 * @param ForceAudioExt
 * @desc Force Audio Ext. Leave blank to use this priority list: .m4a, .ogg, .mp3, .flac. Default: .m4a
 * @default .m4a
 *
 * @help
 * Introduction
 * This plugin allows to Change Audio's staff.
 * Example: 
 * 1.It's very simple, so there's no example.
 * 2.var support = AXY_Audio.showSupport(); //then you got a variable named as support that is your client support audios.
 *
 * changelog
 * 1.0 2019.9.26
 * first release.
 */

// Imported
var Imported = Imported || {};
Imported.AXY_Audio = true;

// Parameter Variables
var AXY = AXY || {};
AXY.Audio = AXY.Audio || {};

AXY.Audio.Parameters = PluginManager.parameters('AXY_Audio');
AXY.Audio.Param = AXY.Audio.Param || {};

AXY.Audio.Param.ForceAudioExt = String(AXY.Audio.Parameters['ForceAudioExt']);

// Main
WebAudio._detectCodecs = function () {
	var audio = document.createElement('audio');
	if (audio.canPlayType) {
		this._canPlayOgg = audio.canPlayType('audio/ogg');
		this._canPlayM4a = audio.canPlayType('audio/mp4');
		this._canPlayMp3 = audio.canPlayType('audio/mp3');
		this._canPlayFlac = audio.canPlayType('audio/flac');
	}
};

AudioManager.audioFileExt = function () {
	if (AXY.Audio.Param.ForceAudioExt) {
		return AXY.Audio.Param.ForceAudioExt;
	} else {
		if (WebAudio.canPlayM4a()) {
			return '.m4a';
		} else if (WebAudio.canPlayOgg()) {
			return '.ogg';
		} else if (WebAudio._canPlayMp3) {
			return '.mp3';
		} else if (WebAudio._canPlayFlac) {
			return '.flac';
		}
	}
};

AXY_Audio = {
	showSupport: function () {
		var arr = new Array();
		if (WebAudio.canPlayM4a()) {
			arr.push('.m4a')
		}
		if (WebAudio.canPlayOgg()) {
			arr.push('.ogg')
		}
		if (WebAudio._canPlayMp3) {
			arr.push('.mp3')
		}
		if (WebAudio._canPlayFlac) {
			arr.push('.flac')
		}
		return arr.join(',')
	}
}

// Depends on AXY_Toast.js for handle Failed to load audio file to reduce interrupt.
/*
AudioManager.checkWebAudioError = function (webAudio) {
	if (webAudio && webAudio.isError()) {
		//throw new Error('Failed to load: ' + webAudio.url);
		$.toaster({
			message: 'Failed to load: ' + webAudio.url,
			color: 'red'
		});
	}
};
Graphics.printLoadingError = function (url) {
	if (this._errorPrinter && !this._errorShowed) {
		this._errorPrinter.innerHTML = this._makeErrorHtml('Loading Error', 'Failed to load: ' + url);
		var button = document.createElement('button');
		button.innerHTML = 'Retry';
		button.style.fontSize = '24px';
		button.style.color = '#ffffff';
		button.style.backgroundColor = '#000000';
		button.onmousedown = button.ontouchstart = function (event) {
			ResourceHandler.retry();
			event.stopPropagation();
		};
		this._errorPrinter.appendChild(button);
		this._loadingCount = -Infinity;
	}

};
*/
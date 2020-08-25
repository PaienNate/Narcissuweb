/*:
 * @plugindesc <AntiAudioDelay> for RPG Maker MV version 1.6.2.
 * @author RPG Maker Irina
 *
 * @help
 * *** Introduction ***
 *
 * When playing audio in RPG Maker MV events, there's a small delay when the
 * audio loads to when it's actually played. This can make some scenes lose
 * impact where an emotional piece of music is supposed to be played, but it
 * gets delayed instead and ruins the moment.
 *
 * What this plugin does is go through the currently running event's command
 * list by a certain amount and loads ahead of time the audio files it finds.
 * This way, the audio files are ready by the time the event runs, making it
 * transition smoothly.
 *
 * This plugin does not preload and store audio files forever because that's a
 * very quick way to get your game client to crash when it consumes more memory
 * than the player's computer can handle. Instead, it will save a designated
 * amount of audio files in its cache to keep them ready in case they're reused
 * but will flush them out of memory when the limit has been reached. This is
 * to ensure that memory doesn't overflow and crash the game.
 *
 *
 *
 * *** Plugin Parameters ***
 *
 * Load Ahead Index By
 *
 *      This is how many event lines the plugin will look ahead to search for
 * audio files to load into the cache. Keep in mind this is lines, not actual
 * event commands. Events that have multiple lines like messages will count for
 * a different amount of lines. Therefore, it's safe to have this look ahead by
 * a large number like 10.
 *
 * Cache Limits
 *
 *      Each of these for BGM, BGS, ME, and SE all do the same thing: store a
 * number of audio files in quick accessible memory for the game client to use
 * and call when needed. If the amount exceeds the limit declared on the plugin
 * parameter, then the oldest entries will be flushed out of memory until the
 * cache is at the limit amount.
 *
 *
 *
 * *** Plugin Commands ***
 * 
 * FlushAudioCache BGM
 * FlushAudioCache BGS
 * FlushAudioCache ME
 * FlushAudioCache SE
 * FlushAudioCache ALL
 * 
 *      These will clear the audio caches for the written type of audio. If you
 * pick all, then all four types will be flushed out of memory. This will give
 * your game a clear slate for the the audio cache, which means the game may
 * lag a little bit upon reloading the new BGM files.
 * 
 *      In my opinion, these plugin commands should never need to be used since
 * the plugin will automatically clear them once the cache goes over the limit,
 * but I'm just giving you control over the audio cache for your game just in
 * case you want to do something with it.
 *
 * 
 *
 * *** RPG Maker Version ***
 *
 * This plugin is made for and tested on RPG Maker MV with version 1.6.2.
 * I cannot guarantee if it works on lower versions.
 *
 *
 *
 * *** Terms of Use ***
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'RPG Maker Irina' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins.
 *
 * *** Help End ***
 *
 * @param 
 *
 * @param LoadAheadIndex
 * @text Load Ahead Index By
 * @desc Load BGM, BGS, ME, SE audio in a running event ahead by this count for the event index
 * @default 10
 *
 * @param
 *
 * @param CacheLimits
 * @text Cache Limits
 *
 * @param CacheLimitBgm
 * @text BGM
 * @parent CacheLimits
 * @desc Store this many BGM in the cache before removing the earlier ones
 * @default 10
 *
 * @param CacheLimitBgs
 * @text BGS
 * @parent CacheLimits
 * @desc Store this many BGS in the cache before removing the earlier ones
 * @default 10
 *
 * @param CacheLimitMe
 * @text ME
 * @parent CacheLimits
 * @desc Store this many ME in the cache before removing the earlier ones
 * @default 10
 *
 * @param CacheLimitSe
 * @text SE
 * @parent CacheLimits
 * @desc Store this many SE in the cache before removing the earlier ones
 * @default 10
 *
 */
//=============================================================================

var parameters=$plugins.filter(function(e){return e.description.contains("<AntiAudioDelay>")})[0].parameters;var Imported=Imported||{};Imported.Irina_AntiAudioDelay={LoadAheadIndex:Number(parameters["LoadAheadIndex"]),CacheLimitBgm:Number(parameters["CacheLimitBgm"]),CacheLimitBgs:Number(parameters["CacheLimitBgs"]),CacheLimitMe:Number(parameters["CacheLimitMe"]),CacheLimitSe:Number(parameters["CacheLimitSe"])};Imported.Irina_AntiAudioDelay.AudioManager_playBgm=AudioManager.playBgm;AudioManager.playBgm=function(e,a){Imported.Irina_AntiAudioDelay.AudioManager_playBgm.call(this,e,a);if(e){var i=e.name;this._lastLoadedBgm=this._lastLoadedBgm||[];this._lastLoadedBgm.push(i);var t=Imported.Irina_AntiAudioDelay.CacheLimitBgm;while(this._lastLoadedBgm.length>t){var i=this._lastLoadedBgm.shift();if(this._audioCacheBgm[i]&&i!==AudioManager._battleBgmName&&i!==AudioManager._vehicleBgmName){this._audioCacheBgm[i].clear();this._audioCacheBgm[i]=undefined}}}};Imported.Irina_AntiAudioDelay.AudioManager_playBgs=AudioManager.playBgs;AudioManager.playBgs=function(e,a){Imported.Irina_AntiAudioDelay.AudioManager_playBgs.call(this,e,a);if(e){var i=e.name;this._lastLoadedBgs=this._lastLoadedBgs||[];this._lastLoadedBgs.push(i);var t=Imported.Irina_AntiAudioDelay.CacheLimitBgs;while(this._lastLoadedBgs.length>t){var i=this._lastLoadedBgs.shift();if(this._audioCacheBgs[i]){this._audioCacheBgs[i].clear();this._audioCacheBgs[i]=undefined}}}};Imported.Irina_AntiAudioDelay.AudioManager_playMe=AudioManager.playMe;AudioManager.playMe=function(e){Imported.Irina_AntiAudioDelay.AudioManager_playMe.call(this,e);if(e){var a=e.name;this._lastLoadedMe=this._lastLoadedMe||[];this._lastLoadedMe.push(a);var i=Imported.Irina_AntiAudioDelay.CacheLimitMe;while(this._lastLoadedMe.length>i){var a=this._lastLoadedMe.shift();if(this._audioCacheMe[a]&&a!==AudioManager._victoryMeName&&a!==AudioManager._defeatMeName){this._audioCacheMe[a].clear();this._audioCacheMe[a]=undefined}}}};Imported.Irina_AntiAudioDelay.AudioManager_playSe=AudioManager.playSe;AudioManager.playSe=function(e){Imported.Irina_AntiAudioDelay.AudioManager_playSe.call(this,e);if(e){var a=e.name;this._lastLoadedSe=this._lastLoadedSe||[];this._lastLoadedSe.push(a);var i=Imported.Irina_AntiAudioDelay.CacheLimitSe;while(this._lastLoadedSe.length>i){var a=this._lastLoadedSe.shift();if(this._audioCacheSe[a]){this._audioCacheSe[a].clear();this._audioCacheSe[a]=undefined}}}};Imported.Irina_AntiAudioDelay.AudioManager_createBuffer=AudioManager.createBuffer;AudioManager.createBuffer=function(e,a){switch(e){case"bgm":this._audioCacheBgm=this._audioCacheBgm||{};var i=this._audioCacheBgm;break;case"bgs":this._audioCacheBgs=this._audioCacheBgs||{};var i=this._audioCacheBgs;break;case"me":this._audioCacheMe=this._audioCacheMe||{};var i=this._audioCacheMe;break;case"se":this._audioCacheSe=this._audioCacheSe||{};var i=this._audioCacheSe;break;default:return Imported.Irina_AntiAudioDelay.AudioManager_createBuffer.call(this)}if(!i[a]){i[a]=Imported.Irina_AntiAudioDelay.AudioManager_createBuffer.call(this,e,a)}return i[a]};AudioManager.flushAudioCache=function(e){if(e==="bgm"){this._audioCacheBgm={}}else if(e==="bgs"){this._audioCacheBgs={}}else if(e==="me"){this._audioCacheMe={}}else if(e==="se"){this._audioCacheSe={}}};Imported.Irina_AntiAudioDelay.Game_Interpreter_executeCommand=Game_Interpreter.prototype.executeCommand;Game_Interpreter.prototype.executeCommand=function(){this.loadAheadAudioCommands();return Imported.Irina_AntiAudioDelay.Game_Interpreter_executeCommand.call(this)};Game_Interpreter.prototype.loadAheadAudioCommands=function(){var e=Imported.Irina_AntiAudioDelay.LoadAheadIndex;if(e>0){var a=this._index;var i=this._index+e;for(var t=i;t>=a;t--){var r=this._list[t];if(r&&r.code){var d=r.parameters;switch(r.code){case 241:AudioManager.createBuffer("bgm",d[0].name);break;case 245:AudioManager.createBuffer("bgs",d[0].name);break;case 249:AudioManager.createBuffer("me",d[0].name);break;case 250:AudioManager.createBuffer("se",d[0].name);break;case 132:if(AudioManager._battleBgmName!==undefined&&AudioManager._audioCacheBgm[AudioManager._battleBgmName]){AudioManager._audioCacheBgm[AudioManager._battleBgmName].clear();AudioManager._audioCacheBgm[AudioManager._battleBgmName]=undefined}AudioManager._battleBgmName=d[0].name;if(AudioManager._battleBgmName!==""){AudioManager._battleBgmBuffer=AudioManager.createBuffer("bgm",d[0].name)}break;case 133:if(AudioManager._victoryMeName!==undefined&&AudioManager._audioCacheBgm[AudioManager._victoryMeName]){AudioManager._audioCacheMe[AudioManager._victoryMeName].clear();AudioManager._audioCacheMe[AudioManager._victoryMeName]=undefined}AudioManager._victoryMeName=d[0].name;if(AudioManager._victoryMeName!==""){AudioManager._victoryMeBuffer=AudioManager.createBuffer("me",d[0].name)}break;case 139:if(AudioManager._defeatMeName!==undefined&&AudioManager._audioCacheBgm[AudioManager._defeatMeName]){AudioManager._audioCacheMe[AudioManager._defeatMeName].clear();AudioManager._audioCacheMe[AudioManager._defeatMeName]=undefined}AudioManager._defeatMeName=d[0].name;if(AudioManager._defeatMeName!==""){AudioManager._defeatMeBuffer=AudioManager.createBuffer("me",d[0].name)}break;case 301:if($gameSystem.battleBgm().name!==""){AudioManager.createBuffer("bgm",$gameSystem.battleBgm().name)}if($gameSystem.victoryMe().name!==""){AudioManager.createBuffer("me",$gameSystem.victoryMe().name)}if($gameSystem.defeatMe().name!==""){AudioManager.createBuffer("me",$gameSystem.defeatMe().name)}break}}}}};Imported.Irina_AntiAudioDelay.BattleManager_playBattleBgm=BattleManager.playBattleBgm;BattleManager.playBattleBgm=function(){Imported.Irina_AntiAudioDelay.BattleManager_playBattleBgm.call(this);if(AudioManager._battleBgmName!==$gameSystem.battleBgm().name){if(AudioManager._audioCacheBgm[AudioManager._battleBgmName]){AudioManager._audioCacheBgm[AudioManager._battleBgmName].clear();AudioManager._audioCacheBgm[AudioManager._battleBgmName]=undefined}AudioManager._battleBgmName=$gameSystem.battleBgm()}};Imported.Irina_AntiAudioDelay.BattleManager_playVictoryMe=BattleManager.playVictoryMe;BattleManager.playVictoryMe=function(){Imported.Irina_AntiAudioDelay.BattleManager_playVictoryMe.call(this);if(AudioManager._victoryMeName!==$gameSystem.victoryMe().name){if(AudioManager._audioCacheMe[AudioManager._victoryMeName]){AudioManager._audioCacheMe[AudioManager._victoryMeName].clear();AudioManager._audioCacheMe[AudioManager._victoryMeName]=undefined}AudioManager._victoryMeName=$gameSystem.victoryMe()}};Imported.Irina_AntiAudioDelay.BattleManager_playDefeatMe=BattleManager.playDefeatMe;BattleManager.playDefeatMe=function(){Imported.Irina_AntiAudioDelay.BattleManager_playDefeatMe.call(this);if(AudioManager._defeatMeName!==$gameSystem.defeatMe().name){if(AudioManager._audioCacheMe[AudioManager._defeatMeName]){AudioManager._audioCacheMe[AudioManager._defeatMeName].clear();AudioManager._audioCacheMe[AudioManager._defeatMeName]=undefined}AudioManager._defeatMeName=$gameSystem.defeatMe()}};Imported.Irina_AntiAudioDelay.Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;Game_Interpreter.prototype.pluginCommand=function(e,a){Imported.Irina_AntiAudioDelay.Game_Interpreter_pluginCommand.call(this,e,a);if(e.match(/FlushAudioCache/i)){var i=a[0];if(i.match(/bgm/i)){AudioManager.flushAudioCache("bgm")}else if(i.match(/bgs/i)){AudioManager.flushAudioCache("bgs")}else if(i.match(/me/i)){AudioManager.flushAudioCache("me")}else if(i.match(/se/i)){AudioManager.flushAudioCache("se")}else if(i.match(/all/i)){AudioManager.flushAudioCache("bgm");AudioManager.flushAudioCache("bgs");AudioManager.flushAudioCache("me");AudioManager.flushAudioCache("se")}}};



























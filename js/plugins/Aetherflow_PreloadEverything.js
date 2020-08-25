//=============================================================================
// Aetherflow Plugins - Preload Everything
// Aetherflow_PreloadEverything.js
//=============================================================================
/*:
 * @plugindesc 预加载所有(已翻译)(已付费) 作者:Kaliya
 * @author Kaliya
 *
 * @param ReleaseMapChange
 * @text 移动地图时释放
 * @type boolean
 * @default true
 * @desc 在移动地图时内存中释放非系统/全局的预加载资源
 *
 * @param PreloadSystem
 * @text 预加载系统资源
 * @type boolean
 * @default true
 * @desc 在启动时预加载所有基于系统的资源
 *
 * @param ImageCacheSize
 * @text 图像缓存大小
 * @desc 图像缓存的大小(字节)
 * @type text
 * @default 10 * 1000 * 1000
 *
 * @param AudioCacheSize
 * @text 音频缓存大小
 * @desc 音频缓存的大小(字节)
 * @type text
 * @default 20 * 1000 * 1000
 *
 * @param PreloadGlobal
 * @text 全局资源
 * @desc 游戏开始时保留在内存中的预加载资源
 * @type struct<PreloadContainer>
 *
 * @param PreloadMaps
 * @text 地图资源
 * @desc 用于预加载映射资源
 * @type struct<PreloadMapContainer>[]
 *
 * @help
 * 作者:Kaliya
 * 插件更新:kaliya.itch.io/preload-everything
 * 免费用于商业和非商业项目
 * 更新时间:2018年11月7日
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 如何工作:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 预加载相当简单,它有两种类型:
 * 全局:列表文件都在游戏开始时加载
 * 地图:当进入指定地图时,将预加载指定列表文件,当离开指定地图时,它们也将从缓存
 * 中释放
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 预加载及其工作方式
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 预加载系统将资源存储在内存中,直到不再需要这些资源为止,并可以通过函数手动清
 * 除这些资源,或者在加载新资源且缓存已满时由系统本身删除这些资源
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 缓存大小由两个插件参数确定:
 * 图像缓存大小
 * 音频缓存大小
 * 例如:10 * 1000 * 1000 是 10MB 缓存
 */
/*~struct~PreloadContainer:
 @param Images
 @type file[]
 @dir images/
 @desc 预加载的图像文件列表

 @param Audio
 @type file[]
 @dir audio/
 @desc 预加载的音频文件列表
*/
/*~struct~PreloadMapContainer:
 @param MapId
 @text Map ID
 @type number
 @desc 映射的地图ID
 @min 0
 @max 999
 @default 0

 @param Images
 @type file[]
 @dir images/
 @desc 预加载的图像文件列表

 @param Audio
 @type file[]
 @dir audio/
 @desc 预加载的音频文件列表
*/

//=============================================================================
// PluginManager
//
// NOTE: The parameter parsing functions were originally written by Pivoo (http://pivoo.me)
// he has kindly given me permission to include and modify them but all credit should
// go to him.
//=============================================================================

PluginManager.parseObject = function(obj){
    var output = new Object();
    Object.keys(obj).forEach(function(key){
        var param = obj[key];
        output[key] = this.parse(param, key);
    },this);
    return output;
};

PluginManager.parseArray = function(arr, key){
    return arr.map(function(param, index){
        return this.parse(param, key + '[' + index + ']');
    },this);
};

PluginManager.parse = function(param, key){
    if(!isNaN(param) && param.contains('.')){
        return parseFloat(param);
    } else {
        try {
            param = JSON.parse(param);
            switch(param.constructor.name){
            case'Object': return this.parseObject(param);
            case'Array': return this.parseArray(param, key);
            default: return param;
            }
        } catch(err) {
            return param;
        }
    }
};

//=============================================================================
// Configuration
//=============================================================================

var Aetherflow = Aetherflow || {};
Aetherflow.Preload = Aetherflow.Preload || {};

Aetherflow.Parameters = PluginManager.parameters('Aetherflow_PreloadEverything');
Aetherflow.Param = Aetherflow.Param || {};

Aetherflow.Param["ReleaseMapChange"] = Boolean(Aetherflow.Parameters["ReleaseMapChange"]);
Aetherflow.Param["PreloadSystem"] = eval(Aetherflow.Parameters["PreloadSystem"]);
Aetherflow.Param["PreloadConnections"] = Boolean(Aetherflow.Parameters["PreloadConnections"]);
Aetherflow.Param["GlobalContainer"] = Aetherflow.Parameters["PreloadGlobal"].length > 0 ? JSON.parse(Aetherflow.Parameters["PreloadGlobal"]) : {};
Aetherflow.Param["MapContainers"] = Aetherflow.Parameters["PreloadMaps"].length > 0 ? JSON.parse(Aetherflow.Parameters["PreloadMaps"]) : {};
Aetherflow.Param["ImageCacheSize"] = Number(eval(Aetherflow.Parameters["ImageCacheSize"])) || 10 * 1000 * 1000;
Aetherflow.Param["AudioCacheSize"] = Number(eval(Aetherflow.Parameters["AudioCacheSize"])) || 20 *1000 * 1000;

// Parse the actual data into the Preload Object for referencing easier.
Aetherflow.Preload.GlobalContainer = PluginManager.parseObject(Aetherflow.Param.GlobalContainer);
Aetherflow.Preload.MapContainers = Object.values(PluginManager.parseObject(Aetherflow.Param.MapContainers));

//=============================================================================
// End Configuration
//=============================================================================

//=============================================================================
// Game_System
//=============================================================================

Game_System.prototype.releaseGlobalContainer = function() {
    ImageManager.releaseGlobalContainer();
    AudioManager.releaseGlobalContainer();
};

//=============================================================================
// WebAudio
//=============================================================================

WebAudio.prototype.bufferSize = function() {
    return this._buffer ? this._buffer.length : null;
};

//=============================================================================
// ImageCache
//=============================================================================

Aetherflow.Preload.ImageCache_initialize = ImageCache.prototype.initialize;
ImageCache.prototype.initialize = function() {
    this._containers = {};
    Aetherflow.Preload.ImageCache_initialize.call(this);
};

ImageCache.prototype.releaseItem = function(key) {
    if (this._items[key]) {
        delete this._items[key];
        return true;
    }
    return false;
};

ImageCache.prototype.addContainer = function(container) {
    this._containers = this._containers || {};
    if (!this._containers[container]) {
        this._containers[container] = [];
    }
};

ImageCache.prototype.addContainerItem = function(container, itemKey) {
    if (this._containers[container]) {
        this._containers[container].push(itemKey);
    }
};

ImageCache.prototype.releaseContainer = function(container) {
    if (!this._containers) this._containers = {};
    if (!this._containers[container]) return false;
    for (let key of this._containers[container]) {
        this.releaseItem(key);
    }
    delete this._containers[container];
    return true;
};

ImageCache.prototype.releaseContainerItem = function(container, itemKey) {
    if (!this._container) this._containers = {};
    if (!this._containers[container]) return false;
    let index = this._containers[container].indexOf(itemKey);
    if (index >= 0) {
        this._containers[container].splice(index, 1);
        return this.releaseItem(itemKey);
    }
    return false;
};

//=============================================================================
// ImageManager
//=============================================================================

ImageManager.addContainer = function(container) {
    return this._imageCache.addContainer(container);
};

ImageManager.addContainerItem = function(container, key) {
    return this._imageCache.addContainerItem(container,key);
};

ImageManager.releaseItem = function(img, hue) {
    let key = this._generateCacheKey(img, hue);
    return this._imageCache.releaseItem(key);
};

ImageManager.releaseContainer = function(container) {
    return this._imageCache.releaseContainer(container);
};

ImageManager.releaseContainerItem = function(container, img, hue) {
    let key = this._generateCacheKey(img, hue);
    return this._imageCache.releaseContainerItem(container, key);
};

ImageManager.releaseGlobalContainer = function() {
    return this.releaseContainer("global");
};

//=============================================================================
// AudioCache
//=============================================================================

function AudioCache() {
    this.initialize.apply(this, arguments);
}

AudioCache.maxSize = Aetherflow.Param["AudioCacheSize"];

AudioCache.prototype.initialize = function() {
    this._items = {};
    this._containers = {};
};

AudioCache.prototype.add = function(key, value) {
    this._items[key] = {
        buffer: value,
        touch: Date.now(),
        key: key
    };
    this.truncateCache();
};

AudioCache.prototype.get = function(key) {
    if (this._items[key]) {
        let item = this._items[key];
        item.touch = Date.now();
        return item.buffer;
    }
    return null;
};

AudioCache.prototype.releaseItem = function(key) {
    if (this._items[key]) {
        delete this._items[key];
        return true;
    }
    return false;
};

AudioCache.prototype.addContainer = function(container) {
    this._containers = this._containers || {};
    if (!this._containers[container]) {
        this._containers[container] = [];
    }
};

AudioCache.prototype.addContainerItem = function(container, itemKey) {
    if (this._containers[container]) {
        this._containers[container].push(itemKey);
    }
};

AudioCache.prototype.releaseContainer = function(container) {
    if (!this._containers) this._containers = {};
    if (!this._container[container]) return false;
    for (let key of this._containers[container]) {
        this.releaseItem(key);
    }
    delete this._containers[container];
    return true;
};

AudioCache.prototype.releaseContainerItem = function(container, itemKey) {
    if (!this._containers) this._containers = {};
    if (!this._containers[container]) return false;
    let index = this._containers[container].indexOf(itemKey);
    if (index >= 0) {
        this._containers[container].splice(index, 1);
        return this.releaseItem(itemKey);
    }
    return false;
};

AudioCache.prototype.reserve = function(key, value, reservationId) {
    if (!this._items[key]) {
        this._items[key] = {
            buffer: value,
            touch: Date.now(),
            key: key
        };
    }
    this._items[key].reservationId = reservationId;
};

AudioCache.prototype.releaseReservation = function(reservationId) {
    let items = this._items;
    let release = false;
    Object.keys(items).map(function(key) {
        return items[key];
    }).forEach(function(item){
        if (item.reservationId === reservationId)
            release = true;
            delete item.reservationId;
    });
    return release;
};

AudioCache.prototype.truncateCache = function() {
    let items = this._items;
    let sizeLeft = AudioCache.maxSize;
    Object.keys(items).map(function(key){
        return items[key];
    }).sort(function(a, b){
        return b.touch - a.touch;
    }).forEach(function(item){
        if (sizeLeft > 0 || this.mustBeHeld(item)) {
            sizeLeft -= item.buffer.bufferSize() ? item.buffer.bufferSize() : 0; // If buffer isn't available than it isn't loaded.
        } else {
            delete items[item.key];
        }
    }.bind(this));
};

AudioCache.prototype.mustBeHeld = function(item) {
    if (item.reservationId) return true;
    if (!item.buffer.isReady()) return true;
    return false;
};

AudioCache.prototype.isReady = function() {
    let items = this._items;
    return !Object.keys(items).some(function(key){
        return !items[key].buffer.isReady();
    });
};

//=============================================================================
// AudioManager
//=============================================================================

AudioManager._cache = new AudioCache();
AudioManager._systemReservationId = Utils.generateRuntimeId();
AudioManager._defaultReservationId = "default";

AudioManager._generateCacheKey = function(path) {
    return path;
};

AudioManager.clear = function() {
    this._cache = new AudioCache();
};

AudioManager.isReady = function() {
    return this._cache.isReady();
};

AudioManager.setDefaultReservationid = function(reservationId) {
    this._defaultReservationId = reservationId;
};

AudioManager.addContainer = function(container) {
    return this._cache.addContainer(container);
};

AudioManager.addContainerItem = function(container, itemKey) {
    return this._cache.addContainerItem(container, itemKey);
};

AudioManager.loadBgm = function(filename) {
    let path = this._path + "bgm/" + encodeURIComponent(filename) + this.audioFileExt();
    return this.loadAudio(path);
};

AudioManager.loadBgs = function(filename) {
    let path = this._path + "bgs/" + encodeURIComponent(filename) + this.audioFileExt();
    return this.loadAudio(path);
};

AudioManager.loadSe = function(filename) {
    let path = this._path + "se/" + encodeURIComponent(filename) + this.audioFileExt();
    return this.loadAudio(path);
};

AudioManager.loadMe = function(filename) {
    let path = this._path + "me/" + encodeURIComponent(filename) + this.audioFileExt();
    return this.loadAudio(path);
};

AudioManager.loadAudio = function(path) {
    let key = this._generateCacheKey(path);
    let buffer = this._cache.get(key);
    if (!buffer) {
        buffer = new WebAudio(path);
        this._cache.add(key, buffer);
    }
    return buffer;
};

AudioManager.reserveBgm = function(filename, reservationId) {
    return this.reserveAudio("bgm/", filename, reservationId);
};

AudioManager.reserveBgs = function(filename, reservationId) {
    return this.reserveAudio("bgs/", filename, reservationId);
};

AudioManager.reserveSe = function(filename, reservationId) {
    return this.reserveAudio("se/", filename, reservationId);
};

AudioManager.reserveMe = function(filename, reservationId) {
    return this.reserveAudio("me/", filename, reservationId);
};

AudioManager.reserveAudio = function(folder, filename, reservationId) {
    if (filename) {
        let path = this._path + folder + encodeURIComponent(filename) +  this.audioFileExt();
        let buffer = new WebAudio(path);
        this._cache.reserve(this._generateCacheKey(path), buffer, reservationId || this._defaultReservationId);
        return buffer;
    } else {
        return null;
    }
};

AudioManager.releaseItem = function(key) {
    return this._cache.releaseItem(key);
};

AudioManager.releaseContainer = function(container) {
    return this._cache.releaseContainer(container);
};

AudioManager.releaseContainerItem = function(container, key) {
    return this._cache.releaseContainerItem(container, key);
};

AudioManager.releaseReservation = function(reservationId) {
   return this._cache.releaseReservation(reservationId);
};

AudioManager.releaseGlobalContainer = function() {
    return this.releaseContainer("global");
};

AudioManager.playBgm = function(bgm, pos) {
    if (this.isCurrentBgm(bgm)) {
        this.updateBgmParameters(bgm);
    } else {
        this.stopBgm();
        if (bgm.name) {
            if(Decrypter.hasEncryptedAudio && this.shouldUseHtml5Audio()){
                this.playEncryptedBgm(bgm, pos);
            }
            else {
                this._bgmBuffer = this.loadBgm(bgm.name);
                this.updateBgmParameters(bgm);
                if (!this._meBuffer) {
                    this._bgmBuffer.play(true, pos || 0);
                }
            }
        }
    }
    this.updateCurrentBgm(bgm, pos);
};

AudioManager.playBgs = function(bgs, pos) {
    if (this.isCurrentBgs(bgs)) {
        this.updateBgsParameters(bgs);
    } else {
        this.stopBgs();
        if (bgs.name) {
            this._bgsBuffer = this.loadBgs(bgs.name);
            this.updateBgsParameters(bgs);
            this._bgsBuffer.play(true, pos || 0);
        }
    }
    this.updateCurrentBgs(bgs, pos);
};

AudioManager.playSe = function(se) {
    if (se.name) {
        this._seBuffers = this._seBuffers.filter(function(audio) {
            return audio.isPlaying();
        });
        let buffer = this.loadSe(se.name);
        this.updateSeParameters(buffer, se);
        buffer.play(false);
        this._seBuffers.push(buffer);
    }
};

AudioManager.playMe = function(me) {
    this.stopMe();
    if (me.name) {
        if (this._bgmBuffer && this._currentBgm) {
            this._currentBgm.pos = this._bgmBuffer.seek();
            this._bgmBuffer.stop();
        }
        this._meBuffer = this.loadMe(me.name);
        this.updateMeParameters(me);
        this._meBuffer.play(false);
        this._meBuffer.addStopListener(this.stopMe.bind(this));
    }
};

//=============================================================================
// DataManager
//=============================================================================

Aetherflow.Preload.DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function(object) {
    Aetherflow.Preload.DataManager_onLoad.call(this, object);
    if (object === $dataSystem) {
        Scene_Boot.loadSystemAudio();
        Scene_Boot.loadGlobalContainer();
    }
};

//=============================================================================
// Scene_Base
//=============================================================================

Aetherflow.Preload.Scene_Base_isReady = Scene_Base.prototype.isReady;
Scene_Base.prototype.isReady = function() {
    return Aetherflow.Preload.Scene_Base_isReady.call(this) && AudioManager.isReady();
};

//=============================================================================
// Scene_Boot
//=============================================================================

Scene_Boot.loadSystemAudio = function() {
    if (Aetherflow.Param.PreloadSystem === true) {
        AudioManager.reserveBgm($dataSystem.airship.bgm.name, AudioManager._systemReservationId);
        AudioManager.reserveBgm($dataSystem.battleBgm.name, AudioManager._systemReservationId);
        AudioManager.reserveBgm($dataSystem.boat.bgm.name, AudioManager._systemReservationId);
        AudioManager.reserveBgm($dataSystem.ship.bgm.name, AudioManager._systemReservationId);
        AudioManager.reserveBgm($dataSystem.titleBgm.name, AudioManager._systemReservationId);
        AudioManager.reserveMe($dataSystem.gameoverMe.name, AudioManager._systemReservationId);
        AudioManager.reserveMe($dataSystem.defeatMe.name, AudioManager._systemReservationId);
        AudioManager.reserveMe($dataSystem.victoryMe.name, AudioManager._systemReservationId);

        $dataSystem.sounds.forEach(function(sound){
            AudioManager.reserveSe(sound.name, AudioManager._systemReservationId);
        });
    }
};

Scene_Boot.loadGlobalContainer = function() {
    if (Aetherflow.Preload.GlobalContainer) {
        ImageManager.addContainer("global");
        AudioManager.addContainer("global");
        let images = Aetherflow.Preload.GlobalContainer.Images;
        if (images) {
            for (let image of images) {
                let folder = image.split('/')[0] + "/";
                let file = image.split('/')[1];
                let path = "img/" + folder;
                ImageManager.reserveBitmap(path, file, 0, true);
                ImageManager.addContainerItem("global", ImageManager._generateCacheKey(path, 0));
            }
        }
        let sounds = Aetherflow.Preload.GlobalContainer.Audio;
        if (sounds) {
            for (let sound of sounds) {
                let folder = sound.split('/')[0] + "/";
                let file = sound.split('/')[1];
                let path = "audio/" + folder + encodeURIComponent(file) + AudioManager.audioFileExt();
                AudioManager.reserveAudio(folder, file);
                AudioManager.addContainerItem("global", AudioManager._generateCacheKey(path));
            }
        }
    }
};



//=============================================================================
// Scene_Map
//=============================================================================

Scene_Map.prototype.releaseAssets = function() {
    let container = Aetherflow.Preload.MapContainers.find(function(element){
        return element.MapId === $gameMap.mapId();
    });
    if (container) {
        if (container.Images && container.Images.length > 0) {
            let images = container.Images;
            for (let image of images) {
                let folder = image.split('/')[0];
                let file = image.split('/')[1];
                let path = "img/" + folder + "/" + encodeURIComponent(file) + ".png";
                ImageManager.releaseItem(path, 0);
            }
        }
        if (container.Audio && container.Audio.length > 0) {
            let sounds = container.Audio;
            for (let sound of sounds) {
                let folder = sound.split('/')[0];
                let file = sound.split('/')[1];
                AudioManager.releaseItem("audio/" + folder + "/" + encodeURIComponent(file) + AudioManager.audioFileExt());
            }
        }
    }
};

Scene_Map.prototype.preloadAssets = function() {
    let container = Aetherflow.Preload.MapContainers.find(function(element) {
        return element.MapId === $gameMap.mapId();
    });
    if (container) {
        let images = container.Images;
        if (images) {
            for (let image of images) {
                let folder = image.split('/')[0] + "/";
                let file = image.split('/')[1];
                let path = "img/" + folder + "/" + encodeURIComponent(file) + ".png";
                ImageManager.reserveNormalBitmap(path, 0, ImageManager._defaultReservationId);
            }
        }
        let sounds = container.Audio;
        if (sounds) {
            for (let sound of sounds) {
                let folder = sound.split('/')[0] + "/";
                let file = sound.split('/')[1];
                AudioManager.reserveAudio(folder, file, AudioManager._defaultReservationId);
            }
        }
    }
};

Aetherflow.Preload.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    this.releaseAssets();
    Aetherflow.Preload.Scene_Map_onMapLoaded.call(this);
    this.preloadAssets();
};

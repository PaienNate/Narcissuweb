//=============================================================================
// Yanfly Engine Plugins - Call Event
// YEP_CallEvent.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CallEvent = true;

var Yanfly = Yanfly || {};
Yanfly.CallEvent = Yanfly.CallEvent || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 调用事件
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这是来自RPG Maker 2000和 RPG Maker 2003的一个方法的重制。这允许去调用
 * 事件页内的事件。这些被调用的事件可以使任何地图上的任何事件
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * To call upon events from the current map or a different map, use the plugin
 * commands found below:插件参数
 *
 *   Plugin Commands:
 *
 *   CallEvent x
 *   - This will call upon event x from the current map and use the event list
 *   from the first page of the event.调用初始地图事件
 *
 *   CallEvent x, Page y
 *   - This will call upon event x from the current map and use the event list
 *   from page y of the event.调用初始地图事件的特点页
 *
 *   CallEvent x, Map y
 *   - This will call upon event x from map y and use the event list from the
 *   first page of the event.调用指定地图的事件
 *
 *   CallEvent x, Page y, Map z
 *   - This will call upon event x from map z and use the event list from
 *   page y of the event.调用指定地图的事件的特点页
 *
 *   CallEvent x, Map y, Page z
 *   - This will call upon event x from map y and use the event list from
 *   page z of the event.调用指定地图的事件的特点页
 *
 * 注意1：由于RPG Maker MV的运行结构的问题，调用事件也许不会立即执行，这
 * 取决于所需载入地图的大小，也许会花费几帧来载入
 *
 * 注意2：如果任何事件、事件页或者地图不存在，那么事件将不会被调用，插件
 * 将会忽略就像什么都没发生。因此要谨慎选取你要调用的事件
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

var $callEventMap;

DataManager.loadCallMapData = function(mapId) {
  if (mapId > 0) {
    var filename = 'Map%1.json'.format(mapId.padZero(3));
    this.loadDataFile('$callEventMap', filename);
  } else {
    $callEventMap = {};
    $callEventMap.data = [];
    $callEventMap.events = [];
    $callEventMap.width = 100;
    $callEventMap.height = 100;
    $callEventMap.scrollType = 3;
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.CallEvent.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.CallEvent.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'CallEvent') this.callEvent(this.argsToString(args));
};

Game_Interpreter.prototype.argsToString = function(args) {
    var str = '';
    var length = args.length;
    for (var i = 0; i < length; ++i) {
      str += args[i] + ' ';
    }
    return str.trim();
};

Game_Interpreter.prototype.callEvent = function(line) {
  if (this._callEvent_Running) return this.processCallEvent();
  if (line.match(/(\d+),[ ](.*)/i)) {
    var eventId = parseInt(RegExp.$1);
    var line = String(RegExp.$2);
    if (line.match(/PAGE[ ](\d+)/i)) {
      var pageId = parseInt(RegExp.$1);
    } else {
      var pageId = 1;
    }
    if (line.match(/MAP[ ](\d+)/i)) {
      var mapId = parseInt(RegExp.$1);
    } else {
      var mapId = $gameMap.mapId();
    }
  } else {
    var eventId = parseInt(line);
    if (!eventId) return;
    var pageId = 1;
    var mapId = $gameMap.mapId();
  }
  $callEventMap = undefined;
  DataManager.loadCallMapData(mapId);
  this._callEvent_EventId = eventId;
  this._callEvent_PageId = pageId;
  this._callEvent_Running = true;
  this.processCallEvent();
};

Game_Interpreter.prototype.processCallEvent = function() {
  if ($callEventMap) {
    this.insertCallEventData(this._callEvent_EventId, this._callEvent_PageId);
  } else {
    this.wait(1);
    this._index--;
  }
};

Game_Interpreter.prototype.insertCallEventData = function(eventId, pageId) {
  this._callEvent_Running = false;
  var ev = $callEventMap.events[eventId];
  if (!ev) return;
  var page = ev.pages[pageId - 1];
  if (!page) return;
  var list = page.list;
  this.setupChild(list, this.eventId());
};

//=============================================================================
// End of File
//=============================================================================

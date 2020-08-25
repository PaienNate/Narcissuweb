//=============================================================================
// Yanfly Engine Plugins - Stop Map Movement
// YEP_StopMapMovement.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_StopMapMovement = true;

var Yanfly = Yanfly || {};
Yanfly.Stop = Yanfly.Stop || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 停止地图移动
 * @author Yanfly Engine Plugins
 *
 * @param Stop During Events
 * @desc Stop automatic movement during events?
 * NO - false     YES - true
 * @default true
 *
 * @param Stop During Message
 * @desc Stop automatic movement during message displaying?
 * NO - false     YES - true
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 有个来自RM2000和RM2003的功能，就是停止事件移动事件。这个事件组织事件的自
 * 动移动，可以让事件不会干扰到截图，对话时捕捉玩家等。
 *
 * 这个插件重塑了这些特点
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * 你可以用下面的插件命令来设置:
 *
 * Plugin Command
 *
 *   StopEventMovement
 *   停止事件事件自动移动，你仍然可以设置事件移动路线来让其移动
 *
 *   AllowEventMovement
 *   允许事件自动移动。如果你用插件参数关闭了事件移动，他们不会动
 *
 *   StopPlayerMovement
 *   停止玩家移动，你可以移动通过设置移动路径来使其移动
 *
 *   AllowPlayerMovement
 *   允许玩家移动
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Optimized updating performance to reduce lag on maps with many events.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_StopMapMovement');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.StopEvent = eval(String(Yanfly.Parameters['Stop During Events']));
Yanfly.Param.StopMsg = eval(String(Yanfly.Parameters['Stop During Message']));

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.stopMapEventMovement = function() {
    this._stopMapEvents = true;
};

Game_Temp.prototype.stopMapPlayerMovement = function() {
    this._stopMapPlayer = true;
};

Game_Temp.prototype.allowMapEventMovement = function() {
    this._stopMapEvents = false;
};

Game_Temp.prototype.allowMapPlayerMovement = function() {
    this._stopMapPlayer = false;
};

Game_Temp.prototype.isStopMapEventMovement = function() {
    return this._stopMapEvents;
};

Game_Temp.prototype.isStopMapPlayerMovement = function() {
    return this._stopMapPlayer;
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.Stop.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if ($gameTemp.isStopMapPlayerMovement()) return false;
    return Yanfly.Stop.Game_Player_canMove.call(this);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.Stop.Game_Event_updateSelfMovement =
    Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if (this.preventSelfMovement()) return;
    Yanfly.Stop.Game_Event_updateSelfMovement.call(this);
};

Game_Event.prototype.preventSelfMovement = function() {
    if (this._moveType === 0) return true;
    if ($gameTemp.isStopMapEventMovement()) return true;
    if (Yanfly.Param.StopMsg && $gameMessage.isBusy()) return true;
    if (Yanfly.Param.StopEvent && $gameMap.isEventRunQuick()) return true;
    return false;
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.isEventRunQuick = function() {
    return this._interpreter.isRunning() || this.isAnyEventStartingQuick();
};

Game_Map.prototype.isAnyEventStartingQuick = function() {
    var max = this._events.length;
    for (var i = 0; i < max; ++i) {
      var ev = this._events[i];
      if (ev && ev.isStarting()) return true;
    }
    return false;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Stop.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Stop.Game_Interpreter_pluginCommand.call(this, command, args)
  if (command === 'StopEventMovement') $gameTemp.stopMapEventMovement();
  if (command === 'AllowEventMovement') $gameTemp.allowMapEventMovement();
  if (command === 'StopPlayerMovement') $gameTemp.stopMapPlayerMovement();
  if (command === 'AllowPlayerMovement') $gameTemp.allowMapPlayerMovement();
};

//=============================================================================
// End of File
//=============================================================================

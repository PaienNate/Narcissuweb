//=============================================================================
// Yanfly Engine Plugins - Self Switches & Variables
// YEP_SelfSwVar.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SelfSwVar = true;

var Yanfly = Yanfly || {};
Yanfly.SSV = Yanfly.SSV || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 独立开关和变量
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV拥有独立开关功能。可是，独立开关仅仅提供了4个，对于许多复杂的
 * 事件并不够用。这个插件可以让你拓展独立开关的数量。独立变量实际上并不存在
 * ，因此这个插件提供了类似的功能
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * 为了设置自定义独立开关和变量，你需要先做下面的几件事
 *
 *   1. 打开你的开关和变量编辑器
 *   2. 在开关前面加‘Self Sw’，在变量前面加 ‘Self Var’
 *      - or -
 *      Name the Variable to have 'Self Var' in its name.
 *
 * 现在你可以使用下面的事件命令了，如果独立开关和变量被强制打开，那么他会替
 * 代之前的开关和变量
 *
 *   Self Switches:
 *     - Control Switches
 *     - Conditional Branch
 *     - Set Movement Route (Switch ON/Switch Off)
 *
 *   Self Variables:
 *     - Show Text (using the \v[x] codes)
 *     - Input Number
 *     - Select Item
 *     - Control Variables
 *     - Conditional Branch
 *     - Change Gold
 *     - Change Items
 *     - Change Weapons
 *     - Change Armors
 *     - Change HP
 *     - Change MP
 *     - Change TP
 *     - Recover All
 *     - Change EXP
 *     - Change Level
 *     - Change Parameter
 *     - Change Skill
 *     - Change Equipment
 *     - Change Enemy HP
 *     - Change Enemy MP
 *     - Change Enemy TP
 *     - Transfer Player
 *     - Set Vehicle Location
 *     - Set Event Location
 *     - Show Picture
 *     - Move Picture
 *     - Get Location Info
 *
 * 注意不是所有的插件使用都可以适配自定义开关和变量，下面是YEP插件里面可以适
 * 配的
 *
 *   - YEP_EventMiniLabel
 *   - YEP_MapSelectSkill
 *
 * 非Yanfly引擎的插件可能适配也可能不适配
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * 想微调独立开关和变量的可以使用下面的插件命令:
 *
 * Plugin Commands:
 *
 *   SelfSwitch Map x, Event y, Switch z to true
 *   SelfSwitch Map x, Event y, Switch z to false
 *   SelfSwitch Map x, Event y, Switch z to code
 *   - This will change the Self Switch used for map 'x', event 'y', and
 *   switch 'z' to the value of 'code' value. You can replace 'code' with a
 *   'true' or 'false' value or a piece of code like '$gameSwitches.value(4)'.
 *   这会改变独立开关z在地图x，事件y里面的值
 *   SelfVariable Map x, Event y, Variable z to 12345
 *   SelfVariable Map x, Event y, Variable z to value + 100
 *   SelfVariable Map x, Event y, Variable z to code
 *   - This will change the Self Variable used for map 'x', event 'y', and
 *   switch 'z' to the value of 'code' value. You can replace 'code' with a
 *   number like '12345', a calculation using 'value' (the current value of the
 *   Self Variable), or a piece of code like '$gameVariables.value(4)'.
 *   这会改变独立变量z在地图x，事件y里面的值
 * ============================================================================
 * Lunatic Mode - Script Calls
 * ============================================================================
 *
 * 对于那些想要从代码里改变独立开关和变量值得人，可以使用下面的脚本命令
 *
 * Script Call:
 *     获得独立开关值
 *   this.getSelfSwitchValue(mapId, eventId, switchId)
 *   - Replace mapId with the map ID the event exists on. Replace eventId with
 *   the ID of the event. And replace the switchId with the ID of the switch.
 *   This will get the true/false value of that event's self switch.
 *
 *   this.getSelfVariableValue(mapId, eventId, varId)  获得独立变量值
 *   - Replace mapId with the map ID the event exists on. Replace eventId with
 *   the ID of the event. And replace the varId with the ID of the variable.
 *   This will get the value of that event's self variable.
 *
 *   this.setSelfSwitchValue(mapId, eventId, switchId, true)
 *   this.setSelfSwitchValue(mapId, eventId, switchId, false)  
 *   打开或者关闭独立开关
 *   - Replace mapId with the map ID the event exists on. Replace eventId with
 *   the ID of the event. And replace the switchId with the ID of the switch.
 *   This will set that self switch to true or false.
 *
 *   this.getSelfVariableValue(mapId, eventId, varId, value)
 *   设置独立变量的值
 *   - Replace mapId with the map ID the event exists on. Replace eventId with
 *   the ID of the event. And replace the varId with the ID of the variable.
 *   This will set that self variable to the value inserted.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Fixed a conflict that made self variables not work properly with the Input
 * Number event, select item event while a parallel process has a variable
 * being changed in the background.
 * - Added Self-Variable support for Transfer Player, Set Vehicle Location, Set
 * Event Location, Show Picture, Move Picture, and Get Location Info events.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

DataManager.isSelfSwitch = function(switchId) {
  var sw = $dataSystem.switches[switchId];
  return sw && sw.match(/SELF[ ]SW/i);
};

DataManager.isSelfVariable = function(variableId) {
  var va = $dataSystem.variables[variableId];
  return va && va.match(/SELF[ ]VAR/i);
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.getSelfSwVarEvent = function() {
  return this._selfSwVarEvent;
};

Game_Temp.prototype.setSelfSwVarEvent = function(mapId, eventId) {
  this._selfSwVarEvent = [mapId, eventId];
};

Game_Temp.prototype.clearSelfSwVarEvent = function() {
  this._selfSwVarEvent = undefined;
};

Game_Temp.prototype.getSelfSwVarEvBrdge = function() {
  return this._selfSwVarEvBridge;
};

Game_Temp.prototype.setSelfSwVarEvBridge = function(mapId, eventId) {
  this.setSelfSwVarEvent(mapId, eventId);
  this._selfSwVarEvBridge = [mapId, eventId];
};

Game_Temp.prototype.clearSelfSwVarEvBridge = function() {
  this._selfSwVarEvent = this._selfSwVarEvBridge;
  this._selfSwVarEvBridge = undefined;
};

Game_Temp.prototype.getSelfSwVarEventOneTimeClear = function() {
  return this._selfSwVarEventOneTimeClear;
};

Game_Temp.prototype.setSelfSwVarEventOneTimeClear = function(value) {
  this._selfSwVarEventOneTimeClear = value;
};

Game_Temp.prototype.getPersistingSelfSwVarEvent = function() {
  return this._selfPersistingSwVarEvent;
};

Game_Temp.prototype.setPersistingSelfSwVarEvent = function(mapId, eventId) {
  this._selfPersistingSwVarEvent = [mapId, eventId];
};

Game_Temp.prototype.carryPersistingSelfSwVarEvent = function() {
  this._revertSelfSwVarEvent = this._selfSwVarEvent;
  this._selfSwVarEvent = [];
  if (!this._selfPersistingSwVarEvent) return;
  this._selfSwVarEvent.push(this._selfPersistingSwVarEvent[0]);
  this._selfSwVarEvent.push(this._selfPersistingSwVarEvent[1]);
};

Game_Temp.prototype.revertSelfSwVarEvent = function() {
  this._selfSwVarEvent = this._revertSelfSwVarEvent;
};

//=============================================================================
// Game_Character
//=============================================================================

Yanfly.SSV.Game_Character_processMoveCommand =
  Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
  if (this._mapId && this._eventId) {
    $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  }
  Yanfly.SSV.Game_Character_processMoveCommand.call(this, command);
  if (this._mapId && this._eventId) {
    $gameTemp.clearSelfSwVarEvent();
  }
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.SSV.Game_Event_meetsConditions = Game_Event.prototype.meetsConditions;
Game_Event.prototype.meetsConditions = function(page) {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  var value = Yanfly.SSV.Game_Event_meetsConditions.call(this, page);
  $gameTemp.clearSelfSwVarEvent();
  return value;
};

//=============================================================================
// Game_Switches
//=============================================================================

Yanfly.SSV.Game_Switches_value = Game_Switches.prototype.value;
Game_Switches.prototype.value = function(switchId) {
  if (DataManager.isSelfSwitch(switchId) && $gameTemp.getSelfSwVarEvent()) {
    var mapId = $gameTemp.getSelfSwVarEvent()[0];
    var eventId = $gameTemp.getSelfSwVarEvent()[1];
    var switchId = 'SELF SWITCH ' + switchId;
    var key = [mapId, eventId, switchId];
    return $gameSelfSwitches.value(key);
  } else {
    return Yanfly.SSV.Game_Switches_value.call(this, switchId);
  }
};

Yanfly.SSV.Game_Switches_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
  if (switchId <= 0) return;
  if (DataManager.isSelfSwitch(switchId) && $gameTemp.getSelfSwVarEvent()) {
    var mapId = $gameTemp.getSelfSwVarEvent()[0];
    var eventId = $gameTemp.getSelfSwVarEvent()[1];
    var switchId = 'SELF SWITCH ' + switchId;
    var key = [mapId, eventId, switchId];
    $gameSelfSwitches.setValue(key, value);
  } else {
    Yanfly.SSV.Game_Switches_setValue.call(this, switchId, value);
  }
};

//=============================================================================
// Game_Variables
//=============================================================================

Yanfly.SSV.Game_Variables_value = Game_Variables.prototype.value;
Game_Variables.prototype.value = function(variableId) {
  if (DataManager.isSelfVariable(variableId) && $gameTemp.getSelfSwVarEvent()) {
    var mapId = $gameTemp.getSelfSwVarEvent()[0];
    var eventId = $gameTemp.getSelfSwVarEvent()[1];
    var variableId = 'SELF VARIABLE ' + variableId;
    var key = [mapId, eventId, variableId];
    return $gameSelfSwitches.value(key);
  } else {
    return Yanfly.SSV.Game_Variables_value.call(this, variableId);
  }
};

Yanfly.SSV.Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
  if (variableId <= 0) return;
  if (DataManager.isSelfVariable(variableId) && $gameTemp.getSelfSwVarEvent()) {
    var mapId = $gameTemp.getSelfSwVarEvent()[0];
    var eventId = $gameTemp.getSelfSwVarEvent()[1];
    var variableId = 'SELF VARIABLE ' + variableId;
    var key = [mapId, eventId, variableId];
    $gameSelfSwitches.setValue(key, value);
  } else {
    Yanfly.SSV.Game_Variables_setValue.call(this, variableId, value);
  }
};

//=============================================================================
// Game_SelfSwitches
//=============================================================================

Yanfly.SSV.Game_SelfSwitches_value = Game_SelfSwitches.prototype.value;
Game_SelfSwitches.prototype.value = function(key) {
  if (key[2].match(/SELF[ ]VAR/i)) {
    this._data[key] = this._data[key] || 0;
    return this._data[key];
  }
  return Yanfly.SSV.Game_SelfSwitches_value.call(this, key);
};

Yanfly.SSV.Game_SelfSwitches_setValue = Game_SelfSwitches.prototype.setValue;
Game_SelfSwitches.prototype.setValue = function(key, value) {
  if (key[2].match(/SELF[ ]VAR/i)) {
    this._data[key] = value;
    this.onChange();
  } else {
    Yanfly.SSV.Game_SelfSwitches_setValue.call(this, key, value)
  }
};

Yanfly.SSV.Game_SelfSwitches_onChange = Game_SelfSwitches.prototype.onChange;
Game_SelfSwitches.prototype.onChange = function() {
  Yanfly.SSV.Game_SelfSwitches_onChange.call(this);
  if ($gameTemp.getSelfSwVarEventOneTimeClear()) {
    $gameTemp.setSelfSwVarEventOneTimeClear(false);
    $gameTemp.clearSelfSwVarEvent();
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Show Text
Yanfly.SSV.Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function() {
  $gameTemp.setPersistingSelfSwVarEvent(this._mapId, this._eventId);
  return Yanfly.SSV.Game_Interpreter_command101.call(this);
};

// Select Item
Yanfly.SSV.Game_Interpreter_command104 = Game_Interpreter.prototype.command104;
Game_Interpreter.prototype.command104 = function() {
  $gameTemp.setSelfSwVarEventOneTimeClear(true);
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  return Yanfly.SSV.Game_Interpreter_command104.call(this);
};

// Conditional Branch
Yanfly.SSV.Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command111.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Control Switches
Yanfly.SSV.Game_Interpreter_command121 = Game_Interpreter.prototype.command121;
Game_Interpreter.prototype.command121 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command121.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Control Variables
Yanfly.SSV.Game_Interpreter_command122 = Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command122.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Transfer Player
Yanfly.SSV.Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
Game_Interpreter.prototype.command201 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command201.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return false;
};

// Set Vehicle Location
Yanfly.SSV.Game_Interpreter_command202 = Game_Interpreter.prototype.command202;
Game_Interpreter.prototype.command202 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command202.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Set Event Location
Yanfly.SSV.Game_Interpreter_command203 = Game_Interpreter.prototype.command203;
Game_Interpreter.prototype.command203 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command203.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Show Picture
Yanfly.SSV.Game_Interpreter_command231 = Game_Interpreter.prototype.command231;
Game_Interpreter.prototype.command231 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command231.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Move Picture
Yanfly.SSV.Game_Interpreter_command232 = Game_Interpreter.prototype.command232;
Game_Interpreter.prototype.command232 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command232.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

// Get Location Info
Yanfly.SSV.Game_Interpreter_command285 = Game_Interpreter.prototype.command285;
Game_Interpreter.prototype.command285 = function() {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_command285.call(this);
  $gameTemp.clearSelfSwVarEvent();
  return true;
};

Yanfly.SSV.Game_Interpreter_operateValue =
  Game_Interpreter.prototype.operateValue;
Game_Interpreter.prototype.operateValue = function(op1, type, op2) {
  $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  value = Yanfly.SSV.Game_Interpreter_operateValue.call(this, op1, type, op2);
  $gameTemp.clearSelfSwVarEvent();
  return value;
};

Yanfly.SSV.Game_Interpreter_setupItemChoice =
  Game_Interpreter.prototype.setupItemChoice;
Game_Interpreter.prototype.setupItemChoice = function(params) {
  $gameTemp.setSelfSwVarEvBridge(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_setupItemChoice.call(this, params);
};

Yanfly.SSV.Game_Interpreter_setupNumInput =
  Game_Interpreter.prototype.setupNumInput;
Game_Interpreter.prototype.setupNumInput = function(params) {
  $gameTemp.setSelfSwVarEvBridge(this._mapId, this._eventId);
  Yanfly.SSV.Game_Interpreter_setupNumInput.call(this, params);
};

Yanfly.SSV.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.SSV.Game_Interpreter_pluginCommand.call(this, command, args);
  // Compatibility Update
  if (command === 'MapSelectSkill') {
    $gameTemp.setSelfSwVarEventOneTimeClear(true);
    $gameTemp.setSelfSwVarEvBridge(this._mapId, this._eventId);
  // SelfSwitch
  } else if (command === 'SelfSwitch') {
    var line = this.argsToString(args);
    this.adjustSelfSwitch(line);
  // SelfVariable
  } else if (command === 'SelfVariable') {
    var line = this.argsToString(args);
    this.adjustSelfVariable(line);
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
    var str = '';
    var length = args.length;
    for (var i = 0; i < length; ++i) {
      str += args[i] + ' ';
    }
    return str.trim();
};

Game_Interpreter.prototype.adjustSelfSwitch = function(line) {
  var eventId;
  var switchId;
  if (line.match(/(.*)[ ]TO[ ](.*)/i)) {
    var data = String(RegExp.$1);
    var code = String(RegExp.$2).trim();
  } else {
    return;
  }
  if (line.match(/EVENT[ ](\d+)/i)) eventId = parseInt(RegExp.$1);
  if (eventId === undefined) return;
  if (line.match(/MAP[ ](\d+)/i)) mapId = parseInt(RegExp.$1);
  if (mapId === undefined) return;
  if (line.match(/SWITCH[ ](\d+)/i)) switchId = parseInt(RegExp.$1);
  if (switchId === undefined) return;
  if (!DataManager.isSelfSwitch(switchId)) return;
  var key = [mapId, eventId, 'SELF SWITCH ' + switchId];
  var value = $gameSelfSwitches.value(key);
  value = eval(code);
  $gameSelfSwitches.setValue(key, value);
};

Game_Interpreter.prototype.adjustSelfVariable = function(line) {
  var eventId;
  var varId;
  if (line.match(/(.*)[ ]TO[ ](.*)/i)) {
    var data = String(RegExp.$1);
    var code = String(RegExp.$2).trim();
  } else {
    return;
  }
  if (line.match(/EVENT[ ](\d+)/i)) eventId = parseInt(RegExp.$1);
  if (eventId === undefined) return;
  if (line.match(/MAP[ ](\d+)/i)) mapId = parseInt(RegExp.$1);
  if (mapId === undefined) return;
  if (line.match(/VARIABLE[ ](\d+)/i)) varId = parseInt(RegExp.$1);
  if (varId === undefined) return;
  if (!DataManager.isSelfVariable(varId)) return;
  var key = [mapId, eventId, 'SELF VARIABLE ' + varId];
  var value = $gameSelfSwitches.value(key);
  value = eval(code);
  $gameSelfSwitches.setValue(key, value);
};

// New Script Calls

Game_Interpreter.prototype.getSelfSwitchValue = function(mapId, eventId, id) {
  var key = [mapId, eventId, 'SELF SWITCH ' + id];
  return $gameSelfSwitches.value(key);
};

Game_Interpreter.prototype.getSelfVariableValue = function(mapId, eventId, id) {
  var key = [mapId, eventId, 'SELF VARIABLE ' + id];
  return $gameSelfSwitches.value(key);
};

Game_Interpreter.prototype.setSelfSwitchValue = function(m, e, id, value) {
  var key = [m, e, 'SELF SWITCH ' + id];
  $gameSelfSwitches.setValue(key, value);
};

Game_Interpreter.prototype.setSelfVariableValue = function(m, e, id, value) {
  var key = [m, e, 'SELF VARIABLE ' + id];
  $gameSelfSwitches.setValue(key, value);
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.SSV.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
  $gameTemp.carryPersistingSelfSwVarEvent();
  Yanfly.SSV.Window_Message_startMessage.call(this);
  $gameTemp.revertSelfSwVarEvent();
};

//=============================================================================
// Window_NumberInput
//=============================================================================

Yanfly.SSV.Window_NumberInput_processOk =
  Window_NumberInput.prototype.processOk;
Window_NumberInput.prototype.processOk = function() {
  $gameTemp.clearSelfSwVarEvBridge();
  Yanfly.SSV.Window_NumberInput_processOk.call(this);
  $gameTemp.clearSelfSwVarEvent();
};

//=============================================================================
// Window_EventItem
//=============================================================================

Yanfly.SSV.Window_EventItem_onOk = Window_EventItem.prototype.onOk;
Window_EventItem.prototype.onOk = function() {
  $gameTemp.clearSelfSwVarEvBridge();
  Yanfly.SSV.Window_EventItem_onOk.call(this);
  $gameTemp.clearSelfSwVarEvent();
};

//=============================================================================
// End of File
//=============================================================================

//=============================================================================
// Yanfly Engine Plugins - Repel & Lure Encounters
// YEP_RepelLureEncounters.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RepelEncounters = true;

var Yanfly = Yanfly || {};
Yanfly.RepelLure = Yanfly.RepelLure || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 抵御遇敌和增强遇敌
 * @author Yanfly Engine Plugins
 *
 * @param ---Repel---
 * @default
 *
 * @param Repel Variables
 * @desc This is the variable used to prevent encounter rates.
 * Leave at 0 to not use. Insert spaces for multiple variables.
 * @default 0
 *
 * @param Repel Expire Event
 * @desc This is the ID of the common event to run when repel wears
 * off. Leave at 0 to not run a common event.
 * @default 0
 *
 * @param ---Lure---
 * @default
 *
 * @param Lure Variables
 * @desc This is the variable used to double encounter rates.
 * Leave at 0 to not use. Insert spaces for multiple variables.
 * @default 0
 *
 * @param Lure Expire Event
 * @desc This is the ID of the common event to run when lure wears
 * off. Leave at 0 to not run a common event.
 * @default 0
 *
 * @param Lure Rate
 * @desc This is the rate used to inflate the encounter steps by
 * if under the effects of lure.
 * @default 2.00
 *
 * @param Lure Flat
 * @desc This is the flat value used to decrease the encounter steps
 * if under the effects of lure.
 * @default 1
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 在MV里面，你可以选择随机遇敌或者完全不遇敌。但是如果你想制作某个系统在一
 * 定步数内可以抵制遇敌或者提高遇敌概率，这是很难得。这个插件允许你来自定义
 * 遇敌概率
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * 在这个插件参数里面，抵御变量和遇敌变量参数是绑定的。当这些变量在游戏内调
 * 整后，他们的效果也会即时调整。当变量值低于0时，他们将会自动调整为1。
 *
 * ---
 *
 * 例如，我们制作一个抵御遇敌的道具
 *
 *   1. 在插件中设置抵御遇敌变量为50
 *   2. 在数据库中建立一个道具
 *   3. 让这个道具执行公共事件
 *   4. 公共事件的效果为调整变量从50变到100
 *
 * 现在，这个玩家将会在100步以内不会遇到敌人
 *
 * ---
 *
 * 制作一个增加遇敌概率的道具
 *
 *   1. 设置插件参数里面的遇敌变量为60
 *   2. 在数据库中建立一个道具
 *   3. 让这个道具执行公共事件
 *   4. 公共事件的效果为调整变量从60变到100
 *   5. 你还可以使用插件命令来调整遇敌概率
 *
 * Now, for 100 steps, the player will encounter battles more often than if the
 * lure wasn't present.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * 如果你想在游戏中调整遇敌概率，可以使用下面的插件命令
 *
 * Plugin Commands:
 *
 *   SetLureRate x
 *   - 设置遇敌概率为x，这里x可以使用JavaScript语句
 *
 *   SetLureFlat x
 *   - 设置遇敌基础值为x，这里x可以使用JavaScript语句
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_RepelLureEncounters');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.RepelExpireEvent = Number(Yanfly.Parameters['Repel Expire Event']);
Yanfly.Param.LureExpireEvent = Number(Yanfly.Parameters['Lure Expire Event']);

Yanfly.SetupParameters = function() {
  Yanfly.Param.RepelLureVariables = {};

  var arr = String(Yanfly.Parameters['Repel Variables']).split(' ');
  for (var i = 0; i < arr.length; ++i) { arr[i] = parseInt(arr[i]) };
  Yanfly.Param.RepelLureVariables['repel'] = arr;

  var arr = String(Yanfly.Parameters['Lure Variables']).split(' ');
  for (var i = 0; i < arr.length; ++i) { arr[i] = parseInt(arr[i]) };
  Yanfly.Param.RepelLureVariables['lure'] = arr;
  Yanfly.Param.RepelLureVariables['lureRate'] =
    Number(Yanfly.Parameters['Lure Rate']);
  Yanfly.Param.RepelLureVariables['lureFlat'] =
    Number(Yanfly.Parameters['Lure Flat']);
};
Yanfly.SetupParameters();

//=============================================================================
// Game_System
//=============================================================================

Yanfly.RepelLure.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.RepelLure.Game_System_initialize.call(this);
  this.initRepelSettings();
};

Game_System.prototype.initRepelSettings = function() {
  this._lureEncounterRate = Yanfly.Param.RepelLureVariables.lureRate;
  this._lureEncounterFlat = Yanfly.Param.RepelLureVariables.lureFlat;
};

Game_System.prototype.lureEncounterRate = function() {
  if (this._lureEncounterRate === undefined) this.initRepelSettings();
  return this._lureEncounterRate;
};

Game_System.prototype.setLureEncounterRate = function(value) {
  if (this._lureEncounterRate === undefined) this.initRepelSettings();
  try {
    this._lureEncounterRate = eval(value);
  } catch (e) {
    this._lureEncounterRate = 1;
    Yanfly.Util.displayError(e, value, 'SET LURE ENCOUNTER RATE ERROR');
  }
};

Game_System.prototype.lureEncounterFlat = function() {
  if (this._lureEncounterFlat === undefined) this.initRepelSettings();
  return this._lureEncounterFlat;
};

Game_System.prototype.setLureEncounterFlat = function(value) {
  if (this._lureEncounterFlat === undefined) this.initRepelSettings();
  try {
    this._lureEncounterFlat = eval(value);
  } catch (e) {
    this._lureEncounterFlat = 1;
    Yanfly.Util.displayError(e, value, 'SET LURE ENCOUNTER FLAT ERROR');
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.RepelLure.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.RepelLure.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'SetLureRate') {
    $gameSystem.setLureEncounterRate(this.argsToString(args));
  } else if (command === 'SetLureFlat') {
    $gameSystem.setLureEncounterFlat(this.argsToString(args));
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

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.RepelLure.Game_Player_encounterProgressValue =
  Game_Player.prototype.encounterProgressValue;
Game_Player.prototype.encounterProgressValue = function() {
  var value = Yanfly.RepelLure.Game_Player_encounterProgressValue.call(this);
  if (this.isLureEncounters()) {
    value *= $gameSystem.lureEncounterRate();
    value += $gameSystem.lureEncounterFlat();
  }
  if (this.isRepelEncounters()) value *= 0;
  return value;
};

Game_Player.prototype.isLureEncounters = function() {
  var value = false;
  var arr = Yanfly.Param.RepelLureVariables.lure;
  var total = 0;
  for (var i = 0; i < arr.length; ++i) {
    var varId = arr[i];
    if (varId > 0 && $gameVariables.value(varId) !== undefined) {
      if ($gameVariables.value(varId) > 0) {
        value = true;
        $gameVariables.setValue(varId, $gameVariables.value(varId) - 1);
      }
      if ($gameVariables.value(varId) <= 0) {
        total += 1;
      }
    }
  }
  if (value && total >= arr.length && Yanfly.Param.LureExpireEvent > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.LureExpireEvent);
  }
  return value;
};

Game_Player.prototype.isRepelEncounters = function() {
  var value = false;
  var arr = Yanfly.Param.RepelLureVariables.repel;
  var total = 0;
  for (var i = 0; i < arr.length; ++i) {
    var varId = arr[i];
    if (varId > 0 && $gameVariables.value(varId) !== undefined) {
      if ($gameVariables.value(varId) > 0) {
        $gameVariables.setValue(varId, $gameVariables.value(varId) - 1);
        value = true;
      }
      if ($gameVariables.value(varId) <= 0) {
        total += 1;
      }
    }
  }
  if (value && total >= arr.length && Yanfly.Param.RepelExpireEvent > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.RepelExpireEvent);
  }
  return value;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================

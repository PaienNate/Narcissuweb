//=============================================================================
// Yanfly Engine Plugins - Force Advantage
// YEP_ForceAdvantage.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ForceAdvantage = true;

var Yanfly = Yanfly || {};
Yanfly.FAdv = Yanfly.FAdv || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 强制优势
 * @author Yanfly Engine Plugins
 *
 * @param Neutral Event
 * @desc This common event will play with neutral advantage.
 * Place 0 to not use this parameter.
 * @default 0
 *
 * @param Pre-Emptive Event
 * @desc This common event will play with pre-emptive strikes.
 * Place 0 to not use this parameter.
 * @default 0
 *
 * @param Surprise Event
 * @desc This common event will play with surprise strikes.
 * Place 0 to not use this parameter.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件可以让你在战斗开始之前获得一定战斗优势，无论是强制战斗还是随机
 * 遇敌。这些战斗优势可以是先发制人，偷袭或者没有效果等。这个插件可以让你
 * 在不同战斗类型执行特殊公共事件
 *
 * 如果你使用了YEP_BattleEngineCore，请放在它下面来获得更好的兼容
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Use the following plugin commands to force a battle advantage on the next
 * upcoming battle:
 *
 * 插件命令:
 *
 *   ForceAdvantage Pre-Emptive
 *   ForceAdvantage Preemptive
 *   ForceAdvantage First Strike
 *   ForceAdvantage Player
 *   - 让玩家先发制人.
 *
 *   ForceAdvantage Surprise
 *   ForceAdvantage Back Attack
 *   ForceAdvantage Enemy
 *   - 让敌人偷袭.
 *
 *   ForceAdvantage None
 *   ForceAdvantage Normal
 *   ForceAdvantage Neutral
 *   - 执行一个中立效果.
 *
 *   ForceAdvantage Clear
 *   - 清除战斗优势效果.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ForceAdvantage');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.FAdvNeutral = Number(Yanfly.Parameters['Neutral Event']);
Yanfly.Param.FAdvPreemptive = Number(Yanfly.Parameters['Pre-Emptive Event']);
Yanfly.Param.FAdvSurprise = Number(Yanfly.Parameters['Surprise Event']);

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.FAdv.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    this.checkForceAdvantage(this._forceAdvantage);
    this._forceAdvantage = undefined;
    Yanfly.FAdv.BattleManager_startBattle.call(this);
    this.reserveForceAdvantageCommonEvents();
};

BattleManager.checkForceAdvantage = function(str) {
  if (str === undefined) return;
  var str = str.toUpperCase();
  if (['PRE-EMPTIVE', 'PREEMPTIVE', 'FIRST STRIKE', 'PLAYER'].contains(str)) {
    this._preemptive = true;
    this._surprise = false;
  } else if (['SURPRISE', 'BACK ATTACK', 'ENEMY'].contains(str)) {
    this._preemptive = false;
    this._surprise = true;
  } else if (['NONE', 'NORMAL', 'NEUTRAL'].contains(str)) {
    this._preemptive = false;
    this._surprise = false;
  }
};

BattleManager.reserveForceAdvantageCommonEvents = function() {
    if (this._preemptive) {
      var eventId = Yanfly.Param.FAdvPreemptive;
    } else if (this._surprise) {
      var eventId = Yanfly.Param.FAdvSurprise;
    } else {
      var eventId = Yanfly.Param.FAdvNeutral;
    }
    if (eventId > 0) $gameTemp.reserveCommonEvent(eventId);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.FAdv.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.FAdv.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ForceAdvantage') {
    var str = String(args[0]).toUpperCase();
    if (str === 'CLEAR') str = undefined;
    BattleManager._forceAdvantage = str;
  }
};

//=============================================================================
// End of File
//=============================================================================

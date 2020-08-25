//=============================================================================
// Yanfly Engine Plugins - Battle Engine Core Extension - Weak Enemy Poses
// YEP_X_WeakEnemyPoses.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_WeakEnemyPoses = true;

var Yanfly = Yanfly || {};
Yanfly.WEPose = Yanfly.WEPose || {};
Yanfly.WEPose.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 敌群虚弱图片
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件需要YEP_BattleEngineCore，确保放在YEP_BattleEngineCore下面
 *
 * 无动画的敌群经常很无趣味，他们在整个战斗过程中保持一个姿势不曾改变。
 * 这个插件允许你设置不同的敌群图片，例如不同的血量显示不同的图片等等
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 把这些备注插入数据库敌群备注栏
 *
 * Enemy Notetags:
 *
 *   <x% Health Pose: filename>
 *   当血量低于x%时，敌人会显示自定义图片。文件名不包含文件拓展名。
 *   你可以插入多个语句来设置不同的血量显示不同的图片。注意：这个仅限
 *   于静态敌人，不可以使用带有动画的敌人。
 *
 *   <x% Health Pose: filename, hue>
 *   当血量低于x%时，敌人会显示自定义图片和自定义血量条。文件名不
 *   包含文件拓展名。颜色则介于0-360之间。你可以插入多个语句来设置
 *   不同的血量显示不同的图片。注意：这个仅限于静态敌人，不可以使用
 *   带有动画的敌人。
 *
 * State Notetags:
 *
 *   <Force Enemy Pose: filename>
 *   当敌方处于此状态，敌方将会显示这个自定义图片。
 *   - When an enemy is afflicted with this state, the enemy would take on this
 *   battler image as long as that state is the highest priority state with a
 *   forced enemy pose. Replace 'filename' with the battler image to be used.
 *   The filename is case sensitive and must not include the file extension.
 *   * NOTE: This applies only to static enemies and NOT animated enemies.
 *
 *   <Force Enemy Pose: filename, hue>
 *   当敌方处于此状态，敌方将会显示这个自定义图片和自定义颜色。
 *   - When an enemy is afflicted with this state, the enemy would take on this
 *   battler image as long as that state is the highest priority state with a
 *   forced enemy pose. Replace 'filename' with the battler image to be used.
 *   The filename is case sensitive and must not include the file extension.
 *   The hue must be a value between 0 and 360.
 *   * NOTE: This applies only to static enemies and NOT animated enemies.
 *
 * ============================================================================
 * Lunatic Mode - Custom Enemy Poses
 * ============================================================================
 *
 * 自定义模式
 *
 * Enemy Notetags:
 *
 *   <Custom Enemy Pose>
 *    if (user.mpRate() >= 0.50) {
 *      name = 'Scorpion';
 *      hue = 180;
 *    } else {
 *      name = 'Spider';
 *    }
 *   </Custom Enemy Pose>
 *   - The 'name' variable will refer to the filename used for the battler
 *   image. The filename is case sensitive and must not include the file
 *   extension. If the 'hue' variable is used, then that hue will be forced.
 *   Otherwise, it will use the default hue of the enemy. The hue must be a
 *   value between 0 and 360.
 *   * NOTE: This applies only to static enemies and NOT animated enemies.
 *
 * State Notetags:
 *
 *   <Custom Enemy Pose>
 *    if (user.mpRate() >= 0.50) {
 *      name = 'Scorpion';
 *      hue = 180;
 *    } else {
 *      name = 'Spider';
 *    }
 *   </Custom Enemy Pose>
 *   - When an enemy is afflicted with this state, the enemy would take on the
 *   'name' image as long as that state is the highest priority state with a
 *   forced enemy pose. The filename is case sensitive and must not include the
 *   file extension. If the 'hue' variable is used, then that hue will be
 *   forced. Otherwise, it will use the default hue of the enemy. The hue must
 *   be a value between 0 and 360.
 *   * NOTE: This applies only to static enemies and NOT animated enemies.
 *
 * For the other variable to use:
 *
 *   defaultBattlerName
 *   默认战斗者图片名字
 * 
 *   defaultBattlerHue
 *   默认战斗者图片颜色
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.WEPose.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.WEPose.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_WeakEnemyPoses) {
    this.processWEPoseNotetags1($dataEnemies);
    this.processWEPoseNotetags2($dataStates);
    Yanfly._loaded_YEP_X_WeakEnemyPoses = true;
  }
  
  return true;
};

DataManager.processWEPoseNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.weakPosesRate = [1.0];
    obj.weakPosesData = {
      1.0: [obj.battlerName, obj.battlerHue],
    };
    var evalMode = 'none';
    obj.weakPoseEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(\d+)([%％])[ ]HEALTH POSE:[ ](.*),[ ](\d+)>/i)) {
        var rate = parseFloat(RegExp.$1) * 0.01;
        var data = [String(RegExp.$3), parseInt(RegExp.$4).clamp(0, 360)];
        obj.weakPosesRate.push(rate);
        obj.weakPosesData[rate] = data;
      } else if (line.match(/<(\d+)([%％])[ ]HEALTH POSE:[ ](.*)>/i)) {
        var rate = parseFloat(RegExp.$1) * 0.01;
        var data = [String(RegExp.$3), -1];
        obj.weakPosesRate.push(rate);
        obj.weakPosesData[rate] = data;
      } else if (line.match(/<CUSTOM ENEMY POSE>/i)) {
        var evalMode = 'custom enemy pose';
      } else if (line.match(/<\/CUSTOM ENEMY POSE>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'custom enemy pose') {
        obj.weakPoseEval += line + '\n';
      }
    }

    this.sortObjectWeakPoses(obj);
  }
};

DataManager.sortObjectWeakPoses = function(obj) {
  obj.weakPosesRate.sort(function(a, b) { return b - a; });
};

DataManager.processWEPoseNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.forceEnemyPose = undefined;
    obj.forceEnemyHue = -1;
    var evalMode = 'none';
    obj.forceEnemyPoseEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<FORCE ENEMY POSE:[ ](.*),[ ](\d+)>/i)) {
        obj.forceEnemyPose = String(RegExp.$1);
        obj.forceEnemyHue = parseInt(RegExp.$2).clamp(0, 360);
      } else if (line.match(/<FORCE ENEMY POSE:[ ](.*)>/i)) {
        obj.forceEnemyPose = String(RegExp.$1);
      } else if (line.match(/<CUSTOM ENEMY POSE>/i)) {
        var evalMode = 'custom enemy pose';
      } else if (line.match(/<\/CUSTOM ENEMY POSE>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'custom enemy pose') {
        obj.forceEnemyPoseEval += line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.WEPose.Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
  Yanfly.WEPose.Game_Battler_refresh.call(this);
  if (this.isEnemy()) this.clearWeakPoseData();
};

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.WEPose.Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  Yanfly.WEPose.Game_Enemy_initMembers.call(this);
  this.clearWeakPoseData();
};

Game_Enemy.prototype.clearWeakPoseData = function() {
  this._weakPoseBattlerName = undefined;
  this._weakPoseBattlerHue = undefined;
};

Yanfly.WEPose.Game_Enemy_battlerName = Game_Enemy.prototype.battlerName;
Game_Enemy.prototype.battlerName = function() {
  if (this._weakPoseBattlerName !== undefined) {
    return this._weakPoseBattlerName;
  }
  this._weakPoseBattlerName = Yanfly.WEPose.Game_Enemy_battlerName.call(this);
  this._weakPoseBattlerHue = -1;
  this.makeEnemyWeakPoseData();
  this.makeEnemyWeakPoseEval();
  this.makeStateWeakPoseData();
  this.makeStateWeakPoseEval();
  return this._weakPoseBattlerName;
};

Yanfly.WEPose.Game_Enemy_battlerHue = Game_Enemy.prototype.battlerHue;
Game_Enemy.prototype.battlerHue = function() {
  if (this._weakPoseBattlerHue !== undefined) {
    if (this._weakPoseBattlerHue < 0) {
      return Yanfly.WEPose.Game_Enemy_battlerHue.call(this);
    } else {
      return this._weakPoseBattlerHue;
    }
  }
  return Yanfly.WEPose.Game_Enemy_battlerHue.call(this);
};

Game_Enemy.prototype.makeEnemyWeakPoseData = function() {
  var hpRate = this.hpRate();
  var data = this.enemy().weakPosesData;
  var rates = this.enemy().weakPosesRate;
  var length = rates.length;
  for (var i = 0; i < length; ++i) {
    var rate = rates[i];
    if (hpRate <= rate) {
      this._weakPoseBattlerName = data[rate][0];
      this._weakPoseBattlerHue = data[rate][1];
    } else {
      break;
    }
  }
};

Game_Enemy.prototype.makeEnemyWeakPoseEval = function() {
  var code = this.enemy().weakPoseEval;
  if (code === '') return;
  var hpRate = this.hpRate();
  var defaultBattlerName = Yanfly.WEPose.Game_Enemy_battlerHue.call(this);
  var defaultBattlerHue = Yanfly.WEPose.Game_Enemy_battlerHue.call(this);
  var name = this._weakPoseBattlerName;
  var hue = this._weakPoseBattlerHue;
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'WEAK POSE EVAL ERROR');
  }
  this._weakPoseBattlerName = name;
  this._weakPoseBattlerHue = hue;
};

Game_Enemy.prototype.makeStateWeakPoseData = function() {
  var hpRate = this.hpRate();
  var states = this.states();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (state && state.forceEnemyPose !== undefined) {
      this._weakPoseBattlerName = state.forceEnemyPose;
      this._weakPoseBattlerHue = state.forceEnemyHue;
      break;
    }
  }
};

Game_Enemy.prototype.makeStateWeakPoseEval = function() {
  var hpRate = this.hpRate();
  var states = this.states();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (state && state.forceEnemyPoseEval !== '') {
      var code = state.forceEnemyPoseEval;
      var defaultBattlerName = Yanfly.WEPose.Game_Enemy_battlerHue.call(this);
      var defaultBattlerHue = Yanfly.WEPose.Game_Enemy_battlerHue.call(this);
      var name = this._weakPoseBattlerName;
      var hue = this._weakPoseBattlerHue;
      var a = this;
      var user = this;
      var subject = this;
      var b = this;
      var target = this;
      var s = $gameSwitches._data;
      var v = $gameVariables._data;
      try {
        eval(code);
      } catch (e) {
        Yanfly.Util.displayError(e, code, 'WEAK POSE STATE EVAL ERROR');
      }
      this._weakPoseBattlerName = name;
      this._weakPoseBattlerHue = hue;
      break;
    }
  }
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
}; // Imported.YEP_BattleEngineCore
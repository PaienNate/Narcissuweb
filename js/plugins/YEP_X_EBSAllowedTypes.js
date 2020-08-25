//=============================================================================
// Yanfly Engine Plugins - Equip Battle Skills Extension - Allowed Types
// YEP_X_EBSAllowedTypes.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_EBSAllowedTypes = true;

var Yanfly = Yanfly || {};
Yanfly.EBSAT = Yanfly.EBSAT || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 战斗技能装备类型限制
 * @author Yanfly Engine Plugins
 *
 * @param Allowed Skill Types
 * @desc List here the skill type ID's you wish to retain in the
 * battle command skill type list.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * This plugin requires YEP_EquipBattleSkills. Make sure this plugin is located
 * under YEP_EquipBattleSkills in the plugin list.
 *
 * 对于使用Equip Battle Skills插件的人，你可能注意到‘技能’命令栏替代了战斗
 * 命令里所有的技能类型。对于那些只想让特定技能类型生效的人，你可以使用这个
 * 插件。插件参数里可以设置不需要的技能类型。
 */
//=============================================================================

if (Imported.YEP_EquipBattleSkills) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.setupParameters = function() {
  Yanfly.Param = Yanfly.Param || {};
  var parameters = PluginManager.parameters('YEP_X_EBSAllowedTypes');
  Yanfly.Param.EBSATTypes = String(parameters['Allowed Skill Types']);
  Yanfly.Param.EBSATTypes = Yanfly.Param.EBSATTypes.split(',');
  var length = Yanfly.Param.EBSATTypes.length;
  for (var i = 0; i < length; ++i) {
    var value = Yanfly.Param.EBSATTypes[i];
    Yanfly.Param.EBSATTypes[i] = parseInt(value.trim());
  }
};

Yanfly.setupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.EBSAT.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.EBSAT.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_EBSAllowedTypes) {
    this.processEBSATNotetags($dataSkills);
    Yanfly._loaded_YEP_X_EBSAllowedTypes = true;
  }
  
  return true;
};

DataManager.processEBSATNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (Yanfly.Param.EBSATTypes.contains(obj.stypeId)) {
      obj.equippable = false;
    }
  }
};

//=============================================================================
// Parameter Window_ActorCommand
//=============================================================================

Yanfly.EBSAT.Window_ActorCommand_addSkillCommands =
  Window_ActorCommand.prototype.addSkillCommands;
Window_ActorCommand.prototype.addSkillCommands = function() {
  Yanfly.EBSAT.Window_ActorCommand_addSkillCommands.call(this);
  if (DataManager.isBattleTest()) return;
  this.addAllowedEBSTypes();
};

Window_ActorCommand.prototype.addAllowedEBSTypes = function() {
  var skillTypes = this._actor.addedSkillTypes();
  skillTypes.sort(function(a, b) {
    return a - b;
  });
  var length = skillTypes.length;
  for (var i = 0; i < length; ++i) {
    var stypeId = skillTypes[i];
    if (!Yanfly.Param.EBSATTypes.contains(stypeId)) continue;
    var name = $dataSystem.skillTypes[stypeId];
    this.addCommand(name, 'skill', true, stypeId);
  }
};

//=============================================================================
// End of File
//=============================================================================
};
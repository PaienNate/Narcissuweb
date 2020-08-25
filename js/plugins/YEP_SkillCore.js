//=============================================================================
// Yanfly Engine Plugins - Skill Core
// YEP_SkillCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SkillCore = true;

var Yanfly = Yanfly || {};
Yanfly.Skill = Yanfly.Skill || {};
Yanfly.Skill.version = 1.11;

//=============================================================================
/*:
 * @plugindesc v1.11 技能核心
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Cost Padding
 * @desc If a skill has multiple costs, this is the amount of pixels
 * used as padding in between the costs.
 * @default 4
 *
 * @param Command Alignment
 * @desc Adjusts the text alignment of the skill type window.
 * left     center     right
 * @default center
 *
 * @param Window Columns
 * @desc Choose how many columns to use for the skill window.
 * Default: 2
 * @default 2
 *
 * @param ---HP Costs---
 * @default
 *
 * @param HP Format
 * @desc Adjusts the way HP cost appears in the skill list window.
 * %1 - Cost     %2 - HP
 * @default %1%2
 *
 * @param HP Font Size
 * @desc Adjusts the font size used to display HP.
 * Default: 28
 * @default 20
 *
 * @param HP Text Color
 * @desc Adjusts the text color used from the Window skin for HP.
 * Default: 21
 * @default 18
 *
 * @param HP Icon
 * @desc Choose what icon to use to represent HP costs.
 * Use 0 if you wish to not use an icon.
 * @default 162
 *
 * @param ---MP Costs---
 * @default
 *
 * @param MP Format
 * @desc Adjusts the way MP cost appears in the skill list window.
 * %1 - Cost     %2 - MP
 * @default %1%2
 *
 * @param MP Font Size
 * @desc Adjusts the font size used to display MP.
 * Default: 28
 * @default 20
 *
 * @param MP Text Color
 * @desc Adjusts the text color used from the Window skin for MP.
 * Default: 23
 * @default 23
 *
 * @param MP Icon
 * @desc Choose what icon to use to represent MP costs.
 * Use 0 if you wish to not use an icon.
 * @default 165
 *
 * @param ---TP Costs---
 * @default
 *
 * @param TP Format
 * @desc Adjusts the way TP cost appears in the skill list window.
 * %1 - Cost     %2 - TP
 * @default %1%2
 *
 * @param TP Font Size
 * @desc Adjusts the font size used to display TP.
 * Default: 28
 * @default 20
 *
 * @param TP Text Color
 * @desc Adjusts the text color used from the Window skin for TP.
 * Default: 29
 * @default 29
 *
 * @param TP Icon
 * @desc Choose what icon to use to represent TP costs.
 * Use 0 if you wish to not use an icon.
 * @default 164
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 技能核心插件能够修改技能的核心部分，比如技能的使用消耗和效果。利用这个插
 * 件，靠消耗HP来释放技能也是可行的。
 * RPG中的技能由三个成分组成：消耗，伤害，以及特效。这三个成分确实是一个技能
 * 的重要组成部分，尽管未必同时存在。伤害是由另一个插件决定的，但这个插件将
 * 是技能消耗和技能特效的核心决定因素。
 *
 * 这个插件也包括让战斗者将自己的HP、MP和/或TP数值与不同的属性交换，如果该属
 * 性更适合角色本身（例如，有些职业并不使用MP和/或TP）。
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 这些注释可同时用于技能消耗或技能特效。
 *
 * 技能的注释:
 *   <HP Cost: x>
 *   将技能的消耗增加x点HP。RMMV的制作人员没有设置以HP为技能消耗的功能，因此这
 *   个注释起到了相应的作用。
 *
 *   <HP Cost: x%>
 *   将技能的消耗增加最大HP值的x%。
 *
 *   <MP Cost: x>
 *   将技能的消耗增加x点MP。它可以用来突破数据库的上限9999。
 *
 *   <MP Cost: x%>
 *   将技能的消耗增加最大MP值的x%.
 *
 *   <TP Cost: x>
 *   将技能的消耗增加x点TP。它可以用来突破数据库的上限99。
 *
 *   <TP Cost: x%>
 *   将技能的消耗增加最大TP值的x%。此注释适用于任一改变角色最大TP值的插件，尽
 *   管默认的最大TP是100。
 *
 *   <Hide in Battle>
 *   在战斗中隐藏此技能并使之不能使用。
 *
 *   <Hide in Field>
 *   在战斗外隐藏此技能并使之不能使用。
 *
 *   <Hide if Learned Skill: x>
 *   <Hide if Learned Skill: x, x, x>
 *   <Hide if Learned Skill: x to y>
 *   如果技能x已被习得，将隐藏此技能并使之不能使用。若列出了多个技能，那么当任
 *   一列出的技能被习得时，注释的技能将被隐藏并不能被使用。
 *
 * ============================================================================
 * Gauge Swapping  数值类型转换
 * ============================================================================
 *
 * 假设你使用的所有插件均保持HP、MP、TP这个顺序，并且不会推翻默认的数值运算
 * 进程，那么这个插件也能让你将HP、MP和TP数值类型重新排列为你想要的顺序。如
 * 果你使用任何扩展插件，它们也同样会被重排。
 *
 * 请注意：如果数据库中系统页下的“在战斗中显示TP”一项没有被选择，那么第三
 * 个位置的数值类型将不被显示。
 *
 * 职业的注释:
 *   <Swap Gauge x: y>
 *   把数据类型x（1,2或3）改为y。将y替换为“HP”,“MP”或“TP”来把它显示在相
 *   应的数据类型位置上。如果你想要在相应位置上什么都不显示，就在注释中y的位置
 *   输入“Nothing”或“Null”。
 *
 * 武器、防具和特殊状态的注释:
 *   <Swap Gauge x: y>
 *   装备了写有此注释的装备的角色、和拥有写有此注释的状态的角色或敌人将显示被
 *   置换过的数值类型……。
 *
 *   其中优先级是按下列顺序排列的：武器，防具，特殊状态，职业，敌人。
 *
 * ============================================================================
 * Lunatic Mode - Skill Costs “疯狂模式”——技能消耗
 * ============================================================================
 *
 * 如果你想更好地控制技能消耗和技能特效，这里有包含能够针对技能的消耗和/或特
 * 效的代码的注释。其中的特效也可以延伸到对物品的控制。
 *
 *   <Custom HP Cost>       Example: <Custom HP Cost>
 *    code                            cost += $gameVariables.value(1);
 *    code                           </Custom HP Cost>
 *   </Custom HP Cost>
 *   允许技能有一个不基于代码的自定义HP消耗。对于代码部分，“消耗”是一个已经
 *   预先由HP消耗和百分比HP消耗定义过的变量。
 *
 *   <Custom MP Cost>       Example: <Custom MP Cost>
 *    code                            cost += $gameVariables.value(1);
 *    code                           </Custom MP Cost>
 *   </Custom MP Cost>
 *   允许技能有一个不基于代码的自定义MP消耗。对于代码部分，“消耗”是一个已经
 *   预先由MP消耗和百分比MP消耗定义过的变量。
 *
 *   <Custom TP Cost>       Example: <Custom TP Cost>
 *    code                            cost += $gameVariables.value(1);
 *    code                           </Custom TP Cost>
 *   </Custom TP Cost>
 *   允许技能有一个不基于代码的自定义TP消耗。对于代码部分，“消耗”是一个已经
 *   预先由TP消耗和百分比TP消耗定义过的变量。
 *
 * ============================================================================
 * Lunatic Mode - Custom Show Requirements  “疯狂模式”——自定义显示需求
 * ============================================================================
 *
 * 如果想要显示特定技能以及使它们在特定条件下不可使用（利用JavaScript的知识
 * ），使用下述代码:
 *
 * Skill Notetag:
 *   <Custom Show Eval>
 *   if (user.level > 50) {
 *     visible = true;
 *   } else {
 *     visible = false;
 *   }
 *   </Custom Show Eval>
 *   若“visible”设为“true”，那么技能就被显示（不被隐藏）而且是可用的，只要
 *   其它条件也满足。若“visible”设为“false”，那么技能就不可使用，并且从列
 *   表中被隐藏。
 *
 * ============================================================================
 * Lunatic Mode - Custom “疯狂模式”——自定义需求和执行
 * ============================================================================
 *
 * 如果你只有很少的JavaScript的使用经验，可以用下面的注释来限制一个技能以及
 * 执行技能时使用的代码类型。
 *
 * Skill Notetags:
 *
 *   <Custom Requirement>
 *    if ($gameParty.gold() > 1000) {
 *      value = true;
 *    } else {
 *      value = false;
 *    }
 *   </Custom Requirement>
 *   若“value”设为“true”，技能就可以被使用，只要其它的条件也满足。
 *   若“value”设为“false”，技能将不可被使用。
 *
 *   <Custom Execution>
 *    $gameParty.loseGold(1000);
 *   </Custom Execution>
 *   使用此技能时，这一条将在注释之间运行。
 *
 * ============================================================================
 * Lunatic Mode - Custom Cost Display “疯狂模式”——自定义消耗显示
 * ============================================================================
 *
 * 如果你只有很少的JavaScript的使用经验，可以增加新的方式来显示技能消耗。
 *
 * 技能的注释:
 *
 *   <Cost Display Eval>
 *    var variableId = 1;
 *    var value = 1000;
 *    $gameVariables.setValue(variableId, value);
 *   </Cost Display Eval>
 *   在显示技能消耗之前重新运算求出参数。这样你可以为你的技能消耗显示文本设置
 *   变量等。
 *
 *   <Custom Cost Display>
 *    \c[4]\v[1]\c[0] Gold
 *   </Custom Cost Display>
 *   这是在其它技能消耗前面显示的自定义文本。你可以通过这条注释来使用文本代码。
 *
 * ============================================================================
 * Lunatic Mode - The Skill Phases  “疯狂模式”——技能阶段
 * ============================================================================
 *
 * 对于技能，在不同的阶段应用多个特效。可以变化的阶段如下：
 *
 *    Before Effect Phase (influenced by this plugin)
 *    if skill successfully lands:
 *    - Pre-Damage Effect Phase (influenced by this plugin)
 *    - Damage Phase
 *    - Post-Damage Effect Phase (influenced by this plugin)
 *    - Item Trait Effects Phase
 *    After Effect Phase (influenced by this plugin)
 *    特效阶段（被插件影响）之前
 *    如果技能成功land：
 *    提前伤害效果阶段（被插件影响）
 *    伤害阶段
 *    后续伤害效果阶段（被插件影响）
 *    物品特性效果阶段
 *    特效阶段（被插件影响）之后    
 *
 * 这里有四个可被插件影响的阶段。其中两个与特效是否land无关，另外两个只当技
 * 能land才起作用。
 *
 * 技能和物品注释:
 *   <Before Eval>
 *    code
 *    code
 *   </Before Eval>
 *
 *   <Pre-Damage Eval>
 *    code
 *    code
 *   </Pre-Damage Eval>
 *
 *   <Post-Damage Eval>
 *    code
 *    code
 *   <Post-Damage Eval>
 *
 *   <After Eval>
 *    code
 *    code
 *   <After Eval>
 *   如果你想对技能使用自定义特效，你可以在技能（或物品）的注释栏分别插入对应
 *   的注释，它运行注释之间出现的代码。然而，在注释中使用任一形式的comment会打
 *   断后面的代码。
 *
 *   Those using the <Pre-Damage Eval> and <Post-Damage Eval> are able to make
 *   use of the damage to be dealt and the damage that has been dealt through
 *   the 'value' variable. The <Pre-Damage Eval> notetag is capable of altering
 *   the 'value' variable and return it to have damage affected by its code.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.11:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.10b:
 * - Fixed a visual bug when using text code font changing for custom skill
 * cost display.
 * - <Hide if Learned Skill: x> documentation updated.
 * - Compatibility update for future plugins.
 *
 * Version 1.09:
 * - The <Pre-Damage Eval> notetag now has the ability alter damage dealt. The
 * 'value' variable refers to and returns the damage affected by the action.
 *
 * Version 1.08:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.07:
 * - Fixed a bug that prevented immortal actors at 0 HP from using skills.
 *
 * Version 1.06a:
 * - Added <Hide in Battle> and <Hide in Field> notetags.
 * - Added a failsafe to check for undefined skills.
 *
 * Version 1.05:
 * - Added <Hide if Learned Skill: x> notetags.
 * - Added <Custom Show Eval> Lunatic Mode notetag.
 *
 * Version 1.04:
 * - Added four Lunatic Modes notetags: Custom Requirement, Custom Execution,
 * Cost Display Eval, Custom Cost Display.
 *
 * Version 1.03:
 * - Fixed a bug with the Lunatic Mode notetags not working.
 *
 * Version 1.02:
 * - Added 'Window Columns' parameter to let users adjust the number of columns
 * used for the skill window.
 *
 * Version 1.01:
 * - Fixed a mathematical error for skill cost padding.
 * - Added return for drawSkillCost to assist others scripters when making
 * compatibility notes.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SkillCore');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.SCCCostPadding = Number(Yanfly.Parameters['Cost Padding']);
Yanfly.Param.SCCTextAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.SCCWindowCol = Number(Yanfly.Parameters['Window Columns']);
Yanfly.Param.SCCTpFormat = String(Yanfly.Parameters['TP Format']);
Yanfly.Param.SCCTpFontSize = Number(Yanfly.Parameters['TP Font Size']);
Yanfly.Param.SCCTpTextColor = Number(Yanfly.Parameters['TP Text Color']);
Yanfly.Icon.Tp = Number(Yanfly.Parameters['TP Icon']);
Yanfly.Param.SCCMpFormat = String(Yanfly.Parameters['MP Format']);
Yanfly.Param.SCCMpFontSize = Number(Yanfly.Parameters['MP Font Size']);
Yanfly.Param.SCCMpTextColor = Number(Yanfly.Parameters['MP Text Color']);
Yanfly.Icon.Mp = Number(Yanfly.Parameters['MP Icon']);
Yanfly.Param.SCCHpFormat = String(Yanfly.Parameters['HP Format']);
Yanfly.Param.SCCHpFontSize = Number(Yanfly.Parameters['HP Font Size']);
Yanfly.Param.SCCHpTextColor = Number(Yanfly.Parameters['HP Text Color']);
Yanfly.Icon.Hp = Number(Yanfly.Parameters['HP Icon']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Skill.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Skill.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_SkillCore) {
    this.processSkillNotetags($dataSkills);
    this.processObjectNotetags($dataSkills);
    this.processObjectNotetags($dataItems);
    this.processGSCNotetags1($dataClasses);
    this.processGSCNotetags1($dataEnemies);
    this.processGSCNotetags2($dataWeapons);
    this.processGSCNotetags2($dataArmors);
    this.processGSCNotetags2($dataStates);
    Yanfly._loaded_YEP_SkillCore = true;
  }
  return true;
};

DataManager.processSkillNotetags = function(group) {
  var note1 = /<(?:MP COST):[ ](\d+)>/i;
  var note2 = /<(?:MP COST):[ ](\d+)([%％])>/i;
  var note3 = /<(?:TP COST):[ ](\d+)>/i;
  var note4 = /<(?:TP COST):[ ](\d+)([%％])>/i;
  var note5 = /<(?:HP COST):[ ](\d+)>/i;
  var note6 = /<(?:HP COST):[ ](\d+)([%％])>/i;
  var note7a = /<(?:HIDE IF LEARNED SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note7b = /<(?:HIDE IF LEARNED SKILL):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note8a = /<(?:HIDE IN BATTLE|hide during battle)>/i;
  var note8b = /<(?:HIDE IN FIELD|hide during field)>/i;
  var noteMpEval1 = /<(?:MP COST EVAL|custom mp cost)>/i;
  var noteMpEval2 = /<\/(?:MP COST EVAL|custom mp cost)>/i;
  var noteTpEval1 = /<(?:TP COST EVAL|custom tp cost)>/i;
  var noteTpEval2 = /<\/(?:TP COST EVAL|custom tp cost)>/i;
  var noteHpEval1 = /<(?:HP COST EVAL|custom hp cost)>/i;
  var noteHpEval2 = /<\/(?:HP COST EVAL|custom hp cost)>/i;
  var noteEvalReq1 = /<(?:EVAL REQUIREMENT|custom requirement)>/i;
  var noteEvalReq2 = /<\/(?:EVAL REQUIREMENT|custom requirement)>/i;
  var noteEvalExe1 = /<(?:EVAL EXECUTION|custom execution)>/i;
  var noteEvalExe2 = /<\/(?:EVAL EXECUTION|custom execution)>/i;
  var noteCostEval1 = /<(?:COST DISPLAY EVAL|display cost eval)>/i;
  var noteCostEval2 = /<\/(?:COST DISPLAY EVAL|display cost eval)>/i;
  var noteCostText1 = /<(?:CUSTOM COST DISPLAY|custom display cost)>/i;
  var noteCostText2 = /<\/(?:CUSTOM COST DISPLAY|custom display cost)>/i;
  var noteShowEval1 = /<(?:CUSTOM SHOW EVAL)>/i;
  var noteShowEval2 = /<\/(?:CUSTOM SHOW EVAL)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.hpCost = 0;
    obj.hpCostPer = 0.0;
    obj.mpCostPer = 0.0;
    obj.tpCostPer = 0.0;
    obj.hideInBattle = false;
    obj.hideInField = false;
    obj.hideIfLearnedSkill = [];
    var evalMode = 'none';
    obj.hpCostEval = '';
    obj.mpCostEval = '';
    obj.tpCostEval = '';
    obj.requireEval = '';
    obj.executeEval = '';
    obj.costdisplayEval = '';
    obj.costShowEval = '';
    obj.customCostText = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.mpCost = parseInt(RegExp.$1);
      } else if (line.match(note2)) {
        obj.mpCostPer = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(note3)) {
        obj.tpCost = parseInt(RegExp.$1);
      } else if (line.match(note4)) {
        obj.tpCostPer = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(note5)) {
        obj.hpCost = parseInt(RegExp.$1);
      } else if (line.match(note6)) {
        obj.hpCostPer = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(note7a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.hideIfLearnedSkill = obj.hideIfLearnedSkill.concat(array);
      } else if (line.match(note7b)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.hideIfLearnedSkill = obj.hideIfLearnedSkill.concat(range);
      } else if (line.match(note8a)) {
        obj.hideInBattle = true;
      } else if (line.match(note8b)) {
        obj.hideInField = true;
      } else if (line.match(noteMpEval1)) {
        evalMode = 'mp';
      } else if (line.match(noteMpEval2)) {
        evalMode = 'none';
      } else if (line.match(noteTpEval1)) {
        evalMode = 'tp';
      } else if (line.match(noteTpEval2)) {
        evalMode = 'none';
      } else if (line.match(noteHpEval1)) {
        evalMode = 'hp';
      } else if (line.match(noteHpEval2)) {
        evalMode = 'none';
      } else if (line.match(noteEvalReq1)) {
        evalMode = 'custom requirement';
      } else if (line.match(noteEvalReq2)) {
        evalMode = 'none';
      } else if (line.match(noteEvalExe1)) {
        evalMode = 'custom execute';
      } else if (line.match(noteEvalExe2)) {
        evalMode = 'none';
      } else if (line.match(noteCostEval1)) {
        evalMode = 'display cost eval';
      } else if (line.match(noteCostEval2)) {
        evalMode = 'none';
      } else if (line.match(noteCostText1)) {
        evalMode = 'custom display cost';
      } else if (line.match(noteCostText2)) {
        evalMode = 'none';
      } else if (line.match(noteShowEval1)) {
        evalMode = 'custom show eval';
      } else if (line.match(noteShowEval2)) {
        evalMode = 'none';
      } else if (evalMode === 'mp') {
        obj.mpCostEval = obj.mpCostEval + line + '\n';
      } else if (evalMode === 'tp') {
        obj.tpCostEval = obj.tpCostEval + line + '\n';
      } else if (evalMode === 'hp') {
        obj.hpCostEval = obj.hpCostEval + line + '\n';
      } else if (evalMode === 'custom requirement') {
        obj.requireEval = obj.requireEval + line + '\n';
      } else if (evalMode === 'custom execute') {
        obj.executeEval = obj.executeEval + line + '\n';
      } else if (evalMode === 'display cost eval') {
        obj.costdisplayEval = obj.costdisplayEval + line + '\n';
      } else if (evalMode === 'custom display cost') {
        obj.customCostText = obj.customCostText + line;
      } else if (evalMode === 'custom show eval') {
        obj.costShowEval = obj.costShowEval + line + '\n';
      }
    }
  }
};

DataManager.processObjectNotetags = function(group) {
  var note1 = /<(?:BEFORE EVAL)>/i;
  var note2 = /<\/(?:BEFORE EVAL)>/i;
  var note3 = /<(?:PRE-DAMAGE EVAL)>/i;
  var note4 = /<\/(?:PRE-DAMAGE EVAL)>/i;
  var note5 = /<(?:POST-DAMAGE EVAL)>/i;
  var note6 = /<\/(?:POST-DAMAGE EVAL)>/i;
  var note7 = /<(?:AFTER EVAL)>/i;
  var note8 = /<\/(?:AFTER EVAL)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var customMode = 'none';
    obj.customBeforeEval = '';
    obj.customPreDamageEval = '';
    obj.customPostDamageEval = '';
    obj.customAfterEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        customMode = 'before';
      } else if (line.match(note2)) {
        customMode = 'none';
      } else if (line.match(note3)) {
        customMode = 'pre-damage';
      } else if (line.match(note4)) {
        customMode = 'none';
      } else if (line.match(note5)) {
        customMode = 'post-damage';
      } else if (line.match(note6)) {
        customMode = 'none';
      } else if (line.match(note7)) {
        customMode = 'after';
      } else if (line.match(note8)) {
        customMode = 'none';
      } else if (customMode === 'before') {
        obj.customBeforeEval = obj.customBeforeEval + line + '\n';
      } else if (customMode === 'pre-damage') {
        obj.customPreDamageEval = obj.customPreDamageEval + line + '\n';
      } else if (customMode === 'post-damage') {
        obj.customPostDamageEval = obj.customPostDamageEval + line + '\n';
      } else if (customMode === 'after') {
        obj.customAfterEval = obj.customAfterEval + line + '\n';
      }
    }
  }
};

DataManager.processGSCNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.gauge1 = 'HP';
    obj.gauge2 = 'MP';
    obj.gauge3 = 'TP';

    obj.gaugeIcon1 = 0;
    obj.gaugeIcon2 = 0;
    obj.gaugeIcon3 = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
        var gauge = parseInt(RegExp.$1);
        var text = String(RegExp.$2).toUpperCase();
        if (['HP', 'MP', 'TP', 'NOTHING', 'NULL'].contains(text)) {
          if (gauge === 1) obj.gauge1 = text;
          if (gauge === 2) obj.gauge2 = text;
          if (gauge === 3) obj.gauge3 = text;
        }
      }
    }
  }
};

DataManager.processGSCNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.gauge1 = 'UNDEFINED';
    obj.gauge2 = 'UNDEFINED';
    obj.gauge3 = 'UNDEFINED';

    obj.gaugeIcon1 = 'UNDEFINED';
    obj.gaugeIcon2 = 'UNDEFINED';
    obj.gaugeIcon3 = 'UNDEFINED';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
        var gauge = parseInt(RegExp.$1);
        var text = String(RegExp.$2).toUpperCase();
        if (['HP', 'MP', 'TP', 'NOTHING', 'NULL'].contains(text)) {
          if (gauge === 1) obj.gauge1 = text;
          if (gauge === 2) obj.gauge2 = text;
          if (gauge === 3) obj.gauge3 = text;
        }
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Skill.Game_BattlerBase_mSC =
    Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    if (!Yanfly.Skill.Game_BattlerBase_mSC.call(this, skill)) return false;
    if (!skill) return false;
    if (!this.noHiddenSkillConditionsMet(skill)) return false;
    return this.meetsSkillConditionsEval(skill);
};

Game_BattlerBase.prototype.noHiddenSkillConditionsMet = function(skill) {
    if (!skill) return false;
    if (this.isEnemy()) return true;
    if (skill.hideIfLearnedSkill) {
      for (var i = 0; i < skill.hideIfLearnedSkill.length; ++i) {
        var skillId = skill.hideIfLearnedSkill[i];
        if (this.isLearnedSkill(skillId)) return false;
      }
    }
    if (skill.hideInBattle && $gameParty.inBattle()) return false;
    if (skill.hideInField && !$gameParty.inBattle()) return false;
    if (!this.meetsCustomShowEval(skill)) return false;
    return true;
};

Game_BattlerBase.prototype.meetsCustomShowEval = function(skill) {
    if (skill.costShowEval === '') return true;
    var visible = true;
    var item = skill;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = skill.costShowEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'SKILL CUSTOM SHOW EVAL ERROR');
    }
    return visible;
};

Game_BattlerBase.prototype.meetsSkillConditionsEval = function(skill) {
    if (skill.requireEval === '') return true;
    var value = true;
    var item = skill;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = skill.requireEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'SKILL CUSTOM REQUIRE EVAL ERROR');
    }
    return value;
};

Game_BattlerBase.prototype.skillHpCost = function(skill) {
  var cost = skill.hpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.mhp * skill.hpCostPer;
  var code = skill.hpCostEval;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'SKILL CUSTOM HP COST ERROR');
  }
  return Math.max(0, Math.floor(cost));
};

Game_BattlerBase.prototype.skillMpCost = function(skill) {
  var cost = skill.mpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.mmp * skill.mpCostPer;
  var code = skill.mpCostEval;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'SKILL CUSTOM MP COST ERROR');
  }
  return Math.max(0, Math.floor(cost * this.mcr));
};

Game_BattlerBase.prototype.skillTpCost = function(skill) {
  var cost = skill.tpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.maxTp() * skill.tpCostPer;
  var code = skill.tpCostEval;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'SKILL CUSTOM TP COST ERROR');
  }
  return Math.max(0, Math.floor(cost));
};

Yanfly.Skill.Game_BattlerBase_canPaySkillCost =
    Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    if (!this.canPaySkillHpCost(skill)) return false;
    return Yanfly.Skill.Game_BattlerBase_canPaySkillCost.call(this, skill);
};

Game_BattlerBase.prototype.canPaySkillHpCost = function(skill) {
    var cost = this.skillHpCost(skill);
    if (cost <= 0) return true;
    return this._hp > cost;
};

Yanfly.Skill.Game_BattlerBase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Yanfly.Skill.Game_BattlerBase_paySkillCost.call(this, skill);
    this.paySkillHpCost(skill);
    this.paySkillEvalCost(skill);
};

Game_BattlerBase.prototype.paySkillHpCost = function(skill) {
    this._hp -= this.skillHpCost(skill);
};

Game_BattlerBase.prototype.paySkillEvalCost = function(skill) {
    if (skill.executeEval === '') return;
    var item = skill;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = skill.executeEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'SKILL PAY COST EVAL ERROR');
    }
};

Game_BattlerBase.prototype.gauge1 = function() {
    return 'HP';
};

Game_BattlerBase.prototype.gauge2 = function() {
    return 'MP';
};

Game_BattlerBase.prototype.gauge3 = function() {
    return 'TP';
};

Game_BattlerBase.prototype.gaugeIcon1 = function() {
    return 0;
};

Game_BattlerBase.prototype.gaugeIcon2 = function() {
    return 0;
};

Game_BattlerBase.prototype.gaugeIcon3 = function() {
    return 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.gauge1 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gauge1 === 'UNDEFINED') continue;
      return equip.gauge1;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge1 === 'UNDEFINED') continue;
      return state.gauge1;
    }
    return this.currentClass().gauge1;
};

Game_Actor.prototype.gauge2 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gauge2 === 'UNDEFINED') continue;
      return equip.gauge2;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge2 === 'UNDEFINED') continue;
      return state.gauge2;
    }
    return this.currentClass().gauge2;
};

Game_Actor.prototype.gauge3 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gauge3 === 'UNDEFINED') continue;
      return equip.gauge3;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge3 === 'UNDEFINED') continue;
      return state.gauge3;
    }
    return this.currentClass().gauge3;
};

Game_Actor.prototype.gaugeIcon1 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gaugeIcon1 === 'UNDEFINED') continue;
      return equip.gaugeIcon1;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon1 === 'UNDEFINED') continue;
      return state.gaugeIcon1;
    }
    return this.currentClass().gaugeIcon1;
};

Game_Actor.prototype.gaugeIcon2 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gaugeIcon2 === 'UNDEFINED') continue;
      return equip.gaugeIcon2;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon2 === 'UNDEFINED') continue;
      return state.gaugeIcon2;
    }
    return this.currentClass().gaugeIcon2;
};

Game_Actor.prototype.gaugeIcon3 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gaugeIcon3 === 'UNDEFINED') continue;
      return equip.gaugeIcon3;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon3 === 'UNDEFINED') continue;
      return state.gaugeIcon3;
    }
    return this.currentClass().gaugeIcon3;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.gauge1 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge1 === 'UNDEFINED') continue;
      return state.gauge1;
    }
    return this.enemy().gauge1;
};

Game_Enemy.prototype.gauge2 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge2 === 'UNDEFINED') continue;
      return state.gauge2;
    }
    return this.enemy().gauge2;
};

Game_Enemy.prototype.gauge3 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge1 === 'UNDEFINED') continue;
      return state.gauge1;
    }
    return this.enemy().gauge3;
};

Game_Enemy.prototype.gaugeIcon1 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon1 === 'UNDEFINED') continue;
      return state.gaugeIcon1;
    }
    return this.enemy().gaugeIcon1;
};

Game_Enemy.prototype.gaugeIcon2 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon2 === 'UNDEFINED') continue;
      return state.gaugeIcon2;
    }
    return this.enemy().gaugeIcon2;
};

Game_Enemy.prototype.gaugeIcon3 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon3 === 'UNDEFINED') continue;
      return state.gaugeIcon3;
    }
    return this.enemy().gaugeIcon3;
};

if (!Game_Enemy.prototype.skills) {
    Game_Enemy.prototype.skills = function() {
      var skills = []
      for (var i = 0; i < this.enemy().actions.length; ++i) {
        var skill = $dataSkills[this.enemy().actions[i].skillId];
        if (skill) skills.push(skill);
      }
      return skills;
    }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Skill.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    this.applyBeforeEffect(target);
    this.applyBeforeEval(target);
    Yanfly.Skill.Game_Action_apply.call(this, target);
    this.applyAfterEffect(target);
    this.applyAfterEval(target);
};

Game_Action.prototype.applyBeforeEffect = function(target) {
};

Game_Action.prototype.applyBeforeEval = function(target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.customBeforeEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'BEFORE EVAL ERROR');
    }
};

Game_Action.prototype.applyAfterEffect = function(target) {
};

Game_Action.prototype.applyAfterEval = function(target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.customAfterEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'AFTER EVAL ERROR');
    }
};

Yanfly.Skill.Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    this.applyPreDamageEffect(target, value);
    value = this.applyPreDamageEval(target, value);
    Yanfly.Skill.Game_Action_executeDamage.call(this, target, value);
    this.applyPostDamageEffect(target, value);
    this.applyPostDamageEval(target, value);
};

Game_Action.prototype.applyPreDamageEffect = function(target, value) {
};

Game_Action.prototype.applyPreDamageEval = function(target, value) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.customPreDamageEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'PRE-DAMAGE EVAL ERROR');
    }
    return value;
};

Game_Action.prototype.applyPostDamageEffect = function(target, value) {
};

Game_Action.prototype.applyPostDamageEval = function(target, value) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.customPostDamageEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'POST-DAMAGE EVAL ERROR');
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Skill.Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    if (actor.gauge1() === 'HP') {
      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge1() === 'MP') {
      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge1() === 'TP') {
      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Yanfly.Skill.Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    if (actor.gauge2() === 'HP') {
      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge2() === 'MP') {
      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge2() === 'TP') {
      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Yanfly.Skill.Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    if (actor.gauge3() === 'HP') {
      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge3() === 'MP') {
      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge3() === 'TP') {
      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

//=============================================================================
// Window_SkillType
//=============================================================================

Window_SkillType.prototype.itemTextAlign = function() {
    return Yanfly.Param.SCCTextAlign;
};

//=============================================================================
// Window_SkillList
//=============================================================================

Window_SkillList.prototype.maxCols = function() {
    return Yanfly.Param.SCCWindowCol;
};

Yanfly.Skill.Window_SkillList_includes =
    Window_SkillList.prototype.includes;
Window_SkillList.prototype.includes = function(item) {
    if (this._actor) {
      if (!this._actor.noHiddenSkillConditionsMet(item)) return false;
    }
    return Yanfly.Skill.Window_SkillList_includes.call(this, item);
};

Window_SkillList.prototype.drawSkillCost = function(skill, wx, wy, width) {
    var dw = width;
    dw = this.drawTpCost(skill, wx, wy, dw);
    dw = this.drawMpCost(skill, wx, wy, dw);
    dw = this.drawHpCost(skill, wx, wy, dw);
    dw = this.drawCustomDisplayCost(skill, wx, wy, dw);
    dw = this.drawOtherCost(skill, wx, wy, dw);
    return dw;
};

Window_SkillList.prototype.drawTpCost = function(skill, wx, wy, dw) {
    if (this._actor.skillTpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Tp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Tp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCTpTextColor));
    var fmt = Yanfly.Param.SCCTpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillTpCost(skill)),
      TextManager.tpA);
    this.contents.fontSize = Yanfly.Param.SCCTpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawMpCost = function(skill, wx, wy, dw) {
    if (this._actor.skillMpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Mp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Mp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCMpTextColor));
    var fmt = Yanfly.Param.SCCMpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillMpCost(skill)),
      TextManager.mpA);
    this.contents.fontSize = Yanfly.Param.SCCMpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawHpCost = function(skill, wx, wy, dw) {
    if (this._actor.skillHpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Hp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Hp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCHpTextColor));
    var fmt = Yanfly.Param.SCCHpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillHpCost(skill)),
      TextManager.hpA);
    this.contents.fontSize = Yanfly.Param.SCCHpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_SkillList.prototype.drawCustomDisplayCost = function(skill, wx, wy, dw) {
    this.runDisplayEvalCost(skill);
    if (skill.customCostText === '') return dw;
    var width = this.textWidthEx(skill.customCostText);
    this.resetFontSettings();
    this.drawTextEx(skill.customCostText, wx - width + dw, wy);
    var returnWidth = dw - width - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.runDisplayEvalCost = function(skill) {
    if (skill.costdisplayEval === '') return;
    var item = skill;
    var a = this._actor;
    var user = this._actor;
    var subject = this._actor;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = skill.costdisplayEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'SKILL COST DISPLAY EVAL ERROR');
    }
};

Window_SkillList.prototype.drawOtherCost = function(skill, wx, wy, dw) {
    return dw;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

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

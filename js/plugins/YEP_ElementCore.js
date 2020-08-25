//=============================================================================
// Yanfly Engine Plugins - Element Core
// YEP_ElementCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ElementCore = true;

var Yanfly = Yanfly || {};
Yanfly.Ele = Yanfly.Ele || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 元素核心
 * @author Yanfly Engine Plugins
 *
 * @param Multi-Element Rulings
 * @desc If a skill/item has multiple elements, then use these rules:
 * 0 - Lowest; 1 - Add; 2 - Multiply; 3 - Highest; 4 - Average
 * @default 2
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 元素控制在RPG Maker MV里面是非常缺乏的。我们很难明白多少类型的元素被触
 * 发，我们有时候在某些方面只能凭直觉判断。这个插件可以让你的技能或者物品
 * 有多个元素属性，战斗者可以吸收，反弹或者增强伤害等。
 *
 * 如果你使用了 Element Reflect和Element Absorb插件，请关闭他们。不用担心
 * 会有什么影响，这个插件使用了和他们一样的标签命令
 *
 * 如果你使用了Battle Engine Core，请把这个插件放在它下面来获得更多功能特
 * 点。
 * 
 * 如果你使用了Damage Core，把这个插件放在它下面来提高兼容性
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 你可以使用下面标签来调整数据库里和元素相关的内容.
 *
 * Skill and Item Notetags
 *
 *   <Bypass Element Reflect>    忽略元素反弹
 *   - Allows this skill/item to ignore elemental reflect properties. This will
 *   not bypass reflect properties as a whole, however.
 *
 *   <Multiple Elements: x>
 *   <Multiple Elements: x to y>
 *   <Multiple Elements: x, x, x>
 *   <Multiple Elements: name, name, name>
 *   - This adds elements x (or name) to the skill/item in addition to the
 *   skill/item's current element. Skills and items with multiple elements will
 *   follow the Multi-Element Rule when calculating damage rate. Insert more of
 *   this notetag to insert more elements.
 *   给技能或者物品增加元素种类，他们将会服从混合元素规则
 *
 *   <Multi-Element Rule: Lowest>
 *   <Multi-Element Rule: Add>
 *   <Multi-Element Rule: Multiply>
 *   <Multi-Element Rule: Highest>
 *   <Multi-Element Rule: Average>
 *   - This allows you to set the rule for this skill/item if it has multiple
 *   elements. Either the lowest rate, the additive sum of all rates, the
 *   multiplicative product of all rates, or the highest rate will be used. If
 *   average is used, it will be the average of all element rates.
 *   这些规则可以用来限制多元素。包括取最低值，叠加，乘积，最高值，平均等
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Element Absorb: x>
 *   <Element Absorb: x, x, x>
 *   <Element Absorb: name>
 *   <Element Absorb: name, name, name>
 *   设置元素吸收。当某个元素被吸收时，比率将会下降200%而不是仅仅是个倒数。
 *   这意味着抵抗力强的将吸收更多伤害，抵抗力弱的吸收较少伤害。最小值是
 *   0.01%.
 *
 *   <Element Reflect x: +y%>
 *   <Element Reflect x: -y%>
 *   <Element Reflect name: +y%>
 *   <Element Reflect name: -y%>
 *   - 设置元素反射。如果技能或者物品有多个元素，反射率会叠加
 *
 *   <Element Magnify x: +y%>
 *   <Element Magnify x: -y%>
 *   <Element Magnify name: +y%>
 *   <Element Magnify name: -y%>
 *   - 设置元素吸收。如果技能或者物品有多个元素，增强率会叠加.
 *
 *   <Element Amplify x: +y%>
 *   <Element Amplify x: -y%>
 *   <Element Amplify name: +y%>
 *   <Element Amplify name: -y%>
 *   -设置元素增强。如果技能或者物品有多个元素，增强率会叠加
 *
 *   <Element Null>
 *   -设置无元素，但是这并不会忽略战斗序列里面的强制元素
 *
 *   <Force Element x Rate: y%>
 *   <Force Element name Rate: y%>
 *   -设置强制元素。这个的优先级为状态、装备、职业、角色或敌群。如果y是负值
 *   ，则该元素会被吸收
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 *
 * 如果你使用了YEP_BattleEngineCore。你可以使用下面的命令.
 *
 *=============================================================================
 * ADD ELEMENT: X
 * ADD ELEMENT: X, X, X
 * ADD ELEMENT: NAME
 * ADD ELEMENT: NAME, NAME, NAME
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这会增加元素
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: add element: 4
 *                add element: 5, 6, 7
 *                add element: fire
 *                add element: ice, wind, water
 *=============================================================================
 *
 *=============================================================================
 * CLEAR ELEMENT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will clear any ___ Element action sequence settings and revert element
 * calculation back to normal.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: clear element
 *=============================================================================
 *
 *=============================================================================
 * FORCE ELEMENT: X
 * FORCE ELEMENT: X, X, X
 * FORCE ELEMENT: NAME
 * FORCE ELEMENT: NAME, NAME, NAME
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 除了额外自定义的元素计算公式，这会覆盖元素设置
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: force element: 4
 *                force element: 5, 6, 7
 *                force element: fire
 *                force element: ice, wind, water
 *=============================================================================
 *
 *=============================================================================
 * NULL ELEMENT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这会强制元素为空
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: null element
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Added <Element x Magnify: +y%>, <Element x Magnify: -y%> notetags. These
 * notetags different from the Amplify counterparts in a way where the Amplify
 * notetags will shift the element rate additively. These will alter the rate
 * multiplicatively.
 *
 * Version 1.01:
 * - Optimized element rate calculation where if no elements are present, then
 * damage rate will default to 100%.
 *
  * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ElementCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EleMultiRule = Number(Yanfly.Parameters['Multi-Element Rulings']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Ele.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Ele.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_ElementCore) {
    this.processElementNotetagsSys($dataSystem);
    this.processElementNotetags1($dataSkills);
    this.processElementNotetags1($dataItems);
    this.processElementNotetags2($dataActors);
    this.processElementNotetags2($dataClasses);
    this.processElementNotetags2($dataEnemies);
    this.processElementNotetags2($dataWeapons);
    this.processElementNotetags2($dataArmors);
    this.processElementNotetags2($dataStates);
    Yanfly._loaded_YEP_ElementCore = true;
  }
  
  return true;
};

DataManager.processElementNotetagsSys = function(group) {
  Yanfly.ElementIdRef = {};
  for (var i = 1; i < group.elements.length; ++i) {
    var name = group.elements[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, '');
    Yanfly.ElementIdRef[name] = i;
  }
};

DataManager.processElementNotetags1 = function(group) {
  var noteA1 = /<MULTIPLE ELEMENTS:[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteA2 = /<MULTIPLE ELEMENTS:[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var noteA3 = /<MULTIPLE ELEMENTS:[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.elementMultiRule = Yanfly.Param.EleMultiRule;
    obj.multipleElements = [];
    obj.bypassElementReflect = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<MULTI-ELEMENT RULE:[ ]LOWEST>/i)) {
        obj.elementMultiRule = 0;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]ADD>/i)) {
        obj.elementMultiRule = 1;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]MULTIPLY>/i)) {
        obj.elementMultiRule = 2;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]HIGHEST>/i)) {
        obj.elementMultiRule = 3;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ]AVERAGE>/i)) {
        obj.elementMultiRule = 4;
      } else if (line.match(/<MULTI-ELEMENT RULE:[ ](.*)>/i)) {
        obj.elementMultiRule = String(RegExp.$1);
      } else if (line.match(noteA1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.multipleElements = obj.multipleElements.concat(array);
      } else if (line.match(noteA2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.multipleElements = obj.multipleElements.concat(range);
      } else if (line.match(noteA3)) {
        var text = String(RegExp.$1);
        var array = text.split(',');
        var length = array.length;
        for (var j = 0; j < length; ++j) {
          var name = array[j].toUpperCase().trim();
          if (Yanfly.ElementIdRef[name]) {
            var id = Yanfly.ElementIdRef[name];
            obj.multipleElements.push(id);
          }
        }
      } else if (line.match(/<(?:BYPASS ELEMENT REFLECT)>/i)) {
        obj.bypassElementReflect = true;
      }
    }
  }
};

DataManager.processElementNotetags2 = function(group) {
  var noteA1 = /<(?:ELEMENT ABSORB):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var noteB1 = /<(?:ELEMENT REFLECT)[ ](\d+):[ ]([\+\-]\d+)([%％])>/i;
  var noteB2 = /<(?:ELEMENT REFLECT)[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteC1 = /<(?:ELEMENT AMPLIFY)[ ](\d+):[ ]([\+\-]\d+)([%％])>/i;
  var noteC2 = /<(?:ELEMENT AMPLIFY)[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteC3 = /<(?:ELEMENT MAGNIFY)[ ](\d+):[ ]([\+\-]\d+)([%％])>/i;
  var noteC4 = /<(?:ELEMENT MAGNIFY)[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteD1 = /<FORCE ELEMENT[ ](\d+)[ ]RATE:[ ](\d+)([%％])>/i;
  var noteD2 = /<FORCE ELEMENT[ ](\d+)[ ]RATE:[ ]-(\d+)([%％])>/i;
  var noteD3 = /<FORCE ELEMENT[ ](.*)[ ]RATE:[ ](\d+)([%％])>/i;
  var noteD4 = /<FORCE ELEMENT[ ](.*)[ ]RATE:[ ]-(\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.elementAbsorb = [];
    obj.elementReflect = {};
    obj.elementAmplify = {};
    obj.elementMagnify = {};
    obj.elementNull = false;
    obj.elementForcedRate = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:ELEMENT ABSORB):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.elementAbsorb = obj.elementAbsorb.concat(array);
      } else if (line.match(noteA1)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.elementAbsorb = obj.elementAbsorb.concat(range);
      } else if (line.match(/<(?:ELEMENT ABSORB):[ ](.*)>/i)) {
        var text = String(RegExp.$1);
        var array = text.split(',');
        var length = array.length;
        for (var j = 0; j < length; ++j) {
          var name = array[j].toUpperCase().trim();
          if (Yanfly.ElementIdRef[name]) {
            var id = Yanfly.ElementIdRef[name];
            obj.elementAbsorb.push(id);
          }
        }
      } else if (line.match(noteB1)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementReflect[elementId] = rate;
      } else if (line.match(noteB2)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementReflect[id] = rate;
        }
      } else if (line.match(noteC1)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementAmplify[elementId] = rate;
      } else if (line.match(noteC2)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementAmplify[id] = rate;
        }
      } else if (line.match(noteC3)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementMagnify[elementId] = rate;
      } else if (line.match(noteC4)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementMagnify[id] = rate;
        }
      } else if (line.match(/<(?:ELEMENT NULL)>/i)) {
        obj.elementNull = true;
      } else if (line.match(noteD1)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementForcedRate[elementId] = rate;
      } else if (line.match(noteD2)) {
        var elementId = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2 * 0.01);
        obj.elementForcedRate[elementId] = rate * -1;
      } else if (line.match(noteD3)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementForcedRate[id] = rate;
        }
      } else if (line.match(noteD4)) {
        var name = String(RegExp.$1).toUpperCase().trim();
        var rate = parseFloat(RegExp.$2 * 0.01);
        if (Yanfly.ElementIdRef[name]) {
          var id = Yanfly.ElementIdRef[name];
          obj.elementForcedRate[id] = rate * -1;
        }
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

Yanfly.Ele.BattleManager_processActionSequence =
    BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ADD ELEMENT: X
  if (actionName === 'ADD ELEMENT') {
    return this.actionAddElement(actionArgs);
  }
  // CLEAR ELEMENT
  if (actionName === 'CLEAR ELEMENT') {
    return this.actionClearElement();
  }
  // FORCE ELEMENT: X
  if (actionName === 'FORCE ELEMENT') {
    return this.actionForceElement(actionArgs);
  }
  // FORCE ELEMENT
  if (actionName === 'NULL ELEMENT') {
    return this.actionNullElement();
  }
  return Yanfly.Ele.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.actionAddElement = function(actionArgs) {
    if (!actionArgs) return;
    var array = [];
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var ele = actionArgs[i].toUpperCase().trim();
      if (ele.match(/(\d+)/i)) {
        array.push(parseInt(RegExp.$1));
      } else if (Yanfly.ElementIdRef[ele]) {
        array.push(Yanfly.ElementIdRef[ele]);
      }
    }
    $gameTemp._addedElements = array;
    return true;
};

BattleManager.actionClearElement = function() {
    $gameTemp._addedElements = undefined;
    $gameTemp._forcedElements = undefined;
    return true;
};

BattleManager.actionForceElement = function(actionArgs) {
    if (!actionArgs) return;
    var array = [];
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var ele = actionArgs[i].toUpperCase().trim();
      if (ele.match(/(\d+)/i)) {
        array.push(parseInt(RegExp.$1));
      } else if (Yanfly.ElementIdRef[ele]) {
        array.push(Yanfly.ElementIdRef[ele]);
      }
    }
    $gameTemp._forcedElements = array;
    return true;
};

BattleManager.actionNullElement = function() {
    $gameTemp._forcedElements = [];
    return true;
};

}; // Imported.YEP_BattleEngineCore

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Ele.Game_BtlrBase_elementRate =
    Game_BattlerBase.prototype.elementRate;
Game_BattlerBase.prototype.elementRate = function(elementId) {
  var rate = this.forcedElementRate(elementId);
  if (rate !== undefined) return rate;
  var result = Yanfly.Ele.Game_BtlrBase_elementRate.call(this, elementId);
  if (this.isAbsorbElement(elementId) && result > 0) {
    result = Math.min(result - 2.0, -0.01);
  }
  return result;
};

Game_BattlerBase.prototype.getObjElementReflectRate = function(obj, elementId) {
  if (!obj) return 0;
  if (!obj.elementReflect) return 0;
  return obj.elementReflect[elementId] || 0;
};

Game_BattlerBase.prototype.getObjElementAmplifyRate = function(obj, elementId) {
  if (!obj) return 0;
  if (!obj.elementAmplify) return 0;
  return obj.elementAmplify[elementId] || 0;
};

Game_BattlerBase.prototype.getObjElementMagnifyRate = function(obj, elementId) {
  if (!obj) return 0;
  if (!obj.elementMagnify) return 0;
  return obj.elementMagnify[elementId] || 0;
};

Game_BattlerBase.prototype.getObjElementForcedRate = function(obj, elementId) {
  if (!obj) return undefined;
  if (!obj.elementForcedRate) return undefined;
  return obj.elementForcedRate[elementId] || undefined;
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.isAbsorbElement = function(elementId) {
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var state = this.states()[i];
    if (!state) continue;
    if (!state.elementAbsorb) continue;
    if (state.elementAbsorb.contains(elementId)) return true;
  }
  return false;
};

Game_Battler.prototype.elementReflectRate = function(elementId) {
  var rate = 0;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    rate += this.getObjElementReflectRate(obj, elementId);
  }
  return rate;
};

Game_Battler.prototype.elementAmplifyRate = function(elementId) {
  var rate = 0;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    rate += this.getObjElementAmplifyRate(obj, elementId);
  }
  return rate;
};

Game_Battler.prototype.elementMagnifyRate = function(elementId) {
  var rate = 1;
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.states()[i];
    rate += this.getObjElementMagnifyRate(obj, elementId);
  }
  return rate;
};

Game_Battler.prototype.isNullElement = function() {
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var state = this.states()[i];
    if (state && state.elementNull) return true;
  }
  return false;
};

Game_Battler.prototype.forcedElementRate = function(elementId) {
  var length = this.states().length;
  for (var i = 0; i < length; ++i) {
    var state = this.states()[i];
    var rate = this.getObjElementForcedRate(state, elementId);
    if (rate !== undefined) return rate;
  }
  return undefined;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.isAbsorbElement = function(elementId) {
  if (this.actor().elementAbsorb.contains(elementId)) return true;
  if (this.currentClass().elementAbsorb.contains(elementId)) return true;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    if (!equip) continue;
    if (!equip.elementAbsorb) continue;
    if (equip.elementAbsorb.contains(elementId)) return true;
  }
  return Game_Battler.prototype.isAbsorbElement.call(this, elementId);
};

Game_Actor.prototype.elementReflectRate = function(elementId) {
  var rate = Game_Battler.prototype.elementReflectRate.call(this, elementId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    rate += this.getObjElementReflectRate(obj, elementId);
  }
  rate += this.getObjElementReflectRate(this.actor(), elementId);
  rate += this.getObjElementReflectRate(this.currentClass(), elementId);
  return rate;
};

Game_Actor.prototype.elementAmplifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementAmplifyRate.call(this, elementId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    rate += this.getObjElementAmplifyRate(obj, elementId);
  }
  rate += this.getObjElementAmplifyRate(this.actor(), elementId);
  rate += this.getObjElementAmplifyRate(this.currentClass(), elementId);
  return rate;
};

Game_Actor.prototype.elementMagnifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementMagnifyRate.call(this, elementId);
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var obj = this.equips()[i];
    rate += this.getObjElementMagnifyRate(obj, elementId);
  }
  rate += this.getObjElementMagnifyRate(this.actor(), elementId);
  rate += this.getObjElementMagnifyRate(this.currentClass(), elementId);
  return rate;
};

Game_Actor.prototype.isNullElement = function() {
  if (this.actor().elementNull) return true;
  if (this.currentClass().elementNull) return true;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.elementNull) return true;
  }
  return Game_Battler.prototype.isNullElement.call(this);
};

Game_Actor.prototype.forcedElementRate = function(elementId) {
  var rate = Game_Battler.prototype.forcedElementRate.call(this, elementId);
  if (rate !== undefined) return rate;
  var length = this.equips().length;
  for (var i = 0; i < length; ++i) {
    var equip = this.equips()[i];
    rate = this.getObjElementForcedRate(equip, elementId);
    if (rate !== undefined) return rate;
  }
  rate = this.getObjElementForcedRate(this.currentClass(), elementId);
  if (rate !== undefined) return rate;
  rate = this.getObjElementForcedRate(this.actor(), elementId);
  if (rate !== undefined) return rate;
  return undefined;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.isAbsorbElement = function(elementId) {
  if (this.enemy().elementAbsorb.contains(elementId)) return true;
  return Game_Battler.prototype.isAbsorbElement.call(this, elementId);
};

Game_Enemy.prototype.elementReflectRate = function(elementId) {
  var rate = Game_Battler.prototype.elementReflectRate.call(this, elementId);
  rate += this.getObjElementReflectRate(this.enemy(), elementId);
  return rate;
};

Game_Enemy.prototype.elementAmplifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementAmplifyRate.call(this, elementId);
  rate += this.getObjElementAmplifyRate(this.enemy(), elementId);
  return rate;
};

Game_Enemy.prototype.elementMagnifyRate = function(elementId) {
  var rate = Game_Battler.prototype.elementMagnifyRate.call(this, elementId);
  rate += this.getObjElementMagnifyRate(this.enemy(), elementId);
  return rate;
};

Game_Enemy.prototype.isNullElement = function() {
  if (this.enemy().elementNull) return true;
  return Game_Battler.prototype.isNullElement.call(this);
};

Game_Enemy.prototype.forcedElementRate = function(elementId) {
  var rate = Game_Battler.prototype.forcedElementRate.call(this, elementId);
  if (rate !== undefined) return rate;
  rate = this.getObjElementForcedRate(this.enemy(), elementId);
  if (rate !== undefined) return rate;
  return undefined;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.getItemElements = function() {
  if ($gameTemp._forcedElements !== undefined) {
    return $gameTemp._forcedElements.filter(Yanfly.Util.onlyUnique);
  }
  if (this.subject().isNullElement()) return [];
  var elements = [];
  if (this.item().damage.elementId < 0) {
    Yanfly.Util.extend(elements, this.subject().attackElements());
  } else if (this.item().damage.elementId > 0) {
    elements.push(this.item().damage.elementId);
  }
  Yanfly.Util.extend(elements, this.item().multipleElements);
  if ($gameTemp._addedElements !== undefined) {
    Yanfly.Util.extend(elements, $gameTemp._addedElements);
  }
  return elements.filter(Yanfly.Util.onlyUnique);
};

Game_Action.prototype.calcElementRate = function(target) {
  if (!this.item()) return 1;
  var finalRate;
  var elements = this.getItemElements();
  if (elements.length < 1) return 1.00;
  var rule = this.item().elementMultiRule;
  var average = 0;
  while (elements.length > 0) {
    var elementId = elements.shift();
    var eleRate = target.elementRate(elementId);
    eleRate *= Math.max(0, this.subject().elementMagnifyRate(elementId));
    var absorbed = eleRate < 0;
    eleRate += this.subject().elementAmplifyRate(elementId);
    if (rule === 0) { // Lowest Rate
      finalRate = finalRate || eleRate;
      finalRate = Math.min(finalRate, eleRate);
    } else if (rule === 1) { // Additive
      finalRate = finalRate || 1.00;
      eleRate -= 1.00;
      finalRate += eleRate;
    } else if (rule === 2) { // Multiplicative
      finalRate = finalRate || 1.00;
      finalRate *= Math.abs(eleRate);
      if (eleRate < 0) finalRate = Math.abs(finalRate) * -1;
    } else if (rule === 3) { // Highest
      finalRate = finalRate || eleRate;
      finalRate = Math.max(finalRate, eleRate);
    } else if (rule === 4) { // Average
      finalRate = finalRate || 0;
      finalRate += eleRate;
      average += 1;
    } else {
      finalRate = this.calcElementRateRule(target, elementId, finalRate,
        eleRate, rule);
    }
  }
  if (rule === 4) finalRate /= Math.max(1, average);
  if (finalRate === undefined) finalRate = 1.00;
  return finalRate;
};

Game_Action.prototype.calcElementRateRule = function(target, elementId,
finalRate, eleRate, rule) {
  return finalRate;
};

Yanfly.Ele.Game_Action_itemMrf = Game_Action.prototype.itemMrf;
Game_Action.prototype.itemMrf = function(target) {
  var rate = Yanfly.Ele.Game_Action_itemMrf.call(this, target);
  if (this.item().bypassElementReflect) return rate;
  var elements = this.getItemElements();
  while (elements.length > 0) {
    var elementId = elements.shift();
    rate += target.elementReflectRate(elementId);
  }
  return rate;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.extend = function (mainArray, otherArray) {
    otherArray.forEach(function(i) {
      mainArray.push(i)
    }, this);
}

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================

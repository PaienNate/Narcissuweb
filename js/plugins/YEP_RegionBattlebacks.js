//=============================================================================
// Yanfly Engine Plugins - Region Battlebacks
// YEP_RegionBattlebacks.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RegionBattlebacks = true;

var Yanfly = Yanfly || {};
Yanfly.RBB = Yanfly.RBB || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 战斗背景区域
 * @author Yanfly Engine Plugins
 *
 * @param ----------
 * @default
 *
 * @param Default 1
 * @desc The filename used by default for battleback1.
 * Default: Grassland
 * @default Grassland
 *
 * @param Default 2
 * @desc The filename used by default for battleback2.
 * Default: Grassland
 * @default Grassland
 *
 * @param ----------
 * @default
 *
 * @param Ship 1
 * @desc The filename used by ships for battleback1.
 * Default: Ship
 * @default Ship
 *
 * @param Ship 2
 * @desc The filename used by ships for battleback2.
 * Default: Ship
 * @default Ship
 *
 * @param ----------
 * @default
 *
 * @param Forest 1
 * @desc The filename used by forests for battleback1.
 * Default: There is none.
 * @default There is none.
 *
 * @param Forest 2
 * @desc The filename used by forests for battleback2.
 * Default: Forest
 * @default Forest
 *
 * @param ----------
 * @default
 *
 * @param Cliff 1
 * @desc The filename used by cliffs for battleback1.
 * Default: There is none.
 * @default There is none.
 *
 * @param Cliff 2
 * @desc The filename used by cliffs for battleback2.
 * Default: Cliff
 * @default Cliff
 *
 * @param ----------
 * @default
 *
 * @param Wasteland 1
 * @desc The filename used by wastelands for battleback1.
 * Default: Wasteland
 * @default Wasteland
 *
 * @param Wasteland 2
 * @desc The filename used by wastelands for battleback2.
 * Default: Wasteland
 * @default Wasteland
 *
 * @param ----------
 * @default
 *
 * @param Dirtfield 1
 * @desc The filename used by dirt fields for battleback1.
 * Default: Wasteland
 * @default Wasteland
 *
 * @param Dirtfield 2
 * @desc The filename used by dirt fields for battleback2.
 * Default: There is none.
 * @default There is none.
 *
 * @param ----------
 * @default
 *
 * @param Desert 1
 * @desc The filename used by deserts for battleback1.
 * Default: Desert
 * @default Desert
 *
 * @param Desert 2
 * @desc The filename used by deserts for battleback2.
 * Default: Desert
 * @default Desert
 *
 * @param ----------
 * @default
 *
 * @param Lava1 1
 * @desc The filename used by lava type 1 for battleback1.
 * Default: Lava1
 * @default Lava1
 *
 * @param Lava1 2
 * @desc The filename used by lava type 1 for battleback2.
 * Default: Lava
 * @default Lava
 *
 * @param ----------
 * @default
 *
 * @param Lava2 1
 * @desc The filename used by lava type 2 for battleback1.
 * Default: Lava2
 * @default Lava2
 *
 * @param Lava2 2
 * @desc The filename used by lava type 2 for battleback2.
 * Default: Lava
 * @default Lava
 *
 * @param ----------
 * @default
 *
 * @param Snowfield 1
 * @desc The filename used by snow fields for battleback1.
 * Default: Snowfield
 * @default Snowfield
 *
 * @param Snowfield 2
 * @desc The filename used by snow fields for battleback2.
 * Default: Snowfield
 * @default Snowfield
 *
 * @param ----------
 * @default
 *
 * @param Clouds 1
 * @desc The filename used by clouds for battleback1.
 * Default: Clouds
 * @default Clouds
 *
 * @param Clouds 2
 * @desc The filename used by clouds for battleback2.
 * Default: Clouds
 * @default Clouds
 *
 * @param ----------
 * @default
 *
 * @param PoisonSwamp 1
 * @desc The filename used by poison swamps for battleback1.
 * Default: PoisonSwamp
 * @default PoisonSwamp
 *
 * @param PoisonSwamp 2
 * @desc The filename used by poison swamps for battleback2.
 * Default: PoisonSwamp
 * @default PoisonSwamp
 *
 * @param ----------
 * @default
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * region战斗背景定义工具--可以使用区域图块组控制你遇敌时的战斗背景
 * 什么叫区域图块组？就是图块组里的R选项卡,里面是1-255的ID标识
 * 同时这个插件还可以让你修改默认地形的遇敌背景,很方便。
 * 面parameters配置中,Battleback1表示背景图下层，即img\battlebacks1中的文件
 * Battleback2表示背景图上层，即img\battlebacks2中的文件，不再单独解释。
 * paremeters配置主要让你修改默认地图战斗背景使用，
 * 如果你想使用region区块标记不同的战斗背景,请使用地图配置界面的注释命令。
 * 使用世界地图时，你会发现自己并不能使用region区块来控制战斗背景。当然，本
 * 插件还能有效避免因为其他地图上战斗背景名称不匹配和加载失败引起的游戏崩溃。
 * 本插件可以允许你改变默认地形的默认战斗背景，同时也可以让你用地图注释命令
 * 定义使用region区块定义的特别战斗背景
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 要绑定背景地图给特殊的region区块，你可以使用下面的的注释命令:
 *
 * Map Notetags:
 *
 *   <Region x Battleback1: filename>
 *   <Region x Battleback2: filename>
 *   很简单x为region区块的ID号,filename为背景图片名称。注意这里只需要用文件名
 *   ，不需要路径，你的所有战斗背景都应该放在游戏工程的原始目录下面。
 *
 *   For example:
 *
 *   If you want Region 5 to use battleback1 Dirt2.png and battleback2 as
 *   Forest.png, you would use these two notetags:
 *
 *   <Region 5 Battleback1: Dirt2>
 *   <Region 5 Battleback2: Forest>
 *
 *   上面的命令实现了如果玩家踏入地图上ID为5的region标记区域触发的战斗都将会使
 *   用以Dirt2文件为地、Forest文件为天的战斗背景。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_RegionBattlebacks');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.RBBDefault1 = String(Yanfly.Parameters['Default 1']);
Yanfly.Param.RBBDefault2 = String(Yanfly.Parameters['Default 2']);
Yanfly.Param.RBBShip1 = String(Yanfly.Parameters['Ship 1']);
Yanfly.Param.RBBShip2 = String(Yanfly.Parameters['Ship 2']);
Yanfly.Param.RBBForest2 = String(Yanfly.Parameters['Forest 2']);
Yanfly.Param.RBBCliff2 = String(Yanfly.Parameters['Cliff 2']);
Yanfly.Param.RBBWasteland1 = String(Yanfly.Parameters['Wasteland 1']);
Yanfly.Param.RBBWasteland2 = String(Yanfly.Parameters['Wasteland 2']);
Yanfly.Param.RBBDirtField1 = String(Yanfly.Parameters['Dirtfield 1']);
Yanfly.Param.RBBDesert1 = String(Yanfly.Parameters['Desert 1']);
Yanfly.Param.RBBDesert2 = String(Yanfly.Parameters['Desert 2']);
Yanfly.Param.RBBLaval11 = String(Yanfly.Parameters['Lava1 1']);
Yanfly.Param.RBBLaval12 = String(Yanfly.Parameters['Lava1 2']);
Yanfly.Param.RBBLaval21 = String(Yanfly.Parameters['Lava2 1']);
Yanfly.Param.RBBLaval22 = String(Yanfly.Parameters['Lava2 2']);
Yanfly.Param.RBBSnowfield1 = String(Yanfly.Parameters['Snowfield 1']);
Yanfly.Param.RBBSnowfield2 = String(Yanfly.Parameters['Snowfield 2']);
Yanfly.Param.RBBClouds1 = String(Yanfly.Parameters['Clouds 1']);
Yanfly.Param.RBBClouds2 = String(Yanfly.Parameters['Clouds 2']);
Yanfly.Param.RBBPoisonSwamp1 = String(Yanfly.Parameters['PoisonSwamp 1']);
Yanfly.Param.RBBPoisonSwamp2 = String(Yanfly.Parameters['PoisonSwamp 2']);

//=============================================================================
// DataManager
//=============================================================================

DataManager.getBattlebackName = function(regionId, type) {
  if (!$dataMap) return '';
  var notedata = $dataMap.note.split(/[\r\n]+/);
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<REGION[ ](\d+)[ ]BATTLEBACK(\d+):[ ](.*)>/i)) {
      var id = parseInt(RegExp.$1);
      var typeId = parseInt(RegExp.$2);
      var name = String(RegExp.$3);
      if (id === regionId && typeId === type) return name;
    }
  }
  return '';
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.RBB.Game_Map_battleback1Name = Game_Map.prototype.battleback1Name;
Game_Map.prototype.battleback1Name = function() {
  var battlebackName = this.getRegionBattlebackName(1);
  if (battlebackName !== '') return battlebackName;
  return Yanfly.RBB.Game_Map_battleback1Name.call(this);
};

Yanfly.RBB.Game_Map_battleback2Name = Game_Map.prototype.battleback2Name;
Game_Map.prototype.battleback2Name = function() {
  var battlebackName = this.getRegionBattlebackName(2);
  if (battlebackName !== '') return battlebackName;
  return Yanfly.RBB.Game_Map_battleback2Name.call(this);
};

Game_Map.prototype.getRegionBattlebackName = function(type) {
  if (!$dataMap) return '';
  return DataManager.getBattlebackName($gamePlayer.regionId(), type);
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.terrainBattleback1Name = function(type) {
    switch (type) {
    case 24: case 25:
        return Yanfly.Param.RBBWasteland1;
    case 26: case 27:
        return Yanfly.Param.RBBDirtField1;
    case 32: case 33:
        return Yanfly.Param.RBBDesert1;
    case 34:
        return Yanfly.Param.RBBLaval11;
    case 35:
        return Yanfly.Param.RBBLaval21;
    case 40: case 41:
        return Yanfly.Param.RBBSnowfield1;
    case 42:
        return Yanfly.Param.RBBClouds1;
    case 4: case 5:
        return Yanfly.Param.RBBPoisonSwamp1;
    default:
        return null;
    }
};

Spriteset_Battle.prototype.terrainBattleback2Name = function(type) {
    switch (type) {
    case 20: case 21:
        return Yanfly.Param.RBBForest2;
    case 22: case 30: case 38:
        return Yanfly.Param.RBBCliff2;
    case 24: case 25: case 26: case 27:
        return Yanfly.Param.RBBWasteland2;
    case 32: case 33:
        return Yanfly.Param.RBBDesert2;
    case 34:
        return Yanfly.Param.RBBLaval12;
    case 35:
        return Yanfly.Param.RBBLaval22;
    case 40: case 41:
        return Yanfly.Param.RBBSnowfield2;
    case 42:
        return Yanfly.Param.RBBClouds2;
    case 4: case 5:
        return Yanfly.Param.RBBPoisonSwamp2;
    }
};

Spriteset_Battle.prototype.defaultBattleback1Name = function() {
    return Yanfly.Param.RBBDefault1;
};

Spriteset_Battle.prototype.defaultBattleback2Name = function() {
    return Yanfly.Param.RBBDefault2;
};

Spriteset_Battle.prototype.shipBattleback1Name = function() {
    return Yanfly.Param.RBBShip1;
};

Spriteset_Battle.prototype.shipBattleback2Name = function() {
    return Yanfly.Param.RBBShip2;
};

//=============================================================================
// End of File
//=============================================================================

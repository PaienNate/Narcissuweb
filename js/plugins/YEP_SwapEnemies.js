//=============================================================================
// Yanfly Engine Plugins - Swap Enemies
// YEP_SwapEnemies.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SwapEnemies = true;

var Yanfly = Yanfly || {};
Yanfly.SwE = Yanfly.SwE || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 敌人变换
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件可以让你的敌人变换外形。插件其他敌人ID在标签栏，这个敌人就会在战
 * 斗开始变换
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 敌人变换的目的是为了更好地在敌人池里面变出随机敌方。你可以使用下面的标签
 * 来设置:
 *
 * Enemy Notetag:
 *   <Swap: x, x, x>
 *   <Swap: x to y>  设置变换为x
 *   Changes this enemy into a swap dummy. Replace x with the ID's of the other
 *   enemies you would like to randomly spawn in its place. Insert multiples of
 *   this tag if you wish to add more randomized enemies to the pool.
 *
 *   <Swap>
 *   Slime
 *   Hornet
 *   Bat
 *   Wisp>
 *   </Swap> 用名字设置的变换对象。如果你有重名对象，则优先ID最高的
 *   If you wish to use names instead, you can construct your notetags in the
 *   above format. Enemies with matching names will be added to the random swap
 *   pool for the swap dummy. If you have multiple enemies in the database with
 *   the same name, priority will be given to the enemy with the highest ID.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Feature update. If a swap enemy swaps into another swap enemy, it will
 * then draw out a swap target from that enemy for up to 100 loops.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

Yanfly.SwE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.SwE.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_SwapEnemies) {
    this.processSwENotetagsE($dataEnemies);
    this.processSwENotetags1($dataEnemies);
    Yanfly._loaded_YEP_SwapEnemies = true;
  }
  return true;
};

DataManager.processSwENotetagsE = function(group) {
  if (Yanfly.EnemyIdRef) return;
  Yanfly.EnemyIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.EnemyIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processSwENotetags1 = function(group) {
  var note1 = /<(?:SWAP):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(?:SWAP):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.swapEnemies = [];
    var mode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.swapEnemies = obj.swapEnemies.concat(array);
      } else if (line.match(note2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.swapEnemies = obj.swapEnemies.concat(range);
      } else if (line.match(/<(?:SWAP)>/i)) {
        var mode = 'swap';
      } else if (line.match(/<\/(?:SWAP)>/i)) {
        var mode = 'none';
      } else if (mode === 'swap') {
        var name = line.toUpperCase();
        var id = Yanfly.EnemyIdRef[name];
        if (id) obj.swapEnemies.push(id);
      }
    }
    if (obj.swapEnemies.length > 0) {
      obj.battlerName = '';
      obj.battlerHue = 0;
    }
  }
};

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.SwE.Game_Enemy_initialize = Game_Enemy.prototype.initialize;
Game_Enemy.prototype.initialize = function(enemyId, x, y) {
  var loops = 100;
  var originalEnemyId = enemyId;
  while ($dataEnemies[enemyId].swapEnemies.length > 0) {
    var pool = $dataEnemies[enemyId].swapEnemies;
    var index = Math.floor(Math.random() * pool.length);
    enemyId = pool[index];
    loops--;
    if (loops <= 0) {
      console.log('Enemy ID ' + originalEnemyId + ' has a faulty swap pool.');
      break;
    }
  }
  Yanfly.SwE.Game_Enemy_initialize.call(this, enemyId, x, y);
};

//=============================================================================
// End of File
//=============================================================================

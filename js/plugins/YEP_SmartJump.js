//=============================================================================
// Yanfly Engine Plugins - Smart Jump
// YEP_SmartJump.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SmartJump = true;

var Yanfly = Yanfly || {};
Yanfly.Jump = Yanfly.Jump || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 智能跳跃
 * @author Yanfly Engine Plugins
 *
 * @param Illegal Regions
 * @desc These are the region ID's the player cannot jump on
 * or past. Separate each region with a space.
 * @default 0
 *
 * @param Equal Regions
 * @desc These are region ID's the player can only jump onto if
 * the tile they're standing on matches the target region.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 对于那些想制作自己的跳跃系统的人，你也许遇到过跳进你不应该进入的区域或者
 * 位于某些事件之上，这个插件将会修复并提供一个智能跳跃系统
 *
 * 智能跳跃允许你跳过区域，但是限制你跳在你不能去的地方。
 * 注意：对于使用者所说智能跳跃可以忽略接触事件和有毒地段，他们不可以。这不
 * 是BUG二更有可能是事件生效的方式。这取决于你设置智能跳跃后的等待时机，它可
 * 能会忽略接触事件。我发现如果你设置智能跳跃后的时间是10帧，它将会生效。
 *
 * ============================================================================
 * Instructions - Setting Up Smart Jumps
 * ============================================================================
 *
 * 使用插件命令SmartJump来设置智能跳跃
 *
 * 在插件参数里，标记不能跳跃的区域。你也可以在数据库里标记图块来限制玩家跳跃
 *
 * ============================================================================
 * Instructions - Equal Regions
 * ============================================================================
 *
 * For those of you who would like to make a height factor for your maps and
 * would like to maintain a jump system with that height factor, Equal Regions
 * will help out with that. List all the region ID's you'd like to use to mark
 * height within the 'Equal Regions' plugin parameter. You can insert multiple
 * regions. Separate them with a space.
 *
 * When the player is standing on a region that's listed in the Equal Regions
 * plugin parameter and attempts to smart jump onto an area blocked by tileset
 * passability, if the region the player is jumping from is the same region ID
 * as the region the player intends to go through, the jump becomes legal.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 你可以使用下面的标签来设置玩家不能通过的区域
 *
 * Tileset Notetags:
 *
 *   <Illegal Jump: x>
 *   <Illegal Jump: x, x, x>
 *   <Illegal Jump: x to y>  不能跳跃的区域
 *   Replace x with the terrain tags you want to forbid the player from going
 *   past or landing on while doing Smart Jumps.
 *
 * Event Notetag:
 *
 *   <Illegal Jump>  不能跳跃的事件
 *   This will prevent the player from being able to jump on or over this
 *   event while doing Smart Jumps. If the event is set to Through mode, then
 *   the player can jump through or onto the event.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Fixed a bug that allowed you to perform a smart jump from above a tile
 * that requires equal regions.
 *
 * Version 1.01:
 * - Added 'Equal Regions' plugin parameter. This is a unique region area. More
 * of it will be explained in the instructions.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SmartJump');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.JumpIllegalRegion = String(Yanfly.Parameters['Illegal Regions']);
Yanfly.Param.JumpEqualRegion = String(Yanfly.Parameters['Equal Regions']);

Yanfly.createSmartJumpRegions = function() {
    var regions = Yanfly.Param.JumpIllegalRegion.split(' ');
    var length = regions.length;
    Yanfly.Param.JumpIllegalRegion = [];
    for (var i = 0; i < length; ++i) {
      Yanfly.Param.JumpIllegalRegion[i] = parseInt(regions[i]);
    }
    var regions = Yanfly.Param.JumpEqualRegion.split(' ');
    var length = regions.length;
    Yanfly.Param.JumpEqualRegion = [];
    for (var i = 0; i < length; ++i) {
      Yanfly.Param.JumpEqualRegion[i] = parseInt(regions[i]);
    }
};

Yanfly.createSmartJumpRegions();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Jump.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.Jump.DataManager_isDatabaseLoaded.call(this)) return false;
    this.processJumpNotetags1($dataTilesets);
    return true;
};

DataManager.processJumpNotetags1 = function(group) {
  var note1a = /<(?:ILLEGAL JUMP):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:ILLEGAL JUMP):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.illegalJumpTag = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.illegalJumpTag = obj.illegalJumpTag.concat(array);
      } else if (line.match(note1b)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.illegalJumpTag = obj.illegalJumpTag.concat(range);
      }
    }
  }
};

DataManager.processJumpNotetags2 = function(obj) {
  var notedata = obj.note.split(/[\r\n]+/);
  obj.illegalJump = false;
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<(?:ILLEGAL JUMP)>/i)) {
      obj.illegalJump = true;
    }
  }
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Game_CharacterBase.prototype.smartJump = function(distance) {
    if (distance === 0) return this.jump(0, 0);
    this.setupSmartJump(this.getSmartJumpDistance(distance));
};

Game_CharacterBase.prototype.setupSmartJump = function(distance) {
    if (this._direction === 2) {
      this.jump(0, distance);
    } else if (this._direction === 4) {
      this.jump(-distance, 0);
    } else if (this._direction === 6) {
      this.jump(distance, 0);
    } else if (this._direction === 8) {
      this.jump(0, -distance);
    }
};

Game_CharacterBase.prototype.getSmartJumpDistance = function(distance) {
    if (this._direction === 2) {
      for (var i = 0; i < distance; ++i) {
        if (this.isSmartJumpIllegalRegion(this.x, this.y + i + 1)) {
          distance = i;
          break;
        }
      }
    } else if (this._direction === 4) {
      for (var i = 0; i < distance; ++i) {
        if (this.isSmartJumpIllegalRegion(this.x - i - 1, this.y)) {
          distance = i;
          break;
        }
      }
    } else if (this._direction === 6) {
      for (var i = 0; i < distance; ++i) {
        if (this.isSmartJumpIllegalRegion(this.x + i + 1, this.y)) {
          distance = i;
          break;
        }
      }
    } else if (this._direction === 8) {
      for (var i = 0; i < distance; ++i) {
        if (this.isSmartJumpIllegalRegion(this.x, this.y - i - 1)) {
          distance = i;
          break;
        }
      }
    }
    return this.calcSmartJumpDistance(distance);
};

Game_CharacterBase.prototype.isSmartJumpIllegalRegion = function(x, y) {
    if (x < 0 || y < 0) return true;
    if (x > $gameMap.width() - 1 || y > $gameMap.height() - 1) return true;
    if (this.isThrough()) return false;
    var regionId = $gameMap.regionId(x, y);
    if (Yanfly.Param.JumpEqualRegion.contains(regionId)) {
      if (this.regionId() === regionId) return false;
    }
    if (regionId > 0 && Yanfly.Param.JumpIllegalRegion.contains(regionId)) {
      return true;
    }
    var tileset = $gameMap.tileset();
    if (tileset && tileset.illegalJumpTag.contains($gameMap.terrainTag(x, y))) {
      return true;
    }
    var events = $gameMap.eventsXy(x, y);
    var length = events.length;
    for (var i = 0; i < length; ++i) {
      var ev = events[i];
      if (!ev) continue;
      if (ev.isThrough()) continue;
      if (ev.isSmartJumpBlocked()) return true;
    }
    return false;
};

Game_CharacterBase.prototype.calcSmartJumpDistance = function(distance) {
    var max = distance;
    var value = 0;
    if (this._direction === 2) {
      for (var i = 0; i < max; ++i) {
        if (this.isSmartJumpValid(this.x, this.y + max - i)) {
          value = max - i;
          break;
        }
      }
    } else if (this._direction === 4) {
      for (var i = 0; i < max; ++i) {
        if (this.isSmartJumpValid(this.x - max + i, this.y)) {
          value = max - i;
          break;
        }
      }
    } else if (this._direction === 6) {
      for (var i = 0; i < max; ++i) {
        if (this.isSmartJumpValid(this.x + max - i, this.y)) {
          value = max - i;
          break;
        }
      }
    } else if (this._direction === 8) {
      for (var i = 0; i < max; ++i) {
        if (this.isSmartJumpValid(this.x, this.y - max + i)) {
          value = max - i;
          break;
        }
      }
    }
    return value;
};

Game_CharacterBase.prototype.isSmartJumpValid = function(x, y) {
    if (this.isThrough()) return true;
    var events = $gameMap.eventsXyNt(x, y);
    var length = events.length;
    var regionId = $gameMap.regionId(x, y);
    if (Yanfly.Param.JumpEqualRegion.contains(regionId)) {
      if (this.regionId() !== regionId) return false;
    }
    for (var i = 0; i < length; ++i) {
      var ev = events[i];
      if (!ev) continue;
      if (ev.isThrough()) continue;
      if (ev.isNormalPriority()) return false;
      if (ev.isSmartJumpBlocked()) return false;
    }
    var regionId = $gameMap.regionId(x, y);
    if (regionId > 0 && Yanfly.Param.JumpEqualRegion.contains(regionId)) {
      if (this.regionId() === regionId) return true;
    }
    return $gameMap.isPassable(x, y, this._direction);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.Jump.Game_Event_setupPageSettings = 
    Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    Yanfly.Jump.Game_Event_setupPageSettings.call(this);
    DataManager.processJumpNotetags2(this.event());
};

Game_Event.prototype.isSmartJumpBlocked = function() {
    if (this.event().illegalJump === undefined) {
      DataManager.processJumpNotetags2(this.event());
    }
    return this.event().illegalJump;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Jump.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Jump.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'SmartJump') {
    $gamePlayer.smartJump(parseInt(args[0]));
  }
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

//=============================================================================
// End of File
//=============================================================================

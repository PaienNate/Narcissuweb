//=============================================================================
// Yanfly Engine Plugins - Map Select Equip
// YEP_MapSelectEquip.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MapSelectEquip = true;

var Yanfly = Yanfly || {};
Yanfly.MSE = Yanfly.MSE || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 地图上物品选择
 * @author Yanfly Engine Plugins
 *
 * @param Default Columns
 * @desc Default number of columns for the window.
 * @default 2
 *
 * @param Default Rows
 * @desc Default number of rows for the window.
 * @default 4
 *
 * @param Default X Position
 * @desc Default X Position of the window.
 * left     center     right
 * @default center
 *
 * @param Default Y Position
 * @desc Default Y Position of the window.
 * top     middle     bottom
 * @default bottom
 *
 * @param Default Width
 * @desc Default width of the window.
 * If set to 0, window width will be the screen width.
 * @default 0
 *
 * @param Default Enable
 * @desc Enable all equips by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Default Quantity
 * @desc Show the quantity of the equips by default?
 * NO - false     YES - true
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 物品选择事件在MV中确实执行了它应该做的：选择一个物品并且赋予数值给变量。
 * 可是，它不能选择武器、护甲等。这个插件可以让你选择装备物品并且绑定它们的
 * ID给变量。
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * 使用下面的变量来调整装备选择插件
 *
 * --- Plugin Commands ---
 *
 * MapSelectEquip var type
 * -这件会打开选择窗口，替代var为某个变量ID，替代type为物品属性
 *
 * MapSelectEquipColumns x
 * -设置选择窗口可显示的的列数
 *
 * MapSelectEquipRows x
 * -设置选择窗口可显示的行数
 *
 * MapSelectEquipWidth x
 * -设置选择窗口的宽度
 *
 * MapSelectEquipX left
 * MapSelectEquipX center
 * MapSelectEquipX right
 * -设置选择窗口的水平位置
 *
 * MapSelectEquipY top
 * MapSelectEquipY middle
 * MapSelectEquipY bottom
 * -设置选择窗口的竖直位置
 *
 * ShowMapSelectEquipQuantity
 * -显示物品数量
 *
 * HideMapSelectEquipQuantity
 * -隐藏物品数量
 */
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MapSelectEquip');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MSECol = Number(Yanfly.Parameters['Default Columns']);
Yanfly.Param.MSERow = Number(Yanfly.Parameters['Default Rows']);
Yanfly.Param.MSEPosX = String(Yanfly.Parameters['Default X Position']);
Yanfly.Param.MSEPosY = String(Yanfly.Parameters['Default Y Position']);
Yanfly.Param.MSEWidth = Number(Yanfly.Parameters['Default Width']);
Yanfly.Param.MSEEnable = eval(String(Yanfly.Parameters['Default Enable']));
Yanfly.Param.MSEQuantity = eval(String(Yanfly.Parameters['Default Quantity']));

//=============================================================================
// Game_System
//=============================================================================

Yanfly.MSE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.MSE.Game_System_initialize.call(this);
    this.initMapSelectEquip();
};

Game_System.prototype.initMapSelectEquip = function() {
    this._MapSelectEquipWindowColumns = Yanfly.Param.MSECol;
    this._MapSelectEquipWindowRows = Yanfly.Param.MSERow;
    this._MapSelectEquipWindowPosX = Yanfly.Param.MSEPosX;
    this._MapSelectEquipWindowPosY = Yanfly.Param.MSEPosY;
    this._MapSelectEquipWindowWidth = Yanfly.Param.MSEWidth;
    this._MapSelectEquipWindowEnable = Yanfly.Param.MSEEnable;
    this._MapSelectEquipWindowQuantity = Yanfly.Param.MSEQuantity;
};

Game_System.prototype.getMapSelectEquipColumns = function() {
    if (this._MapSelectEquipWindowColumns === undefined) {
      this.initMapSelectEquip();
    }
    return this._MapSelectEquipWindowColumns;
};

Game_System.prototype.setMapSelectEquipColumns = function(value) {
    if (this._MapSelectEquipWindowColumns === undefined) {
      this.initMapSelectEquip();
    }
    this._MapSelectEquipWindowColumns = value;
};

Game_System.prototype.getMapSelectEquipRows = function() {
    if (this._MapSelectEquipWindowRows === undefined) {
      this.initMapSelectEquip();
    }
    return this._MapSelectEquipWindowRows;
};

Game_System.prototype.setMapSelectEquipRows = function(value) {
    if (this._MapSelectEquipWindowRows === undefined) {
      this.initMapSelectEquip();
    }
    this._MapSelectEquipWindowRows = value;
};

Game_System.prototype.getMapSelectEquipPosX = function() {
    if (this._MapSelectEquipWindowPosX === undefined) {
      this.initMapSelectEquip();
    }
    return this._MapSelectEquipWindowPosX;
};

Game_System.prototype.setMapSelectEquipPosX = function(value) {
    if (this._MapSelectEquipWindowPosX === undefined) {
      this.initMapSelectEquip();
    }
    this._MapSelectEquipWindowPosX = value;
};

Game_System.prototype.getMapSelectEquipPosY = function() {
    if (this._MapSelectEquipWindowPosY === undefined) {
      this.initMapSelectEquip();
    }
    return this._MapSelectEquipWindowPosY;
};

Game_System.prototype.setMapSelectEquipPosY = function(value) {
    if (this._MapSelectEquipWindowPosY === undefined) {
      this.initMapSelectEquip();
    }
    this._MapSelectEquipWindowPosY = value;
};

Game_System.prototype.getMapSelectEquipWidth = function() {
    if (this._MapSelectEquipWindowWidth === undefined) {
      this.initMapSelectEquip();
    }
    return this._MapSelectEquipWindowWidth;
};

Game_System.prototype.setMapSelectEquipWidth = function(value) {
    if (this._MapSelectEquipWindowWidth === undefined) {
      this.initMapSelectEquip();
    }
    this._MapSelectEquipWindowWidth = value;
};

Game_System.prototype.getMapSelectEquipEnable = function() {
    if (this._MapSelectEquipWindowEnable === undefined) {
      this.initMapSelectEquip();
    }
    return this._MapSelectEquipWindowEnable;
};

Game_System.prototype.setMapSelectEquipEnable = function(value) {
    if (this._MapSelectEquipWindowEnable === undefined) {
      this.initMapSelectEquip();
    }
    this._MapSelectEquipWindowEnable = value;
};

Game_System.prototype.getMapSelectEquipQuantity = function() {
    if (this._MapSelectEquipWindowQuantity === undefined) {
      this.initMapSelectEquip();
    }
    return this._MapSelectEquipWindowQuantity;
};

Game_System.prototype.setMapSelectEquipQuantity = function(value) {
    if (this._MapSelectEquipWindowQuantity === undefined) {
      this.initMapSelectEquip();
    }
    this._MapSelectEquipWindowQuantity = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.MSE.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.MSE.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'MapSelectEquip') {
    if (SceneManager._scene instanceof Scene_Map) {
      var varId = parseInt(args[0]);
      var line = String(args[1]);
      if (line.match(/WEAPON/i)) {
        var type = 'WEAPONS';
      } else if (line.match(/ARMOR/i)) {
        var type = 'ARMORS';
      } else if (line.match(/BOTH/i)) {
        var type = 'BOTH';
      } else {
        return;
      }
      SceneManager._scene.setupMapSelectEquip(varId, type, false);
      this.wait(10);
    }
  } else if (command === 'MapSelectEquipBase') {
    if (SceneManager._scene instanceof Scene_Map) {
      var varId = parseInt(args[0]);
      var line = String(args[1]);
      if (line.match(/WEAPON/i)) {
        var type = 'WEAPONS';
      } else if (line.match(/ARMOR/i)) {
        var type = 'ARMORS';
      } else if (line.match(/BOTH/i)) {
        var type = 'BOTH';
      } else {
        return;
      }
      SceneManager._scene.setupMapSelectEquip(varId, type, true);
      this.wait(10);
    }
  } else if (command === 'MapSelectEquipColumns') {
    var value = parseInt(args[0]);
    $gameSystem.setMapSelectEquipColumns(value);
  } else if (command === 'MapSelectEquipRows') {
    var value = parseInt(args[0]);
    $gameSystem.setMapSelectEquipRows(value);
  } else if (command === 'MapSelectEquipWidth') {
    var value = parseInt(args[0]);
    $gameSystem.setMapSelectEquipWidth(value);
  } else if (command === 'MapSelectEquipX') {
    var value = String(args[0]).toLowerCase();
    $gameSystem.setMapSelectEquipPosX(value);
  } else if (command === 'MapSelectEquipY') {
    var value = String(args[0]).toLowerCase();
    $gameSystem.setMapSelectEquipPosY(value);
  } else if (command === 'ShowMapSelectEquipQuantity') {
    $gameSystem.setMapSelectEquipQuantity(true);
  } else if (command === 'HideMapSelectEquipQuantity') {
    $gameSystem.setMapSelectEquipQuantity(false);
  }
};

//=============================================================================
// Window_MapSelectEquip
//=============================================================================

function Window_MapSelectEquip() {
    this.initialize.apply(this, arguments);
}

Window_MapSelectEquip.prototype = Object.create(Window_ItemList.prototype);
Window_MapSelectEquip.prototype.constructor = Window_MapSelectEquip;

Window_MapSelectEquip.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.openness = 0;
};

Window_MapSelectEquip.prototype.windowWidth = function() {
    return this._windowWidth || Graphics.boxWidth;
};

Window_MapSelectEquip.prototype.windowHeight = function() {
    return this._windowHeight || this.fittingHeight(4);
};

Window_MapSelectEquip.prototype.setup = function(varId, type, base) {
    if (!varId) return;
    if (!type) return;
    this.updateWindowSettings();
    this._varId = varId;
    this._base = base;
    this.setType(type)
    this.refresh();
    this.activate();
    this.open();
    this.select(0);
};

Window_MapSelectEquip.prototype.setType = function(type) {
    this._type = type.toUpperCase();
};

Window_MapSelectEquip.prototype.includes = function(item) {
    if (DataManager.isWeapon(item)) {
      return ['WEAPONS', 'BOTH'].contains(this._type);
    }
    if (DataManager.isArmor(item)) {
      return ['ARMORS', 'BOTH'].contains(this._type);
    }
    return false;
};

Window_MapSelectEquip.prototype.maxCols = function() {
    return $gameSystem.getMapSelectEquipColumns() || 1;
};

Window_MapSelectEquip.prototype.updateWindowSettings = function() {
    this.width = $gameSystem.getMapSelectEquipWidth() || Graphics.boxWidth;
    var col = $gameSystem.getMapSelectEquipRows() || 4;
    this.height = this.fittingHeight(col);
    if ($gameSystem.getMapSelectEquipPosX() === 'left') {
      this.x = 0;
    } else if ($gameSystem.getMapSelectEquipPosX() === 'center') {
      this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
    } else {
      this.x = Graphics.boxWidth - this.width;
    }
    if ($gameSystem.getMapSelectEquipPosY() === 'top') {
      this.y = 0;
    } else if ($gameSystem.getMapSelectEquipPosY() === 'middle') {
      this.y = Math.floor((Graphics.boxHeight - this.height) / 2);
    } else {
      this.y = Graphics.boxHeight - this.height;
    }
};

Window_MapSelectEquip.prototype.isEnabled = function(item) {
    if ($gameSystem.getMapSelectEquipEnable()) return true;
    return Window_ItemList.prototype.isEnabled.call(this, item);
};

Window_MapSelectEquip.prototype.drawItemNumber = function(item, x, y, width) {
  if ($gameSystem.getMapSelectEquipQuantity()) {
    Window_ItemList.prototype.drawItemNumber.call(this, item, x, y, width);
  }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.MSE.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Yanfly.MSE.Scene_Map_createAllWindows.call(this);
    this.createMapSelectEquipWindow();
};

Scene_Map.prototype.createMapSelectEquipWindow = function() {
    this._MapSelectEquipWindow = new Window_MapSelectEquip();
    this._MapSelectEquipWindow.setHandler('ok', 
      this.onMapSelectEquipOk.bind(this));
    this._MapSelectEquipWindow.setHandler('cancel', 
      this.onMapSelectEquipCancel.bind(this));
    this.addChild(this._MapSelectEquipWindow);
};

Scene_Map.prototype.setupMapSelectEquip = function(varId, type, base) {
    this._MapSelectEquipWindow.setup(varId, type, base);
    this._active = false;
};

Scene_Map.prototype.onMapSelectEquipOk = function() {
    this._MapSelectEquipWindow.close();
    var item = this._MapSelectEquipWindow.item();
    var varId = this._MapSelectEquipWindow._varId;
    if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvBridge();
    if (!item) {
      $gameVariables.setValue(varId, 0);
    } else {
      if (this._MapSelectEquipWindow._base && item.baseItemId) {
        $gameVariables.setValue(varId, item.baseItemId);
      } else {
        $gameVariables.setValue(varId, item.id);
      }
    }
    if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvent();
    this._active = true;
};

Scene_Map.prototype.onMapSelectEquipCancel = function() {
    this._MapSelectEquipWindow.close();
    var varId = this._MapSelectEquipWindow._varId;
    $gameVariables.setValue(varId, 0);
    this._active = true;
};

//=============================================================================
// End of File
//=============================================================================

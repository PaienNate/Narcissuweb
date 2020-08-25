//=============================================================================
// Yanfly Engine Plugins - Grid-Free Doodads Extension - Extended Doodad Pack 1
// YEP_X_ExtDoodadPack1.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ExtDoodadPack1 = true;

var Yanfly = Yanfly || {};
Yanfly.EDP1 = Yanfly.EDP1 || {};
Yanfly.EDP1.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 摆件放置拓展包1
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件需要YEP_GridFreeDoodads，确保这个插件在YEP_GridFreeDoodads下面
 *
 * 这个插件可以让你在摆件放置编辑器里面设置更多细节。你可以设置摆件的
 * 色调，出现
 * 
 * ============================================================================
 * Doodad Settings - Tone
 * ============================================================================
 *
 * 这个色调是摆件图片的色调，可以用来展示不同颜色等，这就意味着你不需要制
 * 作很多资源就可以设置更多摆件，而且相对于系统色调来说内存占用会更小。
 *
 * ============================================================================
 * Doodad Settings - Party
 * ============================================================================
 *
 * 如果你希望摆件可以根据成员是否在队伍内来出现或隐藏，你可以通过设置来做
 * 到。你可以设置当某个成员加入时，摆件出现或者消失在房间内。这个条件针对
 * 的是队伍成员是否在活动队伍或者轮换列表里，他们在这里没有区别。
 *
 * ============================================================================
 * Doodad Settings - Switches
 * ============================================================================
 *
 * 如果你希望摆件可以根据开关情况来出现或隐藏，你也可以通过设置来做到。你
 * 可以为每一个摆件设置多个开关。当所有开关匹配时才会触发。如果某个摆件需
 * 要开关是打开，而目前是关闭状态，那么他会持续隐藏直到开关打开。反之亦
 * 然。。如果某个摆件需要开关是关闭，而目前是开启状态，那么他会持续显示
 * 直到开关关闭
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version BETA:
 * - Started Plugin!
 */
//=============================================================================

if (Imported.YEP_GridFreeDoodads) {

if (Yanfly.GFD.version && Yanfly.GFD.version >= 1.03) {

//=============================================================================
// Sprite_Doodad
//=============================================================================

Yanfly.EDP1.Sprite_Doodad_initCustomDataZ =
  Sprite_Doodad.prototype.initCustomDataZ;
Sprite_Doodad.prototype.initCustomDataZ = function() {
  Yanfly.EDP1.Sprite_Doodad_initCustomDataZ.call(this);
  this.initCustomEDP1DataZ();
};

Sprite_Doodad.prototype.initCustomEDP1DataZ = function() {
  var toneRed = this._data.toneRed || 0;
  var toneGreen = this._data.toneGreen || 0;
  var toneBlue = this._data.toneBlue || 0;
  var toneGrey = this._data.toneGrey || 0;
  this.setColorTone([toneRed, toneGreen, toneBlue, toneGrey]);
  this.switchOn = this._data.switchOn || [];
  this.switchOff = this._data.switchOff || [];
  this.partyHave = this._data.partyHave || [];
  this.partyMiss = this._data.partyMiss || [];
};

Yanfly.EDP1.Sprite_Doodad_updateCustomA =
  Sprite_Doodad.prototype.updateCustomA;
Sprite_Doodad.prototype.updateCustomA = function() {
  this.resetOpacity();
  Yanfly.EDP1.Sprite_Doodad_updateCustomA.call(this);
};

Sprite_Doodad.prototype.resetOpacity = function() {
  this.opacity = this._data.opacity || 0;
};

Yanfly.EDP1.Sprite_Doodad_updateCustomZ = Sprite_Doodad.prototype.updateCustomZ;
Sprite_Doodad.prototype.updateCustomZ = function() {
  Yanfly.EDP1.Sprite_Doodad_updateCustomZ.call(this);
  this.updateCustomEDP1Z();
};

Sprite_Doodad.prototype.updateCustomEDP1Z = function() {
  if ($gameTemp._modeGFD) return;
  // Party
  var length = this.partyHave.length;
  for (var i = 0; i < length; ++i) {
    var actorId = this.partyHave[i];
    if (!$gameParty._actors.contains(actorId)) {
      this.opacity = 0;
      return;
    }
  }
  var length = this.partyMiss.length;
  for (var i = 0; i < length; ++i) {
    var actorId = this.partyMiss[i];
    if ($gameParty._actors.contains(actorId)) {
      this.opacity = 0;
      return;
    }
  }
  // Switches
  var length = this.switchOn.length;
  for (var i = 0; i < length; ++i) {
    var switchId = this.switchOn[i];
    if (!$gameSwitches.value(switchId)) {
      this.opacity = 0;
      return;
    }
  }
  var length = this.switchOff.length;
  for (var i = 0; i < length; ++i) {
    var switchId = this.switchOff[i];
    if ($gameSwitches.value(switchId)) {
      this.opacity = 0;
      return;
    }
  }
};

//=============================================================================
// Play Test Only
//=============================================================================

if (Utils.isNwjs() && Utils.isOptionValid('test')) {

//=============================================================================
// Window_GFD_Settings
//=============================================================================

Yanfly.EDP1.Window_GFD_Settings_addCustomCommands =
  Window_GFD_Settings.prototype.addCustomCommands;
Window_GFD_Settings.prototype.addCustomCommands = function() {
  this.addLineCommand();
  Yanfly.EDP1.Window_GFD_Settings_addCustomCommands.call(this);
};

Yanfly.EDP1.Window_GFD_Settings_addCustomCommandsP =
  Window_GFD_Settings.prototype.addCustomCommandsP;
Window_GFD_Settings.prototype.addCustomCommandsP = function() {
  Yanfly.EDP1.Window_GFD_Settings_addCustomCommandsP.call(this);
  this.addCustomEDP1PartyCommands();
};

Window_GFD_Settings.prototype.addCustomEDP1PartyCommands = function() {
  this.addCommand('Party', 'party');
};

Yanfly.EDP1.Window_GFD_Settings_addCustomCommandsS =
  Window_GFD_Settings.prototype.addCustomCommandsS;
Window_GFD_Settings.prototype.addCustomCommandsS = function() {
  Yanfly.EDP1.Window_GFD_Settings_addCustomCommandsS.call(this);
  this.addCustomEDP1SwitchCommands();
};

Window_GFD_Settings.prototype.addCustomEDP1SwitchCommands = function() {
  this.addCommand('Switch', 'switch');
};

Yanfly.EDP1.Window_GFD_Settings_addCustomCommandsT =
  Window_GFD_Settings.prototype.addCustomCommandsT;
Window_GFD_Settings.prototype.addCustomCommandsT = function() {
  Yanfly.EDP1.Window_GFD_Settings_addCustomCommandsT.call(this);
  this.addCustomEDP1ToneCommands();
};

Window_GFD_Settings.prototype.addCustomEDP1ToneCommands = function() {
  this.addLineCommand();
  this.addCommand('Tone Preset', 'toneSet');
  this.addCommand('Tone: Red', 'toneRed');
  this.addCommand('Tone: Green', 'toneGreen');
  this.addCommand('Tone: Blue', 'toneBlue');
  this.addCommand('Tone: Grey', 'toneGrey');
  this.addCommand('Tone: Randomize Red', 'toneRandomRed');
  this.addCommand('Tone: Randomize Green', 'toneRandomGreen');
  this.addCommand('Tone: Randomize Blue', 'toneRandomBlue');
  this.addCommand('Tone: Randomize Grey', 'toneRandomGrey');
  this.addCommand('Tone: Randomize All', 'toneRandomAll');
  this.addLineCommand();
};

Yanfly.EDP1.Window_GFD_Settings_drawItem =
  Window_GFD_Settings.prototype.drawItem;
Window_GFD_Settings.prototype.drawItem = function(index) {
  this.changeTextColor(this.normalColor());
  Yanfly.EDP1.Window_GFD_Settings_drawItem.call(this, index);
  if (!this._doodad) return;
  var symbol = this.commandSymbol(index);
  var rect = this.itemRectForText(index);
  var text = '';
  switch (symbol) {
  case 'party':
    this._doodad.partyHave = this._doodad.partyHave || [];
    this._doodad.partyMiss = this._doodad.partyMiss || [];
    if (this._doodad.partyHave.length > 1) {
      text = 'Many'
    } else if (this._doodad.partyMiss.length > 1) {
      text = 'Many'
    } else if (this._doodad.partyHave.length === 1 &&
    this._doodad.partyMiss.length === 1) {
      text = 'Many'
    } else if (this._doodad.partyHave.length === 1 &&
    this._doodad.partyMiss.length === 0) {
      var actorId = this._doodad.partyHave[0];
      var actor = $gameActors.actor(actorId);
      if (actor) {
        text = actor.name() + ' Joined';
      } else {
        text = 'Null';
      }
    } else if (this._doodad.partyHave.length === 0 &&
    this._doodad.partyMiss.length === 1) {
      var actorId = this._doodad.partyMiss[0];
      var actor = $gameActors.actor(actorId);
      if (actor) {
        text = actor.name() + ' Missing';
      } else {
        text = 'Null';
      }
    } else {
      text = 'None';
    }
    break;
  case 'toneSet':
    this._doodad.toneRed = this._doodad.toneRed || 0;
    this._doodad.toneGreen = this._doodad.toneGreen || 0;
    this._doodad.toneBlue = this._doodad.toneBlue || 0;
    this._doodad.toneGrey = this._doodad.toneGrey || 0;
    var red = this._doodad.toneRed;
    var green = this._doodad.toneGreen;
    var blue = this._doodad.toneBlue;
    var grey = this._doodad.toneGrey;
    if (red === 0 && green === 0 && blue === 0 && grey === 0) {
      text = 'Normal';
    } else if (red === 0 && green === 0 && blue === 0 && grey === 255) {
      text = 'Grey';
    } else if (red === 255 && green === 0 && blue === 0 && grey === 255) {
      text = 'Red';
    } else if (red === 255 && green === 64 && blue === 0 && grey === 255) {
      text = 'Orange';
    } else if (red === 255 && green === 255 && blue === 0 && grey === 255) {
      text = 'Yellow';
    } else if (red === 68 && green === 255 && blue === 0 && grey === 255) {
      text = 'Lime';
    } else if (red === 0 && green === 255 && blue === 0 && grey === 255) {
      text = 'Green';
    } else if (red === 0 && green === 255 && blue === 68 && grey === 255) {
      text = 'Turquoise';
    } else if (red === 0 && green === 255 && blue === 255 && grey === 255) {
      text = 'Cyan';
    } else if (red === 0 && green === 68 && blue === 255 && grey === 255) {
      text = 'Sky';
    } else if (red === 0 && green === 0 && blue === 255 && grey === 255) {
      text = 'Blue';
    } else if (red === 68 && green === 0 && blue === 255 && grey === 255) {
      text = 'Purple';
    } else if (red === 255 && green === 0 && blue === 255 && grey === 255) {
      text = 'Magenta';
    } else if (red === 255 && green === 0 && blue === 68 && grey === 255) {
      text = 'Pink';
    } else if (red === -68 && green === -68 && blue === -68 && grey === 0) {
      text = 'Dark';
    } else if (red === 34 && green === -34 && blue === -68 && grey === 170) {
      text = 'Sepia';
    } else if (red === 68 && green === -34 && blue === -34 && grey === 0) {
      text = 'Sunset';
    } else if (red === -68 && green === -68 && blue === 0 && grey === 68) {
      text = 'Night';
    } else {
      text = 'Custom';
    }
    break;
  case 'toneRed':
    this._doodad.toneRed = this._doodad.toneRed || 0;
    text = this._doodad.toneRed;
    this.changeTextColor('#ff0000');
    break;
  case 'toneGreen':
    this._doodad.toneGreen = this._doodad.toneGreen || 0;
    text = this._doodad.toneGreen;
    this.changeTextColor('#00ff00');
    break;
  case 'toneBlue':
    this._doodad.toneBlue = this._doodad.toneBlue || 0;
    text = this._doodad.toneBlue;
    this.changeTextColor('#0000ff');
    break;
  case 'toneGrey':
    this._doodad.toneGrey = this._doodad.toneGrey || 0;
    text = this._doodad.toneGrey;
    this.changeTextColor('#888888');
    break;
  case 'switch':
    this._doodad.switchOn = this._doodad.switchOn || [];
    this._doodad.switchOff = this._doodad.switchOff || [];
    if (this._doodad.switchOn.length > 1) {
      text = 'Many'
    } else if (this._doodad.switchOff.length > 1) {
      text = 'Many'
    } else if (this._doodad.switchOn.length === 1 &&
    this._doodad.switchOff.length === 1) {
      text = 'Many'
    } else if (this._doodad.switchOn.length === 1 &&
    this._doodad.switchOff.length === 0) {
      text = 'Switch ' + this._doodad.switchOn[0] + ' On';
    } else if (this._doodad.switchOn.length === 0 &&
    this._doodad.switchOff.length === 1) {
      text = 'Switch ' + this._doodad.switchOff[0] + ' Off';
    } else {
      text = 'None';
    }
    break;
  }
  this.drawText(text, rect.x, rect.y, rect.width, 'right');
};

Yanfly.EDP1.DM_inputLeft = DoodadManager.inputLeft;
DoodadManager.inputLeft = function(doodad, symbol, value) {
  doodad.toneRed = doodad.toneRed || 0;
  doodad.toneGreen = doodad.toneGreen || 0;
  doodad.toneBlue = doodad.toneBlue || 0;
  doodad.toneGrey = doodad.toneGrey || 0;
  switch (symbol) {
  case 'toneRed':
    if (doodad.toneRed <= -255) return;
    value *= 5;
    if (Input.isPressed('shift')) value = 1;
    doodad.toneRed = (doodad.toneRed - value).clamp(-255, 255);
    break;
  case 'toneGreen':
    if (doodad.toneGreen <= -255) return;
    value *= 5;
    if (Input.isPressed('shift')) value = 1;
    doodad.toneGreen = (doodad.toneGreen - value).clamp(-255, 255);
    break;
  case 'toneBlue':
    if (doodad.toneBlue <= -255) return;
    value *= 5;
    if (Input.isPressed('shift')) value = 1;
    doodad.toneBlue = (doodad.toneBlue - value).clamp(-255, 255);
    break;
  case 'toneGrey':
    if (doodad.toneGrey <= 0) return;
    value *= 5;
    if (Input.isPressed('shift')) value = 1;
    doodad.toneGrey = (doodad.toneGrey - value).clamp(0, 255);
    break;
  default:
    return Yanfly.EDP1.DM_inputLeft.call(this, doodad, symbol, value);
    break;
  }
  SoundManager.playCursor();
  SceneManager._scene._gfdSettingsWindow.refresh();
  this.updateNewSettings();
};

Yanfly.EDP1.DM_inputRight = DoodadManager.inputRight;
DoodadManager.inputRight = function(doodad, symbol, value) {
  doodad.toneRed = doodad.toneRed || 0;
  doodad.toneGreen = doodad.toneGreen || 0;
  doodad.toneBlue = doodad.toneBlue || 0;
  doodad.toneGrey = doodad.toneGrey || 0;
  switch (symbol) {
  case 'toneRed':
    if (doodad.toneRed >= 255) return;
    value *= 5;
    if (Input.isPressed('shift')) value = 1;
    doodad.toneRed = (doodad.toneRed + value).clamp(-255, 255);
    break;
  case 'toneGreen':
    if (doodad.toneGreen >= 255) return;
    value *= 5;
    if (Input.isPressed('shift')) value = 1;
    doodad.toneGreen = (doodad.toneGreen + value).clamp(-255, 255);
    break;
  case 'toneBlue':
    if (doodad.toneBlue >= 255) return;
    value *= 5;
    if (Input.isPressed('shift')) value = 1;
    doodad.toneBlue = (doodad.toneBlue + value).clamp(-255, 255);
    break;
  case 'toneGrey':
    if (doodad.toneGrey >= 255) return;
    value *= 5;
    if (Input.isPressed('shift')) value = 1;
    doodad.toneGrey = (doodad.toneGrey + value).clamp(0, 255);
    break;
  default:
    return Yanfly.EDP1.DM_inputLeft.call(this, doodad, symbol, value);
    break;
  }
  SoundManager.playCursor();
  SceneManager._scene._gfdSettingsWindow.refresh();
  this.updateNewSettings();
};

//=============================================================================
// Window_GFD_SettingsTonePresets
//=============================================================================

function Window_GFD_SettingsTonePresets() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsTonePresets.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsTonePresets.prototype.constructor = Window_GFD_SettingsTonePresets;

Window_GFD_SettingsTonePresets.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsTonePresets.prototype.windowHeight = function() {
  var winHeight = this.fittingHeight(this.numVisibleRows());
  return Math.min(Graphics.boxHeight, winHeight);
};

Window_GFD_SettingsTonePresets.prototype.makeCommandList = function() {
  this.addCommand(   'Normal', 'tonePreset', true, [  0,   0,   0,   0]);
  this.addCommand(     'Grey', 'tonePreset', true, [  0,   0,   0, 255]);
  this.addCommand(      'Red', 'tonePreset', true, [255,   0,   0, 255]);
  this.addCommand(   'Orange', 'tonePreset', true, [255,  64,   0, 255]);
  this.addCommand(   'Yellow', 'tonePreset', true, [255, 255,   0, 255]);
  this.addCommand(     'Lime', 'tonePreset', true, [ 68, 255,   0, 255]);
  this.addCommand(    'Green', 'tonePreset', true, [  0, 255,   0, 255]);
  this.addCommand('Turquoise', 'tonePreset', true, [  0, 255,  68, 255]);
  this.addCommand(     'Cyan', 'tonePreset', true, [  0, 255, 255, 255]);
  this.addCommand(      'Sky', 'tonePreset', true, [  0,  68, 255, 255]);
  this.addCommand(     'Blue', 'tonePreset', true, [  0,   0, 255, 255]);
  this.addCommand(   'Purple', 'tonePreset', true, [ 68,   0, 255, 255]);
  this.addCommand(  'Magenta', 'tonePreset', true, [255,   0, 255, 255]);
  this.addCommand(     'Pink', 'tonePreset', true, [255,   0,  68, 255]);
  this.addCommand(     'Dark', 'tonePreset', true, [-68, -68, -68,   0]);
  this.addCommand(    'Sepia', 'tonePreset', true, [ 34, -34, -68, 170]);
  this.addCommand(   'Sunset', 'tonePreset', true, [ 68, -34, -34,   0]);
  this.addCommand(    'Night', 'tonePreset', true, [-68, -68,   0,  68]);
};

Window_GFD_SettingsTonePresets.prototype.itemTextAlign = function() {
  return 'center';
};

//=============================================================================
// Window_GFD_SettingsToneRGB
//=============================================================================

function Window_GFD_SettingsToneRGB() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsToneRGB.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsToneRGB.prototype.constructor = Window_GFD_SettingsToneRGB;

Window_GFD_SettingsToneRGB.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsToneRGB.prototype.windowHeight = function() {
  var winHeight = this.fittingHeight(this.numVisibleRows());
  return Math.min(Graphics.boxHeight, winHeight);
};

Window_GFD_SettingsToneRGB.prototype.makeCommandList = function() {
  this.addCommand(' 255', 'toneSet', true,   255);
  this.addCommand(' 250', 'toneSet', true,   250);
  this.addCommand(' 200', 'toneSet', true,   200);
  this.addCommand(' 150', 'toneSet', true,   150);
  this.addCommand(' 128', 'toneSet', true,   128);
  this.addCommand(' 100', 'toneSet', true,   100);
  this.addCommand('  75', 'toneSet', true,    75);
  this.addCommand('  50', 'toneSet', true,    50);
  this.addCommand('  25', 'toneSet', true,    25);
  this.addCommand('   0', 'toneSet', true,     0);
  this.addCommand(' -25', 'toneSet', true,   -25);
  this.addCommand(' -50', 'toneSet', true,   -50);
  this.addCommand(' -75', 'toneSet', true,   -75);
  this.addCommand('-100', 'toneSet', true,  -100);
  this.addCommand('-128', 'toneSet', true,  -128);
  this.addCommand('-150', 'toneSet', true,  -150);
  this.addCommand('-200', 'toneSet', true,  -200);
  this.addCommand('-250', 'toneSet', true,  -250);
  this.addCommand('-255', 'toneSet', true,  -255);
};

Window_GFD_SettingsToneRGB.prototype.itemTextAlign = function() {
  return 'center';
};

//=============================================================================
// Window_GFD_SettingsToneGrey
//=============================================================================

function Window_GFD_SettingsToneGrey() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsToneGrey.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsToneGrey.prototype.constructor = Window_GFD_SettingsToneGrey;

Window_GFD_SettingsToneGrey.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsToneGrey.prototype.makeCommandList = function() {
  this.addCommand(' 255', 'toneSet', true,   255);
  this.addCommand(' 250', 'toneSet', true,   250);
  this.addCommand(' 200', 'toneSet', true,   200);
  this.addCommand(' 150', 'toneSet', true,   150);
  this.addCommand(' 128', 'toneSet', true,   128);
  this.addCommand(' 100', 'toneSet', true,   100);
  this.addCommand('  75', 'toneSet', true,    75);
  this.addCommand('  50', 'toneSet', true,    50);
  this.addCommand('  25', 'toneSet', true,    25);
  this.addCommand('   0', 'toneSet', true,     0);
};

Window_GFD_SettingsToneGrey.prototype.itemTextAlign = function() {
  return 'center';
};

//=============================================================================
// Window_GFD_SettingsParty
//=============================================================================

function Window_GFD_SettingsParty() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsParty.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsParty.prototype.constructor = Window_GFD_SettingsParty;

Window_GFD_SettingsParty.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsParty.prototype.windowWidth = function() {
  return Graphics.boxWidth - 400;
};

Window_GFD_SettingsParty.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_GFD_SettingsParty.prototype.maxCols = function() {
  return 4;
};

Window_GFD_SettingsParty.prototype.spacing = function() {
  return 0;
};

Window_GFD_SettingsParty.prototype.itemRect = function(index) {
  var rect = Window_Command.prototype.itemRect.call(this, index);
  if (this._textWidth === undefined) {
    this._textWidth = this.textWidth('-Missing-');
  }
  if (index % 4 === 0) {
    rect.width = this.contents.width - this._textWidth * 3;
  } else if (index % 4 === 1) {
    rect.x = this.contents.width - this._textWidth * 3;
    rect.width = this._textWidth;
  } else if (index % 4 === 2) {
    rect.x = this.contents.width - this._textWidth * 2;
    rect.width = this._textWidth;
  } else if (index % 4 === 3) {
    rect.x = this.contents.width - this._textWidth * 1;
    rect.width = this._textWidth;
  }
  return rect;
};

Window_GFD_SettingsParty.prototype.makeCommandList = function() {
  var actors = $dataActors;
  var length = actors.length;
  var fmt = 'A%1: %2';
  for (var i = 1; i < length; ++i) {
    var actorId = i;
    var actor = $gameActors.actor(actorId);
    if (!actor) continue;
    var actorName = actor.name();
    if (actorName === '') continue;
    var text = fmt.format(actorId.padZero(4), actorName);
    this.addCommand(text, 'actorName');
    this.addCommand('n/a', 'partyNone', true, actorId);
    this.addCommand('Joined', 'partyHave', true, actorId);
    this.addCommand('Missing', 'partyMiss', true, actorId);
  }
};

Window_GFD_SettingsParty.prototype.drawItem = function(index) {
  var symbol = this.commandSymbol(index);
  if (symbol === 'actorName') {
    return Window_Command.prototype.drawItem.call(this, index);
  }
  var ext = this._list[index].ext;
  var rect = this.itemRectForText(index);
  var align = 'center';
  var enabled = false;
  this.resetTextColor();
  var doodad = SceneManager._scene._gfdSettingsWindow._doodad;
  if (!doodad) return;
  doodad.partyHave = doodad.partyHave || [];
  doodad.partyMiss = doodad.partyMiss || [];
  if (symbol === 'partyNone') {
    enabled = !doodad.partyHave.contains(ext) && !doodad.partyMiss.contains(ext);
  } else if (symbol === 'partyHave') {
    enabled = doodad.partyHave.contains(ext);
  } else if (symbol === 'partyMiss') {
    enabled = doodad.partyMiss.contains(ext);
  }
  this.changePaintOpacity(enabled);
  this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

//=============================================================================
// Window_GFD_SettingsSwitch
//=============================================================================

function Window_GFD_SettingsSwitch() {
  this.initialize.apply(this, arguments);
}

Window_GFD_SettingsSwitch.prototype = Object.create(Window_Command.prototype);
Window_GFD_SettingsSwitch.prototype.constructor = Window_GFD_SettingsSwitch;

Window_GFD_SettingsSwitch.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 400, 0);
  this.setGFD();
};

Window_GFD_SettingsSwitch.prototype.windowWidth = function() {
  return Graphics.boxWidth - 400;
};

Window_GFD_SettingsSwitch.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_GFD_SettingsSwitch.prototype.maxCols = function() {
  return 4;
};

Window_GFD_SettingsSwitch.prototype.spacing = function() {
  return 0;
};

Window_GFD_SettingsSwitch.prototype.itemRect = function(index) {
  var rect = Window_Command.prototype.itemRect.call(this, index);
  if (this._textWidth === undefined) {
    this._textWidth = this.textWidth('12345');
  }
  if (index % 4 === 0) {
    rect.width = this.contents.width - this._textWidth * 3;
  } else if (index % 4 === 1) {
    rect.x = this.contents.width - this._textWidth * 3;
    rect.width = this._textWidth;
  } else if (index % 4 === 2) {
    rect.x = this.contents.width - this._textWidth * 2;
    rect.width = this._textWidth;
  } else if (index % 4 === 3) {
    rect.x = this.contents.width - this._textWidth * 1;
    rect.width = this._textWidth;
  }
  return rect;
};

Window_GFD_SettingsSwitch.prototype.makeCommandList = function() {
  var switches = $dataSystem.switches;
  var length = switches.length;
  var fmt = 'S%1: %2';
  for (var i = 1; i < length; ++i) {
    var switchId = i;
    var switchName = $dataSystem.switches[i];
    if (switchName === '') continue;
    var text = fmt.format(switchId.padZero(4), switchName);
    this.addCommand(text, 'switchName');
    this.addCommand('n/a', 'switchNone', true, switchId);
    this.addCommand('ON', 'switchOn', true, switchId);
    this.addCommand('OFF', 'switchOff', true, switchId);
  }
};

Window_GFD_SettingsSwitch.prototype.drawItem = function(index) {
  var symbol = this.commandSymbol(index);
  if (symbol === 'switchName') {
    return Window_Command.prototype.drawItem.call(this, index);
  }
  var ext = this._list[index].ext;
  var rect = this.itemRectForText(index);
  var align = 'center';
  var enabled = false;
  this.resetTextColor();
  var doodad = SceneManager._scene._gfdSettingsWindow._doodad;
  if (!doodad) return;
  doodad.switchOn = doodad.switchOn || [];
  doodad.switchOff = doodad.switchOff || [];
  if (symbol === 'switchNone') {
    enabled = !doodad.switchOn.contains(ext) && !doodad.switchOff.contains(ext);
  } else if (symbol === 'switchOn') {
    enabled = doodad.switchOn.contains(ext);
  } else if (symbol === 'switchOff') {
    enabled = doodad.switchOff.contains(ext);
  }
  this.changePaintOpacity(enabled);
  this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.EDP1.Scene_Map_createGFDSettingsWindow =
  Scene_Map.prototype.createGFDSettingsWindow;
Scene_Map.prototype.createGFDSettingsWindow = function() {
  Yanfly.EDP1.Scene_Map_createGFDSettingsWindow.call(this);
  var win = this._gfdSettingsWindow;
  win.setHandler('party', this.cmdGFDSettingsParty.bind(this));
  win.setHandler('switch', this.cmdGFDSettingsSwitch.bind(this));

  win.setHandler('toneSet', this.cmdGFDSettingsTonePreset.bind(this));
  win.setHandler('toneRed', this.cmdGFDSettingsToneRed.bind(this));
  win.setHandler('toneGreen', this.cmdGFDSettingsToneGreen.bind(this));
  win.setHandler('toneBlue', this.cmdGFDSettingsToneBlue.bind(this));
  win.setHandler('toneGrey', this.cmdGFDSettingsToneGrey.bind(this));
  win.setHandler('toneRandomRed', this.cmdGFDSettToneRandomRed.bind(this));
  win.setHandler('toneRandomGreen', this.cmdGFDSettToneRandomGreen.bind(this));
  win.setHandler('toneRandomBlue', this.cmdGFDSettToneRandomBlue.bind(this));
  win.setHandler('toneRandomGrey', this.cmdGFDSettToneRandomGrey.bind(this));
  win.setHandler('toneRandomAll', this.cmdGFDSettToneRandomAll.bind(this));
};

Yanfly.EDP1.Scene_Map_createGFDSettingsSubwindows =
  Scene_Map.prototype.createGFDSettingsSubwindows;
Scene_Map.prototype.createGFDSettingsSubwindows = function() {
  Yanfly.EDP1.Scene_Map_createGFDSettingsSubwindows.call(this);
  this.createGFDSettingsTonePresetWindow();
  this.createGFDSettingsToneRGBWindow();
  this.createGFDSettingsToneGreyWindow();
  this.createGFDSettingsPartyWindow();
  this.createGFDSettingsSwitchWindow();
};

// Party Window

Scene_Map.prototype.createGFDSettingsPartyWindow = function() {
  this._gfdSettingsPartyWindow = new Window_GFD_SettingsParty();
  this.addChild(this._gfdSettingsPartyWindow);
  this._gfdWindows.push(this._gfdSettingsPartyWindow);
  var win = this._gfdSettingsPartyWindow;
  win.setHandler('cancel', this.cancelGFDSettParty.bind(this));
  win.setHandler('partyNone', this.cmdGFDSettPartyNone.bind(this));
  win.setHandler('partyHave', this.cmdGFDSettPartyHave.bind(this));
  win.setHandler('partyMiss', this.cmdGFDSettPartyMiss.bind(this));
};

Scene_Map.prototype.cmdGFDSettingsParty = function() {
  this._gfdSettingsPartyWindow.activate();
  this._gfdSettingsPartyWindow.open();
  this._gfdSettingsPartyWindow.select(0);
  this._gfdSettingsPartyWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettParty = function() {
  this._gfdSettingsPartyWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettPartyNone = function() {
  var ext = this._gfdSettingsPartyWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;

  doodad.partyHave = doodad.partyHave || [];
  var index = doodad.partyHave.indexOf(ext);
  if (index >= 0) doodad.partyHave.splice(index, 1);

  doodad.partyMiss = doodad.partyMiss || [];
  var index = doodad.partyMiss.indexOf(ext);
  if (index >= 0) doodad.partyMiss.splice(index, 1);

  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.refresh();
  this._gfdSettingsPartyWindow.activate();
  this._gfdSettingsPartyWindow.refresh();
};

// Switch Window

Scene_Map.prototype.createGFDSettingsSwitchWindow = function() {
  this._gfdSettingsSwitchWindow = new Window_GFD_SettingsSwitch();
  this.addChild(this._gfdSettingsSwitchWindow);
  this._gfdWindows.push(this._gfdSettingsSwitchWindow);
  var win = this._gfdSettingsSwitchWindow;
  win.setHandler('cancel', this.cancelGFDSettSwitch.bind(this));
  win.setHandler('switchNone', this.cmdGFDSettSwitchNone.bind(this));
  win.setHandler('switchOn', this.cmdGFDSettSwitchOn.bind(this));
  win.setHandler('switchOff', this.cmdGFDSettSwitchOff.bind(this));
};

Scene_Map.prototype.cmdGFDSettingsSwitch = function() {
  this._gfdSettingsSwitchWindow.activate();
  this._gfdSettingsSwitchWindow.open();
  this._gfdSettingsSwitchWindow.select(0);
  this._gfdSettingsSwitchWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettSwitch = function() {
  this._gfdSettingsSwitchWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettSwitchNone = function() {
  var ext = this._gfdSettingsSwitchWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;

  doodad.switchOn = doodad.switchOn || [];
  var index = doodad.switchOn.indexOf(ext);
  if (index >= 0) doodad.switchOn.splice(index, 1);

  doodad.switchOff = doodad.switchOff || [];
  var index = doodad.switchOff.indexOf(ext);
  if (index >= 0) doodad.switchOff.splice(index, 1);

  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.refresh();
  this._gfdSettingsSwitchWindow.activate();
  this._gfdSettingsSwitchWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettSwitchOn = function() {
  var ext = this._gfdSettingsSwitchWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;

  doodad.switchOn = doodad.switchOn || [];
  var index = doodad.switchOn.indexOf(ext);
  if (!doodad.switchOn.contains(ext)) doodad.switchOn.push(ext);

  doodad.switchOff = doodad.switchOff || [];
  var index = doodad.switchOff.indexOf(ext);
  if (index >= 0) doodad.switchOff.splice(index, 1);

  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.refresh();
  this._gfdSettingsSwitchWindow.activate();
  this._gfdSettingsSwitchWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettSwitchOff = function() {
  var ext = this._gfdSettingsSwitchWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  
  doodad.switchOn = doodad.switchOn || [];
  var index = doodad.switchOn.indexOf(ext);
  if (index >= 0) doodad.switchOn.splice(index, 1);

  doodad.switchOff = doodad.switchOff || [];
  if (!doodad.switchOff.contains(ext)) doodad.switchOff.push(ext);

  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.refresh();
  this._gfdSettingsSwitchWindow.activate();
  this._gfdSettingsSwitchWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettPartyHave = function() {
  var ext = this._gfdSettingsPartyWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;

  doodad.partyHave = doodad.partyHave || [];
  var index = doodad.partyHave.indexOf(ext);
  if (!doodad.partyHave.contains(ext)) doodad.partyHave.push(ext);

  doodad.partyMiss = doodad.partyMiss || [];
  var index = doodad.partyMiss.indexOf(ext);
  if (index >= 0) doodad.partyMiss.splice(index, 1);

  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.refresh();
  this._gfdSettingsPartyWindow.activate();
  this._gfdSettingsPartyWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettPartyMiss = function() {
  var ext = this._gfdSettingsPartyWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  
  doodad.partyHave = doodad.partyHave || [];
  var index = doodad.partyHave.indexOf(ext);
  if (index >= 0) doodad.partyHave.splice(index, 1);

  doodad.partyMiss = doodad.partyMiss || [];
  if (!doodad.partyMiss.contains(ext)) doodad.partyMiss.push(ext);

  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.refresh();
  this._gfdSettingsPartyWindow.activate();
  this._gfdSettingsPartyWindow.refresh();
};

// Tone Preset Window

Scene_Map.prototype.createGFDSettingsTonePresetWindow = function() {
  this._gfdSettingsTonePresetWindow = new Window_GFD_SettingsTonePresets();
  this.addChild(this._gfdSettingsTonePresetWindow);
  this._gfdWindows.push(this._gfdSettingsTonePresetWindow);
  var win = this._gfdSettingsTonePresetWindow;
  win.setHandler('cancel', this.cancelGFDSettTonePreset.bind(this));
  win.setHandler('tonePreset', this.cmdGFDSettTonePresetOk.bind(this));
};

Scene_Map.prototype.cmdGFDSettingsTonePreset = function() {
  this._gfdSettingsTonePresetWindow.activate();
  this._gfdSettingsTonePresetWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneRed = doodad.toneRed || 0;
  doodad.toneGreen = doodad.toneGreen || 0;
  doodad.toneBlue = doodad.toneBlue || 0;
  doodad.toneGrey = doodad.toneGrey || 0;
  var index = 0;
  for (var i = 0; i < this._gfdSettingsTonePresetWindow.maxItems(); ++i) {
    var ext = this._gfdSettingsTonePresetWindow._list[i].ext;
    if (!ext) continue;
    if (ext[0] !== doodad.toneRed) continue;
    if (ext[1] !== doodad.toneGreen) continue;
    if (ext[2] !== doodad.toneBlue) continue;
    if (ext[3] !== doodad.toneGrey) continue;
    index = i;
  }
  this._gfdSettingsTonePresetWindow.select(index);
  this._gfdSettingsTonePresetWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettTonePreset = function() {
  this._gfdSettingsTonePresetWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettTonePresetOk = function() {
  var ext = this._gfdSettingsTonePresetWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneRed = ext[0];
  doodad.toneGreen = ext[1];
  doodad.toneBlue = ext[2];
  doodad.toneGrey = ext[3];
  DoodadManager.updateNewSettings();
  this.cancelGFDSettTonePreset();
  this._gfdSettingsWindow.refresh();
};

// Tone RGB Window

Scene_Map.prototype.createGFDSettingsToneRGBWindow = function() {
  this._gfdSettingsToneRGBWindow = new Window_GFD_SettingsToneRGB();
  this.addChild(this._gfdSettingsToneRGBWindow);
  this._gfdWindows.push(this._gfdSettingsToneRGBWindow);
  var win = this._gfdSettingsToneRGBWindow;
  win.setHandler('cancel', this.cancelGFDSettToneRGB.bind(this));
  win.setHandler('toneSet', this.cmdGFDSettToneRGBOk.bind(this));
};

Scene_Map.prototype.cmdGFDSettingsToneRed = function() {
  this._gfdToneColor = 'red';
  this._gfdSettingsToneRGBWindow.activate();
  this._gfdSettingsToneRGBWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneRed = doodad.toneRed || 0;
  var value = doodad.toneRed;
  var index = 0;
  for (var i = 0; i < this._gfdSettingsToneRGBWindow.maxItems(); ++i) {
    var ext = this._gfdSettingsToneRGBWindow._list[i].ext;
    if (value <= ext) index = i;
  }
  this._gfdSettingsToneRGBWindow.select(index);
  this._gfdSettingsToneRGBWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsToneGreen = function() {
  this._gfdToneColor = 'green';
  this._gfdSettingsToneRGBWindow.activate();
  this._gfdSettingsToneRGBWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneGreen = doodad.toneGreen || 0;
  var value = doodad.toneGreen;
  var index = 0;
  for (var i = 0; i < this._gfdSettingsToneRGBWindow.maxItems(); ++i) {
    var ext = this._gfdSettingsToneRGBWindow._list[i].ext;
    if (value <= ext) index = i;
  }
  this._gfdSettingsToneRGBWindow.select(index);
  this._gfdSettingsToneRGBWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettingsToneBlue = function() {
  this._gfdToneColor = 'blue';
  this._gfdSettingsToneRGBWindow.activate();
  this._gfdSettingsToneRGBWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneBlue = doodad.toneBlue || 0;
  var value = doodad.toneBlue;
  var index = 0;
  for (var i = 0; i < this._gfdSettingsToneRGBWindow.maxItems(); ++i) {
    var ext = this._gfdSettingsToneRGBWindow._list[i].ext;
    if (value <= ext) index = i;
  }
  this._gfdSettingsToneRGBWindow.select(index);
  this._gfdSettingsToneRGBWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettToneRGB = function() {
  this._gfdSettingsToneRGBWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettToneRGBOk = function() {
  var ext = this._gfdSettingsToneRGBWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  if (this._gfdToneColor === 'red') {
    doodad.toneRed = ext;
  } else if (this._gfdToneColor === 'green') {
    doodad.toneGreen = ext;
  } else if (this._gfdToneColor === 'blue') {
    doodad.toneBlue = ext;
  }
  DoodadManager.updateNewSettings();
  this.cancelGFDSettToneRGB();
  this._gfdSettingsWindow.refresh();
};

// Tone Grey Window

Scene_Map.prototype.createGFDSettingsToneGreyWindow = function() {
  this._gfdSettingsToneGreyWindow = new Window_GFD_SettingsToneGrey();
  this.addChild(this._gfdSettingsToneGreyWindow);
  this._gfdWindows.push(this._gfdSettingsToneGreyWindow);
  var win = this._gfdSettingsToneGreyWindow;
  win.setHandler('cancel', this.cancelGFDSettToneGrey.bind(this));
  win.setHandler('toneSet', this.cmdGFDSettToneGreyOk.bind(this));
};

Scene_Map.prototype.cmdGFDSettingsToneGrey = function() {
  this._gfdSettingsToneGreyWindow.activate();
  this._gfdSettingsToneGreyWindow.open();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneGrey = doodad.toneGrey || 0;
  var value = doodad.toneGrey;
  var index = 0;
  for (var i = 0; i < this._gfdSettingsToneGreyWindow.maxItems(); ++i) {
    var ext = this._gfdSettingsToneGreyWindow._list[i].ext;
    if (value <= ext) index = i;
  }
  this._gfdSettingsToneGreyWindow.select(index);
  this._gfdSettingsToneGreyWindow.refresh();
};

Scene_Map.prototype.cancelGFDSettToneGrey = function() {
  this._gfdSettingsToneGreyWindow.close();
  this._gfdSettingsWindow.activate();
};

Scene_Map.prototype.cmdGFDSettToneGreyOk = function() {
  var ext = this._gfdSettingsToneGreyWindow.currentExt();
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneGrey = ext;
  DoodadManager.updateNewSettings();
  this.cancelGFDSettToneGrey();
  this._gfdSettingsWindow.refresh();
};

// Tone Randomize

Scene_Map.prototype.cmdGFDSettToneRandomRed = function() {
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneRed = Yanfly.Util.randomIntBetween(0, 255);
  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.activate();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettToneRandomGreen = function() {
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneGreen = Yanfly.Util.randomIntBetween(0, 255);
  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.activate();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettToneRandomBlue = function() {
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneBlue = Yanfly.Util.randomIntBetween(0, 255);
  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.activate();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettToneRandomGrey = function() {
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneGrey = Yanfly.Util.randomIntBetween(0, 255);
  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.activate();
  this._gfdSettingsWindow.refresh();
};

Scene_Map.prototype.cmdGFDSettToneRandomAll = function() {
  var doodad = this._gfdSettingsWindow._doodad;
  doodad.toneRed = Yanfly.Util.randomIntBetween(0, 255);
  doodad.toneGreen = Yanfly.Util.randomIntBetween(0, 255);
  doodad.toneBlue = Yanfly.Util.randomIntBetween(0, 255);
  doodad.toneGrey = Yanfly.Util.randomIntBetween(0, 255);
  DoodadManager.updateNewSettings();
  this._gfdSettingsWindow.activate();
  this._gfdSettingsWindow.refresh();
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.randomIntBetween = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//=============================================================================
// End of Play Test Only
//=============================================================================

}; // Play Test Only

//=============================================================================
// End of File
//=============================================================================
} else { // Yanfly.GFD.version

var text = '================================================================\n';
text += 'YEP_X_ExtDoodadPack1 requires YEP_GridFreeDoodads to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_GridFreeDoodads plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // Yanfly.GFD.version
}; // YEP_GridFreeDoodads
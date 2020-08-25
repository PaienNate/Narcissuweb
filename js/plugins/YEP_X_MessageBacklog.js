//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Backlog
// YEP_X_MessageBacklog.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageBacklog = true;

var Yanfly = Yanfly || {};
Yanfly.MsgBacklog = Yanfly.MsgBacklog || {};
Yanfly.MsgBacklog.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 (Requires YEP_MessageCore.js) Add a message backlog
 * function to your game's message system!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires the following plugins:
 * - YEP_MessageCore
 *
 * * Note: If you have any Extended Message Pack plugins from the YEP library,
 * place this plugin under those entries in the plugin list.
 *
 * It's not uncommon for RPG's to have a message backlog, an in-game tool for
 * the player to review any and all dialogue he/she has encountered previously.
 * This tool can be helpful in case a player would accidentally skip some
 * dialogue and/or would like to revisit what kind of messages were made before
 * making a decision during an important moment.
 *
 * This plugin creates a message backlog system for your game's message system.
 * Upon pressing 'Shift' (or any other button you desire) during a message, the
 * player can open up a Backlog window to review over the last 20 encountered
 * messages (number of stored messages can be modified within the parameters).
 * These saved messages can also include any choices from the choice lists they
 * have selected, any numbers they may have inputted, or items they selected
 * from special events.
 * 
 * Now, your players can go forward, knowing full well they have little to
 * worry about in case they've missed any messages.
 *
 * ============================================================================
 * Disabled Text Codes
 * ============================================================================
 *
 * Due to the nature of some text codes, some of them are disabled for the
 * message log. Most of the default RPG Maker MV text codes will work, but some
 * custom ones added through the Message Core or Extension Packs are disabled
 * for various reasons. Here is a list of those disabled message codes:
 *
 *    RPG Maker MV Default:
 *    \{          Changes to font sizes cause errors in the backlog.
 *    \}          Changes to font sizes cause errors in the backlog.
 *
 *    Message Core:
 *    \AF[x]      Face graphics aren't displayed in the backlog.
 *    \PF[x]      Face graphics aren't displayed in the backlog.
 *    \FS[X]      Changes to font sizes cause errors in the backlog.
 *
 *    \PY[X]      While this works, it is known to cause some problems.
 *
 *    Extended Message Pack 1:
 *    \LSON       Letter sounds are disabled for the backlog.
 *    \LSOFF      Letter sounds are disabled for the backlog.
 *    \LSR        Letter sounds are disabled for the backlog.
 *    \FACEINDEX  Face graphics aren't displayed in the backlog.
 *    \MSGPOSX    Backlog does not change message window size.
 *    \MSGPOSY    Backlog does not change message window size.
 *    \MSGEVENT   Backlog does not change message window size.
 *    \MSGACTOR   Backlog does not change message window size.
 *    \MSGPARTY   Backlog does not change message window size.
 *    \MSGENEMY   Backlog does not change message window size.
 *    \AUTOEVENT  Backlog does not change message window size.
 *    \AUTOACTOR  Backlog does not change message window size.
 *    \AUTOPARTY  Backlog does not change message window size.
 *    \AUTOENEMY  Backlog does not change message window size.
 *    \MSGROWS    Backlog does not change message window size.
 *    \MSGWIDTH   Backlog does not change message window size.
 *    \AUTO       Backlog does not change message window size.
 *    \MSGRESET   Backlog does not change message window size.
 *
 *    Extended Message Pack 2:
 *    - Quantity, Actor, and Enemy text codes will be converted before added.
 *    This is so the data made will be localized instead of current.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following plugin commands can be used to alter various settings
 * regarding the Message Backlog.
 *
 * Plugin Command:
 *
 *   EnableMessageBacklog
 *   DisableMessageBacklog
 *   - This enables/disables the message backlog from being playeraccessed.
 *
 *   EnableMessageLogging
 *   DisableMessageLogging
 *   - If enabled, new messages will be recorded to the backlog.
 *   If disabled, they won't be recorded.
 *
 *   OpenMessageBacklog
 *   - This will forcefully open the message backlog if done on the map scene.
 *   (Highly recommended to be used with Button Common Events)
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Message Backlog now removes more text codes regarding Letter Sounds.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---Backlog Key---
 * @default
 *
 * @param LogKeyButton
 * @text Backlog Key Button
 * @parent ---Backlog Key---
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc When pressed during a message, this will open up
 * the Backlog window.
 * @default shift
 *
 * @param EnableLogKey
 * @text Enable Backlog Key
 * @parent ---Backlog Key---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable Backlog button for your messages by default?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Settings---
 * @default
 *
 * @param DefaultLogging
 * @text Default Logging
 * @parent ---Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Log all messages by default?
 * NO - false     YES - true
 * @default true
 *
 * @param LogSpecialInput
 * @text Log Special Inputs
 * @parent ---Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Log the special inputs made by the player?
 * NO - false     YES - true
 * @default true
 *
 * @param SpecialInputFmt
 * @text Special Input Format
 * @parent LogSpecialInput
 * @desc Format used to display special input text in backlog.
 * %1 - The text used in the selected choice.
 * @default »%1
 *
 * @param MaximumEntries
 * @text Maximum Entries
 * @parent ---Settings---
 * @type number
 * @min 1
 * @desc This is the maximum number of backlog entries.
 * If more than max are added, oldest entry will be removed.
 * @default 20
 *
 * @param ScrollBarEnabled
 * @text Scroll Bar Enabled
 * @parent ---Settings---
 * @type boolean
 * @on SHOW
 * @off HIDE
 * @desc Show a scroll bar for the message log?
 * HIDE - false     SHOW - true
 * @default true
 *
 * @param ScrollBarColor
 * @text Scroll Bar Color
 * @parent ScrollBarEnabled
 * @type number
 * @min 0
 * @max 31
 * @desc This is the text color used for the scroll bar.
 * @default 0
 *
 * @param ScrollBarSpriteCode
 * @text Sprite Code
 * @parent ScrollBarEnabled
 * @type note
 * @desc This is the code used for the scroll bar's sprite.
 * Edit this if you wish to customize it for your game.
 * @default "// Establish basic measurements\nvar padding = backlogWindow.standardPadding();\nvar width = padding / 2;\nvar height = Graphics.boxHeight;\n\n// Calculate number of visible rows\nvar visibleRows = backlogWindow.height - padding * 2;\nvisibleRows = Math.floor(visibleRows / backlogWindow.lineHeight());\nif (visibleRows < backlogWindow.maxItems()) {\n  height *= visibleRows / Math.max(1, backlogWindow.maxItems());\n}\n\n// Calculate the size of a basic scrolling increment\nvar max = Math.floor(Math.max(1, backlogWindow.maxItems()) / backlogWindow.maxCols()) - 1;\nthis._increment = Graphics.boxHeight / Math.max(1, max);\n\n// Generate the bitmap\nthis.bitmap = new Bitmap(width, height);\nthis.bitmap.fillAll(backlogWindow.textColor(scrollBarColor));"
 *
 * @param ScrollSpeed
 * @text Scroll Speed
 * @parent ---Settings---
 * @type number
 * @min 0
 * @desc This is the scroll speed used for backlog.
 * Lower numbers are faster. Higher numbers are slower.
 * @default 4
 *
 * @param ScrollWrap
 * @text Scroll Wrap
 * @parent ---Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc If player is at the bottom log entry, hitting down
 * would wrap the player back to the top. Enable this?
 * @default true
 *
 * @param ---Visual---
 * @default
 *
 * @param BackgroundType
 * @text Background Type
 * @parent ---Visual---
 * @type select
 * @option Window
 * @value 0
 * @option Dimmed
 * @value 1
 * @option Picture
 * @value 2
 * @option Transparent
 * @value 3
 * @desc What kind of background type do you wish to use
 * for the message backlog window?
 * @default 1
 *
 * @param BackOpacity
 * @text Back Opacity
 * @parent ---Visual---
 * @type number
 * @min 0
 * @max 255
 * @desc If you are using a Window background type,
 * adjust this number to set the window's back opacity.
 * @default 192
 *
 * @param DimColor1
 * @text Dim Color 1
 * @parent ---Visual---
 * @desc If you are using a Dimmed background type,
 * adjust the first color here. Default: rgba(0, 0, 0, 0.6)
 * @default rgba(0, 0, 0, 0.8)
 *
 * @param DimColor2
 * @text Dim Color 2
 * @parent ---Visual---
 * @desc If you are using a Dimmed background type,
 * adjust the first color here. Default: rgba(0, 0, 0, 0)
 * @default rgba(0, 0, 0, 0.8)
 *
 * @param Picture
 * @parent ---Visual---
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc If you are using a Picture background type,
 * select a picture to use for your background.
 * @default 
 *
 * @param PictureOpacity
 * @text Picture Opacity
 * @parent ---Visual---
 * @type number
 * @min 0
 * @max 255
 * @desc If you are using a Picture background type,
 * adjust this number to set the picture's opacity.
 * @default 255
 *
 * @param PictureStretch
 * @text Picture Stretch
 * @parent ---Visual---
 * @type boolean
 * @on Stretch
 * @off Don't Stretch
 * @desc If the picture used for the background is smaller than
 * the screen, stretch it to fit the screen?
 * @default true
 *
 */
//=============================================================================

if (Imported.YEP_MessageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MessageBacklog');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MsgBacklogKeyButton = String(Yanfly.Parameters['LogKeyButton']);
Yanfly.Param.MsgBacklogEnableKey = String(Yanfly.Parameters['EnableLogKey']);
Yanfly.Param.MsgBacklogEnableKey = eval(Yanfly.Param.MsgBacklogEnableKey);

Yanfly.Param.MsgBacklogDefaultLog = String(Yanfly.Parameters['DefaultLogging']);
Yanfly.Param.MsgBacklogDefaultLog = eval(Yanfly.Param.MsgBacklogDefaultLog);
Yanfly.Param.MsgBacklogSpcInput = String(Yanfly.Parameters['LogSpecialInput']);
Yanfly.Param.MsgBacklogSpcInput = eval(Yanfly.Param.MsgBacklogSpcInput);
Yanfly.Param.MsgBacklogSpcFmt = String(Yanfly.Parameters['SpecialInputFmt']);
Yanfly.Param.MsgBacklogMaxEntries = Number(Yanfly.Parameters['MaximumEntries']);
Yanfly.Param.MsgBacklogScrBarEn = String(Yanfly.Parameters['ScrollBarEnabled']);
Yanfly.Param.MsgBacklogScrBarEn = eval(Yanfly.Param.MsgBacklogScrBarEn);
Yanfly.Param.MsgBacklogScrBarCol = Number(Yanfly.Parameters['ScrollBarColor']);
Yanfly.Param.MsgBacklogScrBarSpriteCode = 
  JSON.parse(Yanfly.Parameters['ScrollBarSpriteCode']);
Yanfly.Param.MsgBacklogScrollSpd = Number(Yanfly.Parameters['ScrollSpeed']);
Yanfly.Param.MsgBacklogScrollWrap = String(Yanfly.Parameters['ScrollWrap']);
Yanfly.Param.MsgBacklogScrollWrap = eval(Yanfly.Param.MsgBacklogScrollWrap);

Yanfly.Param.MsgBacklogBgType = Number(Yanfly.Parameters['BackgroundType']);
Yanfly.Param.MsgBacklogBackOpacity = Number(Yanfly.Parameters['BackOpacity']);
Yanfly.Param.MsgBacklogDimColor1 = String(Yanfly.Parameters['DimColor1']);
Yanfly.Param.MsgBacklogDimColor2 = String(Yanfly.Parameters['DimColor2']);
Yanfly.Param.MsgBacklogPicture = String(Yanfly.Parameters['Picture']);
Yanfly.Param.MsgBacklogPicOpacity = Number(Yanfly.Parameters['PictureOpacity']);
Yanfly.Param.MsgBacklogPicStretch = String(Yanfly.Parameters['PictureStretch']);
Yanfly.Param.MsgBacklogPicStretch = eval(Yanfly.Param.MsgBacklogPicStretch);

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.isMessageBacklogOpened = function() {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    var win = SceneManager._scene._messageWindow;
    if (win._backlogWindow && win._backlogWindow.isOpenAndActive()) {
      return true;
    }
  }
  return false;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.MsgBacklog.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.MsgBacklog.Game_System_initialize.call(this);
  this.initMessageBacklog();
};

Game_System.prototype.initMessageBacklog = function() {
  this._messageBacklog = [];
  this._messageBacklogKeyEnable = Yanfly.Param.MsgBacklogEnableKey;
  this._messageBacklogLoggingEnable = Yanfly.Param.MsgBacklogDefaultLog;
};

Game_System.prototype.addMessageBacklog = function(text) {
  if (!this.isMessageBacklogLoggingEnabled()) return;
  text = this.convertMessageBacklogText(text);
  this._messageBacklog.push(text);
  while (this._messageBacklog.length > Yanfly.Param.MsgBacklogMaxEntries) {
    this._messageBacklog.shift();
  }
};

Game_System.prototype.convertMessageBacklogText = function(text) {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    var win = SceneManager._scene._messageWindow._backlogWindow;
    if (win) text = win.convertMessageText(text);
  }
  return text;
};

Game_System.prototype.getMessageBacklog = function() {
  if (this._messageBacklog === undefined) this.initMessageBacklog();
  return this._messageBacklog;
};

Game_System.prototype.isMessageBacklogKeyEnabled = function() {
  if (this._messageBacklogKeyEnable === undefined) this.initMessageBacklog();
  return this._messageBacklogKeyEnable;
};

Game_System.prototype.setMessageBacklogKeyEnable = function(value) {
  if (this._messageBacklogKeyEnable === undefined) this.initMessageBacklog();
  this._messageBacklogKeyEnable = value;
};

Game_System.prototype.isMessageBacklogLoggingEnabled = function() {
  if (this._messageBacklogLoggingEnable === undefined) {
    this.initMessageBacklog();
  }
  return this._messageBacklogLoggingEnable;
};

Game_System.prototype.setMessageBacklogLoggingEnable = function(value) {
  if (this._messageBacklogLoggingEnable === undefined) {
    this.initMessageBacklog();
  }
  this._messageBacklogLoggingEnable = value;
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.MsgBacklog.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
  if ($gameTemp.isMessageBacklogOpened()) return false;
  return Yanfly.MsgBacklog.Game_Player_canMove.call(this);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.MsgBacklog.Game_Event_updateSelfMovement =
  Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
  if ($gameTemp.isMessageBacklogOpened()) return;
  Yanfly.MsgBacklog.Game_Event_updateSelfMovement.call(this);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.MsgBacklog.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.MsgBacklog.Game_Interpreter_pluginCommand.call(this, command, args);
  // Plugin Commands
  if (command === 'EnableMessageBacklog') {
    $gameSystem.setMessageHideKeyEnable(true);

  } else if (command === 'DisableMessageBacklog') {
    $gameSystem.setMessageHideKeyEnable(false);

  } else if (command === 'EnableMessageLogging') {
    $gameSystem.setMessageBacklogLoggingEnable(true);

  } else if (command === 'DisableMessageLogging') {
    $gameSystem.setMessageBacklogLoggingEnable(false);

  } else if (command === 'OpenMessageBacklog') {
    if (SceneManager._scene instanceof Scene_Map) {
      var win = SceneManager._scene._messageWindow;
      if (win) win.openBacklogWindow();
    }

  // End
  }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.MsgBacklog.Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
Scene_Map.prototype.isMenuEnabled = function() {
  if ($gameTemp.isMessageBacklogOpened()) return false;
  return Yanfly.MsgBacklog.Scene_Map_isMenuEnabled.call(this);
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.MsgBacklog.Window_Message_createSubWindows =
  Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
  Yanfly.MsgBacklog.Window_Message_createSubWindows.call(this);
  this.createMessageBacklogWindow();
};

Window_Message.prototype.createMessageBacklogWindow = function() {
  this._backlogWindow = new Window_MessageBacklog();
  SceneManager._scene.addChild(this._backlogWindow);
};

Yanfly.MsgBacklog.Window_Message_isAnySubWindowActive =
  Window_Message.prototype.isAnySubWindowActive;
Window_Message.prototype.isAnySubWindowActive = function() {
  if (this._backlogWindow.active) return true;
  return Yanfly.MsgBacklog.Window_Message_isAnySubWindowActive.call(this);
};

Yanfly.MsgBacklog.Window_Message_startMessage =
  Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
  Yanfly.MsgBacklog.Window_Message_startMessage.call(this);
  $gameSystem.addMessageBacklog($gameMessage.allText());
};

Yanfly.MsgBacklog.Window_Message_updateInput =
  Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
  if (this.isAnySubWindowActive()) return true;
  this.updateBacklogInput();
  var value = Yanfly.MsgBacklog.Window_Message_updateInput.call(this);
  return value;
};

Window_Message.prototype.updateBacklogInput = function() {
  if (!this.pause) return;
  if (!$gameSystem.isMessageBacklogKeyEnabled()) return;
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.openBacklogWindow();
  }
};

Window_Message.prototype.openBacklogWindow = function() {
  this._backlogWindow.fullActivate();
};

Window_Message.prototype.setReturnWindow = function(target) {
  this._backlogWindow.setReturnWindow(target);
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Yanfly.MsgBacklog.Window_ChoiceList_processHandling =
  Window_ChoiceList.prototype.processHandling;
Window_ChoiceList.prototype.processHandling = function() {
  if (this.isOpenAndActive()) this.updateBacklogInput();
  Yanfly.MsgBacklog.Window_ChoiceList_processHandling.call(this);
};

Window_ChoiceList.prototype.updateBacklogInput = function() {
  if (!$gameSystem.isMessageBacklogKeyEnabled()) return;
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.openBacklogWindow();
  }
};

Window_ChoiceList.prototype.openBacklogWindow = function() {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    SceneManager._scene._messageWindow.setReturnWindow(this);
    SceneManager._scene._messageWindow.openBacklogWindow();
  }
};

Yanfly.MsgBacklog.Window_ChoiceList_callOkHandler =
  Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function() {
  this.backlogAddSelectedChoice();
  Yanfly.MsgBacklog.Window_ChoiceList_callOkHandler.call(this);
};

Window_ChoiceList.prototype.backlogAddSelectedChoice = function() {
  if (!Yanfly.Param.MsgBacklogSpcInput) return;
  var fmt = Yanfly.Param.MsgBacklogSpcFmt;
  var text = fmt.format(this.commandName(this.index()));
  $gameSystem.addMessageBacklog(text);
};

//=============================================================================
// Window_NumberInput
//=============================================================================

Yanfly.MsgBacklog.Window_NumberInput_processHandling =
  Window_NumberInput.prototype.processHandling;
Window_NumberInput.prototype.processHandling = function() {
  if (this.isOpenAndActive()) this.updateBacklogInput();
  Yanfly.MsgBacklog.Window_NumberInput_processHandling.call(this);
};

Window_NumberInput.prototype.updateBacklogInput = function() {
  if (!$gameSystem.isMessageBacklogKeyEnabled()) return;
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.openBacklogWindow();
  }
};

Window_NumberInput.prototype.openBacklogWindow = function() {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    SceneManager._scene._messageWindow.setReturnWindow(this);
    SceneManager._scene._messageWindow.openBacklogWindow();
  }
};

Yanfly.MsgBacklog.Window_NumberInput_processOk =
  Window_NumberInput.prototype.processOk;
Window_NumberInput.prototype.processOk = function() {
  this.backlogAddSelectedChoice();
  Yanfly.MsgBacklog.Window_NumberInput_processOk.call(this);
};

Window_NumberInput.prototype.backlogAddSelectedChoice = function() {
  if (!Yanfly.Param.MsgBacklogSpcInput) return;
  var fmt = Yanfly.Param.MsgBacklogSpcFmt;
  var text = fmt.format(Yanfly.Util.toGroup(this._number));
  $gameSystem.addMessageBacklog(text);
};

//=============================================================================
// Window_EventItem
//=============================================================================

Yanfly.MsgBacklog.Window_EventItem_processHandling =
  Window_EventItem.prototype.processHandling;
Window_EventItem.prototype.processHandling = function() {
  if (this.isOpenAndActive()) this.updateBacklogInput();
  Yanfly.MsgBacklog.Window_EventItem_processHandling.call(this);
};

Window_EventItem.prototype.updateBacklogInput = function() {
  if (!$gameSystem.isMessageBacklogKeyEnabled()) return;
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.openBacklogWindow();
  }
};

Window_EventItem.prototype.openBacklogWindow = function() {
  if (SceneManager._scene && SceneManager._scene._messageWindow) {
    SceneManager._scene._messageWindow.setReturnWindow(this);
    SceneManager._scene._messageWindow.openBacklogWindow();
  }
};

Yanfly.MsgBacklog.Window_EventItem_onOk = Window_EventItem.prototype.onOk;
Window_EventItem.prototype.onOk = function() {
  this.backlogAddSelectedChoice();
  Yanfly.MsgBacklog.Window_EventItem_onOk.call(this);
};

Window_EventItem.prototype.backlogAddSelectedChoice = function() {
  if (!Yanfly.Param.MsgBacklogSpcInput) return;
  var fmt = Yanfly.Param.MsgBacklogSpcFmt;
  var item = this.item();
  var text = fmt.format('\\i[' + item.iconIndex + ']' + item.name);
  $gameSystem.addMessageBacklog(text);
};

//=============================================================================
// Sprite_BacklogScroll
//=============================================================================

function Sprite_BacklogScroll() {
    this.initialize.apply(this, arguments);
}

Sprite_BacklogScroll.prototype = Object.create(Sprite.prototype);
Sprite_BacklogScroll.prototype.constructor = Sprite_BacklogScroll;

Sprite_BacklogScroll.prototype.initialize = function(target) {
  this._target = target;
  Sprite.prototype.initialize.call(this);
  this._target._scrollSprite = this;
  this.initMembers();
  this.createBitmap();
};

Sprite_BacklogScroll.prototype.initMembers = function() {
  this.anchor.x = 1;
  this.anchor.y = 0;
  this.x = Graphics.boxWidth;
  this.y = 0;
  this._increment = 1;
};

Sprite_BacklogScroll.prototype.createBitmap = function() {
  var scrollBarColor = Yanfly.Param.MsgBacklogScrBarCol;
  var backlogWindow = this._target;
  this._increment = 1;
  eval(Yanfly.Param.MsgBacklogScrBarSpriteCode);
};

Sprite_BacklogScroll.prototype.resize = function() {
  this.bitmap.clear();
  this.createBitmap();
};

Sprite_BacklogScroll.prototype.update = function() {
  Sprite.prototype.update.call(this);
  if (!this._target) return;
  this.updateOpacity();
  //this.updatePosition();
};

Sprite_BacklogScroll.prototype.updateOpacity = function() {
  this.opacity = this._target.isOpen() ? 255 : 0;
};

Sprite_BacklogScroll.prototype.updatePosition = function() {
  var target = this._target;
  if (!target.isOpen()) return;
  this.y = target.topRow() * this._increment;
};

//=============================================================================
// Window_MessageBacklog
//=============================================================================

function Window_MessageBacklog() {
    this.initialize.apply(this, arguments);
}

Window_MessageBacklog.prototype = Object.create(Window_Command.prototype);
Window_MessageBacklog.prototype.constructor = Window_MessageBacklog;

Window_MessageBacklog.prototype.initialize = function() {
  this._touchHold = 0;
  this._ready = false;
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.createScrollSprite(this);
  this.setBackgroundType(Yanfly.Param.MsgBacklogBgType);
  this.deactivate();
  this.openness = 0;
  this._ready = true;
};

Window_MessageBacklog.prototype.createScrollSprite = function() {
  if (!Yanfly.Param.MsgBacklogScrBarEn) return;
  this._scrollSprite = new Sprite_BacklogScroll(this);
  this.addChild(this._scrollSprite);
};

Window_MessageBacklog.prototype.windowWidth = function() {
  return Graphics.boxWidth;
};

Window_MessageBacklog.prototype.windowHeight = function() {
  return Graphics.boxHeight;
};

Window_MessageBacklog.prototype.dimColor1 = function() {
  return Yanfly.Param.MsgBacklogDimColor1;
};

Window_MessageBacklog.prototype.dimColor2 = function() {
  return Yanfly.Param.MsgBacklogDimColor2;
};

Window_MessageBacklog.prototype.setBackgroundType = function(type) {
  Window_Base.prototype.setBackgroundType.call(this, type);
  if (type === 2) this.createBackgroundPicture();
};

Window_MessageBacklog.prototype.createBackgroundPicture = function() {
  var filename = Yanfly.Param.MsgBacklogPicture;
  if (filename === '') return;
  this._backgroundPicture = new Sprite();
  this._backgroundPicture.bitmap = ImageManager.loadPicture(filename, 0);
  SceneManager._scene.addChild(this._backgroundPicture);
  this._backgroundPicture.opacity = 0;
  this._backgroundPicture.anchor.x = 0.5;
  this._backgroundPicture.anchor.y = 0.5;
  this._backgroundPicture.x = Graphics.boxWidth / 2;
  this._backgroundPicture.y = Graphics.boxHeight / 2;
};

Window_MessageBacklog.prototype.setBgPictureOpacity = function(opacity) {
  this._backgroundPicture.opacity = opacity;
  
  this.stretchBgPicture();
};

Window_MessageBacklog.prototype.stretchBgPicture = function() {
  if (!Yanfly.Param.MsgBacklogPicStretch) return;
  if (this._backgroundPicture.width < Graphics.boxWidth) {
    var rate = Graphics.boxWidth / this._backgroundPicture.width;
    this._backgroundPicture.scale.x = rate;
  }
  if (this._backgroundPicture.height < Graphics.boxHeight) {
    var rate = Graphics.boxHeight / this._backgroundPicture.height;
    this._backgroundPicture.scale.y = rate;
  }
};

Window_MessageBacklog.prototype.standardFontFace = function() {
  return Window_Message.prototype.standardFontFace.call(this);
};

Window_MessageBacklog.prototype.standardFontSize = function() {
  return Window_Message.prototype.standardFontSize.call(this);
};

Window_MessageBacklog.prototype.standardBackOpacity = function() {
  return Yanfly.Param.MsgBacklogBackOpacity;
};

Window_MessageBacklog.prototype.makeFontBigger = function() {
};

Window_MessageBacklog.prototype.makeFontSmaller = function() {
};

Window_MessageBacklog.prototype.select = function(index) {
};

Window_MessageBacklog.prototype.moveSelect = function(index) {
  Window_Command.prototype.select.call(this, index);
  if (this._scrollSprite) this._scrollSprite.updatePosition();
};

Window_MessageBacklog.prototype.deselect = function() {
  this.moveSelect(-1);
};

Window_MessageBacklog.prototype.processHandling = function() {
  if (!this.isOpenAndActive()) return;
  Window_Command.prototype.processHandling.call(this);
  if (Input.isTriggered(Yanfly.Param.MsgBacklogKeyButton)) {
    this.processCancel();
  }
};

Window_MessageBacklog.prototype.setReturnWindow = function(target) {
  this._returnWindow = target;
  this._returnWindow.deactivate();
};

Window_MessageBacklog.prototype.fullActivate = function() {
  this.updateInputData();
  Input.clear();
  TouchInput.clear();
  this.refresh();
  this.activate();
  this.openness = 255;
  this.moveSelect(this.maxItems() - 1);
  if (this._scrollSprite) this._scrollSprite.resize();
  if (this._backgroundPicture) {
    this.setBgPictureOpacity(Yanfly.Param.MsgBacklogPicOpacity);
  }
};

Window_MessageBacklog.prototype.processOk = function() {
  SoundManager.playOk();
  this.fullDeactivate();
};

Window_MessageBacklog.prototype.isCancelEnabled = function() {
  return true;
};

Window_MessageBacklog.prototype.processCancel = function() {
  SoundManager.playCancel();
  this.fullDeactivate();
};

Window_MessageBacklog.prototype.fullDeactivate = function() {
  this.updateInputData();
  Input.clear();
  TouchInput.clear();
  this.deactivate();
  this.openness = 0;
  this.deselect();
  if (this._returnWindow) {
    this._returnWindow.activate();
    this._returnWindow = undefined;
  }
  if (this._backgroundPicture) this.setBgPictureOpacity(0)
};

Window_MessageBacklog.prototype.isCursorVisible = function() {
  return false;
};

Window_MessageBacklog.prototype.cursorDown = function(wrap) {
  var index = this.bottomRow();
  var maxItems = this.maxItems();
  var maxCols = this.maxCols();
  wrap = Yanfly.Param.MsgBacklogScrollWrap;
  if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
    this.moveSelect((index + maxCols) % maxItems);
  }
};

Window_MessageBacklog.prototype.cursorUp = function(wrap) {
  var index = this.topRow();
  var maxItems = this.maxItems();
  var maxCols = this.maxCols();
  wrap = Yanfly.Param.MsgBacklogScrollWrap;
  if (index >= maxCols || (wrap && maxCols === 1)) {
    this.moveSelect((index - maxCols + maxItems) % maxItems);
  }
};

Window_MessageBacklog.prototype.cursorPagedown = function() {
  var index = this.index();
  var maxItems = this.maxItems();
  if (this.topRow() + this.maxPageRows() < this.maxRows()) {
    SoundManager.playCursor();
  }
  Window_Selectable.prototype.cursorPagedown.call(this);
  if (this._scrollSprite) this._scrollSprite.updatePosition();
};

Window_MessageBacklog.prototype.cursorPageup = function() {
  var index = this.index();
  if (this.topRow() > 0) {
    SoundManager.playCursor();
  }
  Window_Selectable.prototype.cursorPageup.call(this);
  if (this._scrollSprite) this._scrollSprite.updatePosition();
};

Window_MessageBacklog.prototype.processTouch = function() {
  if (!this.isOpenAndActive()) return;
  this._touchHold -= 1;
  if (TouchInput.isPressed() && this._touchHold <= 0) {
    if (TouchInput.y < Graphics.boxHeight / 4) {
      this.scrollUp();
      this._touchHold = Yanfly.Param.MsgBacklogScrollSpd;
    } else if (TouchInput.y > Graphics.boxHeight * 3 / 4) {
      this.scrollDown();
      this._touchHold = Yanfly.Param.MsgBacklogScrollSpd;
    } else {
      this.processOk();
    }
  } else if (TouchInput.isCancelled()) {
    if (this.isCancelEnabled()) {
      this.processCancel();
    }
  }
};

Window_MessageBacklog.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  var symbol = this.commandSymbol(index);
  if (symbol === 'linebreak') {
    this.drawHorzLine(rect.y);
    this.resetFontSettings();
  } else if (symbol === 'text') {
    this.drawTextEx(this.commandName(index), rect.x, rect.y);
  } else if (symbol === 'buffer') {
    if (index !== this.topRow()) return;
    var ext = this._list[index].ext;
    this.drawItem(index - ext);
  }
};

Window_MessageBacklog.prototype.drawHorzLine = function(y) {
  var lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
  this.contents.paintOpacity = 255;
};

Window_MessageBacklog.prototype.drawTextEx = function(text, x, y) {
  if (text) {
    var textState = { index: 0, x: x, y: y, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    return textState.x - x;
  } else {
    return 0;
  }
};

Window_MessageBacklog.prototype.textHeightEx = function(text) {
  return this.getTextExHeight(text, 0, 0);
};

Window_MessageBacklog.prototype.getTextExHeight = function(text, x, y) {
  if (text) {
    var textState = { index: 0, x: x, y: y, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    this.contents.clear();
    return textState.y;
  } else {
    return 0;
  }
};

Window_MessageBacklog.prototype.makeCommandList = function() {
  if (!this._ready) return;
  var backlog = $gameSystem.getMessageBacklog();
  var length = backlog.length;
  for (var i = 0; i < length; ++i) {
    var text = backlog[i];
    this.addCommand('---', 'linebreak');
    this.addIndividualLines(text);
  }
  this.addCommand('---', 'linebreak');
};

Window_MessageBacklog.prototype.addIndividualLines = function(text) {
  var text = this.convertMessageText(text);
  var items = text.split('\n');
  var length = items.length;
  for (var i = 0; i < length; ++i) {
    var line = items[i];
    if (line.length <= 0) continue;
    this.addCommand(line, 'text');
    this.addWordWrapBuffer(line);
  }
};

Window_MessageBacklog.prototype.convertMessageText = function(text) {
  text = this.convertMessageMacros(text);
  text = text.replace(/\\/g, '\x1b');
  text = this.convertNameboxCodes(text);
  text = this.convertBasicCodes(text);
  text = this.convertSpecialCodes(text);
  text = this.removeMessageBoxOnlyCodes(text);
  return text;
};

Window_MessageBacklog.prototype.convertMessageMacros = function(text) {
  if (Imported.YEP_X_MessageMacros1) {
    text = this.convertMacroText(text);
  }
  return text;
};

Window_MessageBacklog.prototype.convertNameboxCodes = function(text) {
  var name = '';
  // \x1b
  if (text.match(/\x1bN\<(.*?)\>/gi)) {
    name = RegExp.$1;
  } else if (text.match(/\x1bN(\d+)\<(.*?)\>/gi)) {
    name = RegExp.$2;
  } else if (text.match(/\x1bN(?:T|D|L|C|R|DL|DC|DR|TL|TC|TR)\<(.*?)\>/gi)) {
    name = RegExp.$1;
  } else if 
  (text.match(/\x1bN(?:T|D|L|C|R|DL|DC|DR|TL|TC|TR)(\d+)\<(.*?)\>/gi)) {
    name = RegExp.$2;
  }
  if (name.length > 0) {
    var nameText = Yanfly.Param.MSGNameBoxText + name + '\\c[0]\n';
    text = nameText + text;
  }
  // \x1b version
  text = text.replace(/\x1bN\<(.*?)\>/gi, '');
  text = text.replace(/\x1bN(\d+)\<(.*?)\>/gi, '');
  text = text.replace(/\x1bN(?:T|D|L|C|R|DL|DC|DR|TL|TC|TR)\<(.*?)\>/gi, '');
  text = text.replace(/\x1bN\<(.*?)\>/gi, '');
  text = 
    text.replace(/\x1bN(?:T|D|L|C|R|DL|DC|DR|TL|TC|TR)(\d+)\<(.*?)\>/gi, '');
  return text;
};

Window_MessageBacklog.prototype.convertBasicCodes = function(text) {
  text = text.replace(/\\/g, '\x1b');
  text = text.replace(/\x1b\x1b/g, '\\');
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
    return this.actorName(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
    return this.partyMemberName(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
  return text;
};

Window_MessageBacklog.prototype.convertSpecialCodes = function(text) {
  if (Imported.YEP_X_ExtMesPack2) {
    text = this.convertItemQuantitiesCodes(text);
    text = this.convertActorParameterCodes(text);
    text = this.convertEnemyParameterCodes(text);
  }
  return text;
};

Window_MessageBacklog.prototype.removeMessageBoxOnlyCodes = function(text) {
  text = text.replace(/\x1b/gi, '\\');
  // Message Core
  text = text.replace(/\\AF\[(\d+)\]/gi, '');
  text = text.replace(/\\PF\[(\d+)\]/gi, '');
  text = text.replace(/\\FS\[(\d+)\]/gi, '');
  // Extended Message Pack 1
  text = text.replace(/\\LSON/gi, '');
  text = text.replace(/\\LSOFF/gi, '');
  text = text.replace(/\\LSRESET/gi, '');
  text = text.replace(/\\LSR/gi, '');
  text = text.replace(/\\LSN\[(.*?)\]/gi, '');
  text = text.replace(/\\LSV\[(\d+)\]/gi, '');
  text = text.replace(/\\LSPIV\[(\d+)\]/gi, '');
  text = text.replace(/\\LSPI\[(\d+)\]/gi, '');
  text = text.replace(/\\LSPAV\[(\d+)\]/gi, '');
  text = text.replace(/\\LSPA\[(\d+)\]/gi, '');
  text = text.replace(/\\LSI\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGPOSX\[(.*?)\]/gi, '');
  text = text.replace(/\\MSGPOSY\[(.*?)\]/gi, '');
  text = text.replace(/\\MSGEVENT\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGACTOR\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGPARTY\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGENEMY\[(\d+)\]/gi, '');
  text = text.replace(/\\AUTOEVENT\[(\d+)\]/gi, '');
  text = text.replace(/\\AUTOACTOR\[(\d+)\]/gi, '');
  text = text.replace(/\\AUTOPARTY\[(\d+)\]/gi, '');
  text = text.replace(/\\AUTOENEMY\[(\d+)\]/gi, '');
  text = text.replace(/\\MSGROWS\[(.*?)\]/gi, '');
  text = text.replace(/\\MSGWIDTH\[(.*?)\]/gi, '');
  text = text.replace(/\\AUTO/gi, '');
  text = text.replace(/\\MSGRESET/gi, '');
  text = text.replace(/\\FACEINDEX\[(\d+)\]/gi, '');
  return text;
};

Window_MessageBacklog.prototype.addWordWrapBuffer = function(text) {
  if (!text.match(/<(?:WordWrap)>/gi)) return;
  var textHeight = this.textHeightEx(text);
  var bufferTimes = Math.ceil(textHeight / this.lineHeight());
  for (var i = 1; i <= bufferTimes; ++i) {
    this.addCommand('', 'buffer', true, i);
  }
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

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_MessageBacklog without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_MessageCore
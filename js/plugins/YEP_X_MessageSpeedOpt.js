//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Speed Option
// YEP_X_MessageSpeedOpt.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageSpeedOpt = true;

var Yanfly = Yanfly || {};
Yanfly.MsgSpdOpt = Yanfly.MsgSpdOpt || {};
Yanfly.MsgSpdOpt.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_MessageCore.js) Let your places adjust the
 * speed the message window displays text.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_MessageCore.
 * Make sure this plugin is located under YEP_MessageCore in the plugin list.
 *
 * The option to control the message speed is quite common in RPG's nowadays.
 * Players can put in whatever option they feel like for the text to go at, or
 * if they wish, to have the text display instantly! This plugin will add in
 * the 'Message Speed' option into your Options Menu for players to adjust! It
 * comes with speeds from 0 (slowest) to 10 (fastest) and even an "11th" speed
 * of being instant!
 *
 * ============================================================================
 * Options Core Settings - Adding the New Options
 * ============================================================================
 *
 * If you are using YEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[87]Message Speed
 *
 * Help Description:
 * Changes the speed text is displayed during messages.
 *
 * Symbol:
 * messageSpeed
 *
 * Show/Hide:
 * show = Imported.YEP_X_MessageSpeedOpt;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * var value = this.getConfigValue(symbol);
 * var rate = ((value) / 10).clamp(0, 1);
 * if (value > 10) {
 *   var gaugeColor1 = this.textColor(14);
 *   var gaugeColor2 = this.textColor(6);
 * } else {
 *   var gaugeColor1 = this.textColor(20);
 *   var gaugeColor2 = this.textColor(21);
 * }
 * this.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);
 * this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value += 1;
 * if (value > 11) value = 0;
 * value = value.clamp(0, 11);
 * this.changeValue(symbol, value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value += 1;
 * value = value.clamp(0, 11);
 * this.changeValue(symbol, value);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value -= 1;
 * value = value.clamp(0, 11);
 * this.changeValue(symbol, value);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version BETA:
 * - Started Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param OptionsCommand
 * @text Options Command
 * @desc The name of the option to be used.
 * @default Message Speed
 *
 * @param DefaultSpeed
 * @text Default Speed
 * @type number
 * @min 0
 * @max 11
 * @desc Default speed used by text messages. Use a number betwee
 * 0 - Slowest, 10 - Fastest, 11 - Instant
 * @default 8
 *
 * @param InstantText
 * @text Instant Text
 * @desc The text to display to show the speed is instant.
 * @default Instant
 *
 */
//=============================================================================

if (Imported.YEP_MessageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MessageSpeedOpt');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MsgSpeedOptCmd = String(Yanfly.Parameters['OptionsCommand']);
Yanfly.Param.MsgSpeedOptDefault = Number(Yanfly.Parameters['DefaultSpeed']);
Yanfly.Param.MsgSpeedOptInstant = String(Yanfly.Parameters['InstantText']);

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.messageSpeed = Yanfly.Param.MsgSpeedOptDefault;

Yanfly.MsgSpdOpt.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.MsgSpdOpt.ConfigManager_makeData.call(this);
  config.messageSpeed = this.messageSpeed;
  return config;
};

Yanfly.MsgSpdOpt.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.MsgSpdOpt.ConfigManager_applyData.call(this, config);
  this.messageSpeed = this.readConfigMessageSpeed(config, 'messageSpeed');
};

ConfigManager.readConfigMessageSpeed = function(config, name) {
  var value = config[name];
  if (value !== undefined) {
      return value;
  } else {
      return Yanfly.Param.MsgSpeedOptDefault;
  }
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.MsgSpdOpt.Window_Message_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
  Yanfly.MsgSpdOpt.Window_Message_newPage.call(this, textState);
  this._textDelay = 0;
};

Yanfly.MsgSpdOpt.Window_Message_updateShowFast =
  Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
  Yanfly.MsgSpdOpt.Window_Message_updateShowFast.call(this);
  if (this.messageSpeed() < 0) this._showFast = true;
};

Window_Message.prototype.messageSpeed = function() {
  return 10 - (ConfigManager.messageSpeed.clamp(0, 11));
};

Window_Message.prototype.updateMessage = function() {
  if (this._textState) {
    while (!this.isEndOfText(this._textState)) {
      if (this.needsNewPage(this._textState)) {
          this.newPage(this._textState);
      }
      this.updateShowFast();
      if (this._textDelay <= 0 || this._showFast || this._lineShowFast) {
        this.processCharacter(this._textState);
        this._textDelay = this.messageSpeed();
      } else {
        this._textDelay -= 1;
        break;
      }
      if (!this._showFast && !this._lineShowFast) {
        break;
      }
      if (this.pause || this._waitCount > 0) {
        break;
      }
    }
    if (this.isEndOfText(this._textState)) {
      this.onEndOfText();
    }
    return true;
  } else {
    return false;
  }
};

if (Imported.YEP_X_ExtMesPack1) {

Yanfly.EMP1.Window_Message_updateMessage =
  Window_Message.prototype.updateMessage;
Window_Message.prototype.updateMessage = function() {
  var state = Yanfly.EMP1.Window_Message_updateMessage.call(this);
  if (state) {
    this._soundCount = this._soundCount || 0;
    if (this._soundCount-- <= 0) {
      this._soundCount = $gameSystem.messageSoundInterval();
      if ($gameSystem.isMessageSoundEnabled()) SoundManager.playMessageSound();
    }
  }
  return state;
}

}; // Imported.YEP_X_ExtMesPack1

Yanfly.MsgSpdOpt.Window_Message_updateWait =
  Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
  if (this.messageSpeed() < 0) {
    this._waitCount = 0;
    this._lineShowFast = true;
    this._showFast = true;
  }
  return Yanfly.MsgSpdOpt.Window_Message_updateWait.call(this);
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.MsgSpdOpt.Window_Options_addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
  Yanfly.MsgSpdOpt.Window_Options_addGeneralOptions.call(this);
  if (Imported.YEP_OptionsCore) return;
  this.addMessageSpeedOptions();
};

Window_Options.prototype.addMessageSpeedOptions = function() {
  this.addCommand(Yanfly.Param.MsgSpeedOptCmd, 'messageSpeed');
};

Yanfly.MsgSpdOpt.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
  var symbol = this.commandSymbol(index);
  var value = this.getConfigValue(symbol);
  if (symbol === 'messageSpeed') {
    if (value > 10) return Yanfly.Param.MsgSpeedOptInstant;
    return Yanfly.Util.toGroup(value);
  } else {
    return Yanfly.MsgSpdOpt.Window_Options_statusText.call(this, index);
  }
};

if (!Imported.YEP_OptionsCore) {

Yanfly.MsgSpdOpt.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'messageSpeed') {
    var value = this.getConfigValue(symbol);
    value += 1;
    if (value > 11) value = 0;
    value = value.clamp(0, 11);
    this.changeValue(symbol, value);
  } else {
    Yanfly.MsgSpdOpt.Window_Options_processOk.call(this);
  }
};

Yanfly.MsgSpdOpt.Window_Options_cursorRight = 
  Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'messageSpeed') {
    var value = this.getConfigValue(symbol);
    value += 1;
    value = value.clamp(0, 11);
    this.changeValue(symbol, value);
  } else {
    Yanfly.MsgSpdOpt.Window_Options_cursorRight.call(this, wrap);
  }
};

Yanfly.MsgSpdOpt.Window_Options_cursorLeft = 
  Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'messageSpeed') {
    var value = this.getConfigValue(symbol);
    value -= 1;
    value = value.clamp(0, 11);
    this.changeValue(symbol, value);
  } else {
    Yanfly.MsgSpdOpt.Window_Options_cursorLeft.call(this, wrap);
  }
};

}; // Imported.YEP_OptionsCore

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_MessageSpeedOpt without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_MessageCore
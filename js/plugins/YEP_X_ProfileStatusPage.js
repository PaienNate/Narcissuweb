//=============================================================================
// Yanfly Engine Plugins - Status Menu Extension - Profile Status Page
// YEP_X_ProfileStatusPage.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ProfileStatusPage = true;

var Yanfly = Yanfly || {};
Yanfly.PSP = Yanfly.PSP || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 身份信息概述页面
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @desc This is the text used for the command name in the Status
 * Menu command list.
 * @default Profile
 *
 * @param Default Profile
 * @desc Set database profile as default profile?
 * NO - false     YES - true
 * @default true
 *
 * @param Image Align
 * @desc How do you want the profile image aligned?
 * left     center     right
 * @default right
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件需要YEP_StatusMenuCore，确保它在YEP_StatusMenuCore下面
 *
 * 这个插件需要身份菜单核心插件。这个插件添加了“概述”命令，在这里玩家可
 * 以阅读角色的出生历史。在这里可以添加图片。文本也可以在游戏中更新
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 下面这个标签可以更加具体改变角色的个人信息概述

 *
 * Actor Notetags:
 *   <Profile Text>
 *    text
 *    text
 *   </Profile Text>
 *   改变默认的个人信息概述。你可以使用文本代码。不支持文字的自动换行。
 *
 *   <Profile Image: filename>
 *   如果你希望设定角色的个人概述图片，可以用文件名代替filename，不需要包
 *   i含拓展名。如果你的图片是Aldo.png，你使用Aldo即可，不需要.png。
 *
 *   <Profile Image Align: Left>
 *   <Profile Image Align: Center>
 *   <Profile Image Align: Right>
 *   I如果你想设置不同的位置，可以使用这个标签。如果你没用，则会默认右侧

 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * 下面的插件命令可以用来改变角色概况页
 *
 * Plugin Commands:
 *
 * ClearProfileText actorId
 * 清除角色概况文本
 *
 * AddProfileText actorId text
 * 增加角色概况文本
 *
 * ProfileTextLine lineIndex actorId text
 * 你可以改变角色文本概述特定行的文本。例如如果你希望角色ID3的人物概述
 * 第50行为‘Hello World’，你可以这么写：
 * plugin command:
 * ProfileTextLine 49 3 Hello World
 *
 * ProfileImage actorId filename
 * 这可以改变角色概述的图片显示。例如你想改变角色ID3的概述图片为
 * Aldo.png，你可以这么写ProfileImage 3 Aldo   plugin command: 
 * ProfileImage 3 Aldo
 * 
 * ProfileImageAlign actorId align
 * 这可以改变概述图片位置。可以用‘left’, ‘center’, 或者‘right’
 * 替代‘align’。如果没有没写，默认是右侧。如果你想要让角色ID3图片在左
 * 侧，你可以用ProfileImageAlign 3 Left
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_StatusMenuCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ProfileStatusPage');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.PSPCmdName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.PSPDefaultProfile = String(Yanfly.Parameters['Default Profile']);
Yanfly.Param.PSPDefaultProfile = eval(Yanfly.Param.PSPDefaultProfile);
Yanfly.Param.PSPImageAlign = String(Yanfly.Parameters['Image Align']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.PSP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.PSP.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_ProfileStatusPage) {
    this.processPSPNotetags($dataActors);
    Yanfly._loaded_YEP_X_ProfileStatusPage = true;
  }
  return true;
};

DataManager.processPSPNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.profileImage = '';
    obj.profileImgAlign = Yanfly.Param.PSPImageAlign;
    obj.profileText = [];
    if (Yanfly.Param.PSPDefaultProfile) {
      var arr = obj.profile.split(/[\r\n]+/);
      for (var i = 0; i < arr.length; ++i) {
        obj.profileText.push(arr[i]);
      }
    }
    var textMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:PROFILE TEXT)>/i)) {
        textMode = 'profileText'
        obj.profileText = [];
      } else if (line.match(/<\/(?:PROFILE TEXT)>/i)) {
        textMode = 'none'
      } else if (textMode === 'profileText') {
        obj.profileText.push(line);
      } else if (line.match(/<(?:PROFILE IMAGE):[ ](.*)>/i)) {
        obj.profileImage = String(RegExp.$1);
      } else if (line.match(/<(?:PROFILE IMAGE ALIGN):[ ](.*)>/i)) {
        obj.profileImgAlign = String(RegExp.$1).toLowerCase();
      }
    }
  }
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.PSP.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.PSP.Game_Actor_setup.call(this, actorId);
    this.initProfileStatusPage();
};

Game_Actor.prototype.initProfileStatusPage = function() {
    this._profileStatusText = this.actor().profileText.slice();
    this._profileImage = this.actor().profileImage;
    this._profileImgAlign = this.actor().profileImgAlign;
};

Game_Actor.prototype.profileStatusText = function() {
    if (this._profileStatusText === undefined) this.initProfileStatusPage();
    return this._profileStatusText;
};

Game_Actor.prototype.clearProfileStatusText = function() {
    if (this._profileStatusText === undefined) this.initProfileStatusPage();
    this._profileStatusText = [''];
};

Game_Actor.prototype.addProfileStatusText = function(text) {
    if (this._profileStatusText === undefined) this.initProfileStatusPage();
    this._profileStatusText.push(text);
};

Game_Actor.prototype.setProfileStatusText = function(lineIndex, text) {
    if (this._profileStatusText === undefined) this.initProfileStatusPage();
    this._profileStatusText[lineIndex] = text;
};

Game_Actor.prototype.profileImage = function() {
    if (this._profileImage === undefined) this.initProfileStatusPage();
    return this._profileImage;
};

Game_Actor.prototype.setProfileImage = function(filename) {
    if (this._profileImage === undefined) this.initProfileStatusPage();
    this._profileImage = filename;
};

Game_Actor.prototype.profileImageAlign = function() {
    if (this._profileImgAlign === undefined) this.initProfileStatusPage();
    return this._profileImgAlign;
};

Game_Actor.prototype.setProfileImageAlign = function(align) {
    if (this._profileImgAlign === undefined) this.initProfileStatusPage();
    this._profileImgAlign = align.toLowerCase();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.PSP.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.PSP.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'ClearProfileText') this.clearActorProfileText(args);
    if (command === 'AddProfileText') this.addActorProfileText(args);
    if (command === 'ProfileTextLine') this.setLineActorProfileText(args);
    if (command === 'ProfileImage') this.setActorProfileImage(args);
    if (command === 'ProfileImageAlign') this.setActorProfileImageAlign(args);
};

Game_Interpreter.prototype.clearActorProfileText = function(args) {
    var actorId = parseInt(args[0]);
    $gameActors.actor(actorId).clearProfileStatusText();
};

Game_Interpreter.prototype.addActorProfileText = function(args) {
    var actorId = parseInt(args[0]);
    var text = '';
    for (var i = 1; i < args.length; ++i) {
      text += args[i] + ' ';
    }
    $gameActors.actor(actorId).addProfileStatusText(text);
};

Game_Interpreter.prototype.setLineActorProfileText = function(args) {
    var lineIndex = parseInt(args[0]);
    var actorId = parseInt(args[1]);
    var text = '';
    for (var i = 2; i < args.length; ++i) {
      text += args[i] + ' ';
    }
    $gameActors.actor(actorId).setProfileStatusText(lineIndex, text);
};

Game_Interpreter.prototype.setActorProfileImage = function(args) {
    var actorId = parseInt(args[0]);
    var filename = '';
    for (var i = 1; i < args.length; ++i) {
      filename += args[i];
      if (args[i + 1]) filename += ' ';
    }
    $gameActors.actor(actorId).setProfileImage(filename);
};

Game_Interpreter.prototype.setActorProfileImageAlign = function(args) {
    var actorId = parseInt(args[0]);
    var align = String(args[1]);
    $gameActors.actor(actorId).setProfileImageAlign(align);
};

//=============================================================================
// Window_StatusCommand
//=============================================================================

Yanfly.PSP.Window_StatusCommand_createCommand =
    Window_StatusCommand.prototype.createCommand;
Window_StatusCommand.prototype.createCommand = function(command) {
    if (command.toUpperCase() === 'PROFILE') {
      var text = Yanfly.Param.PSPCmdName;
      this.addCommand(text, 'profile', true);
    } else {
      Yanfly.PSP.Window_StatusCommand_createCommand.call(this, command);
    }
};

Yanfly.PSP.Window_StatusCommand_addCustomCommands =
    Window_StatusCommand.prototype.addCustomCommands;
Window_StatusCommand.prototype.addCustomCommands = function() {
    Yanfly.PSP.Window_StatusCommand_addCustomCommands.call(this);
    if (this.findSymbol('profile') > -1) return;
    var text = Yanfly.Param.PSPCmdName;
    this.addCommand(text, 'profile', true);
};

Yanfly.PSP.Window_StatusCommand_isPlayOkSound =
    Window_StatusCommand.prototype.isPlayOkSound;
Window_StatusCommand.prototype.isPlayOkSound = function() {
    if (this.currentSymbol() === 'profile') return true;
    return Yanfly.PSP.Window_StatusCommand_isPlayOkSound.call(this);
};

//=============================================================================
// Window_StatusInfo
//=============================================================================

Yanfly.PSP.Window_StatusInfo_drawInfoContents =
    Window_StatusInfo.prototype.drawInfoContents;
Window_StatusInfo.prototype.drawInfoContents = function(symbol) {
    if (symbol === 'profile') {
      this.drawAllItems();
    } else {
      Yanfly.PSP.Window_StatusInfo_drawInfoContents.call(this, symbol);
    }
};

Yanfly.PSP.Window_StatusInfo_maxItems = Window_StatusInfo.prototype.maxItems;
Window_StatusInfo.prototype.maxItems = function() {
    if (this._symbol === 'profile') {
      return this._actor.profileStatusText().length;
    }
    return Yanfly.PSP.Window_StatusInfo_maxItems.call(this);
};

Yanfly.PSP.Window_StatusInfo_drawAllItems =
    Window_StatusInfo.prototype.drawAllItems;
Window_StatusInfo.prototype.drawAllItems = function() {
    if (this._symbol === 'profile' && this._actor) {
      if (this._actor.profileImage() !== '') {
        var bitmap = ImageManager.loadPicture(this._actor.profileImage());
        if (bitmap.width <= 0) {
          return setTimeout(this.drawAllItems.bind(this), 5);
        }
        this.drawProfileImage();
      }
    }
    Yanfly.PSP.Window_StatusInfo_drawAllItems.call(this);
};

Window_StatusInfo.prototype.drawProfileImage = function() {
    var source = ImageManager.loadPicture(this._actor.profileImage());
    var sx = 0; var sy = 0; var sw = source.width; var sh = source.height;
    var dw = sw; var dh = sh;
    if (dw > this.contents.width) {
      var rate = this.contents.width / dw;
      dw = Math.floor(dw * rate);
      dh = Math.floor(dh * rate);
    }
    if (dh > this.contents.height) {
      var rate = this.contents.height / dh;
      dw = Math.floor(dw * rate);
      dh = Math.floor(dh * rate);
    }
    var dy = this.contents.height - dh;
    if (this._actor.profileImageAlign() === 'left') {
      var dx = 0;
    } else if (this._actor.profileImageAlign() === 'center') {
      var dx = (this.contents.width - dw) / 2;
    } else {
      var dx = this.contents.width - dw;
    }
    this.contents.blt(source, sx, sy, sw, sh, dx, dy, dw, dh);
};

Yanfly.PSP.Window_StatusInfo_drawItem = Window_StatusInfo.prototype.drawItem;
Window_StatusInfo.prototype.drawItem = function(index) {
    Yanfly.PSP.Window_StatusInfo_drawItem.call(this);
    if (this._symbol === 'profile') this.drawProfileItem(index);
};

Window_StatusInfo.prototype.drawProfileItem = function(index) {
    var text = this._actor.profileStatusText()[index];
    var rect = this.itemRectForText(index);
    this.drawTextEx(text, rect.x, rect.y);
};

//=============================================================================
// Scene_Status
//=============================================================================

Yanfly.PSP.Scene_Status_setCommandWindowHandlers =
    Scene_Status.prototype.setCommandWindowHandlers;
Scene_Status.prototype.setCommandWindowHandlers = function() {
    Yanfly.PSP.Scene_Status_setCommandWindowHandlers.call(this);
    this._commandWindow.setHandler('profile', this.commandProfile.bind(this));
};

Scene_Status.prototype.commandProfile = function() {
    this._infoWindow.activate();
    this._infoWindow.select(0);
};

//=============================================================================
// End of File
//=============================================================================
};
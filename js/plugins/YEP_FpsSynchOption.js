//=============================================================================
// Yanfly Engine Plugins - FPS Synch Option
// YEP_FpsSynchOption.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SynchFpsOption = true;

var Yanfly = Yanfly || {};
Yanfly.FpsSynch = Yanfly.FpsSynch || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 帧数同步选项
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @desc Command name used inside of the Options menu.
 * @default Synch Monitor FPS
 *
 * @param Default Setting
 * @desc The default setting of the Synch Monitor FPS.
 * OFF - false (Recommended)  ON - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin is to be used with RPG Maker MV version 1.1.0 and upward.
 *
 * MV是基于帧来更新的。通常这样表现不错，因为大多数玩家的FPS都在60，但是
 * 有些玩家超过60就会非常不舒服
 *
 * MV升级到1.1.0后，基于时间流来行走，这就强制玩家在60fps游戏。实际上，这
 * 样是有效果的，对于他们能够超过60fps来说，这样就可以保证游戏
 *
 * However, there comes a problem when a player's hardware isn't strong enough
 * to support RPG Maker MV natively at 60 fps (such as the case with older
 * computers, or weaker mobile devices) or if the player is using video 
 * recording software that goes below 60 fps. The game will appear laggy and
 * jumping without good response rates from input commands or possibly even
 * 可是对于一些老旧设备，不能支持MV到60fps的时候，游戏将会卡顿。
 *
 * 这个插件可以让设置菜单能够开启同步选项。这样，玩家就可以选择是否基于时
 * 间流来运行游戏
 */
//=============================================================================

if (!Utils.RPGMAKER_VERSION) {
  var errortext = '\nYou do not have RPG Maker MV version 1.1.0\n';
     errortext += 'or higher applied to your project. The update\n';
     errortext += 'is absolutely needed for YEP_SynchFpsOption\n';
     errortext += 'to run. Your game will not start until you\n';
     errortext += 'have updated your project\'s files to at\n';
     errortext += 'least version 1.1.0 or higher or if you choose\n';
     errortext += 'to not use the YEP_SynchFpsOption plugin.'
     errortext += '\n\n'
     errortext += 'Find the latest version at http://forums.rpgmakerweb.com/';
     errortext += '\n\n'
     errortext += 'If you do have MV version 1.1.0 or higher\n';
     errortext += 'and you are still getting this message, it is\n';
     errortext += 'because this project\'s rpg_core.js, rpg_managers.js,\n';
     errortext += 'rpg_objects.js, rpg_scenes.js, rpg_sprites.js, and\n';
     errortext += 'rpg_windows.js aren\'t updated. Create a new project\n';
     errortext += 'or go to the NewData folder in your RPG Maker MV root\n';
     errortext += 'folder. Copy the new js files (except plugins.js so it\n';
     errortext += 'won\'t overwrite your Plugin Manager Parameters) to\n';
     errortext += 'your current project!';
  SceneManager.run = function(sceneClass) {
    require('nw.gui').Window.get().showDevTools();
    throw new Error(errortext);
  };
};

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_FpsSynchOption');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.FpsSynchCmd = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.FpsSDefault = eval(String(Yanfly.Parameters['Default Setting']));

//=============================================================================
// MainCode
//=============================================================================

ConfigManager.synchFps = Yanfly.Param.FpsSDefault;

Yanfly.FpsSynch.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.FpsSynch.ConfigManager_makeData.call(this);
    config.synchFps = this.synchFps;
    return config;
};

Yanfly.FpsSynch.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.FpsSynch.ConfigManager_applyData.call(this, config);
    this.synchFps = this.readConfigFpsSynch(config, 'synchFps');
};

ConfigManager.readConfigFpsSynch = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return Yanfly.Param.FpsSDefault;
    }
};

//=============================================================================
// SceneManager
//=============================================================================

SceneManager.updateMainFluidTimestep = SceneManager.updateMain;

SceneManager.updateMain = function() {
    if (ConfigManager.synchFps) {
      this.updateMainFluidTimestep();
    } else {
      this.updateMainNoFpsSynch();
    }
};

SceneManager.updateMainNoFpsSynch = function() {
    this.updateInputData();
    this.changeScene();
    this.updateScene();
    this.renderScene();
    this.requestUpdate();
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.FpsSynch.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.FpsSynch.Window_Options_addGeneralOptions.call(this);
    this.addCommand(Yanfly.Param.FpsSynchCmd, 'synchFps');
};

//=============================================================================
// End of File
//=============================================================================

//=============================================================================
// Yanfly Engine Plugins - Common Event Menu Extension - Setup Pack 1
// YEP_X_CEMSetupPack.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_CEMSetupPack1 = true;

var Yanfly = Yanfly || {};
Yanfly.CEMSP1 = Yanfly.CEMSP1 || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 公共事件菜单拓展包1
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件需要 YEP_CommonEventMenu，确保放在它下面。
 *
 * 对于使用公共事件菜单的人并且想改变窗口位置的人，会意识到这需要花费一些时
 * 间去做。这个拓展插件包含了窗口位置的快速设置
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Use the following plugin commands to change the menu setup of your common
 * event menu before opening it up. To see what the layouts look like, please
 * 你可以使用下面的插件命令来改变公共事件菜单窗口设置。
 *
 * Plugin Command:
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Reverse Setup
 *   帮助窗口在顶部，图片和下标文字出现在左边，列表在右边
 *   - This puts the Help Window at the top of the screen. The picture and
 *   subtext menus appear on the left left of the screen. The main list window
 *   appears on the right half of the screen.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Full Single Setup
 *   列表全屏，不显示帮助，图片，下标
 *   - This makes the main list window cover the entire screen. The help,
 *   picture, and subtext windows do not appear. There is only one column used.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Full Double Setup
 *   列表全屏分栏，不显示帮助，图片，下标
 *   - This makes the main list window cover the entire screen. The help,
 *   picture, and subtext windows do not appear. There are two columns used.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Double Common Setup
 *   列表分栏，帮助窗口在顶部，不显示图片，下标
 *   - The Help Window appears at the top of the screen with the main list
 *   window underneath it with two columns. The picture and subtext windows do
 *   not appear.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Double Subtext Setup
 *   列表分栏，帮助窗口在顶部，下标在底部，不显示图片
 *   - The Help Window appears at the top of the screen with the main list
 *   window underneath it with two columns. The subtext window appears at the
 *   bottom of the screen. The picture window does not appear.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Double Picture Setup
 *   列表分栏，帮助窗口在顶部，图片在底部，不显示下标
 *   - The Help Window appears at the top of the screen with the main list
 *   window underneath it with two columns. The picture window appears at the
 *   bottom of the screen. The subtext window does not appear.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Double Hybrid Setup
 *   列表分栏，帮助窗口在顶部，图片在底部左侧，下标在底部右侧
 *   - The Help Window appears at the top of the screen with the main list
 *   window underneath it with two columns. Both picture and subtext windows
 *   appear at the bottom of the screen with the picture window on the left
 *   side and the subtext window on the right side.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Double Reverse Hybrid Setup
 *   列表分栏，帮助窗口在顶部，图片在底部右侧，下标在底部左侧
 *   - The Help Window appears at the top of the screen with the main list
 *   window underneath it with two columns. Both picture and subtext windows
 *   appear at the bottom of the screen with the subtext window on the left
 *   side and the picture window on the right side.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Sandwich Single Setup
 *   列表单栏，帮助窗口在顶部，下标在底部
 *   - The Help Window appears at the top of the screen and the subtext window
 *   appears at the bottom. The main list is sandwiched in between using only
 *   one column.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Sandwich Double Setup
 *   列表分栏，帮助窗口在顶部，下标在底部
 *   - The Help Window appears at the top of the screen and the subtext window
 *   appears at the bottom. The main list is sandwiched in between using two
 *   columns for the common event list.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Sandwich Picture Setup
 *   列表单栏左侧，图片右侧，帮助窗口在顶部，下标在底部
 *   - The Help Window appears at the top of the screen and the subtext window
 *   appears at the bottom. The main list is sandwiched in between using one
 *   column on the left side. The picture window is also sandwiched on the
 *   right side of the screen.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Sandwich Reverse Picture Setup
 *   列表单栏右侧，图片左侧，帮助窗口在顶部，下标在底部
 *   - The Help Window appears at the top of the screen and the subtext window
 *   appears at the bottom. The picture window is sandwiched in between the two
 *   windows on the left half of the screen while the main list is sandwiched
 *   in between using one column on the right half.
 */
//=============================================================================

if (Imported.YEP_CommonEventMenu) {

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.CEMSP1.Game_Interpreter_setCommonEventMenuSettings =
    Game_Interpreter.prototype.setCommonEventMenuSettings;
Game_Interpreter.prototype.setCommonEventMenuSettings = function(name) {
    var settings;
    if (name.match(/REVERSE SETUP/i)) {
      settings = {
        mainX: 'Graphics.boxWidth / 2',
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth / 2',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2)',
        mainC: 1,
        mainO: 255,

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: true,
        picX: 0,
        picY: 'this.fittingHeight(2)',
        picW: 'Graphics.boxWidth / 2',
        picH: 'this.fittingHeight(10)',
        picO: 255,

        subS: true,
        subX: 0,
        subY: 'Graphics.boxHeight - height',
        subW: 'Graphics.boxWidth / 2',
        subH: 'Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(10)',
        subO: 255
      }
    } else if (name.match(/FULL SINGLE SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 0,
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight',
        mainC: 1,
        mainO: 255,

        helpS: false,
        helpX: 0,
        helpY: 0,
        helpW: 1,
        helpH: 1,
        helpO: 255,

        picS: false,
        picX: 0,
        picY: 0,
        picW: 1,
        picH: 1,
        picO: 255,

        subS: false,
        subX: 0,
        subY: 0,
        subW: 1,
        subH: 1,
        subO: 255
      }
    } else if (name.match(/FULL DOUBLE SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 0,
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight',
        mainC: 2,
        mainO: 255,

        helpS: false,
        helpX: 0,
        helpY: 0,
        helpW: 1,
        helpH: 1,
        helpO: 255,

        picS: false,
        picX: 0,
        picY: 0,
        picW: 1,
        picH: 1,
        picO: 255,

        subS: false,
        subX: 0,
        subY: 0,
        subW: 1,
        subH: 1,
        subO: 255
      }
    } else if (name.match(/DOUBLE COMMON SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2)',
        mainC: 2,
        mainO: 255,

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: false,
        picX: 0,
        picY: 0,
        picW: 1,
        picH: 1,
        picO: 255,

        subS: false,
        subX: 0,
        subY: 0,
        subW: 1,
        subH: 1,
        subO: 255
      }
    } else if (name.match(/DOUBLE SUBTEXT SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(4)',
        mainC: 2,
        mainO: 255,

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: false,
        picX: 0,
        picY: 0,
        picW: 1,
        picH: 1,
        picO: 255,

        subS: true,
        subX: 0,
        subY: 'Graphics.boxHeight - height',
        subW: 'Graphics.boxWidth',
        subH: 'this.fittingHeight(4)',
        subO: 255
      }
    } else if (name.match(/DOUBLE PICTURE SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(4)',
        mainC: 2,
        mainO: 255,

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: true,
        picX: 0,
        picY: 'Graphics.boxHeight - height',
        picW: 'Graphics.boxWidth',
        picH: 'this.fittingHeight(4)',
        picO: 255,

        subS: false,
        subX: 0,
        subY: 0,
        subW: 1,
        subH: 1,
        subO: 255
      }
    } else if (name.match(/DOUBLE HYBRID SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(4)',
        mainC: 2,
        mainO: 255,

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: true,
        picX: 0,
        picY: 'Graphics.boxHeight - height',
        picW: 'Graphics.boxWidth / 2',
        picH: 'this.fittingHeight(4)',
        picO: 255,

        subS: true,
        subX: 'Graphics.boxWidth / 2',
        subY: 'Graphics.boxHeight - height',
        subW: 'Graphics.boxWidth / 2',
        subH: 'this.fittingHeight(4)',
        subO: 255
      }
    } else if (name.match(/DOUBLE REVERSE HYBRID SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(4)',
        mainC: 2,
        mainO: 255,

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: true,
        picX: 'Graphics.boxWidth / 2',
        picY: 'Graphics.boxHeight - height',
        picW: 'Graphics.boxWidth / 2',
        picH: 'this.fittingHeight(4)',
        picO: 255,

        subS: true,
        subX: 0,
        subY: 'Graphics.boxHeight - height',
        subW: 'Graphics.boxWidth / 2',
        subH: 'this.fittingHeight(4)',
        subO: 255
      }
    } else if (name.match(/SANDWICH SINGLE SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2) * 2',
        mainC: 1,
        mainO: '255',

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: false,
        picX: 0,
        picY: 0,
        picW: 1,
        picH: 1,
        picO: 255,

        subS: true,
        subX: 0,
        subY: 'Graphics.boxHeight - height',
        subW: 'Graphics.boxWidth',
        subH: 'this.fittingHeight(2)',
        subO: 255
      }
    } else if (name.match(/SANDWICH DOUBLE SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2) * 2',
        mainC: 2,
        mainO: '255',

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: false,
        picX: 0,
        picY: 0,
        picW: 1,
        picH: 1,
        picO: 255,

        subS: true,
        subX: 0,
        subY: 'Graphics.boxHeight - height',
        subW: 'Graphics.boxWidth',
        subH: 'this.fittingHeight(2)',
        subO: 255
      }
    } else if (name.match(/SANDWICH PICTURE SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth / 2',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2) * 2',
        mainC: 1,
        mainO: '255',

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: true,
        picX: 'Graphics.boxWidth / 2',
        picY: 'this.fittingHeight(2)',
        picW: 'Graphics.boxWidth / 2',
        picH: 'Graphics.boxHeight - this.fittingHeight(2) * 2',
        picO: 255,

        subS: true,
        subX: 0,
        subY: 'Graphics.boxHeight - height',
        subW: 'Graphics.boxWidth',
        subH: 'this.fittingHeight(2)',
        subO: 255
      }
    } else if (name.match(/SANDWICH REVERSE PICTURE SETUP/i)) {
      settings = {
        mainX: 'Graphics.boxWidth / 2',
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth / 2',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2) * 2',
        mainC: 1,
        mainO: '255',

        helpS: true,
        helpX: 0,
        helpY: 0,
        helpW: 'Graphics.boxWidth',
        helpH: 'this.fittingHeight(2)',
        helpO: 255,

        picS: true,
        picX: 0,
        picY: 'this.fittingHeight(2)',
        picW: 'Graphics.boxWidth / 2',
        picH: 'Graphics.boxHeight - this.fittingHeight(2) * 2',
        picO: 255,

        subS: true,
        subX: 0,
        subY: 'Graphics.boxHeight - height',
        subW: 'Graphics.boxWidth',
        subH: 'this.fittingHeight(2)',
        subO: 255
      }
    }
    if (settings) return $gameSystem.setCommonEventMenuSettings(settings);
    Yanfly.CEMSP1.Game_Interpreter_setCommonEventMenuSettings.call(this, name);
};

//=============================================================================
// End of File
//=============================================================================
}; // Imported.YEP_CommonEventMenu
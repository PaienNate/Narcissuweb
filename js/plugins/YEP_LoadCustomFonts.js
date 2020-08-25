//=============================================================================
// Yanfly Engine Plugins - Load Custom Fonts
// YEP_LoadCustomFonts.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_LoadCustomFonts = true;

var Yanfly = Yanfly || {};
Yanfly.LCF = Yanfly.LCF || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 载入自定义字体
 * @author Yanfly Engine Plugins
 *
 * @param Font Filenames
 * @desc These are full filenames of the fonts to be loaded from the
 * /fonts/ folder of your project. Separate each with ,
 * @default cc-wild-words.ttf, ds-pixel-cyr.ttf
 *
 * @param Font Families
 * @desc The font family names of the fonts. Keep them in the same
 * order as the parameter above. Separate each with ,
 * @default CC Wild Words, DS Pixel Cyr
 *
 * @help
 * ============================================================================
 * Introduction & Instructions
 * ============================================================================
 *
 * 对于那些使用自定义字体的人，你也许注意到并不是所有的字体都可以在游戏加载
 * 完毕后被加载。这个插件可以让你把你的字体放入字体文件夹并且在游戏开始时加
 * 载它们
 *
 * 如果想使用这个插件，请遵循下面的使用说明
 *
 * 这个插件的参数“字体文件名”和“字体系列”必须被正确填写并且匹配正确:
 *
 *      Font Filenames: cc-wild-words.ttf, ds-pixel-cyr.ttf
 *
 *      Font Families: CC Wild Words, DS Pixel Cyr
 *
 * 在上面的例子里，cc-wild-words.ttf使用了CC Wild Words作为字体系列，ds-
 * pixel-cyr.ttf则使用了DS Pixel Cyr。对于使用字体名的插件，例如信息核心插
 * 件，你将会使用字体系列代替字体文件名
 * Place them inside of your game’s /fonts/ folder.
 * 如果你喜欢在视频里面的字体，你可以从这里下载他们，并放入你的/fonts/路径
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_LoadCustomFonts');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LCFFontFilenames = String(Yanfly.Parameters['Font Filenames']);
Yanfly.Param.LCFFontFamilies = String(Yanfly.Parameters['Font Families']);

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.loadCustomFonts = function() {
  var filenames = Yanfly.Param.LCFFontFilenames.split(',');
  var fontfamilies = Yanfly.Param.LCFFontFamilies.split(',');
  if (filenames.length !== fontfamilies.length) {
    if (filenames.length > fontfamilies.length) {
      console.log('You are missing fonts in the Font Families parameter.');
    }
    if (filenames.length < fontfamilies.length) {
      console.log('You are missing fonts in the Font Filenames parameter.');
    }
    console.log('Loading custom fonts aborted.');
    return;
  }
  var projectDirectory = window.location.pathname.substring(0,
    window.location.pathname.lastIndexOf('/'));
  var length = filenames.length;
  for (var i = 0; i < length; ++i) {
    var filename = filenames[i].trim();
    var fontfamily = fontfamilies[i].trim();
    Graphics.loadFont(fontfamily, projectDirectory + '/fonts/' + filename);
  }
};
Yanfly.Util.loadCustomFonts();

//=============================================================================
// End of File
//=============================================================================


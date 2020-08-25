//=============================================================================
// Yanfly Engine Plugins - Weapon Animation
// YEP_WeaponAnimation.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_WeaponAnimation = true;

var Yanfly = Yanfly || {};
Yanfly.WA = Yanfly.WA || {};
Yanfly.WA.version = 1.04;

//=============================================================================
 /*:
 * @plugindesc v1.04 武器动画
 * @author Yanfly Engine Plugins
 *
 * @param Image Filepath
 * @desc The filepath used for custom weapon images.
 * @default img/weapons/
 *
 * @param Image Smoothing
 * @desc Enable image smoothing for weapons?
 * NO - false     YES - true
 * @default false
 *
 * @param Default Motion
 * @desc Default motion used for custom weapon images.
 * @default swing
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 你是否希望给你的剑不同的图像尽管他们是一种类型的剑。或者是你的斧子？或者
 * 任何武器？现在你可以了。在这里，你可以自定义图像。
 *
 * 注意：如果你使用了YEP_BattleEngineCore,YEP_X_AnimatedSVEnemies或者其他动
 * 作序列，需要把这个插件放在他们后面。
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 对于那些想对你的物品做出改变的人，你可以使用下面标签:
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Weapon Image: x>
 *   用大于0的数代替x，然后你可以从你的img文件夹中获得图像。每一个完整部分包含
 *   12个武器图像。如果希望载入第一个部分的物品，他可能在1-12之间。如果你希望
 *   从第二部分载入，他可能在13-24之间等等。这个每次增长值为12，这意味着如果你
 *   想要武器从第50部分获得，x位于589到600之间。
 *
 *   默认，有下面的值参考:
 *   1 - Dagger   7 - Long Bow  13 - Mace       19 - Slingshot  25 - Book
 *   2 - Sword    8 - Crossbow  14 - Rod        20 - Shotgun    26 - Custom
 *   3 - Flail    9 - Gun       15 - Club       21 - Rifle      27 - Custom
 *   4 - Axe     10 - Claw      16 - Chain      22 - Chainsaw   28 - Custom
 *   5 - Whip    11 - Glove     17 - Sword#2    23 - Railgun    29 - Custom
 *   6 - Staff   12 - Spear     18 - Iron Pipe  24 - Stun Rod   30 - Custom
 *   
 *   1 - 匕首   7 - 长弓     13 - 杖       19 - 弹弓    25 - 书
 *   2 - 剑     8 - 十字弓   14 - 棍       20 - 猎枪    26 - 自定义
 *   3 - 枷     9 - 火枪     15 - 也是棍棒 21 - 狙击枪  27 - 自定义
 *   4 - 斧    10 - 爪       16 - 链子     22 - 锯      28 - 自定义
 *   5 - 鞭子  11 - 手套     17 - 剑#2     23 - 轨道炮  29 - 自定义
 *   6 - 棒    12 - 矛       18 - 钢管     24 - 电击棒  30 - 自定义 
 *
 *   <Weapon Image: filename>
 *   如果你创建了一个文件放置自定义武器部分，你可以使用这个标签来获得路径。这
 *   个名字不需要带有拓展名。例如你的物品部分叫做DaggerBlue.png，你可以使用这
 *   个命令
 *
 *   <Weapon Motion: thrust>
 *   <Weapon Motion: swing>
 *   <Weapon Motion: missile>
 *   当你使用自定义武器动画时，你可以这些来描述动作，你过没有设置，动作将会采
 *   用插件中的默认值:
 *   walk     wait     chant     guard     damage     evade
 *   thrust   swing    missile   skill     spell      item
 *   escape   victory  dying     abnormal  sleep      dead
 *   行走(walk) 等待(wait) 吟唱(chant) 防御(guard) 伤害(damage) 躲避(evade)
 *   刺(thrust) 挥舞(swing) 投掷(missile) 技能(skill) 咒语(spell) 物品(item)
 *   逃跑(escape) 胜利(victory) 濒死(dying) 异常状态(abnormal) 睡眠(sleep) 死
 *   亡(dead) 
 *
 *   <Weapon Hue: x>
 *   对于想使用不同颜色的动画的人，可以用这个标签来改变色调
 *
 *   <Weapon Animation: x>
 *   如果想优先设置动画，你可以用x来设置动画
 *
 * ---
 *
 * 如果你没有设置标签，这些标签会自动执行。这就意味着，动画将会像特性一样。:
 *
 *   States
 *   Weapons
 *   Armors
 *   Classes
 *   Actors
 *   Enemies
 *
 * 这意味着，如果战斗者如果被一个改变武器的状态影响，动画将会改变直到状态消
 * 失
 *
 * ============================================================================
 * Instructions - Custom Weapon Images
 * ============================================================================
 *
 * 这个武器部分格式将会遵从软件默认方式。但是，不像默认的武器部分格式，这些
 * 自定义图像需要被明确定义使其可以在默认战斗里面正确显示
 *
 * 这里有一个武器部分格式:
 *
 *   Sheet Width:   288 Minimum
 *   Sheet Height:  64 Minimum
 *   Frame Width:   Sheet Width / 3
 *   Frame Height:  Sheet Height
 *
 * 只要这样设置，就可以战斗中正确生效
 * 
 * 这里有一些图像，你可以把他们放入img/weapons/文件夹
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Added a new system which loads numeric weapon sheets from the 'system'
 * folder as the game's database is loaded.
 *
 * Version 1.03:
 * - Fixed a bug that caused the <Weapon Animation: x> notetag to not work when
 * used by enemies.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.01:
 * - Fixed a conflict with sideview enemies using no weapon animations.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_WeaponAnimation');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.WAFilepath = String(Yanfly.Parameters['Image Filepath']);
Yanfly.Param.WASmoothing = eval(String(Yanfly.Parameters['Image Smoothing']));
Yanfly.Param.WAMotion = String(Yanfly.Parameters['Default Motion']);
Yanfly.Param.WAMotion = Yanfly.Param.WAMotion.toLowerCase();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.WA.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.WA.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_WeaponAnimation) {
    this.processWANotetags1($dataActors);
    this.processWANotetags1($dataClasses);
    this.processWANotetags1($dataEnemies);
    this.processWANotetags1($dataWeapons);
    this.processWANotetags1($dataArmors);
    this.processWANotetags1($dataStates);
    Yanfly._loaded_YEP_WeaponAnimation = true;
  }
  return true;
};

DataManager.processWANotetags1 = function(group) {
  this._loadedWeaponsSheets = this._loadedWeaponsSheets || [];
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.weaponImageIndex = 0;
    obj.weaponAttackMotion = undefined;
    obj.weaponAnimationId = 0;
    obj.weaponHue = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:WEAPON IMAGE):[ ](\d+)>/i)) {
        obj.weaponImageIndex = parseInt(RegExp.$1);
        if (obj.weaponAttackMotion) continue;
        var motion = $dataSystem.attackMotions[parseInt(RegExp.$1)];
        if (motion) {
          if (motion.type === 0) {
            obj.weaponAttackMotion = 'thrust';
          } else if (motion.type === 1) {
            obj.weaponAttackMotion = 'swing';
          } else {
            obj.weaponAttackMotion = 'missile';
          }
        } else {
          obj.weaponAttackMotion = Yanfly.Param.WAMotion;
        }
        if (obj.weaponHue === undefined) obj.weaponHue = 0;
        var weaponSheetId = Math.ceil(obj.weaponImageIndex / 12);
        var filename = 'Weapons' + weaponSheetId;
        if (!this._loadedWeaponsSheets.contains(filename)) {
          this._loadedWeaponsSheets.push(filename);
          ImageManager.loadSystem(filename);
        }
      } else if (line.match(/<(?:WEAPON IMAGE):[ ](.*)>/i)) {
        obj.weaponImageIndex = String(RegExp.$1);
        obj.weaponAttackMotion = Yanfly.Param.WAMotion;
      } else if (line.match(/<(?:WEAPON MOTION):[ ](.*)>/i)) {
        obj.weaponAttackMotion = String(RegExp.$1).toLowerCase();
      } else if (line.match(/<(?:WEAPON ANIMATION):[ ](\d+)>/i)) {
        obj.weaponAnimationId = parseInt(RegExp.$1);
      } else if (line.match(/<(?:WEAPON HUE):[ ](\d+)>/i)) {
        obj.weaponHue = parseInt(RegExp.$1);
      }
    }
  }
};

//=============================================================================
// ImageManager
//=============================================================================

ImageManager.loadWeapon = function(filename, hue) {
    var filepath = Yanfly.Param.WAFilepath;
    var smooth = Yanfly.Param.WASmoothing;
    return this.loadBitmap(filepath, filename, hue, smooth);
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.WA.Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    this._cacheWeaponImage = undefined;
    this._cacheWeaponHue = undefined;
    this._cacheWeaponMotion = undefined;
    this._cacheWeaponAni = undefined;
    Yanfly.WA.Game_Battler_refresh.call(this);
};

Yanfly.WA.Game_Battler_startWeaponAnimation =
    Game_Battler.prototype.startWeaponAnimation;
Game_Battler.prototype.startWeaponAnimation = function(id) {
    var unique = false;
    if (this.getUniqWeapAniId()) {
      id = this.getUniqWeapAniId();
      unique = true;
    }
    Yanfly.WA.Game_Battler_startWeaponAnimation.call(this, id);
    if (!unique) return;
    if (Imported.YEP_BattleEngineCore) {
      this.forceMotion(this.getUniqueWeaponMotion());
    } else {
      this.requestMotion(this.getUniqueWeaponMotion());
    }
};

Game_Battler.prototype.getUniqWeapAniId = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.weaponImageIndex) {
        this._cacheWeaponImage = obj.weaponImageIndex;
        this._cacheWeaponHue = obj.weaponHue;
        return this._cacheWeaponImage;
      }
    }
    return undefined;
};

Game_Battler.prototype.getUniqueWeaponHue = function() {
    if (this._cacheWeaponHue === undefined) this.getUniqWeapAniId();
    return this._cacheWeaponHue ||0;
};

Game_Battler.prototype.getUniqueWeaponMotion = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.weaponAttackMotion) {
        this._cacheWeaponMotion = obj.weaponAttackMotion;
        return this._cacheWeaponMotion;
      }
    }
    return undefined;
};

Game_Battler.prototype.getUniqueWeaponAni = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.weaponAnimationId) {
        this._cacheWeaponAni = obj.weaponAnimationId;
        return this._cacheWeaponAni;
      }
    }
    return undefined;
};

Game_Battler.prototype.isWeaponAnimationRequested = function() {
    return this._weaponImageId !== 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.getUniqWeapAniId = function() {
    if (this._cacheWeaponImage !== undefined) return this._cacheWeaponImage;
    var id = Game_Battler.prototype.getUniqWeapAniId.call(this);
    if (id) {
      this._cacheWeaponImage = id;
      return this._cacheWeaponImage;
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.weaponImageIndex) {
        this._cacheWeaponImage = obj.weaponImageIndex;
        this._cacheWeaponHue = obj.weaponHue;
        return this._cacheWeaponImage;
      }
    }
    if (this.currentClass().weaponImageIndex) {
      this._cacheWeaponImage = this.currentClass().weaponImageIndex;
        this._cacheWeaponHue = this.currentClass().weaponHue;
      return this._cacheWeaponImage;
    }
    if (this.actor().weaponImageIndex) {
      this._cacheWeaponImage = this.actor().weaponImageIndex;
        this._cacheWeaponHue = this.actor().weaponHue;
      return this._cacheWeaponImage;
    }
    this._cacheWeaponImage = 0;
    return this._cacheWeaponImage;
};

Game_Actor.prototype.getUniqueWeaponMotion = function() {
    if (this._cacheWeaponMotion !== undefined) return this._cacheWeaponMotion;
    var motion = Game_Battler.prototype.getUniqueWeaponMotion.call(this);
    if (motion) {
      this._cacheWeaponMotion = motion;
      return this._cacheWeaponMotion;
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.weaponAttackMotion) {
        this._cacheWeaponMotion = obj.weaponAttackMotion;
        return this._cacheWeaponMotion;
      }
    }
    if (this.currentClass().weaponAttackMotion) {
      this._cacheWeaponMotion = this.currentClass().weaponAttackMotion;
      return this._cacheWeaponMotion;
    }
    if (this.actor().weaponAttackMotion) {
      this._cacheWeaponMotion = this.actor().weaponAttackMotion;
      return this._cacheWeaponMotion;
    }
    this._cacheWeaponMotion = 'thrust';
    return 'thrust';
};

Game_Actor.prototype.getUniqueWeaponAni = function() {
    if (this._cacheWeaponAni !== undefined) return this._cacheWeaponAni;
    var ani = Game_Battler.prototype.getUniqueWeaponAni.call(this);
    if (ani) {
      this._cacheWeaponAni = ani;
      return this._cacheWeaponAni;
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.weaponAnimationId) {
        this._cacheWeaponAni = obj.weaponAnimationId;
        return this.weaponAnimationId;
      }
    }
    if (this.currentClass().weaponAnimationId) {
      this._cacheWeaponAni = this.currentClass().weaponAnimationId;
      return this.weaponAnimationId;
    }
    if (this.actor().weaponAttackMotion) {
      this._cacheWeaponAni = this.actor().weaponAnimationId;
      return this.weaponAnimationId;
    }
    this.weaponAnimationId = 0;
    return this.weaponAnimationId;
};

Yanfly.WA.Game_Actor_attackAnimationId1 =
    Game_Actor.prototype.attackAnimationId1;
Game_Actor.prototype.attackAnimationId1 = function() {
    if (this.getUniqueWeaponAni()) return this.getUniqueWeaponAni();
    return Yanfly.WA.Game_Actor_attackAnimationId1.call(this);
};

Yanfly.WA.Game_Actor_attackAnimationId2 =
    Game_Actor.prototype.attackAnimationId2;
Game_Actor.prototype.attackAnimationId2 = function() {
    if (this.getUniqueWeaponAni()) return this.getUniqueWeaponAni();
    return Yanfly.WA.Game_Actor_attackAnimationId2.call(this);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.getUniqWeapAniId = function() {
    if (this._cacheWeaponImage !== undefined) return this._cacheWeaponImage;
    var id = Game_Battler.prototype.getUniqWeapAniId.call(this);
    if (id) {
      this._cacheWeaponImage = id;
      return this._cacheWeaponImage;
    }
    if (this.enemy().weaponImageIndex) {
      this._cacheWeaponImage = this.enemy().weaponImageIndex;
        this._cacheWeaponHue = this.enemy().weaponHue;
      return this._cacheWeaponImage;
    }
    this._cacheWeaponImage = undefined;
    return this._cacheWeaponImage;
};

Game_Enemy.prototype.getUniqueWeaponMotion = function() {
    if (this._cacheWeaponMotion !== undefined) return this._cacheWeaponMotion;
    var motion = Game_Battler.prototype.getUniqueWeaponMotion.call(this);
    if (motion) {
      this._cacheWeaponMotion = motion;
      return this._cacheWeaponMotion;
    }
    if (this.enemy().weaponAttackMotion) {
      this._cacheWeaponMotion = this.enemy().weaponAttackMotion;
      return this._cacheWeaponMotion;
    }
    this._cacheWeaponMotion = 'thrust';
    return this._cacheWeaponMotion;
};

Game_Enemy.prototype.getUniqueWeaponAni = function() {
    if (this._cacheWeaponAni !== undefined) return this._cacheWeaponAni;
    var ani = Game_Battler.prototype.getUniqueWeaponAni.call(this);
    if (ani) {
      this._cacheWeaponAni = ani;
      return this._cacheWeaponAni;
    }
    if (this.enemy().weaponAnimationId) {
      this._cacheWeaponAni = this.enemy().weaponAnimationId;
      return this.weaponAnimationId;
    }
    this.weaponAnimationId = 0;
    return this.weaponAnimationId;
};

Yanfly.WA.Game_Enemy_attackAnimationId = Game_Enemy.prototype.attackAnimationId;
Game_Enemy.prototype.attackAnimationId = function() {
    if (this.getUniqueWeaponAni()) return this.getUniqueWeaponAni();
    return Yanfly.WA.Game_Enemy_attackAnimationId.call(this);
};

if (Imported.YEP_X_AnimatedSVEnemies) {

Yanfly.WA.Game_Enemy_attackMotion = Game_Enemy.prototype.attackMotion;
Game_Enemy.prototype.attackMotion = function() {
    if (this._cacheWeaponMotion !== undefined) return this._cacheWeaponMotion;
    return Yanfly.WA.Game_Enemy_attackMotion.call(this);
};

Yanfly.WA.Game_Enemy_weaponImageId = Game_Enemy.prototype.weaponImageId;
Game_Enemy.prototype.weaponImageId = function() {
    if (this._cacheWeaponImage !== undefined) return this._cacheWeaponImage;
    return Yanfly.WA.Game_Enemy_weaponImageId.call(this);
};

}; // Imported.YEP_X_AnimatedSVEnemies

//=============================================================================
// Sprite_Weapon
//=============================================================================

Yanfly.WA.Sprite_Weapon_loadBitmap = Sprite_Weapon.prototype.loadBitmap;
Sprite_Weapon.prototype.loadBitmap = function() {
    if (this.isCustomGraphic()) return this.loadCustomBitmap();
    Yanfly.WA.Sprite_Weapon_loadBitmap.call(this);
};

Sprite_Weapon.prototype.isCustomGraphic = function() {
    return typeof this._weaponImageId === 'string';
};

Sprite_Weapon.prototype.loadCustomBitmap = function() {
    if (this.parent && this.parent._battler) {
      var hue = this.parent._battler.getUniqueWeaponHue();
    } else {
      var hue = 0;
    }
    this.bitmap = ImageManager.loadWeapon(this._weaponImageId, hue);
};

Yanfly.WA.Sprite_Weapon_updateFrame = Sprite_Weapon.prototype.updateFrame;
Sprite_Weapon.prototype.updateFrame = function() {
    if (this.isCustomGraphic()) {
      var w = Math.floor(this.bitmap.width / 3);
      var h = this.bitmap.height;
      var sx = this._pattern * w;
      var sy = 0;
      this.setFrame(sx, sy, w, h);
    } else {
      Yanfly.WA.Sprite_Weapon_updateFrame.call(this);
    }
};

Yanfly.WA.Sprite_Weapon_update = Sprite_Weapon.prototype.update;
Sprite_Weapon.prototype.update = function() {
    Yanfly.WA.Sprite_Weapon_update.call(this);
    this.updateFrame();
};

//=============================================================================
// End of File
//=============================================================================

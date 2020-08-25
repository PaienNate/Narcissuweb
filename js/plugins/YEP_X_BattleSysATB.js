//=============================================================================
// Yanfly Engine Plugins - Battle System - Active Turn Battle
// YEP_X_BattleSysATB.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_BattleSysATB = true;

var Yanfly = Yanfly || {};
Yanfly.ATB = Yanfly.ATB || {};
Yanfly.ATB.version = 1.25;

//=============================================================================
 /*:
 * @plugindesc v1.25 时间槽战斗系统
 * @author Yanfly Engine Plugins
 *
 * @param ---ATB Settings---
 * @default
 *
 * @param Per Tick
 * @desc This is how much speed is gained per tick.
 * @default user.agi
 *
 * @param Initial Speed
 * @desc The speed position of the battler at the start of battle.
 * This is a formula processed as an eval.
 * @default 0
 *
 * @param Full Gauge
 * @desc The target speed for an ATB gauge to be full.
 * This is a formula processed as an eval.
 * @default Math.max(5000, BattleManager.highestBaseAgi() * 100)
 *
 * @param Charge Gauge
 * @desc The wind-up time after selecting an action.
 * This is a formula processed as an eval.
 * @default Math.max(2000, BattleManager.highestBaseAgi() * 20)
 *
 * @param Pre-Emptive Bonuses
 * @desc How much of the ATB bar do you want filled up for an
 * ATB pre-emptive bonus from 0 to 1.
 * @default 0.8
 *
 * @param Surprise Bonuses
 * @desc How much of the ATB bar do you want filled up for an
 * ATB surprise bonus from 0 to 1.
 * @default 0.8
 *
 * @param ---Escape---
 * @default
 *
 * @param Escape Ratio
 * @desc How ATB calculates escape ratios.
 * Default: 0.5 * $gameParty.agility() / $gameTroop.agility()
 * @default 0.125 * $gameParty.agility() / $gameTroop.agility()
 *
 * @param Fail Escape Boost
 * @desc Each time the player fails escape, increase the success
 * rate by this much. Default: 0.1
 * @default 0.025
 *
 * @param ---Turn---
 * @default
 *
 * @param Full Turn
 * @desc This is how many ticks to equal a full battle turn.
 * This is a formula processed as an eval.
 * @default Math.min(200, BattleManager.lowestBaseAgi() * 8)
 *
 * @param Flash Enemy
 * @desc Flash enemies when they start charging their skills?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Rubberband---
 * @default
 *
 * @param Enable Rubberband
 * @desc This is an auto-balance mechanic for AGI.
 * Disable - false     Enable - true
 * @default true
 *
 * @param Minimum Speed
 * @desc If rubberbanding is enabled, what is the minimum
 * speed increase? This is a formula.
 * @default 0.5 * BattleManager.highestBaseAgi()
 *
 * @param Maximum Speed
 * @desc If rubberbanding is enabled, what is the maximum
 * speed increase? This is a formula.
 * @default 1.5 * BattleManager.highestBaseAgi()
 *
 * @param ---Sound---
 * @default
 *
 * @param Ready Sound
 * @desc This is the sound played when the battler is ready.
 * @default Decision1
 *
 * @param Ready Volume
 * @desc This is the volume of the ready sound.
 * @default 90
 *
 * @param Ready Pitch
 * @desc This is the pitch of the ready sound.
 * @default 120
 *
 * @param Ready Pan
 * @desc This is the pan of the ready sound.
 * @default 0
 *
 * @param ---Options---
 * @default
 *
 * @param ATB Speed Text
 * @desc Text used for ATB speed in options window.
 * @default ATB Speed
 *
 * @param Default ATB Speed
 * @desc Default speed at which the gauges fill up.
 * 1 - slowest     10 - fastest
 * @default 10
 *
 * @param ---Windows---
 * @default
 *
 * @param Lock Status Window
 * @desc While ATB is active, lock the status window from moving?
 * OFF - false     ON - true
 * @default true
 *
 * @param Gauge Style
 * @desc This is the style of the ATB gauges:
 * 0 - None     1 - Under Name     2 - Right Side
 * @default 1
 *
 * @param Gauge Text
 * @desc If style 2 is used, this is the text displayed.
 * @default Turn
 *
 * @param Gauge Text Align
 * @desc If style 2 is used, this is the text alignment.
 * left     center     right
 * @default center
 *
 * @param ATB Gauge Color 1
 * @desc The 1st gauge color of the ATB gauge as it loads up.
 * @default 13
 *
 * @param ATB Gauge Color 2
 * @desc The 2nd gauge color of the ATB gauge as it loads up.
 * @default 5
 *
 * @param Slow Gauge Color 1
 * @desc 1st gauge color of the ATB gauge if actor is slowed.
 * @default 12
 *
 * @param Slow Gauge Color 2
 * @desc 2nd gauge color of the ATB gauge if actor is slowed.
 * @default 4
 *
 * @param Fast Gauge Color 1
 * @desc 1st gauge color of the ATB gauge if actor is hasted.
 * @default 26
 *
 * @param Fast Gauge Color 2
 * @desc 2nd gauge color of the ATB gauge if actor is hasted.
 * @default 27
 *
 * @param Stop Gauge Color 1
 * @desc 1st gauge color of the ATB gauge if actor is stopped.
 * @default 7
 *
 * @param Stop Gauge Color 2
 * @desc 2nd gauge color of the ATB gauge if actor is stopped.
 * @default 8
 *
 * @param Full Gauge Color 1
 * @desc The 1st gauge color of the ATB gauge when full.
 * @default 14
 *
 * @param Full Gauge Color 2
 * @desc The 2nd gauge color of the ATB gauge when full.
 * @default 6
 *
 * @param Charge Gauge Color 1
 * @desc The 1st gauge color of the ATB gauge when charging.
 * @default 2
 *
 * @param Charge Gauge Color 2
 * @desc The 2nd gauge color of the ATB gauge when charging.
 * @default 10
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle System - Active Turn Battle是一个基于Yanfly大神Battle Engine 
 * Core插件的拓展插件，所以它无法脱离核心战斗插件独立工作，安装时务必将该插件
 * 放置于战斗核心插件-Battle Engine Core下方，要启用ATB战斗系统，请在战斗核心
 * 插件的配置中，将Default System 选项由dtb修改为atb即可。 
 * ATB战斗系统是一个出色的动态战斗系统，它给角色定义了一个行动槽，当行动槽填
 * 充时，角色不能进行任何操作，只有行动槽充满时，才可以进行相关操作如攻击、技
 * 能等等，行动后清空行动槽，当行动槽再次充满后，角色才可进行下一次行动。
 * 角色选择技能以后，会进入第二阶段行动槽填充，通常被成为咏唱时间条的填充，
 * 第二阶段行动槽填满后，角色才会释放技能。这种经典的战斗系统被很频繁用到了如
 * 最终幻想系列等很多游戏当中，这也使得传统RPG原本枯燥的回合战斗变得更加
 * 紧张、刺激和有趣味，使用本系统，将使回合战斗中的更多战术和策略技能的设计研
 * 发成为可能。
 * ATB战斗系统使各角色的敏捷属性不再是花瓶，敏捷将直接决定角色的出手顺序和出
 * 手速度，通常来说敏捷高的角色比敏捷低的角色更具备优势，前提是你不要弄个负
 * 敏神兽出来...
 *
 * ============================================================================
 * Plugin Commands 插件命令
 * ============================================================================
 *
 * To change your battle system to Active Turn Battle if it isn't the default
 * battle system, you can use the following Plugin Command:
 *
 * Plugin Command:
 *   setBattleSys ATB      将战斗模式改为 ATB 动态回合战斗系统.
 *   setBattleSys DTB      将战斗模式改为 DTB 默认回合战斗系统.
 *
 * 使用这个命令可以实现游戏对战斗模式的实时切换。
 *
 * ============================================================================
 * Notetags  注释命令
 * ============================================================================
 *
 * 以下为影响的ATB系统的相关注释命令
 *
 * 技能与道具注释:
 *   <ATB Help>
 *   text
 *   text
 *   </ATB Help>
 *   这个命令可以给技能或道具添加专有的ATB说明信息，即如果启用了ATB战斗系统，
 *   则在技能/道具说明中显示<ATB Help>中的text文字说明，如果使用DTB系统，则显
 *   示默认说明。
 *
 *   <ATB Speed: x>
 *   <ATB Charge: x>
 *   <ATB Gauge: x>
 *   仅在ATB模式启用时可用。可以将目标单位的ATB行动值-speed、
 *   咏唱值-Charge、综合值-Gauge的设置为一个固定数值。简单解释：
 *   speed参数-决定了行动阶段行动槽的值
 *   Charge参数-咏唱阶段的行动槽的值
 *   Gauge参数-这个参数会同时影响以上两个阶段的行动槽值
 *   例子：道具注释中写上<ATB Speed: 1000> 即表示使用该道具后，目标的行动槽值
 *   将被设置为1000
 *   你要注意的是，如果你的行动槽值已经积攒到了10000，使用该道具后，将被置于
 *   1000，相当于减速，如果为0则反之。   
 *   
 *   <ATB Speed: x%>
 *   <ATB Charge: x%>
 *   <ATB Gauge: x%>
 *   参照上面的命令，你可以将具体的X数值更换为百分比，这样ATB系统将根据行动槽最
 *   大值来计算你要实现的具体数值大小
 *   例子：道具注释中写明<ATB Charge: 50%> 表示该道具使用后咏唱槽数值将被设置
 *   为50%，如果目标未咏唱，则不生效。如果目标咏唱超过50%，则将被强制重置为50%
 *   ，相当于减速，如果为0反之
 *
 *   <ATB Speed: +x>   or   <ATB Speed: -x>
 *   <ATB Charge: +x>  or   <ATB Charge: -x>
 *   <ATB Gauge: +x>   or   <ATB Gauge: -x>
 *   Usable only during ATB. This increases or decreases the target's current
 *   speed or charge by x. If 'speed' or 'charge' is used, it will only affect
 *   those gauges while in the respective phase. If 'gauge' is used, it will
 *   affect either.
 *
 *   <ATB Speed: +x%>   or   <ATB Speed: -x%>
 *   <ATB Charge: +x%>  or   <ATB Charge: -x%>
 *   <ATB Gauge: +x%>   or   <ATB Gauge: -x%>
 *   同上，你可以将x参数上加入+号或者-号来表示在当前行动槽基础上增加或者减少，
 *   这个命令通常被用于加速/减速道具或技能的设计。
 *   例子：<ATB Gauge: +50%>  同上，你同样可以把增加减少数值修改为百分比。
 *
 *   <After ATB: x>
 *   <After ATB: x%>
 *   顾名思义，你可以在道具和技能注释中加入这个命令，标识使用该道具或技能后，
 *   对使用者行动槽的影响。因为使用技能或道具后，行动槽必定会被清空，所以+/-就
 *   有意义了，你要把X替换为数值或百分比。
 *   例子：我在电光火石这个技能的注释中加入了<After ATB: 50%>这个命令，表示我
 *   使用电光火石技能后，使用者的回合结束后，行动槽将从50%处开始增加，
 *   相当于下回合行动更快速了，是不是很吊？
 *
 *   <ATB Interrupt>
 *   <ATB Interrupt: x%>
 *   这个命令比较强悍，就是打断！没错，Iterrupt命令会在对进入咏唱条的角色使用
 *   后生效，打断对方目标咏唱，清空目标行动槽。如果你使用了百分比参数，
 *   则表示有多少百分比的几率成功。
 *   例子：我在小石头这个道具的注释命令中添加了<ATB Interrupt: 50%>这个命令，
 *   表示当我使用这个道具后，目标如果正在咏唱，则有50%概率被打断，技能释放失
 *   败。如果目标没有在咏唱，则道具无效。
 *
 *   <Cannot ATB Interrupt>
 *   当然你可以在技能中加入<Cannot ATB Interrupt>这个注释，表示该技能无法被打断，
 *   如果有这个命令，任何带有打断命令的技能和道具都不会对这个技能生效了,请叫BOSS
 *   
 *   下面这些命令可以用在角色、职业、敌人、武器、护甲和状态注释命令中，不要用
 *   错地方哦:
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *   <ATB Start: +x>
 *   <ATB Start: +x%>
 *   上面的命令可以让你在回合开始时，获得行动槽的加成，x为数值或者百分比。第一
 *   回合结束后，行动槽将从0开始计算。
 *   例子：哈罗德的角色注释中我加入了<ATB Start: +20%>命令，表示哈罗德每次战斗
 *   开始时行动槽都会从20%开始计算，而不是0
 *   在第一回合之后，哈罗德的行动槽恢复正常，与其他角色一样从0开始。
 *   
 *   the ATB gauge filled up.
 *
 *   <ATB Turn: +x>
 *   <ATB Turn: +x%>
 *   这个命令表示每个回合的行动槽获得行动力加成，x为数值或者百分比。包括第一回
 *   合在内的每一个回合，行动槽都会从X或x%开始计算。
 *   例子：我在时魔法师的职业注释中加入了<ATB Turn: +50%>这个命令，然后我把玛
 *   莎转职成了时魔法师，但是悲剧的小明还是黑魔法师所以小明的行动槽每回合是从
 *   头开始计算的，而玛莎美女每回合的行动力都是从50%处开始计算，所以，
 *   玛莎比小明更快，此题得证。
 *
 * ============================================================================
 * Lunatic Mode - Conditional ATB Speed and Conditional ATB Charge
 * ============================================================================
 *
 * 等等，上面那些基本命令已经满足不了你的编程小心脏了吗？我们为您提供了可以
 * 在注释区域混合JavaScript脚本拓展命令的专用模式已经开启，Lunatic Mode 可以让
 * 你在注释命令区间内按你们的想法设置条件和触发器，前提是，你要懂
 *
 * 技能和道具命令:
 *   <Target ATB Eval>
 *   speed = x;
 *   charge = x;
 *   </Target ATB Eval>
 *   不同于直接的<ATB Speed/Charge/Gauge>命令,这段命令的格式如上，你可以在注释
 *   区的Lunatic Mode中使用更复杂的语句和公式定义speed charge参数，
 *   也支持if else while for等javascript脚本命令。
 *
 *   给一个例子：
 *
 *   <Target ATB Eval>
 *   speed = target.hp / target.mhp * max;
 *   charge = target.hp / target.mhp * max;
 *   </Target ATB Eval>
 *   上面这段代码实现了speed和charge按照目标单位的hp和最大hp的百分比进行修改，
 *   即目标血越少行动条填充的越多。延伸一点，你也可以使用触发器，使用if target.hp
 *   < target.mhp  30% 这种条件来决定这个技能什么时候可以被触发。
 *
 *   --- --- --- --- ---
 *
 *   <After ATB Eval>
 *   speed = x;
 *   </After ATB Eval>
 *   这个命令类似于<Afer ATB> 可以让你设计动作完毕后，该动作对角色行动槽的影响
 *   ，当然你也可以设计的很复杂。
 *   例子君出现了：
 *
 *   <After ATB Eval>
 *   speed = user.mp / user.mmp * max;
 *   </After ATB Eval>
 *   上面的代码实现了按照人物MP最大百分比来加成施法后行动条的回复量的功能。
 *
 *   --- --- --- --- ---
 *
 *   <ATB Interrupt Eval>
 *   interrupt = true;
 *   </ATB Interrupt Eval>
 *   打断，没什么好说的，加入各种触发器和公式命令都是可以的。
 *
 *  例子君出现了：
 *
 *   <ATB Interrupt Eval>
 *   if (user.hp > target.hp) {
 *      interrupt = true;
 *   }
 *   </ATB Interrupt Eval>
 *  上面的命令实现了当使用者的当前hp大于目标的hp时，打断才能成功。给一个延伸的
 *  例子，通常我们想要给打断技能一个固定几率，然后增加一个附加值比如，默
 *  认50%的概率
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 * 
 * 下面部分的命令将会与Battle Engine带来的基础Action行为密切相关，在学习命令时
 * 建议先去Battle Engine插件中掌握如何使用Action Sequence的相关命令和内容
 * 本插件提供了更多的关于atb系统的action sequences命令，快把他们加入到你的
 * 技能和战斗中来吧。
 * 
 *=============================================================================
 * ATB CHARGE: target, X
 * ATB CHARGE: target, X%
 * ATB CHARGE: targets, +X
 * ATB CHARGE: targets, +X%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 上面的命令参照charge咏唱条的设定，不过你可以把targets更换为其他值了，
 * 具体请参照action sequence的帮助文件
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: atb charge: targets, +5000
 *                atb charge: target, -50%
 *=============================================================================
 *
 *=============================================================================
 * ATB GAUGE: target, X
 * ATB GAUGE: target, X%
 * ATB GAUGE: targets, +X
 * ATB GAUGE: targets, +X%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 参照Gauge设置，针对speed和charge两个参数同时生效。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: atb gauge: targets, +5000
 *                atb gauge: target, -50%
 *=============================================================================
 *
 *=============================================================================
 * ATB INTERRUPT: target
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 打断命令，没什么好说的，用sequence系统可以做成群体打断，全体打断，打断
 * 自己人，好开心
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: atb interrupt: targets
 *=============================================================================
 *
 *=============================================================================
 * ATB SPEED: target, X
 * ATB SPEED: target, X%
 * ATB SPEED: targets, +X
 * ATB SPEED: targets, +X%   参照speed参数设置，你可以实现更多目标
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usable only for ATB. Sets the target's ATB speed to X or X%. This only
 * applies when the target is filling up its ATB gauge. This will not affect
 * the user to prevent mechanical issues.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: atb speed: targets, +5000
 *                atb speed: target, -50%
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.25:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.24:
 * - During action end, a single tick will be forced to occur to prevent clash
 * amongst actors with similar AGI values and make tick values more unique.
 *
 * Version 1.23:
 * - Timing has been changed for states that update turns at Turn Start. Now,
 * the states will update prior to the actor's command box opening or the enemy
 * make a decision on which action it will use.
 *
 * Version 1.22:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.21:
 * - Counterattacks no longer cause interrupts if attack actions have interrupt
 * functionality.
 *
 * Version 1.20:
 * - Updated plugin to update the AI more accordingly with Battle AI Core.
 *
 * Version 1.19:
 * - Fixed a bug where forced actions clear out an action's effects before the
 * turn is over, making post-turn effects to not occur.
 *
 * Version 1.18:
 * - Fixed a bug where changing back and forth between the Fight/Escape window
 * would prompt on turn start effects.
 *
 * Version 1.17:
 * - Made a mechanic change so that turn 0 ends immediately upon battle start
 * rather than requiring a full turn to end.
 *
 * Version 1.16:
 * - Added a fail safe setting up ATB Charges when the Cannot Move restriction
 * is imposed upon an actor.
 *
 * Verison 1.15:
 * - Implemented a Forced Action queue list. This means if a Forced Action
 * takes place in the middle of an action, the action will resume after the
 * forced action finishes rather than cancels it out like MV does.
 *
 * Version 1.14:
 * - Added a speed position check for Instant Casts to maintain order position.
 *
 * Version 1.13:
 * - Fixed a bug that doesn't update state turns properly.
 * - Removed 'Turn Structure parameter' as it goes against the nature of a
 * Tick-Based battle system.
 *
 * Version 1.12:
 * - Added speed rebalance formulas for tick-based systems (innate).
 *
 * Version 1.11:
 * - Fixed a bug that would still allow battlers to perform actions even if the
 * actions got sealed midway through charging the action.
 *
 * Version 1.10:
 * - Fixed a bug that would cause AutoBattlers to stall if they got added into
 * the party mid-battle.
 *
 * Version 1.09:
 * - Mechanic change for states that update on Action End to end at the end of
 * a battler's turn instead of at the start.
 *
 * Version 1.08a:
 * - Fixed a bug that crashed the game when enemies were confused.
 * - Preparation for Enemy ATB Gauges.
 *
 * Version 1.07:
 * - Added 'Flash Enemy' to plugin parameters to flash the enemy once when it
 * starts charging a skill.
 *
 * Version 1.06:
 * - Added pre-emptive and surprise attack mechanic plugin parameters!
 *
 * Version 1.05:
 * - Fixed a bug with Forced Actions locking out the battle.
 *
 * Version 1.04:
 * - Added the 'Per Tick' parameter for you to adjust the formula that governs
 * the speed rate at which the ATB gauge fills up.
 *
 * Version 1.03:
 * - Fixed a bug that caused the ATB Gauge appear slow with maxed AGI.
 *
 * Version 1.02c:
 * - Fixed a bug with the ATB GAUGE and ATB CHARGE action sequences.
 * - Fixed a bug with battlers still getting a turn after the battle is over.
 * - Fixed a bug that prevented escaping.
 * - Added math fail safes for calculating ATB charging.
 *
 * Version 1.01:
 * - Fixed a bug with escaping causing battlers to go into infinite lock.
 * - Fixed a bug with multiple victory messages.
 * - Added fail safe to prevent infinite charging.
 * - Added <Cannot ATB Interrupt Notetag>.
 *
 * Version 1.00:
 * - It's doooooooone!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

  if (Yanfly.BEC.version && Yanfly.BEC.version >= 1.42) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_BattleSysATB');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ATBPerTick = String(Yanfly.Parameters['Per Tick']);
Yanfly.Param.ATBInitSpeed = String(Yanfly.Parameters['Initial Speed']);
Yanfly.Param.ATBFullGauge = String(Yanfly.Parameters['Full Gauge']);
Yanfly.Param.ATBChargeGauge = String(Yanfly.Parameters['Charge Gauge']);
Yanfly.Param.ATBPreEmptive = Number(Yanfly.Parameters['Pre-Emptive Bonuses']);
Yanfly.Param.ATBSurprise = Number(Yanfly.Parameters['Surprise Bonuses']);
Yanfly.Param.ATBEscapeRatio = String(Yanfly.Parameters['Escape Ratio']);
Yanfly.Param.ATBEscapeBoost = String(Yanfly.Parameters['Fail Escape Boost']);
Yanfly.Param.ATBFullTurn = String(Yanfly.Parameters['Full Turn']);
Yanfly.Param.ATBTurnStructure = false;
Yanfly.Param.ATBFlashEnemy = eval(String(Yanfly.Parameters['Flash Enemy']));
Yanfly.Param.ATBRubberband = String(Yanfly.Parameters['Enable Rubberband']);
Yanfly.Param.ATBMinSpeed = String(Yanfly.Parameters['Minimum Speed']);
Yanfly.Param.ATBMaxSpeed = String(Yanfly.Parameters['Maximum Speed']);
Yanfly.Param.ATBReadyName = String(Yanfly.Parameters['Ready Sound']);
Yanfly.Param.ATBReadyVol = Number(Yanfly.Parameters['Ready Volume']);
Yanfly.Param.ATBReadyPitch = Number(Yanfly.Parameters['Ready Pitch']);
Yanfly.Param.ATBReadyPan = Number(Yanfly.Parameters['Ready Pan']);
Yanfly.Param.ATBOptionSpeedTx = String(Yanfly.Parameters['ATB Speed Text']);
Yanfly.Param.ATBDefaultSpeed = Number(Yanfly.Parameters['Default ATB Speed']);
Yanfly.Param.ATBLockStatusWin = String(Yanfly.Parameters['Lock Status Window']);
Yanfly.Param.ATBGaugeStyle = Number(Yanfly.Parameters['Gauge Style']);
Yanfly.Param.ATBGaugeText = String(Yanfly.Parameters['Gauge Text']);
Yanfly.Param.ATBGaugeAlign = String(Yanfly.Parameters['Gauge Text Align']);
Yanfly.Param.ATBColorAtb1 = Number(Yanfly.Parameters['ATB Gauge Color 1']);
Yanfly.Param.ATBColorAtb2 = Number(Yanfly.Parameters['ATB Gauge Color 2']);
Yanfly.Param.ATBColorSlow1 = Number(Yanfly.Parameters['Slow Gauge Color 1']);
Yanfly.Param.ATBColorSlow2 = Number(Yanfly.Parameters['Slow Gauge Color 2']);
Yanfly.Param.ATBColorFast1 = Number(Yanfly.Parameters['Fast Gauge Color 1']);
Yanfly.Param.ATBColorFast2 = Number(Yanfly.Parameters['Fast Gauge Color 2']);
Yanfly.Param.ATBColorStop1 = Number(Yanfly.Parameters['Stop Gauge Color 1']);
Yanfly.Param.ATBColorStop2 = Number(Yanfly.Parameters['Stop Gauge Color 2']);
Yanfly.Param.ATBColorFull1 = Number(Yanfly.Parameters['Full Gauge Color 1']);
Yanfly.Param.ATBColorFull2 = Number(Yanfly.Parameters['Full Gauge Color 2']);
Yanfly.Param.ATBColorChar1 = Number(Yanfly.Parameters['Charge Gauge Color 1']);
Yanfly.Param.ATBColorChar2 = Number(Yanfly.Parameters['Charge Gauge Color 2']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.ATB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.ATB.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_BattleSysATB) {
    this.processATBNotetags1($dataSkills);
    this.processATBNotetags1($dataItems);
    this.processATBNotetags2($dataActors);
    this.processATBNotetags2($dataClasses);
    this.processATBNotetags2($dataEnemies);
    this.processATBNotetags2($dataWeapons);
    this.processATBNotetags2($dataArmors);
    this.processATBNotetags2($dataStates);
    Yanfly._loaded_YEP_X_BattleSysATB = true;
  }
  return true;
};

DataManager.processATBNotetags1 = function(group) {
  var noteA1 = /<(?:ATB GAUGE):[ ](\d+)>/i;
  var noteA2 = /<(?:ATB GAUGE):[ ]([\+\-]\d+)>/i;
  var noteA3 = /<(?:ATB GAUGE):[ ](\d+)([%％])>/i;
  var noteA4 = /<(?:ATB GAUGE):[ ]([\+\-]\d+)([%％])>/i;
  var noteB1 = /<(?:ATB SPEED):[ ](\d+)>/i;
  var noteB2 = /<(?:ATB SPEED):[ ]([\+\-]\d+)>/i;
  var noteB3 = /<(?:ATB SPEED):[ ](\d+)([%％])>/i;
  var noteB4 = /<(?:ATB SPEED):[ ]([\+\-]\d+)([%％])>/i;
  var noteC1 = /<(?:ATB CHARGE):[ ](\d+)>/i;
  var noteC2 = /<(?:ATB CHARGE):[ ]([\+\-]\d+)>/i;
  var noteC3 = /<(?:ATB CHARGE):[ ](\d+)([%％])>/i;
  var noteC4 = /<(?:ATB CHARGE):[ ]([\+\-]\d+)([%％])>/i;
  var noteS1 = /<(?:AFTER ATB):[ ](\d+)>/i;
  var noteS2 = /<(?:AFTER ATB):[ ](\d+)([%％])>/i;
  var noteI1 = /<(?:ATB INTERRUPT)>/i;
  var noteI2 = /<(?:ATB INTERRUPT):[ ](\d+)([%％])>/i;
  var noteI3 = /<(?:CANNOT ATB INTERRUPT)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.setATBGaugeFlat = undefined;
    obj.addATBGaugeFlat = 0;
    obj.setATBGaugeRate = undefined;
    obj.addATBGaugeRate = 0.0;
    obj.setATBSpeedFlat = undefined;
    obj.addATBSpeedFlat = 0;
    obj.setATBSpeedRate = undefined;
    obj.addATBSpeedRate = 0.0;
    obj.setATBChargeFlat = undefined;
    obj.addATBChargeFlat = 0;
    obj.setATBChargeRate = undefined;
    obj.addATBChargeRate = 0.0;
    obj.afterATBFlat = undefined;
    obj.afterATBRate = undefined;
    obj.atbInterruptRate = 0;
    obj.cannotAtbInterrupt = false;
    var evalMode = 'none';
    obj.atbEval = '';
    obj.atbAfterEval = '';
    obj.atbInterruptEval = '';
    obj.atbHelp = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteA1)) {
        obj.setATBGaugeFlat = parseInt(RegExp.$1);
      } else if (line.match(noteA2)) {
        obj.addATBGaugeFlat = parseInt(RegExp.$1);
      } else if (line.match(noteA3)) {
        obj.setATBGaugeRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteA4)) {
        obj.addATBGaugeRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteB1)) {
        obj.setATBSpeedFlat = parseInt(RegExp.$1);
      } else if (line.match(noteB2)) {
        obj.addATBSpeedFlat = parseInt(RegExp.$1);
      } else if (line.match(noteB3)) {
        obj.setATBSpeedRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteB4)) {
        obj.addATBSpeedRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteC1)) {
        obj.setATBChargeFlat = parseInt(RegExp.$1);
      } else if (line.match(noteC2)) {
        obj.addATBChargeFlat = parseInt(RegExp.$1);
      } else if (line.match(noteC3)) {
        obj.setATBChargeRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteC4)) {
        obj.addATBChargeRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteS1)) {
        obj.afterATBFlat = parseInt(RegExp.$1);
      } else if (line.match(noteS2)) {
        obj.afterATBRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteI1)) {
        obj.atbInterruptRate = 1;
      } else if (line.match(noteI2)) {
        obj.atbInterruptRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteI3)) {
        obj.cannotAtbInterrupt = true;
      } else if (line.match(/<(?:TARGET ATB EVAL)>/i)) {
        evalMode = 'atb eval';
      } else if (line.match(/<\/(?:TARGET ATB EVAL)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:AFTER ATB EVAL)>/i)) {
        evalMode = 'after atb eval';
      } else if (line.match(/<\/(?:AFTER ATB EVAL)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:ATB INTERRUPT EVAL)>/i)) {
        evalMode = 'atb interrupt eval';
      } else if (line.match(/<\/(?:ATB INTERRUPT EVAL)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:ATB HELP)>/i)) {
        evalMode = 'atb help';
        obj.atbHelp = '';
      } else if (line.match(/<\/(?:ATB HELP)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'atb help') {
        obj.atbHelp = obj.atbHelp + line + '\n';
      } else if (evalMode === 'atb eval') {
        obj.atbEval = obj.atbEval + line + '\n';
      } else if (evalMode === 'after atb eval') {
        obj.atbAfterEval = obj.atbAfterEval + line + '\n';
      } else if (evalMode === 'atb interrupt eval') {
        obj.atbInterruptEval = obj.atbInterruptEval + line + '\n';
      }
    }
  }
};

DataManager.processATBNotetags2 = function(group) {
  var noteA1 = /<(?:ATB START):[ ]([\+\-]\d+)>/i;
  var noteA2 = /<(?:ATB START):[ ]([\+\-]\d+)([%％])>/i;
  var noteB1 = /<(?:ATB TURN):[ ]([\+\-]\d+)>/i;
  var noteB2 = /<(?:ATB TURN):[ ]([\+\-]\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.atbStartFlat = 0;
    obj.atbStartRate = 0;
    obj.atbTurnFlat = 0;
    obj.atbTurnRate = 0;
    var evalMode = 'none';
    obj.atbHelp = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteA1)) {
        obj.atbStartFlat = parseInt(RegExp.$1);
      } else if (line.match(noteA2)) {
        obj.atbStartRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(noteB1)) {
        obj.atbTurnFlat = parseInt(RegExp.$1);
      } else if (line.match(noteB2)) {
        obj.atbTurnRate = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(/<(?:ATB HELP)>/i)) {
        evalMode = 'atb help';
        obj.atbHelp = '';
      } else if (line.match(/<\/(?:ATB HELP)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'atb help') {
        obj.atbHelp = obj.atbHelp + line + '\n';
      }
    }
  }
};

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.atbSpeed = Yanfly.Param.ATBDefaultSpeed;

Yanfly.ATB.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.ATB.ConfigManager_makeData.call(this);
    config.atbSpeed = this.atbSpeed;
    return config;
};

Yanfly.ATB.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.ATB.ConfigManager_applyData.call(this, config);
    this.atbSpeed = this.readConfigATBSpeed(config, 'atbSpeed');
};

ConfigManager.readConfigATBSpeed = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return Number(value).clamp(1, 10);
    } else {
        return Yanfly.Param.ATBDefaultSpeed.clamp(1, 10);
    }
};

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.isATB = function() {
    return this.isBattleSystem('atb');
};

Yanfly.ATB.BattleManager_isTurnBased = BattleManager.isTurnBased;
BattleManager.isTurnBased = function() {
    if (this.isATB()) return false;
    return Yanfly.ATB.BattleManager_isTurnBased.call(this);
};

Yanfly.ATB.BattleManager_tickRate = BattleManager.tickRate;
BattleManager.tickRate = function() {
    var rate = Yanfly.ATB.BattleManager_tickRate.call(this);
    if (this.isATB()) rate *= this.atbTickRate();
    return rate;
};

BattleManager.atbTickRate = function() {
    var rate = 0.1 * ConfigManager.atbSpeed;
    return rate;
};

Yanfly.ATB.BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
  if (this.isATB()) {
    var code = Yanfly.Param.ATBEscapeRatio;
    try {
      this._escapeRatio = eval(code);
    } catch (e) {
      this._escapeRatio = 0;
      Yanfly.Util.displayError(e, code, 'ATB ESCAPE RATIO ERROR');
    }
    var code = Yanfly.Param.ATBEscapeBoost;
    try {
      this._escapeFailBoost = eval(code);
    } catch (e) {
      this._escapeFailBoost = 0;
      Yanfly.Util.displayError(e, code, 'ATB ESCAPE BOOST ERROR');
    }
  } else {
    this._escapeFailBoost = 0.1;
    Yanfly.ATB.BattleManager_makeEscapeRatio.call(this);
  }
};

Yanfly.ATB.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    Yanfly.ATB.BattleManager_startBattle.call(this);
    if (this.isATB()) {
      this._phase = null;
      this._counterAttacking = false;
      this.startATB();
    }
};

Yanfly.ATB.BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    Yanfly.ATB.BattleManager_endBattle.call(this, result);
    this.clearATBData();
};

BattleManager.startATB = function() {
    if (this._phase === 'battleEnd') return;
    this.clearATBData();
    this._atbTarget = Math.max(1, eval(Yanfly.Param.ATBFullGauge));
    this._atbCharge = Math.max(1, eval(Yanfly.Param.ATBChargeGauge));
    this._atbFullTurn = Math.max(1, eval(Yanfly.Param.ATBFullTurn));
    this._atbRubberband = eval(Yanfly.Param.ATBRubberband);
    if (this.atbRubberband()) {
      this._atbMinimumSpeed = Math.max(1, eval(Yanfly.Param.ATBMinSpeed));
      this._atbMaximumSpeed = Math.max(1, eval(Yanfly.Param.ATBMaxSpeed));
    }
    this._atbTicks = this._atbFullTurn;
    this._atbReadySound = {
      name: Yanfly.Param.ATBReadyName,
      volume: Yanfly.Param.ATBReadyVol,
      pitch: Yanfly.Param.ATBReadyPitch,
      pan: Yanfly.Param.ATBReadyPan
    }
    $gameParty.onATBStart();
    $gameTroop.onATBStart();
    this._phase = 'start';
};

BattleManager.clearATBData = function() {
    this._highestBaseAgi = undefined;
    this._averageBaseAgi = undefined;
    this._lowestBaseAgi = undefined;
    this._atbTarget = undefined;
    this._atbCharge = undefined;
    this._atbTarget = undefined;
    this._atbCharge = undefined;
    this._atbFullTurn = undefined;
    this._atbRubberband = undefined;
    this._atbMinimumSpeed = undefined;
    this._atbMaximumSpeed = undefined;
    this._atbTicks = 0;
};

BattleManager.atbTarget = function() {
    if (!this._atbTarget) this.startATB();
    return this._atbTarget;
};

BattleManager.atbCharge = function() {
    if (!this._atbCharge) this.startATB();
    return this._atbCharge;
};

BattleManager.atbRubberband = function() {
    return this._atbRubberband;
};

BattleManager.atbMinimumSpeed = function() {
    return this._atbMinimumSpeed;
};

BattleManager.atbMaximumSpeed = function() {
    return this._atbMaximumSpeed;
};

BattleManager.highestBaseAgi = function() {
    if (this._highestBaseAgi) return this._highestBaseAgi;
    var agi = 0;
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var battler = $gameParty.battleMembers()[i];
      if (battler) agi = Math.max(agi, battler.agi);
    }
    for (var i = 0; i < $gameTroop.members().length; ++i) {
      var battler = $gameTroop.members()[i];
      if (battler) agi = Math.max(agi, battler.agi);
    }
    this._highestBaseAgi = agi;
    return this._highestBaseAgi;
};

BattleManager.averageBaseAgi = function() {
    if (this._averageBaseAgi) return this._averageBaseAgi;
    var agi = 0;
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var battler = $gameParty.battleMembers()[i];
      if (battler) agi += battler.agi;
    }
    for (var i = 0; i < $gameTroop.members().length; ++i) {
      var battler = $gameTroop.members()[i];
      if (battler) agi += battler.agi;
    }
    var sum = $gameParty.battleMembers().length;
    sum += $gameTroop.members().length;
    this._averageBaseAgi = agi / sum;
    return this._averageBaseAgi;
};

BattleManager.lowestBaseAgi = function() {
    if (this._lowestBaseAgi) return this._lowestBaseAgi;
    var agi = this.highestBaseAgi();
    for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
      var battler = $gameParty.battleMembers()[i];
      if (battler) agi = Math.min(agi, battler.agi);
    }
    for (var i = 0; i < $gameTroop.members().length; ++i) {
      var battler = $gameTroop.members()[i];
      if (battler) agi = Math.min(agi, battler.agi);
    }
    this._lowestBaseAgi = agi;
    return this._lowestBaseAgi;
};

Yanfly.ATB.BattleManager_update = BattleManager.update;
BattleManager.update = function() {
    if (this.isATB()) {
      if (this.isBusy()) return;
      if (this.updateEvent()) return;
      if (this._phase === 'battleEnd') {
        return Yanfly.ATB.BattleManager_update.call(this);
      }
      if (this.checkBattleEnd()) return;
      if (this._phase === 'atb') {
        this.updateATBPhase();
      } else {
        Yanfly.ATB.BattleManager_update.call(this);
      }
    } else {
      Yanfly.ATB.BattleManager_update.call(this);
    }
};

Yanfly.ATB.BattleManager_updateEventMain = BattleManager.updateEventMain;
BattleManager.updateEventMain = function() {
    if (this.isATB()) {
      $gameTroop.updateInterpreter();
      $gameParty.requestMotionRefresh();
      if ($gameTroop.isEventRunning()) {
          return true;
      }
      $gameTroop.setupBattleEvent();
      if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
          return true;
      }
      return false;
    } else {
      return Yanfly.ATB.BattleManager_updateEventMain.call(this);
    }
};

BattleManager.updateATBPhase = function() {
    var chargedBattler = this.getChargedATBBattler();
    if (chargedBattler) return this.startATBAction(chargedBattler);
    var readyBattler = this.getReadyATBBattler();
    if (readyBattler) {
      return this.startATBInput(readyBattler);
    } else {
      this.updateATBTicks();
      this.updateBattlerATB();
    }
};

BattleManager.updateATBTicks = function() {
    this._atbTicks += 1 * this.tickRate();
    if (this._atbTicks < this._atbFullTurn) return;
    $gameTroop.increaseTurn();
    this._atbTicks = 0;
    if (this.isTurnBased()) {
      this.endTurn();
    } else {
      this.endTurn();
    }
};

BattleManager.getChargedATBBattler = function() {
    if ($gameParty.aliveMembers() <= 0 || $gameTroop.aliveMembers() <= 0) {
      return false;
    }
    var fastest = false;
    for (var i = 0; i < this.allBattleMembers().length; ++i) {
      var battler = this.allBattleMembers()[i];
      if (!battler) continue;
      if (!this.isBattlerATBCharged(battler)) continue;
      if (!fastest) {
        fastest = battler;
      } else if (battler.atbCharge() > fastest.atbCharge()) {
        fastest = battler;
      }
    }
    return fastest;
};

BattleManager.isBattlerATBCharged = function(battler) {
    if (!battler.isATBCharging()) return false;
    if (battler.atbChargeRate() < 1) return false;
    if (battler.isConfused()) {
      battler.makeActions();
      if (battler.isActor()) battler.makeConfusionActions();
    }
    return battler.currentAction() && battler.currentAction().item();
};

BattleManager.getReadyATBBattler = function() {
    var fastest = false;
    for (var i = 0; i < this.allBattleMembers().length; ++i) {
      var battler = this.allBattleMembers()[i];
      if (!battler) continue;
      if (!this.isBattlerATBReady(battler)) continue;
      if (!fastest) {
        fastest = battler;
      } else if (battler.atbSpeed() > fastest.atbSpeed()) {
        fastest = battler;
      }
    }
    return fastest;
};

BattleManager.isBattlerATBReady = function(battler) {
    if (battler.atbRate() < 1) return false;
    if (battler.isATBCharging()) return false;
    if (battler.currentAction() && battler.currentAction().item()) {
      battler.makeActions();
      battler.setupATBCharge();
      return false;
    }
    return true;
};

BattleManager.updateBattlerATB = function(ignore) {
    $gameParty.updateTick();
    $gameTroop.updateTick();
    if (ignore) return;
    if (this._statusWindow) this.statusUpdateATB();
};

BattleManager.setATBPhase = function() {
    this._phase = 'atb';
};

Yanfly.ATB.BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
    if (this.isATB()) {
      this.setATBPhase();
    } else {
      Yanfly.ATB.BattleManager_startInput.call(this);
    }
};

Yanfly.ATB.BattleManager_selectNextCommand = BattleManager.selectNextCommand;
BattleManager.selectNextCommand = function() {
    if (this.isATB()) {
      if (!this.actor()) return this.setATBPhase();
      this.resetNonPartyActorATB();
      this.actor().setupATBCharge();
      this.actor().spriteStepBack();
      this.actor().requestMotionRefresh();
      this._actorIndex = undefined;
      var chargedBattler = this.getChargedATBBattler();
      if (chargedBattler) {
        this.startATBAction(chargedBattler);
      } else {
        this.setATBPhase();
      }
    } else {
      Yanfly.ATB.BattleManager_selectNextCommand.call(this);
    }
};

BattleManager.resetNonPartyActorATB = function() {
    for (var i = 0; i < $gameParty.allMembers().length; ++i) {
      var actor = $gameParty.allMembers()[i];
      if (!actor) continue;
      if ($gameParty.battleMembers().contains(actor)) continue;
      actor.resetAllATB();
    }
};

Yanfly.ATB.BattleManager_selectPreviousCommand =
    BattleManager.selectPreviousCommand;
BattleManager.selectPreviousCommand = function() {
    if (this.isATB()) {
      var actorIndex = this._actorIndex;
      var scene = SceneManager._scene;
      this._bypassAtbEndTurn = true;
      scene.startPartyCommandSelection();
      this._actorIndex = actorIndex;
      BattleManager.actor().setActionState('undecided');
      BattleManager.actor().requestMotionRefresh();
      this._bypassAtbEndTurn = undefined;
    } else {
      Yanfly.ATB.BattleManager_selectPreviousCommand.call(this);
    }
};

Yanfly.ATB.BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    if (this.isATB() && !this.isTurnBased()) return;
    Yanfly.ATB.BattleManager_startTurn.call(this);
};

Yanfly.ATB.BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
BattleManager.updateTurnEnd = function() {
    if (this.isATB()) {
      this.setATBPhase();
    } else {
      Yanfly.ATB.BattleManager_updateTurnEnd.call(this);
    }
};

BattleManager.startATBInput = function(battler) {
    if (battler.isDead()) return;
    battler.onTurnStart();
    battler.makeActions();
    if (battler.isEnemy()) {
      battler.setupATBCharge();
      if (Yanfly.Param.ATBFlashEnemy) battler.requestEffect('whiten');
      var chargedBattler = this.getChargedATBBattler();
      if (chargedBattler) this.startATBAction(chargedBattler);
    } else if (battler.canInput()) {
      this._actorIndex = battler.index();
      this.playATBReadySound();
      battler.setActionState('inputting');
      battler.spriteStepForward();
      this._phase = 'input';
    } else if (battler.isConfused()) {
      battler.makeConfusionActions();
      battler.setupATBCharge();
    } else {
      battler.makeAutoBattleActions();
      battler.setupATBCharge();
    }
};

BattleManager.playATBReadySound = function() {
    AudioManager.playSe(this._atbReadySound);
};

BattleManager.startATBAction = function(battler) {
    this._subject = battler;
    var action = this._subject.currentAction();
    if (action && action.isValid()) {
      this.startAction();
    } else {
      this.endAction();
    }
};

Yanfly.ATB.BattleManager_processForcedAction =
    BattleManager.processForcedAction;
BattleManager.processForcedAction = function() {
    var forced = false;
    if (this._actionForcedBattler && this.isATB()) {
      var action = this._actionForcedBattler.currentAction();
      forced = true;
    }
    Yanfly.ATB.BattleManager_processForcedAction.call(this);
    if (forced) this._subject.setAction(0, action);
};

Yanfly.ATB.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this.isATB()) {
      this.endATBAction();
    } else {
      Yanfly.ATB.BattleManager_endAction.call(this);
    }
};

BattleManager.endATBAction = function() {
    if (Imported.YEP_BattleEngineCore) {
      if (this._processingForcedAction) this._phase = this._preForcePhase;
      this._processingForcedAction = false;
    }
    if (this._subject) this._subject.onAllActionsEnd();
    if (this.updateEventMain()) return;
    this._subject.endTurnAllATB();
    if (this.loadPreForceActionSettings()) return;
    this.updateBattlerATB(true);
    var chargedBattler = this.getChargedATBBattler();
    if (chargedBattler) {
      this.startATBAction(chargedBattler);
    } else {
      this.setATBPhase();
    }
};

Yanfly.ATB.BattleManager_invokeCounterAttack =
    BattleManager.invokeCounterAttack;
BattleManager.invokeCounterAttack = function(subject, target) {
    if (this.isATB()) this._counterAttacking = true;
    Yanfly.ATB.BattleManager_invokeCounterAttack.call(this, subject, target);
    if (this.isATB()) this._counterAttacking = false;
};

BattleManager.isCounterAttacking = function() {
    return this._counterAttacking;
};

BattleManager.statusUpdateATB = function() {
    this._statusWindow.redrawATB();
};

Yanfly.ATB.BattleManager_processEscape = BattleManager.processEscape;
BattleManager.processEscape = function() {
    if (this.isATB()) {
      return this.processEscapeATB();
    } else {
      return Yanfly.ATB.BattleManager_processEscape.call(this);
    }
};

BattleManager.processEscapeATB = function() {
  $gameParty.performEscape();
  SoundManager.playEscape();
  var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
  if (success) {
      $gameParty.removeBattleStates();
      $gameParty.performEscapeSuccess();
      this.displayEscapeSuccessMessage();
      this._escaped = true;
      this.processAbort();
  } else {
      this.actor().spriteStepBack();
      this.actor().clearActions();
      this.displayEscapeFailureMessage();
      this._escapeRatio += this._escapeFailBoost;
      this.startTurn();
      this.processFailEscapeATB();
  }
  return success;
};

BattleManager.processFailEscapeATB = function() {
    var actor = $gameParty.members()[this._actorIndex];
    if (!actor) return;
    actor.resetAllATB();
};

Yanfly.ATB.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  if (this.isATB()) {
    // ATB CHARGE
    if (actionName === 'ATB CHARGE') {
      return this.actionATBCharge(actionArgs);
    }
    // ATB GAUGE
    if (actionName === 'ATB GAUGE') {
      return this.actionATBCharge(actionArgs) && this.actionATBSpeed(actionArgs);
    }
    // ATB INTERRUPT
    if (actionName === 'ATB INTERRUPT') {
      return this.actionATBInterrupt(actionArgs);
    }
    // ATB SPEED
    if (actionName === 'ATB SPEED') {
      return this.actionATBSpeed(actionArgs);
    }
  }
  return Yanfly.ATB.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.actionATBCharge = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    var cmd = actionArgs[1];
    if (cmd.match(/([\+\-]\d+)([%％])/i)) {
      var rate = parseFloat(RegExp.$1 * 0.01);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (!target.isATBCharging()) continue;
        var max = target.atbChargeDenom();
        var value = rate * max + target.atbCharge();
        target.setATBCharge(value);
        target.refresh();
      }
    } else if (cmd.match(/([\+\-]\d+)/i)) {
      var plus = parseInt(RegExp.$1);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (!target.isATBCharging()) continue;
        var value = plus + target.atbCharge();
        target.setATBCharge(value);
        target.refresh();
      }
    } else if (cmd.match(/(\d+)([%％])/i)) {
      var rate = parseFloat(RegExp.$1 * 0.01);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (!target.isATBCharging()) continue;
        var max = target.atbChargeDenom();
        var value = rate * max;
        target.setATBCharge(value);
        target.refresh();
      }
    } else if (cmd.match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (!target.isATBCharging()) continue;
        target.setATBCharge(value);
        target.refresh();
      }
    }
    return true;
};

BattleManager.actionATBInterrupt = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    for (var i = 0; i < targets.length; ++i) {
      var target = targets[i];
      if (!target) continue;
      if (target === this._subject) continue;
      if (!target.isATBCharging()) continue;
      target.processATBInterrupt();
    }
    return true;
};

BattleManager.actionATBSpeed = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    var cmd = actionArgs[1];
    if (cmd.match(/([\+\-]\d+)([%％])/i)) {
      var rate = parseFloat(RegExp.$1 * 0.01);
      var max = this.atbTarget();
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (target.isATBCharging()) continue;
        var value = rate * max + target.atbSpeed();
        target.setATBSpeed(value);
        target.refresh();
      }
    } else if (cmd.match(/([\+\-]\d+)/i)) {
      var plus = parseInt(RegExp.$1);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (target.isATBCharging()) continue;
        var value = plus + target.atbSpeed();
        target.setATBSpeed(value);
        target.refresh();
      }
    } else if (cmd.match(/(\d+)([%％])/i)) {
      var rate = parseFloat(RegExp.$1 * 0.01);
      var max = this.atbTarget();
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (target.isATBCharging()) continue;
        var value = rate * max;
        target.setATBSpeed(value);
        target.refresh();
      }
    } else if (cmd.match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var i = 0; i < targets.length; ++i) {
        var target = targets[i];
        if (!target) continue;
        if (target === this._subject) continue;
        if (target.isATBCharging()) continue;
        target.setATBSpeed(value);
        target.refresh();
      }
    }
    return true;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.ATB.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.ATB.Game_Action_applyItemUserEffect.call(this, target);
    if (BattleManager.isATB() && $gameParty.inBattle()) {
      this.applyItemATBEffect(target);
    }
};

Game_Action.prototype.applyItemATBEffect = function(target) {
  if (!target) return;
  this.applyItemATBSetEffects(target);
  this.applyItemATBAddEffects(target);
  this.applyItemATBEvalEffect(target);
  if (BattleManager.isCounterAttacking()) return;
  this.applyItemATBInterrupt(target);
  this.applyItemATBInterruptEval(target);
};

Game_Action.prototype.applyItemATBSetEffects = function(target) {
  var item = this.item();
  if (!item) return;
  var value = undefined;
  if (target.isATBCharging()) {
    var max = target.atbChargeDenom();
    if (item.setATBChargeFlat !== undefined) {
      value = item.setATBChargeFlat;
    } else if (item.setATBGaugeFlat !== undefined) {
      value = item.setATBGaugeFlat;
    } else if (item.setATBChargeRate !== undefined) {
      value = item.setATBChargeRate * max;
    } else if (item.setATBGaugeRate !== undefined) {
      value = item.setATBGaugeRate * max;
    }
    if (value !== undefined) target.setATBCharge(value);
  } else {
    var max = BattleManager.atbTarget();
    if (item.setATBSpeedFlat !== undefined) {
      value = item.setATBSpeedFlat;
    } else if (item.setATBGaugeFlat !== undefined) {
      value = item.setATBGaugeFlat;
    } else if (item.setATBSpeedRate !== undefined) {
      value = item.setATBSpeedRate * max;
    } else if (item.setATBGaugeRate !== undefined) {
      value = item.setATBGaugeRate * max;
    }
    if (value !== undefined) target.setATBSpeed(value);
  }
  if (value !== undefined && target.isActor()) BattleManager.statusUpdateATB();
};

Game_Action.prototype.applyItemATBAddEffects = function(target) {
    var item = this.item();
    if (!item) return;
    if (target.isATBCharging()) {
      var value = target.atbCharge();
      var max = target.atbChargeDenom();
      value += item.addATBChargeRate * max;
      value += item.addATBGaugeRate * max;
      value += item.addATBChargeFlat;
      value += item.addATBGaugeFlat;
      target.setATBCharge(value);
    } else {
      var value = target.atbSpeed();
      var max = BattleManager.atbTarget()
      value += item.addATBSpeedRate * max;
      value += item.addATBGaugeRate * max;
      value += item.addATBSpeedFlat;
      value += item.addATBGaugeFlat;
      target.setATBSpeed(value);
    }
    if (value !== 0 && target.isActor()) BattleManager.statusUpdateATB();
};

Game_Action.prototype.applyItemATBEvalEffect = function(target) {
    var a = this.subject();
    var user = this.subject();
    var b = target;
    var item = this.item();
    var skill = this.item();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var speed = target.atbSpeed();
    var charge = target.atbCharge();
    if (target.isATBCharging()) {
      var max = target.atbChargeDenom();
    } else {
      var max = BattleManager.atbTarget();
    }
    var code = item.atbEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ATB EVAL ERROR');
    }
    target.setATBSpeed(speed);
    target.setATBCharge(charge);
};

Game_Action.prototype.applyItemATBInterrupt = function(target) {
    var item = this.item();
    if (!item) return;
    if (target === this.subject()) return;
    if (!target.isATBCharging()) return;
    if (item.atbInterruptRate <= 0) return;
    var success = (Math.random() < item.atbInterruptRate);
    if (success) target.processATBInterrupt();
};

Game_Action.prototype.applyItemATBInterruptEval = function(target) {
    var item = this.item();
    if (!item) return;
    if (target === this.subject()) return;
    if (!target.isATBCharging()) return;
    if (item.atbInterruptEval === '') return;
    var interrupt = false;
    var a = this.subject();
    var user = this.subject();
    var b = target;
    var item = this.item();
    var skill = this.item();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var speed = target.atbSpeed();
    var charge = target.atbCharge();
    var code = item.atbInterruptEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ATB INTERRUPT EVAL ERROR');
    }
    if (interrupt) target.processATBInterrupt();
};

Game_Action.prototype.rebalanceATBSpeed = function(target) {
    var speed = this.subject().atbSpeed();
    var offset = 00000000001;
    speed = Math.max(speed + offset, target.atbSpeed() + target.atbCharge());
    this.subject().setATBSpeed(speed);
};

//=============================================================================
// Game_Battlerbase
//=============================================================================

Yanfly.ATB.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    Yanfly.ATB.Game_BattlerBase_refresh.call(this);
    if (BattleManager.isATB() && $gameParty.inBattle()) {
      this._atbTickValue = undefined;
    }
};

Yanfly.ATB.Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    Yanfly.ATB.Game_BattlerBase_die.call(this);
    if (BattleManager.isATB() && $gameParty.inBattle()) this.resetAllATB();
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.onATBStart = function() {
    this._atbSpeed = eval(Yanfly.Param.ATBInitSpeed);
    this._atbSpeed += BattleManager.atbTarget() * this.atbStartRate();
    this._atbSpeed += this.atbStartFlat();
    this._atbCharge = 0;
    this._atbCharging = false;
    this._atbChargeMod = 0;
    this.applyPreemptiveBonusATB();
    this.applySurpriseBonusATB();
    this.refresh();
};

Game_Battler.prototype.applyPreemptiveBonusATB = function() {
    if (!BattleManager._preemptive) return;
    if (!this.isActor()) return;
    var rate = Yanfly.Param.ATBPreEmptive;
    this._atbSpeed += rate * BattleManager.atbTarget();
};

Game_Battler.prototype.applySurpriseBonusATB = function() {
    if (!BattleManager._surprise) return;
    if (!this.isEnemy()) return;
    var rate = Yanfly.Param.ATBSurprise;
    this._atbSpeed += rate * BattleManager.atbTarget();
};

Yanfly.ATB.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    Yanfly.ATB.Game_Battler_onBattleEnd.call(this);
    this._atbSpeed = 0;
    this._atbCharge = 0;
    this._atbCharging = false;
    this._atbChargeMod = 0;
};

Game_Battler.prototype.atbSpeed = function() {
    if (this._atbSpeed === undefined) this.onATBStart();
    return this._atbSpeed;
};

Game_Battler.prototype.atbRate = function() {
    if (this._atbSpeed === undefined) this.onATBStart();
    var rate = this._atbSpeed / BattleManager.atbTarget();
    return rate.clamp(0, 1);
};

Game_Battler.prototype.isATBCharging = function() {
    return this._atbCharging;
};

Game_Battler.prototype.setATBCharging = function(value) {
    this._atbCharging = value;
};

Game_Battler.prototype.atbCharge = function() {
  if (this._atbCharge === undefined) this.onATBStart();
  return this._atbCharge;
};

Game_Battler.prototype.atbChargeDenom = function() {
    var denom = Math.max(1, BattleManager.atbCharge() - this._atbChargeMod);
    return denom;
};

Game_Battler.prototype.atbChargeRate = function() {
    if (this._atbCharge === undefined) this.onATBStart();
    if (!this.isATBCharging()) return 0;
    var rate = this._atbCharge / this.atbChargeDenom();
    return rate.clamp(0, 1);
};

Game_Battler.prototype.setATBSpeed = function(value) {
    this._atbSpeed = Math.max(0, value);
};

Game_Battler.prototype.setATBCharge = function(value) {
    if (this.isATBCharging()) this._atbCharge = Math.max(0, value);
};

Game_Battler.prototype.setupATBCharge = function() {
    if (this._bypassAtbEndTurn) return;
    this.setATBCharging(true);
    if (!this.currentAction()) this.makeActions();
    if (this.currentAction()) {
      var item = this.currentAction().item();
      if (item) {
        this._atbChargeMod = item.speed;
      } else {
        this._atbChargeMod = 0;
      }
    } else {
      this._atbChargeMod = 0;
    }    
    this.setATBCharge(0);
    this.setActionState('waiting');
};

Yanfly.ATB.Game_Battler_updateTick = Game_Battler.prototype.updateTick;
Game_Battler.prototype.updateTick = function() {
    Yanfly.ATB.Game_Battler_updateTick.call(this);
    if (BattleManager.isATB()) this.updateATB();
};

Game_Battler.prototype.updateATB = function() {
    if (this.isDead()) return this.resetAllATB();
    if (!this.canMove()) {
      this.updateATBStates();
      return;
    }
    if (this.isATBCharging()) {
      if (!this.currentAction()) this.resetAllATB();
      if (this.currentAction() && this.currentAction().item() === null) {
        this.resetAllATB();
      }
    }
    if (this.isATBCharging()) {
      var value = this.atbCharge() + this.atbSpeedTick();
      this.setATBCharge(value);
    } else if (this.atbRate() < 1) {
      var value = this.atbSpeed() + this.atbSpeedTick();
      this.setATBSpeed(value);
    }
};

Game_Battler.prototype.updateATBStates = function() {
    if (BattleManager.timeBasedBuffs()) return;
    for (var i = 0; i < this._states.length; ++i) {
      var stateId = this._states[i];
      var state = $dataStates[stateId];
      if (!state) continue;
      if (!this._stateTurns[stateId]) continue;
      if (state.restriction >= 4 && state.autoRemovalTiming !== 0) {
        var value = BattleManager.tickRate() / Yanfly.Param.BECTurnTime;
        this._stateTurns[stateId] -= value;
        if (this._stateTurns[stateId] <= 0) this.removeState(stateId);
      }
    }
};

Game_Battler.prototype.resetAllATB = function() {
    this._atbCharge = 0;
    this._atbChargeMod = 0;
    this._atbCharging = false;
    this._atbSpeed = 0;
    this.clearActions();
};

Game_Battler.prototype.endTurnAllATB = function() {
    this._atbCharge = 0;
    this._atbChargeMod = 0;
    this._atbCharging = false;
    if (this.checkATBEndInstantCast()) return;
    this.setEndActionATBSpeed();
    this.clearActions();
    this.setActionState('undecided');
    if (this.battler()) this.battler().refreshMotion();
    if (BattleManager.isTickBased()) this.onTurnEnd();
};

Game_Battler.prototype.checkATBEndInstantCast = function() {
    if (!Imported.YEP_InstantCast) return false;
    var action = this.currentAction();
    if (!action) return false;
    var item = action.item();
    if (!item) return false;
    if (!this.isInstantCast(item)) return false;
    var length = BattleManager.allBattleMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = BattleManager.allBattleMembers()[i];
      if (!member) continue;
      var max = member.atbSpeed() + member.atbCharge();
      this._atbSpeed = Math.max(this._atbSpeed, max);
    }
    this._atbSpeed = Math.max(this._atbSpeed, BattleManager.atbTarget());
    this._atbSpeed += 0.00000000001;
    return true;
};

Game_Battler.prototype.atbSpeedRate = function() {
    if (!this.canMove()) return 0;
    var base = this.paramBase(6) + this.paramPlus(6);
    if (base >= this.paramMax(6) && this.agi >= this.paramMax(6)) return 1;
    var rate = this.agi / base;
    return rate;
};

Game_Battler.prototype.atbSpeedTick = function() {
    var value = this.atbTickValue();
    if (BattleManager.atbRubberband()) {
      var min = BattleManager.atbMinimumSpeed();
      var max = BattleManager.atbMaximumSpeed();
      value = value.clamp(min, max);
    }
    return value * BattleManager.tickRate();
};

Game_Battler.prototype.atbTickValue = function() {
    if (this._atbTickValue !== undefined) return this._atbTickValue;
    var a = this;
    var user = this;
    var subject = this;
    this._atbTickValue = eval(Yanfly.Param.ATBPerTick);
    return this._atbTickValue;
};

Game_Battler.prototype.setEndActionATBSpeed = function() {
    this._atbSpeed = 0;
    var action = this.currentAction();
    if (!action) return;
    var item = action.item();;
    if (item) {
      if (item.afterATBFlat !== undefined) this.setATBSpeed(item.afterATBFlat);
      if (item.afterATBRate !== undefined) {
        this.setATBSpeed(item.afterATBRate * BattleManager.atbTarget());
      }
    }
    this._atbSpeed += BattleManager.atbTarget() * this.atbTurnRate();
    this._atbSpeed += this.atbTurnFlat();
    if (item) this.afterATBEval(item);
};

Game_Battler.prototype.afterATBEval = function(item) {
    if (!item) return;
    var a = this;
    var user = this;
    var skill = item;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var speed = this._atbSpeed;
    var max = BattleManager.atbTarget();
    eval(item.atbAfterEval);
    this.setATBSpeed(speed);
};

Game_Battler.prototype.processATBInterrupt = function() {
    if (this.currentAction()) {
      var item = this.currentAction().item();
      if (item && item.cannotAtbInterrupt) return;
    }
    this.resetAllATB();
    this.refresh();
};

Game_Battler.prototype.atbStartFlat = function() {
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.atbStartFlat;
    }
    return value;
};

Game_Battler.prototype.atbStartRate = function() {
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.atbStartRate;
    }
    return value;
};

Game_Battler.prototype.atbTurnFlat = function() {
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.atbTurnFlat;
    }
    return value;
};

Game_Battler.prototype.atbTurnRate = function() {
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.atbTurnRate;
    }
    return value;
};

Yanfly.ATB.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    if (BattleManager.isATB()) {
      var confuseCondition = this.isConfused();
    }
    Yanfly.ATB.Game_Battler_removeState.call(this, stateId);
    if (BattleManager.isATB()) {
      if (confuseCondition !== this.isConfused()) this.resetAllATB();
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.atbStartFlat = function() {
    var value = Game_Battler.prototype.atbStartFlat.call(this);
    value += this.actor().atbStartFlat;
    value += this.currentClass().atbStartFlat;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.atbStartFlat) value += equip.atbStartFlat;
    }
    return value;
};

Game_Actor.prototype.atbStartRate = function() {
    var value = Game_Battler.prototype.atbStartRate.call(this);
    value += this.actor().atbStartRate;
    value += this.currentClass().atbStartRate;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.atbStartRate) value += equip.atbStartRate;
    }
    return value;
};

Game_Actor.prototype.atbTurnFlat = function() {
    var value = Game_Battler.prototype.atbTurnFlat.call(this);
    value += this.actor().atbTurnFlat;
    value += this.currentClass().atbTurnFlat;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.atbTurnFlat) value += equip.atbTurnFlat;
    }
    return value;
};

Game_Actor.prototype.atbTurnRate = function() {
    var value = Game_Battler.prototype.atbTurnRate.call(this);
    value += this.actor().atbTurnRate;
    value += this.currentClass().atbTurnRate;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.atbTurnRate) value += equip.atbTurnRate;
    }
    return value;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.atbStartFlat = function() {
    var value = Game_Battler.prototype.atbStartFlat.call(this);
    value += this.enemy().atbStartFlat;
    return value;
};

Game_Enemy.prototype.atbStartRate = function() {
    var value = Game_Battler.prototype.atbStartRate.call(this);
    value += this.enemy().atbStartRate;
    return value;
};

Game_Enemy.prototype.atbTurnFlat = function() {
    var value = Game_Battler.prototype.atbTurnFlat.call(this);
    value += this.enemy().atbTurnFlat;
    return value;
};

Game_Enemy.prototype.atbTurnRate = function() {
    var value = Game_Battler.prototype.atbTurnRate.call(this);
    value += this.enemy().atbTurnRate;
    return value;
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.onATBStart = function() {
    if (!BattleManager.isATB()) return;
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (member) member.onATBStart();
    }
};

Game_Unit.prototype.increaseTurnTimeBasedATB = function() {
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (!member) continue;
      if (member.isDead()) continue;
      if (member.isHidden()) continue;
      if (member.canMove()) continue;
      member.onTurnEnd();
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Yanfly.ATB.Game_Party_performEscape = Game_Party.prototype.performEscape;
Game_Party.prototype.performEscape = function() {
    if (BattleManager.isATB()) return;
    Yanfly.ATB.Game_Party_performEscape.call(this);
};

//=============================================================================
// Game_Troop
//=============================================================================

Yanfly.ATB.Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
    Yanfly.ATB.Game_Troop_increaseTurn.call(this);
    if (BattleManager.isATB() && BattleManager.timeBasedStates()) {
      $gameParty.increaseTurnTimeBasedATB();
      this.increaseTurnTimeBasedATB();
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.atbGaugeStyle = function() {
    return Yanfly.Param.ATBGaugeStyle
};

Window_Base.prototype.atbGaugeColor1 = function(actor) {
    if (actor.atbRate() < 1) {
      if (actor.atbSpeedRate() === 0) {
        return this.textColor(Yanfly.Param.ATBColorStop1);
      } else if (actor.atbSpeedRate() > 1) {
        return this.textColor(Yanfly.Param.ATBColorFast1);
      } else if (actor.atbSpeedRate() < 1) {
        return this.textColor(Yanfly.Param.ATBColorSlow1);
      } else {
        return this.textColor(Yanfly.Param.ATBColorAtb1);
      }
    } else if (actor.atbRate() >= 1 && actor.atbChargeRate() >= 0) {
      return this.textColor(Yanfly.Param.ATBColorFull1);
    } else {
      return this.gaugeBackColor();
    }
};

Window_Base.prototype.atbGaugeColor2 = function(actor) {
    if (actor.atbRate() < 1) {
      if (actor.atbSpeedRate() === 0) {
        return this.textColor(Yanfly.Param.ATBColorStop2);
      } else if (actor.atbSpeedRate() > 1) {
        return this.textColor(Yanfly.Param.ATBColorFast2);
      } else if (actor.atbSpeedRate() < 1) {
        return this.textColor(Yanfly.Param.ATBColorSlow2);
      } else {
        return this.textColor(Yanfly.Param.ATBColorAtb2);
      }
    } else if (actor.atbRate() >= 1 && actor.atbChargeRate() >= 0) {
      return this.textColor(Yanfly.Param.ATBColorFull2);
    } else {
      return this.gaugeBackColor();
    }
};

Window_Base.prototype.drawActorAtbGauge = function(actor, wx, wy, ww) {
    ww = ww || 96;
    if (!actor) return;
    var color1 = this.atbGaugeColor1(actor);
    var color2 = this.atbGaugeColor2(actor);
    if (actor.atbRate() < 1) {
      var rate = actor.atbRate();
    } else if (actor.atbRate() >= 1 && actor.atbChargeRate() >= 0) {
      var rate = 1;
    } else {
      var rate = 0;
    }
    this.drawGauge(wx, wy, ww, rate, color1, color2);
    if (actor.atbChargeRate() > 0) this.drawAtbChargeGauge(actor, wx, wy, ww);
    if (this.atbGaugeStyle() === 2) {
      var text = Yanfly.Param.ATBGaugeText;
      var align =Yanfly.Param.ATBGaugeAlign;
      if (actor.atbRate() >= 1) {
        this.changeTextColor(this.normalColor());
      } else {
        this.changeTextColor(this.systemColor());
      }
      this.drawText(text, wx, wy, ww, align);
      this.resetTextColor();
    }
};

Window_Base.prototype.drawAtbChargeGauge = function(actor, wx, wy, ww) {
    var color1 = this.textColor(Yanfly.Param.ATBColorChar1);
    var color2 = this.textColor(Yanfly.Param.ATBColorChar2);
    var rate = actor.atbChargeRate();
    this.drawGauge(wx, wy, ww * rate, 1, color1, color2);
};

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.ATB.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
    if (this.meetATBConditions(item)) return this.setText(item.atbHelp);
    Yanfly.ATB.Window_Help_setItem.call(this, item);
};

Window_Help.prototype.meetATBConditions = function(item) {
    if (!item) return false;
    if (!BattleManager.isATB()) return false;
    return item.atbHelp !== undefined;
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.redrawATB = function() {
  if (this.isATBGaugeStyle(0)) return;
  var rect;
  for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
    var actor = $gameParty.battleMembers()[i];
    if (this.isATBGaugeStyle(1)) {
      rect = this.basicAreaRect(i);
      this.contents.clearRect(rect.x - 1, rect.y, rect.width + 2, rect.height);
      this.drawBasicArea(rect, actor);
    } else if (this.isATBGaugeStyle(2)) {
      this.redrawATBGaugeRect(i, actor);
    }
  }
};

Window_BattleStatus.prototype.redrawATBGaugeRect = function(index, actor) {
  var rect = this.gaugeAreaRect(index);
  var clrect = this.gaugeAreaRect(index);
  var totalArea = this.gaugeAreaWidth();
  if ($dataSystem.optDisplayTp) {
    var gw = totalArea / 4 - 15;
    clrect.x = rect.x + gw * 3 + 44;
    clrect.y = rect.y;
    clrect.width = gw + 2;
    this.contents.clearRect(clrect.x, clrect.y, clrect.width, clrect.height);
    this.drawActorAtbGauge(actor, rect.x + gw * 3 + 45, rect.y, gw);
  } else {
    totalArea -= 30;
    var hpW = parseInt(totalArea * 108 / 300);
    var otW = parseInt(totalArea * 96 / 300);
    clrect.x = rect.x + hpW + otW + 29;
    clrect.y = rect.y;
    clrect.width = otW + 2;
    this.contents.clearRect(clrect.x, clrect.y, clrect.width, clrect.height);
    this.drawActorAtbGauge(actor, rect.x + hpW + otW + 30, rect.y, otW);
  }
};

Window_BattleStatus.prototype.isATBGaugeStyle = function(type) {
    if (this.atbGaugeStyle() !== type) return false;
    if (!BattleManager.isATB()) return false;
    return (SceneManager._scene instanceof Scene_Battle);
};

Yanfly.ATB.Window_BattleStatus_drawBasicArea =
    Window_BattleStatus.prototype.drawBasicArea;
Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    if (this.isATBGaugeStyle(1)) {
      this.drawActorAtbGauge(actor, rect.x, rect.y, rect.width);
    }
    Yanfly.ATB.Window_BattleStatus_drawBasicArea.call(this, rect, actor);
};

Yanfly.ATB.Window_BattleStatus_drawGaugeAreaWithTp =
    Window_BattleStatus.prototype.drawGaugeAreaWithTp;
Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
  if (this.isATBGaugeStyle(2)) {
    var totalArea = this.gaugeAreaWidth();
    var gw = totalArea / 4 - 15;
    this.drawActorHp(actor, rect.x + 0, rect.y, gw);
    this.drawActorMp(actor, rect.x + gw * 1 + 15, rect.y, gw);
    this.drawActorTp(actor, rect.x + gw * 2 + 30, rect.y, gw);
    this.drawActorAtbGauge(actor, rect.x + gw * 3 + 45, rect.y, gw);
  } else {
    Yanfly.ATB.Window_BattleStatus_drawGaugeAreaWithTp.call(this, rect, actor);
  }
};

Yanfly.ATB.Window_BattleStatus_drawGaugeAreaWOTp =
    Window_BattleStatus.prototype.drawGaugeAreaWithoutTp;
Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
  if (this.isATBGaugeStyle(2)) {
    var totalArea = this.gaugeAreaWidth() - 30;
    var hpW = parseInt(totalArea * 108 / 300);
    var otW = parseInt(totalArea * 96 / 300);
    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
    this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
    this.drawActorAtbGauge(actor, rect.x + hpW + otW + 30, rect.y, otW);
  } else {
    Yanfly.ATB.Window_BattleStatus_drawGaugeAreaWOTp.call(this, rect, actor);
  }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.ATB.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.ATB.Window_Options_addGeneralOptions.call(this);
    if ($gameSystem.getBattleSystem() === 'atb') this.addATBOptions();
};

Window_Options.prototype.addATBOptions = function() {
    var text = Yanfly.Param.ATBOptionSpeedTx;
    this.addCommand(text, 'atbSpeed');
};

Yanfly.ATB.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    if (symbol === 'atbSpeed') {
      return this.getConfigValue('atbSpeed');
    } else {
      return Yanfly.ATB.Window_Options_statusText.call(this, index);
    }
};

Yanfly.ATB.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol === 'atbSpeed') {
      var value = this.getConfigValue(symbol);
      value += 1;
      if (value > 10) value = 1;
      this.changeValue(symbol, value);
    } else {
      Yanfly.ATB.Window_Options_processOk.call(this);
    }
};

Yanfly.ATB.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol === 'atbSpeed') {
      var value = this.getConfigValue(symbol);
      value += 1;
      if (value > 10) value = 1;
      this.changeValue(symbol, value);
    } else {
      Yanfly.ATB.Window_Options_cursorRight.call(this, wrap);
    }
};

Yanfly.ATB.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol === 'atbSpeed') {
      var value = this.getConfigValue(symbol);
      value -= 1;
      if (value < 1) value = 10;
      this.changeValue(symbol, value);
    } else {
      Yanfly.ATB.Window_Options_cursorLeft.call(this, wrap);
    }
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.ATB.Scene_Battle_updateWindowPositions =
    Scene_Battle.prototype.updateWindowPositions;
Scene_Battle.prototype.updateWindowPositions = function() {
    if (BattleManager.isATB() && !this._atbLockStatusWin) {
      this._atbLockStatusWin = eval(Yanfly.Param.ATBLockStatusWin);
    }
    if (BattleManager.isATB() && this._atbLockStatusWin) {
      this.updateWindowPositionsATB();
    } else {
      Yanfly.ATB.Scene_Battle_updateWindowPositions.call(this);
    }
};

Yanfly.ATB.Scene_Battle_isStartActorCommand =
    Scene_Battle.prototype.isStartActorCommand;
Scene_Battle.prototype.isStartActorCommand = function() {
    if (BattleManager.isATB()) return true;
    return Yanfly.ATB.Scene_Battle_isStartActorCommand.call(this);
};

Scene_Battle.prototype.updateWindowPositionsATB = function() {
    var activeWin = null;
    if (this._partyCommandWindow.active) activeWin = this._partyCommandWindow;
    if (this._actorCommandWindow.active) activeWin = this._actorCommandWindow;
    if (activeWin === null) return;
    if (activeWin.x <= Graphics.boxWidth / 2) {
      this._statusWindow.x = Graphics.boxWidth - this._statusWindow.width;
    } else {
      this._statusWindow.x = 0;
    }
};

Yanfly.ATB.Scene_Battle_commandFight = Scene_Battle.prototype.commandFight;
Scene_Battle.prototype.commandFight = function() {
    if (BattleManager.isATB()) {
      this.startActorCommandSelection();
      BattleManager._phase = 'input';
    } else {
      Yanfly.ATB.Scene_Battle_commandFight.call(this);
    }
};

Yanfly.ATB.Scene_Battle_startActorCommandSelection =
    Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    Yanfly.ATB.Scene_Battle_startActorCommandSelection.call(this);
    if (BattleManager.isATB()) {
      BattleManager._bypassAtbEndTurn = true;
      BattleManager.actor().spriteStepForward();
      BattleManager.actor().setActionState('undecided');
      BattleManager.actor().requestMotionRefresh();
      BattleManager.actor().makeActions();
      BattleManager._bypassAtbEndTurn = undefined;
    }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
} else { // Yanfly.BEC.version

var text = '================================================================\n';
text += 'YEP_X_AnimatedSVEnemies requires YEP_BattleEngineCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_BattleEngineCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // Yanfly.BEC.version
}; // YEP_BattleEngineCore
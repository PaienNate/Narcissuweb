//=============================================================================
// Yanfly Engine Plugins - Region Restrictions Extension - Vehicle Restrictions
// YEP_X_VehicleRestrict.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_VehicleRestrict = true;

var Yanfly = Yanfly || {};
Yanfly.VR = Yanfly.VR || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 交通工具限制区域
 * @author Yanfly Engine Plugins
 *
 * @param ---Boat---
 * @default
 *
 * @param Boat Restrict
 * @desc This region ID will restrict boats from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Boat Allow
 * @desc This region ID will always allow boats to pass.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Boat Land
 * @desc This region ID is a place a boat can land. If this is
 * left as only 0, then all regions can be landed on.
 * @default 0
 *
 * @param ---Ship---
 * @default
 *
 * @param Ship Restrict
 * @desc This region ID will restrict ships from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Ship Allow
 * @desc This region ID will always allow ships to pass.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Ship Land
 * @desc This region ID is a place a ship can land. If this is
 * left as only 0, then all regions can be landed on.
 * @default 0
 *
 * @param ---Airship---
 * @default
 *
 * @param Airship Restrict
 * @desc This region ID will restrict airships from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Airship Allow
 * @desc This region ID will always allow airships to pass.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Airship Land
 * @desc This region ID is a place an airship can land. If this is
 * left as only 0, then all regions can be landed on.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件需要YEP_RegionRestrictions，确保这个插件在YEP_RegionRestrictions下面
 *
 * 这个插件拓展了对交通工具的限制。你可以为交通工具设置特定的起落点，
 * 这样你就可以确保船只等可以穿过特定的水域并且停在特定码头。
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 把这些备注放进地图备注栏来自定义专属此地图的交通工具方式
 *
 * Map Noteboxes:
 *
 *   <Boat Restrict Region: x>
 *   <Boat Restrict Region: x, x, x>
 *   <Boat Restrict Region: x to y>
 *   <Ship Restrict Region: x>
 *   <Ship Restrict Region: x, x, x>
 *   <Ship Restrict Region: x to y>
 *   <Airship Restrict Region: x>
 *   <Airship Restrict Region: x, x, x>
 *   <Airship Restrict Region: x to y>
 *   这些备注设置交通工具不能通行的区域
 *   - These notetags will caused the vehicles to be unable to move past
 *   region(s) marked with x (to y) unless the player character is given the
 *   Through ON movement flag. These regions will be combined with the regions
 *   flagged by the plugin parameters.
 *
 *   <Boat Allow Region: x>
 *   <Boat Allow Region: x, x, x>
 *   <Boat Allow Region: x to y>
 *   <Ship Allow Region: x>
 *   <Ship Allow Region: x, x, x>
 *   <Ship Allow Region: x to y>
 *   <Airship Allow Region: x>
 *   <Airship Allow Region: x, x, x>
 *   <Airship Allow Region: x to y>
 *   这些备注设置交通工具可以通行的区域
 *   - These notetags will cause the vehicles to be able to move through these
 *   region(s) marked with x (to y). These regions will be combined with the
 *   regions flagged by the plugin parameters.
 *
 *   <Boat Land Region: x>
 *   <Boat Land Region: x, x, x>
 *   <Boat Land Region: x to y>
 *   <Ship Land Region: x>
 *   <Ship Land Region: x, x, x>
 *   <Ship Land Region: x to y>
 *   <Airship Land Region: x>
 *   <Airship Land Region: x, x, x>
 *   <Airship Land Region: x to y>
 *   这些备注设置交通工具起落的区域
 *   - These notetags will enforce vehicles to only able to land on region(s)
 *   marked by x (to y). They cannot land anywhere else. These regions will be
 *   combined with the regions flagged by the plugin parameters.
 */
//=============================================================================

if (Imported.YEP_RegionRestrictions) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Param = Yanfly.Param || {};

Yanfly.SetupParameters = function() {
  var parameters = PluginManager.parameters('YEP_X_VehicleRestrict');
  Yanfly.Param.VRBoatRestrict = String(parameters['Boat Restrict']);
  Yanfly.Param.VRBoatRestrict = Yanfly.Param.VRBoatRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.VRBoatRestrict.length; ++i) {
    Yanfly.Param.VRBoatRestrict[i] = Number(Yanfly.Param.VRBoatRestrict[i]);
  }
  Yanfly.Param.VRBoatAllow = String(parameters['Boat Allow']);
  Yanfly.Param.VRBoatAllow = Yanfly.Param.VRBoatAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.VRBoatAllow.length; ++i) {
    Yanfly.Param.VRBoatAllow[i] = Number(Yanfly.Param.VRBoatAllow[i]);
  }
  Yanfly.Param.VRBoatLand = String(parameters['Boat Land']);
  Yanfly.Param.VRBoatLand = Yanfly.Param.VRBoatLand.split(' ');
  for (var i = 0; i < Yanfly.Param.VRBoatLand.length; ++i) {
    Yanfly.Param.VRBoatLand[i] = Number(Yanfly.Param.VRBoatLand[i]);
  }
  Yanfly.Param.VRShipRestrict = String(parameters['Ship Restrict']);
  Yanfly.Param.VRShipRestrict = Yanfly.Param.VRShipRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.VRShipRestrict.length; ++i) {
    Yanfly.Param.VRShipRestrict[i] = Number(Yanfly.Param.VRShipRestrict[i]);
  }
  Yanfly.Param.VRShipAllow = String(parameters['Ship Allow']);
  Yanfly.Param.VRShipAllow = Yanfly.Param.VRShipAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.VRShipAllow.length; ++i) {
    Yanfly.Param.VRShipAllow[i] = Number(Yanfly.Param.VRShipAllow[i]);
  }
  Yanfly.Param.VRShipLand = String(parameters['Ship Land']);
  Yanfly.Param.VRShipLand = Yanfly.Param.VRShipLand.split(' ');
  for (var i = 0; i < Yanfly.Param.VRShipLand.length; ++i) {
    Yanfly.Param.VRShipLand[i] = Number(Yanfly.Param.VRShipLand[i]);
  }
  Yanfly.Param.VRAirRestrict = String(parameters['Airship Restrict']);
  Yanfly.Param.VRAirRestrict = Yanfly.Param.VRAirRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.VRAirRestrict.length; ++i) {
    Yanfly.Param.VRAirRestrict[i] = Number(Yanfly.Param.VRAirRestrict[i]);
  }
  Yanfly.Param.VRAirAllow = String(parameters['Airship Allow']);
  Yanfly.Param.VRAirAllow = Yanfly.Param.VRAirAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.VRAirAllow.length; ++i) {
    Yanfly.Param.VRAirAllow[i] = Number(Yanfly.Param.VRAirAllow[i]);
  }
  Yanfly.Param.VRAirLand = String(parameters['Airship Land']);
  Yanfly.Param.VRAirLand = Yanfly.Param.VRAirLand.split(' ');
  for (var i = 0; i < Yanfly.Param.VRAirLand.length; ++i) {
    Yanfly.Param.VRAirLand[i] = Number(Yanfly.Param.VRAirLand[i]);
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

DataManager.processVRNotetags = function() {
  if (!$dataMap) return;

  $dataMap.vehicleRestrictions = {
    boatRestrict:    Yanfly.Param.VRBoatRestrict.slice(),
    shipRestrict:    Yanfly.Param.VRShipRestrict.slice(),
    airshipRestrict: Yanfly.Param.VRAirRestrict.slice(),

    boatAllow:       Yanfly.Param.VRBoatAllow.slice(),
    shipAllow:       Yanfly.Param.VRShipAllow.slice(),
    airshipAllow:    Yanfly.Param.VRAirAllow.slice(),

    boatLand:        Yanfly.Param.VRBoatLand.slice(),
    shipLand:        Yanfly.Param.VRShipLand.slice(),
    airshipLand:     Yanfly.Param.VRAirLand.slice()
  };

  var note1 = /<(.*)[ ](?:RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(.*)[ ](?:RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note3 = /<(.*)[ ](?:ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4 = /<(.*)[ ](?:ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note5 = /<(.*)[ ](?:LAND REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6 = /<(.*)[ ](?:LAND REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var notedata = $dataMap.note.split(/[\r\n]+/);

  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(note1)) {
      var vehicle = String(RegExp.$1).toLowerCase();
      var key = vehicle + 'Restrict';
      if ($dataMap.vehicleRestrictions[key]) {
        array = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
        $dataMap.vehicleRestrictions[key] =
          $dataMap.vehicleRestrictions[key].concat(array);
      }
    } else if (line.match(note2)) {
      var vehicle = String(RegExp.$1).toLowerCase();
      var key = vehicle + 'Restrict';
      if ($dataMap.vehicleRestrictions[key]) {
        var range = Yanfly.Util.getRange(Number(RegExp.$2), Number(RegExp.$3));
        $dataMap.vehicleRestrictions[key] =
          $dataMap.vehicleRestrictions[key].concat(range);
      }
    } else if (line.match(note3)) {
      var vehicle = String(RegExp.$1).toLowerCase();
      var key = vehicle + 'Allow';
      if ($dataMap.vehicleRestrictions[key]) {
        array = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
        $dataMap.vehicleRestrictions[key] =
          $dataMap.vehicleRestrictions[key].concat(array);
      }
    } else if (line.match(note4)) {
      var vehicle = String(RegExp.$1).toLowerCase();
      var key = vehicle + 'Allow';
      if ($dataMap.vehicleRestrictions[key]) {
        var range = Yanfly.Util.getRange(Number(RegExp.$2), Number(RegExp.$3));
        $dataMap.vehicleRestrictions[key] =
          $dataMap.vehicleRestrictions[key].concat(range);
      }
    } else if (line.match(note5)) {
      var vehicle = String(RegExp.$1).toLowerCase();
      var key = vehicle + 'Land';
      if ($dataMap.vehicleRestrictions[key]) {
        array = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
        $dataMap.vehicleRestrictions[key] =
          $dataMap.vehicleRestrictions[key].concat(array);
      }
    } else if (line.match(note6)) {
      var vehicle = String(RegExp.$1).toLowerCase();
      var key = vehicle + 'Land';
      if ($dataMap.vehicleRestrictions[key]) {
        var range = Yanfly.Util.getRange(Number(RegExp.$2), Number(RegExp.$3));
        $dataMap.vehicleRestrictions[key] =
          $dataMap.vehicleRestrictions[key].concat(range);
      }
    }
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.VR.Game_Map_isBoatPassable = Game_Map.prototype.isBoatPassable;
Game_Map.prototype.isBoatPassable = function(x, y) {
  if ($gamePlayer.isThrough()) return true;
  if (this.isPassableVehicleRegionForbid(x, y, 'boat')) return false;
  if (this.isPassableVehicleRegionAllow(x, y, 'boat')) return true;
  return Yanfly.VR.Game_Map_isBoatPassable.call(this, x, y);
};

Yanfly.VR.Game_Map_isShipPassable = Game_Map.prototype.isShipPassable;
Game_Map.prototype.isShipPassable = function(x, y) {
  if ($gamePlayer.isThrough()) return true;
  if (this.isPassableVehicleRegionForbid(x, y, 'ship')) return false;
  if (this.isPassableVehicleRegionAllow(x, y, 'ship')) return true;
  return Yanfly.VR.Game_Map_isShipPassable.call(this, x, y);
};

Game_Map.prototype.isAirshipPassable = function(x, y) {
  if (this.isPassableVehicleRegionForbid(x, y, 'airship')) return false;
  if (this.isPassableVehicleRegionAllow(x, y, 'airship')) return true;
  if ($gamePlayer.isThrough()) return true;
  return true;
};

Game_Map.prototype.processVehicleRestrictionNotetags = function() {
  if ($dataMap.vehicleRestrictions === undefined) {
    DataManager.processVRNotetags();
  }
};

Game_Map.prototype.isPassableVehicleRegionForbid = function(x, y, vehicle) {
  var regionId = this.regionId(x, y);
  if (regionId === 0) return false;
  this.processVehicleRestrictionNotetags();
  var regions = [];
  switch (vehicle) {
  case 'boat':
    regions = $dataMap.vehicleRestrictions.boatRestrict || regions;
    break;
  case 'ship':
    regions = $dataMap.vehicleRestrictions.shipRestrict || regions;
    break;
  case 'airship':
    regions = $dataMap.vehicleRestrictions.airshipRestrict || regions;
    break;
  }
  return regions.contains(regionId);
};

Game_Map.prototype.isPassableVehicleRegionAllow = function(x, y, vehicle) {
  var regionId = this.regionId(x, y);
  if (regionId === 0) return false;
  this.processVehicleRestrictionNotetags();
  var regions = [];
  switch (vehicle) {
  case 'boat':
    regions = $dataMap.vehicleRestrictions.boatAllow || regions;
    break;
  case 'ship':
    regions = $dataMap.vehicleRestrictions.shipAllow || regions;
    break;
  case 'airship':
    regions = $dataMap.vehicleRestrictions.airshipAllow || regions;
    break;
  }
  return regions.contains(regionId);
};

Game_Map.prototype.isVehicleRegionLandSpecific = function(vehicle) {
  this.processVehicleRestrictionNotetags();
  var regions = [];
  switch (vehicle) {
  case 'boat':
    regions = $dataMap.vehicleRestrictions.boatLand || regions;
    break;
  case 'ship':
    regions = $dataMap.vehicleRestrictions.shipLand || regions;
    break;
  case 'airship':
    regions = $dataMap.vehicleRestrictions.airshipLand || regions;
    break;
  }
  if (regions.length <= 0) return false;
  if (regions.length <= 1 && regions[0] === 0) return false;
  return true;
};

Game_Map.prototype.isVehicleRegionLandOk = function(regionId, vehicle) {
  this.processVehicleRestrictionNotetags();
  var regions = [];
  switch (vehicle) {
  case 'boat':
    regions = $dataMap.vehicleRestrictions.boatLand || regions;
    break;
  case 'ship':
    regions = $dataMap.vehicleRestrictions.shipLand || regions;
    break;
  case 'airship':
    regions = $dataMap.vehicleRestrictions.airshipLand || regions;
    break;
  }
  return regions.contains(regionId);
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.VR.Game_CharacterBase_canPass =
  Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function(x, y, d) {
  if (this._vehicleType === 'airship') {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    return $gameMap.isAirshipPassable(x2, y2);
  }
  return Yanfly.VR.Game_CharacterBase_canPass.call(this, x, y, d);
};

//=============================================================================
// Game_Vehicle
//=============================================================================

Yanfly.VR.Game_Vehicle_isMapPassable = Game_Vehicle.prototype.isMapPassable;
Game_Vehicle.prototype.isMapPassable = function(x, y, d) {
  if (this.isAirship()) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    return $gameMap.isAirshipPassable(x2, y2);
  } else {
    return Yanfly.VR.Game_Vehicle_isMapPassable.call(this, x, y, d);
  }
};

Yanfly.VR.Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
Game_Vehicle.prototype.isLandOk = function(x, y, d) {
  var vehicle = this._type;
  if (this.isAirship()) {
    var regionId = $gameMap.regionId(x, y);
  } else {
    var regionId = $gamePlayer.getRegionId(x, y, d);
  }
  if ($gameMap.isVehicleRegionLandSpecific(vehicle)) {
    if (!$gameMap.isVehicleRegionLandOk(regionId, vehicle)) return false;
  }
  return Yanfly.VR.Game_Vehicle_isLandOk.call(this, x, y, d);
};

//=============================================================================
// End of File
//=============================================================================
}; // Imported.YEP_RegionRestrictions
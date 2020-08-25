//=============================================================================
// Fullscreen.js
//=============================================================================
 
/*:
 * @plugindesc Starts the game in fullscreen
 * @author Christian Schicho
 *
 * @help
 */
 
;(function() {
  function extend(obj, name, func) {
    var orig = obj.prototype[name]
    obj.prototype[name] = function() {
      orig.call(this)
      func.call(this)
    }
  }
 
  extend(Scene_Boot, 'start', function() {
  })
  
  
 var _Scene_Base_create = Scene_Base.prototype.create;

    Scene_Base.prototype.create = function() {
        _Scene_Base_create.call(this);
        Graphics.width = 1280;
        Graphics.height = 720;    
        Graphics.boxHeight = 720;
        Graphics.boxWidth = 1280;    
    };
 
})()
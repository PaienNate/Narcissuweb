//=============================================================================
// Yanfly Engine Plugins - Region Events
// YEP_RegionEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RegionEvents = true;

var Yanfly = Yanfly || {};
Yanfly.RCE = Yanfly.RCE || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 事件区域
 * @author Yanfly Engine Plugins
 *
 * @param Region 1
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 2
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 3
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 4
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 5
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 6
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 7
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 8
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 9
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 10
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 11
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 12
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 13
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 14
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 15
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 16
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 17
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 18
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 19
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 20
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 21
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 22
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 23
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 24
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 25
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 26
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 27
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 28
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 29
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 30
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 31
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 32
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 33
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 34
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 35
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 36
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 37
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 38
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 39
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 40
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 41
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 42
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 43
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 44
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 45
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 46
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 47
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 48
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 49
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 50
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 51
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 52
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 53
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 54
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 55
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 56
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 57
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 58
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 59
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 60
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 61
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 62
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 63
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 64
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 65
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 66
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 67
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 68
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 69
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 70
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 71
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 72
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 73
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 74
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 75
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 76
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 77
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 78
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 79
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 80
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 81
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 82
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 83
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 84
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 85
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 86
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 87
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 88
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 89
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 90
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 91
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 92
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 93
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 94
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 95
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 96
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 97
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 98
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 99
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 100
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 101
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 102
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 103
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 104
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 105
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 106
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 107
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 108
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 109
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 110
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 111
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 112
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 113
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 114
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 115
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 116
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 117
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 118
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 119
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 120
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 121
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 122
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 123
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 124
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 125
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 126
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 127
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 128
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 129
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 130
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 131
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 132
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 133
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 134
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 135
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 136
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 137
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 138
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 139
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 140
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 141
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 142
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 143
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 144
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 145
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 146
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 147
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 148
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 149
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 150
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 151
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 152
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 153
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 154
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 155
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 156
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 157
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 158
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 159
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 160
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 161
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 162
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 163
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 164
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 165
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 166
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 167
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 168
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 169
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 170
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 171
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 172
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 173
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 174
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 175
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 176
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 177
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 178
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 179
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 180
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 181
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 182
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 183
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 184
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 185
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 186
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 187
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 188
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 189
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 190
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 191
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 192
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 193
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 194
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 195
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 196
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 197
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 198
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 199
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 200
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 201
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 202
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 203
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 204
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 205
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 206
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 207
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 208
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 209
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 210
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 211
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 212
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 213
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 214
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 215
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 216
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 217
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 218
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 219
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 220
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 221
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 222
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 223
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 224
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 225
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 226
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 227
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 228
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 229
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 230
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 231
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 232
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 233
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 234
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 235
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 236
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 237
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 238
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 239
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 240
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 241
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 242
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 243
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 244
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 245
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 246
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 247
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 248
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 249
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 250
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 251
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 252
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 253
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 254
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 255
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * 这个插件的功能很简单，可以用地图上的Region ID来调用某个公共事件。
 * 下面的配置就不一一翻译了，从Region1到Region255代表了RegionID的256个图块
 * 默认值default为0 代表该regionID没有绑定任何公共事件，如果你想绑定公共事件
 * 就把0改为公共事件的编号
 * 举例：我定义了一个公共事件0005,事件触发效果为屏幕闪烁、玩家队伍HP减少10%
 * 我现在把region1的default值改为5，并在地图上所有沼泽区域覆盖region1图层
 * 那么当角色进入所有沼泽地形时就会触发上述事件，实现地形伤害效果。
 * 这种方法比修改伤害地形类型有效，在于事件可以触发更多连锁效果，比如闪屏、
 * 弹出对话框等
 * 给特殊区域绑定公共事件。走到贴上公共事件的区域就会触发特殊事件
 * 警告：如果你设置了遭遇模式，这不会降低步行遭遇数。这是MV软件检索的。类似
 * 如果你放置了触碰事件，步行遭遇数也不会降低。如果你在事件触发时改变，可以
 * 用上诉脚本命令
 * 
 * 地图上有255个区域可以标记。你可以通过插件绑定事件ID，来让玩家步行此区域触发。
 * 注意如果任何事件通过触碰发动，这将会清除游戏触碰记录
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 以下注释命令用在地图配置界面。
 *
 * Map Notetags:
 *   <Region x Event: y>
 *   自定义region ID为X的图层块，会触发公共事件Y。注意X范围为1-255，Y的范围为
 *   你自定义公共事件的编号。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Fixed a bug that prevented region events from trigger if the mouse button
 * is held down longer than usual.
 *
 * Version 1.01a:
 * - Fixed a bug with region event notetags that stopped working if it was used
 * to teleport onto the same map.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_RegionEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.RCE.RegionEvents = {};
for (Yanfly.i = 1; Yanfly.i <= 255; ++Yanfly.i) {
  Yanfly.line = "Number(Yanfly.Parameters['Region " + Yanfly.i + "'] || 0)";
  Yanfly.RCE.RegionEvents[Yanfly.i] = eval(Yanfly.line);
};

//=============================================================================
// DataManager
//=============================================================================

DataManager.processRECNotetags = function() {
  if (!$dataMap) return;
  if (!$dataMap.note) return;
  var notedata = $dataMap.note.split(/[\r\n]+/);
  $dataMap.regionCommonEvents = {};
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<(?:REGION)[ ](\d+)[ ](?:EVENT):[ ](\d+)>/i)) {
      $dataMap.regionCommonEvents[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
    }
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.RCE.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    if ($dataMap) DataManager.processRECNotetags();
    Yanfly.RCE.Game_Map_setup.call(this, mapId);
};

Game_Map.prototype.isRegionEvent = function(mx, my) {
    return (this.isValid(mx, my) && this.regionEventTag(mx, my));
};

Game_Map.prototype.getUniqueRegionCommonEvent = function(regionId) {
    if ($dataMap.regionCommonEvents === undefined) {
      DataManager.processRECNotetags();
    }
    if ($dataMap.regionCommonEvents && $dataMap.regionCommonEvents[regionId]) {
      return $dataMap.regionCommonEvents[regionId];
    }
    return 0;
};

Game_Map.prototype.regionEventTag = function(mx, my) {
    if (this.regionId(mx, my) <= 0) return false;
    var regionId = this.regionId(mx, my);
    if (this.getUniqueRegionCommonEvent(regionId) > 0) return true;
    return Yanfly.RCE.RegionEvents[regionId] > 0;
};

Game_Map.prototype.moveAfterCommonEvent = function() {
    var interpreter = $gameMap._interpreter;
    if (!interpreter._list) return false;
    if (interpreter.eventId() > 0) return false;
    var list = interpreter._list;
    if ($gameTemp.destinationX() === $gamePlayer.x &&
      $gameTemp.destinationY() === $gamePlayer.y) {
        $gameTemp.clearDestination();
    }
    for (var i = 0; i < list.length; ++i) {
      var code = list[i].code;
      if ([201, 205, 230, 232, 261, 301].contains(code)) return false;
    }
    return true;
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.RCE.Game_Player_checkEventTriggerHere =
    Game_Player.prototype.checkEventTriggerHere;
Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    if (!this.canStartLocalEvents()) return;
    this.processRegionEvent();
    Yanfly.RCE.Game_Player_checkEventTriggerHere.call(this, triggers);
};

Game_Player.prototype.processRegionEvent = function() {
    if (!$gameMap.isRegionEvent(this.x, this.y)) return;
    if (Input.isTriggered('ok')) return;
    var regionId = $gameMap.regionId(this.x, this.y)
    if ($gameMap.getUniqueRegionCommonEvent(regionId) > 0) {
      var commonEventId = $gameMap.getUniqueRegionCommonEvent(regionId);
    } else {
      var commonEventId = Yanfly.RCE.RegionEvents[regionId];
    }
    $gameTemp.reserveCommonEvent(commonEventId);
};

Yanfly.RCE.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if ($gameMessage.isBusy()) {
      return false;
    }
    if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
        return false;
    }
    if (this._vehicleGettingOn || this._vehicleGettingOff) {
        return false;
    }
    if (this.isInVehicle() && !this.vehicle().canMove()) {
        return false;
    }
    if ($gameMap.isEventRunning() && $gameMap.moveAfterCommonEvent()) {
      return true;
    }
    return Yanfly.RCE.Game_Player_canMove.call(this);
};


//=============================================================================
// End of File
//=============================================================================

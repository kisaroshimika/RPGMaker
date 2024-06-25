//=============================================================================
// KisaRo_ForceFaceImage.js
// ----------------------------------------------------------------------------
// (C) 2024 kisaroshimika
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2024/06/17 初版
// ----------------------------------------------------------------------------
// [Ci-en]   : https://ci-en.dlsite.com/creator/22774
// [Twitter]: https://twitter.com/KisaRoshimika
// [GitHub] : https://github.com/kisaroshimika/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 文章表示時に顔画像を強制的に指定するプラグイン
＊ @base PluginCommonBase
 * @author キサロシミカ
 * @url https://github.com/kisaroshimika/RPGMaker
 * @help
 * このプラグインを使用すると、文章表示時に指定した顔画像を強制的に表示します。
 * プラグインコマンドを使用して顔画像を設定およびクリアできます。
 * 
 * @command setFaceImage
 * @text 顔画像を設定
 * @desc 文章表示時に使用する顔画像を設定します
 *
 * @arg fileName
 * @text 顔画像のファイル名
 * @desc 設定する顔画像のファイル名
 * @default Actor1
 *
 * @arg index
 * @text 顔画像のインデックス
 * @desc 設定する顔画像のインデックス
 * @type number
 * @min 0
 * @default 0
 *
 * @command clearFaceImage
 * @text 顔画像の設定をクリア
 * @desc 顔画像の設定をクリアします
 */

(() => {
    'use strict';
    const script = document.currentScript;
    const pluginName = "ForceFaceImage";

    let forcedFaceImage = null;
    let forcedFaceIndex = null;

    PluginManagerEx.registerCommand(script, "setFaceImage", args => {
        forcedFaceImage = String(PluginManagerEx.convertEscapeCharacters(args.fileName));
        forcedFaceIndex = Number(args.index);
    });

    PluginManagerEx.registerCommand(document.currentScript, "clearFaceImage", args => {
        forcedFaceImage = null;
        forcedFaceIndex = null;
    });

    const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        if (!$gameMessage.isBusy()) {
            if (forcedFaceImage !== null && forcedFaceIndex !== null) {
                params[0] = forcedFaceImage;  // 顔画像のファイル名
                params[1] = forcedFaceIndex;  // 顔画像のインデックス
            }
        }
        return _Game_Interpreter_command101.call(this, params);
    };
})();

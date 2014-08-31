// {{{

/*
 * チャット画面かチェック
 */
function isChatPage() {
    var ret = false,
        statusBtn = document.getElementById("_myStatusButton");
    if (!!statusBtn) {
        ret = true;
    }
    return ret;
}

// }}}
// {{{

/*
 * ツールバーのボタン生成
 * {
 *     "id": [id],
 *     "label": [マウスオーバー時のコメント],
 *     "iconCls": [アイコンのクラス]
 * }
 */
function getButtonEl(args){

    // {{{ 初期化

    var el, innerEl;

    // }}}
    // {{{ ボタン生成

    el = document.createElement("li");
    el.setAttribute("role", "button");
    el.className = "_showDescription";
    el.style.display = "inline-block";

    // ボタンによって変える部分
    el.id = args.id;
    el.setAttribute("aria-label", args.label);

    // }}}
    // {{{ ボタンの中身を生成

    innerEl = document.createElement("span");
    innerEl.className = "icoSizeLarge";

    // ボタンによって変える部分
    innerEl.className += " ";
    innerEl.className += args.iconCls;

    // }}}
    // {{{ 中身を入れて、返す

    el.appendChild(innerEl);
    return el;

    // }}}
}

// }}}
// {{{

// チャット画面かチェック
if (isChatPage()) {

    var btn,
        chatToolbarEl = document.getElementById("_chatSendTool");

    // infoタグ生成のボタン
    btn = getButtonEl({
        id: "_infoText",
        label: "メッセージに[info][/info]を追加します",
        iconCls: "icoFontInfo"
    });

    btn.addEventListener('click', function() {
        var el,
            startTag, endTag,
            oldText,
            selectText = "",
            startPoint,
            endPoint,
            newPoint;

        // 挿入するテキスト
        startTag = "[info]";
        endTag = "[/info]";

        // テキストエリア取得
        el = document.getElementById("_chatText"),

        // 元のテキスト
        oldText = el.value;

        // カーソル位置
        startPoint = el.selectionStart;
        endPoint = el.selectionEnd;

        // 新しいカーソル位置
        newPoint = startPoint + startTag.length;

        if (startPoint != endPoint) {
            // 選択中の文字取得
            selectText = oldText.substr(startPoint, endPoint - startPoint);

            newPoint = endPoint + startTag.length + endTag.length;
        }

        // テキストをカーソル位置に入れる
        el.value = oldText.substr(0, startPoint) + startTag + selectText + endTag + oldText.substr(endPoint);

        // カーソル位置の移動
        el.setSelectionRange(newPoint, newPoint);

    }, false);

    chatToolbarEl.appendChild(btn);
}

// }}}
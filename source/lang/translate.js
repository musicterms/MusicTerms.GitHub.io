var language = location.href.split('/')[3];

var languages = {
    'AlphaBrate Music Terminology Library': {
        "zh": "AlphaBrate 音乐术语词典",
    },
    "Looking for a awsome music terms library app? AlphaBrate Music Terminology Library is the best choice. Hosted on GitHub Pages, we have no operating costs that we won't let ads appears in our websites! Enjoy a elegance and simplicity surf experience with innovative design now! Available on musicterms.github.io": {
        "zh": "正在寻找一款很棒的音乐术语词典应用程式？ AlphaBrate 音乐术语词典是最好的选择。因托管在 GitHub Pages 上，我们没有营运成本，所以我们不会让广告出现在我们的网站上。立即享受创新设计带来的优雅简约得体验！可在 https://musicterms.github.io 上找到。"
    },
    "Music Terminology": {
        "zh": "音乐术语"
    },
    "Cancel": {
        "zh": "取消"
    },
    "Yes": {
        "zh": "是"
    },
    "Commonly Used": {
        "zh": "常用"
    },
    "Search": {
        "zh": "搜索"
    },
    "Settings": {
        "zh": "设置"
    },
    "Favorites": {
        "zh": "收藏"
    },
    "Terms": {
        "zh": "术语"
    },
    "Italian": {
        "zh": "意大利语"
    },
    "Criticism": {
        "zh": "评论"
    },
    "Directions": {
        "zh": "指示"
    },
    "Dynamics": {
        "zh": "力度"
    },
    "General Terms / Words": {
        "zh": "常用术语 / 词语"
    },
    "Instruments": {
        "zh": "乐器"
    },
    "Moods / Expressions": {
        "zh": "情绪 / 表情"
    },
    "Patterns": {
        "zh": "模式 / 形态"
    },
    "Roles": {
        "zh": "角色"
    },
    "Staging": {
        "zh": "指挥"
    },
    "Techniques": {
        "zh": "技巧"
    },
    "Tempo": {
        "zh": "速度"
    },
    "Voices": {
        "zh": "人声"
    },
    "Other Languages": {
        "zh": "其他语言"
    },
    "German": {
        "zh": "德语"
    },
    "Enable Cache of Icon": {
        "zh": "启用图标缓存"
    },
    "Enable Cache of Data": {
        "zh": "启用数据缓存"
    },
    "Enable Save of Location": {
        "zh": "启用浏览位置保存"
    },
    "Enable Favorite": {
        "zh": "启用收藏"
    },
    "Your favorites remain": {
        "zh": "您的收藏夾将保持"
    },
    "safe and intact,": {
        "zh": "安全完好，"
    },
    "select 'Reset All'": {
        "zh": "選擇「全部重置」"
    },
    "to delete.": {
        "zh": "即可刪除。"
    },
    "Share This Web App": {
        "zh": "分享此网络应用程序"
    },
    "Add this Web App": {
        "zh": "将此网络应用程序"
    },
    "to Home Screen": {
        "zh": "添加至主屏幕"
    },
    "Some changes may": {
        "zh": "某些更改可能需要"
    },
    "require a refresh.": {
        "zh": "需要刷新应用。"
    },
    "Sources": {
        "zh": "数据来源"
    },
    "Some sources can't be found": {
        "zh": "某些数据来源无法被找到"
    },
    "Reset All": {
        "zh": "全部重置"
    },
    "All of your data": {
        "zh": "您的所有数据"
    },
    "would NOT be saved.": {
        "zh": "将不会被保存。"
    },
    "Are you sure about that?": {
        "zh": "您确定吗？"
    },
    "Details": {
        "zh": "详情"
    },
    "Folders": {
        "zh": "文件夹"
    },
    "No Favorite Items.": {
        "zh": "没有收藏的内容。"
    },
}

// get all elements and replace their text to the corresponding language
function translate() {
    var allElements = document.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
        if (allElements[i].tagName == 'SCRIPT' || allElements[i].tagName == 'STYLE' || allElements[i].tagName == 'NAV') continue;
        var element = allElements[i];
        var html = element.innerHTML;
        var text = element.innerText;
        for (var key in languages) {
            if (text == key) {
                html = html.replaceAll(key, languages[key][language]);
                element.innerHTML = html;
                continue;
            }
        }
    }
    try { turnSwitches(); } catch { }
}

translate();
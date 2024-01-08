var language = location.href.split('/')[3];

document.documentElement.lang = language;

var languages = {
    "AlphaBrate Music Terminology Library": {
        "zh-CN": "AlphaBrate 音乐术语词典",
        "zh": "AlphaBrate 音樂術語辭典"
    },
    "Looking for a awsome music terms library app? AlphaBrate Music Terminology Library is the best choice. Hosted on GitHub Pages, we have no operating costs that we won't let ads appears in our websites! Enjoy a elegance and simplicity surf experience with innovative design now! Available on musicterms.github.io": {
        "zh-CN": "正在寻找一款很棒的音乐术语词典应用程式？ AlphaBrate 音乐术语词典是最好的选择。因托管在 GitHub Pages 上，我们没有营运成本，所以我们不会让广告出现在我们的网站上。立即享受创新设计带来的优雅简约得体验！可在 https://musicterms.github.io 上找到。",
        "zh": "正在尋找一款很棒的音樂術語字典應用程式？ AlphaBrate 音樂術語字典是最好的選擇。 因託管在 GitHub Pages 上，我們沒有營運成本，所以我們不會讓廣告出現在我們的網站上。 立即享受創新設計帶來的優雅簡約體驗！ 可在 https://musicterms.github.io 上找到。"
    },
    "Music Terminology": {
        "zh-CN": "音乐术语",
        "zh": "音樂術語"
    },
    "Cancel": {
        "zh-CN": "取消",
        "zh": "取消"
    },
    "Yes": {
        "zh-CN": "是",
        "zh": "是"
    },
    "Home": {
        "zh-CN": "首页",
        "zh": "首頁"
    },
    "Commonly Used": {
        "zh-CN": "常用",
        "zh": "常用"
    },
    "Search": {
        "zh-CN": "搜索",
        "zh": "搜尋"
    },
    "Settings": {
        "zh-CN": "设置",
        "zh": "設定"
    },
    "Favorites": {
        "zh-CN": "收藏",
        "zh": "收藏"
    },
    "Terms": {
        "zh-CN": "术语",
        "zh": "術語"
    },
    "Italian": {
        "zh-CN": "意大利语",
        "zh": "義大利語"
    },
    "Criticism": {
        "zh-CN": "评论",
        "zh": "評論"
    },
    "Directions": {
        "zh-CN": "指示",
        "zh": "指示"
    },
    "Dynamics": {
        "zh-CN": "力度",
        "zh": "力度"
    },
    "General Terms / Words": {
        "zh-CN": "常用术语 / 词语",
        "zh": "常用術語 / 詞語"
    },
    "Instruments": {
        "zh-CN": "乐器",
        "zh": "樂器"
    },
    "Moods / Expressions": {
        "zh-CN": "情绪 / 表情",
        "zh": "情緒 / 表情"
    },
    "Patterns": {
        "zh-CN": "模式 / 形态",
        "zh": "模式 / 形態"
    },
    "Roles": {
        "zh-CN": "角色",
        "zh": "角色"
    },
    "Staging": {
        "zh-CN": "指挥",
        "zh": "指揮"
    },
    "Techniques": {
        "zh-CN": "技巧",
        "zh": "技巧"
    },
    "Tempo": {
        "zh-CN": "速度",
        "zh": "速度"
    },
    "Voices": {
        "zh-CN": "人声",
        "zh": "人聲"
    },
    "Other Languages": {
        "zh-CN": "其他语言",
        "zh": "其他語言"
    },
    "German": {
        "zh-CN": "德语",
        "zh": "德文"
    },
    "Enable Cache of Icon": {
        "zh-CN": "启用图标缓存",
        "zh": "啟用圖示快取"
    },
    "Enable Cache of Data": {
        "zh-CN": "启用数据缓存",
        "zh": "啟用資料快取"
    },
    "Enable Save of Location": {
        "zh-CN": "启用浏览位置保存",
        "zh": "啟用瀏覽位置儲存"
    },
    "Enable Favorite": {
        "zh-CN": "启用收藏",
        "zh": "啟用收藏"
    },
    "Your favorites remain": {
        "zh-CN": "您的收藏夾将保持",
        "zh": "您的收藏夾將保持"
    },
    "safe and intact,": {
        "zh-CN": "安全完好，",
        "zh": "安全完好，"
    },
    "select 'Reset All'": {
        "zh-CN": "選擇「全部重置」",
        "zh": "選擇“全部重置”"
    },
    "to delete.": {
        "zh-CN": "即可刪除。",
        "zh": "即可刪除。"
    },
    "Share This Web App": {
        "zh-CN": "分享此网络应用程序",
        "zh": "分享此網頁應用程式"
    },
    "Add this Web App": {
        "zh-CN": "将此网络应用程序",
        "zh": "將此網絡應用程式"
    },
    "to Home Screen": {
        "zh-CN": "添加至主屏幕",
        "zh": "新增至主螢幕"
    },
    "Some changes may": {
        "zh-CN": "某些更改可能需要",
        "zh": "某些更改可能需要"
    },
    "require a refresh.": {
        "zh-CN": "刷新应用。",
        "zh": "刷新應用程式。"
    },
    "Sources": {
        "zh-CN": "数据来源",
        "zh": "數據來源"
    },
    "Some sources can't be found": {
        "zh-CN": "某些数据来源无法被找到",
        "zh": "某些資料來源無法被找到"
    },
    "Reset All": {
        "zh-CN": "全部重置",
        "zh": "全部重置"
    },
    "All your data will be deleted.": {
        "zh-CN": "您的所有数据将被删除。",
        "zh": "您的所有資料將被刪除。"
    },
    "Details": {
        "zh-CN": "详情",
        "zh": "詳情"
    },
    "Folders": {
        "zh-CN": "文件夹",
        "zh": "資料夾"
    },
    "No Favorite Items.": {
        "zh-CN": "没有收藏的内容。",
        "zh": "沒有收藏的內容。"
    },
    "Language": {
        "zh-CN": "语言",
        "zh": "語言"
    },
    "ENG": {
        "zh-CN": "简体",
        "zh": "繁體"
    },
    "Change Language": {
        "zh-CN": "更改语言",
        "zh": "更改語言"
    },
    "A refresh is required": {
        "zh-CN": "需要刷新应用",
        "zh": "需要刷新應用"
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
            try {
                if (text.split(' | ')[0] == key) {
                    html = html.replaceAll(key, languages[key][language]);
                    element.innerHTML = html;
                    continue;
                }
            } catch { };
            try {
                if (text.split(' | ')[1] == key) {
                    html = html.replaceAll(key, languages[key][language]);
                    element.innerHTML = html;
                    continue;
                }
            } catch { };
            if (text == key) {
                html = html.replaceAll(key, languages[key][language]);
                element.innerHTML = html;
                continue;
            }
        }
    }
    try { turnSwitches(); } catch { }
}

function getTranslateOf(text, l = language) {
    for (var key in languages) {
        if (text.split(' | ')[0] == key) {
            return languages[key][l];
        }
        if (text.split(' | ')[1] == key) {
            return languages[key][l];
        }
        if (text == key) {
            return languages[key][l];
        }
    }
}

translate();
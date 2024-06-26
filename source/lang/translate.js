var language = location.href.split('/')[3];

if (language == 'app') {
    language = localStorage.language || 'en';
}

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
    "French": {
        "zh-CN": "法语",
        "zh": "法文"
    },
    "Enable Cache of Icon": {
        "zh-CN": "启用图标缓存",
        "zh": "啟用圖示快取"
    },
    "Enable Power Search": {
        "zh-CN": "启用高级搜索",
        "zh": "啟用高级搜尋"
    },
    "Experimental funcitons": {
        "zh-CN": "实验性功能",
        "zh": "實驗性功能"
    },
    "Enable Favorite": {
        "zh-CN": "启用收藏",
        "zh": "啟用收藏"
    },
    "Enable New Look": {
        "zh-CN": "启用新外观",
        "zh": "啟用新外觀"
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
        "zh-CN": "没有收藏的内容",
        "zh": "沒有收藏的內容"
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
    "Report a Bug": {
        "zh-CN": "报告错误",
        "zh": "報告錯誤"
    },
    "You are not synchronized": {
        "zh-CN": "您的数据未被同步",
        "zh": "您的數據未被同步"
    },
    "Sync now?": {
        "zh-CN": "立即同步？",
        "zh": "立即同步？"
    },
    "Short Forms": {
        "zh-CN": "缩写",
        "zh": "縮寫"
    },
    "Symbols": {
        "zh-CN": "符号",
        "zh": "符號"
    },
    "Allow camera access": {
        "zh-CN": "允许相机访问",
        "zh": "允許相機訪問"
    },
    "Text recognition needs access to your camera to work.": {
        "zh-CN": "文字识别需要访问您的相机才能工作。",
        "zh": "文字識別需要訪問您的相機才能工作。"
    },
    "Select Camera": {
        "zh-CN": "选择相机",
        "zh": "選擇相機"
    },
    "We use cookies to enhance your user experience and perform user behavior analytics. By clicking the agree button below, you consent to our cookie policy.": {
        "zh-CN": "我们使用 Cookies 来增强您的用户体验和执行用户行为分析。点击下方的同意按钮，即表示您同意我们的 Cookies 政策。",
        "zh": "我們使用 Cookies 來增強您的使用者體驗和執行使用者行為分析。點擊下方的同意按鈕，即表示您同意我們的 Cookies 政策。"
    },
    "Agree": {
        "zh-CN": "同意",
        "zh": "同意"
    },
    "Decline": {
        "zh-CN": "拒绝",
        "zh": "拒絕"
    },
    "Meaning of _?": {
        "zh-CN": "_? 定义及解释",
        "zh": "_? 定義及解釋"
    },
    "_? - Meaning of _?": {
        "zh-CN": "_? - _? 定义及解释",
        "zh": "_? - _? 定義及解釋"
    },
    "We use cookies to enhance your user experience and perform user behavior analytics. By clicking the agree button below, you consent to ": {
        "zh-CN": "我们使用 Cookies 来增强您的用户体验和执行用户行为分析。点击下方的同意按钮，即表示您同意",
        "zh": "我們使用 Cookies 來增強您的使用者體驗和執行使用者行為分析。點擊下方的同意按鈕，即表示您同意"
    },
    "our cookie policy.": {
        "zh-CN": "我们的 Cookies 政策。",
        "zh": "我們的 Cookies 政策。"
    },
    "Word not found": {
        "zh-CN": "翻遍了，<span class='nowrap'>还是没找到...</span>",
        "zh": "全部找過了，<span class='nowrap'>都沒有...</span>"
    },
    "It seems the word you’re looking for isn’t in our database.": {
        "zh-CN": "看来您要找的词不在我们的数据库中。",
        "zh": "看來您要找的詞不在我們的資料庫中。"
    },
    "Make sure you are from valid ways and you have spelled the word correctly.": {
        "zh-CN": "请确保您从正确的方式进入，且您拼写的词是正确的。",
        "zh": "請確保您从正确的方式进入，且您拼寫的詞是正確的。"
    },
    "Our": {
        "zh-CN": "我们的",
        "zh": "我們的"
    },
    "feature can still help you find what you need, even with typos.": {
        "zh-CN": "功能仍然可以帮助您找到您所需要的，即使有拼写错误。",
        "zh": "功能仍然可以幫助您找到您所需要的，即使有拼寫錯誤。"
    },
    "No ads, totally free. No downloads required.": {
        "zh-CN": "无广告，完全免费。无需下载。",
        "zh": "無廣告，完全免費。無需下載。"
    },
    "Try our": {
        "zh-CN": "立即使用",
        "zh": "立即使用"
    },
    "Web App": {
        "zh-CN": "Music Terms",
        "zh": "Music Terms"
    },
    "now." :{
        "zh-CN": "",
        "zh": ""
    },
    " 定義及解釋": {
        "zh-CN": "",
        "zh": ""
    },
    "Musical Terms": {
        "zh-CN": "音乐术语",
        "zh": "音樂術語"
    },
    "Download Shortcut?": {
        "zh-CN": "请下载到 “捷径”",
        "zh": "請下載到 “捷徑”"
    },
    "To use Music Terms with Siri or other apps, you need to download a shortcut to your Shortcuts app.": {
        "zh-CN": "要使用 Siri 启动本程序或让其他应用程序与 Music Terms 一起使用，您需要将捷径下载到您的 iPhone 上的 “捷径”。",
        "zh": "要使用 Siri 啟動本程序或讓其他應用程式與 Music Terms 一起使用，您需要將捷徑下載到您的 iPhone 上的 “捷徑”。"
    },
    "Enable Fast Loading": {
        "zh-CN": "启用快速加载",
        "zh": "啟用快速加載"
    },
    "New Look": {
        "zh-CN": "实验性外观",
        "zh": "實驗性外觀"
    },
    "Advanced": {
        "zh-CN": "高级",
        "zh": "高級"
    },
}

// get all elements and replace their text to the corresponding language
function translate() {
    // if language is en, return the key
    if (language == 'en') return;
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
<?xml version="1.0" encoding="utf-8"?>
<!-- Created by Leo: http://leoeditor.com/leo_toc.html -->
<leo_file xmlns:leo="http://leoeditor.com/namespaces/leo-python-editor/1.1" >
<leo_header file_format="2"/>
<globals/>
<preferences/>
<find_panel_settings/>
<vnodes>
<v t="yen.20200712125632.1"><vh>Settings</vh>
<v t="yen.20200712125649.1"><vh>@data qt-gui-plugin-style-sheet</vh></v>
<v t="yen.20200712125710.1"><vh>@string initial_split_orientation = horizontal</vh></v>
</v>
<v t="yen.20200712124815.1"><vh>About robojs</vh></v>
<v t="yen.20200712115223.1"><vh>@path css</vh>
<v t="yen.20200712115234.1"><vh>@edit main.css</vh></v>
</v>
<v t="yen.20200712115420.1"><vh>@path js</vh>
<v t="yen.20200712115535.1"><vh>@edit main.js</vh></v>
<v t="yen.20200712122137.1"><vh>@edit robotBase.js</vh></v>
<v t="yen.20200712115425.1"><vh>@edit utils.js</vh></v>
<v t="yen.20200712115455.1"><vh>@edit robotHandler.js</vh></v>
<v t="yen.20200712115512.1"><vh>@edit duel.js</vh></v>
<v t="yen.20200712122323.1"><vh>@edit runner.js</vh></v>
</v>
<v t="yen.20200712114542.2"><vh>@edit index.html</vh></v>
<v t="yen.20200712114648.1"><vh>@edit runner.html</vh></v>
<v t="yen.20200712114701.1"><vh>@edit bots.js</vh></v>
<v t="yen.20200712114721.1"><vh>@path bots</vh>
<v t="yen.20200712114916.1"><vh>@path template</vh>
<v t="yen.20200712114926.1"><vh>@edit main.js</vh></v>
</v>
<v t="yen.20200712114742.1"><vh>@path spinbot</vh>
<v t="yen.20200712114759.1"><vh>@edit main.js</vh></v>
</v>
<v t="yen.20200712114828.1"><vh>@path boxer</vh>
<v t="yen.20200712114846.1"><vh>@edit main.js</vh></v>
</v>
<v t="yen.20200712114949.1"><vh>@path sittingduck</vh>
<v t="yen.20200712115004.1"><vh>@edit main.js</vh></v>
</v>
<v t="yen.20200712115015.1"><vh>@path testbot</vh>
<v t="yen.20200712115043.1"><vh>@edit main.js</vh></v>
</v>
<v t="yen.20200712115022.1"><vh>@path testbot2</vh>
<v t="yen.20200712115116.1"><vh>@edit main.js</vh></v>
</v>
<v t="yen.20200712115030.1"><vh>@path tracker</vh>
<v t="yen.20200712115132.1"><vh>@edit main.js</vh></v>
</v>
<v t="yen.20200712115036.1"><vh>@path walls</vh>
<v t="yen.20200712115145.1"><vh>@edit main.js</vh></v>
</v>
</v>
</vnodes>
<tnodes>
<t tx="yen.20200712114721.1"></t>
<t tx="yen.20200712114742.1"></t>
<t tx="yen.20200712114828.1"></t>
<t tx="yen.20200712114916.1"></t>
<t tx="yen.20200712114949.1"></t>
<t tx="yen.20200712115015.1"></t>
<t tx="yen.20200712115022.1"></t>
<t tx="yen.20200712115030.1"></t>
<t tx="yen.20200712115036.1"></t>
<t tx="yen.20200712115223.1"></t>
<t tx="yen.20200712115420.1"></t>
<t tx="yen.20200712124815.1">在 index.html 中導入

      &lt;script src="js/utils.js"&gt;&lt;/script&gt;
      &lt;script src="js/robotHandler.js"&gt;&lt;/script&gt;
      &lt;script src="js/duel.js"&gt;&lt;/script&gt;
      &lt;script src="js/main.js"&gt;&lt;/script&gt;
      
然後再根據 url 中的 bot1, bot2, rounds 與 speed 等變數值進行對戰, 假如能夠將此前端所得變數資料, 透過 ajax 儲存至遠端資料庫, 並且設法結合

Brython 以 Python 建立 robot, 以及利用

Dart 轉 Javascript 的方式, 以 Dart 程式甚至透過手機 Flutter 建立網際或手機前端介面, 將可同時教導並練習

Javascript, Python, Dart 等三種程式語言, 當然, 假如能夠再利用網際資料通訊的方式, 讓 ANSI C 與 Lua (或 Fegarri Web Lua) 編寫的 robot 程式可以透過 zeroQ 或封包通訊的方式在網際與 websocket 結合對戰, 將可完成一個全面整合

C

Lua

Javascript

Python

Dart

的整合程式開發訓練平台.

或許之後也可以透過 https://cs.stanford.edu/people/karpathy/convnetjs/ 建立以 deep learning 或 reinforcement learning 為基礎的網際程式機器學習元件ㄡ</t>
<t tx="yen.20200712125632.1"></t>
<t tx="yen.20200712125649.1">QSplitter::handle {
    background-color: #CAE1FF; /* lightSteelBlue1 */
}

QStackedWidget {
    /* background-color:lightpink; */
    border-color: red;
    padding: 0px;
    /* border-width: 0px; */
    /* background-color: yellow; */
}

QSplitter {
    border-color: white;
    background-color: white;
    border-style: solid;
}

QTreeWidget {
    /* These apply to the selected item, but not to editing items.*/
    background-color: #ffffec; /* Leo's traditional tree color */
    selection-color: black; /* was white */
    selection-background-color: lightgrey;
    /* font-family: SansSerif; */
    /*font-family: DejaVu Sans Mono;*/
    font-family:YaHei Mono;
    /* 標題字型大小設定 */
    font-size: 22px;
    font-weight: normal; /* normal,bold,100,..,900 */
    font-style: normal; /* normal, italic,oblique */
 }

/* Headline edit widgets */
QTreeWidget QLineEdit {
    background-color: cornsilk;
    selection-color: white;
    selection-background-color: blue;
    /*font-family: DejaVu Sans Mono;*/    
    font-family:YaHei Mono;
    /* 沒有特別對應字型大小 */
    font-size: 22px;
    font-weight: normal; /* normal,bold,100,..,900 */
    font-style: normal; /* normal, italic,oblique */
}

/* The log panes */
QTextEdit {
    background-color: #f2fdff;
    selection-color: red;
    selection-background-color: blue;
    /* font-family: Courier New; */
    font-family:YaHei Mono;
    /* log font 大小 */
    font-size: 22px;
    font-weight: normal; /* normal,bold,100,..,900 */
    font-style: normal; /* normal, italic,oblique */
}

/* The body pane */
QTextEdit#richTextEdit {
    background-color: #fdf5f5; /* A kind of pink. */
    selection-color: white;
    selection-background-color: red;
    /*font-family: DejaVu Sans Mono;*/
    /* font-family: Courier New; */
    font-family:YaHei Mono;
    /* 內文字型大小 */
    font-size: 22px;
    font-weight: normal; /* normal,bold,100,..,900 */
    font-style: normal; /* normal,italic,oblique */
}

QLabel {
    font-family:YaHei Mono;
    /* 下方的 Minibuffer 標題字型大小 */
    font-size: 22px;
    font-weight: normal; /* normal,bold,100,..,900 */
    font-style: normal; /* normal,italic,oblique */
}

/* Editor labels */
QLineEdit#editorLabel {
    background-color: #ffffec;
    font-family:YaHei Mono;
    /* 沒有直接對應字型大小 */
    font-size: 22px;
    font-weight: normal; /* normal,bold,100,..,900 */
    font-style: normal; /* normal,italic,oblique */
    border: 2px;
    margin: 2px;
}</t>
<t tx="yen.20200712125710.1">horizontal: body pane to the left
vertical: body pane on the botton</t>
</tnodes>
</leo_file>

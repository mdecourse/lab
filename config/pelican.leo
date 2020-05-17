<?xml version="1.0" encoding="utf-8"?>
<!-- Created by Leo: http://leoeditor.com/leo_toc.html -->
<leo_file xmlns:leo="http://leoeditor.com/namespaces/leo-python-editor/1.1" >
<leo_header file_format="2"/>
<globals/>
<preferences/>
<find_panel_settings/>
<vnodes>
<v t="yen.20170108171605.1"><vh>@settings</vh>
<v t="yen.20170108171605.2"><vh>@data qt-gui-plugin-style-sheet</vh></v>
<v t="yen.20170108171605.3"><vh>@string initial_split_orientation = horizontal</vh></v>
</v>
<v t="yen.20200517131340.1"><vh>About blogger</vh>
<v t="yen.20200517142620.1"><vh>blog management process</vh></v>
<v t="yen.20200517131657.1"><vh>python ref</vh></v>
<v t="yen.20200517195613.1"><vh>wordpress ref</vh>
<v t="yen.20200517200253.1"><vh>new post</vh></v>
<v t="yen.20200517200409.1"><vh>edit post</vh></v>
<v t="yen.20200517200437.1"><vh>get post </vh></v>
</v>
<v t="yen.20200517132439.1"><vh>@path ./../downloads/</vh>
<v t="yen.20200517131915.1"><vh>@edit blogger_api_add_1.py</vh></v>
<v t="yen.20200517194513.1"><vh>googleapiclient.sample_tools.init</vh></v>
<v t="yen.20200517195040.1"><vh>@edit blogger_api_add_2.py</vh></v>
</v>
</v>
<v t="yen.20170108171733.1"><vh>@path ../</vh>
<v t="leo.20180115150519.1"><vh>@edit index.html</vh></v>
<v t="yen.20170108171733.3"><vh>@edit README.md</vh></v>
<v t="yen.20170108171733.4"><vh>@edit .gitignore</vh></v>
<v t="leo.20170908162839.1"><vh>沒有 disqus 論壇</vh>
<v t="yen.20170108171733.2"><vh>@button local-blog</vh></v>
</v>
<v t="leo.20170908162904.1"><vh>有 disqus 論壇</vh>
<v t="leo.20170709224430.1"><vh>@button github-blog</vh></v>
</v>
<v t="yen.20170108171733.5"><vh>Pelican 設定</vh>
<v t="leo.20170709020600.1"><vh>共用</vh></v>
<v t="yen.20170108171733.7"><vh>@edit pelicanconf.py</vh></v>
<v t="leo.20170709015947.1"><vh>遠端</vh></v>
<v t="leo.20170709015955.1"><vh>@edit publishconf.py</vh></v>
<v t="leo.20170709015940.1"><vh>近端</vh></v>
<v t="yen.20170108171733.6"><vh>@edit local_publishconf.py</vh></v>
</v>
<v t="yen.20170224232341.1"><vh>編輯 template</vh>
<v t="leo.20180115093448.1"><vh>@path theme/attila/templates</vh>
<v t="leo.20180715212936.1"><vh>@edit article.html</vh></v>
<v t="leo.20180115093536.1"><vh>@edit base.html</vh></v>
<v t="leo.20180115093657.1"><vh>@edit search.html</vh></v>
<v t="leo.20180115093715.1"><vh>@edit archives.html</vh></v>
<v t="leo.20180715212745.1"><vh>@edit categories.html</vh></v>
<v t="leo.20180715212902.1"><vh>@edit index.html</vh></v>
<v t="leo.20180115093726.1"><vh>@path partials</vh>
<v t="leo.20180115093749.1"><vh>@edit navigation.html</vh></v>
</v>
<v t="leo.20180115142025.1"><vh>保留之前舊的設定檔案</vh></v>
</v>
</v>
<v t="leo.20170710015511.1"><vh>編輯 plugin</vh>
<v t="leo.20170710015523.1"><vh>@path plugin</vh>
<v t="leo.20170710015523.2"><vh>@path tipue_search</vh>
<v t="leo.20170710015523.3"><vh>@edit tipue_search.py</vh></v>
</v>
</v>
</v>
<v t="yen.20170108171733.71"><vh>@path markdown</vh>
<v t="yen.20170108171733.81"><vh>@path pages</vh>
<v t="yen.20170108171733.82"><vh>@edit pages_1.md</vh></v>
</v>
</v>
<v t="leo.20170710022054.1"><vh>可以另建節點存放 markdown 目錄下的 md 檔案</vh></v>
<v t="leo.20170710022041.1"><vh>@path markdown</vh>
<v t="leo.20180115115910.1"><vh>2020</vh>
<v t="leo.20180423103639.1"><vh>lab.mde.tw</vh>
<v t="leo.20180423103656.1"><vh>@edit 20200509.md</vh></v>
<v t="yen.20200511093106.1"><vh>@edit 20200511.md</vh></v>
<v t="yen.20200512160924.1"><vh>@edit 20200512.md</vh></v>
<v t="yen.20200516092143.1"><vh>@edit 20200516.md</vh></v>
<v t="yen.20200516203207.1"><vh>@edit 20200516-1.md</vh></v>
</v>
</v>
</v>
<v t="yen.20170108171733.83"><vh>產生 .key 與 .crt 指令</vh></v>
</v>
<v t="yen.20170108171930.1"><vh>@button https server</vh></v>
<v t="yen.20170108171939.1"><vh>@button ipv6 https server</vh></v>
</vnodes>
<tnodes>
<t tx="leo.20170709015940.1"></t>
<t tx="leo.20170709015947.1"></t>
<t tx="leo.20170709020600.1"></t>
<t tx="leo.20170709224430.1">@language python
import os

os.system("pelican markdown -o blog -s publishconf.py")
g.es("admin pelican Github 執行完畢")


</t>
<t tx="leo.20170710015511.1"></t>
<t tx="leo.20170710015523.1"></t>
<t tx="leo.20170710015523.2"></t>
<t tx="leo.20170710022041.1"></t>
<t tx="leo.20170710022054.1"></t>
<t tx="leo.20170908162839.1"></t>
<t tx="leo.20170908162904.1"></t>
<t tx="leo.20180115093448.1"></t>
<t tx="leo.20180115093726.1"></t>
<t tx="leo.20180115115910.1"></t>
<t tx="leo.20180115142025.1"></t>
<t tx="leo.20180423103639.1"></t>
<t tx="yen.20170108171605.1"></t>
<t tx="yen.20170108171605.2">QTreeWidget {
    /* These apply to the selected item, but not to editing items.*/
    background-color: #ffffec; /* Leo's traditional tree color */
    selection-color: black; /* was white */
    selection-background-color: lightgrey;
    /* font-family: SansSerif; */
    /*font-family: DejaVu Sans Mono;*/
    font-family:YaHei Mono;
    /* 標題字型大小設定 */
    font-size: 20px;
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
    font-size: 20px;
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
    font-size: 20px;
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
    font-size: 20px;
    font-weight: normal; /* normal,bold,100,..,900 */
    font-style: normal; /* normal,italic,oblique */
}

QLabel {
    font-family:YaHei Mono;'CherryPy', 'pytz', 'mako', 'beautifulsoup4', 'pymysql', 'peewee'
    /* 下方的 Minibuffer 標題字型大小 */
    font-size: 20px;
    font-weight: normal; /* normal,bold,100,..,900 */
    font-style: normal; /* normal,italic,oblique */
}

/* Editor labels */
QLineEdit#editorLabel {
    background-color: #ffffec;
    font-family:YaHei Mono;
    /* 沒有直接對應字型大小 */
    font-size: 20px;
    font-weight: normal; /* normal,bold,100,..,900 */
    font-style: normal; /* normal,italic,oblique */
    border: 2px;
    margin: 2px;
}</t>
<t tx="yen.20170108171605.3">horizontal: body pane to the left
vertical: body pane on the botton</t>
<t tx="yen.20170108171733.1"></t>
<t tx="yen.20170108171733.2">@language python
import os

os.system("pelican markdown -o blog -s local_publishconf.py")
g.es("admin pelican 近端執行完畢")


</t>
<t tx="yen.20170108171733.5"></t>
<t tx="yen.20170108171733.71"></t>
<t tx="yen.20170108171733.81"></t>
<t tx="yen.20170108171733.83">sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt

</t>
<t tx="yen.20170108171930.1">@language python
import os
import subprocess
import threading
import http.server, ssl

def domake():
    # build directory
    os.chdir("./../")
    server_address = ('localhost', 5443)
    httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
    httpd.socket = ssl.wrap_socket(httpd.socket,
                                   server_side=True,
                                   certfile='localhost.crt',
                                   keyfile='localhost.key',
                                   ssl_version=ssl.PROTOCOL_TLSv1)
    print(os.getcwd())
    print("5443 https server started")
    httpd.serve_forever()

# 利用執行緒執行 https 伺服器
make = threading.Thread(target=domake)
make.start()</t>
<t tx="yen.20170108171939.1">@language python
import os
import subprocess
import threading
import socket
import http.server, ssl

class HTTPServerV6(http.server.HTTPServer):
    address_family = socket.AF_INET6
  
def domake():
    # build directory
    os.chdir("./../")
    ipv6_address = '::1'
    server_address = (ipv6_address, 6443)
    #httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
    httpd = HTTPServerV6(server_address, http.server.SimpleHTTPRequestHandler)
    httpd.socket = ssl.wrap_socket(httpd.socket,
                                   server_side=True,
                                   certfile='localhost.crt',
                                   keyfile='localhost.key',
                                   ssl_version=ssl.PROTOCOL_TLSv1)
    print("6443 https server started")
    httpd.serve_forever()

# 利用執行緒執行 https 伺服器
make = threading.Thread(target=domake)
make.start()</t>
<t tx="yen.20170224232341.1"></t>
<t tx="yen.20200517131340.1">try to integrate pelican with blogger
    
需要安裝兩個程式庫
    
    pip install google-api-python-client oauth2client
    
OAuth 2.0 client IDs 程式類別選擇 other
    
使用者完成 client_secrets.json 設定後, 必須將檔案存在倉儲目錄外部

    
</t>
<t tx="yen.20200517131657.1">@language python
'''
可攜程式系統執行前, 必須額外安裝:

pip install google-api-python-client

pip install oauth2client
'''
__author__ = 'mdecourse At gmail.com'

import sys
from oauth2client import client
from googleapiclient import sample_tools

argv = ""
# 認證並建立服務
service, flags = sample_tools.init(
  argv, 'blogger', 'v3', __doc__, "./../../client_secrets.json",
  scope='https://www.googleapis.com/auth/blogger')

try:
    users = service.users()
    # 取得使用者 profile 資料
    user = users.get(userId='self').execute()
    print('網誌名稱: %s' % user['displayName'])
    blogs = service.blogs()
    # 取得使用者所建立網誌名稱
    blogs = blogs.listByUser(userId='self').execute()
    # blog id is now blogs["items"][0]["id"]
    for blog in blogs['items']:
        print(blog['name'], blog['url'])
    posts = service.posts()
    # 新增網誌 post 時, 需要 blog id
    '''
    body = {
    "kind": "blogger#post",
    "id": blogs["items"][0]["id"],
    "title": "透過 Python 程式新增網誌文章",
    "content":"使用 Google Blogger API 可以利用程式新增網誌文章內容",
    "labels": "test"
    }
    insert = posts.insert(blogId=blogs["items"][0]["id"], body=body)
    posts_doc = insert.execute()
    print(posts_doc)
    '''
    # 更新網誌文章時的 body
    body = {
    "kind": "blogger#post",
    "title": "透過 Python 程式修改網誌文章",
    "content":'''使用 Google Blogger API 可以利用程式修改網誌文章內容. http://mde.tw/cd2019
    '''
    }
    # need to save postId to outline head
    update = posts.update(blogId=blogs["items"][0]["id"], postId="1234567", body=body, publish=True)
    update_doc = update.execute()
    print(update_doc)
except(client.AccessTokenRefreshError):
    print("error")</t>
<t tx="yen.20200517132439.1"></t>
<t tx="yen.20200517142620.1">pelican add blog

pelican modify blog

pelican delete blog

blogger add blog

blogger modify blog

blogger delete blog</t>
<t tx="yen.20200517194513.1">https://github.com/googleapis/google-api-python-client/blob/master/googleapiclient/sample_tools.py

def init(
    argv, name, version, doc, filename, scope=None, parents=[], discovery_filename=None
):
  Args:
    argv: list of string, the command-line parameters of the application.
    name: string, name of the API.
    version: string, version of the API.
    doc: string, description of the application. Usually set to __doc__.
    file: string, filename of the application. Usually set to __file__.
    parents: list of argparse.ArgumentParser, additional command-line flags.
    scope: string, The OAuth scope used.
    discovery_filename: string, name of local discovery file (JSON). Use when discovery doc not available via URL.</t>
<t tx="yen.20200517195613.1">http://project.mde.tw/blog/yen-pelican-jing-tai-wang-ye-yu-wordpress-de-zheng-he-fang-an.html

other ref
    http://www.easonhsu.idv.tw/2017/01/use-blogger-python-api-to-publish-from.html</t>
<t tx="yen.20200517200253.1">＃new-to-wp button
#coding: utf-8
import xmlrpc.client
import datetime
import os
 
def get_cat_tag_content(data):
    # 請注意, 因為 data 來自 .md 的 body pan 內容, 第1行為 @language python
    # 用跳行符號分割
    data_list = data.split("\n")
    #第2行為 title
    title= data_list[1]
    #第3行為 category
    category = data_list[2]
    #第4行為 tags
    tags = data_list[3]
    # 有多項資料的 content 型別為數列
    # 再將第7行之後的資料數列串回成以跳行隔開的資料
    content = "\n".join(data_list[6:])
    # 先將截斷摘要與內文的 pelican md 檔按符號, 換成 Wordpress 的 &lt;!---more---&gt;
    content = content.replace('&lt;!-- PELICAN_END_SUMMARY --&gt;', '&lt;!--more--&gt;')
    # 接著若內容有 ~~~python 與 ~~~ 則換成 Wordpress 格式
    content = content.replace('~~~python', '[code lang="python"]')
    content = content.replace('~~~', '[/code]')
    return title, category, tags, content
 
os.environ['TZ'] = 'Asia/Taipei'
 
#################################
filepath = "/your/wordpress/username/and/passwrod.txt"
wordpress = "your.wordpress.site.domain"
fo = open(filepath, "r+")
data = []
for line in fo.readlines():
    data.append(line)
fo.close()
 
# 從網誌節點的 parent().h 取得 wp_url
# 從網誌節點的 parent().b 取得帳號與密碼對應的文字檔案路徑
wp_url = "https://"+wordpress+"/xmlrpc.php"
wp_username = data[0]
wp_password = data[1]
#################################
wp_blogid = "0"
 
status_draft = 0
status_published = 1
 
server = xmlrpc.client.ServerProxy(wp_url)
 
# 從目前所在節點的 body pan 中取出類別, tags 以及文章內容
title_str, category_str, tags_str, content = get_cat_tag_content(p.b)
# title 是一個單獨的字串
title = title_str.split(":")[1]
# 指定時間出版
'''
date_created = xmlrpc.client.DateTime(datetime.datetime.strptime("2013-01-01 00:00",
"%Y-%m-%d %H:%M"))
'''
# 以現在時間出版, 考慮與 Server 時間差八個小時 (480 分鐘), 因此要在 8 個小時前發表
date_created = xmlrpc.client.DateTime(datetime.datetime.strptime((datetime.datetime.now()- \
datetime.timedelta(minutes=480)).strftime('%Y-%m-%d %H:%M'),"%Y-%m-%d %H:%M"))
categories = [category_str.split(":")[1]]
# 請注意, 因為 tags 用逗點隔開, 因此必須透過 split() 再分開成為 list 資料
# 先用 : 斷開標投頭的 Tags:, 然後再透過逗點隔開, 將標註轉為數列資料
tags = tags_str.split(":")[1].split(",")
data = {'title': title, 'description': content, 'dateCreated': date_created, 'categories': categories, 'mt_keywords': tags}
 
post_id = server.metaWeblog.newPost(wp_blogid, wp_username, wp_password, data, status_published)
# 利用最後的 child 節點來儲存 post_id
to_save_post_id = p.insertAsLastChild()   
# 改為內文為空的節點, id 直接標在 head 標題 
to_save_post_id.b = ""
to_save_post_id.h = post_id
# 因為新增節點, commander 必須 redraw
c.redraw() 
 
g.es("post_id 為", post_id)
g.es("已經送出資料!")</t>
<t tx="yen.20200517200409.1"># edit-to-wp
#coding: utf-8
import xmlrpc.client
import datetime
import os
 
def get_cat_tag_content(data):
    # 請注意, 因為 data 來自 .md 的 body pan 內容, 第1行為 @language python
    # 用跳行符號分割
    data_list = data.split("\n")
    #第2行為 title
    title= data_list[1]
    #第3行為 category
    category = data_list[2]
    #第4行為 tags
    tags = data_list[3]
    # 有多項資料的 content 型別為數列
    # 再將第7行之後的資料數列串回成以跳行隔開的資料
    content = "\n".join(data_list[6:])
    # 先將截斷摘要與內文的 pelican md 檔按符號, 換成 Wordpress 的 &lt;!---more---&gt;
    content = content.replace('&lt;!-- PELICAN_END_SUMMARY --&gt;', '&lt;!--more--&gt;')
    # 接著若內容有 ~~~python 與 ~~~ 則換成 Wordpress 格式
    content = content.replace('~~~python', '[code lang="python"]')
    content = content.replace('~~~', '[/code]')
    return title, category, tags, content
 
os.environ['TZ'] = 'Asia/Taipei'
 
#################################
filepath = "/your/wordpress/username/and/passwrod.txt"
wordpress = "your.wordpress.site.domain"
fo = open(filepath, "r+")
data = []
for line in fo.readlines():
    data.append(line)
fo.close()
 
wp_url = "https://"+wordpress+"/xmlrpc.php"
wp_username = data[0]
wp_password = data[1]
#################################
wp_blogid = "0"
 
status_draft = 0
status_published = 1
 
server = xmlrpc.client.ServerProxy(wp_url)
 
# 從目前所在節點的 body pan 中取出類別, tags 以及文章內容
title_str, category_str, tags_str, content = get_cat_tag_content(p.b)
# title 是一個單獨的字串
title = title_str.split(":")[1]
# 指定時間出版
'''
date_created = xmlrpc.client.DateTime(datetime.datetime.strptime("2013-01-01 00:00",
"%Y-%m-%d %H:%M"))
'''
# 以現在時間出版, 考慮與 Server 時間差八個小時 (480 分鐘), 因此要在 8 個小時前發表
date_created = xmlrpc.client.DateTime(datetime.datetime.strptime((datetime.datetime.now()- \
datetime.timedelta(minutes=480)).strftime('%Y-%m-%d %H:%M'),"%Y-%m-%d %H:%M"))
categories = [category_str.split(":")[1]]
# 請注意, 因為 tags 用逗點隔開, 因此必須透過 split() 再分開成為 list 資料
tags = tags_str.split(":")[1].split(",")
data = {'title': title, 'description': content, 'dateCreated': date_created, 'categories': categories, 'mt_keywords': tags}
 
# 設法取得原 post 的 id
origin_post = p.getLastChild()
# 直接從標題取得 post 的 id 號碼
post_id = origin_post.h
status = server.metaWeblog.editPost(post_id, wp_username, wp_password, data, status_published)
 
if status:
    g.es("資料已經更新!")
else:
    g.es("有問題, 資料沒有更新!")</t>
<t tx="yen.20200517200437.1"># get-from-wp
#coding: utf-8
import xmlrpc.client
# 導入 html 模組, 使用 html.unescape 轉換 html 特殊符號
import html
 
#################################
filepath = "/your/wordpress/username/and/passwrod.txt"
wordpress = "your.wordpress.site.domain"
fo = open(filepath, "r+")
data = []
for line in fo.readlines():
    data.append(line)
fo.close()
 
# 從網誌節點的 parent().h 取得 wp_url
# 從網誌節點的 parent().b 取得帳號與密碼對應的文字檔案路徑
wp_url = "https://"+wordpress+"/xmlrpc.php"
wp_username = data[0]
wp_password = data[1]
#################################
 
server = xmlrpc.client.ServerProxy(wp_url)
 
# 設法透過上述網誌網址, 帳號與密碼, 以及文章 id, 取回 categories, tags, 文章標題, 文章內容等資
 
# 從最後的 child 節點來取 post_id
origin_post = p.getLastChild()
post_id = origin_post.h
# 取回與 post_id 對應的網誌文章內容
blog_content = server.metaWeblog.getPost(post_id, wp_username, wp_password)
title = blog_content["title"]
# 這裡要利用 html.unescape 轉回特殊符號
description = html.unescape(blog_content["description"])
mt_text_more = html.unescape(blog_content["mt_text_more"])
if mt_text_more != "":
    post_content = description + "\n&lt;!--more--&gt;\n"+mt_text_more
else:
    post_content = description
# 所取回的 categories 為 list
categories = blog_content["categories"]
# 所取回的 tags 為以逗點隔開的字串
mt_keywords = blog_content["mt_keywords"]
# 取回文章作者
author = blog_content["wp_author_display_name"]
p.h = title
categories_str = ""
for category in categories:
    # 假如不是最後一個
    if category != categories[len(categories)-1]:
        categories_str += category + ", "
    else:
        # 這是最後一個
        categories_str += category
line1 = "@language md\n"
line2 = "Title: " +title + "\n"
line3 = "Category: " + categories_str + "\n"
line4 = "Tags: " + mt_keywords + "\n"
line5 = "Author: " + author + "\n@others\n"
post_content = post_content.replace('&lt;!--more--&gt;', '\n&lt;!-- PELICAN_END_SUMMARY --&gt;\n')
post_content = post_content.replace('[code lang="python"]', '~~~python')
post_content = post_content.replace('[/code]', '~~~')
p.b = line1 + line2 + line3 + line4 + line5 + post_content + "\n"
# 因為節點資料更新, commander 必須 redraw
c.redraw() 
g.es("資料已經取回")</t>
</tnodes>
</leo_file>

var tipuesearch = {"pages":[{"title":"About","text":"mde.tw/lab 網誌","tags":"misc","url":"https://mde.tw/lab/blog/pages/about/"},{"title":"代理主機維護策略","text":"昨天又失去一台 HP 代理主機, 也就是編號 42 的 Squid Proxy Server. 因此目前只剩下 4, 53 與 69 等三台. 雙協定支援代理主機的需求 也許大家會存疑, 機械設計科系為何需要自行安裝維護網路代理主機？假如根據學校多年前回覆, 之所以拆掉校級的代理主機設置, 原因是聯外頻寬已經很足夠, 因此不需要網路代理主機. 但是, 這種假設是, 系上的 IPv4 數量足夠, 而大部分的外部伺服器都已經支援 IPv6, 但是對於平日電腦總數量超過 300 台的機械設計系, 希望上課時讓每一位學員都能將課程資料存取於 Github.com, 這兩個條件都不存在. 因此, 從電腦輔助設計室上課的需求來看, 採用 IPv4 NAT 的模式, 並無足夠的頻寬讓 至少 50 台電腦快速直接對 Github.com 連線, 而如眾所知, Github.com 目前尚不支援 IPv6 網路協定. 因此, 2-3 台能夠同時支援 IPv4 與 IPv6 網路協定的代理主機, 似乎是可行的方案之一. 維護全時運作主機的可能方案 假如以電腦輔助設計室每週 40 堂課計算, 其中只有至多 14 堂課需要使用網路代理主機, 理論上並沒有必要全時讓這些代理主機運作, 而只要維持一台連內 (69), 一台連外 (4), 其餘的 IPv4 伺服器 IP 位址, 可以交由每班中至多 5 個分組的組長, 以虛擬主機 bridged 網路的方式各自管理分組中的代理主機, 其中可能的編號將有 (24, 32, 34, 39, 42）等五台. 其中, 因為在上學期的課程有大一的計算機程式與大二的電腦輔助設計實習課程, 而下學期的課程則有大一的網際內容管理與大二的協同產品設計實習, 正好可以在各課程中安排學長與學弟妹共同維護這五台代理主機的互動傳承內容. Squid 代理主機的安裝 以 Ubuntu 20.04 伺服器主機為例, 安裝 Squid Proxy 伺服器: sudo apt install squid 接下來, 利用 /etc/squid/squid.conf 進行配置: # 定義可以連線電腦網路位置範圍或特定 IP acl cad_lab src 192.130.17.0/24 acl cad_lab src 192.127.237.33 acl cad_lab src 2001:288::/64 # 定義可以連線通過的埠號 acl SSL_ports port 443 acl Safe_ports port 80 # http acl Safe_ports port 88 acl Safe_ports port 89 #acl Safe_ports port 21 # ftp acl SSL_ports port 8843 acl SSL_ports port 5443 acl SSL_ports port 8443 acl Safe_ports port 8443 acl SSL_ports port 9443 acl Safe_ports port 9443 acl SSL_ports port 22 acl Safe_ports port 22 acl Safe_ports port 443 # https acl Safe_ports port 1025-65535 # unregistered ports acl Safe_ports port 280 # http-mgmt acl Safe_ports port 488 # gss-http acl Safe_ports port 591 # filemaker acl Safe_ports port 777 # multiling http acl CONNECT method CONNECT # 除了前面定義的安全埠號外, 一律拒絕連線 # Deny requests to certain unsafe ports http_access deny !Safe_ports # 除了前面定義的安全埠號外, 一律不准連線 # Deny CONNECT to other than secure SSL ports http_access deny CONNECT !SSL_ports # 只允許前面定義的網路 IP 電腦連線, 其餘一律禁止 http_access allow cad_lab http_access deny all # Only allow cachemgr access from localhost http_access allow localhost manager http_access deny manager #http_access allow localnet http_access allow localhost # And finally deny all other access to this proxy http_access deny all # Squid normally listens to port 3128 http_port 3128 #cache_dir ufs /var/spool/squid 100 16 256 icp_port 3130 icp_access allow all cache_dir ufs /var/spool/squid 2000 16 256 cache_peer 192.130.17.4 sibling 3128 3130 cache_peer 192.130.17.42 sibling 3128 3130 cache_peer 192.130.17.53 sibling 3128 3130 # # Add any of your own refresh_pattern entries above these. # refresh_pattern &#94;ftp: 1440 20% 10080 refresh_pattern &#94;gopher: 1440 0% 1440 refresh_pattern -i (/cgi-bin/|\\?) 0 0% 0 refresh_pattern (Release|Packages(.gz)*)$ 0 20% 2880 refresh_pattern . 0 20% 4320 max_filedesc 40960 cache_mem 4000 MB 修改 /etc/squid/squid.conf 後, 以: sudo systemctl restart squid 重新啟動. 假如要讓 Virtualbox 虛擬主機與 Windows 10 host 啟動開啟虛擬代理主機, 可以設定使用 VBoxVmService , 但是 5.X 的 Virtualbox 必須與 VBoxVmService 5.X 版配合, 而 6.X 的版本也必須互動升級配置. 後記: 42 是一台 HP ML 30 gen9 的機器, 2017 安裝的 Ubuntu 在前幾天停止運作後, 直接將 Host 裝上 Win 10, 因無法從 USB 安裝, 只能用 blueray dvd 重新安裝, 然後外部設為 39, 然後將虛擬 proxy 伺服器設為 42, 目前仍然加入服役中.","tags":"Network","url":"https://mde.tw/lab/blog/stratege-for-proxy-servers.html"},{"title":"高風險聯網設備","text":"前幾天, 感謝校方送來一份通知, 列出系上共有 40 多台所謂的高風險聯網設備. 其中有 8 台 Linux 代理主機必須配合更新套件, 並且限定可連線管理的 IP 位址範圍. Ubuntu 伺服器 設計系目前共有三台實體虛擬主機與一台虛擬代理主機, 四台符號名稱伺服器, 以及兩台虛擬的 WWW 伺服器主機. 其中系上的符號名稱伺服器原先安裝 Ubuntu 18.04, 必須升級為 20.04, 四台符號名稱伺服器與 WWW 伺服器則需要限制 ssh 的連線範圍. 針對非開發版本的 Ubuntu 18.04 可以參考 https://www.linuxtechi.com/upgrade-ubuntu-18-04-lts-to-ubuntu-20-04-lts/ 升級為 20.04. 舊版的 nginx, 若要升級為較新版本, 則可參考 https://devopscraft.com/how-to-compile-nginx-from-source-on-ubuntu-20-04/ 自行編譯安裝. ufw 防火牆 以代理主機而言, 除了限制可連線 ssh 的 IP 範圍外, 還需要讓同區段的電腦可以對 3128 埠號連線; sudo -s ufw status ufw allow from your_ipv4_or_ipv6_ip ufw allow from 2001:288::/16 to any port 22 ufw deny 22 ufw allow from 2001:288::/16 to any port 3128 ufw deny 3128 ufw enable 其次, 若要刪除原先 ufw 的設定可以使用 ufw reset, 若要暫時關閉 ufw, 採用 ufw disable. 符號名稱的部分, 需要限制 port 22 連線外, 必須讓所有主機都能對 port 53 連線: sudo -s ufw status ufw allow from your_ipv4_or_ipv6_ip ufw allow from 2001:288::/16 to any port 22 ufw deny 22 ufw allow 53 ufw enable WWW 伺服器若採用 port 80 與 443 配置, 則需要對所有主機開放, port 5443 若執行 Fossil SCM, 也必須開放, 其他也是對 port 22 有連線範圍的限制. sudo -s ufw status ufw allow from your_ipv4_or_ipv6_ip ufw allow from 2001:288::/16 to any port 22 ufw deny 22 ufw allow 80 ufw allow 443 ufw allow 5443 ufw enable 最後, 則是附上 電腦輔助設計室電腦規劃 與 網路安全 參考資料.","tags":"Network","url":"https://mde.tw/lab/blog/high-risk-networking-devices.html"},{"title":"網際內容管理 Ｗ13","text":"之所以在機械設計工程系開設網際內容管理課程, 起源於多年前的所謂製商整合科技教育改進計畫, 當時參與的科系有機械設計系, 自動化工程系, 工業管理系與資訊管理系, 同時開設的課程還有協同產品設計實習, 基因演算與產品生命週期管理. 網際內容管理課程目標 這項計畫與其他所謂的跨領域學程的命運沒有太大的差異, 計畫補助經費結束, 大家各自回巢, 留下一堆陳年資訊系統設備, 還有這門網際內容管理與協同產品設計實習. 網際內容管理課程開設在機械科系的主要任務, 是要鼓勵工程師善用全球資訊網的無遠弗屆, 與其他領域工程師執行協同設計, 自 2012 年起 Onshape 已經成功在曾經開發 Solidworks 的基礎上, 證明瀏覽器, 平板電腦與手機, 都可以是機械設計工程師開發產品的平台, 無需受限於單機安裝, 必須自行看顧版本更新, 徹底脫離沒有產品資料管理系統, 就無法協同進行產品開發的舊時代. 當然, Onshape 雖然定位為電腦輔助機械設計與分析管理平台, 但是真正能夠編寫 Web based 程式前後端, 並且與 Parasolid 核心程式庫進行圖形介面與觸控互動, 絕非出自通常只上過一門 [計算機程式] 課程的機械工程師, 而是來自一群號稱 Full stack web developers 的資訊科系研究工程師. 儘管如此, 對於必須在 Onshape 上利用 Featurescript 進行各種 2D 與 3D 零組件客製設計的機械工程師, 仍需具備一定程度的網際程式能力. 因此, 在四技部的網際內容管理課程, 定位為接續計算機程式課程, 預計培養未來在電腦輔助設計實習與協同產品設計實習等課程, 負責建置實體與虛擬主機, 搭建網際機械設計管理系統的協同人員, 而五專部的網際內容管理課程, 則定位在承接計算機概論課程, 讓高一程度的學員, 能夠了解網際軟硬體的基本架構外, 也能夠利用分散式版次管理建立網站, 管理網誌並利用基本的程式方法, 讓 Google Blogger 與 CMSiMDE 中的 Pelican 網誌內容同步. Leo Editor 要讓兩套架構完全不同的網誌系統內容同步, 可以採取各種程式方法, 這裡是透過 Leo Editor 大綱編輯程式中的節點按鈕與節點編輯特性完成. Leo Editor 允許使用者透過不同的 節點指令 , 進行特定文字檔案的編輯管理, 其中的 clean 節點指令, 最適合用來編輯 Pelican Blog 的 Markdown 文章內容, 因為 clean 允許將一篇文章以從屬架構的節點內容分割, 當使用者利用 button 中的 Python 程式段, 試圖將 Pelican 網誌的文章從 Markdown 格式, 轉為 html 檔案, 並且通過 Google Blogger API 的 credential 認證, 將網誌的 html 格式文章, 轉貼到對應的 Blogger 系統之後, 可以取得該網誌的 id, 並將此 id 儲存在該 Pelican 文章編輯大綱中, clean 節點下層的最末端, 之後的內容改版, 就可以依據此一 Blogger 文章 id, 循相同的授權模式, 將改版內容送至 Google Blogger . 按鈕程式所需模組 為了利用 button 中的 Python 程式將文章發佈至 Google Blogger , 可攜程式系統需要安裝 google-api-python-client 與 oauth2client 模組. pip install google-api-python-client oauth2client 接下來則是取得與所要同步的 Google Blogger 認證檔案.","tags":"WCM","url":"https://mde.tw/lab/blog/wcm-w13-ubuntu-and-blogs.html"},{"title":"同步 Pelican 與 Blogger 網誌內容","text":"在先前的 CMSiMDE 架構中, 曾經設法讓 Pelican 與 Ｗordpress 的內容同步 , 相同的概念, 也可以在 Leo Editor 中, 讓 Pelican 的網誌文章與 Google Blogger 保持同步. 按鈕與節點標題 Leo Editor 中可以設置按鈕執行 Python 程式, 其中搭配節點的標題內容存取, 可以應用在 Pelican 與 Blogger 的網誌內容同步. 由於目前使用的 Pelican, 在 markdown 目錄中編寫 .md 檔案, 然後再設法以 Pelican 指令與設定檔, 將所有的 .md 檔案轉為 blog 目錄中的網誌內容. 其中, 若能將個別的 .md 檔案先轉為 html 後, 再利用 Google Blogger API 的 Python 程式將各網誌 html 檔案送至對應帳號下的 Blogger 網誌系統, 將可以將一份內容分別同步到 Pelican 與 Blogger. 新增 Blogger 文章 add_to_blogger 按鈕程式: from markdown import markdown from oauth2client import client from googleapiclient import sample_tools import os argv = \"\" # 認證並建立服務 # name of the api is \"blogger\", version is \"v3\" # description of the api is __doc__ # file name of the application: location of client_secrets.json service, flags = sample_tools.init( argv, 'blogger', 'v3', __doc__, \"./../../client_secrets.json\", scope='https://www.googleapis.com/auth/blogger') def get_cat_tag_content(data): # 請注意, 因為 data 來自 .md 的檔案 內容, 第1行為 --- # 用跳行符號分割 data_list = data.split(\"\\n\") #第 2 行為 title title= data_list[1] #第 4 行為 category category = data_list[3] #第 5 行為 tags tags = data_list[4] # 有多項資料的 content 型別為數列 # 再將第 9 行之後的資料數列串回成以跳行隔開的資料 content = \"\\n\".join(data_list[8:]) # 先將截斷摘要與內文的 pelican md 檔按符號, 換成 Blogger 的 # 但是只換第一個 content = content.replace(' ', ' ', 1) # 接著若內容有 ~~~python 與 ~~~ 則換成 Wordpress 格式 #content = content.replace('~~~python', '[code lang=\"python\"]') #content = content.replace('~~~', '[/code]') return title, category, tags, content # 從目前所在節點的 body pan 中取出類別, tags 以及文章內容 # p.h 為 @clean filename.md # 因為要使用 @clean 節點掛上為後的 blogger post_id, 因此改為讀 .md 檔案 md_filename = p.h.split(\" \")[1] with open(md_filename, 'r', encoding=\"utf-8\") as content_file: md_content = content_file.read() # title_str, category_str, tags_str, content = get_cat_tag_content(p.b) title_str, category_str, tags_str, content = get_cat_tag_content(md_content) category = category_str.split(\":\")[1] tags = tags_str.split(\":\")[1].split(\",\") tags.append(category) # title 是一個單獨的字串 title = title_str.split(\":\")[1] # 將 markdown 格式 content 轉為 html content = markdown(content) # 以下處理 content 的 <h2>標題 content = content.replace(\"<h2>\", \"<h2><font size='4'>\") content = content.replace(\"</h2>\", \"</font></h2>\") # g.es(content) try: ''' users = service.users() # 取得使用者 profile 資料 user = users.get(userId='self').execute() print('網誌名稱: %s' % user['displayName']) ''' blogs = service.blogs() # 取得使用者所建立網誌名稱 blogs = blogs.listByUser(userId='self').execute() # post_id is now blogs[\"items\"][0][\"id\"] blog_id = blogs[\"items\"][0][\"id\"] #for blog in blogs['items']: #print(blog['name'], blog['url']) posts = service.posts() # 新增網誌 post 時, 需要 post_id body = { \"kind\": \"blogger#post\", \"id\": blog_id, \"title\": title, # 利用 markdown 函式, 將 .md 的內文轉為 html, 作為 Blogger 的文章內容 \"content\": content, \"labels\": tags } insert = posts.insert(blogId=blog_id, body=body) posts_doc = insert.execute() post_id = posts_doc[\"id\"] #print(posts_doc) os.remove(\"blogger.dat\") # 利用最後的 child 節點來儲存 post_id to_save_post_id = p.insertAsLastChild() # 改為內文為空的節點, id 直接標在 head 標題 to_save_post_id.b = \"\" to_save_post_id.h = post_id # 因為新增節點, commander 必須 redraw c.redraw() g.es(\"post_id 為\", post_id) g.es(\"已經將資料送往 Blogger!\") except(client.AccessTokenRefreshError): g.es(\"error\") 編輯 Blogger 文章 edit_to_blogger 按鈕程式: from markdown import markdown from oauth2client import client from googleapiclient import sample_tools import os argv = \"\" # 認證並建立服務 # name of the api is \"blogger\", version is \"v3\" # description of the api is __doc__ # file name of the application: location of client_secrets.json service, flags = sample_tools.init( argv, 'blogger', 'v3', __doc__, \"./../../client_secrets.json\", scope='https://www.googleapis.com/auth/blogger') def get_cat_tag_content(data): # 請注意, 因為 data 來自 .md 的檔案 內容, 第1行為 --- # 用跳行符號分割 data_list = data.split(\"\\n\") #第 2 行為 title title= data_list[1] #第 4 行為 category category = data_list[3] #第 5 行為 tags tags = data_list[4] # 有多項資料的 content 型別為數列 # 再將第 9 行之後的資料數列串回成以跳行隔開的資料 content = \"\\n\".join(data_list[8:]) # 先將截斷摘要與內文的 pelican md 檔按符號, 換成 Blogger 的 content = content.replace(' ', ' ') # 接著若內容有 ~~~python 與 ~~~ 則換成 Wordpress 格式 #content = content.replace('~~~python', '[code lang=\"python\"]') #content = content.replace('~~~', '[/code]') return title, category, tags, content # 從目前所在節點的 body pan 中取出類別, tags 以及文章內容 # p.h 為 @clean filename.md # 因為要使用 @clean 節點掛上為後的 blogger post_id, 因此改為讀 .md 檔案 md_filename = p.h.split(\" \")[1] with open(md_filename, 'r', encoding=\"utf-8\") as content_file: md_content = content_file.read() # title_str, category_str, tags_str, content = get_cat_tag_content(p.b) title_str, category_str, tags_str, content = get_cat_tag_content(md_content) category = category_str.split(\":\")[1] tags = tags_str.split(\":\")[1].split(\",\") tags.append(category) # title 是一個單獨的字串 title = title_str.split(\":\")[1] # 將 markdown 格式 content 轉為 html content = markdown(content) # 以下處理 content 的 <h2>標題 content = content.replace(\"<h2>\", \"<h2><font size='4'>\") content = content.replace(\"</h2>\", \"</font></h2>\") # g.es(content) try: blogs = service.blogs() # 取得使用者所建立網誌名稱 blogs = blogs.listByUser(userId='self').execute() blog_id = blogs[\"items\"][0][\"id\"] # 設法取得原 post 的 id postid_outline = p.getLastChild() # 直接從標題取得 post 的 id 號碼 post_id = postid_outline.h posts = service.posts() # 更新網誌文章時的 body body = { \"kind\": \"blogger#post\", \"title\": title, \"content\": content } # need to save postId to outline head update = posts.update(blogId=blog_id, postId=post_id, body=body, publish=True) update_doc = update.execute() os.remove(\"blogger.dat\") g.es(\"post_id 為\", post_id) g.es(\"已經將更新資料送往 Blogger!\") except(client.AccessTokenRefreshError): g.es(\"error\") 從 Blogger 取回內容 在 Pelican 與 Ｗordpress 的內容同步 中, 可以從 Wordpress 取回網誌內容, 然後新增到 Pelican, 在此因為網誌文章的建立以 CMSiMDE 倉儲中的 Pelican 網誌為主, Blogger 只是附屬備份網誌, 所以就不再從新增的 Google Blogger 取回網誌文章. 參考資料 https://developers.google.com/blogger","tags":"Weblog","url":"https://mde.tw/lab/blog/sync-pelican-and-blogger-content.html"},{"title":"Virtualbox Ubuntu 虛擬主機網路設定","text":"利用 Virtualbox 建立 Ubuntu 20.04 伺服器的虛擬主機, 可以讓使用者透過便捷的網路設定, 了解不同主機連線配置的特性外, 也能同時測試跨操作系統平台套件在 Windows 與 Ubuntu 環境執行的差異. 修課學員只要登入 ＠gm 帳號後, 就可下載 Ubuntu 20.04 虛擬主機 (或下載 Ubuntu 20.04 W12 虛擬主機 ), 並匯入 Windows 10 環境所安裝的 Virtualbox . 接下來就必須了解如何使用虛擬主機的 NAT Network 網路設定. 讓虛擬主機連上廣域網路 能直接讓 Virtualbox 虛擬主機連上網路的設定, 可以選擇 NAT, NAT Network 與 Bridged 等三種設定. 詳細的說明可以參考 Virtualbox Network Setting , Virtualbox 5.1.22 User Manual , Virtualbox 6.1.8 User Manual 中的說明. 假如需要利用 Python 程式透過 COM 操控 Virtualbox 中的虛擬主機, 則可以參考 Virtualbox 5.1.22 Programming Guide 與 Virtualbox 6.1.8 Programming Guide 中的說明. 在目前的網際內容管理與協同產品設計課程應用上, 以 NAT Network 的設置最合需求. 因為 Ubuntu 20.04 虛擬主機可以透過 Windows 10 Host 的 IPv4 或 IPv6 網路設定連外. 同時 Ｗindows 10 上的瀏覽器與 Python 程式可以透過內部網路對虛擬主機連線. 使用 NAT Network 讓虛擬主機上網的另外一個好處是: Host 上 Virtualbox 的網路設定可以動態生效, 亦即 Ubuntu 20.04 可以一直保持在開機狀態, 使用者在 Host 端更動 Virtualbox 的 NAT Network 設定後, 即刻可以在 Ubuntu 虛擬主機上進行配合調適, 無需如 Bridged 或 Host Only 虛擬主機的網路設定, 必須關機後才能修改所使用的網路設定. NAT Network 上的 IPv4 與 IPv6 設定 由於在電腦輔助設計室使用純 IPv6 協定上網, 因此採用 NAT Network 設定的 Virtualbox 虛擬主機, 也必須能夠透過 IPv6 進行設定. NAT Network 的 DHCP 能同時支援 IPv4 與 IPv6, 但是在 GUI 介面只列出 IPv4 的 DHCP 內定使用 10.0.2.0/24 IP 位址, IPv6 的部分則需要透過指令才可列出: C:\\Users\\kmol2019>\"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage\" list natnetworks NetworkName: NatNetwork IP: 10.0.2.1 Network: 10.0.2.0/24 IPv6 Enabled: Yes IPv6 Prefix: fd17:625c:f037:2::/64 DHCP Enabled: Yes Enabled: Yes loopback mappings (ipv4) 127.0.0.1=2 換言之, 在 Virtualbox 採用 NAT Network 設定的虛擬主機, 其 IPv4 gateway 預設為 10.0.2.1, 而 IPv6 的 gateway 則為 fd17:625c:f037:2::1, 了解此一訊息之後, 使用者就可以利用 Ｗindows 10 中的批次檔案 setnatnetwork.bat 來設定後續的網路內容, 主要讓 cd2020pj1 啟動後的 8443 與 7443 埠號伺服器, 能夠從 Host 瀏覽器中連線: \"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage\" natnetwork modify --netname NatNetwork --port-forward-4 \"ssh:tcp:[127.0.0.1]:22:[10.0.2.4]:22\" \"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage\" natnetwork modify --netname NatNetwork --port-forward-4 \"coppeliasim:tcp:[127.0.0.1]:19999:[10.0.2.4]:19999\" \"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage\" natnetwork modify --netname NatNetwork --port-forward-4 \"cmsimde1:tcp:[127.0.0.1]:8443:[10.0.2.4]:8443\" \"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage\" natnetwork modify --netname NatNetwork --port-forward-4 \"cmsimde2:tcp:[127.0.0.1]:7443:[10.0.2.4]:7443\" \"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage\" natnetwork modify --netname NatNetwork --port-forward-6 \"ssh:tcp:[::1]:22:[fd17:625c:f037:2:a00:27ff:fef6:9b8a]:22\" \"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage\" natnetwork modify --netname NatNetwork --port-forward-6 \"cmsimde1:tcp:[::1]:8443:[fd17:625c:f037:2:a00:27ff:fef6:9b8a]:8443\" \"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage\" natnetwork modify --netname NatNetwork --port-forward-6 \"cmsimde2:tcp:[::1]:7443:[fd17:625c:f037:2:a00:27ff:fef6:9b8a]:7443\" 其中 Ubuntu 20.04 虛擬主機的 netplan 網路設定為: network: ethernets: enp0s3: dhcp4: true dhcp6: true nameservers: addresses: - 2001:b000:168::1 version: 2 表示兩種網路協定都採用 DHCP, 但是 IPv6 必須設定 DNS 伺服器, 因為學校 DHCP6 所設定的 DNS 無法正確運作的緣故.","tags":"ubuntu","url":"https://mde.tw/lab/blog/virtualbox-ubuntu-nat-network.html"},{"title":"gitlab 與 github 整合運用","text":"由於 github 遲遲不推出支援 IPv6 網站的連線功能, 目前若要在電腦輔助設計室直接透過純 IPv6 網路連線使用 git 分散式版次管理系統, 可以將 Github Pages 上的 CMSiMDE 網站, 同步一份倉儲資料到 Gitlab Pages . 機械設計工程師的網站 身為使用分散式版次管理系統的機械設計工程師團隊, 除了自行建立的 Linux 伺服器主機之外, Github Pages 是目前用來建立靜態網頁的最佳平台. 但是截至目前只支援 IPv4 網路協定連線的 github , 在上課時僅支援 IPv6 上線的情況下, 造成了許多不便. 因為所有的資料封包都必須透過雙支援的代理主機傳訊. 為了讓使用者可以在純 IPv6 環境下, 將 CMSiMDE 的靜態網頁部署在廣域雲端平台上, 準備將倉儲資料同步一份到 Gitlab Pages . 開放作風的 gitlab github 雖然比 gitlab 早創立幾年, 但是 gitlab 的開源與大器作風, 讓帳面價值達到 76 億美元的 github 失色許多. Github Pages 將用戶設定的靜態網頁資料分支, 以直覺但隱藏流程的方式進行, 導致許多情況下, 用戶無法就網頁資料轉檔流程進行除錯. gitlab-ci.yml 而 Gitlab Pages 則選擇讓使用自行透過 gitlab-ci.yml 的 YAML 檔案, 自行控制網頁的轉檔流程. 以 CMSiMDE 網際內容管理中的靜態網頁而言, 只要在倉儲資料根目錄中, 加入一個 gitlab-ci.yml 檔案, 內容如下: pages: stage: deploy script: - mkdir .public - cp -r * .public - mv .public public artifacts: paths: - public only: - master variables: GIT_SUBMODULE_STRATEGY: recursive 就可以順利將倉儲資料中的主分支靜態網頁, 部署在 https://帳號.gitlab.io/倉儲名稱 網址中. 其中最重要的設定參數: GIT_SUBMODULE_STRATEGY: recursive 就是表明要求 gitlab 在將倉儲轉為網頁的過程, 同時以 recursive 的方式將其中的 submodule 目錄, 也納入網頁的內容. git remote add 針對目前已經部署在 github 的靜態網頁倉儲, 使用者先在主分支的根目錄中, 新增提交推送一個上述的 gitlab-ci.yml 設定檔案, 然後建立與 github 帳號對應的 gitlab 帳號之後, 新增一個與 github 倉儲的同名空專案, 也就是連 README.md 都不建立的 public 空倉儲, 然後在近端倉儲主分支工作目錄中, 以: git remote add gitlab https://gitlab.com/帳號/同名倉儲.git 新增一個網址代號 gitlab, 指到上述 gitlab 系統中的空同名倉儲網址. 接下來就可以透過: git push gitlab 將 github 倉儲中的主分支資料, 同步一份到 gitlab , 並且在 gitlab-ci.yml 的設定導引下, 自動產生相應的 Gitlab Pages 靜態網頁. 而其網址就是: https://帳號.gitlab.io/倉儲名稱 最後, 假如之後的倉儲改版以 gitlab 為主, 只要在近端主分支的工作目錄中, 以: git remote add github https://github.com/帳號/同名倉儲.git 建立一個 github 代號倉儲連結, 就可以透過: git push github 將 github 當作 gitlab 倉儲的備份網站.","tags":"git","url":"https://mde.tw/lab/blog/use-github-and-gitlab-pages.html"},{"title":"打造 Windows 隨身程式系統","text":"在 Windows 操作系統上開發套件, 不僅希望這個套件能夠在 Mac OS X 與 Linux 上運行, 而且整個程式環境都能放入一個 USB 隨身碟, 在任何一台乾淨的 64 位元 Windows 10 操作系統中都能正常運行. 不受限制, 因此需要打造一個隨身程式系統. 啟動批次檔案 從以下這個 start.bat 批次啟動檔案, 大致可以看出此一可攜程式系統所包含的內容: @echo off set Disk=y subst %Disk%: \"data\" %Disk%: set HomePath=%Disk%:\\home_no_proxy set HomeDrive=%Disk%:\\home_no_proxy set Home=%Disk%:\\home_no_proxy set USERPROFILE=%Disk%:\\home_no_proxy REM 將系統 Python 程式的 io 設為 utf-8 set PYTHONIOENCODING=\"utf-8\" set PYTHONPATH=%Disk%:\\Python38\\DLLs;%Disk%:\\Python38\\Lib;%Disk%:\\Python38\\Lib\\site-packages; set PYTHONHOME=%Disk%:\\Python38 REM for Java and Android SDK set java_home=%Disk%:\\java\\jdk8u222-b10 set ANDROID_SDK_home=%Disk%:\\home_no_proxy set GRADLE_USER_home=%Disk%:\\home_no_proxy set ANDROID_SDK_ROOT=%Disk%:\\android\\sdk set ANDROID_Home=%Disk%:\\android\\sdk set REPO_OS_OVERRIDE=windows REM 設定跟 Python 有關的命令搜尋路徑 set path_python=%Disk%:\\Python38;%Disk%:\\Python38\\Scripts; REM 設定跟Git 有關的命令搜尋路徑 set path_git=%Disk%:\\portablegit\\bin; REM 設定 msys2 64 位元的執行路徑 set path_msys2=%Disk%:\\msys64\\mingw64\\bin; REM set for LaTeX set path_miketex=%Disk%:\\miktex-portable\\texmfs\\install\\miktex\\bin\\x64; REM Flutter path set path_flutter=%Disk%:\\flutter\\bin;%java_home%\\bin;%Disk%:\\Android\\sdk;%Disk%:\\Android\\sdk\\tools;%Disk%:\\Android\\sdk\\tools\\bin;%Disk%:\\Android\\sdk\\emulator;%Disk%:\\Android\\sdk\\platform-tools;%Disk%:\\flutter\\bin\\cache\\dart-sdk\\bin;%Disk%:\\vscode; path=%Disk%:;%path_python%;%path_git%;%path_msys2%;%path_miketex%;%path_flutter%;%path%; start /MIN cmd.exe start /MIN cmd.exe start /MIN cmd.exe start /MIN cmd.exe start /MIN %Disk%:\\wScite\\SciTE.exe start /MIN %Disk%:\\wScite\\SciTE.exe Exit 關閉隨身系統的批次檔案 stop.bat, 只將 python, scite 與 dos 命令列關閉, 若需要關閉其他可能開啟的套件, 可以自行加入: @echo off set Disk=y path=%PATH%; taskkill /IM python.exe /F taskkill /IM pythonw.exe /F taskkill /IM scite.exe /F REM 終止虛擬硬碟與目錄的對應 subst %Disk%: /D REM 關閉 cmd 指令視窗 taskkill /IM cmd.exe /F EXIT 此一隨身系統安裝配置以 MSYS2 與 Flutter 較具挑戰性. MSYS2 首先與 MSYS2 的代理主機設定位於 Y:\\msys64\\etc\\wgetrc. 接下來為了可以編譯 C++ 程式, 必須安裝 pacman -S mingw-w64-x86_64-gcc 與 pacman -S mingw-w64-x86_64-toolchain 而列出 MSYS2 中所安裝的模組: pacman -Q 為了編譯 [Range3], 必須額外安裝: pacman -S mingw-w64-x86_64-ffmpeg pacman -S mingw-w64-x86_64-qt5 pacman -S mingw-w64-x86_64-qt5-static 編譯 Range3 git clone https://github.com/Range-Software/range3.git start Y:\\msys64\\mingw64.exe cd \\y\\tmp\\fem_ex\\range3 ./scripts/build.sh --clean && ./scripts/create_package.sh 而為了讓 svg 格式的 icons 能夠正確顯示, 必須納入 Qt5Svg.dll Flutter 至於現階段 Flutter 的安裝配置問題源自 Android sdk 的最新版 tools 與最新版的 Flutter 並不相容. 具體原因是: 目前的 Flutter 必須使用舊版的 Android sdk 中的舊版 tools. 使用者若從 Android 官方網站下載 tools 工具, 試圖與 Flutter 配合, 將會在執行: flutter doctor 時將出現 Android sdk licenses 尚未完成. 但是若再以: flutter doctor --android-licenses 就會出現 Java setting 錯誤. 解決方案 處理上述 Flutter 與最新版 Android 無法相容的問題, 必須借助: sdkmanager --sdk_root=y:\\android\\sdk tools 安裝舊版的 Android sdk tools, 問題是 sdkmanager 工具就位於 tools 目錄中, 因此必須先將新版的 tools 目錄改名為 tools_new, 並配合將 tools_new/bin 設為 start.bat 中的 PATH, 可攜系統啟動後, 以: sdkmanager --sdk_root=y:\\android\\sdk tools 安裝舊版的 Android sdk tools 後, 再將 PATH 路徑改為舊版 tools/bin. 之後再以 flutter doctor --android-licenses 同意使用授權後, 就可以接續進行 Flutter 套件的開發.","tags":"Windows","url":"https://mde.tw/lab/blog/create-portable-win-prog-sys.html"},{"title":"倉儲資料維護與管理","text":"cd2020 是 2020 春季協同產品設計實習的課程網站, 而 cd2020pj1 則是與協同設計課程相關的程式專案, 兩者都採用 CMSiMDE 建立網站. 其中 cd2020 是典型的動態與網站架構, 而 cd2020pj1 則除了網站還包含 Flask 協同產品設計程式的開發. 當要從遠端 git clone cd2020 倉儲時, 牽涉到系統使用何種協定連線, https 或 ssh? 因為不同的連線協定有不同的設定檔案, 而且預計連線的主機並不一定就能提供服務, 因此能否順利完成 git clone 牽涉許多細節. 而這些細節並非一成不變, 而必須按照邏輯順序, 一一查驗才能得到期望中的結果. 首先, 因為 cd2020 網站的倉儲位於 https://github.com/mdecourse/cd2020.git, 其中帶有 cmsimde 子模組, 因此若要將此倉儲從遠端 git clone 到近端作為工作目錄, 最好的方式就是透過 --recurse-submodules 參數, 將子模組一起 clone 到近端. git clone --recurse-submodules https://github.com/mdecourse/cd2020.git 由於 KMOLab 的課程鼓勵學員在 Windows 10 操作系統中, 使用隨身程式系統, 而不要被微軟綁定, 因為使用者必須了解所開發的程式必須能在 Mac OS X 與許多 Linux 操作系統執行, Windows 10 不應該是工程師唯一的操作系統. 因此, 從隨身系統中的 start.bat 啟動後, Windows 10 就只是機械設計工程師的暫時宿主, 隨時都要準備離開, 所以啟動後必須注意所處的網路連線環境, 假如是在 IPv4 網路環境, 可以直接對 github.com 連線, 但是身處純 IPv6 網路環境中, 目前仍必須透過支援 IPv4 與 IPv6 的網路代理主機, 才能利用 git 或 ssh 對 github.com 連線. 以 https 對 github.com 連線, 代理主機的設定是透過: git config --global http.proxy=http://[2001::_your_ipv6_proxy]:3128 假如採 ssh 對 github.com 連線, 則代理主機的設定必須檢查 putty.exe 中 github.com session 中 Connections - Proxy 的代理主機設定. 一旦完成 cd2020 網站倉儲的 git clone, 使用者就可以使用隨身系統中的命令列視窗, 進入 cd2020 倉儲中的 cmsimde 目錄, 以: python wsgi.py 開啟動態網站系統, 並利用瀏覽器連線到 https://localhost:9443 進行動態網站內容的維護, 完成後再利用 generate pages 按鈕將動態網站中的 config/content.htm 轉為 content 目錄中的靜態網頁, 之後再新增, 提交, 推送到遠端, 以完成倉儲改版的流程.","tags":"Github","url":"https://mde.tw/lab/blog/manage-your-cmsimde-site.html"},{"title":"CMSiMDE 部署","text":"CMSiMDE 所能伺服的內容包含網站, 網誌與簡報, 而網站又分為動態系統與靜態系統, 動態網站建置主要的目的在方便進行 html 文件的編輯, 而靜態網站系統則主要為了能在一般的 WWW 伺服器上進行部署. 網站 CMSiMDE 的網站編輯採用 Flask 框架編寫, 目前所需要的模組包含 flask, flask_cors, lxml, bs4 與 markdown. 使用者可以選擇將 CMSiMDE 當作 submodule 或者單獨部署在倉儲內容中的 cmsimde 目錄後, 再將 cmsimde 目錄中的 up_dir 目錄內容複製到倉儲主目錄即可. CMSiMDE 倉儲資料包含引擎內容 (也就是 cmsimde 中的資料) 與使用者內容 (也就是 up_dir 中的資料) 等兩類, 許多的網際功能都是配合歷年上課時敲敲打打修改而成, 因此整體架構相當鬆散, 就所謂的網際內容管理功能而言, 只能算勉強堪用, 還有很大的修改空間. 網誌 CMSiMDE 的網誌系統採用 Pelican , 編輯網誌的架構採用 Leo Editor 管理, 而網誌專案檔位於 config 目錄中的 pelican.leo. Leo Editor 其實是一套值得大力推廣的整合開發系統與文件編輯器, 但可能因為曲高因此和寡, 真正能夠運用上手的全球用戶, 數量始終偏低. 但是其大綱編輯模式非常適合處理複雜的工程設計流程所產生的各種文字資料, 因此非常希望 Python 新手能夠以看懂 Leo Editor 的設計架構與處理問題的細節作為遠大的目標. 簡報 CMSiMDE 的網誌簡報採用 reveal.js . 而簡報的編輯檔案也是採用 Leo Editor , 簡報專案位於 config 目錄中的 reveal.leo. 網站建構流程 CMSiMDE 的網站建構流程, 可以從建立初始的 Github 倉儲開始. 亦即在 Github 建立一個僅含 README.md 檔案的倉儲, 然後 git clone 該倉儲到近端後, 以命令列進入該倉儲後再以 git submodule add https://github.com/mdecourse/cmsimde.git cmsimde 將 CMSiMDE 倉儲內容納為子模組, 且命名為 cmsimde 目錄. 接下來將 cmsimde 目錄中, 名稱為 up_dir 的目錄內容, 複製到倉儲的根目錄中. 若近端隨身系統或操作系統已經安裝 Python3 與相應的 flask, flask_cors, lxml, bs4, markdown 等模組後, 就可以在命令列中, 進入 cmsimde 子目錄, 以: python wsgi.py 假如是在 OS X 或 Linux 操作系統, 則必須使用 Python 3 指令: python3 wsgi.py 在近端啟動動態網站, 以瀏覽器 https://localhost:9443 開啟. 網站內容管理 CMSiMDE 的動態網際內容管理, 將所有網頁內容存入 config 目錄中的 content.htm 檔案, 而在每一次使用者儲存新檔案之前, 會將舊版的 content.htm 複製至 content_backup.htm, 之所以如此是因為 CMSiMDE 採用 bs4 , 對 config/content.htm 內容進行分頁, 而分頁是依據 content.htm 由上到下的 h1, h2 與 h3 標註內容而定. 並在將動態網站內容 content.htm 以動態編輯器中的 generate pages 功能 (使用 lxml 模組功能) 轉為 content 目錄中的各分頁內容時, 可能因分頁失敗而讓整個 content.htm 內容丟失 (這就是非常需要改進的地方之一), 所以才設計 content_backup.htm 的複製進行及時補救. 另外, 在 CMSiMDE 將操作系統不允許作為檔案名稱的特殊符號自動移除之前 (例如 \":\" 號), 使用者應該避免在 h1, h2 與 h3 等標題中使用特殊符號. Github Pages 將 CMSiMDE 的動態系統轉為靜態後, 所有靜態頁面的內容存入 content 目錄, 使用者可以將此目錄內容部署到 Github Pages 上, 或其他能夠伺服 WWW html 檔案的系統即可完成網站的建立. 但是一般為了方便, 通常將包含動態系統與靜態網站內容的整個倉儲資料, 直接交由 Github 管理. 只要將倉儲的 master 分支設為 Github Pages 的根目錄, 就可以交由 Github Pages , 由倉儲主分支倉儲中的 index.html 進行網站導引. 假如使用者將近端的動態網頁內容轉為靜態後, 希望在近端檢視靜態網站內容, 可以在近端倉儲根目錄利用: python http-server.py 或在 OS X 及 Linux 操作系統中以: python3 http-server.py 啟動 https://localhost:8444 近端的靜態網頁伺服系統. Ubuntu 20.04 自架主機 上述利用 Github Pages 伺服 CMSiMDE 靜態網頁內容的配置流程非常簡單, 但若是要將 CMSiMDE 靜態網頁與動態網站系統部署在自架的 Ubuntu 20.04 主機, 則操作系統除了要安裝前述的 python3, flask, flask_cors, bs4, lxml, markdown 之外, 還需要運用 nginx , uwsgi , openssl 進行配置. 其中, openssl 用來建立網站認證用的 key 與 certificate, nginx 負責建立 WWW 伺服, 而 uwsgi 則負責用來開機執行 CMSiMDE 中的 wsgi.py 伺服程式. 利用 openssl 建立 cmsimde.key 與 cmsimde.crt 的指令如下: sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cmsimde.key -out cmsimde.crt 與 uwsgi 有關的 Ubuntu 系統安裝則包括: // 安裝 pip3 sudo apt install python3-pip // 安裝 python 編譯開發系統 sudo apt install build-essential python3-dev // 安裝 uwsgi 模組 sudo pip3 install uwsgi // 安裝 nginx 伺服套件與 uwsgi python3 plugin 程式庫 sudo apt install nginx uwsgi-plugin-python3 /etc/nginx/sites-available/default # for lab.mde.tw static site, use nginx to serve server { listen 80 default_server; listen [::]:80 default_server; root /home/user_account/labmdetw; index index.html index.htm; server_name _; location /static { alias /home/user_account/labmdetw/cmsimde/static/; } location /downloads { alias /home/user_account/labmdetw/downloads/; } location /images { alias /home/user_account/labmdetw/images/; } location /blog { alias /home/user_account/labmdetw/blog/; } location /reveal { alias /home/user_account/labmdetw/reveal/; } location / { # First attempt to serve request as file, then # as directory, then fall back to displaying a 404. try_files $uri $uri/ =404; } } # https://lab.mde.tw use nginx to serve server { listen 443 ssl; listen [::]:443 ssl; root /home/user_account/labmdetw; index index.html index.htm; server_name _; location /static { alias /home/user_account/labmdetw/cmsimde/static/; } location /downloads { alias /home/user_account/labmdetw/downloads/; } location /images { alias /home/user_account/labmdetw/images/; } location /blog { alias /home/user_account/labmdetw/blog/; } location /reveal { alias /home/user_account/labmdetw/reveal/; } location / { # First attempt to serve request as file, then # as directory, then fall back to displaying a 404. try_files $uri $uri/ =404; } ssl_certificate /etc/nginx/nginx.crt; ssl_certificate_key /etc/nginx/nginx.key; ssl_session_timeout 5m; ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2; ssl_ciphers \"HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES\"; ssl_prefer_server_ciphers on; try_files $uri $uri/ =404; } # dynamic https://lab.mde.tw:7443 use nginx for ssl and uwsgi for wsgi serving server { listen 7443 ssl; listen [::]:7443 ssl; location /static { alias /home/user_account/labmdetw/cmsimde/static/; } location / { include uwsgi_params; uwsgi_pass 127.0.0.1:9443; } ssl_certificate /etc/nginx/nginx.crt; ssl_certificate_key /etc/nginx/nginx.key; ssl_session_timeout 5m; ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2; ssl_ciphers \"HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES\"; ssl_prefer_server_ciphers on; try_files $uri $uri/ =404; } uwsgi_ini/uwsgi.ini [uwsgi] socket = 127.0.0.1:9443 uid = user_account gid = user_account plugins-dir = /usr/lib/uwsgi/plugins/ plugin = python3 master = true process = 4 threads = 2 chdir = /home/user_account/labmdetw/cmsimde wsgi-file = /home/user_account/labmdetw/cmsimde/wsgi.py 啟動 uwsgi 指令, 將會逐一啟動 wsgi_ini 目錄中個別 .ini 檔案: sudo /usr/bin/uwsgi --emperor /home/user_account/wsgi_ini 最後則設定 Ubuntu 系統服務, 用來啟動 uwsgi: /etc/systemd/system 的 cmsimde.service 服務啟動檔案內容: [Unit] Description=uWSGI to serve CMSiMDE After=network.target [Service] User=user_account Group=user_account WorkingDirectory=/home/user_account/uwsgi_ini ExecStart=/usr/local/bin/uwsgi --emperor /home/user_account/uwsgi_ini [Install] WantedBy=multi-user.target 接著將 cmsimde 服務設為隨系統開機啟動: sudo systemctl enable cmsimde 若要取消 cmsimde 服務隨系統開機啟動: sudo systemctl disable cmsimde 手動啟動 cmsimde.service 服務 sudo systemctl start cmsimde 手動停止 cmsimde.service 服務 sudo systemctl stop cmsimde","tags":"Github","url":"https://mde.tw/lab/blog/2020-lab-get-started.html"}]};
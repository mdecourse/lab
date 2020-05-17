import sys
from oauth2client import client
from googleapiclient import sample_tools
import os

argv = ""
# 認證並建立服務
# name of the api is "blogger", version is "v3"
# description of the api is __doc__
# file name of the application: location of client_secrets.json
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

    body = {
    "kind": "blogger#post",
    "id": blogs["items"][0]["id"],
    "title": "透過 Python 程式新增網誌文章3",
    "content":"使用 Google Blogger API 可以利用程式新增網誌文章內容 <a href='http://google.com'>google</a>",
    "labels": "test"
    }
    insert = posts.insert(blogId=blogs["items"][0]["id"], body=body)
    posts_doc = insert.execute()
    print(posts_doc)
    os.remove("blogger.dat")

except(client.AccessTokenRefreshError):
    print("error")
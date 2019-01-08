## 聊天程式實作 (Golang & Cocos Creator)

### 實作一：

 * 此實作試圖透過Golang語言，使用內建的HTTP1.1協定，以瀏覽器為客戶端發送HTTP請求，
 而Go的Server會透過多工復用器(Multiplexer, Mux)，分配至請求相應的Handler函數，
 Handler會向PostgreSQL的資料庫存取相應資料後，將HTML樣板渲染後回應至客戶端桌面。

 * 此實作功能包括：建立帳號、驗證帳密正確性、登入/登出、建立新聊天群、在特定聊天群回
 應會話(登入模式限定)。

### 實作二：

 * 此實作將前作鑲嵌至一個Cocos遊戲中，前作將在這遊戲中分成登入/登出介面，以及聊天室
 介面。此遊戲包括多國語言設定(簡體、繁體、英文)，且能夠於Windows桌面、網頁、
 手機網頁以及Android手機上運行。
 
 ## 成果展示

### 實作一：

* 首頁：

 ![](Images/HW1Index.png)

* 登入：

 ![](Images/HW1Login.png)

* 建立新聊天群：

 ![](Images/HW1NewThread.png)

* 發送回應：

 ![](Images/HW1Reply.png)

* 建立新帳號：

 ![](Images/HW1Sinup.png)

### 實作二：

* 登入場景：

 ![](Images/HW2LoginScene.png)

* 登入完成：

 ![](Images/HW2SignInScene.png)

* 多國語言設定場景：

 ![](Images/HW2SettingsScene.png)

* 魔法森林(聊天室)場景：

 ![](Images/HW2ChatRoomScene.png)

* 手機Web展示：

 ![](Images/HW2MobileWeb.png)


* 手機Android(.apk) 展示 (WebView無法顯示)：

 ![](Images/HW2Android.png)

* Win32(.exe) 展示 (WebView無法顯示)：

 ![](Images/HW2Win32.png)


## 架構

### 網頁架構：

 ![](Images/WebModel.png)

  * 使用者發送Request要求給Mux，Mux分析後將交給相符的Handler函數，Handler會向PostgreSQL的資料庫存取相應資料後，將HTML樣板渲染後回應至客戶端桌面。

  * Go內建的Mux本身就是以goroutine高併發編寫，符合課程要求。設置Handle函數設定給Mux，之後交由http.Server接聽(Listen)即可。

### 程式架構：

  * 由DBSetting\Setup DB+Git.bat設定，PostgreSQL的資料庫和Git的pq擴充

  * 資料庫包括四張表格：使用者users, 會話sessions, 協程(聊天群)threads, 發文posts

  * data中的Go程式負責存取PostgreSQL資料庫的函數

  * 後端方面，utils放置工具、main設定mux和server、其他route檔案實現各式Handle

  * 腦圖(ChatRoomProgram\docs\ProjectModel.emmx)：

 ![](Images/ProjectModel.jpg)


## 錯誤Log
   * No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el

 => 從Unity複製mips64el-linux-android-4.9資料夾到android-ndk-r18b\toolchains\之中

   * Android NDK: APP_STL gnustl_shared is no longer supported. Please switch to either c++_static or c++_shared.
C:\Cocos\MyGame\build\jsb-link\frameworks\runtime-src\proj.android-studio\app\jni
APP_STL := gnustl_static

Android NDK: Invalid NDK_TOOLCHAIN_VERSION value: 4.9. GCC is no longer supported
 Android NDK GCC => Clang

 => 改裝android-ndk-r18

   * cocos2D-x  python 在 UTF-8 與 Big5 衝突

 => 目前尚無解

  * 詳見 .\docs\Error Log.txt

## 多國語言實踐

  * 使用i18n插件實踐Local Label和Local Image

## Cocos控制項
 
  *  Scene
  * Button – Click
  * Label
  * ToggleGroup
  * WebView
  * Prefabs, Random Instances
  * Character Actions
  * Audio – Background Music & Effect Sounds

## 後續展望

* 嘗試使用HTTP GET/POST連接javaScript和Go
* 使Win32, Android-apk 連接上 Server
* Cocos2D 繼續設計、模擬楓之谷

(function() {
  'use strict';
  
  // YouTubeチャンネルURL
  const YOUTUBE_CHANNELS = {
    psychommunity: 'https://www.youtube.com/@PSYCHOMMUNITY2024',
    original: 'https://www.youtube.com/channel/UCnYZSxNGV65Ba3pA2S_WEIQ'
  };
  
  // リクエストタブを追加
  function addRequestTab() {
    // タブバーを探す
    const tablist = document.querySelector('[role="tablist"]');
    if (!tablist) return;
    
    // 既にリクエストタブがある場合は追加しない
    if (document.querySelector('a[href="/request"]')) return;
    
    // Homeタブを探す
    const homeTab = tablist.querySelector('a[href="/"]');
    if (!homeTab) return;
    
    // リクエストタブを作成（Homeタブのクローン）
    const requestTab = homeTab.cloneNode(true);
    requestTab.setAttribute('href', '#request');
    requestTab.setAttribute('aria-selected', 'false');
    requestTab.style.opacity = '0.6';
    
    // テキストを変更
    const textElement = requestTab.querySelector('.css-146c3p1[style*="color"]');
    if (textElement) {
      textElement.textContent = 'リクエスト';
      textElement.style.color = 'rgba(255,255,255,0.80)';
    }
    
    // クリックイベントを追加
    requestTab.addEventListener('click', function(e) {
      e.preventDefault();
      showRequestModal();
    });
    
    // Homeタブの親要素に追加
    const homeTabContainer = homeTab.parentElement;
    const requestTabContainer = homeTabContainer.cloneNode(false);
    requestTabContainer.appendChild(requestTab);
    homeTabContainer.parentElement.appendChild(requestTabContainer);
  }
  
  // リクエストモーダルを表示
  function showRequestModal() {
    // 既存のモーダルを削除
    const existingModal = document.getElementById('request-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // モーダル背景を作成
    const modalBg = document.createElement('div');
    modalBg.id = 'request-modal';
    modalBg.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';
    
    // モーダルコンテンツを作成
    const modalContent = document.createElement('div');
    modalContent.style.cssText = 'background:#1a1a1a;border-radius:16px;padding:32px;max-width:400px;width:90%;border:2px solid #d84315;';
    
    modalContent.innerHTML = `
      <div style="text-align:center;color:white;">
        <h2 style="color:#d84315;font-size:24px;font-weight:bold;margin-bottom:24px;">楽曲リクエスト投票</h2>
        
        <div style="margin-bottom:24px;">
          <p style="margin-bottom:16px;font-size:16px;">YouTubeチャンネルで楽曲をリクエストしてください！</p>
        </div>
        
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
          <a href="${YOUTUBE_CHANNELS.psychommunity}" target="_blank" 
             style="background:#d84315;color:white;padding:16px;border-radius:8px;text-decoration:none;font-weight:bold;display:block;">
            📺 PSYCHOMMUNITYチャンネル
          </a>
          
          <a href="${YOUTUBE_CHANNELS.original}" target="_blank" 
             style="background:#333;color:white;padding:16px;border-radius:8px;text-decoration:none;font-weight:bold;display:block;border:2px solid #d84315;">
            🎵 オリジナル楽曲チャンネル
          </a>
        </div>
        
        <button id="close-modal" 
                style="background:#555;color:white;padding:12px 32px;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer;width:100%;">
          閉じる
        </button>
      </div>
    `;
    
    modalBg.appendChild(modalContent);
    document.body.appendChild(modalBg);
    
    // 閉じるボタンのイベント
    document.getElementById('close-modal').addEventListener('click', function() {
      modalBg.remove();
    });
    
    // 背景クリックで閉じる
    modalBg.addEventListener('click', function(e) {
      if (e.target === modalBg) {
        modalBg.remove();
      }
    });
  }
  
  // ページ読み込み時に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addRequestTab);
  } else {
    addRequestTab();
  }
  
  // URLが変更されたときにも実行（SPAの場合）
  let lastUrl = location.href;
  new MutationObserver(function() {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(addRequestTab, 100);
    }
  }).observe(document, {subtree: true, childList: true});
})();

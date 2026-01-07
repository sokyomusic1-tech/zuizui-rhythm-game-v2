(function() {
  'use strict';
  
  // 曲IDと動画ファイルのマッピング
  const videoMap = {
    'cruel_angel_thesis': '/assets/cruel_angel_thesis.mp4',
    'solid_state_scouter': '/assets/solid_state_scouter.mp4'
  };
  
  // ゲーム画面かどうかを確認
  function isGameScreen() {
    return window.location.pathname === '/game' || window.location.pathname === '/game.html';
  }
  
  // 動画背景を追加
  function addVideoBackground() {
    if (!isGameScreen()) return;
    
    // URLパラメータから曲IDを取得
    const params = new URLSearchParams(window.location.search);
    const songId = params.get('songId');
    
    if (!songId || !videoMap[songId]) return;
    
    // 既存の動画要素を削除
    const existingVideo = document.getElementById('background-video');
    if (existingVideo) {
      existingVideo.remove();
    }
    
    // 動画要素を作成
    const video = document.createElement('video');
    video.id = 'background-video';
    video.src = videoMap[songId];
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    
    // スタイルを設定
    video.style.position = 'fixed';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.zIndex = '-1';
    video.style.pointerEvents = 'none';
    
    // bodyの最初に挿入
    document.body.insertBefore(video, document.body.firstChild);
    
    // 再生を試みる
    video.play().catch(function(error) {
      console.log('Video autoplay failed:', error);
    });
  }
  
  // ページ読み込み時に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addVideoBackground);
  } else {
    addVideoBackground();
  }
  
  // URLが変更されたときにも実行（SPAの場合）
  let lastUrl = location.href;
  new MutationObserver(function() {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      addVideoBackground();
    }
  }).observe(document, {subtree: true, childList: true});
})();

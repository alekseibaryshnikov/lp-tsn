if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/lp-tsn/sw.js', { scope: '/lp-tsn/' })})}
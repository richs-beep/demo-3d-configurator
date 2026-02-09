const CACHE_NAME = 'cake-3d-v2.3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // Ссылки на внешние библиотеки, которые вы используете в коде:
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/GLTFExporter.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/USDZExporter.js'
];

// 1. Установка: скачиваем файлы в кэш
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. Активация: удаляем старые кэши при обновлении версии
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// 3. Перехват запросов: если нет интернета, берем из кэша
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
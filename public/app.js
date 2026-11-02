const features = {
  placement: {
    image: 'assets/office-placement.jpg', label: '01 / REARRANGE',
    title: ['先试一试，再搬家具。', 'Try a new arrangement.'],
    copy: ['选中独立家具，自由移动、旋转和升降。碰撞与支撑检查辅助摆放，撤销、重做和布局自动保存，让每次调整都有余地。', 'Select individual pieces, then move, rotate, or lift them. Collision and support checks help with placement; undo, redo, and automatic layout saving keep every change manageable.'],
    alt: ['选中办公椅后，编辑器显示移动、旋转和落点预览工具', 'An office chair selected in the editor, with movement, rotation, and placement preview controls']
  },
  preview: {
    image: 'assets/office-preview.jpg', label: '02 / INTERACT',
    title: ['不只是模型，还能动起来。', 'A scene that responds.'],
    copy: ['切换到预览模式，点击门、窗或柜门即可开合。升降桌调整高度时，桌上的物体随之移动，让空间里的物件保留原有的活动方式。', 'In preview mode, click doors, windows, and cabinet doors to open or close them. Adjust a standing desk and its contents move with it, preserving how objects work in the room.'],
    alt: ['办公室预览模式中，窗户打开、升降桌升起，桌面物体跟随移动', 'Office preview mode with open windows and an elevated standing desk, its contents moving with the desktop']
  },
  lighting: {
    image: 'assets/office-night.jpg', label: '03 / LIGHTING',
    title: ['从日光，到夜晚的灯光。', 'See the room in a new light.'],
    copy: ['切换早晨、中午、下午和夜间光照预设，控制中央顶灯的开关与照射角度。环境光、阴影与环境遮蔽共同呈现空间层次。', 'Switch between morning, noon, afternoon, and night presets. Toggle the central ceiling light and adjust its beam angle. Environment lighting, shadows, and ambient occlusion add depth to the scene.'],
    alt: ['夜间办公室场景：关闭日光后，中央顶灯照亮家具与地面', 'Office at night, with daylight disabled and the central ceiling light illuminating furniture and the floor']
  },
  object: {
    image: 'assets/add-object.jpg', label: '04 / ADD OBJECTS',
    title: ['把照片里的物体，放进房间。', 'From a photo to your room.'],
    copy: ['上传物体照片，经过抠图与服务器三维重建，再用一条实测边长标定尺寸。完成后，以真实大小加入房间，和原有家具一起布置。', 'Upload object photos for background removal and server-side 3D reconstruction. Calibrate the model with one measured edge, then add it to the room at real-world scale alongside existing furniture.'],
    alt: ['添加物体对话框展示照片、抠图、重建和尺寸四个步骤', 'The add-object dialog showing the four steps: photos, background removal, reconstruction, and dimensions']
  }
};

let language = 'zh-CN';
let currentFeature = 'placement';
const languageButton = document.querySelector('#language-button');
const tabs = [...document.querySelectorAll('[data-feature]')];
const featureImage = document.querySelector('#feature-image');
const featureZoom = document.querySelector('#feature-zoom');
const dialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');

// Save the authored Chinese text once; translations remain simple text, never HTML.
for (const element of document.querySelectorAll('[data-en]')) element.dataset.zh = element.textContent;
for (const element of document.querySelectorAll('[data-en-alt]')) element.dataset.zhAlt = element.alt;
for (const element of document.querySelectorAll('[data-en-aria]')) element.dataset.zhAria = element.getAttribute('aria-label');

function renderFeature() {
  const feature = features[currentFeature];
  const locale = language === 'en' ? 1 : 0;
  featureImage.src = feature.image;
  featureImage.alt = feature.alt[locale];
  featureZoom.dataset.zoom = feature.image;
  document.querySelector('#feature-index').textContent = feature.label;
  document.querySelector('#feature-title').textContent = feature.title[locale];
  document.querySelector('#feature-copy').textContent = feature.copy[locale];
  document.querySelector('#feature-panel').setAttribute('aria-labelledby', `tab-${currentFeature}`);
  for (const tab of tabs) {
    const selected = tab.dataset.feature === currentFeature;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }
}

function setLanguage(next) {
  language = next === 'en' ? 'en' : 'zh-CN';
  document.documentElement.lang = language;
  const english = language === 'en';
  for (const element of document.querySelectorAll('[data-en]')) element.textContent = english ? element.dataset.en : element.dataset.zh;
  for (const element of document.querySelectorAll('[data-en-alt]')) element.alt = english ? element.dataset.enAlt : element.dataset.zhAlt;
  for (const element of document.querySelectorAll('[data-en-aria]')) element.setAttribute('aria-label', english ? element.dataset.enAria : element.dataset.zhAria);
  languageButton.querySelector('span').textContent = english ? '中文' : 'EN';
  languageButton.setAttribute('aria-label', english ? '切换为中文' : 'Switch to English');
  document.title = english ? 'RoomCanvas — Your real room. A canvas to reimagine.' : 'RoomCanvas — 从真实房间，到可编辑的画布';
  const description = english ? 'Turn room scans into interactive 3D spaces at real-world scale. Rearrange furniture, add objects from photos, and explore your room in the browser.' : 'RoomCanvas 将房间扫描转为真实尺寸的交互式三维空间，在浏览器里重新布置家具、添加物体，用手势探索你的房间。';
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = description;
  renderFeature();
  if (dialog.open) dialogImage.alt = document.querySelector(`[data-zoom="${dialogImage.getAttribute('src')}"] img`)?.alt || '';
  try { localStorage.setItem('roomcanvas-language', language); } catch { /* Storage is optional. */ }
}

languageButton.hidden = false;
document.querySelector('#showcase-controls').hidden = false;
languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh-CN' : 'en'));
try { if (localStorage.getItem('roomcanvas-language') === 'en') setLanguage('en'); } catch { /* Keep the authored language. */ }

for (const tab of tabs) {
  tab.addEventListener('click', () => { currentFeature = tab.dataset.feature; renderFeature(); });
  tab.addEventListener('keydown', event => {
    const index = tabs.indexOf(tab);
    let target;
    if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') target = tabs[(index + tabs.length - 1) % tabs.length];
    if (event.key === 'Home') target = tabs[0];
    if (event.key === 'End') target = tabs.at(-1);
    if (!target) return;
    event.preventDefault();
    target.focus();
    target.click();
  });
}

for (const button of document.querySelectorAll('[data-zoom]')) {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.zoom;
    dialogImage.alt = button.querySelector('img').alt;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
}
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

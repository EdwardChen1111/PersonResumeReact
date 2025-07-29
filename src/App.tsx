import React, { useState, useEffect } from 'react';
import { Search, Settings, User, Trophy, Award, Code, Palette, Mail, MessageSquare, X, GraduationCap, Star, FolderOpen, Users, Clock } from 'lucide-react';
import MyPicture from './assets/my-picture.jpg';
import PCSH from './assets/pcsh.jpg';
import NTUST from './assets/ntust.png';
import TQCPython from './assets/TQCPlus.ico';
import TOEIC from './assets/toeic.png';
import APCS from './assets/APCS.png';
import saveEnergy from './assets/saveEnergy.png';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState('main');
  const [showModal, setShowModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [focusedItem, setFocusedItem] = useState(null);
  // 新增狀態來控制顯示的卡片數量
  const [visibleItemsCount, setVisibleItemsCount] = useState(3); // 初始顯示3張卡片
  
  // 主題設定狀態
  const [settings, setSettings] = useState({
    darkMode: false,
    backgroundStyle: 'gradient', // gradient, solid, pattern
    primaryColor: 'blue', // blue, purple, green, red, orange
    textSize: 'medium', // small, medium, large
    borderRadius: 'medium', // small, medium, large
    animations: true,
    compactMode: false
  });

  // 主題相關的樣式類別
  const getThemeClasses = () => {
    const base = settings.darkMode ? 'dark' : '';
    const bg = settings.darkMode ? 'bg-gray-900' : 'bg-gray-50';
    return { base, bg };
  };

  const getCardClasses = () => {
    const darkClass = settings.darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900';
    const radiusClass = {
      small: 'rounded',
      medium: 'rounded-lg',
      large: 'rounded-xl'
    }[settings.borderRadius];
    
    return `${darkClass} ${radiusClass} shadow-sm border`;
  };

  const getTextClasses = () => {
    const sizeClass = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    }[settings.textSize];
    
    // 確保深色模式時文字顏色為淺色系
    const colorClass = settings.darkMode ? 'text-gray-100' : 'text-gray-900';
    return `${sizeClass} ${colorClass}`;
  };

  const getPrimaryColorClasses = () => {
    const color = {
      blue : 'text-blue-600 border-blue-600 bg-blue-50',
      purple : 'text-purple-600 border-purple-600 bg-purple-50',
      green : 'text-green-600 border-green-600 bg-green-50',
      red : 'text-red-600 border-red-600 bg-red-50',
      orange : 'text-orange-600 border-orange-600 bg-orange-50'
    }[settings.primaryColor];
    return color;
  };

  const getBackgroundStyle = () => {
    if (settings.darkMode) {
      switch (settings.backgroundStyle) {
        case 'gradient':
          return 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900';
        case 'solid':
          return 'bg-gray-900';
        case 'pattern':
          return 'bg-gray-900 bg-opacity-95 relative';
        default:
          return 'bg-gray-900';
      }
    } else {
      switch (settings.backgroundStyle) {
        case 'gradient':
          return 'bg-gradient-to-br from-gray-50 via-white to-gray-100';
        case 'solid':
          return 'bg-white';
        case 'pattern':
          return 'bg-gray-50 relative';
        default:
          return 'bg-gray-50';
      }
    }
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    
    // 記住當前垂直滾動位置
    const currentScrollY = window.scrollY;
    const tabsElement = document.getElementById('navigation-tabs');
    const tabsOffsetTop = tabsElement ? tabsElement.offsetTop : 0;
    
    setIsTransitioning(true);
    setSelectedItem(null);
    setVisibleItemsCount(3); // 切換tab時重置顯示數量
    
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
      
      // 在行動裝置上滾動到點擊的按鈕位置
      if (window.innerWidth < 768) {
        const tabsContainer = document.getElementById('tabs-container');
        const clickedButton = document.querySelector(`[data-tab="${tab}"]`);
        
        if (tabsContainer && clickedButton) {
          const containerRect = tabsContainer.getBoundingClientRect();
          const buttonRect = clickedButton.getBoundingClientRect();
          const scrollLeft = tabsContainer.scrollLeft;
          
          // 計算按鈕相對於容器的位置
          const buttonRelativeLeft = buttonRect.left - containerRect.left + scrollLeft;
          const buttonWidth = buttonRect.width;
          const containerWidth = containerRect.width;
          
          // 計算最佳滾動位置（讓按鈕居中）
          const targetScrollLeft = buttonRelativeLeft - (containerWidth / 2) + (buttonWidth / 2);
          
          // 平滑滾動到目標位置
          tabsContainer.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: 'smooth'
          });
        }
        
        // 滾動到分區按鈕位置
        window.scrollTo({
          top: Math.max(0, tabsOffsetTop - 20),
          behavior: 'smooth'
        });
      } else {
        // 桌面版保持原來的位置
        window.scrollTo(0, currentScrollY);
      }
    }, 150);
  };

  const selectCard = (item) => {
    setSelectedItem(selectedItem === item ? null : item)
    setFocusedItem(focusedItem === item ? item : null);
  };

  const profileData = {
    name: "陳哲豪",
    location: "Taiwan, R.O.C.",
    github: "https://github.com/EdwardChen1111",
    email: "systemrestart1111@gmail.com",
    phone: "+886-9-72013157",
    certificate: 3,
    awards: 1,
    projects: 2
  };

  const allItems = [
    {
      id: 1,
      type: 'education',
      recent: false,
      title: '新北市立板橋高級中學',
      subtitle: "普通科",
      icon: <div className="PCSH w-6 h-6" />,
      details: {
        學校: '新北市立板橋高級中學',
        期間: '2022-2025',
        描述: '在就讀本校時，我積極探索不同方向的程式設計，並透過算法課及資訊社等資源去精進自身的程式設計能力。'
      },
      meta: 'Education 1',
      date: '07/28/2025',
      like: false,
      moredetail: true,
      certificate: true,
      keywords: ['PCSH', 'computer', 'senior', 'high school', 'programming', 'algorithms']
    },
    {
      id: 2,
      type: 'education',
      recent: true,
      title: '國立臺灣科技大學',
      subtitle: "不分系",
      icon: <div className="NTUST w-6 h-6" />,
      details: {
        學校: '國立臺灣科技大學',
        期間: '2025-now',
        gpa: '暫無',
        課程: ['暫無'],
        描述: '2025年入學，大二進行分流，目前預想是分流至資工系再雙輔電機系。'
      },
      meta: 'Education 2',
      date: '07/28/2025',
      like: true,
      moredetail: false,
      certificate: false,
      keywords: ['NTUST', 'computer', 'science', 'programming', 'algorithms']
    },
    {
      id: 3,
      type: 'certificate',
      recent: false,
      title: 'TQC+ Python第二版',
      subtitle: 'Simple Python Certificate',
      icon: <div className="TQCPython w-6 h-6 text-yellow-500" />,
      details: {
        證書名稱: 'TQC+ Python第二版',
        獲得日期: 'Team Alpha',
        難度: '簡單',
        描述: '此證書考驗對基本Python函式的認識，以及檔案的基本讀寫。'
      },
      meta: 'Certificate 1',
      date: '07/28/2025',
      like: false,
      moredetail: false,
      certificate: false,
      keywords: ['TQC+', 'python', 'simple', 'certificate', '第二版']
    },
    {
      id: 4,
      type: 'certificate',
      recent: true,
      title: 'TOEIC聽讀',
      subtitle: '英文檢定',
      icon: <div className="TOEIC w-6 h-6 text-yellow-500" />,
      details: {
        證書名稱: 'TOEIC',
        分數: '聽力:435 + 閱讀:390',
        獲得日期: '2025/03',
        難度: '中等偏上',
        描述: '此成績為藍色證書，TOEIC主要考驗長時間聽英文的專注度與速度，我預計會在接下來的一年努力重考到金色證書。'
      },
      meta: 'Certificate 2',
      date: '07/28/2025',
      like: true,
      moredetail: false,
      certificate: false,
      keywords: ['TOEIC', '多益', 'english', '英文', '435', '390']
    },
    {
      id: 5,
      type: 'certificate',
      recent: true,
      title: 'APCS',
      subtitle: '程式檢定',
      icon: <div className="APCS w-6 h-6 text-yellow-500" />,
      details: {
        證書名稱: 'APCS',
        分數: '觀念:4 + 實作:3',
        期間: '2022-2025',
        難度: '中等',
        描述: 'APCS為大學先修檢定，主要靠驗邏輯思考以及演算法能力。'
      },
      meta: 'Certificate 3',
      date: '07/28/2025',
      like: true,
      moredetail: false,
      certificate: false,
      keywords: ['APCS', '程式檢定', 'programming', '觀念:4', '實作:3']
    },
    {
      id: 6,
      type: 'award',
      recent: true,
      title: '臺灣能永續能源創意競賽銅牌',
      subtitle: '團隊競賽',
      icon: <div className="save-energy w-6 h-6 text-yellow-500" />,
      details: {
        競賽名稱: '臺灣能永續能源創意競賽',
        獎項: '銅牌',
        類型: '團隊競賽',
        歷程: '書面篩選->作品篩選->作品展出->教授、產業人士問答->公布最終名次',
        描述: '我們的作品為使用AI對水管聲音進行分析，並試圖找出漏水的範圍。'
      },
      meta: 'Award 1',
      date: '07/28/2025',
      like: true,
      moredetail: false,
      certificate: false,
      keywords: ['臺灣能', '永續能源', '銅牌', '水管', 'AI', 'award']
    },
    {
      id: 7,
      type: 'project',
      recent: true,
      title: '個人簡歷網站',
      subtitle: '介紹我自己，並嘗試通過各種AI工具協助開發。',
      icon: <Code className="w-6 h-6 text-green-500" />,
      details: {
        項目名稱: '個人簡歷',
        完成度: '90%(未完成測試)',
        使用技術: ['ReactJS', 'Tailwind CSS', 'Vite'],
        使用工具: ['Claude', 'Gemini', 'Git'],
        描述: '此專案即為本網站，尚未進行BUG檢測，未來打算添加更多統計功能以及自定義背景與其他顯示設定。'
      },
      meta: 'Project 1',
      date: '07/28/2025',
      like: true,
      moredetail: false,
      certificate: false,
      githublink: false,
      keywords: ['個人簡歷', '網站', 'resume', 'web', 'react', 'Tailwind CSS']
    },
    {
      id: 8,
      type: 'project',
      recent: true,
      title: '大學網站Python爬蟲',
      subtitle: '爬取各大學網站的榜單及其他資訊。',
      icon: <Code className="w-6 h-6 text-green-500" />,
      details: {
        項目名稱: '大學榜單爬蟲',
        完成度: '75%(完成申請入學網站爬取及通用爬蟲編寫，未完成對各個大學的爬蟲config編寫)',
        使用技術: ['Python', 'Selenium', 'PDFplumber', 'Json'],
        協助AI: ['ChatGPT'],
        描述: '第一階段(已完成)特定爬取大學申請網站的程式碼。第二階段(半完成)通用爬取各大學的申請入學榜單(程式碼缺少更多測試，目前完成兩間大學的配置檔)。外加階段(使用AI輔助完成)榜單PDF讀取轉存成Json。'
      },
      meta: 'Project 2',
      date: '07/28/2025',
      like: true,
      moredetail: false,
      certificate: false,
      githublink: 'https://github.com/EdwardChen1111/FurtherEducationBackend',
      keywords: ['大學', '網站', 'Python', 'university', 'web', 'json', 'selenium', 'pdfplumber', 'opera']
    },
    {
      id: 9,
      type: 'project',
      recent: true,
      title: 'Python後端管理MariaDB',
      subtitle: '整合爬蟲程式並加入定期更新爬取功能，最終將資料存進DB並提供前端可互動的資料存取API。',
      icon: <Code className="w-6 h-6 text-green-500" />,
      details: {
        項目名稱: 'DB管理加後端伺服',
        完成度: '20%(完成項目規劃及評估需使用技術)',
        欲使用技術: ['Python', 'FastAPI', 'MariaDB Connector', 'Json'],
        欲使用工具: ['MariaDB', 'Git'],
        描述: '目前進度:完成項目所需技術與整體邏輯規劃，正在學習FastAPI、MariaDB與Python的知識與如何整合。'
      },
      meta: 'Project 3',
      date: '07/28/2025',
      like: true,
      moredetail: false,
      certificate: false,
      githublink: false,
      keywords: ['Python', '後端', 'backend', 'fastapi', 'MariaDB']
    }
  ];

  // 根據當前頁面過濾可搜尋的項目
  const getSearchableItems = () => {
    switch (currentPage) {
      case 'main':
        return allItems; // 主頁搜尋所有項目
      case 'education':
        return allItems.filter(item => item.type === 'education' || item.type === 'certificate' || item.type === 'award');
      case 'projects':
        return allItems.filter(item => item.type === 'project');
      case 'profile':
      default:
        return []; // 個人資料頁面沒有可搜尋的項目
    }
  };

  // 搜尋功能
  useEffect(() => {
    const currentSearchableItems = getSearchableItems();
    if (searchQuery.length > 0) {
      const results = currentSearchableItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery, currentPage]); // 依賴 currentPage 以便在頁面切換時重新篩選

  // 監聽 ESC 鍵以關閉 Modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowModal(null);
      }
    };

    if (showModal) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showModal]);

  const filteredItems = activeTab === 'All' 
    ? allItems 
    : allItems.filter(item => {
        if (activeTab === 'Education') return item.type === 'education';
        if (activeTab === 'Awards') return item.type === 'award';
        if (activeTab === 'Projects') return item.type === 'project';
        if (activeTab === 'Certificate') return item.type === 'certificate';
        if (activeTab === 'Recent') return item.recent;
        return true;
      });

  const handleSearchSelect = (item) => {
    setFocusedItem(item.id);
    setSearchQuery('');
    setShowSearchResults(false);
    
    // 根據項目類型判斷目標頁面
    let targetPage = 'main'; // 預設為主頁
    if (item.type === 'education' || item.type === 'award') {
      targetPage = 'education';
    } else if (item.type === 'project') {
      targetPage = 'projects';
    }

    // 如果目前在主頁，並且選中的項目也屬於主頁內容，則確保該項目可見並停留在主頁
    if (currentPage === 'main' && (item.type === 'education' || item.type === 'award' || item.type === 'project')) {
      const itemIndex = allItems.findIndex(i => i.id === item.id);
      if (itemIndex !== -1 && itemIndex >= visibleItemsCount) {
        // 確保項目可見，可以選擇一次加載更多，或者只加載到該項目
        setVisibleItemsCount(itemIndex + 1); 
      }
      // 停留在主頁，不改變 currentPage 和 activeTab
    } else {
      // 否則，導航到確定的目標頁面
      setCurrentPage(targetPage);
      setActiveTab('All'); // 為新頁面重置 activeTab
    }
    
    // 滾動到選中的項目
    setTimeout(() => {
      const element = document.getElementById(`item-${item.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  const handleLoadMore = () => {
    setVisibleItemsCount(prevCount => prevCount + 3); // 每次加載3個
  };

  const tabs = ['All', 'Recent', 'Education', 'Certificate', 'Awards', 'Projects'];

  // Settings Modal Component
  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4">
      <div className={`${getCardClasses()} w-full max-w-md max-h-[90vh] overflow-y-auto`}>
        <div className={`p-6 border-b ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-semibold ${getTextClasses()}`}>顯示設定</h2>
            <button 
              onClick={() => setShowModal(null)}
              className={`p-2 rounded-lg hover:${settings.darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* 暗色模式切換 */}
          <div className="space-y-3">
            <h3 className={`font-medium ${getTextClasses()}`}>外觀模式</h3>
            <div className="flex items-center justify-between">
              <span className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>暗色模式</span>
              <button
                onClick={() => setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 背景樣式 */}
          <div className="space-y-3">
            <h3 className={`font-medium ${getTextClasses()}`}>背景樣式</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'gradient', label: '漸層', preview: 'bg-gradient-to-r from-blue-400 to-purple-500' },
                { value: 'solid', label: '純色', preview: settings.darkMode ? 'bg-gray-800' : 'bg-white' },
                { value: 'pattern', label: '圖案', preview: 'bg-gray-200 bg-opacity-50' }
              ].map(bg => (
                <button
                  key={bg.value}
                  onClick={() => setSettings(prev => ({ ...prev, backgroundStyle: bg.value }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    settings.backgroundStyle === bg.value 
                      ? `border-${settings.primaryColor}-500` 
                      : settings.darkMode ? 'border-gray-600' : 'border-gray-300'
                  }`}
                >
                  <div className={`w-full h-8 rounded ${bg.preview} mb-2`}></div>
                  <span className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {bg.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 主色調 */}
          <div className="space-y-3">
            <h3 className={`font-medium ${getTextClasses()}`}>主色調</h3>
            <div className="flex space-x-2">
              {[
                { value: 'blue', color: 'bg-blue-500' },
                { value: 'purple', color: 'bg-purple-500' },
                { value: 'green', color: 'bg-green-500' },
                { value: 'red', color: 'bg-red-500' },
                { value: 'orange', color: 'bg-orange-500' }
              ].map(color => (
                <button
                  key={color.value}
                  onClick={() => setSettings(prev => ({ ...prev, primaryColor: color.value }))}
                  className={`w-8 h-8 rounded-full ${color.color} border-2 transition-all ${
                    settings.primaryColor === color.value 
                      ? 'border-gray-800 scale-110' 
                      : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 文字大小 */}
          <div className="space-y-3">
            <h3 className={`font-medium ${getTextClasses()}`}>文字大小</h3>
            <div className="space-y-2">
              {[
                { value: 'small', label: '小', demo: 'text-sm' },
                { value: 'medium', label: '中', demo: 'text-base' },
                { value: 'large', label: '大', demo: 'text-lg' }
              ].map(size => (
                <button
                  key={size.value}
                  onClick={() => setSettings(prev => ({ ...prev, textSize: size.value }))}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    settings.textSize === size.value 
                      ? `border-${settings.primaryColor}-500 ${settings.darkMode ? 'bg-gray-700' : 'bg-gray-50'}` 
                      : settings.darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className={`${size.demo} ${settings.darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {size.label} - 範例文字
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 圓角大小 */}
          <div className="space-y-3">
            <h3 className={`font-medium ${getTextClasses()}`}>圓角樣式</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'small', label: '小', class: 'rounded' },
                { value: 'medium', label: '中', class: 'rounded-lg' },
                { value: 'large', label: '大', class: 'rounded-xl' }
              ].map(radius => (
                <button
                  key={radius.value}
                  onClick={() => setSettings(prev => ({ ...prev, borderRadius: radius.value }))}
                  className={`p-3 border-2 transition-all ${radius.class} ${
                    settings.borderRadius === radius.value 
                      ? `border-${settings.primaryColor}-500` 
                      : settings.darkMode ? 'border-gray-600' : 'border-gray-300'
                  } ${settings.darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <span className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {radius.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 其他設定 */}
          <div className="space-y-3">
            <h3 className={`font-medium ${getTextClasses()}`}>其他設定</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>動畫效果</span>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, animations: !prev.animations }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.animations ? `bg-${settings.primaryColor}-600` : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.animations ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>緊湊模式</span>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, compactMode: !prev.compactMode }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.compactMode ? `bg-${settings.primaryColor}-600` : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.compactMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 重置按鈕 */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => setSettings({
                darkMode: false,
                backgroundStyle: 'gradient',
                primaryColor: 'blue',
                textSize: 'medium',
                borderRadius: 'medium',
                animations: true,
                compactMode: false
              })}
              className={`w-full p-3 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors ${
                settings.darkMode ? 'hover:bg-red-900 hover:bg-opacity-20' : ''
              }`}
            >
              重置為預設值
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile Page Component
  const ProfilePageContent = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className={`${getCardClasses()} p-6`}>
        <h2 className={`text-2xl font-bold mb-6 ${getTextClasses()}`}>Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className={`font-semibold mb-4 ${getTextClasses()}`}>Personal Details</h3>
            <div className="space-y-3">
              <div>
                <label className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full Name</label>
                <p className={`font-medium ${getTextClasses()}`}>{profileData.name}</p>
              </div>
              <div>
                <label className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location</label>
                <p className={`font-medium ${getTextClasses()}`}>{profileData.location}</p>
              </div>
              <div>
                <label className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Github</label>
                <a 
                  href={`${profileData.github}`}
                  className={`p-style font-medium ${getTextClasses()}`}
                >
                  {profileData.github}
                </a>
              </div>
              <div>
                <label className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</label>
                <a 
                  href={`mailto:${profileData.email}`}
                  className={`p-style font-medium ${getTextClasses()}`}
                >
                  {profileData.email}
                </a>
              </div>
              <div>
                <label className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</label>
                <a 
                  href={`tel:${profileData.phone}`}
                  className={`p-style font-medium ${getTextClasses()}`}
                >
                  {profileData.phone}
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className={`font-semibold mb-4 ${getTextClasses()}`}>Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={`${getTextClasses()}`}>Total Certificate</span>
                <span className={`font-medium ${getTextClasses()}`}>{profileData.certificate}</span>
              </div>
              <div className="flex justify-between">
                <span className={`${getTextClasses()}`}>Total Awards</span>
                <span className={`font-medium ${getTextClasses()}`}>{profileData.awards}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-medium ${getTextClasses()}`}>Total Projects</span>
                <span className={`font-medium ${getTextClasses()}`}>{profileData.projects}</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setCurrentPage('main')}
          className={`mt-6 px-4 py-2 rounded-lg ${settings.darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-800'} ${settings.animations ? 'transition-colors' : ''}`}
        >
          Back to Main
        </button>
      </div>
    </div>
  );

  // Education Achievements Page
  const EducationAchievementsPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className={`${getCardClasses()} p-6`}>
        <h2 className={`text-2xl font-bold mb-6 ${getTextClasses()}`}>Education & Achievements</h2>
        <div className="space-y-6">
          {allItems.filter(item => item.type === 'education' || item.type === 'certificate' || item.type === 'award').map(item => (
            <div key={item.id} className={`border-l-4 ${getPrimaryColorClasses().split(' ')[0].replace('text-', 'border-')} pl-4`}>
              <div className="flex items-center space-x-3 mb-2">
                {item.icon}
                <h3 className={`font-semibold text-lg ${getTextClasses()}`}>{item.title}</h3>
              </div>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{item.subtitle}</p>
              <p className={`text-sm ${settings.darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{item.date}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setCurrentPage('main')}
          className={`mt-6 px-4 py-2 rounded-lg ${settings.darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-800'} ${settings.animations ? 'transition-colors' : ''}`}
        >
          Back to Main
        </button>
      </div>
    </div>
  );

  // Projects Page
  const ProjectsPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className={`${getCardClasses()} p-6`}>
        <h2 className={`text-2xl font-bold mb-6 ${getTextClasses()}`}>My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allItems.filter(item => item.type === 'project').map(item => (
            <div key={item.id} className={`${getCardClasses()} p-4 hover:shadow-md transition-shadow`}>
              <div className="flex items-center space-x-3 mb-3">
                {item.icon}
                <h3 className={`font-semibold ${getTextClasses()}`}>{item.title}</h3>
              </div>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3`}>{item.subtitle}</p>
              <a href={`${item.githublink ? item.githublink : ""}`} className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} ${item.githublink ? "" : "disabled-link"} text-sm mb-3`}>{item.githublink ? "Github" : "No Github"}</a>
              <div className={`flex justify-between items-center text-sm ${settings.darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                <span>{item.meta}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setCurrentPage('main')}
          className={`mt-6 px-4 py-2 rounded-lg ${settings.darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-800'} ${settings.animations ? 'transition-colors' : ''}`}
        >
          Back to Main
        </button>
      </div>
    </div>
  );

  // Main Content
  const MainContent = () => (
    <>
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-amber-100 to-orange-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">📚</div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="flex flex-col items-center -mt-16">
            <div className={`myPicture w-32 h-32 ${settings.darkMode ? 'bg-gray-700' : 'bg-gray-600'} rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg`}></div>
        
            <h1 className={`text-3xl font-bold mb-2 ${getTextClasses()}`}>{profileData.name}</h1>
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>{profileData.location}</p>
            
            <div className="flex space-x-12 mb-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getTextClasses()}`}>{profileData.certificate}</div>
                <div className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Certificate</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getTextClasses()}`}>{profileData.awards}</div>
                <div className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Awards</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getTextClasses()}`}>{profileData.projects}</div>
                <div className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects</div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => {window.location.href=`tel:${profileData.phone}`;}}
                className={`px-6 py-2 rounded-lg flex items-center ${settings.darkMode ? `bg-${settings.primaryColor}-600 text-white hover:bg-${settings.primaryColor}-700` : 'bg-black text-white hover:bg-gray-800'} ${settings.animations ? 'transition-colors' : ''}`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Connect
              </button>
              <button 
                onClick={() => {window.location.href=`mailto:${profileData.email}`;}}
                className={`px-6 py-2 rounded-lg flex items-center ${settings.darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} ${settings.animations ? 'transition-colors' : ''}`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      {/* 分類條的暗色模式和置中對齊 */}
      <div id="navigation-tabs" className={`max-w-4xl mx-auto px-4 mt-8 sticky top-0 z-40 py-2 ${settings.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="relative flex justify-center"> {/* 新增 flex justify-center 實現置中 */}
          <div id="tabs-container" className="overflow-x-auto scrollbar-hide scroll-smooth">
            <div className={`flex border-b min-w-max rounded-t-lg shadow-sm ${settings.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  data-tab={tab}
                  onClick={() => handleTabChange(tab)}
                  // 增加過渡動畫
                  className={`px-4 sm:px-6 py-3 font-medium text-sm whitespace-nowrap transition-all duration-300 ease-in-out ${
                    activeTab === tab 
                      ? `text-${settings.primaryColor}-600 border-b-2 border-${settings.primaryColor}-600 transform scale-105 ${settings.darkMode ? `bg-${settings.primaryColor}-900 bg-opacity-20` : `bg-${settings.primaryColor}-50`}` 
                      : `${settings.darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'} hover:transform hover:scale-105`
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          {/* 滑動提示 - 僅在小螢幕顯示 */}
          <div className={`sm:hidden absolute right-0 top-2 bottom-2 w-8 pointer-events-none rounded-r-lg ${settings.darkMode ? 'bg-gradient-to-l from-gray-900 via-gray-900 to-transparent' : 'bg-gradient-to-l from-white via-white to-transparent'}`}></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className={`space-y-6 flex flex-col items-center transition-all duration-300 ${
          isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          {/* 僅顯示部分卡片 */}
          {filteredItems.slice(0, visibleItemsCount).map(item => (
            <div 
              key={item.id} 
              id={`item-${item.id}`}
              className={`${getCardClasses()} overflow-hidden w-full max-w-3xl transition-all duration-300 hover:shadow-md ${
                focusedItem === item.id ? `ring-2 ring-${settings.primaryColor}-500 shadow-lg` : ''
              }`}
            >
              <div 
                className={`p-6 cursor-pointer transition-all duration-200 ${settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => selectCard(item.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 ${settings.darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {item.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-semibold transition-colors duration-200 ${getTextClasses()}`}>{item.title}</h3>
                      <div className={`flex items-center ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="text-xs transition-transform duration-200 hover:scale-110">{item.like ? "❤️" : "🩶"}</span>
                      </div>
                    </div>
                    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{item.subtitle}</p>
                    
                    <div className={`flex items-center justify-between mt-4 text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>{item.meta}</span>
                      <span>Edit: {item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Detailed Information */}
              <div className={`border-t transition-all duration-500 ease-in-out ${settings.darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'} ${
                selectedItem === item.id 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="p-6 transform transition-transform duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="transform transition-all duration-300 delay-100">
                      <h4 className={`font-semibold mb-3 ${getTextClasses()}`}>Details</h4>
                      <div className="space-y-2">
                        {Object.entries(item.details).map(([key, value], index) => (
                          <div key={key} className={`flex flex-col transition-all duration-300 delay-${(index + 1) * 100}`}>
                            <span className={`text-xs uppercase tracking-wide ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
                            <span className={`text-sm ${getTextClasses()}`}>
                              {Array.isArray(value) ? value.join(', ') : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="transform transition-all duration-300 delay-200">
                      <h4 className={`font-semibold mb-3 ${getTextClasses()}`}>Actions</h4>
                      <div className="space-y-2">
                        <button 
                          onClick={() => {window.location.href=`${item.moredetail}`;}}
                          disabled={item.moredetail ? false : true}
                          className={`w-full text-left px-4 py-2 text-sm ${item.moredetail ? 'hover:translate-x-1 ' + (settings.darkMode ? 'text-blue-400 hover:bg-blue-900 hover:bg-opacity-20' : 'text-blue-600 hover:bg-blue-50') : (settings.darkMode ? 'text-gray-300' : 'text-gray-600')} rounded-lg transition-all duration-200`}
                        >
                          View Full Details
                        </button>
                        <button 
                          onClick={() => {window.location.href=`${item.certificate}`;}}
                          disabled={item.certificate ? false : true}
                          className={`w-full text-left px-4 py-2 text-sm ${item.certificate ? 'hover:translate-x-1 ' + (settings.darkMode ? 'text-blue-400 hover:bg-blue-900 hover:bg-opacity-20' : 'text-blue-600 hover:bg-blue-50') : (settings.darkMode ? 'text-gray-300' : 'text-gray-600')} rounded-lg transition-all duration-200`}
                        >
                          View Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button - 僅在有更多卡片可加載時顯示 */}
        {visibleItemsCount < filteredItems.length && (
          <div className="text-center mt-8">
            <button 
              onClick={handleLoadMore}
              className={`px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${settings.darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className={`min-h-screen ${getBackgroundStyle()} ${settings.animations ? 'transition-all duration-500' : ''}`}>
      {/* 背景圖案 */}
      {settings.backgroundStyle === 'pattern' && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
      )}
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
        .myPicture {
          background-image: url(${MyPicture});
          background-size: cover;
        }
        .PCSH {
          background-image: url(${PCSH});
          background-size: cover;
        }
        .NTUST {
          background-image: url(${NTUST});
          background-size: cover;
        }
        .TQCPython {
          background-image: url(${TQCPython});
          background-size: cover;
        }
        .TOEIC {
          background-image: url(${TOEIC});
          background-size: cover;
        }
        .APCS {
          background-image: url(${APCS});
          background-size: cover;
        }
        .save-energy {
          background-image: url(${saveEnergy});
          background-size: cover;
        }
        .p-style {
          display: block;
        }
        .disabled-link {
          pointer-events: none;
        }
      `}</style>
      {/* Header */}
      <div className={`${getCardClasses()} shadow-sm border-b`}>
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-1 min-w-0">
              <div className="relative flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
                <Search className={`w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input 
                  type="text" 
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 w-full text-sm border ${
                    settings.darkMode 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } ${
                    settings.borderRadius === 'small' ? 'rounded' : 
                    settings.borderRadius === 'medium' ? 'rounded-lg' : 'rounded-xl'
                  } focus:outline-none focus:ring-2 focus:ring-${settings.primaryColor}-500`}
                />
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className={`absolute top-full left-0 right-0 ${getCardClasses()} border mt-1 shadow-lg z-50 max-h-64 overflow-y-auto`}>
                    {searchResults.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleSearchSelect(item)}
                        className={`w-full text-left p-3 hover:${settings.darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${settings.darkMode ? 'border-gray-600' : 'border-gray-100'} last:border-b-0 flex items-center space-x-3 ${settings.animations ? 'transition-colors' : ''}`}
                      >
                        <div className="flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <div className={`font-medium text-sm ${getTextClasses()}`}>{item.title}</div>
                          <div className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.subtitle}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-3 ml-2 sm:ml-4">
              <button 
                onClick={() => setCurrentPage('profile')}
                className={`hover:${settings.darkMode ? 'text-gray-300' : 'text-gray-900'} text-xs sm:text-sm whitespace-nowrap px-2 py-1 ${
                  currentPage === 'profile' ? `text-${settings.primaryColor}-600 font-medium` : settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                } ${settings.animations ? 'transition-colors' : ''}`}
              >
                Profile
              </button>
              <button 
                onClick={() => setCurrentPage('education')}
                className={`hover:${settings.darkMode ? 'text-gray-300' : 'text-gray-900'} text-xs sm:text-sm whitespace-nowrap px-2 py-1 ${
                  currentPage === 'education' ? `text-${settings.primaryColor}-600 font-medium` : settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                } ${settings.animations ? 'transition-colors' : ''}`}
              >
                <span className="hidden sm:inline">Education</span>
                <span className="sm:hidden">Edu</span>
              </button>
              <button 
                onClick={() => setCurrentPage('projects')}
                className={`hover:${settings.darkMode ? 'text-gray-300' : 'text-gray-900'} text-xs sm:text-sm whitespace-nowrap px-2 py-1 ${
                  currentPage === 'projects' ? `text-${settings.primaryColor}-600 font-medium` : settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                } ${settings.animations ? 'transition-colors' : ''}`}
              >
                Projects
              </button>
              <button 
                onClick={() => setShowModal('settings')}
                className={`bg-${settings.primaryColor}-600 text-white px-2 py-1 sm:px-3 sm:py-2 ${
                  settings.borderRadius === 'small' ? 'rounded' : 
                  settings.borderRadius === 'medium' ? 'rounded-lg' : 'rounded-xl'
                } hover:bg-${settings.primaryColor}-700 text-xs sm:text-sm ${settings.animations ? 'transition-all hover:scale-105' : ''}`}
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => setCurrentPage('main')}
                className={`myPicture w-6 h-6 sm:w-8 sm:h-8 bg-${settings.primaryColor}-500 ${
                  settings.borderRadius === 'small' ? 'rounded' : 
                  settings.borderRadius === 'medium' ? 'rounded-full' : 'rounded-full'
                } flex items-center justify-center`}
              ></button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {currentPage === 'main' && <MainContent />}
      {currentPage === 'profile' && <ProfilePageContent />}
      {currentPage === 'education' && <EducationAchievementsPage />}
      {currentPage === 'projects' && <ProjectsPage />}

      {/* Modals */}
      {showModal === 'settings' && <SettingsModal />}
    </div>
  );
};

export default ProfilePage;

// Fogwall - Server Status Script
// Based on your working API endpoint

const API_URL = 'https://little-mouse-9ca4.pravo669719.workers.dev/?NETWORK=1&CMD=4&time=1';
const REFRESH_INTERVAL = 10000; // 10 seconds

// DOM Elements
const serverGrid = document.getElementById('serverGrid');
const totalServersEl = document.getElementById('totalServers');
const onlineServersEl = document.getElementById('onlineServers');
const totalPlayersEl = document.getElementById('totalPlayers');
const lastUpdatedEl = document.getElementById('lastUpdated');
const refreshBtn = document.getElementById('refreshBtn');
const retryBtn = document.getElementById('retryBtn');
const errorState = document.getElementById('errorState');

let isFetching = false;
let servers = [];
let intervalId = null;
let countdown = 10;

// === Mapping from your working code ===
const modeMapping = {
    '0': 'Битва', '2': 'Стройка', '3': 'Зомби', '5': 'Контра',
    '6': 'Резня', '7': 'Выживание', '8': '1945-й', '12': 'Снежки', '14': 'Гангейм'
};

const mapMapping = {
    '1': 'Цитадель', '2': 'Замок', '3': 'Форпост 2', '4': 'Осада',
    '5': 'Деревня 2', '6': 'Острова', '7': 'Собор 2', '8': 'Город',
    '9': 'Слизняк', '10': 'Форпост 3', '11': 'Припять', '12': 'Энергетик',
    '13': 'Клазмос', '14': 'Острова 2017', '15': 'Эпик', '16': 'Башни',
    '17': 'Пристань', '18': 'Зимний лес', '19': 'Общежитие', '20': 'Зимний замок',
    '21': 'Порт', '22': 'Крепость', '23': 'Вышка', '24': 'Япония',
    '25': 'Подземка', '26': 'Секретная база', '27': 'Канализация', '28': 'Парк',
    '29': 'Техно', '30': 'Сити-17', '31': 'Водоворот', '32': 'Сибирь',
    '34': 'Корона', '35': 'Бункер', '36': 'Арена 26', '37': 'Депо',
    '38': 'Убежище', '39': 'Оплот', '40': 'Мясорубка', '42': 'Марс',
    '44': 'Зимний рубеж', '45': 'Заброшенный замок', '46': 'Необитаемый остров',
    '47': 'Бресткая крепость',
    '301': 'Деревня-Z 2', '302': 'Дом', '303': 'Лабиринт', '304': 'Мельница',
    '305': 'Ракета', '306': 'Кладбище', '307': 'Госпиталь', '308': 'Психушка',
    '309': 'Кровавая долина', '310': 'Тихое место', '311': 'Лаборатория',
    '312': 'Карьер', '313': 'Бункер',
    '501': 'Даст 2', '502': 'Инферно', '503': 'Трейн', '504': 'Ацтек',
    '505': 'Нюк', '506': 'ОФИС', '507': 'Кланмил', '508': 'Даст 1',
    '509': 'Меншен', '510': 'Флай 2', '511': 'Ацтеки', '512': 'Даст 2002',
    '513': 'Минидаст', '514': 'Бассейн', '515': 'Перекрёсток', '516': 'Кэш',
    '517': 'База в пустыне', '518': 'Станция', '519': 'Пыль', '520': 'Моно',
    '521': 'Муравейник', '522': 'Убежище 2', '523': 'Лаборатория', '524': 'Квартал',
    '525': 'Индия', '526': 'Минидаст 2', '527': 'Кобл', '528': 'Рэд',
    '529': 'Ацтериал', '530': 'Фабрика', '531': 'Склады', '532': 'Асцент',
    '533': 'КБН', '534': 'Элдери', '535': 'Ассаулт', '536': 'Пригород',
    '537': 'Даст 2 СМ', '538': 'Шторм', '539': 'Ангар', '540': 'Руины',
    '541': 'Закаулок', '542': 'Мираж', '543': 'Трейн СМ',
    '544': 'Турнирная контра', '545': 'Трущобы', '546': 'Мидтаун',
    '547': 'Милитех', '548': 'Нюк 2', '549': 'Моно 2', '550': 'Бассейн 2',
    '551': 'Меншен 2', '552': 'Берн', '553': 'Оазис', '554': 'Санаторий',
    '555': 'Итали', '556': 'Развязка', '557': 'Х-Станция', '558': 'Башни',
    '560': 'Промтаун', '561': 'Окопы', '562': 'Тренировочная',
    '563': 'Деловой центр', '565': 'Вокзал', '566': 'Куба', '567': 'Химлаб',
    '568': 'Грань', '569': 'Локо', '571': 'Станция 2', '572': 'Река',
    '601': 'Стайл', '602': 'Арена 50', '603': 'Арена 35', '604': 'Миниацтек',
    '605': 'Корабль', '606': 'Напрямик', '607': 'Маска', '608': 'Эпицентр',
    '609': 'Ангар 2', '610': 'Два моста', '611': 'Празднество', '613': 'Маска',
    '614': 'Праздничная комната', '615': 'Праздничное настроение', '616': 'Кубы',
    '617': 'Снежный город', '618': 'Мост', '619': 'Вафельница', '621': 'Меншен',
    '622': 'Минидаст', '623': 'Бассейн', '624': 'Перекрёсток', '626': 'Пыль',
    '627': 'Лаборатория', '628': 'Индия', '630': 'Склады', '631': 'Оверлорд',
    '632': 'Платформы', '633': 'Стилпоинт',
    '701': 'Пляж', '702': 'Оборона', '704': 'Селение', '705': 'Форт',
    '707': 'Заброшенный город', '708': 'Гиблый хутор', '709': 'Оборона 2',
    '710': 'Шапито', '711': 'Магистраль', '712': 'Нашествие', '713': 'Заправка',
    '802': 'Окружение',
    '1401': 'Пасфайнд', '1402': 'Скретч', '1403': 'Ангар', '1404': 'Высотка',
    '1405': 'Перекрёсток 2', '1406': 'Хоринесс', '1407': 'Дюссельдорф',
    '1408': 'Арабика', '1409': 'Звездолёт', '1410': 'Австрия',
    '1411': 'Индастриал', '1412': 'Церковь', '1413': 'Дайр',
    '1414': 'Карта 1414', '1415': 'Карта 1415'
};

// === Helper Functions ===
function getStatusClass(players) {
    return players > 0 ? 'online' : 'offline';
}

function getStatusText(players) {
    return players > 0 ? 'Online' : 'Offline';
}

function escapeHtml(text) {
    if (!text) return '—';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

// === Parse Data (from your working code) ===
function parseServers(responseText) {
    return responseText
        .split('^')
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => line.split('|'))
        .map(parts => ({
            network: parts[0],
            modeId: parts[1],
            ip: parts[2],
            port: parts[3],
            players: Number(parts[4] || 0),
            maxPlayers: Number(parts[5] || 0),
            mapId: parts[6]
        }))
        .filter(server => server.players > 0)
        .sort((a, b) => b.players - a.players);
}

// === Render ===
function renderServers(servers) {
    if (!servers || servers.length === 0) {
        serverGrid.innerHTML = `
            <div class="empty-state">
                <div style="font-size:48px;margin-bottom:12px;">🌫️</div>
                <h3 style="color:var(--text-primary);">No servers online</h3>
                <p>Players are resting... try again later.</p>
            </div>
        `;
        return;
    }

    let html = '';
    for (const server of servers) {
        const name = server.name || mapMapping[server.mapId] || `Карта ${server.mapId}`;
        const statusClass = getStatusClass(server.players);
        const statusText = getStatusText(server.players);
        const mapName = mapMapping[server.mapId] || `Карта ${server.mapId}`;
        const gameMode = modeMapping[server.modeId] || `Режим ${server.modeId}`;
        const playerDisplay = `${server.players} / ${server.maxPlayers}`;
        const playerPercent = server.maxPlayers > 0 
            ? Math.round((server.players / server.maxPlayers) * 100) 
            : 0;
        const isPopular = playerPercent > 60;

        html += `
            <div class="server-card">
                <div class="server-top">
                    <div>
                        <div class="server-name">${escapeHtml(mapName)}</div>
                        <div class="server-status">
                            <span class="status-dot ${statusClass}"></span>
                            <span class="status-badge ${statusClass}">${statusText}</span>
                        </div>
                    </div>
                    ${isPopular ? '<span style="font-size:20px;">🔥</span>' : ''}
                </div>
                <div class="server-details">
                    <div class="server-detail-item">
                        <span class="label">🗺️</span>
                        <span class="value">${escapeHtml(mapName)}</span>
                    </div>
                    <div class="server-detail-item">
                        <span class="label">🎮</span>
                        <span class="value">${escapeHtml(gameMode)}</span>
                    </div>
                    <div class="server-detail-item server-players" style="grid-column: 1 / -1;">
                        <span>👥</span>
                        <span class="player-count">${playerDisplay}</span>
                        <span style="color:var(--text-muted);font-weight:400;font-size:13px;">
                            (${playerPercent}%)
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    serverGrid.innerHTML = html;
}

// === Stats ===
function updateStats(servers) {
    const total = servers.length;
    const online = servers.filter(s => s.players > 0).length;
    const players = servers.reduce((sum, s) => sum + s.players, 0);

    totalServersEl.textContent = total;
    onlineServersEl.textContent = online;
    onlineServersEl.style.color = online > 0 ? 'var(--green)' : 'var(--text-muted)';
    totalPlayersEl.textContent = players;
}

// === Fetch Data ===
async function fetchServers() {
    if (isFetching) return;
    isFetching = true;

    refreshBtn.classList.add('loading');
    errorState.classList.add('hidden');

    try {
        const url = `${API_URL}&cache=${Date.now()}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();
        
        if (!text || !text.includes('|')) {
            throw new Error('Invalid response format');
        }

        servers = parseServers(text);
        renderServers(servers);
        updateStats(servers);
        lastUpdatedEl.textContent = `Updated ${formatTime()}`;
        errorState.classList.add('hidden');

    } catch (error) {
        console.error('Fogwall fetch error:', error);
        errorState.classList.remove('hidden');
        serverGrid.innerHTML = '';
        totalServersEl.textContent = '—';
        onlineServersEl.textContent = '—';
        totalPlayersEl.textContent = '—';
    } finally {
        isFetching = false;
        refreshBtn.classList.remove('loading');
    }
}

// === Auto Refresh ===
function startAutoRefresh() {
    if (intervalId) {
        clearInterval(intervalId);
    }

    // Initial fetch
    fetchServers();

    // Set up interval
    intervalId = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            countdown = REFRESH_INTERVAL / 1000;
            fetchServers();
        }
    }, 1000);
}

// === Init ===
function init() {
    startAutoRefresh();

    // Refresh button
    refreshBtn.addEventListener('click', () => {
        countdown = REFRESH_INTERVAL / 1000;
        fetchServers();
    });

    // Retry button
    retryBtn.addEventListener('click', () => {
        countdown = REFRESH_INTERVAL / 1000;
        fetchServers();
    });

    // Refresh on visibility change
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            fetchServers();
        }
    });
}

// Start when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

console.log('🌫️ Fogwall initialized');
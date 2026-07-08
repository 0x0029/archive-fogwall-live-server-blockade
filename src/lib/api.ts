/*
  Fogwall API integration.
  Fetches Blockade3D server data, parses the pipe/caret-delimited format,
  maps IDs to human-readable names, and caches responses.
*/

export const API_URL =
  "https://little-mouse-9ca4.pravo669719.workers.dev/?NETWORK=1&CMD=4&time=1"

export const CACHE_TTL_MS = 30_000

export const mapMapping: Record<string, string> = {
  "1": "Цитадель",
  "2": "Замок",
  "3": "Форпост 2",
  "4": "Осада",
  "5": "Деревня 2",
  "6": "Острова",
  "7": "Собор 2",
  "8": "Город",
  "9": "Слизняк",
  "10": "Форпост 3",
  "11": "Припять",
  "12": "Энергетик",
  "13": "Клазмос",
  "14": "Острова 2017",
  "15": "Эпик",
  "16": "Башни",
  "17": "Пристань",
  "18": "Зимний лес",
  "19": "Общежитие",
  "20": "Зимний замок",
  "21": "Порт",
  "22": "Крепость",
  "23": "Вышка",
  "24": "Япония",
  "25": "Подземка",
  "26": "Секретная база",
  "27": "Канализация",
  "28": "Парк",
  "29": "Техно",
  "30": "Сити-17",
  "31": "Водоворот",
  "32": "Сибирь",
  "34": "Корона",
  "35": "Бункер",
  "36": "Арена 26",
  "37": "Депо",
  "38": "Убежище",
  "39": "Оплот",
  "40": "Мясорубка",
  "42": "Марс",
  "44": "Зимний рубеж",
  "45": "Заброшенный замок",
  "46": "Необитаемый остров",
  "47": "Бресткая крепость",
  "301": "Деревня-Z 2",
  "302": "Дом",
  "303": "Лабиринт",
  "304": "Мельница",
  "305": "Ракета",
  "306": "Кладбище",
  "307": "Госпиталь",
  "308": "Психушка",
  "309": "Кровавая долина",
  "310": "Тихое место",
  "311": "Лаборатория",
  "312": "Карьер",
  "313": "Бункер",
  "501": "Даст 2",
  "502": "Инферно",
  "503": "Трейн",
  "504": "Ацтек",
  "505": "Нюк",
  "506": "ОФИС",
  "507": "Кланмил",
  "508": "Даст 1",
  "509": "Меншен",
  "510": "Флай 2",
  "511": "Ацтеки",
  "512": "Даст 2002",
  "513": "Минидаст",
  "514": "Бассейн",
  "515": "Перекрёсток",
  "516": "Кэш",
  "517": "База в пустыне",
  "518": "Станция",
  "519": "Пыль",
  "520": "Моно",
  "521": "Муравейник",
  "522": "Убежище 2",
  "523": "Лаборатория",
  "524": "Квартал",
  "525": "Индия",
  "526": "Минидаст 2",
  "527": "Кобл",
  "528": "Рэд",
  "529": "Ацтериал",
  "530": "Фабрика",
  "531": "Склады",
  "532": "Асцент",
  "533": "КБН",
  "534": "Элдери",
  "535": "Ассаулт",
  "536": "Пригород",
  "537": "Даст 2 СМ",
  "538": "Шторм",
  "539": "Ангар",
  "540": "Руины",
  "541": "Закаулок",
  "542": "Мираж",
  "543": "Трейн СМ",
  "544": "Турнирная контра",
  "545": "Трущобы",
  "546": "Мидтаун",
  "547": "Милитех",
  "548": "Нюк 2",
  "549": "Моно 2",
  "550": "Бассейн 2",
  "551": "Меншен 2",
  "552": "Берн",
  "553": "Оазис",
  "554": "Санаторий",
  "555": "Итали",
  "556": "Развязка",
  "557": "Х-Станция",
  "558": "Башни",
  "560": "Промтаун",
  "561": "Окопы",
  "562": "Тренировочная",
  "563": "Деловой центр",
  "565": "Вокзал",
  "566": "Куба",
  "567": "Химлаб",
  "568": "Грань",
  "569": "Локо",
  "571": "Станция 2",
  "572": "Река",
  "601": "Стайл",
  "602": "Арена 50",
  "603": "Арена 35",
  "604": "Миниацтек",
  "605": "Корабль",
  "606": "Напрямик",
  "607": "Маска",
  "608": "Эпицентр",
  "609": "Ангар 2",
  "610": "Два моста",
  "611": "Празднество",
  "613": "Маска",
  "614": "Праздничная комната",
  "615": "Праздничное настроение",
  "616": "Кубы",
  "617": "Снежный город",
  "618": "Мост",
  "619": "Вафельница",
  "621": "Меншен",
  "622": "Минидаст",
  "623": "Бассейн",
  "624": "Перекрёсток",
  "626": "Пыль",
  "627": "Лаборатория",
  "628": "Индия",
  "630": "Склады",
  "631": "Оверлорд",
  "632": "Платформы",
  "633": "Стилпоинт",
  "701": "Пляж",
  "702": "Оборона",
  "704": "Селение",
  "705": "Форт",
  "707": "Заброшенный город",
  "708": "Гиблый хутор",
  "709": "Оборона 2",
  "710": "Шапито",
  "711": "Магистраль",
  "712": "Нашествие",
  "713": "Заправка",
  "802": "Окружение",
  "1401": "Пасфайнд",
  "1402": "Скретч",
  "1403": "Ангар",
  "1404": "Высотка",
  "1405": "Перекрёсток 2",
  "1406": "Хоринесс",
  "1407": "Дюссельдорф",
  "1408": "Арабика",
  "1409": "Звездолёт",
  "1410": "Австрия",
  "1411": "Индастриал",
  "1412": "Церковь",
  "1413": "Дайр",
  "1414": "Карта 1414",
  "1415": "Карта 1415",
}

export const modeMapping: Record<string, string> = {
  "0": "Битва",
  "2": "Стройка",
  "3": "Зомби",
  "5": "Контра",
  "6": "Резня",
  "7": "Выживание",
  "8": "1945-й",
  "12": "Снежки",
  "14": "Гангейм",
}

export interface ServerData {
  network: string
  modeId: string
  ip: string
  port: string
  players: number
  maxPlayers: number
  mapId: string
  mapName: string
  modeName: string
  isPopular: boolean
  fillPercent: number
}

export interface FetchResult {
  servers: ServerData[]
  fetchedAt: number
}

let cache: { data: FetchResult; timestamp: number } | null = null

export function parseServers(raw: string): ServerData[] {
  const entries = raw.split("^").filter((s) => s.trim().length > 0)
  const servers: ServerData[] = []

  for (const entry of entries) {
    const parts = entry.split("|")
    if (parts.length < 7) continue

    const network = parts[0]
    if (network !== "0") continue

    const players = parseInt(parts[4], 10)
    const maxPlayers = parseInt(parts[5], 10)
    if (isNaN(players) || isNaN(maxPlayers)) continue
    if (players <= 0) continue

    const mapId = parts[6]
    const modeId = parts[1]
    const fillPercent = maxPlayers > 0 ? (players / maxPlayers) * 100 : 0

    servers.push({
      network,
      modeId,
      ip: parts[2],
      port: parts[3],
      players,
      maxPlayers,
      mapId,
      mapName: mapMapping[mapId] ?? `Карта ${mapId}`,
      modeName: modeMapping[modeId] ?? `Режим ${modeId}`,
      isPopular: fillPercent > 60,
      fillPercent: Math.round(fillPercent),
    })
  }

  return servers
}

export async function fetchServers(force = false): Promise<FetchResult> {
  const now = Date.now()

  if (!force && cache && now - cache.timestamp < CACHE_TTL_MS) {
    return cache.data
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(API_URL, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    const text = await res.text()
    if (!text || text.trim().length === 0) {
      throw new Error("Empty response from server")
    }
    const servers = parseServers(text)
    const result: FetchResult = { servers, fetchedAt: now }
    cache = { data: result, timestamp: now }
    return result
  } finally {
    clearTimeout(timeout)
  }
}

export function clearCache() {
  cache = null
}

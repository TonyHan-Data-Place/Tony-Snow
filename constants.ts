import { ItineraryItem } from './types';

export const GROUP_MEMBERS = [
    "Tony Han", "Kevin Yang", "Derek Tu", "Jason Hu", "Peter", "Taco", "Ken Ko", "Tony Lin",
    "Kim Chen", "Ann", "Cindy Yao", "Irene Kuo", "Sophie", "Yian"
];

export const SKI_HOURS = {
    'Kamui': '09:00～16:00',
    'Pippu': '9:00 - 16:00 (夜滑 16:00 - 20:30)',
    'Asahidake': '9:00～15:40',
    'Furano': '8:30 AM - 4:00 PM (夜滑 4:00 PM - 6:00 PM)',
    'Tomamu': '8:45 – 16:00 (夜滑 16:00-18:00)'
};

export const ITINERARY_DATA: ItineraryItem[] = [
    {
        date: "12/26 (五)",
        title: "抵達北海道，入住旭川",
        details: "札幌機場 → 札幌購物(視情況採購雪具) → 旭川民宿。 (當天入住旭川)",
        accommodation: "旭川",
        important: "入住時間：下午 3 點後。衛浴共用，男生請坐著尿尿。",
        links: [
            { type: 'GMaps', label: '旭川民宿地址', url: 'https://maps.app.goo.gl/KDPCAm2G9ciPqe6a8' }
        ],
        isSkiDay: false
    },
    {
        date: "12/27 (六)",
        title: "神居滑雪場",
        details: `滑雪或自由活動。營業時間: ${SKI_HOURS['Kamui']}`,
        accommodation: "旭川",
        important: "包車出發！請提早集合。",
        isSkiDay: true
    },
    {
        date: "12/28 (日)",
        title: "神居/比布滑雪場",
        details: `滑雪或自由活動。神居時間: ${SKI_HOURS['Kamui']} / 比布時間: ${SKI_HOURS['Pippu']}`,
        accommodation: "旭川",
        isSkiDay: true
    },
    {
        date: "12/29 (一)",
        title: "旭川旅遊/觀光日",
        details: "自由活動或在周圍觀光。",
        accommodation: "旭川",
        isSkiDay: false
    },
    {
        date: "12/30 (二)",
        title: "神居滑雪場",
        details: `滑雪或自由活動。營業時間: ${SKI_HOURS['Kamui']}`,
        accommodation: "旭川",
        important: "早餐/晚餐原則上自理或超市採買回民宿煮食。",
        isSkiDay: true
    },
    {
        date: "12/31 (三)",
        title: "移動日：旭岳/轉往富良野",
        details: `旭岳大雪山滑雪場 (退房 10:00) → 富良野民宿。旭岳時間: ${SKI_HOURS['Asahidake']}`,
        accommodation: "富良野",
        important: "旭川退房 10:00，富良野入住 3 點後。包車移動，請準時。",
        isSkiDay: true
    },
    {
        date: "2026/1/1 (四)",
        title: "富良野旅遊/觀光日",
        details: "滑雪或在周圍觀光。",
        accommodation: "富良野",
        isSkiDay: false 
    },
    {
        date: "2026/1/2 (五)",
        title: "富良野滑雪場",
        details: `滑雪或自由活動。營業時間: ${SKI_HOURS['Furano']}`,
        accommodation: "富良野",
        isSkiDay: true
    },
    {
        date: "2026/1/3 (六)",
        title: "Tomamu (星野) 滑雪場",
        details: `遠征 Tomamu (當日來回)。營業時間: ${SKI_HOURS['Tomamu']}`,
        accommodation: "富良野",
        important: "包車出發，長途移動，請務必準時！",
        isSkiDay: true
    },
    {
        date: "2026/1/4 (日)",
        title: "Tomamu (星野) 滑雪場",
        details: `遠征 Tomamu (當日來回)。營業時間: ${SKI_HOURS['Tomamu']}`,
        accommodation: "富良野",
        isSkiDay: true
    },
    {
        date: "2026/1/5 (一)",
        title: "富良野滑雪場",
        details: `滑雪或自由活動。營業時間: ${SKI_HOURS['Furano']}`,
        accommodation: "富良野",
        isSkiDay: true
    },
    {
        date: "2026/1/6 (二)",
        title: "返程",
        details: "富良野退房 (10:00) → 札幌機場 → 桃園。 (解散回家)",
        accommodation: "解散回家",
        important: "富良野退房 10:00，確保行李上車。",
        isSkiDay: false
    },
];

export const INITIAL_CHECKLIST = [
    "護照、機票、錢包",
    "滑雪衣褲 (雪衣可租借，但自備較省)",
    "中層保暖衣物 (不建議穿發熱衣)",
    "排汗底層衣 (建議兩套)",
    "毛帽、手套、內層手套",
    "護目鏡/雪鏡 (可防止臉部凍傷，建議有長簷帽沿)",
    "雪鞋/雪板 (基本款可租借，或自備)",
    "安全帽/護具 (建議配戴)",
    "旅遊保險 (必須)",
    "藥品、個人用品",
    "駕照日文譯本 (Kevin Yang 務必攜帶)",
    "民宿食物採買清單"
];
// api/tools.js — find_spots 도구 + Claude 도구 설명
// 데이터: area · indoor · desc · lat/lon 이 들어 있는 5일차 jeju_spots.json (day3 의 같은 이름 파일은 구조가 다름)

const DATA = require('../../5일차/jeju_spots.json');
const SPOTS = DATA.spots;
const AREA_NAMES = Object.keys(DATA.areas);                 // 동쪽 · 서쪽 · 서귀포 · 제주시
const MAX_SPOTS = 8;

// ── 도구: 관광지 찾기 (좌표는 화면용이라 뺀다) ──
function find_spots({ area, indoor } = {}) {
  let list = SPOTS.filter(s => s.area === area);
  if (indoor === true || indoor === false) list = list.filter(s => s.indoor === indoor);
  return {
    area,
    count: list.length,
    spots: list.slice(0, MAX_SPOTS).map(s => ({ name: s.name, area: s.area, indoor: s.indoor, desc: s.desc })),
  };
}

// ── Claude 도구 설명 ──
const find_spots_tool = {
  name: 'find_spots',
  description: '제주 관광지 목록에서 지역(그리고 실내/야외)으로 장소를 찾아 이름 · 지역 · 실내 여부 · 설명을 최대 8곳 돌려준다. 목록 밖 장소는 없다.',
  input_schema: {
    type: 'object',
    properties: {
      area: { type: 'string', enum: AREA_NAMES, description: '찾을 지역' },
      indoor: { type: 'boolean', description: '실내만 true, 야외만 false, 둘 다면 생략' },
    },
    required: ['area'],
  },
};

module.exports = { find_spots, find_spots_tool, TOOLS: [find_spots_tool] };

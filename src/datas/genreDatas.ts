import { Genre } from 'types/datas/activeHash';

// HotPepper グルメAPI のジャンルに 1:1 対応（バックエンドの master/genre.go と一致させる）
export const genreDatas: Genre[] = [
  { id: 1, name: '居酒屋' }, { id: 2, name: 'ダイニングバー・バル' }, { id: 3, name: 'カフェ・スイーツ' },
  { id: 4, name: '和食' }, { id: 5, name: '洋食' }, { id: 6, name: 'イタリアン・フレンチ' },
  { id: 7, name: '中華' }, { id: 8, name: '焼肉・ホルモン' }, { id: 9, name: 'ラーメン' },
  { id: 10, name: 'アジア・エスニック料理' }, { id: 11, name: '韓国料理' }, { id: 12, name: 'バー・カクテル' }
];
import { DateSpotData } from 'types/dateSpots/response';

// Go バックエンドの一覧レスポンス（DateSpotSummaryData）は
// name / image / genreId をネストした date_spot（camelize 後は dateSpot）の中に持つ。
// React は DateSpotData をフラットに扱うため、ここでトップレベルへ展開する。
type DateSpotSummary = DateSpotData & {
  dateSpot?: {
    name?: string,
    image?: { url: string | null },
    genreId?: number,
  },
};

export const toFlatDateSpot = (summary: DateSpotSummary): DateSpotData => ({
  ...summary,
  name: summary.dateSpot?.name ?? summary.name ?? '',
  image: summary.dateSpot?.image ?? summary.image ?? { url: null },
  genreId: summary.dateSpot?.genreId ?? summary.genreId ?? 0,
});

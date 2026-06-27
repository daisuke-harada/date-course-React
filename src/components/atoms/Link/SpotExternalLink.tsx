import { FC, memo } from 'react';

import { DateSpotData } from 'types/dateSpots/response';
import tw from 'tailwind-styled-components';

type Props = {
  dateSpot: DateSpotData,
};

const LinkButton = tw.span`
  inline-flex items-center justify-center gap-1
  px-4 py-2 rounded-full font-bold text-white
  bg-red-500 hover:bg-red-600 shadow-md hover:shadow-none
  transition duration-150
`;

// スポットの出典ページ（HotPepper 店舗ページ等）への外部リンク。
// 実在店の正確な情報・口コミは本家へ誘導する。
export const SpotExternalLink: FC<Props> = memo((props) => {
  const { dateSpot } = props;

  if (!dateSpot.mapsUrl) return null;

  const label = dateSpot.source === 'hotpepper' ? 'HotPepperで見る' : '地図で見る';

  return (
    <a href={dateSpot.mapsUrl} target='_blank' rel='noopener noreferrer'>
      <LinkButton>
        🔗 {label}
      </LinkButton>
    </a>
  );
});

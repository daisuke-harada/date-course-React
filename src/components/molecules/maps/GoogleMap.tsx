import { memo, useState, FC } from 'react';
import { AdvancedMarker, Pin, Map, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { DateSpotData } from 'types/dateSpots/response';

type Props = {
  dateSpot: DateSpotData
};

type Center = {
  lat: number,
  lng: number,
}

export const GoogleMap: FC<Props> = memo((props) => {
  const { dateSpot } = props;
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const center: Center = {
    lat: dateSpot.latitude,
    lng: dateSpot.longitude,
  };

  return (
    <Map
      mapId={String(dateSpot.id)}
      defaultZoom={20}
      defaultCenter={center}
      gestureHandling={'greedy'}
      disableDefaultUI
    >
      <AdvancedMarker
        ref={markerRef}
        position={center}
        title={'AdvancedMarker with customized pin.'}
        clickable={true}
        onClick={() => setInfowindowOpen(!infowindowOpen)}
      >
        <Pin
          background={'rgb(244, 114, 182)'}
          borderColor={'rgb(248 113 113)'}
          glyphColor={'rgb(239 68 68)'}>
        </Pin>
      </AdvancedMarker>
      {  infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={300}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          {dateSpot.cityName}
        </InfoWindow>
      )}
    </Map>
  );
});

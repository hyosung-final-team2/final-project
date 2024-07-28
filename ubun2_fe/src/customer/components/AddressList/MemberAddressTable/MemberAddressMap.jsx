import React from 'react';
import { useKakaoLoader, Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useKakaoAddressSearch } from '../../../api/Address/AddressModal/kakaoAddressSearch';

const MemberAddressMap = ({ address }) => {
  const APIKEY = import.meta.env.VITE_KAKAO_API_KEY;
  const [loading, error] = useKakaoLoader({
    appkey: APIKEY,
  });

  const [zipNo, ...rest] = address?.split(',');
  const query = rest.join(' ');

  const { data, isLoading: isAddressLoading, error: addressError } = useKakaoAddressSearch(query);

  if (loading || isAddressLoading) return <div>Loading...</div>;
  if (error || addressError) return <div>Error loading map or address data...</div>;

  if (!data || !data.documents || data.documents.length === 0) {
    return <div>No address data found</div>;
  }

  const { y, x } = data?.documents[0];

  return (
    <>
      <div className='relative'>
        <div className='text-lg font-semibold w-full text-custom-font-gray bg-custom-input-gray p-3 pl-4 rounded-lg rounded-b-none shadow'>{`${query} (${zipNo})`}</div>
        <Map center={{ lat: parseFloat(y), lng: parseFloat(x) }} level={4} style={{ width: '100%', height: '360px' }} className='rounded-lg rounded-t-none'>
          <MapMarker position={{ lat: parseFloat(y), lng: parseFloat(x) }} />
        </Map>
      </div>
    </>
  );
};

export default MemberAddressMap;

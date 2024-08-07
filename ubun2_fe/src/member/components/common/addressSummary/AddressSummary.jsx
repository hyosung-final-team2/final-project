import { InformationCircleIcon } from '@heroicons/react/24/outline';

const AddressSummary = ({ data }) => {
  // 수정된 정규식
  const addressRegex = /^(.*(?:로|길)\s*\d+(?:-\d+)?(?:\s*\d*)?)\s+(.+)$/;

  const separateAddress = fullAddress => {
    if (!fullAddress) return { roadAddress: '', detailAddress: '' };
    const match = fullAddress.match(addressRegex);
    if (match) {
      return {
        roadAddress: match[1].trim(),
        detailAddress: match[2].trim(),
      };
    }
    return { roadAddress: fullAddress, detailAddress: '' };
  };

  // data가 없을 경우 early return
  if (!data) {
    return <div className='p-4 bg-gray-100 rounded-3xl'>데이터를 불러오는 중...</div>;
  }

  const [zipNo, ...rest] = data.address?.split(',') ?? [];
  const refinedAddress = rest.join(' ').trim();

  const { roadAddress, detailAddress } = separateAddress(refinedAddress);
  const completeAddress = `${zipNo ?? ''} ${roadAddress} ${detailAddress}`.trim();

  return (
    <div className='flex flex-col gap-3 p-4 py-8 mb-4 bg-white rounded-3xl'>
      <h2 className='mb-2 text-lg font-semibold'>
        <span className='text-xl text-gray-600'>{`${data.memberName ?? ''} `}</span>
        님의 배송지 정보
      </h2>
      <p className='font-semibold'>{data.addressNickname ?? ''}</p>
      <p className='text-sm text-gray-600'>{completeAddress}</p>
      <p className='text-sm text-gray-600'>{data.memberPhone ?? ''}</p>
      <div className='flex gap-3 '>
        <InformationCircleIcon className='w-5' />
        <p className='text-sm text-gray-500'>배송지 변경을 원하시면 결제취소 후 다시 주문해주세요</p>
      </div>
    </div>
  );
};

export default AddressSummary;

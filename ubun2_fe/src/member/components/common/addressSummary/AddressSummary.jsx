import { InformationCircleIcon } from '@heroicons/react/24/outline';

const AddressSummary = ({ data }) => {
  // 수정된 정규식
  const addressRegex = /^(.*(?:로|길)\s*\d+(?:-\d+)?(?:\s*\d*)?)\s+(.+)$/;

  const separateAddress = fullAddress => {
    const match = fullAddress.match(addressRegex);
    if (match) {
      return {
        roadAddress: match[1].trim(),
        detailAddress: match[2].trim(),
      };
    }
    return { roadAddress: fullAddress, detailAddress: '' };
  };

  const [zipNo, ...rest] = data.address.split(',');
  const refinedAddress = rest.join(' ').trim();

  const { roadAddress, detailAddress } = separateAddress(refinedAddress || '');
  const completeAddress = `${zipNo} ${roadAddress} ${detailAddress}`;

  return (
    <div className='flex flex-col gap-3 p-4 py-8 mb-4 bg-white rounded-3xl'>
      <h2 className='mb-2 text-lg font-semibold'>
        <span className='text-xl text-gray-600'>{`${data?.memberName} `}</span>
        님의 배송지 정보
      </h2>
      <p className='font-semibold'>{data?.addressNickname}</p>
      <p className='text-sm text-gray-600'>{completeAddress}</p>
      <p className='text-sm text-gray-600'>{data?.memberPhone}</p>
      <div className='flex gap-3 '>
        <InformationCircleIcon className='w-5' />
        <p className='text-sm text-gray-500'>배송지 변경을 원하시면 결제취소 후 다시 주문해주세요</p>
      </div>
    </div>
  );
};

export default AddressSummary;

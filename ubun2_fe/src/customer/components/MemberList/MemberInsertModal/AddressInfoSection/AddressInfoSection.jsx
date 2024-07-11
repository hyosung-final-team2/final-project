import MemberAddressTable from './MemberAddressTable.jsx'
import AddressInput from '../../../common/Input/AddressInput';
const addresses = [
  {
    id: 1,
    city: '서울특별시',
    town: '중구',
    detail: '창경궁로 254 403호',
    zipNo: '85372',
  },
  {
    id: 2,
    city: '서울특별시',
    town: '중구',
    detail: '창경궁로 254 403호',
    zipNo: '12362',
  },
  {
    id: 3,
    city: '서울특별시',
    town: '중구',
    detail: '창경궁로 254 403호',
    zipNo: '73312',
  },
];
const infos = [
  {
    placeholder: '우편번호',
    value: '11111',
    label: '우편번호',
  },
  {
    placeholder: '도로명주소',
    value: '경기도 김포시 풍년로 100',
    label: '도로명주소',
  },
  {
    placeholder: '상세주소',
    value: '100동 100호',
    label: '상세주소',
  },
];

const MemberAddressInfo = ({memberAddresses , isUpdate}) => {

  return (
    <>
      <div className='mb-4'>
        <div className='w-full flex flex-col'>
          <MemberAddressTable memberAddresses={memberAddresses} title='주소 목록' />
          {!memberAddresses?.length ?
              <>
                <div className="flex justify-center items-center mx-3 py-16 bg-gray-100 rounded-lg">
                  <h1>등록된 주소지가 없습니다.</h1>
                </div>
              </>
              :
              null
          }
          {isUpdate && <AddressInput infos={infos} title='주소 추가' />}
        </div>
      </div>
    </>
  );
};
export default MemberAddressInfo;

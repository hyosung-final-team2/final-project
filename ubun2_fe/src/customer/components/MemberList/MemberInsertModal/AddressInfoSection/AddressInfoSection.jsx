import CusMemberAddressTable from './CusMemberAddressTable.jsx'
import MemberAddressInput from "../MemberAddressInput.jsx";

const infos = [
  {
    placeholder: '우편번호',
    value: '',
    label: '우편번호',
  },
  {
    placeholder: '도로명주소',
    value: '',
    label: '도로명주소',
  },
  {
    placeholder: '상세주소',
    value: '',
    label: '상세주소',
  },
];

const MemberAddressInfo = ({memberAddresses , isUpdate, handleAddressAdd ,handleAddressDelete}) => {

  return (
    <>
      <div className='mb-4'>
        <div className='w-full flex flex-col'>
          <CusMemberAddressTable memberAddresses={memberAddresses} title='주소 목록' handleAddressDelete={handleAddressDelete}/>
          {!memberAddresses?.length ?
              <>
                <div className="flex justify-center items-center mx-3 py-16 bg-gray-100 rounded-lg">
                  <h1>등록된 주소지가 없습니다.</h1>
                </div>
              </>
              :
              null
          }
          {isUpdate && <MemberAddressInput infos={infos} title='주소 추가' handleAddressAdd={handleAddressAdd}/>}
        </div>
      </div>
    </>
  );
};
export default MemberAddressInfo;

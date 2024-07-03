import InputLabel from '../common/Input/InputLabel';
import SearchInput from '../common/Input/SearchInput';

const MemberInfo = ({ member, onlyInfo = false, title }) => {
  const { memberName, memberEmail, memberPhone, memberCreatedAt } = member;
  return (
    <>
      <div className='p-3'>
        <div className='flex items-center justify-between mb-3'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          {onlyInfo || <SearchInput placeholder='회원검색' />}
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <InputLabel labelTitle='회원명' defaultValue={memberName} disabled={true} />
          <InputLabel labelTitle='이메일' defaultValue={memberEmail} disabled={true} />
          <InputLabel labelTitle='전화번호' defaultValue={memberPhone} disabled={true} />
          <InputLabel labelTitle='가입일' defaultValue={memberCreatedAt} disabled={true} />
        </div>
      </div>
    </>
  );
};

export default MemberInfo;

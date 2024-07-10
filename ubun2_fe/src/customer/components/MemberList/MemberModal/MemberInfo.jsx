import InputLabel from './InputLabel';
import SearchInput from './SearchInput';

const MemberInfo = ({ member, onlyInfo = false, title }) => {

  const { memberName, memberEmail, memberPhone, memberCreatedAt } = member;

  return (
    <>
      <div className='p-3'>
        <div className='mb-3 flex items-center justify-between'>
          <h1 className='text-xl font-bold text-main'>{title}</h1>
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

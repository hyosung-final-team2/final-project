
import InputLabel from "../common/Input/InputLabel.jsx";

const MemberInfo = ({ MemberInfoData, isUpdate, onlyInfo = true, title, searchable = false }) => {

  return (
      <div className='p-3'>
        <div className='mb-3 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-main'>{title}</h1>
          {/*{searchable && <SearchableDropdown options={users} onSelect={handleSelectMember} />}*/}
        </div>
        {onlyInfo ? (
            <div className='grid grid-cols-2 gap-3'>
              <InputLabel labelTitle='회원명' defaultValue={MemberInfoData.memberName} disabled={!isUpdate} isUpdate={isUpdate}/>
              <InputLabel labelTitle='이메일' defaultValue={MemberInfoData.memberEmail} disabled={!isUpdate} isUpdate={isUpdate}/>
              <InputLabel labelTitle='전화번호' defaultValue={MemberInfoData.memberPhone} disabled={!isUpdate} isUpdate={isUpdate}/>
              <InputLabel labelTitle='가입일' defaultValue={MemberInfoData.memberCreatedAt} disabled={onlyInfo} />
            </div>
        ) : (
            <div className='grid grid-cols-2 gap-3'>
              <InputLabel labelTitle='회원명' disabled={onlyInfo} />
              <InputLabel labelTitle='이메일' disabled={onlyInfo} />
              <InputLabel labelTitle='전화번호' disabled={onlyInfo} />
              <InputLabel labelTitle='가입일' disabled={onlyInfo} />
            </div>
        )}
      </div>
  );
};

export default MemberInfo;

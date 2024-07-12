
import InputLabel from "../common/Input/InputLabel.jsx";
import StatusBadge from "../common/Badge/StatusBadge.jsx";

const MemberInfo = ({ MemberInfoData, isUpdate, onlyInfo = true, title, searchable = false,isPending , handleInputChange}) => {

  return (
      <div className='p-3'>
        <div className='mb-3 flex items-center gap-4'>

              <span className='text-2xl font-bold text-main'>{title}</span>
              <span>{!isPending ? (
                  <StatusBadge bgColor='bg-badge-green' txtColor='text-badge-green' badgeText='완료' />
              ) : (
                  <StatusBadge bgColor='bg-badge-yellow' txtColor='text-badge-yellow' badgeText='대기' />
              )}</span>

        </div>
        {onlyInfo ? (
            <div className='grid grid-cols-2 gap-3'>
              <InputLabel labelTitle='회원명' defaultValue={MemberInfoData.memberName} disabled={!isUpdate} isUpdate={isUpdate} onChange={(value) => handleInputChange('memberName', value)}/>
              <InputLabel labelTitle='이메일' defaultValue={MemberInfoData.memberEmail} disabled={!isUpdate} isUpdate={isUpdate} onChange={(value) => handleInputChange('memberEmail', value)}/>
              <InputLabel labelTitle='전화번호' defaultValue={MemberInfoData.memberPhone} disabled={!isUpdate} isUpdate={isUpdate} onChange={(value) => handleInputChange('memberPhone', value)}/>
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

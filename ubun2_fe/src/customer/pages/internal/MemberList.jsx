import MemberTable from '../../components/MemberList/MemberTable/MemberTable';
import { users } from '../../components/MemberList/MemberListData';

const MemberList = () => {
  return (
    <>
      <MemberTable users={users} />
    </>
  );
};

export default MemberList;

import AddressTable from '../../components/AddressList/AddressTable';
import { addresses } from '../../components/AddressList/AddressListData';

const AddressList = () => {
  return (
    <>
      <AddressTable addresses={addresses} />
    </>
  );
};

export default AddressList;

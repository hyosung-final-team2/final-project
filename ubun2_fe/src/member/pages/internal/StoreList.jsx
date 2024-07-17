import StoreListItem from '../../components/StoreList/StoreListItem';
import {useGetStores} from "../../api/Store/queris.js";

function StoreList() {

  const { data: storeList } = useGetStores()

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0', flexWrap: 'wrap' }}>
      {storeList?.data?.data?.map(item => {
        return (
          <StoreListItem key={item.customerId} customerId={item.customerId} storeName={item.businessName} storeDesc={item.description} storeImg={item.logoImagePath} />
        );
      })}
    </div>
  );
}

export default StoreList;

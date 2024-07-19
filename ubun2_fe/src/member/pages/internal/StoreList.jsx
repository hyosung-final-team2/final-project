import StoreListItem from '../../components/StoreList/StoreListItem';
import {useGetStores} from "../../api/Store/queris.js";

function StoreList() {

  const { data: storeList } = useGetStores()
  console.log(storeList)

  return (
      <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap'
      }}>
          <div style={{flex: 0.7}} className='w-full px-3 py-2 text-xl font-bold bg-white flex items-center'>
              <div>등록된 상점({storeList?.data?.data?.length})</div>
          </div>
          <div style={{flex: 9.3}} className='w-full'>
              {storeList?.data?.data?.map(item => {
                  return (
                      <StoreListItem key={item.customerId} customerId={item.customerId} storeName={item.businessName}
                                     storeDesc={item.description} storeImg={item.logoImagePath}/>
                  );
              })}
          </div>
      </div>
  );
}

export default StoreList;

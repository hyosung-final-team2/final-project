import StoreListItem from '../../components/StoreList/StoreListItem';

function StoreList() {
  const dummyData = [
    { customerId: 1, storeName: 'Ubuntu1', storeDesc: 'this is store Ubuntu1', storeImg: '/IMG_2602.jpg' },
    { customerId: 2, storeName: 'Ubuntu2', storeDesc: 'this is store Ubuntu2', storeImg: '/IMG_2600.jpg' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0', flexWrap: 'wrap' }}>
      {dummyData.map(item => {
        return (
          <StoreListItem key={item.customerId} customerId={item.customerId} storeName={item.storeName} storeDesc={item.storeDesc} storeImg={item.storeImg} />
        );
      })}
    </div>
  );
}

export default StoreList;

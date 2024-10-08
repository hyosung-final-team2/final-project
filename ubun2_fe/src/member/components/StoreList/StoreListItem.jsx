import StoreArrow from '@heroicons/react/24/outline/ChevronRightIcon';
import { useNavigate } from 'react-router-dom';
import useStoreStore from '../../store/storeStore';
import useCategoryStore from "../../store/category/categoryStore.js";

function StoreListItem({ customerId, storeName, storeDesc, storeImg }) {
  const navigate = useNavigate();
  const { setCurrentStoreName, setCustomerId } = useStoreStore();
  const { setCategory } = useCategoryStore()

  const handleClick = () => {
    setCustomerId(customerId);
    setCurrentStoreName(storeName);
    setCategory(null)
    navigate(`/member/app/store`, {state: {customerId:customerId}});
  };

  return (
      <div className='bg-base-100 mb-0.5 w-full h-24 flex justify-center' onClick={handleClick}>
        <div className='w-11/12 flex items-center'>
          <div style={{flex: '2.5'}}>
            <img src={storeImg || "/default_small.png"} alt='storeImg' className='rounded-lg' style={{width: '4.5rem', height: '4.5rem'}}/>
          </div>
          <div style={{flex: '6.5', width: '100%'}}>
            <p className='text-xl font-bold'>{storeName}</p>
            <p>{storeDesc}</p>
          </div>
          <StoreArrow style={{flex: '1'}} className='w-9 h-9'/>
        </div>
      </div>
  );
}

export default StoreListItem;

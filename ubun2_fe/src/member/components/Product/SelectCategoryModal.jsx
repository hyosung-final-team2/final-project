import { getCategoryPath } from './category';

const SelectCategoryModal = ({ categoryList, setCategory, setModalState }) => {

  return (
    <>
      <div className='px-4 flex flex-wrap'>
        <div
          onClick={() => {
            setCategory(null);
            setModalState(false);
          }}
          style={{ width: '50%' }}
          className='flex items-center py-3 font-bold cursor-pointer'
        >
          <div className='mr-2 h-7 w-7'>
            <img src={`/category/all.png`} className='h-full w-full' alt='' />
          </div>
          전체
        </div>
        {categoryList.map(category => {
          return (
            <div
              onClick={() => {
                setCategory(category.categoryName);
                setModalState(false);
              }}
              style={{ width: '50%' }}
              className='flex items-center py-3 font-bold cursor-pointer'
              key={category.categoryId}
            >
              <div className={`mr-2 h-6 w-6`}>
                <img src={`/category/${getCategoryPath(category.categoryName)}`} className='h-full w-full' alt='' />
              </div>
              {category.categoryName}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default SelectCategoryModal;

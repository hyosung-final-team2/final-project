const SelectCategoryModal = ({categoryList ,setCategory, setModalState}) => {
    return (<>

        <div className="px-4 flex flex-wrap">{categoryList.map((category) => {
            return (<div onClick={() => {
                        setCategory({categoryName: category.categoryName, categoryId:category.categoryId})
                        setModalState(false)
                        }} style={{width:"50%"}} className="flex items-center py-3 font-bold cursor-pointer" key={category.categoryId}>
                        <div className="mr-2">✅</div>
                        {category.categoryName}
                    </div>)
        })}</div>
    </>)
}
export default SelectCategoryModal;
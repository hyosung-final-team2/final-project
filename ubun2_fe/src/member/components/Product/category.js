export const categories = [
  { categoryName: '전체', path: 'all' },
  { categoryName: '식품', path: 'cook.png' },
  { categoryName: '가전', path: 'elec.png' },
  { categoryName: '주방', path: 'kitchen.png' },
  { categoryName: '생활', path: 'life.png' },
  { categoryName: '음료', path: 'drink.png' },
  { categoryName: '패션', path: 'fashion.png' },
  { categoryName: '건강', path: 'health.png' },
  { categoryName: '반려동물', path: 'dog.png' },
  { categoryName: '완구', path: 'pencil.png' },
  { categoryName: '여행', path: 'camp.png' },
];

export const getCategoryPath = categoryName => {
  const foundCategory = categories.find(cat => cat.categoryName === categoryName);
  return foundCategory ? foundCategory.path : '';
};

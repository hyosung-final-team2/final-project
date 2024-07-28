import privateFetch from '../../../common/privateFetch.js';
import privateFileFetch from '../../../common/privateFileFetch.js';
import qs from "qs";

// 전체 상품 리스트 조회
export const getProducts = async (page, size, sort, searchCategory, searchKeyword) =>
  await privateFetch.get('/customers/products', {
    params: {
      page: page - 1,
      size: size,
      sort: sort, //["productCategoryName","productName","stockQuantity","productPrice","productDiscount","productStatus","orderOption"]
      searchCategory: searchCategory,
      searchKeyword: searchKeyword
    },
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
  });

export const registerProduct = async (productRequest, imageFile) => {
  const formData = new FormData();
  // JSON 데이터 추가
  formData.append(
    'productRequest',
    new Blob(
      [
        JSON.stringify({
          productName: productRequest.productName,
          productDescription: productRequest.productDescription,
          categoryName: productRequest.categoryName,
          stockQuantity: productRequest.stockQuantity,
          productPrice: productRequest.productPrice,
          productDiscount: productRequest.productDiscount,
          productStatus: productRequest.productStatus === 'true',
          orderOption: productRequest.orderOption,
        }),
      ],
      {
        type: 'application/json',
      }
    )
  );

  // 이미지 파일 추가 (있는 경우에만)
  if (imageFile) {
    formData.append('image', imageFile);
  }
  try {
    const response = await privateFileFetch.post('/customers/products', formData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error registering product:', error);
    throw error;
  }
};

export const modifyProduct = async (productRequest, imageFile) => {
  const formData = new FormData();
  // JSON 데이터 추가
  formData.append(
    'productRequest',
    new Blob(
      [
        JSON.stringify({
          productId: productRequest.productId,
          productName: productRequest.productName,
          productDescription: productRequest.productDescription,
          categoryName: productRequest.categoryName,
          stockQuantity: productRequest.stockQuantity,
          productPrice: productRequest.productPrice,
          productDiscount: productRequest.productDiscount,
          productStatus: productRequest.productStatus === 'true',
          orderOption: productRequest.orderOption,
          productImageOriginalName: productRequest.productImageOriginalName,
          productImagePath: productRequest.productImagePath || '',
        }),
      ],
      {
        type: 'application/json',
      }
    )
  );

  // 이미지 파일 추가 (있는 경우에만)
  if (imageFile) {
    formData.append('image', imageFile);
  }

  try {
    const response = await privateFileFetch.put('/customers/products', formData);
    return response.data;
  } catch (error) {
    console.error('Error registering product:', error);
    throw error;
  }
};

export const deleteProduct = async productId => await privateFetch.delete(`/customers/products/${productId}`);

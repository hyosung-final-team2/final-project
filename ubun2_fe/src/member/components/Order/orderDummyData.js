export const ORDER_DUMMY_DATA = [
  {
    orderId: 1,
    customerId: 1,
    businessName: '짱짱마켓',
    orderOption: false,
    singleOrderProducts: [
      {
        productId: 1,
        productImagePath:
          'https://png.pngtree.com/thumb_back/fh260/background/20210908/pngtree-crispy-and-delicious-apple-indoor-posing-photo-map-with-picture-image_826929.jpg',
        productDescription: '신선한 사과 1kg',
        productName: '청송 사과',
        productPrice: 10000,
        productDiscount: 10,
        quantity: 1,
        productImageOriginalName: 'apple.jpg',
        orderOption: false,
      },
      {
        productId: 2,
        productImagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9sFgNjSTXMVgtxezFxuVkJO8IWNMRRU4Uw&s',
        productDescription: '유기농 당근 500g',
        productName: '제주 당근',
        productPrice: 5000,
        productDiscount: 5,
        quantity: 2,
        productImageOriginalName: 'carrot.jpg',
        orderOption: false,
      },
    ],
    regularOrderProducts: [
      {
        productId: 3,
        productImagePath: 'https://src.hidoc.co.kr/image/lib/2021/9/10/1631233154393_0.jpg',
        productDescription: '무항생제 달걀 30구',
        productName: '행복한 닭의 달걀',
        productPrice: 8000,
        productDiscount: 0,
        quantity: 1,
        productImageOriginalName: 'eggs.jpg',
        orderOption: true,
      },
    ],
  },
  {
    orderId: 1,
    customerId: 2,
    businessName: '와와마켓',
    singleOrderProducts: [
      {
        productId: 4,
        productImagePath: 'https://www.jungkwanjang.co.kr/assets/img/brands/korean-red-ginseng-extract/b_img@2x.jpg',
        productDescription: '프리미엄 홍삼정 100g',
        productName: '활력충전 홍삼정',
        productPrice: 50000,
        productDiscount: 20,
        quantity: 1,
        productImageOriginalName: 'ginseng.jpg',
        orderOption: false,
      },
    ],
    regularOrderProducts: [],
  },
];

export const ADDRESS_DUMMY_DATA = [
  {
    addressId: 1,
    addressNickname: '우리집',
    recipientName: '홍홍길',
    recipientPhone: '010-2323-1212',
    defaultStatus: true,
    address: '경기 용인시 수지구 성복2로 158 608동 504호 (성복동, 성동마을엘지빌리지6차) 608동 504호',
  },
  {
    addressId: 2,
    addressNickname: '김막시무스네 집',
    recipientName: '김와우',
    recipientPhone: '010-2323-1212',
    defaultStatus: false,
    address: '경기 용인시 수지구 성복2로 158 608동 504호 (성복동, 성동마을엘지빌리지6차) 608동 504호',
  },
  {
    addressId: 3,
    addressNickname: '왕엘리자베스네 집',
    recipientName: '오우예',
    recipientPhone: '010-2323-1212',
    defaultStatus: false,
    address: '경기 용인시 수지구 성복2로 158 608동 504호 (성복동, 성동마을엘지빌리지6차) 608동 504호',
  },
];

export const deliveryContent = [
  {
    value: 1,
    text: '문앞',
  },
  {
    value: 2,
    text: '경비실',
  },
  {
    value: 3,
    text: '택배함',
  },
  {
    value: 4,
    text: '직접 받고 부재 시 문 앞',
  },
  {
    value: 5,
    text: '직접 받고 부재 시 경비실',
  },
  {
    value: 6,
    text: '직접 받고 부재 시 택배함',
  },
];

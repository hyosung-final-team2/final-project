export const CART_DUMMY_DATA = {
  addressId: 1,
  addressNickname: '우리집',
  recipientName: '홍홍길',
  recipientPhone: '010-2323-1212',
  address: '경기 용인시 수지구 성복2로 158 608동 504호 (성복동, 성동마을엘지빌리지6차) 608동 504호',
  phoneNumber: '010-1234-5678',
  paymentType: 'CARD',
  cardName: '우리카드',
  accountName: '우리은행',
  cardNumber: '1111-2222-3333-4444',
  accountNumber: '1111-2222-3333-4444',
  createdAt: '2024-07-17',

  itemContent: [
    {
      customerId: 1,
      businessName: '짱짱마켓',
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
  ],
};

export const cycleContent = [
  {
    value: 1,
    text: '1주에 한번 받을래요',
  },
  {
    value: 2,
    text: '2주에 한번 받을래요',
  },
  {
    value: 3,
    text: '1달에 한번 받을래요',
  },
  {
    value: 4,
    text: '2달에 한번 받을래요',
  },
];

export const orderInfo = {
  member: {
    memberName: '홍길동',
    memberEmail: 'owen123@naver.com',
    memberPhone: '010-2401-1235',
    memberCreatedAt: '2024-01-14',
  },
  products: [
    {
      orderProductId: 1,
      productName: '싱싱한 목장 우유',
      productDescription: '싱싱한 목장 우유 함 무 볼텨?',
      price: 3000,
      quantity: 2,
      productDiscount: 20,
      orderProductStatus: 'APPROVED',
      orderOption: 'SINGLE',
      productImageOriginalName: '목장우유',
      productImagePath: 'https://m.seoulmilk.co.kr/Product_Data/pimages/v_001_152.png',
    },
    {
      orderProductId: 2,
      productName: '싱싱한 목장 나쵸',
      productDescription: '싱싱한 목장 나쵸 함 무 볼텨?',
      price: 2000,
      quantity: 2,
      productDiscount: 20,
      orderProductStatus: 'MODIFIED',
      orderOption: 'SINGLE',
      productImageOriginalName: '냠냠 나쵸',
      productImagePath: 'https://sitem.ssgcdn.com/68/45/36/item/1000559364568_i1_750.jpg',
    },
    {
      orderProductId: 3,
      productName: '싱싱한 목장 연어',
      productDescription: '싱싱한 목장 연어 함 무 볼텨?',
      price: 10000,
      quantity: 2,
      productDiscount: 20,
      orderProductStatus: 'APPROVED',
      orderOption: 'SINGLE',
      productImageOriginalName: '싱싱 연어',
      productImagePath: 'https://img.hankyung.com/photo/202110/99.27705915.1.jpg',
    },
  ],
  delivery: {
    addresssNickname: '교육장',
    address: '서울특별시 창경궁로 254 11동 111호',
  },
  payment: {
    paymentMethodId: 1,
    paymentType: 'CARD',
    paymentNickname: '와우와우카드',
    cardCompanyName: '우리카드',
    cardNumber: '1111-2222-3333-xxxx',
    /*
          계좌인 경우
          paymentType: 'ACCOUNT',
          paymentNickname: '와우와우계좌',
          bankName: '우리은행',
          accountNumber: '1002-***-***-004',
          */
  },
  subscription: {
    intervalDays: 7,
    cycleNumber: 2,
    createdAt: '2024-07-02',
  },
  orderStatus: 'APPROVED', // APPROVED , MODIFIED
  orderOption: 'SUBSCRIPTION', // SINGLE, SUBSCRIPTION, BOTH
};

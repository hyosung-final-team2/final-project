export const tableColumn = {
  member: ['회원 이메일', '회원명', '전화번호', '가입일', '가입 상태'],
  address: {
    list: ['회원명', '주소(시, 도)', '주소(시,군,구)', '상세주소', '우편번호'],
    detail: ['주소(시, 도)', '주소(시,군,구)', '상세주소', '우편번호'],
    search: ['회원명', '주소(시, 도)'],
    nonSort: ['주소(시,군,구)', '상세주소', '우편번호'],
  },
  paymentMethod: {
    accountList: ['회원 이메일', '회원명', '결제수단', '은행명', '계좌번호'],
    cardList: ['회원 이메일', '회원명', '결제수단', '카드사명', '카드번호'],
    detail: ['결제수단', '카드사(은행)', '카드/계좌번호', '만료일'],
    accountSearch: ['회원 이메일', '회원명', '은행명'],
    cardSearch: ['회원 이메일', '회원명', '카드사명'],
    nonSort: ['결제수단'],
  },
  orders: ['정기 주문 상태', '주문 일자', '주문자(구매자)', '총 주문금액', '주문결제수단', '승인 상태'],
  pendingOrders: ['정기 주문 상태', '주문 일자', '주문자(구매자)', '총 주문금액', '주문결제수단', '승인 상태'],
  product: ['분류', '상품명', '수량', '상품가격', '할인율', '상품게시 상태', '배송 종류'],
  ordersSearch: ['주문 일자', '주문자(구매자)', '총 주문금액'],
};

export const columnMapping = {
  '회원 이메일': 'memberEmail',
  회원명: 'memberName',
  전화번호: 'memberPhone',
  가입일: 'createdAt',
  '가입 상태': 'isPending',
  결제수단: 'paymentMethod',
  은행명: 'bankName',
  계좌번호: 'accountNumber',
  카드사명: 'cardCompany',
  '주소(시, 도)': 'address',
  카드번호: 'cardNumber',
  분류: 'productCategoryName',
  상품명: 'productName',
  수량: 'stockQuantity',
  상품가격: 'productPrice',
  할인율: 'productDiscount',
  '상품게시 상태': 'productStatus',
  '배송 종류': 'orderOption',
  '정기 주문 상태': 'isSubscription',
  '주문 일자': 'createdAt',
  '주문자(구매자)': 'memberName',
  '총 주문금액': 'totalCost',
  주문결제수단: 'paymentType',
  '승인 상태': 'orderStatus',
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

export const betweenColumn = new Set(['createdAt', 'stockQuantity', 'productPrice', 'productDiscount']);

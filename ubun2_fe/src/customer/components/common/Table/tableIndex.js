export const tableColumn = {
  member: ['회원 이메일', '회원명', '전화번호', '가입일', '가입 상태'],
  address: {
    list: ['회원 이메일', '회원명', '주소(시, 도)', '주소(시,군,구)', '상세주소'],
    detail: ['주소(시, 도)', '주소(시,군,구)', '상세주소', '우편번호'],
  },
  paymentMethod: {
    accountList: ['회원이메일', '회원명', '결제수단', '은행명', '계좌번호'],
    cardList: ['회원이메일', '회원명', '결제수단', '카드사명', '카드번호'],
    detail: ['결제수단', '카드사(은행)', '카드/계좌번호', '만료일'],
  },
  orders: ['주문 아이디', '주문 생성일', '주문자(구매자)', '총 주문금액', '결제수단', '정기 주문 상태', '승인 상태'],
  pendingOrders: ['주문 아이디', '주문 생성일', '주문자(구매자)', '총 주문금액', '결제수단', '정기 주문 상태', '승인 처리'],
  product: ['상품 아이디', '상품명', '수량', '상품가격(등록가)', '상품 할인율', '상품게시 상태', '배송 종류'],
};

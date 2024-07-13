INSERT INTO category (category_name) VALUES
                                         ('과일'),
                                         ('유제품'),
                                         ('육류'),
                                         ('채소'),
                                         ('주류');

INSERT INTO customer (business_address, business_name, business_open_date, business_owner, business_registration_number, customer_email, customer_login_id, customer_name, customer_password, customer_phone, description, user_role) VALUES
                                                                                                                                                                                                                                          ('서울시 강남구', '과일나라', '2020-01-01', '김과일', '123-45-67890', 'fruit@example.com', 'test', '과일가게', '$2a$10$RAwHcOb2/qu7jtTHmWLRluXQt2GYxVmJpY.kdPmekaMSlX6/bb1OG', '02-1234-5678', '신선한 과일 전문점', 'ROLE_CUSTOMER'),
                                                                                                                                                                                                                                          ('서울시 서초구', '우유천국', '2019-05-15', '이우유', '234-56-78901', 'milk@example.com', 'milkshop', '우유가게', 'password2', '02-2345-6789', '신선한 유제품 전문점', 'ROLE_CUSTOMER'),
                                                                                                                                                                                                                                          ('서울시 송파구', '고기마을', '2018-11-30', '박고기', '345-67-89012', 'meat@example.com', 'meatshop', '고기가게', 'password3', '02-3456-7890', '신선한 육류 전문점', 'ROLE_CUSTOMER'),
                                                                                                                                                                                                                                          ('서울시 마포구', '채소왕국', '2021-03-20', '최채소', '456-78-90123', 'veggie@example.com', 'veggieshop', '채소가게', 'password4', '02-4567-8901', '신선한 채소 전문점', 'ROLE_CUSTOMER'),
                                                                                                                                                                                                                                          ('서울시 용산구', '주류천국', '2017-07-07', '정주류', '567-89-01234', 'liquor@example.com', 'liquorshop', '주류가게', 'password5', '02-5678-9012', '다양한 주류 전문점', 'ROLE_CUSTOMER');

INSERT INTO member (member_email, member_login_id, member_name, member_password, member_phone, payment_password, user_role) VALUES
                                                                                                                                ('user1@example.com', 'user1', '김철수', 'password1', '010-1234-5678', 'pay1234', 'ROLE_MEMBER'),
                                                                                                                                ('user2@example.com', 'user2', '이영희', 'password2', '010-2345-6789', 'pay2345', 'ROLE_MEMBER'),
                                                                                                                                ('user3@example.com', 'user3', '박민수', 'password3', '010-3456-7890', 'pay3456', 'ROLE_MEMBER'),
                                                                                                                                ('user4@example.com', 'user4', '정수진', 'password4', '010-4567-8901', 'pay4567', 'ROLE_MEMBER'),
                                                                                                                                ('user5@example.com', 'user5', '홍길동', 'password5', '010-5678-9012', 'pay5678', 'ROLE_MEMBER'),
                                                                                                                                ('user6@example.com', 'user6', '강지영', 'password6', '010-6789-0123', 'pay6789', 'ROLE_MEMBER'),
                                                                                                                                ('user7@example.com', 'user7', '송민호', 'password7', '010-7890-1234', 'pay7890', 'ROLE_MEMBER'),
                                                                                                                                ('user8@example.com', 'user8', '윤서연', 'password8', '010-8901-2345', 'pay8901', 'ROLE_MEMBER'),
                                                                                                                                ('user9@example.com', 'user9', '임재현', 'password9', '010-9012-3456', 'pay9012', 'ROLE_MEMBER'),
                                                                                                                                ('user10@example.com', 'user10', '권나라', 'password10', '010-0123-4567', 'pay0123', 'ROLE_MEMBER'),
                                                                                                                                ('user11@example.com', 'user11', '이름11', 'password11', '010-1111-1111', 'pay1111', 'ROLE_MEMBER'),
                                                                                                                                ('user12@example.com', 'user12', '이름12', 'password12', '010-1212-1212', 'pay1212', 'ROLE_MEMBER'),
                                                                                                                                ('user13@example.com', 'user13', '이름13', 'password13', '010-1313-1313', 'pay1313', 'ROLE_MEMBER'),
                                                                                                                                ('user14@example.com', 'user14', '이름14', 'password14', '010-1414-1414', 'pay1414', 'ROLE_MEMBER'),
                                                                                                                                ('user15@example.com', 'user15', '이름15', 'password15', '010-1515-1515', 'pay1515', 'ROLE_MEMBER');

INSERT INTO cart (customer_id, member_id) VALUES
                                              (1, 1),
                                              (2, 2),
                                              (3, 3),
                                              (4, 4),
                                              (5, 5);

INSERT INTO payment_method (payment_method_id, payment_method_nickname, payment_type, member_id, created_at, updated_at) VALUES
                                                                                                                             (1, '주거래계좌', 'ACCOUNT', 1, '2024-07-09 10:00:00', '2024-07-09 10:00:00'),
                                                                                                                             (2, '비상금계좌', 'ACCOUNT', 2, '2024-07-09 10:01:00', '2024-07-09 10:01:00'),
                                                                                                                             (3, '급여계좌', 'ACCOUNT', 3, '2024-07-09 10:02:00', '2024-07-09 10:02:00'),
                                                                                                                             (4, '저축계좌', 'ACCOUNT', 4, '2024-07-09 10:03:00', '2024-07-09 10:03:00'),
                                                                                                                             (5, '생활비계좌', 'ACCOUNT', 5, '2024-07-09 10:04:00', '2024-07-09 10:04:00'),
                                                                                                                             (6, '투자계좌', 'ACCOUNT', 6, '2024-07-09 10:05:00', '2024-07-09 10:05:00'),
                                                                                                                             (7, '여행자금계좌', 'ACCOUNT', 7, '2024-07-09 10:06:00', '2024-07-09 10:06:00'),
                                                                                                                             (8, '비즈니스계좌', 'ACCOUNT', 8, '2024-07-09 10:07:00', '2024-07-09 10:07:00'),
                                                                                                                             (9, '학자금계좌', 'ACCOUNT', 9, '2024-07-09 10:08:00', '2024-07-09 10:08:00'),
                                                                                                                             (10, '긴급자금계좌', 'ACCOUNT', 10, '2024-07-09 10:09:00', '2024-07-09 10:09:00'),
                                                                                                                             (11, '일상카드', 'CARD', 11, '2024-07-09 10:10:00', '2024-07-09 10:10:00'),
                                                                                                                             (12, '쇼핑전용카드', 'CARD', 12, '2024-07-09 10:11:00', '2024-07-09 10:11:00'),
                                                                                                                             (13, '마일리지카드', 'CARD', 13, '2024-07-09 10:12:00', '2024-07-09 10:12:00'),
                                                                                                                             (14, '캐시백카드', 'CARD', 14, '2024-07-09 10:13:00', '2024-07-09 10:13:00'),
                                                                                                                             (15, '주유전용카드', 'CARD', 15, '2024-07-09 10:14:00', '2024-07-09 10:14:00'),
                                                                                                                             (16, '여행카드', 'CARD', 1, '2024-07-09 10:15:00', '2024-07-09 10:15:00'),
                                                                                                                             (17, '학생카드', 'CARD', 2, '2024-07-09 10:16:00', '2024-07-09 10:16:00'),
                                                                                                                             (18, '비즈니스카드', 'CARD', 3, '2024-07-09 10:17:00', '2024-07-09 10:17:00'),
                                                                                                                             (19, '프리미엄카드', 'CARD', 4, '2024-07-09 10:18:00', '2024-07-09 10:18:00'),
                                                                                                                             (20, '체크카드', 'CARD', 5, '2024-07-09 10:19:00', '2024-07-09 10:19:00');

INSERT INTO address (default_status, member_id, address, address_nickname, recipient_name, recipient_phone) VALUES
                                                                                                                (1, 1, '서울시 강남구 테헤란로 123', '집', '김철수', '010-1234-5678'),
                                                                                                                (0, 1, '서울시 서초구 방배로 456', '회사', '김철수', '010-1234-5678'),
                                                                                                                (1, 2, '경기도 성남시 분당구 판교로 789', '집', '이영희', '010-2345-6789'),
                                                                                                                (1, 3, '인천시 연수구 컨벤시아대로 101', '집', '박민수', '010-3456-7890'),
                                                                                                                (0, 3, '인천시 남동구 인하로 202', '회사', '박민수', '010-3456-7890'),
                                                                                                                (1, 4, '대전시 유성구 대학로 303', '집', '정수진', '010-4567-8901'),
                                                                                                                (1, 5, '광주시 서구 상무중앙로 404', '집', '홍길동', '010-5678-9012'),
                                                                                                                (1, 6, '대구시 동구 동대구로 505', '집', '강지영', '010-6789-0123'),
                                                                                                                (1, 7, '울산시 남구 삼산로 606', '집', '송민호', '010-7890-1234'),
                                                                                                                (1, 8, '부산시 해운대구 해운대로 707', '집', '윤서연', '010-8901-2345');

INSERT INTO product (product_price, product_discount, stock_quantity, category_id, customer_id, product_description, product_name, order_option, product_status) VALUES
                                                                                                                                                                     (10000, 1000, 100, 1, 1, '신선한 사과', '맛있는 사과', 'BOTH', true),
                                                                                                                                                                     (15000, 2000, 80, 1, 1, '달콤한 배', '달콤배', 'SINGLE', true),
                                                                                                                                                                     (8000, 800, 150, 2, 2, '영양만점 우유', '신선 우유', 'SUBSCRIPTION', true),
                                                                                                                                                                     (12000, 1500, 120, 2, 2, '고소한 치즈', '모짜렐라 치즈', 'BOTH', true),
                                                                                                                                                                     (20000, 3000, 50, 3, 3, '부드러운 소고기', '한우 등심', 'SINGLE', true),
                                                                                                                                                                     (18000, 2500, 70, 3, 3, '신선한 돼지고기', '삼겹살', 'BOTH', true),
                                                                                                                                                                     (5000, 500, 200, 4, 4, '아삭한 오이', '청오이', 'SUBSCRIPTION', true),
                                                                                                                                                                     (7000, 700, 180, 4, 4, '싱싱한 토마토', '방울토마토', 'BOTH', true),
                                                                                                                                                                     (25000, 4000, 30, 5, 5, '고급 와인', '레드 와인', 'SINGLE', true),
                                                                                                                                                                     (30000, 5000, 25, 5, 5, '프리미엄 위스키', '스카치 위스키', 'BOTH', true);

INSERT INTO `order` (address_id, cart_id, member_id, payment_method_id, order_status,created_at) VALUES
                                                                                          (1, 1, 1, 1, 'APPROVED','2024-06-23'), --
                                                                                          (2, 2, 2, 2, 'PENDING','2024-06-23'),
                                                                                          (3, 3, 3, 3, 'APPROVED','2024-06-23'),
                                                                                          (4, 4, 4, 4, 'MODIFIED','2024-06-23'),
                                                                                          (5, 5, 5, 5, 'APPROVED','2024-06-23'),
                                                                                          (1, 1, 1, 1, 'APPROVED','2024-07-23'), --
                                                                                          (2, 2, 1, 2, 'PENDING','2024-07-01'),
                                                                                          (2, 2, 1, 2, 'PENDING','2024-07-02'),
                                                                                          (2, 2, 1, 2, 'APPROVED','2024-07-03'), --
                                                                                          (2, 2, 1, 2, 'APPROVED','2024-07-04'),
                                                                                          (2, 2, 1, 2, 'APPROVED','2024-07-05'),
                                                                                          (2, 2, 1, 2, 'MODIFIED','2024-07-01'),
                                                                                          (2, 2, 2, 2, 'MODIFIED','2024-07-02'),
                                                                                          (2, 2, 2, 2, 'APPROVED','2024-07-03'),
                                                                                          (2, 2, 2, 2, 'APPROVED','2024-07-04'),
                                                                                          (2, 2, 2, 2, 'APPROVED','2024-07-05');


INSERT INTO account_payment (payment_method_id, account_number, bank_name) VALUES
                                                                               (1, '1234-5678-9012', '신한은행'),
                                                                               (2, '2345-6789-0123', '국민은행'),
                                                                               (3, '3456-7890-1234', '우리은행'),
                                                                               (4, '4567-8901-2345', '하나은행'),
                                                                               (5, '5678-9012-3456', 'NH농협은행'),
                                                                               (6, '6789-0123-4567', 'IBK기업은행'),
                                                                               (7, '7890-1234-5678', '카카오뱅크'),
                                                                               (8, '8901-2345-6789', '토스뱅크'),
                                                                               (9, '9012-3456-7890', '케이뱅크'),
                                                                               (10, '0123-4567-8901', '부산은행');

INSERT INTO bank (account_status, account_number, account_password, balance, bank_name, user_name) VALUES
                                                                                                       (true, '1111222233334444', 'pass1234', '1000000', '국민은행', '김국민'),
                                                                                                       (true, '2222333344445555', 'pass2345', '2000000', '신한은행', '이신한'),
                                                                                                       (true, '3333444455556666', 'pass3456', '3000000', '우리은행', '박우리'),
                                                                                                       (true, '4444555566667777', 'pass4567', '4000000', '하나은행', '정하나'),
                                                                                                       (true, '5555666677778888', 'pass5678', '5000000', 'SC은행', '최에스씨'),
                                                                                                       (true, '6666777788889999', 'pass6789', '6000000', '기업은행', '강기업'),
                                                                                                       (true, '7777888899990000', 'pass7890', '7000000', '농협은행', '조농협'),
                                                                                                       (true, '8888999900001111', 'pass8901', '8000000', '케이뱅크', '윤케이'),
                                                                                                       (true, '9999000011112222', 'pass9012', '9000000', '카카오뱅크', '서카카오'),
                                                                                                       (true, '0000111122223333', 'pass0123', '10000000', '토스뱅크', '한토스');

INSERT INTO card_payment (payment_method_id, card_company_name, card_number) VALUES
                                                                                 (11, '신한카드', '1111222233334444'),
                                                                                 (12, '삼성카드', '2222333344445555'),
                                                                                 (13, '현대카드', '3333444455556666'),
                                                                                 (14, '롯데카드', '4444555566667777'),
                                                                                 (15, 'KB국민카드', '5555666677778888'),
                                                                                 (16, '우리카드', '6666777788889999'),
                                                                                 (17, '하나카드', '7777888899990000'),
                                                                                 (18, 'NH농협카드', '8888999900001111'),
                                                                                 (19, 'BC카드', '9999000011112222'),
                                                                                 (20, '카카오뱅크', '0000111122223333');

INSERT INTO cart_product (quantity, cart_id, product_id, order_option) VALUES
                                                                           (2, 1, 1, 'BOTH'),
                                                                           (1, 1, 3, 'SUBSCRIPTION'),
                                                                           (3, 2, 2, 'SINGLE'),
                                                                           (1, 2, 4, 'BOTH'),
                                                                           (2, 3, 5, 'SINGLE'),
                                                                           (1, 3, 6, 'BOTH'),
                                                                           (3, 4, 7, 'SUBSCRIPTION'),
                                                                           (2, 4, 8, 'BOTH'),
                                                                           (1, 5, 9, 'SINGLE'),
                                                                           (2, 5, 10, 'BOTH');

INSERT INTO member_customer (customer_id, member_id) VALUES
                                                         (1, 1),
                                                         (1, 2),
                                                         (2, 3),
                                                         (2, 4),
                                                         (3, 5),
                                                         (3, 6),
                                                         (4, 7),
                                                         (4, 8),
                                                         (5, 9),
                                                         (5, 10);

INSERT INTO notification (read_status, member_id, content) VALUES
                                                               (false, 1, '새로운 주문이 접수되었습니다.'),
                                                               (false, 2, '배송이 시작되었습니다.'),
                                                               (true, 3, '주문하신 상품이 배송 완료되었습니다.'),
                                                               (false, 4, '새로운 할인 쿠폰이 발급되었습니다.'),
                                                               (true, 5, '회원님의 등급이 상승했습니다.'),
                                                               (false, 6, '비밀번호 변경 알림'),
                                                               (true, 7, '포인트 소멸 예정 안내'),
                                                               (false, 8, '새로운 이벤트가 시작되었습니다.'),
                                                               (true, 9, '상품 재입고 알림'),
                                                               (false, 10, '결제 완료 안내');

INSERT INTO order_product (price, quantity, order_id, product_id, order_product_status, discount) VALUES
                                                                                            (10000, 2, 1, 1, 'APPROVED',10),
                                                                                            (15000, 2, 6, 2, 'APPROVED',10),
                                                                                            (8000, 2, 9, 3, 'APPROVED',10),
                                                                                            (12000, 2, 10, 4, 'APPROVED',10),
                                                                                            (20000, 2, 11, 5, 'APPROVED',10),
                                                                                            (15000, 1, 12, 2, 'DENIED',20),
                                                                                            (20000, 2, 13, 5, 'DENIED',10),
                                                                                            (15000, 1, 14, 2, 'APPROVED',20),
                                                                                            (20000, 2, 15, 5, 'APPROVED',10),
                                                                                            (20000, 2, 16, 5, 'APPROVED',10),
                                                                                            (8000, 3, 2, 3, 'PENDING',30),
                                                                                            (12000, 1, 2, 4, 'PENDING',11),
                                                                                            (20000, 2, 3, 5, 'APPROVED',15),
                                                                                            (18000, 1, 3, 6, 'REJECTED',17),
                                                                                            (5000, 4, 4, 7, 'APPROVED',80),  -- 'MODIFIED'에서 'APPROVED'로 변경
                                                                                            (7000, 2, 4, 8, 'DENIED',70),   -- 'MODIFIED'에서 'PENDING'으로 변경
                                                                                            (25000, 1, 5, 9, 'DENIED',99),
                                                                                            (30000, 1, 5, 10, 'APPROVED',10);

INSERT INTO pending_member (customer_id, pending_member_id, pending_member_email, pending_member_name, pending_member_phone) VALUES
                                                                                                                                                                                                                                                             (1,1, 'pending1@example.com', '김대기', '010-1111-2222'),
                                                                                                                                                                                                                                                             (2, 2, 'pending2@example.com', '이대기', '010-2222-3333'),
                                                                                                                                                                                                                                                             (3, 3, 'pending3@example.com', '박대기', '010-3333-4444'),
                                                                                                                                                                                                                                                             (4, 4, 'pending4@example.com', '정대기', '010-4444-5555'),
                                                                                                                                                                                                                                                             (5, 5, 'pending5@example.com', '최대기', '010-5555-6666'),
                                                                                                                                                                                                                                                             (1, 6, 'pending6@example.com', '강대기', '010-6666-7777'),
                                                                                                                                                                                                                                                             (2, 7, 'pending7@example.com', '조대기', '010-7777-8888'),
                                                                                                                                                                                                                                                             (3, 8, 'pending8@example.com', '윤대기', '010-8888-9999'),
                                                                                                                                                                                                                                                             (4, 9, 'pending9@example.com', '서대기', '010-9999-0000'),
                                                                                                                                                                                                                                                             (5, 10, 'pending10@example.com', '한대기', '010-0000-1111');

INSERT INTO subscription_order (interval_days, address_id, member_id, payment_method_id, order_status, created_at) VALUES
                                                                                                           (7, 1, 1, 1, 'APPROVED','2024-07-01'),
                                                                                                           (7, 1, 1, 2, 'MODIFIED','2024-07-02'),
                                                                                                           (7, 1, 1, 3, 'MODIFIED','2024-07-03'),
                                                                                                           (7, 1, 1, 4, 'PENDING','2024-07-04'),
                                                                                                           (7, 1, 1, 5, 'APPROVED','2024-07-05'),
                                                                                                           (14, 2, 2, 2, 'PENDING','2024-07-01'),
                                                                                                           (30, 3, 3, 3, 'APPROVED','2024-07-01'),
                                                                                                           (7, 4, 4, 4, 'MODIFIED','2024-07-01'),
                                                                                                           (14, 5, 5, 5, 'APPROVED','2024-07-01'),
                                                                                                           (30, 6, 6, 6, 'DENIED','2024-07-01'),
                                                                                                           (7, 7, 7, 7, 'APPROVED','2024-07-01'),
                                                                                                           (14, 8, 8, 8, 'PENDING','2024-07-01'),
                                                                                                           (30, 9, 9, 9, 'APPROVED','2024-07-01'),
                                                                                                           (7, 10, 10, 10, 'MODIFIED','2024-07-01');

INSERT INTO subscription_order_product (cycle_number, price, quantity, product_id, subscription_order_id, order_product_status, discount) VALUES
                                                                                                                                    (1, 10000, 2, 1, 1, 'APPROVED',10),
                                                                                                                                    (1, 2000, 2, 2, 1, 'APPROVED',10),
                                                                                                                                    (1, 800, 2, 3, 1, 'APPROVED',10),
                                                                                                                                    (1, 10000, 2, 1, 2, 'DENIED',10),
                                                                                                                                    (1, 2000, 2, 2, 2, 'DENIED',10),
                                                                                                                                    (1, 800, 2, 3, 2, 'DENIED',10),
                                                                                                                                    (1, 8000, 1, 3, 2, 'DENIED',86),
                                                                                                                                    (1, 20000, 1, 5, 3, 'APPROVED',25),
                                                                                                                                    (1, 5000, 3, 7, 4, 'APPROVED',20),
                                                                                                                                    (1, 25000, 1, 9, 5, 'APPROVED',30),
                                                                                                                                    (2, 15000, 1, 2, 1, 'APPROVED',20),
                                                                                                                                    (2, 12000, 2, 4, 2, 'DENIED',30),
                                                                                                                                    (2, 18000, 1, 6, 3, 'APPROVED',40),
                                                                                                                                    (2, 7000, 2, 8, 4, 'DENIED',50),
                                                                                                                                    (2, 30000, 1, 10, 5, 'APPROVED',10),
                                                                                                                                    (3, 15000, 1, 2, 1, 'APPROVED',20),
                                                                                                                                    (3, 12000, 2, 4, 2, 'PENDING',30),
                                                                                                                                    (3, 18000, 1, 6, 3, 'APPROVED',40),
                                                                                                                                    (3, 7000, 2, 8, 4, 'PENDING',50),
                                                                                                                                    (3, 30000, 1, 10, 5, 'APPROVED',10)



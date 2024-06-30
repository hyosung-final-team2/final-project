import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'; // 대시보드
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'; // 캘린더
import UserIcon from '@heroicons/react/24/outline/UserIcon'; // 회원 메뉴
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'; // 회원 리스트
import MapIcon from '@heroicons/react/24/outline/MapIcon'; // 주소지 리스트
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'; // 결제수단 리스트
import ArchiveBoxIcon from '@heroicons/react/24/outline/ArchiveBoxIcon'; // 상품 메뉴
import TagIcon from '@heroicons/react/24/outline/TagIcon'; // 상품 리스트
import ShoppingBagIcon from '@heroicons/react/24/outline/ShoppingBagIcon'; // 주문 메뉴
import ClipBoardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentIcon'; // 주문 리스트
import ClipBoardDocumentCheckIcon from '@heroicons/react/24/outline/ClipboardDocumentCheckIcon'; // 주문 승인 대기
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'; // 설정
import StoreInfo from '@heroicons/react/24/outline/BuildingStorefrontIcon';

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: '/customer/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: '메인보드',
  },
  {
    path: '/customer/app/calendar',
    icon: <CalendarDaysIcon className={iconClasses} />,
    name: '캘린더',
  },

  // 회원 메뉴
  {
    path: '',
    icon: <UserIcon className={`${iconClasses} inline`} />,
    name: '회원관리',
    submenu: [
      {
        path: '/customer/app/member',
        icon: <UserGroupIcon className={submenuIconClasses} />,
        name: '회원 목록',
      },
      {
        path: '/customer/app/address',
        icon: <MapIcon className={submenuIconClasses} />,
        name: '주소지 목록',
      },
      {
        path: '/customer/app/payment',
        icon: <WalletIcon className={submenuIconClasses} />,
        name: '결제수단 목록',
      },
    ],
  },

  // 상품 메뉴
  {
    path: '',
    icon: <ArchiveBoxIcon className={`${iconClasses} inline`} />,
    name: '상품관리',
    submenu: [
      {
        path: '/customer/app/product',
        icon: <TagIcon className={submenuIconClasses} />,
        name: '상품 목록',
      },
    ],
  },

  // 주문 메뉴
  {
    path: '',
    icon: <ShoppingBagIcon className={`${iconClasses} inline`} />,
    name: '주문관리',
    submenu: [
      {
        path: '/customer/app/order',
        icon: <ClipBoardDocumentListIcon className={submenuIconClasses} />,
        name: '주문 목록',
      },
      {
        path: '/customer/app/pendingorder',
        icon: <ClipBoardDocumentCheckIcon className={submenuIconClasses} />,
        name: '주문승인대기 목록',
      },
    ],
  },
  // 설정
  {
    path: '',
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />,
    name: '설정',
    submenu: [
      {
        path: '/customer/app/storeinfo',
        icon: <StoreInfo className={submenuIconClasses} />,
        name: '상점 정보',
      },
    ],
  },
];

export default routes;

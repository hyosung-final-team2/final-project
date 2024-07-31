import KBIcon from '../../../assets/images/KB.svg';
import BCIcon from '../../../assets/images/bc.svg';
import HanaIcon from '../../../assets/images/hana.svg';
import LotteIcon from '../../../assets/images/lotte.svg';
import HyundaiIcon from '../../../assets/images/hyundai.svg';
import WooriIcon from '../../../assets/images/woori.svg';
import SamsungIcon from '../../../assets/images/samsungcard.svg';
import ShinhanIcon from '../../../assets/images/shinhan.svg';
import NonghyupIcon from '../../../assets/images/nonghyup.svg';
import TossIcon from '../../../assets/images/toss.svg';

import KBLogo from '../../../assets/images/logo/kb.svg';
import BCLogo from '../../../assets/images/logo/bc.svg';
import HanaLogo from '../../../assets/images/logo/hana.svg';
import LotteLogo from '../../../assets/images/logo/lotte.svg';
import HyundaiLogo from '../../../assets/images/logo/hyundai.svg';
import WooriLogo from '../../../assets/images/logo/woori.svg';
import SamsungLogo from '../../../assets/images/logo/samsung.svg';
import ShinhanLogo from '../../../assets/images/logo/shinhan.svg';
import NonhyupLogo from '../../../assets/images/logo/nonghyup.svg';

export const companies = [
  {
    name: '국민',
    icon: <KBIcon className='w-10 h-10' />,
    logo: <KBLogo className='w-full h-full' />,
    color: 'bg-gradient-to-br from-custom-card-kb-from to-custom-card-kb-to ',
    path: 'kb.png',
  },
  {
    name: '비씨',
    icon: <BCIcon className='w-10 h-10' />,
    logo: <BCLogo className='w-full h-full' />,
    color: 'bg-gradient-to-br from-custom-card-bc-from to-custom-card-bc-to ',
    path: 'bc.png',
  },
  {
    name: '하나',
    icon: <HanaIcon className='w-10 h-10' />,
    logo: <HanaLogo className='w-full h-full' />,
    color: 'bg-gradient-to-br from-custom-card-hana-from to-custom-card-hana-to ',
    path: 'hana.png',
  },
  {
    name: '롯데',
    icon: <LotteIcon className='w-10 h-10' />,
    logo: <LotteLogo className='w-full h-full' />,
    color: 'bg-gradient-to-br from-custom-card-lotte-from to-custom-card-lotte-to ',
    path: 'lotte.png',
  },
  {
    name: '현대',
    icon: <HyundaiIcon className='w-10 h-10' />,
    logo: <HyundaiLogo className='w-full h-full' />,
    color: 'bg-gradient-to-br from-custom-card-hyundai-from to-custom-card-hyundai-to ',
    path: 'hyundai.png',
  },
  {
    name: '우리',
    icon: <WooriIcon className='w-10 h-10' />,
    logo: <WooriLogo className='w-full h-full' />,
    color: 'bg-gradient-to-br from-custom-card-woori-from to-custom-card-woori-to ',
    path: 'woori.png',
  },
  {
    name: '삼성',
    icon: <SamsungIcon className='w-10 h-10' />,
    logo: <SamsungLogo className='w-full h-5' />,
    color: 'bg-gradient-to-br from-custom-card-samsung-from to-custom-card-samsung-to ',
    path: 'samsung.png',
  },
  {
    name: '신한',
    icon: <ShinhanIcon className='w-10 h-10' />,
    logo: <ShinhanLogo className='w-full h-full ' />,
    color: 'bg-gradient-to-br from-custom-card-shinhan-from to-custom-card-shinhan-to ',
    path: 'shinhan.png',
  },
  {
    name: '농협',
    icon: <NonghyupIcon className='w-10 h-10' />,
    logo: <NonhyupLogo className='w-full h-5' />,
    color: 'bg-gradient-to-br from-custom-card-nonghyup-from to-custom-card-nonghyup-to ',
    path: 'nonghyup.png',
  },
  {
    name: '토스',
    icon: <TossIcon className='w-10 h-10' />,
    logo: null,
    color: 'bg-gradient-to-br from-custom-card-toss-from to-custom-card-toss-to',
    path: 'toss.png',
  },
];

export const getIcon = name => {
  const cleanName = name?.replace(/(은행|카드|뱅크)$/, '').trim();
  const company = companies.find(c => c.name === cleanName);
  return company ? company.icon : null;
};

export const getPng = name => {
  const cleanName = name?.replace(/(은행|카드|뱅크)$/, '').trim();
  const company = companies.find(c => c.name === cleanName);
  return company ? company.path : null;
};

export const getCardColor = name => {
  const cleanName = name?.replace(/(은행|카드|뱅크)$/, '').trim();
  const company = companies.find(c => c.name === cleanName);
  return company ? company.color : null;
};

export const getCardLogo = name => {
  const cleanName = name?.replace(/(은행|카드|뱅크)$/, '').trim();
  const company = companies.find(c => c.name === cleanName);
  return company ? company.logo : null;
};

export const getBankLogo = name => {
  const cleanName = name?.replace(/(은행|카드|뱅크)$/, '').trim();
  const company = companies.find(c => c.name === cleanName);
  return company ? company.path : null;
};

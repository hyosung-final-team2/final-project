import React, { useEffect, useState } from 'react';
import MyPageNoneSelect from '@heroicons/react/24/outline/UserIcon';
import MyPageSelect from '@heroicons/react/24/solid/UserIcon';
import HomeNoneSelect from '@heroicons/react/24/outline/HomeIcon';
import HomeSelect from '@heroicons/react/24/solid/HomeIcon';
import CartNoneSelect from '@heroicons/react/24/outline/ShoppingBagIcon';
import CartSelect from '@heroicons/react/24/solid/ShoppingBagIcon';
import NavItem from './FootNavItem';
import { useNavigate } from 'react-router-dom';

import useCurrentLocationStore from '../store/currentLocationStore';
import useMemberStore from '../store/memberStore';

function FootNav({ pathList }) {
  const { currentLocation, setCurrentLocation } = useCurrentLocationStore(state => ({
    currentLocation: state.currentLocation,
    setCurrentLocation: state.setCurrentLocation,
  }));

  useEffect(() => {
    if (pathList[3] !== 'mypage' && pathList[3] !== 'home') {
      return;
    }

    pathList[3] === 'mypage' ? setCurrentLocation('mypage') : setCurrentLocation('home');
  }, [pathList]);

  const { memberId } = useMemberStore(state => ({ memberId: state.memberId }));
  const navigate = useNavigate();

  return (
    <div className='absolute bottom-0 left-0 w-full h-[10dvh] flex justify-around items-center border-t border-l border-r border-gray-200 rounded-t-3xl'>
      <NavItem
        isSelected={currentLocation === 'mypage'}
        IconSelected={MyPageSelect}
        IconUnselected={MyPageNoneSelect}
        label='마이페이지'
        onClick={() => {
          setCurrentLocation('mypage');
          navigate('mypage');
        }}
      />
      <NavItem
        isSelected={currentLocation === 'home'}
        IconSelected={HomeSelect}
        IconUnselected={HomeNoneSelect}
        label='홈'
        onClick={() => {
          setCurrentLocation('home');
          navigate('home');
        }}
      />
      <NavItem
        isSelected={currentLocation === 'cart'}
        IconSelected={CartSelect}
        IconUnselected={CartNoneSelect}
        label='장바구니'
        onClick={() => {
          setCurrentLocation('cart');
          navigate('cart');
        }}
      />
    </div>
  );
}

export default FootNav;

import { themeChange } from 'theme-change';
import React, { useEffect, useState, useRef } from 'react';

import BellIcon from '@heroicons/react/24/outline/BellIcon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import BackButton from '@heroicons/react/24/outline/ChevronLeftIcon';

import { NavLink, Routes, Link, useLocation, useNavigate } from 'react-router-dom';

import useStoreStore from '../store/storeStore';

function MemHeader() {
  //   const { noOfNotifications, pageTitle } = useSelector(state => state.header);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));
  const navigate = useNavigate();
  const location = useLocation();
  const isStore = location.pathname.split('/').some(item => item === 'store');

  const { currentStoreName } = useStoreStore(state => ({
    currentStoreName: state.currentStoreName,
  }));

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setCurrentTheme('dark');
      } else {
        setCurrentTheme('light');
      }
    }
  }, []);

  // Opening right sidebar for notification
  //   const openNotification = () => {
  //     dispatch(openRightDrawer({ header: 'Notifications', bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }));
  //   };

  return (
    <>
      <div className='navbar sticky top-0 bg-base-100  z-10 shadow-md '>
        <div className='flex-1'>
          <BackButton className='h-7 inline-block w-7' onClick={() => navigate(-1)} />

          {/* <h1 className='text-2xl font-semibold ml-2'>효성스토어</h1> */}
          {/* <h1 className='text-2xl font-semibold ml-2'>{pageTitle}</h1> */}
        </div>

        {isStore ? (
          <div className='font-bold	' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            {currentStoreName}
          </div>
        ) : null}

        <div className='flex-none'>
          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

          {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}

          {/* Light and dark theme selection toogle **/}
          <label className='swap '>
            <input type='checkbox' style={{visibility:"hidden"}}/>
            <SunIcon
              data-set-theme='light'
              data-act-class='ACTIVECLASS'
              className={'fill-current w-6 h-6 ' + (currentTheme === 'dark' ? 'swap-on' : 'swap-off')}
            />
            <MoonIcon
              data-set-theme='dark'
              data-act-class='ACTIVECLASS'
              className={'fill-current w-6 h-6 ' + (currentTheme === 'light' ? 'swap-on' : 'swap-off')}
            />
          </label>

          {/* Notification icon */}
          <button className='btn btn-ghost ml-4  btn-circle' onClick={() => openNotification()}>
            <div className='indicator'>
              <BellIcon className='h-6 w-6' />
              {/* {noOfNotifications > 0 ? <span className='indicator-item badge badge-secondary badge-sm'>{noOfNotifications}</span> : null} */}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default MemHeader;

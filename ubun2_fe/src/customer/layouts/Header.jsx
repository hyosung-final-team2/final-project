import { themeChange } from 'theme-change';
import { useEffect, useState } from 'react';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import BreadCrumb from '../components/common/BreadCrumb/BreadCrumb';
import useNotificationStore from "../store/Notification/notificationStore.js";
import {onMessage} from "firebase/messaging";
import {messaging} from "../../../initFirebase.js";
import {toast} from "react-hot-toast";
import {
  delayCustomerToastStyle,
  successCustomerToastStyle,
} from "../../member/api/toastStyle.js";

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));
  const {setIsRightBarOpen}  = useNotificationStore()

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

  const [isNewAlarm,setIsNewAlarm] = useState(false);

  useEffect(() => {
    const onMessageFCM = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;

      onMessage(messaging, payload => {
        console.log('Message received. ', payload);
        console.log(payload.data?.title);
        console.log(payload.data?.content);
        if (payload.data?.title === "단건주문" || payload.data?.title === "정기주문" ) {
          toast.success(
              <div>
                <strong>{payload.data.title}</strong><br />
                {payload.data?.content}
              </div>,
              successCustomerToastStyle,
              {duration:5000}
          )
        } else {
          // 재고 부족
          toast.error(
              <div>
                <strong>{payload.data.title}</strong><br />
                {payload.data?.content}
              </div>,
              delayCustomerToastStyle,
              {duration:5000}
          )
        }
        setIsNewAlarm(true)
      });
    };

    onMessageFCM();
  }, []);


  function logoutUser() {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <>
      <div className='navbar sticky top-0 bg-base-100  z-10 rounded-t-3xl main_shadow_header'>
        <div className='flex-1'>
          <label htmlFor='left-sidebar-drawer' className='btn drawer-button lg:hidden'>
            <Bars3Icon className='h-5 inline-block w-5' />
          </label>
          {/* <h1 className='text-2xl font-semibold ml-2'>효성스토어</h1> */}
          <BreadCrumb />
        </div>

        <div className='flex-none '>
          <label className='swap '>
            <input type='checkbox' style={{visibility: 'hidden'}}/>
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

          <button className='btn btn-ghost ml-4  btn-circle' onClick={() => {
            setIsRightBarOpen(true)
            setIsNewAlarm(false)
          }}>
            <div className='indicator relative'>
              <BellIcon className='h-6 w-6'/>
              {isNewAlarm && <span className='absolute -right-3 flex w-3 h-3 me-3 bg-purple-500 rounded-full'></span>}
            </div>
          </button>


          <div className='dropdown dropdown-end ml-4 mr-2'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-10'>
                  <path
                      fillRule='evenodd'
                      d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                      clipRule='evenodd'
                  />
                </svg>
              </div>
            </label>
            <ul tabIndex={0}
                className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

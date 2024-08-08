const LandingIntro = () => {
  return (
    <div className='min-h-full rounded-l-xl main_left bg-login-main'>
      {/* <img src='/login.png' alt='' className='rounded-l-xl' /> */}

      <div className='hero-content py-12 w-full h-full bg-login-movie rounded-l-xl'>
        <div className='max-w-md w-full h-full'>
          <div className='content'>
            <div className='content__container'>
              <ul className='content__container__list'>
                <li className='content__container__list__item'>고객을</li>
                <li className='content__container__list__item'>회원을</li>
                <li className='content__container__list__item'>모두를</li>
              </ul>
              <div className='content__container__text flex justify-end items-center' style={{}}>
                <span className='mr-3'>위한</span>
                <img src='/text_logo.png' style={{ width: '160px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <video className='w-full h-full' autoPlay muted loop playsInline>
        <source src='/dashboardexample.mov' type='video/mp4' />
      </video>
    </div>
  );
};

export default LandingIntro;

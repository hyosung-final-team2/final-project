const ImportFileInfo = ({ fileInfo, setFileInfo }) => {
  return (
    <div className='mt-4'>
      <div className='flex items-center'>
        <svg width='30px' height='30px' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' fill='#000000'>
          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
          <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            <title>file_type_excel2</title>
            <path
              d='M28.781,4.405H18.651V2.018L2,4.588V27.115l16.651,2.868V26.445H28.781A1.162,1.162,0,0,0,30,25.349V5.5A1.162,1.162,0,0,0,28.781,4.405Zm.16,21.126H18.617L18.6,23.642h2.487v-2.2H18.581l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2H28.941Z'
              style={{ fill: '#20744a', fillRule: 'evenodd' }}
            ></path>
            <rect x='22.487' y='7.439' width='4.323' height='2.2' style={{ fill: '#20744a' }}></rect>
            <rect x='22.487' y='10.94' width='4.323' height='2.2' style={{ fill: '#20744a' }}></rect>
            <rect x='22.487' y='14.441' width='4.323' height='2.2' style={{ fill: '#20744a' }}></rect>
            <rect x='22.487' y='17.942' width='4.323' height='2.2' style={{ fill: '#20744a' }}></rect>
            <rect x='22.487' y='21.443' width='4.323' height='2.2' style={{ fill: '#20744a' }}></rect>
            <polygon
              points='6.347 10.673 8.493 10.55 9.842 14.259 11.436 10.397 13.582 10.274 10.976 15.54 13.582 20.819 11.313 20.666 9.781 16.642 8.248 20.513 6.163 20.329 8.585 15.666 6.347 10.673'
              style={{ fill: '#ffffff', fillRule: 'evenodd' }}
            ></polygon>
          </g>
        </svg>
        <span className='text-base font-bold mx-2 text-gray-500 dark:text-gray-400'>{fileInfo.name}</span>
        <p className='text-base text-gray-500 dark:text-gray-400'> ({(fileInfo.size / 1024).toFixed(2)} KB)</p>

        <svg
          onClick={() => {
            setFileInfo(null);
          }}
          className='ml-2 w-5 icon cursor-pointer'
          viewBox='0 0 48 48'
          xmlns='http://www.w3.org/2000/svg'
          fill='#000000'
        >
          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
          <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            {' '}
            <title>close</title>{' '}
            <g id='Layer_2' data-name='Layer 2'>
              {' '}
              <g id='invisible_box' data-name='invisible box'>
                {' '}
                <rect width='48' height='48' fill='none'></rect>{' '}
              </g>{' '}
              <g id='icons_Q2' data-name='icons Q2'>
                {' '}
                <path d='M26.8,24,37.4,13.5a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L24,21.2,13.4,10.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7L21.2,24,10.6,34.5a2.1,2.1,0,0,0-.2,2.7,1.9,1.9,0,0,0,3,.2L24,26.8,34.6,37.4a1.9,1.9,0,0,0,3-.2,2.1,2.1,0,0,0-.2-2.7Z'></path>{' '}
              </g>{' '}
            </g>{' '}
          </g>
        </svg>
      </div>
    </div>
  );
};
export default ImportFileInfo;

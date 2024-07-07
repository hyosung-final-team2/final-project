import { Modal } from 'flowbite-react';

const ExcelUploadResult = ({ isSuccess, setIsSuccess, setOpenModal, setFileInfo }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';
  return (
    <>
      <Modal.Body>
        <div className=' flex-2'>
          <p className='m-0 font-semibold'>{isSuccess ? '회원 등록에 성공하였습니다.' : '회원 등록에 실패하였습니다.'}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isSuccess ? (
          <button
            className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`}
            onClick={() => {
              setFileInfo(null);
              setIsSuccess(null);
              setOpenModal(false);
            }}
          >
            확인
          </button>
        ) : (
          <button
            className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}
            onClick={() => {
              setFileInfo(null);
              setIsSuccess(null);
            }}
          >
            다시 시도
          </button>
        )}
      </Modal.Footer>
    </>
  );
};

export default ExcelUploadResult;

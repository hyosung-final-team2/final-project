import { Modal } from 'flowbite-react';
import { customModalTheme } from '../../common/Modal/ModalStyle';
import InputExcelFile from './InputExcelFile';
import { useState, memo } from 'react';
import ImportFileInfo from './ImportFileInfo';
import ExcelUploadResult from './ExcelUploadResult';

const ExcelModal = ({ isOpen, setOpenModal }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const [fileInfo, setFileInfo] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleUploadFile = () => {
    if (fileInfo === null) return;
    //TODO: 엑셀 업로드 API 호출 성공하면 true, 실패하면 false
    setIsSuccess(false);
  };

  return (
    <Modal
      dismissible
      show={isOpen}
      theme={customModalTheme}
      onClose={() => {
        setFileInfo(null);
        setOpenModal(false);
      }}
      size='3xl'
    >
      <Modal.Header>
        <div className='text-xl font-bold'>회원 정보 일괄 등록 </div>
      </Modal.Header>
      {isSuccess === null ? (
        <>
          <Modal.Body>
            <div className=' flex-2'>
              <p className='m-0 font-semibold'>엑셀을 업로드하여 회원들의 정보를 한번에 입력할 수 있습니다.</p>
              <p className='m-0'>정해진 엑셀 양식에 입력하여 업로드 하세요.</p>
              <p className='m-0'>(지원하는 파일 양식: xlsx)</p>
              <p className='cursor-pointer text-info font-bold my-2 hover:underline'>엑셀 양식 다운로드</p>
            </div>
            {fileInfo ? <ImportFileInfo fileInfo={fileInfo} setFileInfo={setFileInfo} /> : <InputExcelFile setFileInfo={setFileInfo} />}
          </Modal.Body>
          <Modal.Footer>
            <button className={`${commonButtonStyles} bg-green-300 text-green-600 hover:text-white hover:bg-green-600`} onClick={() => handleUploadFile()}>
              저장
            </button>
            <button
              className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 `}
              onClick={() => {
                setFileInfo(null);
                setOpenModal(false);
              }}
            >
              취소
            </button>
          </Modal.Footer>
        </>
      ) : (
        <ExcelUploadResult isSuccess={isSuccess} setIsSuccess={setIsSuccess} setOpenModal={setOpenModal} setFileInfo={setFileInfo} />
      )}
    </Modal>
  );
};
export default memo(ExcelModal);

import FloatingLabelInput from '../common/input/FloatingLabelInput';
import { companies } from './CardList';
import { useState } from 'react';
import SlideUpModal from '../common/SlideUpModal';
import CardItem from './CardItem';

const BankAccountForm = ({ inputStyle, labelStyle, bank }) => {
  const [isModalOpen, setIsModalOpen] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className='space-y-6 mt-5 px-4'>
      <div className='mx-6 mb-10'>
        <h2 className='text-2xl font-bold mb-2'>결제할 계좌를 알려주세요.</h2>
        <p className='text-gray-600 text-xl'>한 번 등록해두면 다음부터는 계좌 정보를 다시 입력할 필요 없어요.</p>
      </div>
      <FloatingLabelInput id='accountNumber' label='은행 계좌번호' className='text-main' />
      <FloatingLabelInput id='accountPassword' label='계좌 비밀번호' className='text-main' />
      <FloatingLabelInput
        id='bank-selection'
        label='은행 선택'
        className='cursor-pointer'
        setIsModalOpen={setIsModalOpen}
        selectedItem={selectedItem}
        isSelectable='true'
      />
      <SlideUpModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} headerText='은행을 선택하세요' isButton={false}>
        <div className='bg-white px-4 pb-2 rounded-lg max-w-3xl w-full'>
          <div className='grid grid-cols-3 gap-3'>
            {companies.map((item, index) => {
              if (item.name == '비씨' || item.name === '삼성' || item.name === '현대' || item.name === '롯데') {
                return '';
              }
              return (
                <CardItem key={index} logo={item.icon} name={item.name} setSelectedItem={setSelectedItem} setIsModalOpen={setIsModalOpen} path={item.path} />
              );
            })}
          </div>
        </div>
      </SlideUpModal>
    </div>
  );
};

export default BankAccountForm;

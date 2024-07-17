import InfoItem from '../common/input/InfoInput';
import CreditCard from './CreditCard';
import { useState } from 'react';
import { companies } from './CardList';
import CardItem from '../PaymentMethod/CardItem';
import SlideUpModal from '../common/SlideUpModal';

const CreditCardForm = ({ inputStyle, labelStyle }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardNickname, setCardNickname] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [ccv, setCcv] = useState('');
  const [isModalOpen, setIsModalOpen] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const flipCard = flip => {
    setIsFlipped(flip);
  };

  const handleCardNum = e => {
    setCardNumber(e.target.value);
  };
  const handleCardNickname = e => {
    setCardNickname(e.target.value);
  };
  const handleExpirationDate = e => {
    setExpirationDate(e.target.value);
  };
  const handleCvc = e => {
    setCcv(e.target.value);
  };

  const handleOnClick = () => {
    flipCard(!isFlipped);
  };

  const handleModalOpen = () => {};
  return (
    <div className='bg-white px-4'>
      {/* Credit Card Display */}
      {/* <div className='bg-gray-900 text-white rounded-lg p-4 mb-6'>... (신용카드 디스플레이 부분은 그대로 유지) ...</div> */}
      <CreditCard
        cardNumber={cardNumber}
        cardNickname={cardNickname}
        ccv={ccv}
        expirationDate={expirationDate}
        isFlipped={isFlipped}
        handleClick={handleOnClick}
        owner='memberName'
        cardCompany={selectedItem}
      />
      {/* Form */}
      <form className='space-y-4'>
        <InfoItem
          label='카드 별명'
          placeholder='카드 별명을 입력해주세요.'
          inputStyle={inputStyle}
          labelStyle={labelStyle}
          onChange={handleCardNickname}
          onFocus={() => flipCard(false)}
        />
        <InfoItem label='카드사' inputStyle={inputStyle} labelStyle={labelStyle} setIsModalOpen={setIsModalOpen} placeholder='카드사를 선택해주세요' />
        <InfoItem
          label='카드 번호'
          value='**** - **** - **** - 1234'
          inputStyle={inputStyle}
          labelStyle={labelStyle}
          onChange={handleCardNum}
          onFocus={() => flipCard(false)}
        />
        <InfoItem label='카드 비밀번호' placeholder='카드 비밀번호' inputStyle={inputStyle} labelStyle={labelStyle} />
        <div className='flex'>
          <div className='flex-1 -mr-4'>
            <InfoItem label='CVC' placeholder='123' inputStyle={inputStyle} labelStyle={labelStyle} onChange={handleCvc} onFocus={() => flipCard(true)} />
          </div>
          <div className='flex-1 -ml-4'>
            <InfoItem
              label='카드 유효기간'
              placeholder='03/27'
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              onChange={handleExpirationDate}
              onFocus={() => flipCard(false)}
            />
          </div>
        </div>
      </form>
      <SlideUpModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} headerText='카드사를 선택하세요' isButton={false}>
        <div className='bg-white px-4 pb-2 rounded-lg max-w-3xl w-full'>
          <div className='grid grid-cols-3 gap-3'>
            {companies.map((item, index) => {
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

export default CreditCardForm;

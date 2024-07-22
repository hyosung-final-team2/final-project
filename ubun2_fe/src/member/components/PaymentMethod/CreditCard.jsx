import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getCardColor, getCardLogo, getIcon } from './CardList';

const CreditCard = ({ isFlipped, cardNumber, cardNickname, expirationDate, cvc, handleClick, owner, cardCompany }) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white px-8 w-full max-w-md'>
        <div className='relative h-56 w-full mb-8' onClick={handleClick}>
          <motion.div
            className='relative w-full h-full'
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of the card */}
            <div className='absolute w-full h-full' style={{ backfaceVisibility: 'hidden' }}>
              <div className={`bg-gray-900 ${getCardColor(cardCompany)} rounded-xl p-6 text-white shadow-md h-full flex flex-col justify-between`}>
                <div className='flex justify-between items-start'>
                  {cardCompany ? (
                    <div className='w-12 h-8'>{getIcon(cardCompany)}</div>
                  ) : (
                    <div className='w-12 h-8 bg-gradient-to-br from-gray-200 to-gray-100 rounded-md'></div>
                  )}

                  {cardNickname}
                </div>
                <div className='text-2xl mb-4'>{cardNumber || '****-****-****-****'}</div>
                <div className='flex justify-between'>
                  <div>
                    <div className='text-xs uppercase'>카드 별명</div>
                    <div>{owner || ''}</div>
                  </div>
                  <div>
                    <div className='text-xs uppercase'>유효기간</div>
                    <div>{expirationDate || '**/**'}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Back of the card */}
            <div className='absolute w-full h-full' style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className={`bg-gray-900 ${getCardColor(cardCompany)} rounded-xl py-1 text-white shadow-md h-full`}>
                <div className='w-full h-12 bg-gradient-to-r from-gray-400 to-gray-500 mt-8'></div>
                <div className='w-7/12 h-10 bg-gray-200 mt-5 ml-5 text-xl text-right text-black pt-2 pr-2'>{cvc || '***'}</div>
                <div className='absolute w-6/12 h-6 right-0 bottom-6'>
                  {cardCompany ? (
                    getCardLogo(cardCompany)
                  ) : (
                    <div>
                      <div className='absolute w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-400 rounded-full bottom-5 right-5'></div>
                      <div className='absolute w-10 h-10 bg-gradient-to-tl from-gray-400 to-gray-100 rounded-full bottom-5 right-10'></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;

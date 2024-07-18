import { motion, AnimatePresence } from 'framer-motion';
import BottomButton from './button/BottomButton';

const SlideUpModal = ({ isOpen, setIsModalOpen, children, headerText, buttonText, isButton = true, buttonStyle, buttonFunc, isInstallPrompt=false }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black bg-opacity-20 z-40 max-w-[100dvh]'
            style={{ position: 'absolute' }}
            onClick={() => setIsModalOpen()}
          />
          <motion.div
            initial={{ y: '50%' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            className='fixed inset-x-0 bottom-2 z-50 bg-white rounded-3xl shadow-lg p-4 max-h-[80vh] max-w-[100dvh] overflow-y-auto left-2'
            style={{ position: 'absolute', width: '96.5%' }}
          >
            {/* header */}
            <div className='flex justify-center mb-4'>
              <div className='w-2/12 h-2 bg-gray-200 rounded-3xl' onClick={() => setIsModalOpen(false)}></div>
            </div>
            <div className='flex items-center justify-between p-2 px-4 mb-4'>
              <h2 className='text-xl font-semibold'>{headerText}</h2>
            </div>

            {/* body */}
            {children}

            {/* bottom */}
            {isButton && <BottomButton buttonStyle={buttonStyle} buttonText={buttonText} buttonFunc={buttonFunc} setIsModalOpen={setIsModalOpen} />}
            {isInstallPrompt && <p className="my-3 text-gray-400 underline text-center">오늘은 그냥 볼게요</p>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideUpModal;

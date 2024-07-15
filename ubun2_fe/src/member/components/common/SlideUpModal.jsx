import { motion, AnimatePresence } from 'framer-motion';
import BottomButton from './button/BottomButton';

const SlideUpModal = ({ isOpen, setIsModalOpen, children, headerText, buttonText, isButton = true, buttonStyle, buttonFunc }) => {

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
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                        className='fixed inset-x-0 bottom-2 z-50 bg-white rounded-3xl shadow-lg p-4 max-h-[80vh] max-w-[100dvh] overflow-y-auto left-2'
                        style={{ position: 'absolute', width: '96.5%' }}
                    >
                        {/* header */}
                        <div className='flex justify-center mb-4'>
                            <div className='bg-gray-200 rounded-3xl w-2/12 h-2' onClick={() => setIsModalOpen(false)}></div>
                        </div>
                        <div className='flex justify-between items-center mb-4 p-2'>
                            <h2 className='text-xl font-semibold'>{headerText}</h2>
                        </div>

                        {/* body */}
                        {children}

                        {/* bottom */}
                        {isButton && <BottomButton buttonStyle={buttonStyle} buttonText={buttonText} buttonFunc={buttonFunc} setIsModalOpen={setIsModalOpen}/>}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SlideUpModal;
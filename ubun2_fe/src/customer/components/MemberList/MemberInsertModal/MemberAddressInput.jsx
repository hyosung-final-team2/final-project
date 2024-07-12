import { useState, useEffect } from 'react';

// import useAddressStore from '../../../store/Address/useAddressStore';
import useAddressStore from "../../../store/Address/useAddressStore.js";

const POPUP_URL = '/customer/address-search';
const POPUP_WIDTH = 700;
const POPUP_HEIGHT = 760;

const AddressInput = ({ disabled = false, infos, title, handleAddressAdd={handleAddressAdd} }) => {
    const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md ';
    const [address, setAddress] = useState({});
    console.log(address)

    const [popup, setPopup] = useState(null);
    const [formData, setFormData] = useState(
        infos.reduce((acc, info) => {
            acc[info.label] = info.value || '';
            return acc;
        }, {})
    );
    const { selectedMemberId } = useAddressStore();


    const handleAddressSearch = async () => {
        if (!disabled && !popup) {
            let url = POPUP_URL;
            const width = POPUP_WIDTH;
            const height = POPUP_HEIGHT;
            const features = `width=${width},height=${height}`;
            const newPopup = window.open(url, '_blank', features);
            newPopup.postMessage({ key: '1' }, '*');

            setPopup(newPopup);

            const waitForMessage = () => {
                return new Promise((resolve, reject) => {
                    const messageHandler = event => {
                        if (event.origin !== 'http://localhost:5173' || event.data.type !== 'ADDRESS_SELECTED') {
                            return;
                        }

                        if (event.data.type === 'ADDRESS_SELECTED') {
                            const result = event.data.result;
                            window.removeEventListener('message', messageHandler);
                            resolve(result);
                        }
                    };

                    window.addEventListener('message', messageHandler);
                });
            };

            try {
                const result = await waitForMessage();

                const addressParts = result.roadAddrPart1.split(" ");
                const city = addressParts[0];
                const district = addressParts[1];
                const roadAddress = addressParts.slice(2).join(" ");
                const formattedAddress = `${result.zipNo},${city},${district},${roadAddress}`;

                console.log(formattedAddress); // "34185,대전광역시,유성구,문화원로150"

                setAddress(result)
                setFormData(prevFormData => ({
                    ...prevFormData,
                    도로명주소: result.roadAddrPart1 || '',
                    우편번호: result.zipNo || '',
                }));
            } catch (error) {
                console.error('Failed to receive message', error);
            } finally {
                if (newPopup) {
                    newPopup.close();
                }
                setPopup(null);
            }
        }
    };

    useEffect(() => {
        const handleMessage = event => {
            if (event.origin !== 'http://localhost:5173' || event.data.type !== 'ADDRESS_SELECTED') {
                return;
            }

            if (event.data.type === 'ADDRESS_SELECTED') {
                const result = event.data.result;
                setAddress(result);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    도로명주소: result.roadAddr || '',
                    우편번호: result.zipNo || '',
                }));
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const handleChange = (label, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [label]: value,
        }));
    };

    const handleOnClick = async () => {
        const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
        if (!allFieldsFilled) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }

        // 주소 필드를 합쳐서 fullAddress 생성
        const fullAddress = [formData['우편번호'], formData['도로명주소'], formData['상세주소']].filter(Boolean).join(' ');

        // 문자열을 공백 기준으로 분할
        const addressParts = fullAddress.split(" ");
        const zipNo = addressParts[0];
        const city = addressParts[1];
        const district = addressParts[2];
        const roadAddress = addressParts.slice(3).join(" ");
        const formattedAddress = `${zipNo},${city},${district},${roadAddress}`;

        // 주소 추가 처리
        handleAddressAdd({
            addressId: null,
            address: formattedAddress
        });

        // 입력 필드 초기화
        setFormData({
            우편번호: '',
            도로명주소: '',
            상세주소: ''
        });


    };

    return (
        <div className='p-3'>
            <h3 className='text-xl font-bold mb-4'>{title}</h3>
            <div className='grid auto-cols-auto gap-4' style={{ gridTemplateColumns: '3fr 5fr 5fr 3fr' }}>
                {infos.map((info, index) => (
                    <div className='relative' key={index} onClick={info.label !== '상세주소' ? handleAddressSearch : null}>
                        <input
                            className='w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700'
                            placeholder={info.placeholder}
                            value={formData[info.label]}
                            onChange={e => handleChange(info.label, e.target.value)}
                            disabled={disabled}
                            readOnly={info.label !== '상세주소' && !disabled}
                        />
                        <label className='absolute text-xs text-gray-500 left-3 -top-2 bg-white px-1'>{info.label}</label>
                    </div>
                ))}
                <button
                    className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}
                    onClick={handleOnClick}
                >
                    추가
                </button>
            </div>
        </div>
    );
};

export default AddressInput;
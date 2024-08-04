import  {useCallback, useEffect, useRef, useState} from 'react';
import { PlusCircleIcon } from '@heroicons/react/16/solid';
import { FileInput } from 'flowbite-react';
import ImageWithOverlay from './ImageWithOverlay';

const ProductImageCard = ({ product, onlyInfo, title, handleInputImageChange, handleDetailImagesChange, handleChangeIndex, modalImageFile, modalDetailImageFiles,mainImagePreview }) => {
  const fileInputRef = useRef(null);
  const detailFileInputRefs = [useRef(null), useRef(null), useRef(null)];

  const [previewUrl, setPreviewUrl] = useState(null);
  const [productDetailPreviewUrls, setProductDetailPreviewUrls] = useState([null, null, null]);
  const [detailImageFiles, setDetailImageFiles] = useState([]);

  const [localChangeIndex, setLocalChangeIndex] = useState([]);

  useEffect(() => {
    if (mainImagePreview) {
      setPreviewUrl(mainImagePreview);
    }

    if (modalDetailImageFiles?.length > 0) {
      setDetailImageFiles(modalDetailImageFiles)
    } else if (product?.detailImagesPath) {
      setProductDetailPreviewUrls(product?.detailImagesPath.concat(Array(3 - product?.detailImagesPath.length).fill(null)));
      setDetailImageFiles(product?.detailImagesPath.concat(Array(3 - product?.detailImagesPath.length).fill(null)))
    }

  }, [product, modalImageFile, modalDetailImageFiles]);


  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleDetailIconClick = index => {
    detailFileInputRefs[index].current.click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    // handleInputImageChange(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    handleInputImageChange(file,url);
  };


  const handleDetailFileChange = useCallback((e, index) => {
    const file = e.target.files[0];
    const newDetailImageFiles = [...detailImageFiles];
    newDetailImageFiles[index] = file;
    setDetailImageFiles(newDetailImageFiles);
    handleDetailImagesChange(newDetailImageFiles);

    const url = URL.createObjectURL(file);
    setProductDetailPreviewUrls(prev => {
      const newUrls = [...prev];
      newUrls[index] = url;
      return newUrls;
    });

    setLocalChangeIndex(prev => {
      const newChangeIndex = prev.includes(index) ? prev : [...prev, index];
      return newChangeIndex;
    });
  }, [detailImageFiles, handleDetailImagesChange]);

  useEffect(() => {
    handleChangeIndex(localChangeIndex);
  }, [localChangeIndex, handleChangeIndex]);

  return (
    <div className='bg-gray-50 p-4 rounded-lg h-full flex flex-col'>
      <div className='text-lg font-bold mb-4'>{title}</div>
      <div className='w-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg aspect-square'>
        {previewUrl ? (
          <ImageWithOverlay url={previewUrl} onClick={handleIconClick} disabled={onlyInfo} />
        ) : (
          <div className='h-full flex flex-col items-center justify-center gap-4'>
            {!onlyInfo && (
              <>
                <div className='bg-gray-100 p-2 rounded-lg'>
                  <p className='text-sm'>등록하실 상품의 사진을 등록해주세요.</p>
                </div>
                <button onClick={handleIconClick}>
                  <PlusCircleIcon className='w-7 h-7 text-purple-200' />
                </button>
              </>
            )}
          </div>
        )}
        <FileInput id='file-upload' onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
      </div>
      <div className='flex w-full pt-1 rounded-lg gap-1'>
        {productDetailPreviewUrls.map((url, index) => (
          <div key={index} className='w-1/3 border-2 border-dashed border-gray-300 aspect-square rounded-lg flex justify-center items-center'>
            {url ? (
              <ImageWithOverlay url={url} onClick={() => handleDetailIconClick(index)} disabled={onlyInfo} isDetail={true} />
            ) : (
              !onlyInfo && (
                <button onClick={() => handleDetailIconClick(index)}>
                  <PlusCircleIcon className='w-7 h-7 text-purple-200' />
                </button>
              )
            )}
            <FileInput
              id={`detail-file-upload-${index}`}
              onChange={e => handleDetailFileChange(e, index)}
              ref={detailFileInputRefs[index]}
              style={{ display: 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageCard;

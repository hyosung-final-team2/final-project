import { Button } from 'flowbite-react';

const IconButton = ({ IconComponent, onClickBtn, btnColor }) => {
  return (
    <Button onClick={onClickBtn} pill size='xs' className='rounded-md' color={btnColor}>
      <IconComponent className='w-3.5 h-3.5' />
    </Button>
  );
};

export default IconButton;

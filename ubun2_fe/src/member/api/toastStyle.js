const baseToastStyle = {
  style: {
    color: '#FFF',
    padding: '12px',
    borderRadius: '35px',
    background: 'rgba(138, 149, 161, 0.6)',
    // margin: '100px',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)',
    maxWidth: 800,
    minWidth: 280,
  },
  position: 'top-center',
};

const baseCustomerToastStyle = {
  style: {
    color: '#FFF',
    padding: '12px',
    borderRadius: '35px',
    background: 'rgba(138, 149, 161, 0.6)',
    // margin: '100px',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)',
    maxWidth: 800,
    minWidth: 280,
  },
  position: 'top-right',
}

/* 아래의 형식대로 작성해서 사용해주세용
 * toast.success("메세지", successToastStyle)
 */
export const successToastStyle = {
  ...baseToastStyle,
  iconTheme: {
    primary: '#15BF7E',
    secondary: '#FDFFFF',
  },
};

export const successCustomerToastStyle = {
  ...baseCustomerToastStyle,
  iconTheme: {
    primary: '#15BF7E',
    secondary: '#FDFFFF',
  },
};


/* 아래의 형식대로 작성해서 사용해주세요
 * toast.error("메세지", errorToastStyle)
 */
export const errorToastStyle = {
  ...baseToastStyle,
  iconTheme: {
    primary: '#E64952',
    secondary: '#FDFFFF',
  },
};

export const errorCustomerToastStyle = {
  ...baseCustomerToastStyle,
  iconTheme: {
    primary: '#E64952',
    secondary: '#FDFFFF',
  },
};


export const delayToastStyle = {
  ...baseToastStyle,
  iconTheme: {
    primary: '#F59E0B',
    secondary: '#FDFFFF',
  },
}

export const delayCustomerToastStyle = {
  ...baseCustomerToastStyle,
  iconTheme: {
    primary: '#F59E0B',
    secondary: '#FDFFFF',
  },
}

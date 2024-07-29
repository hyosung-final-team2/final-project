export const nameRegex = /[가-힣a-zA-Z]+/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const loginIdRegex = /^[A-Za-z0-9]{6,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const authNumRegex = /^\d{6}$/
export const phoneRegex = /^(010|011|016|017|018|019)\d{3,4}\d{4}$/;
export const businessNumRegex = /^\d{3}-\d{2}-\d{5}$/
export const businessStoreNameRegex = /[가-힣a-zA-Z]+/;



export const nameRegexMessage = "이름을 입력해주세요"
export const emailRegexMessage = "이메일 형식에 맞게 입력해주세요"
export const loginIdRegexMessage = "알파벳과 숫자 6자리 이상"
export const passwordRegexMessage = "알파벳, 숫자, 특수문자를 포함한 8자리 이상"
export const authNumRegexMessage = "인증번호 숫자 6자리"
export const phoneRegexMessage = "ex) 01012345678"
export const passwordCheckRegexMessage = "비밀번호가 일치하지 않습니다";
export const businessNumRegexMessage = "ex) 123-45-67890"
export const datePickMessage = "개업일자를 선택해주세요"
export const businessOwnerRegexMessage = "대표자명을 입력해주세요"
export const businessStoreNameRegexMessage = "상호명을 입력해주세요"
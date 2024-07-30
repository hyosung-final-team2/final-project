export const formatPhoneNumber = (phoneNumber) => {
    // 숫자만 추출
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // 번호가 올바른 길이인지 확인 (10 또는 11자리)
    if (cleaned.length === 10) {
        // 10자리 전화번호 (예: 011-123-4567)
        const part1 = cleaned.slice(0, 3);
        const part2 = cleaned.slice(3, 6);
        const part3 = cleaned.slice(6, 10);
        return `${part1}-${part2}-${part3}`;
    } else if (cleaned.length === 11) {
        // 11자리 전화번호 (예: 010-1234-5678)
        const part1 = cleaned.slice(0, 3);
        const part2 = cleaned.slice(3, 7);
        const part3 = cleaned.slice(7, 11);
        return `${part1}-${part2}-${part3}`;
    } else {
        // 길이가 맞지 않으면 원본 반환
        return phoneNumber;
    }
}
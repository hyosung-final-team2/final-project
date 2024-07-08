package kr.or.kosa.ubun2_be.domain.member.exception.member;


import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class MemberException extends CustomException {
    private MemberExceptionType memberExceptionType;

    public MemberException(MemberExceptionType memberExceptionType) {
        this.memberExceptionType = memberExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.memberExceptionType;
    }
}

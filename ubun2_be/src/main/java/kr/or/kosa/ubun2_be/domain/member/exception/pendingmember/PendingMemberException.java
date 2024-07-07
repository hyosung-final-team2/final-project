package kr.or.kosa.ubun2_be.domain.member.exception.pendingmember;


import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class PendingMemberException extends CustomException {
    private PendingMemberExceptionType pendingMemberExceptionType;

    public PendingMemberException(PendingMemberExceptionType memberExceptionType) {
        this.pendingMemberExceptionType = memberExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.pendingMemberExceptionType;
    }
}

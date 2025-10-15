package rootLab.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p> 본사 DB의 Manager 테이블에 대한 클래스.
 * <p> Manager 테이블에 대한 접근을 지원합니다.
 * @author AhnJH
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManagerDto {
    private int mNo;                    // 관리자번호
    private int siNo;                   // 사이트번호(FK)
    private String mId;                 // 아이디
    private String mPwd;                // 비밀번호
    private String mNick;               // 닉네임
    private String mGender;             // 성별('남','여')
    private String mPhone;              // 전화번호
    private String mEmail;              // 이메일
    private String mAdd1;               // 도로명 주소
    private String mAdd2;               // 상세주소
    private String mCreatedAt;          // 가입일
    private String mUpdatedAt;          // 수정일
    private String mDeletedAt;          // 탈퇴일
    private boolean mTermsAgreed;       // 이용약관 동의
    private boolean mLocationAgreed;    // 위치정보 동의
    private boolean mPushAgreed;        // 푸시알림 동의
    private String memo;                // 메모
    private int mAuth;                  // 권한 (1:시스템관리자, 2:지자체관리자)
} // class end
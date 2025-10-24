package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rootLab.model.dto.LDongCodeDto;
import rootLab.model.mapper.LDongCodeMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LDongCodeService {
    private final LDongCodeMapper lDongCodeMapper;

    /**
     * [LC-01] 시군구 전체조회
     * <p>
     * LDongCode 테이블의 모든 정보를 조회한다.
     *
     * @return LDongCode 테이블의 모든 정보
     * @author AhnJH
     */
    public List<LDongCodeDto> getLDongCode(){
        return lDongCodeMapper.getLDongCode();
    } // func end

    /**
     * [LC-02] 시군구 개별조회
     * <p>
     * [법정동코드No]를 입력받아, 해당하는 시군구 정보를 조회한다.
     *
     * @param ldNo 조회할 법정동코드No
     * @return 법정동코드No에 해당하는 시군구 정보
     * @author AhnJH
     */
    public LDongCodeDto getLDongCodeByldNo(int ldNo){
        return lDongCodeMapper.getLDongCodeByldNo(ldNo);
    } // func end
} // class end
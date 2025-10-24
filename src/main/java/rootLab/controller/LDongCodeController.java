package rootLab.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rootLab.service.LDongCodeService;

@RestController
@RequestMapping("/ldongcode")
@RequiredArgsConstructor
public class LDongCodeController {
    private final LDongCodeService lDongCodeService;

    /**
     * [LC-01] 시도 전체조회
     * <p>
     * LDongCode 테이블의 모든 시도 정보를 조회한다.
     *
     * @return LDongCode 테이블의 모든 시도 정보
     * @author AhnJH
     */
    @GetMapping("/getregn")
    public ResponseEntity<?> getLDongRegn(){
        return ResponseEntity.ok(lDongCodeService.getLDongRegn());
    } // func end

    /**
     * [LC-02] 시군구 리스트조회
     * <p>
     * [시도코드]를 입력받아, 해당하는 시도의 시군구 정보를 조회한다.
     *
     * @param lDongRegnCd
     * @return 해당하는 시도의 시군구 정보
     * @author AhnJH
     */
    @GetMapping("/getsigngu")
    public ResponseEntity<?> getLDongSignguByRegnCd(@RequestParam int lDongRegnCd){
        return ResponseEntity.ok(lDongCodeService.getLDongSignguByRegnCd(lDongRegnCd));
    } // func end

    /**
     * [LC-03] 시군구 개별조회
     * <p>
     * [법정동코드No]를 입력받아, 해당하는 시군구 정보를 조회한다.
     *
     * @param ldNo 조회할 법정동코드No
     * @return 법정동코드No에 해당하는 시군구 정보
     * @author AhnJH
     */
    @GetMapping("/getbtldno")
    public ResponseEntity<?> getLDongCodeByldNo(@RequestParam int ldNo){
        return ResponseEntity.ok(lDongCodeService.getLDongCodeByldNo(ldNo));
    } // func end
} // class end
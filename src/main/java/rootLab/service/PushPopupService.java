package rootLab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rootLab.model.dto.PushPopupDto;
import rootLab.model.mapper.PushPopupMapper;
import rootLab.util.file.FileUtil;
import rootLab.util.pagenation.Page;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PushPopupService {

    private final PushPopupMapper pushPopupMapper;
    private final FileUtil fileUtil;

    /**
     * 4. 수정
     *
     * @author juju9595
     */
    //1. 검색
    public Page<PushPopupDto> searchPush( String ppUse, String ppType, String ppTitle, String status, int page, int pageSize){
    List<PushPopupDto> searchPush = pushPopupMapper.searchPush( ppUse, ppType, ppTitle, status);
        return new Page<>(
                searchPush,
                searchPush.size(),
                page, pageSize

        );
    }

    //2. 등록
    public int addPush(PushPopupDto pushPopupDto) {
        pushPopupMapper.addPush(pushPopupDto);
        if(pushPopupDto.getPpNo() > 0){
        return pushPopupDto.getPpNo();
    }else{
        return 0;
    }
}

    //3. 삭제
    public boolean deletePush(int ppNo){
        return pushPopupMapper.deletePush(ppNo) > 0;
    }

    //4. 수정
    public boolean updatePush(PushPopupDto dto){
        if(dto.getPpNo() == 0) return false; // 키 누락 방지
        return pushPopupMapper.updatePush(dto) > 0;
    }

    //5. 파일 등록
    private String uploadFile(MultipartFile multipartFile, String ppImg){
        if( multipartFile == null || multipartFile.isEmpty()) return null;
        try{
            return fileUtil.uploadFile(multipartFile, "ppImg", "1");
        } catch (Exception e) {
            return null;
        }
    }

}

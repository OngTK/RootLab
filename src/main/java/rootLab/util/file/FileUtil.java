package rootLab.util.file;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Component
@Log4j2
public class FileUtil {
    // 업로드 기본 경로
    private String baseDir = System.getProperty("user.dir");
    private String uploadPath = baseDir + "/build/resources/main/img/";

    /**
     * 업로드된 파일을 받아서, 파일을 업로드하는 기능
     *
     * @param multipartFile 업로드된 파일
     * @param imgCategory   카테고리 타입(마커, 푸시, 파비콘, 로고 등)
     * @return 생성된 파일명
     * @author AhnJH
     */
    // todo 팀원 간 협의를 통해 파일 경로 수정 필요
    public String uploadFile(MultipartFile multipartFile, String imgCategory){
        // 1. 중복 이미지명 제거를 위한 UUID 생성
        String uuid = UUID.randomUUID().toString();
        // 2. UUID를 기반으로 한 파일명 생성
        String fileName = uuid + "_" + multipartFile.getOriginalFilename().replaceAll("_", "-");
        // 3. 업로드할 파일 경로 생성
        String uploadFilePath = uploadPath + imgCategory + "/";
        // 4. 파일경로 File 객체 생성
        File filepath = new File(uploadFilePath);
        // 5. 파일경로 존재여부 확인 | 존재하지 않으면, 폴더 생성
        if (!filepath.exists()){
            filepath.mkdirs();
        } // if end
        // 6. 업로드할 파일의 File 객체 생성
        File finalFilePath = new File(uploadFilePath + fileName);
        // 7. File 객체를 통한 업로드 진행
        try {
            multipartFile.transferTo(finalFilePath);
        } catch (IOException e) {
            log.error("파일 업로드 중 오류 발생\n" + e);
        } // try-catch end
        // 8. 최종적으로 UUID가 포함된 파일명 반환
        return fileName;
    } // func end
} // class end
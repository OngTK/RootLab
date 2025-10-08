package rootLab.util.pagenation;

import lombok.*;

/**
 * [ PageRequest ]
 * <p>
 * 페이지네이션을 위한 요청 class
 *
 * @author OngTK
 * @since 2025.10.08
 */

@Data
@Builder
@AllArgsConstructor
public class PageRequest {

    // [1] 멤버변수
    private int page;       // page : 1부터 시작
    private int size;       // size : 페이지 크기
    private Sort sort;      // sort : 정렬 (nullable)

    // [2] 생성자
    // sort 가 null 일 경우
    public PageRequest(int page, int size) {
        this(page, size, null);
    }

    // [3.1] 메소드 - SQL OFFSET 계산
    public int offset() {
        return (page - 1) * size;
    } // func end

    // [3.2] 메소드 - SQL LIMIT 값
    public int limit() {
        return size;
    } // func end

} // class end

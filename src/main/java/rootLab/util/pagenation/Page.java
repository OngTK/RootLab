package rootLab.util.pagenation;

import java.util.List;
import lombok.*;

/**
 * [Page 페이지네이션 결과]
 * @author OngTK
 * @since 2025.10.08
 */

@Data
@Builder
@AllArgsConstructor
public class Page<T> {
    // [1] 멤버변수
    private List<T> content;        // 현재 페이지의 DTO 데이터 list
    private int totalElements;      // DTO 총 개수
    private int page;               // 현재 페이지 번호
    private int size;               // 한 페이지 당 게시물 수

    // [3] 메소드 - 총 페이지 수
    public long getTotalPages() {
        // totalElements + size - 1 : size로 나눌 때, 올림의 효과를 얻기 위해
        return (totalElements + size - 1) / size;
    } // func end
} // class end
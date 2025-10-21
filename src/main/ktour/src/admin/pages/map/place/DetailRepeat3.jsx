/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측]플레이스 반복정보(3.info2) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.20
 * @version 0.1.0
 */

export default function DetialRepeat3(props) {

/** ========================= [본문 우측] 플레이스 반복정보(3.info2) 컴포넌트============================== */
    return (
        <>
            <div className="placeRepeatWrap">
                <form aria-label="반복정보 입력">
                    <fieldset>
                        <legend>반복정보</legend>
                        {/* 1. 제목 입력 필드 */}
                        <div className="form-group">
                            {/* <label>의 for와 <input>의 id를 일치시켜 명시적 연결 */}
                            <label htmlFor="post-title">제목</label>
                            <input type="text" id="post-title" name="title" />
                        </div>
                        {/* 2. 내용 입력 필드 - 내용이 길다면 <textarea>를 사용하는 것이 더 적절합니다. */}
                        <div className="form-group">
                            <label htmlFor="post-content">내용</label>
                            <input type="text" id="post-content" name="content" />
                        </div>

                        <div className="info_date">
                            <b>등록일:</b>2025-00-00 (00:00:00)<b>수정일:</b>2025-00-00 (00:00:00)
                        </div>
                        <div className="form-actions">
                            <button type="button">저장</button> <button>삭제</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    )
}// DetialRepeat3.jsx end
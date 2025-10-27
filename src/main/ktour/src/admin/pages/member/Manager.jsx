/**
 * 관리자단 > 회원관리 > 관리자현황 페이지 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.1
 */
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DragResizeLayer from "@admin/components/common/DragResizeLayer"
export default function Manager(props) {

    const { layerContainerRef } = useOutletContext();   // 상위 LayoutAdmin에서 전달받음
    const [showList, setShowList] = useState(false);     // 1번 레이어(목록조회) 표시(노출) 여부 상태
    const [showDetail, setShowDetail] = useState(false); // 2번 레이어(상세조회) 표시(노출) 여부 상태

    /** =========================== Manager.jsx ============================= */
    return <>
        <h3> 관리자현황 </h3>
        <p> 관리자현황 </p>
        <button onClick={() => setShowList(true)}>목록조회</button>
        <button onClick={() => setShowDetail(true)}>상세조회</button>
        {/* 조건부 렌더링(conditional rendering) : {showList && ( ... )} --> showList가 true일 때만 <DragResizeLayer> 출력 */}
        {/* 1) 목록조회 레이어 */}
        {showList && (
            <DragResizeLayer
                layerContainerRef={layerContainerRef}
                titleText="📋 관리자 목록"
                initialOffset={{ x: -100, y: 0 }}   // 중앙 기준 오른쪽으로 220px
                onClose={() => setShowList(false)}
                onCancel={() => setShowList(false)}
                onSave={() => { alert("목록 저장 완료!"); setShowList(false); }}
            >
                <div style={{ padding: 8 }}>
                    <p>11111 관리자 목록 데이터를 여기에 표시할 수 있습니다.</p>
                    <ul>
                        <li>홍길동 - 최고관리자</li>
                        <li>김민수 - 운영자</li>
                        <li>이정은 - 콘텐츠 담당자</li>
                    </ul>
                </div>
            </DragResizeLayer>
        )}

        {/* 2) 상세조회 레이어 (겹칠 수 있어 zIndex만 살짝 높임) */}
        {showDetail && (
            <DragResizeLayer
                layerContainerRef={layerContainerRef}
                titleText="🔎 관리자 상세 조회"
                initialOffset={{ x: 100, y: 0 }}   // 중앙 기준 오른쪽으로 220px
                onClose={() => setShowDetail(false)}
                onCancel={() => setShowDetail(false)}
                onSave={() => { alert("상세 저장 완료!"); setShowDetail(false); }}
            >
                <div style={{ padding: 8 }}>
                    <p>22222 관리자 상세 정보를 여기에 표시할 수 있습니다.</p>
                    <div style={{ display: "grid", gap: 8 }}>
                        <div><strong>이름</strong> : 홍길동</div>
                        <div><strong>권한</strong> : 최고관리자</div>
                        <div><strong>상태</strong> : 활성</div>
                    </div>
                </div>
            </DragResizeLayer>
        )}
    </>
}// Manager.jsx end
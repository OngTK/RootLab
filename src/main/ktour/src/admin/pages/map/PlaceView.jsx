/**
 * 관리자단 > 관광정보관리 > 플레이스현황(PlaceInfo) > [본문 우측]플레이스 상세뷰(CRUD) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.20
 * @version 0.1.0
 */

import PlaceCommon from "@admin/pages/map/PlaceCommon";  //* (본문 우측)플레이스 공통(기본정보) 컴포넌트 */
import PlaceIntro from "@admin/pages/map/PlaceIntro";    //* (본문 우측)플레이스 상세정보(인트로) 컴포넌트 */
import PlaceRepeat from "@admin/pages/map/PlaceRepeat";  //* (본문 우측)플레이스 반복정보(info2) 컴포넌트 */

export default function PlaceView(props) {

/** ============================ [본문 우측]플레이스 상세정보(CRUD) ============================== */
    return (
        <>
            {/* <!-- 상세뷰(CRUD) 시작 --> */}
            <section className="registWrap">
                {/* <!-- 탭/타이틀/버튼 시작 --> */}
                <div className="titleBox">
                    <ul className="tabtitle">
                        <li className="active">기본정보</li>
                        <li>상세정보</li>
                        <li>반복정보</li>
                    </ul>
                    <span className="btnBox">
                        <button type="button" className="btn full">저장</button>
                        <button type="button" className="btn line">삭제</button>
                        <button type="button" className="btn line">신규등록</button>
                    </span>
                </div>
                {/* <!--탭/타이틀/버튼 시작  --> */}

                {/* <!-- 상세정보 입/출력 시작 --> */}
                <div className="formWrap">
                    <PlaceCommon />
                    <hr />
                    <PlaceIntro />
                    <hr />
                    <PlaceRepeat />
                </div>
                {/* <!-- 상세정보 입/출력 끝 --> */}
            </section>
            {/* <!-- 상세뷰(CRUD) 끝 --> */}
        </>
    );
}// PlaceView.jsx end
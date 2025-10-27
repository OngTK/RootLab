/**
 * 관리자단 > 사이트관리 > 사이트정보(site) >상세정보(DetailSection.jsx) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.27
 * @version 0.1.0
 */

export default function DetailSection(props) {

    /** ============================ 사이트정보(site) > 상세정보(DetailSection.jsx) ============================== */
    return (
        <>
            {/* <!-- 상세정보(CRUD) 시작 --> */}
            <section className="registWrap">
                {/* <!-- 탭/타이틀/버튼 시작 --> */}
                <div className="titleBox">
                    <ul className="tabtitle">
                        <li className="active">사이트 기본정보</li>
                    </ul>
                    <span className="btnBox">
                        <button type="button" className="btn line">신규등록</button>
                        <button type="button" className="btn line">삭제</button>
                        <button type="button" className="btn full">저장</button>
                    </span>
                </div>
                {/* <!--탭/타이틀/버튼 끝  --> */}

                {/* <!-- 탭/본문 상세정보 시작 --> */}
                <div className="formWrap">

                    <form id="userForm" method="post">
                        <fieldset>

                            <div className="form-group">
                                <label htmlFor="siDomain"><b>도메인(URL)</b></label>
                                <input type="text" id="siDomain" required placeholder="도메인(URL)" disabled />
                                <button type="button">바로가기</button>
                            </div>
                            <div>
                                <span className="form-group">
                                    <label htmlFor="siName "><b>사이트명</b></label>
                                    <input type="text" id="siName" required placeholder="사이트명" />
                                </span>

                                <span className="form-group">
                                    <label htmlFor="siIsPublic"><b>사이트공개여부</b></label>
                                    <select id="siIsPublic">
                                        <option value="0">비공개</option>
                                        <option value="1">공개</option>
                                    </select>
                                </span>
                            </div>
                            <div>
                                <span className="form-group">
                                    <label htmlFor="siTel"><b>대표전화</b></label>
                                    <input type="text" id="siTel" required placeholder="대표전화" />
                                </span>

                                <span className="form-group">
                                    <label htmlFor="siEmail"><b>대표이메일</b></label>
                                    <input type="text" id="siEmail" name="siEmail" required placeholder="대표이메일" />
                                </span>
                            </div>
                            <div>
                                <span className="form-group">
                                    <label htmlFor="siPrivacyOfficer"><b>개인정보책임자</b></label>
                                    <input type="text" id="siPrivacyOfficer" required placeholder="개인정보처리책임자" />
                                </span>

                                <span className="form-group">
                                    <label htmlFor="mId"><b>관리자명(ID)</b></label>
                                    <select id="mId" disabled>
                                        <option value="">이름(아이디)</option>
                                    </select>
                                </span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="siIntro"><b>사이트소개</b></label>
                                <textarea id="siIntro" placeholder="간단한 사이트 소개글을 입력하세요."></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="siKeywords "><b>검색키워드</b></label>
                                <textarea id="siKeywords" placeholder="사이트 검색 키워드를 입력하세요."></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="siMemo"><b>이슈/메모</b></label>
                                <textarea id="siMemo"  placeholder="사이트 관련 이슈/메모를 입력하세요."></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="siLogo "><b>로고이미지</b></label>
                                <input type="file" id="siLogo " name="siLogo" required />
                                <span className="info_date">* 이미지 권장 사이즈: 120px * 50px</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="siFavicon "><b>파비콘이미지</b></label>
                                <input type="file" id="siFavicon " name="siFavicon" required />
                                <span className="info_date">* 이미지 권장 사이즈: 80px * 80px</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="siMarker"><b>마커이미지</b></label>
                                <input type="file" id="siMarker" name="siMarker" required />
                                <span className="info_date">* 이미지 권장 사이즈: 500px * 500px</span>
                            </div>
                            <div class="info_date"><b>등록일:</b>2025-00-00 (00:00:00)<b>수정일:</b>2025-00-00 (00:00:00)</div>
                        </fieldset>
                    </form>



                </div>
                {/* <!-- 탭/본문 상세정보 끝 --> */}
            </section>
            {/* <!-- 상세정보(CRUD) 끝 --> */}
        </>
    );
}// DetailSection.jsx end
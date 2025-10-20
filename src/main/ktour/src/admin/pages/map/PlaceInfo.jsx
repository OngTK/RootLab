/**
 * 관리자단 > 관광정보관리 > 플레이스현황 페이지 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.19
 * @version 0.1.1
 */
import "@assets/admin/css/place_info.css"; // 플레이스현황 place_info.css

export default function PlaceInfo( props ){

/** ========================= 관리자단 > 관광정보관리 > 플레이스현황 .jsx영역 ================================== */
    return<>
       {/* <!-- 본문 좌/우 분할 섹션 시작 --> */}
            <div className="bothWrap">
                
                {/* <!-- (1.좌측)검색/리스트 시작 --> */}
                <section className="listWrap">
                     {/* <!-- 페이지 타이틀 시작 --> */}
                    <div className="pageTitle">
                        <h1><span></span></h1>
                        <span className="path">
                            <a href="${pathUrl1}"></a>
                            <a href="${pathUrl2}"></a>
                        </span>
                    </div>
                    {/* <!-- 페이지 타이틀 끝 --> */}
                    {/* <!-- 조건검색창 시작 --> */}
                    <div className="detailSearch">
                        <form >
                            <label><b>콘텐츠타입</b>
                                <select>
                                    <option value="">전체</option>
                                    <option value="1">관광지</option>
                                    <option value="2">문화시설</option>
                                    <option value="3">행사/공연/축제</option>
                                    <option value="4">여행코스</option>
                                    <option value="5">레포츠</option>
                                    <option value="6">숙박</option>
                                    <option value="7">쇼핑</option>
                                    <option value="8">음식점</option>
                                </select>
                            </label>
                            <label><b>노출여부</b>
                                <select>
                                    <option value="">전체</option>
                                    <option value="1">노출</option>
                                    <option value="2">비노출</option>
                                </select>
                            </label>
                            <label><b>카테고리</b>
                                <select className="">
                                    <option value="">대분류</option>
                                    <option value="AC">숙박</option>
                                    <option value="C01">추천코스</option>
                                    <option value="EV">축제/공연/행사</option>
                                    <option value="EX">체험관광</option>
                                    <option value="FD">음식</option>
                                </select>

                                <select>
                                    <option value="">중분류</option>
                                    <option value="AC01">호텔</option>
                                    <option value="AC02">콘도미니엄</option>
                                    <option value="AC03">펜션/민박</option>
                                    <option value="AC04">모텔</option>
                                    <option value="AC05">캠핑</option>
                                </select>

                                <select>
                                    <option value="">소분류</option>
                                    <option value="AC010100">호텔</option>
                                    <option value="AC020100">콘도</option>
                                    <option value="AC020200">레지던스</option>
                                    <option value="AC030100">펜션</option>
                                    <option value="AC030200">한옥스테이</option>
                                </select>
                            </label>
                            
                            <br/>
                            <label><b>1차지역</b>
                                <select className="subsStatusInput">
                                    <option value="">전체</option>
                                    <option value="">서울</option>
                                    <option value="">경기도</option>
                                </select>
                            </label>
                            <label><b>2차지역</b>
                                <select className="">
                                    <option value="">전체</option>
                                    <option value="">강남구</option>
                                    <option value="">동작구</option>
                                </select>
                            </label>
                            <label><b>주소명</b>
                                <input type="text"/>
                            </label>
                            <label><b>대표전화</b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>플레이스명</b>
                                <input type="text"/>
                            </label>
                            <label><b>플레이스번호</b>
                                <input type="text"/>
                            </label>
                            <button type="button" className="searchBtn">검색</button>
                        </form>
                    </div>
                    {/* <!-- 조건검색창 끝 --> */}

                    {/* <!-- 목록(리스트) 테이블 시작 --> */}
                    <ul className="titleBox">
                        <li className="result">검색결과 : @@개</li>
                        <li className="btnBox">
                            <select className="baseDateInput">
                                <option value="10">10개 보기</option>
                                <option value="30">30개 보기</option>
                                <option value="50">50개 보기</option>
                            </select>
                            <button type="button" className="btn line">엑셀 다운로드</button>
                        </li>
                    </ul>
                    <div className="tableWrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>플레이스번호</th>
                                    <th>플레이스명</th>
                                    <th>콘텐츠타입</th>
                                    <th>카테고리(소분류)</th>
                                    <th>주소</th>
                                    <th>대표전화</th>
                                    <th>노출여부</th>
                                    <th>등록일</th>
                                    <th>수정일</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="active">
                                    <td>2</td>
                                    <td>2932765</td>
                                    <td><b>새해 맞이 불꽃쇼 & 소원 풍선 날리기 축제</b></td>
                                    <td>행사/공연/축제</td>
                                    <td>문화관광축제</td>
                                    <td>강원특별자치도 고성군 삼포해변길 9 오션투유콘도</td>
                                    <td>1666-1243</td>
                                     <td>비노출</td>
                                    <td>2025-00-00</td>
                                    <td>2025-00-00</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>421977</td>
                                    <td><b>고성명태축제</b></td>
                                    <td>행사/공연/축제</td>
                                    <td>문화관광축제</td>
                                    <td>강원특별자치도 고성군 거진읍 대대리</td>
                                    <td>033-681-0121,0122</td>
                                     <td>노출</td>
                                    <td>2025-00-00</td>
                                    <td>2025-00-00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <!-- 목록(리스트) 테이블 끝 --> */}
                </section>
               {/* <!-- (1.좌측)검색/리스트 끝 --> */}
                {/* <!-- (2.우측)CUD.등록/수정 시작 --> */}
                <section className="registWrap">
                    {/* <!-- (2.우측)CUD.타이틀/버튼 시작 --> */}
                    <div className="titleBox">
                        <ul className="tabtitle">
                            <li className="active">기본정보</li>
                            <li>상세정보</li>
                            <li>반복정보</li>
                        </ul>
                        <span className="btnBox">
                            <button type="button" className="btn full">저장</button>
                            <button type="button" className="btn line">삭제</button>
                            <button type="button" className="btn line">초기화</button>
                        </span>
                    </div>
                    {/* <!--(2.우측) CUD.타이틀/버튼 끝 --> */}
                    {/* <!-- CUD.입/출력단 시작 --> */}
                    <div className="formWrap">
                        <div>
                            <form>
                                <h2>새해 맞이 불꽃쇼 & 소원 풍선 날리기 축제</h2>
                                <div className="preview_map">지도영역</div>
                                <label><b>콘텐츠타입</b>
                                    <select className="" disabled>
                                        <option value="">전체</option>
                                        <option value="1">관광지</option>
                                        <option value="2">문화시설</option>
                                        <option value="3">행사/공연/축제</option>
                                        <option value="4">여행코스</option>
                                        <option value="5">레포츠</option>
                                        <option value="6">숙박</option>
                                        <option value="7">쇼핑</option>
                                        <option value="8">음식점</option>
                                    </select>
                                </label>
                                <label> <b>노출여부</b><input type="radio" /> 노출 <input type="radio"/> 비노출 </label>
                                <br/>
                                <label><b>카테고리</b>
                                    <select className="">
                                        <option value="">대분류</option>
                                        <option value="AC">숙박</option>
                                        <option value="C01">추천코스</option>
                                        <option value="EV">축제/공연/행사</option>
                                        <option value="EX">체험관광</option>
                                        <option value="FD">음식</option>
                                    </select>
                                    <select className="subsStatusInput">
                                        <option value="">중분류</option>
                                        <option value="AC01">호텔</option>
                                        <option value="AC02">콘도미니엄</option>
                                        <option value="AC03">펜션/민박</option>
                                        <option value="AC04">모텔</option>
                                        <option value="AC05">캠핑</option>
                                    </select>
                                    <select className="subsStatusInput">
                                        <option value="">소분류</option>
                                        <option value="AC010100">호텔</option>
                                        <option value="AC020100">콘도</option>
                                        <option value="AC020200">레지던스</option>
                                        <option value="AC030100">펜션</option>
                                        <option value="AC030200">한옥스테이</option>
                                    </select>
                                </label>
                                <br/>
                                <label><b>플레이스명</b>
                                    <input type="text"/>
                                </label>
                                <label><b>플레이스 번호</b>
                                    <input type="text" disabled/>
                                </label>
                                <br/>
                                <label><b>기본주소</b>
                                    <button type="button">우편번호</button>
                                    <input type="text" name="zipCodeInput" placeholder="우편번호" disabled />
                                    <input type="text"  name="addrInput" placeholder="주소"  disabled/>
                                    <div>
                                        <b></b>
                                        <input type="text" name="addrDetailInput" placeholder="상세주소 입력" className="input100" />
                                    </div>
                                </label>
                                <br/>
                                
                                <label><b>대표전화</b>
                                    <input type="text"/>
                                </label>
                                <label><b>대표전화 설명</b>
                                    <input type="text"/>
                                </label>
                                <br/>
                                <label><b>홈페이지</b>
                                    <input type="text"/>
                                </label>
                                <br/>
                                <label><b>개요설명</b><textarea className="memoInput"
                                        placeholder="상세소개를 입력하세요."></textarea></label>
                                <br/>
                                <label><b>마커이미지</b><input type="file"/></label>
                                <br/>
                                <label> <b>대표이미지</b><input type="file"/> <span className="info_date">*이미지 사이즈: 800px(가로) * 600px(세로) 권장</span></label>
                                <br/>
                                <label> <b>상세이미지1</b><input type="file"/><span className="info_date">*멀티업로드(~최대 10개/ 이미지별 용량제한 ~2MB)</span></label>
                                <br/>
                                <label><b>이미지설명1</b>
                                    <input type="text"/>
                                </label>

                            </form>
                            <div className="info_date"><b>등록일:</b>2025-00-00 (00:00:00)<b>수정일:</b>2025-00-00 (00:00:00)</div>
                            
                                <button>저장</button>
                                <button>삭제</button>
                            <br/>
                        </div>
                        <br/>
                        <hr/>
                        <br/>
                        <form>
                            <h2>관광지 상세정보</h2>
                            <button>저장</button>
                            <br/>
                            <label><b> 수용인원 </b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>유모차 대여정보 </b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>신용카드 가능정보 </b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>애완동물동반 가능정보</b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>체험가능연령</b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b> 체험안내 </b>
                                <textarea></textarea>
                            </label>
                            <br/>
                            <label><b> 세계문화유산 유무 </b>
                                <input type="text"/>
                                <input type="text"/>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>문의 및 안내</b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>개장일 </b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>주차시설</b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>쉬는날</b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>이용시기</b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <label><b>이용시간</b>
                                <input type="text"/>
                            </label>
                        </form>
                        <br/>
                        <div className="info_date"><b>등록일:</b>2025-00-00 (00:00:00)<b>수정일:</b>2025-00-00 (00:00:00)</div>
                        <br/>
                        <hr/>
                        <br/>

                        <h2>반복정보</h2>
                        <button>저장</button>
                        <button>행추가</button>
                        <form>
                            <br/>
                            <label><b>제목</b>
                                <input type="text"/>
                            </label>
                            <label><b>내용</b>
                                <input type="text"/>
                            </label>
                            <br/>
                            <div className="info_date"><b>등록일:</b>2025-00-00 (00:00:00)<b>수정일:</b>2025-00-00 (00:00:00)</div>
                        </form>
                    </div>
                    {/* <!-- (2.우측)CUD.입/출력단 시작 --> */}
                </section>
               {/* <!-- (2.우측)CUD.등록/수정 끝 --> */}
            </div>
            {/* <!-- 본문 좌/우 분할 섹션 끝 --> */}
    </>
}// PlaceInfo.jsx end
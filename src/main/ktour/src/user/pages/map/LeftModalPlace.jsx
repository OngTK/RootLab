/**
 * 사용자단(비회원) > 메인 > 지도마커 클릭시, 플레이스 상세정보 조회 모달(레이어) 컴포넌트
 *
 * @author kimJS
 * @since 2025.10.24
 * @version 0.1.0
 */
export default function LeftModalPlace(props) {

/** =========================== LeftModalPlace.jsx ===================================== */
    return (
        <>
            <div className="leftModal" id="leftModalPlace">
                {/* 모달 박스 시작 */}
                <div className="modal_box">
                    {/* 콘텐츠 내용 시작 */}
                    <button className="modalClose fa fa-close"></button>

                    <div className="modal_img_box">
                        <img
                            src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG"
                            alt="타이틀"
                        />
                        <div className="modalContentOutline">
                            <h3>동촌유원지</h3>
                            <div className="category">자연관광&nbsp; 체험관광동궁</div>
                        </div>
                    </div>

                    <div className="modalContent">
                        <p className="description">
                            동촌유원지는 대구시 동쪽 금호강변에 있는 44만 평의 유원지로 오래전부터 대구 시민이 즐겨 찾는 곳이다. 각종 위락시설이 잘 갖춰져 있으며, 드라이브를 즐길 수 있는 도로가 건설되어 있다. 수량이 많은 금호강에는 조교가 가설되어 있고, 우아한 다리 이름을 가진 아양교가 걸쳐 있다. 금호강(琴湖江)을 끼고 있어 예로부터 봄에는 그네뛰기, 봉숭아꽃 구경, 여름에는 수영과 보트 놀이, 가을에는 밤 줍기 등 즐길 거리가 많은 곳이다. 또한, 해맞이다리, 유선장, 체육시설, 실내 롤러스케이트장 등 다양한 즐길 거리가 있어 여행의 재미를 더해준다.
                        </p>

                        <h4>상세정보</h4>
                        <ul>
                            <li><b>주소</b> 연중무휴</li>
                            <li>
                                <b>홈페이지</b>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                  //tour.daegu.go.kr
                                </a>
                            </li>
                            <li>
                                <b>전화</b>
                                <a href="tel:010-1234-5678">010-1234-5678</a>
                            </li>
                            <li>
                                <b>주차여부</b> 가능 / 요금 (최초 2시간 무료 / 이후 30분 당 400원씩 추가 요금 발생)
                            </li>
                            <li><b>휴무일</b> 연중무휴</li>
                            <li><b>컬럼명</b> 컬럼값</li>
                        </ul>

                        <h4>사진이미지</h4>
                        <ul className="additionImgWrap">
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                            <li><img src="http://tong.visitkorea.or.kr/cms/resource/86/3488286_image2_1.JPG" alt="" /></li>
                        </ul>

                        <h4>부가정보</h4>
                        <ul>
                            <li>
                                <b>홈페이지</b>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                  //tour.daegu.go.kr
                                </a>
                            </li>
                            <li>
                                <b>전화</b>
                                <a href="tel:010-1234-5678">010-1234-5678</a>
                            </li>
                            <li>
                                <b>주차</b> 가능 / 요금 (최초 2시간 무료 / 이후 30분 당 400원씩 추가 요금 발생)
                            </li>
                            <li><b>휴무일</b> 연중무휴</li>
                            <li><b>휴무일</b> 연중무휴</li>
                        </ul>
                    </div>
                    {/* 콘텐츠 내용 끝 */}
                </div>
                {/* 모달 박스 끝 */}
            </div>
            {/* 05. 지도 마커 클릭시, 플레이스 상세정보 조회 모달(레이어) 끝 */}
        </>
    );
} // LeftModalPlace.jsx end

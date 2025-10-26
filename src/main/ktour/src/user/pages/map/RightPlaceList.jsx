import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { useMemo } from "react";

// 미리 카테고리 정의해놓기
const PLACE_GROUPS_TEMPLATE = [
    { category: "관광지", keywords: [], places: [] },
    { category: "문화시설", keywords: [], places: [] },
    { category: "행사/공연/축제", keywords: [], places: [] },
    { category: "여행코스", keywords: [], places: [] },
    { category: "레포츠", keywords: [], places: [] },
    { category: "숙박", keywords: [], places: [] },
    { category: "쇼핑", keywords: [], places: [] },
    { category: "음식점", keywords: [], places: [] }
];

export default function PlaceGroups() {
    const { markers } = useSelector((state) => state.relatedMap);

    const placeGroups = useMemo(() => {
        const groupsMap = new Map();
        PLACE_GROUPS_TEMPLATE.forEach(group => {
            groupsMap.set(group.category, {
                ...group, // category 이름 복사
                keywords: [], // 항상 새 배열로 초기화
                places: [],   // 항상 새 배열로 초기화
            }); // set end
        }); // foreach end

        if (markers && markers.length > 0) {
            markers.forEach((marker) => {
                const group = groupsMap.get(marker.contenttypename);
                if (group) { // 일치하는 그룹이 있을 때만
                    const keyword = marker.lclsSystm3Nm;
                    if (keyword && !group.keywords.includes(keyword)) {
                        group.keywords.push(keyword);
                    } // if end
                    group.places.push(marker);
                } // if end
            }); // get end
        } // if end
        return Array.from(groupsMap.values());
    }, [markers]);

    const detailMapInfo = (place) => {
        console.log("지도 상세보기:", place.name);
    };

    return (
        <>
            {placeGroups.map((group, i) => (
                group.places.length > 0 &&
                <dl className="ai_card" key={i}>
                    <dt className="header">
                        <h2 className="subjectKeyword">
                            <strong>{group.category}</strong>
                        </h2>
                        <p className="keyword_recommand">
                            {group.keywords.map((keyword, j) => (
                                <a href="#" key={j}>{keyword}</a>
                            ))}
                        </p>
                    </dt>

                    <dd className="body" id={`mapInfoBody_${i}`}>
                        <div className="cardList">
                            {group.places.map((place) => (
                                <div
                                    key={place.pNo}
                                    className="summaryCard"
                                    onClick={() => detailMapInfo(place)}
                                >
                                    <div className="thumb">
                                        {
                                            place.firstimage &&
                                            <img src={place.firstimage} alt={place.name} />
                                        }
                                        {
                                            !place.firstimage &&
                                            <img src="/user/img/no_img.jpg" alt={place.name} />
                                        }
                                        <span className="category">
                                            <b className="depth_2">{place.lclsSystm2Nm}</b>
                                        </span>
                                    </div>
                                    <ul>
                                        <li className="subject">{place.title}</li>
                                        <li className="workTime">{place.lclsSystm3Nm}</li>
                                        <li className="addr">{place.addr1}{place.addr2}</li>
                                        {
                                            place.tel &&
                                            <li className="tel">Tel. {place.tel}</li>
                                        }
                                    </ul>
                                    <div className="btnWrap">
                                        <button>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </dd>

                    <dd className="footer">{/* 버튼 영역 추후 추가 */}</dd>
                </dl>
            ))}
        </>
    ); // return end
} // func end
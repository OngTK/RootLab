import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function PlaceGroups() {
  const placeGroups = [
    {
      category: "숙박",
      keywords: ["호텔", "캠핑"],
      places: [
        {
          id: 1,
          name: "코트야드 메리어트 수원",
          category: "호텔",
          workTime: "호텔",
          addr: "경기도 수원시 영통구 광교호수공원로 320 (하동)",
          tel: "-",
          img: "/user/img/no_img.jpg",
        },
        {
          id: 2,
          name: "광교호수공원 가족캠핑장",
          category: "캠핑",
          workTime: "일반야영장",
          addr: "경기도 수원시 영통구 광교호수로 57 (하동)",
          tel: "-",
          img: "http://tong.visitkorea.or.kr/cms/resource/81/2797481_image2_1.jpg",
        },
      ],
    },
    {
      category: "맛집",
      keywords: ["한식", "카페"],
      places: [
        {
          id: 3,
          name: "광교한정식",
          category: "한식",
          workTime: "11:00 ~ 21:00",
          addr: "경기도 수원시 영통구 광교중앙로 128",
          tel: "031-123-4567",
          img: "/user/img/no_img.jpg",
        },
      ],
    },
    {
      category: "숙박",
      keywords: ["호텔", "캠핑"],
      places: [
        {
          id: 1,
          name: "코트야드 메리어트 수원",
          category: "호텔",
          workTime: "호텔",
          addr: "경기도 수원시 영통구 광교호수공원로 320 (하동)",
          tel: "-",
          img: "/user/img/no_img.jpg",
        },
        {
          id: 2,
          name: "광교호수공원 가족캠핑장",
          category: "캠핑",
          workTime: "일반야영장",
          addr: "경기도 수원시 영통구 광교호수로 57 (하동)",
          tel: "-",
          img: "http://tong.visitkorea.or.kr/cms/resource/81/2797481_image2_1.jpg",
        },
      ],
    },
  ];

  const detailMapInfo = (place) => {
    console.log("지도 상세보기:", place.name);
  };

  return (
    <>
      {placeGroups.map((group, i) => (
        <dl className="ai_card" key={i}>
          <dt className="header">
            <h2 className="subjectKeyword">
              <strong>{group.category}</strong>
            </h2>
            <p className="keyword_recommand">
              {group.keywords.map((kw, j) => (
                <a href="#" key={j}>{kw}</a>
              ))}
            </p>
          </dt>

          <dd className="body" id={`mapInfoBody_${i}`}>
            <div className="cardList">
              {group.places.map((place) => (
                <div
                  key={place.id}
                  className="summaryCard"
                  onClick={() => detailMapInfo(place)}
                >
                  <div className="thumb">
                    <img src={place.img} alt={place.name} />
                    <span className="category">
                      <b className="depth_2">{place.category}</b>
                    </span>
                  </div>
                  <ul>
                    <li className="subject">{place.name}</li>
                    <li className="workTime">{place.workTime}</li>
                    <li className="addr">{place.addr}</li>
                    <li className="tel">Tel. {place.tel}</li>
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
  );
}

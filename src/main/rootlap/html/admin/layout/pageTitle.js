/**
 * [ 페이지타이틀 레이아웃(HTML) import ]
 *
 * @author kimJS
 * @since 2025.10.13
 */

function pageTitle(){ 
    console.log( '[3] 페이지타이틀 레이아웃(HTML)' );
    //const asideHTML = document.querySelector('.contentWrap');
    const mainHTML = document.querySelector('.contentsWrap');
    const pageTitleHTML = `   
        
        <!-- 페이지 타이틀 시작 -->
        <div class="pageTitle">
            <h1>
                <!-- <svg fill="#000000" width="25px" height="25px" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M738 756q-45-77-131-205-6-8-14-15-2-2-1.5-4.5t2.5-3.5q60-29 97-83 40-58 40-124 0-63-31-116t-84-84-116-31-116 31-84 84-31 116q0 66 40 124 37 54 97 83 2 1 2.5 3.5T407 536q-8 7-14 15-88 130-131 205-18 32-18 52 0 27 34.5 50.5t93 37.5T500 910t128.5-14 93-37.5T756 808q0-21-18-52z"/></svg> -->
                <span>지도정보현황</span>
            </h1>
            <span class="path">
                <a href="/admin/mapData/index.jsp">관광지도관리</a>
                <a href="/admin/mapData/index.jsp">지도정보현황</a>
            </span>
        </div>
        <!-- 페이지 타이틀 끝 -->
        
    `
    mainHTML.innerHTML = pageTitleHTML;
 }//func end

 pageTitle(); //js 실행
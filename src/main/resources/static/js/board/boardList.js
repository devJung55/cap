
/* 카테고리 버튼 누르기 */
const $Category = $(".CategoryItem");

$Category.each((i, e) => {
    $(e).click(function(){
        $Category.removeClass("CategoryActive");
        $(e).addClass("CategoryActive");

    })
})

const $RecruitWrap = $(".view-boardList-wrapper");
let text = "";

function showGroupList() {
    if(groupLists[0] == null) {
        text +=
            `
                <div class="mypage-reply-empty">
                    <img
                        src="data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='80px' height='80px' viewBox='0 0 80 80' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 54.1 (76490) - https://sketchapp.com --%3E %3Ctitle%3E00 Icon/80px/review_empty%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cg id='00-Icon/80px/review_empty' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Crect id='Rectangle' fill-opacity='0' fill='%23FFFFFF' fill-rule='nonzero' x='0' y='0' width='80' height='80'%3E%3C/rect%3E %3Cpath d='M25,24.5 C24.448,24.5 24,24.052 24,23.5 C24,22.948 24.448,22.5 25,22.5 L55,22.5 C55.553,22.5 56,22.948 56,23.5 C56,24.052 55.553,24.5 55,24.5 L25,24.5 Z M37,42.5 C37.552,42.5 38,42.947 38,43.5 C38,44.053 37.552,44.5 37,44.5 L25,44.5 C24.448,44.5 24,44.053 24,43.5 C24,42.947 24.448,42.5 25,42.5 L37,42.5 Z M55.4551,52.0859 L77.3751,30.1659 L68.8901,21.6809 L46.9701,43.6019 L55.4551,52.0859 Z M47.8621,54.3939 L44.6621,51.1929 L43.8621,55.1929 L47.8621,54.3939 Z M45.1341,48.8359 L50.2201,53.9219 L53.7551,53.2149 L45.8411,45.3009 L45.1341,48.8359 Z M67.0001,65.9999 L67.0001,43.3689 L55.4551,54.9149 L44.2541,57.1549 C43.1711,57.3709 42.1171,56.6689 41.9001,55.5859 C41.8501,55.3269 41.8501,55.0609 41.9001,54.8019 L44.1411,43.6019 L53.2421,34.4999 L52.5991,34.4999 L25.0001,34.4999 C24.4481,34.4999 24.0001,34.0519 24.0001,33.4999 C24.0001,32.9479 24.4481,32.4999 25.0001,32.4999 L54.5991,32.4999 L55.0001,32.4999 C55.0711,32.4999 55.1351,32.5259 55.2011,32.5409 L67.0001,20.7419 L67.0001,20.0989 L67.0001,13.9999 C67.0001,12.3429 65.6571,10.9999 64.0001,10.9999 L16.0001,10.9999 C14.3431,10.9999 13.0001,12.3429 13.0001,13.9999 L13.0001,65.9999 C13.0001,67.6569 14.3431,68.9999 16.0001,68.9999 L64.0001,68.9999 C65.6571,68.9999 67.0001,67.6569 67.0001,65.9999 Z M78.7891,28.7519 C79.5701,29.5329 79.5701,30.7989 78.7891,31.5799 L69.0001,41.3689 L69.0001,65.9999 C69.0001,68.7619 66.7621,70.9999 64.0001,70.9999 L16.0001,70.9999 C13.2391,70.9999 11.0001,68.7619 11.0001,65.9999 L11.0001,13.9999 C11.0001,11.2389 13.2391,8.9999 16.0001,8.9999 L64.0001,8.9999 C66.7621,8.9999 69.0001,11.2389 69.0001,13.9999 L69.0001,18.8379 L69.0001,19.6909 C69.4751,19.7179 69.9411,19.9039 70.3041,20.2669 L78.7891,28.7519 Z' id='Combined-Shape' fill='%23DDDDDD'%3E%3C/path%3E %3C/g%3E %3C/svg%3E"
                        class="mypage-reply-empty-icon"
                    />
                        <div class="mypage-reply-empty-text">작성된 보고서가 없어요...</div>
                </div>
                `
    } else {
        groupLists.forEach((groupList, i) => {
            text += `
                <div>
                    <!-- 글쓴이의 정보가 나올 곳 -->
                    <div class="profile-wrapper">
                        <!-- 프로필 사진 -->
                        <div class="MemberProfile-wrapper">
                            <div class="MemberProfileImg-wrapper">
                               <div class="Image-wrapper">
                    `
            if(groupList.memberFileType == 0) {
                text += `
                           <img class="Image-style" src="https://k.kakaocdn.net/dn/bsSATJ/btry9gwkdhb/Y5L6OyBllzjAkOOMFYupF0/img_110x110.jpg">
                            `
            } else {
                text += `
                           <img class="Image-style" src="/mypage/display?fileName=${groupList.memberFilePath}/${groupList.memberFileUuid}_${groupList.memberFileOriginalName}">
                        `
            }
            text +=
                `
                               </div>
                            </div>
                            <!-- 글쓴이의 이름과 글쓴 시간 -->
                            <div class="MemberProfileText-wrapper">
                                <p class="ProfileName">${groupList.memberNickname}</p>
                                <div class="RegistTime">` + elapsedTime(groupList.groupRegisterDate) + `</div>
                            </div>
                        </div>
                    </div>
                    <!-- 원정대 소개 이미지 -->
                    <div class="boardImg-wrapper">
                        <a href="">
                            <div class="boardSlideImg-wrapper">
                                <div class="introduceImage-wrapper">
                    `
            if(groupList.groupFileType == 0) {
                text += `
                                <img
                                  src="https://dahanweb.co.kr/gnuboard4/data/file/gall/2949946602_iBjAP3kv_989758.jpg"
                                  alt="기본 이미지"
                                />
                            `
            } else {
                text += `
                                <!-- 이미지가 들어갈 곳 -->
                                    <img src="/mypage/display?fileName=${groupList.groupFilePath}/${groupList.groupFileUuid}_${groupList.groupFileOriginalName}" alt="">
                            `
            }
            text +=
                `    
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- 카테고리가 나타날 곳 -->
                    <div class="boardCategory-wrapper">
                        <!-- 작성자가 작성한 카테고리 나오기 -->
                        <span>${groupList.groupCategory}</span> 
                    </div>
                    <!-- 작성자가 작성한 글이 들어갈 곳 -->
                    <div class="description-wrapper description-detail"><span class="TextLine-Description">${groupList.groupContent}</span>
                    </div>
                    <!-- 댓글로 이동할 수 있는 곳 -->
                    <div class="actionGroup-wrapper">
                        <a class="actionGroup-reply" href="">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='18' viewBox='0 0 21 18'%3E %3Cpath fill='none' stroke='%234E5968' stroke-width='1.5' d='M20.25.75H.75v11.818h3.842v4.015l5.9-4.015h9.758V.75z'/%3E %3C/svg%3E" alt="">
                            <!-- 댓글의 갯수가 들어오는 곳 -->
                            <span>${groupList.groupReplyCount}</span>
                        </a>
                    </div>
                </div>
            `
        })
        $RecruitWrap.append(text)
    }
}
showGroupList();

const $changePage = $('.changePage');
// 페이징 클릭 이벤트
$changePage.each(function (i, changePage) {
    $(changePage).on("click", e => {
        e.preventDefault();
        criteria.page = ($(this).attr("href"));
        window.location.href = `/mypage/myRecruit?page=${criteria.page}`;
    })
});
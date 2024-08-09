// 로그인 체크
const localToken = localStorage.getItem('user_token');
const $header = document.querySelector('#header');
const mypageBtn = document.querySelector('#header .h_mypage');

// 비회원
if(localToken == null){

}else{
    $header.classList.add('login');
    const dropBtn = document.querySelector('#header .mp_dropbox');
    const logoutBtn = document.querySelector('#header .mp_dropbox .logout');
    const gomypage = document.querySelector('#header .mp_dropbox .mypage');
    const mypageUrl = document.querySelector('#header .mp_dropbox .mypage a');
    mypageUrl.setAttribute("href","../pages/error.html");
    mypageBtn.addEventListener('click',function(e){
        e.preventDefault();
        dropBtn.classList.toggle('show');
    })
    logoutBtn.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        $header.classList.remove('login');
        // local storage delete
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_type');
        location.reload();
    })
    gomypage.addEventListener('click',function(e){
        e.stopPropagation();
    })
}

// 모달체크
if(document.querySelector(".customModal")){
    document.querySelectorAll(".customModal .close").forEach(function(el){
        el.addEventListener('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            e.target.closest(".customModal").style.display = "none";
        });
    });
}
if(document.querySelector("#modal_GoToLogin")){
    document.querySelector("#modal_GoToLogin .btnColorH").setAttribute("href","../pages/login.html");
}
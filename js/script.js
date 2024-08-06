// 로그인 체크 헤더 마이페이지 버튼

const $header = document.querySelector('#header');
const mypageBtn = document.querySelector('#header .h_mypage');



const dropBtn = document.querySelector('#header .mp_dropbox');
const logoutBtn = document.querySelector('#header .mp_dropbox .logout');
mypageBtn.addEventListener('click',function(e){
    e.preventDefault();
    dropBtn.classList.toggle('show');
})
logoutBtn.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    $header.classList.remove('login');
    // local strage delete
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_type');
})
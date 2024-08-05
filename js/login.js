/**
    - 구매자(buyer)
        - ID : buyer1 PW: hodu0910
        - ID : buyer2 PW: hodu0910
        - ID : buyer3 PW: hodu0910
    - 판매자(seller)
        - ID : seller1 PW : hodu0910
        - ID : seller2 PW : hodu0910
        - ID : seller3 PW : hodu0910

        // BUYER : 일반 구매자, SELLER : 판매자
*/

// 로그인 회원분류 탭
document.querySelector(".seller").addEventListener('click',function(){
    this.classList.add("active");
    document.querySelector(".buyer").classList.remove("active");
    document.querySelector("fieldset").classList.add('seller');
});
document.querySelector(".buyer").addEventListener('click',function(){
    this.classList.add("active");
    document.querySelector(".seller").classList.remove("active");
    document.querySelector("fieldset").classList.remove('seller');
});

// 회원데이터 확인
const url = "https://openmarket.weniv.co.kr/";
const memberData = async function(id,pw,type){
    const loginUrl = "accounts/login/";
    const fetchUrl = await fetch(`${url}${loginUrl}`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body:JSON.stringify({
            "username": id,
            "password": pw,
            "login_type": type
        })
    });
    const loginData = await fetchUrl.json();
    console.log(loginData);

    // token, 유효성검사, warning 뿌리기
}

// buyer 로그인정보 확인
const buyerLoginBtn = document.querySelector('.buyerLog .btnLogin');
const buyerId = document.querySelector('.buyerLog #id');
const buyerPw = document.querySelector('.buyerLog #pw');
buyerLoginBtn.addEventListener('click',function(e){
    e.preventDefault();
    const idVal = buyerId.value;
    const pwVal = buyerPw.value;
    document.querySelectorAll('.custom_tab ul li').forEach((el) => {
        const hasActive = el.classList.contains('active');
        const typeVal = el.id.toUpperCase();
        if(hasActive == true){
            memberData(idVal,pwVal,typeVal);
        }
    })
});


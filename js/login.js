/*
    - BUYER : 일반 구매자, SELLER : 판매자
    - 구매자(buyer)
        - ID : buyer1 PW: hodu0910
        - ID : buyer2 PW: hodu0910
        - ID : buyer3 PW: hodu0910
    - 판매자(seller)
        - ID : seller1 PW : hodu0910
        - ID : seller2 PW : hodu0910
        - ID : seller3 PW : hodu0910
*/

// 회원데이터 Request
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
    // local storage init
    loginCheck(loginData);
}

// 로그인정보 확인
const buyerLoginBtn = document.querySelector('.buyerLog .btnLogin');
const buyerId = document.querySelector('.buyerLog #id');
const buyerPw = document.querySelector('.buyerLog #pw');
const sellerLoginBtn = document.querySelector('.sellerLog .btnLogin');
const sellerId = document.querySelector('.sellerLog #id');
const sellerPw = document.querySelector('.sellerLog #pw');

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
sellerLoginBtn.addEventListener('click',function(e){
    e.preventDefault();
    const idVal = sellerId.value;
    const pwVal = sellerPw.value;
    document.querySelectorAll('.custom_tab ul li').forEach((el) => {
        const hasActive = el.classList.contains('active');
        const typeVal = el.id.toUpperCase();
        if(hasActive == true){
            memberData(idVal,pwVal,typeVal);
        }
    })
});

// 로그인체크 response
function loginCheck(e){
    console.log(e);
    let lengthFail = 'FAIL_Message' in e;
    let lengthId = 'username' in e;
    let lengthPw = 'password' in e;
    let logfield = document.querySelector('#logWrap fieldset');

    if(logfield.classList == "seller"){
        // SELLER
        if(lengthFail == true){
            // 회원데이터 false
            let warnEl = document.querySelector('.sellerLog p.logwarn');
            warnEl.style.display = "block";
            warnEl.textContent = e.FAIL_Message;
            let sellerID = document.querySelector('.sellerLog .id');
            let sellerPW = document.querySelector('.sellerLog .pw');
            sellerID.classList.remove('error');
            sellerPW.classList.remove('error');
        }else{
            let warnEl = document.querySelector('.sellerLog p.logwarn');
            warnEl.style.display = "none";
    
            // id값 오류메세지 체크
            if(lengthId == true){
                let makeWarnEl = document.createElement('p');
                let sellerID = document.querySelector('.sellerLog .id');
                sellerID.after(makeWarnEl);
                makeWarnEl.classList.add('warning');
                sellerID.classList.add('error');
                makeWarnEl.textContent = e.username;
            }else{
                let sellerID = document.querySelector('.sellerLog .id');
                sellerID.classList.remove('error');
            }
    
            // pw값 오류메세지 체크
            if(lengthPw == true){
                let makeWarnEl = document.createElement('p');
                let sellerPW = document.querySelector('.sellerLog .pw');
                sellerPW.after(makeWarnEl);
                makeWarnEl.classList.add('warning');
                sellerPW.classList.add('error');
                makeWarnEl.textContent = e.password;
            }else{
                let sellerPW = document.querySelector('.sellerLog .pw');
                sellerPW.classList.remove('error');
            }
    
            // 회원데이터 true
            if(e.id !== undefined && e.token !== undefined && e.user_type !== undefined){
                localStorage.setItem('user_id',e.id);
                localStorage.setItem('user_token',e.token);
                localStorage.setItem('user_type',e.user_type);
                location.href="javascript:history.go(-1)";
            }
        }
        const sellerPwInput = document.querySelector('.sellerLog #pw');
        sellerPwInput.value = "";
    }else{
        // BUYER
        if(lengthFail == true){
            // 회원데이터 false
            let warnEl = document.querySelector('.buyerLog p.logwarn');
            warnEl.style.display = "block";
            warnEl.textContent = e.FAIL_Message;
            let buyerID = document.querySelector('.buyerLog .id');
            let buyerPW = document.querySelector('.buyerLog .pw');
            buyerID.classList.remove('error');
            buyerPW.classList.remove('error');
        }else{
            let warnEl = document.querySelector('.buyerLog p.logwarn');
            warnEl.style.display = "none";
    
            // id값 오류메세지 체크
            if(lengthId == true){
                let makeWarnEl = document.createElement('p');
                let buyerID = document.querySelector('.buyerLog .id');
                buyerID.after(makeWarnEl);
                makeWarnEl.classList.add('warning');
                buyerID.classList.add('error');
                makeWarnEl.textContent = e.username;
            }else{
                let buyerID = document.querySelector('.buyerLog .id');
                buyerID.classList.remove('error');
            }
    
            // pw값 오류메세지 체크
            if(lengthPw == true){
                let makeWarnEl = document.createElement('p');
                let buyerPW = document.querySelector('.buyerLog .pw');
                buyerPW.after(makeWarnEl);
                makeWarnEl.classList.add('warning');
                buyerPW.classList.add('error');
                makeWarnEl.textContent = e.password;
            }else{
                let buyerPW = document.querySelector('.buyerLog .pw');
                buyerPW.classList.remove('error');
            }
    
            // 회원데이터 true
            if(e.id !== undefined && e.token !== undefined && e.user_type !== undefined){
                localStorage.setItem('user_id',e.id);
                localStorage.setItem('user_token',e.token);
                localStorage.setItem('user_type',e.user_type);
                location.href="javascript:history.go(-1)";
            }
        }
        const buyerPwInput = document.querySelector('.buyerLog #pw');
        buyerPwInput.value = "";
    }
}

// 로그인 회원분류 탭
document.querySelector(".seller").addEventListener('click',function(){
    this.classList.add("active");
    document.querySelector(".buyer").classList.remove("active");
    document.querySelector("fieldset").classList.add('seller');
    buyerLoginBtn.setAttribute('type','button');
    sellerLoginBtn.setAttribute('type','submit');
});
document.querySelector(".buyer").addEventListener('click',function(){
    this.classList.add("active");
    document.querySelector(".seller").classList.remove("active");
    document.querySelector("fieldset").classList.remove('seller');
    buyerLoginBtn.setAttribute('type','submit');
    sellerLoginBtn.setAttribute('type','button');
});
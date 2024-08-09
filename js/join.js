const url = "https://openmarket.weniv.co.kr/";

// 회원가입 buyer
const joinBuyerData = async function(id,pw,pw2,phone,name){
    const joinUrl = "accounts/signup/";
    const fetchUrl = await fetch(`${url}${joinUrl}`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "username": id,
            "password": pw,
            "password2": pw2,
            "phone_number": phone,
            "name": name,
        })
    })
    const buyerData = await fetchUrl.json();
    joinBuyer(buyerData);
    return buyerData;
}
// 회원가입 seller
// const joinSellerData = async function(id,pw,pw2,phone,name,regnum,store){
//     const joinUrl = "accounts/signup_seller/";
//     const fetchUrl = await fetch(`${url}${joinUrl}`,{
//         method : "POST",
//         headers : {
//             "Content-Type" : "application/json"
//         },
//         body : JSON.stringify({
//             "username": id,
//             "password": pw,
//             "password2": pw2,
//             "phone_number": phone,
//             "name": name,
//             "company_registration_number": regnum,
// 		    "store_name": store,
//         })
//     })
//     const sellerData = await fetchUrl.json();
//     joinSeller(sellerData);
// }

// 약관동의 check
let agreeBtn = document.querySelector('#agree');
let submitBtn = document.querySelector('.btnJoin');
agreeBtn.addEventListener('change',function(e){
    if(agreeBtn.checked == true){
        // console.log("약관동의!");
        submitBtn.disabled = false;
    }else{
        submitBtn.disabled = true;
    }
})

let buyerID = document.querySelector('.buyerJoin .id');
let buyerPW = document.querySelector('.buyerJoin .pw');
let buyerPW2 = document.querySelector('.buyerJoin .pwRe');
let buyerNAME = document.querySelector('.buyerJoin .name');
let buyerPHONE = document.querySelector('.buyerJoin .phone');
let idcheckArea = document.querySelector('.buyerJoin .id input');
let pwcheckArea = document.querySelector('.buyerJoin .pw input');
let pwcheckArea2 = document.querySelector('.buyerJoin .pw2 input');
let makePid = document.querySelector('.buyerJoin .id + p');
let makePpw = document.querySelector('.buyerJoin .pw + p');
let idcheckBtn = document.querySelector('.buyerJoin .doubleCheck');

function validate(){
    idcheckArea.addEventListener('blur',function(e){
        console.log("id blur 이벤트 발생중!", makePpw)
        makePid = document.querySelector('.buyerJoin .id + p');
        makePpw = document.querySelector('.buyerJoin .pw + p');
        if(this.value == ""){
            e.preventDefault();
            makePid.classList.remove('entered', 'warning');
            makePid.classList.add('warning');
            buyerID.classList.remove('error','enter','true');
            buyerID.classList.add('error');
            makePid.textContent = "아이디는 필수 정보입니다";   
        }else{
            let idcheckFunc = /^[A-Za-z0-9]{1,20}$/
            if(idcheckFunc.test(this.value) == false){
                makePid.classList.remove('entered', 'warning');
                makePid.classList.add('warning');
                buyerID.classList.remove('error','enter','true');
                buyerID.classList.add('error');
                makePid.textContent = "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.";   
            }else{
                makePid.classList.remove('entered', 'warning');
                makePid.classList.add('entered');
                buyerID.classList.remove('error','enter','true');
                buyerID.classList.add('enter');
                makePid.textContent = "멋진 아이디네요 :)";
            }
        }
    });
    idcheckBtn.addEventListener('click',function(e){
        e.preventDefault();
        checkID(idcheckArea.value);
    });

    // 비밀번호 유효성
    pwcheckArea.addEventListener('blur',function(e){
        console.log("pw blur 이벤트 발생중!", makePpw)
        makePid = document.querySelector('.buyerJoin .id + p');
        makePpw = document.querySelector('.buyerJoin .pw + p');
        if(this.value == ""){
            e.preventDefault();
            buyerPW.classList.remove('error','true','enter');
            buyerPW.classList.add('error');
            makePpw.classList.remove('entered', 'warning');
            makePpw.classList.add('warning');
            makePpw.textContent = "비밀번호는 필수 정보입니다.";   
        }else{
            let pwcheckFunc = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,}$/;
            if(pwcheckFunc.test(this.value) == false){
                buyerPW.classList.remove('error','true','enter');
                buyerPW.classList.add('error');
                makePpw.classList.remove('entered', 'warning');
                makePpw.classList.add('warning');
                makePpw.textContent = "8자이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.";   
            }else{
                buyerPW.classList.remove('error','enter','true');
                buyerPW.classList.add('true');
            }
        }
    });
}
validate();

// id blur 이벤트
function actInput(e){
    if("FAIL_Message" in e){
        makePid.classList.remove('entered', 'warning');
        makePid.classList.add('warning');
        buyerID.classList.add('error');
        makePid.textContent = e.FAIL_Message;     
    }else{
        let idcheckFunc = /^[A-Za-z0-9]{0,20}$/; 
        if(idcheckFunc.test(idcheckArea.value) == false){
            makePid.classList.remove('entered', 'warning');
            makePid.classList.add('warning');
            buyerID.classList.add('error');
            makePid.textContent = "ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.";   
        }else{
            makePid.classList.remove('entered', 'warning');
            makePid.classList.add('entered');
            buyerID.classList.add('enter');
            makePid.textContent = e.Success;
        }
    }
}

// -----------------------------------------------------------------------------------------------

// 폰번호 입력 max 4자리 제한
// 비밀번호 일치확인 & 재확인 입력체크
// input 순서대로 입력체크 && 오류메시지 실시간
// input value 모두 작성됐는지 & 유효성 검사통과 & 체크박스 완료했을경우에만 submit활성화
// 판매자 사업자번호 유효성체크
//  > 구매자 가입 프로세스완료 > 판매자 가입로직 > 리팩토링 












// -----------------------------------------------------------------------------------------------

// 가입하기 제출
submitBtn.addEventListener('click',function(e){
    let buyerID_val = document.querySelector('.buyerJoin .id input').value;
    let buyerPW_val = document.querySelector('.buyerJoin .pw input').value;
    let buyerPW2_val = document.querySelector('.buyerJoin .pwRe input').value;
    let buyerNAME_val = document.querySelector('.buyerJoin .name input').value;
    let buyerPHONE_val1 = document.querySelector('.buyerJoin .phone #phoneFirstB').value;
    let buyerPHONE_val2 = document.querySelector('.buyerJoin .phone #phoneMidB').value;
    let buyerPHONE_val3 = document.querySelector('.buyerJoin .phone #phoneLastB').value;
    let buyerPHONE_val = buyerPHONE_val1 + buyerPHONE_val2 + buyerPHONE_val3;
    
    e.preventDefault();
    document.querySelectorAll('.warning, .entered').forEach(function(e){e.remove();})
    document.querySelectorAll('.error, .enter, .true').forEach(function(e){e.classList.remove('error','enter','true');})
    // id, pw, pw2, phone, name
    joinBuyerData(buyerID_val,buyerPW_val,buyerPW2_val,buyerPHONE_val,buyerNAME_val);
});

// BUYER 오류체크
function joinBuyer(e){
    const checkData = e;
    const lengthId = "username" in checkData;
    const lengthPw = "password" in checkData;
    const lengthPw2 = "password2" in checkData;
    const lengthPhone = "phone_number" in checkData;
    const lengthName = "name" in checkData;
    const successJoin = "user_type" in checkData;
    // console.log(successJoin);

    console.log(checkData);

    if(successJoin){
        // 회원가입 성공했다면
        location.href = "../pages/login.html";
    }else{
        // -------- ID
        if(lengthId == true){
            let makeWarnEl = document.createElement('p');
            buyerID.after(makeWarnEl);
            makeWarnEl.classList.add('warning');
            buyerID.classList.add('error');
            makeWarnEl.textContent = e.username;
        }else{
            let makeEnterEl = document.createElement('p');
            buyerID.after(makeEnterEl);
            makeEnterEl.classList.add('entered');
            buyerID.classList.add('enter');
            makeEnterEl.textContent = e.username;
        }
        // -------- PW
        if(lengthPw == true){
            let makeWarnEl = document.createElement('p');
            buyerPW.after(makeWarnEl);
            makeWarnEl.classList.add('warning');
            buyerPW.classList.add('error');
            makeWarnEl.textContent = e.password;
            // 비밀번호 재확인 유효성 검사
        }else{
            buyerPW.classList.add('true');
        }
        // -------- PW2
        if(lengthPw2 == true){
            let makeWarnEl = document.createElement('p');
            buyerPW2.after(makeWarnEl);
            makeWarnEl.classList.add('warning');
            buyerPW2.classList.add('error');
            makeWarnEl.textContent = e.password2;
        }else{
            // 비밀번호 재확인 유효성 검사하기
            buyerPW2.classList.add('true');
        }
        // -------- NAME
        if(lengthName == true){
            let makeWarnEl = document.createElement('p');
            buyerNAME.after(makeWarnEl);
            makeWarnEl.classList.add('warning');
            buyerNAME.classList.add('error');
            makeWarnEl.textContent = e.name;
        }
        // -------- PHONE
        if(lengthPhone == true){
            let makeWarnEl = document.createElement('p');
            buyerPHONE.after(makeWarnEl);
            makeWarnEl.classList.add('warning');
            buyerPHONE.classList.add('error');
            makeWarnEl.textContent = e.phone_number;
        }
        validate();
    }
}

// SELLER 오류체크
// function joinSeller(e){
//     const checkData = e;
//     console.log(checkData);
//     // SELLER 정보가 일치할때만 submit 보내기
//     // id, pw, pw2, phone, name, regnum, store
//     // joinSellerData("","","","","","","");
// }

// 아이디 유효성 & 중복체크
const checkID = async function(id){
    const checkIDUrl = "accounts/signup/valid/username/";
    const fetchUrl = await fetch(`${url}${checkIDUrl}`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "username": id
        })
    })
    const checkIDdata = await fetchUrl.json();
    actInput(checkIDdata);
    return checkIDdata;
}

// 회원가입탭
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

// 회원가입 연락처
document.querySelector(".buyerJoin .phonewrap > div").addEventListener('click',function(e){ 
    if(e.target.tagName == "LI"){
        e.stopPropagation();
        document.querySelector(".buyerJoin .phonewrap > div input").value = e.target.textContent;        
        this.classList.remove('show');
    }
    this.classList.toggle('show');
});
document.querySelector(".sellerJoin .phonewrap > div").addEventListener('click',function(e){ 
    if(e.target.tagName == "LI"){
        e.stopPropagation();
        document.querySelector(".sellerJoin .phonewrap > div input").value = e.target.textContent;        
        this.classList.remove('show');
    }
    this.classList.toggle('show');
});
// 판매회원 로그인
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
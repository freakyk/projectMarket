// 판매회원 가입
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
// tab event
document.querySelector('.detailTab').addEventListener('click',function(e){
    if(e.target.tagName == "LI"){
        this.querySelector('.active')?.classList.remove('active');
        e.target.classList.add('active');
    }
})

document.querySelectorAll('.detailTab li').forEach(function(e,i){
    e.onclick = () => {
        document.querySelectorAll('#detailCon ul li').forEach(function(el){
            el.style.display = "none";
        })
        document.querySelectorAll('#detailCon ul li')[i].style.display = "block";
    }
})

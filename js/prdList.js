const url = "https://openmarket.weniv.co.kr/";

// 상품목록 가져오기
const getPrdList = async function(){
    const fetchUrl = await fetch(`${url}/products`);
    const parsingJson = await fetchUrl.json();
    makePrdList(parsingJson.results);
}
getPrdList();

// 상품목록
function makePrdList(e){
    const $ul = document.querySelector('ul.prdList');
    const prdList = e;
    console.log(prdList);

    for(let i=0;i<prdList.length;i++){
        const $li = document.createElement('li');
        const $a = document.createElement('a');
        const $thumb = document.createElement('div');
        const $thumbImg = document.createElement('img');
        const $detail = document.createElement('div');
        const $detailInfo = document.createElement('span');
        const $detailName = document.createElement('div');
        const $detailPrice = document.createElement('p');
        const $detailPriceNum = document.createElement('strong');
        const unit = "원";
        
        $thumb.classList.add('thumb');
        $detail.classList.add('detail');
        $detailName.classList.add('name');
        $detailInfo.classList.add('info');
        $detailPrice.classList.add('price');

        $ul.append($li);
        $li.classList.add(`prd_${e[i].product_id}`)
        $li.append($a);
        $a.setAttribute('href',`/pages/prdDetail.html?product_no=${e[i].product_id}`);
        $a.append($thumb);
        $a.append($detail);
        $thumb.append($thumbImg);
        $detail.append($detailInfo,$detailName,$detailPrice);
        $detailPrice.append($detailPriceNum);
        
        $li.classList.add = prdList[i].product_id;
        $thumbImg.src = prdList[i].image;
        $detailInfo.textContent = prdList[i].product_info;
        $detailName.textContent = prdList[i].product_name;
        $detailPrice.append(unit);
        $detailPriceNum.textContent = prdList[i].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    }
}
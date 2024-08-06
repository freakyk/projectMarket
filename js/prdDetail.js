// 상품정보
const url = "https://openmarket.weniv.co.kr/";
const prdNum = location.search.split("?")[1].split("=")[1];
const detailData = async function(id){
    const detailUrl = "products/";
    const prdId = id;
    try{
        const fetchUrl = await fetch(`${url}${detailUrl}/${prdId}`,{
            method : "GET",
            headers: {
                "content-Type" : "application/json"
            },
            body : JSON.stringify()
        })
        const prdData = await fetchUrl.json();
        initprdData(prdData);
    }catch(error){
        console.log(error);
    }
}
detailData(prdNum);

// 상세페이지 데이터 넣기
const initprdData = function(e){
    const prdInfo = e;
    console.log(prdInfo);

    const prd_Img = prdInfo.image;
    const prd_Info = prdInfo.product_info;
    const prd_Name = prdInfo.product_name;
    const prd_Ship = prdInfo.shipping_method;
    
    const prd_Count = 1;
    const prd_Price = prdInfo.price;
    let prd_Fee = prdInfo.shipping_fee;
    if(prd_Fee == 0){
        prd_Fee = "무료배송"
    }
    const prd_PriceFinal = parseInt(prd_Price) * prd_Count;
    const prd_FeeString = prd_Fee.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const prd_PriceFinalString = prd_PriceFinal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    const prd_PriceString = prd_Price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    const prd_Seller = prdInfo.seller;
    const prd_Stoke = prdInfo.stock;
    const prd_StoreName = prdInfo.store_name;

    
    const prdWrap = document.querySelector("#prdOptWrap");
    const prdForm = `
        <div id="prdThumb"><img src="${prd_Img}" alt="product thumbnail"></div>
        <div id="prdOption">
            <!-- 상품 옵션정보 -->
            <div class="optItem">
                <p class="summary_desc">${prd_Info}</p>
                <h2 class="prd_name">${prd_Name}</h2>
                <div class="price origin"><strong>${prd_PriceString}</strong> 원</div>
            </div>

            <div class="opt_bt">
                <!-- 상품 배송/수량정보 -->
                <div class="optQuan">
                    <div class="opt_delivery"><span class="del_opt1">${prd_Ship}</span><span class="del_opt2">${prd_FeeString}</span></div>
                    <div class="opt_quanity">
                        <div class="quanityWrap">
                            <div class="quan down"></div>
                            <input class="quan_val" type="number" value="1" min="1" readonly>
                            <div class="quan up"></div>
                        </div>
                    </div>
                </div>

                <!-- 상품 금액/구매정보 -->
                <div class="optAct">
                    <div class="totalprice">
                        <p>총 상품 금액</p>
                        <div class="total">
                            <p>총 수량 <span class="prdCount">${prd_Count}</span>개</p>
                            <div class="price"><strong>${prd_PriceFinalString}</strong>원</div>
                        </div>
                    </div>
                    <div class="actionbtn">
                        <a href="#none" class="buy btnColorH btnM">바로 구매</a>
                        <a href="#none" class="cart btnColorD btnM">장바구니</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    prdWrap.insertAdjacentHTML("beforeend",prdForm);

    // const prd_Quan = document.querySelector("#prdOption .quan_val").value;
    // prd_Count = prd_Quan;
    // console.log(prd_Count)












}


















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

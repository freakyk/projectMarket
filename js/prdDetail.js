// 상품 detail 정보 불러오기
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
        console.log("상품 전체재고 stock", prdData.stock);
    }catch(error){
        console.log(error);
    }
}
detailData(prdNum);

// 상세페이지 데이터 넣기
const initprdData = async function(e){
    const prdInfo = e;
    // console.log(prdInfo);

    const prd_Img = prdInfo.image;
    const prd_store = prdInfo.store_name;
    const prd_Name = prdInfo.product_name;
    const prd_Ship = prdInfo.shipping_method;
    const prd_Seller = prdInfo.seller;
    const prd_Stock = prdInfo.stock;
    const prd_Info = prdInfo.product_info;
    
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

    const prdWrap = document.querySelector("#prdOptWrap");
    const prdForm = `
        <div id="prdThumb"><img src="${prd_Img}" alt="${prd_Info}"></div>
        <div id="prdOption">
            <!-- 상품 옵션정보 -->
            <div class="optItem">
                <p class="prd_store" data-seller="${prd_Seller}">${prd_store}</p>
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
                            <input class="quan_val" type="number" value="1" min="1" max=${prd_Stock}">
                            <div class="quan up"></div>
                        </div>
                    </div>
                </div>

                <!-- 상품 금액/구매정보 -->
                <div class="optAct">
                    <div class="totalprice">
                        <p>총 상품 금액</p>
                        <div class="total" data-stock="${prd_Stock}">
                            <p>총 수량 <span class="prdCount">${prd_Count}</span>개</p>
                            <div class="price"><strong>${prd_PriceFinalString}</strong>원</div>
                        </div>
                    </div>
                    <div class="actionbtn">
                        <a href="../pages/order.html?product_no=${prdNum}" class="buy btnColorH btnM">바로 구매</a>
                        <a href="../pages/cart.html?product_no=${prdNum}" class="cart btnColorD btnM">장바구니</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    prdWrap.insertAdjacentHTML("beforeend",prdForm);

    // 상품수량
    let quanBtnDown = document.querySelector('.quanityWrap .down');
    let quanBtnUp = document.querySelector('.quanityWrap .up');
    let quanBtnInput = document.querySelector('.quanityWrap .quan_val');
    let quanMax = document.querySelector('#prdOption .optAct .totalprice .total').getAttribute('data-stock');
    let quanMin = document.querySelector('.quanityWrap .quan_val').getAttribute('min');
    let cartAllCount = document.querySelector('#prdOption .optAct .totalprice .total .prdCount');
    let cartAllPrice = document.querySelector('#prdOption .optAct .totalprice .total .price strong');
    let cartBtn = document.querySelector('#prdOption .optAct .actionbtn .cart');
    let buyBtn = document.querySelector('#prdOption .optAct .actionbtn .buy');
    
    if(quanMax == "0"){
        // 품절
        quanBtnUp.style.cursor = "unset";
        quanBtnDown.style.cursor = "unset";
        quanBtnInput.setAttribute('min',0);
        quanBtnInput.setAttribute('value',0);
        quanBtnInput.readOnly = true;
        cartAllCount.textContent = quanBtnInput.value;
        cartAllPrice.textContent = "0";
        cartBtn.style.display = "none";
        buyBtn.textContent = "SOLD OUT";
        buyBtn.classList.add('btnColorD');
        buyBtn.classList.remove('btnColorH');
        buyBtn.setAttribute('href',"javascript:;")
    }else{
        // 수량증가
        let quanUp = function(e){
            let quanBtnInputVal = parseInt(quanBtnInput.value);
            if(quanBtnInputVal < quanMax){
                quanBtnInput.value = quanBtnInputVal + 1;
                cartAllCount.textContent = quanBtnInput.value;
                cartAllPrice.textContent = (prd_Price * quanBtnInput.value).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }else{
                alert(`주문최대수량을 초과했습니다. 현재 재고수량은 ${quanMax}개 입니다`);
            }
        };
        // 수량감소
        let quanDown = function(e){
            let quanBtnInputVal = parseInt(quanBtnInput.value);
            if(quanBtnInputVal > quanMin){
                quanBtnInput.value = quanBtnInputVal - 1;
                cartAllCount.textContent = quanBtnInput.value;
                cartAllPrice.textContent = (prd_Price * quanBtnInput.value).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }else{
                alert('최소주문수량은 1개이상 입니다.');
            }
        };
        quanBtnUp.addEventListener('click', quanUp);
        quanBtnDown.addEventListener('click', quanDown);

        // input change 이벤트
        quanBtnInput.addEventListener('change',function(e){
            let quanBtnInputVal = parseInt(quanBtnInput.value);
            if(quanBtnInputVal > quanMax){
                alert(`주문최대수량을 초과했습니다. 현재 재고수량은 ${quanMax}개 입니다`);
                location.reload();
            }else if(quanBtnInputVal < quanMin){
                alert('최소주문수량은 1개이상 입니다.');
                location.reload();
            }else{
                cartAllCount.textContent = quanBtnInput.value;
                cartAllPrice.textContent = (prd_Price * quanBtnInput.value).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
        });
    }

    // 장바구니 상품목록확인
    const getCartItemInfo = await cartData(localStorage.getItem('user_token'));
    let cartPrdList = [];
    if(getCartItemInfo !== undefined){
        const gettemResults = await getCartItemInfo.results;
        gettemResults.forEach(function(e){
            cartPrdList.push(e.product_id);
        });        
    }
    const hasItems = cartPrdList.filter((e)=>{
        return e == prdNum;
    });
    // console.log('현 장바구니 상품id', cartPrdList);
    // console.log('현 상세페이지 상품id :', prdNum);
    // console.log("상품있는지 :", hasItems.length);
    let itemsExist = Boolean(hasItems.length);
    // console.log("상품존재 boolean값 : ",itemsExist);
    // console.log("상품최종갯수 :", cartAllCount.textContent);

    // 비회원 구매, 장바구니 > 로그인모달
    if(localStorage.getItem('user_token') == null){
        if(quanMax == "0"){
        }else{
            cartBtn.setAttribute('href','javascript:;');
            buyBtn.setAttribute('href','javascript:;');
            cartBtn.addEventListener('click',function(e){
                document.querySelector("#modal_GoToLogin").style.display = "block";
            });
            buyBtn.addEventListener('click',function(e){
                document.querySelector("#modal_GoToLogin").style.display = "block";
            });
        }
    }else{
        if(hasItems.length > 0){
            // 장바구니에 있는 상품이라면
            cartBtn.setAttribute('href','javascript:;');
            cartBtn.addEventListener('click',function(e){
                cartAddData(localStorage.getItem('user_token'),prdNum,cartAllCount.textContent,itemsExist);
                document.querySelector("#modal_GoToCart").style.display = "block";
            });
            document.querySelector("#modal_GoToCart .btnColorH").addEventListener('click',function(e){
                e.target.setAttribute('href',"../pages/cart.html");
            });
            document.querySelector("#modal_GoToCart .btnColorG").addEventListener('click',function(e){
                document.querySelector("#modal_GoToCart").style.display = "none";
            });
        }else{
            cartBtn.setAttribute('href',"../pages/cart.html");
            cartBtn.addEventListener('click',function(e){
                cartAddData(localStorage.getItem('user_token'),prdNum,cartAllCount.textContent,itemsExist);
            });
        }
    }
    document.querySelector("#modal_GoToLogin .btnColorG").addEventListener('click',function(e){
        document.querySelector("#modal_GoToLogin").style.display = "none";
    });
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

// 회원 장바구니 데이터 Request
const cartData = async function(token){
    try{
        const cartUrl = "cart/";
        const fetchUrl = await fetch(`${url}${cartUrl}`,{
            method : "GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `JWT ${token}`
            },
            body : JSON.stringify()
        });
        const memCartData = await fetchUrl.json();
        if(memCartData.results == undefined){
            memCartData.results = [];
            memCartData.count = 0;
            memCartData.next = null;
            memCartData.previous = null;
        }else{
            return memCartData;
        }
    }catch(error){
        console.log(error);
    }
}

// 상품 장바구니 추가하기
const cartAddData = async function(token,id,finalquan,bool){
    try{
        const cartUrl = "cart/";
        const fetchUrl = await fetch(`${url}${cartUrl}`,{
            method : "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `JWT ${token}`
            },
            body : JSON.stringify({
                "product_id": id, 
                "quantity": finalquan,
                "check" : bool
            })
        });
        const addData = await fetchUrl.json();
        return addData;
    }catch(error){
        console.log(error);
    }
}
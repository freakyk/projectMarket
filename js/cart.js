const url = "https://openmarket.weniv.co.kr/";
const memberToken = localStorage.getItem('user_token');

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
            document.querySelector("#cartWrap .nodata").style.display = "block";
        }else{
            document.querySelector("#cartWrap .priceSum").style.display = "block";
            cartList(memCartData.results);
        }
        // console.log("fetch내부", memCartData);
    }catch(error){
        console.log(error);
    }
}
cartData(memberToken);

// 장바구니목록 뿌리기
const cartList = async function(el){
    const cartBody = document.querySelector("#cartWrap ul.body");
    const allCartList = el;
    // console.log(allCartList);
    
    // 상품 뿌리기
    for(let i=0;i<allCartList.length;i++){
        const cart_user = el[i].my_cart;
        const cart_item_id = el[i].cart_item_id;
        const cart_item_checked = el[i].is_active;
        const cart_prd_id = el[i].product_id;
        const cart_quantity = el[i].quantity;

        const getDetailData = await detailData(cart_prd_id);
        const cart_item_stock = getDetailData.stock;
        const cart_item_store = getDetailData.store_name;
        const cart_item_name = getDetailData.product_name;
        const cart_price = getDetailData.price;
        const cart_saleprice = 0;
        const cart_saleAmount = cart_price - cart_saleprice;
        const cart_shipping_method = getDetailData.shipping_method;
        let delfee = getDetailData.shipping_fee;
        let delfeeString = delfee.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        if(delfee == 0){
            delfeeString = "무료배송";
        }
        const cart_item_thumb = getDetailData.image;
        const cart_item_detailUrl = "../pages/prdDetail.html?product_no="+ cart_prd_id;

        const cart_priceDot = cart_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        const cart_salepriceDot = cart_saleAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        const cart_priceAll = cart_price * cart_quantity;
        const cart_pricesaleAll = cart_saleAmount * cart_quantity;
        const cart_priceAllDot = cart_priceAll.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        const cart_pricesaleAllDot = cart_pricesaleAll.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        let prdChecked ="";
        if(cart_item_checked == true){
            prdChecked = "checked";
        }

        const cartListForm = `
            <li data-prdid="${cart_prd_id}" data-itemid="${cart_item_id}">
                <div class="cart_check"><input type="checkbox" name="cart_prd_check" id="check_${cart_prd_id}" class="checkR" ${prdChecked}><label for="check_${cart_prd_id}"></label></div>
                <div class="cart_thumb"><a href="${cart_item_detailUrl}"><img src="${cart_item_thumb}" alt="product thumb"></a></div>
                <div class="cart_info">
                    <div class="optItem">
                        <a href="${cart_item_detailUrl}">
                            <p class="summary_desc">${cart_item_store}</p>
                            <h2 class="prd_name">${cart_item_name}</h2>
                            <div class="price sale none"><strong>${cart_salepriceDot}</strong>원</div>
                            <div class="price origin"><strong>${cart_priceDot}</strong>원</div>
                        </a>
                    </div>
                    <div class="optDel"><span class="del_opt1">${cart_shipping_method}</span><span class="del_opt2" data-fee="${delfee}">${delfeeString}</span></div>
                </div>
                <div class="cart_quan">
                    <div class="quanityWrap" data-prdid="${cart_prd_id}" data-itemid="${cart_item_id}">
                        <div class="quan down"></div>
                        <input class="quan_val" type="number" value="${cart_quantity}" min="1" max="${cart_item_stock}" readonly>
                        <div class="quan up"></div>
                    </div>
                </div>
                <div class="cart_price">
                    <div class="price origin"><strong>${cart_priceAllDot}</strong>원</div>
                    <div class="price sale" data-sale="${cart_saleprice * cart_quantity}" style="display:none;"><strong>${cart_pricesaleAllDot}</strong>원</div>
                    <div class="actionbtn">
                        <a href="#none" class="buy btnColorH btnS">주문하기</a>
                    </div>
                    <div class="delete"></div>
                </div>
            </li>
        `;
        cartBody.insertAdjacentHTML('beforeend',cartListForm);

        /*
            - 장바구니에서 상품의 수량을 수정할 때, `+`나 `-` 버튼을 누르면 수량 수정을 위한 모달창이 나타납니다.
            모달창에서 (상품 상세 페이지와 마찬가지로) 상품의 재고 수량을 초과하면 `+` 버튼은 비활성화됩니다.
            - 선택된 정보만 총 상품금액과 할인, 배송비가 적용되어 총 결제할 가격이 나타나야 합니다.
            - 상품의 `x` 버튼을 클릭할 시 상품 삭제를 재확인하는 모달 창이 중앙에 나타나야 합니다.
            - 상품 삭제를 재확인하는 모달의 확인 버튼을 클릭하면 상품이 삭제되어야 합니다.
            - 합쳐진 수량이 제품의 재고 수량 보다 많을 경우, 재고 수량이 초과 되었다는 모달창이 나타납니다.
        */
        // 상품수량변경, 삭제, 체크박스선택, 주문하기 등 (선택수량만 금액체크)






    }


    // 수량팝업 이벤트
    function editEventModal() {
        let editModal = document.querySelector('#modal_editCount');
        let editModalDown = document.querySelector("#modal_editCount .quanityWrap .down");
        let editModalInput = document.querySelector("#modal_editCount .quanityWrap .quan_val");
        let editModalUp = document.querySelector("#modal_editCount .quanityWrap .up");
        let editModalCancel = document.querySelector("#modal_editCount .btnColorG");
        let editModalSubmit = document.querySelector("#modal_editCount .btnColorH");

        // 수량모달 증감이벤트
        editModalUp.addEventListener('click', function() {
            let modalValue = parseInt(editModalInput.value);
            let max = parseInt(editModalInput.getAttribute('max'));
            if (modalValue < max) {
                editModalInput.value = modalValue + 1;
            } else {
                alert(`주문최대수량을 초과했습니다. 현재 재고수량은 ${max}개 입니다`);
            }
        });
        editModalDown.addEventListener('click', function() {
            let modalValue = parseInt(editModalInput.value);
            let min = parseInt(editModalInput.getAttribute('min'));
            if (modalValue > min) {
                editModalInput.value = modalValue - 1;
            } else {
                alert('최소주문수량은 1개이상 입니다.');
            }
        });

        // 수량모달 버튼이벤트
        editModalCancel.addEventListener('click', function(e) {
            e.preventDefault();
            editModal.style.display = "none";
        });
        editModalSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            let newValue = editModalInput.value;
            let itemId = editModal.getAttribute('data-itemid');
            let prdId = editModal.getAttribute('data-prdid');


            
            let itemcheck = true;

            editModal.style.display = "none";
            editCount(memberToken, itemId, prdId, newValue, itemcheck);
            document.querySelector(`li[data-itemid="${itemId}"] .quan_val`).value = newValue;
        });
    }

    // 상품삭제 이벤트
    function deleteEventModal(){
        let deleteModal = document.querySelector('#modal_delete');
        let deleteModalCancel = document.querySelector("#modal_delete .btnColorG");
        let deleteModalSubmit = document.querySelector("#modal_delete .btnColorH");

        deleteModalCancel.addEventListener('click',function(e){
            e.preventDefault();
            deleteModal.style.display = "none";
        });
        deleteModalSubmit.addEventListener('click',function(e){
            e.preventDefault();
            let itemId = deleteModal.getAttribute('data-itemid');
            deleteModal.style.display = "none";
            deleteItem(memberToken,itemId);
            let itemElement = document.querySelector(`li[data-itemid="${itemId}"]`);
            if (itemElement) itemElement.remove();
        });
    }

    editEventModal();
    deleteEventModal();

    cartBody.addEventListener('click', function(e) {
        // 수량팝업 이벤트위임
        let eQuanWrap = e.target.closest('.quanityWrap');
        let eQuan = e.target.closest('.quanityWrap .quan');
        if (eQuan) {
            // 클릭한 li에 있는 수량버튼
            let targetPrdVal = eQuan.parentElement.querySelector('.quan_val').value;
            let targetPrdMin = eQuan.parentElement.querySelector('.quan_val').getAttribute('min');
            let targetPrdMax = eQuan.parentElement.querySelector('.quan_val').getAttribute('max');
            let targetPrdId = eQuanWrap.getAttribute('data-prdid');
            let targetItemId = eQuanWrap.getAttribute('data-itemid');
            // 모달의 수량버튼
            let editModal = document.querySelector('#modal_editCount');
            let editModalInput = document.querySelector("#modal_editCount .quanityWrap .quan_val");
            editModalInput.value = targetPrdVal;
            editModalInput.setAttribute('min', targetPrdMin);
            editModalInput.setAttribute('max', targetPrdMax);
            editModal.setAttribute('data-prdid', targetPrdId);
            editModal.setAttribute('data-itemid', targetItemId);
            editModal.style.display = "block";
        }

        // 삭제이벤트 위임
        let deleteBtn = e.target.closest('.delete');
        if(deleteBtn){
            let deleteModal = document.querySelector('#modal_delete');
            let targetItemId = deleteBtn.closest('li').getAttribute('data-itemid');
            deleteModal.style.display = "block";
            deleteModal.setAttribute('data-itemid', targetItemId);
        }
    });

    // 상품 총합계
    function prdSum(){
        const sumAll = document.querySelector(".priceSum .priceAll strong");
        const sumDiscout = document.querySelector(".priceSum .priceDis strong");
        const sumDelivery = document.querySelector(".priceSum .priceDel strong");
        const sumFinal = document.querySelector(".priceSum .priceFinal strong");
        const itemsPrice = document.querySelectorAll("#cartWrap .body > li .cart_price .price.origin strong");
        const itemsdisPrice = document.querySelectorAll("#cartWrap .body > li .cart_price .price.sale");
        const itemsdelPrice = document.querySelectorAll("#cartWrap .body > li .cart_info .optDel .del_opt2");
        let sum = 0;
        let sumdis = 0;
        let sumdel = 0;

        itemsPrice.forEach(function(el){
            let priceText = el.textContent;
            let numbersOnly = Number(priceText.replace(/\D/g, ""));
            sum += numbersOnly;
        })
        itemsdisPrice.forEach(function(el){
            let pricedisText = el.getAttribute('data-sale');
            let disnumOnly = Number(pricedisText.replace(/\D/g, ""));
            sumdis += disnumOnly;
        })
        itemsdelPrice.forEach(function(el){
            let pricedelText = el.getAttribute('data-fee');
            let delnumOnly = Number(pricedelText.replace(/\D/g, ""));
            sumdel += delnumOnly;
        })

        // 총 상품금액
        sumAll.textContent = sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        // 상품 할인
        sumDiscout.textContent = sumdis.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        // 배송비
        sumDelivery.textContent = sumdel.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        let sumDiscountNum = Number(sumDiscout.textContent.toString().replace(/\D/g, ""));
        let sumDeliveryNum = Number(sumDelivery.textContent.toString().replace(/\D/g, ""));
        let sumCalc = sum - sumDiscountNum + sumDeliveryNum;
        sumFinal.textContent = sumCalc.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    prdSum();
}

// 상품 detail 정보 불러오기
const detailData = async function(id){
    const detailUrl = "products/";
    const prdId = id;
    try{
        const fetchUrl = await fetch(`${url}${detailUrl}${prdId}`,{
            method : "GET",
            headers: {
                "content-Type" : "application/json"
            },
            body : JSON.stringify()
        })
        const prdData = await fetchUrl.json();
        return prdData;
    }catch(error){
        console.log(error);
    }
}

// 장바구니 수량 수정 req
const editCount = async function(token,cartid,prdid,editquan,bool){
    try{
        const carteditUrl = "cart/";
        const fetchUrl = await fetch(`${url}${carteditUrl}${cartid}/`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${token}`
            },
            body : JSON.stringify({
                "product_id": prdid,
                "quantity": editquan,
                "is_active": bool
            })
        })
        const editData = await fetchUrl.json();
        return editData;
    }catch(error){
        console.log(error);
    }
}

// 장바구니 수량 삭제 req
const deleteItem = async function(token,cartid){
    try{
        const cartdelUrl = "cart/";
        const fetchUrl = await fetch(`${url}${cartdelUrl}${cartid}/`,{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${token}`
            }
        })
        const deleteData = await fetchUrl.json();
        return deleteData;
    }catch(error){
        console.log(error);
    }
}



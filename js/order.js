const url = "https://openmarket.weniv.co.kr/";

const getOrderData = async function(token){
    const orderUrl = "order/";
    const fetchUrl = await fetch(`${url}${orderUrl}`,{
        method : "GET",
        headers : {
            "content-type" : "application/json",
            "Authorization" : `JWT ${token}`
        },
        body : JSON.stringify()
    })
    const orderData = await fetchUrl.json();
    orderData.results.forEach(function(e){
        makeOrderList(e);
    })
}
getOrderData(localStorage.getItem('user_token'));

const makeOrderList = function(e){
    const orderList = e;
    console.log(orderList);

    const order_address = orderList.address;
    const order_add_message = orderList.address_message;
    const order_delstatus = orderList.delivery_status;
    const order_items = orderList.order_items[0];
    const order_number = orderList.order_number;
    const order_quantity = orderList.order_quantity;
    const order_paymethod = orderList.payment_method;
    const order_receiver = orderList.receiver;
    const order_receiver_phone = orderList.receiver_phone_number;
    const order_total = orderList.total_price;
    const order_totalString = order_total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    const orderBody = document.querySelector("#orderWrap ul.body");
    const orderForm = `
        <li>
            <div class="order_thumb"><a href="#none"><img src="../img/prdthumb.png" alt="product thumb"></a></div>
            <div class="order_info">
                <div class="optItem">
                    <a href="#none">
                        <p class="summary_desc">백엔드 글로벌</p>
                        <h2 class="prd_name">딥러닝 개발자 무릎 담요</h2>
                    </a>
                    <div class="orderQuan">수량 : <strong>${order_quantity}</strong>개</div>
                </div>
            </div>
            <div class="order_discount">-</div>
            <div class="order_delivery">무료배송</div>
            <div class="order_price">
                <div class="price"><strong>${order_totalString}</strong>원</div>
            </div>
        </li>
    `;
    orderBody.insertAdjacentHTML("beforeend",orderForm);

}
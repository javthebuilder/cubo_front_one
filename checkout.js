
var current_checkout_step = localStorage.getItem('cubo_current_checkout_step');	
var individual_template_checkout_cart = ``;


if(current_checkout_step == null || current_checkout_step == 1){
    loadCurrentCart_Checkout();
}else if(current_checkout_step == 2){

    proceedStepTwo();
}



function loadCurrentCart_Checkout(){    
    console.log("loadCurrentCart_Checkout");

	$("#current_cart_items").html("");
	var email = localStorage.getItem('cubo_login_email');
	var currentToken = localStorage.getItem('cubo_app_token');
	

	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:8000/api/viewMyCartWeb/'+email,
		contentType: 'application/json',
		headers: {			   
			   'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer '+ currentToken,			   
		},
		data: {
			'email':email,
			
		},
		success: function(onJson) {		

			
			var sub_total = 0.00;
            var net_total = 0.00;
            var shipping_fee = 0.00;
            checkout_cart_items_json = onJson;

			for(var c = 0 ; c < onJson.length ; c++){

				sub_total+= (onJson[c].sale_price * onJson[c].quantity);
                //console.log((onJson[c].sale_price * onJson[c].quantity) + ' - ' + onJson[c].quantity);
    
				individual_template_checkout_cart += `		    			  

                  <tr>
									<td>
										<div class="cart_product">
											<div class="item_image">
												<img src="http://127.0.0.1:8000/`+onJson[c].image_one+`" alt="`+onJson[c].name+`">
											</div>
											<div class="item_content">
												<h6 class="item_title" style="overflow-wrap: break-word;">`+onJson[c].name+`</h6>
												<span class="item_type">` + onJson[c].categories[3].name +`</span>
											</div>
											<button type="button" class="remove_btn"  onclick="clearCart(`+onJson[c].id+`, );">
												<i class="fal fa-times"></i>
											</button>
										</div>
									</td>
									<td>
										<span class="price_text">&#8369;`+ (onJson[c].sale_price) +`</span>
									</td>
									<td>
										<div class="quantity_input">
											<form action="#">
												<span style="display:none;" class="input_number_decrement">–</span>
												<input class="input_number" type="text" value="`+(onJson[c].quantity)+`" readonly>
												<span style="display:none;" class="input_number_increment">+</span>
											</form>
										</div>
									</td>
									<td><span class="total_price">&#8369;`+ (onJson[c].sale_price * onJson[c].quantity).toFixed(2) +`</span></td>
								</tr>
			  
				  `;
                  
			  }
			  
			  net_total = sub_total + shipping_fee;

			  $("#tbody_checkout").html("");
			  $("#tbody_checkout").prepend(individual_template_checkout_cart);


			  $("#checkout_page_subtotal").html(`` + sub_total.toFixed(2) +``);
              $("#checkout_page_net_total").html(`` + net_total.toFixed(2) +``);
			  
/*
			  $("#checkout_subtotal").html(``+sub_total.toFixed(2)+``);
			  $("#checkout_total").html(``+sub_total.toFixed(2)+``);
              */
	
		}
		}).always(function(jqXHR, textStatus) {
		if (textStatus != "success") {


			$("#snackbar").html(``);
			$("#snackbar").html(`
			<h4 style="color:red">Not currently login</h4>
			`);


			 // Get the snackbar DIV
			var x = document.getElementById("snackbar");

			// Add the "show" class to DIV
			x.className = "show";

			// After 3 seconds, remove the show class from DIV
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
		}
	})
	;


}

function proceedStepTwo(){
    
    var checkout_cart_items_display = ``;
    var email = localStorage.getItem('cubo_login_email');
	var currentToken = localStorage.getItem('cubo_app_token');
	

	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:8000/api/viewMyCartWeb/'+email,
		contentType: 'application/json',
		headers: {			   
			   'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer '+ currentToken,			   
		},
		data: {
			'email':email,
			
		},
		success: function(onJson) {		

			
			var sub_total = 0.00;
            var net_total = 0.00;
            var shipping_fee = 0.00;
            checkout_cart_items_json = onJson;

			for(var c = 0 ; c < onJson.length ; c++){
                //console.log(onJson);

				sub_total+= (onJson[c].sale_price * onJson[c].quantity);                
    
				checkout_cart_items_display += `
                
                    <tr>
                        <td>
                            <div class="cart_product">
                                <div class="item_image">
                                    <img src="http://127.0.0.1:8000/`+onJson[c].image_one+`" alt="`+onJson[c].name+`">
                                </div>
                                <div class="item_content">
                                    <h4 class="item_title mb-0">`+onJson[c].name+`</h4>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="price_text">&#8369;`+ (onJson[c].sale_price) +`</span>
                        </td>
                        <td>
                            <span class="quantity_text">`+(onJson[c].quantity)+`</span>
                        </td>
                        <td><span class="total_price">`+ (onJson[c].sale_price * onJson[c].quantity).toFixed(2) +`</span></td>
                    </tr>

              
			  
				  `;
                  
			  }
			  
			  net_total = sub_total + shipping_fee;
              
              
              
    var step_2_form = 
    ``;
    //console.log(checkout_cart_items_display);
    var billing_form_summarry = `
    <div class="billing_form">
						<h3 class="form_title mb_30">Your order</h3>
						<form action="#">
							<div class="form_wrap">

								<div class="checkout_table">
									<table class="table text-center mb_50">
										<thead class="text-uppercase text-uppercase">
											<tr>
												<th>Product Name</th>
												<th>Price</th>
												<th>Quantity</th>
												<th>Total</th>
											</tr>
										</thead>
										<tbody>
						
                                            `+checkout_cart_items_display+`


											<tr>
												<td></td>
												<td></td>
												<td>
													<span class="subtotal_text">Subtotal</span>
												</td>
												<td><span class="total_price">&#8369;`+sub_total.toFixed(2)+`</span></td>
											</tr>

											<tr>
												
												<td>
													<span class="subtotal_text">Shipping</span>
												</td>
												<td class="" colspan="4" align="left">
													<div class="">
														<label for="shipping_checkbox"><input id="shipping_checkbox" type="checkbox" checked=""> Free Shipping</label>
													</div>
													<div class="">
														<label for="flatrate_checkbox"><input id="flatrate_checkbox" type="checkbox"> Flat rate: $15.00</label>
													</div>
													<div class="">
														<label for="localpickup_checkbox"><input id="localpickup_checkbox" type="checkbox"> Local Pickup: $8.00</label>
													</div>
												</td>
											</tr>

											<tr>
												<td class="text-left">
													<span class="subtotal_text">TOTAL</span>
												</td>
												<td></td>
												<td></td>
												<td>
													<span class="total_price">$135.00</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div class="billing_payment_mathod">
									<ul class="ul_li_block clearfix">
										<li>
											<div class="checkbox_item mb_15 pl-0">
												<label for="bank_transfer_checkbox"><input id="bank_transfer_checkbox" type="checkbox" checked=""> Direct Bank Transfer</label>
											</div>
											<p class="mb-0">
												Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
											</p>
										</li>

										<li>
											<div class="checkbox_item mb-0 pl-0">
												<label for="check_payments"><input id="check_payments" type="checkbox">Check Payments</label>
											</div>
										</li>
										<li>
											<div class="checkbox_item mb-0 pl-0">
												<label for="cash_delivery"><input id="cash_delivery" type="checkbox"> Cash On Delivery</label>
											</div>
										</li>
										<li>
											<div class="checkbox_item mb-0 pl-0">
												<label for="paypal_checkbox"><input id="paypal_checkbox" type="checkbox"> Paypal <a href="#!"><img class="paypal_image" src="assets/images/payment_methods_03.png" alt="image_not_found"></a></label>
											</div>
										</li>
									</ul>
									<button type="submit" class="custom_btn bg_default_red">PLACE ORDER</button>
								</div>

							</div>
						</form>
					</div>
                        `;
                        //$("#shopping_cart_table").html(step_2_form);
                        $("#shopping_cart_table").append(billing_form_summarry);

                        
                        $("#cart_total_summary").hide();

                        localStorage.setItem("cubo_current_checkout_step", 2);
	
		}
		});
    
    $("#step_1_marker").removeClass("active");
    $("#step_1_marker").addClass("activated");    
    $("#step_2_marker").addClass("active");

    $("#shopping_cart_table").html(``);
    


}
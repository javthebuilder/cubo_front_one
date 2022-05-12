
var current_checkout_step = localStorage.getItem('cubo_current_checkout_step');	
var individual_template_checkout_cart = ``;


if(current_checkout_step == null || current_checkout_step == 1){
	
     
	$("#billing_form").hide();  
	loadCurrentCart_Checkout();

}else if(current_checkout_step == 2){

	$("#billing_form").show();  
    proceedStepTwo();
}



function loadCurrentCart_Checkout(){    
    console.log("loadCurrentCart_Checkout");

	$("#current_cart_items").html("");
	$("#tbody_checkout").html(``);
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

			if(onJson.length == 0){
				//set to checkout part 1
				localStorage.setItem("cubo_current_checkout_step", 1);
				window.location.href = "/"; 
				/*
				localStorage.setItem("cubo_current_checkout_refresh", 1);

				if(localStorage.getItem('cubo_current_checkout_refresh') == 1){

					localStorage.setItem("cubo_current_checkout_refresh", 0);
					//window.location.reload();
				}
				*/
					
				



			}else{

				for(var c = 0 ; c < onJson.length ; c++){

					sub_total+= (onJson[c].sale_price * onJson[c].quantity);
					
	
		
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
												<button type="button" class="remove_btn"  onclick="clearCartCheckout(`+onJson[c].id+`, `+ (onJson[c].sale_price) +`);">
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
										<td><span class="total_price">&#8369;`+ ((onJson[c].sale_price * onJson[c].quantity).toFixed(2) == NaN ? "0.00" : 
										(onJson[c].sale_price * onJson[c].quantity).toFixed(2)
										) +`</span></td>
									</tr>
				  
					  `;
					  
				  }

			}

			
			  
			  net_total = sub_total + shipping_fee;

			  $("#tbody_checkout").html(``);
			  $("#tbody_checkout").prepend(individual_template_checkout_cart);
			
			  console.log("sub_total:"+sub_total);

			  $("#checkout_page_subtotal").html(`` + (sub_total == NaN ? "0.00" : sub_total.toFixed(2)) +``);
              $("#checkout_page_net_total").html(`` + (net_total == NaN ? "0.00" : net_total.toFixed(2)) +``);
			  
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
			  localStorage.setItem("cubo_checkout_sub_total", sub_total);
              
              
              
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
												<td></td>
												<td></td>
												<td>
													<span class="subtotal_text">Shipping Fee</span>
												</td>
												<td><span class="total_price" id="shipping-fee">0.00</span></td>
											</tr>


											<tr>
												<td></td>
												<td></td>
												<td>
													<span class="subtotal_text">Transaction Fee</span>
												</td>
												<td><span class="total_price" id="transaction-fee">0.00</span></td>
											</tr>

											<tr>
												
												<td>
													<span class="subtotal_text">Shipping</span>
												</td>
												<td class="" colspan="4" align="left">
													<div class="">
														<label for="shipping_checkbox">
															<input id="shipping_checkbox_store_pickup" type="radio" checked="checked" name="shipping_method" onchange="saveLocalCheckoutInfo('cubo_checkout_delivery_method', 'shipping_checkbox_store_pickup')"> Store Pickup
															</label>
													</div>
													<div class="">
														<label for="flatrate_checkbox">
														<input id="shipping_checkbox_lalamove" type="radio" name="shipping_method" onchange="saveLocalCheckoutInfo('cubo_checkout_delivery_method', 'shipping_checkbox_lalamove')"> Lalamove: <span id="shipping_fee_lalamove_display"> Calculating... </span></label>
													</div>
													<div class="">
														<label for="localpickup_checkbox">
														<input id="shipping_checkbox_self_delivery" type="radio" name="shipping_method" onchange="saveLocalCheckoutInfo('cubo_checkout_delivery_method', 'shipping_checkbox_self_delivery')"> Store Self Delivery</label>
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
													<span class="total_price" id="total-price-with-shipping-fee"></span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div class="billing_payment_mathod">
									<ul class="ul_li_block clearfix">
										
										<li>
											<div class="radio_item mb-0 pl-0">
												<label onclick="selecteddivpayment('payment-method-1', 1, 'COD (Cash On Delivery)');">
													<input type="radio" name="pay" id="payment-method-1" checked="checked"> COD (Cash On Delivery) 
												</label>
											</div>
										</li>
										<li>
											<div class="radio_item mb-0 pl-0">
												<label onclick="selecteddivpayment('payment-method-3', 3, 'Credit Card / Debit Card');">
													<input type="radio" name="pay"  id="payment-method-3"> Credit Card / Debit Card 
													<a href="#!">
													<img class="paypal_image" src="assets/images/payment_methods_03.png" alt="image_not_found">
													</a>
												</label>
											</div>
										</li>
									</ul>
									<button type="button" class="custom_btn bg_default_red" onclick="save_delivery_info();">PLACE ORDER</button>
								</div>

							</div>
						</form>
					</div>
                        `;
                        //$("#shopping_cart_table").html(step_2_form);
                        $("#shopping_cart_table").prepend(billing_form_summarry);

                        
                        $("#cart_total_summary").hide();

                        localStorage.setItem("cubo_current_checkout_step", 2);
						$("#billing_form").show();  
	
		}
		});
    
    $("#step_1_marker").removeClass("active");
    $("#step_1_marker").addClass("activated");    
    $("#step_2_marker").addClass("active");

    $("#shopping_cart_table").html(``);
    


}

function selecteddivpayment(element_id, method_id, method_name){
	console.log(element_id, method_id, method_name);
	radiobtn = document.getElementById(element_id);
	radiobtn.checked = true;

	localStorage.setItem("cubo_checkout_payment_selected", method_name);

	getLalamoveQuotationAmount();
	changePaymentSelected(method_id, method_name);

}

function changePaymentSelected(method_id, method_name){

	
	current_cart_total = parseFloat(localStorage.getItem('cubo_checkout_sub_total'));
	console.log( 'current cart total:' + current_cart_total);

	current_shipping_fee = 0;
	if(localStorage.getItem('cubo_checkout_delivery_method') == "lalamove"){
		console.log("is lalamove true");

		current_shipping_fee =  parseFloat(localStorage.getItem('cubo_checkout_lalamove_shipping_fee'));
		localStorage.setItem('cubo_checkout_shipping_fee', current_shipping_fee);

	}else{
		console.log("is lalamove false");

		localStorage.setItem('cubo_checkout_shipping_fee', 0.00)

		
		document.getElementById("shipping-fee").innerHTML = numberWithComma(0.00)
	}
	


	gross_total = parseFloat(current_cart_total) + parseFloat(current_shipping_fee);
	
	if(method_id == 3 || method_name == "Credit Card / Debit Card"  || localStorage.getItem('cubo_checkout_payment_selected') == "Credit Card / Debit Card"){

		with_transaction_fee =  ((gross_total.toString() == "NaN" ? 0.00 : gross_total)+15)/0.955;

		
		transaction_fee = (with_transaction_fee.toString() == "NaN" ? 0.00 : with_transaction_fee) - (gross_total.toString() == "NaN" ? 0.00 : gross_total);
		overall_total = (transaction_fee.toString() == "NaN" ? 0.00 : transaction_fee) + (gross_total.toString() == "NaN" ? 0.00 : gross_total);

		//(transaction_fee.toString() == "NaN" ? 0.00 : transaction_fee)

		localStorage.setItem("cubo_checkout_transaction_fee", (transaction_fee.toString() == "NaN" ? 0.00 : transaction_fee));
		localStorage.setItem("cubo_checkout_total_price_with_shipping", (overall_total.toString() == "NaN" ? 0.00 : overall_total));
		document.getElementById("transaction-fee").innerHTML = numberWithComma((transaction_fee.toString() == "NaN" ? 0.00 : transaction_fee));
		document.getElementById("total-price-with-shipping-fee").innerHTML = numberWithComma(overall_total.toString() == "NaN" ? "0.00" : overall_total);


		console.log("if overall_total:"+overall_total);
	}else{

		transaction_fee = 0.00;
		overall_total = transaction_fee + gross_total;
		localStorage.setItem("cubo_checkout_transaction_fee", transaction_fee);
		localStorage.setItem("cubo_checkout_total_price_with_shipping", overall_total);

		document.getElementById("transaction-fee").innerHTML = numberWithComma(transaction_fee);
		console.log("else overall_total:"+overall_total);
		document.getElementById("total-price-with-shipping-fee").innerHTML = numberWithComma(overall_total.toString() == "NaN" ? "0.00" : overall_total);

	}

}

function numberWithComma(n) {

	var valueString = n; //can be 1500.0 or 1500.00
	var amount = parseFloat(valueString).toFixed(2);
	var formattedString = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	//console.log(formattedString); //outputs 1,500.00
	return formattedString;

}



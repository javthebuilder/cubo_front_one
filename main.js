

loadProducts();
loadUser();
loadCurrentCart();

function loadProducts(){
    
    var individual_template = ``;
    var individual_modal_template = ``;

    // fetch('http://192.168.1.8:8000/api/all_merchant_products/20')
	fetch('http://192.168.1.8:8000/api/all_merchant_products/20')
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {                         

        for(var c = 0 ; c < myJson.length ; c++){

          individual_template += `
            
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="minimal_product_item">
                    <div class="tab-content">
                        <div id="ptab1_1" class="tab-pane active">
                            <img src="http://192.168.1.8:8000/`+myJson[c].image_one+`" alt="image_not_found">
                        </div>
                        
                    </div>
                    <div class="item_content">
                        <h3 class="item_title">
                            <a href="#!">`+myJson[c].name+`</a>
                        </h3>
                        <span class="item_category">` 
                        
                        + `<br>` + myJson[c].categories[3].name +`</span>
                        <span class="item_price">&#8369;`+myJson[c].sale_price+`</span>
                    </div>
                    <ul class="product_color ul_li_block nav clearfix">
                        <li class="active"><a class="pbg_lightgreen" data-toggle="tab" href="#ptab1_1"></a></li>
                        
                        
                    </ul>
                    <ul class="product_label ul_li clearfix">
                        <li class="bg_black">New</li>
                    </ul>
                    <ul class="product_action_btns ul_li_block clearfix">
                        
                        <li onclick="addToCart(`+myJson[c].id+`,`+myJson[c].sale_price+`)"><a class="tooltips" data-placement="right" title="Add To Cart" href="#!"><i class="fal fa-shopping-basket"></i></a></li>
                        <li><a class="tooltips" data-placement="right" title="Quick View" href="#!" data-toggle="modal" data-target="#quickview_modal_`+myJson[c].id+`"><i class="fal fa-search"></i></a></li>
                    </ul>
                </div>
            </div>
            
        
            `;
			

            individual_modal_template += `
            
            <div class="quickview_modal modal fade" id="quickview_modal_`+myJson[c].id+`" tabindex="-1" role="dialog" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content clearfix">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div class="item_image">
							<img src="http://192.168.1.8:8000/`+myJson[c].image_one+`" alt="image_not_found">
						</div>
						<div class="item_content">
							<h2 class="item_title mb_15">`+myJson[c].name+`</h2>
							<div class="rating_star mb_30 clearfix">
								<ul class="float-left ul_li mr-2">
									<li class="active"><i class="las la-star"></i></li>
									<li class="active"><i class="las la-star"></i></li>
									<li class="active"><i class="las la-star"></i></li>
									<li class="active"><i class="las la-star"></i></li>
									<li><i class="las la-star"></i></li>
								</ul>
								<span style="display:none;" class="review_text">(12 Reviews)</span>
							</div>
							<span class="item_price mb_15">&#8369;`+myJson[c].sale_price+`</span>
							<p class="mb_30">
                            `+myJson[c].description+`
							</p>
							<div class="quantity_form mb_30 clearfix">
								<strong class="list_title">Quantity:</strong>
								<div class="quantity_input" id="quantity_input_`+myJson[c].id+`">
									<form action="#">
										<span class="input_number_decrement">–</span>
										<input class="input_number"  id="input_number_`+myJson[c].id+`" type="text" value="1">
										<span class="input_number_increment">+</span>
									</form>
								</div>
							</div>
							<ul class="btns_group ul_li mb_30 clearfix">

								<li onclick = "addToCartWithQuantity(`+myJson[c].id+`,`+myJson[c].sale_price+`)">
									<a href="#!" onclick = "addToCartWithQuantity(`+myJson[c].id+`,`+myJson[c].sale_price+`)" class="custom_btn bg_carparts_red">Add to Cart</a>
								</li>

								<li onclick="clearCart(`+myJson[c].id+`, );"><a href="#!" data-toggle="tooltip" data-placement="top" title="" data-original-title="Compare Product"><i class="fal fa-sync"></i></a></li>

								<li style="display:none;"><a href="#!" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add To Wishlist"><i class="fal fa-heart"></i></a></li>
							</ul>
							<ul class="info_list ul_li_block clearfix">
								<li><strong class="list_title">Category:</strong> <a href="#!">` + myJson[c].categories[2].name +`, ` + myJson[c].categories[3].name +`</a></li>
								<li class="social_icon" style="display: none;">
									<strong class="list_title">Share:</strong>
									<ul class="ul_li clearfix">
										<li><a href="#!"><i class="fab fa-facebook-f"></i></a></li>
										<li><a href="#!"><i class="fab fa-twitter"></i></a></li>
										<li><a href="#!"><i class="fab fa-instagram"></i></a></li>
										<li><a href="#!"><i class="fab fa-pinterest-p"></i></a></li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
        
            `;



        }
        $("#inner_main_container").prepend(individual_template);
        $("#quick_modal_group").prepend(individual_modal_template);


    });              

}

function loadCurrentCart(){    

	$("#current_cart_items").html("");
	var email = localStorage.getItem('cubo_login_email');
	var currentToken = localStorage.getItem('cubo_app_token');
	

	$.ajax({
		type: 'POST',
		url: 'http://192.168.1.8:8000/api/viewMyCartWeb/'+email,
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

			var individual_template_cart = ``;
			var sub_total = 0.00;
			localStorage.setItem('current_checkout_cart_item_count', onJson.length);
			for(var c = 0 ; c < onJson.length ; c++){

				sub_total+= (onJson[c].sale_price * onJson[c].quantity);
	
				individual_template_cart += `				  
	  
				  <li>
					  <div class="item_image">
						  <img src="http://192.168.1.8:8000/`+onJson[c].image_one+`" alt="image_not_found">
					  </div>
					  <div class="item_content">
						  <h4 class="item_title">`+onJson[c].name+`</h4>
						  <span class="item_price"> `+onJson[c].quantity +` X &#8369;`+onJson[c].sale_price+`</span>
						  <span class="quantity"> &#8369;`+ (onJson[c].sale_price * onJson[c].quantity).toFixed(2) +`</span>
					  </div>
					  <button type="button" class="remove_btn" onclick="clearCart(`+onJson[c].id+`, `+onJson[c].sale_price+`);"><i class="fal fa-trash-alt"></i></button>
				  </li>			  
			  
				  `;	  
			  }


			  

			  if(onJson.length > 1 && localStorage.getItem('cubo_current_checkout_step') == 3 ){
				localStorage.setItem('cubo_current_checkout_step', 1);

			  }
			  
			  
			  $("#current_cart_items").html("");
			  $("#current_cart_items").prepend(individual_template_cart);


			  $("#item_count_web").html(``+onJson.length+``);
			  $("#item_count_mobile").html(``+onJson.length+``);

			  $("#checkout_subtotal").html(``+sub_total.toFixed(2)+``);
			  $("#checkout_total").html(``+sub_total.toFixed(2)+``);
	
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

function clearCart(itemid, sale_price){


	
	if(checkCurrentToken() != null){	
		// add to card live

		var currentToken = localStorage.getItem('cubo_app_token');
		var email = localStorage.getItem('cubo_login_email');	


		$.ajax({
			type: 'POST',
			url: 'http://192.168.1.8:8000/api/addToCartWeb/'+email+'/'+itemid+'/0',
			contentType: 'application/json',
			headers: {			   
			   	'Content-Type': 'application/json',
        		'Accept': 'application/json',
        		'Authorization': 'Bearer '+ currentToken,			   
			},
			data: {
				'email':email,
				'product_id': itemid,						
			},
			success: function(data) {		
				var currentUrl = window.location.href;
				console.log("currentUrl:" + currentUrl);
				$("#tbody_checkout").html(``);
				loadCurrentCart();

				if(currentUrl == 'http://192.168.1.8:5500/shop_checkout.html'){

					loadCurrentCart_Checkout();
					window.location.href = currentUrl;
				}
				
				else{}



				//
				
				
		
			}
		}).always(function(jqXHR, textStatus) {
			if (textStatus != "success") {
				alert("Error: " + jqXHR.statusText);
			}
		});

		
		
	}else{

		location.href = 'login.html';

	}



}
function clearCartCheckout(itemid, sale_price){


	console.log("clearCartCheckout");
	if(checkCurrentToken() != null){	
		// add to card live

		var currentToken = localStorage.getItem('cubo_app_token');
		var email = localStorage.getItem('cubo_login_email');	


		$.ajax({
			type: 'POST',
			url: 'http://192.168.1.8:8000/api/addToCartWeb/'+email+'/'+itemid+'/0',
			contentType: 'application/json',
			headers: {			   
			   	'Content-Type': 'application/json',
        		'Accept': 'application/json',
        		'Authorization': 'Bearer '+ currentToken,			   
			},
			data: {
				'email':email,
				'product_id': itemid,						
			},
			success: function(data) {		

				loadCurrentCart();
				loadCurrentCart_Checkout();
				
				
		
			}
		}).always(function(jqXHR, textStatus) {
			if (textStatus != "success") {
				alert("Error: " + jqXHR.statusText);
			}
		});

		
		
	}else{

		location.href = 'login.html';

	}



}
function addToCartWithQuantity(itemid, sale_price){
	console.log('addToCartWithQuantity');
	
	$("#current_cart_items").html("");
	
	if(checkCurrentToken() != null){	
		// add to card live

		var currentToken = localStorage.getItem('cubo_app_token');
		var email = localStorage.getItem('cubo_login_email');

		
		var quantity = document.getElementById("input_number_" + itemid).value;

		$.ajax({
			type: 'POST',
			url: 'http://192.168.1.8:8000/api/addToCartWeb/'+email+'/'+itemid+'/'+quantity,
			contentType: 'application/json',
			headers: {			   
			   	'Content-Type': 'application/json',
        		'Accept': 'application/json',
        		'Authorization': 'Bearer '+ currentToken,			   
			},
			data: {
				'email':email,
				'product_id': itemid,						
			},
			success: function(data) {		

				loadCurrentCart();	
		
			}
		}).always(function(jqXHR, textStatus) {
			if (textStatus != "success") {
				alert("Error: " + jqXHR.statusText);
			}
		});

		
		$('#quickview_modal_' + itemid ).modal('hide');
		
	}else{

		location.href = 'login.html';

	}



}

function addToCart(itemid, sale_price){
	
	$("#current_cart_items").html("");
	
	if(checkCurrentToken() != null){	
		// add to card live

		var currentToken = localStorage.getItem('cubo_app_token');
		var email = localStorage.getItem('cubo_login_email');

		$.ajax({
			type: 'POST',
			url: 'http://192.168.1.8:8000/api/addToCartWeb/'+email+'/'+itemid+'/1',
			contentType: 'application/json',
			headers: {			   
			   	'Content-Type': 'application/json',
        		'Accept': 'application/json',
        		'Authorization': 'Bearer '+ currentToken,			   
			},
			data: {
				'email':email,
				'product_id': itemid,						
			},
			success: function(data) {		

				loadCurrentCart();	
		
			}
		}).always(function(jqXHR, textStatus) {
			if (textStatus != "success") {
				alert("Error: " + jqXHR.statusText);
			}
		});

		
		
	}else{

		location.href = 'login.html';

	}



}

function checkCurrentToken(){

	var token_got =  localStorage.getItem('cubo_app_token');	
	return token_got;
}

function loadUser(){

	
	if(checkCurrentToken() != null){
		var loginInfo_name = '';
		
		loginInfo_name += localStorage.getItem('cubo_login_name');
		
		
		document.getElementById("user_name_display").innerHTML = loginInfo_name;
		document.getElementById("user_name_display_mobile").innerHTML = loginInfo_name;
		document.getElementById("user_type_name").innerHTML = "Current Login";
		document.getElementById("user_type_name_mobile").innerHTML = "Current Login";
		

		document.getElementById("settings_options").style.visibility = 'visible';
		document.getElementById("settings_options_guest").style.visibility = 'hidden';
		

		
		//settings_options_guest

		
	}else{

		document.getElementById("user_name_display").innerHTML = "Guest";
		document.getElementById("user_name_display_mobile").innerHTML = "Guest";
		document.getElementById("user_type_name").innerHTML = " ";
		document.getElementById("user_type_name_mobile").innerHTML = " ";

		document.getElementById("settings_options").style.visibility = 'hidden';
		document.getElementById("settings_options_guest").style.visibility = 'visible';

	}




}

function logout_user(){


		
	var currentToken = localStorage.getItem('cubo_app_token');

	$.ajax({
		type: 'POST',
		url: 'http://192.168.1.8:8000/api/logout',
		contentType: 'application/json',
		headers: {
		   'Authorization': 'Bearer ' + currentToken
		},
		data: {
			
			
			

		},
		success: function(data) {		
			
			alert(data["message"]);
			
			localStorage.removeItem('cubo_login_updated_at');
			localStorage.removeItem('cubo_login_status');
			localStorage.removeItem('cubo_login_name');
			localStorage.removeItem('cubo_login_created_at');
			localStorage.removeItem('cubo_login_info');
			localStorage.removeItem('cubo_login_user_type');
			localStorage.removeItem('cubo_login_email');
			localStorage.removeItem('cubo_app_token');
			localStorage.removeItem('cubo_login_affiliate_code');

			localStorage.removeItem('cubo_login_upline_affiliate_code');
			localStorage.removeItem('cubo_login_email_verified_at');
			localStorage.removeItem('cubo_login_affiliate_id');
			localStorage.removeItem('cubo_login_id');


			location.href = 'login.html';
	
		}
	}).always(function(jqXHR, textStatus) {
		if (textStatus != "success") {
			alert("Error: " + jqXHR.statusText);
		}
	});


}






loadProducts();
function loadProducts(){
    
    var individual_template = ``;
    var individual_modal_template = ``;

    fetch('https://cubo.market/api/all_merchant_products/20')
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
                            <img src="https://cubo.market/`+myJson[c].image_one+`" alt="image_not_found">
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
                        
                        <li><a class="tooltips" data-placement="right" title="Add To Cart" href="#!"><i class="fal fa-shopping-basket"></i></a></li>
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
							<img src="https://cubo.market/`+myJson[c].image_one+`" alt="image_not_found">
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
								<div class="quantity_input">
									<form action="#">
										<span class="input_number_decrement">–</span>
										<input class="input_number" type="text" value="1">
										<span class="input_number_increment">+</span>
									</form>
								</div>
							</div>
							<ul class="btns_group ul_li mb_30 clearfix">
								<li><a href="#!" class="custom_btn bg_carparts_red">Add to Cart</a></li>
								<li><a href="#!" data-toggle="tooltip" data-placement="top" title="" data-original-title="Compare Product"><i class="fal fa-sync"></i></a></li>
								<li><a href="#!" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add To Wishlist"><i class="fal fa-heart"></i></a></li>
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
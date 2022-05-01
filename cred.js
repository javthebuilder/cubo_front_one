//login();
/*
if(checkCurrentToken() == null){
	window.location.replace("/login.html");
}
*/


function login() {
	
	
	
	
	var password_input = document.getElementById("password_input").value;
	var username_input = document.getElementById("username_input").value;


	$.ajax({
		type: 'POST',
		url: 'https://cubo.market/api/login',
		data: {
			
			'email': username_input,
			'password': password_input,

		},
		success: function(data) {		
			console.log(data);
			localStorage.setItem("cubo_app_token", data["token"]);
			localStorage.setItem("cubo_login_info", data["user"]);
			localStorage.setItem("cubo_login_affiliate_id", data["user"]["affiliate_id"]);

			
			localStorage.setItem("cubo_login_affiliate_code", data["user"]["affiliate_code"]);
			localStorage.setItem("cubo_login_affiliate_id", data["user"]["affiliate_id"]);
			localStorage.setItem("cubo_login_created_at", data["user"]["created_at"]);
			localStorage.setItem("cubo_login_email", data["user"]["email"]);
			localStorage.setItem("cubo_login_email_verified_at", data["user"]["email_verified_at"]);
			localStorage.setItem("cubo_login_id", data["user"]["id"]);
			localStorage.setItem("cubo_login_name", data["user"]["name"]);
			localStorage.setItem("cubo_login_status", data["user"]["status"]);
			localStorage.setItem("cubo_login_updated_at", data["user"]["updated_at"]);
			localStorage.setItem("cubo_login_upline_affiliate_code", data["user"]["upline_affiliate_code"]);
			localStorage.setItem("cubo_login_user_type", data["user"]["user_type"]);
			
			alert("Login Successfully" );
			location.href = 'index.html';
	
		}
	}).always(function(jqXHR, textStatus) {
		if (textStatus != "success") {
			alert("Error: " + jqXHR.statusText);
		}
	});

	
}

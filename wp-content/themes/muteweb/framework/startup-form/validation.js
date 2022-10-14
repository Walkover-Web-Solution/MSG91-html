function setScroll() {
		setTimeout(function () {
			var el = document.querySelectorAll('#dropEmail .form-group.has-error');
			if (el && el.length) {
				el[0].scrollIntoView();
			}
		}, 100);
	}
	function removeClass(name) {
		if (name) {
			setTimeout(function () {
				jQuery(name).parent().removeClass('has-error');
			}, 5000);
		}
	}
	function validateURL(url) {
		return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url);
	}
	function goto(step){
		if (step == "step-3") {
			if ((jQuery("input[name=company_name]").val() == "") &&
				(jQuery("input[name=company_weburl]").val() == "") &&
				(jQuery("input[name=registered_address]").val() == "") &&
				(jQuery("input[name=city]").val() == "") &&
				(jQuery("input[name=country]").val() == "") &&
				(jQuery("input[name=crunchbase_profile]").val() == "") &&
				(jQuery("select[name=primary_industry]").val() === null)) {
				jQuery('#step-2 .form-group').addClass('has-error');
				setScroll();
				setTimeout(function () {
					jQuery('#step-2 .form-group').removeClass('has-error');
				}, 5000);
				return false;
			}
			if (jQuery("input[name=company_name]").val() == "") {
				jQuery("input[name=company_name]").parent().addClass('has-error');
				setScroll();
				removeClass('input[name=company_name]');
				return false;
			}
			var u = jQuery("input[name=company_weburl]").val();
			if (u == "" || (u && !validateURL(u))) {
				jQuery("input[name=company_weburl]").parent().addClass('has-error');
				setScroll();
				removeClass('input[name=company_weburl]');
				return false;
			}
			if (jQuery("input[name=registered_address]").val() == "") {
				jQuery("input[name=registered_address]").parent().addClass('has-error');
				setScroll();
				removeClass("input[name=registered_address]");
				return false;
			}
			if (jQuery("input[name=city]").val() == "") {
				jQuery("input[name=city]").parent().addClass('has-error');
				setScroll();
				removeClass("input[name=city]");
				return false;
			}
			if (jQuery("input[name=country]").val() == "") {
				jQuery("input[name=country]").parent().addClass('has-error');
				setScroll();
				removeClass("input[name=country]");
				return false;
			}
			if (jQuery("input[name=crunchbase_profile]").val() == "") {
				jQuery("input[name=crunchbase_profile]").parent().addClass('has-error');
				setScroll();
				removeClass("input[name=crunchbase_profile]");
				return false;
			}
			if (jQuery("select[name=primary_industry]").val() === null) {
				jQuery("select[name=primary_industry]").parent().addClass('has-error');
				setScroll();
				removeClass("select[name=primary_industry]");
				return false;
			}
		}
		if (step == "step-4") {
			if ((jQuery("input[name=date_founded]").val() == "") && (jQuery("select[name=current_funding_round]").val() === null) && (jQuery("input[name=funding_raised]").val() == "")
				&& (jQuery("input[name=no_of_employees]").val() == "") && (jQuery("select[name=association_with]").val() === null) && (jQuery("input[name=named_association]").val() == "")
				&& (jQuery("input[name=partner_code]").val() == "")) {
				jQuery('#step-3 .form-group').addClass('has-error');
				setScroll();
				setTimeout(function () {
					jQuery('#step-3 .form-group').removeClass('has-error');
				}, 5000);
				return false;
			}
			else {
				if (jQuery("input[name=date_founded]").val() == "") {
					jQuery("input[name=date_founded]").parent().addClass('has-error');
					setScroll();
					removeClass("input[name=date_founded]");
					return false;
				} else {
					if (jQuery("select[name=current_funding_round]").val() === null) {
						jQuery("select[name=current_funding_round]").parent().addClass('has-error');
						setScroll();
						removeClass("select[name=current_funding_round]");
						return false;
					} else {
						if (jQuery("input[name=funding_raised]").val() == "") {
							jQuery("input[name=funding_raised]").parent().addClass('has-error');
							setScroll();
							removeClass("input[name=funding_raised]")
							return false;
						}
						else {
							if (jQuery("input[name=no_of_employees]").val() == "") {
								jQuery("input[name=no_of_employees]").parent().addClass('has-error');
								setScroll();
								removeClass("input[name=no_of_employees]");
								return false;
							}
							else {
								if (jQuery("select[name=association_with]").val() === null) {
									jQuery("select[name=association_with]").parent().addClass('has-error');
									setScroll();
									removeClass("select[name=association_with]");
									return false;
								}
								else {
									if (jQuery("input[name=named_association]").val() == "") {
										jQuery("input[name=named_association]").parent().addClass('has-error');
										setScroll();
										removeClass("input[name=named_association]");
										return false;
									}
									else {
										if (jQuery("input[name=partner_code]").val() == "") {
												jQuery("input[name=partner_code]").parent().addClass('has-error');
												setScroll();
												removeClass("input[name=partner_code]");
												return false;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		jQuery('.setup-content-panel').hide();
		jQuery('#' + step).show();
	}
	function getValue() {
		var a = document.getElementById("username").value;
		return a;
	}
	function reset() {
		document.getElementById("not-verified").style.display = "block";
		goto('step-0');
	}
	/* ============ ajax form private domain email start ============== */
	jQuery(document).on('submit', '#formverify', function (e) {
		e.preventDefault();
		var data={};
		data['action'] = 'validateEmailStartup';
		data['username'] = document.getElementById("userIn").value;
		if(document.getElementById("userIn").value == ""){
			alert("please enter private email domain");
			return;
		}
		console.log('here', 'hello', data)
		

		// https://r.sokt.io/c/nK2MvWsvoF54kyykxdFt/msg91-sales-verify-user
		document.getElementById("not-verified").style.visibility = "hidden";

		jQuery.ajax({
			type: "POST",
			url: my_ajax_object.ajax_url,
			dataType : 'json', 
			data : data,
			success: function(res){
				console.log(res);
				var response = JSON.parse(res.data.body);
				//if(res && res.data && res.data.panel && res.data.panel.status) { old condition
				if (response['success']) {
					console.log("Verified");
					document.getElementById("userVal").value = data['username'];
					goto("step-2");
				} else {
					document.getElementById("not-verified").style.visibility = "visible";
					document.getElementById("not-verified").style.display = "block";
					console.log("Not verified");
				}
			},
			error: function(err){
				console.log(err);
			}
		})
	});
	/* ============ ajax form private domain email end ============== */
	/* ============ ajax form submit start ============== */
	jQuery(document).ready(function () {
		jQuery(document).on('submit', '#formdata', function (e) {
			if ((jQuery("select[name=current_role]").val() === null) &&
				(jQuery("input[name=linkedin_profile]").val() == "") &&
				(jQuery("select[name=how_did_you_hear_about_us]").val() === null) &&
				(jQuery("textarea[name=what_does_your_startup_do]").val() == "") &&
				(jQuery("textarea[name=what_problem_ur_solving]").val() == "") &&
				(jQuery("select[name=how_will_u_use_msg91]").val() == null)) {
				jQuery('#step-4 .form-group').addClass('has-error');
				setTimeout(function () {
					jQuery('#step-4 .form-group').removeClass('has-error');
				}, 5000);
				return false;
			}
			else {
				if (jQuery("select[name=current_role]").val() === null) {
					jQuery("select[name=current_role]").parent().addClass('has-error');
					setTimeout(function () {
						jQuery("select[name=current_role]").parent().removeClass('has-error');
					}, 2500);
					return false;
				} else {
					if (jQuery("input[name=linkedin_profile]").val() == "") {
						jQuery("input[name=linkedin_profile]").parent().addClass('has-error');
						setTimeout(function () {
							jQuery("input[name=linkedin_profile]").parent().removeClass('has-error');
						}, 2500);
						return false;
					} else {
						console.log("yessssss")
						if (jQuery("select[name=how_did_you_hear_about_us]").val() === null) {
							jQuery("select[name=how_did_you_hear_about_us]").parent().addClass('has-error');
							setTimeout(function () {
								jQuery("select[name=how_did_you_hear_about_us]").parent().removeClass('has-error');
							}, 2500);
							return false;
						}
						else {
							if (jQuery("textarea[name=what_does_your_startup_do]").val() == "") {
								jQuery("textarea[name=what_does_your_startup_do]").parent().addClass('has-error');
								setTimeout(function () {
									jQuery("textarea[name=what_does_your_startup_do]").parent().removeClass('has-error');
								}, 2500);
								return false;
							}
							else {
								if (jQuery("textarea[name=what_problem_ur_solving]").val() == "") {
									jQuery("textarea[name=what_problem_ur_solving]").parent().addClass('has-error');
									setTimeout(function () {
										jQuery("textarea[name=what_problem_ur_solving]").parent().removeClass('has-error');
									}, 2500);
									return false;
								}
								else {
									if (jQuery("select[name=how_will_u_use_msg91]").val() == null) {
										jQuery("select[name=how_will_u_use_msg91]").parent().addClass('has-error');
										setTimeout(function () {
											jQuery("select[name=how_will_u_use_msg91]").parent().removeClass('has-error');
										}, 2500);
										return false;
									}
									else {
										e.preventDefault();
										console.log('validation');
										// send ajax
										jQuery.ajax({
											url: "https://sokt.io/app/Wu1ghEUuHjLcxeNZaBbn/5ui7ytAdNwUhCaaQgNZz", // url where to submit the request
											type: "POST", // type of action POST || GET
											dataType: "json", // data type
											data: jQuery("#formdata").serialize(), // post data || get data
											success: function (result) {
												jQuery("#formdata").trigger("reset");
												//jQuery('.uael-modal-close').trigger('click');
												jQuery('.setup-content-panel').hide();
												jQuery('#step-5').show();
												setTimeout(function () {
													jQuery('.uael-modal-close').trigger('click');
												}, 5000);
												console.log(result);
											},
											error: function (xhr, resp, text) {
												console.log(xhr, resp, text);
											}
										})
									}
								}
							}
						}
					}
				}
			}
		});
		// click on button submit
	});
	/* ============ ajax form submit end ================ */
	var domains = ["outlook", "msn", "yahoo", "gmail", "hotmail", "aol", "icloud"]; //update ur domains here
	function validateDomain(me) {
		var idx1 = me.value.indexOf("@");
		if (idx1 > -1) {
			var splitStr = me.value.split("@");
			var sub = splitStr[1].split(".");
			if (domains.indexOf(sub[0]) > -1) {
				me.value = "";
				alert("please enter private email domain");
			}
		}
	}
	var submit = document.getElementById('finalsubmit'),
		checkbox = document.getElementById('disableBtn'),
		disableSubmit = function (e) {
			submit.disabled = !this.checked
		};
	checkbox.addEventListener('change', disableSubmit);
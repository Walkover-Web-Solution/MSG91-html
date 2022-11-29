const _ARR = [5000, 20000, 50000, 100000, 300000, 500000, "5,00,000+"];
const _ARR_EMAIL = [50000, 200000, 500000, 1000000, "10,00,000+"];
const _ARR_VOICE = [2000, 10000, 50000, 200000, "2,00,000+"];
var ___ORIGIN_COUNTRY;
var __EMAIL_PRICING_DATA;
var jQuery;
const CUR_VAL = [1, 2, 3];
// 1 - INR
// 2 - USD
// 3 - GBP

function format(option) {
  if (!option.id) {
    return option.text;
  }
  var ob =
    '<span class="country-select"><span class="flag ' +
    jQuery(option.element).data("image") +
    '"></span></span><span>' +
    option.text +
    "</span>";
  return ob;
}

const smsPlanINR = {
  4: {
    rate: "0.25",
    total: "1250",
  },
  106: {
    rate: "0.25",
    total: "1250",
  },
};

const smsPlanUSD = {
  4: {
    rate: "0.0035",
    total: "18",
  },
  106: {
    rate: "0.0035",
    total: "18",
  },
};

const smsPlanGBP = {
  4: {
    rate: "0.0025",
    total: "13",
  },
  106: {
    rate: "0.0025",
    total: "13",
  },
};

function drawUi(postData, obj) {  
  if (obj.data) {
    if (obj.data[4]) {
      jQuery("#totalAmountTrans").text(obj.data['4'].total);
      jQuery("#amountPerSmsTrans").text(obj.data['4'].rate);
    }

    if (obj.data[106]) {
      jQuery("#totalAmountOTP").text(obj.data['106'].total);
      jQuery("#amountPerSmsOTP").text(obj.data['106'].rate);
    }
  }
}

function drawUiSendOtp(postData, obj) {  
  console.log('drawUiSendOtp', obj);
  if (obj.data) {
    jQuery("#sendOtp_amountPerSmsOTP").text(obj.data['106'].rate);
    jQuery("#sendOtp_totalAmountOTP").text(obj.data ['106'].total);
  }
}

// get price from apis
function getSmsPricing() {  
  var data = {};
  data['param'] = {};

  data['param']["wallet"] = 1;
  data['param']["server_action"] = 511;
  data['param']["request"] = "pricing_details";
  data['param']["country"] = jQuery("#sms_country").val();
  data['param']["noOfSMS"] = jQuery("#noOfSMS").val();
  data['param']["currency"] = jQuery("#currency").val();  
  data['param']["action"] = "fetchPricing";

  data["type"] = "POST";
  data["dataType"] = "text";
  data["apiUrl"] = "https://api.msg91.com/api/v5/web/getPricingDetails?currency="+data.param.currency+"&noOfSMS="+data.param.noOfSMS+"&wallet=1";

  if (data) {
    makeApiCall(data, "text");
  }
}

// get price from apis
function getSendOtpPricing() {
  var data = {};
  data['param'] = {};

  data['param']["wallet"] = 1;
  data['param']["server_action"] = 511;
  data['param']["request"] = "pricing_details";
  data['param']["country"] = jQuery("#sendotp_country").val();
  data['param']["noOfSMS"] = jQuery("#sendOtp_noOfSMS").val();
  data['param']["currency"] = jQuery("#sendOtp_currency").val();  
  data['param']["action"] = "fetchPricing";
  
  data["type"] = "POST";
  data["dataType"] = "text";
  data["apiUrl"] = "https://api.msg91.com/api/v5/web/getPricingDetails?currency="+data.param.currency+"&noOfSMS="+data.param.noOfSMS+"&wallet=1";
  
  if (data) {
    makeApiCall(data, "sendOtp_text");
  }
}

function makeApiCall(data, type) {
  var type_re = type;
  var t = new Date();
  if (type == "sendOtp_text") {
    type = "text";
  }  
    jQuery.ajax({
      type: data.type,
      url: data.apiUrl,
      dataType: data.dataType,      
      data: data.param,
      success: function (result) {
        var obj;
        if (typeof result == "string") {
          obj = result.replace(/[()]/g, "");
          obj = JSON.parse(obj);
        } else {
          obj = result.data;
        }
        
        if (type == "text") {
          if (type_re == "sendOtp_text") {
            drawUiSendOtp(data, obj);
          } else {
            drawUi(data, obj);
          }
        }
        if (type == "email") {
          //drawUiForEmail(data, obj);
          __EMAIL_PRICING_DATA = obj;          
          drawNewEmailPricingUI();
        }
        if (type == "voice") {
          drawUiForVoice(data, obj);
        }
        
        if (type == "whatsapp") {
          drawUiForWhatsApp(data, obj);
        }
      },
      error: function (err) {        
        drawUiSendOtp(data, undefined);
        drawUi(data, undefined);
        throw new Error(err);
      },
    });
  
    /* const emailPlans = emailPricingAPICall();
    emailPlans.then((data) => {
      __EMAIL_PRICING_DATA = data;
      drawNewEmailPricingUI();
    }); */
  
}

function getEmailPricing() {
  var data = {};
  data['param'] = {};

  data["type"] = "GET";
  data["dataType"] = "json";
  data["apiUrl"] = "https://subscription.msg91.com/api/plans?ms_id=1";
  
  data['param']["wallet"] = 1;
  data['param']["server_action"] = 511;
  data['param']["request"] = "pricing_details";  
  data['param']["country"] = "all";
  data['param']["noOfSMS"] = jQuery("#noOfEmail").val();
  data['param']["currency"] = jQuery("#currency_email").val();
  data['param']["originCountry"] = "India";  
  data['param']["action"] = "fetchPricing";
  if (data) {
		makeApiCall(data, 'email');
	}
}

function getWhatsAppPricing() {
  var data = {};
  data['param'] = {};
  
  data["type"] = "GET";
  data["dataType"] = "json";  
  data["apiUrl"] = "https://subscription.msg91.com/api/plans?ms_id=5";

  data['param']["wallet"] = 1;
  data['param']["request"] = "pricing_details";  
  data['param']["country"] = "all";
  data['param']["noOfSMS"] = jQuery("#noOfEmail").val();  
  data['param']["originCountry"] = "India";  
  data['param']["action"] = "fetchPricing";
  if (data) {
		makeApiCall(data, 'whatsapp');
	}
}

/* async function emailPricingAPICall() {
  const results = await fetch(
    "https://subscription.msg91.com/api/plans?ms_id=1"
  );
  const res = await results.json();
  return res.data;
} */

/* jQuery(".maindropdwnprice").on("change", function () {
  let selectedCurrency = jQuery("#currency_email").val();
  drawNewEmailPricingUI();
}); */

function drawNewEmailPricingUI() {
  let selectedCurrency = jQuery("#currency_email").val();
  if (selectedCurrency == "INR" || selectedCurrency == "IND") {
    selectedCurrency = 1;
  }
  if (selectedCurrency == "USD") {
    selectedCurrency = 2;
  }
  if (selectedCurrency == "GBP") {
    selectedCurrency = 3;
  }

  //let selectedMode = jQuery("#duration").val(); 
  let selectedMode = 'Monthly'; 
  jQuery(".firstBox").remove();
  jQuery(".pricingboxsecond").remove();
  console.log('__EMAIL_PRICING_DATA', __EMAIL_PRICING_DATA);
  if (__EMAIL_PRICING_DATA && __EMAIL_PRICING_DATA.length > 0) {
    let html = "";
    var j = 1;
    var cls = "pricingboxfirst firstBox";
    __EMAIL_PRICING_DATA.forEach((item) => {
      if (item.is_active) {
        if (j == 2) {
          cls = "pricingboxsecond";
        }
        html += '<div class="pricing-sms-wrap col-md-4 ' + cls + '">';
        html +=
          '<div class="mainblueemail"><h3 class="bluetopcircle">' +
          item.name +
          "</h3></div>";

        let obj = item.plan_amounts.find(
          (o) =>
            o.currency_id == selectedCurrency &&
            o.plan_type.name === selectedMode
        );
        console.log('drawNewEmailPricingUI', obj, selectedCurrency, selectedMode);
        if (obj) {
          let symbol;
          switch (obj.currency_id) {
            case 1:
              symbol = "₹";
              break;
            case 2:
              symbol = "$";
              break;
            default:
              symbol = "£";
              break;
          }
          let cstr = `${symbol}${obj.plan_amount}/`;
          if (obj.plan_type.name === "Monthly") {
            cstr += "Month";
          } else {
            cstr += "Year";
          }

          html +=
            '<h4 class="monthsystem"><span id="amountPerSmsEmail"></span> <span class="currencytext_email"></span> ' +
            cstr +
            "</h4>";
          item.plan_services.forEach((o) => {
            html +=
              '<p class="amountnewemail">' + o.service_credit.free_credits +" " +o.service_credit.service.name
              '</p>';
          });
          html += '<div class="mainaddon mt-5"><h5 class="addsonemail">Extra</h5>';
          item.plan_services.forEach((o) => {
            let __rtObj = o.service_credit.service_credit_rates.find(
              (o) => o.currency_id == selectedCurrency
            );
            if (__rtObj) {
              html +=
                '<h6 class="peremailprice">' +
                symbol +
                __rtObj.follow_up_rate +
                " per " +
                o.service_credit.service.name +
                "</h6>";
            }
          });
          html+='<a class="sms-free-bt getfreenewbuton" href="https://control.msg91.com/signup/" target="_blank">Get Started</a>'
          html += "</div>";
        }
        html += "</div>";
      }
      j++;
    });
    jQuery(html).insertBefore(".pricingboxthird");
    // jQuery("#loadingmessage").hide();
  }
}

function drawUiForWhatsApp(conf, plans){ 
  let selectedCurrency = jQuery("#currency_wtsapp").val();
  if(selectedCurrency === 'IND') selectedCurrency = 'INR';
  let symbol;
  switch (selectedCurrency) {
    case 'INR':
    case 'IND':
      symbol = "₹";
      break;
    case 'USD':
      symbol = "$";
      break;
    case 'GBP':
      symbol = "£";
      break;    
  }
  var html = '';  
  plans.forEach(function(plan, index) {    
    let amount = plan.plan_amounts.find((o) =>
      o.currency.short_name === selectedCurrency && o.plan_type.name === 'Monthly'
    );
    let freeSession = plan.plan_services[0].service_credit.free_credits;
    freeSession = freeSession/1000;    
    html+=`<div class="pricing-sms-wrap col-md-4 pricingboxfirst">
      <div class="mainblueemail">
        <h3 class="bluetopcircle">${plan.name}</h3>
      </div>
      <h4 class="monthsystem">        
        ${symbol}${amount.plan_amount}/${amount.plan_type.name}
      </h4>
      <p class="amountnewemail">${freeSession}K Sessions</p>`
    if(freeSession >= 10 ){
      html+=`<p class="margin_zero"> + </p>
        <a href="https://developers.facebook.com/docs/whatsapp/pricing"
          class="whatsapp_price"
          target="_blank">WhatsApp
          Price</a><br>`
    }  
    html+=`<a class="sms-free-bt getfreenewbuton"
        href="/contact-us/"
        target="_blank">Talk to
        Experts</a>
      <!--<div class="mainaddon">
        <h5 class="addsonemail">*Extra</h5>
        <h6 style="color: #5d6164;" class="peremailprice">₹0.10</h6>
      </div>-->
    </div>`;    
  });
  html += `<div
  class="pricing-sms-wrap col-md-4 pricingboxfirst">
  <div class="mainblueemail">
    <h3 class="bluetopcircle">Custom
    </h3>
  </div>
  <p
    class="amountnewemail whatsapp_bottom">
    Custom Sessions</p>
  <a class="sms-free-bt getfreenewbuton cutom_btn"
    href="/contact-us/">Talk to
    Experts</a>
</div>`
  jQuery("#whats-app-plans").html(html);
}
// jQuery(document).on("change","#emailQueryForm select",function() {
// 	drawNewEmailPricingUI();
// });

// jQuery(document).on("change","#emailQueryForm input",function() {
// 	drawNewEmailPricingUI();
// });

/* function getEmailPricingNew() {
  var data = {};
  data["apiUrl"] = "https://subscription.msg91.com/api/plans?ms_id=1";
  data["action"] = "fetchEmailPricing";
  setTimeout(function () {
    makeApiCall(data, "EMAIL_NEW");
  }, 1500);
} */

function drawUiForEmail(data, obj) {
  if (obj) {
    if (obj[109]) {
      jQuery("#amountPerSmsEmail").text(obj[109].rate);
      jQuery("#totalAmountEmail").text(obj[109].total);
    }
  }
}

function getVoicePricing() {
  var data = {};
  data['param'] = {};
  
  data["dataType"] = "json";
  data["apiUrl"] = "https://control.msg91.com/action_layer.php";
  
  dadata['param']["wallet"] = 1;
  data['param']["server_action"] = 511;
  data['param']["request"] = "pricing_details";
  data['param']["country"] = jQuery("#country_voice").val();
  data['param']["noOfSMS"] = jQuery("#noOfVoice").val();
  data['param']["currency"] = jQuery("#currency_voice").val();  
  data['param']["originCountry"] = "India";
  data['param']["action"] = "fetchPricing";
  if (data) {
    //makeApiCall(data, "voice");
  }
}

function drawUiForVoice(data, obj) {
  if (obj) {
    if (obj[110]) {
      jQuery("#amountPerVoice").text(obj[110].rate);
      jQuery("#totalAmountVoice").text(obj[110].total);
    }
  }
}

jQuery(document).ready(function ($) {
  var timer;
  var carr;
  carr = [];

  // init select2
  $(".country3").select2({
    placeholder: "Select Country",
    width: "100%",
    allowClear: false,
    templateResult: format,
    templateSelection: function (option) {
      if (option.id.length > 0) {
        return (
          '<span class="country-select"><span class="flag ' +
          jQuery(option.element).data("image") +
          '"></span></span><span>' +
          option.text +
          "</span>"
        );
      } else {
        return option.text;
      }
    },
    escapeMarkup: function (m) {
      return m;
    },
  });

  // handle select2 change
  jQuery("#sms_country").on("change", function () {
    // adding dynamic condition on 23rd dec 2020 to change currency as country
    if (this.value === "India") {
      $("#currency").val("INR").change();
      $(".currencytext").html("INR");
      $("#promo").css({ display: "block" });
    } else {
      $("#currency").val("USD").change();
      $(".currencytext").html("USD");
      $("#promo").css({ display: "none" });
    }
    setTimeout(function () {
      getSmsPricing(1);
    }, 500);
  });

  fetch('https://api.db-ip.com/v2/free/self')
  .then(response => response.json())
  .then(response => {
      // handle the response
      var countryCode = response.countryCode;
      switch (countryCode) {
        case 'UK':
        case 'GB':
          $("#sms_country").val("United Kingdom").change();
          $("#sendotp_country").val("United Kingdom").change();
          $("#currency_email, #currency_wtsapp").val('USD').change();
          $(".currencytext_email, .currencytext_wtsapp").html('USD');                    
          break;          
        default:
          $("#sms_country").val("India").change();
          $("#sendotp_country").val("India").change();
          $("#currency_email, #currency_wtsapp").val('INR').change();
          $(".currencytext_email, .currencytext_wtsapp").html('INR');          
      }
      getEmailPricing();
      getWhatsAppPricing();
  })
  .catch(error => {
      // handle the error
      console.log('error', error);
  });

  // handle select2 change
  jQuery("#sendotp_country").on("change", function () {
    console.log('this.value',this.value);
    // adding dynamic condition on 23rd dec 2020 to change currency as country
    if (this.value === "India") {
      $("#sendOtp_currency").val("INR").change();
      $(".sendOtp_currencytext").html("INR");
      $("#promo").css({ display: "block" });
    } else {
      $("#sendOtp_currency").val("USD").change();
      $(".sendOtp_currencytext").html("USD");
      $("#promo").css({ display: "none" });
    }
    setTimeout(function () {
      getSendOtpPricing();
    }, 500);
  });

  // on change of no of sms
  // $('#pricingSlab').slider({
  // 	min  : 0,
  // 	max  : 10,
  // 	value: [3, 6],
  // 	labelledby: ['ex18-label-2a', 'ex18-label-2b']
  // });

  jQuery("#pricingSlab").change(function () {
    let val = jQuery(this).val();
    jQuery("#noOfSMS").val(_ARR[val - 1]);
    // show hide div and prevent api call
    if (jQuery("#noOfSMS").val() == "5,00,000+") {
      jQuery(".number-sms-box .price-contact-box").css("display", "block");
      jQuery(".number-sms-box .pricing-box-wrapper").css("display", "none");
    } else {
      jQuery(".number-sms-box .pricing-box-wrapper").css("display", "flex");
      jQuery(".number-sms-box .price-contact-box").css("display", "none");
      setTimeout(function () {
        getSmsPricing(2);
      }, 100);
    }
  });

  jQuery("#sendOtp_pricingSlab").change(function () {    
    let val = jQuery(this).val();
    jQuery("#sendOtp_noOfSMS").val(_ARR[val - 1]);
    // show hide div and prevent api call
    if (jQuery("#sendOtp_noOfSMS").val() == "5,00,000+") {
      jQuery(".number-sms-box .price-contact-box").css("display", "block");
      jQuery(".number-sms-box .pricing-box-wrapper").css("display", "none");
    } else {
      jQuery(".number-sms-box .pricing-box-wrapper").css("display", "flex");
      jQuery(".number-sms-box .price-contact-box").css("display", "none");
      setTimeout(function () {
        getSendOtpPricing();
      }, 100);
    }
  });

  jQuery("#pricingSlabEmail").change(function () {
    let val = jQuery(this).val();
    jQuery("#noOfEmail").val(_ARR_EMAIL[val - 1]);
    // show hide div and prevent api call
    if (jQuery("#noOfEmail").val() == "10,00,000+") {
      jQuery(".number-mails-box .price-contact-box").css("display", "block");
      jQuery(".number-mails-box .pricing-box-wrapper").css("display", "none");
    } else {
      jQuery(".number-mails-box .pricing-box-wrapper").css("display", "flex");
      jQuery(".number-mails-box .price-contact-box").css("display", "none");
      setTimeout(function () {
        getSmsPricing(3);
      }, 100);
    }
  });

  jQuery("#pricingSlabVoice").change(function () {
    let val = jQuery(this).val();
    jQuery("#noOfVoice").val(_ARR_VOICE[val - 1]);
    // show hide div and prevent api call
    if (jQuery("#noOfVoice").val() == "2,00,000+") {
      jQuery(".outbound-voice-box .price-contact-box").css("display", "block");
      jQuery(".outbound-voice-box .pricing-box-wrapper").css("display", "none");
    } else {
      jQuery(".outbound-voice-box .pricing-box-wrapper").css("display", "flex");
      jQuery(".outbound-voice-box .price-contact-box").css("display", "none");
      setTimeout(function () {
        getSmsPricing(4);
      }, 100);
    }
  });
  // on dropmenu
  $(document).on("click", ".dropdown", function () {
    $(this).toggleClass("open");
  });

  // handle route type change
  $(document).on("click", ".types li", function () {
    $("#type").val($(this).attr("value")).change();
    $(".typetext").html($(this).html());
    setTimeout(function () {
      getSmsPricing(5);
    }, 100);
  });

  // handle currency change
  $(document).on("click", ".currency_sms_drop li", function () {
    var v = $(this).attr("data-currency");
    $("#currency").val(v).change();
    setTimeout(function () {
      getSmsPricing(6);
      $(".currencytext").html(v);
    }, 100);
  });

  //  get transactional email rates
  $(document).on("click", ".currency_email_drop li", function () {
    var v = $(this).attr("data-currency");
    $("#currency_email").val(v).change();
    setTimeout(function () {
      getEmailPricing();
      $(".currencytext_email").html(v);
    }, 100);
  });

  $(document).on("click", ".currency_wtsapp_drop li", function () {
    var v = $(this).attr("data-currency");
    $("#currency_wtsapp").val(v).change();
    setTimeout(function () {
      getWhatsAppPricing();
      $(".currencytext_wtsapp").html(v);
    }, 100);
  });

  /* jQuery("#pricingSlabEmail").change(function () {
    let val = jQuery(this).val();
    jQuery("#noOfEmail").val(_ARR_EMAIL[val - 1]);
    setTimeout(function () {
      getEmailPricing();
    }, 100);
  }); */

  // get voice rates
  // country_voice, noOfVoice, currency_voice, currency_voice_drop, amountPerVoice,
  jQuery("#pricingSlabVoice").change(function () {
    let val = jQuery(this).val();
    jQuery("#noOfVoice").val(_ARR_VOICE[val - 1]);
    setTimeout(function () {
      getVoicePricing();
    }, 100);
  });

  $(document).on("click", ".currency_voice_drop li", function () {
    var v = $(this).attr("data-currency");
    $("#currency_voice").val(v).change();
    setTimeout(function () {
      getVoicePricing();
      $(".currencytext_voice").html(v);
    }, 100);
  });

  jQuery("#country_voice").on("change", function () {
    // $('#currencytext_voice').val('INR').change();
    setTimeout(function () {
      getVoicePricing();
    }, 100);
  });

  // init apis
  //getSmsPricing();
  //getEmailPricingNew();
  //getSendOtpPricing();

  /* setTimeout(function () {
    getEmailPricing();
  }, 500);

  setTimeout(function () {
    getVoicePricing();
  }, 1000); */

  // handle select2 change
  jQuery("#sendOtp_currencys").on("change", function () {
    // adding dynamic condition on 23rd dec 2020 to change currency as country
    if (this.value === "India") {
      $("#sendOtp_currency").val("INR").change();
      $(".sendOtp_currencytext").html("INR");
      $("#promo").css({ display: "block" });
    } else {
      $("#sendOtp_currency").val("USD").change();
      $(".sendOtp_currencytext").html("USD");
      $("#promo").css({ display: "none" });
    }
    setTimeout(function () {
      getSmsPricing(7);
    }, 500);
  });

  // handle currency change
  $(document).on("click", ".sendOtp_currencys li", function () {
    var v = $(this).attr("data-currency");
    $("#sendOtp_currency").val(v).change();
    setTimeout(function () {
      getSendOtpPricing();
      $(".sendOtp_currencytext").html(v);
    }, 100);
  });

  // on change of qty of sms
  $(document).on("keyup", "#sendOtp_noOfSMS", function () {
    setTimeout(function () {
      getSendOtpPricing();
    }, 500);
  });

  //on pricing->email tab change
  /* jQuery(document).on("click", ".commonbuttonprice", function (e) {
    console.log('clicked on commonbuttonprice');
    jQuery(".commonbuttonprice").removeClass("darkbackcolor");
    jQuery(".commonbuttonprice").removeClass("greybackcolor");
    jQuery(e.target).addClass("darkbackcolor");
    jQuery("#duration").val(jQuery(this).attr("rel"));
    getEmailPricingNew();
    // emailPricingAPICall();
  }); */
});
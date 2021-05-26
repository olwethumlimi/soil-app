var pass = 0;


$(".phone_input").on("keyup keydown change keypress", () => {
    var inp = $(".phone_input").val().trim();
    if (inp.length == 0) {
        $(".error").html("phone number is required")
        $(".next-disable").show();
        $(".next-button").hide();
        pass = 0;
    }
    else if (isNaN(inp)) {
        $(".error").html("only  numbers reqiured")
        $(".next-disable").show();
        $(".next-button").hide();
        pass = 0;
    }
    else if (inp.length != 10) {
        $(".error").html("phone number length is 10")
        $(".next-disable").show();
        $(".next-button").hide();
        pass = 0;
    }
    else if (inp.length == 10) {
        $(".error").html("")
        $(".next-disable").hide();
        $(".next-button").show();
        pass = 1;
    }

})

var store = { "phone": "" }
$("#login-button-submit").click(() => {
    var phone = $(".phone_input").val().trim().substring(1);
    store["phone"] = phone;

    var url = "https://emmanuelscott.pythonanywhere.com/access/" + phone;
    $.get(url, (data) => {
        $(".loader").show();
        $(".next-disable").show();
        $(".next-button").hide();

        if (isNaN(data)) {
            $(".error").html("technical error")
            $(".next-disable").hide();
            $(".next-button").show();
            $(".loader").hide();
            return false;
        }
        // *************************************
        // delete old otp
        db.collection("OTP")
            .where('phone', '==', phone)
            .get().then(snapshot => {

                snapshot.docs.forEach(doc => {
                    id = doc.id
                    // delete
                    db.collection("OTP").doc(id).delete()
                });
            })




        //   *******************************

        setTimeout(() => {
            // register the otp
            db.collection("OTP").add({ otp: data, phone: phone })
            // buttons
            $(".next-disable").show();
            $(".next-button").hide();
            $(".loader").hide();

            $("#login-page").hide()
            $("#verify-page").show()
            // reset pass value for the otp now
        }, 5000);
        // pages

        pass = 0

    })

})


$(".change").click(() => {
    $("#login-page").show()
    $("#verify-page").hide();
})


$(".verify-input").on("keyup keydown change keypress", () => {
    var inp = $(".verify-input").val().trim();
    if (inp.length == 0) {
        $(".verify_error").html("otp is required")
        $(".next-disable").show();
        $(".next-button").hide();
        pass = 0;
    }
    else if (isNaN(inp)) {
        $(".verify_error").html("only  numbers reqiured")
        $(".next-disable").show();
        $(".next-button").hide();
        pass = 0;
    }
    else if (inp.length != 4) {
        $(".verify_error").html("phone number length is 4")
        $(".next-disable").show();
        $(".next-button").hide();
        pass = 0;
    }
    else if (inp.length == 4) {
        $(".verify_error").html("")
        $(".next-disable").hide();
        $(".next-button").show();
        pass = 1;
    }

})

$("#verify-button-submit").click(() => {
    var otp = $(".verify-input").val().trim();
    $(".loader").show();
    $(".next-disable").show();
    $(".next-button").hide();


    db.collection("OTP")
        .where('phone', '==', store.phone).where("otp", "==", otp).limit(1)
        .get().then(snapshot => {
            var size = snapshot.docs.length
            if (size != 1) {
                $(".verify_error").html("invalid otp")
                pass = 100

            }
            else {
                $(".verify_error").html("")
                pass = 1
                snapshot.docs.forEach(doc => {
                    id = doc.id
                    // delete
                    db.collection("OTP").doc(id).delete()
                    Cookies.set('soil_phone_number', store.phone)

                });
            }
        })




    setTimeout(() => {
            db.collection("USERS")
                .where('phone', '==', store.phone).limit(1)
                .get().then(snapshot => {
                    var size = snapshot.docs.length
                    // new user
                    if (size != 1) {
                        db.collection("USERS").add({
                            "name": "",
                            "surname": "",
                            "phone": store.phone
                        })
                    }
                })
            $(".loader").hide();
            $(".next-disable").hide();
            $(".next-button").show();
            window.location.replace("main.html")

    }, 2000);


})


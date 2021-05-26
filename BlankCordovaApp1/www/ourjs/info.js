db.collection("USERS")
    .where('phone', '==', Cookies.get('soil_phone_number')).limit(1)
    .get().then(snapshot => {
        snapshot.forEach(docs => {
            var data = docs.data()
            console.log(data.name)
            $(".name").val(data.name)
            $(".surname").val(data.surname)
        });


    })


$(".update-submit").click(() => {
    console.log("dd")
    db.collection("USERS")
        .where('phone', '==', Cookies.get('soil_phone_number')).limit(1)
        .get().then(snapshot => {
      
            snapshot.forEach(doc => {
                var data = doc.data()
                id = doc.id
                var name = $(".name").val()
                var surname = $(".surname").val()
               console.log(id)

                db.collection("USERS")
                    .doc(id)
                    .update({
                        "surname": surname,
                        "name": name
                    })
            });


        })
})


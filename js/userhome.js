const showRestaurants = () => {
    loader.style.display = "block";
    let userResturantShow = document.getElementById('userResturantShow');
    let allRestaurant = '';
    let user;
    auth.onAuthStateChanged((user) => {
        user = user.uid;
        db.collection("prescriptions").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                if (doc.data().userid == user) {
                    allRestaurant += `<div class="col-lg-3 col-md-4 col-sm-6 pt-4 d-flex justify-content-center">
                                                <div class="card" style="width: 12rem; height: 30 !important; margin-right: 10px;">
                                                    <div class="card-body p-0 pt-3">
                                                        <div class="d-flex justify-content-between margin-remove" style="border: 1px solid black; padding: 10px; border-radius: 10px; background-color: thistle">
                                                            <p class="card-text" style="font-size: 16px;"><b>${doc.data().data}</b></p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                                                    <button class = "delete" onclick ="remover('${doc.id}')" style = "background-color: lightcoral; border-radius:25px; margin-right:5px"><i class="fa fa-remove"></i></button>
                                                    <button class = "delete" onclick="getResid('${doc.id}')" style = "background-color: green; border-radius:25px;"><i class="fa fa-arrow-right"></i></button>
                                            </div>`
                    userResturantShow.innerHTML = allRestaurant;
                    loader.style.display = "none";
                }

            });
        });

    })


}
const showshops = (id) => {
    console.log("showshopscalled with id ", id);
    loader.style.display = "block";
    let userResturantShow = document.getElementById('userResturantShow');
    let allRestaurant = '';
    let user;
    auth.onAuthStateChanged((user) => {
        user = user.uid;

        const collectionRef = db.collection('prescriptions');
        const documentRef = collectionRef.doc(id);
        documentRef.get().then((doc) => {
            if (doc.exists) {
                const myArray = doc.data().shopkeepers;
                console.log(myArray);
                myArray.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    const resturantref = db.collection('resturant');
                    const docref = resturantref.doc(doc);
                    docref.get().then((pot) => {

                        if (pot.exists) {
                            allRestaurant += `<div class="col-lg-3 col-md-4 col-sm-6 pt-4 d-flex justify-content-center">
                            <div class="card" style="width: 12rem; height: 30 !important; margin-right: 10px;">
                                <div class="card-body p-0 pt-3">
                                    <div class="d-flex justify-content-between margin-remove" style="border: 1px solid black; padding: 10px;border-bottom:none; border-radius: 10px; background-color: thistle; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                                        <p class="card-text" style="font-size: 16px;"><b>${pot.data().name}</b></p><br>
                                       
                                        
                                    </div>
                                    <div style = "border: 1px solid black; background-color: thistle; border-radius: 8px; border-top: none; border-top-left-radius: 0px; border-top-right-radius: 0px;"> <p class="card-text" style="font-size: 16px;"><b>Address: ${pot.data().address}</b></p> </div>
                                    
                                </div>
                                
                            </div>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                                
                        </div>`
                            userResturantShow.innerHTML = allRestaurant;
                            loader.style.display = "none";


                        }
                        else {
                        
                        }

                    })





                });
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    });




}

const remover = (id) => {
    db.collection('prescriptions').doc(id).delete().then(() => {
        showRestaurants();
    })

}

const getResid = (resid) => {
    console.log(resid);
    localStorage.setItem("resid", resid);
    showshops(resid);
}

const setPrescription = () => {
    console.log("click")
    const user = auth.currentUser;
    console.log(user.uid);
    let data = document.getElementById('data').value;
    let docRef = db.collection("users").doc(user.uid);
    docRef.get().then((doc) => {
        if (doc.exists) {
            const cityName = doc.data().city;
            console.log(cityName);
            if (data != "") {
                db.collection('prescriptions').add({
                    data: data,
                    userid: user.uid,
                    city: cityName,
                })
            }
        } else { console.log("No such document!"); }
    }).catch((error) => { console.log("Error getting document:", error); alert(error) });


    console.log(data);





}

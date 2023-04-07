

const showItem = () => {
    loader.style.display = "block"
    let prescription = document.getElementById('prescription');
    let html = '';



    auth.onAuthStateChanged((res) => {
        let docRef = db.collection("resturant").doc(res.uid);
        let rescity;
        docRef.get().then((doc) => {
            if (doc.exists) {
                const cityName = doc.data().city;
                rescity = cityName;
                console.log(cityName);
            } else { console.log("No such document!"); }
        }).catch((error) => { console.log("Error getting document:", error); alert(error) });

        db.collection("prescriptions").get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                prescription.innerHTML = `<h2 class="text-center">No Pending Requests</h2>`;
                loader.style.display = "none";
            }
            else {console.log("working");
                querySnapshot.forEach((pres) => {
                    if (pres.data().city == rescity) {
                        var docRef = db.collection('users').doc(pres.data().userid);

                        docRef.get().then((doc) => {
                            if (doc.exists) {
                        html += `<div class="col-lg-3 col-md-4 col-sm-6 pt-4 d-flex justify-content-center">
                    <div class="card" style="width: 17rem; height: 30 !important; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);">
                    
                        <div class="card-body">
                                <p class="" style="font-size: 25px;"><b>${pres.data().data}</b></p>
                            <div class="d-flex justify-content-between">
                                <p class="" style="font-size: 16px;">${pres.data().city}</p>
                                <p class="" style="font-size: 16px;"><i>${doc.data().name}</i></p>
                            </div>
                            <a href="#" style = "display: inline-block;
                            padding: 5px 10px;
                            background-color: thistle;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);"  onmouseover="this.style.color='black';" onmouseout="this.style.color='white';" onclick="accept('${pres.id}')">Accept</a>
                            
                            
                        </div>
                    </div>
                    </div>`

                        prescription.innerHTML = html;
                        loader.style.display = "none";
                                } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        }).catch((error) => {
                            console.log("Error getting document:", error);
                        });
                    }

                });
            }
        })
            .catch((error) => { console.log("Error getting documents: ", error); alert(error) });
    })
}

const navbar = () => {
    const shopNameNav = document.getElementById('shopNameNav');
    auth.onAuthStateChanged((res) => {
        let docRef = db.collection("resturant").doc(res.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                const shopname = doc.data().name; namehalf = shopname.substring(0, 14)
                shopNameNav.innerHTML = `${namehalf}....`;
            } else { console.log("No such document!"); }
        }).catch((error) => { console.log("Error getting document:", error); alert(error) });
    })
}

// const deleteItem = (id, imagename) => {
//     loader.style.display = "block";
//     // Delete item form firestore
//     db.collection("items").doc(`${id}`).delete().then(() => {
//         console.log("Document successfully deleted!");
//         loader.style.display = "none";
//     }).catch((error) => {
//         console.error("Error removing document: ", error);
//         alert(error);
//     });

//     // Delete image from storage
//     const desertRef = storage.ref('resturantItems').child(imagename);
//     desertRef.delete().then(() => {
//         console.log("succes delete");
//     }).catch((error) => { console.log(error); });
//     showItem();
// }
const accept = (id) => {
    auth.onAuthStateChanged((res) => {
        let docRef = db.collection("resturant").doc(res.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                const resid = doc.data().restaurantkey;
                var newref = db.collection("prescriptions").doc(id);
    console.log(resid);

    // Atomically add a new region to the "regions" array field.
    newref.update({
        shopkeepers: firebase.firestore.FieldValue.arrayUnion(resid)
    });
            } else { console.log("No such document!"); }
        }).catch((error) => { console.log("Error getting document:", error); alert(error) });
    })
    alert("Accepted!");
    console.log(id);
    

}


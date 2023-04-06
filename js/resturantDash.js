

// const auth = firebaseApp.auth();
// const db = firebaseApp.firestore();

// auth.onAuthStateChanged((user) => {
//     if (user) {
//         console.log(user);
//         // console.log(user.uid);
//     } else {
//         console.log("User Logged Out");
//     }
// });
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// const addItem = () => {
//     loader.style.display = "block"
//     // Storage
//     //const ref = storage.ref('resturantItems');
//     //let file = document.getElementById('resFoodImage').files[0];
//     //let date = new Date;
//     //let name = date.getTime() + '-' + file.name

//     //const metadata = { contentType: file.type }
//     //const task = ref.child(name).put(file, metadata);

//     task.then(snapshot => snapshot.ref.getDownloadURL())
//         .then(url => {
//             let prescriptionName = document.getElementById('prescriptionName').value; resPrice = document.getElementById('resPrice').value; resCatrgory = document.getElementById('resCatrgory').value;
//             let genID = date.getTime();
//             auth.onAuthStateChanged((res) => {
//                 db.collection("items").doc(`${genID}`).set({
//                     itemname: prescriptionName, itemprice: resPrice, itemcategory: resCatrgory, key: res.uid, imageurl: url, imagename: name,
//                 })
//                     .then(() => {
//                         console.log("Document successfully written!");
//                         showItem();
//                         loader.style.display = "none"
//                     })
//                     .catch((error) => {
//                         console.error("Error writing document: ", error);
//                         alert(error);
//                         loader.style.display = "none"
//                     });
//             })
//         })
//         .catch((err) => { alert(err); })
// }

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
                        html += `<div class="col-lg-3 col-md-4 col-sm-6 pt-4 d-flex justify-content-center">
                    <div class="card" style="width: 17rem; height: 30 !important;">
                        <div class="dropdown">
                                <i class="bi bi-three-dots-vertical dropbtn three-dot"></i>
                            <div class="dropdown-content">
                                <a href="#" onclick="editItem(${pres.data})">Edit</a>
                                <a href="#" onclick="deleteItem(${pres.data}, '${pres.data().data}')">Delete</a>
                            </div>
                        </div>
                    
                        <div class="card-body">
                                <p class="" style="font-size: 25px;"><b>${pres.data().data}</b></p>
                            <div class="d-flex justify-content-between">
                                <p class="" style="font-size: 16px;">Cityname: ${pres.data().city}</p>
                            </div>
                            <a href="#" onclick="accept('${pres.id}')">Accept</a>
                            
                            
                        </div>
                    </div>
                    </div>`

                        prescription.innerHTML = html;
                        loader.style.display = "none";
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
    alert("function");
    console.log(id);
    

}

// const editItem = (id) => {
//     console.log(id);
//     // var editItem = db.collection("orders").doc(`${id}`);

//     // // Set the "capital" field of the city 'DC'
//     // return washingtonRef.update({
//     //     capital: true
//     // })
//     //     .then(() => {
//     //         console.log("Document successfully updated!");
//     //     })
//     //     .catch((error) => {
//     //         // The document probably doesn't exist.
//     //         console.error("Error updating document: ", error);
//     //     });
// }

//? for show and hide input in onchange
// const freeOrpaid = () => {
//     let resDeliveryType = document.getElementById('resDeliveryType').value, delvcharginp = document.getElementById('delvcharginp'), delvcharlab = document.getElementById('delvcharlab');

//     if (resDeliveryType == "Paid") {
//         delvcharginp.style.display = "block"
//         delvcharlab.style.display = "block"
//     } else {
//         delvcharginp.style.display = "none"
//         delvcharlab.style.display = "none"
//     }
// }
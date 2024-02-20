const allSeatsBtn = document.getElementsByClassName("seat");
let count = 0;
let availableSeats = 40;

for (const seat of allSeatsBtn) {
  seat.addEventListener("click", function (e) {
    // selected seats disabled
    if (seat.classList.contains("disabled")) {
      return;
    }
    seat.classList.add("disabled");

    // counting the selected seat
    count = count + 1;

    availableSeats = availableSeats - 1;

    // alert for more than 4 seat selection
    if (count > 4) {
      alert("You can't select more than 4 seats ");
      return;
    }

    e.target.style.backgroundColor = "#1DD100";

    const seatName = e.target.innerText;

    const ul = document.getElementById("selected-seats-info");

    let li = document.createElement("li");
    let seatNameShow = document.createElement("p");
    seatNameShow = seatName;

    let seatClass = document.createElement("p");
    seatClass.innerText = "Economy";

    let seatPrice = document.createElement("p");
    seatPrice = 550;

    ul.append(li);
    li.append(seatNameShow);
    li.append(seatClass);
    li.append(seatPrice);

    const totalPriceText = document.getElementById("total-price").innerText;
    const totalPriceConvertToNum = parseInt(totalPriceText);

    let ticketPrice = parseInt(seatPrice);

    let totalPrice = totalPriceConvertToNum + ticketPrice;

    // coupon button open
    const couponBtn = document.getElementById("coupon-btn");
    const couponInput = document.getElementById("coupon-input");

    if (count === 4) {
      couponInput.removeAttribute("readonly");
      couponBtn.style.backgroundColor = "#1DD100";
    } else {
      couponInput.setAttribute("readonly", true);
      couponBtn.style.backgroundColor = "";
    }

    // discount option after applying coupon
    const grandTotal = document.getElementById("grand-total");

    if (count === 4) {
      couponBtn.addEventListener("click", function (e) {
        const coupon = document.getElementById("coupon-input").value;

        if (coupon !== "NEW15" && coupon !== "Couple 20") {
          alert("Coupon code did not match ");
        }

        // FOR 15% DISCOUNT
        if (coupon === "NEW15") {
          let discount = totalPrice * 0.15;
          let grandTotalUpdated = totalPrice - discount;
          showInnerText("grand-total", grandTotalUpdated);
          couponApply(discount);
        }

        // FOR 20% DISCOUNT
        else if (coupon === "Couple 20") {
          let discount = totalPrice * 0.2;
          let grandTotalUpdated = totalPrice - discount;

          showInnerText("grand-total", grandTotalUpdated);
          couponApply(discount);
        }

        // if(coupon !== "NEW15" || coupon === "Couple 20"){
        //   alert('Coupon code did not match ');
        // }
      });
    }

    //passenger section
    const nextBtn = document.querySelector("#next-btn");
    const passengerName = document.querySelector("#passenger-name").value;
    const passengerNumber = document.querySelector("#passenger-number").value;

    if (passengerName !== "" && passengerNumber !== "" && count >= 1) {
      nextBtn.removeAttribute("disabled");
    } else {
      nextBtn.setAttribute("disabled", true);
    }

    document
      .querySelector("#passenger-number")
      .addEventListener("keyup", function (e) {
        if (e.target.value !== "" && count >= 1) {
          document.querySelector("#next-btn").removeAttribute("disabled");
        }
      });

    //   modal

    nextBtn.addEventListener("click", function () {
      const modal = document.getElementById("my_modal_1");
      modal.showModal();
    });

    // call the show inner text set function
    showInnerText("count-buy-seats", count);
    showInnerText("available-seats", availableSeats);

    showInnerText("total-price", totalPrice);

    showInnerText("grand-total", totalPrice);
  });
}

  
  
  
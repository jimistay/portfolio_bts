//  --- CARD ---

const cards = document.querySelectorAll(".card__inner");

cards.forEach((card) => {
  card.addEventListener("click", function (e) {
    
    if(e.target.tagName.toLowerCase() !== "img"){
      card.classList.toggle("is-flipped");
    }

    if (card.classList.contains("is-flipped")) {
      gsap.set(card.querySelector("h3"), { clearProps: "all" });
      gsap.set(card.querySelector("p"), { clearProps: "all" });
      gsap.from(card.querySelector("h3"), 1, {
        y: 100,
        ease: "power4.out",
        delay: 0.02,
        skewY: 7,
        stagger: {
          amount: 0.3,
        },
      });
      gsap.from(card.querySelector("p"), 1.2, {
        y: 100,
        ease: "power4.out",
        delay: 0.02,
        skewY: 7,
        stagger: {
          amount: 0.3,
        },
      });
    }
  });
});


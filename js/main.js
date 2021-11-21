// we wait for the whole dom to be loaded
window.onload = async () => {
  const body = document.querySelector("body");
  // Element for toggle visible input on mobil
  const btnSearch = document.querySelector("[data-name='js_btn-search']");
  const inputSearch = document.querySelector("#search");
  const divResult = document.querySelector("#result");

  //   Element for toggle visible backdrop on mobil
  const backdrop = document.querySelector(".backdrop");
  const backdropContent = document.querySelector(".backdrop_content");
  const backdropClose = document.querySelector(".backdrop_content-header i");
  const backdropBody = document.querySelector(".backdrop_content-body");
  const backdropFooter = document.querySelector(".backdrop_content-footer");

  // Element for toggle visible menu on mobile
  const burgerMenu = document.querySelector(".burger");
  const navMenu = document.querySelector(".header_top-nav nav").cloneNode(true);
  const socialMenu = document.querySelector(".header_top-social").cloneNode(true);

  btnSearchtoggleClass = (event) => {
    if (window.innerWidth < 768) {
      inputSearch.classList.toggle("input-visible");
    }
  };
  btnSearchRemoveClass = (event) => {
    if (window.innerWidth < 768) {
      inputSearch.blur();
      inputSearch.removeAttribute("class");
      showMessageForInputSearch();
    }
  };
  openBurgerMenu = () => {
    backdrop.classList.add("flex");
    body.classList.add("body-blocked");
    setTimeout(() => {
      backdrop.classList.add("visible");
      backdropContent.classList.add("visible");
    }, 10);
    backdropBody.classList.add("backdrop_nav-menu");
    backdropBody.insertAdjacentElement("afterbegin", navMenu);
    backdropFooter.classList.add("backdrop_footer-social");
    backdropFooter.insertAdjacentElement("afterbegin", socialMenu);
  };
  closeBackdrop = () => {
    body.classList.remove("body-blocked");
    backdrop.classList.remove("visible");
    backdropContent.classList.remove("visible");
    setTimeout(() => {
      backdrop.classList.remove("flex");
      backdropBody.classList.remove("backdrop_nav-menu");
    }, 300);
  };

  showMessageForInputSearch = () => {
    if (inputSearch.value.length > 0 && inputSearch.classList.contains("input-visible")) {
      divResult.setAttribute("style", "opacity:1");
      divResult.innerHTML = `
      <p>
      Aucun résultat...
      </p>`;
    } else {
      divResult.innerHTML = ``;
      divResult.setAttribute("style", "opacity:0");
    }
  };
  inputSearch.addEventListener("keyup", showMessageForInputSearch);

  mobileFunctions = (event) => {
    if (window.innerWidth < 768) {
      // Toggle visible input on mobil

      inputSearch.addEventListener("blur", btnSearchRemoveClass);
      btnSearch.addEventListener("click", btnSearchtoggleClass);

      //   Toggle visible backdrop on mobil
      burgerMenu.addEventListener("click", openBurgerMenu);
      backdropClose.addEventListener("click", closeBackdrop);
      backdrop.addEventListener("click", closeBackdrop);
    } else {
      btnSearch.removeEventListener("click", btnSearchtoggleClass);
      inputSearch.removeEventListener("blur", btnSearchRemoveClass);
      burgerMenu.removeEventListener("click", openBurgerMenu);
      backdropClose.removeEventListener("click", closeBackdrop);
      backdrop.removeEventListener("click", closeBackdrop);
      btnSearchRemoveClass();
      closeBackdrop();
    }
  };

  // This is for the bug 100vh on mobil when we open the side menu
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  //______________SLIDER___________
  const slider = await tns({
    container: "#slider",
    items: 1,
    slideBy: "page",
    navPosition: "bottom",
    controlsContainer: "#custom-controls",
    gutter: 5,
    mouseDrag: true,
    responsive: {
      768: {
        nav: false,
      },
    },
  });
  // ________________________Reveal article if pay!!!___________

  // Define visible height
  const article = document.querySelector("#pay-for-read");
  const sectionPayBtn = document.querySelector(".article_btn-readme");
  const payBtn = document.querySelector(".article_btn-readme>button");
  let startHidding = 0;
  let endHidding = 0;
  let sectionPayBtnHeight = 0;

  defineVisibleArticleHeight = () => {
    sectionPayBtnHeight = sectionPayBtn.clientHeight;
    startHidding = document.querySelector("#start-hidding").offsetTop + sectionPayBtnHeight;
    endHidding = document.querySelector("#end-hidding").offsetTop;

    article.setAttribute("style", `height:${startHidding}px`);
  };

  defineVisibleArticleHeight();
  payBtn.addEventListener("click", () => {
    // transition: 1s;
    article.setAttribute("style", `height:${endHidding}px`);
    setTimeout(() => {
      article.setAttribute("style", `height:auto`);
      sectionPayBtn.setAttribute("style", "opacity:0");
      payBtn.setAttribute("style", "opacity:0");
    }, 1000);
    setTimeout(() => {
      sectionPayBtn.setAttribute("style", "display:none");
    }, 2000);
  });

  if (window.innerWidth < 768) {
    mobileFunctions();
  }
  window.addEventListener("resize", () => {
    mobileFunctions();
    defineVisibleArticleHeight();
  });
};

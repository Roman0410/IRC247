// Fancybox.bind("[data-fancybox]", {
//   Thumbs: false,
// });

$(".burger-menu").click(function () {
  $(this).toggleClass("active");
  $(".header-nav").toggleClass("active");
  $("body").toggleClass("lock");
});
if ($(window).width() < 1024) {
  $(".nav-item").click(function () {
    $(this).find(".sub-menu").slideToggle();
    $(this).find("svg").toggleClass("rotate");
  });
}

//-----------------------SLIDERS-----------------------//
$(".hero-slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  fade: true,
  cssEase: "ease-in-out",
  pauseOnHover: false,
});

$(".partner-slider").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
});
$(".other-blog-slider").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: $(".other-blog").find(".prev"),
  nextArrow: $(".other-blog").find(".next"),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
$(".eduSol-img-slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: $(".eduSol").find(".prev"),
  nextArrow: $(".eduSol").find(".next"),
});
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".partner-vert-slider", {
    direction: "vertical", // За замовчуванням вертикальний
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      1024: {
        direction: "vertical", // Вертикальний слайдер для екранів ширше 1024px
        slidesPerView: 3,
      },
      768: {
        direction: "horizontal", // Горизонтальний для екранів від 768px до 1024px
        slidesPerView: 3, // 3 слайди
        spaceBetween: 20,
      },
      0: {
        direction: "horizontal", // Горизонтальний для екранів до 768px
        slidesPerView: 2, // 2 слайди
        spaceBetween: 20,
      },
    },
  });
});

$(document).ready(function () {
  const filters = $(".filter-item");
  const content = $(".content");

  filters.on("click", function () {
    const target = $(this).data("filter");

    filters.removeClass("active");
    $(this).addClass("active");

    content.each(function () {
      const content = $(this);
      if (content.data("content") === target) {
        content.addClass("active");
      } else {
        content.removeClass("active");
      }
    });
  });
});

//-----------_CONFIG_-------------//

$(".options-head").click(function (e) {
  if ($(e.target).closest(".quantity").length === 0) {
    const $this = $(this);
    const $optionInfo = $this.closest(".config-option").find(".option-info");
    if ($this.hasClass("open")) {
      $this.removeClass("open");
      $optionInfo.slideUp();
    } else {
      $(".options-head").removeClass("open");
      $(".option-info").slideUp();
      $this.addClass("open");
      $optionInfo.slideDown();
    }
  }
});
$(document).ready(function () {
  let isFlipped = false;

  $(".flipBtn").on("click", function () {
    isFlipped = !isFlipped;
    $(".images .flip").css("transform", isFlipped ? "rotateY(180deg)" : "rotateY(0deg)");
  });

  $(".quantity-btn").on("click", function () {
    let $button = $(this);
    let $input = $button.siblings(".quantity-input");
    let currentValue = parseInt($input.val());
    let min = parseInt($input.attr("min"));
    let max = parseInt($input.attr("max"));

    let newValue = $button.hasClass("increase") ? currentValue + 1 : Math.max(currentValue - 1, min);

    if (newValue >= min && newValue <= max) {
      $input.val(newValue);
    }

    let $option = $button.closest(".config-option");
    let optionType = $option.data("overlay");

    $(`.frontside .overlay[data-image="${optionType}-front"]`).each(function (index) {
      if (index < newValue) {
        $(this).removeClass("hidden");
      } else {
        $(this).addClass("hidden");
      }
    });

    if (newValue > 0) {
      $(`.backside .overlay[data-image="${optionType}-back"]`).removeClass("hidden");
    } else {
      $(`.backside .overlay[data-image="${optionType}-back"]`).addClass("hidden");
    }
  });
});

$(document).ready(function () {
  function updateHiddenInputs(optionTitle, quantity) {
    const $hiddenInput = $(`input[name='options[${optionTitle}]']`);
    if ($hiddenInput.length === 0) {
      $(".reviewConfig form").append(`<input type="hidden" name="options[${optionTitle}]" value="${quantity}" />`);
    } else {
      $hiddenInput.val(quantity);
    }
  }

  function clearOptions() {
    $(".config-option").each(function () {
      const $input = $(this).find(".quantity-input");
      const min = parseInt($input.attr("min"));
      $input.val(min);
    });

    $(".choosen-options").empty();
    $(".reviewConfig form input[type='hidden']").remove();
    $(".reviewConfig").addClass("hidden");
  }

  $("#addToInquiry").on("click", function () {
    let chosenOptions = [];

    $(".config-option").each(function () {
      const optionTitle = $(this).find(".option-title").text().trim();
      const quantity = $(this).find(".quantity-input").val();
      const overlayType = $(this).data("overlay");

      if (quantity > 0) {
        const baseOptionText = overlayType === "base-option" ? '<span class="base-option-text">Base Option</span>' : "";

        chosenOptions.push(`
          <div class="cart-option-item" data-overlay="${overlayType}">
            <span class="cart-option-name">${optionTitle} ${baseOptionText}</span>
            <div class='left'>
              <span class="cart-option-quantity"> 
                <button class="cart-quantity-btn cart-decrease" type="button">-</button>
                <input type="text" class="cart-quantity-input" value="${quantity}" min="0" readonly />
                <button class="cart-quantity-btn cart-increase" type="button">+</button>
              </span>
              <div class="cart-remove-btn">×</div> <!-- Кнопка хрестика -->
            </div>
          </div>
        `);

        updateHiddenInputs(optionTitle, quantity);
      }
    });

    $(".choosen-options").html(chosenOptions.join(""));
    $(".reviewConfig").removeClass("hidden");
  });

  $(document).on("click", ".cart-quantity-btn", function () {
    const $button = $(this);
    const $input = $button.siblings(".cart-quantity-input");
    const currentValue = parseInt($input.val());
    const min = parseInt($input.attr("min"));
    const newValue = $button.hasClass("cart-increase") ? currentValue + 1 : Math.max(currentValue - 1, min);

    if (newValue >= min) {
      $input.val(newValue);

      const optionName = $button.closest(".cart-option-item").find(".cart-option-name").text().trim();
      updateHiddenInputs(optionName, newValue);
    }
  });

  $(document).on("click", ".cart-remove-btn", function () {
    const $item = $(this).closest(".cart-option-item");
    const overlayType = $item.data("overlay");

    if (overlayType === "base-option") {
      clearOptions();
    } else {
      const optionName = $item.find(".cart-option-name").text().trim();
      $item.remove();
      $(`input[name='options[${optionName}]']`).remove();
    }
  });

  $("#clear-options").on("click", clearOptions);
});

$(document).ready(function () {
  function switchStep(currentStep, nextStep) {
    $(currentStep).removeClass("current");
    $(nextStep).addClass("current");
    updateTitle(nextStep);
  }

  function updateProgress(stepNumber) {
    $(".step" + stepNumber)
      .addClass("current")
      .prevAll()
      .addClass("current");
    $(".process").css("width", (stepNumber - 1) * 33 + "%");
  }

  function revertProgress(stepNumber) {
    $(".step" + stepNumber)
      .removeClass("current")
      .nextAll()
      .removeClass("current");
    $(".process").css("width", (stepNumber - 2) * 33 + "%");
  }

  function updateTitle(nextStep) {
    let titleText = "";
    if ($(nextStep).hasClass("step-1")) {
      titleText = "Review Configuration";
    } else if ($(nextStep).hasClass("step-2")) {
      titleText = "Enter your data";
    } else if ($(nextStep).hasClass("step-3")) {
      titleText = "Additional details";
    } else if ($(nextStep).hasClass("step-4")) {
      titleText = "Success";
    }
    $(".title").text(titleText);
  }

  function validateStep2() {
    let isValid = true;

    $(".step-2 .input-wrapper input").each(function () {
      const $input = $(this);
      const name = $input.attr("name");
      const value = $input.val().trim();
      const $error = $("#" + name + "-error");

      if (value === "" && (name === "fname" || name === "lname" || name === "email" || name === "city" || name === "ZIP" || name === "address")) {
        $error.show();
        isValid = false;
      } else {
        $error.hide();
      }
    });

    $(".step-2 .custom-select select").each(function () {
      const $select = $(this);
      const name = $select.attr("name");
      const value = $select.val();
      const $error = $("#" + name + "-error");

      if (value === "" && (name === "country" || name === "state")) {
        $error.show();
        isValid = false;
      } else {
        $error.hide();
      }
    });

    return isValid;
  }

  $(".stepNext").on("click", function () {
    const $currentStep = $(".step.current");
    const currentStepNumber = parseInt($currentStep.attr("class").match(/step-(\d+)/)[1]);
    const nextStepNumber = currentStepNumber + 1;

    if (nextStepNumber <= 4) {
      if (currentStepNumber === 1 || (currentStepNumber === 2 && validateStep2())) {
        switchStep($currentStep, ".step-" + nextStepNumber);
        updateProgress(nextStepNumber);
      }
    }
  });

  // Обробка натискання кнопки "Back"
  $(".stepBack").on("click", function () {
    const $currentStep = $(".step.current");
    const currentStepNumber = parseInt($currentStep.attr("class").match(/step-(\d+)/)[1]);
    const prevStepNumber = currentStepNumber - 1;

    if (prevStepNumber >= 1) {
      switchStep($currentStep, ".step-" + prevStepNumber);
      revertProgress(currentStepNumber);
    }
  });

  // Обробка натискання кнопки "Back to configurator"
  $("#backToConfig").on("click", function () {
    switchStep(".step.current", ".step-1");
    updateProgress(1);
  });

  // Обробка натискання кнопки "Clear all"
  $("#clear-options").on("click", function () {
    $(".config-option").each(function () {
      const $input = $(this).find(".quantity-input");
      const min = parseInt($input.attr("min"));
      $input.val(min);
    });

    $(".choosen-options").empty();
    $(".reviewConfig form input[type='hidden']").remove();
    $(".reviewConfig").addClass("hidden");
  });

  // Обробка відправлення форми на кроці 3
  $("form").on("submit", function (event) {
    event.preventDefault();

    switchStep(".step.current", ".step-4");
    updateProgress(4);

    //  AJAX
  });
});

$("#backToConfig").click(function () {
  $(".reviewConfig").addClass("hidden");
});

//-------------------------------//
$(document).ready(function () {
  var $phoneInput = $("#tel, .tel");
  var $myForm = $("#myForm");

  $phoneInput.on("input", function (e) {
    var x = e.target.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  });
});

const validation = new JustValidate("#main-form");
validation
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Name is required",
    },
    {
      rule: "minLength",
      value: 2,
    },
  ])
  .addField(".phoneInput", [
    {
      rule: "required",
      errorMessage: "Phone number is required",
    },
    {
      rule: "minLength",
      value: 14,
      errorMessage: "The field must contain a minimum of 10 characters",
    },
  ])
  .addField("#email", [
    {
      rule: "required",
      errorMessage: "Email is required",
    },
    {
      rule: "email",
      errorMessage: "Email is invalid!",
    },
  ]);

var states = {
  AL: "Alabama",
  AK: "Alaska",
  AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

var selectElement = document.querySelector(".custom-select select");
var selectState = document.querySelector("#state-select");

for (var key in states) {
  if (states.hasOwnProperty(key)) {
    var option = document.createElement("option");
    option.value = key;
    option.text = states[key];
    selectState.add(option);
  }
}

var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i) == -1) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);

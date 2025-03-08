$(document).ready(() => {
  $(document).ready(() => {
    const init = () => {
      buildPopup();
      buildStyles();
      loadProducts();
      setEvents();
    };

    const loadProducts = () => {
      $.ajax({
        url: "products.json",
        dataType: "json",
        success: (data) => {
          $.each(data, (index, product) => {
            let productDiv = $("<div>").addClass("product");
            let productImg = $("<img>")
              .attr("src", product.link)
              .attr("alt", product.name);
            let productContent = $("<div>").addClass("product-content");
            let productName = $("<h4>").text(product.name);
            let productPrice = $("<p>").text(product.price);

            productContent.append(productName, productPrice);
            productDiv.append(productImg, productContent);
            productDiv.data("name", product.name);
            productDiv.data("details", product.details);
            productDiv.data("link", product.link);

            productDiv.hover(
              function () {
                $(this).stop().animate(
                  {
                    top: "-8px",
                  },
                  200
                );
                $(this).css({
                  "box-shadow": "0 8px 16px rgba(0,0,0,0.1)",
                });
              },
              function () {
                $(this).stop().animate(
                  {
                    top: "0",
                  },
                  200
                );
                $(this).css({
                  "box-shadow": "0 2px 4px rgba(0,0,0,0.04)",
                });
              }
            );

            productDiv.click(() => openPopup(product));

            $(".product-list").append(productDiv);
          });
        },
      });
    };

    const buildPopup = () => {
      let overlay = $("<div>").attr("id", "popup-overlay");
      let popup = $("<div>").attr("id", "popup");
      let content = $("<div>").addClass("popup-content");
      let title = $("<h2>").attr("id", "popup-title");
      let img = $("<img>").attr("id", "popup-image");
      let details = $("<p>").attr("id", "popup-details");
      let link = $("<a>")
        .attr("id", "popup-link")
        .attr("target", "_blank")
        .text("Ürünü Gör");
      let closeBtn = $("<button>").attr("id", "close").html("&times;");

      content.append(closeBtn, title, img, details, link);
      popup.append(content);
      overlay.append(popup);
      $("body").append(overlay);
    };

    const buildStyles = () => {
      $("<style>")
        .html(
          `
            #popup-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                backdrop-filter: blur(2px);
            }
            #popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                width: 90%;
                max-width: 500px;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
            }
            .popup-content {
                position: relative;
                padding: 1rem;
            }
            #close {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                width: 2rem;
                height: 2rem;
                border: none;
                background: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            #close:hover {
                background-color: #f0f0f0;
            }
            #popup-image {
                width: 100%;
                height: 250px;
                object-fit: contain;
                margin: 1rem 0;
            }
            #popup-title {
                font-size: 1.2rem;
                color: #2c3e50;
                margin-bottom: 1rem;
                font-weight: 600;
            }
            #popup-details {
                color: #666;
                line-height: 1.6;
                margin: 1rem 0;
                font-size: 0.95rem;
            }
            #popup-link {
                display: inline-block;
                padding: 0.5rem 1rem;
                background-color: #3498db;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-size: 0.9rem;
                transition: background-color 0.2s;
            }
            #popup-link:hover {
                background-color: #2980b9;
            }
            .active {
                display: flex !important;
                align-items: center;
                justify-content: center;
            }
            `
        )
        .appendTo("head");
    };

    const setEvents = () => {
      $("#close").on("click", closePopup);
      $("#popup-overlay").on("click", (e) => {
        if (e.target.id === "popup-overlay") {
          closePopup();
        }
      });

      $(window).on("scroll", () => {
        if (
          $(window).scrollTop() + $(window).height() ==
          $(document).height()
        ) {
          openPopup();
        }
      });
    };

    const openPopup = (product) => {
      $("#popup-title").text(product.name);
      $("#popup-image").attr("src", product.link).attr("alt", product.name);
      $("#popup-details").text(product.details);
      $("#popup-link").attr("href", product.link);
      $("#popup-overlay").addClass("active");
    };

    const closePopup = () => {
      $("#popup-overlay").removeClass("active");
    };

    init();
  });
});

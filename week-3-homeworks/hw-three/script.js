$(document).ready(() => {
  $("#birthDate").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0",
  });

  $("#phone").mask("(999) 999-9999");

  $(document).on('click', '#show-form-btn', () => {
    $("#show-form-btn").fadeOut(500);
    $("#application-form").fadeIn(500);
  });

  const closeForm = (success = false) => {
    if(success) {
      $("#success-message").fadeIn().delay(3000).fadeOut();
    }
    $("#application-form").fadeOut(3000, () => {
      $("#show-form-btn").fadeIn(500);
      $("#validate-form").trigger("reset");
    });
  }

  $(document).on('click', '#cancel-form', () => {
    closeForm();
  });

  $(document).on('click', '#auto-fill', () => {
    $("#firstName").val("Test");
    $("#lastName").val("Kullanıcı");
    $("#email").val("test@example.com");
    $("#phone").val("(555) 555-5555");
    $("#position").val("developer");
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - 23, today.getMonth(), today.getDate());
    $("#birthDate").datepicker("setDate", birthDate);
  });

  $("#validate-form").validate({
    rules: {
      firstName: {
        required: true,
        minlength: 2
      },
      lastName: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        minlength: 14
      },
      position: {
        required: true
      },
      birthDate: {
        required: true,
        date: true
      }
    },
    messages: {
      firstName: {
        required: "Lütfen adınızı giriniz",
        minlength: "Ad en az 2 karakter olmalıdır"
      },
      lastName: {
        required: "Lütfen soyadınızı giriniz",
        minlength: "Soyad en az 2 karakter olmalıdır"
      },
      email: {
        required: "Lütfen e-posta adresinizi giriniz",
        email: "Lütfen geçerli bir e-posta adresi giriniz"
      },
      phone: {
        required: "Lütfen telefon numaranızı giriniz",
        minlength: "Lütfen geçerli bir telefon numarası giriniz"
      },
      position: {
        required: "Lütfen bir pozisyon seçiniz"
      },
      birthDate: {
        required: "Lütfen doğum tarihinizi giriniz",
        date: "Lütfen geçerli bir tarih giriniz"
      }
    },
    errorClass: "error",
    validClass: "valid",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },
    submitHandler: (form) => {
      closeForm(true);
      
      return false;
    }
  });
});

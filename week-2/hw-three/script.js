let countdown;
const defaultState = {
  timeRemaining: 0,
};

const proxyState = new Proxy(defaultState, {
  set(target, key, value) {
    target[key] = value;
    if (key === "timeRemaining") {
      document.getElementById("countdown").textContent = value;
    }
    return true;
  },
});

document.getElementById("startButton").addEventListener("click", function () {
  const inputTime = parseInt(document.getElementById("timeInput").value);
  if (isNaN(inputTime) || inputTime <= 0) {
    alert("Lütfen geçerli bir sayı girin.");
    return;
  }

  proxyState.timeRemaining = inputTime;

  countdown = setInterval(function () {
    proxyState.timeRemaining--;

    if (proxyState.timeRemaining <= 0) {
      clearInterval(countdown);
      proxyState.timeRemaining = "Süre doldu!";
    }
  }, 1000);
});

document.getElementById("resetButton").addEventListener("click", function () {
  clearInterval(countdown);
  proxyState.timeRemaining = 0;
});

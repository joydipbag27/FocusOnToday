const errorMessage = document.querySelector(".userMessage-2");
const containerMiddle = document.querySelector(".containerMiddle");
const userMessageOne = document.querySelector(".userMessage-1");
const progressCount = document.querySelector(".progressValue > span");
const progressValue = document.querySelector(".progressValue");
const userMessageThree = document.querySelector(".userMessage-3");
const sun = document.querySelector(".today > img");
const inputFields = document.querySelectorAll("input");
const allCheckBox = document.querySelectorAll(".checkerLogo");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    if (
      [...inputFields].every((input) => {
        return input.value;
      })
    ) {
      checkBox.classList.toggle("checked");
      checkBox.textContent = "✔";
      checkBox.nextElementSibling.classList.toggle("inputChecked");
      updateCount();
      allGoals[e.target.nextElementSibling.id] = {
        name: checkBox.nextElementSibling.value,
        completed: `${checkBox.classList.contains("checked")}`,
      };
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    }
  });
});

inputFields.forEach((field) => {
  if (allGoals[field.id]) {
    field.value = allGoals[field.id].name;
  }
  if (allGoals[field.id].completed === "true") {
    field.previousElementSibling.classList.add("checked");
    field.previousElementSibling.textContent = "✔";
    field.classList.add("inputChecked");
  }
  if (
    [...inputFields].every((input) => {
      return input.value;
    })
  ) {
    errorMessage.style.display = "none";
  } else if (
    [...inputFields].some((input) => {
      return input.value;
    })
  ) {
    errorMessage.style.display = "block";
  }
  updateCount();

  field.addEventListener("input", (e) => {
    allGoals[e.target.id] = {
      name: e.target.value,
      completed: field.previousElementSibling.classList.contains("checked"),
    };

    localStorage.setItem("allGoals", JSON.stringify(allGoals));

    if (
      [...inputFields].every((input) => {
        return input.value;
      })
    ) {
      errorMessage.style.display = "none";
    } else if (
      [...inputFields].some((input) => {
        return input.value;
      })
    ) {
      errorMessage.style.display = "block";
    }

    if (field.value === "") {
      field.previousElementSibling.classList.remove("checked");
      field.previousElementSibling.textContent = "✔";
      field.classList.remove("inputChecked");
      updateCount();
    }
  });
});

function updateCount() {
  let c = document.querySelectorAll(".checked").length;
  progressCount.textContent = `${c}/3 Completed`;

  if (c === 1) {
    progressValue.style.width = "33%";
    userMessageOne.textContent = "You're doing great! Keep it up!";
    userMessageThree.textContent = `"Just a few more steps!"`;
    sun.src = "img/sun1.png";
  } else if (c === 2) {
    progressValue.style.width = "66%";
    userMessageOne.textContent = "Just a step away, keep going!";
    userMessageThree.textContent = `"Keep Going, You're making great progress!"`;
    sun.src = "img/sun2.png";
  } else if (c === 3) {
    progressValue.style.width = "100%";
    userMessageOne.textContent =
      "Congratulations! You've completed all tasks!🎉";
    userMessageThree.textContent = `"Come Back Tomorrow! With New Goals!"`;
    sun.src = "img/sun3.png";
  } else {
    progressValue.style.width = "0%";
    userMessageOne.textContent = "Raise the bar by completing your goals!";
    progressCount.textContent = "";
    userMessageThree.textContent = '"Move one step ahead, today!"';
    sun.src = "img/sun.png";
  }
}

"use strict";

//SELECT ELEMENTS
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const deleteBtn = document.querySelector(".btn-danger");
const healthyPetBtn = document.getElementById("healthy-btn");
const calcBMI = document.getElementById("calcbmi-btn");

const petArr = [];
let heathyCheck = false;
// renderTableData(petArr);
const dt = new Date();

// CHECK ID
function checkID(petId) {
  return petArr.findIndex((x) => x.id === petId);
}

//CHECK VALIDATE DATA
function validateData(data) {
  if (!data.id) {
    alert("Please input for ID!");
    idInput.focus();
    return "";
  }
  if (!data.name) {
    alert("Please input name!");
    nameInput.focus();
    return "";
  }
  if (!data.age) {
    alert("Please input age!");
    ageInput.focus();
    return "";
  }
  if (data.type === "Select Type") {
    alert("Please select type!");
    typeInput.focus();
    return "";
  }
  if (!data.weight) {
    alert("Please input weight!");
    weightInput.focus();
    return "";
  }
  if (!data.length) {
    alert("Please input length!");
    lengthInput.focus();
    return "";
  }
  if (data.type === "Select Breed") {
    alert("Please select breed!");
    breedInput.focus();
    return "";
  }
  if (checkID(data.id) > -1) {
    alert("ID must unique!");
    idInput.focus();
    return "";
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    ageInput.focus();
    return "";
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    weightInput.focus();
    return "";
  }
  if (data.length < 1 || data.weight > 100) {
    alert("Weight must be between 1 and 100!");
    lengthInput.focus();
    return "";
  }
  return true;
}

//DISPLAY PET LIST
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const pet = petArr[i];
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th>
  <td>${pet.name}</td>
  <td>${pet.age}</td>
  <td>${pet.type}</td>
  <td>${pet.weight} kg</td>
  <td>${pet.length} cm</td>
  <td>${pet.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
  </td>
  <td><i class="bi ${
    pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td>${pet.bmi}</td>
  <td>${pet.date}</td>
  <td><button type="button" class="btn btn-danger" onclick="deletePet('${
    pet.id
  }')">Delete</button>
  </td>`;
    tableBodyEl.appendChild(row);
  }
}

//CLEAR FORM
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//SUBMIT EVENT
submitBtn.addEventListener("click", function () {
  //GET DATA
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: Number(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: dt.toLocaleDateString("vi-VI"),
  };
  // Save
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
});

//DELETE PET
function deletePet(petId) {
  if (confirm("Are you sure?")) {
    petArr.splice(checkID(petId), 1);
    renderTableData(petArr);
  }
}

//SHOW HEALTHY PET
healthyPetBtn.addEventListener("click", function () {
  const healthyPetArr = petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );
  heathyCheck = heathyCheck ? false : true;
  if (heathyCheck) {
    renderTableData(healthyPetArr);
    healthyPetBtn.textContent = "Show All Pet";
  } else {
    renderTableData(petArr);
    healthyPetBtn.textContent = "Show Healthy Pet";
  }
});

// CALC BMI
calcBMI.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    const pet = petArr[i];
    if (pet.type === "Dog")
      pet.bmi = ((pet.weight * 703) / pet.length ** 2).toFixed(2);
    else pet.bmi = ((pet.weight * 886) / pet.length ** 2).toFixed(2);
  }
  renderTableData(petArr);
});

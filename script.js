const firstSelect = document.querySelector('#first-slection');
const secondSelect = document.querySelector('#second-slection');
const infos = document.querySelector('#infos');
const itemImage = document.querySelector('#item-img');
const itemDescreption = document.querySelector('#item-description');

const vavaApi = (categorie) => `https://valorant-api.com/v1/${categorie}`;

const appnedOption = (name) => {
  const option = document.createElement('option');
  option.value = name;
  option.innerText = name;
  secondSelect.appendChild(option);
};

const vavaAgents = async () => {
  const result = await fetch(vavaApi('agents'));
  const response = await result.json();
  const data = response.data;
  const names = data.map((e) => e.displayName);
  names.forEach((e) => appnedOption(e));
};

window.onload = vavaAgents;

const vavaMaps = async () => {
  const result = await fetch(vavaApi('maps'));
  const response = await result.json();
  const data = response.data;
  const names = data.map((e) => e.displayName);
  names.forEach((e) => appnedOption(e));
};

const vavaWeapons = async () => {
  const result = await fetch(vavaApi('weapons'));
  const response = await result.json();
  const data = response.data;
  const names = data.map((e) => e.displayName);
  names.forEach((e) => appnedOption(e));
};

firstSelect.addEventListener('click', () => {
  if (firstSelect.value === 'agents') {
    secondSelect.innerHTML = '';
    itemImage.innerHTML = '';
    itemDescreption.innerHTML = '';
    vavaAgents();
  } else if (firstSelect.value === 'maps') {
    secondSelect.innerHTML = '';
    itemImage.innerHTML = '';
    itemDescreption.innerHTML = '';
    vavaMaps();
  } else if (firstSelect.value === 'weapons') {
    secondSelect.innerHTML = '';
    itemImage.innerHTML = '';
    itemDescreption.innerHTML = '';
    vavaWeapons();
  }
});

const infoContent = (image, desc) => {
  const img = document.createElement('img');
  img.src = image;
  itemImage.appendChild(img);
  const description = document.createElement('p');
  description.innerHTML = desc;
  itemDescreption.appendChild(description);
}

const setInfo = async (param1, param2) => {
  const result = await fetch(vavaApi(param1));
  const response = await result.json();
  const data = response.data;
  const infosData = data.find((e) => e.displayName === param2);
  if (param1 === 'agents') {
    infoContent(infosData.displayIconSmall, infosData.description);
  }
  if (param1 === 'maps') {
    infoContent(infosData.splash, infosData.displayName);
  }
  if (param1 === 'weapons') {
    infoContent(infosData.displayIcon, infosData.displayName);
  }
}

secondSelect.addEventListener('click', () => {
  itemImage.innerHTML = '';
  itemDescreption.innerHTML = '';
  setInfo(`${firstSelect.value}`, `${secondSelect.value}`);
});


// vavaApi(`${firstSelect.value}`, `${secondSelect.value}`)
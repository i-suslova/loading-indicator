// сколько байтов в мегабайте
const BYTES_IN_MB = 1024 * 1024;
const form = document.getElementById("form");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const files = fileInput.files; // Обновляем список файлов

// Очищаем список файлов перед обновлением
function clearList() {
  while (fileList.firstChild) {
    fileList.firstChild.remove();
  }
}

fileInput.addEventListener("change", function () {
  clearList();
  
  const files = fileInput.files; // Обновляем список файлов
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    //проверяем, если файл больше 5MB выводим предупреждение
    if (file.size > 5 * BYTES_IN_MB) {
     alert ("Слишком большой файл");
      fileInput.value = null;
      continue;
    }
    const uploadedFile = document.createElement("printFile");
    uploadedFile.textContent = file.name;
    fileList.appendChild(uploadedFile);
  }
});

form.addEventListener("submit", function (event) {
  //Отменяем стандартную отправку формы
  event.preventDefault();
  const files = fileInput.files; 

  for (let i = 0; i < files.length; i++) {
   //выбирается текущий файл 
    const file = files[i];
    //создается новый объект
    const formData = new FormData();
    formData.append("file", file);

    //отправляется асинхронный запрос
    fetch("https://...", {   ///URL-адрес на сервер
      method: "POST",     //как ты говорил: методом POST
      body: formData,
    })
    //ответ с сервера преобразуется в формат JSON
      .then((response) => response.json())
      .then((data) => {
        // Файл успешно загружен
        const uploadedFile = document.createElement("printFile");
        uploadedFile.textContent = data.filename;
        fileList.appendChild(uploadedFile);
      })
      .catch((error) => {
        // Обработка ошибок
        console.error(error);
      });
  }
  // Очищаем поле выбора файлов после загрузки
  fileInput.value = "";
});

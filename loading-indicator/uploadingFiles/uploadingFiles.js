// сколько байтов в мегабайте
const BYTES_IN_MB = 1024 * 1024;
const form = document.getElementById("form");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

//функция очистки файлов перед обновлением
function clearList() {
  while (fileList.firstChild) {
    fileList.firstChild.remove();
  }
}

fileInput.addEventListener("change", function () {
  clearList(); //очищаем список файлов перед обновлением
  
  
  //Получаем доступ к информации о выбранных файлах При помощи свойства.files
  //Обновляем переменную files, весь список файлов
  const files = fileInput.files; 
  //Цикл for выполняется последовательно для каждого файла   
  for (let i = 0; i < files.length; i++) {
  //Извлекаем текущий файлиз списка и сохраняем его в const file
    const file = files[i];

    //проверяем, если файл больше 5MB выводим предупреждение
    //Но можно это не использовать, эта проверка по желанию
    if (file.size > 5 * BYTES_IN_MB) {
     alert ("Слишком большой файл");
      fileInput.value = null;
      continue;
    }
    //Появляется строчка
    const uploadedFile = document.createElement("printFile");
    //в которой появится текст, соответствующий имени файла
    uploadedFile.textContent = file.name;
    //Если файлов несколько, то это будет список
    fileList.appendChild(uploadedFile);
  }
});

form.addEventListener("submit", function (event) {
  //Отменяем стандартную отправку формы
  event.preventDefault();
  //Опять обновляется const files
  const files = fileInput.files; 
 //Цикл for выполняется последовательно для каждого файла   
  for (let i = 0; i < files.length; i++) {
   //выбирается текущий файл 
    const file = files[i];
    //создается новый объект
    const formData = new FormData();
    //Метод append принимает два параметра: имя поля и значение
    formData.append("file", file);

    //отправляется асинхронный запрос
    fetch("https://...", {   ///URL-адрес на сервер
      method: "POST",     //как ты говорил: методом POST
      body: formData,
    })
    //ответ с сервера преобразуется в формат JSON
      .then((response) => response.json())
      //сервер возвращает имя файла
      .then((data) => {
        //Имя этого файла должно быть написано здесь
        const uploadedFile = document.createElement("printFile");
        uploadedFile.textContent = data.filename;
         //Если файлов несколько, то это будет список
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
